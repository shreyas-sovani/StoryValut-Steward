"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { QRCodeSVG } from "qrcode.react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import {
  Loader,
  CheckCircle,
  Lock,
  Coins,
  Box,
  Gem,
  AlertTriangle,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

// Railway backend URL (NOT Vercel serverless)
const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === "production" 
    ? "https://storyvault-steward-production.up.railway.app" 
    : "http://localhost:3001");

interface FundingUpdate {
  type: string;
  status: string;
  amount?: string;
  tx?: string;
  message?: string;
  timestamp: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "deposit" | "invest" | "step" | "tx";
}

// Execution Pipeline Step States
type StepStatus = "idle" | "processing" | "success" | "error";

interface PipelineStep {
  id: number;
  name: string;
  status: StepStatus;
  txHash?: string;
  icon: React.ElementType;
  description: string;
}

export default function CommandCenter({ walletAddress }: { walletAddress: string }) {
  // Portfolio State
  const [liquidFrxeth, setLiquidFrxeth] = useState(0.004); // Starting balance
  const [stakedSfrxeth, setStakedSfrxeth] = useState(0);
  const [totalValue, setTotalValue] = useState(15.40); // USD value
  
  // Execution Pipeline State
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([
    {
      id: 1,
      name: "WRAP",
      status: "idle",
      icon: Box,
      description: "Wrap frxETH → wfrxETH",
    },
    {
      id: 2,
      name: "APPROVE",
      status: "idle",
      icon: Lock,
      description: "Approve Vault Spending",
    },
    {
      id: 3,
      name: "STAKE",
      status: "idle",
      icon: Gem,
      description: "Deposit into sfrxETH",
    },
  ]);
  
  // Logs and Activity
  const [logs, setLogs] = useState<LogEntry[]>([
    { 
      id: "1", 
      timestamp: new Date().toISOString(), 
      message: "🛡️ STEWARDSHIP MODE ACTIVATED", 
      type: "success" 
    },
    { 
      id: "2", 
      timestamp: new Date().toISOString(), 
      message: "🔗 Connected to Fraxtal RPC (Chain 252)", 
      type: "info" 
    },
    { 
      id: "3", 
      timestamp: new Date().toISOString(), 
      message: "👁️ Monitoring for deposits...", 
      type: "info" 
    },
  ]);
  
  // Market Data
  const [currentYield, setCurrentYield] = useState(5.2);
  const [yieldHistory, setYieldHistory] = useState<number[]>([5.1, 5.15, 5.2, 5.18, 5.2]);
  const [blockNumber, setBlockNumber] = useState(28932662);
  const [isExecuting, setIsExecuting] = useState(false);
  const [ethPrice, setEthPrice] = useState(3847.23);
  const [gasPrice, setGasPrice] = useState(0.0001);
  const [copied, setCopied] = useState(false);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Add log helper
  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    const newLog: LogEntry = {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date().toISOString(),
      message,
      type,
    };
    setLogs(prev => [...prev.slice(-49), newLog]); // Keep last 50
  };

  // Copy address
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse log message to update pipeline
  const parseLogForPipeline = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    // Step 1: Wrapping
    if (lowerMsg.includes("wrapping") || lowerMsg.includes("step 1/3")) {
      setPipelineSteps(prev => prev.map(step => 
        step.id === 1 ? { ...step, status: "processing" as StepStatus } : step
      ));
      setIsExecuting(true);
    }
    
    // Step 1 Complete
    if (lowerMsg.includes("wrapped successfully") || lowerMsg.includes("step 1 complete")) {
      setPipelineSteps(prev => prev.map(step => 
        step.id === 1 ? { ...step, status: "success" as StepStatus } : step
      ));
    }
    
    // Step 2: Approving
    if (lowerMsg.includes("approving") || lowerMsg.includes("step 2/3")) {
      setPipelineSteps(prev => prev.map(step => 
        step.id === 2 ? { ...step, status: "processing" as StepStatus } : step
      ));
    }
    
    // Step 2 Complete
    if (lowerMsg.includes("approval confirmed") || lowerMsg.includes("step 2 complete")) {
      setPipelineSteps(prev => prev.map(step => 
        step.id === 2 ? { ...step, status: "success" as StepStatus } : step
      ));
    }
    
    // Step 3: Depositing
    if (lowerMsg.includes("depositing") || lowerMsg.includes("step 3/3")) {
      setPipelineSteps(prev => prev.map(step => 
        step.id === 3 ? { ...step, status: "processing" as StepStatus } : step
      ));
    }
    
    // Step 3 Complete
    if (lowerMsg.includes("yield active") || lowerMsg.includes("staked in sfrxeth") || lowerMsg.includes("step 3 complete")) {
      setPipelineSteps(prev => prev.map(step => 
        step.id === 3 ? { ...step, status: "success" as StepStatus } : step
      ));
      setIsExecuting(false);
      
      // Update balances
      setLiquidFrxeth(prev => Math.max(0, prev - 0.0001));
      setStakedSfrxeth(prev => prev + 0.0001);
    }
    
    // Extract TX hash
    const txMatch = message.match(/0x[a-fA-F0-9]{10,66}/);
    if (txMatch) {
      const txHash = txMatch[0];
      // Determine which step this TX belongs to
      if (lowerMsg.includes("wrap")) {
        setPipelineSteps(prev => prev.map(step => 
          step.id === 1 ? { ...step, txHash } : step
        ));
      } else if (lowerMsg.includes("approve")) {
        setPipelineSteps(prev => prev.map(step => 
          step.id === 2 ? { ...step, txHash } : step
        ));
      } else if (lowerMsg.includes("deposit") || lowerMsg.includes("final tx")) {
        setPipelineSteps(prev => prev.map(step => 
          step.id === 3 ? { ...step, txHash } : step
        ));
      }
    }
  };

  // Handle funding updates from SSE
  const handleFundingUpdate = (data: FundingUpdate) => {
    console.log("🎯 CommandCenter: Processing funding update:", data);

    switch (data.status) {
      case "DEPOSIT_DETECTED":
        const depositAmount = parseFloat(data.amount || "0");
        setLiquidFrxeth(prev => prev + depositAmount);
        addLog(`💰 NEW DEPOSIT DETECTED: +${data.amount} frxETH`, "deposit");
        addLog("🤖 MICRO-INVESTMENT PROTOCOL: Executing 0.0001 frxETH stake...", "info");
        break;
      
      case "WRAP_START":
        addLog(data.message || "📦 Step 1/3: Wrapping 0.0001 frxETH → wfrxETH...", "step");
        parseLogForPipeline("step 1/3: wrapping");
        break;
      
      case "WRAP_COMPLETE":
        addLog("✅ Wrapped successfully", "success");
        if (data.tx) {
          addLog(`� TX: ${data.tx.slice(0, 10)}...${data.tx.slice(-8)}`, "tx");
          parseLogForPipeline(`wrap tx: ${data.tx}`);
        }
        parseLogForPipeline("wrapped successfully");
        break;
      
      case "APPROVE_START":
        addLog(data.message || "🔐 Step 2/3: Approving Vault to spend wfrxETH...", "step");
        parseLogForPipeline("step 2/3: approving");
        break;
      
      case "APPROVE_COMPLETE":
        addLog("✅ Approval confirmed", "success");
        if (data.tx) {
          addLog(`� TX: ${data.tx.slice(0, 10)}...${data.tx.slice(-8)}`, "tx");
          parseLogForPipeline(`approve tx: ${data.tx}`);
        }
        parseLogForPipeline("approval confirmed");
        break;
      
      case "STAKE_START":
        addLog(data.message || "💎 Step 3/3: Depositing into sfrxETH vault...", "step");
        parseLogForPipeline("step 3/3: depositing");
        break;
      
      case "STAKE_COMPLETE":
        addLog("✅ Staked in sfrxETH. Yield Active.", "success");
        if (data.tx) {
          addLog(`🔗 Final TX: ${data.tx.slice(0, 10)}...${data.tx.slice(-8)}`, "tx");
          parseLogForPipeline(`final tx: ${data.tx}`);
        }
        parseLogForPipeline("staked in sfrxeth");
        break;

      case "INVESTED":
        // Legacy final event - just add completion summary
        addLog(`💰 Micro-Investment Complete: 0.0001 frxETH earning 5-10% APY`, "success");
        addLog(`💼 Available: ${(liquidFrxeth - 0.0001).toFixed(6)} frxETH | Staked: 0.0001 frxETH`, "info");
        break;
    }
  };

  // Connect to SSE stream
  useEffect(() => {
    const apiUrl = API_BASE_URL;
    const streamUrl = `${apiUrl}/api/funding/stream`;
    
    console.log("🔌 CommandCenter: Connecting to SSE stream:", streamUrl);
    
    const eventSource = new EventSource(streamUrl);

    eventSource.onopen = () => {
      console.log("✅ CommandCenter: SSE connection established");
      addLog("🔗 Live stream connected", "success");
    };

    eventSource.addEventListener('funding_update', (event: any) => {
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        if (data.status !== "WAITING") {
          handleFundingUpdate(data);
        }
      } catch (err) {
        console.error("❌ SSE parse error:", err);
      }
    });

    eventSource.onerror = (err) => {
      console.error("❌ SSE connection error:", err);
      addLog("⚠️ Connection interrupted, reconnecting...", "warning");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Simulated block scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Market data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const ethFluctuation = (Math.random() - 0.5) * 10;
      setEthPrice(prev => Math.max(3800, Math.min(3900, prev + ethFluctuation)));
      setGasPrice(0.0001 + Math.random() * 0.0001);
      
      if (stakedSfrxeth > 0) {
        const yieldFluctuation = (Math.random() - 0.5) * 0.02;
        setCurrentYield(prev => Math.max(5.0, Math.min(5.4, prev + yieldFluctuation)));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [stakedSfrxeth]);

  // Update total value
  useEffect(() => {
    setTotalValue((liquidFrxeth + stakedSfrxeth) * ethPrice);
  }, [liquidFrxeth, stakedSfrxeth, ethPrice]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-2 flex items-center gap-2">
              <Shield className="w-8 h-8" />
              STORYVAULT STEWARD
            </h1>
            <p className="text-green-500/70 text-sm">AUTONOMOUS DEFI EXECUTION MONITOR</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-500/50">FRAXTAL MAINNET</p>
            <p className="text-lg font-bold text-green-400">BLOCK #{blockNumber.toLocaleString()}</p>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
          <p className="text-xs text-green-500/70 mb-2">AGENT VAULT ADDRESS</p>
          <div className="flex items-center gap-2 flex-wrap">
            <code className="text-green-400 text-sm md:text-base break-all">
              {walletAddress}
            </code>
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-green-500/20 rounded transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* EXECUTION PIPELINE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-950/20 border-2 border-green-500/50 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            EXECUTION PIPELINE
          </h2>

          <div className="space-y-4">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.status === "processing";
              const isComplete = step.status === "success";
              const isError = step.status === "error";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={clsx(
                    "relative p-4 rounded-lg border-2 transition-all duration-300",
                    isActive && "bg-yellow-500/10 border-yellow-500 shadow-lg shadow-yellow-500/20",
                    isComplete && "bg-green-500/10 border-green-500",
                    !isActive && !isComplete && !isError && "bg-green-950/10 border-green-500/30",
                    isError && "bg-red-500/10 border-red-500"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={clsx(
                      "relative flex items-center justify-center w-12 h-12 rounded-full border-2",
                      isActive && "border-yellow-500 bg-yellow-500/20",
                      isComplete && "border-green-500 bg-green-500/20",
                      !isActive && !isComplete && !isError && "border-green-500/30 bg-green-950/30"
                    )}>
                      {isActive && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader className="w-6 h-6 text-yellow-400" />
                        </motion.div>
                      )}
                      {isComplete && <CheckCircle className="w-6 h-6 text-green-400" />}
                      {!isActive && !isComplete && <Icon className="w-6 h-6 text-green-500/50" />}
                      
                      {/* Pulsing effect for active */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-yellow-500"
                          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={clsx(
                          "font-bold text-lg",
                          isActive && "text-yellow-400",
                          isComplete && "text-green-400",
                          !isActive && !isComplete && "text-green-500/70"
                        )}>
                          {step.name}
                        </h3>
                        {isActive && (
                          <span className="text-xs text-yellow-400 animate-pulse">
                            PROCESSING...
                          </span>
                        )}
                        {isComplete && (
                          <span className="text-xs text-green-400">
                            ✓ COMPLETE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-green-500/70">{step.description}</p>
                      
                      {/* TX Hash */}
                      {step.txHash && (
                        <motion.a
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          href={`https://fraxscan.com/tx/${step.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-2"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {step.txHash.slice(0, 8)}...{step.txHash.slice(-6)}
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Connector line to next step */}
                  {index < pipelineSteps.length - 1 && (
                    <div className={clsx(
                      "absolute left-10 top-full h-4 w-0.5",
                      isComplete ? "bg-green-500" : "bg-green-500/30"
                    )} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ASSET ALLOCATION */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-950/20 border-2 border-green-500/50 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
            <Coins className="w-5 h-5" />
            ASSET ALLOCATION
          </h2>

          {/* Total Value */}
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-500/70 mb-1">TOTAL PORTFOLIO VALUE</p>
            <motion.p 
              key={totalValue}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-green-400"
            >
              ${totalValue.toFixed(2)}
            </motion.p>
            <p className="text-xs text-green-500/50 mt-1">
              frxETH @ ${ethPrice.toFixed(2)}
            </p>
          </div>

          {/* Liquid Assets */}
          <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-blue-400 font-semibold">LIQUID frxETH</p>
              </div>
              <p className="text-xs text-blue-300/70">Available</p>
            </div>
            <motion.p 
              key={liquidFrxeth}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-blue-400"
            >
              {liquidFrxeth.toFixed(6)} frxETH
            </motion.p>
            <p className="text-xs text-blue-300/50 mt-1">
              ${(liquidFrxeth * ethPrice).toFixed(2)} USD
            </p>
          </div>

          {/* Staked Assets */}
          <div className="mb-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-purple-400" />
                <p className="text-sm text-purple-400 font-semibold">STAKED sfrxETH</p>
              </div>
              <p className="text-xs text-purple-300/70">Earning {currentYield.toFixed(2)}% APY</p>
            </div>
            <motion.p 
              key={stakedSfrxeth}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-purple-400"
            >
              {stakedSfrxeth.toFixed(6)} sfrxETH
            </motion.p>
            <p className="text-xs text-purple-300/50 mt-1">
              ${(stakedSfrxeth * ethPrice).toFixed(2)} USD
            </p>
          </div>

          {/* Yield Chart */}
          {stakedSfrxeth > 0 && (
            <div className="p-4 bg-green-950/30 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-500/70 mb-2">YIELD PERFORMANCE</p>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={yieldHistory.map((y, i) => ({ value: y, index: i }))}>
                  <defs>
                    <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#22c55e" 
                    fill="url(#yieldGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>

      {/* SYSTEM LOGS - Cyberpunk Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border-2 border-green-500/50 rounded-lg p-6 shadow-2xl shadow-green-500/20"
      >
        <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          SYSTEM LOGS
          <span className="text-xs text-green-500/50 ml-auto">
            [{logs.length}/50]
          </span>
        </h2>

        <div className="h-96 overflow-y-auto bg-black/50 rounded p-4 space-y-1 font-mono text-sm scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
          <AnimatePresence mode="popLayout">
            {logs.map((log) => {
              const time = new Date(log.timestamp).toLocaleTimeString();
              const hasHash = /0x[a-fA-F0-9]{10,66}/.test(log.message);
              const hasSuccess = /✅|success|complete/i.test(log.message);
              
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={clsx(
                    "py-1 px-2 rounded transition-colors",
                    log.type === "success" && "text-green-400 font-bold",
                    log.type === "warning" && "text-yellow-400",
                    log.type === "deposit" && "text-cyan-400 font-bold",
                    log.type === "step" && "text-purple-400",
                    log.type === "tx" && "text-cyan-300",
                    log.type === "info" && "text-green-500/70",
                    hasSuccess && "bg-green-500/10"
                  )}
                >
                  <span className="text-green-600/50 mr-2">[{time}]</span>
                  {hasHash ? (
                    <span>
                      {log.message.split(/(0x[a-fA-F0-9]{10,66})/).map((part, i) => 
                        /^0x[a-fA-F0-9]+$/.test(part) ? (
                          <span key={i} className="text-cyan-400 font-bold">{part}</span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </span>
                  ) : (
                    log.message
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={logsEndRef} />
        </div>
      </motion.div>

      {/* Status Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 flex items-center justify-between text-xs text-green-500/50"
      >
        <div>
          <span className="mr-4">GAS: {gasPrice.toFixed(6)} frxETH</span>
          <span>CHAIN: FRAXTAL (252)</span>
        </div>
        <div className="flex items-center gap-2">
          {isExecuting ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-yellow-400 rounded-full"
              />
              <span className="text-yellow-400">EXECUTING...</span>
            </>
          ) : (
            <>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span>MONITORING ACTIVE</span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
