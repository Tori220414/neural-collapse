// Shared combat types

export enum CombatType {
  PVE_STORY = 'pve_story',
  PVE_RESOURCE = 'pve_resource',
  PVP_ATTACK = 'pvp_attack',
  PVP_DEFENSE = 'pvp_defense',
  ALLIANCE_WAR = 'alliance_war'
}

export enum CombatResult {
  WIN = 'win',
  LOSE = 'lose',
  DRAW = 'draw'
}

export enum ActionType {
  ATTACK = 'attack',
  SKILL = 'skill',
  DEFEND = 'defend',
  HEAL = 'heal'
}

export interface CombatTeam {
  heroes: string[]; // Hero IDs
  formation: number[][]; // Grid positions
}

export interface CombatAction {
  turn: number;
  actorId: string;
  actionType: ActionType;
  targetId?: string;
  skillId?: string;
  damage?: number;
  healing?: number;
  isCritical?: boolean;
}

export interface CombatState {
  id: string;
  combatType: CombatType;
  attackingTeam: CombatTeam;
  defendingTeam: CombatTeam;
  currentTurn: number;
  actionLog: CombatAction[];
  result?: CombatResult;
  rewards?: CombatRewards;
}

export interface CombatRewards {
  energyCores?: number;
  nanobots?: number;
  scrapMetal?: number;
  dataChips?: number;
  xp?: number;
  items?: string[];
}