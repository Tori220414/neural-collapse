// Shared building types

import { ResourceCost } from './Resources';

export enum BuildingType {
  NEURAL_HUB = 'neural_hub',
  NANO_FABRICATOR = 'nano_fabricator',
  SCRAP_YARD = 'scrap_yard',
  DATA_CENTER = 'data_center',
  DEFENSE_TURRET = 'defense_turret',
  CYBERNETIC_LAB = 'cybernetic_lab',
  TRAINING_FACILITY = 'training_facility',
  STORAGE_DEPOT = 'storage_depot',
  RESEARCH_CENTER = 'research_center'
}

export interface Building {
  id: string;
  buildingType: BuildingType;
  level: number;
  positionX: number;
  positionY: number;
  upgradeStartTime?: Date;
  upgradeFinishTime?: Date;
}

export interface BuildingConfig {
  type: BuildingType;
  name: string;
  description: string;
  maxLevel: number;
  baseBuildTime: number; // seconds
  baseUpgradeCost: ResourceCost;
  productionType?: string;
  baseProductionRate?: number;
}

export interface BuildingUpgradeData {
  level: number;
  upgradeCost: ResourceCost;
  upgradeTime: number; // seconds
  productionBonus?: number;
  storageBonus?: number;
  powerBonus?: number;
}