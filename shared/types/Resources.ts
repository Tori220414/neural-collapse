// Shared resource types between client and server

export enum ResourceType {
  ENERGY_CORES = 'energy_cores',
  NANOBOTS = 'nanobots',
  SCRAP_METAL = 'scrap_metal',
  DATA_CHIPS = 'data_chips'
}

export interface Resources {
  energyCores: number;
  nanobots: number;
  scrapMetal: number;
  dataChips: number;
}

export interface ResourceCost {
  energyCores?: number;
  nanobots?: number;
  scrapMetal?: number;
  dataChips?: number;
}

export interface ResourceProduction {
  resourceType: ResourceType;
  amount: number;
  productionRate: number; // per hour
}