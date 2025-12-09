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
 * Send a chat message with SSE streaming
 */
export async function sendChatMessage(
  message: string,
  sessionId: string,
  onChunk: (chunk: SSEEvent) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId }),
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
 * Send a chat message without streaming (simple mode)
 */
export async function sendSimpleChatMessage(
  message: string,
  sessionId: string = "default"
): Promise<SimpleChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat/simple`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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
