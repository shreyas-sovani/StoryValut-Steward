"use client";

import { useState, useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import VaultCard from "@/components/VaultCard";
import SmartInvestWidget from "@/components/SmartInvestWidget";
import CountdownRedirect from "@/components/CountdownRedirect";
import InvestmentDashboard from "@/components/InvestmentDashboard";
import { AppFlowProvider, useAppFlow } from "@/context/AppFlowContext";

// Hard-coded agent wallet address for demo
const AGENT_WALLET_ADDRESS = "0x97e6c2b90492155bFA552FE348A6192f4fB1F163";

// ============================================================================
// MAIN APP CONTENT (Uses Context)
// ============================================================================
function AppContent() {
  const { 
    stage, 
    investmentData, 
    acceptStrategy,
    completeInvestment,
    goToCommandCenter,
    agentWalletAddress 
  } = useAppFlow();

  const [vaultData, setVaultData] = useState(null);
  const [monitoring, setMonitoring] = useState<any>(null);
  const [sessionId] = useState(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  // Listen for strategy acceptance from chat
  useEffect(() => {
    const handleStrategyAccepted = (event: CustomEvent) => {
      console.log("✅ STRATEGY ACCEPTED EVENT!", event.detail);
      const { stablePercent, yieldPercent } = event.detail;
      acceptStrategy(stablePercent, yieldPercent);
    };

    window.addEventListener("strategyAccepted", handleStrategyAccepted as EventListener);
    return () => {
      window.removeEventListener("strategyAccepted", handleStrategyAccepted as EventListener);
    };
  }, [acceptStrategy]);

  // Listen for investment completion from SmartInvestWidget
  useEffect(() => {
    const handleInvestmentComplete = (event: CustomEvent) => {
      console.log("🎉 INVESTMENT COMPLETE EVENT!", event.detail);
      completeInvestment(event.detail);
    };

    window.addEventListener("investmentComplete", handleInvestmentComplete as EventListener);
    return () => {
      window.removeEventListener("investmentComplete", handleInvestmentComplete as EventListener);
    };
  }, [completeInvestment]);

  const handleHireSteward = () => {
    const message =
      "I have deployed the vault. I am now staking IQ to hire you as my Steward. Begin monitoring.";
    window.dispatchEvent(
      new CustomEvent("hireSteward", {
        detail: { message },
      })
    );
  };

  // Render based on current stage
  const renderStage = () => {
    switch (stage) {
      case "chat":
        return (
          <div className="h-full grid grid-cols-1 lg:grid-cols-2">
            {/* Chat Interface - Left Side */}
            <div className="h-full flex flex-col overflow-hidden border-r border-purple-500/20">
              <ChatInterface
                sessionId={sessionId}
                onVaultDeployed={(data) => setVaultData(data)}
                onMonitoringUpdate={(data) => setMonitoring(data)}
              />
            </div>

            {/* Vault Card - Right Side */}
            <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/10 to-gray-950">
              <div className="border-b border-purple-500/20 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Your Vault</h2>
                  <p className="text-sm text-purple-300">
                    {monitoring?.active
                      ? `Live Monitoring: ${monitoring.asset}`
                      : "Chat with the Steward to get started"}
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <VaultCard
                  vaultData={vaultData}
                  onHireSteward={vaultData ? handleHireSteward : undefined}
                />
              </div>
            </div>
          </div>
        );

      case "smart-invest":
        return (
          <SmartInvestWidget
            walletAddress={agentWalletAddress}
            initialStrategy={investmentData?.strategy}
          />
        );

      case "countdown":
        return (
          <CountdownRedirect
            investmentData={investmentData}
            onComplete={goToCommandCenter}
            onManualRedirect={goToCommandCenter}
          />
        );

      case "command-center":
        return (
          <InvestmentDashboard 
            walletAddress={agentWalletAddress}
            investmentData={investmentData}
          />
        );

      default:
        return null;
    }
  };

  // Get stage indicator text
  const getStageInfo = () => {
    switch (stage) {
      case "chat":
        return { icon: "💬", label: "Strategy Discovery", sublabel: "Tell the Steward about your goals" };
      case "smart-invest":
        return { icon: "🚀", label: "Smart Invest", sublabel: "Executing your strategy" };
      case "countdown":
        return { icon: "⏱️", label: "Preparing Dashboard", sublabel: "Almost ready..." };
      case "command-center":
        return { icon: "📊", label: "Investment Dashboard", sublabel: "Live portfolio monitoring" };
    }
  };

  const stageInfo = getStageInfo();

  return (
    <main className="h-screen w-full overflow-hidden bg-[#030014]">
      <div className="h-full flex flex-col">
        {/* Top Navigation Bar - No Manual Navigation */}
        <div className="flex-shrink-0 px-4 py-3 bg-gray-900/80 backdrop-blur-sm border-b border-purple-500/20">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  StoryVault Steward
                </h1>
                <code className="text-xs text-gray-500 font-mono">
                  {agentWalletAddress.slice(0, 6)}...{agentWalletAddress.slice(-4)}
                </code>
              </div>
            </div>

            {/* Stage Indicator (Read-Only) */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <span className="text-xl">{stageInfo.icon}</span>
              <div>
                <p className="text-sm font-medium text-white">{stageInfo.label}</p>
                <p className="text-xs text-gray-500">{stageInfo.sublabel}</p>
              </div>
              
              {/* Stage Progress Dots */}
              <div className="flex gap-1.5 ml-4">
                {["chat", "smart-invest", "countdown", "command-center"].map((s, idx) => (
                  <div
                    key={s}
                    className={`w-2 h-2 rounded-full transition-all ${
                      s === stage
                        ? "bg-cyan-400 scale-125"
                        : ["chat", "smart-invest", "countdown", "command-center"].indexOf(stage) > idx
                        ? "bg-green-500"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${stage === "command-center" ? "overflow-y-auto" : "overflow-hidden"}`}>
          {renderStage()}
        </div>
      </div>
    </main>
  );
}

// ============================================================================
// PAGE WRAPPER WITH PROVIDER
// ============================================================================
export default function Home() {
  return (
    <AppFlowProvider agentWalletAddress={AGENT_WALLET_ADDRESS}>
      <AppContent />
    </AppFlowProvider>
  );
}