"use client";

import { useState, useRef, useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import VaultCard from "@/components/VaultCard";
import CommandCenter from "@/components/CommandCenterV2";
import SmartInvestWidget from "@/components/SmartInvestWidget";

// Hard-coded agent wallet address for demo
const AGENT_WALLET_ADDRESS = "0x97e6c2b90492155bFA552FE348A6192f4fB1F163";

type ViewMode = "chat" | "command" | "invest";

export default function Home() {
  const [vaultData, setVaultData] = useState(null);
  const [monitoring, setMonitoring] = useState<any>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("chat"); // Default to Chat
  const [agentWalletAddress, setAgentWalletAddress] = useState<string>(AGENT_WALLET_ADDRESS);
  const [acceptedStrategy, setAcceptedStrategy] = useState<{ stablePercent: number; yieldPercent: number } | null>(null);
  const chatInputRef = useRef<{ sendMessage: (msg: string) => void } | null>(
    null
  );
  const [sessionId] = useState(() => {
    // Generate unique session ID
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  // Listen for agent wallet being shown in chat
  useEffect(() => {
    const handleAgentWalletDetected = (event: CustomEvent) => {
      console.log("🚀 VAULT DETECTED EVENT FIRED!", event.detail);
      const { address } = event.detail;
      console.log("🔥 Setting address:", address);
      setAgentWalletAddress(address);
      setViewMode("command");
    };

    // Listen for strategy acceptance from chat
    const handleStrategyAccepted = (event: CustomEvent) => {
      console.log("✅ STRATEGY ACCEPTED EVENT!", event.detail);
      const { stablePercent, yieldPercent } = event.detail;
      setAcceptedStrategy({ stablePercent, yieldPercent });
      setViewMode("invest"); // Redirect to Smart Invest
    };

    console.log("✅ Event listeners registered");
    window.addEventListener("agentWalletDetected", handleAgentWalletDetected as EventListener);
    window.addEventListener("strategyAccepted", handleStrategyAccepted as EventListener);
    return () => {
      window.removeEventListener("agentWalletDetected", handleAgentWalletDetected as EventListener);
      window.removeEventListener("strategyAccepted", handleStrategyAccepted as EventListener);
    };
  }, []);

  const handleHireSteward = () => {
    // Send message to ChatInterface to activate monitoring
    const message =
      "I have deployed the vault. I am now staking IQ to hire you as my Steward. Begin monitoring.";

    // Trigger chat message (we'll need to expose this from ChatInterface)
    // For now, we can use a simple state approach
    window.dispatchEvent(
      new CustomEvent("hireSteward", {
        detail: { message },
      })
    );
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-[#030014]">
      {/* Full Screen Layout with Tabs */}
      <div className="h-full flex flex-col">
        {/* Top Navigation Bar */}
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
            
            {/* View Toggle Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <button
                onClick={() => setViewMode("invest")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "invest"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                🚀 Smart Invest
              </button>
              <button
                onClick={() => setViewMode("chat")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "chat"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setViewMode("command")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "command"
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                ⚡ Command Center
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {viewMode === "invest" && (
            <SmartInvestWidget 
              walletAddress={agentWalletAddress} 
              initialStrategy={acceptedStrategy || undefined}
            />
          )}
          
          {viewMode === "command" && (
            <CommandCenter walletAddress={agentWalletAddress} />
          )}
          
          {viewMode === "chat" && (
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
                        : "Deployed strategy details"}
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
          )}
        </div>
      </div>
    </main>
  );
}