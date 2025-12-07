# StoryVault Steward

Autonomous AI agent that manages DeFi investments on Fraxtal. Tell it your financial story, deposit FRAX, and it handles the rest—wrapping, swapping, staking, rebalancing.

Built with [IQAI ADK-TS](https://docs.iqai.com) + Gemini 2.0 Flash. Executes real transactions on Fraxtal L2.

---

## What It Does

1. **Chat** → AI analyzes your story (risk tolerance, timeline, goals)
2. **Recommend** → Suggests allocation split (sfrxUSD for stable yield, sfrxETH for ETH exposure)
3. **Deposit** → You send FRAX to the agent's wallet
4. **Execute** → Agent autonomously wraps, swaps via Curve, stakes into vaults
5. **Monitor** → Real-time dashboard tracks your positions

The agent runs a watcher loop that detects deposits and triggers a 5-step investment sequence without human intervention.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Frontend (Next.js 14)                                          │
│  ChatInterface → SmartInvestWidget → InvestmentDashboard        │
│         ↓ SSE streaming                                         │
├─────────────────────────────────────────────────────────────────┤
│  Backend (Hono + ADK-TS)                                        │
│  • Gemini 2.0 Flash agent with DeFi tools                       │
│  • Autonomous watcher (5s interval)                             │
│  • SSE broadcasting for real-time UI updates                    │
├─────────────────────────────────────────────────────────────────┤
│  Fraxtal L2 (Chain 252)                                         │
│  • Curve TriPool: wFRAX ↔ frxUSD ↔ frxETH                       │
│  • Curve frxETH/sfrxETH pool                                    │
│  • MintRedeemer for sfrxUSD staking                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Investment Flow

When you deposit FRAX, the agent executes:

| Step | Action | Contract |
|------|--------|----------|
| 1 | Wrap FRAX → wFRAX | `0xfc00...0002` |
| 2 | Swap wFRAX → frxUSD (stable leg) | Curve TriPool |
| 3 | Stake frxUSD → sfrxUSD | MintRedeemer |
| 4 | Swap wFRAX → frxETH (volatile leg) | Curve TriPool |
| 5 | Swap frxETH → sfrxETH | Curve frxETH/sfrxETH |

Split ratio based on your risk profile (e.g., 60% stable / 40% volatile).

---

## Yield Products

| Token | APY | Backing | Use Case |
|-------|-----|---------|----------|
| **sfrxUSD** | ~4.1% | US Treasuries (BlackRock BUIDL, Superstate USTB) | Capital preservation |
| **sfrxETH** | ~5-6% | ETH staking rewards | Growth exposure |

---

## Quick Start

```bash
# Install
npm install
cd frontend && npm install && cd ..

# Configure
cp .env.example .env
# Add: GOOGLE_API_KEY, ATP_WALLET_PRIVATE_KEY

# Run (both servers)
./start-dev.sh
# → Frontend: http://localhost:3000
# → Backend: http://localhost:3001
```

Requirements: Node.js ≥ 22

---

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Chat with SSE streaming |
| `/api/smart-invest` | POST | Trigger investment sequence |
| `/api/funding/stream` | GET | SSE stream for real-time updates |
| `/api/rebalance` | POST | Crash rebalancing (sfrxETH → sfrxUSD) |
| `/api/withdraw` | POST | Withdraw all funds to recipient |
| `/api/wallet/:address/balances` | GET | Token balances |

---

## Rebalancing

The agent can execute defensive rebalancing during market volatility:

```
sfrxETH → frxETH → wFRAX → frxUSD → sfrxUSD
```

Shifts volatile ETH exposure to stable Treasury-backed yield. Triggered via `/api/rebalance` or through chat commands.

---

## Tech Stack

**Backend**: Hono, ADK-TS, Viem, TypeScript  
**Frontend**: Next.js 14, Tailwind, Framer Motion, Recharts  
**AI**: Gemini 2.0 Flash  
**Chain**: Fraxtal L2 (252)  
**DEX**: Curve pools (TriPool + frxETH/sfrxETH stable-ng)

---

## Key Files

```
src/
├── agent.ts              # ADK agent config + system prompt
├── server.ts             # Hono server + watcher loop
└── tools/
    ├── smartInvestTools.ts   # 5-step investment sequence
    ├── rebalanceTools.ts     # Crash rebalancing
    ├── curveTriPool.ts       # TriPool swap helpers
    ├── curveFrxEthPool.ts    # frxETH/sfrxETH swaps
    └── executionTools.ts     # Withdraw + wallet ops

frontend/
├── components/
│   ├── ChatInterface.tsx     # AI chat with strategy detection
│   ├── SmartInvestWidget.tsx # 5-step execution UI
│   └── InvestmentDashboard.tsx # Portfolio monitoring
└── context/
    └── AppFlowContext.tsx    # Stage management
```

---

## Contracts (Fraxtal Mainnet)

| Contract | Address |
|----------|---------|
| wFRAX | `0xfc00000000000000000000000000000000000002` |
| frxUSD | `0xfc00000000000000000000000000000000000001` |
| sfrxUSD | `0xfc00000000000000000000000000000000000008` |
| frxETH | `0xfc00000000000000000000000000000000000006` |
| sfrxETH | `0xfc00000000000000000000000000000000000005` |
| Curve TriPool | `0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569` |
| Curve frxETH/sfrxETH | `0xF2f426Fe123De7b769b2D4F8c911512F065225d3` |
| MintRedeemer | `0xBFc4D34Db83553725eC6c768da71D2D9c1456B55` |

---

## Why Curve Instead of Fraxswap?

Fraxswap V2 on Fraxtal returns `TWAMM_OUT_OF_DATE` errors due to stale oracle state. Curve pools provide consistent liquidity and a standard `exchange(i, j, dx, min_dy)` interface without TWAMM complexity.

---

## Deployment

**Frontend**: Vercel  
**Backend**: Railway (persistent watcher loop)  
**Network**: Fraxtal Mainnet

```bash
# Build
npm run build
cd frontend && npm run build
```

---

## Hackathon

Built for **IQAI Agent Arena** (Nov 10 - Dec 9, 2025).  
Track: ADK-TS.  
Requirement: Deploy tokenized agent on ATP.

---

## License

MIT
