"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Activity,
  RefreshCw,
  Zap,
  ChevronRight,
  Radio,
} from "lucide-react";
import { clsx } from "clsx";

import StrategySlider from "./StrategySlider";
import LiveExecutionLog from "./LiveExecutionLog";
import { useSmartInvest } from "@/hooks/useSmartInvest";

// ============================================================================
// TYPES
// ============================================================================

interface SmartInvestWidgetProps {
  walletAddress: string;
  initialStrategy?: {
    stablePercent: number;
    yieldPercent: number;
  };
}

// ============================================================================
// WAITING PULSE ANIMATION
// ============================================================================

const WaitingPulse = () => (
  <div className="relative flex items-center justify-center py-8">
    {/* Outer rings */}
    <motion.div
      className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/20"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.5, 0, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
    <motion.div
      className="absolute w-24 h-24 rounded-full border-2 border-cyan-500/30"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 0, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay: 0.3,
      }}
    />

    {/* Center icon */}
    <motion.div
      className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 flex items-center justify-center"
      animate={{
        boxShadow: [
          "0 0 20px rgba(6, 182, 212, 0.3)",
          "0 0 40px rgba(6, 182, 212, 0.5)",
          "0 0 20px rgba(6, 182, 212, 0.3)",
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    >
      <Wallet className="w-7 h-7 text-cyan-400" />
    </motion.div>
  </div>
);

// ============================================================================
// CONNECTION STATUS BADGE
// ============================================================================

const ConnectionBadge = ({ isConnected }: { isConnected: boolean }) => (
  <div
    className={clsx(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
      isConnected
        ? "bg-green-500/10 text-green-400 border border-green-500/30"
        : "bg-red-500/10 text-red-400 border border-red-500/30"
    )}
  >
    <motion.span
      className={clsx(
        "w-2 h-2 rounded-full",
        isConnected ? "bg-green-400" : "bg-red-400"
      )}
      animate={isConnected ? { opacity: [1, 0.5, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    />
    {isConnected ? "Live" : "Disconnected"}
  </div>
);

// ============================================================================
// MODE TOGGLE
// ============================================================================

const ModeToggle = ({
  mode,
  onToggle,
}: {
  mode: "idle" | "active";
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 text-sm text-gray-400 hover:text-white transition-all"
  >
    {mode === "idle" ? (
      <>
        <Activity className="w-4 h-4" />
        View Execution
      </>
    ) : (
      <>
        <RefreshCw className="w-4 h-4" />
        Back to Strategy
      </>
    )}
  </button>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SmartInvestWidget({
  walletAddress,
  initialStrategy,
}: SmartInvestWidgetProps) {
  const {
    strategy,
    isLoadingStrategy,
    isSavingStrategy,
    isStrategyFromChat,
    updateLocalStrategy,
    saveStrategy,
    mode,
    steps,
    currentStepIndex,
    depositAmount,
    error,
    isComplete,
    isConnected,
    triggerSmartInvest,
    resetExecution,
    setMode,
  } = useSmartInvest(walletAddress, initialStrategy);

  const handleSaveStrategy = async (): Promise<boolean> => {
    const result = await saveStrategy(strategy);
    return result ?? false;
  };

  const handleToggleMode = () => {
    if (mode === "idle") {
      setMode("active");
    } else {
      resetExecution();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-cyan-500/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                Smart Invest
                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-400">
                  BETA
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                Automated DeFi Strategy on Fraxtal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ConnectionBadge isConnected={isConnected} />
            <ModeToggle mode={mode} onToggle={handleToggleMode} />
          </div>
        </div>
      </div>

      {/* Main Content with Mode Transitions */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {mode === "idle" ? (
            <motion.div
              key="idle-mode"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Strategy Slider */}
              <StrategySlider
                stablePercent={strategy.stablePercent}
                onChange={updateLocalStrategy}
                onSave={handleSaveStrategy}
                isSaving={isSavingStrategy}
                disabled={isLoadingStrategy}
                isFromChat={isStrategyFromChat}
              />

              {/* Waiting for Deposit Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
                <div className="text-center">
                  <WaitingPulse />
                  <h3 className="text-lg font-semibold text-white mt-4">
                    Waiting for Deposit
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                    Send FRAX to your agent wallet. The steward will
                    automatically invest according to your strategy.
                  </p>

                  {/* Wallet Address - FULL ADDRESS for deposits */}
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-400">Deposit FRAX to Agent Wallet:</span>
                    <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                      <code className="text-sm font-mono text-cyan-400 select-all break-all">
                        {walletAddress}
                      </code>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                      }}
                      className="text-xs text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      📋 Click to copy
                    </button>
                  </div>

                  {/* How it works */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        step: 1,
                        title: "Deposit FRAX",
                        desc: "Send FRAX to agent wallet",
                      },
                      {
                        step: 2,
                        title: "Auto-Split",
                        desc: "Strategy allocates funds",
                      },
                      {
                        step: 3,
                        title: "Earn Yield",
                        desc: "Both vaults work for you",
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30"
                      >
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                          {item.step}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        {item.step < 3 && (
                          <ChevronRight className="w-4 h-4 text-gray-600 ml-auto hidden md:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Test Button (Dev Mode) */}
              {process.env.NODE_ENV === "development" && (
                <div className="text-center pt-4">
                  <button
                    onClick={triggerSmartInvest}
                    className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm hover:bg-purple-500/30 transition-colors"
                  >
                    <Radio className="w-4 h-4 inline mr-2" />
                    Trigger Test Investment
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="active-mode"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Live Execution Log */}
              <LiveExecutionLog
                steps={steps}
                currentStepIndex={currentStepIndex}
                isComplete={isComplete}
                error={error}
                depositAmount={depositAmount}
              />

              {/* Strategy Summary (collapsed) */}
              <div className="mt-6 p-4 rounded-xl bg-gray-900/30 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Active Strategy
                      </p>
                      <p className="text-xs text-gray-500">
                        {strategy.stablePercent}% Conservative /{" "}
                        {strategy.volatilePercent}% Growth
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-cyan-400 font-bold">
                        {strategy.stablePercent}%
                      </p>
                      <p className="text-xs text-gray-500">sfrxUSD</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 font-bold">
                        {strategy.volatilePercent}%
                      </p>
                      <p className="text-xs text-gray-500">sfrxETH</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-6 py-3 border-t border-gray-800 bg-gray-900/30">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Powered by Fraxtal L2</span>
          <span className="flex items-center gap-2">
            <span
              className={clsx(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-green-400" : "bg-red-400"
              )}
            />
            SSE Stream {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>
    </div>
  );
}
