# 🏛️ StoryVault Steward - Complete Technical Documentation

## 📋 Project Overview

**StoryVault Steward** is an **autonomous AI-powered DeFi investment agent** built for the **IQAI Agent Arena Hackathon**. It combines conversational AI with real blockchain execution on **Fraxtal L2** to create a "robo-advisor" that analyzes users' life stories and automatically invests their funds into yield-bearing DeFi vaults.

### Hackathon Context
- **Event**: IQAI Agent Arena Hackathon (Nov 10 - Dec 9, 2025)
- **Track**: ADK-TS (Agent Development Kit - TypeScript)
- **Prize Pool**: $7,000+ with potential $10M fund investment
- **Requirement**: Deploy tokenized agent on IQAI's ATP (Agent Tokenization Platform)

---

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 14)                           │
│  ┌──────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐│
│  │ChatInterface │→ │SmartInvestWidget│→ │  InvestmentDashboard        ││
│  │(AI Advisor)  │  │(5-Step Executor)│  │  (Portfolio Monitoring)     ││
│  └──────────────┘  └─────────────────┘  └─────────────────────────────┘│
│         ↑ SSE           ↑ SSE                    ↑ SSE                  │
└─────────│───────────────│────────────────────────│──────────────────────┘
          │               │                        │
          ↓               ↓                        ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         BACKEND (Hono + Node.js)                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  ADK-TS Agent (Gemini 2.0 Flash)                                  │ │
│  │  - Story Analysis → Risk Profiling → Strategy Recommendation      │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  Autonomous Watcher Loop (5-second interval)                      │ │
│  │  - Deposit Detection → Auto-Investment → SSE Broadcasting         │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  Tools: fraxTools, executionTools, smartInvestTools, curveTriPool │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ↓ (viem transactions)
┌─────────────────────────────────────────────────────────────────────────┐
│                    FRAXTAL BLOCKCHAIN (Chain ID: 252)                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────────────┐│
│  │   wFRAX    │  │   frxUSD   │  │  sfrxUSD   │  │ Curve TriPool      ││
│  │ 0xfc...02  │  │ 0xfc...01  │  │ 0xfc...08  │  │ 0xa0D3...6569      ││
│  └────────────┘  └────────────┘  └────────────┘  │ frxUSD/frxETH/wFRAX││
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  └────────────────────┘│
│  │  frxETH    │  │  sfrxETH   │  │MintRedeemer│  ┌────────────────────┐│
│  │ 0xfc...06  │  │ 0xfc...05  │  │ 0xBFc4...  │  │Curve frxETH/sfrxETH││
│  └────────────┘  └────────────┘  └────────────┘  │ 0xF2f4...25d3      ││
│                                                  └────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete User Journey (4-Stage Flow)

### **Stage 1: Chat (Strategy Discovery)**
```
User: "I'm a 25-year-old software developer saving for a house in 5 years"
           │
           ↓
┌──────────────────────────────────────────────────┐
│  AI Steward (Gemini 2.0 Flash)                   │
│  1. Analyzes story for:                          │
│     - Age, timeline, risk tolerance              │
│     - Goals (house = medium-term = balanced)     │
│  2. Calls get_frax_yields() for live APY data    │
│  3. Recommends strategy:                         │
│     "60% sfrxUSD (~4.1% APY) / 40% sfrxETH (~6%)"│
│  4. Shows agent wallet address on user acceptance│
└──────────────────────────────────────────────────┘
           │
           ↓ (User says "yes" or "do it")
┌──────────────────────────────────────────────────┐
│  Frontend detects strategy acceptance:           │
│  - Parses response for % allocations             │
│  - Dispatches "strategyAccepted" event           │
│  - AppFlowContext transitions to Stage 2         │
└──────────────────────────────────────────────────┘
```

### **Stage 2: Smart Invest (5-Step Execution)**
```
User deposits FRAX to agent wallet
           │
           ↓
┌──────────────────────────────────────────────────────────────────────┐
│  Autonomous Watcher Loop (server.ts - every 5 seconds)               │
│  1. getAgentWalletFn() → Check native FRAX balance                   │
│  2. Detect deposit: balance > lastKnownBalance & > 0.2 FRAX          │
│  3. broadcastFundingUpdate("DEPOSIT_DETECTED")                       │
│  4. Call executeInvestmentSequence()                                 │
└──────────────────────────────────────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────────────────────────┐
│  executeInvestmentSequence() - 5 Transaction Steps                   │
│                                                                      │
│  STEP 1: WRAP FRAX                                                   │
│  ├─ Native FRAX → wFRAX (ERC-20)                                     │
│  ├─ wFRAX.deposit{ value: investableAmount }()                       │
│  └─ SSE: broadcastLog(1, "Processing", "Wrapping FRAX...")           │
│                                                                      │
│  STEP 2: SWAP TO frxUSD (Stable Leg) - Curve TriPool                 │
│  ├─ wFRAX.approve(curveTriPool, stableAmount)                        │
│  ├─ curveTriPool.exchange(2, 0, amount, minDy) [wFRAX→frxUSD]        │
│  └─ SSE: broadcastLog(2, "Success", "Swapped to frxUSD via TriPool") │
│                                                                      │
│  STEP 3: STAKE sfrxUSD                                               │
│  ├─ frxUSD.approve(MintRedeemer, amount)                             │
│  ├─ MintRedeemer.deposit(amount, receiver)                           │
│  └─ SSE: broadcastLog(3, "Success", "Staked in sfrxUSD vault")       │
│                                                                      │
│  STEP 4: SWAP TO frxETH (Volatile Leg) - Curve TriPool               │
│  ├─ wFRAX.approve(curveTriPool, volatileAmount)                      │
│  ├─ curveTriPool.exchange(2, 1, amount, minDy) [wFRAX→frxETH]        │
│  └─ SSE: broadcastLog(4, "Success", "Swapped to frxETH via TriPool") │
│                                                                      │
│  STEP 5: SWAP frxETH → sfrxETH (Curve stable-ng Pool)                │
│  ├─ Resolve pool indices via coins(i) function                       │
│  ├─ Quote expected output via get_dy(i, j, dx)                       │
│  ├─ frxETH.approve(curvePool, amount)                                │
│  ├─ curvePool.exchange(i, j, dx, minDy, receiver)                    │
│  │   ✅ Curve stable-ng pool: 0xF2f426Fe123De7b769b2D4F8c911512F065225d3
│  │   ✅ Better depth & pricing for frxETH↔sfrxETH                    │
│  └─ SSE: broadcastLog(5, "Success", "Swapped via Curve pool")        │
└──────────────────────────────────────────────────────────────────────┘
```

### **Stage 3: Countdown (Transition)**
```
┌──────────────────────────────────────────────────┐
│  All 5 steps complete                            │
│  Frontend dispatches "investmentComplete" event  │
│  30-second countdown to dashboard                │
│  User can skip countdown manually                │
└──────────────────────────────────────────────────┘
```

### **Stage 4: Command Center (Portfolio Dashboard)**
```
┌──────────────────────────────────────────────────────────────────────┐
│  InvestmentDashboard Component                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Portfolio Value: $XXX.XX                                       │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │ │
│  │  │ sfrxUSD     │  │ sfrxETH     │  │ Performance Chart       │  │ │
│  │  │ $XX (60%)   │  │ $XX (40%)   │  │ ▲▲▲▲▲▲▲▲▲▲              │  │ │
│  │  │ APY: 4.1%   │  │ APY: 6.5%   │  │                         │  │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘  │ │
│  │                                                                 │ │
│  │  Market Data:                                                   │ │
│  │  - ETH Price: $3,850  - Gas: 0.0001 FRAX  - Block: #XXXXX      │ │
│  │  - Sentiment: Bullish (72)                                      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  SSE Connection: /api/funding/stream                                 │
│  - Real-time balance updates                                         │
│  - Live yield tracking                                               │
│  - Transaction confirmations                                         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend
| Component | Technology | Purpose |
|-----------|------------|---------|
| AI Framework | **@iqai/adk** (ADK-TS) | Agent builder, tool creation, Gemini integration |
| LLM | **Gemini 2.0 Flash** | Conversational AI, story analysis |
| Web Server | **Hono** | Lightweight REST API with SSE streaming |
| Blockchain | **viem** | Ethereum/Fraxtal interactions, contract calls |
| Runtime | **Node.js 22+** | JavaScript runtime |

### Frontend
| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | **Next.js 14** | React with App Router |
| Styling | **Tailwind CSS** | Utility-first CSS |
| Animations | **Framer Motion** | Smooth UI transitions |
| Charts | **Recharts** | Portfolio visualization |
| Icons | **Lucide React** | Icon library |
| State | **React Context** | App flow management |

### Blockchain (Fraxtal L2)
| Contract | Address | Purpose |
|----------|---------|---------|
| wFRAX | `0xfc00...0002` | Wrapped FRAX (ERC-20) |
| frxUSD | `0xfc00...0001` | USD stablecoin |
| sfrxUSD | `0xfc00...0008` | Staked frxUSD vault (~4.1% APY) |
| frxETH | `0xfc00...0006` | Liquid staking token |
| sfrxETH | `0xfc00...0005` | Staked frxETH (~6-7% APY) |
| MintRedeemer | `0xBFc4...` | frxUSD → sfrxUSD staking |
| **Curve TriPool** | `0xa0D3...6569` | **wFRAX↔frxUSD↔frxETH swaps (primary DEX)** |
| **Curve frxETH/sfrxETH** | `0xF2f4...25d3` | **frxETH ↔ sfrxETH swap (stable-ng pool)** |
| ~~Fraxswap Router~~ | `0x7ae2...` | ~~Deprecated - TWAMM errors~~ |

---

## 🔄 Curve Pool Integration (All Swaps)

### Why Curve Instead of Fraxswap?

Fraxswap V2 Router on Fraxtal L2 returns `TWAMM_OUT_OF_DATE` errors because:
1. TWAMM (Time-Weighted Average Market Maker) requires periodic oracle updates
2. Low liquidity pools may have stale TWAMM state
3. Direct swaps via `swapExactTokensForTokens` fail unexpectedly

**Solution**: Use **Curve pools** for all token swaps:
- **Curve TriPool** (`0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569`) for wFRAX↔frxUSD↔frxETH
- **Curve frxETH/sfrxETH** (`0xF2f426Fe123De7b769b2D4F8c911512F065225d3`) for frxETH↔sfrxETH

### Pool 1: Curve TriPool (frxUSD/frxETH/wFRAX)
- **Address**: `0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569`
- **Type**: Plain pool (3 assets)
- **Purpose**: Primary DEX for investment & rebalancing
- **Coin Layout**: coins(0)=frxUSD, coins(1)=frxETH, coins(2)=wFRAX
- **Supported Swaps**:
  - wFRAX → frxUSD: `exchange(2, 0, amount, minDy)` [Stable leg]
  - wFRAX → frxETH: `exchange(2, 1, amount, minDy)` [Volatile leg]
  - frxETH → wFRAX: `exchange(1, 2, amount, minDy)` [Rebalance]

### Pool 2: Curve frxETH/sfrxETH (Stable-NG)
- **Address**: `0xF2f426Fe123De7b769b2D4F8c911512F065225d3`
- **Type**: stable-ng (optimized for pegged assets)
- **Purpose**: frxETH↔sfrxETH swaps (yield token conversion)
- **Coin Layout**: coins(0)=frxETH, coins(1)=sfrxETH
- **Supported Swaps**:
  - frxETH → sfrxETH: `exchange(0, 1, amount, minDy)` [Investment]
  - sfrxETH → frxETH: `exchange(1, 0, amount, minDy)` [Rebalance]

### Helper Modules

**curveTriPool.ts** - TriPool swap helpers:
- `swapWFraxToFrxUsd()` - Direct wFRAX→frxUSD (stable leg)
- `swapWFraxToFrxEth()` - Direct wFRAX→frxETH (volatile leg)
- `swapFrxEthToFrxUsd()` - 2-step frxETH→wFRAX→frxUSD (rebalance)

**curveFrxEthPool.ts** - frxETH/sfrxETH swap helpers:
- `swapFrxEthToSfrxEth()` - frxETH→sfrxETH (investment)
- `swapSfrxEthToFrxEth()` - sfrxETH→frxETH (rebalance)

### Key Benefits

1. **Bypasses TWAMM errors** - No stale oracle issues
2. **Better liquidity** - Curve pools have deeper liquidity
3. **Consistent routing** - All swaps through Curve pools
4. **Simpler flow** - Standard `exchange(i, j, dx, min_dy)` interface

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| POST | `/api/chat` | Chat with SSE streaming |
| POST | `/api/chat/simple` | Non-streaming chat |
| GET | `/api/sessions` | List active sessions |
| DELETE | `/api/session/:id` | Delete session |
| GET | `/api/strategy/:address` | Get user's investment strategy |
| POST | `/api/strategy/:address` | Set investment strategy |
| POST | `/api/smart-invest` | Manual trigger for testing |
| GET | `/api/funding/stream` | SSE stream for real-time updates |
| GET | `/api/wallet/:address/balances` | Get token balances |
| GET | `/api/market/data` | Get ETH price, gas, sentiment |
| POST | `/api/withdraw` | Withdraw all funds to recipient address |
| **POST** | **`/api/rebalance`** | **AI-powered crash rebalancing (sfrxETH→sfrxUSD)** |
| POST | `/api/simulate/crash` | Demo: Simulate market crash (legacy) |
| POST | `/api/simulate/recovery` | Demo: Simulate recovery |

---

## 💸 Withdraw All Funds Feature

### Overview
The **Withdraw All Funds** feature allows users to transfer all tokens held by the agent wallet to a specified recipient address. This is essential for users who want to exit their positions and reclaim their funds.

### Architecture
```
┌─────────────────────────────────────────────────────────────────────────┐
│  InvestmentDashboard (Frontend)                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  "Withdraw All" Button (LogOut Icon)                                ││
│  │  ├─ Opens modal with recipient address input                        ││
│  │  ├─ Validates Ethereum address format (0x...)                       ││
│  │  └─ Displays current holdings to withdraw                           ││
│  └─────────────────────────────────────────────────────────────────────┘│
│         │                                                               │
│         ↓ POST /api/withdraw { recipientAddress }                       │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  withdrawAllFundsToRecipient() - executionTools.ts                      │
│                                                                         │
│  STEP 1: Transfer ERC-20 Tokens (in sequence)                           │
│  ├─ sfrxUSD → Recipient (if balance > 0)                                │
│  ├─ sfrxETH → Recipient (if balance > 0)                                │
│  ├─ frxETH  → Recipient (if balance > 0)                                │
│  ├─ frxUSD  → Recipient (if balance > 0)                                │
│  └─ WFRAX   → Recipient (if balance > 0)                                │
│                                                                         │
│  STEP 2: Transfer Native FRAX (Gas Token) - LAST                        │
│  ├─ Reserve 0.01 FRAX for gas (FIXED_GAS_RESERVE)                       │
│  ├─ Send remaining balance to recipient                                 │
│  └─ Uses empirical gas reserve (Fraxtal L2 specific)                    │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  Frontend Response Handling                                             │
│  ├─ Real-time progress tracking per token                               │
│  ├─ Clickable transaction hashes → Fraxscan                             │
│  ├─ Success/Error status indicators                                     │
│  └─ Auto-refresh balances after completion                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Implementation Details

**1. ERC-20 Transfers First**
```typescript
const ERC20_TOKENS = [
  { address: "0xfc00000000000000000000000000000000000008", symbol: "sfrxUSD" },
  { address: "0xfc00000000000000000000000000000000000005", symbol: "sfrxETH" },
  { address: "0xfc00000000000000000000000000000000000006", symbol: "frxETH" },
  { address: "0xfc00000000000000000000000000000000000001", symbol: "frxUSD" },
  { address: "0xfc00000000000000000000000000000000000002", symbol: "WFRAX" },
];
// Transfers executed sequentially with nonce management
```

**2. Native FRAX Transfer Last (Gas Optimization)**
```typescript
// Bulletproof gas reserve for Fraxtal L2
const FIXED_GAS_RESERVE = 10000000000000000n; // 0.01 FRAX
// - Actual gas cost: ~0.0018 FRAX per transfer
// - Reserve provides 5.5x safety margin
// - Empirically determined (RPC gas estimates unreliable on Fraxtal)
```

**3. Transaction Hash Display**
```typescript
// Each transfer returns txHash for Fraxscan verification
{
  step: "sfrxUSD Transfer",
  status: "success",
  message: "Sent 0.047916 sfrxUSD",
  txHash: "0xfbcb18955bc64677d07ec7c7cfb407d64e672a19..."
}
// Links to: https://fraxscan.com/tx/{txHash}
```

### Security Considerations

1. **Gas Reserve Protection**: Fixed 0.01 FRAX reserve ensures the native transfer never fails due to insufficient gas
2. **Sequential Execution**: Tokens transferred one-by-one with confirmed receipts to prevent nonce collisions
3. **Address Validation**: Frontend validates recipient address format before API call
4. **Graceful Error Handling**: Individual token failures don't block other transfers

---

## 🚨 Market Crash Simulation (AI-Powered Rebalancing)

### Overview
The **Simulate Market Crash** feature demonstrates the agent's ability to autonomously rebalance portfolios during volatile market conditions. When triggered, the ADK-TS agent analyzes the portfolio, reasons about the optimal rebalancing strategy, and executes a 4-step transaction sequence to shift volatile holdings (sfrxETH) into stable positions (sfrxUSD).

### Architecture
```
┌─────────────────────────────────────────────────────────────────────────┐
│  InvestmentDashboard (Frontend)                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  "Simulate Market Crash" Button (AlertTriangle Icon)                ││
│  │  ├─ Opens minimal terminal-style modal                              ││
│  │  ├─ Shows live execution logs as transactions happen                ││
│  │  ├─ Displays agent reasoning from ADK-TS                            ││
│  │  └─ Manual close only (no auto-close)                               ││
│  └─────────────────────────────────────────────────────────────────────┘│
│         │                                                               │
│         ↓ POST /api/rebalance { strategy: "crash", agentWallet }        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  rebalanceForCrash() - rebalanceTools.ts                                │
│                                                                         │
│  ADK-TS Agent Reasoning (Gemini 2.0 Flash):                             │
│  ├─ Analyzes current portfolio allocation                               │
│  ├─ Identifies volatile exposure (sfrxETH)                              │
│  ├─ Calculates optimal rebalance percentage                             │
│  └─ Provides natural language reasoning for each decision               │
│                                                                         │
│  4-Step Rebalancing Pipeline:                                           │
│                                                                         │
│  STEP 1: sfrxETH → frxETH (Curve stable-ng Pool)                        │
│  ├─ Pool: 0xF2f426Fe123De7b769b2D4F8c911512F065225d3                    │
│  ├─ Coin Layout: coins(0)=frxETH, coins(1)=sfrxETH                      │
│  ├─ Uses exchange(1, 0, amount, minDy) for sfrxETH→frxETH               │
│  └─ 0.5% slippage protection                                            │
│                                                                         │
│  STEP 2: frxETH → wFRAX (Curve TriPool)                                 │
│  ├─ Pool: 0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569                    │
│  ├─ Coin Layout: coins(0)=frxUSD, coins(1)=frxETH, coins(2)=wFRAX       │
│  ├─ Uses exchange(1, 2, amount, minDy) for frxETH→wFRAX                 │
│  └─ Better liquidity than Fraxswap (avoids TWAMM errors)                │
│                                                                         │
│  STEP 3: wFRAX → frxUSD (Curve TriPool)                                 │
│  ├─ Same pool: 0xa0D3911349e701A1F49C1Ba2dDA34b4ce9636569               │
│  ├─ Uses exchange(2, 0, amount, minDy) for wFRAX→frxUSD                 │
│  └─ Intermediate step required (no direct frxETH→frxUSD path)           │
│                                                                         │
│  STEP 4: frxUSD → sfrxUSD (MintRedeemer Vault)                          │
│  ├─ Contract: 0xBFc4D34Db83553725eC6c768da71D2D9c1456B55                │
│  ├─ deposit(amount, receiver) - vault staking                           │
│  └─ Now earning stable ~4.1% APY instead of volatile ETH exposure       │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  Frontend Response Handling                                             │
│  ├─ Terminal-style live logs (auto-scrolling)                           │
│  ├─ Agent reasoning always visible                                      │
│  ├─ Transaction status cards with explorer links                        │
│  ├─ Before/After balance comparison                                     │
│  └─ User must manually close modal to review results                    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Why Curve TriPool Instead of Fraxswap?

The Fraxswap V2 Router on Fraxtal L2 frequently returns `TWAMM_OUT_OF_DATE` errors. The **Curve TriPool** provides:
- Consistent liquidity for frxUSD/frxETH/wFRAX
- Standard `exchange(i, j, dx, min_dy)` without TWAMM complexity
- Multi-hop routing through the triangle

### Rebalancing Flow

```
sfrxETH (Volatile, ~6% APY)
    ↓ Step 1: Curve frxETH/sfrxETH Pool → exchange(1, 0)
frxETH
    ↓ Step 2: Curve TriPool → exchange(1, 2)
wFRAX
    ↓ Step 3: Curve TriPool → exchange(2, 0)
frxUSD
    ↓ Step 4: MintRedeemer → deposit()
sfrxUSD (Stable, ~4.1% APY)
```

### Security Considerations

1. **Slippage Protection**: 1% max slippage on all Curve swaps
2. **Balance Validation**: Checks sfrxETH balance before attempting rebalance
3. **Transaction Receipts**: Waits for confirmation on each step
4. **Graceful Degradation**: Returns SKIPPED if no volatile holdings

### Files Modified

| File | Changes |
|------|---------|
| `src/tools/rebalanceTools.ts` | New tool with 4-step rebalance pipeline |
| `src/tools/curveTriPool.ts` | **NEW** - TriPool swap helpers |
| `src/tools/curveFrxEthPool.ts` | Added sfrxETH→frxETH swap direction |
| `src/tools/smartInvestTools.ts` | Updated to use TriPool for wFRAX swaps |
| `src/agent.ts` | Registered rebalance tool |
| `src/server.ts` | Added `/api/rebalance` endpoint |
| `frontend/components/InvestmentDashboard.tsx` | Crash modal UI |

---

## 🤖 AI Agent Configuration

```typescript
// src/agent.ts - Agent persona and tools
AgentBuilder.create("StorySteward")
  .withModel("gemini-2.0-flash")
  .withInstruction(`
    You are the StoryVault Steward - an AI-powered DeFi investment advisor.
    
    ROLE: Autonomous Fund Manager
    - Users deposit FRAX to YOUR wallet
    - YOU automatically invest based on their story
    - NEVER ask for user's wallet address
    
    PRODUCTS:
    - sfrxUSD: ~4.1% APY (stable, Treasury-backed)
    - sfrxETH: ~6-7% APY (volatile, ETH staking)
    
    FLOW:
    1. Analyze user story → Recommend allocation
    2. User agrees → Show agent wallet address
    3. User deposits → Auto-invest via Smart Invest
  `)
  .withTools(
    get_frax_yields,           // Fetch live APY data
    get_agent_vault_details,   // Initialize vault, show address
    checkFraxtalBalance,       // Check any wallet balance
    start_monitoring_loop,     // Start yield monitoring
    start_stewardship,         // Activate autonomous mode
    calculate_leverage_boost,  // Fraxlend leverage calculator
    get_agent_wallet,          // Get agent wallet info
    execute_strategy           // Execute investment
  )
  .build();
```

---

## 🔐 Security Architecture

### Multi-Layer Protection
```
┌────────────────────────────────────────────────────┐
│  Layer 1: Hardcoded Gas Reserve                    │
│    GAS_RESERVE = 0.1 FRAX (preserved for fees)     │
├────────────────────────────────────────────────────┤
│  Layer 2: Minimum Balance Check                    │
│    MIN_BALANCE = 0.2 FRAX (threshold for invest)   │
├────────────────────────────────────────────────────┤
│  Layer 3: One-Time Execution Flag                  │
│    investmentExecuted = true (prevents loops)      │
├────────────────────────────────────────────────────┤
│  Layer 4: Concurrent Investment Lock               │
│    isInvesting flag (prevents race conditions)     │
├────────────────────────────────────────────────────┤
│  Layer 5: Transaction Verification                 │
│    waitForTransactionReceipt() on every step       │
├────────────────────────────────────────────────────┤
│  Layer 6: Robust Nonce Management                  │
│    ├─ Dual block tag check (pending + latest)      │
│    ├─ Retry logic with 500ms delay (3 attempts)    │
│    ├─ 1s delay after reset for RPC sync            │
│    └─ Sequential tracking prevents collisions      │
└────────────────────────────────────────────────────┘
```

---

## 📊 User Stories

### User Story 1: Conservative Investor
> "I'm a teacher saving for retirement in 20 years. I want low-risk options."

**Agent Response:**
- Recommends: 80% sfrxUSD / 20% sfrxETH
- Reasoning: Long timeline allows some ETH exposure, but primarily Treasury-backed yield
- Expected blended APY: ~4.5%

### User Story 2: Young Professional
> "25-year-old developer, saving for a house in 5 years, willing to take some risk."

**Agent Response:**
- Recommends: 50% sfrxUSD / 50% sfrxETH
- Reasoning: Medium timeline, balanced approach
- Expected blended APY: ~5.3%

### User Story 3: Aggressive Growth
> "Crypto-native, long-term hodler, maximize yield."

**Agent Response:**
- Recommends: 20% sfrxUSD / 80% sfrxETH
- Reasoning: High risk tolerance, prioritize ETH staking yield
- Expected blended APY: ~6.2%

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│  Production Deployment                              │
├─────────────────────────────────────────────────────┤
│  Frontend: Vercel                                   │
│  - Edge Network CDN                                 │
│  - Auto-scaling                                     │
│  - URL: story-vault-steward.vercel.app              │
├─────────────────────────────────────────────────────┤
│  Backend: Railway                                   │
│  - Container deployment                             │
│  - Persistent watcher loop                          │
│  - Environment variables secured                    │
├─────────────────────────────────────────────────────┤
│  Blockchain: Fraxtal Mainnet                        │
│  - RPC: https://rpc.frax.com                        │
│  - Chain ID: 252                                    │
│  - Explorer: https://fraxscan.com                   │
└─────────────────────────────────────────────────────┘
```

---

## 📈 Key Technical Achievements

1. **Autonomous Execution**: Agent detects deposits and invests without human intervention
2. **Real-Time UI**: SSE streaming provides live transaction updates to frontend
3. **Curve TriPool Integration**: All wFRAX↔frxUSD↔frxETH swaps via TriPool (bypasses Fraxswap TWAMM errors)
4. **Curve frxETH/sfrxETH Pool**: frxETH↔sfrxETH swaps via stable-ng pool
5. **Robust Nonce Management**: Dual block tag check + retry logic prevents transaction failures
6. **Story-Based Allocation**: AI analyzes natural language for personalized strategy
7. **5-Step Investment Pipeline**: Wrap → Swap(Stable via TriPool) → Stake → Swap(Volatile via TriPool) → Curve Swap
8. **4-Step Crash Rebalancing**: sfrxETH → frxETH → wFRAX → frxUSD → sfrxUSD (AI-reasoned)
9. **Production-Safe**: Multi-layer security with gas reserves and execution flags
10. **Withdraw All Funds**: Complete exit strategy with sequential token transfers
11. **Session Management**: Multiple users can interact simultaneously

---

## 📁 Project Structure

```
storyvault-steward/
├── src/
│   ├── agent.ts              # AI agent configuration (ADK-TS)
│   ├── server.ts             # Hono API server + autonomous watcher
│   ├── cli.ts                # Terminal interface
│   └── tools/
│       ├── fraxTools.ts      # Yield data fetching
│       ├── executionTools.ts # Withdraw all funds + legacy micro-investment
│       ├── smartInvestTools.ts # 5-step Smart Invest sequence
│       ├── curveFrxEthPool.ts  # Curve pool helper (frxETH↔sfrxETH)
│       ├── curveTriPool.ts     # **NEW** Curve TriPool helper (frxUSD/frxETH/wFRAX)
│       ├── rebalanceTools.ts   # **NEW** Market crash rebalancing (4-step pipeline)
│       ├── strategyManager.ts  # User strategy preferences
│       ├── walletTool.ts     # Balance checking
│       └── fraxlendTools.ts  # Leverage calculations
├── frontend/
│   ├── app/
│   │   └── page.tsx          # Main page with AppFlowProvider
│   ├── components/
│   │   ├── ChatInterface.tsx # AI chat with strategy detection
│   │   ├── SmartInvestWidget.tsx # 5-step execution UI
│   │   ├── InvestmentDashboard.tsx # Portfolio monitoring + withdraw
│   │   ├── StrategySlider.tsx # Allocation adjustment
│   │   └── LiveExecutionLog.tsx # Real-time transaction log
│   ├── context/
│   │   └── AppFlowContext.tsx # Stage management
│   ├── hooks/
│   │   └── useSmartInvest.ts # SSE connection hook
│   └── lib/
│       └── api.ts            # API client functions
└── project_context/          # Hackathon & protocol documentation
``` 

Completed (5/5) *Document Complete Architecture*

This is a comprehensive technical documentation of **StoryVault Steward**. The project is a sophisticated autonomous DeFi investment agent that:

1. **Conversationally analyzes user stories** using Gemini 2.0 Flash AI
2. **Recommends personalized yield strategies** based on risk tolerance
3. **Automatically executes 5-step DeFi transactions** when users deposit FRAX
4. **Provides real-time portfolio monitoring** via SSE streaming

The architecture demonstrates real blockchain execution on Fraxtal L2, with production-safe security measures and a polished cyberpunk-themed UI.