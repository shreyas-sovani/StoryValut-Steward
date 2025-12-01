"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { sendChatMessage, type ChatMessage, type SSEEvent } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  sessionId: string;
  onVaultDeployed?: (vaultData: any) => void;
}

export default function ChatInterface({
  sessionId,
  onVaultDeployed,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

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

      {/* Input - Fixed at Bottom */}
      <div className="flex-shrink-0 border-t border-purple-500/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
