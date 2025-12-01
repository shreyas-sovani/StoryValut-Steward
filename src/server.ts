import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { streamSSE } from "hono/streaming";
import { createStoryStewardAgent } from "./agent.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * StoryVault Steward API Server
 * Exposes the agent as a REST API with SSE streaming for real-time responses
 */

const app = new Hono();

// Store agent runners by session
const sessions = new Map<string, any>();

// CORS configuration for frontend
// Allow localhost (development) and Vercel (production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  /https:\/\/.*\.vercel\.app$/,  // Any Vercel deployment
  "https://story-valut-steward.vercel.app",  // Your production domain
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
