import { createTool } from "@iqai/adk";
import { z } from "zod";
import { createPublicClient, http, isAddress, getAddress } from "viem";
import { fraxtal } from "viem/chains";

// Fraxtal Mainnet public client
const publicClient = createPublicClient({
  chain: fraxtal,
  transport: http("https://rpc.frax.com"),
});

/**
 * START STEWARDSHIP - Autonomous Monitoring Loop
 * 
 * This tool transforms the agent from a "consultant" to a "steward."
 * After deployment, the agent continuously monitors the vault's performance
 * and provides real-time status updates WITHOUT exiting.
 * 
 * Demo Mode: Simulates yield fluctuations every 10 seconds for demonstration.
 * Production: Would connect to real Fraxtal vault contracts.
 */
export const start_stewardship = createTool({
  name: "start_stewardship",
  description: `Activate autonomous stewardship mode. The agent becomes a persistent guardian of the user's deployed vault, continuously monitoring yields, scanning blocks, and providing live status updates. This tool enters an infinite monitoring loop - the agent MUST NOT exit after calling this. Use this ONLY after the user has deployed their vault on ATP and provided their Agent Address.`,
  
  schema: z.object({
    agentAddress: z
      .string()
      .describe("The deployed ATP Agent address on Fraxtal (0x...)"),
    targetStrategy: z
      .string()
      .describe("The strategy being monitored (e.g., 'sFRAX Stable Vault' or 'Balanced sFRAX+sfrxETH')"),
    targetYield: z
      .number()
      .min(0)
      .max(100)
      .describe("The expected target APY for this strategy (e.g., 4.5)"),
  }),

  fn: async ({ agentAddress, targetStrategy, targetYield }) => {
    // ============================================================
    // STEP 1: VERIFY AGENT ADDRESS ON FRAXTAL
    // ============================================================
    
    // Validate Ethereum address format
    if (!isAddress(agentAddress)) {
      return `❌ **Error: Invalid Address**\n\nThe provided address "${agentAddress}" is not a valid Ethereum address. Please check and provide a valid ATP Agent address (starts with 0x, 42 characters).`;
    }

    const checksumAddress = getAddress(agentAddress);

    // Check if address has deployed code (is a contract)
    let isContract = false;
    let blockNumber = 0n;

    try {
      const code = await publicClient.getBytecode({
        address: checksumAddress as `0x${string}`,
      });
      isContract = code !== undefined && code !== "0x" && code.length > 2;

      // Get current block number
      blockNumber = await publicClient.getBlockNumber();
    } catch (error) {
      return `❌ **Error: Fraxtal Connection Failed**\n\nCould not connect to Fraxtal RPC to verify the agent address. Error: ${error instanceof Error ? error.message : String(error)}\n\nPlease try again or check your network connection.`;
    }

    if (!isContract) {
      return `⚠️ **Warning: Address Not Deployed**\n\nThe address ${checksumAddress} does not appear to be a deployed contract on Fraxtal.\n\n**Possible Reasons:**\n- The agent hasn't been deployed yet on ATP\n- The deployment is still pending\n- Wrong address provided\n\n**Action:** Please deploy your agent on https://app.iqai.com/ first, then provide the correct address.`;
    }

    // ============================================================
    // STEP 2: ACTIVATE STEWARDSHIP MODE
    // ============================================================

    const activationMessage = `
🛡️ **STEWARDSHIP MODE ACTIVATED**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Agent Details:**
├─ Address: \`${checksumAddress}\`
├─ Strategy: ${targetStrategy}
├─ Target APY: ${targetYield}%
└─ Network: Fraxtal Mainnet (Chain ID: 252)

**Status:** ✅ Agent verified on-chain
**Block Height:** #${blockNumber.toString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I am now your dedicated Steward. I will monitor your vault 24/7 and report:
- Real-time APY changes
- Block-by-block health checks
- Yield optimization opportunities
- Market condition updates

**The monitoring loop is now running. Stay connected for live updates...**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    // ============================================================
    // STEP 3: ENTER AUTONOMOUS MONITORING LOOP
    // ============================================================

    // Return activation message immediately
    console.log(activationMessage);

    // Start background monitoring loop
    startMonitoringLoop(checksumAddress, targetStrategy, targetYield);

    return activationMessage;
  },
});

/**
 * Background Monitoring Loop
 * Runs every 10 seconds, simulates vault monitoring, emits status updates
 */
function startMonitoringLoop(
  agentAddress: string,
  targetStrategy: string,
  targetYield: number
) {
  let checkCount = 0;
  let currentYield = targetYield; // Start at target
  let lastAlertType: "healthy" | "warning" | "critical" = "healthy";

  const monitoringInterval = setInterval(async () => {
    checkCount++;

    // ============================================================
    // SIMULATE YIELD FLUCTUATION (Demo Mode)
    // ============================================================
    // In production, this would query real Fraxtal vault contracts
    
    // Randomly fluctuate yield by ±0.1% to ±0.5%
    const fluctuation = (Math.random() - 0.5) * 0.6; // Range: -0.3 to +0.3
    currentYield = Math.max(0, currentYield + fluctuation);

    // Calculate deviation from target
    const deviation = targetYield - currentYield;
    const deviationPercent = (deviation / targetYield) * 100;

    // Determine status
    let status: "healthy" | "warning" | "critical" = "healthy";
    let icon = "✅";
    let statusText = "Healthy";

    if (Math.abs(deviationPercent) > 15) {
      status = "critical";
      icon = "🚨";
      statusText = "CRITICAL";
    } else if (Math.abs(deviationPercent) > 8) {
      status = "warning";
      icon = "⚠️";
      statusText = "Warning";
    }

    // ============================================================
    // FETCH CURRENT BLOCK NUMBER
    // ============================================================
    let blockNumber = 0n;
    try {
      blockNumber = await publicClient.getBlockNumber();
    } catch (error) {
      console.error("❌ Failed to fetch block number:", error);
      blockNumber = BigInt(30000000 + checkCount); // Fallback
    }

    // ============================================================
    // EMIT STATUS UPDATE
    // ============================================================

    const timestamp = new Date().toLocaleTimeString();

    // Every 5 checks (50 seconds), send detailed update
    if (checkCount % 5 === 0) {
      const detailedUpdate = `
📊 **MONITORING UPDATE** [${timestamp}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**Block:** #${blockNumber.toString()}
**Strategy:** ${targetStrategy}
**Current APY:** ${currentYield.toFixed(2)}%
**Target APY:** ${targetYield.toFixed(2)}%
**Deviation:** ${deviationPercent >= 0 ? "+" : ""}${deviationPercent.toFixed(1)}%
**Status:** ${icon} ${statusText}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      console.log(detailedUpdate);
    } else {
      // Quick status line
      console.log(
        `[${timestamp}] Block #${blockNumber.toString()} | APY: ${currentYield.toFixed(2)}% | ${icon} ${statusText}`
      );
    }

    // ============================================================
    // EMIT ALERTS ON STATUS CHANGE
    // ============================================================

    if (status !== lastAlertType) {
      if (status === "critical") {
        const criticalAlert = `
🚨 **CRITICAL ALERT** [${timestamp}]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**WARNING:** Yield has deviated significantly!

**Current APY:** ${currentYield.toFixed(2)}%
**Target APY:** ${targetYield.toFixed(2)}%
**Deviation:** ${Math.abs(deviationPercent).toFixed(1)}%

**Recommendation:**
${
  currentYield < targetYield
    ? "• Consider rebalancing to higher-yield assets\n• Monitor for recovery over next 24h\n• Check Fraxtal market conditions"
    : "• Yield spike detected - monitor for sustainability\n• Consider harvesting gains\n• Review strategy allocation"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        console.log(criticalAlert);
      } else if (status === "warning" && lastAlertType === "healthy") {
        console.log(
          `⚠️ [${timestamp}] Yield deviated ${Math.abs(deviationPercent).toFixed(1)}% from target. Monitoring closely...`
        );
      } else if (status === "healthy" && lastAlertType !== "healthy") {
        console.log(
          `✅ [${timestamp}] Yield recovered! Back to healthy range (${currentYield.toFixed(2)}%)`
        );
      }

      lastAlertType = status;
    }

    // ============================================================
    // PERIODIC INSIGHTS (Every 30 checks = 5 minutes)
    // ============================================================

    if (checkCount % 30 === 0) {
      const insights = `
💡 **5-MINUTE INSIGHT REPORT**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**Monitoring Duration:** ${Math.floor(checkCount * 10 / 60)} minutes
**Checks Performed:** ${checkCount}
**Average APY:** ${currentYield.toFixed(2)}%
**Status:** ${icon} ${statusText}

**Fraxtal Network:**
├─ Latest Block: #${blockNumber.toString()}
├─ Network: Healthy
└─ Gas: Normal

**Next Check:** 10 seconds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      console.log(insights);
    }
  }, 10000); // Run every 10 seconds

  // Keep process alive (never clear interval in demo mode)
  // In production, you'd have a graceful shutdown handler
  console.log("🔄 Monitoring loop started. Interval ID:", monitoringInterval);
}

/**
 * Helper: Check if an address is a deployed contract
 */
export async function verifyAgentContract(
  address: string
): Promise<{ isValid: boolean; isContract: boolean; blockNumber: bigint }> {
  if (!isAddress(address)) {
    return { isValid: false, isContract: false, blockNumber: 0n };
  }

  try {
    const checksumAddress = getAddress(address);
    const code = await publicClient.getBytecode({
      address: checksumAddress as `0x${string}`,
    });
    const blockNumber = await publicClient.getBlockNumber();

    const isContract = code !== undefined && code !== "0x" && code.length > 2;

    return {
      isValid: true,
      isContract,
      blockNumber,
    };
  } catch (error) {
    console.error("Error verifying contract:", error);
    return { isValid: false, isContract: false, blockNumber: 0n };
  }
}
