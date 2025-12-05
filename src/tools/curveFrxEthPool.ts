/**
 * CURVE FRXETH/SFRXETH POOL HELPER
 * 
 * Handles swapping frxETH → sfrxETH via the Curve stable-ng pool on Fraxtal.
 * This replaces the previous Fraxswap router approach for the volatile leg.
 * 
 * Pool: 0xF2f426Fe123De7b769b2D4F8c911512F065225d3 (Curve frxETH/sfrxETH stable-ng)
 * UI: https://www.curve.finance/dex/fraxtal/pools/factory-stable-ng-6/deposit
 * 
 * Coin layout (discovered dynamically):
 *   - coins(0) = frxETH (0xfc00000000000000000000000000000000000006)
 *   - coins(1) = sfrxETH (0xfc00000000000000000000000000000000000005)
 * 
 * The indices are resolved at runtime by querying the pool's coins() function.
 */

import {
  type Address,
  type Hash,
  formatEther,
} from "viem";
import { fraxtal } from "viem/chains";

// Use generic client types to avoid Fraxtal-specific type issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPublicClient = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyWalletClient = any;

// ============================================================================
// CURVE POOL CONFIGURATION
// ============================================================================

export const CURVE_FRXETH_SFRXETH_POOL = "0xF2f426Fe123De7b769b2D4F8c911512F065225d3" as Address;

/**
 * Configuration for Curve volatile swaps
 */
export const CURVE_VOLATILE_SWAP_CONFIG = {
  /** Slippage tolerance in basis points (50 = 0.5%) */
  slippageBps: 50n,
  /** Minimum frxETH amount to attempt swap (below this, keep as frxETH) */
  minSwapAmountWei: 10_000_000_000_000n, // 0.00001 ETH = 10^13 wei
  /** Curve pool address */
  pool: CURVE_FRXETH_SFRXETH_POOL,
} as const;

// Token addresses (must match smartInvestTools CONTRACTS)
const FRXETH_ADDRESS = "0xfc00000000000000000000000000000000000006" as Address;
const SFRXETH_ADDRESS = "0xfc00000000000000000000000000000000000005" as Address;

// ============================================================================
// MINIMAL ABIs
// ============================================================================

/**
 * Minimal Curve stable-ng pool ABI for swaps
 */
export const CURVE_POOL_ABI = [
  // Get number of coins in the pool
  {
    stateMutability: "view",
    type: "function",
    name: "N_COINS",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Get coin address by index
  {
    stateMutability: "view",
    type: "function",
    name: "coins",
    inputs: [{ name: "arg0", type: "uint256" }],
    outputs: [{ name: "", type: "address" }],
  },
  // Quote expected output for a swap
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
  // Execute swap without receiver (tokens go to msg.sender)
  {
    stateMutability: "nonpayable",
    type: "function",
    name: "exchange",
    inputs: [
      { name: "i", type: "int128" },
      { name: "j", type: "int128" },
      { name: "_dx", type: "uint256" },
      { name: "_min_dy", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Execute swap with explicit receiver
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

/**
 * Minimal ERC20 ABI for approvals
 */
export const ERC20_MINIMAL_ABI = [
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
] as const;

// ============================================================================
// CACHED INDICES
// ============================================================================

/**
 * Cached coin indices for the Curve pool
 * Resolved once on first use, then reused
 */
interface CoinIndices {
  frxEthIndex: bigint;
  sfrxEthIndex: bigint;
  resolved: boolean;
}

let cachedIndices: CoinIndices = {
  frxEthIndex: 0n,
  sfrxEthIndex: 1n,
  resolved: false,
};

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Resolve and cache the coin indices for frxETH and sfrxETH in the Curve pool.
 * This queries the pool's coins() function to dynamically determine indices.
 * 
 * @param publicClient - Viem public client for reading contract state
 * @returns Object with frxEthIndex and sfrxEthIndex as bigint
 * @throws Error if indices cannot be determined (pool layout changed)
 */
export async function getIndices(publicClient: AnyPublicClient): Promise<{
  frxEthIndex: bigint;
  sfrxEthIndex: bigint;
}> {
  // Return cached indices if already resolved
  if (cachedIndices.resolved) {
    return {
      frxEthIndex: cachedIndices.frxEthIndex,
      sfrxEthIndex: cachedIndices.sfrxEthIndex,
    };
  }

  console.log("[CurveFrxEthPool] Resolving coin indices from pool...");

  try {
    // Get number of coins in the pool
    const nCoins = await publicClient.readContract({
      address: CURVE_FRXETH_SFRXETH_POOL,
      abi: CURVE_POOL_ABI,
      functionName: "N_COINS",
    }) as bigint;

    console.log(`[CurveFrxEthPool] Pool has ${nCoins} coins`);

    let frxEthIndex: bigint | null = null;
    let sfrxEthIndex: bigint | null = null;

    // Query each coin address and match against known tokens
    for (let k = 0; k < Number(nCoins); k++) {
      const coinAddr = await publicClient.readContract({
        address: CURVE_FRXETH_SFRXETH_POOL,
        abi: CURVE_POOL_ABI,
        functionName: "coins",
        args: [BigInt(k)],
      }) as Address;

      console.log(`[CurveFrxEthPool] coins(${k}) = ${coinAddr}`);

      if (coinAddr.toLowerCase() === FRXETH_ADDRESS.toLowerCase()) {
        frxEthIndex = BigInt(k);
        console.log(`[CurveFrxEthPool] ✓ frxETH found at index ${k}`);
      } else if (coinAddr.toLowerCase() === SFRXETH_ADDRESS.toLowerCase()) {
        sfrxEthIndex = BigInt(k);
        console.log(`[CurveFrxEthPool] ✓ sfrxETH found at index ${k}`);
      }
    }

    // Validate we found both tokens
    if (frxEthIndex === null || sfrxEthIndex === null) {
      const error = `[CurveFrxEthPool] ERROR: Could not find both tokens in pool. frxETH index: ${frxEthIndex}, sfrxETH index: ${sfrxEthIndex}`;
      console.error(error);
      throw new Error(error);
    }

    // Cache the indices
    cachedIndices = {
      frxEthIndex,
      sfrxEthIndex,
      resolved: true,
    };

    console.log(`[CurveFrxEthPool] ✓ Indices cached: frxETH=${frxEthIndex}, sfrxETH=${sfrxEthIndex}`);

    return {
      frxEthIndex: cachedIndices.frxEthIndex,
      sfrxEthIndex: cachedIndices.sfrxEthIndex,
    };
  } catch (error: any) {
    console.error(`[CurveFrxEthPool] Failed to resolve indices: ${error.message}`);
    throw error;
  }
}

/**
 * Quote the expected output for swapping frxETH → sfrxETH via Curve.
 * Uses the pool's get_dy() function.
 * 
 * @param publicClient - Viem public client for reading contract state
 * @param dx - Amount of frxETH to swap (in wei)
 * @returns Expected amount of sfrxETH output (in wei)
 */
export async function quoteDy(
  publicClient: AnyPublicClient,
  dx: bigint
): Promise<bigint> {
  // Ensure indices are resolved
  const { frxEthIndex, sfrxEthIndex } = await getIndices(publicClient);

  try {
    const dy = await publicClient.readContract({
      address: CURVE_FRXETH_SFRXETH_POOL,
      abi: CURVE_POOL_ABI,
      functionName: "get_dy",
      args: [frxEthIndex, sfrxEthIndex, dx],
    }) as bigint;

    console.log(`[CurveFrxEthPool] get_dy(${frxEthIndex}, ${sfrxEthIndex}, ${formatEther(dx)}) = ${formatEther(dy)} sfrxETH`);

    return dy;
  } catch (error: any) {
    console.error(`[CurveFrxEthPool] quoteDy failed: ${error.message}`);
    throw error;
  }
}

/**
 * Calculate minimum output with slippage protection.
 * 
 * @param expectedDy - Expected output from quoteDy
 * @param slippageBps - Slippage tolerance in basis points (default: 50 = 0.5%)
 * @returns Minimum acceptable output
 */
export function calculateMinDy(expectedDy: bigint, slippageBps: bigint = CURVE_VOLATILE_SWAP_CONFIG.slippageBps): bigint {
  return (expectedDy * (10_000n - slippageBps)) / 10_000n;
}

/**
 * Check and set allowance for the Curve pool to spend frxETH.
 * Only sends approve transaction if current allowance is insufficient.
 * 
 * @param walletClient - Viem wallet client for sending transactions
 * @param publicClient - Viem public client for reading contract state
 * @param params - Parameters for the approval
 * @returns Transaction hash if approval was needed, null otherwise
 */
export async function ensureAllowance(
  walletClient: AnyWalletClient,
  publicClient: AnyPublicClient,
  params: {
    owner: Address;
    amount: bigint;
    nonce?: number;
  }
): Promise<{ txHash: Hash | null; wasNeeded: boolean }> {
  const { owner, amount, nonce } = params;

  // Check current allowance
  const allowance = await publicClient.readContract({
    address: FRXETH_ADDRESS,
    abi: ERC20_MINIMAL_ABI,
    functionName: "allowance",
    args: [owner, CURVE_FRXETH_SFRXETH_POOL],
  }) as bigint;

  console.log(`[CurveFrxEthPool] Current frxETH allowance for Curve pool: ${formatEther(allowance)}`);

  if (allowance >= amount) {
    console.log(`[CurveFrxEthPool] Allowance sufficient, skipping approve`);
    return { txHash: null, wasNeeded: false };
  }

  console.log(`[CurveFrxEthPool] Approving Curve pool for ${formatEther(amount)} frxETH...`);

  // Approve exactly the amount needed (not MaxUint256 to avoid approval spam concerns)
  const txHash = await walletClient.writeContract({
    chain: fraxtal,
    account: walletClient.account!,
    address: FRXETH_ADDRESS,
    abi: ERC20_MINIMAL_ABI,
    functionName: "approve",
    args: [CURVE_FRXETH_SFRXETH_POOL, amount],
    ...(nonce !== undefined ? { nonce } : {}),
  });

  console.log(`[CurveFrxEthPool] Approve tx sent: ${txHash}`);

  return { txHash, wasNeeded: true };
}

/**
 * Execute the frxETH → sfrxETH swap via Curve pool.
 * 
 * @param walletClient - Viem wallet client for sending transactions
 * @param publicClient - Viem public client for reading contract state
 * @param params - Swap parameters
 * @returns Transaction hash
 */
export async function swapFrxEthToSfrxEth(
  walletClient: AnyWalletClient,
  publicClient: AnyPublicClient,
  params: {
    dx: bigint;
    minDy: bigint;
    receiver: Address;
    nonce?: number;
  }
): Promise<Hash> {
  const { dx, minDy, receiver, nonce } = params;

  // Ensure indices are resolved
  const { frxEthIndex, sfrxEthIndex } = await getIndices(publicClient);

  console.log(`[CurveFrxEthPool] Executing swap:`);
  console.log(`   i (frxETH): ${frxEthIndex}`);
  console.log(`   j (sfrxETH): ${sfrxEthIndex}`);
  console.log(`   dx: ${formatEther(dx)} frxETH`);
  console.log(`   minDy: ${formatEther(minDy)} sfrxETH`);
  console.log(`   receiver: ${receiver}`);

  // Use the exchange function with receiver parameter
  const txHash = await walletClient.writeContract({
    chain: fraxtal,
    account: walletClient.account!,
    address: CURVE_FRXETH_SFRXETH_POOL,
    abi: CURVE_POOL_ABI,
    functionName: "exchange",
    // Note: Curve uses int128 for indices, viem handles the conversion
    args: [frxEthIndex, sfrxEthIndex, dx, minDy, receiver],
    ...(nonce !== undefined ? { nonce } : {}),
  });

  console.log(`[CurveFrxEthPool] Swap tx sent: ${txHash}`);

  return txHash;
}

/**
 * Get the current sfrxETH balance for an address.
 * 
 * @param publicClient - Viem public client for reading contract state
 * @param address - Address to check balance for
 * @returns Balance in wei
 */
export async function getSfrxEthBalance(
  publicClient: AnyPublicClient,
  address: Address
): Promise<bigint> {
  return await publicClient.readContract({
    address: SFRXETH_ADDRESS,
    abi: ERC20_MINIMAL_ABI,
    functionName: "balanceOf",
    args: [address],
  }) as bigint;
}

/**
 * Execute the full Curve swap flow: approve (if needed) + exchange.
 * This is a convenience function that handles the complete flow.
 * 
 * @param walletClient - Viem wallet client for sending transactions  
 * @param publicClient - Viem public client for reading contract state
 * @param params - Flow parameters
 * @returns Result with approval and swap details
 */
export async function executeCurveSwapFlow(
  walletClient: AnyWalletClient,
  publicClient: AnyPublicClient,
  params: {
    frxEthAmount: bigint;
    receiver: Address;
    slippageBps?: bigint;
    getNextNonce: () => Promise<number>;
    waitForTx: (hash: Hash, description: string) => Promise<{ blockNumber: bigint }>;
  }
): Promise<{
  success: boolean;
  skipped: boolean;
  skipReason?: string;
  approveTx?: { hash: Hash; block: string };
  swapTx?: { hash: Hash; block: string; amountOut: bigint };
  error?: string;
}> {
  const { frxEthAmount, receiver, slippageBps, getNextNonce, waitForTx } = params;
  const effectiveSlippage = slippageBps ?? CURVE_VOLATILE_SWAP_CONFIG.slippageBps;

  // Check minimum amount
  if (frxEthAmount < CURVE_VOLATILE_SWAP_CONFIG.minSwapAmountWei) {
    console.log(`[CurveFrxEthPool] Amount ${formatEther(frxEthAmount)} frxETH below minimum ${formatEther(CURVE_VOLATILE_SWAP_CONFIG.minSwapAmountWei)}`);
    return {
      success: true,
      skipped: true,
      skipReason: `Amount (${formatEther(frxEthAmount)} frxETH) below minSwapAmountWei`,
    };
  }

  try {
    // Resolve indices first
    await getIndices(publicClient);

    // Quote expected output
    const expectedDy = await quoteDy(publicClient, frxEthAmount);

    if (expectedDy === 0n) {
      console.log(`[CurveFrxEthPool] get_dy returned 0 - amount too small for pool`);
      return {
        success: true,
        skipped: true,
        skipReason: `Pool returned 0 output for ${formatEther(frxEthAmount)} frxETH`,
      };
    }

    // Calculate min output with slippage
    const minDy = calculateMinDy(expectedDy, effectiveSlippage);

    console.log(`[CurveFrxEthPool] Expected: ${formatEther(expectedDy)} sfrxETH, Min: ${formatEther(minDy)} sfrxETH`);

    // Ensure allowance
    const approveNonce = await getNextNonce();
    const allowanceResult = await ensureAllowance(walletClient, publicClient, {
      owner: receiver,
      amount: frxEthAmount,
      nonce: approveNonce,
    });

    let approveTxResult: { hash: Hash; block: string } | undefined;

    if (allowanceResult.wasNeeded && allowanceResult.txHash) {
      const approveReceipt = await waitForTx(allowanceResult.txHash, "Approve Curve pool for frxETH");
      approveTxResult = {
        hash: allowanceResult.txHash,
        block: approveReceipt.blockNumber.toString(),
      };
    }

    // Execute swap
    const swapNonce = await getNextNonce();
    const swapTxHash = await swapFrxEthToSfrxEth(walletClient, publicClient, {
      dx: frxEthAmount,
      minDy,
      receiver,
      nonce: swapNonce,
    });

    const swapReceipt = await waitForTx(swapTxHash, "Swap frxETH → sfrxETH via Curve");

    // Get final balance to determine actual output
    const sfrxEthBalance = await getSfrxEthBalance(publicClient, receiver);

    return {
      success: true,
      skipped: false,
      approveTx: approveTxResult,
      swapTx: {
        hash: swapTxHash,
        block: swapReceipt.blockNumber.toString(),
        amountOut: sfrxEthBalance, // Note: This is total balance, not just swap output
      },
    };
  } catch (error: any) {
    console.error(`[CurveFrxEthPool] Swap flow failed: ${error.message}`);
    return {
      success: false,
      skipped: false,
      error: error.message,
    };
  }
}

// ============================================================================
// GAS / PRECISION CAVEATS
// ============================================================================

/**
 * Notes on Curve stable-NG pools and very small trades:
 * 
 * 1. PRECISION: Curve stable-NG pools use high-precision math (18 decimals).
 *    Very small amounts (< 10^13 wei = 0.00001 ETH) may result in 0 output
 *    due to integer division rounding. The minSwapAmountWei threshold protects
 *    against this.
 * 
 * 2. GAS COSTS: On Fraxtal, gas is paid in FRAX and is relatively cheap.
 *    However, the Curve exchange() function costs ~80-120k gas.
 *    At typical Fraxtal gas prices (~0.001-0.01 gwei), this is negligible.
 *    Still, for amounts worth less than ~$0.01, the gas cost may exceed
 *    the value being swapped.
 * 
 * 3. POOL DEPTH: The frxETH/sfrxETH pool has ~$3k per side. This is sufficient
 *    for typical Smart Invest amounts (micro-investments up to a few ETH).
 *    Large swaps (>$1k) may see higher slippage due to limited depth.
 * 
 * 4. SLIPPAGE: Default 0.5% (50 bps) is conservative for this pool since
 *    frxETH and sfrxETH have a stable relationship (sfrxETH accrues yield).
 *    For larger amounts, consider increasing slippage or splitting trades.
 */
