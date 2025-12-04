"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Shield, TrendingUp, Save, Loader2, Check } from "lucide-react";
import { clsx } from "clsx";

// ============================================================================
// TYPES
// ============================================================================

interface StrategySliderProps {
  stablePercent: number;
  onChange: (stablePercent: number) => void;
  onSave: () => Promise<boolean>;
  isSaving: boolean;
  disabled?: boolean;
  isFromChat?: boolean; // Strategy was set from chat
}

// ============================================================================
// CUSTOM TOOLTIP
// ============================================================================

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 shadow-xl shadow-cyan-500/10">
        <p className="text-sm font-medium text-white">{data.name}</p>
        <p className="text-xs text-cyan-400">{data.value}%</p>
        <p className="text-xs text-gray-400 mt-1">{data.description}</p>
      </div>
    );
  }
  return null;
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function StrategySlider({
  stablePercent,
  onChange,
  onSave,
  isSaving,
  disabled = false,
  isFromChat = false,
}: StrategySliderProps) {
  const [localValue, setLocalValue] = useState(stablePercent);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync local value when prop changes
  useEffect(() => {
    console.log("📊 StrategySlider received stablePercent:", stablePercent);
    setLocalValue(stablePercent);
  }, [stablePercent]);

  // Check for changes
  useEffect(() => {
    setHasChanges(localValue !== stablePercent);
  }, [localValue, stablePercent]);

  // Pie chart data
  const pieData = [
    {
      name: "Stable",
      value: localValue,
      color: "#06b6d4", // Cyan
      description: "sfrxUSD Vault (~4.1% APY)",
    },
    {
      name: "Growth",
      value: 100 - localValue,
      color: "#a855f7", // Purple
      description: "sfrxETH Vault (~6-7% APY)",
    },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFromChat) return; // Locked when from chat
    const value = parseInt(e.target.value);
    setLocalValue(value);
    onChange(value);
  };

  const handleSave = async () => {
    if (isFromChat) return; // Already confirmed from chat
    const success = await onSave();
    if (success) {
      setHasChanges(false);
    }
  };

  // If strategy is from chat, show CONFIRMED read-only view
  if (isFromChat) {
    return (
      <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6">
        {/* Confirmed Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Strategy Confirmed
            </h3>
            <p className="text-sm text-green-400/80 mt-1">
              Set from chat conversation
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <span className="text-sm font-medium text-green-400 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Locked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48" style={{ minWidth: 192, minHeight: 192 }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                    animationBegin={0}
                    animationDuration={500}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="drop-shadow-lg"
                        style={{
                          filter: `drop-shadow(0 0 8px ${entry.color}50)`,
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">
                  {localValue}/{100 - localValue}
                </span>
                <span className="text-xs text-gray-400">Split</span>
              </div>
            </div>
          </div>

          {/* Strategy Details (Read-only) */}
          <div className="flex flex-col justify-center space-y-4">
            {/* Stable */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    Stable (sfrxUSD)
                  </span>
                  <span className="text-lg font-bold text-cyan-400">
                    {localValue}%
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  ~4.1% APY · US Treasury Backed
                </p>
              </div>
            </div>

            {/* Growth */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    Growth (sfrxETH)
                  </span>
                  <span className="text-lg font-bold text-purple-400">
                    {100 - localValue}%
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  ~6-7% APY · ETH Staking Yield
                </p>
              </div>
            </div>

            {/* Blended APY */}
            <div className="mt-2 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Expected Blended APY</span>
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ~{((localValue * 4.1 + (100 - localValue) * 6.5) / 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            💡 This strategy was confirmed in chat. Deposit FRAX below to start earning.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Investment Strategy
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Adjust your risk/reward profile
          </p>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={!hasChanges || isSaving || disabled}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
            hasChanges && !isSaving && !disabled
              ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-cyan-500/25"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          )}
          whileHover={hasChanges && !isSaving ? { scale: 1.02 } : {}}
          whileTap={hasChanges && !isSaving ? { scale: 0.98 } : {}}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Strategy
            </>
          )}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48" style={{ minWidth: 192, minHeight: 192 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                  animationBegin={0}
                  animationDuration={500}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="drop-shadow-lg"
                      style={{
                        filter: `drop-shadow(0 0 8px ${entry.color}50)`,
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">
                {localValue}/{100 - localValue}
              </span>
              <span className="text-xs text-gray-400">Split</span>
            </div>
          </div>
        </div>

        {/* Slider & Labels */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Conservative Label */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  Conservative
                </span>
                <span className="text-sm font-bold text-cyan-400">
                  {localValue}%
                </span>
              </div>
              <p className="text-xs text-gray-500">
                sfrxUSD Vault · ~5% APY · Low Risk
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative px-1">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={localValue}
              onChange={handleSliderChange}
              disabled={disabled}
              className={clsx(
                "w-full h-2 appearance-none rounded-lg cursor-pointer",
                "bg-gradient-to-r from-cyan-500 to-purple-500",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:w-6",
                "[&::-webkit-slider-thumb]:h-6",
                "[&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-white",
                "[&::-webkit-slider-thumb]:border-4",
                "[&::-webkit-slider-thumb]:border-gray-900",
                "[&::-webkit-slider-thumb]:shadow-lg",
                "[&::-webkit-slider-thumb]:shadow-cyan-500/50",
                "[&::-webkit-slider-thumb]:cursor-grab",
                "[&::-webkit-slider-thumb]:active:cursor-grabbing",
                "[&::-webkit-slider-thumb]:transition-transform",
                "[&::-webkit-slider-thumb]:hover:scale-110",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />

            {/* Tick Marks */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[10px] text-gray-500 px-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Growth Label */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Growth</span>
                <span className="text-sm font-bold text-purple-400">
                  {100 - localValue}%
                </span>
              </div>
              <p className="text-xs text-gray-500">
                sfrxETH Vault · ~8-12% APY · Higher Risk
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Presets */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <p className="text-xs text-gray-500 mb-3">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Conservative", value: 80 },
            { name: "Balanced", value: 60 },
            { name: "Growth", value: 40 },
            { name: "Aggressive", value: 20 },
          ].map((preset) => (
            <motion.button
              key={preset.name}
              onClick={() => {
                setLocalValue(preset.value);
                onChange(preset.value);
              }}
              disabled={disabled}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                localValue === preset.value
                  ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white border border-cyan-500/50"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-transparent",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              whileHover={!disabled ? { scale: 1.05 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
            >
              {preset.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
