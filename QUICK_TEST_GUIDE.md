# 🧪 QUICK TEST GUIDE - Autonomous Hedge Fund

## ✅ NEW THRESHOLD: 0.01 FRAX (Testing Mode)

The agent will now detect and auto-invest with **ANY deposit over 0.01 FRAX**!

---

## 📍 AGENT WALLET ADDRESS

**Send FRAX here:**
```
0x97e6c2b90492155bFA552FE348A6192f4fB1F163
```

**Network:** Fraxtal L2 (Chain ID: 252)  
**RPC:** https://rpc.frax.com  
**Explorer:** https://fraxscan.com/address/0x97e6c2b90492155bFA552FE348A6192f4fB1F163

---

## 🚀 TEST FLOW (5-Minute Demo)

### Step 1: Chat with Agent
1. Go to deployed frontend: https://story-valut-steward-snmf.vercel.app
2. Say: **"I'm a student with $2,000, need $2,500 for a car in 4 years"**
3. Agent shows Goal Governor calculation + strategy
4. Say: **"Let's do it"**

### Step 2: Agent Shows Vault
Agent will respond with:
```
🏦 YOUR AUTONOMOUS VAULT IS READY

Deposit Address: 0x97e6c2b90492155bFA552FE348A6192f4fB1F163
Status: ACTIVE_LISTENING

[QR Code]

🤖 What happens next:
1. Send FRAX to this address
2. I detect deposit within 5 seconds
3. I auto-invest into sFRAX
4. I monitor 24/7
5. I auto-evacuate if yield crashes
```

### Step 3: UI Switches to FundDashboard
Frontend automatically displays:
- ✅ Matrix-style black/green terminal
- ✅ Agent Wallet Card with QR code
- ✅ Funding Status: "WAITING FOR DEPOSIT"
- ✅ Live metrics dashboard

### Step 4: Send Test FRAX
**Option A - Mainnet (Real Money):**
```bash
# Use MetaMask or any wallet
# Network: Fraxtal L2
# To: 0x97e6c2b90492155bFA552FE348A6192f4fB1F163
# Amount: 0.1 FRAX (or any amount >0.01)
```

**Option B - Watch Demo (No Money Needed):**
Just watch the watcher logs on Railway - it polls every 5 seconds showing:
```
[WATCHER INFO] 👀 Monitoring: Waiting for capital deposit...
```

### Step 5: Watch Auto-Invest (Within 5 Seconds)
**Backend Logs (Railway):**
```
[WATCHER SUCCESS] 💰 NEW CAPITAL DETECTED: 0.1000 FRAX
[WATCHER INFO] 🤖 AUTO-INVEST PROTOCOL: Executing conservative_mint strategy...
[WATCHER SUCCESS] ✅ AUTO-INVEST COMPLETE: 0xTRANSACTION_HASH
```

**Frontend (FundDashboard):**
1. 🟢 Status changes to: "💰 PAYMENT RECEIVED!" (green flash, pulsing)
2. 🟢 Then changes to: "✅ ASSETS DEPLOYED"
3. 🔗 Fraxscan link appears (if real transaction)

### Step 6: Test Crash Simulation
Click the big red button: **"🔥 SIMULATE YIELD CRASH"**

**What Happens:**
1. Yield drops: 4.5% → 1.5%
2. Dashboard health badge turns red, pulsing
3. Watcher detects crisis:
   ```
   [WATCHER CRITICAL] 🚨 CRITICAL YIELD DETECTED: 1.5%
   [WATCHER CRITICAL] 🚨 EMERGENCY PROTOCOL: Evacuating funds...
   [WATCHER SUCCESS] ✅ FUNDS EVACUATED
   ```
4. Dashboard shows: "🚨 FUNDS EVACUATED"
5. Auto-recovery after 15 seconds

---

## 🔍 MONITORING

### Check Agent Wallet Balance
```bash
# Fraxscan
https://fraxscan.com/address/0x97e6c2b90492155bFA552FE348A6192f4fB1F163

# Or use cast (Foundry)
cast balance 0x97e6c2b90492155bFA552FE348A6192f4fB1F163 --rpc-url https://rpc.frax.com
```

### Check Watcher Status (API)
```bash
curl https://story-valut-steward-production.up.railway.app/api/watcher/status
```

Returns:
```json
{
  "current_yield": 4.5,
  "last_known_balance": "0.0000",
  "recent_logs": [...],
  "health_status": "healthy"
}
```

### Watch Live Logs (SSE Stream)
```bash
curl -N https://story-valut-steward-production.up.railway.app/api/watcher/logs/stream
```

### Watch Funding Updates (SSE Stream)
```bash
curl -N https://story-valut-steward-production.up.railway.app/api/funding/stream
```

---

## 📊 THRESHOLDS

### Auto-Invest Trigger
- **Minimum Deposit:** >0.01 FRAX
- **Investment Amount:** 95% of balance (keeps 5% for gas)
- **Check Interval:** Every 5 seconds
- **Strategy:** Conservative Mint (sFRAX staking)

### Auto-Evacuate Trigger
- **Critical Yield:** <2.0%
- **Action:** Emergency withdrawal to FRAX safety mode
- **Recovery:** Auto-resets after 15 seconds (demo mode)

---

## 🐛 TROUBLESHOOTING

### Issue: Agent Still Asking for User Wallet
**Status:** ✅ FIXED  
**Commit:** `b8aeadf` - "CRITICAL: Implement True Autonomous Mode"  
**Verification:** Agent now calls `get_agent_vault_details` and shows vault address

### Issue: Gemini API Rate Limit (429 Error)
**Cause:** Free tier quota exceeded  
**Fix:** Get new API key at https://aistudio.google.com/app/apikey  
**Update:** Railway → Settings → Variables → `GOOGLE_API_KEY`

### Issue: Dashboard Not Updating
**Check:**
1. Browser DevTools → Network → Filter "funding"
2. Should see `/api/funding/stream` connection (EventSource)
3. Should receive `funding_update` events

### Issue: No Auto-Invest Happening
**Check:**
1. Railway logs: `[WATCHER INFO] 👀 Monitoring: Waiting...`
2. Agent wallet balance must change (new deposit)
3. Balance must be >0.01 FRAX
4. Backend logs will show: "💰 NEW CAPITAL DETECTED"

---

## 🎥 HACKATHON DEMO SCRIPT

### Scene 1: User Onboarding (2 minutes)
1. Show chat interface
2. User shares goal: "Student, $2k capital, need $2.5k car in 4 years"
3. Agent calculates with Goal Governor
4. Agent presents strategy: 1.03x leverage, 4.73% APY
5. User agrees: "Let's do it"

### Scene 2: Vault Initialization (30 seconds)
1. Agent shows vault address (NOT a website link!)
2. UI switches to Matrix-style FundDashboard
3. QR code displayed
4. Status: "ACTIVE_LISTENING"

### Scene 3: Live Deposit Detection (1 minute)
1. Send 0.1 FRAX from MetaMask
2. Show Railway logs updating in real-time
3. Dashboard flashes green: "💰 PAYMENT RECEIVED!"
4. Changes to: "✅ ASSETS DEPLOYED"
5. Show Fraxscan transaction link

### Scene 4: Crisis Response (1 minute)
1. Click red "🔥 SIMULATE YIELD CRASH" button
2. Health badge turns red and pulsing
3. Show watcher logs detecting crisis
4. Show evacuation happening automatically
5. Dashboard: "🚨 FUNDS EVACUATED"
6. Recovery after 15 seconds

### Scene 5: Proof of Autonomy (30 seconds)
1. Show Railway logs - watcher running continuously
2. Show SSE streams staying connected
3. Show wallet on Fraxscan with transaction history
4. Emphasize: "No manual intervention needed!"

**Total Demo Time:** ~5 minutes  
**Wow Factor:** 🔥🔥🔥

---

## 🎯 KEY DIFFERENTIATORS

### Traditional DeFi Agents
- ❌ Just give advice
- ❌ Redirect to websites
- ❌ User does manual transactions
- ❌ No monitoring after deployment

### StoryVault Steward (THIS PROJECT)
- ✅ **Acts as a Hedge Fund Manager**
- ✅ **Shows deposit address, NOT website links**
- ✅ **Auto-invests within 5 seconds**
- ✅ **24/7 monitoring with SSE streams**
- ✅ **Auto-evacuates on market crashes**
- ✅ **Server-side wallet signing (viem)**
- ✅ **Real blockchain transactions**
- ✅ **Matrix-style live dashboard**

**THIS IS NOT A CHATBOT. THIS IS AN AUTONOMOUS HEDGE FUND.** 🚀

---

## 📝 PRODUCTION CHECKLIST

Before going live with real funds:

### Security
- [ ] Generate dedicated wallet with limited funds only
- [ ] Store AGENT_PRIVATE_KEY in Railway encrypted variables
- [ ] Add rate limiting to prevent API abuse
- [ ] Add wallet balance alerts
- [ ] Implement multi-sig for large amounts

### Testing
- [x] Test auto-invest with small amounts (<$10)
- [ ] Test crash simulation multiple times
- [ ] Verify Fraxscan transaction links work
- [ ] Test SSE connections under load
- [ ] Verify event broadcasting works

### Documentation
- [x] Test guide (this file)
- [x] Deployment documentation
- [ ] Video walkthrough
- [ ] Security best practices guide
- [ ] API documentation

### Performance
- [ ] Monitor Railway memory/CPU usage
- [ ] Optimize watcher polling interval if needed
- [ ] Add error retry logic
- [ ] Implement graceful shutdown
- [ ] Add health check monitoring

---

## 🚀 DEPLOYMENT STATUS

- **Backend:** Railway - https://story-valut-steward-production.up.railway.app
- **Frontend:** Vercel - https://story-valut-steward-snmf.vercel.app
- **Agent Wallet:** 0x97e6c2b90492155bFA552FE348A6192f4fB1F163 (Fraxtal L2)
- **Watcher:** Running every 5 seconds ✅
- **Auto-Invest Threshold:** >0.01 FRAX ✅
- **Auto-Evacuate Threshold:** <2.0% yield ✅

**STATUS: READY FOR TESTING! 🎉**
