# 🔗 Wallet Awareness Tool - Documentation

## Overview

The **Wallet Awareness Tool** makes the StoryVault Steward agent truly "blockchain aware" by checking real wallet balances on Fraxtal Mainnet before strategy deployment.

## What It Does

### Real-Time Balance Checks
- ✅ **Native FRAX Balance** - Gas token for transaction fees
- ✅ **sfrxETH Token Balance** - Staked frxETH holdings
- ✅ **Low Gas Warning** - Alerts if FRAX < 1 token
- ✅ **Asset Discovery** - Identifies existing yield-earning positions

### Network Details
- **Chain ID**: 252 (Fraxtal Mainnet)
- **RPC**: https://rpc.frax.com
- **Block Explorer**: https://fraxscan.com

## Tool Specification

### Name
`check_fraxtal_balance`

### Input Schema
```typescript
{
  walletAddress: string  // Valid Ethereum address (0x...)
}
```

### Output Format
```typescript
{
  success: boolean,
  walletAddress: string,
  network: "Fraxtal Mainnet",
  chainId: 252,
  blockNumber: string,
  balances: {
    frax: {
      amount: number,
      formatted: string,
      symbol: "FRAX",
      isGasToken: true
    },
    sfrxETH: {
      amount: number,
      formatted: string,
      symbol: "sfrxETH",
      contract: "0xfc00...0005"
    }
  },
  warnings: {
    lowGas: boolean,
    noAssets: boolean
  },
  message: string  // Formatted human-readable response
}
```

## Agent Integration

### When to Use
The agent is instructed to request wallet addresses in these scenarios:

1. **User Mentions a Wallet**
   - "I have a Fraxtal wallet"
   - "My address is 0x..."

2. **Pre-Deployment Check**
   - Before calling `deploy_story_vault`
   - User says "I'm ready to deploy"

3. **Proactive Verification**
   - User asks "Can I deploy this?"
   - Agent wants to verify readiness

### Agent Instructions
The system prompt now includes:

> **WALLET AWARENESS (New Feature!)**
> When appropriate, ask: "Do you have a Fraxtal wallet address? I can check your current balances to see if you're ready for deployment."
>
> If they provide an address:
> - Call check_fraxtal_balance to fetch their REAL balances
> - Warn if FRAX (gas) < 1 token
> - Celebrate if they already have sfrxETH earning yields
> - Provide actionable next steps based on their balance state

## Example Interactions

### Scenario 1: Sufficient Balances
**User**: "My wallet is 0x8412ebf45bAC1B340BbE8F318b928C466c4E39CA"

**Agent Response**:
```
✅ Wallet Balance Check (Fraxtal Mainnet)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Address: 0x8412...39CA
🔗 Network: Fraxtal L2 (Chain ID: 252)

💰 Native FRAX (Gas Token):
   150.5000 FRAX
   ✅ Sufficient gas for transactions

🏦 sfrxETH (Staked frxETH):
   2.150000 sfrxETH
   ✅ You already have sfrxETH earning yields!

🎉 Great! You have both gas and assets.
Ready to optimize your DeFi strategy!
```

### Scenario 2: Low Gas Warning
**User**: "Check 0x0000000000000000000000000000000000000001"

**Agent Response**:
```
✅ Wallet Balance Check (Fraxtal Mainnet)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 Native FRAX (Gas Token):
   0.0500 FRAX
   ⚠️  LOW GAS WARNING!
   You have less than 1 FRAX for gas fees.
   Please bridge more FRAX to execute transactions.

🏦 sfrxETH (Staked frxETH):
   0.000000 sfrxETH
   💡 You can mint sfrxETH by staking frxETH

🚨 Action Required:
1. Bridge FRAX to this wallet for gas fees
2. Acquire frxETH to start earning yields
3. Then deploy your personalized strategy
```

### Scenario 3: Has Gas, No Assets
**User**: "My address: 0x1234..."

**Agent Response**:
```
💰 Native FRAX: 10.0000 FRAX ✅
🏦 sfrxETH: 0.000000 sfrxETH

💡 Next Steps:
You have gas (FRAX) but no sfrxETH yet.
Consider staking frxETH to earn ~3.8% APY!
```

## Technical Implementation

### Architecture
```
walletTool.ts
├── Imports: viem, zod, fraxtal chain
├── Config: RPC, contracts, thresholds
├── Client: createPublicClient (Fraxtal)
└── Tool: createTool with schema + fn
```

### Key Components

1. **Public Client**
```typescript
const publicClient = createPublicClient({
  chain: fraxtal,
  transport: http("https://rpc.frax.com")
});
```

2. **Balance Fetching**
```typescript
// Native FRAX
const fraxBalance = await publicClient.getBalance({ address });

// sfrxETH Token
const sfrxEthBalance = await publicClient.readContract({
  address: "0xfc00...0005",
  abi: ["function balanceOf(address) view returns (uint256)"],
  functionName: "balanceOf",
  args: [address]
});
```

3. **Threshold Check**
```typescript
const LOW_GAS_THRESHOLD = 1n * 10n ** 18n; // 1 FRAX
const hasLowGas = fraxBalance < LOW_GAS_THRESHOLD;
```

## Contract Addresses

| Asset | Address | Purpose |
|-------|---------|---------|
| **sfrxETH** | `0xfc00000000000000000000000000000000000005` | Staked frxETH token |
| **frxETH** | `0xfc00000000000000000000000000000000000006` | Frax Ethereum token |
| **FRAX** | Native Token | Gas fees on Fraxtal |

## Error Handling

### Invalid Address
```typescript
if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
  return {
    success: false,
    error: "Invalid wallet address format"
  };
}
```

### Network Errors
```typescript
catch (error) {
  if (error.message?.includes("network")) {
    return {
      success: false,
      error: "Failed to connect to Fraxtal Mainnet"
    };
  }
}
```

## Benefits

### For Users
1. **Confidence** - Know their wallet is ready before deployment
2. **Transparency** - See real on-chain balances
3. **Actionable** - Get specific next steps based on their state
4. **Educational** - Learn about gas requirements

### For the Agent
1. **Proactive** - Prevent deployment failures
2. **Contextual** - Tailor recommendations to actual holdings
3. **Trustworthy** - Demonstrate real blockchain connectivity
4. **Professional** - Show technical sophistication

## Testing

### Manual Test via CLI
```bash
npm start
```

Then in the chat:
```
User: Can you check my wallet? 0x8412ebf45bAC1B340BbE8F318b928C466c4E39CA
Agent: [Calls check_fraxtal_balance tool]
Agent: [Returns formatted balance data]
```

### Test Addresses
```typescript
// Fraxtal Multisig (likely has funds)
0x8412ebf45bAC1B340BbE8F318b928C466c4E39CA

// Empty address
0x0000000000000000000000000000000000000001

// Your own address
0x... (your wallet)
```

## Future Enhancements

- [ ] Check frxETH balance (unstaked)
- [ ] Check sFRAX stablecoin balance
- [ ] Show historical balance changes
- [ ] Estimate gas costs for deployment
- [ ] Multi-wallet comparison
- [ ] Portfolio value in USD
- [ ] Yield projections based on current holdings

## Integration Checklist

✅ **Tool Created**: `src/tools/walletTool.ts`
✅ **Imported**: Added to `src/agent.ts`
✅ **Registered**: Added to `.withTools()`
✅ **Instructions Updated**: System prompt includes wallet awareness
✅ **Type-Safe**: No TypeScript errors
✅ **Tested**: Compiles successfully

## Security Notes

- ✅ **Read-Only**: Tool only reads balances, never writes
- ✅ **No Private Keys**: Only requires public addresses
- ✅ **RPC Safety**: Uses official Fraxtal RPC
- ✅ **Validation**: Address format checked before RPC call
- ✅ **Error Handling**: Graceful failures with user-friendly messages

---

**Status**: ✅ **IMPLEMENTED AND READY**

The StoryVault Steward agent is now blockchain-aware and can verify user wallet readiness before deployment!

**Built with 💜 for Fraxtal Hackathon - Wallet Awareness Feature**
