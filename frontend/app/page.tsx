"use client";

import { useState, useRef, useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import VaultCard from "@/components/VaultCard";
import CommandCenter from "@/components/CommandCenter";

export default function Home() {
  const [vaultData, setVaultData] = useState(null);
  const [monitoring, setMonitoring] = useState<any>(null);
  const [showCommandCenter, setShowCommandCenter] = useState(false);
  const [agentWalletAddress, setAgentWalletAddress] = useState<string | null>(null);
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
      console.log("🔥 Setting showCommandCenter to TRUE");
      setAgentWalletAddress(address);
      setShowCommandCenter(true);
      
      // FORCE redirect with setTimeout to ensure state updates
      setTimeout(() => {
        console.log("🔥 FORCE REDIRECT - showCommandCenter:", true);
        setShowCommandCenter(true);
      }, 100);
    };

    console.log("✅ Event listener registered for agentWalletDetected");
    window.addEventListener("agentWalletDetected", handleAgentWalletDetected as EventListener);
    return () => {
      window.removeEventListener("agentWalletDetected", handleAgentWalletDetected as EventListener);
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
      {showCommandCenter ? (
        /* Full Screen Command Center */
        <CommandCenter walletAddress={agentWalletAddress || "Loading..."} />
      ) : (
        /* Original Split View */
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
    </main>
  );
}

