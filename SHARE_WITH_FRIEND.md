# How to Share Neural Collapse with a Friend

## 🚀 Option 1: Deploy Online (Recommended)

### Using Vercel (Easiest):

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy the server:**
```bash
cd server
vercel
```

3. **Deploy the game:**
   - Upload `game.html` and `game.js` to Vercel
   - Or use any static hosting

4. **Update API URL in game.js:**
   - Change `const API_URL = 'http://localhost:3000/api';`
   - To your Vercel backend URL

**Friend Access:** They just visit your Vercel URL!

---

## 🏠 Option 2: Local Network Share (Same WiFi)

### Setup:

1. **Find your IP address:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., `192.168.1.5`)

2. **Server is already configured** (I just updated CORS for you!)

3. **Share with your friend:**
   - Game URL: `http://YOUR-IP:63342/game.html`
   - Backend: Automatically connects to `http://YOUR-IP:3000`

4. **Your friend needs to:**
   - Be on the same WiFi network
   - Open the URL you give them
   - Create their own account

**Note:** Your computer must stay on for this to work!

---

## 📦 Option 3: Send Files (They Run Their Own Server)

### Package to Send:

1. **Zip these folders:**
   - `server/` (entire folder)
   - `game.html`
   - `game.js`
   - `README.md`

2. **Send via:**
   - Google Drive
   - WeTransfer
   - Email (if <25MB)

3. **Friend's Setup Instructions:**

```bash
# 1. Extract the zip
# 2. Open terminal in server folder
cd server

# 3. Install dependencies
npm install

# 4. Start the server
npm run dev

# 5. Open game.html in browser
# Game will be at: http://localhost:63342/game.html
```

---

## 🌍 Option 4: Cloud Deployment (Production Ready)

### Backend Options:

**Railway.app** (Recommended):
1. Sign up at railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repo
4. Railway auto-deploys!

**Heroku:**
1. Create Heroku account
2. Install Heroku CLI
3. Deploy:
```bash
cd server
heroku create neural-collapse
git push heroku main
```

**Render.com:**
1. Sign up at render.com
2. New Web Service
3. Connect repo
4. Auto-deploy!

### Frontend (Static Files):

**Netlify:**
1. Drag & drop `game.html` and `game.js`
2. Get instant URL
3. Update API_URL to your backend

**GitHub Pages:**
1. Push code to GitHub
2. Settings → Pages → Enable
3. Access at `username.github.io/repo-name`

---

## 📝 Quick Share Guide (Copy-Paste for Friend)

```
Hey! Want to try my game?

EASY WAY (If we're on same WiFi):
1. Open: http://YOUR-IP-HERE:63342/game.html
2. Create an account
3. Start playing!

OR (If you want to run it yourself):
1. Download: [share link]
2. Extract the zip
3. Open terminal in 'server' folder
4. Run: npm install
5. Run: npm run dev
6. Open game.html in your browser
7. Create account and play!

It's a cyberpunk survival strategy game like Whiteout Survival!
Build your base, recruit heroes, upgrade buildings!
```

---

## 🔧 Advanced: Docker Deploy (For Tech-Savvy Friends)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  server:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./server:/app

  game:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./:/usr/share/nginx/html
```

Friend runs: `docker-compose up`

---

## 💡 Which Option Should You Choose?

**Friend is tech-savvy?**
→ Send files (Option 3)

**Want easiest for friend?**
→ Deploy online (Option 1)

**Testing with friend now?**
→ Local network (Option 2)

**Want permanent online game?**
→ Cloud deployment (Option 4)

---

## ⚠️ Important Notes

1. **Database:** Currently using SQLite
   - Each person has their own local database
   - For true multiplayer, need shared database (PostgreSQL)

2. **Save Data:**
   - Saves in `server/dev.db` file
   - Sending files = friend gets fresh start
   - Deploy online = shared server for everyone

3. **Accounts:**
   - Each player needs their own account
   - Separate progress per account
   - Can have multiple people on same server

4. **Performance:**
   - Local: Super fast
   - Deployed: Depends on hosting
   - Both work great!

---

## 🎮 What Your Friend Gets

✅ Full game with all features
✅ Build base with 6 building types
✅ Recruit and manage heroes
✅ Upgrade buildings to level 10
✅ Resource production system
✅ Beautiful cyberpunk UI
✅ Their own account and progress

---

Need help with deployment? Let me know which option you want and I'll guide you through it!