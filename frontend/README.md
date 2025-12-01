# 🎨 StoryVault Steward Frontend

Beautiful dark-mode React frontend for the StoryVault Steward AI agent.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icon library
- **SSE Streaming** - Real-time AI responses

## 🎯 Features

### 💬 Chat Interface
- Real-time streaming responses via SSE
- Persistent conversation history
- Session management
- Example prompts for quick start
- Loading states and error handling

### 🏦 Vault Card Display
- Beautiful strategy visualization
- Protocol, APR, risk level, and allocation stats
- Transaction details with block explorer links
- Direct links to ATP dashboard

### 🎨 Design System
- **Dark Mode**: Deep space theme (#030014 background)
- **Purple Gradient**: Primary actions and borders (#8B5CF6)
- **Gold Accents**: Success states and highlights (#F59E0B)
- **Glass Morphism**: Backdrop blur effects
- **Custom Scrollbars**: Themed scrollbars matching purple palette

## 🛠️ Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local`:
```properties
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:3000**

---

**Built with 💜 for the Fraxtal Hackathon**
