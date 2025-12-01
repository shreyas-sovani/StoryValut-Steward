# ESM Configuration & Vercel Deployment Guide

## ✅ Fixed ESM/CJS Conflicts

### Problem
The Vercel deployment was failing with `Error [ERR_REQUIRE_ESM]: require() of ES Module...` because the project wasn't properly configured for strict ES Modules.

### Solution Implemented

#### 1. **tsconfig.json** - Strict ESM TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",           // Modern JS target
    "module": "NodeNext",          // ✅ Use NodeNext for proper ESM
    "moduleResolution": "NodeNext", // ✅ Resolve imports as ESM
    "esModuleInterop": true,       // ✅ Allow default imports
    // ... other settings
  }
}
```

**Key Changes:**
- ✅ `module: "NodeNext"` - Enforces ESM with proper `import`/`export`
- ✅ `moduleResolution: "NodeNext"` - Resolves packages correctly for Node.js ESM
- ✅ Maintains `esModuleInterop: true` for compatibility

#### 2. **package.json** - ESM Package Configuration
```json
{
  "type": "module",              // ✅ Treat all .js as ES Modules
  "main": "dist/server.js",      // ✅ Point to compiled output
  "scripts": {
    "build": "tsc",              // ✅ Compile TypeScript to dist/
    "server:prod": "node dist/server.js", // ✅ Run compiled code
    // ... other scripts
  }
}
```

**Key Changes:**
- ✅ `"type": "module"` - Already present, now enforced
- ✅ Added `build` script for TypeScript compilation
- ✅ Updated `main` to point to compiled output

#### 3. **src/server.ts** - Vercel Serverless Exports
```typescript
// Existing Hono app and serve() call...

// ✅ Export handlers for Vercel Edge/Serverless deployment
export default app;
export const GET = app.fetch;
export const POST = app.fetch;
export const DELETE = app.fetch;
// ... other HTTP methods
```

**Key Changes:**
- ✅ Added Vercel-compatible named exports (GET, POST, etc.)
- ✅ Export default app for Vercel to handle routing
- ✅ Maintains local dev server using `serve()`

#### 4. **vercel.json** - Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["src/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
```

**Configuration:**
- ✅ Uses `@vercel/node` builder for Node.js runtime
- ✅ Routes all requests to server.ts
- ✅ Includes all source files for compilation

#### 5. **.vercelignore** - Exclude Unnecessary Files
```
node_modules/
.env
test-*.ts
*.md
!README.md
frontend/
```

**Excludes:**
- ✅ Development files (node_modules, .env)
- ✅ Test files
- ✅ Frontend (deployed separately)

---

## 🚀 Deployment Instructions

### Local Testing
```bash
# 1. Build TypeScript
npm run build

# 2. Test compiled output
npm run server:prod

# 3. Verify at http://localhost:3001/health
```

### Vercel Deployment (Backend API)

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd "/Users/shreyas/Desktop/storyVault steward"
vercel --prod

# Set environment variables
vercel env add GOOGLE_API_KEY
vercel env add FRAXTAL_RPC_URL
vercel env add ATP_API_KEY
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import Git repository
3. Framework Preset: **Other**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Install Command: `npm install`
7. Add Environment Variables:
   - `GOOGLE_API_KEY` (required)
   - `FRAXTAL_RPC_URL` (optional, defaults to https://rpc.frax.com)
   - `ATP_API_KEY` (required for ATP deployments)
8. Deploy

### Frontend Deployment (Separate)
The Next.js frontend should be deployed separately:

```bash
cd frontend
vercel --prod
```

**Environment Variables for Frontend:**
- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., https://api.storyvault.vercel.app)

---

## 🔍 Verification

### Test Deployed Backend
```bash
# Health check
curl https://your-backend.vercel.app/health

# Chat endpoint
curl -X POST https://your-backend.vercel.app/api/chat/simple \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, I need DeFi advice"}'
```

### Test Frontend → Backend Connection
1. Open deployed frontend URL
2. Send a message in chat
3. Verify response streams correctly
4. Check browser console for API errors

---

## 📝 Build Output

After running `npm run build`, you should see:
```
dist/
├── agent.js
├── cli.js
├── index.js
├── server.js
└── tools/
    ├── fraxTools.js
    ├── realAtpTool.js
    └── walletTool.js
```

All `.js` files will have ES Module syntax (`import`/`export`) and `.js` extensions for proper Node.js ESM support.

---

## ⚠️ Common Issues

### Issue: "Cannot find module" in Vercel
**Solution:** Ensure all imports use `.js` extensions:
```typescript
// ✅ Correct
import { something } from "./file.js";

// ❌ Wrong
import { something } from "./file";
```

### Issue: "require() of ES Module"
**Solution:** Ensure `"type": "module"` is in package.json and dependencies support ESM.

### Issue: Vercel timeout
**Solution:** Increase timeout in vercel.json:
```json
{
  "functions": {
    "src/server.ts": {
      "maxDuration": 60
    }
  }
}
```

---

## ✅ Result

- ✅ TypeScript compiles to proper ES Modules
- ✅ Vercel can deploy without ESM/CJS conflicts
- ✅ Local development still works (`npm run server`)
- ✅ Production builds work (`npm run server:prod`)
- ✅ All imports properly resolved with `.js` extensions

**Status:** Ready for Vercel deployment! 🎉
