# Unity Client Setup Guide

## Initial Setup

### 1. Create Unity Project
1. Open Unity Hub
2. Click "New Project"
3. Select "3D" or "2D" template (recommend 3D with UI focus)
4. Name: `NeuralCollapseClient`
5. Location: Place in `client/` directory
6. Unity Version: 2022.3 LTS or newer

### 2. Project Settings

**Build Settings:**
- Platform: Android and/or iOS
- Texture Compression: ASTC
- Graphics API: Vulkan (Android), Metal (iOS)

**Player Settings:**
- Company Name: Your Company
- Product Name: Neural Collapse
- Package Name: com.yourcompany.neuralcollapse
- Minimum API Level: Android 7.0 (API 24)
- Target API Level: Latest
- Scripting Backend: IL2CPP
- API Compatibility: .NET Standard 2.1

**Quality Settings:**
- Create mobile-optimized quality presets
- Disable unnecessary features for mobile

### 3. Required Packages

Install via Unity Package Manager:

**Unity Registry:**
- TextMesh Pro (essential for UI)
- Universal RP (for better graphics on mobile)
- Cinemachine (for camera controls)

**From Asset Store/GitHub:**
- Mirror Networking: https://github.com/MirrorNetworking/Mirror
  - OR use Unity Netcode for GameObjects
- Socket.IO Unity Client: https://github.com/doghappy/socket.io-client-csharp
- DOTween (for animations): http://dotween.demigiant.com/

### 4. Folder Structure

The Scripts folder has been created. Now set up the rest:

```
Assets/
├── Scenes/
│   ├── MainMenu.unity
│   ├── Base.unity
│   └── Combat.unity
├── Scripts/
│   ├── Core/
│   ├── Resources/
│   ├── Base/
│   ├── Heroes/
│   ├── Combat/
│   ├── Alliance/
│   ├── Network/
│   └── UI/
├── ScriptableObjects/
│   ├── Resources/
│   ├── Buildings/
│   ├── Heroes/
│   └── Skills/
├── Prefabs/
│   ├── UI/
│   ├── Buildings/
│   └── Heroes/
├── Materials/
├── Textures/
├── Models/
├── Audio/
│   ├── Music/
│   └── SFX/
└── Resources/
```

## Implementation Steps

### Phase 1: Core Systems

1. **Import provided C# scripts** from `client/Assets/Scripts/`

2. **Create GameManager Setup:**
   - Create empty GameObject in MainMenu scene
   - Name it "GameManager"
   - Attach `GameManager.cs`
   - Attach `NetworkManager.cs`
   - Attach `ResourceManager.cs`

3. **Set up EventBus:**
   - EventBus is static, automatically initialized
   - No GameObject needed

### Phase 2: UI Implementation

1. **Create Login/Register UI:**
   - MainMenu scene
   - Use TextMeshPro for all text
   - Email input field
   - Password input field
   - Login button → calls `NetworkManager.Login()`
   - Register button → calls `NetworkManager.Register()`

2. **Create Base View UI:**
   - Resource display (top bar)
   - Building grid
   - Hero button
   - Alliance button
   - Settings button

3. **Resource Display:**
   - Subscribe to EventBus "ui:updateResources"
   - Update resource text displays

### Phase 3: Networking Setup

1. **Configure API endpoints:**
   - Edit `APIClient.cs` BASE_URL to match your server
   - For local testing: `http://localhost:3000/api`
   - For device testing: Use your computer's local IP

2. **Socket.IO Integration:**
   - Install Socket.IO Unity package
   - Implement `SocketClient.cs` methods
   - Connect on successful login

### Phase 4: ScriptableObjects

Create ScriptableObject templates:

**BuildingData.cs:**
```csharp
[CreateAssetMenu(fileName = "Building", menuName = "Neural Collapse/Building")]
public class BuildingData : ScriptableObject
{
    public string buildingId;
    public string buildingName;
    public Sprite icon;
    public GameObject prefab;

    [Header("Costs")]
    public int energyCostBase;
    public int nanobotsCostBase;
    public int scrapMetalCostBase;
    public int dataChipsCostBase;

    [Header("Production")]
    public ResourceType producesResource;
    public int productionRatePerHour;
}
```

**HeroData.cs:**
```csharp
[CreateAssetMenu(fileName = "Hero", menuName = "Neural Collapse/Hero")]
public class HeroData : ScriptableObject
{
    public string heroId;
    public string heroName;
    public HeroType heroType;
    public int rarity; // 1-5 stars

    public Sprite portrait;
    public GameObject model;

    [Header("Base Stats")]
    public int baseHealth;
    public int baseAttack;
    public int baseDefense;
    public int baseSpeed;
}
```

### Phase 5: Scene Setup

**MainMenu Scene:**
- Canvas (UI)
- EventSystem
- GameManager GameObject
- Background
- Login/Register Panel

**Base Scene:**
- Canvas (UI with Resource Display)
- Base Grid System
- Camera Setup
- Building Slots

**Combat Scene:**
- Combat Grid (5x5 or 3x5)
- Hero Positions
- Enemy Positions
- Combat UI

## Testing

### Local Testing (Editor)
1. Start backend server: `npm run dev` in server folder
2. Press Play in Unity
3. Register new account
4. Test login

### Device Testing (Android)
1. Enable Developer Mode on Android device
2. Enable USB Debugging
3. Build Settings → Android → Build and Run
4. Note: Backend URL must be your computer's local IP, not localhost

### Device Testing (iOS)
1. Xcode required (Mac only)
2. Build Settings → iOS → Build
3. Open in Xcode
4. Configure signing
5. Deploy to device

## Next Steps After Setup

1. Implement remaining game systems:
   - Base building UI and logic
   - Hero management
   - Combat system
   - Alliance features

2. Create art assets:
   - UI sprites
   - Building models/sprites
   - Hero portraits
   - Icons

3. Implement data configs:
   - Create ScriptableObjects for all buildings
   - Create ScriptableObjects for all heroes
   - Balance resources and costs

4. Add polish:
   - Animations
   - Particle effects
   - Sound effects
   - Music

## Useful Resources

- Mirror Docs: https://mirror-networking.gitbook.io/
- Unity Mobile Optimization: https://docs.unity3d.com/Manual/MobileOptimization.html
- TextMeshPro: https://docs.unity3d.com/Manual/com.unity.textmeshpro.html
- DOTween: http://dotween.demigiant.com/documentation.php