# Neural Collapse - Quick Start Guide

## ✅ Server is Running!

Your backend server is currently running on **http://localhost:3000**

## 🎮 Test the Game

### Option 1: Web Test Client (Easiest)

1. Open `test-client.html` in your web browser
2. Try registering a new player
3. Try logging in
4. See your resources displayed!

### Option 2: Command Line (cURL)

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"player2\",\"email\":\"player2@test.com\",\"password\":\"password123\"}"
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"player2@test.com\",\"password\":\"password123\"}"
```

## 📊 What's Working

✅ Backend server (Node.js + TypeScript + Express)
✅ SQLite database with Prisma ORM
✅ User registration with bcrypt password hashing
✅ JWT authentication (access + refresh tokens)
✅ Player creation with initial resources:
  - 1000 Energy Cores
  - 500 Nanobots
  - 500 Scrap Metal
  - 100 Data Chips
✅ Socket.io for real-time features
✅ CORS enabled for web clients

## 🗂️ Database Location

Your game database is stored at:
`server/dev.db`

You can view/edit it with tools like:
- DB Browser for SQLite
- Prisma Studio: `cd server && npm run prisma:studio`

## 🛑 Stop the Server

The server is running in the background. To stop it:
- Use Ctrl+C in the terminal where it's running
- Or find and kill the process

## ▶️ Restart the Server

```bash
cd server
npm run dev
```

## 📱 Next Steps

### For Unity Development:

1. **Install Unity 2022 LTS or newer**

2. **Create New Project:**
   - Open Unity Hub
   - Click "New Project"
   - Choose 3D or 2D template
   - Name: `NeuralCollapseClient`
   - Location: `client/` folder

3. **Import C# Scripts:**
   - Copy scripts from `client/Assets/Scripts/` into your Unity project
   - Follow instructions in `client/UNITY_SETUP.md`

4. **Create Login Scene:**
   - Create UI with TextMeshPro
   - Email and Password input fields
   - Register and Login buttons
   - Connect to `NetworkManager.cs`

5. **Update API URL in Unity:**
   - Edit `client/Assets/Scripts/Network/APIClient.cs`
   - Change BASE_URL if needed (default: http://localhost:3000/api)

### For Backend Development:

**File Structure:**
```
server/
├── src/
│   ├── server.ts          # Main server entry point
│   ├── routes/            # API endpoints
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── models/            # (Future) Data models
│   ├── middleware/        # Auth, error handling
│   └── config/            # Database, Redis config
├── prisma/
│   └── schema.prisma      # Database schema
└── dev.db                 # SQLite database
```

**Add New Features:**

1. **Create New API Endpoints:**
   - Add route in `src/routes/`
   - Add controller in `src/controllers/`
   - Add service logic in `src/services/`

2. **Update Database Schema:**
   ```bash
   cd server
   # Edit prisma/schema.prisma
   npm run prisma:migrate
   npm run prisma:generate
   ```

3. **Add Real-time Features:**
   - Edit `src/server.ts`
   - Add Socket.io event listeners
   - Emit events to clients

## 🔧 Configuration

Edit `server/.env` to change:
- Port number
- JWT secrets
- Database URL
- CORS settings
- Game configuration

## 📚 Documentation

- **ProjectStructure.md** - Complete game design document
- **README.md** - Full project overview
- **client/UNITY_SETUP.md** - Unity setup instructions

## 🎯 Game Systems to Implement Next

1. **Resource Production System**
   - Buildings produce resources over time
   - Resource collection API endpoints

2. **Base Building System**
   - Place buildings on grid
   - Upgrade buildings
   - Building requirements

3. **Hero System**
   - Hero recruitment (gacha)
   - Hero upgrades
   - Cybernetic enhancements

4. **Combat System**
   - Turn-based battle logic
   - PvE missions
   - PvP raids

5. **Alliance System**
   - Create/join alliances
   - Alliance chat
   - Cooperative features

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 3000 is already in use
- Try changing PORT in `.env` file

**Database errors:**
- Delete `dev.db` and run `npm run prisma:migrate` again

**Can't connect from Unity:**
- Make sure server is running
- Check firewall settings
- Verify API URL in Unity scripts

## 🎮 Happy Building!

You now have a fully functional multiplayer game backend running!

Start developing your Unity client or add more backend features.