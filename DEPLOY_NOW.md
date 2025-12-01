# 🎯 Quick Deployment Checklist

## ✅ What's Done

1. ✅ **CORS Fixed** - Backend now accepts Vercel origins
2. ✅ **Railway Backend** - Deployed at `https://storyvalut-steward-production.up.railway.app`
3. ✅ **Code Pushed** - Latest changes on GitHub main branch
4. ✅ **Production Env** - Frontend configured for Railway backend

---

## 🚀 Deploy Now

### Step 1: Verify Railway Backend (Wait 2-3 minutes for auto-deploy)

```bash
# Test health endpoint
curl https://storyvalut-steward-production.up.railway.app/health
```

**Expected:** `{"status":"healthy",...}`

If you get 502, check Railway logs and redeploy manually.

---

### Step 2: Deploy Frontend to Vercel

```bash
cd "/Users/shreyas/Desktop/storyVault steward/frontend"
vercel --prod
```

**When prompted:**
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N** (first time) or **Y** (if exists)
- What's your project's name? **story-vault-steward-frontend**
- In which directory is your code located? **.**  (current directory)

---

### Step 3: Set Vercel Environment Variable

**In Vercel Dashboard:**
1. Go to your project → Settings → Environment Variables
2. Add:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://storyvalut-steward-production.up.railway.app
   Environment: Production
   ```
3. Click "Save"
4. Redeploy (Deployments → ... → Redeploy)

**Or via CLI:**
```bash
cd frontend
vercel env add NEXT_PUBLIC_API_URL
# Paste: https://storyvalut-steward-production.up.railway.app
# Select: Production
```

---

## 🧪 Test Deployment

### 1. Test Backend
```bash
curl -X POST https://storyvalut-steward-production.up.railway.app/api/chat/simple \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

### 2. Test Frontend
- Open: Your Vercel URL
- Send message: "I'm 25, need DeFi help"
- Check: Response streams correctly

---

## ⚠️ If Railway Returns 502

Your Railway deployment might not have started yet. Check:

1. **Railway Dashboard:**
   - Go to project
   - Check "Deployments" tab
   - Ensure latest commit is deployed
   - Check logs for errors

2. **Environment Variables in Railway:**
   ```
   GOOGLE_API_KEY=AIzaSyBYE3zSYCZNLKYglEk7oSoYxSXwKWNKoM0
   FRAXTAL_RPC_URL=https://rpc.frax.com
   PORT=3001
   NODE_ENV=production
   ```

3. **Manual Redeploy:**
   - Railway Dashboard → Your Service → Deploy → Redeploy

---

## 📱 Final URLs

- **Backend API:** `https://storyvalut-steward-production.up.railway.app`
- **Frontend:** `https://your-project.vercel.app` (after deployment)

---

## ✅ Success Checklist

- [ ] Railway /health returns 200
- [ ] Vercel frontend loads
- [ ] Chat interface works
- [ ] No CORS errors in browser console
- [ ] Visual Intelligence charts display
- [ ] Wallet balance checks work

**All set! Deploy and test! 🚀**
