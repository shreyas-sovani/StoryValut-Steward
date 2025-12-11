// ============================================================================
// RAILWAY BACKEND URL
// ============================================================================
// The backend runs ONLY on Railway (persistent Node.js server).
// It is NOT deployed to Vercel serverless.
// 
// In production, this points directly to Railway.
// In development, use localhost:3001 (set NEXT_PUBLIC_API_URL in .env.local)
// ============================================================================
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === "production" 
    ? "https://storyvalut-steward-production.up.railway.app" 
    : "http://localhost:3001");

// ============================================================================
// CLIENT-SIDE RATE LIMITING / IN-FLIGHT PROTECTION
// ============================================================================
// Prevents multiple concurrent chat requests and spamming the backend.
// Only one request can be in-flight at a time.
// ============================================================================
let chatInFlight = false;
let chatRequestCounter = 0;

function generateChatRequestId(): string {
  chatRequestCounter++;
  return `chat_${Date.now()}_${chatRequestCounter}`;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SSEEvent {
  type: "start" | "content" | "end" | "error";
  content?: string;
  timestamp: string;
  error?: string;
}

export interface SimpleChatResponse {
  response: string;
  sessionId: string;
  timestamp: string;
}

/**
 * INTERNAL: Send a chat message with SSE streaming (raw, no guards)
 * Use sendChatMessageSafe instead for user-facing calls.
 */
async function _sendChatMessageInternal(
  message: string,
  sessionId: string,
  onChunk: (chunk: SSEEvent) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    // Get captcha token from window if available
    const captchaToken = (typeof window !== "undefined" && (window as any).lastCaptchaToken) 
      ? (window as any).lastCaptchaToken 
      : undefined;
    
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId, captchaToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is null");
    }

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            onComplete();
            return;
          }

          try {
            const event: SSEEvent = JSON.parse(data);
            onChunk(event);
          } catch (e) {
            console.error("Failed to parse SSE event:", e);
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error.message : "Unknown error");
  }
}

/**
 * SAFE: Send a chat message with SSE streaming.
 * 
 * Enforces client-side rate limiting:
 * - Only 1 in-flight request at a time
 * - Ignores new calls if one is already in progress
 * - Logs request ID, caller, and timestamp for debugging
 * 
 * @param message - The user message to send
 * @param sessionId - The session ID for conversation context
 * @param callerName - A label identifying which component is calling (for debugging)
 * @param onChunk - Callback for SSE chunks
 * @param onComplete - Callback when streaming is complete
 * @param onError - Callback for errors
 */
export async function sendChatMessageSafe(
  message: string,
  sessionId: string,
  callerName: string,
  onChunk: (chunk: SSEEvent) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> {
  const requestId = generateChatRequestId();
  const timestamp = new Date().toISOString();
  
  // ============================================================================
  // CLIENT-SIDE RATE LIMIT: Only 1 in-flight request at a time
  // ============================================================================
  if (chatInFlight) {
    console.warn(`🚫 [${requestId}] [${callerName}] [session:${sessionId}] Chat request BLOCKED - another request already in flight`);
    onError("Another chat request is already in progress. Please wait.");
    return;
  }
  
  // Log caller tag and sessionId for linking frontend actions to server logs
  console.log(`📤 [${requestId}] [${callerName}] [session:${sessionId}] Sending chat request at ${timestamp}`);
  console.log(`   Message preview: "${message.slice(0, 50)}${message.length > 50 ? '...' : ''}"`);
  
  chatInFlight = true;
  
  try {
    await _sendChatMessageInternal(
      message,
      sessionId,
      onChunk,
      () => {
        chatInFlight = false;
        console.log(`✅ [${requestId}] [${callerName}] [session:${sessionId}] Chat request COMPLETED`);
        onComplete();
      },
      (error) => {
        chatInFlight = false;
        console.error(`❌ [${requestId}] [${callerName}] [session:${sessionId}] Chat request FAILED:`, error);
        onError(error);
      }
    );
  } catch (error) {
    chatInFlight = false;
    console.error(`❌ [${requestId}] [${callerName}] [session:${sessionId}] Chat request EXCEPTION:`, error);
    onError(error instanceof Error ? error.message : "Unknown error");
  }
}

/**
 * @deprecated Use sendChatMessageSafe instead for better rate limiting.
 * This function is kept for backward compatibility but will be removed.
 */
export async function sendChatMessage(
  message: string,
  sessionId: string,
  onChunk: (chunk: SSEEvent) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> {
  // Redirect to safe version with a generic caller name
  // Disabled to prevent background /api/chat spam – only user-driven calls allowed.
  console.warn("⚠️ sendChatMessage is deprecated. Use sendChatMessageSafe with a callerName for debugging.");
  return sendChatMessageSafe(message, sessionId, "DEPRECATED_CALLER", onChunk, onComplete, onError);
}

/**
 * SAFE: Send a chat message without streaming (simple mode)
 * Enforces client-side rate limiting like sendChatMessageSafe.
 * 
 * @param message - The user message to send
 * @param sessionId - The session ID for conversation context
 * @param callerName - A label identifying which component is calling (for debugging)
 */
export async function sendSimpleChatMessageSafe(
  message: string,
  sessionId: string = "default",
  callerName: string = "UNKNOWN"
): Promise<SimpleChatResponse> {
  const requestId = generateChatRequestId();
  const timestamp = new Date().toISOString();
  
  // CLIENT-SIDE RATE LIMIT: Only 1 in-flight request at a time
  if (chatInFlight) {
    console.warn(`🚫 [${requestId}] [${callerName}] [session:${sessionId}] Simple chat request BLOCKED - another request already in flight`);
    throw new Error("Another chat request is already in progress. Please wait.");
  }
  
  // Log caller tag and sessionId for linking frontend actions to server logs
  console.log(`📤 [${requestId}] [${callerName}] [session:${sessionId}] Sending simple chat request at ${timestamp}`);
  console.log(`   Message preview: "${message.slice(0, 50)}${message.length > 50 ? '...' : ''}"`);
  
  chatInFlight = true;
  
  try {
    // Get captcha token from window if available
    const captchaToken = (typeof window !== "undefined" && (window as any).lastCaptchaToken) 
      ? (window as any).lastCaptchaToken 
      : undefined;
    
    const response = await fetch(`${API_BASE_URL}/api/chat/simple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId, captchaToken }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`✅ [${requestId}] [${callerName}] [session:${sessionId}] Simple chat request COMPLETED`);
    return response.json();
  } finally {
    chatInFlight = false;
  }
}

/**
 * @deprecated Use sendSimpleChatMessageSafe instead for better rate limiting.
 */
export async function sendSimpleChatMessage(
  message: string,
  sessionId: string = "default"
): Promise<SimpleChatResponse> {
  console.warn("⚠️ sendSimpleChatMessage is deprecated. Use sendSimpleChatMessageSafe with a callerName.");
  return sendSimpleChatMessageSafe(message, sessionId, "DEPRECATED_CALLER");
}

/**
 * Get list of active sessions
 */
export async function getSessions(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/sessions`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.sessions;
}

/**
 * Delete a session
 */
export async function deleteSession(sessionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/session/${sessionId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<{
  status: string;
  service: string;
  version: string;
  fraxtal: { chain_id: number; rpc: string };
}> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Rebalance result from backend
 */
export interface RebalanceResult {
  status: "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "DEMO_MODE" | "SKIPPED";
  mockVolatility: number;
  mockApyBefore: { sfrxETH: number; sfrxUSD: number };
  mockApyAfter: { sfrxETH: number; sfrxUSD: number };
  agentReasoning: string;
  rebalanceAmount: string;
  rebalancePercent: number;
  transactions: {
    swapSfrxETHToFrxETH?: { hash: string; block: string; explorer: string };
    swapFrxETHToWFRAX?: { hash: string; block: string; explorer: string };
    swapWFRAXToFrxUSD?: { hash: string; block: string; explorer: string };
    stakeFrxUSDToSfrxUSD?: { hash: string; block: string; explorer: string };
  };
  balancesBefore: { sfrxETH: string; sfrxUSD: string };
  balancesAfter: { sfrxETH: string; sfrxUSD: string };
  error?: string;
  logs: string[];
}

export interface RebalanceResponse {
  success: boolean;
  agentReasoning: string;
  rebalanceResult: RebalanceResult;
  timestamp: string;
  error?: string;
}

/**
 * Trigger a market crash simulation and rebalance
 * @param mockVol - Mock volatility (0.20 = 20%, triggers rebalance if > 0.15)
 */
export async function triggerRebalance(mockVol: number = 0.20): Promise<RebalanceResponse> {
  const response = await fetch(`${API_BASE_URL}/api/rebalance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mockVol }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}
