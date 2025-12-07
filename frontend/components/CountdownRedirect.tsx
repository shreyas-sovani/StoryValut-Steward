"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  ExternalLink,
  X,
  FileText
} from "lucide-react";

interface InvestmentData {
  strategy: {
    stablePercent: number;
    yieldPercent: number;
  };
  depositAmount?: string;
  completedSteps: number;
  totalSteps: number;
  txHashes?: string[];
}

interface CountdownRedirectProps {
  investmentData: InvestmentData | null;
  onComplete: () => void;
  onManualRedirect: () => void;
}

// ============================================================================
// ANIMATED COUNTDOWN CIRCLE
// ============================================================================
const CountdownCircle = ({ seconds, total }: { seconds: number; total: number }) => {
  const progress = (seconds / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(6, 182, 212, 0.2)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Countdown number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={seconds}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          {seconds}
        </motion.span>
      </div>
      
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

// ============================================================================
// SUCCESS PARTICLE EFFECTS
// ============================================================================
const SuccessParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: Math.random() > 0.5 
              ? "linear-gradient(to right, #06b6d4, #22d3ee)" 
              : "linear-gradient(to right, #a855f7, #c084fc)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CountdownRedirect({
  investmentData,
  onComplete,
  onManualRedirect,
}: CountdownRedirectProps) {
  const [seconds, setSeconds] = useState(30);
  const [isHovering, setIsHovering] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const handleManualRedirect = useCallback(() => {
    onManualRedirect();
  }, [onManualRedirect]);

  // Transaction step labels
  const txStepLabels = [
    "Wrap FRAX → wFRAX",
    "Swap wFRAX → frxUSD (Curve)",
    "Stake frxUSD → sfrxUSD",
    "Swap wFRAX → frxETH (Curve)",
    "Swap frxETH → sfrxETH (Curve)",
  ];

  return (
    <div className="relative h-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background effects */}
      <SuccessParticles />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main content card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 max-w-2xl w-full mx-4"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-cyan-500/30 p-8 md:p-12 shadow-2xl shadow-cyan-500/10">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border-2 border-green-500/50">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-green-500/30"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Success message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Investment Complete! 🎉
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Your DeFi strategy has been successfully deployed on Fraxtal
            </p>
          </motion.div>

          {/* Investment summary */}
          {investmentData && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-medium">STABLE</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {investmentData.strategy.stablePercent}%
                </p>
                <p className="text-xs text-gray-500">sfrxUSD Vault</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-purple-400 font-medium">YIELD</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {investmentData.strategy.yieldPercent}%
                </p>
                <p className="text-xs text-gray-500">sfrxETH Vault</p>
              </div>
            </motion.div>
          )}

          {/* Steps completed badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-2 mb-8"
          >
            {[1, 2, 3, 4, 5].map((step) => (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + step * 0.1 }}
                className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Countdown section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Redirecting to Investment Dashboard in</span>
            </div>
            
            <div className="flex justify-center mb-6">
              <CountdownCircle seconds={seconds} total={30} />
            </div>
          </motion.div>

          {/* Manual redirect button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            {/* View Transactions Button */}
            {investmentData?.txHashes && investmentData.txHashes.length > 0 && (
              <motion.button
                onClick={() => setShowTxModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-xl font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                View Transactions
              </motion.button>
            )}
            
            <motion.button
              onClick={handleManualRedirect}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                initial={{ x: "100%" }}
                animate={{ x: isHovering ? "0%" : "100%" }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Button content */}
              <span className="relative flex items-center gap-3">
                <BarChart3 className="w-5 h-5" />
                Go to Dashboard Now
                <motion.span
                  animate={{ x: isHovering ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Footer info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-gray-800"
          >
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Powered by Fraxtal L2</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>5/5 Steps Completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Transaction Verification Modal */}
      <AnimatePresence>
        {showTxModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowTxModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-6 max-w-lg w-full shadow-2xl shadow-cyan-500/10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/20">
                    <FileText className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Transaction Verification</h3>
                    <p className="text-sm text-gray-400">5 transactions on Fraxscan</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTxModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Transaction List */}
              <div className="space-y-3 mb-6">
                {investmentData?.txHashes?.map((hash, index) => (
                  <motion.div
                    key={hash}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        Step {index + 1}: {txStepLabels[index]}
                      </p>
                      <p className="text-xs text-gray-500 font-mono truncate">
                        {hash}
                      </p>
                    </div>
                    <a
                      href={`https://fraxscan.com/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-xs font-medium flex-shrink-0"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowTxModal(false)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white font-medium hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
