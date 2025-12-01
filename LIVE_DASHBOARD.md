# 🎯 Live Stewardship Dashboard

## Overview

The **Live Stewardship Dashboard** transforms StoryVault Steward from a simple chatbot into an active, 24/7 monitoring system that watches over your DeFi vaults on Fraxtal. When monitoring is activated, the UI dynamically shifts from chat mode to a real-time dashboard showing live yield alerts, APY graphs, and autonomous stewardship status.

---

## 🎨 User Experience Flow

### 1. **Initial State: Chat Interface**
- User describes their life story and financial goals
- Agent recommends a personalized DeFi strategy
- VaultCard displays strategy visualization with pie charts

### 2. **Deployment: Strategy Preview**
- User receives vault recommendation (sFRAX stable or sFRAX+sfrxETH balanced)
- Portfolio composition shown as interactive pie chart
- Two action buttons appear:
  - **"Deploy to ATP Platform"** → Opens IQ AI platform for actual deployment
  - **"Hire Steward (Stake IQ)"** → Activates autonomous monitoring

### 3. **Activation: Hire Steward**
- User clicks "Hire Steward (Stake IQ)" button
- System sends message: *"I have deployed the vault. I am now staking IQ to hire you as my Steward. Begin monitoring."*
- Agent calls `start_monitoring_loop` tool

### 4. **Live Mode: Active Dashboard**
- **Header changes**:
  - Pulsing green badge: "🟢 Live Monitoring sFRAX"
  - Alert banner shows current APY vs target
- **Chat continues streaming monitoring events**:
  - `⚠️ YIELD ALERT` (red banner) for critical drops (>0.5%)
  - `📊 Monitoring Update` (blue banner) for periodic status
  - `✅ Yield Recovered` (green banner) when bouncing back
- **VaultCard transforms**:
  - Shows "Live Monitor Mode" UI state
  - (Future: Real-time APY line chart)

---

## 🔧 Technical Architecture

### Frontend Components

#### **1. ChatInterface.tsx**

**Key State:**
```typescript
const [monitoring, setMonitoring] = useState<MonitoringData>({
  active: boolean;          // Is monitoring currently running?
  asset: string;            // "sFRAX" or "sfrxETH"
  currentYield: number;     // Latest APY value
  targetYield: number;      // Initial target APY
  yieldHistory: Array<{     // For line charts
    timestamp: number;
    yield: number;
  }>;
  lastAlert?: {             // Most recent alert
    type: "yield_alert" | "yield_recovered" | "monitoring_update";
    message: string;
    severity: "info" | "warning" | "critical";
    timestamp: string;
  };
});
```

**Event Detection Function:**
```typescript
const detectMonitoringEvent = (content: string) => {
  // Stewardship Mode activation
  if (content.includes("🛡️") && content.includes("Stewardship Mode Activated")) {
    // Parse asset and target APY, initialize monitoring state
  }
  
  // Yield alerts
  if (content.includes("⚠️") || content.includes("YIELD ALERT")) {
    // Parse current APY, add to history, set severity to "critical"
  }
  
  // Yield recovery
  if (content.includes("✅") && content.includes("Recovered")) {
    // Update APY, mark severity as "info"
  }
  
  // Monitoring updates
  if (content.includes("📊") && content.includes("Monitoring Update")) {
    // Parse APY, add to history
  }
};
```

**UI Changes:**
- **Header Badge**: Shows when `monitoring.active === true`
- **Alert Banner**: Displays `monitoring.lastAlert` with color-coded severity
- **Event Listener**: Listens for `hireSteward` custom event from VaultCard button

#### **2. VaultCard.tsx**

**New Props:**
```typescript
interface VaultCardProps {
  vaultData: VaultDeployment | null;
  isLoading?: boolean;
  onHireSteward?: () => void;  // Callback to activate monitoring
}
```

**New Button:**
```tsx
{onHireSteward && (
  <button
    onClick={onHireSteward}
    className="bg-gradient-to-r from-green-600 to-emerald-600 ..."
  >
    <CheckCircle2 className="w-5 h-5" />
    <span>Hire Steward (Stake IQ)</span>
    <span className="text-xs">Start Monitoring</span>
  </button>
)}
```

**Button Behavior:**
- Only appears when `vaultData` is present (strategy recommended)
- Clicking dispatches `hireSteward` custom event
- Event triggers ChatInterface to send monitoring activation message

#### **3. page.tsx**

**State Management:**
```typescript
const [vaultData, setVaultData] = useState(null);
const [monitoring, setMonitoring] = useState<any>(null);

const handleHireSteward = () => {
  window.dispatchEvent(
    new CustomEvent("hireSteward", {
      detail: { 
        message: "I have deployed the vault. I am now staking IQ to hire you as my Steward. Begin monitoring."
      },
    })
  );
};
```

**Prop Passing:**
- `ChatInterface` receives `onMonitoringUpdate` callback
- `VaultCard` receives `onHireSteward` callback (only when `vaultData` exists)
- Right panel subtitle dynamically shows monitoring status

---

### Backend Integration

#### **Agent Response Format**

The backend agent (`src/agent.ts`) emits monitoring events in the following formats:

**1. Activation Message:**
```
🛡️ **Stewardship Mode Activated**

I am now your dedicated Steward, monitoring your sFRAX vault 24/7.

**Current Status:**
- Asset: sFRAX
- Target APY: 4.5%
- Current APY: 4.48%
- Status: ✅ Healthy

I will alert you immediately if yields drop below your target threshold.
```

**2. Yield Alert (Critical):**
```
⚠️ **YIELD ALERT - CRITICAL**

sFRAX yield has dropped to 4.15% (down 0.35% from target 4.5%)

**Recommendation:** Consider rebalancing to sfrxETH for higher returns, or wait for sFRAX to recover.
```

**3. Monitoring Update (Periodic):**
```
📊 **Monitoring Update**

sFRAX APY: **4.42%** (Target: 4.5%)
Status: Slightly below target, monitoring closely.
```

**4. Yield Recovery:**
```
✅ **Yield Recovered**

sFRAX has bounced back to 4.52%! Your vault is now above the target APY.
```

#### **Tool: start_monitoring_loop**

Located in `src/tools/monitorTool.ts`:

```typescript
const start_monitoring_loop = tool({
  description: "Activate continuous monitoring of Fraxtal vault yields",
  parameters: z.object({
    asset: z.enum(["sFRAX", "sfrxETH"]),
    targetYield: z.number().min(0).max(100),
    duration: z.number().optional().default(60),
  }),
  execute: async ({ asset, targetYield, duration }, { emit }) => {
    // Monitoring loop runs every 5 seconds
    const intervalId = setInterval(async () => {
      // Simulate yield fluctuation
      const currentYield = targetYield + (Math.random() - 0.5) * 0.4;
      
      // Check for drops
      const drop = targetYield - currentYield;
      if (drop > 0.5) {
        emit({
          type: "monitoring_alert",
          severity: "critical",
          asset,
          apy: currentYield,
          change: drop,
        });
      }
    }, 5000);
    
    // Stop after duration
    setTimeout(() => clearInterval(intervalId), duration * 60 * 1000);
  },
});
```

**Event Flow:**
1. User clicks "Hire Steward" → Frontend sends message
2. Agent receives message → Calls `start_monitoring_loop`
3. Tool starts 5-second interval loop → Checks yields
4. Yield drops detected → Tool emits events via SSE
5. ChatInterface receives SSE events → Parses with `detectMonitoringEvent`
6. UI updates → Badge, banner, and history state updated

---

## 🎨 Visual Design

### Color Coding

| Severity | Color | Use Case |
|----------|-------|----------|
| **Critical** | Red (`bg-red-500/10`, `border-red-500/50`) | Yield drops >0.5% |
| **Warning** | Yellow (`bg-yellow-500/10`, `border-yellow-500/50`) | Yield drops 0.3-0.5% |
| **Info** | Blue (`bg-blue-500/10`, `border-blue-500/50`) | Periodic updates |
| **Success** | Green (`bg-green-500/10`, `border-green-500/50`) | Yield recovered |

### Live Badge

```tsx
{monitoring.active && (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50">
    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    <span className="text-sm font-medium text-green-400">
      Live Monitoring {monitoring.asset}
    </span>
    <Activity className="w-4 h-4 text-green-400" />
  </div>
)}
```

### Alert Banner

```tsx
{monitoring.lastAlert && (
  <div className={cn(
    "mt-4 px-4 py-3 rounded-lg border",
    monitoring.lastAlert.severity === "critical"
      ? "bg-red-500/10 border-red-500/50 text-red-300"
      : "bg-blue-500/10 border-blue-500/50 text-blue-300"
  )}>
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <div className="text-sm font-medium">⚠️ Yield Alert</div>
        <div className="text-sm opacity-90">
          Current APY: {monitoring.currentYield.toFixed(2)}%
        </div>
      </div>
      <div className="text-xs opacity-70">
        {new Date(monitoring.lastAlert.timestamp).toLocaleTimeString()}
      </div>
    </div>
  </div>
)}
```

---

## 🧪 Testing Guide

### Local Testing

1. **Start Backend:**
   ```bash
   cd /Users/shreyas/Desktop/storyVault\ steward
   npm run server
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Flow:**
   - Open http://localhost:3000
   - Enter: "I want a stable sFRAX vault"
   - Wait for strategy recommendation
   - Click "Hire Steward (Stake IQ)"
   - Observe:
     - Message sent: "I have deployed the vault..."
     - Agent responds with "🛡️ Stewardship Mode Activated"
     - Green badge appears: "🟢 Live Monitoring sFRAX"
     - Monitoring events stream in (alerts, updates, recoveries)

### Production Testing

**Frontend:** https://story-valut-steward-snmf.vercel.app
**Backend:** https://storyvalut-steward-production.up.railway.app (⚠️ Currently 502 errors)

**Known Issue:** Railway backend is not responding. Need to debug:
- Check Railway logs for build/runtime errors
- Verify environment variables: `GOOGLE_API_KEY`, `PORT=3001`
- Test health endpoint: `curl https://storyvalut-steward-production.up.railway.app/health`

---

## 🚀 Future Enhancements

### Phase 7: Advanced Monitoring

1. **Real-Time APY Graph**
   - Add Recharts `LineChart` to VaultCard
   - Plot `monitoring.yieldHistory` data
   - X-axis: timestamps, Y-axis: APY %
   - Show target line as reference

2. **Multiple Asset Monitoring**
   - Support monitoring both sFRAX and sfrxETH simultaneously
   - Show dual-asset dashboard with separate graphs

3. **Historical Alerts**
   - Add "Alert History" panel in VaultCard
   - Show list of past alerts with severity badges
   - Allow filtering by severity level

4. **Custom Alert Thresholds**
   - Let users set custom alert thresholds (e.g., "Alert me if APY drops >0.3%")
   - Store preferences in localStorage
   - Pass to `start_monitoring_loop` tool

5. **Mobile Notifications**
   - Integrate push notifications (e.g., Firebase Cloud Messaging)
   - Send critical alerts to user's phone
   - Add "Enable Notifications" button

6. **Monitoring Dashboard Page**
   - Create dedicated `/dashboard` route
   - Full-screen monitoring view with multiple vaults
   - Grid layout showing all active monitoring sessions

---

## 📝 Code Summary

### Modified Files

1. **frontend/components/ChatInterface.tsx** (~540 lines)
   - Added `MonitoringData` interface
   - Added `monitoring` state management
   - Added `detectMonitoringEvent` function
   - Added live badge and alert banner in header
   - Added `hireSteward` event listener
   - Added `onMonitoringUpdate` callback prop

2. **frontend/components/VaultCard.tsx** (~300 lines)
   - Added `onHireSteward` prop
   - Added "Hire Steward (Stake IQ)" button
   - Updated info box to mention stewardship

3. **frontend/app/page.tsx** (~80 lines)
   - Added `monitoring` state
   - Added `handleHireSteward` function
   - Passed `onMonitoringUpdate` to ChatInterface
   - Passed `onHireSteward` to VaultCard
   - Updated right panel subtitle to show monitoring status

### Backend Files (From Phase 6)

4. **src/tools/monitorTool.ts** (420 lines)
   - `start_monitoring_loop` tool with Zod schema
   - 5-second interval monitoring loop
   - Alert thresholds: >0.5% critical, >0.3% warning
   - Simulated yield fluctuations
   - Event emission via SSE

5. **src/agent.ts** (Updated)
   - Imported `start_monitoring_loop`
   - Added tool to `.withTools()`
   - Added STEWARDSHIP PHASE instructions

---

## 🎯 Key Features

### ✅ Completed

- [x] Autonomous monitoring system (backend)
- [x] Real-time event detection (frontend)
- [x] Live badge with pulsing animation
- [x] Alert banner with severity color coding
- [x] "Hire Steward" button integration
- [x] Custom event communication (VaultCard → ChatInterface)
- [x] Monitoring state management
- [x] Parent component updates (page.tsx)
- [x] TypeScript type safety (no errors)

### 🚧 In Progress

- [ ] Fix Railway backend 502 errors (blocking end-to-end testing)
- [ ] Add APY line chart visualization
- [ ] Test monitoring flow with real backend

### 📋 Planned

- [ ] Alert history panel
- [ ] Custom threshold settings
- [ ] Mobile push notifications
- [ ] Multi-vault monitoring dashboard

---

## 🎉 Impact

The Live Stewardship Dashboard represents a **paradigm shift** in DeFi user experience:

1. **From Reactive → Proactive**: Users don't need to constantly check yields; the Steward watches 24/7
2. **From Static → Dynamic**: UI transforms based on monitoring state, providing real-time visibility
3. **From Chatbot → Agent**: The system becomes an active participant, not just a recommendation engine
4. **From Manual → Autonomous**: Users "hire" the agent once, then relax while it monitors

This feature positions StoryVault Steward as a true **AI-powered DeFi co-pilot**, not just a strategy recommender. It's the bridge between traditional finance (set-and-forget) and DeFi (constant monitoring required).

---

## 📚 References

- **Recharts Documentation**: https://recharts.org/en-US/api/LineChart
- **ADK Event Emission**: `src/tools/monitorTool.ts` line 150-180
- **SSE Protocol**: `frontend/lib/api.ts` `sendChatMessage` function
- **Fraxtal Yields**: https://app.frax.finance/fraxtal
- **IQ AI Platform**: https://app.iqai.com/

---

## 🏆 Hackathon Demo Script

**Opening (30 seconds):**
> "Meet StoryVault Steward - your AI DeFi curator on Fraxtal. Unlike other bots, it doesn't just recommend strategies... it becomes your 24/7 vault guardian."

**Demo (90 seconds):**
1. Share life story: "I'm a teacher, saving for a house in 3 years, risk-averse"
2. Agent analyzes: Recommends 100% sFRAX stable vault (4.5% APY)
3. Show strategy visualization: Pie chart, portfolio composition
4. Click "Hire Steward (Stake IQ)"
5. **UI TRANSFORMATION**: Green badge appears "🟢 Live Monitoring sFRAX"
6. Agent starts monitoring: "🛡️ Stewardship Mode Activated"
7. Simulate yield drop: Alert banner turns red "⚠️ YIELD ALERT - CRITICAL"
8. Agent auto-recommends: "Consider rebalancing or wait for recovery"

**Closing (30 seconds):**
> "That's the power of StoryVault Steward. It doesn't just deploy vaults - it lives with you, watches over them, and acts as your personal DeFi guardian. Built on Fraxtal, powered by IQ AI."

**Tech Highlights:**
- Real-time SSE streaming
- Autonomous monitoring loop (5-second intervals)
- Dynamic UI state management
- Visual Intelligence (Recharts)
- Story-based onboarding

---

**Built with ❤️ for the Fraxtal + IQ AI Hackathon**
