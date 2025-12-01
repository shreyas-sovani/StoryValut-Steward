"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface CompositionData {
  name: string;
  value: number;
  color: string;
  [key: string]: any; // Allow additional properties for Recharts
}

interface StrategyChartProps {
  data: CompositionData[];
  title?: string;
}

export default function StrategyChart({
  data,
  title = "Portfolio Allocation",
}: StrategyChartProps) {
  if (!data || data.length === 0) {
    return null;
  }

  // Custom label for the pie chart
  const renderLabel = (props: any) => {
    return `${props.value}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 border border-purple-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-purple-300 text-sm">{data.value}% allocation</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-300">{entry.value}</span>
            <span className="text-sm text-purple-300 ml-auto font-medium">
              {entry.payload.value}%
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-purple-300">Recommended asset distribution</p>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-amber-500/5 rounded-xl backdrop-blur-sm" />

        {/* Chart */}
        <div className="relative p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#1f2937"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategy Explanation */}
      <div className="mt-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <p className="text-sm text-purple-200 leading-relaxed">
          {data.length === 1 ? (
            <>
              <strong>Conservative Strategy:</strong> 100% stablecoin allocation
              for maximum safety and predictable returns.
            </>
          ) : (
            <>
              <strong>Balanced Strategy:</strong> Combining stable yields (
              {data[0].value}%) with growth potential ({data[1].value}%) for
              optimized risk-adjusted returns.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// Helper component for chart loading state
export function StrategyChartSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-8 bg-gray-800/50 rounded mb-4 w-3/4 mx-auto" />
      <div className="h-[300px] bg-gradient-to-br from-purple-500/5 to-amber-500/5 rounded-xl flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-800/50" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-800/50 rounded w-full" />
        <div className="h-4 bg-gray-800/50 rounded w-5/6" />
      </div>
    </div>
  );
}
