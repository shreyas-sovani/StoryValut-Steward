/**
 * CURVE TRIPOOL HELPER - Fraxtal TriPool (frxUSD/frxETH/WFRAX)
 * 
 * This module provides helpers for swapping via the Curve TriPool on Fraxtal.
 * The TriPool is more reliable than Fraxswap which suffers from "twamm out of date"
 * errors due to TWAMM (Time-Weighted Average Market Maker) state synchronization issues.
 * 
 * TriPool Coin Layout (determined by calling coins(i) on the contract):
 *   - Index 0: frxUSD (0xfc00000000000000000000000000000000000001)
 *   - Index 1: frxETH (0xfc00000000000000000000000000000000000006)
 *   - Index 2: WFRAX  (0xfc00000000000000000000000000000000000002)
 * 
 * Why TriPool instead of Fraxswap?
 * - Fraxswap V2 on Fraxtal uses TWAMM which requires calling executeVirtualOrders()
 *   before any swap/quote. This is unreliable and often fails with "twamm out of date".
 * - Curve pools use a constant-product/stableswap AMM that doesn't need state sync.
 * - TriPool has sufficient liquidity for our micro-investment use case.
 * 
 * Network: Fraxtal Mainnet (Chain ID: 252)
 */

import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
  type Account,
  maxUint256,
  parseEther,
} from "viem";
import { fraxtal } from "viem/chains";

// ============================================================================
// TRIPOOL CONFIGURATION
// ============================================================================

export const TRIPOOL_ADDRESS = "0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569" as const;

/**
 * Coin indices in the TriPool (verified via coins(i) calls)
 * These are uint256 indices used in exchange() and get_dy()
 */
export const TRIPOOL_COINS = {
  FRXUSD_INDEX: 0n,  // frxUSD at index 0
  FRXETH_INDEX: 1n,  // frxETH at index 1
  WFRAX_INDEX: 2n,   // WFRAX at index 2
} as const;

/**
 * Token addresses for reference
 */
export const TRIPOOL_TOKENS = {
  frxUSD: "0xfc00000000000000000000000000000000000001" as Address,
  frxETH: "0xfc00000000000000000000000000000000000006" as Address,
  wFRAX: "0xfc00000000000000000000000000000000000002" as Address,
} as const;

/**
 * Minimum amounts for swaps (dust protection)
 */
export const MIN_SWAP_AMOUNTS = {
  frxETH: parseEther("0.00001"),  // 0.00001 frxETH minimum
  frxUSD: parseEther("0.01"),     // 0.01 frxUSD minimum  
  wFRAX: parseEther("0.01"),      // 0.01 wFRAX minimum
} as const;

/**
 * Default slippage in basis points (50 = 0.5%)
 */
export const DEFAULT_SLIPPAGE_BPS = 50n;

// ============================================================================
// TRIPOOL ABI (minimal - only what we need)
// ============================================================================

export const CURVE_TRIPOOL_ABI = [
  // View functions
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
      { name: "i", type: "uint256" },
      { name: "j", type: "uint256" },
      { name: "dx", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    name: "balances",
    inputs: [{ name: "arg0", type: "uint256" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Exchange functions (with receiver)
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "exchange",
    inputs: [
      { name: "i", type: "uint256" },
      { name: "j", type: "uint256" },
      { name: "dx", type: "uint256" },
      { name: "min_dy", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

// ERC20 ABI for approvals
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
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
] as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the token address for a given pool index
 */
export function getTokenAddressForIndex(index: bigint): Address {
  switch (index) {
    case TRIPOOL_COINS.FRXUSD_INDEX:
      return TRIPOOL_TOKENS.frxUSD;
    case TRIPOOL_COINS.FRXETH_INDEX:
      return TRIPOOL_TOKENS.frxETH;
    case TRIPOOL_COINS.WFRAX_INDEX:
      return TRIPOOL_TOKENS.wFRAX;
    default:
      throw new Error(`Unknown TriPool index: ${index}`);
  }
}

/**
 * Get the pool index for a given token address
 */
export function getIndexForTokenAddress(token: Address): bigint {
  const normalized = token.toLowerCase();
  if (normalized === TRIPOOL_TOKENS.frxUSD.toLowerCase()) {
    return TRIPOOL_COINS.FRXUSD_INDEX;
  }
  if (normalized === TRIPOOL_TOKENS.frxETH.toLowerCase()) {
    return TRIPOOL_COINS.FRXETH_INDEX;
  }
  if (normalized === TRIPOOL_TOKENS.wFRAX.toLowerCase()) {
    return TRIPOOL_COINS.WFRAX_INDEX;
  }
  throw new Error(`Token ${token} not in TriPool`);
}

/**
 * Calculate minimum output with slippage protection
 * @param expectedOut - Expected output from get_dy
 * @param slippageBps - Slippage in basis points (e.g., 50 = 0.5%)
 */
export function calculateMinDy(expectedOut: bigint, slippageBps: bigint = DEFAULT_SLIPPAGE_BPS): bigint {
  return (expectedOut * (10_000n - slippageBps)) / 10_000n;
}

// ============================================================================
// QUOTE FUNCTION
// ============================================================================

/**
 * Get a quote for swapping via the TriPool
 * 
 * @param publicClient - Viem public client
 * @param dx - Amount of input token (in wei)
 * @param iIn - Input token index in the pool
 * @param iOut - Output token index in the pool
 * @returns Expected output amount (in wei)
 */
export async function curveTriPoolQuote(
  publicClient: PublicClient,
  dx: bigint,
  iIn: bigint,
  iOut: bigint
): Promise<bigint> {
  if (dx === 0n) {
    return 0n;
  }

  const dy = await publicClient.readContract({
    address: TRIPOOL_ADDRESS,
    abi: CURVE_TRIPOOL_ABI,
    functionName: "get_dy",
    args: [iIn, iOut, dx],
  });

  return dy as bigint;
}

/**
 * Convenience function: Quote frxETH → frxUSD
 */
export async function quoteFrxEthToFrxUsd(
  publicClient: PublicClient,
  frxEthAmount: bigint
): Promise<bigint> {
  return curveTriPoolQuote(
    publicClient,
    frxEthAmount,
    TRIPOOL_COINS.FRXETH_INDEX,
    TRIPOOL_COINS.FRXUSD_INDEX
  );
}

/**
 * Convenience function: Quote frxUSD → frxETH
 */
export async function quoteFrxUsdToFrxEth(
  publicClient: PublicClient,
  frxUsdAmount: bigint
): Promise<bigint> {
  return curveTriPoolQuote(
    publicClient,
    frxUsdAmount,
    TRIPOOL_COINS.FRXUSD_INDEX,
    TRIPOOL_COINS.FRXETH_INDEX
  );
}

// ============================================================================
// APPROVAL HELPER
// ============================================================================

/**
 * Ensure token is approved for the TriPool
 * Only approves if current allowance is insufficient
 * 
 * NOTE: The walletClient must have an account attached (created with privateKeyToAccount)
 * to sign transactions locally. Without this, viem will try eth_sendTransaction which
 * requires the RPC node to have the private key (it doesn't for public RPCs).
 * 
 * @param walletClient - Viem wallet client WITH account attached
 * @param publicClient - Viem public client
 * @param accountAddress - Address to check allowance for and send from
 * @param tokenAddress - Token to approve
 * @param amount - Amount to approve (uses maxUint256 if not specified)
 * @param getNonce - Optional nonce getter function
 * @returns Transaction hash if approval was needed, undefined otherwise
 */
export async function ensureTriPoolApproval(
  walletClient: WalletClient,
  publicClient: PublicClient,
  accountAddress: Address,
  tokenAddress: Address,
  amount: bigint,
  getNonce?: () => Promise<number>
): Promise<Hash | undefined> {
  // Check current allowance
  const currentAllowance = await publicClient.readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [accountAddress, TRIPOOL_ADDRESS],
  }) as bigint;

  // If allowance is sufficient, skip approval
  if (currentAllowance >= amount) {
    console.log(`[TriPool] Allowance sufficient: ${currentAllowance} >= ${amount}`);
    return undefined;
  }

  console.log(`[TriPool] Approving ${tokenAddress} for TriPool...`);

  // Approve max to avoid repeated approvals
  const nonce = getNonce ? await getNonce() : undefined;
  
  // IMPORTANT: Use walletClient.account (the attached account from privateKeyToAccount)
  // Do NOT pass just the address string - that causes eth_sendTransaction instead of local signing
  if (!walletClient.account) {
    throw new Error("WalletClient must have an account attached for signing");
  }

  const hash = await walletClient.writeContract({
    chain: fraxtal,
    account: walletClient.account,
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [TRIPOOL_ADDRESS, maxUint256],
    ...(nonce !== undefined ? { nonce } : {}),
  });

  // Wait for confirmation
  await publicClient.waitForTransactionReceipt({ hash });
  console.log(`[TriPool] Approval confirmed: ${hash}`);

  return hash;
}

// ============================================================================
// SWAP FUNCTION
// ============================================================================

export interface TriPoolSwapResult {
  success: boolean;
  txHash?: Hash;
  amountIn: bigint;
  expectedOut: bigint;
  minOut: bigint;
  error?: string;
}

/**
 * Execute a swap via the Curve TriPool
 * 
 * This function:
 * 1. Checks if amount meets minimum threshold
 * 2. Gets a quote via get_dy
 * 3. Approves the token if needed
 * 4. Executes the swap via exchange()
 * 
 * IMPORTANT: The walletClient must have an account attached (from privateKeyToAccount)
 * to sign transactions locally. Pass the walletClient created with createWalletClient({ account: ... }).
 * 
 * @param walletClient - Viem wallet client WITH account attached
 * @param publicClient - Viem public client  
 * @param accountAddress - Address for allowance checks and swap receiver
 * @param tokenIn - Input token address
 * @param dx - Amount of input token
 * @param iIn - Input token index
 * @param iOut - Output token index
 * @param slippageBps - Slippage tolerance in basis points
 * @param getNonce - Optional nonce getter for sequential transactions
 * @returns Swap result with tx hash and amounts
 */
export async function curveTriPoolSwap(
  walletClient: WalletClient,
  publicClient: PublicClient,
  accountAddress: Address,
  tokenIn: Address,
  dx: bigint,
  iIn: bigint,
  iOut: bigint,
  slippageBps: bigint = DEFAULT_SLIPPAGE_BPS,
  getNonce?: () => Promise<number>
): Promise<TriPoolSwapResult> {
  // Validate input
  if (dx === 0n) {
    return {
      success: false,
      amountIn: 0n,
      expectedOut: 0n,
      minOut: 0n,
      error: "Swap amount is zero",
    };
  }

  // Verify walletClient has account attached
  if (!walletClient.account) {
    return {
      success: false,
      amountIn: dx,
      expectedOut: 0n,
      minOut: 0n,
      error: "WalletClient must have an account attached for signing. Use createWalletClient({ account: privateKeyToAccount(...) })",
    };
  }

  try {
    // Step 1: Get quote
    console.log(`[TriPool] Getting quote: ${dx} from index ${iIn} to ${iOut}...`);
    const expectedOut = await curveTriPoolQuote(publicClient, dx, iIn, iOut);
    
    if (expectedOut === 0n) {
      return {
        success: false,
        amountIn: dx,
        expectedOut: 0n,
        minOut: 0n,
        error: "Quote returned zero - insufficient liquidity or invalid swap",
      };
    }

    const minOut = calculateMinDy(expectedOut, slippageBps);
    console.log(`[TriPool] Quote: ${dx} → ${expectedOut} (min: ${minOut})`);

    // Step 2: Ensure approval
    await ensureTriPoolApproval(
      walletClient,
      publicClient,
      accountAddress,
      tokenIn,
      dx,
      getNonce
    );

    // Step 3: Execute swap
    console.log(`[TriPool] Executing swap...`);
    const nonce = getNonce ? await getNonce() : undefined;

    // Use walletClient.account for signing (NOT just the address string)
    const txHash = await walletClient.writeContract({
      chain: fraxtal,
      account: walletClient.account,
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "exchange",
      args: [iIn, iOut, dx, minOut, accountAddress],
      ...(nonce !== undefined ? { nonce } : {}),
    });

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    
    if (receipt.status === "reverted") {
      return {
        success: false,
        txHash,
        amountIn: dx,
        expectedOut,
        minOut,
        error: "Transaction reverted",
      };
    }

    console.log(`[TriPool] Swap confirmed in block ${receipt.blockNumber}: ${txHash}`);

    return {
      success: true,
      txHash,
      amountIn: dx,
      expectedOut,
      minOut,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[TriPool] Swap failed: ${errorMsg}`);
    return {
      success: false,
      amountIn: dx,
      expectedOut: 0n,
      minOut: 0n,
      error: errorMsg,
    };
  }
}

// ============================================================================
// CONVENIENCE SWAP FUNCTIONS
// ============================================================================

/**
 * Swap frxETH → frxUSD via TriPool
 * 
 * This is the key function for the rebalance pipeline:
 * sfrxETH → frxETH (Curve sfrxETH/frxETH pool) → frxUSD (this function) → sfrxUSD (staking)
 */
export async function swapFrxEthToFrxUsd(
  walletClient: WalletClient,
  publicClient: PublicClient,
  account: Address,
  frxEthAmount: bigint,
  slippageBps: bigint = DEFAULT_SLIPPAGE_BPS,
  getNonce?: () => Promise<number>
): Promise<TriPoolSwapResult> {
  // Check minimum amount
  if (frxEthAmount < MIN_SWAP_AMOUNTS.frxETH) {
    console.log(`[TriPool] Amount ${frxEthAmount} below minimum ${MIN_SWAP_AMOUNTS.frxETH}, skipping`);
    return {
      success: false,
      amountIn: frxEthAmount,
      expectedOut: 0n,
      minOut: 0n,
      error: `Amount below minimum (${MIN_SWAP_AMOUNTS.frxETH})`,
    };
  }

  return curveTriPoolSwap(
    walletClient,
    publicClient,
    account,
    TRIPOOL_TOKENS.frxETH,
    frxEthAmount,
    TRIPOOL_COINS.FRXETH_INDEX,
    TRIPOOL_COINS.FRXUSD_INDEX,
    slippageBps,
    getNonce
  );
}

/**
 * Swap wFRAX → frxUSD via TriPool
 * 
 * Alternative path if we have wFRAX and want frxUSD
 */
export async function swapWFraxToFrxUsd(
  walletClient: WalletClient,
  publicClient: PublicClient,
  account: Address,
  wFraxAmount: bigint,
  slippageBps: bigint = DEFAULT_SLIPPAGE_BPS,
  getNonce?: () => Promise<number>
): Promise<TriPoolSwapResult> {
  if (wFraxAmount < MIN_SWAP_AMOUNTS.wFRAX) {
    return {
      success: false,
      amountIn: wFraxAmount,
      expectedOut: 0n,
      minOut: 0n,
      error: `Amount below minimum (${MIN_SWAP_AMOUNTS.wFRAX})`,
    };
  }

  return curveTriPoolSwap(
    walletClient,
    publicClient,
    account,
    TRIPOOL_TOKENS.wFRAX,
    wFraxAmount,
    TRIPOOL_COINS.WFRAX_INDEX,
    TRIPOOL_COINS.FRXUSD_INDEX,
    slippageBps,
    getNonce
  );
}

/**
 * Swap wFRAX → frxETH via TriPool
 * 
 * For the volatile investment leg: wFRAX → frxETH
 * Then frxETH → sfrxETH via Curve sfrxETH/frxETH pool
 */
export async function swapWFraxToFrxEth(
  walletClient: WalletClient,
  publicClient: PublicClient,
  account: Address,
  wFraxAmount: bigint,
  slippageBps: bigint = DEFAULT_SLIPPAGE_BPS,
  getNonce?: () => Promise<number>
): Promise<TriPoolSwapResult> {
  if (wFraxAmount < MIN_SWAP_AMOUNTS.wFRAX) {
    return {
      success: false,
      amountIn: wFraxAmount,
      expectedOut: 0n,
      minOut: 0n,
      error: `Amount below minimum (${MIN_SWAP_AMOUNTS.wFRAX})`,
    };
  }

  return curveTriPoolSwap(
    walletClient,
    publicClient,
    account,
    TRIPOOL_TOKENS.wFRAX,
    wFraxAmount,
    TRIPOOL_COINS.WFRAX_INDEX,
    TRIPOOL_COINS.FRXETH_INDEX,
    slippageBps,
    getNonce
  );
}

/**
 * Swap frxUSD → frxETH via TriPool
 * 
 * For investing stable → volatile
 */
export async function swapFrxUsdToFrxEth(
  walletClient: WalletClient,
  publicClient: PublicClient,
  account: Address,
  frxUsdAmount: bigint,
  slippageBps: bigint = DEFAULT_SLIPPAGE_BPS,
  getNonce?: () => Promise<number>
): Promise<TriPoolSwapResult> {
  if (frxUsdAmount < MIN_SWAP_AMOUNTS.frxUSD) {
    return {
      success: false,
      amountIn: frxUsdAmount,
      expectedOut: 0n,
      minOut: 0n,
      error: `Amount below minimum (${MIN_SWAP_AMOUNTS.frxUSD})`,
    };
  }

  return curveTriPoolSwap(
    walletClient,
    publicClient,
    account,
    TRIPOOL_TOKENS.frxUSD,
    frxUsdAmount,
    TRIPOOL_COINS.FRXUSD_INDEX,
    TRIPOOL_COINS.FRXETH_INDEX,
    slippageBps,
    getNonce
  );
}

// ============================================================================
// DIAGNOSTIC FUNCTIONS
// ============================================================================

/**
 * Verify the TriPool coin indices by reading from the contract
 * Use this to confirm our hardcoded indices are correct
 */
export async function verifyTriPoolIndices(publicClient: PublicClient): Promise<{
  index0: Address;
  index1: Address;
  index2: Address;
  verified: boolean;
}> {
  const [coin0, coin1, coin2] = await Promise.all([
    publicClient.readContract({
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "coins",
      args: [0n],
    }) as Promise<Address>,
    publicClient.readContract({
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "coins",
      args: [1n],
    }) as Promise<Address>,
    publicClient.readContract({
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "coins",
      args: [2n],
    }) as Promise<Address>,
  ]);

  const verified =
    coin0.toLowerCase() === TRIPOOL_TOKENS.frxUSD.toLowerCase() &&
    coin1.toLowerCase() === TRIPOOL_TOKENS.frxETH.toLowerCase() &&
    coin2.toLowerCase() === TRIPOOL_TOKENS.wFRAX.toLowerCase();

  console.log(`[TriPool] Coin verification:`);
  console.log(`  Index 0: ${coin0} (expected frxUSD: ${TRIPOOL_TOKENS.frxUSD})`);
  console.log(`  Index 1: ${coin1} (expected frxETH: ${TRIPOOL_TOKENS.frxETH})`);
  console.log(`  Index 2: ${coin2} (expected wFRAX: ${TRIPOOL_TOKENS.wFRAX})`);
  console.log(`  Verified: ${verified}`);

  return { index0: coin0, index1: coin1, index2: coin2, verified };
}

/**
 * Get current balances in the TriPool (for debugging liquidity)
 */
export async function getTriPoolBalances(publicClient: PublicClient): Promise<{
  frxUSD: bigint;
  frxETH: bigint;
  wFRAX: bigint;
}> {
  const [bal0, bal1, bal2] = await Promise.all([
    publicClient.readContract({
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "balances",
      args: [0n],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "balances",
      args: [1n],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: TRIPOOL_ADDRESS,
      abi: CURVE_TRIPOOL_ABI,
      functionName: "balances",
      args: [2n],
    }) as Promise<bigint>,
  ]);

  return {
    frxUSD: bal0,
    frxETH: bal1,
    wFRAX: bal2,
  };
}

export default {
  TRIPOOL_ADDRESS,
  TRIPOOL_COINS,
  TRIPOOL_TOKENS,
  curveTriPoolQuote,
  curveTriPoolSwap,
  swapFrxEthToFrxUsd,
  swapWFraxToFrxUsd,
  swapFrxUsdToFrxEth,
  quoteFrxEthToFrxUsd,
  quoteFrxUsdToFrxEth,
  ensureTriPoolApproval,
  verifyTriPoolIndices,
  getTriPoolBalances,
};
