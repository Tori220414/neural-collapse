# 🚂 Deploy Neural Collapse with Railway

## ✅ Setup Complete!
- ✅ Railway CLI installed
- ✅ Database switched to PostgreSQL
- ✅ Configuration files ready

---

## 🚀 Quick Deployment (3 Steps!)

### Step 1: Login to Railway

Run this command in your terminal:

```bash
railway login
```

**What happens:**
- Opens browser
- Sign in with GitHub (recommended) or email
- Returns to terminal when done
- You're logged in! ✅

### Step 2: Deploy Backend

```bash
cd server
railway init
```

**Answer the prompts:**
- "Project name?" → **neural-collapse** (or any name you like)
- Press Enter to confirm

**Then deploy:**
```bash
railway up
```

**What Railway does automatically:**
- 🔨 Builds your Node.js app
- 🗄️ Creates PostgreSQL database
- 🔗 Connects database to your app
- 🌐 Deploys to the cloud
- ⚡ Gives you a public URL!

**Wait 1-2 minutes...**

### Step 3: Get Your Backend URL

```bash
railway domain
```

This creates a public URL like:
```
https://neural-collapse-production.up.railway.app
```

**Copy this URL!** You'll need it for the frontend.

---

## 🎮 Deploy Frontend (Game)

### Option A: Use Vercel (Recommended)

```bash
cd ..
# First, update game.js with Railway URL (see below)
vercel
```

### Option B: Also use Railway

```bash
cd ..
railway init
railway up
railway domain
```

---

## 🔧 Update Game to Use Railway Backend

Open `game.js` and change line 2:

**FROM:**
```javascript
const API_URL = 'http://localhost:3000/api';
```

**TO:**
```javascript
const API_URL = 'https://YOUR-RAILWAY-URL.railway.app/api';
```

**Example:**
```javascript
const API_URL = 'https://neural-collapse-production.up.railway.app/api';
```

Then redeploy frontend:
```bash
vercel --prod
# OR
railway up
```

---

## 🎉 Done! Share with Friend

**Your game is live at:**
```
https://your-game-name.vercel.app/game.html
```

**Or if using Railway for frontend:**
```
https://your-game-name.up.railway.app/game.html
```

Send this URL to your friend and they can play!

---

## 🔍 Useful Railway Commands

### Check Status
```bash
railway status
```

### View Logs
```bash
railway logs
```

### Open Dashboard
```bash
railway open
```

### Add Environment Variables
```bash
railway variables set KEY=value
```

### Link to Project
```bash
railway link
```

---

## 🗄️ Database Management

Railway automatically created a PostgreSQL database!

### View Database
```bash
railway open
```
Then click on "PostgreSQL" in the dashboard.

### Connect to Database
The connection string is automatically set as `DATABASE_URL`.

### Run Migrations Manually (if needed)
```bash
railway run npx prisma migrate deploy
```

### View Database with Prisma Studio
```bash
cd server
railway run npx prisma studio
```

---

## 💰 Pricing

**Free Tier Includes:**
- $5 of usage per month
- PostgreSQL database
- 500 hours of runtime
- Enough for you and your friend!

**Perfect for testing and sharing!**

---

## 🐛 Troubleshooting

### "Command not found: railway"
```bash
npm install -g @railway/cli
```

### "No railway.json found"
It's optional! Railway auto-detects Node.js projects.

### "Database connection failed"
Railway auto-provides DATABASE_URL. Check with:
```bash
railway variables
```

### "Build failed"
Check logs:
```bash
railway logs
```

Usually fixed by running:
```bash
npm install
railway up
```

### "CORS error in game"
Already fixed! Your server accepts all origins.

### "Can't find my deployment"
```bash
railway status
railway domain
```

---

## 📱 Testing Your Deployment

1. **Open the game URL in browser**
2. **Create a test account**
3. **Build some buildings**
4. **Check if resources update**
5. **Refresh page - data should persist!**

If everything works, share with your friend!

---

## 🔄 Update Your Game

Made changes? Just redeploy:

**Backend:**
```bash
cd server
railway up
```

**Frontend:**
```bash
cd ..
vercel --prod
```

Railway automatically rebuilds and deploys!

---

## 🎯 Quick Reference

**Deploy backend:**
```bash
cd server
railway up
```

**Get backend URL:**
```bash
railway domain
```

**View logs:**
```bash
railway logs
```

**Deploy frontend:**
```bash
cd ..
vercel
```

**Update game URL:**
Edit `game.js` line 2 with your Railway URL

---

## 🌟 What Your Friend Gets

✅ Full multiplayer game
✅ Shared PostgreSQL database
✅ Persistent save data
✅ Works on any device
✅ Professional cloud hosting
✅ Fast loading times
✅ Automatic scaling

---

## 🎮 Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Deploy frontend to Vercel
3. ✅ Update API URL in game.js
4. ✅ Test the game
5. ✅ Share URL with friend!

**Ready to deploy? Run these commands:**

```bash
# Login to Railway
railway login

# Deploy backend
cd server
railway init
railway up
railway domain

# Copy the URL and update game.js
# Then deploy frontend
cd ..
vercel
```

That's it! Your game is live! 🚀