# ⚡ Neural Collapse

> A cybernetic post-apocalypse survival strategy game inspired by Whiteout Survival and State of Survival

![Game Type](https://img.shields.io/badge/Type-Multiplayer%20Strategy-blue)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-green)
![Status](https://img.shields.io/badge/Status-Playable-success)

## 🎮 About

**Neural Collapse** is a survival strategy game set in a post-apocalyptic world where an AI uprising caused electromagnetic collapse. Players must build their base, recruit cybernetically enhanced heroes, and compete for resources in a harsh new world.

### Game Features

- 🏗️ **Base Building** - Build and upgrade 6 different structure types
- 👥 **Hero System** - Recruit 4 hero types with random rarity (1-5 stars)
- ⚡ **Resource Management** - Manage 4 resources with production and storage systems
- ⬆️ **Building Upgrades** - Upgrade buildings up to level 10 for increased production
- 🎯 **Strategic Gameplay** - Balance resource production and spending
- 💾 **Persistent Data** - Progress saves automatically to database
- 🌐 **Multiplayer Ready** - Each player has their own account and base

## 🚀 Quick Start

### Play the Web Version

1. **Clone this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/neural-collapse.git
   cd neural-collapse
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Open the game**
   - Open `game.html` in your browser
   - Or visit `http://localhost:63342/game.html`

4. **Create an account and play!**

## 🏗️ Project Structure

```
neural-collapse/
├── server/              # Node.js backend (Express + Socket.io)
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   └── server.ts    # Main entry point
│   └── prisma/          # Database schema
├── client/              # Unity client (future mobile version)
│   └── Assets/Scripts/  # C# game scripts
├── game.html            # Web game (current version)
├── game.js              # Game logic
└── shared/              # Shared TypeScript types
```

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (production) / SQLite (dev)
- **ORM:** Prisma
- **Real-time:** Socket.io
- **Auth:** JWT + bcrypt

### Frontend (Web)
- **Client:** HTML5 + JavaScript
- **Styling:** Pure CSS (Cyberpunk theme)
- **API:** REST + WebSocket

### Frontend (Mobile - Coming Soon)
- **Engine:** Unity
- **Language:** C#
- **Platform:** iOS & Android

## 📦 Installation

### Prerequisites
- Node.js 20+
- npm or yarn
- PostgreSQL (for production) or SQLite (for development)

### Backend Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:3000`

### Frontend Setup

Just open `game.html` in your browser!

## 🎯 Game Systems

### Resources
- ⚡ **Energy Cores** - Primary power source
- 🤖 **Nanobots** - For cybernetic enhancements
- 🔩 **Scrap Metal** - Building materials
- 💾 **Data Chips** - Research and technology

### Buildings
1. **🏢 Neural Hub** - Produces Energy Cores
2. **🔬 Nano-Fabricator** - Produces Nanobots
3. **♻️ Scrap Yard** - Collects Scrap Metal
4. **💻 Data Center** - Generates Data Chips
5. **🔫 Defense Turret** - Base protection
6. **🧬 Cybernetic Lab** - Hero enhancements

### Heroes
- **⚔️ Combat Specialist** - High damage
- **🔧 Tech Engineer** - Resource boost
- **💊 Medic** - Healing and support
- **💻 Hacker** - Enemy debuffs

## 🚀 Deployment

### Deploy to Railway (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd server
railway init
railway up
railway domain
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
vercel

# Deploy backend
cd server
vercel
```

See `RAILWAY_DEPLOY.md` or `VERCEL_DEPLOY_GUIDE.md` for detailed instructions.

## 📖 Documentation

- **[Project Structure](ProjectStructure.md)** - Complete game design document
- **[Railway Deployment](RAILWAY_DEPLOY.md)** - Deploy with Railway
- **[Vercel Deployment](VERCEL_DEPLOY_GUIDE.md)** - Deploy with Vercel
- **[Share with Friends](SHARE_WITH_FRIEND.md)** - Multiple sharing options
- **[Enhanced Features](ENHANCED_FEATURES.md)** - Base building upgrades guide
- **[Web Game Guide](WEB_GAME_GUIDE.md)** - How to play
- **[Unity Setup](client/UNITY_SETUP.md)** - Mobile development guide

## 🎮 How to Play

1. **Register an account** or login
2. **Build production buildings** to generate resources
3. **Recruit heroes** for your team (500 Energy Cores each)
4. **Upgrade buildings** to increase production
5. **Manage resources** - don't let them cap!
6. **Compete with friends** (multiplayer features coming soon)

## 🗺️ Roadmap

### ✅ Completed
- Full authentication system
- Base building with 6 building types
- Resource production and management
- Hero recruitment system
- Building upgrade system (levels 1-10)
- Resource caps and visual indicators
- Beautiful cyberpunk UI

### 🚧 In Progress
- Combat system (PvE missions)
- Hero leveling and equipment
- Alliance system

### 📋 Planned
- PvP raids and battles
- Daily missions and events
- Mobile app (Unity version)
- More buildings and heroes
- Technology research tree
- Alliance wars

## 🤝 Contributing

This is a personal project, but feel free to:
- Report bugs via Issues
- Suggest features
- Fork and experiment!

## 📄 License

MIT License - Feel free to use and modify!

## 🎨 Credits

**Created by:** Tori
**Inspired by:** Whiteout Survival, State of Survival
**Theme:** Cyberpunk post-apocalypse survival

## 📧 Contact

- GitHub: [@YOUR-USERNAME](https://github.com/YOUR-USERNAME)
- Game Link: [Play Neural Collapse](#)

---

## 🎯 Quick Commands

```bash
# Start development server
cd server && npm run dev

# Run database migrations
cd server && npm run prisma:migrate

# View database
cd server && npm run prisma:studio

# Deploy to Railway
railway login && railway up

# Deploy to Vercel
vercel
```

---

**Built with ⚡ by Claude Code & Tori**

Enjoy building your cybernetic empire! 🤖🏗️