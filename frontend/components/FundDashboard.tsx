"use client";

import { useState, useEffect, useRef } from "react";
import { Flame, Wallet, Activity, AlertTriangle, CheckCircle, Info, Copy, QrCode, DollarSign, Zap, MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendChatMessageSafe, type ChatMessage, type SSEEvent } from "@/lib/api";

// Railway backend URL (NOT Vercel serverless)
const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === "production" 
    ? "https://storyvalut-steward-production.up.railway.app" 
    : "http://localhost:3001");

interface WatcherLog {
  timestamp: string;
  type: "info" | "warning" | "critical" | "success";
  message: string;
}

interface FundingUpdate {
  type: "funding_update";
  status: "WAITING" | "DEPOSIT_DETECTED" | "INVESTED" | "EVACUATED";
  amount?: string;
  tx?: string;
  timestamp: string;
}

interface FundDashboardProps {
  agentAddress?: string;
  onSimulateCrash?: () => void;
  sessionId?: string;
}

export default function FundDashboard({
  agentAddress = "0xDEMO...ADDRESS",
  onSimulateCrash,
  sessionId = "fund-dashboard-session",
}: FundDashboardProps) {
  const [logs, setLogs] = useState<WatcherLog[]>([]);
  const [balance, setBalance] = useState("0");
  const [yield_rate, setYieldRate] = useState(4.5);
  const [copied, setCopied] = useState(false);
  const [fundingStatus, setFundingStatus] = useState<"WAITING" | "DEPOSIT_DETECTED" | "INVESTED" | "EVACUATED">("WAITING");
  const [lastTx, setLastTx] = useState<string | null>(null);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [scanCount, setScanCount] = useState(0);
  
  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // SSE for real-time funding updates
  useEffect(() => {
    const eventSource = new EventSource(
      `${API_BASE_URL}/api/funding/stream`
    );

    eventSource.addEventListener("funding_update", (event) => {
      const data: FundingUpdate = JSON.parse(event.data);
      console.log("📡 Funding update:", data);
      
      setFundingStatus(data.status);
      if (data.tx) {
        setLastTx(data.tx);
      }
      if (data.amount) {
        setBalance(data.amount);
      }
      
      // Track metrics
      if (data.status === "DEPOSIT_DETECTED") {
        setTotalDeposits(prev => prev + 1);
      }
      if (data.status === "EVACUATED") {
        setTotalWithdrawals(prev => prev + 1);
      }
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Fetch watcher status periodically
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/watcher/status`);
        if (res.ok) {
          const data = await res.json();
          setYieldRate(data.current_yield);
          setBalance(data.last_known_balance || "0");
          if (data.recent_logs) {
            setLogs(data.recent_logs);
            setScanCount(prev => prev + 1); // Increment on each status fetch
          }
        }
      } catch (error) {
        console.error("Failed to fetch watcher status:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Poll every 2s

    return () => clearInterval(interval);
  }, []);

  const handleSimulateCrash = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/simulate/crash`, {
        method: "POST",
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log("Crash simulated:", data);
        onSimulateCrash?.();
      }
    } catch (error) {
      console.error("Failed to simulate crash:", error);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(agentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    let fullResponse = "";

    // User-driven chat call - triggered by explicit button press in FundDashboard chat widget
    await sendChatMessageSafe(
      userMessage.content,
      sessionId,
      "FundDashboard:handleChatSend",
      (chunk: SSEEvent) => {
        if (chunk.type === "content" && chunk.content) {
          fullResponse += chunk.content;
          // Update the last message or create a new streaming message
          setChatMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.role === "assistant" && !lastMsg.timestamp.includes("T")) {
              // Update streaming message (temporary timestamp)
              return [...prev.slice(0, -1), { ...lastMsg, content: fullResponse }];
            } else {
              // Create new streaming message with temp timestamp
              return [...prev, { role: "assistant", content: fullResponse, timestamp: "streaming" }];
            }
          });
        }
      },
      () => {
        // onComplete
        setChatMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { ...lastMsg, content: fullResponse, timestamp: new Date().toISOString() },
            ];
          }
          return prev;
        });
        setChatLoading(false);
      },
      (error: string) => {
        // onError
        console.error("Chat error:", error);
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            timestamp: new Date().toISOString(),
          },
        ]);
        setChatLoading(false);
      }
    );
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatOpen]);

  const healthStatus = yield_rate >= 3.5 ? "healthy" : yield_rate >= 2.0 ? "warning" : "critical";

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-black text-green-400 font-mono p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-2">
              🤖 AUTONOMOUS HEDGE FUND TERMINAL
            </h1>
            <p className="text-green-600">Phase 8: Server-Side Execution • Demo God Mode</p>
          </div>
          
          {/* Status Badge */}
          <div
            className={cn(
              "px-6 py-3 rounded-lg border-2 font-bold text-lg",
              healthStatus === "healthy" && "border-green-500 bg-green-500/10 text-green-400",
              healthStatus === "warning" && "border-yellow-500 bg-yellow-500/10 text-yellow-400",
              healthStatus === "critical" && "border-red-500 bg-red-500/10 text-red-400 animate-pulse"
            )}
          >
            {healthStatus === "healthy" && "✅ SYSTEM HEALTHY"}
            {healthStatus === "warning" && "⚠️ MONITORING"}
            {healthStatus === "critical" && "🚨 CRITICAL ALERT"}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Wallet Card */}
          <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-green-400">AGENT WALLET</h2>
            </div>
            
            <div className="space-y-4">
              {/* Address */}
              <div>
                <div className="text-xs text-green-600 mb-1">PUBLIC ADDRESS</div>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-green-400 break-all flex-1">
                    {agentAddress}
                  </code>
                  <button
                    onClick={handleCopyAddress}
                    className="p-2 hover:bg-green-500/20 rounded transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-green-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-3 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${agentAddress}`}
                  alt="Agent Wallet QR"
                  className="w-full"
                />
              </div>

              {/* Balance */}
              <div>
                <div className="text-xs text-green-600 mb-1">FRAX BALANCE</div>
                <div className="text-2xl font-bold text-green-400">
                  {parseFloat(balance).toFixed(4)} FRAX
                </div>
              </div>

              {/* Instructions */}
              <div className="text-xs text-green-600 bg-black/50 p-3 rounded">
                📤 Send FRAX to this address and the Agent will auto-invest
              </div>
            </div>
          </div>

          {/* Funding Status Card - NEW! */}
          <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-green-400">FUNDING STATUS</h2>
            </div>
            
            <div className="space-y-6">
              {/* State 1: Waiting for Deposit */}
              {fundingStatus === "WAITING" && (
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    WAITING FOR DEPOSIT
                  </div>
                  <div className="text-sm text-green-600">
                    Send FRAX to the address above
                  </div>
                  <div className="text-xs text-green-700 mt-2">
                    Auto-invest triggers at &gt;0.01 FRAX (testing mode)
                  </div>
                </div>
              )}

              {/* State 2: Deposit Detected */}
              {fundingStatus === "DEPOSIT_DETECTED" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-ping">
                    <DollarSign className="w-10 h-10 text-black" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-2 animate-pulse">
                    💰 PAYMENT RECEIVED!
                  </div>
                  <div className="text-lg text-green-500">
                    {balance} FRAX detected
                  </div>
                  <div className="text-sm text-green-600 mt-2">
                    Executing auto-invest strategy...
                  </div>
                </div>
              )}

              {/* State 3: Invested */}
              {fundingStatus === "INVESTED" && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    ✅ ASSETS DEPLOYED
                  </div>
                  <div className="text-sm text-green-500 mb-3">
                    Funds invested in sFRAX
                  </div>
                  {lastTx && lastTx !== "DEMO_MODE" && (
                    <a
                      href={`https://fraxscan.com/tx/${lastTx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 hover:text-green-400 underline"
                    >
                      View on Fraxscan →
                    </a>
                  )}
                  {lastTx === "DEMO_MODE" && (
                    <div className="text-xs text-yellow-600">
                      (Demo Mode - Set AGENT_PRIVATE_KEY for real execution)
                    </div>
                  )}
                </div>
              )}

              {/* State 4: Evacuated */}
              {fundingStatus === "EVACUATED" && (
                <div className="text-center py-8">
                  <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                  <div className="text-2xl font-bold text-red-400 mb-2">
                    🚨 FUNDS EVACUATED
                  </div>
                  <div className="text-sm text-red-500 mb-3">
                    Emergency withdrawal executed
                  </div>
                  <div className="text-xs text-green-600">
                    Assets secured in FRAX safety mode
                  </div>
                  {lastTx && lastTx !== "DEMO_MODE" && (
                    <a
                      href={`https://fraxscan.com/tx/${lastTx}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-red-600 hover:text-red-400 underline mt-2 block"
                    >
                      View evacuation TX →
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Live Stats Card */}
          <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-green-400">LIVE METRICS</h2>
            </div>
            
            <div className="space-y-6">
              {/* Current Yield */}
              <div>
                <div className="text-xs text-green-600 mb-2">CURRENT YIELD</div>
                <div
                  className={cn(
                    "text-4xl font-bold",
                    yield_rate >= 3.5 && "text-green-400",
                    yield_rate >= 2.0 && yield_rate < 3.5 && "text-yellow-400",
                    yield_rate < 2.0 && "text-red-400 animate-pulse"
                  )}
                >
                  {yield_rate.toFixed(1)}%
                </div>
                <div className="text-xs text-green-600 mt-1">APY on Fraxtal</div>
              </div>

              {/* Status Indicators */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">Auto-Invest:</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">Protection:</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    ARMED
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">Network:</span>
                  <span className="text-green-400">Fraxtal L2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600">Chain ID:</span>
                  <span className="text-green-400">252</span>
                </div>
              </div>

              {/* Thresholds */}
              <div className="text-xs text-green-600 bg-black/50 p-3 rounded space-y-1">
                <div>⚡ Auto-Invest: {">"}0.01 FRAX (test mode)</div>
                <div>🚨 Evacuate: {"<"}2.0% Yield</div>
              </div>
            </div>
          </div>

          {/* Demo Controls Card */}
          <div className="bg-gray-900 border-2 border-red-500 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-red-400">DEMO CONTROLS</h2>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-green-600 mb-4">
                Trigger a simulated market crash to watch the Agent autonomously
                evacuate funds in real-time.
              </div>

              {/* The Fire Button */}
              <button
                onClick={handleSimulateCrash}
                className={cn(
                  "w-full py-4 px-6 rounded-lg font-bold text-lg transition-all",
                  "bg-gradient-to-r from-red-600 to-orange-600",
                  "hover:from-red-500 hover:to-orange-500",
                  "border-2 border-red-400",
                  "text-white shadow-lg shadow-red-500/50",
                  "flex items-center justify-center gap-3",
                  "transform hover:scale-105 active:scale-95"
                )}
              >
                <Flame className="w-6 h-6 animate-pulse" />
                🔥 SIMULATE YIELD CRASH
                <Flame className="w-6 h-6 animate-pulse" />
              </button>

              {/* Warning */}
              <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 p-3 rounded border border-red-500/30">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">DEMO MODE WARNING</div>
                  <div>
                    This will drop yield to 1.5% and trigger autonomous evacuation.
                    Watch the terminal logs below for real-time execution.
                  </div>
                </div>
              </div>

              {/* What Happens */}
              <div className="text-xs text-green-600 bg-black/50 p-3 rounded space-y-1">
                <div className="font-bold text-green-400 mb-2">What Happens:</div>
                <div>1. Yield drops to 1.5%</div>
                <div>2. Agent detects crisis</div>
                <div>3. Emergency withdrawal executes</div>
                <div>4. Funds secured in FRAX</div>
                <div>5. Auto-recovery after 15s</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Scans */}
          <div className="bg-gray-900 border-2 border-green-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-green-400" />
              <div className="text-xs text-green-600">TOTAL SCANS</div>
            </div>
            <div className="text-3xl font-bold text-green-400">{scanCount}</div>
            <div className="text-xs text-green-600 mt-1">Every 5 seconds</div>
          </div>

          {/* Deposits */}
          <div className="bg-gray-900 border-2 border-blue-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <div className="text-xs text-blue-600">DEPOSITS DETECTED</div>
            </div>
            <div className="text-3xl font-bold text-blue-400">{totalDeposits}</div>
            <div className="text-xs text-blue-600 mt-1">Auto-invested</div>
          </div>

          {/* Withdrawals */}
          <div className="bg-gray-900 border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="text-xs text-red-600">EMERGENCY EXITS</div>
            </div>
            <div className="text-3xl font-bold text-red-400">{totalWithdrawals}</div>
            <div className="text-xs text-red-600 mt-1">Crisis evacuations</div>
          </div>

          {/* Current Yield */}
          <div className="bg-gray-900 border-2 border-yellow-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div className="text-xs text-yellow-600">CURRENT YIELD</div>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{yield_rate.toFixed(2)}%</div>
            <div className={cn(
              "text-xs mt-1",
              yield_rate >= 3.5 ? "text-green-400" : yield_rate >= 2.0 ? "text-yellow-400" : "text-red-400"
            )}>
              {yield_rate >= 3.5 ? "✓ Healthy" : yield_rate >= 2.0 ? "⚠ Warning" : "🚨 Critical"}
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="mt-6 bg-gray-900 border-2 border-green-500 rounded-lg overflow-hidden">
          <div className="bg-green-500 text-black px-4 py-2 flex items-center gap-3">
            <Activity className="w-5 h-5" />
            <span className="font-bold">LIVE ACTIVITY FEED</span>
            <div className="ml-auto flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          <div className="p-4 h-64 overflow-y-auto bg-black">
            {logs.length === 0 ? (
              <div className="text-green-600 text-sm">
                <div className="animate-pulse">Initializing autonomous watcher...</div>
              </div>
            ) : (
              <div className="space-y-1 text-sm">
                {logs.slice(-20).map((log, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3 py-1",
                      log.type === "critical" && "text-red-400 font-bold animate-pulse",
                      log.type === "warning" && "text-yellow-400",
                      log.type === "success" && "text-green-400",
                      log.type === "info" && "text-green-600"
                    )}
                  >
                    <span className="text-gray-600 text-xs whitespace-nowrap">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>
                    <span className="flex items-center gap-2">
                      {log.type === "critical" && <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
                      {log.type === "warning" && <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
                      {log.type === "success" && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
                      {log.type === "info" && <Info className="w-4 h-4 flex-shrink-0" />}
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-900 px-4 py-2 border-t border-green-500 text-xs text-green-600 flex items-center justify-between">
            <span>Scan Interval: 5s | Protection Armed | Auto-Invest Active</span>
            <span>Last {Math.min(logs.length, 20)} events</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-sm text-green-400">
          <div className="font-bold mb-2">🛡️ AUTONOMOUS HEDGE FUND ACTIVE</div>
          <div className="text-green-600">
            The Agent is monitoring the wallet every 5 seconds. When new FRAX arrives, it will automatically
            invest. If yield drops below 2%, it will autonomously evacuate funds to safety. This is real
            on-chain execution powered by server-side wallet signing.
          </div>
        </div>
      </div>

      {/* Floating Chat Interface */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-black p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {chatOpen && (
        <div
          className={cn(
            "fixed bottom-6 right-6 bg-gray-900 border-2 border-green-500 rounded-lg shadow-2xl z-50 flex flex-col transition-all",
            chatMinimized ? "w-80 h-14" : "w-96 h-[500px]"
          )}
        >
          {/* Chat Header */}
          <div className="bg-green-500 text-black px-4 py-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold">Chat with Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChatMinimized(!chatMinimized)}
                className="hover:bg-black/20 p-1 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:bg-black/20 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
                {chatMessages.length === 0 && (
                  <div className="text-green-600 text-sm text-center py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Ask me anything about your vault!</p>
                    <p className="text-xs mt-1">e.g., "Withdraw my funds" or "Check my balance"</p>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        msg.role === "user"
                          ? "bg-green-500 text-black"
                          : "bg-gray-800 text-green-400 border border-green-500/30"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-green-500 p-3 bg-gray-900">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleChatSend();
                      }
                    }}
                    placeholder="Type a message..."
                    disabled={chatLoading}
                    className="flex-1 bg-black border border-green-500/30 rounded px-3 py-2 text-sm text-green-400 placeholder-green-600/50 focus:outline-none focus:border-green-500"
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={chatLoading || !chatInput.trim()}
                    className={cn(
                      "bg-green-500 hover:bg-green-600 text-black p-2 rounded transition-colors",
                      (chatLoading || !chatInput.trim()) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
