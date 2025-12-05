# FRAXTAL TOKEN CORRECTION - CRITICAL WORKFLOW CHANGE

## 🔴 ISSUE DISCOVERED: Wrong Native Token Assumption

**Previous Assumption (WRONG):**
- We thought frxETH was the native gas token on Fraxtal

**Actual Reality (project_context/fraxtal_doc.md):**
- **FRAX is the native gas token on Fraxtal** (like ETH on Ethereum)
- frxETH is an ERC20 token

## ✅ CORRECTED TOKEN ADDRESSES (Fraxtal Mainnet)

Source: `project_context/fraxtal_doc.md` - Official Fraxtal documentation

| Token | Type | Address |
|-------|------|---------|
| **FRAX** | Native gas token | Native (no address, use getBalance()) |
| **WFRAX** | Wrapped FRAX ERC20 | `0xfc00000000000000000000000000000000000002` |
| **frxUSD** | USD stablecoin ERC20 | `0xfc00000000000000000000000000000000000001` |
| **sfrxUSD** | Staked frxUSD vault | `0xfc00000000000000000000000000000000000008` |
| **FPI** | CPI-pegged stablecoin | `0xfc00000000000000000000000000000000000003` |
| **FPIS** | FPI governance token | `0xfc00000000000000000000000000000000000004` |
| **sfrxETH** | Staked frxETH vault (ERC4626) | `0xfc00000000000000000000000000000000000005` |
| **frxETH** | Frax Ether ERC20 | `0xfc00000000000000000000000000000000000006` |
| **frxBTC** | Frax Bitcoin ERC20 | `0xfc00000000000000000000000000000000000007` |

## 📋 CURRENT WALLET STATUS

**Agent Wallet:** `0x97e6c2b90492155bFA552FE348A6192f4fB1F163`

**Actual Holdings:**
- **FRAX (native gas):** 0.001098 FRAX ✅ DETECTED
- **frxETH (ERC20):** 0 frxETH ❌ NEED THIS TO STAKE
- **sfrxETH (vault):** 0 sfrxETH

## 🔄 CORRECTED INVESTMENT WORKFLOW

### OLD WORKFLOW (WRONG):
```
1. Receive frxETH (native gas) 
2. Wrap frxETH → wfrxETH
3. Approve sfrxETH vault
4. Deposit wfrxETH → sfrxETH
```

### NEW WORKFLOW (CORRECT):
```
1. Receive FRAX (native gas token) ✅ DONE (have 0.001098)
2. Swap FRAX → frxETH (on Fraxswap DEX) ❌ NEED TO IMPLEMENT
3. Approve sfrxETH vault
4. Deposit frxETH → sfrxETH vault
```

## 🛠️ CODE CHANGES MADE

### ✅ COMPLETED:
1. Updated token addresses in `src/tools/executionTools.ts`:
   - Changed to use predeploy addresses from fraxtal_doc.md
   - Added FRAX as native token detection
   - Added frxETH as ERC20 token

2. Updated wallet check in `src/tools/executionTools.ts`:
   - Now detects FRAX (native) via `getBalance()`
   - Now detects frxETH (ERC20) via `readContract()`
   - Returns correct workflow message

3. Updated watcher in `src/server.ts`:
   - Now reads `walletData.balances.frxETH` (ERC20)
   - Logs both FRAX (native) and frxETH (ERC20) balances

### ❌ STILL NEEDS FIXING:

4. **`executeRealMicroInvestmentFn()` function** - Currently tries to wrap native token:
   - Line 205: `to: WFRXETH_CONTRACT` ❌ This doesn't exist
   - Line 251: `address: WFRXETH_CONTRACT` ❌ This doesn't exist
   - **NEEDS:** Complete rewrite to swap FRAX → frxETH on Fraxswap

5. **Fraxswap integration** - Need to add DEX swap functionality:
   - Research Fraxswap router address on Fraxtal
   - Implement `swapExactTokensForTokens()` or equivalent
   - Handle slippage tolerance
   - Get price oracle/quote

## 🎯 NEXT STEPS

### HIGH PRIORITY:
1. **Research Fraxswap on Fraxtal:**
   - Find Fraxswap router contract address
   - Get ABI for swap functions
   - Determine FRAX/frxETH pool address
   
2. **Rewrite executeRealMicroInvestmentFn():**
   ```typescript
   // NEW 4-STEP PROCESS:
   // Step 1: Check FRAX balance (native token)
   // Step 2: Swap FRAX → frxETH on Fraxswap
   // Step 3: Approve sfrxETH vault to spend frxETH
   // Step 4: Deposit frxETH into sfrxETH vault
   ```

3. **Update SSE events:**
   - Add "SWAP_START" event
   - Add "SWAP_COMPLETE" event
   - Update frontend to handle 4-step process

### MEDIUM PRIORITY:
4. Fix old `execute_strategy()` function:
   - Line 684: Replace `SFRAX_CONTRACT` with `SFRXUSD_CONTRACT`
   - This function is legacy and not currently used

5. Update documentation:
   - Update PHASE_X_COMPLETE.md files
   - Update README with correct workflow
   - Add Fraxswap integration docs

## 🔍 TESTING PLAN

Once Fraxswap integration is complete:

1. **Unit Test:**
   - Mock Fraxswap swap
   - Verify 4-step workflow

2. **Integration Test:**
   - Start with 0.0001 FRAX
   - Execute full swap + stake
   - Verify sfrxETH balance

3. **Production Test:**
   - Send 0.0005 FRAX to agent
   - Watch autonomous watcher trigger
   - Monitor SSE events in UI

## 📚 REFERENCE DOCUMENTATION

- **Fraxtal Official Docs:** project_context/fraxtal_doc.md
- **Frax Finance Docs:** project_context/frax_finance_docs.md
- **Network:** Fraxtal Mainnet L2 (Chain ID 252)
- **Explorer:** https://fraxscan.com
- **RPC:** https://rpc.frax.com

---

**Status:** 🟡 PARTIALLY FIXED - Wallet detection corrected, micro-investment needs rewrite
**Last Updated:** 2025-12-04
**Author:** GitHub Copilot (AI Agent)
