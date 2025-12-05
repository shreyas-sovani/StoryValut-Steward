"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  ArrowRightLeft,
  Vault,
  Check,
  X,
  Loader2,
  Circle,
  ExternalLink,
} from "lucide-react";
import { clsx } from "clsx";
import type { ExecutionStep } from "@/hooks/useSmartInvest";

// ============================================================================
// TYPES
// ============================================================================

interface LiveExecutionLogProps {
  steps: ExecutionStep[];
  currentStepIndex: number | null;
  isComplete: boolean;
  error: string | null;
  depositAmount: string | null;
}

// ============================================================================
// STEP ICONS
// ============================================================================

const getStepIcon = (stepId: number) => {
  switch (stepId) {
    case 1:
      return Box; // Wrap
    case 2:
    case 4:
      return ArrowRightLeft; // Swap
    case 3:
    case 5:
      return Vault; // Stake
    default:
      return Circle;
  }
};

// ============================================================================
// STATUS INDICATOR
// ============================================================================

const StatusIndicator = ({
  status,
}: {
  status: ExecutionStep["status"];
}) => {
  switch (status) {
    case "pending":
      return (
        <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
          <Circle className="w-3 h-3 text-gray-500" />
        </div>
      );
    case "processing":
      return (
        <motion.div
          className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center"
          animate={{ boxShadow: ["0 0 0px rgba(6, 182, 212, 0.5)", "0 0 20px rgba(6, 182, 212, 0.8)", "0 0 0px rgba(6, 182, 212, 0.5)"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
        </motion.div>
      );
    case "success":
      return (
        <motion.div
          className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Check className="w-4 h-4 text-green-400" />
        </motion.div>
      );
    case "failed":
      return (
        <motion.div
          className="w-8 h-8 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <X className="w-4 h-4 text-red-400" />
        </motion.div>
      );
  }
};

// ============================================================================
// STEP CARD
// ============================================================================

const StepCard = ({
  step,
  isLast,
}: {
  step: ExecutionStep;
  isLast: boolean;
}) => {
  const Icon = getStepIcon(step.id);

  const statusColors = {
    pending: "border-gray-700 bg-gray-900/30",
    processing: "border-cyan-500/50 bg-cyan-500/5",
    success: "border-green-500/50 bg-green-500/5",
    failed: "border-red-500/50 bg-red-500/5",
  };

  const textColors = {
    pending: "text-gray-500",
    processing: "text-cyan-400",
    success: "text-green-400",
    failed: "text-red-400",
  };

  return (
    <div className="flex gap-4">
      {/* Status Indicator & Line */}
      <div className="flex flex-col items-center">
        <StatusIndicator status={step.status} />
        {!isLast && (
          <div
            className={clsx(
              "w-0.5 flex-1 min-h-[40px] transition-colors duration-300",
              step.status === "success"
                ? "bg-gradient-to-b from-green-500 to-green-500/20"
                : step.status === "processing"
                ? "bg-gradient-to-b from-cyan-500 to-gray-700"
                : "bg-gray-700"
            )}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        className={clsx(
          "flex-1 rounded-xl border p-4 mb-4 transition-all duration-300",
          statusColors[step.status]
        )}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={clsx(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                step.status === "processing"
                  ? "bg-cyan-500/20"
                  : step.status === "success"
                  ? "bg-green-500/20"
                  : step.status === "failed"
                  ? "bg-red-500/20"
                  : "bg-gray-800"
              )}
            >
              <Icon
                className={clsx(
                  "w-5 h-5 transition-colors",
                  textColors[step.status]
                )}
              />
            </div>
            <div>
              <h4
                className={clsx(
                  "font-semibold transition-colors",
                  step.status === "pending" ? "text-gray-400" : "text-white"
                )}
              >
                Step {step.id}: {step.name}
              </h4>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={clsx(
              "px-2 py-1 rounded text-xs font-medium uppercase tracking-wide",
              step.status === "pending" && "bg-gray-800 text-gray-500",
              step.status === "processing" &&
                "bg-cyan-500/20 text-cyan-400 animate-pulse",
              step.status === "success" && "bg-green-500/20 text-green-400",
              step.status === "failed" && "bg-red-500/20 text-red-400"
            )}
          >
            {step.status}
          </span>
        </div>

        {/* Transaction Hash */}
        <AnimatePresence>
          {step.txHash && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-800"
            >
              <a
                href={`https://fraxscan.com/tx/${step.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                <span className="font-mono">
                  {step.txHash.slice(0, 10)}...{step.txHash.slice(-8)}
                </span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LiveExecutionLog({
  steps,
  currentStepIndex,
  isComplete,
  error,
  depositAmount,
}: LiveExecutionLogProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            Smart Invest Execution
          </h3>
          {depositAmount && (
            <p className="text-sm text-gray-400 mt-1">
              Processing{" "}
              <span className="text-cyan-400 font-mono">{depositAmount}</span>{" "}
              FRAX
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="text-right">
          <span className="text-2xl font-bold text-white">
            {steps.filter((s) => s.status === "success").length}/{steps.length}
          </span>
          <p className="text-xs text-gray-500">Steps Complete</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{
              width: `${
                (steps.filter((s) => s.status === "success").length /
                  steps.length) *
                100
              }%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-0">
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-green-400">
                  🎉 Investment Complete!
                </h4>
                <p className="text-sm text-gray-400">
                  Your funds are now earning yield in both vaults
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h4 className="font-bold text-red-400">Execution Failed</h4>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
