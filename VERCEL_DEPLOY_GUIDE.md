# 🚀 Deploy Neural Collapse to Vercel

## Step-by-Step Deployment Guide

### ✅ Prerequisites Done:
- ✅ Vercel CLI installed
- ✅ Server configured for deployment
- ✅ Configuration files created

---

## 📋 Deployment Steps

### Step 1: Login to Vercel

```bash
vercel login
```

This will:
- Open your browser
- Ask you to sign in (use GitHub, GitLab, or Email)
- Return to terminal when done

### Step 2: Deploy Backend Server

```bash
cd server
vercel
```

**During deployment, answer:**
- "Set up and deploy?" → **Yes** (Y)
- "Which scope?" → Choose your account
- "Link to existing project?" → **No** (N)
- "What's your project's name?" → **neural-collapse-api** (or any name)
- "In which directory is your code located?" → **./** (just press Enter)
- "Want to modify settings?" → **No** (N)

**Copy the production URL!** It will look like:
```
https://neural-collapse-api-xxxx.vercel.app
```

### Step 3: Deploy Frontend (Game)

```bash
cd ..
vercel
```

**During deployment, answer:**
- "Set up and deploy?" → **Yes** (Y)
- "Which scope?" → Choose your account
- "Link to existing project?" → **No** (N)
- "What's your project's name?" → **neural-collapse-game** (or any name)
- "In which directory is your code located?" → **./** (just press Enter)
- "Want to modify settings?" → **No** (N)

**Copy the game URL!** It will look like:
```
https://neural-collapse-game-xxxx.vercel.app
```

### Step 4: Update Game to Use Deployed API

Open `game.js` and change line 2:

**FROM:**
```javascript
const API_URL = 'http://localhost:3000/api';
```

**TO:**
```javascript
const API_URL = 'https://YOUR-BACKEND-URL.vercel.app/api';
```

Replace `YOUR-BACKEND-URL` with the URL from Step 2.

### Step 5: Redeploy Frontend with Updated API

```bash
vercel --prod
```

This updates the live game with the correct API URL.

---

## 🎉 Done! Share with Your Friend

**Send them this URL:**
```
https://neural-collapse-game-xxxx.vercel.app/game.html
```

They can:
- ✅ Create an account
- ✅ Play the game
- ✅ Access from anywhere in the world!

---

## 🔧 Important: Database Issue

⚠️ **IMPORTANT:** Vercel serverless functions are stateless, which means:
- SQLite database won't persist between requests
- You need to switch to a hosted database

### Quick Fix: Use Vercel Postgres

1. Go to your Vercel dashboard
2. Select your backend project
3. Click "Storage" → "Create Database" → "Postgres"
4. Copy the connection string
5. Update `server/.env`:
```
DATABASE_URL="postgresql://..."
```
6. Update `server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
7. Redeploy:
```bash
cd server
npm run prisma:generate
vercel --prod
```

---

## 🔄 Alternative: Use Railway.app (Easier for Database)

If Vercel seems complicated, Railway is simpler:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy (Railway handles database automatically!)
cd server
railway init
railway up
```

Railway gives you:
- ✅ Automatic PostgreSQL database
- ✅ Persistent storage
- ✅ Simple deployment
- ✅ Free tier

---

## 💡 Quick Comparison

### Vercel:
- ✅ Great for static sites
- ✅ Fast CDN
- ⚠️ Need external database
- 🆓 Free tier

### Railway:
- ✅ Better for Node.js apps
- ✅ Built-in PostgreSQL
- ✅ Persistent storage
- ✅ Easier database setup
- 🆓 Free $5/month credit

**Recommendation:** Use **Railway for backend**, **Vercel for frontend**

---

## 🎯 Simplified Deployment (Railway Backend + Vercel Frontend)

### Option A: Railway Backend

```bash
cd server
railway login
railway init
railway up
```

Get your Railway URL: `https://xxx.railway.app`

### Option B: Vercel Frontend

```bash
cd ..
# Update game.js with Railway URL
vercel
```

**This combination works best!**

---

## 🐛 Troubleshooting

### "Database file not found"
→ Switch to PostgreSQL (see above)

### "CORS error"
→ Already fixed! Server accepts all origins

### "Can't connect to API"
→ Check API URL in game.js matches your backend

### "Deployment failed"
→ Run `npm install` in server folder first
→ Make sure all dependencies are in package.json

---

## 📱 What Your Friend Will See

1. Opens your game URL
2. Beautiful cyberpunk login screen
3. Creates account (stored in shared database)
4. Plays the full game!
5. Progress saves automatically
6. Can access from phone, tablet, or computer

---

## 🔐 Security Notes

For production, you should:
1. Add proper environment variables
2. Use stronger JWT secrets
3. Add rate limiting
4. Enable HTTPS only
5. Add user email verification

(These are nice-to-haves, game works without them!)

---

## 🎮 Next Steps After Deployment

1. Test the game yourself
2. Create an account
3. Make sure everything works
4. Share URL with friend!

**Need help?** Let me know if you get stuck on any step!