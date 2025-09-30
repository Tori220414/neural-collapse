// Shared player types

import { Resources } from './Resources';

export interface Player {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  createdAt: Date;
  lastLogin: Date;
}

export interface PlayerProfile extends Player {
  resources: Resources;
  allianceId?: string;
  allianceName?: string;
  allianceRole?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  player: PlayerProfile;
  tokens: AuthTokens;
}