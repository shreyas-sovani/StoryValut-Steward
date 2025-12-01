"use client";

import { CheckCircle2, ExternalLink, Wallet, Coins, Target } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

interface VaultCardProps {
  vaultData: VaultDeployment | null;
}

export default function VaultCard({ vaultData }: VaultCardProps) {
  if (!vaultData) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center text-gray-500">
          <Wallet className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No vault deployed yet</p>
          <p className="text-sm mt-2">
            Chat with the Steward to create your personalized strategy
          </p>
        </div>
      </div>
    );
  }

  const { agent_id, tx_hash, atp_strategy_url, deployed_at, strategy_summary } =
    vaultData;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center pb-6 border-b border-purple-500/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            🎉 Strategy Deployed!
          </h2>
          <p className="text-purple-300">
            Your personalized DeFi vault is ready on Fraxtal
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

        {/* ATP Strategy Link */}
        <a
          href={atp_strategy_url}
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
          <span>View Strategy on ATP</span>
          <ExternalLink className="w-5 h-5" />
        </a>

        {/* Info Box */}
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm text-purple-200 leading-relaxed">
            <strong>Next Steps:</strong> Visit the ATP dashboard to complete
            your vault setup. You'll need to connect your wallet and deposit
            funds to activate the strategy.
          </p>
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
