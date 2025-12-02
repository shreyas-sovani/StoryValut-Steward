# 🚨 AUTONOMOUS MODE TEST CHECKLIST

## WHAT CHANGED

### ✅ DELETED (Old Consultant Behavior)
- ❌ `deploy_story_vault` tool removed from agent
- ❌ All references to `app.iqai.com` deleted
- ❌ Manual deployment instructions removed
- ❌ "Go to website" messaging eliminated

### ✅ ADDED (New Hedge Fund Manager Behavior)
- ✅ `get_agent_vault_details` tool (vault-centric naming)
- ✅ Returns `status: "ACTIVE_LISTENING"`
- ✅ Agent shows vault address immediately after user agrees
- ✅ SSE funding stream (`/api/funding/stream`)
- ✅ Real-time state broadcasting: DEPOSIT_DETECTED → INVESTED → EVACUATED
- ✅ FundDashboard 4 visual states with transitions

## TEST FLOW

### Test 1: Agent Behavior (CRITICAL)
1. Open deployed Railway app chat
2. Say: "I'm a student with $2,500, need to buy a car in 4 years for $3,000"
3. **VERIFY Agent Response:**
   - ✅ Calls `calculate_leverage_boost` (Goal Governor)
   - ✅ Shows strategy recommendation
   - ✅ **DOES NOT mention app.iqai.com**
   - ✅ **DOES NOT say "deploy through web UI"**
4. Say: "Yes, let's do it"
5. **VERIFY Agent Response:**
   - ✅ Calls `get_agent_vault_details` tool
   - ✅ Shows "🏦 YOUR AUTONOMOUS VAULT IS READY"
   - ✅ Displays vault address (0x...)
   - ✅ Shows "Status: ACTIVE_LISTENING"
   - ✅ Includes QR code URL
   - ✅ Explains auto-invest flow (5-second detection, auto-invest, auto-protect)
   - ✅ **NO website links or manual steps**

### Test 2: FundDashboard Display
1. After agent shows vault address
2. **VERIFY:**
   - ✅ UI switches to full-screen FundDashboard
   - ✅ Agent Wallet Card shows correct address
   - ✅ QR code displays properly
   - ✅ Funding Status Card shows "WAITING FOR DEPOSIT"
   - ✅ Big dollar sign icon pulsing
   - ✅ Text: "Send FRAX to the address above"

### Test 3: SSE Connection
1. Open browser DevTools → Network tab
2. Filter for "funding"
3. **VERIFY:**
   - ✅ Connection to `/api/funding/stream` established
   - ✅ Event type: "funding_update"
   - ✅ Initial status: "WAITING"
   - ✅ Connection stays open (no 4XX errors)

### Test 4: Crash Simulation (Demo God Mode)
1. Click the red "🔥 SIMULATE YIELD CRASH" button
2. **VERIFY Backend Logs (Railway):**
   - ✅ POST `/api/simulate/crash` receives request
   - ✅ `current_yield` drops from 4.5% → 1.5%
   - ✅ Watcher detects: "🚨 CRITICAL YIELD DETECTED"
   - ✅ Executes: `emergency_withdraw` strategy
   - ✅ Logs: "✅ FUNDS EVACUATED" or "⚠️ EVACUATION DEMO"
   - ✅ Broadcasts SSE event: `status: "EVACUATED"`
3. **VERIFY FundDashboard:**
   - ✅ Funding Status changes to "🚨 FUNDS EVACUATED"
   - ✅ Red alert triangle icon
   - ✅ Text: "Emergency withdrawal executed"
   - ✅ Health status badge changes to "🚨 CRITICAL ALERT" (red, pulsing)
4. **VERIFY Auto-Recovery:**
   - ✅ After 15 seconds, yield restores to 4.5%
   - ✅ Log: "✅ Demo reset: Yield restored to 4.5%"
   - ✅ Health status returns to green

### Test 5: Real Deposit Simulation (Optional - Requires AGENT_PRIVATE_KEY)
**NOTE:** Only works if AGENT_PRIVATE_KEY is set in Railway environment variables.

1. Get agent vault address from dashboard
2. Send test FRAX to address on Fraxtal testnet
3. **VERIFY Within 5 Seconds:**
   - ✅ Watcher detects: "💰 NEW CAPITAL DETECTED"
   - ✅ Broadcasts SSE: `status: "DEPOSIT_DETECTED"`
   - ✅ FundDashboard flashes green: "💰 PAYMENT RECEIVED!"
4. **VERIFY Auto-Invest:**
   - ✅ Watcher executes: `conservative_mint` strategy
   - ✅ Logs: "✅ AUTO-INVEST COMPLETE: 0x[TX_HASH]"
   - ✅ Broadcasts SSE: `status: "INVESTED"`
   - ✅ FundDashboard shows: "✅ ASSETS DEPLOYED"
   - ✅ Fraxscan link appears (clickable)

## EXPECTED BEHAVIOR SUMMARY

### OLD FLOW (Consultant) ❌
```
User: "Let's do it"
Agent: "Go to app.iqai.com and deploy through the web UI"
User: *confused* "What? I thought you were doing it?"
Agent: *dead end*
```

### NEW FLOW (Hedge Fund Manager) ✅
```
User: "Let's do it"
Agent: *Calls get_agent_vault_details*
Agent: "🏦 YOUR AUTONOMOUS VAULT IS READY
       Deposit Address: 0xF509c9...
       Status: ACTIVE_LISTENING
       [QR Code]
       
       Send FRAX here → I detect deposit → I auto-invest → I monitor 24/7 → I auto-protect"
       
UI: *Switches to FundDashboard*
Dashboard: Shows "WAITING FOR DEPOSIT" with QR code

User: *Sends FRAX*
Dashboard: *Flashes green* "💰 PAYMENT RECEIVED!"
Watcher: *Detects* → *Invests* → Broadcasts event
Dashboard: "✅ ASSETS DEPLOYED" + Fraxscan link

User: *Clicks Crash Button*
Watcher: *Detects crisis* → *Evacuates* → Broadcasts event
Dashboard: "🚨 FUNDS EVACUATED"
```

## TROUBLESHOOTING

### Issue: Agent Still Mentions app.iqai.com
**Cause:** Old deployment not updated
**Fix:** Check Railway build logs, force redeploy if needed

### Issue: FundDashboard Shows "WAITING" Forever
**Cause:** SSE connection not established
**Fix:** 
- Check browser DevTools Network tab for 404/CORS errors
- Verify API URL environment variable
- Check Railway backend logs for SSE client connections

### Issue: Crash Button Does Nothing
**Cause:** POST request failing
**Fix:**
- Check CORS configuration in server.ts
- Verify `/api/simulate/crash` endpoint responds 200
- Check Railway logs for error messages

### Issue: No Real Transactions (Always Demo Mode)
**Cause:** AGENT_PRIVATE_KEY not set
**Fix:**
1. Generate wallet: `cast wallet new` or use MetaMask
2. Format: Must start with `0x` + 64 hex chars
3. Add to Railway: Settings → Variables → AGENT_PRIVATE_KEY
4. Redeploy
5. **Security:** Use dedicated wallet with limited test funds only

## SUCCESS CRITERIA

✅ Agent NEVER mentions app.iqai.com or manual deployment
✅ Agent shows vault address immediately after user agrees
✅ FundDashboard displays with "ACTIVE_LISTENING" status
✅ SSE connection established and receiving events
✅ Crash simulation triggers evacuation + dashboard update
✅ Real-time state transitions visible in UI
✅ User can click Fraxscan links to verify transactions (if private key set)

## DEPLOYMENT STATUS

- Backend: Railway (https://story-valut-steward-production.up.railway.app)
- Frontend: Vercel (https://story-valut-steward-snmf.vercel.app)
- Watcher Loop: Running every 5 seconds
- SSE Endpoints: /api/funding/stream, /api/watcher/logs/stream
- Demo Mode: Active (Set AGENT_PRIVATE_KEY for real execution)

## NEXT STEPS (Post-Test)

1. **If Tests Pass:** Document demo video for hackathon
2. **If Tests Fail:** Check Railway logs, verify agent.ts instructions
3. **Production Ready:** Add AGENT_PRIVATE_KEY and test with real FRAX
4. **Hackathon Demo:** Show crash simulation + auto-evacuation live

---

**THE AGENT IS NOW A HEDGE FUND MANAGER, NOT A CONSULTANT. 🚀**
