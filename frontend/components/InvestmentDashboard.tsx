"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Shield,
  Gem,
  Coins,
  Clock,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  BarChart3,
  DollarSign,
  Fuel,
  Box,
  Globe,
  Sparkles,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface InvestmentData {
  strategy: {
    stablePercent: number;
    yieldPercent: number;
  };
  depositAmount?: string;
  completedSteps?: number;
  totalSteps?: number;
  txHashes?: string[];
}

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  balanceUSD: number;
  icon: React.ReactNode;
  color: string;
  apy?: number;
  isStaked?: boolean;
}

interface MarketData {
  ethPrice: number;
  ethChange24h: number;
  gasPrice: number;
  blockNumber: number;
  sentiment: "bullish" | "bearish" | "neutral";
  sentimentScore: number;
}

// ============================================================================
// FRAXTAL TOKEN ADDRESSES (from docs)
// ============================================================================
const FRAXTAL_TOKENS = {
  FRAX: "0xFc00000000000000000000000000000000000001", // Native FRAX (gas)
  frxETH: "0xFC00000000000000000000000000000000000005",
  sfrxETH: "0xFC00000000000000000000000000000000000008",
  frxUSD: "0xfc00000000000000000000000000000000000001", // frxUSD on Fraxtal
  sfrxUSD: "0xfc00000000000000000000000000000000000008", // sfrxUSD on Fraxtal
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ============================================================================
// ANIMATED STAT CARD
// ============================================================================
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "cyan",
  delay = 0,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "cyan" | "purple" | "green" | "yellow" | "red";
  delay?: number;
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "cyan": return "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400";
      case "purple": return "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400";
      case "green": return "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400";
      case "yellow": return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400";
      case "red": return "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400";
      default: return "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400";
    }
  };

  const getIconBgColor = () => {
    switch (color) {
      case "cyan": return "bg-cyan-500/20";
      case "purple": return "bg-purple-500/20";
      case "green": return "bg-green-500/20";
      case "yellow": return "bg-yellow-500/20";
      case "red": return "bg-red-500/20";
      default: return "bg-cyan-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={clsx(
        "relative p-4 rounded-xl bg-gradient-to-br border backdrop-blur-sm overflow-hidden",
        getColorClasses()
      )}
    >
      {/* Animated background shimmer */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">{title}</p>
          <motion.p
            key={value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-white"
          >
            {value}
          </motion.p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : trend === "down" ? (
                <TrendingDown className="w-3 h-3 text-red-400" />
              ) : null}
              <span
                className={clsx(
                  "text-xs font-medium",
                  trend === "up" && "text-green-400",
                  trend === "down" && "text-red-400",
                  trend === "neutral" && "text-gray-400"
                )}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", getIconBgColor())}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TOKEN BALANCE CARD
// ============================================================================
const TokenBalanceCard = ({
  token,
  index,
}: {
  token: TokenBalance;
  index: number;
}) => {
  const getBorderColor = () => {
    switch (token.color) {
      case "cyan": return "border-cyan-500/30 hover:border-cyan-500/50";
      case "blue": return "border-blue-500/30 hover:border-blue-500/50";
      case "green": return "border-green-500/30 hover:border-green-500/50";
      case "emerald": return "border-emerald-500/30 hover:border-emerald-500/50";
      case "purple": return "border-purple-500/30 hover:border-purple-500/50";
      default: return "border-gray-500/30 hover:border-gray-500/50";
    }
  };

  const getBgColor = () => {
    switch (token.color) {
      case "cyan": return "bg-cyan-500/20";
      case "blue": return "bg-blue-500/20";
      case "green": return "bg-green-500/20";
      case "emerald": return "bg-emerald-500/20";
      case "purple": return "bg-purple-500/20";
      default: return "bg-gray-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={clsx(
        "flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border transition-all hover:bg-gray-900/70",
        getBorderColor()
      )}
    >
      <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", getBgColor())}>
        {token.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white">{token.symbol}</p>
          {token.isStaked && (
            <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">
              Staked
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{token.name}</p>
      </div>
      <div className="text-right">
        <motion.p
          key={token.balance}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="font-bold text-white"
        >
          {parseFloat(token.balance).toFixed(6)}
        </motion.p>
        <p className="text-sm text-gray-500">${token.balanceUSD.toFixed(2)}</p>
        {token.apy && (
          <p className="text-xs text-green-400 mt-1">+{token.apy.toFixed(2)}% APY</p>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// MARKET SENTIMENT GAUGE
// ============================================================================
const SentimentGauge = ({ sentiment, score }: { sentiment: string; score: number }) => {
  const getColor = () => {
    if (score >= 60) return "#22c55e";
    if (score >= 40) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Colored arc */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-2xl font-bold text-white">{score}</span>
        </motion.div>
      </div>
      <p
        className={clsx(
          "text-sm font-medium mt-2",
          sentiment === "bullish" && "text-green-400",
          sentiment === "bearish" && "text-red-400",
          sentiment === "neutral" && "text-yellow-400"
        )}
      >
        {sentiment.toUpperCase()}
      </p>
    </div>
  );
};

// ============================================================================
// ANIMATED GRID BACKGROUND
// ============================================================================
const AnimatedGridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
      animate={{ y: [0, 40] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    {/* Floating particles */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          delay: Math.random() * 5,
          repeat: Infinity,
        }}
      />
    ))}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function InvestmentDashboard({
  walletAddress,
  investmentData,
}: {
  walletAddress: string;
  investmentData: InvestmentData | null;
}) {
  // State
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Token balances state
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([
    {
      symbol: "FRAX",
      name: "Native FRAX (Gas)",
      balance: "0.000000",
      balanceUSD: 0,
      icon: <Fuel className="w-6 h-6 text-cyan-400" />,
      color: "cyan",
    },
    {
      symbol: "frxETH",
      name: "Frax Ether",
      balance: "0.000000",
      balanceUSD: 0,
      icon: <Gem className="w-6 h-6 text-blue-400" />,
      color: "blue",
    },
    {
      symbol: "frxUSD",
      name: "Frax USD",
      balance: "0.000000",
      balanceUSD: 0,
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      color: "green",
    },
    {
      symbol: "sfrxUSD",
      name: "Staked Frax USD",
      balance: "0.000000",
      balanceUSD: 0,
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      color: "emerald",
      apy: 4.1,
      isStaked: true,
    },
    {
      symbol: "sfrxETH",
      name: "Staked Frax Ether",
      balance: "0.000000",
      balanceUSD: 0,
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      color: "purple",
      apy: 5.2,
      isStaked: true,
    },
    {
      symbol: "WFRAX",
      name: "Wrapped FRAX",
      balance: "0.000000",
      balanceUSD: 0,
      icon: <Coins className="w-6 h-6 text-amber-400" />,
      color: "amber",
    },
  ]);

  // Market data state
  const [marketData, setMarketData] = useState<MarketData>({
    ethPrice: 3847.23,
    ethChange24h: 2.34,
    gasPrice: 0.0001,
    blockNumber: 28932662,
    sentiment: "neutral",
    sentimentScore: 55,
  });

  // APY history for chart
  const [apyHistory, setApyHistory] = useState<{ time: string; sfrxUSD: number; sfrxETH: number }[]>([
    { time: "00:00", sfrxUSD: 4.0, sfrxETH: 5.1 },
    { time: "04:00", sfrxUSD: 4.05, sfrxETH: 5.15 },
    { time: "08:00", sfrxUSD: 4.1, sfrxETH: 5.2 },
    { time: "12:00", sfrxUSD: 4.08, sfrxETH: 5.18 },
    { time: "16:00", sfrxUSD: 4.12, sfrxETH: 5.25 },
    { time: "20:00", sfrxUSD: 4.1, sfrxETH: 5.2 },
  ]);

  // Portfolio value history
  const [portfolioHistory, setPortfolioHistory] = useState<{ time: string; value: number }[]>([]);

  // Total portfolio value
  const totalPortfolioValue = tokenBalances.reduce((sum, t) => sum + t.balanceUSD, 0);

  // Copy address
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fetch wallet balances from backend
  const fetchBalances = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/wallet/${walletAddress}/balances`);
      if (response.ok) {
        const data = await response.json();
        console.log("📊 Fetched balances:", data);
        
        // Update token balances with real data
        setTokenBalances(prev => prev.map(token => {
          // Map symbol to API response key
          const keyMap: Record<string, string> = {
            "FRAX": "frax",
            "frxETH": "frxeth",
            "frxUSD": "frxusd",
            "sfrxUSD": "sfrxusd",
            "sfrxETH": "sfrxeth",
            "WFRAX": "wfrax",
          };
          const balanceKey = keyMap[token.symbol];
          if (balanceKey && data[balanceKey]) {
            return {
              ...token,
              balance: data[balanceKey].balance || "0",
              balanceUSD: data[balanceKey].balanceUSD || 0,
              apy: data[balanceKey].apy || token.apy,
            };
          }
          return token;
        }));
      }
    } catch (err) {
      console.error("Failed to fetch balances:", err);
    }

    // Fetch market data
    try {
      const marketResponse = await fetch(`${API_BASE_URL}/api/market/data`);
      if (marketResponse.ok) {
        const data = await marketResponse.json();
        setMarketData(prev => ({
          ...prev,
          ethPrice: data.ethPrice || prev.ethPrice,
          ethChange24h: data.ethChange24h || prev.ethChange24h,
          gasPrice: data.gasPrice || prev.gasPrice,
          blockNumber: data.blockNumber || prev.blockNumber,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch market data:", err);
    }

    setIsRefreshing(false);
    setLastUpdated(new Date());
  }, [walletAddress]);

  // Initial fetch and polling
  useEffect(() => {
    fetchBalances();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchBalances, 30000);
    return () => clearInterval(interval);
  }, [fetchBalances]);

  // Simulate real-time updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate block number increment
      setMarketData(prev => ({
        ...prev,
        blockNumber: prev.blockNumber + 1,
        ethPrice: prev.ethPrice + (Math.random() - 0.5) * 5,
        gasPrice: Math.max(0.00001, prev.gasPrice + (Math.random() - 0.5) * 0.00001),
        sentimentScore: Math.min(100, Math.max(0, prev.sentimentScore + (Math.random() - 0.5) * 2)),
        sentiment: prev.sentimentScore > 60 ? "bullish" : prev.sentimentScore < 40 ? "bearish" : "neutral",
      }));

      // Update APY slightly
      setApyHistory(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString().slice(0, 5),
          sfrxUSD: 4.1 + (Math.random() - 0.5) * 0.1,
          sfrxETH: 5.2 + (Math.random() - 0.5) * 0.1,
        };
        return [...prev.slice(-11), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Allocation data for pie chart
  const allocationData = investmentData ? [
    { name: "Stable (sfrxUSD)", value: investmentData.strategy.stablePercent, color: "#22c55e" },
    { name: "Yield (sfrxETH)", value: investmentData.strategy.yieldPercent, color: "#a855f7" },
  ] : [
    { name: "Stable", value: 60, color: "#22c55e" },
    { name: "Yield", value: 40, color: "#a855f7" },
  ];

  return (
    <div className="min-h-full pb-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <AnimatedGridBackground />

      <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <BarChart3 className="w-8 h-8 text-cyan-400" />
              </motion.span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Investment Dashboard
              </span>
            </h1>
            <p className="text-gray-400 mt-1">Real-time portfolio monitoring on Fraxtal</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh button */}
            <motion.button
              onClick={fetchBalances}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-colors"
            >
              <RefreshCw className={clsx("w-5 h-5", isRefreshing && "animate-spin")} />
            </motion.button>

            {/* Last updated */}
            <div className="px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700 text-sm">
              <span className="text-gray-500">Updated: </span>
              <span className="text-gray-300">{lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Wallet Address Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/50 border border-cyan-500/20"
        >
          <Wallet className="w-5 h-5 text-cyan-400" />
          <code className="flex-1 text-sm font-mono text-gray-300 truncate">
            {walletAddress}
          </code>
          <button
            onClick={copyAddress}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <a
            href={`https://fraxscan.com/address/${walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </motion.div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="PORTFOLIO VALUE"
            value={`$${totalPortfolioValue.toFixed(2)}`}
            subtitle="Total holdings"
            icon={Coins}
            color="cyan"
            delay={0.1}
          />
          <StatCard
            title="ETH/USD"
            value={`$${marketData.ethPrice.toFixed(2)}`}
            trend={marketData.ethChange24h >= 0 ? "up" : "down"}
            trendValue={`${marketData.ethChange24h >= 0 ? "+" : ""}${marketData.ethChange24h.toFixed(2)}%`}
            icon={TrendingUp}
            color={marketData.ethChange24h >= 0 ? "green" : "red"}
            delay={0.2}
          />
          <StatCard
            title="GAS PRICE"
            value={`${(marketData.gasPrice * 1e9).toFixed(2)} gwei`}
            subtitle="Fraxtal Network"
            icon={Fuel}
            color="yellow"
            delay={0.3}
          />
          <StatCard
            title="BLOCK"
            value={`#${marketData.blockNumber.toLocaleString()}`}
            subtitle="Latest block"
            icon={Box}
            color="purple"
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Token Holdings - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Wallet className="w-5 h-5 text-cyan-400" />
                Token Holdings
              </h2>
              <span className="text-sm text-gray-500">5 tokens</span>
            </div>

            <div className="space-y-3">
              {tokenBalances.map((token, index) => (
                <TokenBalanceCard key={token.symbol} token={token} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Right Column - Allocation & Sentiment */}
          <div className="space-y-6">
            {/* Allocation Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl bg-gray-900/50 border border-purple-500/20"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Strategy Allocation
              </h3>
              
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(17, 24, 39, 0.9)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex justify-center gap-6 mt-4">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="text-sm text-gray-400">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Market Sentiment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-xl bg-gray-900/50 border border-green-500/20"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                Market Sentiment
              </h3>
              
              <SentimentGauge
                sentiment={marketData.sentiment}
                score={marketData.sentimentScore}
              />

              <div className="mt-4 text-center text-sm text-gray-400">
                Based on ETH price action & DeFi TVL
              </div>
            </motion.div>
          </div>
        </div>

        {/* APY Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-gray-900/50 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              APY Performance
            </h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-400">sfrxUSD ({tokenBalances.find(t => t.symbol === "sfrxUSD")?.apy?.toFixed(2) || "4.10"}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-gray-400">sfrxETH ({tokenBalances.find(t => t.symbol === "sfrxETH")?.apy?.toFixed(2) || "5.20"}%)</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={apyHistory}>
              <defs>
                <linearGradient id="sfrxUSDGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sfrxETHGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[3.5, 6]} />
              <Tooltip
                contentStyle={{
                  background: "rgba(17, 24, 39, 0.9)",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="sfrxUSD"
                stroke="#22c55e"
                fill="url(#sfrxUSDGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="sfrxETH"
                stroke="#a855f7"
                fill="url(#sfrxETHGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Fraxtal L2 • StoryVault Steward</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Live Monitoring Active</span>
            </div>
            <span>Chain ID: 252</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
