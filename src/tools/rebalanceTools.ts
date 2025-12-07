/**
 * REBALANCE TOOLS - Hybrid Rebalancer for Market Crash Simulation
 * 
 * This module handles the rebalancing of portfolio positions when the ADK-TS agent
 * detects adverse market conditions (simulated via mock volatility).
 * 
 * Rebalance Flow (sfrxETH -> sfrxUSD):
 * 1. Swap sfrxETH -> frxETH (Curve sfrxETH/frxETH pool)
 * 2. Swap frxETH -> frxUSD (Curve TriPool - direct swap)
 * 3. Stake frxUSD -> sfrxUSD (MintRedeemer)
 * 
 * Network: Fraxtal Mainnet (Chain ID: 252)
 * Native Gas: FRAX
 * 
 * Key Contracts:
 * - Curve sfrxETH/frxETH: 0xF2f426Fe123De7b769b2D4F8c911512F065225d3
 * - Curve TriPool (frxUSD/frxETH/WFRAX): 0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569
 * - MintRedeemer sfrxUSD: 0xBFc4D34Db83553725eC6c768da71D2D9c1456B55
 */

import dotenv from "dotenv";
dotenv.config();

import {
  createPublicClient,
  createWalletClient,
  http,
  formatEther,
  type Address,
  type Hash,
  maxUint256,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { fraxtal } from "viem/chains";
import { z } from "zod";
import { createTool } from "@iqai/adk";

// Import Curve TriPool helper for frxETH → frxUSD swaps
import { swapFrxEthToFrxUsd, curveTriPoolQuote, TRIPOOL_COINS } from "./curveTriPool.js";

// ============================================================================
// FRAXTAL MAINNET CONTRACT ADDRESSES
// ============================================================================

const CONTRACTS = {
  // Wrapped FRAX (for swapping)
  wFRAX: "0xfc00000000000000000000000000000000000002" as Address,
  
  // Stablecoins
  frxUSD: "0xfc00000000000000000000000000000000000001" as Address,
  sfrxUSD: "0xfc00000000000000000000000000000000000008" as Address,
  
  // ETH derivatives
  frxETH: "0xfc00000000000000000000000000000000000006" as Address,
  sfrxETH: "0xfc00000000000000000000000000000000000005" as Address,
  
  // DEX Infrastructure
  fraxswapRouter: "0x7ae2A0f3D9eF911A0a3f726FA9fbFCA25Dc18f7A" as Address,
  fraxswapFactory: "0xE30521fe7f3bEB6Ad556887b50739d6C7CA667E6" as Address, // Fraxswap V2 Factory
  curveFrxETHSfrxETH: "0xF2f426Fe123De7b769b2D4F8c911512F065225d3" as Address,
  frxUSDStakeUnstake: "0xBFc4D34Db83553725eC6c768da71D2D9c1456B55" as Address,
} as const;

// ============================================================================
// ABIs
// ============================================================================

const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
] as const;

const CURVE_POOL_ABI = [
  {
    stateMutability: "view",
    type: "function",
    name: "coins",
    inputs: [{ name: "arg0", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "get_dy",
    inputs: [
      { name: "i", type: "int128" },
      { name: "j", type: "int128" },
      { name: "dx", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "exchange",
    inputs: [
      { name: "i", type: "int128" },
      { name: "j", type: "int128" },
      { name: "_dx", type: "uint256" },
      { name: "_min_dy", type: "uint256" },
      { name: "_receiver", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

const FRAXSWAP_ROUTER_ABI = [
  {
    name: "swapExactTokensForTokens",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
  {
    name: "getAmountsOut",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
  {
    name: "factory",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
] as const;

// Fraxswap Factory ABI - to get pair addresses
const FRAXSWAP_FACTORY_ABI = [
  {
    name: "getPair",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "tokenA", type: "address" },
      { name: "tokenB", type: "address" },
    ],
    outputs: [{ name: "pair", type: "address" }],
  },
] as const;

// Fraxswap Pair ABI - for TWAMM sync
const FRAXSWAP_PAIR_ABI = [
  {
    name: "executeVirtualOrders",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "blockTimestamp", type: "uint256" }],
    outputs: [],
  },
  {
    name: "getTwammReserves",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "_reserve0", type: "uint112" },
      { name: "_reserve1", type: "uint112" },
      { name: "_blockTimestampLast", type: "uint32" },
      { name: "_twammReserve0", type: "uint112" },
      { name: "_twammReserve1", type: "uint112" },
      { name: "_fee", type: "uint256" },
    ],
  },
] as const;

const FRAXTAL_STAKE_UNSTAKE_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_assetsIn", type: "uint256", internalType: "uint256" },
      { name: "_receiver", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "_sharesOut", type: "uint256", internalType: "uint256" }],
  },
] as const;

// ============================================================================
// VIEM CLIENT SETUP
// ============================================================================

const publicClient = createPublicClient({
  chain: fraxtal,
  transport: http("https://rpc.frax.com"),
});

let walletClient: ReturnType<typeof createWalletClient> | null = null;
let agentAccount: ReturnType<typeof privateKeyToAccount> | null = null;

// Nonce management
let currentNonce: number | null = null;

// Initialize wallet from env
let AGENT_PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY || "";
if (AGENT_PRIVATE_KEY && !AGENT_PRIVATE_KEY.startsWith("0x")) {
  AGENT_PRIVATE_KEY = `0x${AGENT_PRIVATE_KEY}`;
}

if (AGENT_PRIVATE_KEY && AGENT_PRIVATE_KEY !== "0x") {
  try {
    agentAccount = privateKeyToAccount(AGENT_PRIVATE_KEY as `0x${string}`);
    walletClient = createWalletClient({
      account: agentAccount,
      chain: fraxtal,
      transport: http("https://rpc.frax.com"),
    });
    console.log("🔐 [Rebalance] Agent Wallet Initialized:", agentAccount.address);
  } catch (error) {
    console.error("❌ [Rebalance] Failed to initialize wallet:", error);
  }
}

// ============================================================================
// SSE BROADCASTER
// ============================================================================

export type RebalanceBroadcastFn = (event: {
  type: string;
  step?: number;
  status: string;
  message: string;
  txHash?: string;
  agentThought?: string;
  timestamp: string;
}) => void;

let globalBroadcaster: RebalanceBroadcastFn | null = null;

export function setRebalanceBroadcaster(broadcaster: RebalanceBroadcastFn) {
  globalBroadcaster = broadcaster;
  console.log("✅ [Rebalance] SSE Broadcaster registered");
}

function broadcastRebalanceLog(
  step: number,
  status: "Processing" | "Success" | "Failed",
  message: string,
  txHash?: string,
  agentThought?: string
) {
  console.log(`[Rebalance] Step ${step} - ${status}: ${message}`);

  if (globalBroadcaster) {
    globalBroadcaster({
      type: "rebalance_update",
      step,
      status,
      message,
      txHash,
      agentThought,
      timestamp: new Date().toISOString(),
    });
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function getNextNonce(): Promise<number> {
  if (!agentAccount) throw new Error("Agent wallet not initialized");

  const chainNonce = await publicClient.getTransactionCount({
    address: agentAccount.address,
    blockTag: "pending",
  });

  if (currentNonce === null || chainNonce > currentNonce) {
    currentNonce = chainNonce;
  }

  const nonce = currentNonce;
  currentNonce++;
  return nonce;
}

function resetNonce() {
  currentNonce = null;
}

function getDeadline(): bigint {
  return BigInt(Math.floor(Date.now() / 1000) + 1200); // 20 minutes
}

async function waitForTx(
  hash: Hash,
  description: string
): Promise<{ blockNumber: bigint }> {
  console.log(`[Rebalance] ⏳ Waiting for ${description} confirmation...`);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  if (receipt.status === "reverted") {
    throw new Error(`${description} transaction reverted`);
  }

  console.log(`[Rebalance] ✅ ${description} confirmed in block ${receipt.blockNumber}`);

  return { blockNumber: receipt.blockNumber };
}

async function getTokenBalance(tokenAddress: Address, holder: Address): Promise<bigint> {
  return (await publicClient.readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [holder],
  })) as bigint;
}

/**
 * Sync TWAMM state for a Fraxswap pair before swapping
 * 
 * Fraxswap uses TWAMM (Time-Weighted Average Market Maker) which needs to be
 * synchronized before getAmountsOut/swaps can work. This calls executeVirtualOrders
 * on the pair contract.
 */
async function syncTwammForPair(tokenA: Address, tokenB: Address, addLog: (msg: string) => void): Promise<void> {
  if (!walletClient || !agentAccount) {
    addLog("   ⚠️ No wallet - skipping TWAMM sync");
    return;
  }

  try {
    // Get pair address from factory
    const pairAddress = await publicClient.readContract({
      address: CONTRACTS.fraxswapFactory,
      abi: FRAXSWAP_FACTORY_ABI,
      functionName: "getPair",
      args: [tokenA, tokenB],
    }) as Address;

    if (pairAddress === "0x0000000000000000000000000000000000000000") {
      addLog(`   ⚠️ No Fraxswap pair found for ${tokenA.slice(0, 10)}... / ${tokenB.slice(0, 10)}...`);
      return;
    }

    addLog(`   🔄 Syncing TWAMM for pair ${pairAddress.slice(0, 10)}...`);

    // Call executeVirtualOrders with current block timestamp
    const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
    const syncNonce = await getNextNonce();
    
    const syncTx = await walletClient.writeContract({
      chain: fraxtal,
      account: agentAccount,
      address: pairAddress,
      abi: FRAXSWAP_PAIR_ABI,
      functionName: "executeVirtualOrders",
      args: [currentTimestamp],
      nonce: syncNonce,
    });

    await waitForTx(syncTx, "TWAMM Sync");
    addLog(`   ✅ TWAMM synced: ${syncTx.slice(0, 18)}...`);
  } catch (error: unknown) {
    // TWAMM sync might fail if already synced, that's ok
    const errMsg = error instanceof Error ? error.message : String(error);
    if (errMsg.includes("already synced") || errMsg.includes("no virtual orders")) {
      addLog(`   ✅ TWAMM already synced`);
    } else {
      addLog(`   ⚠️ TWAMM sync warning: ${errMsg.slice(0, 80)}...`);
      // Don't throw - try the swap anyway
    }
  }
}

// ============================================================================
// REBALANCE RESULT TYPE
// ============================================================================

export interface RebalanceResult {
  status: "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "DEMO_MODE" | "SKIPPED";
  mockVolatility: number;
  mockApyBefore: { sfrxETH: number; sfrxUSD: number };
  mockApyAfter: { sfrxETH: number; sfrxUSD: number };
  agentReasoning: string;
  rebalanceAmount: string;
  rebalancePercent: number;
  transactions: {
    swapSfrxETHToFrxETH?: { hash: string; block: string; explorer: string };
    swapFrxETHToFrxUSD?: { hash: string; block: string; explorer: string }; // Via Curve TriPool
    stakeFrxUSDToSfrxUSD?: { hash: string; block: string; explorer: string };
  };
  balancesBefore: { sfrxETH: string; sfrxUSD: string };
  balancesAfter: { sfrxETH: string; sfrxUSD: string };
  error?: string;
  logs: string[];
}

// ============================================================================
// MAIN REBALANCE SEQUENCE
// ============================================================================

/**
 * Execute the rebalance sequence: shift 60% of sfrxETH to sfrxUSD
 * 
 * This is called by the ADK-TS agent when it decides to rebalance based on
 * mock market volatility conditions.
 * 
 * @param mockVol - Mock volatility (0.20 = 20%, triggers rebalance if > 0.15)
 */
export async function executeRebalanceSequence(mockVol: number = 0.20): Promise<RebalanceResult> {
  const logs: string[] = [];
  const addLog = (msg: string) => {
    logs.push(msg);
    console.log(`[Rebalance] ${msg}`);
  };

  addLog("========================================");
  addLog("🔄 REBALANCE SEQUENCE INITIATED");
  addLog(`📊 Mock Volatility: ${(mockVol * 100).toFixed(1)}%`);
  addLog("========================================");

  // Mock APY data (pre-crash vs post-crash simulation)
  const mockApyBefore = { sfrxETH: 6.5, sfrxUSD: 4.1 };
  const mockApyAfter = { sfrxETH: 4.0, sfrxUSD: 4.1 }; // sfrxETH APY drops during crash

  // Check if volatility threshold is met
  if (mockVol <= 0.15) {
    addLog("⚠️ Volatility below threshold (15%), skipping rebalance");
    return {
      status: "SKIPPED",
      mockVolatility: mockVol,
      mockApyBefore,
      mockApyAfter,
      agentReasoning: "Volatility is within acceptable range. No rebalance needed.",
      rebalanceAmount: "0",
      rebalancePercent: 0,
      transactions: {},
      balancesBefore: { sfrxETH: "0", sfrxUSD: "0" },
      balancesAfter: { sfrxETH: "0", sfrxUSD: "0" },
      logs,
    };
  }

  // Demo mode check
  if (!agentAccount || !walletClient) {
    addLog("⚠️ DEMO MODE - Agent wallet not initialized");
    return {
      status: "DEMO_MODE",
      mockVolatility: mockVol,
      mockApyBefore,
      mockApyAfter,
      agentReasoning:
        "⚠️ High volatility detected! I would shift 60% of sfrxETH to sfrxUSD to protect against losses. Demo mode - no transactions executed.",
      rebalanceAmount: "0",
      rebalancePercent: 60,
      transactions: {},
      balancesBefore: { sfrxETH: "0", sfrxUSD: "0" },
      balancesAfter: { sfrxETH: "0", sfrxUSD: "0" },
      error: "Agent wallet not initialized - Set AGENT_PRIVATE_KEY",
      logs,
    };
  }

  const agentAddress = agentAccount.address;

  // Reset nonce for fresh sequence
  resetNonce();

  try {
    // ========================================================================
    // STEP 0: Get current balances
    // ========================================================================
    addLog("📊 Checking current balances...");
    broadcastRebalanceLog(0, "Processing", "Analyzing portfolio positions...");

    const sfrxETHBalanceBefore = await getTokenBalance(CONTRACTS.sfrxETH, agentAddress);
    const sfrxUSDBalanceBefore = await getTokenBalance(CONTRACTS.sfrxUSD, agentAddress);

    addLog(`   sfrxETH: ${formatEther(sfrxETHBalanceBefore)}`);
    addLog(`   sfrxUSD: ${formatEther(sfrxUSDBalanceBefore)}`);

    // Calculate rebalance amount (60% of sfrxETH)
    const rebalancePercent = 60;
    const rebalanceAmount = (sfrxETHBalanceBefore * BigInt(rebalancePercent)) / 100n;

    if (rebalanceAmount === 0n) {
      addLog("⚠️ No sfrxETH to rebalance");
      broadcastRebalanceLog(0, "Failed", "No sfrxETH available to rebalance");
      return {
        status: "SKIPPED",
        mockVolatility: mockVol,
        mockApyBefore,
        mockApyAfter,
        agentReasoning:
          "No sfrxETH holdings detected. Cannot execute rebalance without volatile position.",
        rebalanceAmount: "0",
        rebalancePercent,
        transactions: {},
        balancesBefore: {
          sfrxETH: formatEther(sfrxETHBalanceBefore),
          sfrxUSD: formatEther(sfrxUSDBalanceBefore),
        },
        balancesAfter: {
          sfrxETH: formatEther(sfrxETHBalanceBefore),
          sfrxUSD: formatEther(sfrxUSDBalanceBefore),
        },
        logs,
      };
    }

    addLog(`🔄 Rebalancing ${formatEther(rebalanceAmount)} sfrxETH (${rebalancePercent}%)`);

    const agentReasoning = `🚨 HIGH VOLATILITY ALERT (${(mockVol * 100).toFixed(1)}%)!
    
I'm detecting significant market stress. sfrxETH APY is projected to drop from ${mockApyBefore.sfrxETH}% to ${mockApyAfter.sfrxETH}%.

My analysis:
• ETH volatility has spiked, indicating potential downside risk
• sfrxUSD maintains stable ${mockApyAfter.sfrxUSD}% APY (Treasury-backed)
• Risk-adjusted returns favor defensive rebalancing

Decision: Shifting ${rebalancePercent}% of sfrxETH (${formatEther(rebalanceAmount)}) to sfrxUSD to protect capital.`;

    broadcastRebalanceLog(0, "Success", "Portfolio analysis complete", undefined, agentReasoning);

    // ========================================================================
    // STEP 1: Swap sfrxETH -> frxETH (Curve Pool - reverse direction)
    // ========================================================================
    addLog("📝 STEP 1: Swap sfrxETH -> frxETH via Curve...");
    broadcastRebalanceLog(1, "Processing", "Preparing sfrxETH → frxETH swap...");
    await new Promise(r => setTimeout(r, 100)); // Allow SSE to flush

    // Approve Curve pool for sfrxETH
    broadcastRebalanceLog(1, "Processing", "Approving sfrxETH for Curve pool...");
    const approveNonce1 = await getNextNonce();
    const approveSfrxETHTx = await walletClient.writeContract({
      chain: fraxtal,
      account: agentAccount,
      address: CONTRACTS.sfrxETH,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [CONTRACTS.curveFrxETHSfrxETH, rebalanceAmount],
      nonce: approveNonce1,
    });
    await waitForTx(approveSfrxETHTx, "Approve sfrxETH for Curve");

    // Quote expected output (sfrxETH index = 1, frxETH index = 0)
    broadcastRebalanceLog(1, "Processing", "Quoting Curve pool exchange rate...");
    const expectedFrxETH = (await publicClient.readContract({
      address: CONTRACTS.curveFrxETHSfrxETH,
      abi: CURVE_POOL_ABI,
      functionName: "get_dy",
      args: [1n, 0n, rebalanceAmount], // sfrxETH -> frxETH
    })) as bigint;

    const minFrxETH = (expectedFrxETH * 995n) / 1000n; // 0.5% slippage

    // Execute Curve swap (sfrxETH -> frxETH)
    broadcastRebalanceLog(1, "Processing", "Executing Curve swap...");
    const swapNonce1 = await getNextNonce();
    const swapSfrxETHTx = await walletClient.writeContract({
      chain: fraxtal,
      account: agentAccount,
      address: CONTRACTS.curveFrxETHSfrxETH,
      abi: CURVE_POOL_ABI,
      functionName: "exchange",
      args: [1n, 0n, rebalanceAmount, minFrxETH, agentAddress], // i=1 (sfrxETH), j=0 (frxETH)
      nonce: swapNonce1,
    });
    const receipt1 = await waitForTx(swapSfrxETHTx, "Swap sfrxETH → frxETH");

    broadcastRebalanceLog(1, "Success", `Swapped to frxETH`, swapSfrxETHTx);
    addLog(`   ✅ TX: ${swapSfrxETHTx}`);

    // ========================================================================
    // STEP 2: Swap frxETH -> frxUSD via Curve TriPool
    // ========================================================================
    addLog("📝 STEP 2: Swap frxETH -> frxUSD via Curve TriPool...");
    broadcastRebalanceLog(2, "Processing", "Preparing TriPool swap frxETH → frxUSD...");
    await new Promise(r => setTimeout(r, 100)); // Allow SSE to flush

    // Get actual frxETH balance received
    const frxETHBalance = await getTokenBalance(CONTRACTS.frxETH, agentAddress);
    addLog(`   frxETH balance: ${formatEther(frxETHBalance)}`);

    if (frxETHBalance === 0n) {
      addLog("⚠️ No frxETH to swap - Step 1 may have failed");
      throw new Error("No frxETH available after Step 1");
    }

    // Execute TriPool swap: frxETH → frxUSD
    broadcastRebalanceLog(2, "Processing", "Executing TriPool exchange (frxETH→wFRAX→frxUSD)...");
    // IMPORTANT: walletClient must have account attached for signing
    const tripoolResult = await swapFrxEthToFrxUsd(
      walletClient,
      publicClient as any, // Type coercion for viem version compatibility
      agentAccount.address,
      frxETHBalance,
      50n // 0.5% slippage
    );

    if (!tripoolResult.success || !tripoolResult.txHash) {
      throw new Error(`TriPool swap failed: ${tripoolResult.error || "Unknown error"}`);
    }

    broadcastRebalanceLog(2, "Success", `Swapped to frxUSD via TriPool`, tripoolResult.txHash);
    addLog(`   ✅ TX: ${tripoolResult.txHash}`);
    addLog(`   Received: ~${formatEther(tripoolResult.expectedOut)} frxUSD`);

    // ========================================================================
    // STEP 3: Stake frxUSD -> sfrxUSD via MintRedeemer
    // ========================================================================
    addLog("📝 STEP 3: Stake frxUSD -> sfrxUSD...");
    broadcastRebalanceLog(3, "Processing", "Preparing to stake frxUSD → sfrxUSD...");
    await new Promise(r => setTimeout(r, 100)); // Allow SSE to flush

    // Get frxUSD balance
    const frxUSDBalance = await getTokenBalance(CONTRACTS.frxUSD, agentAddress);
    addLog(`   frxUSD balance: ${formatEther(frxUSDBalance)}`);

    if (frxUSDBalance === 0n) {
      addLog("⚠️ No frxUSD to stake - Step 2 may have failed");
      throw new Error("No frxUSD available after Step 2");
    }

    // Approve MintRedeemer for frxUSD
    broadcastRebalanceLog(3, "Processing", "Approving frxUSD for MintRedeemer vault...");
    const approveNonce3 = await getNextNonce();
    const approveFrxUSDTx = await walletClient.writeContract({
      chain: fraxtal,
      account: agentAccount,
      address: CONTRACTS.frxUSD,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [CONTRACTS.frxUSDStakeUnstake, frxUSDBalance],
      nonce: approveNonce3,
    });
    await waitForTx(approveFrxUSDTx, "Approve frxUSD for MintRedeemer");

    // Stake frxUSD -> sfrxUSD
    broadcastRebalanceLog(3, "Processing", "Depositing into sfrxUSD vault...");
    const stakeNonce = await getNextNonce();
    const stakeFrxUSDTx = await walletClient.writeContract({
      chain: fraxtal,
      account: agentAccount,
      address: CONTRACTS.frxUSDStakeUnstake,
      abi: FRAXTAL_STAKE_UNSTAKE_ABI,
      functionName: "deposit",
      args: [frxUSDBalance, agentAddress],
      nonce: stakeNonce,
    });
    const receipt3 = await waitForTx(stakeFrxUSDTx, "Stake frxUSD → sfrxUSD");

    broadcastRebalanceLog(3, "Success", `Staked to sfrxUSD`, stakeFrxUSDTx);
    addLog(`   ✅ TX: ${stakeFrxUSDTx}`);

    // ========================================================================
    // Final balances
    // ========================================================================
    const sfrxETHBalanceAfter = await getTokenBalance(CONTRACTS.sfrxETH, agentAddress);
    const sfrxUSDBalanceAfter = await getTokenBalance(CONTRACTS.sfrxUSD, agentAddress);

    addLog("========================================");
    addLog("✅ REBALANCE COMPLETE!");
    addLog(`   sfrxETH: ${formatEther(sfrxETHBalanceBefore)} → ${formatEther(sfrxETHBalanceAfter)}`);
    addLog(`   sfrxUSD: ${formatEther(sfrxUSDBalanceBefore)} → ${formatEther(sfrxUSDBalanceAfter)}`);
    addLog("   💡 Shifted volatile sfrxETH to stable sfrxUSD position");
    addLog("========================================");

    // Broadcast completion
    if (globalBroadcaster) {
      globalBroadcaster({
        type: "REBALANCE_COMPLETE",
        status: "INVESTED",
        message: `Rebalance complete! Shifted ${formatEther(rebalanceAmount)} sfrxETH to sfrxUSD`,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      status: "SUCCESS",
      mockVolatility: mockVol,
      mockApyBefore,
      mockApyAfter,
      agentReasoning,
      rebalanceAmount: formatEther(rebalanceAmount),
      rebalancePercent,
      transactions: {
        swapSfrxETHToFrxETH: {
          hash: swapSfrxETHTx,
          block: receipt1.blockNumber.toString(),
          explorer: `https://fraxscan.com/tx/${swapSfrxETHTx}`,
        },
        swapFrxETHToFrxUSD: {
          hash: tripoolResult.txHash!,
          block: "confirmed",
          explorer: `https://fraxscan.com/tx/${tripoolResult.txHash!}`,
        },
        stakeFrxUSDToSfrxUSD: {
          hash: stakeFrxUSDTx,
          block: receipt3.blockNumber.toString(),
          explorer: `https://fraxscan.com/tx/${stakeFrxUSDTx}`,
        },
      },
      balancesBefore: {
        sfrxETH: formatEther(sfrxETHBalanceBefore),
        sfrxUSD: formatEther(sfrxUSDBalanceBefore),
      },
      balancesAfter: {
        sfrxETH: formatEther(sfrxETHBalanceAfter),
        sfrxUSD: formatEther(sfrxUSDBalanceAfter),
      },
      logs,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    addLog(`❌ Error: ${errorMsg}`);

    broadcastRebalanceLog(0, "Failed", `Rebalance failed: ${errorMsg}`);

    return {
      status: "FAILED",
      mockVolatility: mockVol,
      mockApyBefore,
      mockApyAfter,
      agentReasoning: "Rebalance failed due to transaction error.",
      rebalanceAmount: "0",
      rebalancePercent: 60,
      transactions: {},
      balancesBefore: { sfrxETH: "0", sfrxUSD: "0" },
      balancesAfter: { sfrxETH: "0", sfrxUSD: "0" },
      error: errorMsg,
      logs,
    };
  }
}

// ============================================================================
// ADK-TS TOOL WRAPPER
// ============================================================================

/**
 * ADK Tool: Execute Rebalance
 * 
 * This tool is called by the ADK-TS agent when it detects market conditions
 * that warrant a portfolio rebalance (shifting volatile sfrxETH to stable sfrxUSD).
 */
export const execute_rebalance = createTool({
  name: "execute_rebalance",
  description: `Execute a defensive portfolio rebalance by shifting 60% of sfrxETH holdings to sfrxUSD.

Use this tool when:
- Market volatility exceeds 15%
- ETH price is dropping significantly
- sfrxETH APY drops below stable rates
- User requests defensive positioning

The tool executes a 3-step transaction sequence:
1. Swap sfrxETH → frxETH (via Curve sfrxETH/frxETH pool)
2. Swap frxETH → frxUSD (via Curve TriPool - direct swap)
3. Stake frxUSD → sfrxUSD (via MintRedeemer)

This protects capital during market downturns while maintaining yield.`,
  schema: z.object({
    mockVol: z
      .number()
      .min(0)
      .max(1)
      .describe("Mock volatility as a decimal (e.g., 0.20 = 20%). Rebalance triggers if > 0.15"),
    reason: z
      .string()
      .optional()
      .describe("Agent's reasoning for triggering the rebalance"),
  }),
  fn: async ({ mockVol, reason }: { mockVol: number; reason?: string }) => {
    console.log(`\n🤖 [ADK Tool] execute_rebalance called`);
    console.log(`   Volatility: ${(mockVol * 100).toFixed(1)}%`);
    if (reason) console.log(`   Reason: ${reason}`);

    const result = await executeRebalanceSequence(mockVol);

    return JSON.stringify(result, null, 2);
  },
});

export default execute_rebalance;
