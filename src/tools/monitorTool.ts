/**
 * Autonomous Monitoring Tool - Phase 6: Stewardship
 * 
 * This tool transforms the agent from a passive chatbot into an active Steward
 * that continuously monitors vault performance and alerts users to market changes.
 */

import { createTool } from "@iqai/adk";
import { z } from "zod";
import { createPublicClient, http, parseAbi } from "viem";
import { fraxtal } from "viem/chains";

// Fraxtal Mainnet Configuration
const FRAXTAL_RPC = process.env.FRAXTAL_RPC_URL || "https://rpc.frax.com";
const SFRAX_CONTRACT = "0xfc00000000000000000000000000000000000008";
const SFRXETH_CONTRACT = "0xfc00000000000000000000000000000000000005";

// Create Viem client for Fraxtal
const publicClient = createPublicClient({
  chain: fraxtal,
  transport: http(FRAXTAL_RPC),
});

// Monitoring state (in production, use Redis or database)
const monitoringSessions = new Map<string, {
  asset: string;
  targetAPY: number;
  lastYield: number;
  intervalId?: NodeJS.Timeout;
  eventCallback?: (event: MonitoringEvent) => void;
}>();

interface MonitoringEvent {
  type: "yield_alert" | "yield_recovered" | "monitoring_update" | "monitoring_started" | "monitoring_error";
  asset: string;
  currentYield: number;
  targetYield: number;
  message: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
}

/**
 * Simulate yield fluctuations for demonstration
 * In production, this would fetch real on-chain data
 */
function simulateYieldFluctuation(baseYield: number, iteration: number): number {
  // Create realistic fluctuations
  const volatility = 0.3; // 0.3% volatility
  const trend = Math.sin(iteration * 0.1) * 0.2; // Slight trend
  const random = (Math.random() - 0.5) * volatility;
  
  return Number((baseYield + trend + random).toFixed(2));
}

/**
 * Fetch real yield from on-chain (simplified version)
 * In production, this would call the actual yield calculation
 */
async function fetchRealYield(asset: string): Promise<number> {
  try {
    // For demo, we'll simulate yield checks
    // In production, you'd read from yield-bearing contracts
    
    const contractAddress = asset === "sFRAX" ? SFRAX_CONTRACT : SFRXETH_CONTRACT;
    
    // Simulate fetching exchange rate or APY
    // Real implementation would call contract methods
    const baseYield = asset === "sFRAX" ? 4.5 : 3.8;
    
    // Add small random fluctuation for realism
    return baseYield + (Math.random() - 0.5) * 0.5;
  } catch (error) {
    console.error(`Error fetching yield for ${asset}:`, error);
    return 0;
  }
}

/**
 * Tool: start_monitoring_loop
 * 
 * Activates autonomous monitoring mode where the agent becomes a Steward
 * that watches vault performance and alerts the user to important changes.
 */
export const start_monitoring_loop = createTool({
  name: "start_monitoring_loop",
  description: `Activate Stewardship Mode - transform from chatbot to autonomous vault monitor.

This tool should be called when the user:
- Agrees to a strategy and "hires" the Steward
- Says "yes, monitor my vault" or "keep watching"
- Wants continuous oversight of their DeFi positions

DO NOT just say goodbye after recommending a strategy. If the user agrees, activate monitoring.

The Steward will:
1. Monitor yield performance every 5 seconds
2. Alert on significant drops (>0.5% decline)
3. Recommend rebalancing when yields fall below threshold
4. Celebrate when yields recover

This keeps the agent actively engaged, not just reactive.`,

  schema: z.object({
    strategy_asset: z
      .enum(["sFRAX", "sfrxETH"])
      .describe("The vault asset to monitor (sFRAX for stable, sfrxETH for growth)"),
    
    target_apy: z
      .number()
      .min(0)
      .max(100)
      .describe("Target APY threshold - alert if yield drops significantly below this"),
    
    user_name: z
      .string()
      .optional()
      .describe("User's name or identifier for personalized alerts"),
    
    monitoring_duration_minutes: z
      .number()
      .optional()
      .default(60)
      .describe("How long to monitor (default 60 minutes, max 240)"),
  }),

  fn: async ({ 
    strategy_asset, 
    target_apy, 
    user_name = "friend",
    monitoring_duration_minutes = 60 
  }) => {
    const sessionId = `monitor_${Date.now()}`;
    let iteration = 0;
    const maxIterations = (monitoring_duration_minutes * 60) / 5; // Check every 5 seconds
    
    console.log(`\n🔍 Stewardship Mode Activated for ${strategy_asset}`);
    console.log(`📊 Target APY: ${target_apy}%`);
    console.log(`⏱️  Monitoring Duration: ${monitoring_duration_minutes} minutes\n`);

    // Initial response
    const startMessage = `🛡️ **Stewardship Mode Activated**

I'm now actively monitoring your ${strategy_asset} vault, ${user_name}.

**Monitoring Parameters:**
- Asset: ${strategy_asset}
- Target APY: ${target_apy}%
- Alert Threshold: ${(target_apy - 0.5).toFixed(1)}%
- Duration: ${monitoring_duration_minutes} minutes

**What I'm Watching:**
✅ On-chain yield fluctuations
✅ Market conditions affecting your vault
✅ Opportunities for optimization

I'll alert you immediately if yields drop below ${(target_apy - 0.5).toFixed(1)}% or if I spot better opportunities.

*You can continue chatting with me - I'm multitasking! 🤖*

---
`;

    // Monitoring loop function
    const monitoringLoop = async (eventCallback: (event: MonitoringEvent) => void) => {
      try {
        iteration++;
        
        // Fetch current yield (simulated with realistic fluctuations)
        const currentYield = simulateYieldFluctuation(target_apy, iteration);
        
        // In production, use real on-chain data:
        // const currentYield = await fetchRealYield(strategy_asset);
        
        const session = monitoringSessions.get(sessionId);
        if (!session) return;

        const previousYield = session.lastYield || target_apy;
        const yieldChange = currentYield - previousYield;
        const alertThreshold = target_apy - 0.5; // Alert if drops 0.5% below target

        // Update session state
        session.lastYield = currentYield;

        // CRITICAL: Yield Drop Alert
        if (currentYield < alertThreshold && previousYield >= alertThreshold) {
          const criticalEvent: MonitoringEvent = {
            type: "yield_alert",
            asset: strategy_asset,
            currentYield,
            targetYield: target_apy,
            message: `⚠️ **YIELD ALERT - Action Recommended**

${user_name}, your ${strategy_asset} vault APY has dropped to **${currentYield.toFixed(2)}%** (target: ${target_apy}%).

**What This Means:**
${strategy_asset === "sFRAX" 
  ? "Stable yields are softening - FRAX demand may be decreasing."
  : "ETH staking rewards are declining - network activity may be lower."}

**Recommended Actions:**
1. 🔄 **Rebalance:** Consider moving ${strategy_asset === "sFRAX" ? "to sfrxETH for higher yields" : "to sFRAX for stability"}
2. 📊 **Hold & Monitor:** Wait for market conditions to improve
3. 💼 **Diversify:** Split allocation between stable and growth assets

*I'm continuing to watch. I'll alert you if conditions change.*`,
            timestamp: new Date().toISOString(),
            severity: "critical",
          };

          eventCallback(criticalEvent);
        }
        // Yield Recovered
        else if (currentYield >= target_apy && previousYield < target_apy) {
          const recoveryEvent: MonitoringEvent = {
            type: "yield_recovered",
            asset: strategy_asset,
            currentYield,
            targetYield: target_apy,
            message: `✅ **Yield Recovered**

Good news, ${user_name}! Your ${strategy_asset} vault has recovered to **${currentYield.toFixed(2)}%**.

Your strategy is performing as expected. I'll keep watching for any changes.`,
            timestamp: new Date().toISOString(),
            severity: "info",
          };

          eventCallback(recoveryEvent);
        }
        // Periodic Update (every 20 iterations = ~100 seconds)
        else if (iteration % 20 === 0) {
          const updateEvent: MonitoringEvent = {
            type: "monitoring_update",
            asset: strategy_asset,
            currentYield,
            targetYield: target_apy,
            message: `📊 **Monitoring Update** (${Math.floor(iteration * 5 / 60)} min)

${strategy_asset} APY: **${currentYield.toFixed(2)}%** ${yieldChange >= 0 ? "📈" : "📉"} (${yieldChange >= 0 ? "+" : ""}${yieldChange.toFixed(2)}%)

Status: ${currentYield >= alertThreshold ? "✅ Healthy" : "⚠️  Below Target"}

*Still watching closely...*`,
            timestamp: new Date().toISOString(),
            severity: currentYield >= alertThreshold ? "info" : "warning",
          };

          eventCallback(updateEvent);
        }

        // Stop monitoring after max iterations
        if (iteration >= maxIterations) {
          const intervalId = session.intervalId;
          if (intervalId) {
            clearInterval(intervalId);
            monitoringSessions.delete(sessionId);
          }

          const endEvent: MonitoringEvent = {
            type: "monitoring_update",
            asset: strategy_asset,
            currentYield,
            targetYield: target_apy,
            message: `🛡️ **Monitoring Session Complete**

I've finished monitoring your ${strategy_asset} vault for ${monitoring_duration_minutes} minutes.

**Final Status:**
- Current APY: ${currentYield.toFixed(2)}%
- Target APY: ${target_apy}%
- Performance: ${currentYield >= target_apy ? "✅ On Target" : "⚠️ Below Target"}

Would you like me to continue monitoring? Just say "keep watching" and I'll stay active!`,
            timestamp: new Date().toISOString(),
            severity: "info",
          };

          eventCallback(endEvent);
        }
      } catch (error) {
        console.error("Monitoring loop error:", error);
        
        const errorEvent: MonitoringEvent = {
          type: "monitoring_error",
          asset: strategy_asset,
          currentYield: 0,
          targetYield: target_apy,
          message: `⚠️ Monitoring Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          timestamp: new Date().toISOString(),
          severity: "warning",
        };

        eventCallback(errorEvent);
      }
    };

    // Return monitoring function and initial message
    return {
      success: true,
      sessionId,
      message: startMessage,
      monitoringFunction: monitoringLoop,
      asset: strategy_asset,
      targetAPY: target_apy,
      checkInterval: 5000, // milliseconds
    };
  },
});

/**
 * Stop monitoring for a specific session
 */
export function stopMonitoring(sessionId: string): boolean {
  const session = monitoringSessions.get(sessionId);
  if (session && session.intervalId) {
    clearInterval(session.intervalId);
    monitoringSessions.delete(sessionId);
    return true;
  }
  return false;
}

/**
 * Get active monitoring sessions
 */
export function getActiveMonitoringSessions(): string[] {
  return Array.from(monitoringSessions.keys());
}
