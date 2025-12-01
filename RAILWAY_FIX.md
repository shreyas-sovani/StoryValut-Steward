# 🚂 Railway Deployment Fix

## Current Issue
Railway backend is returning 502 "Application failed to respond"

## Root Causes
1. **Missing start command** - Railway doesn't know how to start the server
2. **Environment variables** - May not be set correctly
3. **Build process** - TypeScript compilation might be failing
4. **Port binding** - Server might not be listening on Railway's PORT

---

## ✅ Fixes Applied

### 1. Created `Procfile`
```
web: npm run server
```
This tells Railway to run `npm run server` to start the backend.

### 2. Created `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run server",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 3. Updated CORS
Added your Vercel deployment URL to allowed origins:
- `https://story-valut-steward-snmf.vercel.app`

---

## 📋 Railway Dashboard Checklist

### Go to Railway Dashboard → Your Project → Settings

#### 1. Environment Variables
Ensure these are set:
```
GOOGLE_API_KEY=AIzaSyBYE3zSYCZNLKYglEk7oSoYxSXwKWNKoM0
FRAXTAL_RPC_URL=https://rpc.frax.com
PORT=3001
NODE_ENV=production
```

#### 2. Build Settings
- **Build Command:** Leave empty (uses npm install automatically)
- **Start Command:** `npm run server`
- **Root Directory:** Leave empty (uses repo root)

#### 3. Deploy Settings
- **Watch Paths:** Leave as default (deploys on any change)
- **Branch:** `main`

---

## 🚀 Redeploy Steps

### Push Changes to GitHub
```bash
cd "/Users/shreyas/Desktop/storyVault steward"
git add Procfile railway.json src/server.ts
git commit -m "fix: Railway deployment configuration + CORS"
git push origin main
```

### Manual Railway Redeploy
1. Go to Railway Dashboard
2. Click your project
3. Click **Deployments** tab
4. Click **Deploy** button (top right)
5. Select latest commit

### Wait for Build (2-3 minutes)
Watch the build logs in Railway dashboard.

---

## 🔍 Check Railway Logs

### If deployment fails, check logs:

1. **Railway Dashboard** → Your Project → **Deployments**
2. Click the latest deployment
3. View **Build Logs** and **Deploy Logs**

### Common Errors:

#### Error: "Cannot find module"
**Solution:** Dependencies missing. Railway should run `npm install` automatically.

#### Error: "Port already in use"
**Solution:** Check that `PORT` env var is set to `3001`

#### Error: "GOOGLE_API_KEY not found"
**Solution:** Add `GOOGLE_API_KEY` to Railway environment variables

#### Error: TypeScript compilation failed
**Solution:** Railway might not have tsx. Update start command to:
```
npx tsx src/server.ts
```

---

## 🧪 Test Backend After Deploy

```bash
# Health check
curl https://storyvalut-steward-production.up.railway.app/health

# Expected response:
# {"status":"healthy","service":"StoryVault Steward API",...}
```

### If you get 502:
1. Check Railway logs for crash errors
2. Verify environment variables are set
3. Check that server is listening on `process.env.PORT`

---

## 🔗 Test CORS

```bash
# Test preflight from Vercel origin
curl -X OPTIONS \
  -H "Origin: https://story-valut-steward-snmf.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  https://storyvalut-steward-production.up.railway.app/api/chat -v
```

**Expected headers in response:**
```
access-control-allow-origin: https://story-valut-steward-snmf.vercel.app
access-control-allow-credentials: true
access-control-allow-methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

---

## 🎯 Alternative: Check Server Code

The server should bind to Railway's PORT:

```typescript
const port = parseInt(process.env.PORT || "3001");

serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`✅ Server running on http://localhost:${info.port}`);
});
```

This is already correct in `src/server.ts`.

---

## ✅ Success Checklist

- [ ] Procfile created
- [ ] railway.json created
- [ ] CORS updated with Vercel URL
- [ ] Changes pushed to GitHub
- [ ] Railway auto-deployed (or manual deploy triggered)
- [ ] Backend health check returns 200
- [ ] CORS preflight works
- [ ] Vercel frontend connects successfully

---

## 🚨 If Still Failing

### Option 1: Use tsx directly
Update Railway start command to:
```
npx tsx src/server.ts
```

### Option 2: Build TypeScript first
Update `package.json` scripts:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "server": "npm run build && npm start"
  }
}
```

Then Railway build command: `npm run build`
Railway start command: `npm start`

---

## 📞 Railway Support

If none of this works:
1. Check Railway Status: https://status.railway.app/
2. Railway Discord: https://discord.gg/railway
3. Railway Docs: https://docs.railway.app/

**Common Railway Issues:**
- Node.js version mismatch (ensure Node 22+ in Railway settings)
- Missing environment variables
- Build timeout (increase in Railway settings)
- Memory limits (upgrade plan if needed)

---

## 🎉 Once Working

Your architecture will be:
```
Vercel Frontend (https://story-valut-steward-snmf.vercel.app)
    ↓
Railway Backend (https://storyvalut-steward-production.up.railway.app)
    ↓
Fraxtal Mainnet (Chain ID: 252)
```

**Status:** Fixes ready, push and deploy! 🚀
