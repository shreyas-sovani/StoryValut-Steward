import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { streamSSE } from "hono/streaming";
import { createStoryStewardAgent } from "./agent.js";
import { get_agent_wallet, execute_strategy, getAgentWalletFn, executeStrategyFn } from "./tools/executionTools.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * StoryVault Steward API Server
 * Exposes the agent as a REST API with SSE streaming for real-time responses
 */

const app = new Hono();

// Store agent runners by session
const sessions = new Map<string, any>();

// ============================================================================
// AUTONOMOUS WATCHER STATE (Phase 8)
// ============================================================================
let current_yield = 4.5; // Default: Healthy 4.5% APY
let lastKnownBalance = "0"; // Track FRAX balance
let isInvesting = false; // Prevent concurrent investments
let isEvacuating = false; // Prevent concurrent evacuations
let watcherLogs: Array<{
  timestamp: string;
  type: "info" | "warning" | "critical" | "success";
  message: string;
}> = [];

// SSE clients for real-time funding updates
const sseClients: Array<{
  id: string;
  stream: any;
}> = [];

// Helper to add watcher log
function addWatcherLog(type: "info" | "warning" | "critical" | "success", message: string) {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    message,
  };
  watcherLogs.push(log);
  // Keep only last 50 logs
  if (watcherLogs.length > 50) {
    watcherLogs.shift();
  }
  console.log(`[WATCHER ${type.toUpperCase()}] ${message}`);
  return log;
}

// Broadcast funding events to all connected SSE clients
function broadcastFundingUpdate(eventData: {
  type: "funding_update";
  status: "DEPOSIT_DETECTED" | "INVESTED" | "EVACUATED" | "WAITING";
  amount?: string;
  tx?: string;
  timestamp: string;
}) {
  console.log("📡 Broadcasting funding update to", sseClients.length, "clients:", eventData);
  
  for (const client of sseClients) {
    try {
      client.stream.writeSSE({
        data: JSON.stringify(eventData),
        event: "funding_update",
      });
    } catch (error) {
      console.error("Failed to send SSE to client", client.id, error);
    }
  }
}

// CORS configuration for frontend
// Allow localhost (development) and Vercel (production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  /https:\/\/.*\.vercel\.app$/,  // Any Vercel deployment
  "https://story-valut-steward.vercel.app",  // Your production domain
  "https://story-valut-steward-snmf.vercel.app",  // Current Vercel deployment
];

app.use("/*", cors({
  origin: (origin) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return "*";
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some((pattern) => {
      if (typeof pattern === "string") return pattern === origin;
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    });
    
    return isAllowed ? origin : allowedOrigins[0] as string;
  },
  credentials: true,
}));

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    service: "StoryVault Steward API",
    version: "1.0.0",
    fraxtal: {
      chain_id: 252,
      rpc: "https://rpc.frax.com",
    },
  });
});

// Initialize or get session
async function getOrCreateSession(sessionId: string) {
  if (!sessions.has(sessionId)) {
    console.log(`📝 Creating new session: ${sessionId}`);
    const agentConfig = await createStoryStewardAgent();
    sessions.set(sessionId, agentConfig);
  }
  return sessions.get(sessionId);
}

// POST /api/chat - Main chat endpoint with SSE streaming
app.post("/api/chat", async (c) => {
  try {
    const body = await c.req.json();
    const { message, sessionId = "default" } = body;

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    console.log(`💬 [${sessionId}] User: ${message.slice(0, 50)}...`);

    // Get or create agent session
    const { runner } = await getOrCreateSession(sessionId);

    // Stream the agent's response using SSE
    return streamSSE(c, async (stream) => {
      try {
        // Send start event
        await stream.writeSSE({
          data: JSON.stringify({ type: "start", timestamp: new Date().toISOString() }),
          event: "message",
        });

        // Get the response from the agent
        const response = await runner.ask(message);

        // Send the response as chunks
        await stream.writeSSE({
          data: JSON.stringify({ 
            type: "content", 
            content: response,
            timestamp: new Date().toISOString()
          }),
          event: "message",
        });

        // Send end event
        await stream.writeSSE({
          data: JSON.stringify({ type: "end", timestamp: new Date().toISOString() }),
          event: "message",
        });

        console.log(`✅ [${sessionId}] Response sent`);
      } catch (error) {
        console.error(`❌ [${sessionId}] Error:`, error);
        await stream.writeSSE({
          data: JSON.stringify({ 
            type: "error", 
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
          }),
          event: "error",
        });
      }
    });
  } catch (error) {
    console.error("❌ Chat endpoint error:", error);
    return c.json(
      { 
        error: "Failed to process message", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      500
    );
  }
});

// POST /api/chat/simple - Simple non-streaming endpoint
app.post("/api/chat/simple", async (c) => {
  try {
    const body = await c.req.json();
    const { message, sessionId = "default" } = body;

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    console.log(`💬 [${sessionId}] User: ${message.slice(0, 50)}...`);

    // Get or create agent session
    const { runner } = await getOrCreateSession(sessionId);

    // Get response
    const response = await runner.ask(message);

    console.log(`✅ [${sessionId}] Response sent`);

    return c.json({
      response,
      sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Simple chat endpoint error:", error);
    return c.json(
      { 
        error: "Failed to process message", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      500
    );
  }
});

// DELETE /api/session/:id - Clear a specific session
app.delete("/api/session/:id", (c) => {
  const sessionId = c.req.param("id");
  if (sessions.has(sessionId)) {
    sessions.delete(sessionId);
    console.log(`🗑️  Deleted session: ${sessionId}`);
    return c.json({ message: "Session deleted", sessionId });
  }
  return c.json({ error: "Session not found" }, 404);
});

// GET /api/sessions - List all active sessions
app.get("/api/sessions", (c) => {
  const sessionList = Array.from(sessions.keys());
  return c.json({
    sessions: sessionList,
    count: sessionList.length,
  });
});

// ============================================================================
// PHASE 8: AUTONOMOUS HEDGE FUND ENDPOINTS
// ============================================================================

// POST /api/simulate/crash - Trigger a simulated market crash for demo
app.post("/api/simulate/crash", (c) => {
  console.log("\n🔥🔥🔥 SIMULATING MARKET CRASH 🔥🔥🔥\n");
  
  current_yield = 1.5; // Drop yield to crisis level
  
  addWatcherLog("critical", "📉 MARKET CRASH SIMULATED - Yield dropped to 1.5%");
  addWatcherLog("warning", "⚠️ CRITICAL THRESHOLD BREACHED - Defensive protocols activated");
  
  return c.json({
    status: "crash_simulated",
    previous_yield: 4.5,
    new_yield: 1.5,
    message: "Market crash triggered - Watcher will auto-evacuate funds",
    timestamp: new Date().toISOString(),
  });
});

// POST /api/simulate/recovery - Trigger market recovery
app.post("/api/simulate/recovery", (c) => {
  console.log("\n✅ SIMULATING MARKET RECOVERY ✅\n");
  
  current_yield = 4.5; // Restore normal yield
  
  addWatcherLog("success", "✅ MARKET RECOVERED - Yield restored to 4.5%");
  addWatcherLog("info", "📊 Normal operations resumed");
  
  return c.json({
    status: "recovery_simulated",
    previous_yield: 1.5,
    new_yield: 4.5,
    message: "Market recovered - Watcher monitoring normally",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/watcher/status - Get current watcher state
app.get("/api/watcher/status", (c) => {
  return c.json({
    current_yield,
    last_known_balance: lastKnownBalance,
    recent_logs: watcherLogs.slice(-10), // Last 10 logs
    health_status: current_yield >= 3.5 ? "healthy" : current_yield >= 2.0 ? "warning" : "critical",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/watcher/logs/stream - SSE stream for live logs
app.get("/api/watcher/logs/stream", (c) => {
  return streamSSE(c, async (stream) => {
    console.log("📡 Client connected to watcher log stream");
    
    // Send initial logs
    for (const log of watcherLogs.slice(-10)) {
      await stream.writeSSE({
        data: JSON.stringify(log),
        event: "log",
      });
    }
    
    // Keep connection alive and send new logs
    // In a real implementation, you'd use an event emitter pattern
    // For now, we'll just keep the connection open
    const interval = setInterval(async () => {
      if (watcherLogs.length > 0) {
        const lastLog = watcherLogs[watcherLogs.length - 1];
        await stream.writeSSE({
          data: JSON.stringify(lastLog),
          event: "log",
        });
      }
    }, 1000);
    
    // Cleanup on disconnect
    c.req.raw.signal.addEventListener("abort", () => {
      clearInterval(interval);
      console.log("📡 Client disconnected from watcher log stream");
    });
  });
});

// GET /api/funding/stream - SSE stream for real-time funding updates
app.get("/api/funding/stream", (c) => {
  return streamSSE(c, async (stream) => {
    const clientId = Math.random().toString(36).substring(7);
    console.log(`📡 Client ${clientId} connected to funding stream`);
    
    // Add client to SSE clients list
    sseClients.push({ id: clientId, stream });
    
    // Send initial status
    await stream.writeSSE({
      data: JSON.stringify({
        type: "funding_update",
        status: "WAITING",
        timestamp: new Date().toISOString(),
      }),
      event: "funding_update",
    });
    
    // Keep connection alive
    const keepAlive = setInterval(async () => {
      try {
        await stream.writeSSE({
          data: JSON.stringify({ type: "heartbeat" }),
          event: "heartbeat",
        });
      } catch (error) {
        console.error(`Failed to send heartbeat to client ${clientId}`);
      }
    }, 30000); // Every 30 seconds
    
    // Cleanup on disconnect
    c.req.raw.signal.addEventListener("abort", () => {
      clearInterval(keepAlive);
      const index = sseClients.findIndex(client => client.id === clientId);
      if (index !== -1) {
        sseClients.splice(index, 1);
      }
      console.log(`📡 Client ${clientId} disconnected from funding stream (${sseClients.length} remaining)`);
    });
  });
});

// ============================================================================
// AUTONOMOUS WATCHER LOOP (Phase 8 - The "Demo God Mode")
// ============================================================================

async function autonomousWatcherLoop() {
  try {
    // Step 1: Check Agent Wallet Balance
    const walletResult = await getAgentWalletFn();
    const walletData = JSON.parse(walletResult);
    
    if (walletData.execution_capable) {
      const fraxBalance = parseFloat(walletData.balances.FRAX);
      
      // CRITICAL FIX: Initialize lastKnownBalance on first run to prevent auto-investing on server restart
      if (lastKnownBalance === "0" && fraxBalance > 0) {
        lastKnownBalance = fraxBalance.toString();
        addWatcherLog("info", `🔄 Server started: Tracking existing balance of ${fraxBalance.toFixed(4)} FRAX (no auto-invest on restart)`);
      }
      
      // Step 2: AUTO-INVEST Rule (0.01 FRAX minimum for testing)
      // Only invest if balance INCREASED from last known balance
      if (fraxBalance > 0.01 && fraxBalance > parseFloat(lastKnownBalance) && !isInvesting) {
        isInvesting = true; // Set flag immediately to prevent concurrent investments
        
        const depositAmount = fraxBalance - parseFloat(lastKnownBalance);
        lastKnownBalance = fraxBalance.toString(); // Update balance BEFORE investing
        
        addWatcherLog("success", `💰 NEW CAPITAL DETECTED: +${depositAmount.toFixed(4)} FRAX (Total: ${fraxBalance.toFixed(4)})`);
        
        // Broadcast deposit detected
        broadcastFundingUpdate({
          type: "funding_update",
          status: "DEPOSIT_DETECTED",
          amount: fraxBalance.toFixed(2),
          timestamp: new Date().toISOString(),
        });
        
        addWatcherLog("info", "🤖 AUTO-INVEST PROTOCOL: Executing conservative_mint strategy...");
        
        try {
          // Execute auto-investment
          const investResult = await executeStrategyFn({
            strategy_type: "conservative_mint",
            amount: (fraxBalance * 0.95).toString(), // Invest 95%, keep 5% for gas
            reason: "Autonomous auto-invest triggered by new capital detection",
          });
          
          const investData = JSON.parse(investResult);
          if (investData.status === "EXECUTED") {
            addWatcherLog("success", `✅ AUTO-INVEST COMPLETE: ${investData.transaction?.hash}`);
            
            // Broadcast invested
            broadcastFundingUpdate({
              type: "funding_update",
              status: "INVESTED",
              amount: (fraxBalance * 0.95).toFixed(2),
              tx: investData.transaction?.hash,
              timestamp: new Date().toISOString(),
            });
          } else {
            addWatcherLog("warning", `⚠️ AUTO-INVEST DEMO: Would execute in production`);
            
            // Broadcast invested (demo)
            broadcastFundingUpdate({
              type: "funding_update",
              status: "INVESTED",
              amount: (fraxBalance * 0.95).toFixed(2),
              tx: "DEMO_MODE",
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          addWatcherLog("critical", `❌ AUTO-INVEST FAILED: ${error}`);
        } finally {
          isInvesting = false; // Release flag after investment completes or fails
        }
      }
      
      // Step 3: PROTECTION Rule (The Crash Response)
      if (current_yield < 2.0 && !isEvacuating) {
        isEvacuating = true; // Set flag to prevent concurrent evacuations
        
        addWatcherLog("critical", `🚨 CRITICAL YIELD DETECTED: ${current_yield}%`);
        addWatcherLog("critical", "🚨 EMERGENCY PROTOCOL: Evacuating funds to safety...");
        
        try {
          // Execute emergency withdrawal
          const evacuateResult = await executeStrategyFn({
            strategy_type: "emergency_withdraw",
            reason: `Autonomous evacuation triggered by yield crash (${current_yield}%)`,
          });
          
          const evacuateData = JSON.parse(evacuateResult);
          if (evacuateData.status === "EXECUTED") {
            addWatcherLog("success", `✅ FUNDS EVACUATED: Holdings secured in FRAX`);
            
            // Broadcast evacuation
            broadcastFundingUpdate({
              type: "funding_update",
              status: "EVACUATED",
              tx: evacuateData.transaction?.hash,
              timestamp: new Date().toISOString(),
            });
          } else {
            addWatcherLog("warning", `⚠️ EVACUATION DEMO: Would execute in production`);
            
            // Broadcast evacuation (demo)
            broadcastFundingUpdate({
              type: "funding_update",
              status: "EVACUATED",
              tx: "DEMO_MODE",
              timestamp: new Date().toISOString(),
            });
          }
          
          // Reset yield after evacuation (for demo purposes)
          setTimeout(() => {
            current_yield = 4.5;
            addWatcherLog("info", "✅ Demo reset: Yield restored to 4.5%");
            isEvacuating = false; // Also reset flag on recovery
          }, 15000); // Reset after 15 seconds
          
        } catch (error) {
          addWatcherLog("critical", `❌ EVACUATION FAILED: ${error}`);
        } finally {
          isEvacuating = false; // Release flag after evacuation completes or fails
        }
      } else if (current_yield >= 2.0 && isEvacuating) {
        // Yield recovered while evacuating - reset flag
        isEvacuating = false;
      }
      
      // Step 4: Regular monitoring log
      if (fraxBalance === 0) {
        addWatcherLog("info", "👀 Monitoring: Waiting for capital deposit...");
      } else {
        addWatcherLog("info", `📊 Monitoring: ${fraxBalance.toFixed(2)} FRAX | Yield: ${current_yield}%`);
      }
    } else {
      // Demo mode
      addWatcherLog("info", `📊 DEMO MODE: Yield ${current_yield}% | Set AGENT_PRIVATE_KEY for live execution`);
    }
    
  } catch (error) {
    console.error("❌ Watcher loop error:", error);
    addWatcherLog("warning", `⚠️ Watcher error: ${error instanceof Error ? error.message : "Unknown"}`);
  }
}

// Start the watcher loop (runs every 5 seconds)
let watcherInterval: NodeJS.Timeout;

function startWatcherLoop() {
  addWatcherLog("success", "🛡️ AUTONOMOUS WATCHER ACTIVATED");
  addWatcherLog("info", "🤖 Monitoring wallet and yield conditions...");
  
  watcherInterval = setInterval(autonomousWatcherLoop, 5000); // 5 seconds
  
  // Run immediately on start
  autonomousWatcherLoop();
}

// Start watcher on server initialization
console.log("🤖 Initializing Autonomous Watcher...");
startWatcherLoop();

// Start the server
const port = parseInt(process.env.PORT || "3001");

console.log("🏛️  StoryVault Steward API Server");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`🚀 Starting server on http://localhost:${port}`);
console.log(`📡 Fraxtal Mainnet: Chain ID 252`);
console.log(`🔗 API Endpoints:`);
console.log(`   GET  /health              - Health check`);
console.log(`   POST /api/chat            - Chat with SSE streaming`);
console.log(`   POST /api/chat/simple     - Chat without streaming`);
console.log(`   GET  /api/sessions        - List sessions`);
console.log(`   DELETE /api/session/:id   - Delete session`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`✅ Server is running on http://localhost:${info.port}\n`);
  console.log(`💡 Test with:`);
  console.log(`   curl -X POST http://localhost:${info.port}/api/chat/simple \\`);
  console.log(`        -H "Content-Type: application/json" \\`);
  console.log(`        -d '{"message":"Hello, I need help with DeFi"}'\n`);
});

// ============================================================================
// VERCEL SERVERLESS EXPORTS
// ============================================================================
// Export handlers for Vercel Edge/Serverless deployment
// These allow Vercel to handle the Hono app as serverless functions
// ============================================================================

export default app;
export const GET = app.fetch;
export const POST = app.fetch;
export const PUT = app.fetch;
export const DELETE = app.fetch;
export const PATCH = app.fetch;
export const OPTIONS = app.fetch;
