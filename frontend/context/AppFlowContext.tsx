"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// ============================================================================
// APP FLOW STAGES - Sequential, No Manual Navigation
// ============================================================================
export type AppStage = 
  | "chat"           // Initial stage - user talks with AI steward
  | "smart-invest"   // After strategy acceptance - 5-step investment process
  | "countdown"      // After all 5 steps complete - 30s countdown to command center
  | "command-center"; // Final stage - Investment dashboard

export interface InvestmentData {
  strategy: {
    stablePercent: number;
    yieldPercent: number;
  };
  depositAmount?: string;
  completedSteps: number;
  totalSteps: number;
  txHashes: string[];
}

interface AppFlowContextType {
  // Current stage
  stage: AppStage;
  
  // Investment data carried through flow
  investmentData: InvestmentData | null;
  
  // Stage transitions (only allowed in specific directions)
  acceptStrategy: (stablePercent: number, yieldPercent: number) => void;
  completeInvestment: (data: Partial<InvestmentData>) => void;
  goToCommandCenter: () => void;
  
  // Countdown state
  countdownSeconds: number;
  setCountdownSeconds: (seconds: number) => void;
  
  // Agent wallet address
  agentWalletAddress: string;
}

const AppFlowContext = createContext<AppFlowContextType | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================
export function AppFlowProvider({ 
  children, 
  agentWalletAddress 
}: { 
  children: ReactNode;
  agentWalletAddress: string;
}) {
  const [stage, setStage] = useState<AppStage>("chat");
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState(30);

  // Transition: Chat -> Smart Invest (when user accepts strategy)
  const acceptStrategy = useCallback((stablePercent: number, yieldPercent: number) => {
    console.log("✅ Strategy accepted, transitioning to smart-invest:", { stablePercent, yieldPercent });
    setInvestmentData({
      strategy: { stablePercent, yieldPercent },
      completedSteps: 0,
      totalSteps: 5,
      txHashes: [],
    });
    setStage("smart-invest");
  }, []);

  // Transition: Smart Invest -> Countdown (when all 5 steps complete)
  const completeInvestment = useCallback((data: Partial<InvestmentData>) => {
    console.log("🎉 Investment complete, transitioning to countdown:", data);
    setInvestmentData(prev => ({
      ...prev!,
      ...data,
      completedSteps: 5,
    }));
    setCountdownSeconds(30);
    setStage("countdown");
  }, []);

  // Transition: Countdown -> Command Center (manual or after countdown)
  const goToCommandCenter = useCallback(() => {
    console.log("🚀 Transitioning to command center");
    setStage("command-center");
  }, []);

  return (
    <AppFlowContext.Provider
      value={{
        stage,
        investmentData,
        acceptStrategy,
        completeInvestment,
        goToCommandCenter,
        countdownSeconds,
        setCountdownSeconds,
        agentWalletAddress,
      }}
    >
      {children}
    </AppFlowContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================
export function useAppFlow() {
  const context = useContext(AppFlowContext);
  if (context === undefined) {
    throw new Error("useAppFlow must be used within an AppFlowProvider");
  }
  return context;
}
