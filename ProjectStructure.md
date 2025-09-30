# Neural Collapse - Cybernetic Survival Game
## Project Architecture

### Game Concept
**Theme:** Post-apocalypse where AI uprising caused electromagnetic collapse. Survivors need cybernetic enhancements to survive radiation.

**Core Loop:**
1. Gather resources (Energy Cores, Nanobots, Scrap Metal, Data Chips)
2. Build and upgrade base facilities
3. Enhance survivors with cybernetic implants
4. Deploy heroes in tactical combat missions
5. Join alliances and compete in PvP

---

## Tech Stack

### Client (Unity)
- **Engine:** Unity 2022 LTS or newer
- **Language:** C#
- **Networking:** Mirror (High-level networking library)
- **UI:** Unity UI Toolkit
- **State Management:** Custom EventBus + Scriptable Objects
- **Persistence:** SQLite (local) + REST API (server sync)

### Server (Node.js)
- **Runtime:** Node.js 20+
- **Language:** TypeScript
- **Framework:** Express.js
- **Real-time:** Socket.io
- **Database:** PostgreSQL (player data, alliances, leaderboards)
- **Cache:** Redis (sessions, real-time state)
- **Authentication:** JWT + bcrypt
- **ORM:** Prisma

### DevOps
- **Containerization:** Docker + Docker Compose
- **API Documentation:** Swagger/OpenAPI
- **Testing:** Jest (backend), Unity Test Framework (client)

---

## Directory Structure

```
neural-collapse/
├── client/                          # Unity Project
│   ├── Assets/
│   │   ├── Scripts/
│   │   │   ├── Core/
│   │   │   │   ├── GameManager.cs
│   │   │   │   ├── EventBus.cs
│   │   │   │   └── SaveSystem.cs
│   │   │   ├── Resources/
│   │   │   │   ├── ResourceManager.cs
│   │   │   │   ├── ResourceType.cs
│   │   │   │   └── ResourceData.cs
│   │   │   ├── Base/
│   │   │   │   ├── BaseManager.cs
│   │   │   │   ├── Building.cs
│   │   │   │   ├── BuildingData.cs
│   │   │   │   └── BuildingSlot.cs
│   │   │   ├── Heroes/
│   │   │   │   ├── Hero.cs
│   │   │   │   ├── HeroData.cs
│   │   │   │   ├── HeroManager.cs
│   │   │   │   └── CyberneticEnhancement.cs
│   │   │   ├── Combat/
│   │   │   │   ├── CombatManager.cs
│   │   │   │   ├── TurnBasedCombat.cs
│   │   │   │   ├── Unit.cs
│   │   │   │   └── Skill.cs
│   │   │   ├── Alliance/
│   │   │   │   ├── AllianceManager.cs
│   │   │   │   └── AllianceData.cs
│   │   │   ├── Network/
│   │   │   │   ├── NetworkManager.cs
│   │   │   │   ├── APIClient.cs
│   │   │   │   └── SocketClient.cs
│   │   │   └── UI/
│   │   │       ├── UIManager.cs
│   │   │       ├── BaseView.cs
│   │   │       ├── HeroView.cs
│   │   │       └── CombatView.cs
│   │   ├── ScriptableObjects/
│   │   │   ├── Resources/
│   │   │   ├── Buildings/
│   │   │   ├── Heroes/
│   │   │   └── Enhancements/
│   │   ├── Prefabs/
│   │   ├── Scenes/
│   │   │   ├── MainMenu.unity
│   │   │   ├── Base.unity
│   │   │   └── Combat.unity
│   │   └── Resources/
│   └── ProjectSettings/
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── redis.ts
│   │   ├── models/
│   │   │   ├── Player.ts
│   │   │   ├── Base.ts
│   │   │   ├── Hero.ts
│   │   │   ├── Alliance.ts
│   │   │   └── Combat.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── player.routes.ts
│   │   │   ├── base.routes.ts
│   │   │   ├── hero.routes.ts
│   │   │   ├── combat.routes.ts
│   │   │   └── alliance.routes.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── playerController.ts
│   │   │   ├── baseController.ts
│   │   │   ├── heroController.ts
│   │   │   ├── combatController.ts
│   │   │   └── allianceController.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── gameLogicService.ts
│   │   │   ├── resourceService.ts
│   │   │   └── combatService.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── errorHandler.middleware.ts
│   │   ├── sockets/
│   │   │   ├── socketManager.ts
│   │   │   └── gameEvents.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   └── logger.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── shared/                          # Shared types/constants
│   └── types/
│       ├── Player.ts
│       ├── Resources.ts
│       ├── Buildings.ts
│       └── Combat.ts
│
├── docker-compose.yml
└── README.md
```

---

## Core Game Systems

### 1. Resource Management
**Resources:**
- Energy Cores (primary resource, like furnace fuel)
- Nanobots (for cybernetic enhancements)
- Scrap Metal (building materials)
- Data Chips (research/technology)

**Features:**
- Production buildings generate resources over time
- Storage capacity limits
- Resource consumption for upgrades and maintenance

### 2. Base Building
**Core Buildings:**
- Neural Hub (main building, like furnace - provides power)
- Nano-Fabricator (produces nanobots)
- Scrap Yard (collects metal)
- Data Center (generates data chips)
- Defense Turrets (PvP protection)
- Cybernetic Lab (hero enhancements)
- Training Facility (upgrade heroes)

**Mechanics:**
- Predefined building slots
- Upgrade system (10+ levels per building)
- Build/upgrade timers
- Resource costs

### 3. Hero System
**Hero Types:**
- Combat Specialist (high damage)
- Tech Engineer (resource boost)
- Medic (healing/support)
- Hacker (debuff enemies)

**Enhancements:**
- Neural Implants (intelligence boost)
- Cybernetic Arms (strength)
- Optical Enhancements (accuracy)
- Exoskeleton (defense)

**Features:**
- Gacha/recruitment system
- Star rarity (1-5 stars)
- Level progression
- Skill trees
- Equipment slots

### 4. Combat System
**Turn-Based Tactical:**
- 5v5 hero battles
- Grid-based positioning
- Skills with cooldowns
- Wave-based PvE
- PvP raids

**Combat Modes:**
- Story missions (PvE)
- Resource raids (PvE)
- Player raids (PvP)
- Alliance wars (Guild vs Guild)

### 5. Alliance System
**Features:**
- Create/join alliances
- Alliance chat
- Shared resources
- Cooperative events
- Territory control
- Alliance rankings

### 6. Progression Systems
**Player Level:**
- Gain XP from completing missions
- Unlocks new features/buildings

**Technology Tree:**
- Research upgrades
- Unlock new buildings/units
- Passive bonuses

**Daily/Weekly Events:**
- Login rewards
- Limited-time missions
- Leaderboards

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh JWT token

### Player
- `GET /api/player/profile` - Get player data
- `PUT /api/player/profile` - Update profile
- `GET /api/player/resources` - Get current resources

### Base
- `GET /api/base` - Get base state
- `POST /api/base/build` - Start building
- `POST /api/base/upgrade` - Upgrade building
- `POST /api/base/collect` - Collect resources

### Heroes
- `GET /api/heroes` - Get all heroes
- `POST /api/heroes/recruit` - Recruit new hero
- `PUT /api/heroes/:id/upgrade` - Upgrade hero
- `POST /api/heroes/:id/enhance` - Add cybernetic enhancement

### Combat
- `POST /api/combat/start` - Start combat mission
- `POST /api/combat/action` - Submit combat action
- `GET /api/combat/:id/result` - Get combat result

### Alliance
- `GET /api/alliance/:id` - Get alliance info
- `POST /api/alliance/create` - Create alliance
- `POST /api/alliance/join` - Join alliance
- `POST /api/alliance/leave` - Leave alliance

### Real-time (Socket.io)
- `player:online` - Player online status
- `resource:update` - Resource production update
- `combat:update` - Real-time combat events
- `alliance:chat` - Alliance chat messages
- `raid:alert` - Being raided alert

---

## Database Schema (Simplified)

### Players
```sql
- id, username, email, password_hash
- level, xp, created_at, last_login
```

### PlayerResources
```sql
- player_id, energy_cores, nanobots, scrap_metal, data_chips
```

### Buildings
```sql
- id, player_id, building_type, level
- position_x, position_y
- upgrade_finish_time
```

### Heroes
```sql
- id, player_id, hero_type, rarity
- level, xp, skills
- enhancements (JSON)
```

### Alliances
```sql
- id, name, leader_id, member_count
- level, territory, created_at
```

---

## Development Phases

### Phase 1: Core Systems (Weeks 1-4)
- Set up Unity project structure
- Set up Node.js backend
- Implement resource management
- Basic base building
- Database integration

### Phase 2: Heroes & Combat (Weeks 5-8)
- Hero system
- Turn-based combat
- PvE missions
- Equipment/enhancements

### Phase 3: Multiplayer (Weeks 9-12)
- Alliance system
- PvP raids
- Real-time updates
- Chat system

### Phase 4: Polish & Features (Weeks 13-16)
- Events system
- Progression balancing
- UI/UX polish
- Tutorial system

### Phase 5: Testing & Launch (Weeks 17-20)
- Closed beta
- Performance optimization
- Bug fixes
- Soft launch

---

## Next Steps
1. Set up Unity project with folder structure
2. Set up Node.js backend with TypeScript
3. Create database schema with Prisma
4. Implement authentication system
5. Build resource management system