# Quick Testing Guide - Real Yield Optimization

## ✅ Pre-Flight Checklist

Before testing the real investing feature:

1. **Environment Setup**
   ```bash
   # Ensure AGENT_PRIVATE_KEY is set in .env
   echo $AGENT_PRIVATE_KEY  # Should NOT be empty
   ```

2. **Branch Verification**
   ```bash
   git branch --show-current
   # Should show: feature/real-investing
   ```

3. **Dependencies**
   ```bash
   npm install  # Ensure all deps installed
   ```

## 🧪 Test Scenarios

### Scenario 1: Check Agent Wallet (No Deposit Required)

**Test:** Verify the agent wallet is initialized and can query balances.

```bash
# Start the CLI
npx tsx src/cli.ts

# Ask the agent:
> "What's my vault address?"
> "Show me my current balances"
```

**Expected Response:**
```json
{
  "address": "0x...",
  "status": "ACTIVE_LISTENING",
  "balances": {
    "frxETH": "0",
    "sfrxETH": "0"
  },
  "execution_capable": true,
  "network": {
    "name": "Fraxtal Mainnet L2",
    "chainId": 252,
    "native_token": "frxETH (Frax Ether)"
  }
}
```

**✅ Pass Criteria:**
- Returns agent address
- Shows frxETH and sfrxETH balances
- `execution_capable: true`
- Network shows Fraxtal (Chain ID 252)

---

### Scenario 2: Real Investing Flow (Requires frxETH)

**Test:** Execute the full 3-step investing process.

**Prerequisites:**
1. Get frxETH on Fraxtal:
   - Bridge ETH to Fraxtal (https://fraxtal.bridge.frax.com)
   - OR get from a faucet
   - OR ask in Discord for testnet funds

2. Send 0.1 frxETH to agent address:
   ```
   Send to: [YOUR_AGENT_ADDRESS]
   Amount: 0.1 frxETH
   Network: Fraxtal (Chain ID 252)
   ```

**Execute Strategy:**
```bash
# Start the CLI
npx tsx src/cli.ts

# Trigger investment
> "Execute conservative strategy with 0.05 frxETH"
```

**Expected Console Output:**
```
🎯 REAL INVESTING MODE: Staking frxETH into sfrxETH vault
💰 Amount to invest: 0.05 frxETH

📦 STEP 1/3: Wrapping 0.04 frxETH → wfrxETH...
⏳ Waiting for wrap confirmation... TX: 0x...
✅ Step 1 Complete: Wrapped to wfrxETH (Block 12345)

🔐 STEP 2/3: Approving sfrxETH vault to spend wfrxETH...
⏳ Waiting for approval confirmation... TX: 0x...
✅ Step 2 Complete: Approved sfrxETH vault (Block 12346)

💎 STEP 3/3: Depositing 0.04 wfrxETH into sfrxETH vault...
⏳ Waiting for deposit confirmation... TX: 0x...
✅ Step 3 Complete: Deposited into sfrxETH vault (Block 12347)

🎉 SUCCESS! All 3 steps completed. Now earning sfrxETH yield!
```

**Expected Response:**
```json
{
  "status": "EXECUTED",
  "strategy": "conservative_mint",
  "transactions": {
    "wrap": {
      "hash": "0x...",
      "explorer": "https://fraxscan.com/tx/0x..."
    },
    "approve": {
      "hash": "0x...",
      "explorer": "https://fraxscan.com/tx/0x..."
    },
    "deposit": {
      "hash": "0x...",
      "explorer": "https://fraxscan.com/tx/0x..."
    }
  },
  "result": {
    "invested_amount": "0.04",
    "sfrxeth_balance": "0.04",
    "expected_apy": "5-10%"
  }
}
```

**✅ Pass Criteria:**
- All 3 transactions succeed (not reverted)
- Each transaction has a valid hash
- sfrxETH balance increases
- Explorer links are valid
- Remaining frxETH > 0.01 (gas buffer preserved)

**Verification on Fraxscan:**
1. Open each explorer link
2. Verify transactions are confirmed
3. Check final sfrxETH balance at vault contract

---

### Scenario 3: Gas Buffer Protection

**Test:** Verify the agent won't use ALL frxETH for investing.

```bash
# Start with 0.02 frxETH balance
npx tsx src/cli.ts

> "Execute conservative strategy with all my funds"
```

**Expected Behavior:**
- Agent invests 0.01 frxETH (not 0.02)
- Keeps 0.01 frxETH for gas
- Returns success

**✅ Pass Criteria:**
- Remaining balance ≥ 0.01 frxETH
- Investment amount = balance - 0.01
- No "insufficient gas" errors on subsequent operations

---

### Scenario 4: Insufficient Balance Error

**Test:** Try to invest more than available balance.

```bash
npx tsx src/cli.ts

# With 0.1 frxETH balance:
> "Execute conservative strategy with 1.0 frxETH"
```

**Expected Response:**
```json
{
  "status": "INSUFFICIENT_BALANCE",
  "error": "No frxETH available to execute strategy",
  "current_frxeth_balance": "0.1"
}
```

**✅ Pass Criteria:**
- Returns clear error message
- Shows current balance
- No transaction sent

---

### Scenario 5: Transaction Revert Handling

**Test:** Simulate a failed transaction (e.g., invalid contract).

**Note:** This is hard to test without modifying code. Best tested via:
1. Invalid contract address
2. Insufficient gas limit
3. Network timeout

**Expected Response:**
```json
{
  "status": "EXECUTION_FAILED",
  "error": "[Error message from blockchain]",
  "logs": [
    "❌ REAL INVESTING FAILED",
    "💡 Possible causes: ...",
    "🔄 Try again or contact support"
  ]
}
```

**✅ Pass Criteria:**
- Catches error gracefully
- Returns helpful error message
- Doesn't crash the agent
- Logs full error details

---

## 🔍 Manual Verification Checklist

After running tests, verify:

### On Fraxscan:
- [ ] Wrap TX shows transfer from agent to wfrxETH contract
- [ ] Approve TX shows ERC20 approval event
- [ ] Deposit TX shows sfrxETH vault deposit event
- [ ] All TXs have status "Success" (not "Failed")

### In Agent Logs:
- [ ] Each step logs "✅ Complete"
- [ ] Transaction hashes are 66 characters (0x + 64 hex)
- [ ] Block numbers are sequential (wrap < approve < deposit)
- [ ] Final balance shows sfrxETH > 0

### In Agent Response:
- [ ] `status: "EXECUTED"`
- [ ] All 3 transaction objects present
- [ ] Explorer links are clickable and valid
- [ ] `invested_amount` matches input
- [ ] `expected_apy` shows "5-10%"

---

## 🐛 Common Issues & Solutions

### Issue: "Wrap transaction reverted"
**Cause:** Insufficient frxETH balance or invalid contract.
**Solution:** 
- Check agent has frxETH balance > 0.01
- Verify wfrxETH address is correct
- Try smaller amount

### Issue: "Approval transaction reverted"
**Cause:** wfrxETH contract doesn't exist or wrong address.
**Solution:**
- Verify contract addresses in `executionTools.ts`
- Check you're on Fraxtal network (Chain ID 252)

### Issue: "Deposit transaction reverted"
**Cause:** Insufficient approval or invalid vault.
**Solution:**
- Check Step 2 (approval) succeeded
- Verify sfrxETH address is correct
- Ensure wfrxETH balance > 0

### Issue: "Agent wallet not initialized - DEMO MODE"
**Cause:** `AGENT_PRIVATE_KEY` not set in `.env`.
**Solution:**
```bash
# Add to .env:
AGENT_PRIVATE_KEY=0x[your-64-char-hex-private-key]
```

---

## 📊 Success Metrics

**For a successful test run:**
- ✅ 3/3 transactions confirmed
- ✅ sfrxETH balance > 0
- ✅ Gas buffer preserved (≥0.01 frxETH remaining)
- ✅ All explorer links valid
- ✅ No errors in console
- ✅ Agent responds within 30 seconds

---

## 🚀 Next Steps After Testing

1. **If All Tests Pass:**
   - Document test results
   - Create PR to merge into `main`
   - Update README with new features

2. **If Tests Fail:**
   - Check error logs
   - Verify contract addresses
   - Test on Fraxtal testnet first
   - Ask for help in Discord

3. **Production Deployment:**
   - Test with small amounts first (0.01 frxETH)
   - Monitor transaction gas costs
   - Set up alerts for failed transactions
   - Document all contract interactions

---

## 📞 Support

- **Discord:** [Fraxtal Discord]
- **Docs:** See `REAL_YIELD_IMPLEMENTATION.md`
- **Explorer:** https://fraxscan.com
- **Bridge:** https://fraxtal.bridge.frax.com

---

**Built for the Fraxtal Hackathon 🏆**
