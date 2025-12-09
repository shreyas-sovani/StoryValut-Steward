import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { streamSSE } from "hono/streaming";
import { createStoryStewardAgent } from "./agent.js";
import { 
  get_agent_wallet, 
  execute_strategy, 
  getAgentWalletFn, 
  executeStrategyFn,
  executeRealMicroInvestmentFn,
  setSSEBroadcaster,
  withdrawAllFundsToRecipient,
} from "./tools/executionTools.js";
import {
  executeInvestmentSequence,
  setSmartInvestBroadcaster,
  strategyManager,
} from "./tools/smartInvestTools.js";
import {
  executeRebalanceSequence,
  setRebalanceBroadcaster,
} from "./tools/rebalanceTools.js";
import { parseEther, formatEther } from "viem";
import dotenv from "dotenv";

dotenv.config();

/**
 * StoryVault Steward API Server
 * 
 * ⚠️  RAILWAY-ONLY DEPLOYMENT - NOT FOR VERCEL ⚠️
 * 
 * This backend runs ONLY on Railway as a persistent Node.js server.
 * It is NOT deployed to Vercel serverless/edge functions.
 * 
 * The frontend (on Vercel) calls this Railway server directly at:
 *   https://storyvalut-steward-production.up.railway.app
 * 
 * This server requires persistent state for:
 * - Autonomous watcher loop (deposit detection)
 * - SSE streaming (real-time updates)
 * - In-memory sessions and rate limiting
 */

const app = new Hono();

// ============================================================================
// RATE LIMITING (Protect against DDoS / API abuse)
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // Max 20 chat requests per minute per IP
const MAX_SESSIONS_PER_MINUTE = 10; // Max 10 new sessions per minute per IP

function getRateLimitKey(c: any): string {
  // Use X-Forwarded-For for Railway/proxied requests, fallback to remote address
  const forwarded = c.req.header("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(key: string, maxRequests: number = MAX_REQUESTS_PER_WINDOW): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000);

// Store agent runners by session
const sessions = new Map<string, any>();

// ============================================================================
// DUPLICATE MESSAGE PROTECTION
// Prevents the same message from being processed twice within 8 seconds.
// Key: `${clientIp}:${messageHash}` -> Value: timestamp of last request
// ============================================================================
const recentMessages = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 8000; // 8 second window

function isDuplicateMessage(clientIp: string, message: string): boolean {
  const msgKey = `${clientIp}:${message.trim().slice(0, 80)}`;
  const now = Date.now();
  const lastSeen = recentMessages.get(msgKey);
  
  if (lastSeen && now - lastSeen < DUPLICATE_WINDOW_MS) {
    return true; // Duplicate within window
  }
  
  recentMessages.set(msgKey, now);
  return false;
}

// Clean up old duplicate message entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of recentMessages.entries()) {
    if (now - timestamp > DUPLICATE_WINDOW_MS * 2) {
      recentMessages.delete(key);
    }
  }
}, 60000);

// ============================================================================
// PER-SESSION IN-FLIGHT GUARD
// Prevents concurrent runner.ask() calls for the same session.
// ============================================================================
const sessionInFlight = new Map<string, boolean>();

function isSessionBusy(sessionId: string): boolean {
  return sessionInFlight.get(sessionId) === true;
}

function setSessionBusy(sessionId: string, busy: boolean): void {
  if (busy) {
    sessionInFlight.set(sessionId, true);
  } else {
    sessionInFlight.delete(sessionId);
  }
}

// ============================================================================
// AUTONOMOUS WATCHER STATE (Phase 8 - Micro-Investment Edition)
// ============================================================================
let current_yield = 4.5; // Default: Healthy 4.5% APY
let lastKnownBalance = "0"; // Track frxETH balance
let isInvesting = false; // Prevent concurrent investments
let isEvacuating = false; // Prevent concurrent evacuations
let investmentExecuted = false; // ONE-TIME FLAG: Prevents re-investing after first success
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
  type: string;
  status: string;
  amount?: string;
  tx?: string;
  message?: string;
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

// Register the SSE broadcaster with executionTools (for real-time event emission)
setSSEBroadcaster(broadcastFundingUpdate);

// Register the SSE broadcaster with smartInvestTools (for Smart Invest workflow)
setSmartInvestBroadcaster(broadcastFundingUpdate);

// Register the SSE broadcaster with rebalanceTools (for Rebalance workflow)
setRebalanceBroadcaster(broadcastFundingUpdate);

// CORS configuration for frontend
// Allow localhost (development) and Vercel (production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  /https:\/\/.*\.vercel\.app$/,  // Any Vercel deployment
  "https://story-vault-steward.vercel.app",  // Main production domain (CORRECTED SPELLING)
  "https://story-valut-steward.vercel.app",  // Old domain (typo in URL)
  "https://story-valut-steward-snmf.vercel.app",  // Current Vercel deployment
];

// Helper function to check if origin is allowed
function isOriginAllowed(origin: string | undefined): string {
  if (!origin) return "*";
  
  const isAllowed = allowedOrigins.some((pattern) => {
    if (typeof pattern === "string") return pattern === origin;
    if (pattern instanceof RegExp) return pattern.test(origin);
    return false;
  });
  
  return isAllowed ? origin : allowedOrigins[0] as string;
}

app.use("/*", cors({
  origin: (origin) => isOriginAllowed(origin),
  credentials: true,
  allowHeaders: ["Content-Type", "Authorization", "Accept", "Cache-Control"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Type", "Cache-Control", "Connection"],
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
async function getOrCreateSession(sessionId: string, clientIp: string) {
  if (!sessions.has(sessionId)) {
    // Rate limit new session creation
    const sessionRateKey = `session:${clientIp}`;
    const sessionRateCheck = checkRateLimit(sessionRateKey, MAX_SESSIONS_PER_MINUTE);
    if (!sessionRateCheck.allowed) {
      throw new Error("RATE_LIMIT_EXCEEDED: Too many new sessions. Please wait a minute.");
    }
    
    console.log(`📝 Creating new session: ${sessionId}`);
    const agentConfig = await createStoryStewardAgent();
    sessions.set(sessionId, agentConfig);
  }
  return sessions.get(sessionId);
}

// POST /api/chat - Main chat endpoint with SSE streaming
app.post("/api/chat", async (c) => {
  try {
    // ============================================================================
    // DEBUG LOGGING - Track all incoming /api/chat requests
    // This helps identify the source of excessive requests
    // ============================================================================
    const timestamp = new Date().toISOString();
    const clientIp = getRateLimitKey(c);
    const userAgent = c.req.header("user-agent") || "unknown";
    const origin = c.req.header("origin") || "unknown";
    const referer = c.req.header("referer") || "unknown";
    
    // Parse body early for debug logging (before rate limit check)
    const body = await c.req.json();
    const { message, sessionId = "default" } = body;
    const messagePreview = message ? message.slice(0, 80) : "(empty)";
    
    console.log(`\n📥 [/api/chat] INCOMING REQUEST`);
    console.log(`   Timestamp: ${timestamp}`);
    console.log(`   Client IP: ${clientIp}`);
    console.log(`   User-Agent: ${userAgent.slice(0, 100)}`);
    console.log(`   Origin: ${origin}`);
    console.log(`   Referer: ${referer}`);
    console.log(`   Session: ${sessionId}`);
    console.log(`   Message: "${messagePreview}${message && message.length > 80 ? '...' : ''}"`);
    
    // ============================================================================
    // DUPLICATE MESSAGE PROTECTION - Block identical messages within 8 seconds
    // ============================================================================
    if (isDuplicateMessage(clientIp, message || "")) {
      console.log(`🚫 [/api/chat] DUPLICATE MESSAGE BLOCKED - IP: ${clientIp}, Message: "${messagePreview}"`);
      return c.json({ 
        error: "Duplicate message detected. Please wait before sending the same message again.",
        duplicate: true
      }, 429);
    }
    
    // ============================================================================
    // PER-SESSION IN-FLIGHT GUARD - Block concurrent requests for same session
    // ============================================================================
    if (isSessionBusy(sessionId)) {
      console.log(`🚫 [/api/chat] SESSION BUSY - Session: ${sessionId}, another request already in progress`);
      return c.json({ 
        error: "Another request is already being processed for this session. Please wait.",
        busy: true
      }, 429);
    }
    
    // Rate limiting check
    const rateKey = `chat:${clientIp}`;
    const rateCheck = checkRateLimit(rateKey);
    
    if (!rateCheck.allowed) {
      console.log(`🚫 [/api/chat] RATE LIMITED - IP: ${clientIp}, remaining: 0`);
      return c.json({ 
        error: "Rate limit exceeded. Please wait a minute before sending more messages.",
        retryAfter: 60 
      }, 429);
    }

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    console.log(`✅ [/api/chat] ACCEPTED - IP: ${clientIp}, remaining: ${rateCheck.remaining}`);

    // Get or create agent session
    const { runner } = await getOrCreateSession(sessionId, clientIp);

    // Stream the agent's response using SSE
    return streamSSE(c, async (stream) => {
      // Mark session as busy BEFORE starting runner.ask()
      setSessionBusy(sessionId, true);
      console.log(`🔒 [CHAT_REQUEST] Session: ${sessionId}, IP: ${clientIp}, Message: "${messagePreview}"`);
      
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

        console.log(`🔓 [CHAT_DONE] Session: ${sessionId}, Success: true`);
      } catch (error) {
        console.error(`❌ [${sessionId}] Error:`, error);
        console.log(`🔓 [CHAT_DONE] Session: ${sessionId}, Success: false, Error: ${error instanceof Error ? error.message : "Unknown"}`);
        await stream.writeSSE({
          data: JSON.stringify({ 
            type: "error", 
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString()
          }),
          event: "error",
        });
      } finally {
        // ALWAYS release the session lock
        setSessionBusy(sessionId, false);
      }
    });
  } catch (error) {
    console.error("❌ Chat endpoint error:", error);
    
    // Handle rate limit errors gracefully
    if (error instanceof Error && error.message.includes("RATE_LIMIT_EXCEEDED")) {
      return c.json({ error: error.message, retryAfter: 60 }, 429);
    }
    
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
    // ============================================================================
    // DEBUG LOGGING - Track all incoming /api/chat/simple requests
    // ============================================================================
    const timestamp = new Date().toISOString();
    const clientIp = getRateLimitKey(c);
    const userAgent = c.req.header("user-agent") || "unknown";
    const origin = c.req.header("origin") || "unknown";
    const referer = c.req.header("referer") || "unknown";
    
    // Parse body early for debug logging
    const body = await c.req.json();
    const { message, sessionId = "default" } = body;
    const messagePreview = message ? message.slice(0, 80) : "(empty)";
    
    console.log(`\n📥 [/api/chat/simple] INCOMING REQUEST`);
    console.log(`   Timestamp: ${timestamp}`);
    console.log(`   Client IP: ${clientIp}`);
    console.log(`   User-Agent: ${userAgent.slice(0, 100)}`);
    console.log(`   Origin: ${origin}`);
    console.log(`   Session: ${sessionId}`);
    console.log(`   Message: "${messagePreview}${message && message.length > 80 ? '...' : ''}"`);
    
    // ============================================================================
    // DUPLICATE MESSAGE PROTECTION - Block identical messages within 8 seconds
    // ============================================================================
    if (isDuplicateMessage(clientIp, message || "")) {
      console.log(`🚫 [/api/chat/simple] DUPLICATE MESSAGE BLOCKED - IP: ${clientIp}, Message: "${messagePreview}"`);
      return c.json({ 
        error: "Duplicate message detected. Please wait before sending the same message again.",
        duplicate: true
      }, 429);
    }
    
    // ============================================================================
    // PER-SESSION IN-FLIGHT GUARD - Block concurrent requests for same session
    // ============================================================================
    if (isSessionBusy(sessionId)) {
      console.log(`🚫 [/api/chat/simple] SESSION BUSY - Session: ${sessionId}, another request already in progress`);
      return c.json({ 
        error: "Another request is already being processed for this session. Please wait.",
        busy: true
      }, 429);
    }
    
    // Rate limiting check
    const rateKey = `chat:${clientIp}`;
    const rateCheck = checkRateLimit(rateKey);
    
    if (!rateCheck.allowed) {
      console.log(`🚫 [/api/chat/simple] RATE LIMITED - IP: ${clientIp}`);
      return c.json({ 
        error: "Rate limit exceeded. Please wait a minute before sending more messages.",
        retryAfter: 60 
      }, 429);
    }

    if (!message) {
      return c.json({ error: "Message is required" }, 400);
    }

    console.log(`✅ [/api/chat/simple] ACCEPTED - IP: ${clientIp}, remaining: ${rateCheck.remaining}`);

    // Get or create agent session
    const { runner } = await getOrCreateSession(sessionId, clientIp);

    // Mark session as busy BEFORE calling runner.ask()
    setSessionBusy(sessionId, true);
    console.log(`🔒 [CHAT_REQUEST_SIMPLE] Session: ${sessionId}, IP: ${clientIp}, Message: "${messagePreview}"`);

    try {
      // Get response
      const response = await runner.ask(message);

      console.log(`🔓 [CHAT_DONE_SIMPLE] Session: ${sessionId}, Success: true`);

      return c.json({
        response,
        sessionId,
        timestamp: new Date().toISOString(),
      });
    } finally {
      // ALWAYS release the session lock
      setSessionBusy(sessionId, false);
    }
  } catch (error) {
    console.error("❌ Simple chat endpoint error:", error);
    
    // Handle rate limit errors gracefully
    if (error instanceof Error && error.message.includes("RATE_LIMIT_EXCEEDED")) {
      return c.json({ error: error.message, retryAfter: 60 }, 429);
    }
    
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
// SMART INVEST STRATEGY ENDPOINTS
// ============================================================================

// GET /api/strategy/:address - Get user's investment strategy
app.get("/api/strategy/:address", (c) => {
  const address = c.req.param("address");
  
  try {
    const strategy = strategyManager.getStrategy(address);
    return c.json({
      stablePercent: strategy.stablePercent,
      volatilePercent: strategy.volatilePercent,
      name: strategy.name,
      address,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error getting strategy:", error);
    return c.json(
      { error: "Failed to get strategy", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// POST /api/strategy/:address - Set user's investment strategy
app.post("/api/strategy/:address", async (c) => {
  const address = c.req.param("address");
  
  try {
    const body = await c.req.json();
    const { stablePercent, volatilePercent } = body;
    
    // Validate input
    if (typeof stablePercent !== "number" || typeof volatilePercent !== "number") {
      return c.json({ error: "stablePercent and volatilePercent must be numbers" }, 400);
    }
    
    if (stablePercent + volatilePercent !== 100) {
      return c.json({ error: "stablePercent + volatilePercent must equal 100" }, 400);
    }
    
    if (stablePercent < 0 || stablePercent > 100 || volatilePercent < 0 || volatilePercent > 100) {
      return c.json({ error: "Percentages must be between 0 and 100" }, 400);
    }
    
    // Update strategy
    strategyManager.setStrategy(address, stablePercent, volatilePercent);
    
    console.log(`📊 Strategy updated for ${address}: ${stablePercent}% stable / ${volatilePercent}% volatile`);
    
    return c.json({
      success: true,
      stablePercent,
      volatilePercent,
      address,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error setting strategy:", error);
    return c.json(
      { error: "Failed to set strategy", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// POST /api/smart-invest - Manual trigger for smart invest (testing)
app.post("/api/smart-invest", async (c) => {
  try {
    const body = await c.req.json();
    const { walletAddress, testMode } = body;
    
    // Get agent wallet to check balance
    const walletResult = await getAgentWalletFn();
    const walletData = JSON.parse(walletResult);
    
    if (!walletData.execution_capable) {
      return c.json({ error: "Agent wallet not configured for execution" }, 400);
    }
    
    const fraxBalance = parseFloat(walletData.balances.FRAX_native || "0");
    
    // Allow test mode to proceed even with low balance (for demo)
    if (fraxBalance < 0.1 && !testMode) {
      return c.json({ 
        error: "Insufficient FRAX balance for smart invest. Deposit FRAX to agent wallet first.", 
        balance: fraxBalance,
        agentWallet: walletData.address,
        hint: "Send FRAX to the agent wallet address to enable auto-investment"
      }, 400);
    }
    
    // If test mode with low balance, just return success without executing
    if (testMode && fraxBalance < 0.1) {
      return c.json({
        success: true,
        testMode: true,
        message: "Test mode - would execute investment with sufficient balance",
        currentBalance: fraxBalance,
        agentWallet: walletData.address,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Trigger investment sequence
    const result = await executeInvestmentSequence(walletData.address, parseEther(fraxBalance.toString()));
    
    return c.json({
      success: result.status === "SUCCESS",
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error triggering smart invest:", error);
    return c.json(
      { error: "Failed to trigger smart invest", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
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

// ============================================================================
// HYBRID REBALANCER ENDPOINT - ADK-TS Agent + Transaction Execution
// ============================================================================

// POST /api/rebalance - Trigger market crash simulation and rebalance
app.post("/api/rebalance", async (c) => {
  try {
    const body = await c.req.json();
    const { mockVol = 0.20 } = body;

    console.log("\n🔄 ====== REBALANCE REQUEST ======");
    console.log(`📊 Mock Volatility: ${(mockVol * 100).toFixed(1)}%`);

    // Get or create agent session for reasoning (internal call, use "internal" as IP)
    const { runner } = await getOrCreateSession("rebalance-session", "internal");

    // Step 1: Agent reasoning about the market crash
    const crashPrompt = `🚨 MARKET CRASH SIMULATION TRIGGERED!

Current Conditions:
- ETH Volatility: ${(mockVol * 100).toFixed(1)}% (threshold: 15%)
- sfrxETH APY: Dropping from 6.5% to ~4.0%
- sfrxUSD APY: Stable at 4.1% (Treasury-backed)

Analyze this situation and decide if we should rebalance.
If volatility > 15%, call the execute_rebalance tool with mockVol=${mockVol} to shift 60% of sfrxETH to sfrxUSD.

Explain your reasoning briefly before taking action.`;

    // Broadcast agent thinking
    broadcastFundingUpdate({
      type: "rebalance_update",
      status: "Processing",
      message: "🤖 AI Agent analyzing market conditions...",
      timestamp: new Date().toISOString(),
    });

    // Let the agent reason and potentially call the rebalance tool
    let agentResponse: string;
    try {
      agentResponse = await runner.ask(crashPrompt);
    } catch (agentError) {
      console.error("Agent reasoning error:", agentError);
      // If agent fails, execute directly
      agentResponse = "Agent reasoning failed, executing rebalance directly.";
    }

    console.log("🤖 Agent Response:", agentResponse);

    // Broadcast agent's reasoning
    broadcastFundingUpdate({
      type: "rebalance_update",
      status: "Processing",
      message: agentResponse.slice(0, 200) + (agentResponse.length > 200 ? "..." : ""),
      timestamp: new Date().toISOString(),
    });

    // Step 2: Execute the rebalance sequence (the agent may have already called this via tool)
    // We also call it directly to ensure execution
    const rebalanceResult = await executeRebalanceSequence(mockVol);

    // Update current yield to reflect crash conditions
    if (rebalanceResult.status === "SUCCESS" || rebalanceResult.status === "SKIPPED") {
      current_yield = 4.0; // Simulated crashed yield
      addWatcherLog("warning", `📉 Market crash simulated - Yield at ${current_yield}%`);
    }

    return c.json({
      success: rebalanceResult.status === "SUCCESS" || rebalanceResult.status === "SKIPPED",
      agentReasoning: agentResponse,
      rebalanceResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Rebalance error:", error);
    return c.json(
      {
        success: false,
        error: "Failed to execute rebalance",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
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

// POST /api/test/trigger-investment - Force trigger investment (TEST ONLY)
app.post("/api/test/trigger-investment", (c) => {
  console.log("\n🧪 TEST MODE: Forcing investment trigger\n");
  
  // Reset the investment flag and reduce lastKnownBalance
  investmentExecuted = false;
  const currentBalance = lastKnownBalance;
  lastKnownBalance = "0";
  
  addWatcherLog("info", `🧪 TEST: Reset investment flag and balance tracker`);
  addWatcherLog("info", `🧪 TEST: Next watcher cycle will detect balance increase and invest`);
  
  return c.json({
    status: "test_triggered",
    message: "Investment flag reset - next cycle will execute",
    previous_balance: currentBalance,
    new_tracked_balance: lastKnownBalance,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/watcher/logs/stream - SSE stream for live logs
app.get("/api/watcher/logs/stream", (c) => {
  // Set explicit SSE headers
  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  c.header("Access-Control-Allow-Origin", isOriginAllowed(c.req.header("origin")));
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("X-Accel-Buffering", "no"); // Disable nginx buffering
  
  return streamSSE(c, async (stream) => {
    console.log("📡 Client connected to watcher log stream");
    
    // Send initial logs
    for (const log of watcherLogs.slice(-10)) {
      await stream.writeSSE({
        data: JSON.stringify(log),
        event: "log",
      });
    }
    
    let isConnected = true;
    c.req.raw.signal.addEventListener("abort", () => {
      isConnected = false;
      console.log("📡 Client disconnected from watcher log stream");
    });
    
    // Keep connection alive with heartbeats every 15 seconds
    let lastLogCount = watcherLogs.length;
    while (isConnected) {
      try {
        await stream.sleep(1000); // Check every 1 second for new logs
        
        if (!isConnected) break;
        
        // Send any new logs
        if (watcherLogs.length > lastLogCount) {
          const newLogs = watcherLogs.slice(lastLogCount);
          for (const log of newLogs) {
            await stream.writeSSE({
              data: JSON.stringify(log),
              event: "log",
            });
          }
          lastLogCount = watcherLogs.length;
        }
      } catch (error) {
        console.error("Error in watcher log stream:", error);
        isConnected = false;
        break;
      }
    }
  });
});

// GET /api/funding/stream - SSE stream for real-time funding updates
app.get("/api/funding/stream", (c) => {
  // Set explicit SSE headers BEFORE streaming
  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  c.header("Access-Control-Allow-Origin", isOriginAllowed(c.req.header("origin")));
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("X-Accel-Buffering", "no"); // Disable nginx buffering
  
  return streamSSE(c, async (stream) => {
    const clientId = Math.random().toString(36).substring(7);
    console.log(`📡 Client ${clientId} connected to funding stream`);
    
    // Add client to SSE clients list
    sseClients.push({ id: clientId, stream });
    
    // Send initial connection confirmation
    await stream.writeSSE({
      data: JSON.stringify({
        type: "connected",
        status: "CONNECTED",
        clientId,
        message: "SSE connection established successfully",
        timestamp: new Date().toISOString(),
      }),
      event: "funding_update",
    });
    
    console.log(`✅ Initial message sent to client ${clientId}, keeping connection open...`);
    
    // Setup cleanup on disconnect
    let isConnected = true;
    c.req.raw.signal.addEventListener("abort", () => {
      isConnected = false;
      const index = sseClients.findIndex(client => client.id === clientId);
      if (index !== -1) {
        sseClients.splice(index, 1);
      }
      console.log(`📡 Client ${clientId} disconnected from funding stream (${sseClients.length} remaining)`);
    });
    
    // Keep connection alive with heartbeats every 15 seconds
    while (isConnected) {
      try {
        await stream.sleep(15000); // Sleep for 15 seconds (per audit requirement)
        
        if (!isConnected) break;
        
        // Send SSE comment as keepalive (browsers recognize this)
        await stream.writeSSE({
          data: JSON.stringify({ 
            type: "heartbeat", 
            timestamp: new Date().toISOString(),
            clients: sseClients.length 
          }),
          event: "heartbeat",
        });
        console.log(`💓 Heartbeat sent to client ${clientId}`);
      } catch (error) {
        console.error(`❌ Error in heartbeat loop for client ${clientId}:`, error);
        isConnected = false;
        break;
      }
    }
    
    console.log(`🔌 Stream ended for client ${clientId}`);
  });
});

// ============================================================================
// WALLET BALANCE & MARKET DATA ENDPOINTS (for Investment Dashboard)
// ============================================================================

// Token addresses on Fraxtal (Chain ID: 252)
const FRAXTAL_TOKEN_ADDRESSES = {
  frxETH: "0xFC00000000000000000000000000000000000005",
  sfrxETH: "0xFC00000000000000000000000000000000000008",
  frxUSD: "0xfc00000000000000000000000000000000000001",
  sfrxUSD: "0xfc00000000000000000000000000000000000009",
};

// GET /api/wallet/:address/balances - Get wallet token balances
app.get("/api/wallet/:address/balances", async (c) => {
  const address = c.req.param("address");
  
  try {
    // Fetch wallet balances using executionTools
    const walletResult = await getAgentWalletFn();
    const walletData = JSON.parse(walletResult);
    
    // Get current ETH price for USD calculations
    let ethPrice = 3850; // Default
    let fraxPrice = 0.82; // Default FRAX price
    try {
      const priceResponse = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum,frax&vs_currencies=usd");
      const priceData = await priceResponse.json() as { ethereum?: { usd?: number }; frax?: { usd?: number } };
      ethPrice = priceData?.ethereum?.usd || 3850;
      fraxPrice = priceData?.frax?.usd || 0.82;
    } catch (e) {
      console.log("Using default ETH/FRAX price");
    }
    
    // Parse balances from the wallet data
    const nativeFrax = parseFloat(walletData.balances?.FRAX_native || "0");
    const frxETH = parseFloat(walletData.balances?.frxETH || "0");
    const sfrxETH = parseFloat(walletData.balances?.sfrxETH || "0");
    const frxUSD = parseFloat(walletData.balances?.frxUSD || "0");
    const sfrxUSD = parseFloat(walletData.balances?.sfrxUSD || "0");
    const wfrax = parseFloat(walletData.balances?.WFRAX || "0");
    
    return c.json({
      address: walletData.address,
      frax: {
        balance: nativeFrax.toFixed(6),
        balanceUSD: nativeFrax * fraxPrice,
      },
      frxeth: {
        balance: frxETH.toFixed(6),
        balanceUSD: frxETH * ethPrice,
      },
      sfrxeth: {
        balance: sfrxETH.toFixed(6),
        balanceUSD: sfrxETH * ethPrice,
        apy: 5.2 + (Math.random() * 0.3 - 0.15), // Simulated dynamic APY
      },
      frxusd: {
        balance: frxUSD.toFixed(6),
        balanceUSD: frxUSD, // frxUSD is pegged to $1
      },
      sfrxusd: {
        balance: sfrxUSD.toFixed(6),
        balanceUSD: sfrxUSD, // sfrxUSD is pegged to ~$1.17 (includes yield)
        apy: 4.1 + (Math.random() * 0.2 - 0.1), // Simulated dynamic APY
      },
      wfrax: {
        balance: wfrax.toFixed(6),
        balanceUSD: wfrax * fraxPrice,
      },
      totalUSD: (nativeFrax + wfrax) * fraxPrice + (frxETH + sfrxETH) * ethPrice + frxUSD + sfrxUSD,
      ethPrice,
      fraxPrice,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching wallet balances:", error);
    return c.json(
      { error: "Failed to fetch balances", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// GET /api/market/data - Get market data (ETH price, gas, sentiment)
app.get("/api/market/data", async (c) => {
  try {
    // Fetch ETH price from CoinGecko
    let ethPrice = 3850;
    let ethChange24h = 0;
    
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true");
      const data = await response.json() as { ethereum?: { usd?: number; usd_24h_change?: number } };
      ethPrice = data?.ethereum?.usd || 3850;
      ethChange24h = data?.ethereum?.usd_24h_change || 0;
    } catch (e) {
      console.log("Using default market data");
    }
    
    // Get block number from Fraxtal
    let blockNumber = 28932662;
    try {
      const blockResponse = await fetch("https://rpc.frax.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });
      const blockData = await blockResponse.json() as { result?: string };
      blockNumber = parseInt(blockData?.result || "0x1B9AEDA", 16);
    } catch (e) {
      console.log("Using default block number");
    }
    
    // Calculate sentiment based on 24h change
    let sentiment: "bullish" | "bearish" | "neutral" = "neutral";
    let sentimentScore = 50;
    if (ethChange24h > 2) {
      sentiment = "bullish";
      sentimentScore = Math.min(85, 50 + ethChange24h * 5);
    } else if (ethChange24h < -2) {
      sentiment = "bearish";
      sentimentScore = Math.max(15, 50 + ethChange24h * 5);
    } else {
      sentimentScore = 50 + ethChange24h * 5;
    }
    
    return c.json({
      ethPrice,
      ethChange24h,
      gasPrice: 0.0001 + Math.random() * 0.0001, // Fraxtal has very low gas
      blockNumber,
      sentiment,
      sentimentScore: Math.round(sentimentScore),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching market data:", error);
    return c.json(
      { error: "Failed to fetch market data", details: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});

// ============================================================================
// POST /api/withdraw - Withdraw all funds to a recipient address
// ============================================================================
app.post("/api/withdraw", async (c) => {
  try {
    const body = await c.req.json();
    const { recipientAddress } = body;

    // Validate recipient address
    if (!recipientAddress || !/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)) {
      return c.json({
        success: false,
        error: "Invalid recipient address. Must be a valid Ethereum address (0x...)",
      }, 400);
    }

    console.log("\n💸 ====== WITHDRAW REQUEST RECEIVED ======");
    console.log(`📤 Recipient: ${recipientAddress}`);

    // Execute withdrawal with SSE broadcaster for real-time updates
    const result = await withdrawAllFundsToRecipient(recipientAddress, broadcastFundingUpdate);

    if (result.success) {
      return c.json({
        success: true,
        message: "Withdrawal completed successfully",
        result,
      });
    } else {
      return c.json({
        success: false,
        message: "Withdrawal failed or partially completed",
        result,
      }, 500);
    }
  } catch (error) {
    console.error("Withdraw error:", error);
    return c.json({
      success: false,
      error: "Failed to process withdrawal",
      details: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});

// ============================================================================
// AUTONOMOUS WATCHER LOOP (Phase 9 - Smart Invest Edition)
// ============================================================================
// Modes:
// 1. SMART_INVEST: When native FRAX is deposited, split and invest based on strategy
// 2. LEGACY_MICRO: When frxETH is deposited, stake directly into sfrxETH
// ============================================================================

// Configuration: Set to true for Smart Invest (FRAX deposits), false for legacy micro-investment
const USE_SMART_INVEST = true;
let lastKnownFraxBalance = "0"; // Track native FRAX balance for Smart Invest mode

async function autonomousWatcherLoop() {
  try {
    // Step 1: Check Agent Wallet Balance
    const walletResult = await getAgentWalletFn();
    const walletData = JSON.parse(walletResult);
    
    if (walletData.execution_capable) {
      const frxethBalance = parseFloat(walletData.balances.frxETH || "0");
      const fraxBalance = parseFloat(walletData.balances.FRAX_native || "0");
      
      // DEBUG: Log balance check details
      console.log(`[WATCHER DEBUG] Native FRAX: ${fraxBalance.toFixed(6)} | frxETH: ${frxethBalance.toFixed(6)}`);
      console.log(`[WATCHER DEBUG] Smart Invest Mode: ${USE_SMART_INVEST} | Investing: ${isInvesting} | Executed: ${investmentExecuted}`);

      // ======================================================================
      // SMART INVEST MODE: Detect native FRAX deposits
      // ======================================================================
      if (USE_SMART_INVEST) {
        // Initialize lastKnownFraxBalance on first run
        if (lastKnownFraxBalance === "0" && fraxBalance > 0) {
          lastKnownFraxBalance = fraxBalance.toString();
          addWatcherLog("info", `🔄 Tracking FRAX: ${fraxBalance.toFixed(6)} (no auto-invest on restart)`);
        }

        // Detect FRAX deposit and trigger Smart Invest
        const fraxIncreased = fraxBalance > parseFloat(lastKnownFraxBalance);
        const aboveThreshold = fraxBalance > 0.2;
        
        if (fraxIncreased && aboveThreshold && !isInvesting && !investmentExecuted) {
          isInvesting = true;
          const depositAmount = fraxBalance - parseFloat(lastKnownFraxBalance);
          const previousBalance = lastKnownFraxBalance;
          lastKnownFraxBalance = fraxBalance.toString();
          
          addWatcherLog("success", `💰 FRAX DETECTED: +${depositAmount.toFixed(6)} (Total: ${fraxBalance.toFixed(6)})`);
          
          // === BROADCAST: DEPOSIT_DETECTED (Step 0 - Trigger UI activation) ===
          broadcastFundingUpdate({
            type: "DEPOSIT_DETECTED",
            status: "DEPOSIT_DETECTED",
            amount: fraxBalance.toFixed(6),
            message: `Detected ${depositAmount.toFixed(6)} FRAX deposit. Starting Smart Invest sequence...`,
            timestamp: new Date().toISOString(),
          });
          
          const userStrategy = strategyManager.getStrategy(walletData.address);
          addWatcherLog("info", `📊 Strategy: ${userStrategy.name} (${userStrategy.stablePercent}%/${userStrategy.volatilePercent}%)`);
          
          try {
            const result = await executeInvestmentSequence(walletData.address, parseEther(fraxBalance.toString()));
            
            if (result.status === "SUCCESS") {
              addWatcherLog("success", `✅ SMART INVEST COMPLETE!`);
              addWatcherLog("info", `💵 Stable: ${result.allocation.stableAmount} → sfrxUSD (~5% APY)`);
              addWatcherLog("info", `📈 Volatile: ${result.allocation.volatileAmount} → sfrxETH (~8-12% APY)`);
              Object.entries(result.transactions).forEach(([key, tx]) => {
                if (tx && typeof tx === 'object' && 'hash' in tx) {
                  addWatcherLog("success", `🔗 ${key}: ${(tx as any).hash}`);
                }
              });
              investmentExecuted = true;
              
              // === BROADCAST: INVESTMENT_COMPLETE (Final event) ===
              broadcastFundingUpdate({
                type: "INVESTMENT_COMPLETE",
                status: "INVESTED",
                amount: result.allocation.investableAmount,
                message: `Smart Invest complete! ${result.strategy.stablePercent}% sfrxUSD (~5% APY), ${result.strategy.volatilePercent}% sfrxETH (~8-12% APY)`,
                timestamp: new Date().toISOString(),
              });
            } else {
              addWatcherLog("warning", `⚠️ ${result.status}: ${result.error || 'Unknown error'}`);
              lastKnownFraxBalance = previousBalance;
              
              // === BROADCAST: FAILED ===
              broadcastFundingUpdate({
                type: "log",
                status: "Failed",
                message: `Smart Invest failed: ${result.error || result.status}`,
                timestamp: new Date().toISOString(),
              });
            }
          } catch (error) {
            addWatcherLog("critical", `❌ SMART INVEST FAILED: ${error}`);
            lastKnownFraxBalance = previousBalance;
            
            // === BROADCAST: FAILED ===
            broadcastFundingUpdate({
              type: "log",
              status: "Failed",
              message: `Smart Invest failed: ${error instanceof Error ? error.message : String(error)}`,
              timestamp: new Date().toISOString(),
            });
          } finally {
            isInvesting = false;
          }
        } else if (investmentExecuted && Math.random() < 0.1) {
          addWatcherLog("info", `✅ Invested | FRAX: ${fraxBalance.toFixed(4)} | Earning yield`);
        }
      }
      // ======================================================================
      // LEGACY MODE: Detect frxETH deposits
      // ======================================================================
      else {
        if (lastKnownBalance === "0" && frxethBalance > 0) {
          lastKnownBalance = frxethBalance.toString();
        }
        
        if (frxethBalance > 0.0001 && frxethBalance > parseFloat(lastKnownBalance) && !isInvesting && !investmentExecuted) {
          isInvesting = true;
          const depositAmount = frxethBalance - parseFloat(lastKnownBalance);
          lastKnownBalance = frxethBalance.toString();
          
          addWatcherLog("success", `� frxETH DETECTED: +${depositAmount.toFixed(6)}`);
          broadcastFundingUpdate({ type: "funding_update", status: "DEPOSIT_DETECTED", amount: frxethBalance.toFixed(6), timestamp: new Date().toISOString() });
          
          try {
            const investResult = await executeRealMicroInvestmentFn();
            const investData = JSON.parse(investResult);
            if (investData.status === "SUCCESS") {
              addWatcherLog("success", `✅ MICRO-INVEST COMPLETE: ${investData.invested_amount} frxETH → sfrxETH`);
              investmentExecuted = true;
              broadcastFundingUpdate({ type: "funding_update", status: "INVESTED", amount: investData.invested_amount, tx: investData.transactions.deposit.hash, timestamp: new Date().toISOString() });
            }
          } catch (error) {
            addWatcherLog("critical", `❌ MICRO-INVEST FAILED: ${error}`);
          } finally {
            isInvesting = false;
          }
        }
      }
      
      // Monitoring
      if (Math.random() < 0.15) {
        addWatcherLog("info", `📊 ${fraxBalance.toFixed(4)} FRAX | ${frxethBalance.toFixed(6)} frxETH | Yield: ${current_yield}%`);
      }
    } else if (Math.random() < 0.2) {
      addWatcherLog("info", `📊 DEMO MODE: Set AGENT_PRIVATE_KEY for live execution`);
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
// RAILWAY-ONLY DEPLOYMENT
// ============================================================================
// This backend is NOT deployed to Vercel.
// It runs ONLY on Railway as a persistent Node.js server.
// 
// The frontend (deployed on Vercel) must call Railway API endpoints directly:
//   https://storyvalut-steward-production.up.railway.app/api/chat
//
// Features that require persistent server (NOT compatible with serverless):
// - Autonomous watcher loop (setInterval every 5 seconds)
// - SSE streaming connections (long-lived connections)
// - In-memory session storage (sessions Map)
// - Rate limiting state (rateLimitMap)
//
// DO NOT add Vercel serverless exports here. They would cause:
// - Watcher loop to restart on every request
// - SSE connections to timeout
// - Session state to be lost between requests
// ============================================================================
