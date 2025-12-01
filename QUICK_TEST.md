# 🧪 Quick Test Guide

## ⚡ 5-Minute Test Run

### Step 1: Start Everything
```bash
./start-dev.sh
```

You should see:
```
🏛️  Starting StoryVault Steward...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Starting API Server...
⏳ Waiting for API server to start...
✅ API Server ready on http://localhost:3001
🎨 Starting Frontend...
⏳ Waiting for frontend to start...
✅ Frontend ready on http://localhost:3000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 StoryVault Steward is running!

📡 API Server:  http://localhost:3001
🎨 Frontend:    http://localhost:3000
```

### Step 2: Test API
```bash
# In a new terminal
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "StoryVault Steward API",
  "version": "1.0.0",
  "fraxtal": {
    "chain_id": 252,
    "rpc": "https://rpc.frax.com"
  }
}
```

### Step 3: Open Frontend
Open browser to: **http://localhost:3000**

You should see:
- Dark purple/black background
- "StoryVault Steward" header with sparkle icon
- Split view layout
- Example prompts in the center
- "Your Vault" panel on right

### Step 4: Test Chat

Click an example prompt or type:
```
I'm a 28-year-old teacher saving for a house in 3 years. 
I'm risk-averse and want stable returns.
```

Watch for:
- ✅ Message appears in chat immediately
- ✅ Loading spinner shows
- ✅ Response streams in real-time (character by character)
- ✅ Response includes Fraxtal data
- ✅ Strategy recommendation appears

### Step 5: Verify Real Data

The agent should mention:
- ✅ "sfrxETH" or "sFRAX"
- ✅ Real APY numbers (~3.8% or ~4.5%)
- ✅ "Fraxtal" network
- ✅ Risk assessment
- ✅ Strategy recommendation

### Step 6: Check Vault Card

If the agent deploys a strategy, the right panel should show:
- ✅ Green checkmark with "Strategy Deployed!"
- ✅ Protocol name
- ✅ APR percentage
- ✅ Risk level
- ✅ Agent ID (starts with "atp_")
- ✅ Transaction hash
- ✅ "View Strategy on ATP" button

---

## 🐛 Troubleshooting

### Problem: "Failed to fetch"
**Solution:** API server not running
```bash
npm run server
```

### Problem: "Module not found"
**Solution:** Install dependencies
```bash
npm install
cd frontend && npm install
```

### Problem: "GOOGLE_API_KEY not found"
**Solution:** Create .env file
```bash
echo "GOOGLE_API_KEY=your_key_here" > .env
```

### Problem: Frontend won't start
**Solution:** Check port 3000 is free
```bash
lsof -ti:3000 | xargs kill -9
```

### Problem: API won't start
**Solution:** Check port 3001 is free
```bash
lsof -ti:3001 | xargs kill -9
```

---

## 🎯 Test Scenarios

### Scenario 1: Risk-Averse User
**Input:**
```
I'm 45 years old, nearing retirement. I have $50,000 saved.
I'm very scared of losing money. I need stable income.
```

**Expected:**
- Recommends sFRAX (stablecoin)
- Mentions ~4.5% APY
- Emphasizes low risk
- Explains stability

### Scenario 2: High Risk Tolerance
**Input:**
```
I'm 25, tech entrepreneur, just sold my startup.
I have $200k to invest. High risk tolerance, want growth.
```

**Expected:**
- Recommends sfrxETH (ETH staking)
- Mentions ~3.8% APY + ETH price exposure
- Discusses upside potential
- May suggest higher allocation

### Scenario 3: Balanced Approach
**Input:**
```
I'm 35, professional with stable income.
Saving for kids' college in 10 years. Moderate risk ok.
```

**Expected:**
- Suggests mix of sFRAX and sfrxETH
- Explains diversification
- Balances risk and return
- Strategic allocation

### Scenario 4: DeFi Newbie
**Input:**
```
I'm 22, college student. Just learning about DeFi.
I have $1000 to start. What's safest?
```

**Expected:**
- Recommends starting with sFRAX
- Explains concepts clearly
- Emphasizes learning
- Conservative approach

---

## 📊 Performance Benchmarks

### API Response Times
- Health check: < 10ms
- Simple chat: 2-5 seconds (LLM dependent)
- SSE streaming: Real-time, < 100ms per chunk

### Frontend Load Times
- Initial load: < 1 second
- Page navigation: Instant (client-side)
- Chat message: < 50ms to display

### Memory Usage
- API server: ~150MB
- Frontend dev server: ~300MB
- Total: ~500MB

---

## ✅ Checklist

Before demo:
- [ ] .env file has valid GOOGLE_API_KEY
- [ ] Both servers start without errors
- [ ] Health endpoint returns 200
- [ ] Frontend loads at localhost:3000
- [ ] Can send chat message
- [ ] Response streams in real-time
- [ ] Vault card displays (if strategy deployed)
- [ ] No console errors in browser
- [ ] No TypeScript errors in terminal

---

## 🎬 Demo Tips

1. **Start with health check** - proves backend works
2. **Show real-time streaming** - highlight SSE
3. **Mention real blockchain data** - not mocked
4. **Point out beautiful UI** - dark theme, animations
5. **Show vault card** - professional visualization
6. **Explain architecture** - modular, scalable
7. **Highlight code quality** - TypeScript, clean
8. **Mention three interfaces** - Web, API, CLI

---

## 🚀 Quick Commands Reference

```bash
# Start everything
./start-dev.sh

# API only
npm run server

# Frontend only
cd frontend && npm run dev

# CLI mode
npm start

# Health check
curl http://localhost:3001/health

# Simple chat test
curl -X POST http://localhost:3001/api/chat/simple \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'

# List sessions
curl http://localhost:3001/api/sessions

# Kill servers
killall node
```

---

**Ready to test!** 🎉
