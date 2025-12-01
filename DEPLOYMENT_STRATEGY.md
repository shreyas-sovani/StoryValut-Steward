# 🚀 Deployment Strategy: Railway + Vercel

## Problem Solved

**Issue:** `@iqai/adk` has ESM/CJS conflicts with `chalk` dependency in Vercel's serverless environment.

**Solution:** Split deployment:
- ✅ **Backend (API):** Railway (handles Node.js dependencies better)
- ✅ **Frontend (Next.js):** Vercel (optimized for Next.js)

---

## ✅ Backend Deployment (Railway)

### Current Status
- 🎯 URL: `https://storyvalut-steward-production.up.railway.app`
- 📍 Port: 3001
- 🔧 Status: **Needs redeployment with CORS fix**

### Steps to Redeploy

1. **Push CORS changes to main:**
```bash
cd "/Users/shreyas/Desktop/storyVault steward"
git add src/server.ts
git commit -m "fix: Update CORS to allow Vercel deployments"
git push origin main
```

2. **Railway will auto-deploy** (if configured) or manually trigger:
   - Go to Railway dashboard
   - Select your project
   - Click "Deploy"

3. **Verify backend is running:**
```bash
curl https://storyvalut-steward-production.up.railway.app/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "service": "StoryVault Steward API",
  "version": "1.0.0",
  "fraxtal": {
    "chain_id": 252,
    "rpc": "https://rpc.frax.com"
  }
}
```

### Railway Environment Variables

Ensure these are set in Railway dashboard:
```
GOOGLE_API_KEY=AIzaSyBYE3zSYCZNLKYglEk7oSoYxSXwKWNKoM0
FRAXTAL_RPC_URL=https://rpc.frax.com
PORT=3001
NODE_ENV=production
```

---

## ✅ Frontend Deployment (Vercel)

### Current Status
- 📁 Directory: `frontend/`
- 🌐 Framework: Next.js 16.0.6
- 🔧 Status: **Ready to deploy**

### Steps to Deploy

#### Option A: Vercel CLI (Recommended)
```bash
# Navigate to frontend
cd "/Users/shreyas/Desktop/storyVault steward/frontend"

# Deploy to production
vercel --prod

# When prompted:
# - Project name: story-vault-steward-frontend
# - Root directory: ./frontend (current directory)
# - Build command: npm run build
# - Output directory: .next
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com/new)
2. Import Git repository
3. **Important:** Set Root Directory to `frontend`
4. Framework Preset: **Next.js**
5. Build Command: `npm run build` (auto-detected)
6. Output Directory: `.next` (auto-detected)
7. Install Command: `npm install` (auto-detected)

### Vercel Environment Variables

Add this in Vercel dashboard (Settings → Environment Variables):

```
NEXT_PUBLIC_API_URL=https://storyvalut-steward-production.up.railway.app
```

**Important:** This tells the frontend where to find the backend API.

---

## 🔍 Verification Steps

### 1. Test Backend (Railway)
```bash
# Health check
curl https://storyvalut-steward-production.up.railway.app/health

# Simple chat test
curl -X POST https://storyvalut-steward-production.up.railway.app/api/chat/simple \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, test backend"}'
```

### 2. Test Frontend (Vercel)
1. Open your Vercel URL (e.g., `https://story-vault-steward-frontend.vercel.app`)
2. Open browser DevTools → Network tab
3. Send a chat message
4. Verify API calls go to Railway backend:
   - Request URL should be: `https://storyvalut-steward-production.up.railway.app/api/chat`
   - Response should stream successfully

### 3. Test CORS
```bash
# Test from frontend domain
curl -H "Origin: https://your-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://storyvalut-steward-production.up.railway.app/api/chat
```

**Expected headers in response:**
- `Access-Control-Allow-Origin: https://your-frontend.vercel.app`
- `Access-Control-Allow-Credentials: true`

---

## 📝 Updated CORS Configuration

The backend now accepts:
- ✅ `http://localhost:3000` (local development)
- ✅ `http://localhost:5173` (Vite dev server)
- ✅ `https://*.vercel.app` (any Vercel deployment)
- ✅ `https://story-valut-steward.vercel.app` (your production domain)
- ✅ Requests with no origin (curl, Postman, mobile apps)

---

## 🚨 Troubleshooting

### Backend: Railway 502 Error
**Problem:** Application failed to respond

**Solutions:**
1. Check Railway logs for crash errors
2. Verify `PORT` env variable is set to `3001`
3. Ensure `GOOGLE_API_KEY` is set
4. Check build logs for dependency errors
5. Verify Node.js version: `>=22.0.0`

### Frontend: API Connection Failed
**Problem:** CORS or network errors

**Solutions:**
1. Verify `NEXT_PUBLIC_API_URL` in Vercel env vars
2. Check browser console for CORS errors
3. Test backend health endpoint directly
4. Ensure Railway backend is running

### Frontend: Build Failed on Vercel
**Problem:** "Cannot find module" or path errors

**Solutions:**
1. Ensure Root Directory is set to `frontend` in Vercel
2. Check that `frontend/package.json` exists
3. Verify all dependencies are in `frontend/node_modules`

---

## ✅ Final Architecture

```
User Browser
    ↓
Vercel (Frontend)
    ↓ API calls to NEXT_PUBLIC_API_URL
Railway (Backend API)
    ↓ Blockchain calls
Fraxtal Mainnet (Chain ID: 252)
```

**Advantages:**
- ✅ No ESM/CJS conflicts (Railway handles dependencies better)
- ✅ Fast frontend (Vercel's CDN)
- ✅ Scalable backend (Railway auto-scaling)
- ✅ Separate deployments (frontend/backend can be updated independently)

---

## 📌 Next Steps

1. **Push CORS changes:**
   ```bash
   git add src/server.ts frontend/.env.production
   git commit -m "fix: CORS for Vercel + production env"
   git push origin main
   ```

2. **Wait for Railway to redeploy** (or manually trigger)

3. **Deploy frontend to Vercel:**
   ```bash
   cd frontend && vercel --prod
   ```

4. **Test end-to-end:**
   - Open Vercel URL
   - Send a chat message
   - Verify response streams correctly

5. **Update README** with new deployment URLs

---

## 🎉 Success Criteria

- ✅ Railway backend responds to `/health`
- ✅ Vercel frontend loads without errors
- ✅ Chat messages stream from Railway to Vercel
- ✅ No CORS errors in browser console
- ✅ Fraxtal balance checks work
- ✅ Visual Intelligence charts display

**Status:** Ready to deploy! 🚀
