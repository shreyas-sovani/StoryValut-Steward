"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface FundingUpdate {
  type: string;
  status: string;
  amount?: string;
  tx?: string;
  timestamp: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "deposit" | "invest";
}

export default function CommandCenter({ walletAddress }: { walletAddress: string }) {
  const [aum, setAum] = useState(0); // Assets Under Management
  const [targetAum] = useState(0.021); // Target from deposit
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", timestamp: new Date().toISOString(), message: "🛡️ STEWARDSHIP MODE ACTIVATED", type: "success" },
    { id: "2", timestamp: new Date().toISOString(), message: "🔗 Connected to Fraxtal RPC", type: "info" },
    { id: "3", timestamp: new Date().toISOString(), message: "👁️ Monitoring wallet for deposits...", type: "info" },
  ]);
  const [currentYield, setCurrentYield] = useState(4.5);
  const [blockNumber, setBlockNumber] = useState(28932662);
  const [isInvesting, setIsInvesting] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // God Mode - Simulate Crash
  const simulateCrash = () => {
    addLog("🚨 YIELD ALERT: APY DROPPED TO 1.8% | THRESHOLD BREACH", "warning");
    
    setTimeout(() => {
      addLog("⚡ AUTO-EVACUATION PROTOCOL INITIATED | WITHDRAWING CAPITAL", "warning");
    }, 1000);

    setTimeout(() => {
      addLog("✅ CAPITAL SECURED | AWAITING REDEPLOYMENT SIGNAL", "success");
    }, 2500);
  };

  // Connect to SSE stream
  useEffect(() => {
    const eventSource = new EventSource(`/api/funding-stream`);

    eventSource.onmessage = (event) => {
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        handleFundingUpdate(data);
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      addLog("⚠️ Connection interrupted, reconnecting...", "warning");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  // Simulated block scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber((prev) => prev + 1);
      if (Math.random() > 0.7) {
        addLog(`[WATCHER] 🔍 Scanning block #${blockNumber}...`, "info");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [blockNumber]);

  const handleFundingUpdate = (data: FundingUpdate) => {
    const timestamp = new Date(data.timestamp).toLocaleTimeString();

    switch (data.status) {
      case "DEPOSIT_DETECTED":
        addLog(`💰 NEW DEPOSIT DETECTED: ${data.amount} FRAX`, "deposit");
        addLog(`📊 Current Balance: ${data.amount} FRAX`, "info");
        
        // Animate AUM counter
        const depositAmount = parseFloat(data.amount || "0");
        animateCounter(depositAmount);
        break;

      case "INVESTED":
        setIsInvesting(true);
        addLog(`🚀 AUTO-INVEST INITIATED: ${data.amount} FRAX`, "invest");
        addLog(`📝 Strategy: sFRAX Yield Vault`, "info");
        
        if (data.tx) {
          addLog(`✅ TX: ${data.tx.slice(0, 10)}...${data.tx.slice(-8)} [CONFIRMED]`, "success");
        }
        
        setTimeout(() => {
          addLog(`🎯 Position Active: Earning 5-10% APY`, "success");
          setIsInvesting(false);
        }, 2000);
        break;
    }
  };

  const animateCounter = (target: number) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAum(target);
        clearInterval(interval);
      } else {
        setAum(current);
      }
    }, duration / steps);
  };

  const addLog = (message: string, type: LogEntry["type"]) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      message,
      type,
    };

    setLogs((prev) => [...prev, newLog].slice(-50)); // Keep last 50 logs
  };

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "deposit":
        return "text-cyan-400";
      case "invest":
        return "text-purple-400";
      default:
        return "text-green-500";
    }
  };

  return (
    <div className="h-full bg-[#050505] text-green-500 font-mono overflow-hidden">
      {/* Header */}
      <motion.div
        className="border-b border-green-500/30 p-4 bg-black/80 backdrop-blur shadow-lg shadow-green-500/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h1 className="text-xl font-bold tracking-wider text-green-400">
              AUTONOMOUS STEWARDSHIP: <span className="text-emerald-300">ACTIVE</span>
            </h1>
          </div>
          <div className="text-sm text-green-400/70 font-mono">
            Block #{blockNumber.toLocaleString()}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-[calc(100%-80px)]">
        {/* Main Metrics */}
        <div className="lg:col-span-2 space-y-4">
          {/* Assets Under Management */}
          <motion.div
            className="border border-green-500/40 rounded-lg p-6 bg-gradient-to-br from-green-950/30 to-black shadow-xl shadow-green-500/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-green-400/70 mb-2 tracking-widest">ASSETS UNDER MANAGEMENT</div>
            <motion.div
              className="text-6xl font-bold text-green-400"
              key={aum}
              initial={{ scale: 1.1, color: "#34d399" }}
              animate={{ scale: 1, color: "#4ade80" }}
            >
              ${aum.toFixed(4)}
            </motion.div>
            <div className="text-sm text-green-400/50 mt-2 font-mono">FRAX Stablecoin</div>
          </motion.div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="border border-green-500/40 rounded-lg p-4 bg-gradient-to-br from-green-950/30 to-black shadow-lg shadow-green-500/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-xs text-green-400/70 mb-2 tracking-widest">WALLET CONNECTION</div>
              <div className="text-lg font-bold text-green-400">⚡ SECURED</div>
              <div className="text-xs text-green-400/50 mt-1 truncate font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            </motion.div>

            <motion.div
              className="border border-green-500/40 rounded-lg p-4 bg-gradient-to-br from-green-950/30 to-black shadow-lg shadow-green-500/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-xs text-green-400/70 mb-2 tracking-widest">ACTIVE STRATEGY</div>
              <div className="text-lg font-bold text-green-400">🔒 sFRAX YIELD</div>
              <div className="text-xs text-green-400/50 mt-1">Conservative Vault</div>
            </motion.div>

            <motion.div
              className="border border-green-500/40 rounded-lg p-4 bg-gradient-to-br from-green-950/30 to-black shadow-lg shadow-green-500/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-xs text-green-400/70 mb-2 tracking-widest">YIELD HEARTBEAT</div>
              <motion.div
                className="text-lg font-bold text-green-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💓 {currentYield}% APY
              </motion.div>
              <div className="text-xs text-green-400/50 mt-1">Live from Fraxtal</div>
            </motion.div>

            <motion.div
              className={clsx(
                "border rounded-lg p-4 shadow-lg",
                isInvesting
                  ? "border-purple-500/50 bg-gradient-to-br from-purple-950/30 to-black shadow-purple-500/10"
                  : "border-green-500/40 bg-gradient-to-br from-green-950/30 to-black shadow-green-500/5"
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-xs text-green-400/70 mb-2 tracking-widest">EXECUTION STATUS</div>
              <AnimatePresence mode="wait">
                {isInvesting ? (
                  <motion.div
                    key="investing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-bold text-purple-400"
                  >
                    🔄 INVESTING...
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-bold text-green-400"
                  >
                    ✅ READY
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-xs text-green-400/50 mt-1">Autonomous Agent</div>
            </motion.div>
          </div>

          {/* God Mode Button */}
          <motion.button
            onClick={simulateCrash}
            className="w-full mt-4 border border-red-500/50 bg-red-950/20 hover:bg-red-950/40 rounded-lg p-4 text-red-400 font-bold tracking-wider transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔥 SIMULATE CRASH (GOD MODE)
          </motion.button>
        </div>

        {/* Live Feed (Matrix Style) */}
        <motion.div
          className="border border-green-500/40 rounded-lg bg-[#0a0a0a] overflow-hidden flex flex-col shadow-2xl shadow-green-500/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="border-b border-green-500/30 p-3 bg-green-950/30">
            <div className="text-sm font-bold tracking-wider text-green-400">⚡ SYSTEM LOGS</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={clsx("text-xs leading-relaxed font-mono", getLogColor(log.type))}
                >
                  <span className="text-green-400/50">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>{" "}
                  {log.message}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={logsEndRef} />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="border-t border-green-500/30 p-3 bg-black/80 backdrop-blur text-center text-xs text-green-400/50 shadow-lg shadow-green-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        StoryVault Steward v8.0 • Fraxtal Network (Chain 252) • Secured by Autonomous AI
      </motion.div>
    </div>
  );
}
