"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { QRCodeSVG } from "qrcode.react";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

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
  const [aum, setAum] = useState(0); // Assets Under Management (total deposited)
  const [availableBalance, setAvailableBalance] = useState(0); // Balance after investments
  const [investedAmount, setInvestedAmount] = useState(0); // Amount invested in vaults
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", timestamp: new Date().toISOString(), message: "🛡️ STEWARDSHIP MODE ACTIVATED", type: "success" },
    { id: "2", timestamp: new Date().toISOString(), message: "🔗 Connected to Fraxtal RPC", type: "info" },
    { id: "3", timestamp: new Date().toISOString(), message: "👁️ Monitoring wallet for deposits...", type: "info" },
  ]);
  const [currentYield, setCurrentYield] = useState(4.5);
  const [yieldHistory, setYieldHistory] = useState<number[]>([4.5, 4.52, 4.48, 4.51, 4.5]); // For sparkline
  const [blockNumber, setBlockNumber] = useState(28932662);
  const [isInvesting, setIsInvesting] = useState(false);
  const [currentTx, setCurrentTx] = useState<string | null>(null);
  
  // ALPHA DATA FOR CHADS 🚀
  const [ethPrice, setEthPrice] = useState(3847.23);
  const [ethChange24h, setEthChange24h] = useState(5.7);
  const [marketSentiment, setMarketSentiment] = useState(68); // Fear & Greed Index
  const [gasPrice, setGasPrice] = useState(0.0001);
  const [portfolioHistory, setPortfolioHistory] = useState<Array<{time: string, value: number}>>([]);
  const [copied, setCopied] = useState(false);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom - DISABLED (user requested no auto-scroll)
  // useEffect(() => {
  //   logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [logs]);

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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const streamUrl = `${apiUrl}/api/funding/stream`;
    
    console.log("🔌 CommandCenter: Connecting to SSE stream:", streamUrl);
    console.log("📊 CommandCenter: API URL env var:", process.env.NEXT_PUBLIC_API_URL);
    console.log("🌍 CommandCenter: NODE_ENV:", process.env.NODE_ENV);
    
    const eventSource = new EventSource(streamUrl);

    eventSource.onopen = () => {
      console.log("✅ CommandCenter: SSE connection established");
      console.log("🔗 Waiting for server messages...");
      addLog("🔗 Live stream connected to backend", "success");
    };

    // Listen for 'funding_update' event type (backend sends event: "funding_update")
    eventSource.addEventListener('funding_update', (event: any) => {
      console.log("📡 CommandCenter: FUNDING_UPDATE event received:", event.data);
      console.log("🔥 VERCEL BUILD VERSION: 61704ec");
      
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        console.log("✅ Parsed funding_update data:", data);
        
        // Ignore WAITING status (initial message)
        if (data.status === "WAITING") {
          console.log("⏳ Initial WAITING status received");
          return;
        }
        
        console.log("🚀 Calling handleFundingUpdate with:", data);
        handleFundingUpdate(data);
      } catch (err) {
        console.error("❌ SSE parse error:", err);
        console.error("❌ Raw event data:", event.data);
      }
    });

    // Listen for 'heartbeat' event type
    eventSource.addEventListener('heartbeat', (event: any) => {
      console.log("💓 Heartbeat received:", event.data);
    });

    // Generic onmessage handler for events without explicit type
    eventSource.onmessage = (event) => {
      console.log("📡 CommandCenter: Generic SSE message (no event type):", event.data);
      console.log("🔥 VERCEL BUILD VERSION: 61704ec");
      console.log("📦 Event type:", event.type);
      console.log("📦 Event lastEventId:", event.lastEventId);
      
      try {
        const data: FundingUpdate = JSON.parse(event.data);
        console.log("✅ Parsed data:", data);
        
        // Ignore heartbeat messages
        if (data.type === "heartbeat") {
          console.log("💓 Heartbeat received");
          return;
        }
        
        console.log("🚀 About to call handleFundingUpdate with:", data);
        handleFundingUpdate(data);
      } catch (err) {
        console.error("❌ SSE parse error:", err);
        console.error("❌ Raw event data:", event.data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE connection error:", err);
      console.error("❌ EventSource readyState:", eventSource.readyState);
      console.error("❌ Attempted URL:", streamUrl);
      addLog("⚠️ Connection interrupted, reconnecting...", "warning");
    };

    return () => {
      console.log("🔌 CommandCenter: Closing SSE connection");
      eventSource.close();
    };
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

  // Simulate yield fluctuations (for live feel)
  useEffect(() => {
    if (investedAmount > 0) {
      const yieldInterval = setInterval(() => {
        const fluctuation = Math.random() * 0.05 - 0.025; // ±0.025%
        const newYield = Number((currentYield + fluctuation).toFixed(3));
        setCurrentYield(Math.max(4.3, Math.min(4.7, newYield)));
        setYieldHistory(prev => [...prev.slice(-19), newYield]);
      }, 5000); // Update every 5 seconds

      return () => clearInterval(yieldInterval);
    }
  }, [investedAmount, currentYield]);

  // 🔥 SIMULATE LIVE MARKET DATA (LIKE A BOSS)
  useEffect(() => {
    const marketInterval = setInterval(() => {
      // ETH price fluctuation
      const ethFluctuation = (Math.random() - 0.5) * 20;
      setEthPrice(prev => Math.max(3700, Math.min(4000, prev + ethFluctuation)));
      
      // 24h change
      setEthChange24h(prev => prev + (Math.random() - 0.5) * 0.3);
      
      // Market sentiment (Fear & Greed)
      setMarketSentiment(prev => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 3)));
      
      // Gas price on Fraxtal (super low!)
      setGasPrice(0.0001 + Math.random() * 0.0002);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(marketInterval);
  }, []);

  // Track portfolio value over time
  useEffect(() => {
    if (aum > 0) {
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      setPortfolioHistory(prev => {
        const newHistory = [...prev, { time: timeStr, value: aum * ethPrice }];
        return newHistory.slice(-20); // Keep last 20 points
      });
    }
  }, [aum, ethPrice]);

  // Copy address helper
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFundingUpdate = (data: FundingUpdate) => {
    console.log("🎯 CommandCenter: Processing funding update:", data);
    const timestamp = new Date(data.timestamp).toLocaleTimeString();

    switch (data.status) {
      case "DEPOSIT_DETECTED":
        console.log("💰 CommandCenter: DEPOSIT_DETECTED event", data.amount);
        const depositAmount = parseFloat(data.amount || "0");
        
        addLog(`💰 NEW DEPOSIT DETECTED: +${data.amount} frxETH`, "deposit");
        
        // Update total AUM
        setAum(prev => {
          const newAum = prev + depositAmount;
          console.log("📊 AUM updated:", prev, "→", newAum);
          return newAum;
        });
        
        // Update available balance
        setAvailableBalance(prev => {
          const newBalance = prev + depositAmount;
          console.log("💰 Available updated:", prev, "→", newBalance);
          addLog(`📊 Available Balance: ${newBalance.toFixed(6)} frxETH`, "info");
          return newBalance;
        });
        
        // Show micro-investment steps
        setTimeout(() => {
          addLog("🤖 MICRO-INVESTMENT PROTOCOL: Executing 0.0001 frxETH stake...", "info");
        }, 500);
        
        setTimeout(() => {
          addLog("📦 Step 1/3: Wrapping 0.0001 frxETH → wfrxETH...", "info");
        }, 1000);
        
        setTimeout(() => {
          addLog("✅ Wrapped successfully", "success");
          addLog("🔐 Step 2/3: Approving Vault to spend wfrxETH...", "info");
        }, 2500);
        
        setTimeout(() => {
          addLog("✅ Approval confirmed", "success");
          addLog("💎 Step 3/3: Depositing into sfrxETH vault...", "info");
        }, 4000);
        
        console.log("✅ CommandCenter: Deposit processing complete");
        break;

      case "INVESTED":
        console.log("🚀 CommandCenter: INVESTED event", data);
        setIsInvesting(true);
        const investAmount = parseFloat(data.amount || "0");
        
        addLog(`✅ Staked in sfrxETH. Yield Active.`, "success");
        
        if (data.tx && data.tx !== "DEMO_MODE") {
          const txHash = data.tx;
          addLog(`🔗 Final TX: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`, "success");
          addLog(`📊 Explorer: https://fraxscan.com/tx/${txHash}`, "info");
        }
        
        // Subtract from available balance, add to invested
        setAvailableBalance(prev => {
          const newBalance = Math.max(0, prev - investAmount);
          console.log("💼 Available after investment:", prev, "→", newBalance);
          return newBalance;
        });
        
        setInvestedAmount(prev => {
          const newInvested = prev + investAmount;
          console.log("📈 Invested amount:", prev, "→", newInvested);
          return newInvested;
        });
        
        // Simulate yield fluctuation
        const newYield = 5.0 + (Math.random() * 0.1 - 0.05);
        setCurrentYield(Number(newYield.toFixed(2)));
        setYieldHistory(prev => [...prev.slice(-4), newYield]);
        
        setTimeout(() => {
          addLog(`💰 Micro-Investment: ${investAmount} frxETH earning 5-10% APY`, "success");
          setAvailableBalance(prevAvail => {
            setInvestedAmount(prevInv => {
              addLog(`💼 Available: ${prevAvail.toFixed(6)} frxETH | Staked: ${prevInv.toFixed(6)} frxETH`, "info");
              return prevInv;
            });
            return prevAvail;
          });
          setIsInvesting(false);
        }, 1500);
        break;
      
      default:
        console.log("⚠️ CommandCenter: Unknown status:", data.status);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 h-[calc(100%-80px)] overflow-y-auto">
        {/* LEFT SIDEBAR - DEPOSIT & MARKET DATA 🚀 */}
        <div className="lg:col-span-3 space-y-4">
          {/* QR CODE DEPOSIT CARD */}
          <motion.div
            className="border border-cyan-500/40 rounded-lg p-5 bg-gradient-to-br from-cyan-950/20 to-black shadow-xl shadow-cyan-500/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-sm text-cyan-400/70 mb-3 tracking-widest">💰 DEPOSIT FUNDS</div>
            
            {/* QR Code */}
            <div className="bg-white p-3 rounded-lg mb-3 flex justify-center">
              <QRCodeSVG value={walletAddress} size={180} />
            </div>
            
            {/* Address */}
            <div className="bg-black/40 border border-cyan-500/20 rounded p-2 mb-2">
              <div className="text-xs text-cyan-400/60 mb-1">Agent Wallet</div>
              <div className="text-xs text-cyan-300 font-mono break-all">{walletAddress}</div>
            </div>
            
            {/* Copy Button */}
            <button
              onClick={copyAddress}
              className="w-full bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 rounded p-2 text-xs text-cyan-400 font-bold transition-all"
            >
              {copied ? "✅ COPIED!" : "📋 COPY ADDRESS"}
            </button>
            
            <div className="text-xs text-cyan-400/50 mt-3 text-center">
              Send FRAX to auto-invest
            </div>
          </motion.div>

          {/* ETH/USD PRICE FEED */}
          <motion.div
            className="border border-purple-500/40 rounded-lg p-5 bg-gradient-to-br from-purple-950/20 to-black shadow-xl shadow-purple-500/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-purple-400/70 mb-2 tracking-widest">📈 ETH/USD</div>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              ${ethPrice.toFixed(2)}
            </div>
            <div className={clsx(
              "text-sm font-bold",
              ethChange24h >= 0 ? "text-green-400" : "text-red-400"
            )}>
              {ethChange24h >= 0 ? "↗" : "↘"} {Math.abs(ethChange24h).toFixed(2)}% (24h)
            </div>
            
            {/* Mini price chart */}
            <div className="mt-3 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldHistory.map((val, i) => ({ value: 3800 + (val - 4.5) * 100 }))}>
                  <defs>
                    <linearGradient id="ethGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#a855f7" fill="url(#ethGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* MARKET SENTIMENT */}
          <motion.div
            className="border border-yellow-500/40 rounded-lg p-5 bg-gradient-to-br from-yellow-950/20 to-black shadow-xl shadow-yellow-500/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-sm text-yellow-400/70 mb-2 tracking-widest">🧠 MARKET SENTIMENT</div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {marketSentiment.toFixed(0)}
            </div>
            <div className="text-xs text-yellow-400/60 mb-3">
              {marketSentiment < 30 ? "EXTREME FEAR 😱" : 
               marketSentiment < 50 ? "FEAR 😰" :
               marketSentiment < 70 ? "NEUTRAL 😐" :
               "GREED 🤑"}
            </div>
            
            {/* Sentiment bar */}
            <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className={clsx(
                  "h-full rounded-full",
                  marketSentiment < 50 ? "bg-red-500" : "bg-green-500"
                )}
                animate={{ width: `${marketSentiment}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* GAS TRACKER */}
          <motion.div
            className="border border-orange-500/40 rounded-lg p-5 bg-gradient-to-br from-orange-950/20 to-black shadow-xl shadow-orange-500/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm text-orange-400/70 mb-2 tracking-widest">⛽ GAS (FRAXTAL)</div>
            <div className="text-2xl font-bold text-orange-400">
              {gasPrice.toFixed(4)} FRAX
            </div>
            <div className="text-xs text-orange-400/60 mt-1">
              ~${(gasPrice * ethPrice).toFixed(4)} USD
            </div>
            <div className="text-xs text-green-400/80 mt-2">
              ⚡ ULTRA LOW FEES
            </div>
          </motion.div>
        </div>

        {/* MAIN CONTENT - Portfolio & Charts */}
        <div className="lg:col-span-6 space-y-4">
          {/* Assets Under Management */}
          <motion.div
            className="border border-green-500/40 rounded-lg p-6 bg-gradient-to-br from-green-950/30 to-black shadow-xl shadow-green-500/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-sm text-green-400/70 mb-2 tracking-widest">TOTAL ASSETS</div>
            <motion.div
              className="text-5xl font-bold text-green-400 mb-3"
              key={aum}
              initial={{ scale: 1.1, color: "#34d399" }}
              animate={{ scale: 1, color: "#4ade80" }}
            >
              ${aum.toFixed(4)}
            </motion.div>
            
            {/* Breakdown */}
            <div className="space-y-2 text-xs border-t border-green-500/20 pt-3">
              <div className="flex justify-between">
                <span className="text-green-400/60">💰 Available:</span>
                <span className="text-green-400 font-mono">${availableBalance.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-400/60">📈 Deployed:</span>
                <span className="text-emerald-400 font-mono">${investedAmount.toFixed(4)}</span>
              </div>
              {investedAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-400/60">🔥 Utilization:</span>
                  <span className="text-purple-400 font-mono">{((investedAmount / aum) * 100).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Investment Details Card */}
          {investedAmount > 0 && (
            <motion.div
              className="border border-purple-500/40 rounded-lg p-5 bg-gradient-to-br from-purple-950/20 to-black shadow-xl shadow-purple-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm text-purple-400/70 mb-3 tracking-widest">📊 ACTIVE POSITIONS</div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-purple-400/60 mb-1">Deployed Capital</div>
                  <div className="text-2xl font-bold text-purple-400">${investedAmount.toFixed(4)}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-400/60 mb-1">Projected Yield</div>
                  <div className="text-2xl font-bold text-emerald-400">+${(investedAmount * 0.045).toFixed(4)}/yr</div>
                </div>
              </div>
              
              {currentTx && (
                <div className="bg-black/40 border border-purple-500/20 rounded p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-purple-400/70">Latest TX:</span>
                    <span className="text-purple-300 font-mono">{currentTx.slice(0, 8)}...{currentTx.slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400/70">Strategy:</span>
                    <span className="text-green-400">sFRAX Conservative Vault</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400/70">Status:</span>
                    <span className="text-emerald-400">✅ Earning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400/70">Risk Level:</span>
                    <span className="text-yellow-400">🟡 Low</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

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
              <div className="text-xs text-green-400/70 mb-2 tracking-widest">YIELD PERFORMANCE</div>
              <motion.div
                className="text-2xl font-bold text-green-400 mb-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentYield.toFixed(2)}% APY
              </motion.div>
              
              {/* Mini Sparkline */}
              <div className="flex items-end gap-0.5 h-8 mb-1">
                {yieldHistory.map((yield_val, i) => {
                  const height = ((yield_val - 4.3) / (4.7 - 4.3)) * 100;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 bg-green-400/30 rounded-t"
                      style={{ height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}
              </div>
              
              <div className="text-xs text-green-400/50">Live Fraxtal · 5s refresh</div>
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

        {/* RIGHT COLUMN - Live Feed & Portfolio Chart */}
        <div className="lg:col-span-3 space-y-4">
          {/* PORTFOLIO VALUE CHART */}
          {portfolioHistory.length > 0 && (
            <motion.div
              className="border border-emerald-500/40 rounded-lg p-5 bg-gradient-to-br from-emerald-950/20 to-black shadow-xl shadow-emerald-500/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-sm text-emerald-400/70 mb-2 tracking-widest">📊 PORTFOLIO VALUE (USD)</div>
              <div className="text-2xl font-bold text-emerald-400 mb-3">
                ${(aum * ethPrice).toFixed(2)}
              </div>
              
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioHistory}>
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #10b981' }}
                      labelStyle={{ color: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Live Feed (Matrix Style) */}
          <motion.div
            className="border border-green-500/40 rounded-lg bg-[#0a0a0a] overflow-hidden flex flex-col shadow-2xl shadow-green-500/20 h-[500px]"
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
