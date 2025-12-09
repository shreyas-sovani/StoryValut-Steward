"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Activity } from "lucide-react";
import { sendChatMessageSafe, type ChatMessage, type SSEEvent } from "@/lib/api";
import { cn } from "@/lib/utils";
import OpportunityCard from "@/components/OpportunityCard";
import CommandCenter from "@/components/CommandCenterV2";

// ============================================================================
// ANTI-RECURSION GUARDS
// These refs prevent the infinite loop caused by:
// event → sendChatMessage → AI response → detector → dispatchEvent → repeat
// ============================================================================
const DEBOUNCE_MS = 5000; // Minimum 5 seconds between auto-triggered sends

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

interface LeverageRecommendation {
  status: "BEHIND_SCHEDULE" | "ON_TRACK";
  current_projection: number;
  shortfall?: number;
  target_amount: number;
  timeline_months: number;
  base_apy: number;
  recommendation?: {
    action: string;
    leverage_ratio: string;
    leverage_ratio_numeric: number;
    new_apy: string;
    new_apy_numeric: number;
    projected_with_boost: number;
    risk_level: "Low" | "Medium" | "High";
    risk_description: string;
    explanation: string;
    how_it_works: string;
    example_flow: string[];
  };
  fraxlend_details?: {
    pair: string;
    supply_apy: string;
    borrow_apr: string;
    max_ltv: string;
  };
  warning?: string | null;
}

// Strategy recommendation detected from AI
interface DetectedStrategy {
  stablePercent: number;
  yieldPercent: number;
  description: string;
  expectedApy?: string;
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
  const [leverageRecommendation, setLeverageRecommendation] = useState<LeverageRecommendation | null>(null);
  const [showCommandCenter, setShowCommandCenter] = useState(false);
  const [commandCenterAddress, setCommandCenterAddress] = useState("");
  const [detectedStrategy, setDetectedStrategy] = useState<DetectedStrategy | null>(null);
  const [monitoring, setMonitoring] = useState<MonitoringData>({
    active: false,
    asset: "",
    currentYield: 0,
    targetYield: 0,
    yieldHistory: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // ============================================================================
  // ANTI-RECURSION REFS (prevent infinite loop)
  // ============================================================================
  const lastAutoSendRef = useRef<number>(0);      // Timestamp of last auto-triggered send
  const sendLockRef = useRef<boolean>(false);     // Global lock to prevent concurrent sends
  const isLoadingRef = useRef<boolean>(false);    // Ref version of isLoading for immediate checks

  // Keep isLoadingRef in sync with state
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

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
  // ⚠️ CRITICAL: This was causing infinite loops!
  // Guards added to prevent: event → sendChatMessage → AI → detector → event → repeat
  useEffect(() => {
    const handleHireSteward = (event: CustomEvent) => {
      const now = Date.now();
      
      // ============================================================================
      // GUARD 1: Debounce - Prevent rapid re-triggering (min 5 seconds between sends)
      // ============================================================================
      if (now - lastAutoSendRef.current < DEBOUNCE_MS) {
        console.log("🚫 [GUARD] Debounce: Ignoring hireSteward event (too soon)");
        return;
      }
      
      // ============================================================================
      // GUARD 2: Check if already loading (using ref for immediate check)
      // ============================================================================
      if (isLoadingRef.current) {
        console.log("🚫 [GUARD] Already loading: Ignoring hireSteward event");
        return;
      }
      
      // ============================================================================
      // GUARD 3: Global send lock (prevents any concurrent sends)
      // ============================================================================
      if (sendLockRef.current) {
        console.log("🚫 [GUARD] Send locked: Ignoring hireSteward event");
        return;
      }
      
      // All guards passed - proceed with send
      lastAutoSendRef.current = now;
      sendLockRef.current = true;
      
      console.log("✅ [GUARD] All checks passed, proceeding with hireSteward send");
      
      const message = event.detail.message;
      const userMessage: ChatMessage = {
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      isLoadingRef.current = true;
      setStreamingContent("");

      let fullResponse = "";

      // Disabled to prevent background /api/chat spam – only user-driven calls allowed.
      // This hireSteward event is triggered by user clicking "Hire Steward" button.
      sendChatMessageSafe(
        message,
        sessionId,
        "ChatInterface:hireSteward",
        (chunk: SSEEvent) => {
          if (chunk.type === "content" && chunk.content) {
            fullResponse += chunk.content;
            setStreamingContent(fullResponse);
            // Note: Detectors may dispatch events, but guards will block re-entry
            detectMonitoringEvent(fullResponse);
            detectLeverageRecommendation(fullResponse);
            detectStrategyRecommendation(fullResponse);
            detectAgentWallet(fullResponse);
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
          isLoadingRef.current = false;
          sendLockRef.current = false; // Release lock on completion
        },
        (error: string) => {
          const errorMessage: ChatMessage = {
            role: "assistant",
            content: `Error: ${error}`,
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, errorMessage]);
          setStreamingContent("");
          setIsLoading(false);
          isLoadingRef.current = false;
          sendLockRef.current = false; // Release lock on error
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

  // Parse leverage recommendation from agent responses (Goal Governor)
  const detectLeverageRecommendation = (content: string) => {
    // Look for BEHIND_SCHEDULE status or ON_TRACK status
    if (content.includes('"status"') && (content.includes('"BEHIND_SCHEDULE"') || content.includes('"ON_TRACK"'))) {
      try {
        // Extract JSON - try to find the complete recommendation object
        const jsonMatch = content.match(/\{[\s\S]*?"status"[\s\S]*?\}/);
        if (jsonMatch) {
          const leverageData = JSON.parse(jsonMatch[0]);
          
          // Validate it has the required fields
          if (leverageData.status && leverageData.current_projection !== undefined) {
            setLeverageRecommendation(leverageData);
          }
        }
      } catch (e) {
        // Not valid JSON yet or incomplete, continue streaming
        console.log("Parsing leverage recommendation, not complete yet:", e);
      }
    }
  };

  // Parse strategy recommendation from AI response
  const detectStrategyRecommendation = (content: string) => {
    // Already detected a strategy - don't re-parse
    if (detectedStrategy) return;
    
    const lowerContent = content.toLowerCase();
    
    // Look for strategy patterns in the content
    // Pattern 1: "X% sfrxUSD/stable" + "Y% sfrxETH/volatile"
    const stablePatterns = [
      /(\d+)%?\s*(?:to\s+)?(?:sfrxusd|stable|conservative|low.risk)/i,
      /(?:sfrxusd|stable|conservative).*?(\d+)%/i,
    ];
    const volatilePatterns = [
      /(\d+)%?\s*(?:to\s+)?(?:sfrxeth|volatile|growth|aggressive|higher.risk)/i,
      /(?:sfrxeth|volatile|growth|aggressive).*?(\d+)%/i,
    ];
    
    // Pattern 2: Look for allocation keywords
    const hasAllocationKeywords = 
      lowerContent.includes("recommend") || 
      lowerContent.includes("allocat") ||
      lowerContent.includes("split") ||
      lowerContent.includes("strategy") ||
      lowerContent.includes("portfolio");
    
    if (!hasAllocationKeywords) return;
    
    let stablePercent: number | null = null;
    let volatilePercent: number | null = null;
    
    // Try to extract percentages
    for (const pattern of stablePatterns) {
      const match = content.match(pattern);
      if (match) {
        stablePercent = parseInt(match[1]);
        break;
      }
    }
    
    for (const pattern of volatilePatterns) {
      const match = content.match(pattern);
      if (match) {
        volatilePercent = parseInt(match[1]);
        break;
      }
    }
    
    // If we only found one, calculate the other
    if (stablePercent !== null && volatilePercent === null) {
      volatilePercent = 100 - stablePercent;
    } else if (volatilePercent !== null && stablePercent === null) {
      stablePercent = 100 - volatilePercent;
    }
    
    // Fallback: look for any two percentages that add up to ~100 (excluding APY-like percentages)
    if (stablePercent === null && volatilePercent === null) {
      // Get all percentages but filter out APY percentages (usually small like 4-8%)
      const allMatches = [...content.matchAll(/(\d+)%/g)];
      const percentages: number[] = [];
      
      for (const match of allMatches) {
        const num = parseInt(match[1]);
        // Skip small percentages that are likely APY values (< 15%)
        // Strategy splits are usually larger numbers like 30, 40, 50, 60, 70
        if (num >= 20 && num <= 100) {
          percentages.push(num);
        }
      }
      
      // Look for pairs that add to ~100
      for (let i = 0; i < percentages.length; i++) {
        for (let j = i + 1; j < percentages.length; j++) {
          if (percentages[i] + percentages[j] >= 95 && percentages[i] + percentages[j] <= 105) {
            // Found a pair that adds to ~100
            stablePercent = Math.max(percentages[i], percentages[j]); // Assume larger is stable
            volatilePercent = Math.min(percentages[i], percentages[j]);
            break;
          }
        }
        if (stablePercent !== null) break;
      }
    }
    
    // Extract APY if mentioned
    const apyMatch = content.match(/(?:expected|projected|estimated|blended)?\s*(?:APY|apy)[:\s]*~?(\d+\.?\d*)%/i);
    const expectedApy = apyMatch ? `${apyMatch[1]}%` : undefined;
    
    // If we found valid percentages, set the detected strategy
    if (stablePercent !== null && volatilePercent !== null && 
        stablePercent >= 0 && stablePercent <= 100 &&
        volatilePercent >= 0 && volatilePercent <= 100) {
      console.log("✅ Strategy detected:", { stablePercent, volatilePercent, expectedApy });
      setDetectedStrategy({
        stablePercent,
        yieldPercent: volatilePercent, // yieldPercent is actually volatilePercent in the interface
        description: `${stablePercent}% Stable (sfrxUSD) / ${volatilePercent}% Growth (sfrxETH)`,
        expectedApy,
      });
    }
  };

  // Handle accepting the strategy - dispatch event to parent
  const handleAcceptStrategy = () => {
    if (!detectedStrategy) return;
    
    console.log("🚀 Accepting strategy:", detectedStrategy);
    window.dispatchEvent(
      new CustomEvent("strategyAccepted", {
        detail: {
          stablePercent: detectedStrategy.stablePercent,
          yieldPercent: detectedStrategy.yieldPercent,
        },
      })
    );
  };

  // Parse agent wallet address from responses (Phase 8 - Autonomous Hedge Fund)
  const detectAgentWallet = (content: string) => {
    // Look for FULL agent wallet address pattern (0x followed by 40 hex characters)
    const fullAddressMatch = content.match(/0x[a-fA-F0-9]{40}/);
    
    // FALLBACK: Also check for "vault address:" or "deposit address:" followed by any 0x pattern
    // This catches cases where agent might show abbreviated address
    const addressLineMatch = content.match(/(?:vault address|deposit address):\s*(0x[a-fA-F0-9]+)/i);
    
    const addressMatch = fullAddressMatch || (addressLineMatch ? addressLineMatch[1].match(/0x[a-fA-F0-9]{40}/) : null);
    
    if (!addressMatch) {
      console.log("🔍 No valid 40-character address found in response");
      // Check if there's an abbreviated address (debugging)
      const abbreviatedMatch = content.match(/0x[a-fA-F0-9]+\.\.\.[a-fA-F0-9]+/);
      if (abbreviatedMatch) {
        console.error("❌ AGENT ERROR: Found abbreviated address:", abbreviatedMatch[0]);
        console.error("   Agent must show FULL 42-character address for redirect to work!");
      }
      return;
    }
    
    const address = addressMatch[0];
    const lowerContent = content.toLowerCase();
    
    console.log("✅ Full address detected:", address);
    console.log("   Checking for vault initialization keywords...");
    
    // Trigger redirect if we see vault-related keywords
    const shouldRedirect = (
      lowerContent.includes("initializing") ||
      lowerContent.includes("redirecting") ||
      lowerContent.includes("fund dashboard") ||
      lowerContent.includes("autonomous vault") ||
      lowerContent.includes("your vault") ||
      lowerContent.includes("vault address") ||
      lowerContent.includes("🚀") || // Rocket emoji
      lowerContent.includes("↗️") || // Arrow emoji
      (lowerContent.includes("ready") && lowerContent.includes("0x")) ||
      (lowerContent.includes("set up") && lowerContent.includes("0x"))
    );
    
    if (shouldRedirect) {
      console.log("🎉 VAULT INITIALIZATION DETECTED!");
      console.log("   Triggering Command Center...");
      
      // Activate Command Center
      setShowCommandCenter(true);
      setCommandCenterAddress(address);
      
      // Also trigger FundDashboard display (for parent component)
      window.dispatchEvent(
        new CustomEvent("agentWalletDetected", {
          detail: { address },
        })
      );
      
      console.log("✅ Command Center activated!");
    } else {
      console.log("   No vault keywords found - not redirecting yet");
      console.log("   Content includes:", {
        initializing: lowerContent.includes("initializing"),
        redirecting: lowerContent.includes("redirecting"),
        vault: lowerContent.includes("vault"),
      });
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

    // User-driven chat call - triggered by explicit button press / form submit
    await sendChatMessageSafe(
      userMessage.content,
      sessionId,
      "ChatInterface:handleSend",
      (chunk: SSEEvent) => {
        if (chunk.type === "content" && chunk.content) {
          fullResponse += chunk.content;
          setStreamingContent(fullResponse);

          // Detect monitoring events
          detectMonitoringEvent(fullResponse);
          
          // Detect leverage recommendations (Goal Governor)
          detectLeverageRecommendation(fullResponse);
          
          // Detect strategy recommendations from AI
          detectStrategyRecommendation(fullResponse);
          
          // Detect agent wallet address (Phase 8)
          detectAgentWallet(fullResponse);

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
          // Trigger EARLY when agent first recommends strategy (before user agrees)
          if (
            (fullResponse.toLowerCase().includes("sfrax") ||
              fullResponse.toLowerCase().includes("sfrxeth") ||
              fullResponse.toLowerCase().includes("fraxlend")) &&
            (fullResponse.toLowerCase().includes("recommend") ||
              fullResponse.toLowerCase().includes("strategy") ||
              fullResponse.toLowerCase().includes("vault") ||
              fullResponse.toLowerCase().includes("conservative") ||
              fullResponse.toLowerCase().includes("aggressive") ||
              fullResponse.toLowerCase().includes("leverage"))
          ) {
            try {
              // Create a mock vault data for visualization
              const isLowRisk =
                fullResponse.toLowerCase().includes("low risk") ||
                fullResponse.toLowerCase().includes("risk-averse") ||
                fullResponse.toLowerCase().includes("conservative") ||
                fullResponse.toLowerCase().includes("sfrax vault") ||
                fullResponse.toLowerCase().includes("sfrax stable");

              const isMediumRisk =
                fullResponse.toLowerCase().includes("medium risk") ||
                fullResponse.toLowerCase().includes("sfrxeth vault") ||
                fullResponse.toLowerCase().includes("balanced");
              
              const isHighRisk =
                fullResponse.toLowerCase().includes("high risk") ||
                fullResponse.toLowerCase().includes("aggressive") ||
                fullResponse.toLowerCase().includes("leverage") ||
                fullResponse.toLowerCase().includes("fraxlend");

              if (isLowRisk || isMediumRisk || isHighRisk) {
                const mockVaultData = {
                  agent_id: "preview_" + Date.now(),
                  tx_hash: "0x" + "0".repeat(64),
                  atp_strategy_url: "https://app.iqai.com/",
                  deployed_at: new Date().toISOString(),
                  strategy_summary: {
                    protocol: isHighRisk 
                      ? "Fraxlend Leverage Strategy" 
                      : isLowRisk 
                        ? "sFRAX Vault" 
                        : "Balanced Strategy",
                    apr: isHighRisk ? "8-12%" : isLowRisk ? "5-10%" : "3.9-4.5%",
                    risk_level: isHighRisk ? "High" : isLowRisk ? "Low" : "Medium",
                    allocation: isHighRisk
                      ? "Leveraged sFRAX"
                      : isLowRisk
                        ? "100% Stable"
                        : "40% Stable, 60% Growth",
                  },
                  portfolio_composition: isHighRisk
                    ? [{ name: "sFRAX (Leveraged)", value: 100, color: "#FF6B6B" }]
                    : isLowRisk
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
      (error: string) => {
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
    <>
      {/* Command Center Mode */}
      {showCommandCenter ? (
        <CommandCenter walletAddress={commandCenterAddress} />
      ) : (
        /* Normal Chat Interface */
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

          {/* Strategy Recommendation Card - Accept to proceed */}
          {detectedStrategy && (
            <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Recommended Strategy
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Based on your story, here's your personalized allocation:
                  </p>
                  
                  {/* Strategy Visualization */}
                  <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-cyan-400 font-medium">
                        🛡️ Stable (sfrxETH)
                      </span>
                      <span className="text-white font-bold">
                        {detectedStrategy.stablePercent}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${detectedStrategy.stablePercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-purple-400 font-medium">
                        📈 Yield (Fraxlend)
                      </span>
                      <span className="text-white font-bold">
                        {detectedStrategy.yieldPercent}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                        style={{ width: `${detectedStrategy.yieldPercent}%` }}
                      />
                    </div>
                    {detectedStrategy.expectedApy && (
                      <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Expected APY</span>
                        <span className="text-green-400 font-bold">{detectedStrategy.expectedApy}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleAcceptStrategy}
                      className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                    >
                      <span>✅</span>
                      Accept & Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leverage Recommendation Card (Goal Governor) */}
          {leverageRecommendation && (
            <OpportunityCard 
              data={leverageRecommendation}
              onActivate={() => {
                // TODO: Implement activation flow
                console.log("Activating leverage boost:", leverageRecommendation);
                alert(`Activating ${leverageRecommendation.recommendation?.leverage_ratio} leverage boost! (Demo mode)`);
              }}
            />
          )}

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
      )}
    </>
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
