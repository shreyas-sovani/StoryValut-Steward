/**
 * STRATEGY MANAGER - Session-based User Strategy Preferences
 * 
 * Manages user investment allocations for the "Smart Invest" workflow.
 * When FRAX is deposited, the agent splits funds based on user preferences.
 * 
 * Default Strategy: 60% Conservative (sfrxUSD) / 40% Aggressive (sfrxETH)
 */

// ============================================================================
// TYPES
// ============================================================================

export interface UserStrategy {
  /** Percentage allocated to stable yield (sfrxUSD) - 0-100 */
  stablePercent: number;
  /** Percentage allocated to volatile yield (sfrxETH) - 0-100 */
  volatilePercent: number;
  /** Optional custom name for this strategy */
  name?: string;
  /** Timestamp when strategy was last updated */
  updatedAt: Date;
  /** Auto-invest on deposit detection */
  autoInvest: boolean;
}

export interface StrategyAllocation {
  /** Total amount available for investment (after gas reserve) */
  investableAmount: bigint;
  /** Amount allocated to stable side (sfrxUSD) */
  stableAmount: bigint;
  /** Amount allocated to volatile side (sfrxETH) */
  volatileAmount: bigint;
  /** Reserved for gas fees */
  gasReserve: bigint;
}

// ============================================================================
// DEFAULT STRATEGY
// ============================================================================

export const DEFAULT_STRATEGY: UserStrategy = {
  stablePercent: 60,    // 60% → frxUSD → sfrxUSD (conservative, ~5% APY)
  volatilePercent: 40,  // 40% → frxETH → sfrxETH (aggressive, ~8-12% APY)
  name: "Balanced Growth",
  updatedAt: new Date(),
  autoInvest: true,
};

// ============================================================================
// STRATEGY PRESETS
// ============================================================================

export const STRATEGY_PRESETS: Record<string, Omit<UserStrategy, "updatedAt">> = {
  conservative: {
    stablePercent: 80,
    volatilePercent: 20,
    name: "Conservative",
    autoInvest: true,
  },
  balanced: {
    stablePercent: 60,
    volatilePercent: 40,
    name: "Balanced Growth",
    autoInvest: true,
  },
  aggressive: {
    stablePercent: 30,
    volatilePercent: 70,
    name: "Aggressive Growth",
    autoInvest: true,
  },
  stable_only: {
    stablePercent: 100,
    volatilePercent: 0,
    name: "Stable Only",
    autoInvest: true,
  },
  eth_only: {
    stablePercent: 0,
    volatilePercent: 100,
    name: "ETH Only",
    autoInvest: true,
  },
};

// ============================================================================
// STRATEGY MANAGER CLASS
// ============================================================================

export class StrategyManager {
  /** In-memory storage: User Wallet Address → Strategy */
  private strategies: Map<string, UserStrategy>;

  /** Gas reserve amount (0.1 FRAX in wei) */
  private readonly GAS_RESERVE = 100000000000000000n; // 0.1 FRAX

  constructor() {
    this.strategies = new Map();
    console.log("📊 StrategyManager initialized");
  }

  // ==========================================================================
  // STRATEGY MANAGEMENT
  // ==========================================================================

  /**
   * Get the strategy for a user. Returns default if not set.
   */
  getStrategy(userAddress: string): UserStrategy {
    const normalizedAddress = userAddress.toLowerCase();
    const existing = this.strategies.get(normalizedAddress);
    
    if (existing) {
      return existing;
    }

    // Return default strategy for new users
    return { ...DEFAULT_STRATEGY, updatedAt: new Date() };
  }

  /**
   * Set a user's strategy with custom allocation.
   * Validates that percentages sum to 100.
   */
  setStrategy(
    userAddress: string,
    stablePercent: number,
    volatilePercent: number,
    options?: { name?: string; autoInvest?: boolean }
  ): UserStrategy {
    const normalizedAddress = userAddress.toLowerCase();

    // Validate percentages
    if (stablePercent < 0 || stablePercent > 100) {
      throw new Error("stablePercent must be between 0 and 100");
    }
    if (volatilePercent < 0 || volatilePercent > 100) {
      throw new Error("volatilePercent must be between 0 and 100");
    }
    if (stablePercent + volatilePercent !== 100) {
      throw new Error("stablePercent + volatilePercent must equal 100");
    }

    const strategy: UserStrategy = {
      stablePercent,
      volatilePercent,
      name: options?.name || this.getStrategyName(stablePercent, volatilePercent),
      updatedAt: new Date(),
      autoInvest: options?.autoInvest ?? true,
    };

    this.strategies.set(normalizedAddress, strategy);
    console.log(`📊 Strategy set for ${normalizedAddress}: ${stablePercent}% stable / ${volatilePercent}% volatile`);

    return strategy;
  }

  /**
   * Set a user's strategy from a preset name.
   */
  setPreset(userAddress: string, presetName: keyof typeof STRATEGY_PRESETS): UserStrategy {
    const preset = STRATEGY_PRESETS[presetName];
    if (!preset) {
      throw new Error(`Unknown preset: ${presetName}. Available: ${Object.keys(STRATEGY_PRESETS).join(", ")}`);
    }

    return this.setStrategy(
      userAddress,
      preset.stablePercent,
      preset.volatilePercent,
      { name: preset.name, autoInvest: preset.autoInvest }
    );
  }

  /**
   * Remove a user's custom strategy (falls back to default).
   */
  clearStrategy(userAddress: string): void {
    const normalizedAddress = userAddress.toLowerCase();
    this.strategies.delete(normalizedAddress);
    console.log(`📊 Strategy cleared for ${normalizedAddress} (will use default)`);
  }

  /**
   * List all stored strategies (for debugging).
   */
  listStrategies(): Array<{ address: string; strategy: UserStrategy }> {
    const result: Array<{ address: string; strategy: UserStrategy }> = [];
    this.strategies.forEach((strategy, address) => {
      result.push({ address, strategy });
    });
    return result;
  }

  // ==========================================================================
  // ALLOCATION CALCULATION
  // ==========================================================================

  /**
   * Calculate how to split a deposit based on user's strategy.
   * 
   * @param userAddress - User's wallet address
   * @param totalBalance - Total FRAX balance detected (in wei)
   * @returns Allocation breakdown with amounts for each side
   */
  calculateAllocation(userAddress: string, totalBalance: bigint): StrategyAllocation {
    const strategy = this.getStrategy(userAddress);

    // Step 1: Reserve gas (0.1 FRAX)
    if (totalBalance <= this.GAS_RESERVE) {
      // Not enough to invest after gas reserve
      return {
        investableAmount: 0n,
        stableAmount: 0n,
        volatileAmount: 0n,
        gasReserve: totalBalance, // Keep everything for gas
      };
    }

    const investableAmount = totalBalance - this.GAS_RESERVE;

    // Step 2: Calculate split based on percentages
    // Use BigInt math to avoid precision issues
    const stableAmount = (investableAmount * BigInt(strategy.stablePercent)) / 100n;
    const volatileAmount = investableAmount - stableAmount; // Remainder goes to volatile

    console.log(`📊 Allocation calculated for ${userAddress}:`);
    console.log(`   Total: ${totalBalance.toString()} wei`);
    console.log(`   Gas Reserve: ${this.GAS_RESERVE.toString()} wei (0.1 FRAX)`);
    console.log(`   Investable: ${investableAmount.toString()} wei`);
    console.log(`   Stable (${strategy.stablePercent}%): ${stableAmount.toString()} wei`);
    console.log(`   Volatile (${strategy.volatilePercent}%): ${volatileAmount.toString()} wei`);

    return {
      investableAmount,
      stableAmount,
      volatileAmount,
      gasReserve: this.GAS_RESERVE,
    };
  }

  /**
   * Check if auto-invest is enabled for a user.
   */
  isAutoInvestEnabled(userAddress: string): boolean {
    return this.getStrategy(userAddress).autoInvest;
  }

  /**
   * Toggle auto-invest for a user.
   */
  setAutoInvest(userAddress: string, enabled: boolean): void {
    const normalizedAddress = userAddress.toLowerCase();
    const existing = this.strategies.get(normalizedAddress);
    
    if (existing) {
      existing.autoInvest = enabled;
      existing.updatedAt = new Date();
    } else {
      // Create strategy with default values but custom autoInvest
      this.setStrategy(
        userAddress,
        DEFAULT_STRATEGY.stablePercent,
        DEFAULT_STRATEGY.volatilePercent,
        { autoInvest: enabled }
      );
    }
  }

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  /**
   * Generate a strategy name based on allocation.
   */
  private getStrategyName(stablePercent: number, volatilePercent: number): string {
    if (stablePercent === 100) return "Stable Only";
    if (volatilePercent === 100) return "ETH Only";
    if (stablePercent >= 70) return "Conservative";
    if (stablePercent >= 50) return "Balanced";
    return "Aggressive";
  }

  /**
   * Get gas reserve amount in wei.
   */
  getGasReserve(): bigint {
    return this.GAS_RESERVE;
  }

  /**
   * Format strategy for display.
   */
  formatStrategy(userAddress: string): string {
    const strategy = this.getStrategy(userAddress);
    return `📊 ${strategy.name}: ${strategy.stablePercent}% Stable (sfrxUSD) / ${strategy.volatilePercent}% Volatile (sfrxETH)`;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

// Export a singleton instance for use across the application
export const strategyManager = new StrategyManager();
