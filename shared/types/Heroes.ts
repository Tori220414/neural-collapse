// Shared hero types

export enum HeroType {
  COMBAT_SPECIALIST = 'combat_specialist',
  TECH_ENGINEER = 'tech_engineer',
  MEDIC = 'medic',
  HACKER = 'hacker'
}

export enum HeroRarity {
  COMMON = 1,
  UNCOMMON = 2,
  RARE = 3,
  EPIC = 4,
  LEGENDARY = 5
}

export enum EnhancementType {
  NEURAL_IMPLANT = 'neural_implant',
  CYBERNETIC_ARMS = 'cybernetic_arms',
  OPTICAL_ENHANCEMENT = 'optical_enhancement',
  EXOSKELETON = 'exoskeleton',
  NANO_SHIELD = 'nano_shield'
}

export interface HeroStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Hero {
  id: string;
  heroType: HeroType;
  name: string;
  rarity: HeroRarity;
  level: number;
  xp: number;
  stats: HeroStats;
  skills: Skill[];
  enhancements: Enhancement[];
  equipment: Equipment;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  damage?: number;
  healing?: number;
  buffType?: string;
  debuffType?: string;
  targetType: 'single' | 'area' | 'all' | 'self';
}

export interface Enhancement {
  type: EnhancementType;
  level: number;
  statBonus: Partial<HeroStats>;
}

export interface Equipment {
  weapon?: EquipmentItem;
  armor?: EquipmentItem;
  accessory?: EquipmentItem;
}

export interface EquipmentItem {
  id: string;
  name: string;
  rarity: HeroRarity;
  statBonus: Partial<HeroStats>;
}