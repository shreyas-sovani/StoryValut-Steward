# 🚀 QUICK START - Testing New UI

## Prerequisites
- Backend running on `http://localhost:3001`
- Frontend running on `http://localhost:3000`
- Agent wallet created (0x... address)

## 🎯 Test Flow

### **Step 1: Start Services**
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### **Step 2: Create Agent Wallet**
1. Open `http://localhost:3000`
2. Chat: **"Create me an autonomous DeFi hedge fund"**
3. Agent responds with wallet address
4. UI automatically switches to **CommandCenterV2**

### **Step 3: Fund the Agent** (PRODUCTION ONLY)
```bash
# On Fraxtal mainnet - send 0.005 frxETH
cast send --rpc-url https://rpc.frax.com \
  --private-key $YOUR_PRIVATE_KEY \
  0x_AGENT_ADDRESS_HERE \
  --value 0.005ether
```

### **Step 4: Watch Real-Time Execution** ⚡

#### **Expected UI Behavior:**

**🟢 Deposit Detection** (within 5-10 seconds)
```
[14:23:01] 💰 NEW DEPOSIT DETECTED: +0.005 frxETH
[14:23:02] 🤖 MICRO-INVESTMENT PROTOCOL: Executing 0.0001 frxETH stake...
```
- Liquid balance increases: `0.004` → `0.009 frxETH`

**🟡 Step 1: WRAP** (2-3 seconds)
```
[14:23:03] 📦 Step 1/3: Wrapping 0.0001 frxETH → wfrxETH...
```
- Pipeline Step 1 turns **YELLOW** with rotating loader
- Status: `PROCESSING...`

**✅ Step 1: COMPLETE**
```
[14:23:05] ✅ Wrapped successfully
```
- Pipeline Step 1 turns **GREEN** with checkmark
- TX hash link appears: `0x1a2b...ef56`

**🟡 Step 2: APPROVE** (2-3 seconds)
```
[14:23:06] 🔐 Step 2/3: Approving Vault to spend wfrxETH...
```
- Pipeline Step 2 turns **YELLOW** with rotating loader

**✅ Step 2: COMPLETE**
```
[14:23:08] ✅ Approval confirmed
```
- Pipeline Step 2 turns **GREEN** with checkmark
- TX hash link appears

**🟡 Step 3: STAKE** (2-3 seconds)
```
[14:23:09] 💎 Step 3/3: Depositing into sfrxETH vault...
```
- Pipeline Step 3 turns **YELLOW** with rotating loader

**✅ Step 3: COMPLETE**
```
[14:23:11] ✅ Staked in sfrxETH. Yield Active.
[14:23:12] 🔗 Final TX: 0x2b3c4d...fg6789
[14:23:13] 📊 Explorer: https://fraxscan.com/tx/0x2b3c4d...
[14:23:15] 💰 Micro-Investment Complete: 0.0001 frxETH earning 5-10% APY
```
- Pipeline Step 3 turns **GREEN** with checkmark
- **Balances Update**:
  - Liquid: `0.009` → `0.0089 frxETH` (-0.0001)
  - Staked: `0` → `0.0001 sfrxETH` (+0.0001)
- **Yield Chart Appears**: Mini area chart showing APY

---

## 🎨 Visual Verification Checklist

### **Execution Pipeline**
- [ ] All 3 steps visible (WRAP, APPROVE, STAKE)
- [ ] Steps transition: Gray → Yellow (processing) → Green (success)
- [ ] Rotating loader appears during processing
- [ ] Pulsing yellow border on active step
- [ ] Connector lines turn green when step completes
- [ ] TX hashes clickable and open Fraxscan

### **Asset Allocation**
- [ ] Total portfolio value shows correct USD amount
- [ ] Liquid frxETH decreases by 0.0001 after investment
- [ ] Staked sfrxETH increases by 0.0001 after investment
- [ ] Balances animate with scale effect
- [ ] Yield chart appears when staked > 0
- [ ] APY displays next to staked amount (e.g., "5.2% APY")

### **System Logs**
- [ ] Timestamps show correct local time `[HH:MM:SS]`
- [ ] TX hashes highlighted in **cyan**
- [ ] Success messages in **bold green** with background glow
- [ ] Step messages in **purple**
- [ ] Deposit messages in **cyan**
- [ ] Logs auto-scroll to bottom
- [ ] Counter shows `[X/50]` logs

### **Header & Footer**
- [ ] Wallet address displayed with copy button
- [ ] Block number increments every 3 seconds
- [ ] "FRAXTAL MAINNET" label visible
- [ ] Gas price updates periodically
- [ ] Status indicator: 🟢 "MONITORING ACTIVE" or 🟡 "EXECUTING..."

---

## 🐛 Troubleshooting

### **Issue: UI Doesn't Switch to CommandCenter**
**Cause**: Agent didn't show full 40-character address
**Fix**: Check backend logs for `console.log` of wallet address - must be `0x[40 hex chars]`

### **Issue: Pipeline Steps Don't Update**
**Cause**: SSE event keywords not matching
**Fix**: Check backend `src/tools/executionTools.ts` - ensure it emits:
- "step 1/3: wrapping"
- "wrapped successfully" 
- "step 2/3: approving"
- "approval confirmed"
- "step 3/3: depositing"
- "staked in sfrxeth"

### **Issue: Balances Don't Update**
**Cause**: `parseLogForPipeline()` not detecting "yield active"
**Fix**: Check SSE message includes: "yield active" OR "staked in sfrxeth"

### **Issue: TX Hash Not Showing**
**Cause**: Regex not matching TX format
**Fix**: Ensure backend emits full TX hash: `0x[64 hex characters]`

---

## 📊 Expected Performance

| Metric | Target | Actual |
|--------|--------|--------|
| Deposit Detection | < 10s | ~5-8s |
| Step 1 (Wrap) | 2-4s | ~3s |
| Step 2 (Approve) | 2-4s | ~3s |
| Step 3 (Stake) | 2-4s | ~3s |
| **Total Time** | **< 20s** | **~12-15s** |

---

## 🎉 Success Criteria

✅ **All 3 pipeline steps complete with green checkmarks**  
✅ **Balances update correctly (liquid ⬇️, staked ⬆️)**  
✅ **TX hashes clickable and open Fraxscan**  
✅ **Yield chart appears after staking**  
✅ **Logs display with cyberpunk styling**  
✅ **UI responsive on mobile (test with DevTools)**

---

## 🚀 Next: Deploy to Production

Once testing passes, deploy frontend to Vercel:

```bash
cd frontend
vercel --prod
```

Backend (Railway/Render):
```bash
railway up
# OR
render deploy
```

**You're ready to demo real autonomous DeFi investing! 🎊**
