# 🚀 StoryVault Steward - Quick Start Guide

## ✅ Project Status: READY TO RUN

Your StoryVault Steward agent is fully scaffolded and ready for the hackathon!

## 📁 Project Structure

```
storyvault-steward/
├── src/
│   ├── index.ts              # Main agent with CLI runner ✅
│   └── tools/
│       └── fraxTools.ts      # Fraxtal yield tool ✅
├── project_context/          # Specifications
│   ├── adk_spec.md          # ADK patterns
│   └── fraxtal_spec.md      # Fraxtal network details
├── package.json             # ✅ All dependencies installed
├── tsconfig.json            # ✅ TypeScript config
├── .env.example             # Environment template
├── .env                     # Your config (add API key!)
├── .gitignore              # Git exclusions
└── README.md               # Full documentation
```

## 🔧 Next Steps

### 1. Add Your Google API Key
Edit `.env` and add your API key:
```bash
GOOGLE_API_KEY=your_actual_api_key_here
```

Get a free key at: https://aistudio.google.com/app/apikey

### 2. Run the Agent
```bash
npm start
```

### 3. Test the Agent
Try these prompts:
- "I'm a recent college grad, need safe savings for emergencies"
- "I'm 45, have $50k to invest, moderate risk tolerance"
- "What are the current yields on Fraxtal?"

## 🏗️ Architecture

### Agent Pattern (ADK Compliant)
- ✅ Uses `AgentBuilder.create()` fluent API
- ✅ Gemini 2.0 Flash model
- ✅ Tool integration with `createTool()`
- ✅ No legacy class instantiation

### Tool: get_frax_yields
- Returns mock APY data for sFRAX (~4.5%) and sfrxETH (~3.8%)
- References Fraxtal mainnet contracts
- Ready to expand with real on-chain data via viem

### Agent Behavior
- Analyzes user life stories
- Determines risk profile
- Calls yield tool automatically
- Recommends strategies:
  - **Low Risk**: sFRAX stablecoin yield
  - **Medium Risk**: sfrxETH liquid staking

## 🎯 Hackathon Features

✅ Compiles without errors
✅ Follows ADK spec exactly
✅ Interactive CLI
✅ DeFi yield recommendations
✅ Fraxtal integration ready
✅ Fast execution with tsx

## 🔥 Demo Flow

1. Start: `npm start`
2. User shares their story
3. Agent analyzes risk profile
4. Tool fetches current yields
5. Personalized recommendation delivered
6. User can continue conversation

## 📊 Current Yields (Mocked)

- **sFRAX**: 4.5% APY (Low Risk)
- **sfrxETH**: 3.8% APY (Medium Risk)

## 🚀 Future Enhancements

- [ ] Real on-chain data via viem + Fraxtal RPC
- [ ] Transaction execution
- [ ] Multi-strategy portfolio building
- [ ] Historical yield tracking
- [ ] Risk scoring algorithm

## 💡 Tech Stack

- **ADK**: AI agent framework
- **Gemini 2.0**: LLM model
- **Zod**: Schema validation
- **Viem**: Blockchain integration
- **TypeScript**: Type safety
- **Fraxtal L2**: DeFi yields

## 🎉 You're Ready!

All systems go. Add your API key and run `npm start` to launch your agent!

---

Built for speed. Optimized for hackathons. 🚀
