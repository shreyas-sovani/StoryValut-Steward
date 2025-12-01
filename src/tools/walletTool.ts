/**
 * Wallet Balance Checker Tool for Fraxtal Mainnet
 * 
 * This tool makes the agent "blockchain aware" by checking real wallet balances
 * on Fraxtal L2. It verifies both native FRAX (gas) and sfrxETH token balances.
 */

import { createTool } from "@iqai/adk";
import { z } from "zod";
import { createPublicClient, http, formatEther, parseAbi } from "viem";
import { fraxtal } from "viem/chains";

// Fraxtal Mainnet Configuration
const FRAXTAL_RPC = process.env.FRAXTAL_RPC_URL || "https://rpc.frax.com";
const SFRXETH_CONTRACT = "0xfc00000000000000000000000000000000000005";

// Low gas threshold (1 FRAX)
const LOW_GAS_THRESHOLD = 1n * 10n ** 18n; // 1 FRAX in wei

// Create Viem client for Fraxtal
const publicClient = createPublicClient({
  chain: fraxtal,
  transport: http(FRAXTAL_RPC),
});

/**
 * Tool: check_fraxtal_balance
 * 
 * Checks a user's wallet balance on Fraxtal Mainnet:
 * - Native FRAX (gas token) balance
 * - sfrxETH token balance
 * - Warns if gas is low
 */
export const checkFraxtalBalance = createTool({
  name: "check_fraxtal_balance",
  description: `Check a user's real wallet balance on Fraxtal Mainnet (Chain ID: 252).
  
This tool verifies:
1. Native FRAX balance (used for gas fees)
2. sfrxETH token balance (staked frxETH)

Use this tool BEFORE finalizing any strategy to ensure the user has:
- Sufficient gas (FRAX) to execute transactions
- Existing assets that can be managed

Example usage:
- User mentions: "I have a wallet on Fraxtal"
- User asks: "Can I deploy this strategy?"
- Before ATP deployment: Check if they have gas

Input: Valid Ethereum address (starts with 0x)
Output: Formatted balances with gas warning if needed`,

  schema: z.object({
    walletAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Must be a valid Ethereum address starting with 0x")
      .describe("The Ethereum wallet address to check on Fraxtal Mainnet"),
  }),

  fn: async ({ walletAddress }: { walletAddress: string }) => {
    try {
      console.log(`\n🔍 Checking Fraxtal balance for: ${walletAddress}`);

      // 1. Fetch native FRAX (gas) balance
      const fraxBalance = await publicClient.getBalance({
        address: walletAddress as `0x${string}`,
      });

      // 2. Fetch sfrxETH token balance
      const sfrxEthBalance = await publicClient.readContract({
        address: SFRXETH_CONTRACT,
        abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
        functionName: "balanceOf",
        args: [walletAddress as `0x${string}`],
      });

      // 3. Format balances
      const fraxFormatted = formatEther(fraxBalance);
      const sfrxEthFormatted = formatEther(sfrxEthBalance);

      // 4. Check for low gas
      const hasLowGas = fraxBalance < LOW_GAS_THRESHOLD;

      // 5. Get current block for verification
      const blockNumber = await publicClient.getBlockNumber();

      // 6. Build response
      let response = `✅ Wallet Balance Check (Fraxtal Mainnet)\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      response += `📍 Address: ${walletAddress}\n`;
      response += `🔗 Network: Fraxtal L2 (Chain ID: 252)\n`;
      response += `📦 Block: ${blockNumber.toString()}\n\n`;

      response += `💰 Native FRAX (Gas Token):\n`;
      response += `   ${parseFloat(fraxFormatted).toFixed(4)} FRAX\n`;

      if (hasLowGas) {
        response += `   ⚠️  LOW GAS WARNING!\n`;
        response += `   You have less than 1 FRAX for gas fees.\n`;
        response += `   Please bridge more FRAX to execute transactions.\n`;
      } else {
        response += `   ✅ Sufficient gas for transactions\n`;
      }

      response += `\n🏦 sfrxETH (Staked frxETH):\n`;
      response += `   ${parseFloat(sfrxEthFormatted).toFixed(6)} sfrxETH\n`;

      if (parseFloat(sfrxEthFormatted) > 0) {
        response += `   ✅ You already have sfrxETH earning yields!\n`;
      } else {
        response += `   💡 You can mint sfrxETH by staking frxETH\n`;
      }

      response += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

      // 7. Add actionable insights
      if (hasLowGas && parseFloat(sfrxEthFormatted) === 0) {
        response += `\n🚨 Action Required:\n`;
        response += `1. Bridge FRAX to this wallet for gas fees\n`;
        response += `2. Acquire frxETH to start earning yields\n`;
        response += `3. Then deploy your personalized strategy\n`;
      } else if (hasLowGas) {
        response += `\n⚠️  Action Required:\n`;
        response += `Bridge more FRAX for gas before deploying strategies.\n`;
      } else if (parseFloat(sfrxEthFormatted) === 0) {
        response += `\n💡 Next Steps:\n`;
        response += `You have gas (FRAX) but no sfrxETH yet.\n`;
        response += `Consider staking frxETH to earn ~3.8% APY!\n`;
      } else {
        response += `\n🎉 Great! You have both gas and assets.\n`;
        response += `Ready to optimize your DeFi strategy!\n`;
      }

      // 8. Return structured data for agent
      return {
        success: true,
        walletAddress,
        network: "Fraxtal Mainnet",
        chainId: 252,
        blockNumber: blockNumber.toString(),
        balances: {
          frax: {
            raw: fraxBalance.toString(),
            formatted: fraxFormatted,
            amount: parseFloat(fraxFormatted),
            symbol: "FRAX",
            isGasToken: true,
          },
          sfrxETH: {
            raw: sfrxEthBalance.toString(),
            formatted: sfrxEthFormatted,
            amount: parseFloat(sfrxEthFormatted),
            symbol: "sfrxETH",
            contract: SFRXETH_CONTRACT,
          },
        },
        warnings: {
          lowGas: hasLowGas,
          noAssets: parseFloat(sfrxEthFormatted) === 0,
        },
        message: response,
      };
    } catch (error: any) {
      console.error("❌ Error checking Fraxtal balance:", error);

      // Handle common errors
      if (error.message?.includes("invalid address")) {
        return {
          success: false,
          error: "Invalid wallet address format. Please provide a valid Ethereum address (0x...).",
        };
      }

      if (error.message?.includes("network") || error.message?.includes("connection")) {
        return {
          success: false,
          error: "Failed to connect to Fraxtal Mainnet. Please try again later.",
        };
      }

      return {
        success: false,
        error: `Failed to check wallet balance: ${error.message || "Unknown error"}`,
        walletAddress,
      };
    }
  },
});

/**
 * Utility: Validate Ethereum address format
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Utility: Format balance for display
 */
export function formatBalance(wei: bigint, decimals: number = 18): string {
  const formatted = formatEther(wei);
  return parseFloat(formatted).toFixed(decimals === 18 ? 6 : 4);
}
