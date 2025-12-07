# StoryVault Steward# 🏛️ StoryVault Steward



An autonomous DeFi agent that manages yield strategies on Fraxtal L2. You tell it your story, deposit FRAX, and it handles everything—wrapping, swapping, staking, rebalancing during crashes, withdrawing when you're done.A DeFi advisor agent that analyzes users' life stories to recommend personalized yield strategies on the Fraxtal network. **Now with a beautiful web interface!**



Built for the **IQAI Agent Arena Hackathon** using ADK-TS + Gemini 2.0 Flash.## 🚀 Quick Start



---### Prerequisites

- Node.js >= 22.0.0

## How It Works

### Installation

```

┌─────────────────────────────────────────────────────────────────────────┐```bash

│                         FRONTEND (Next.js 14)                           │# Install dependencies

│  ┌──────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐│npm install

│  │ChatInterface │→ │SmartInvestWidget│→ │  InvestmentDashboard        ││cd frontend && npm install && cd ..

│  │(AI Advisor)  │  │(5-Step Executor)│  │  (Portfolio Monitoring)     ││```

│  └──────────────┘  └─────────────────┘  └─────────────────────────────┘│

│         ↑ SSE           ↑ SSE                    ↑ SSE                  │### Configuration

└─────────│───────────────│────────────────────────│──────────────────────┘

          │               │                        │1. Create `.env` file with your API key:

          ↓               ↓                        ↓```bash

┌─────────────────────────────────────────────────────────────────────────┐GOOGLE_API_KEY=your_google_api_key_here

│                         BACKEND (Hono + Node.js)                        │FRAXTAL_RPC_URL=https://rpc.frax.com

│  ┌───────────────────────────────────────────────────────────────────┐ │ATP_WALLET_PRIVATE_KEY=your_wallet_private_key  # Optional

│  │  ADK-TS Agent (Gemini 2.0 Flash)                                  │ │```

│  │  - Story Analysis → Risk Profiling → Strategy Recommendation      │ │

│  └───────────────────────────────────────────────────────────────────┘ │2. Frontend is pre-configured in `frontend/.env.local`

│  ┌───────────────────────────────────────────────────────────────────┐ │

│  │  Autonomous Watcher Loop (5-second interval)                      │ │### Run

│  │  - Deposit Detection → Auto-Investment → SSE Broadcasting         │ │

│  └───────────────────────────────────────────────────────────────────┘ │#### 🌐 Web Interface (Recommended)

└─────────────────────────────────────────────────────────────────────────┘Start both API server and frontend:

                                    │```bash

                                    ↓ viem transactions./start-dev.sh

┌─────────────────────────────────────────────────────────────────────────┐```

│                    FRAXTAL BLOCKCHAIN (Chain ID: 252)                   │Then open **http://localhost:3000** in your browser!

│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐│

│  │   wFRAX    │  │   frxUSD   │  │  sfrxUSD   │  │ Curve TriPool      ││#### 💻 CLI Mode

│  │ 0xfc...02  │  │ 0xfc...01  │  │ 0xfc...08  │  │ frxUSD/frxETH/wFRAX││```bash

│  └────────────┘  └────────────┘  └────────────┘  └────────────────────┘│npm start

│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐│```

│  │  frxETH    │  │  sfrxETH   │  │MintRedeemer│  │Curve frxETH/sfrxETH││

│  │ 0xfc...06  │  │ 0xfc...05  │  │ 0xBFc4...  │  │    stable-ng       ││#### 🔧 API Server Only

│  └────────────┘  └────────────┘  └────────────┘  └────────────────────┘│```bash

└─────────────────────────────────────────────────────────────────────────┘npm run server

``````



---## 🎯 Features



## The Flow### Phase 5: Web Interface ✨ NEW!

- **Real-time Chat**: SSE streaming for instant AI responses

### Stage 1: Chat- **Dark Mode UI**: Beautiful purple/gold DeFi aesthetic

- **Vault Display**: Visual representation of deployed strategies

You share your financial story. The AI analyzes risk tolerance, timeline, and goals.- **Session Management**: Persistent conversation history

- **Split View**: Chat on left, vault details on right

```

User: "I'm a 25-year-old developer saving for a house in 5 years"### Core Features

- **Story Analysis**: Share your financial story and get personalized recommendations

Agent: Fetches live APY → Recommends 60% sfrxUSD / 40% sfrxETH- **Real-time Yields**: Fetches current APY for sFRAX and sfrxETH on Fraxtal

       Shows agent wallet address when you agree- **ATP Integration**: Deploy strategies directly to Frax's Autonomous Tokenized Portfolio

```- **Risk Profiling**: Intelligent matching of strategies to user risk tolerance

- **Three Interfaces**: Web UI, REST API, or Terminal CLI

### Stage 2: Smart Invest

## 🛠️ Tech Stack

You deposit FRAX. The watcher detects it within 5 seconds and kicks off the investment sequence:

### Backend

| Step | Action | Details |- **ADK-TS**: AI agent framework with tool integration

|------|--------|---------|- **Hono**: Lightweight web framework for API

| 1 | Wrap FRAX | Native FRAX → wFRAX (ERC-20) |- **Viem**: Ethereum blockchain interactions

| 2 | Swap stable leg | wFRAX → frxUSD via Curve TriPool |- **TypeScript**: Type-safe development

| 3 | Stake stable | frxUSD → sfrxUSD via MintRedeemer |

| 4 | Swap volatile leg | wFRAX → frxETH via Curve TriPool |### Frontend

| 5 | Stake volatile | frxETH → sfrxETH via Curve stable-ng pool |- **Next.js 14**: React with App Router

- **Tailwind CSS**: Utility-first styling

All transactions broadcast via SSE. Frontend updates in real-time.- **Lucide Icons**: Beautiful icons

- **SSE**: Real-time streaming

### Stage 3: Dashboard

### Blockchain

Portfolio monitoring with live balance tracking, yield projections, and market data.- **Fraxtal L2**: High-yield DeFi strategies on Frax's Layer 2

- **Real Contracts**: Direct on-chain data fetching

### Stage 4: Exit

## 📋 Available Strategies

Withdraw all funds to any address. Agent transfers all ERC-20s first, then native FRAX (reserves 0.01 for gas).

- **sFRAX**: ~4.5% APY - Low risk, stablecoin yield

---- **sfrxETH**: ~3.8% APY - Medium risk, ETH liquid staking



## Yield Products## 🏗️ Project Structure



| Token | APY | Backing | Risk |```

|-------|-----|---------|------|storyvault-steward/

| **sfrxUSD** | ~4.1% | US Treasuries (BlackRock BUIDL, Superstate USTB) | Low |├── src/

| **sfrxETH** | ~5-6% | ETH staking rewards | Medium |│   ├── agent.ts          # Exportable agent configuration

│   ├── cli.ts            # Terminal interface

The agent blends these based on your story:│   ├── server.ts         # REST API with SSE streaming

- Conservative → 80% sfrxUSD / 20% sfrxETH│   └── tools/

- Balanced → 50/50│       ├── fraxTools.ts      # Fraxtal yield data

- Aggressive → 20% sfrxUSD / 80% sfrxETH│       └── realAtpTool.ts    # ATP deployment

├── frontend/             # Next.js web interface

---│   ├── app/

│   │   ├── page.tsx          # Main page

## Crash Rebalancing│   │   ├── layout.tsx        # Root layout

│   │   └── globals.css       # Global styles

The agent can execute defensive rebalancing when markets dump:│   ├── components/

│   │   ├── ChatInterface.tsx # Chat UI with SSE

```│   │   └── VaultCard.tsx     # Vault display

sfrxETH (volatile)│   └── lib/

    ↓ Curve frxETH/sfrxETH pool│       ├── api.ts            # API client

frxETH│       └── utils.ts          # Utilities

    ↓ Curve TriPool├── project_context/      # Specification files

wFRAX├── start-dev.sh          # Startup script

    ↓ Curve TriPool└── package.json

frxUSD```

    ↓ MintRedeemer

sfrxUSD (stable)## 🌐 Fraxtal Network

```

- **Chain ID**: 252

Shifts ETH exposure to Treasury-backed yield. 4-step pipeline with 1% max slippage per swap.- **RPC**: https://rpc.frax.com

- **Explorer**: https://fraxscan.com

---- **ATP Dashboard**: https://app.iqai.com/



## Why Curve Instead of Fraxswap?## 📡 API Endpoints



Fraxswap V2 on Fraxtal returns `TWAMM_OUT_OF_DATE` errors—the TWAMM oracle state goes stale on low-liquidity pairs. Curve pools provide:| Method | Endpoint | Description |

|--------|----------|-------------|

- Consistent liquidity| GET | `/health` | Health check |

- Standard `exchange(i, j, dx, min_dy)` interface| POST | `/api/chat` | Chat with SSE streaming |

- No oracle dependencies| POST | `/api/chat/simple` | Chat without streaming |

| GET | `/api/sessions` | List active sessions |

**Curve TriPool** (`0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569`):| DELETE | `/api/session/:id` | Delete a session |

- coins(0) = frxUSD, coins(1) = frxETH, coins(2) = wFRAX

- Used for: wFRAX→frxUSD, wFRAX→frxETH, frxETH→wFRAX## 🎨 Screenshots



**Curve frxETH/sfrxETH** (`0xF2f426Fe123De7b769b2D4F8c911512F065225d3`):### Web Interface

- stable-ng pool optimized for pegged assets- **Split View**: Chat interface on left, vault card on right

- Used for: frxETH↔sfrxETH swaps- **Dark Theme**: Deep space background with purple/gold accents

- **Real-time Streaming**: Watch AI responses appear in real-time

---- **Example Prompts**: Quick start with pre-built scenarios



## Security## 📚 Documentation



```- [Backend README](./PHASE_5_BACKEND_COMPLETE.md) - API server details

┌────────────────────────────────────────────────────┐- [Frontend README](./frontend/README.md) - Frontend setup and components

│  Layer 1: Gas Reserve (0.1 FRAX preserved)         │- [ADK Spec](./project_context/adk_spec.md) - Agent framework documentation

├────────────────────────────────────────────────────┤- [Fraxtal Spec](./project_context/fraxtal_spec.md) - Fraxtal integration details

│  Layer 2: Min Balance Check (0.2 FRAX threshold)   │

├────────────────────────────────────────────────────┤## � Deployment

│  Layer 3: One-Time Execution Flag                  │

├────────────────────────────────────────────────────┤### Backend

│  Layer 4: Concurrent Investment Lock               │Deploy the API server to any Node.js hosting:

├────────────────────────────────────────────────────┤```bash

│  Layer 5: Transaction Receipt Verification         │npm run server

├────────────────────────────────────────────────────┤```

│  Layer 6: Nonce Management (dual block tag check)  │

└────────────────────────────────────────────────────┘### Frontend

```Deploy to Vercel (recommended):

```bash

---cd frontend

vercel deploy

## Quick Start```



```bashSet environment variable: `NEXT_PUBLIC_API_URL=your-api-url`

npm install

cd frontend && npm install && cd ..## 🧪 Testing



# Configure### Manual Testing Flow

cp .env.example .env1. Start both servers: `./start-dev.sh`

# GOOGLE_API_KEY=your_key2. Open http://localhost:3000

# ATP_WALLET_PRIVATE_KEY=your_private_key3. Enter a life story prompt

4. Watch streaming response

# Run both servers5. See vault card populate when strategy deploys

./start-dev.sh

# Frontend: http://localhost:3000### Example Prompts

# Backend: http://localhost:3001```

```"I'm a 28-year-old teacher saving for a house in 3 years. Risk-averse."

"College student, 21, learning about DeFi. Want safe yields."

Node.js ≥ 22 required."Entrepreneur, 35, high risk tolerance. Looking for growth."

```

---

## 🏆 Development Phases

## API

- ✅ **Phase 1**: Basic scaffolding with ADK

| Endpoint | Method | What It Does |- ✅ **Phase 2**: Real Fraxtal blockchain integration

|----------|--------|--------------|- ✅ **Phase 3**: ATP deployment simulation

| `/api/chat` | POST | Chat with SSE streaming |- ✅ **Phase 4**: Real ATP integration + wallet verification

| `/api/funding/stream` | GET | SSE stream for real-time updates |- ✅ **Phase 5**: REST API + Web Interface

| `/api/smart-invest` | POST | Trigger investment sequence |

| `/api/rebalance` | POST | Crash rebalancing (sfrxETH → sfrxUSD) |## �📝 License

| `/api/withdraw` | POST | Withdraw all funds to recipient |

| `/api/wallet/:address/balances` | GET | Token balances |MIT

| `/api/strategy/:address` | GET/POST | User strategy preferences |

| `/api/market/data` | GET | ETH price, gas, sentiment |---



---**Built with 💜 for the Fraxtal Hackathon**


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

## Project Structure

```
src/
├── agent.ts                # ADK agent config + system prompt
├── server.ts               # Hono server + 5s watcher loop
├── cli.ts                  # Terminal interface
└── tools/
    ├── smartInvestTools.ts     # 5-step investment sequence
    ├── rebalanceTools.ts       # 4-step crash rebalancing
    ├── curveTriPool.ts         # TriPool swap helpers
    ├── curveFrxEthPool.ts      # frxETH/sfrxETH swaps
    ├── executionTools.ts       # Withdraw + wallet ops
    ├── fraxTools.ts            # Yield data fetching
    ├── strategyManager.ts      # User strategy storage
    └── walletTool.ts           # Balance checking

frontend/
├── components/
│   ├── ChatInterface.tsx       # AI chat with strategy detection
│   ├── SmartInvestWidget.tsx   # 5-step execution UI
│   └── InvestmentDashboard.tsx # Portfolio monitoring + withdraw
├── context/
│   └── AppFlowContext.tsx      # 4-stage flow management
├── hooks/
│   └── useSmartInvest.ts       # SSE connection hook
└── lib/
    └── api.ts                  # API client
```

---

## Stack

**Backend**: Hono, @iqai/adk, Viem, TypeScript, Node.js 22  
**Frontend**: Next.js 14, Tailwind, Framer Motion, Recharts  
**AI**: Gemini 2.0 Flash  
**Chain**: Fraxtal L2 (252)  
**DEX**: Curve Finance pools

---

## Deployment

| Layer | Platform |
|-------|----------|
| Frontend | Vercel |
| Backend | Railway |
| RPC | https://rpc.frax.com |
| Explorer | https://fraxscan.com |

---

## What Makes This Different

1. **Actually autonomous** — deposits detected and invested without human intervention
2. **Real transactions** — not a simulation, executes on Fraxtal mainnet
3. **Story-driven allocation** — AI personalizes strategy based on natural language
4. **5-step pipeline** — wrap → swap → stake → swap → stake, all via Curve
5. **Crash protection** — 4-step rebalancing shifts volatile → stable
6. **Full exit** — withdraw everything to any address
7. **Live UI** — SSE streaming updates every transaction step

---

## Hackathon

**IQAI Agent Arena** (Nov 10 - Dec 9, 2025)  
Track: ADK-TS  
Requirement: Tokenized agent on ATP

---

## License

MIT
