"use client";

import {
  CheckCircle2,
  ExternalLink,
  Wallet,
  Coins,
  Target,
  PieChart as PieChartIcon,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import StrategyChart, { StrategyChartSkeleton } from "./StrategyChart";

interface CompositionData {
  name: string;
  value: number;
  color: string;
}

interface VaultDeployment {
  agent_id: string;
  tx_hash: string;
  atp_strategy_url: string;
  deployed_at: string;
  strategy_summary: {
    protocol: string;
    apr: string;
    risk_level: string;
    allocation: string;
  };
  portfolio_composition?: CompositionData[];
}

interface VaultCardProps {
  vaultData: VaultDeployment | null;
  isLoading?: boolean;
  onHireSteward?: () => void;
}

export default function VaultCard({
  vaultData,
  isLoading = false,
  onHireSteward,
}: VaultCardProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <StrategyChartSkeleton />
        </div>
      </div>
    );
  }

  // Empty state
  if (!vaultData) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center text-gray-500 max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/10 to-amber-500/10 flex items-center justify-center">
            <PieChartIcon className="w-10 h-10 opacity-30" />
          </div>
          <p className="text-xl font-medium text-gray-400 mb-3">
            No strategy visualized yet
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Chat with the StoryVault Steward to analyze your financial story
            and receive a personalized DeFi strategy with visual breakdown.
          </p>
          <div className="mt-6 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
            <p className="text-xs text-purple-300">
              💡 <strong>Try:</strong> "I'm a 28-year-old saving for a house in
              3 years. Risk-averse."
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    agent_id,
    tx_hash,
    atp_strategy_url,
    deployed_at,
    strategy_summary,
    portfolio_composition,
  } = vaultData;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Strategy Chart - Show First! */}
        {portfolio_composition && portfolio_composition.length > 0 && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-purple-500/20 backdrop-blur-sm">
            <StrategyChart
              data={portfolio_composition}
              title="Your Personalized Strategy"
            />
          </div>
        )}

        {/* Success Header */}
        <div className="text-center pb-6 border-b border-purple-500/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            🎉 Strategy Ready!
          </h2>
          <p className="text-purple-300">
            Your personalized DeFi strategy on Fraxtal
          </p>
        </div>

        {/* Strategy Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<Coins className="w-5 h-5" />}
            label="Protocol"
            value={strategy_summary.protocol}
            gradient="from-purple-500/10 to-purple-600/10"
          />
          <StatCard
            icon={<Target className="w-5 h-5" />}
            label="Expected APR"
            value={strategy_summary.apr}
            gradient="from-amber-500/10 to-amber-600/10"
          />
          <StatCard
            icon={<Wallet className="w-5 h-5" />}
            label="Risk Level"
            value={strategy_summary.risk_level}
            gradient="from-blue-500/10 to-blue-600/10"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="Allocation"
            value={strategy_summary.allocation}
            gradient="from-green-500/10 to-green-600/10"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <DetailRow label="Agent ID" value={agent_id} mono />
          <DetailRow label="Transaction Hash" value={tx_hash} mono />
          <DetailRow
            label="Deployed At"
            value={new Date(deployed_at).toLocaleString()}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          {/* Deploy to ATP Button */}
          <a
            href="https://app.iqai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block w-full px-6 py-4 rounded-xl",
              "bg-gradient-to-r from-purple-600 to-amber-600",
              "hover:from-purple-500 hover:to-amber-500",
              "transition-all transform hover:scale-[1.02]",
              "text-white font-medium text-center",
              "flex items-center justify-center gap-3"
            )}
          >
            <Rocket className="w-5 h-5" />
            <span>Deploy to ATP Platform</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Hire Steward Button */}
          {onHireSteward && (
            <button
              onClick={onHireSteward}
              className={cn(
                "w-full px-6 py-4 rounded-xl",
                "bg-gradient-to-r from-green-600 to-emerald-600",
                "hover:from-green-500 hover:to-emerald-500",
                "transition-all transform hover:scale-[1.02]",
                "text-white font-medium text-center",
                "flex items-center justify-center gap-3",
                "shadow-lg shadow-green-500/20"
              )}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Hire Steward (Stake IQ)</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                Start Monitoring
              </span>
            </button>
          )}

          {/* View Strategy Link */}
          <a
            href={atp_strategy_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "block w-full px-6 py-3 rounded-xl",
              "bg-gray-800/50 border border-purple-500/30",
              "hover:bg-gray-800 hover:border-purple-500",
              "transition-all",
              "text-purple-300 font-medium text-center text-sm",
              "flex items-center justify-center gap-2"
            )}
          >
            <span>View Strategy Details</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-200 leading-relaxed">
            <strong>Next Steps:</strong> Deploy your agent on ATP Platform
            (requires 1,500 IQ + $10 frxETH), then click "Hire Steward" to
            activate 24/7 autonomous monitoring of your vault yields.
          </p>
        </div>

        {/* Requirements Card */}
        <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700">
          <h4 className="text-sm font-semibold text-white mb-3">
            Deployment Requirements
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>1,500 IQ tokens (bonding curve entry)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>~$10 worth of frxETH (gas + initial funding)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span>Wallet connected to Fraxtal network</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border border-purple-500/20",
        "bg-gradient-to-br",
        gradient
      )}
    >
      <div className="flex items-center gap-2 mb-2 text-purple-300">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs font-medium uppercase tracking-wide text-purple-300">
        {label}
      </div>
      <div
        className={cn(
          "text-sm text-gray-100 break-all",
          mono && "font-mono bg-gray-800/50 px-3 py-2 rounded-lg"
        )}
      >
        {value}
      </div>
    </div>
  );
}
