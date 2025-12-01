import { createTool } from "@iqai/adk";
import { z } from "zod";
import { createWalletClient, createPublicClient, http, parseEther, defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";

/**
 * REAL ATP DEPLOYMENT TOOL
 * 
 * This tool integrates with the IQAI Agent Tokenization Platform (ATP) on Fraxtal.
 * 
 * IMPORTANT NOTES:
 * 1. ATP agents are created through the web UI at https://app.iqai.com/
 * 2. Requirements: 1,500 IQ + $10 worth of frxETH in your wallet
 * 3. This tool provides deployment guidance and wallet verification
 * 
 * For programmatic deployment, this would require:
 * - Direct ATP smart contract interaction (if available)
 * - Or API integration with IQAI backend
 * 
 * Current implementation: Hybrid approach with real wallet verification
 */

// Define Fraxtal chain
const fraxtal = defineChain({
  id: 252,
  name: "Fraxtal",
  nativeCurrency: {
    decimals: 18,
    name: "Frax",
    symbol: "FRAX",
  },
  rpcUrls: {
    default: { http: ["https://rpc.frax.com"] },
    public: { http: ["https://rpc.frax.com"] },
  },
  blockExplorers: {
    default: { name: "Fraxscan", url: "https://fraxscan.com" },
  },
});

/**
 * Verify wallet has sufficient balance for ATP deployment
 */
async function verifyWalletBalance(address: `0x${string}`): Promise<{
  hasFrax: boolean;
  fraxBalance: string;
  sufficient: boolean;
}> {
  try {
    const publicClient = createPublicClient({
      chain: fraxtal,
      transport: http("https://rpc.frax.com"),
    });

    const balance = await publicClient.getBalance({ address });
    const fraxBalance = Number(balance) / 1e18;
    const sufficient = fraxBalance >= 0.01; // Need at least 0.01 FRAX for gas

    return {
      hasFrax: fraxBalance > 0,
      fraxBalance: fraxBalance.toFixed(4),
      sufficient,
    };
  } catch (error) {
    console.error("Error checking wallet balance:", error);
    return {
      hasFrax: false,
      fraxBalance: "0",
      sufficient: false,
    };
  }
}

/**
 * Generate deployment instructions for ATP
 */
function generateAtpInstructions(
  vault_name: string,
  strategy_asset: string,
  target_amount: string
): any {
  const timestamp = new Date().toISOString();
  const ticker = vault_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 5);

  return {
    status: "pending_manual_deployment",
    deployment_type: "ATP_WEB_UI",
    
    vault_info: {
      name: vault_name,
      suggested_ticker: ticker,
      strategy_asset: strategy_asset,
      target_amount: target_amount,
      category: "On Chain",
      created_at: timestamp,
    },

    requirements: {
      minimum_iq: "1,500 IQ",
      minimum_frxeth: "$10 worth of frxETH",
      additional: "Extra IQ for initial token buy",
      network: "Fraxtal Mainnet (Chain ID: 252)",
    },

    deployment_steps: [
      {
        step: 1,
        action: "Go to ATP Platform",
        url: "https://app.iqai.com/",
        description: "Navigate to the IQAI Agent Tokenization Platform",
      },
      {
        step: 2,
        action: "Connect Wallet",
        description: "Log in using browser wallet, WalletConnect, or email/socials",
        note: "Ensure your wallet is on Fraxtal network",
      },
      {
        step: 3,
        action: "Click 'Create Agent'",
        description: "Press the 'Create Agent' button on the dashboard",
      },
      {
        step: 4,
        action: "Fill Agent Details",
        fields: {
          agent_name: vault_name,
          ticker: ticker,
          category: "On Chain",
          bio: `DeFi vault strategy focusing on ${strategy_asset} for personalized wealth management. Target: ${target_amount}`,
        },
      },
      {
        step: 5,
        action: "Set Initial Token Purchase",
        description: "Determine how much of your agent's tokens to purchase (optional)",
        note: "Creation fee is 1,500 IQ",
      },
      {
        step: 6,
        action: "Create Agent Token",
        description: "Press 'Create Agent Token' to deploy on Fraxtal",
      },
      {
        step: 7,
        action: "Agent Goes Live!",
        description: "Your tokenized agent is deployed and ready",
      },
    ],

    atp_economics: {
      bonding_curve: "Automatic liquidity pool created at 7M IQ bought",
      agent_ownership: "8% of token supply",
      graduation_status: "Latent → Alive after reaching target liquidity",
      trading_fee: "0.3% to support liquidity providers",
    },

    links: {
      atp_platform: "https://app.iqai.com/",
      bridge_iq: "https://frax.com/swap",
      fraxscan: "https://fraxscan.com",
      documentation: "https://learn.iq.wiki/iq/iq/agent-tokenization-platform-atp",
    },

    next_steps_automated: [
      "1. Ensure you have 1,500 IQ + $10 frxETH on Fraxtal",
      "2. Follow the deployment steps above at https://app.iqai.com/",
      "3. Once deployed, your agent will have its own token and dashboard",
      "4. Users can buy your agent's tokens using IQ on ATP",
      "5. Agent graduates to 'Alive' status after 7M IQ volume",
    ],

    message: `⚠️  ATP agents are deployed via the web UI at https://app.iqai.com/. Follow the steps above to create "${vault_name}" as a tokenized agent on Fraxtal. Your agent will manage ${strategy_asset} strategies autonomously!`,
  };
}

export const deploy_story_vault = createTool({
  name: "deploy_story_vault",
  description: `Provides deployment instructions and wallet verification for creating a tokenized DeFi vault agent on IQAI's Agent Tokenization Platform (ATP). 
  
  IMPORTANT: ATP agents are deployed through the web UI at https://app.iqai.com/, not programmatically. This tool:
  1. Verifies wallet readiness (if private key provided)
  2. Generates step-by-step deployment instructions
  3. Provides ATP platform links and requirements
  
  Requirements: 1,500 IQ + $10 worth of frxETH on Fraxtal mainnet.`,

  schema: z.object({
    vault_name: z
      .string()
      .describe(
        "Creative name for the vault based on user's story (e.g., 'Seoul Artist Gallery Fund')"
      ),
    strategy_asset: z
      .string()
      .describe("The chosen asset/vault type (e.g., 'sFRAX', 'sfrxETH')"),
    target_amount: z
      .string()
      .describe("User's financial goal with currency (e.g., '5,000,000 KRW')"),
    user_story_summary: z
      .string()
      .optional()
      .describe("Brief summary of why this vault matters to the user"),
  }),

  fn: async ({ vault_name, strategy_asset, target_amount, user_story_summary }) => {
    console.log(`\n🔗 Preparing ATP deployment for "${vault_name}"...`);

    // Check if wallet private key is configured
    const privateKey = process.env.ATP_WALLET_PRIVATE_KEY;
    let walletInfo = null;

    if (privateKey && privateKey.startsWith("0x")) {
      try {
        const account = privateKeyToAccount(privateKey as `0x${string}`);
        console.log(`✅ Wallet configured: ${account.address.slice(0, 10)}...`);

        // Verify wallet balance
        const balanceInfo = await verifyWalletBalance(account.address);
        walletInfo = {
          address: account.address,
          network: "Fraxtal Mainnet",
          frax_balance: balanceInfo.fraxBalance,
          ready_for_deployment: balanceInfo.sufficient,
          note: balanceInfo.sufficient
            ? "Wallet has sufficient FRAX for gas"
            : "⚠️  Wallet needs more FRAX for gas fees",
        };

        console.log(`💰 FRAX Balance: ${balanceInfo.fraxBalance}`);
      } catch (error) {
        console.warn("⚠️  Could not verify wallet:", error instanceof Error ? error.message : "Unknown error");
      }
    } else {
      console.log("ℹ️  No wallet configured (ATP_WALLET_PRIVATE_KEY not set)");
      console.log("   Manual deployment via https://app.iqai.com/ will be required");
    }

    // Generate comprehensive ATP deployment instructions
    const instructions = generateAtpInstructions(
      vault_name,
      strategy_asset,
      target_amount
    );

    // Add wallet info if available
    if (walletInfo) {
      instructions.wallet_status = walletInfo;
    }

    // Add user story context
    if (user_story_summary) {
      instructions.vault_info.story_context = user_story_summary;
    }

    console.log(`\n📋 Deployment instructions generated for "${vault_name}"`);
    console.log(`🌐 Deploy at: https://app.iqai.com/`);

    return instructions;
  },
});