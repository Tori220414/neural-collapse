// Game State
const API_URL = 'http://localhost:3000/api';
let gameState = {
    player: null,
    accessToken: null,
    resources: {
        energyCores: 0,
        nanobots: 0,
        scrapMetal: 0,
        dataChips: 0
    },
    resourceCaps: {
        energyCores: 5000,
        nanobots: 2500,
        scrapMetal: 2500,
        dataChips: 1000
    },
    buildings: [],
    heroes: []
};

// Building Definitions
const BUILDINGS = {
    neural_hub: {
        id: 'neural_hub',
        name: 'Neural Hub',
        icon: '🏢',
        description: 'Main power source for your base',
        cost: { energyCores: 0, nanobots: 0, scrapMetal: 200, dataChips: 50 },
        produces: 'energyCores',
        productionRate: 10,
        maxLevel: 10,
        upgradeCostMultiplier: 1.5
    },
    nano_fabricator: {
        id: 'nano_fabricator',
        name: 'Nano-Fabricator',
        icon: '🔬',
        description: 'Produces nanobots for enhancements',
        cost: { energyCores: 300, nanobots: 0, scrapMetal: 200, dataChips: 50 },
        produces: 'nanobots',
        productionRate: 5,
        maxLevel: 10,
        upgradeCostMultiplier: 1.5
    },
    scrap_yard: {
        id: 'scrap_yard',
        name: 'Scrap Yard',
        icon: '♻️',
        description: 'Collects scrap metal from ruins',
        cost: { energyCores: 200, nanobots: 0, scrapMetal: 100, dataChips: 20 },
        produces: 'scrapMetal',
        productionRate: 8,
        maxLevel: 10,
        upgradeCostMultiplier: 1.5
    },
    data_center: {
        id: 'data_center',
        name: 'Data Center',
        icon: '💻',
        description: 'Generates data chips',
        cost: { energyCores: 400, nanobots: 100, scrapMetal: 300, dataChips: 0 },
        produces: 'dataChips',
        productionRate: 3,
        maxLevel: 10,
        upgradeCostMultiplier: 1.5
    },
    defense_turret: {
        id: 'defense_turret',
        name: 'Defense Turret',
        icon: '🔫',
        description: 'Protects your base from raiders',
        cost: { energyCores: 500, nanobots: 200, scrapMetal: 400, dataChips: 100 },
        produces: null,
        productionRate: 0,
        maxLevel: 5,
        upgradeCostMultiplier: 1.8
    },
    cybernetic_lab: {
        id: 'cybernetic_lab',
        name: 'Cybernetic Lab',
        icon: '🧬',
        description: 'Upgrade heroes with cybernetic enhancements',
        cost: { energyCores: 600, nanobots: 300, scrapMetal: 200, dataChips: 150 },
        produces: null,
        productionRate: 0,
        maxLevel: 5,
        upgradeCostMultiplier: 1.8
    }
};

// Hero Types
const HERO_TYPES = {
    combat_specialist: {
        name: 'Combat Specialist',
        icon: '⚔️',
        baseStats: { health: 150, attack: 25, defense: 15, speed: 12 }
    },
    tech_engineer: {
        name: 'Tech Engineer',
        icon: '🔧',
        baseStats: { health: 100, attack: 15, defense: 10, speed: 15 }
    },
    medic: {
        name: 'Medic',
        icon: '💊',
        baseStats: { health: 120, attack: 10, defense: 20, speed: 10 }
    },
    hacker: {
        name: 'Hacker',
        icon: '💻',
        baseStats: { health: 90, attack: 20, defense: 8, speed: 18 }
    }
};

// Authentication Functions
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

async function register() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!username || !email || !password) {
        showError('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            gameState.player = data.player;
            gameState.accessToken = data.tokens.accessToken;
            gameState.resources = data.player.resources;
            startGame();
        } else {
            showError(data.error || 'Registration failed');
        }
    } catch (error) {
        showError('Connection error: ' + error.message);
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            gameState.player = data.player;
            gameState.accessToken = data.tokens.accessToken;
            gameState.resources = data.player.resources;
            startGame();
        } else {
            showError(data.error || 'Login failed');
        }
    } catch (error) {
        showError('Connection error: ' + error.message);
    }
}

function logout() {
    gameState = {
        player: null,
        accessToken: null,
        resources: { energyCores: 0, nanobots: 0, scrapMetal: 0, dataChips: 0 },
        buildings: [],
        heroes: []
    };
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('gameScreen').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Game Functions
function startGame() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    updateUI();
    initializeBase();
    initializeHeroes();

    // Start resource production
    setInterval(produceResources, 1000); // Every second
}

function updateUI() {
    document.getElementById('playerName').textContent = gameState.player.username;
    document.getElementById('playerLevel').textContent = gameState.player.level;

    // Update resources with caps
    updateResourceDisplay('energyCores', gameState.resources.energyCores, gameState.resourceCaps.energyCores);
    updateResourceDisplay('nanobots', gameState.resources.nanobots, gameState.resourceCaps.nanobots);
    updateResourceDisplay('scrapMetal', gameState.resources.scrapMetal, gameState.resourceCaps.scrapMetal);
    updateResourceDisplay('dataChips', gameState.resources.dataChips, gameState.resourceCaps.dataChips);
}

function updateResourceDisplay(resourceId, current, cap) {
    const element = document.getElementById(resourceId);
    const percentage = (current / cap) * 100;

    element.textContent = `${Math.floor(current)}/${cap}`;

    // Color code based on how full it is
    if (percentage >= 90) {
        element.style.color = '#ff4444'; // Red when nearly full
    } else if (percentage >= 70) {
        element.style.color = '#ffaa00'; // Orange when getting full
    } else {
        element.style.color = '#00ffaa'; // Green normally
    }
}

function showTab(tabName) {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

    // Add active class to selected tab and section
    event.target.classList.add('active');
    document.getElementById(tabName + 'Section').classList.add('active');
}

// Base Building Functions
function initializeBase() {
    const baseGrid = document.getElementById('baseGrid');
    baseGrid.innerHTML = '';

    // Create 15 building slots (3x5)
    for (let i = 0; i < 15; i++) {
        const slot = document.createElement('div');
        slot.className = 'building-slot';
        slot.innerHTML = `<span class="empty-slot-text">Empty Slot</span>`;
        slot.onclick = () => showBuildingMenu(i);
        baseGrid.appendChild(slot);
    }

    // Show available buildings
    renderBuildingOptions();
}

function renderBuildingOptions() {
    const container = document.getElementById('buildingOptions');
    container.innerHTML = '';

    Object.values(BUILDINGS).forEach(building => {
        const option = document.createElement('div');
        option.className = 'building-option';
        option.onclick = () => buildBuilding(building);

        const canAfford = canAffordBuilding(building);
        if (!canAfford) {
            option.style.opacity = '0.5';
            option.style.cursor = 'not-allowed';
        }

        option.innerHTML = `
            <div class="building-option-header">
                <div class="building-option-icon">${building.icon}</div>
                <div class="building-option-info">
                    <h3>${building.name}</h3>
                </div>
            </div>
            <div class="building-option-desc">${building.description}</div>
            <div class="building-cost">
                ${building.cost.energyCores > 0 ? `<span class="cost-item">⚡ ${building.cost.energyCores}</span>` : ''}
                ${building.cost.nanobots > 0 ? `<span class="cost-item">🤖 ${building.cost.nanobots}</span>` : ''}
                ${building.cost.scrapMetal > 0 ? `<span class="cost-item">🔩 ${building.cost.scrapMetal}</span>` : ''}
                ${building.cost.dataChips > 0 ? `<span class="cost-item">💾 ${building.cost.dataChips}</span>` : ''}
            </div>
        `;

        container.appendChild(option);
    });
}

function canAffordBuilding(building) {
    return gameState.resources.energyCores >= building.cost.energyCores &&
           gameState.resources.nanobots >= building.cost.nanobots &&
           gameState.resources.scrapMetal >= building.cost.scrapMetal &&
           gameState.resources.dataChips >= building.cost.dataChips;
}

function buildBuilding(building) {
    if (!canAffordBuilding(building)) {
        alert('Insufficient resources!');
        return;
    }

    // Deduct resources
    gameState.resources.energyCores -= building.cost.energyCores;
    gameState.resources.nanobots -= building.cost.nanobots;
    gameState.resources.scrapMetal -= building.cost.scrapMetal;
    gameState.resources.dataChips -= building.cost.dataChips;

    // Add building
    gameState.buildings.push({
        type: building.id,
        level: 1,
        slot: gameState.buildings.length
    });

    updateUI();
    updateBaseGrid();
    renderBuildingOptions();

    alert(`${building.name} built successfully!`);
}

function updateBaseGrid() {
    const slots = document.querySelectorAll('.building-slot');

    gameState.buildings.forEach((building, index) => {
        const buildingDef = BUILDINGS[building.type];
        if (slots[index] && buildingDef) {
            slots[index].className = 'building-slot has-building';
            slots[index].onclick = () => showBuildingInfo(index);
            slots[index].innerHTML = `
                <div class="building-icon">${buildingDef.icon}</div>
                <div class="building-name">${buildingDef.name}</div>
                <div class="building-level">Level ${building.level}${building.level < buildingDef.maxLevel ? ' ⬆️' : ' 🏆'}</div>
                ${buildingDef.produces ? `
                    <div style="font-size: 0.7em; color: #00ffaa; margin-top: 5px;">
                        +${(buildingDef.productionRate * building.level).toFixed(1)}/hr
                    </div>
                ` : ''}
            `;
        }
    });
}

function produceResources() {
    gameState.buildings.forEach(building => {
        const buildingDef = BUILDINGS[building.type];
        if (buildingDef.produces) {
            const productionPerSecond = buildingDef.productionRate / 3600; // Convert per hour to per second
            const resourceType = buildingDef.produces;

            // Add production but cap at maximum
            gameState.resources[resourceType] = Math.min(
                gameState.resources[resourceType] + (productionPerSecond * building.level),
                gameState.resourceCaps[resourceType]
            );
        }
    });

    // Increase storage caps based on buildings
    updateStorageCaps();
    updateUI();
}

function updateStorageCaps() {
    // Base storage
    gameState.resourceCaps = {
        energyCores: 5000,
        nanobots: 2500,
        scrapMetal: 2500,
        dataChips: 1000
    };

    // Add bonus storage for each storage depot (if built)
    gameState.buildings.forEach(building => {
        if (building.type === 'storage_depot') {
            gameState.resourceCaps.energyCores += 2000 * building.level;
            gameState.resourceCaps.nanobots += 1000 * building.level;
            gameState.resourceCaps.scrapMetal += 1000 * building.level;
            gameState.resourceCaps.dataChips += 500 * building.level;
        }
    });
}

// Heroes Functions
function initializeHeroes() {
    // Start with one free hero
    if (gameState.heroes.length === 0) {
        const heroType = Object.keys(HERO_TYPES)[0];
        addHero(heroType);
    }

    renderHeroes();
}

function addHero(heroType) {
    const heroTemplate = HERO_TYPES[heroType];
    const hero = {
        id: Date.now(),
        type: heroType,
        name: heroTemplate.name,
        level: 1,
        rarity: Math.floor(Math.random() * 5) + 1,
        stats: { ...heroTemplate.baseStats }
    };

    gameState.heroes.push(hero);
    renderHeroes();
}

function renderHeroes() {
    const container = document.getElementById('heroesGrid');
    container.innerHTML = '';

    if (gameState.heroes.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.6);">No heroes yet. Recruit your first hero!</p>';
        return;
    }

    gameState.heroes.forEach(hero => {
        const heroTemplate = HERO_TYPES[hero.type];
        const card = document.createElement('div');
        card.className = 'hero-card';

        const stars = '⭐'.repeat(hero.rarity);

        card.innerHTML = `
            <div class="hero-header">
                <div class="hero-avatar">${heroTemplate.icon}</div>
                <div class="hero-info">
                    <h3>${hero.name}</h3>
                    <div class="hero-type">${heroTemplate.name} ${stars}</div>
                </div>
            </div>
            <div class="hero-stats">
                <div class="hero-stat">
                    <div class="stat-label">Health</div>
                    <div class="stat-value">${hero.stats.health}</div>
                </div>
                <div class="hero-stat">
                    <div class="stat-label">Attack</div>
                    <div class="stat-value">${hero.stats.attack}</div>
                </div>
                <div class="hero-stat">
                    <div class="stat-label">Defense</div>
                    <div class="stat-value">${hero.stats.defense}</div>
                </div>
                <div class="hero-stat">
                    <div class="stat-label">Speed</div>
                    <div class="stat-value">${hero.stats.speed}</div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

function recruitHero() {
    const cost = 500; // Energy cores cost for recruitment

    if (gameState.resources.energyCores < cost) {
        alert('Insufficient Energy Cores! Need 500 to recruit a hero.');
        return;
    }

    gameState.resources.energyCores -= cost;

    // Random hero type
    const heroTypes = Object.keys(HERO_TYPES);
    const randomType = heroTypes[Math.floor(Math.random() * heroTypes.length)];

    addHero(randomType);
    updateUI();

    alert('New hero recruited!');
}

// Building Upgrade Functions
function getUpgradeCost(building) {
    const buildingDef = BUILDINGS[building.type];
    const multiplier = Math.pow(buildingDef.upgradeCostMultiplier, building.level - 1);

    return {
        energyCores: Math.floor(buildingDef.cost.energyCores * multiplier),
        nanobots: Math.floor(buildingDef.cost.nanobots * multiplier),
        scrapMetal: Math.floor(buildingDef.cost.scrapMetal * multiplier),
        dataChips: Math.floor(buildingDef.cost.dataChips * multiplier)
    };
}

function canAffordUpgrade(building) {
    const cost = getUpgradeCost(building);
    return gameState.resources.energyCores >= cost.energyCores &&
           gameState.resources.nanobots >= cost.nanobots &&
           gameState.resources.scrapMetal >= cost.scrapMetal &&
           gameState.resources.dataChips >= cost.dataChips;
}

function upgradeBuilding(buildingIndex) {
    const building = gameState.buildings[buildingIndex];
    const buildingDef = BUILDINGS[building.type];

    if (building.level >= buildingDef.maxLevel) {
        alert('Building is already at max level!');
        return;
    }

    if (!canAffordUpgrade(building)) {
        alert('Insufficient resources for upgrade!');
        return;
    }

    const cost = getUpgradeCost(building);
    gameState.resources.energyCores -= cost.energyCores;
    gameState.resources.nanobots -= cost.nanobots;
    gameState.resources.scrapMetal -= cost.scrapMetal;
    gameState.resources.dataChips -= cost.dataChips;

    building.level++;

    updateUI();
    updateBaseGrid();
    closeBuildingModal();

    alert(`${buildingDef.name} upgraded to level ${building.level}!`);
}

function showBuildingInfo(buildingIndex) {
    const building = gameState.buildings[buildingIndex];
    const buildingDef = BUILDINGS[building.type];

    const modal = document.getElementById('buildingModal');
    const modalContent = document.getElementById('buildingModalContent');

    const currentProduction = buildingDef.produces ?
        (buildingDef.productionRate * building.level).toFixed(1) : 0;
    const nextProduction = buildingDef.produces ?
        (buildingDef.productionRate * (building.level + 1)).toFixed(1) : 0;

    const upgradeCost = getUpgradeCost(building);
    const canUpgrade = canAffordUpgrade(building);
    const isMaxLevel = building.level >= buildingDef.maxLevel;

    modalContent.innerHTML = `
        <div class="building-details">
            <div style="text-align: center; margin-bottom: 25px;">
                <div style="font-size: 4em; margin-bottom: 10px;">${buildingDef.icon}</div>
                <h2 style="color: #00d4ff; margin-bottom: 5px;">${buildingDef.name}</h2>
                <p style="color: rgba(255,255,255,0.7);">${buildingDef.description}</p>
            </div>

            <div style="background: rgba(0,212,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #00d4ff;">Current Level:</span>
                    <span style="font-weight: bold; color: #00ffaa;">${building.level}</span>
                </div>
                ${buildingDef.produces ? `
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #00d4ff;">Production:</span>
                        <span style="font-weight: bold; color: #00ffaa;">${currentProduction}/hour</span>
                    </div>
                ` : ''}
            </div>

            ${!isMaxLevel ? `
                <div style="background: rgba(0,0,0,0.5); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <h3 style="color: #00d4ff; margin-bottom: 15px;">Upgrade to Level ${building.level + 1}</h3>
                    ${buildingDef.produces ? `
                        <div style="margin-bottom: 15px;">
                            <div style="color: rgba(255,255,255,0.8); margin-bottom: 5px;">Production:</div>
                            <div style="color: #00ffaa; font-size: 1.2em; font-weight: bold;">
                                ${currentProduction}/hour → ${nextProduction}/hour
                                <span style="color: #44ff44; font-size: 0.9em;">(+${(nextProduction - currentProduction).toFixed(1)})</span>
                            </div>
                        </div>
                    ` : ''}

                    <div style="margin-bottom: 15px;">
                        <div style="color: rgba(255,255,255,0.8); margin-bottom: 10px;">Upgrade Cost:</div>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                            ${upgradeCost.energyCores > 0 ? `
                                <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">
                                    <div style="font-size: 0.85em; color: rgba(255,255,255,0.6);">⚡ Energy Cores</div>
                                    <div style="font-weight: bold; color: ${gameState.resources.energyCores >= upgradeCost.energyCores ? '#00ffaa' : '#ff4444'};">
                                        ${upgradeCost.energyCores}
                                    </div>
                                </div>
                            ` : ''}
                            ${upgradeCost.nanobots > 0 ? `
                                <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">
                                    <div style="font-size: 0.85em; color: rgba(255,255,255,0.6);">🤖 Nanobots</div>
                                    <div style="font-weight: bold; color: ${gameState.resources.nanobots >= upgradeCost.nanobots ? '#00ffaa' : '#ff4444'};">
                                        ${upgradeCost.nanobots}
                                    </div>
                                </div>
                            ` : ''}
                            ${upgradeCost.scrapMetal > 0 ? `
                                <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">
                                    <div style="font-size: 0.85em; color: rgba(255,255,255,0.6);">🔩 Scrap Metal</div>
                                    <div style="font-weight: bold; color: ${gameState.resources.scrapMetal >= upgradeCost.scrapMetal ? '#00ffaa' : '#ff4444'};">
                                        ${upgradeCost.scrapMetal}
                                    </div>
                                </div>
                            ` : ''}
                            ${upgradeCost.dataChips > 0 ? `
                                <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">
                                    <div style="font-size: 0.85em; color: rgba(255,255,255,0.6);">💾 Data Chips</div>
                                    <div style="font-weight: bold; color: ${gameState.resources.dataChips >= upgradeCost.dataChips ? '#00ffaa' : '#ff4444'};">
                                        ${upgradeCost.dataChips}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <button class="btn" onclick="upgradeBuilding(${buildingIndex})"
                        ${!canUpgrade ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                        ${canUpgrade ? '⬆️ Upgrade Building' : '❌ Insufficient Resources'}
                    </button>
                </div>
            ` : `
                <div style="background: rgba(0,212,255,0.2); padding: 20px; border-radius: 10px; text-align: center;">
                    <div style="font-size: 2em; margin-bottom: 10px;">🏆</div>
                    <div style="color: #00d4ff; font-size: 1.2em; font-weight: bold;">MAX LEVEL REACHED!</div>
                    <div style="color: rgba(255,255,255,0.7); margin-top: 10px;">This building is fully upgraded.</div>
                </div>
            `}

            <button class="btn btn-secondary" onclick="closeBuildingModal()" style="margin-top: 15px;">
                Close
            </button>
        </div>
    `;

    modal.classList.add('show');
}

function closeBuildingModal() {
    document.getElementById('buildingModal').classList.remove('show');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved session
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
        // Auto-login could be implemented here
    }
});