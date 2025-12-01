# 🏛️ StoryVault Steward

A DeFi advisor agent that analyzes users' life stories to recommend personalized yield strategies on the Fraxtal network. **Now with a beautiful web interface!**

## 🚀 Quick Start

### Prerequisites
- Node.js >= 22.0.0

### Installation

```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..
```

### Configuration

1. Create `.env` file with your API key:
```bash
GOOGLE_API_KEY=your_google_api_key_here
FRAXTAL_RPC_URL=https://rpc.frax.com
ATP_WALLET_PRIVATE_KEY=your_wallet_private_key  # Optional
```

2. Frontend is pre-configured in `frontend/.env.local`

### Run

#### 🌐 Web Interface (Recommended)
Start both API server and frontend:
```bash
./start-dev.sh
```
Then open **http://localhost:3000** in your browser!

#### 💻 CLI Mode
```bash
npm start
```

#### 🔧 API Server Only
```bash
npm run server
```

## 🎯 Features

### Phase 5: Web Interface ✨ NEW!
- **Real-time Chat**: SSE streaming for instant AI responses
- **Dark Mode UI**: Beautiful purple/gold DeFi aesthetic
- **Vault Display**: Visual representation of deployed strategies
- **Session Management**: Persistent conversation history
- **Split View**: Chat on left, vault details on right

### Core Features
- **Story Analysis**: Share your financial story and get personalized recommendations
- **Real-time Yields**: Fetches current APY for sFRAX and sfrxETH on Fraxtal
- **ATP Integration**: Deploy strategies directly to Frax's Autonomous Tokenized Portfolio
- **Risk Profiling**: Intelligent matching of strategies to user risk tolerance
- **Three Interfaces**: Web UI, REST API, or Terminal CLI

## 🛠️ Tech Stack

### Backend
- **ADK-TS**: AI agent framework with tool integration
- **Hono**: Lightweight web framework for API
- **Viem**: Ethereum blockchain interactions
- **TypeScript**: Type-safe development

### Frontend
- **Next.js 14**: React with App Router
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Beautiful icons
- **SSE**: Real-time streaming

### Blockchain
- **Fraxtal L2**: High-yield DeFi strategies on Frax's Layer 2
- **Real Contracts**: Direct on-chain data fetching

## 📋 Available Strategies

- **sFRAX**: ~4.5% APY - Low risk, stablecoin yield
- **sfrxETH**: ~3.8% APY - Medium risk, ETH liquid staking

## 🏗️ Project Structure

```
storyvault-steward/
├── src/
│   ├── agent.ts          # Exportable agent configuration
│   ├── cli.ts            # Terminal interface
│   ├── server.ts         # REST API with SSE streaming
│   └── tools/
│       ├── fraxTools.ts      # Fraxtal yield data
│       └── realAtpTool.ts    # ATP deployment
├── frontend/             # Next.js web interface
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx # Chat UI with SSE
│   │   └── VaultCard.tsx     # Vault display
│   └── lib/
│       ├── api.ts            # API client
│       └── utils.ts          # Utilities
├── project_context/      # Specification files
├── start-dev.sh          # Startup script
└── package.json
```

## 🌐 Fraxtal Network

- **Chain ID**: 252
- **RPC**: https://rpc.frax.com
- **Explorer**: https://fraxscan.com
- **ATP Dashboard**: https://app.iqai.com/

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/chat` | Chat with SSE streaming |
| POST | `/api/chat/simple` | Chat without streaming |
| GET | `/api/sessions` | List active sessions |
| DELETE | `/api/session/:id` | Delete a session |

## 🎨 Screenshots

### Web Interface
- **Split View**: Chat interface on left, vault card on right
- **Dark Theme**: Deep space background with purple/gold accents
- **Real-time Streaming**: Watch AI responses appear in real-time
- **Example Prompts**: Quick start with pre-built scenarios

## 📚 Documentation

- [Backend README](./PHASE_5_BACKEND_COMPLETE.md) - API server details
- [Frontend README](./frontend/README.md) - Frontend setup and components
- [ADK Spec](./project_context/adk_spec.md) - Agent framework documentation
- [Fraxtal Spec](./project_context/fraxtal_spec.md) - Fraxtal integration details

## � Deployment

### Backend
Deploy the API server to any Node.js hosting:
```bash
npm run server
```

### Frontend
Deploy to Vercel (recommended):
```bash
cd frontend
vercel deploy
```

Set environment variable: `NEXT_PUBLIC_API_URL=your-api-url`

## 🧪 Testing

### Manual Testing Flow
1. Start both servers: `./start-dev.sh`
2. Open http://localhost:3000
3. Enter a life story prompt
4. Watch streaming response
5. See vault card populate when strategy deploys

### Example Prompts
```
"I'm a 28-year-old teacher saving for a house in 3 years. Risk-averse."
"College student, 21, learning about DeFi. Want safe yields."
"Entrepreneur, 35, high risk tolerance. Looking for growth."
```

## 🏆 Development Phases

- ✅ **Phase 1**: Basic scaffolding with ADK
- ✅ **Phase 2**: Real Fraxtal blockchain integration
- ✅ **Phase 3**: ATP deployment simulation
- ✅ **Phase 4**: Real ATP integration + wallet verification
- ✅ **Phase 5**: REST API + Web Interface

## �📝 License

MIT

---

**Built with 💜 for the Fraxtal Hackathon**
