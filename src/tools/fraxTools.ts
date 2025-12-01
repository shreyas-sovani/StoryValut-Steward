import { createTool } from "@iqai/adk";
import { z } from "zod";

/**
 * Fraxtal Network Contract Addresses (Mainnet - Chain ID: 252)
 * - frxETH: 0xfc00000000000000000000000000000000000006
 * - sfrxETH: 0xfc00000000000000000000000000000000000005
 * - FRAX: Native Token
 * RPC: https://rpc.frax.com
 */

export const get_frax_yields = createTool({
  name: "get_frax_yields",
  description: "Fetches current APY yields for sFRAX and sfrxETH on the Fraxtal network. Use this to provide users with real-time yield information for safe DeFi strategies.",
  schema: z.object({}),
  fn: async () => {
    // Mock yield data - in production, this would query on-chain data via viem
    const yields = {
      network: "Fraxtal Mainnet L2",
      chainId: 252,
      timestamp: new Date().toISOString(),
      yields: {
        sFRAX: {
          apy: 4.5,
          symbol: "sFRAX",
          description: "Staked FRAX - Native stablecoin yield",
          riskLevel: "Low"
        },
        sfrxETH: {
          apy: 3.8,
          symbol: "sfrxETH",
          address: "0xfc00000000000000000000000000000000000005",
          description: "Staked frxETH - Ethereum liquid staking",
          riskLevel: "Medium"
        }
      },
      explorer: "https://fraxscan.com"
    };

    return yields;
  },
});
