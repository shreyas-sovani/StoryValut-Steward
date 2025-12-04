# ✅ DEPLOYMENT CHECKLIST - StoryVault Steward

## 🎯 Pre-Deployment Verification

### **Code Quality**
- [x] TypeScript compilation passes (0 errors)
- [x] Frontend build succeeds (`npm run build`)
- [x] Backend runs without errors (`npm run dev`)
- [x] All imports resolved correctly
- [x] Environment variables documented

### **Functionality**
- [x] CommandCenterV2 renders without errors
- [x] SSE connection establishes successfully
- [x] Pipeline steps animate correctly
- [x] Logs display with proper formatting
- [x] TX hashes extract and link properly
- [ ] **MANUAL TEST**: Fund agent wallet with 0.005 frxETH
- [ ] **MANUAL TEST**: Watch all 3 steps execute
- [ ] **MANUAL TEST**: Verify balances update
- [ ] **MANUAL TEST**: Click TX hash links → Opens Fraxscan

### **Documentation**
- [x] UI_OVERHAUL_COMPLETE.md created
- [x] QUICK_TEST_UI.md created
- [x] PHASE_9_UI_COMPLETE.md created
- [x] COMPLETE_SYSTEM_ARCHITECTURE.md created
- [x] README.md updated (if needed)

---

## 🚀 Deployment Steps

### **1. Environment Variables**

#### **Backend (Railway/Render)**
```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...
WALLET_PRIVATE_KEY=0x...

# Optional
PORT=3001
NODE_ENV=production
```

#### **Frontend (Vercel)**
```bash
# Required
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Optional
NEXT_PUBLIC_CHAIN_ID=252
NEXT_PUBLIC_RPC_URL=https://rpc.frax.com
```

---

### **2. Deploy Backend**

#### **Option A: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project (if any)
railway link

# Deploy
railway up

# Get deployment URL
railway status
```

#### **Option B: Render**
```bash
# Via Render Dashboard:
1. Go to https://dashboard.render.com
2. New → Web Service
3. Connect GitHub repo
4. Build command: npm install
5. Start command: npm run dev
6. Environment variables: Add ANTHROPIC_API_KEY, WALLET_PRIVATE_KEY
7. Deploy
```

---

### **3. Deploy Frontend**

```bash
# Navigate to frontend
cd frontend

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Set API URL environment variable
vercel env add NEXT_PUBLIC_API_URL
# Paste your backend URL: https://your-backend.railway.app

# Deploy to production
vercel --prod

# Get deployment URL
vercel ls
```

---

### **4. Post-Deployment Verification**

#### **Backend Health Check**
```bash
# Test SSE endpoint
curl -N https://your-backend.railway.app/api/funding/stream

# Expected output: data: {"type":"funding_update",...}
```

#### **Frontend Health Check**
1. Visit `https://your-frontend.vercel.app`
2. Check browser console for:
   - ✅ "🔌 CommandCenter: Connecting to SSE stream"
   - ✅ "✅ CommandCenter: SSE connection established"
3. Verify no CORS errors

#### **End-to-End Test**
1. Chat: "Create me an autonomous DeFi hedge fund"
2. Agent responds with wallet address
3. CommandCenterV2 loads with address
4. Status: "🛡️ STEWARDSHIP MODE ACTIVATED"
5. Send 0.005 frxETH to agent wallet
6. Watch pipeline execute all 3 steps
7. Verify balances update
8. Click TX hash → Opens Fraxscan

---

## 🐛 Troubleshooting Guide

### **Issue: CommandCenter Not Loading**
**Symptoms**: Blank screen or old CommandCenter shows
**Cause**: Import path incorrect
**Fix**: Verify `ChatInterface.tsx` and `page.tsx` import from `CommandCenterV2`

### **Issue: SSE Connection Fails**
**Symptoms**: No logs, no pipeline updates
**Cause**: CORS or backend not running
**Fix**: 
1. Check `NEXT_PUBLIC_API_URL` in Vercel
2. Add CORS headers in `server.ts`:
```typescript
app.use('*', cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}))
```

### **Issue: Pipeline Steps Don't Update**
**Symptoms**: Steps stay gray (idle)
**Cause**: SSE messages don't contain expected keywords
**Fix**: Check backend `executionTools.ts` emits:
- "step 1/3: wrapping"
- "wrapped successfully"
- etc.

### **Issue: TX Hashes Not Clickable**
**Symptoms**: No cyan links in logs
**Cause**: Regex not matching TX format
**Fix**: Ensure backend emits full hash: `0x[64 hex chars]`

### **Issue: Balances Don't Update**
**Symptoms**: Liquid/Staked amounts stay same
**Cause**: `parseLogForPipeline()` not detecting completion
**Fix**: Verify SSE message includes "staked in sfrxeth" or "yield active"

---

## 📊 Monitoring & Logs

### **Backend Logs**
```bash
# Railway
railway logs

# Render
# View logs in dashboard: https://dashboard.render.com
```

**What to look for:**
- ✅ "Autonomous watcher started"
- ✅ "Balance increased from X to Y"
- ✅ "Executing micro-investment"
- ❌ "Insufficient balance" → Need more frxETH
- ❌ "Investment already executed" → Flag already set

### **Frontend Logs**
Open browser DevTools (F12) → Console

**What to look for:**
- ✅ "🔌 CommandCenter: Connecting to SSE"
- ✅ "✅ CommandCenter: SSE connection established"
- ✅ "🎯 CommandCenter: Processing funding update"
- ❌ "CORS error" → Backend CORS config issue
- ❌ "EventSource failed" → Backend down or wrong URL

---

## 🔐 Security Checklist

### **Private Keys**
- [ ] Never commit `.env` files to git
- [ ] Use Railway/Render secret manager for `WALLET_PRIVATE_KEY`
- [ ] Rotate keys if exposed
- [ ] Test with small amounts first ($10-20)

### **API Keys**
- [ ] Anthropic API key stored as environment variable
- [ ] Monitor usage at https://console.anthropic.com
- [ ] Set spending limits if available

### **Smart Contracts**
- [ ] Verify contract addresses:
  - wfrxETH: `0xfc00000000000000000000000000000000000006`
  - sfrxETH: `0xfc00000000000000000000000000000000000005`
- [ ] Test investment flow on testnet first (if available)
- [ ] Keep hardcoded amount small (0.0001 frxETH)

---

## 📈 Performance Optimization

### **Backend**
- [x] Autonomous watcher interval: 5 seconds (not 1s)
- [x] SSE keepalive every 30 seconds
- [x] Log buffer limited to 50 entries
- [ ] Consider Redis for session storage (if scaling)

### **Frontend**
- [x] Framer Motion animations at 60fps
- [x] Log limit: 50 entries (prevents memory leak)
- [x] Debounced state updates
- [x] Conditional chart rendering (only when staked > 0)
- [ ] Add service worker for offline support (future)

---

## 🎉 Go-Live Checklist

### **Before Announcing**
- [ ] Test with real funds (small amount: 0.005 frxETH)
- [ ] Verify all 3 steps execute successfully
- [ ] Confirm TX hashes on Fraxscan
- [ ] Test on mobile device (iOS/Android)
- [ ] Check all links work (Fraxscan, copy address)
- [ ] Verify logs display correctly
- [ ] Take screenshots/video for demo

### **Launch Day**
- [ ] Monitor backend logs for errors
- [ ] Watch SSE connection stability
- [ ] Check gas prices are reasonable
- [ ] Have backup wallet funded (in case of issues)
- [ ] Prepare demo script for presentations

### **Post-Launch**
- [ ] Collect user feedback
- [ ] Monitor performance metrics
- [ ] Track gas costs over time
- [ ] Document any bugs or issues
- [ ] Plan next features (Phase 10+)

---

## 📞 Support & Resources

### **Documentation**
- UI Guide: `UI_OVERHAUL_COMPLETE.md`
- Testing: `QUICK_TEST_UI.md`
- Architecture: `COMPLETE_SYSTEM_ARCHITECTURE.md`
- Phase Summary: `PHASE_9_UI_COMPLETE.md`

### **Code Files**
- UI Component: `frontend/components/CommandCenterV2.tsx`
- Integration: `frontend/components/ChatInterface.tsx`
- Backend: `src/server.ts`
- Execution: `src/tools/executionTools.ts`

### **External Links**
- Fraxtal Docs: https://docs.frax.finance/
- Fraxscan: https://fraxscan.com/
- Fraxtal RPC: https://rpc.frax.com
- wfrxETH Contract: https://fraxscan.com/address/0xfc00000000000000000000000000000000000006
- sfrxETH Contract: https://fraxscan.com/address/0xfc00000000000000000000000000000000000005

---

## 🎯 Success Criteria

**✅ Deployment is successful when:**
1. Frontend loads without errors
2. SSE connection establishes
3. Agent wallet creation works
4. Deposit detection triggers (< 10s)
5. All 3 pipeline steps execute
6. Balances update correctly
7. TX hashes link to Fraxscan
8. Mobile UI displays properly
9. No console errors
10. User can copy wallet address

---

## 🚀 You're Ready to Deploy!

**Current Status:**
- ✅ Code complete and tested locally
- ✅ TypeScript compilation passes
- ✅ Frontend build succeeds
- ✅ Documentation complete
- ⏳ Pending: Manual test with real funds
- ⏳ Pending: Production deployment

**Next Action:**
```bash
# 1. Deploy backend
railway up

# 2. Note backend URL
export BACKEND_URL=https://your-app.railway.app

# 3. Deploy frontend
cd frontend
vercel env add NEXT_PUBLIC_API_URL
# Paste backend URL
vercel --prod

# 4. Test end-to-end
# Visit frontend URL, create wallet, send funds, watch execute
```

**🎊 Good luck with your deployment!**
