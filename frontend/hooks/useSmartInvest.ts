"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ============================================================================
// TYPES
// ============================================================================

export interface Strategy {
  stablePercent: number;
  volatilePercent: number;
}

export interface ExecutionStep {
  id: number;
  name: string;
  description: string;
  status: "pending" | "processing" | "success" | "failed";
  txHash?: string;
  timestamp?: string;
}

export interface FundingUpdate {
  type: string;
  status: string;
  amount?: string;
  tx?: string;
  message?: string;
  timestamp: string;
  step?: number;
  stepName?: string;
}

export type WidgetMode = "idle" | "active";

// ============================================================================
// EXECUTION STEPS DEFINITION
// ============================================================================

const INITIAL_STEPS: ExecutionStep[] = [
  {
    id: 1,
    name: "Wrap FRAX",
    description: "Wrapping native FRAX → wFRAX",
    status: "pending",
  },
  {
    id: 2,
    name: "Swap Stable",
    description: "Swapping wFRAX → frxUSD",
    status: "pending",
  },
  {
    id: 3,
    name: "Stake Stable",
    description: "Depositing frxUSD → sfrxUSD vault",
    status: "pending",
  },
  {
    id: 4,
    name: "Swap Volatile",
    description: "Swapping wFRAX → frxETH",
    status: "pending",
  },
  {
    id: 5,
    name: "Swap Volatile",
    description: "Swapping frxETH → sfrxETH via Curve pool",
    status: "pending",
  },
];

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export function useSmartInvest(
  walletAddress: string,
  initialStrategy?: { stablePercent: number; yieldPercent: number }
) {
  // Track if strategy was set from chat (makes slider read-only)
  // Initialize based on whether initialStrategy was provided
  const [isStrategyFromChat, setIsStrategyFromChat] = useState(
    () => !!(initialStrategy && initialStrategy.stablePercent !== undefined)
  );
  
  // Strategy State - initialize with chat strategy if provided
  const [strategy, setStrategy] = useState<Strategy>(() => {
    if (initialStrategy && initialStrategy.stablePercent !== undefined) {
      console.log("📊 Initializing with chat strategy:", initialStrategy);
      return {
        stablePercent: initialStrategy.stablePercent,
        volatilePercent: initialStrategy.yieldPercent ?? (100 - initialStrategy.stablePercent),
      };
    }
    return {
      stablePercent: 60,
      volatilePercent: 40,
    };
  });
  const [isLoadingStrategy, setIsLoadingStrategy] = useState(false);
  const [isSavingStrategy, setIsSavingStrategy] = useState(false);

  // ============================================================================
  // SYNC CHAT STRATEGY TO BACKEND
  // ============================================================================
  // When strategy comes from chat, we need to save it to the backend
  // so the autonomous watcher uses the correct allocation
  useEffect(() => {
    if (initialStrategy && initialStrategy.stablePercent !== undefined && walletAddress) {
      const newStable = initialStrategy.stablePercent;
      const newVolatile = initialStrategy.yieldPercent ?? (100 - newStable);
      
      console.log("📊 Syncing chat strategy to backend:", { stablePercent: newStable, volatilePercent: newVolatile });
      
      // Update local state
      setStrategy({
        stablePercent: newStable,
        volatilePercent: newVolatile,
      });
      setIsStrategyFromChat(true);
      
      // CRITICAL: Save to backend so autonomous watcher uses correct strategy
      const syncToBackend = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/strategy/${walletAddress}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                stablePercent: newStable,
                volatilePercent: newVolatile,
              }),
            }
          );
          
          if (response.ok) {
            console.log("✅ Strategy synced to backend successfully");
          } else {
            console.error("❌ Failed to sync strategy to backend");
          }
        } catch (err) {
          console.error("❌ Error syncing strategy to backend:", err);
        }
      };
      
      syncToBackend();
    }
  }, [initialStrategy, walletAddress]);

  // Execution State
  const [mode, setMode] = useState<WidgetMode>("idle");
  const [steps, setSteps] = useState<ExecutionStep[]>(INITIAL_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [depositAmount, setDepositAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // SSE Connection
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // ============================================================================
  // FETCH STRATEGY (only if not already set from chat)
  // ============================================================================

  const fetchStrategy = useCallback(async () => {
    // Skip fetching if strategy was set from chat
    if (isStrategyFromChat) {
      console.log("📊 Skipping fetch - strategy already set from chat");
      return;
    }
    
    if (!walletAddress) return;

    setIsLoadingStrategy(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/strategy/${walletAddress}`
      );
      if (response.ok) {
        const data = await response.json();
        setStrategy({
          stablePercent: data.stablePercent ?? 60,
          volatilePercent: data.volatilePercent ?? 40,
        });
      }
    } catch (err) {
      console.error("Failed to fetch strategy:", err);
      // Use default strategy if fetch fails
    } finally {
      setIsLoadingStrategy(false);
    }
  }, [walletAddress, isStrategyFromChat]);

  // ============================================================================
  // SAVE STRATEGY
  // ============================================================================

  const saveStrategy = useCallback(
    async (newStrategy: Strategy) => {
      if (!walletAddress) return;

      setIsSavingStrategy(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/strategy/${walletAddress}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStrategy),
          }
        );

        if (response.ok) {
          setStrategy(newStrategy);
          return true;
        } else {
          throw new Error("Failed to save strategy");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return false;
      } finally {
        setIsSavingStrategy(false);
      }
    },
    [walletAddress]
  );

  // ============================================================================
  // UPDATE LOCAL STRATEGY (without saving)
  // ============================================================================

  const updateLocalStrategy = useCallback((stablePercent: number) => {
    setStrategy({
      stablePercent,
      volatilePercent: 100 - stablePercent,
    });
  }, []);

  // ============================================================================
  // TRIGGER SMART INVEST (Manual Test)
  // ============================================================================

  const triggerSmartInvest = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/smart-invest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, testMode: true }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Smart invest failed:", errorData);
        setError(errorData.error || "Failed to trigger investment");
        return false;
      }
      
      const data = await response.json();
      console.log("Smart invest result:", data);
      return true;
    } catch (err) {
      console.error("Failed to trigger smart invest:", err);
      setError("Network error - check if backend is running");
      return false;
    }
  }, [walletAddress]);

  // ============================================================================
  // PARSE SSE MESSAGE AND UPDATE STEPS
  // ============================================================================

  const parseAndUpdateStep = useCallback((data: FundingUpdate) => {
    const { type, step, status, message, tx } = data;
    const lowerStatus = (status || "").toLowerCase();
    const lowerMessage = (message || "").toLowerCase();

    console.log(`🔄 Processing event: type=${type}, step=${step}, status=${status}`);

    // === DEPOSIT_DETECTED: Switch to active mode ===
    if (
      type === "DEPOSIT_DETECTED" ||
      lowerStatus.includes("deposit_detected") ||
      lowerMessage.includes("deposit detected") ||
      lowerMessage.includes("frax detected")
    ) {
      console.log("📥 Deposit detected - activating widget");
      setMode("active");
      setDepositAmount(data.amount || null);
      setSteps(INITIAL_STEPS); // Reset steps
      setCurrentStepIndex(null);
      setIsComplete(false);
      setError(null);
      return;
    }

    // === INVESTMENT_COMPLETE: Mark all complete ===
    if (
      type === "INVESTMENT_COMPLETE" ||
      lowerStatus === "invested" ||
      lowerMessage.includes("smart invest complete")
    ) {
      console.log("✅ Investment complete - marking all steps success");
      setSteps((prev) =>
        prev.map((s): ExecutionStep => ({ ...s, status: "success" as const }))
      );
      setIsComplete(true);
      
      // Dispatch event to trigger countdown redirect
      window.dispatchEvent(
        new CustomEvent("investmentComplete", {
          detail: {
            completedSteps: 5,
            totalSteps: 5,
            depositAmount: depositAmount,
            txHashes: steps.filter(s => s.txHash).map(s => s.txHash),
          },
        })
      );
      return;
    }

    // === HANDLE STEP-BASED EVENTS (type: "log") ===
    if (type === "log" && typeof step === "number" && step >= 1 && step <= 5) {
      const stepIndex = step - 1; // Convert 1-based to 0-based

      if (status === "Processing") {
        console.log(`⏳ Step ${step} processing`);
        // Mark previous steps as success, current step as processing
        setSteps((prev) =>
          prev.map((s, idx): ExecutionStep => {
            if (idx < stepIndex) return { ...s, status: "success" as const };
            if (idx === stepIndex) return { ...s, status: "processing" as const };
            return s;
          })
        );
        setCurrentStepIndex(stepIndex);
      } else if (status === "Success") {
        console.log(`✅ Step ${step} success, txHash: ${tx}`);
        // Mark this step as success with txHash
        setSteps((prev) =>
          prev.map((s, idx): ExecutionStep => {
            if (idx === stepIndex) {
              return { ...s, status: "success" as const, txHash: tx };
            }
            return s;
          })
        );
      } else if (status === "Failed") {
        console.log(`❌ Step ${step} failed`);
        // Mark this step as failed
        setSteps((prev) =>
          prev.map((s, idx): ExecutionStep => {
            if (idx === stepIndex) return { ...s, status: "failed" as const };
            return s;
          })
        );
        setError(message || "Step failed");
      }
      return;
    }

    // === FALLBACK: Legacy message-based parsing for backward compatibility ===
    
    // Handle errors from any event type
    if (
      lowerStatus.includes("error") ||
      lowerStatus.includes("failed") ||
      lowerMessage.includes("failed") ||
      lowerMessage.includes("error")
    ) {
      console.log(`❌ Error detected: ${message}`);
      setSteps((prev) =>
        prev.map((step) =>
          step.status === "processing"
            ? { ...step, status: "failed" }
            : step
        )
      );
      setError(message || "Execution failed");
      return;
    }

    // Legacy: Step 1 Wrapping FRAX (message-based)
    if (
      lowerMessage.includes("wrapping") ||
      lowerMessage.includes("wrap frax")
    ) {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === 1 ? { ...s, status: "processing" } : s
        )
      );
      setCurrentStepIndex(0);
    }

    // Legacy: Wrapped success
    if (lowerMessage.includes("wrapped") && lowerMessage.includes("wfrax")) {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === 1 ? { ...s, status: "success", txHash: tx } : s
        )
      );
    }

    // Legacy: Swapping to frxUSD
    if (lowerMessage.includes("swapping") && lowerMessage.includes("frxusd")) {
      setSteps((prev) =>
        prev.map((s, idx): ExecutionStep => {
          if (idx === 0) return { ...s, status: "success" as const };
          if (idx === 1) return { ...s, status: "processing" as const };
          return s;
        })
      );
      setCurrentStepIndex(1);
    }

    // Legacy: Staking in sfrxUSD
    if (lowerMessage.includes("staking") && lowerMessage.includes("sfrxusd")) {
      setSteps((prev) =>
        prev.map((s, idx): ExecutionStep => {
          if (idx <= 1) return { ...s, status: "success" as const };
          if (idx === 2) return { ...s, status: "processing" as const };
          return s;
        })
      );
      setCurrentStepIndex(2);
    }

    // Legacy: Swapping to frxETH
    if (lowerMessage.includes("swapping") && lowerMessage.includes("frxeth")) {
      setSteps((prev) =>
        prev.map((s, idx): ExecutionStep => {
          if (idx <= 2) return { ...s, status: "success" as const };
          if (idx === 3) return { ...s, status: "processing" as const };
          return s;
        })
      );
      setCurrentStepIndex(3);
    }

    // Swapping frxETH to sfrxETH via Curve pool
    // NOTE: On Fraxtal, sfrxETH is acquired via Curve stable-ng pool swap
    if (
      (lowerMessage.includes("swapping") && lowerMessage.includes("sfrxeth")) ||
      (lowerMessage.includes("swap") && lowerMessage.includes("frxeth") && lowerMessage.includes("sfrxeth")) ||
      (lowerMessage.includes("curve") && lowerMessage.includes("frxeth"))
    ) {
      setSteps((prev) =>
        prev.map((s, idx): ExecutionStep => {
          if (idx <= 3) return { ...s, status: "success" as const };
          if (idx === 4) return { ...s, status: "processing" as const };
          return s;
        })
      );
      setCurrentStepIndex(4);
    }

    // Legacy: Staking in sfrxETH (kept for backward compatibility, but now deprecated on Fraxtal)
    if (lowerMessage.includes("staking") && lowerMessage.includes("sfrxeth")) {
      setSteps((prev) =>
        prev.map((s, idx): ExecutionStep => {
          if (idx <= 3) return { ...s, status: "success" as const };
          if (idx === 4) return { ...s, status: "processing" as const };
          return s;
        })
      );
      setCurrentStepIndex(4);
    }
  }, []);

  // ============================================================================
  // SSE CONNECTION
  // ============================================================================

  useEffect(() => {
    // Connect to SSE funding stream
    const sseUrl = `${API_BASE_URL}/api/funding/stream`;
    console.log(`🔌 Attempting SSE connection to: ${sseUrl}`);
    
    const eventSource = new EventSource(sseUrl, { withCredentials: true });
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("🔌 SSE Connection opened to funding stream");
      setIsConnected(true);
    };

    // Handle connection confirmation
    eventSource.addEventListener("funding_update", (event) => {
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        console.log("📡 Funding update:", data);
        
        // Handle initial connection confirmation
        if (data.type === "connected" || data.status === "CONNECTED") {
          console.log("✅ SSE Connection confirmed by server");
          setIsConnected(true);
          return;
        }
        
        parseAndUpdateStep(data);
      } catch (err) {
        console.error("Failed to parse SSE event:", err);
      }
    });

    eventSource.addEventListener("smart_invest_update", (event) => {
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        console.log("📡 Smart invest update:", data);
        parseAndUpdateStep(data);
      } catch (err) {
        console.error("Failed to parse SSE event:", err);
      }
    });

    // Handle step-based log events (new format from smartInvestTools)
    eventSource.addEventListener("log", (event) => {
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        console.log("📡 Log event:", data);
        parseAndUpdateStep(data);
      } catch (err) {
        console.error("Failed to parse log event:", err);
      }
    });

    // Handle heartbeat to confirm connection is alive
    eventSource.addEventListener("heartbeat", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("💓 Heartbeat received:", data.timestamp);
        setIsConnected(true);
      } catch (err) {
        // Heartbeat parse error is not critical
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
      setIsConnected(false);
      
      // EventSource will automatically attempt to reconnect
      // Log the state for debugging
      if (eventSource.readyState === EventSource.CONNECTING) {
        console.log("🔄 SSE reconnecting...");
      } else if (eventSource.readyState === EventSource.CLOSED) {
        console.log("❌ SSE connection closed");
      }
    };

    // Fetch initial strategy
    fetchStrategy();

    // Cleanup
    return () => {
      console.log("🔌 Closing SSE connection");
      eventSource.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    };
  }, [fetchStrategy, parseAndUpdateStep]);

  // ============================================================================
  // RESET EXECUTION STATE
  // ============================================================================

  const resetExecution = useCallback(() => {
    setMode("idle");
    setSteps(INITIAL_STEPS);
    setCurrentStepIndex(null);
    setDepositAmount(null);
    setError(null);
    setIsComplete(false);
  }, []);

  // ============================================================================
  // RETURN VALUES
  // ============================================================================

  return {
    // Strategy
    strategy,
    isLoadingStrategy,
    isSavingStrategy,
    isStrategyFromChat,
    updateLocalStrategy,
    saveStrategy,

    // Execution
    mode,
    steps,
    currentStepIndex,
    depositAmount,
    error,
    isComplete,
    isConnected,

    // Actions
    triggerSmartInvest,
    resetExecution,
    setMode,
  };
}
