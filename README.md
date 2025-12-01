# 🏛️ StoryVault Steward

A DeFi advisor agent that analyzes users' life stories to recommend personalized yield strategies on the Fraxtal network.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 22.0.0

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

1. Copy the `.env` file and add your API key:
```bash
GOOGLE_API_KEY=your_google_api_key_here
FRAXTAL_RPC_URL=https://rpc.frax.com
```

### Run

```bash
npm start
```

## 🎯 Features

- **Story Analysis**: Share your financial story and get personalized recommendations
- **Real-time Yields**: Fetches current APY for sFRAX and sfrxETH on Fraxtal
- **Risk Profiling**: Intelligent matching of strategies to user risk tolerance
- **Interactive CLI**: Chat-based interface for natural conversations

## 🛠️ Tech Stack

- **ADK**: AI agent framework with tool integration
- **Fraxtal L2**: High-yield DeFi strategies on Frax's Layer 2
- **Viem**: Ethereum blockchain interactions
- **TypeScript**: Type-safe development

## 📋 Available Strategies

- **sFRAX**: ~4.5% APY - Low risk, stablecoin yield
- **sfrxETH**: ~3.8% APY - Medium risk, ETH liquid staking

## 🏗️ Project Structure

```
storyvault-steward/
├── src/
│   ├── index.ts          # Main agent runner with CLI
│   └── tools/
│       └── fraxTools.ts  # Fraxtal yield tools
├── project_context/      # Specification files
├── package.json
└── .env                  # Environment configuration
```

## 🌐 Fraxtal Network

- **Chain ID**: 252
- **RPC**: https://rpc.frax.com
- **Explorer**: https://fraxscan.com

## 📝 License

MIT
