/**
 * SMART INVEST TOOLS - Full Investment Sequence for Fraxtal
 * 
 * Executes the "Smart Invest" workflow when FRAX is deposited:
 * 1. Wrap native FRAX → wFRAX
 * 2. Split based on strategy (e.g., 60% stable / 40% volatile)
 * 3. Swap stable portion: wFRAX → frxUSD via Fraxswap
 * 4. Stake stable: frxUSD → sfrxUSD vault
 * 5. Swap volatile portion: wFRAX → frxETH via Fraxswap
 * 6. Stake volatile: frxETH → sfrxETH vault
 * 
 * Network: Fraxtal Mainnet (Chain ID: 252)
 * Native Gas: FRAX
 */

import dotenv from "dotenv";
dotenv.config();

import { 
  createPublicClient, 
  createWalletClient, 
  http, 
  parseEther, 
  formatEther,
  encodeFunctionData,
  type Address,
  type Hash,
  maxUint256
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { fraxtal } from "viem/chains";
import { z } from "zod";
import { createTool } from "@iqai/adk";
import { strategyManager, type StrategyAllocation, type UserStrategy } from "./strategyManager.js";

// ============================================================================
// FRAXTAL MAINNET CONTRACT ADDRESSES
// ============================================================================

const CONTRACTS = {
  // Wrapped FRAX (for swapping, since native FRAX can't be used in DEX)
  wFRAX: "0xfc00000000000000000000000000000000000002" as Address,
  
  // Stablecoins
  frxUSD: "0xfc00000000000000000000000000000000000001" as Address,
  sfrxUSD: "0xfc00000000000000000000000000000000000008" as Address, // Token
  
  // ETH derivatives
  frxETH: "0xfc00000000000000000000000000000000000006" as Address,
  sfrxETH: "0xfc00000000000000000000000000000000000005" as Address, // Token (bridged yield token on Fraxtal)
  
  // Fraxswap V2 Router (Uniswap V2 compatible) - Used for wFRAX→frxUSD and wFRAX→frxETH swaps
  fraxswapRouter: "0x7ae2A0f3D9eF911A0a3f726FA9fbFCA25Dc18f7A" as Address,
  
  // Curve stable-ng Pool: frxETH/sfrxETH (Fraxtal)
  // UI: https://www.curve.finance/dex/fraxtal/pools/factory-stable-ng-6/deposit
  // Used for volatile leg: frxETH → sfrxETH via Curve exchange()
  // NOTE: This replaces the old Fraxswap approach for better depth and pricing
  curveFrxETHSfrxETH: "0xF2f426Fe123De7b769b2D4F8c911512F065225d3" as Address,
  
  // Legacy: Fraxswap V2 Pair (no longer used for frxETH→sfrxETH)
  frxETH_sfrxETH_pair: "0x07412F06DB215A20909C3c29FaA3cC7A48777185" as Address,
  
  // FraxtalERC4626MintRedeemer - Required for sfrxUSD staking on Fraxtal
  // See: https://docs.frax.com/frxusd/staking-and-unstaking-frxusd-on-fraxtal
  frxUSDStakeUnstake: "0xBFc4D34Db83553725eC6c768da71D2D9c1456B55" as Address,
} as const;

// ============================================================================
// VOLATILE LEG CONFIGURATION - CURVE POOL
// ============================================================================
// On Fraxtal L2, sfrxETH is a bridged yield token. We use the Curve stable-ng
// pool to swap frxETH → sfrxETH for better depth and pricing.
//
// Pool: 0xF2f426Fe123De7b769b2D4F8c911512F065225d3 (Curve frxETH/sfrxETH)
// UI: https://www.curve.finance/dex/fraxtal/pools/factory-stable-ng-6/deposit
// ============================================================================

// Import Curve helper module
import {
  CURVE_FRXETH_SFRXETH_POOL,
  CURVE_VOLATILE_SWAP_CONFIG,
  CURVE_POOL_ABI,
  getIndices as getCurveIndices,
  quoteDy as curvQuoteDy,
  calculateMinDy,
  ensureAllowance as ensureCurveAllowance,
  swapFrxEthToSfrxEth,
  getSfrxEthBalance,
} from "./curveFrxEthPool.js";

// Legacy config - kept for reference but no longer used
const VOLATILE_SWAP_CONFIG = {
  // Slippage tolerance in basis points (50 = 0.5%)
  slippageBps: 50n,
  // Minimum frxETH amount to attempt swap (below this, keep as frxETH)
  minSwapAmount: 1000n, // 1000 wei - extremely small, but prevents 0-amount swaps
} as const;

// ============================================================================
// CONTRACT ABIs
// ============================================================================

// ERC20 Standard ABI (for approve, balanceOf, transfer)
const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }]
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    outputs: [{ type: "uint256" }]
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  }
] as const;

// WETH-style Deposit/Withdraw ABI (for wFRAX)
const WFRAX_ABI = [
  ...ERC20_ABI,
  {
    name: "deposit",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: []
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: []
  }
] as const;

// FraxtalERC4626MintRedeemer ABI - For staking frxUSD → sfrxUSD on Fraxtal
// See: https://docs.frax.com/frxusd/staking-and-unstaking-frxusd-on-fraxtal
const FRAXTAL_STAKE_UNSTAKE_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_assetsIn", type: "uint256", internalType: "uint256" },
      { name: "_receiver", type: "address", internalType: "address" }
    ],
    outputs: [{ name: "_sharesOut", type: "uint256", internalType: "uint256" }]
  },
  {
    name: "redeem",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_sharesIn", type: "uint256", internalType: "uint256" },
      { name: "_receiver", type: "address", internalType: "address" },
      { name: "_owner", type: "address", internalType: "address" }
    ],
    outputs: [{ name: "_assetsOut", type: "uint256", internalType: "uint256" }]
  }
] as const;

// ERC4626 Vault ABI (for sfrxETH direct deposit - works directly on Fraxtal)
const ERC4626_VAULT_ABI = [
  ...ERC20_ABI,
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" }
    ],
    outputs: [{ name: "shares", type: "uint256" }]
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" }
    ],
    outputs: [{ name: "shares", type: "uint256" }]
  },
  {
    name: "redeem",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "shares", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" }
    ],
    outputs: [{ name: "assets", type: "uint256" }]
  },
  {
    name: "totalAssets",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }]
  },
  {
    name: "convertToShares",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "assets", type: "uint256" }],
    outputs: [{ type: "uint256" }]
  },
  {
    name: "convertToAssets",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "shares", type: "uint256" }],
    outputs: [{ type: "uint256" }]
  }
] as const;

// Fraxswap V2 Router ABI (Uniswap V2 compatible)
// Used for all swaps: wFRAX→frxUSD, wFRAX→frxETH, AND frxETH→sfrxETH
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
      { name: "deadline", type: "uint256" }
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }]
  },
  {
    name: "swapTokensForExactTokens",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amountOut", type: "uint256" },
      { name: "amountInMax", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" }
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }]
  },
  {
    name: "getAmountsOut",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" }
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }]
  },
  {
    name: "getAmountsIn",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amountOut", type: "uint256" },
      { name: "path", type: "address[]" }
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }]
  },
  {
    name: "WETH",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }]
  }
] as const;

// NOTE: ERC4626_VAULT_ABI is kept for reference but deposit() on sfrxETH
// does NOT work on Fraxtal L2. sfrxETH is acquired via Fraxswap swap instead.

// ============================================================================
// VIEM CLIENT SETUP
// ============================================================================

const publicClient = createPublicClient({
  chain: fraxtal,
  transport: http("https://rpc.frax.com"),
});

let walletClient: ReturnType<typeof createWalletClient> | null = null;
let agentAccount: ReturnType<typeof privateKeyToAccount> | null = null;

// Track current nonce to prevent collisions
let currentNonce: number | null = null;
// Track last time we fetched nonce from chain
let lastNonceFetchTime: number = 0;
// Minimum time between chain nonce fetches (to avoid stale reads)
const NONCE_FETCH_INTERVAL_MS = 2000;

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
    console.log("🔐 [SmartInvest] Agent Wallet Initialized:", agentAccount.address);
  } catch (error) {
    console.error("❌ [SmartInvest] Failed to initialize wallet:", error);
  }
}

/**
 * Get and increment nonce for transaction ordering
 * Uses 'pending' to include any pending transactions in the count
 * Falls back to 'latest' + retry if pending doesn't work
 */
async function getNextNonce(): Promise<number> {
  if (!agentAccount) throw new Error("Agent wallet not initialized");
  
  const now = Date.now();
  
  // Always fetch fresh nonce at the start of a sequence or if enough time has passed
  if (currentNonce === null || (now - lastNonceFetchTime) > NONCE_FETCH_INTERVAL_MS) {
    // Fetch nonce with retry logic for reliability
    let chainNonce: number = 0;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      attempts++;
      try {
        // Try pending first for most accurate count
        chainNonce = await publicClient.getTransactionCount({
          address: agentAccount.address,
          blockTag: "pending",
        });
        
        // Also get latest to compare
        const latestNonce = await publicClient.getTransactionCount({
          address: agentAccount.address,
          blockTag: "latest",
        });
        
        // Use the higher of the two (pending should >= latest)
        chainNonce = Math.max(chainNonce, latestNonce);
        
        console.log(`[SmartInvest] 🔄 Nonce fetch attempt ${attempts}: pending=${chainNonce}, latest=${latestNonce}`);
        break;
      } catch (error) {
        console.log(`[SmartInvest] ⚠️ Nonce fetch attempt ${attempts} failed, retrying...`);
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retry
        }
      }
    }
    
    lastNonceFetchTime = now;
    
    // Always use chain nonce if it's higher, or if we're starting fresh
    if (currentNonce === null || chainNonce > currentNonce) {
      currentNonce = chainNonce;
      console.log(`[SmartInvest] 🔄 Using chain nonce: ${chainNonce}`);
    } else {
      console.log(`[SmartInvest] 🔄 Keeping tracked nonce: ${currentNonce} (chain: ${chainNonce})`);
    }
  }
  
  const nonce = currentNonce;
  currentNonce++; // Increment for next transaction
  
  console.log(`[SmartInvest] Using nonce: ${nonce}`);
  return nonce;
}

/**
 * Reset nonce tracking (call after errors or when starting new sequence)
 * Forces a fresh fetch from chain on next getNextNonce() call
 */
async function resetNonce(): Promise<void> {
  currentNonce = null;
  lastNonceFetchTime = 0; // Force fresh fetch
  
  // Small delay to allow any pending transactions to be indexed
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log("[SmartInvest] Nonce tracking reset");
}

/**
 * Get current gas prices with a small bump for reliability
 */
async function getGasSettings(): Promise<{ maxFeePerGas: bigint; maxPriorityFeePerGas: bigint }> {
  try {
    const gasPrice = await publicClient.getGasPrice();
    // Add 20% buffer to gas price for reliability
    const maxFeePerGas = (gasPrice * 120n) / 100n;
    const maxPriorityFeePerGas = (gasPrice * 10n) / 100n; // 10% priority fee
    return { maxFeePerGas, maxPriorityFeePerGas };
  } catch {
    // Fallback to reasonable defaults for Fraxtal
    return {
      maxFeePerGas: 100000000n, // 0.1 gwei
      maxPriorityFeePerGas: 10000000n, // 0.01 gwei
    };
  }
}

// ============================================================================
// SSE BROADCASTER TYPE - Step-Based Events for Real-Time UI Updates
// ============================================================================

/**
 * Event structure for frontend UI stepper
 * Steps: 1=Wrap, 2=SwapStable, 3=StakeStable, 4=SwapVolatile, 5=StakeVolatile
 */
export type BroadcastFn = (event: {
  type: "log" | "DEPOSIT_DETECTED" | "INVESTMENT_COMPLETE" | "smart_invest_update";
  step?: number;
  status: "Processing" | "Success" | "Failed" | "DEPOSIT_DETECTED" | "INVESTED" | string;
  message: string;
  txHash?: string;
  tx?: string; // Alias for txHash for backward compatibility
  amount?: string;
  timestamp: string;
}) => void;

let globalBroadcaster: BroadcastFn | null = null;

/**
 * Set the SSE broadcaster for real-time event emission
 */
export function setSmartInvestBroadcaster(broadcaster: BroadcastFn) {
  globalBroadcaster = broadcaster;
  console.log("✅ [SmartInvest] SSE Broadcaster registered");
}

/**
 * Broadcast a step update to all connected clients
 * @param step - Step number (1-5) for UI stepper
 * @param status - Processing | Success | Failed
 * @param message - Human-readable message
 * @param txHash - Optional transaction hash for explorer link
 * @param amount - Optional amount for display
 */
function broadcastLog(
  step: number,
  status: "Processing" | "Success" | "Failed",
  message: string,
  txHash?: string,
  amount?: string
) {
  console.log(`[SmartInvest] Step ${step} - ${status}: ${message}`);
  
  if (globalBroadcaster) {
    globalBroadcaster({
      type: "log",
      step,
      status,
      message,
      txHash,
      tx: txHash, // Backward compatibility
      amount,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Legacy broadcast function for backward compatibility
 * @deprecated Use broadcastLog for step-based updates
 */
function broadcastStep(status: string, message: string, step?: string, tx?: string, amount?: string) {
  if (globalBroadcaster) {
    globalBroadcaster({
      type: "smart_invest_update",
      status,
      message,
      step: step ? parseInt(step) || undefined : undefined,
      tx,
      amount,
      timestamp: new Date().toISOString(),
    });
  }
  console.log(`[SmartInvest] ${status}: ${message}`);
}

// ============================================================================
// INVESTMENT SEQUENCE RESULT TYPE
// ============================================================================

export interface InvestmentResult {
  status: "SUCCESS" | "PARTIAL_SUCCESS" | "FAILED" | "DEMO_MODE" | "INSUFFICIENT_BALANCE";
  userAddress: string;
  strategy: UserStrategy;
  allocation: {
    totalDeposit: string;
    investableAmount: string;
    stableAmount: string;
    volatileAmount: string;
    gasReserved: string;
  };
  transactions: {
    wrap?: { hash: string; block: string; explorer: string };
    approveRouterStable?: { hash: string; block: string; explorer: string };
    swapToFrxUSD?: { hash: string; block: string; explorer: string; amountOut?: string };
    approveSfrxUSD?: { hash: string; block: string; explorer: string };
    depositSfrxUSD?: { hash: string; block: string; explorer: string; shares?: string };
    approveRouterVolatile?: { hash: string; block: string; explorer: string };
    swapToFrxETH?: { hash: string; block: string; explorer: string; amountOut?: string };
    // NOTE: On Fraxtal, sfrxETH is acquired via Fraxswap swap, NOT vault deposit
    // The following two fields replace the old approveSfrxETH/depositSfrxETH pattern
    approveRouterForSfrxETHSwap?: { hash: string; block: string; explorer: string };
    swapFrxETHToSfrxETH?: { hash: string; block: string; explorer: string; amountOut?: string };
    // Legacy fields kept for backward compatibility but no longer used on Fraxtal
    approveSfrxETH?: { hash: string; block: string; explorer: string };
    depositSfrxETH?: { hash: string; block: string; explorer: string; shares?: string };
  };
  balances: {
    nativeFRAX: string;
    wFRAX: string;
    frxUSD: string;
    sfrxUSD: string;
    frxETH: string;
    sfrxETH: string;
  };
  yields: {
    stableAPY: string;
    volatileAPY: string;
  };
  error?: string;
  logs: string[];
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a deadline timestamp (current time + 20 minutes)
 */
function getDeadline(): bigint {
  return BigInt(Math.floor(Date.now() / 1000) + 1200); // 20 minutes
}

/**
 * Wait for transaction receipt with timeout
 */
async function waitForTx(hash: Hash, description: string): Promise<{ 
  blockNumber: bigint; 
  gasUsed: bigint;
  status: "success" | "reverted";
}> {
  console.log(`[SmartInvest] ⏳ Waiting for ${description} confirmation...`);
  
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  
  if (receipt.status === "reverted") {
    throw new Error(`${description} transaction reverted`);
  }
  
  console.log(`[SmartInvest] ✅ ${description} confirmed in block ${receipt.blockNumber}`);
  
  return {
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed,
    status: receipt.status,
  };
}

/**
 * Get current balance of an ERC20 token
 */
async function getTokenBalance(tokenAddress: Address, holder: Address): Promise<bigint> {
  return await publicClient.readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [holder],
  }) as bigint;
}

// ============================================================================
// MAIN INVESTMENT SEQUENCE
// ============================================================================

/**
 * Execute the full Smart Invest sequence.
 * 
 * Flow:
 * 1. Wrap native FRAX → wFRAX
 * 2. Split based on strategy
 * 3. Stable side: Approve Router → Swap wFRAX→frxUSD → Approve Vault → Deposit into sfrxUSD
 * 4. Volatile side: Approve Router → Swap wFRAX→frxETH → Approve Vault → Deposit into sfrxETH
 * 
 * @param userAddress - User wallet address (for strategy lookup)
 * @param depositAmount - Amount of native FRAX deposited (in wei)
 */
export async function executeInvestmentSequence(
  userAddress: string,
  depositAmount: bigint
): Promise<InvestmentResult> {
  const logs: string[] = [];
  const addLog = (msg: string) => {
    logs.push(msg);
    console.log(`[SmartInvest] ${msg}`);
  };

  addLog("========================================");
  addLog("🚀 SMART INVEST SEQUENCE INITIATED");
  addLog("========================================");

  // ========================================================================
  // SAFETY CHECK: Demo Mode
  // ========================================================================
  if (!agentAccount || !walletClient) {
    return {
      status: "DEMO_MODE",
      userAddress,
      strategy: strategyManager.getStrategy(userAddress),
      allocation: {
        totalDeposit: formatEther(depositAmount),
        investableAmount: "0",
        stableAmount: "0",
        volatileAmount: "0",
        gasReserved: "0",
      },
      transactions: {},
      balances: {
        nativeFRAX: "0",
        wFRAX: "0",
        frxUSD: "0",
        sfrxUSD: "0",
        frxETH: "0",
        sfrxETH: "0",
      },
      yields: { stableAPY: "~5%", volatileAPY: "~8-12%" },
      error: "Agent wallet not initialized - Set AGENT_PRIVATE_KEY",
      logs: ["DEMO MODE: Set AGENT_PRIVATE_KEY for live execution"],
    };
  }

// ========================================================================
    // STEP 0: Calculate Allocation
    // ========================================================================
    addLog("📊 Calculating investment allocation...");
    
    const strategy = strategyManager.getStrategy(userAddress);
    const allocation = strategyManager.calculateAllocation(userAddress, depositAmount);
    
    addLog(`📊 Strategy: ${strategy.name}`);
    addLog(`   Stable: ${strategy.stablePercent}% → ${formatEther(allocation.stableAmount)} FRAX → sfrxUSD`);
    addLog(`   Volatile: ${strategy.volatilePercent}% → ${formatEther(allocation.volatileAmount)} FRAX → sfrxETH`);
    addLog(`   Gas Reserve: ${formatEther(allocation.gasReserve)} FRAX`);  if (allocation.investableAmount === 0n) {
    return {
      status: "INSUFFICIENT_BALANCE",
      userAddress,
      strategy,
      allocation: {
        totalDeposit: formatEther(depositAmount),
        investableAmount: "0",
        stableAmount: "0",
        volatileAmount: "0",
        gasReserved: formatEther(allocation.gasReserve),
      },
      transactions: {},
      balances: {
        nativeFRAX: formatEther(depositAmount),
        wFRAX: "0",
        frxUSD: "0",
        sfrxUSD: "0",
        frxETH: "0",
        sfrxETH: "0",
      },
      yields: { stableAPY: "~5%", volatileAPY: "~8-12%" },
      error: "Deposit too small - need more than 0.1 FRAX (gas reserve)",
      logs,
    };
  }

  const result: InvestmentResult = {
    status: "SUCCESS",
    userAddress,
    strategy,
    allocation: {
      totalDeposit: formatEther(depositAmount),
      investableAmount: formatEther(allocation.investableAmount),
      stableAmount: formatEther(allocation.stableAmount),
      volatileAmount: formatEther(allocation.volatileAmount),
      gasReserved: formatEther(allocation.gasReserve),
    },
    transactions: {},
    balances: {
      nativeFRAX: "0",
      wFRAX: "0",
      frxUSD: "0",
      sfrxUSD: "0",
      frxETH: "0",
      sfrxETH: "0",
    },
    yields: { stableAPY: "~5%", volatileAPY: "~8-12%" },
    logs,
  };

  try {
    // Reset nonce tracking at start of sequence
    await resetNonce();
    
    // Get gas settings once for the sequence
    const gasSettings = await getGasSettings();
    addLog(`⛽ Gas settings: maxFee=${gasSettings.maxFeePerGas}, priority=${gasSettings.maxPriorityFeePerGas}`);
    
    // ========================================================================
    // STEP 1: WRAP FRAX → wFRAX
    // ========================================================================
    addLog("\n📦 STEP 1: Wrapping native FRAX → wFRAX");
    broadcastLog(1, "Processing", `Wrapping ${formatEther(allocation.investableAmount)} FRAX → wFRAX...`, undefined, formatEther(allocation.investableAmount));

    const wrapNonce = await getNextNonce();
    const wrapTx = await walletClient.sendTransaction({
      account: agentAccount,
      chain: fraxtal,
      to: CONTRACTS.wFRAX,
      value: allocation.investableAmount,
      data: encodeFunctionData({
        abi: WFRAX_ABI,
        functionName: "deposit",
      }),
      nonce: wrapNonce,
      ...gasSettings,
    });

    const wrapReceipt = await waitForTx(wrapTx, "Wrap FRAX → wFRAX");
    result.transactions.wrap = {
      hash: wrapTx,
      block: wrapReceipt.blockNumber.toString(),
      explorer: `https://fraxscan.com/tx/${wrapTx}`,
    };
    addLog(`✅ Wrapped ${formatEther(allocation.investableAmount)} FRAX → wFRAX`);
    broadcastLog(1, "Success", `Wrapped ${formatEther(allocation.investableAmount)} FRAX → wFRAX`, wrapTx, formatEther(allocation.investableAmount));

    // ========================================================================
    // STEP 2-4: STABLE SIDE (if allocation > 0)
    // ========================================================================
    if (allocation.stableAmount > 0n) {
      addLog("\n💵 STABLE SIDE: wFRAX → frxUSD → sfrxUSD");
      
      // STEP 2: Approve Router for wFRAX (stable portion)
      addLog("🔐 STEP 2: Approving Fraxswap Router for wFRAX...");
      broadcastLog(2, "Processing", `Approving Fraxswap Router for ${formatEther(allocation.stableAmount)} wFRAX...`);

      const approveStableNonce = await getNextNonce();
      const approveRouterStableTx = await walletClient.writeContract({
        chain: fraxtal,
        account: agentAccount,
        address: CONTRACTS.wFRAX,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACTS.fraxswapRouter, allocation.stableAmount],
        nonce: approveStableNonce,
      });

      const approveRouterStableReceipt = await waitForTx(approveRouterStableTx, "Approve Router (Stable)");
      result.transactions.approveRouterStable = {
        hash: approveRouterStableTx,
        block: approveRouterStableReceipt.blockNumber.toString(),
        explorer: `https://fraxscan.com/tx/${approveRouterStableTx}`,
      };

      // STEP 2 continued: Swap wFRAX → frxUSD on Fraxswap
      addLog(`💱 Swapping ${formatEther(allocation.stableAmount)} wFRAX → frxUSD...`);
      broadcastLog(2, "Processing", `Swapping ${formatEther(allocation.stableAmount)} wFRAX → frxUSD...`);

      // Get expected output
      let expectedFrxUSD: bigint;
      try {
        const amountsOut = await publicClient.readContract({
          address: CONTRACTS.fraxswapRouter,
          abi: FRAXSWAP_ROUTER_ABI,
          functionName: "getAmountsOut",
          args: [allocation.stableAmount, [CONTRACTS.wFRAX, CONTRACTS.frxUSD]],
        }) as bigint[];
        expectedFrxUSD = amountsOut[1];
        addLog(`   Expected output: ${formatEther(expectedFrxUSD)} frxUSD`);
      } catch {
        // If quote fails, use 0 as minimum (accept any amount)
        expectedFrxUSD = 0n;
        addLog(`   ⚠️ Could not get quote, using 0 slippage protection`);
      }

      // Apply 1% slippage tolerance
      const minFrxUSD = (expectedFrxUSD * 99n) / 100n;

      const swapStableNonce = await getNextNonce();
      const swapStableTx = await walletClient.writeContract({
        chain: fraxtal,
        account: agentAccount,
        address: CONTRACTS.fraxswapRouter,
        abi: FRAXSWAP_ROUTER_ABI,
        functionName: "swapExactTokensForTokens",
        args: [
          allocation.stableAmount,
          minFrxUSD,
          [CONTRACTS.wFRAX, CONTRACTS.frxUSD],
          agentAccount.address,
          getDeadline(),
        ],
        nonce: swapStableNonce,
      });

      const swapStableReceipt = await waitForTx(swapStableTx, "Swap wFRAX → frxUSD");
      const frxUSDReceived = await getTokenBalance(CONTRACTS.frxUSD, agentAccount.address);
      result.transactions.swapToFrxUSD = {
        hash: swapStableTx,
        block: swapStableReceipt.blockNumber.toString(),
        explorer: `https://fraxscan.com/tx/${swapStableTx}`,
        amountOut: formatEther(frxUSDReceived),
      };
      addLog(`✅ Swapped to ${formatEther(frxUSDReceived)} frxUSD`);
      broadcastLog(2, "Success", `Swapped to ${formatEther(frxUSDReceived)} frxUSD`, swapStableTx, formatEther(frxUSDReceived));

      // STEP 3: Approve frxUSD for FraxtalERC4626MintRedeemer (Stake/Unstake contract)
      // On Fraxtal, sfrxUSD requires using the MintRedeemer contract, not direct deposit
      addLog("🔐 STEP 3: Approving frxUSD for Fraxtal Stake/Unstake contract...");
      broadcastLog(3, "Processing", `Staking ${formatEther(frxUSDReceived)} frxUSD → sfrxUSD vault...`);

      const approveSfrxUSDNonce = await getNextNonce();
      const approveSfrxUSDTx = await walletClient.writeContract({
        chain: fraxtal,
        account: agentAccount,
        address: CONTRACTS.frxUSD,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACTS.frxUSDStakeUnstake, frxUSDReceived],
        nonce: approveSfrxUSDNonce,
      });

      const approveSfrxUSDReceipt = await waitForTx(approveSfrxUSDTx, "Approve frxUSD for Staking");
      result.transactions.approveSfrxUSD = {
        hash: approveSfrxUSDTx,
        block: approveSfrxUSDReceipt.blockNumber.toString(),
        explorer: `https://fraxscan.com/tx/${approveSfrxUSDTx}`,
      };

      // STEP 3b: Deposit frxUSD → sfrxUSD via FraxtalERC4626MintRedeemer
      addLog(`💎 Depositing ${formatEther(frxUSDReceived)} frxUSD → sfrxUSD via MintRedeemer...`);

      const depositSfrxUSDNonce = await getNextNonce();
      const depositSfrxUSDTx = await walletClient.writeContract({
        chain: fraxtal,
        account: agentAccount,
        address: CONTRACTS.frxUSDStakeUnstake,
        abi: FRAXTAL_STAKE_UNSTAKE_ABI,
        functionName: "deposit",
        args: [frxUSDReceived, agentAccount.address],
        nonce: depositSfrxUSDNonce,
      });

      const depositSfrxUSDReceipt = await waitForTx(depositSfrxUSDTx, "Stake frxUSD → sfrxUSD");
      const sfrxUSDShares = await getTokenBalance(CONTRACTS.sfrxUSD, agentAccount.address);
      result.transactions.depositSfrxUSD = {
        hash: depositSfrxUSDTx,
        block: depositSfrxUSDReceipt.blockNumber.toString(),
        explorer: `https://fraxscan.com/tx/${depositSfrxUSDTx}`,
        shares: formatEther(sfrxUSDShares),
      };
      addLog(`✅ Staked frxUSD → Received ${formatEther(sfrxUSDShares)} sfrxUSD shares`);
      broadcastLog(3, "Success", `Staked frxUSD → Received ${formatEther(sfrxUSDShares)} sfrxUSD shares (~5% APY)`, depositSfrxUSDTx, formatEther(sfrxUSDShares));
    }

    // ========================================================================
    // STEP 4-5: VOLATILE SIDE (if allocation > 0)
    // ========================================================================
    if (allocation.volatileAmount > 0n) {
      addLog("\n📈 VOLATILE SIDE: wFRAX → frxETH → sfrxETH");
      
      // STEP 4: Approve Router for wFRAX (volatile portion) and swap
      addLog("🔐 STEP 4: Approving Fraxswap Router for wFRAX...");
      broadcastLog(4, "Processing", `Swapping ${formatEther(allocation.volatileAmount)} wFRAX → frxETH...`);

      const approveVolatileNonce = await getNextNonce();
      const approveRouterVolatileTx = await walletClient.writeContract({
        chain: fraxtal,
        account: agentAccount,
        address: CONTRACTS.wFRAX,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [CONTRACTS.fraxswapRouter, allocation.volatileAmount],
        nonce: approveVolatileNonce,
      });

      const approveRouterVolatileReceipt = await waitForTx(approveRouterVolatileTx, "Approve Router (Volatile)");
      result.transactions.approveRouterVolatile = {
        hash: approveRouterVolatileTx,
        block: approveRouterVolatileReceipt.blockNumber.toString(),
        explorer: `https://fraxscan.com/tx/${approveRouterVolatileTx}`,
      };

      // STEP 4 continued: Swap wFRAX → frxETH on Fraxswap
      addLog(`💱 Swapping ${formatEther(allocation.volatileAmount)} wFRAX → frxETH...`);

      // Get expected output
      let expectedFrxETH: bigint;
      try {
        const amountsOut = await publicClient.readContract({
          address: CONTRACTS.fraxswapRouter,
          abi: FRAXSWAP_ROUTER_ABI,
          functionName: "getAmountsOut",
          args: [allocation.volatileAmount, [CONTRACTS.wFRAX, CONTRACTS.frxETH]],
        }) as bigint[];
        expectedFrxETH = amountsOut[1];
        addLog(`   Expected output: ${formatEther(expectedFrxETH)} frxETH`);
      } catch {
        expectedFrxETH = 0n;
        addLog(`   ⚠️ Could not get quote, using 0 slippage protection`);
      }

      // Apply 1% slippage tolerance
      const minFrxETH = (expectedFrxETH * 99n) / 100n;

      const swapVolatileNonce = await getNextNonce();
      const swapVolatileTx = await walletClient.writeContract({
        chain: fraxtal,
        account: agentAccount,
        address: CONTRACTS.fraxswapRouter,
        abi: FRAXSWAP_ROUTER_ABI,
        functionName: "swapExactTokensForTokens",
        args: [
          allocation.volatileAmount,
          minFrxETH,
          [CONTRACTS.wFRAX, CONTRACTS.frxETH],
          agentAccount.address,
          getDeadline(),
        ],
        nonce: swapVolatileNonce,
      });

      const swapVolatileReceipt = await waitForTx(swapVolatileTx, "Swap wFRAX → frxETH");
      const frxETHReceived = await getTokenBalance(CONTRACTS.frxETH, agentAccount.address);
      result.transactions.swapToFrxETH = {
        hash: swapVolatileTx,
        block: swapVolatileReceipt.blockNumber.toString(),
        explorer: `https://fraxscan.com/tx/${swapVolatileTx}`,
        amountOut: formatEther(frxETHReceived),
      };
      addLog(`✅ Swapped to ${formatEther(frxETHReceived)} frxETH`);
      broadcastLog(4, "Success", `Swapped to ${formatEther(frxETHReceived)} frxETH`, swapVolatileTx, formatEther(frxETHReceived));

      // ======================================================================
      // STEP 5: Swap frxETH → sfrxETH via Curve stable-ng Pool
      // ======================================================================
      // NOTE: On Fraxtal L2, sfrxETH is a bridged yield token.
      // We use the Curve frxETH/sfrxETH pool for better depth and pricing.
      // 
      // Pool: 0xF2f426Fe123De7b769b2D4F8c911512F065225d3 (Curve stable-ng)
      // UI: https://www.curve.finance/dex/fraxtal/pools/factory-stable-ng-6/deposit
      // ======================================================================
      
      addLog("🔄 STEP 5: Swapping frxETH → sfrxETH via Curve pool...");
      broadcastLog(5, "Processing", `Swapping ${formatEther(frxETHReceived)} frxETH → sfrxETH via Curve pool...`);

      // Check if frxETH amount is below minimum for Curve swap
      if (frxETHReceived < CURVE_VOLATILE_SWAP_CONFIG.minSwapAmountWei) {
        addLog(`⚠️ Skipping Curve frxETH→sfrxETH swap: amount (${formatEther(frxETHReceived)} frxETH) below minSwapAmountWei`);
        addLog(`   Keeping volatile leg as frxETH instead of sfrxETH`);
        broadcastLog(5, "Success", `Skipped sfrxETH swap – amount too small for Curve pool, holding ${formatEther(frxETHReceived)} frxETH as volatile exposure`, undefined, formatEther(frxETHReceived));
      } else {
        try {
          // Step 5a: Resolve Curve pool indices (cached after first call)
          addLog("� Step 5a: Resolving Curve pool coin indices...");
          const { frxEthIndex, sfrxEthIndex } = await getCurveIndices(publicClient);
          addLog(`   frxETH index: ${frxEthIndex}, sfrxETH index: ${sfrxEthIndex}`);

          // Step 5b: Quote expected output using get_dy
          addLog("📊 Step 5b: Quoting Curve swap...");
          const expectedSfrxETH = await curvQuoteDy(publicClient, frxETHReceived);
          
          if (expectedSfrxETH === 0n) {
            addLog(`⚠️ Skipping sfrxETH swap: Curve get_dy returned 0 - amount too small for pool`);
            addLog(`   Keeping volatile leg as frxETH instead of sfrxETH`);
            broadcastLog(5, "Success", `Skipped sfrxETH swap – pool returned 0 output, holding ${formatEther(frxETHReceived)} frxETH as volatile exposure`, undefined, formatEther(frxETHReceived));
          } else {
            // Calculate minimum output with slippage protection
            const amountOutMin = calculateMinDy(expectedSfrxETH, CURVE_VOLATILE_SWAP_CONFIG.slippageBps);
            
            addLog(`   Expected output: ${formatEther(expectedSfrxETH)} sfrxETH`);
            addLog(`   Min output (with ${Number(CURVE_VOLATILE_SWAP_CONFIG.slippageBps) / 100}% slippage): ${formatEther(amountOutMin)} sfrxETH`);

            // Step 5c: Approve Curve pool to spend frxETH (if needed)
            addLog("🔐 Step 5c: Checking/setting Curve pool allowance for frxETH...");
            const approveNonce = await getNextNonce();
            const allowanceResult = await ensureCurveAllowance(walletClient, publicClient, {
              owner: agentAccount.address,
              amount: frxETHReceived,
              nonce: approveNonce,
            });

            if (allowanceResult.wasNeeded && allowanceResult.txHash) {
              const approveReceipt = await waitForTx(allowanceResult.txHash, "Approve Curve pool for frxETH");
              result.transactions.approveRouterForSfrxETHSwap = {
                hash: allowanceResult.txHash,
                block: approveReceipt.blockNumber.toString(),
                explorer: `https://fraxscan.com/tx/${allowanceResult.txHash}`,
              };
              addLog(`✅ Approved Curve pool for ${formatEther(frxETHReceived)} frxETH`);
            } else {
              addLog(`   Allowance sufficient, skipping approve`);
            }

            // Step 5d: Execute the swap via Curve exchange()
            addLog(`💱 Step 5d: Executing Curve exchange ${formatEther(frxETHReceived)} frxETH → sfrxETH...`);
            
            const swapNonce = await getNextNonce();
            const swapFrxETHToSfrxETHTx = await swapFrxEthToSfrxEth(walletClient, publicClient, {
              dx: frxETHReceived,
              minDy: amountOutMin,
              receiver: agentAccount.address,
              nonce: swapNonce,
            });

            const swapFrxETHToSfrxETHReceipt = await waitForTx(swapFrxETHToSfrxETHTx, "Swap frxETH → sfrxETH via Curve");
            const sfrxETHReceived = await getSfrxEthBalance(publicClient, agentAccount.address);
            
            result.transactions.swapFrxETHToSfrxETH = {
              hash: swapFrxETHToSfrxETHTx,
              block: swapFrxETHToSfrxETHReceipt.blockNumber.toString(),
              explorer: `https://fraxscan.com/tx/${swapFrxETHToSfrxETHTx}`,
              amountOut: formatEther(sfrxETHReceived),
            };
            
            addLog(`✅ Swapped ${formatEther(frxETHReceived)} frxETH → ${formatEther(sfrxETHReceived)} sfrxETH via Curve frxETH/sfrxETH pool`);
            broadcastLog(5, "Success", `Swapped ${formatEther(frxETHReceived)} frxETH → ${formatEther(sfrxETHReceived)} sfrxETH via Curve frxETH/sfrxETH pool`, swapFrxETHToSfrxETHTx, formatEther(sfrxETHReceived));
          }
        } catch (swapError: any) {
          // Handle Curve swap failure - keep frxETH as volatile asset (partial success)
          addLog(`❌ Curve frxETH→sfrxETH swap failed: ${swapError.message}`);
          addLog(`   Keeping volatile leg as frxETH instead of sfrxETH`);
          broadcastLog(5, "Failed", `Curve frxETH→sfrxETH swap failed; keeping frxETH as volatile exposure`);
          
          // Don't throw - partial success, volatile stays as frxETH
          result.status = "PARTIAL_SUCCESS";
          result.error = `Curve swap failed: ${swapError.message}. frxETH held instead of sfrxETH.`;
        }
      }
    }

    // ========================================================================
    // FINAL: Get updated balances
    // ========================================================================
    addLog("\n📊 FINAL BALANCES:");
    
    const finalNativeFRAX = await publicClient.getBalance({ address: agentAccount.address });
    const finalWFRAX = await getTokenBalance(CONTRACTS.wFRAX, agentAccount.address);
    const finalFrxUSD = await getTokenBalance(CONTRACTS.frxUSD, agentAccount.address);
    const finalSfrxUSD = await getTokenBalance(CONTRACTS.sfrxUSD, agentAccount.address);
    const finalFrxETH = await getTokenBalance(CONTRACTS.frxETH, agentAccount.address);
    const finalSfrxETH = await getTokenBalance(CONTRACTS.sfrxETH, agentAccount.address);

    result.balances = {
      nativeFRAX: formatEther(finalNativeFRAX),
      wFRAX: formatEther(finalWFRAX),
      frxUSD: formatEther(finalFrxUSD),
      sfrxUSD: formatEther(finalSfrxUSD),
      frxETH: formatEther(finalFrxETH),
      sfrxETH: formatEther(finalSfrxETH),
    };

    addLog(`   Native FRAX: ${result.balances.nativeFRAX} (gas reserve)`);
    addLog(`   wFRAX: ${result.balances.wFRAX}`);
    addLog(`   frxUSD: ${result.balances.frxUSD}`);
    addLog(`   sfrxUSD: ${result.balances.sfrxUSD} (earning ~5% APY)`);
    addLog(`   frxETH: ${result.balances.frxETH}`);
    addLog(`   sfrxETH: ${result.balances.sfrxETH} (earning ~8-12% APY)`);

    addLog("\n========================================");
    addLog("🎉 SMART INVEST SEQUENCE COMPLETE!");
    addLog("========================================");

    // Note: INVESTMENT_COMPLETE is sent by server.ts after this function returns
    // This allows proper sequencing of events

    return result;

  } catch (error: any) {
    addLog(`\n❌ ERROR: ${error.message}`);
    result.status = "FAILED";
    result.error = error.message;
    
    // Broadcast failure with the current step if known
    if (globalBroadcaster) {
      globalBroadcaster({
        type: "log",
        status: "Failed",
        message: `Smart Invest failed: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    }
    
    return result;
  }
}

// ============================================================================
// ADK TOOL EXPORTS
// ============================================================================

export const smart_invest = createTool({
  name: "smart_invest",
  description: `
    Execute the Smart Invest workflow when FRAX is deposited.
    
    This autonomously:
    1. Wraps native FRAX → wFRAX
    2. Splits based on user strategy (default: 60% stable / 40% volatile)
    3. Swaps stable portion to frxUSD and stakes in sfrxUSD vault (~5% APY)
    4. Swaps volatile portion to frxETH and stakes in sfrxETH vault (~8-12% APY)
    
    Gas Safety: Always reserves 0.1 FRAX for future transactions.
    
    Network: Fraxtal Mainnet (Chain ID: 252)
  `,
  schema: z.object({
    userAddress: z.string().describe("User's wallet address (for strategy lookup)"),
    depositAmount: z.string().describe("Amount of FRAX deposited (in ether units, e.g. '1.5')"),
  }),
  fn: async ({ userAddress, depositAmount }: { userAddress: string; depositAmount: string }) => {
    const amountWei = parseEther(depositAmount);
    const result = await executeInvestmentSequence(userAddress, amountWei);
    return JSON.stringify(result, null, 2);
  },
});

export const set_user_strategy = createTool({
  name: "set_user_strategy",
  description: `
    Set a user's investment strategy for Smart Invest.
    
    The strategy determines how deposits are split:
    - stablePercent: Goes to frxUSD → sfrxUSD (conservative, ~5% APY)
    - volatilePercent: Goes to frxETH → sfrxETH (aggressive, ~8-12% APY)
    
    Presets available:
    - conservative: 80% stable / 20% volatile
    - balanced: 60% stable / 40% volatile (default)
    - aggressive: 30% stable / 70% volatile
    - stable_only: 100% stable / 0% volatile
    - eth_only: 0% stable / 100% volatile
  `,
  schema: z.object({
    userAddress: z.string().describe("User's wallet address"),
    preset: z.enum(["conservative", "balanced", "aggressive", "stable_only", "eth_only"]).optional()
      .describe("Use a preset strategy (overrides stablePercent/volatilePercent)"),
    stablePercent: z.number().min(0).max(100).optional()
      .describe("Percentage to allocate to stable yield (0-100)"),
    volatilePercent: z.number().min(0).max(100).optional()
      .describe("Percentage to allocate to volatile yield (0-100)"),
  }),
  fn: async ({ userAddress, preset, stablePercent, volatilePercent }) => {
    try {
      let strategy: UserStrategy;
      
      if (preset) {
        strategy = strategyManager.setPreset(userAddress, preset);
      } else if (stablePercent !== undefined && volatilePercent !== undefined) {
        strategy = strategyManager.setStrategy(userAddress, stablePercent, volatilePercent);
      } else {
        return JSON.stringify({
          error: "Must provide either 'preset' or both 'stablePercent' and 'volatilePercent'",
        });
      }
      
      return JSON.stringify({
        status: "SUCCESS",
        userAddress,
        strategy,
        message: `Strategy set: ${strategy.name} (${strategy.stablePercent}% stable / ${strategy.volatilePercent}% volatile)`,
      }, null, 2);
    } catch (error: any) {
      return JSON.stringify({ error: error.message });
    }
  },
});

export const get_user_strategy = createTool({
  name: "get_user_strategy",
  description: "Get a user's current investment strategy for Smart Invest.",
  schema: z.object({
    userAddress: z.string().describe("User's wallet address"),
  }),
  fn: async ({ userAddress }: { userAddress: string }) => {
    const strategy = strategyManager.getStrategy(userAddress);
    return JSON.stringify({
      userAddress,
      strategy,
      formatted: strategyManager.formatStrategy(userAddress),
    }, null, 2);
  },
});

// Export strategy manager for server use
export { strategyManager };
