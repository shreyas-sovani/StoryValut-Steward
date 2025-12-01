"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import VaultCard from "@/components/VaultCard";

export default function Home() {
  const [vaultData, setVaultData] = useState(null);
  const [sessionId] = useState(() => {
    // Generate unique session ID
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  return (
    <main className="h-screen w-full overflow-hidden bg-[#030014]">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Chat Interface - Left Side */}
        <div className="h-full flex flex-col overflow-hidden border-r border-purple-500/20">
          <ChatInterface
            sessionId={sessionId}
            onVaultDeployed={(data) => setVaultData(data)}
          />
        </div>

        {/* Vault Card - Right Side */}
        <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-purple-950/10 to-gray-950">
          <div className="border-b border-purple-500/20 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-white">Your Vault</h2>
              <p className="text-sm text-purple-300">
                Deployed strategy details
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <VaultCard vaultData={vaultData} />
          </div>
        </div>
      </div>
    </main>
  );
}

