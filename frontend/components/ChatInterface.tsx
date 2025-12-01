"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Activity } from "lucide-react";
import { sendChatMessage, type ChatMessage, type SSEEvent } from "@/lib/api";
import { cn } from "@/lib/utils";

interface MonitoringData {
  active: boolean;
  asset: string;
  currentYield: number;
  targetYield: number;
  yieldHistory: { timestamp: number; yield: number }[];
  lastAlert?: {
    type: "yield_alert" | "yield_recovered" | "monitoring_update";
    message: string;
    severity: "info" | "warning" | "critical";
    timestamp: string;
  };
}

interface ChatInterfaceProps {
  sessionId: string;
  onVaultDeployed?: (vaultData: any) => void;
  onMonitoringUpdate?: (monitoringData: MonitoringData) => void;
}

export default function ChatInterface({
  sessionId,
  onVaultDeployed,
  onMonitoringUpdate,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [monitoring, setMonitoring] = useState<MonitoringData>({
    active: false,
    asset: "",
    currentYield: 0,
    targetYield: 0,
    yieldHistory: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // Notify parent of monitoring updates
  useEffect(() => {
    if (monitoring.active && onMonitoringUpdate) {
      onMonitoringUpdate(monitoring);
    }
  }, [monitoring, onMonitoringUpdate]);

  // Listen for "Hire Steward" button clicks
  useEffect(() => {
    const handleHireSteward = (event: CustomEvent) => {
      const message = event.detail.message;
      // Directly trigger the send action
      const userMessage: ChatMessage = {
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setStreamingContent("");

      let fullResponse = "";

      sendChatMessage(
        message,
        sessionId,
        (chunk) => {
          if (chunk.type === "content" && chunk.content) {
            fullResponse += chunk.content;
            setStreamingContent(fullResponse);
            detectMonitoringEvent(fullResponse);
          }
        },
        () => {
          const assistantMessage: ChatMessage = {
            role: "assistant",
            content: fullResponse,
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setStreamingContent("");
          setIsLoading(false);
        },
        (error) => {
          const errorMessage: ChatMessage = {
            role: "assistant",
            content: `Error: ${error}`,
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, errorMessage]);
          setStreamingContent("");
          setIsLoading(false);
        }
      );
    };

    window.addEventListener(
      "hireSteward",
      handleHireSteward as EventListener
    );
    return () => {
      window.removeEventListener(
        "hireSteward",
        handleHireSteward as EventListener
      );
    };
  }, [sessionId]);

  // Parse monitoring events from agent responses
  const detectMonitoringEvent = (content: string) => {
    // Check for NEW Stewardship Mode activation (start_stewardship tool)
    if (content.includes("🛡️") && content.includes("STEWARDSHIP MODE ACTIVATED")) {
      const strategyMatch = content.match(/Strategy:\s*([^\n]+)/i);
      const targetAPYMatch = content.match(/Target APY:\s*([\d.]+)%/i);
      
      if (strategyMatch && targetAPYMatch) {
        // Extract asset from strategy name
        let asset = "sFRAX";
        if (strategyMatch[1].toLowerCase().includes("sfrxeth")) {
          asset = "sfrxETH";
        }
        
        const newMonitoring: MonitoringData = {
          active: true,
          asset,
          currentYield: parseFloat(targetAPYMatch[1]),
          targetYield: parseFloat(targetAPYMatch[1]),
          yieldHistory: [{ timestamp: Date.now(), yield: parseFloat(targetAPYMatch[1]) }],
        };
        setMonitoring(newMonitoring);
        return;
      }
    }
    
    // Check for OLD Stewardship Mode activation (backward compatibility)
    if (content.includes("🛡️") && content.includes("Stewardship Mode Activated")) {
      const assetMatch = content.match(/(sFRAX|sfrxETH)/i);
      const apyMatch = content.match(/Target APY:\s*([\d.]+)%/i);
      
      if (assetMatch && apyMatch) {
        const newMonitoring: MonitoringData = {
          active: true,
          asset: assetMatch[1],
          currentYield: parseFloat(apyMatch[1]),
          targetYield: parseFloat(apyMatch[1]),
          yieldHistory: [{ timestamp: Date.now(), yield: parseFloat(apyMatch[1]) }],
        };
        setMonitoring(newMonitoring);
        return;
      }
    }

    // Check for yield alerts
    if (monitoring.active && (content.includes("⚠️") || content.includes("YIELD ALERT"))) {
      const yieldMatch = content.match(/(\d+\.?\d*)%/);
      if (yieldMatch) {
        const currentYield = parseFloat(yieldMatch[1]);
        setMonitoring((prev) => ({
          ...prev,
          currentYield,
          yieldHistory: [
            ...prev.yieldHistory,
            { timestamp: Date.now(), yield: currentYield },
          ].slice(-20), // Keep last 20 data points
          lastAlert: {
            type: "yield_alert",
            message: content,
            severity: "critical",
            timestamp: new Date().toISOString(),
          },
        }));
      }
    }

    // Check for yield recovery
    if (monitoring.active && content.includes("✅") && content.includes("Recovered")) {
      const yieldMatch = content.match(/(\d+\.?\d*)%/);
      if (yieldMatch) {
        const currentYield = parseFloat(yieldMatch[1]);
        setMonitoring((prev) => ({
          ...prev,
          currentYield,
          yieldHistory: [
            ...prev.yieldHistory,
            { timestamp: Date.now(), yield: currentYield },
          ].slice(-20),
          lastAlert: {
            type: "yield_recovered",
            message: content,
            severity: "info",
            timestamp: new Date().toISOString(),
          },
        }));
      }
    }

    // Check for monitoring updates
    if (monitoring.active && content.includes("📊") && content.includes("Monitoring Update")) {
      const yieldMatch = content.match(/APY:\s*\*?\*?(\d+\.?\d*)%/);
      if (yieldMatch) {
        const currentYield = parseFloat(yieldMatch[1]);
        setMonitoring((prev) => ({
          ...prev,
          currentYield,
          yieldHistory: [
            ...prev.yieldHistory,
            { timestamp: Date.now(), yield: currentYield },
          ].slice(-20),
          lastAlert: {
            type: "monitoring_update",
            message: content,
            severity: "info",
            timestamp: new Date().toISOString(),
          },
        }));
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    let fullResponse = "";

    await sendChatMessage(
      userMessage.content,
      sessionId,
      (chunk: SSEEvent) => {
        if (chunk.type === "content" && chunk.content) {
          fullResponse += chunk.content;
          setStreamingContent(fullResponse);

          // Detect monitoring events
          detectMonitoringEvent(fullResponse);

          // Check if this looks like a vault deployment JSON or strategy recommendation
          if (
            fullResponse.includes("agent_id") &&
            fullResponse.includes("tx_hash")
          ) {
            try {
              const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const vaultData = JSON.parse(jsonMatch[0]);
                onVaultDeployed?.(vaultData);
              }
            } catch (e) {
              // Not valid JSON yet, continue streaming
            }
          }

          // Also check for strategy recommendations with portfolio composition
          // Look for mentions of sFRAX or sfrxETH with risk levels
          if (
            (fullResponse.toLowerCase().includes("sfrax") ||
              fullResponse.toLowerCase().includes("sfrxeth")) &&
            (fullResponse.toLowerCase().includes("recommend") ||
              fullResponse.toLowerCase().includes("strategy") ||
              fullResponse.toLowerCase().includes("vault"))
          ) {
            try {
              // Create a mock vault data for visualization
              const isLowRisk =
                fullResponse.toLowerCase().includes("low risk") ||
                fullResponse.toLowerCase().includes("risk-averse") ||
                fullResponse.toLowerCase().includes("conservative") ||
                fullResponse.toLowerCase().includes("sfrax vault");

              const isMediumRisk =
                fullResponse.toLowerCase().includes("medium risk") ||
                fullResponse.toLowerCase().includes("sfrxeth vault") ||
                fullResponse.toLowerCase().includes("balanced");

              if (isLowRisk || isMediumRisk) {
                const mockVaultData = {
                  agent_id: "preview_" + Date.now(),
                  tx_hash: "0x" + "0".repeat(64),
                  atp_strategy_url: "https://app.iqai.com/",
                  deployed_at: new Date().toISOString(),
                  strategy_summary: {
                    protocol: isLowRisk ? "sFRAX Vault" : "Balanced Strategy",
                    apr: isLowRisk ? "4.5%" : "3.9-4.5%",
                    risk_level: isLowRisk ? "Low" : "Medium",
                    allocation: isLowRisk
                      ? "100% Stable"
                      : "40% Stable, 60% Growth",
                  },
                  portfolio_composition: isLowRisk
                    ? [{ name: "sFRAX (Stable)", value: 100, color: "#00C49F" }]
                    : [
                        { name: "sFRAX (Stable)", value: 40, color: "#00C49F" },
                        {
                          name: "sfrxETH (Growth)",
                          value: 60,
                          color: "#FFBB28",
                        },
                      ],
                };
                onVaultDeployed?.(mockVaultData);
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      },
      () => {
        // Complete
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: fullResponse,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setStreamingContent("");
        setIsLoading(false);
      },
      (error) => {
        // Error
        const errorMessage: ChatMessage = {
          role: "assistant",
          content: `Error: ${error}`,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setStreamingContent("");
        setIsLoading(false);
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-purple-500/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  StoryVault Steward
                </h1>
                <p className="text-sm text-purple-300">Your DeFi Life Curator</p>
              </div>
            </div>
            
            {/* Live Monitoring Badge */}
            {monitoring.active && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-400">
                  Live Monitoring {monitoring.asset}
                </span>
                <Activity className="w-4 h-4 text-green-400" />
              </div>
            )}
          </div>

          {/* Monitoring Alert Banner */}
          {monitoring.active && monitoring.lastAlert && (
            <div
              className={cn(
                "mt-4 px-4 py-3 rounded-lg border",
                monitoring.lastAlert.severity === "critical"
                  ? "bg-red-500/10 border-red-500/50 text-red-300"
                  : monitoring.lastAlert.severity === "warning"
                  ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-300"
                  : "bg-blue-500/10 border-blue-500/50 text-blue-300"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">
                    {monitoring.lastAlert.type === "yield_alert"
                      ? "⚠️ Yield Alert"
                      : monitoring.lastAlert.type === "yield_recovered"
                      ? "✅ Yield Recovered"
                      : "📊 Monitoring Update"}
                  </div>
                  <div className="text-sm opacity-90">
                    Current APY: {monitoring.currentYield.toFixed(2)}% | Target:{" "}
                    {monitoring.targetYield.toFixed(2)}%
                  </div>
                </div>
                <div className="text-xs opacity-70">
                  {new Date(monitoring.lastAlert.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-amber-500/20 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Welcome to StoryVault Steward
              </h2>
              <p className="text-purple-300 mb-6 max-w-md mx-auto">
                Share your life story, dreams, and financial goals. I'll curate
                personalized DeFi strategies on Fraxtal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                <ExamplePrompt
                  onClick={() =>
                    setInput(
                      "I'm a 28-year-old teacher saving for a house in 3 years. Risk-averse."
                    )
                  }
                >
                  💼 Professional saving for a home
                </ExamplePrompt>
                <ExamplePrompt
                  onClick={() =>
                    setInput(
                      "College student, 21, learning about DeFi. Want safe yields."
                    )
                  }
                >
                  🎓 Student exploring DeFi
                </ExamplePrompt>
                <ExamplePrompt
                  onClick={() =>
                    setInput(
                      "Entrepreneur, 35, high risk tolerance. Looking for growth."
                    )
                  }
                >
                  🚀 Entrepreneur seeking growth
                </ExamplePrompt>
                <ExamplePrompt
                  onClick={() =>
                    setInput(
                      "Retired, 60, need stable income from my savings."
                    )
                  }
                >
                  🏖️ Retiree seeking stability
                </ExamplePrompt>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}

          {streamingContent && (
            <MessageBubble
              message={{
                role: "assistant",
                content: streamingContent,
                timestamp: new Date().toISOString(),
              }}
              isStreaming
            />
          )}

          {isLoading && !streamingContent && (
            <div className="flex items-center gap-3 text-purple-300">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Analyzing your story...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input / Live Terminal - Fixed at Bottom */}
      <div className="flex-shrink-0 border-t border-purple-500/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {monitoring.active ? (
            /* Live Terminal Mode */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-mono text-green-400">
                    Autonomous Steward Active
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  Monitoring {monitoring.asset}
                </span>
              </div>
              
              <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-1 text-green-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">▸</span>
                    <span>Scanning Fraxtal blocks...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">▸</span>
                    <span>Checking APY: {monitoring.currentYield.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">▸</span>
                    <span>
                      Status:{" "}
                      {Math.abs(monitoring.currentYield - monitoring.targetYield) < 0.3
                        ? "✅ Healthy"
                        : "⚠️ Monitoring"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>▸</span>
                    <span>Next check: 10 seconds...</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                Your Steward is watching. You can still ask questions above.
              </div>
            </div>
          ) : (
            /* Normal Chat Input */
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your story, dreams, and financial goals..."
                rows={1}
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all",
                  "bg-gradient-to-r from-purple-600 to-amber-600",
                  "hover:from-purple-500 hover:to-amber-500",
                  "disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed",
                  "flex items-center gap-2 text-white"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Thinking</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isStreaming = false,
}: {
  message: ChatMessage;
  isStreaming?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-3xl rounded-2xl px-6 py-4",
          isUser
            ? "bg-gradient-to-br from-purple-600 to-amber-600 text-white"
            : "bg-gray-800/50 border border-purple-500/20 text-gray-100"
        )}
      >
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{message.content}</div>
          {isStreaming && (
            <span className="inline-block w-2 h-5 ml-1 bg-purple-400 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}

function ExamplePrompt({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 rounded-lg bg-gray-800/50 border border-purple-500/30 hover:border-purple-500 hover:bg-gray-800 transition-all text-left text-sm text-purple-300 hover:text-purple-200"
    >
      {children}
    </button>
  );
}
