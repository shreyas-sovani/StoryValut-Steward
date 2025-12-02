"use client";

import { TrendingUp, AlertTriangle, Zap, ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeverageRecommendation {
  status: "BEHIND_SCHEDULE" | "ON_TRACK";
  current_projection: number;
  shortfall?: number;
  target_amount: number;
  timeline_months: number;
  base_apy: number;
  recommendation?: {
    action: string;
    leverage_ratio: string;
    leverage_ratio_numeric: number;
    new_apy: string;
    new_apy_numeric: number;
    projected_with_boost: number;
    risk_level: "Low" | "Medium" | "High";
    risk_description: string;
    explanation: string;
    how_it_works: string;
    example_flow: string[];
  };
  fraxlend_details?: {
    pair: string;
    supply_apy: string;
    borrow_apr: string;
    max_ltv: string;
  };
  warning?: string | null;
}

interface OpportunityCardProps {
  data: LeverageRecommendation;
  onActivate?: () => void;
}

export default function OpportunityCard({
  data,
  onActivate,
}: OpportunityCardProps) {
  const {
    status,
    current_projection,
    shortfall = 0,
    target_amount,
    timeline_months,
    base_apy,
    recommendation,
    warning,
  } = data;

  // If on track, show success card
  if (status === "ON_TRACK") {
    return (
      <div className="my-4 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              ✅ You're On Track!
            </h3>
            <p className="text-sm text-green-300">
              Your goal is achievable with the base strategy
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Target Amount:</span>
            <span className="text-white font-bold">
              ${target_amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Projected Amount:</span>
            <span className="text-green-400 font-bold">
              ${current_projection.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Timeline:</span>
            <span className="text-white">{timeline_months} months</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Base APY:</span>
            <span className="text-white">{base_apy.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-300">
            With {base_apy.toFixed(1)}% APY, you'll exceed your goal by $
            {Math.abs(shortfall).toFixed(2)}. No leverage needed!
          </p>
        </div>
      </div>
    );
  }

  // Behind schedule - show opportunity alert
  if (!recommendation) return null;

  const progress = (current_projection / target_amount) * 100;
  const boostedProgress = (recommendation.projected_with_boost / target_amount) * 100;

  return (
    <div className="my-4 p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 shadow-2xl">
      {/* Alert Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
          <AlertTriangle className="w-7 h-7 text-orange-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            🚨 Opportunity Alert: Behind Schedule
          </h3>
          <p className="text-orange-300 text-sm">
            Your current strategy won't hit your ${target_amount.toFixed(0)} goal
          </p>
        </div>
      </div>

      {/* The Gap Visualization */}
      <div className="mb-6 p-4 rounded-xl bg-black/30 border border-orange-500/20">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Current Projection</span>
            <span className="text-sm font-medium text-orange-400">
              ${current_projection.toFixed(2)} (
              {progress.toFixed(0)}%)
            </span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 my-3 text-red-400 font-bold">
          <span>❌ SHORTFALL: ${shortfall.toFixed(2)}</span>
        </div>

        <div className="text-center text-sm text-gray-400 mb-3">
          Target: ${target_amount.toFixed(2)} in {timeline_months} months
        </div>
      </div>

      {/* Before / After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Before (Without Leverage) */}
        <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
          <div className="text-xs text-gray-500 uppercase mb-2">
            Without Leverage
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">APY:</span>
              <span className="text-white font-medium">
                {base_apy.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Projected:</span>
              <span className="text-red-400 font-bold">
                ${current_projection.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-red-400 mt-2">
              ❌ Misses goal by ${shortfall.toFixed(2)}
            </div>
          </div>
        </div>

        {/* After (With Leverage) */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="text-xs text-green-400 uppercase mb-2 font-bold">
            With {recommendation.leverage_ratio} Leverage
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">New APY:</span>
              <span className="text-green-400 font-bold text-lg">
                {recommendation.new_apy}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Projected:</span>
              <span className="text-green-400 font-bold">
                ${recommendation.projected_with_boost.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-green-400 mt-2">
              ✅ Hits your goal!
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar with Boost */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">With Leverage Boost</span>
          <span className="text-sm font-medium text-green-400">
            ${recommendation.projected_with_boost.toFixed(2)} (
            {boostedProgress.toFixed(0)}%)
          </span>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 animate-pulse"
            style={{ width: `${Math.min(boostedProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Risk Level Badge */}
      <div className="mb-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Risk Assessment</span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              recommendation.risk_level === "Low" &&
                "bg-green-500/20 text-green-400 border border-green-500/50",
              recommendation.risk_level === "Medium" &&
                "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
              recommendation.risk_level === "High" &&
                "bg-red-500/20 text-red-400 border border-red-500/50"
            )}
          >
            {recommendation.risk_level} Risk
          </span>
          <span className="text-xs text-gray-400">
            {recommendation.leverage_ratio} leverage ratio
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {recommendation.risk_description}
        </p>
      </div>

      {/* How It Works */}
      <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          How Fraxlend Leverage Works
        </h4>
        <ol className="space-y-2 text-sm text-gray-300">
          {recommendation.example_flow.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-purple-400 font-medium">{index + 1}.</span>
              <span>{step.replace(/^\d+\.\s*/, "")}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Warning */}
      {warning && (
        <div className="mb-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{warning}</span>
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onActivate}
        className={cn(
          "w-full py-4 px-6 rounded-xl font-bold text-lg",
          "bg-gradient-to-r from-green-600 to-emerald-600",
          "hover:from-green-500 hover:to-emerald-500",
          "text-white transition-all transform hover:scale-[1.02]",
          "flex items-center justify-center gap-3",
          "shadow-lg shadow-green-500/20"
        )}
      >
        <Zap className="w-6 h-6" />
        <span>Activate {recommendation.leverage_ratio} Leverage Boost</span>
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Learn More */}
      <div className="mt-4 text-center">
        <a
          href="https://docs.frax.finance/fraxlend/fraxlend-overview"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-purple-400 hover:text-purple-300 underline"
        >
          Learn more about Fraxlend →
        </a>
      </div>
    </div>
  );
}
