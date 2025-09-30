import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import logger from '../utils/logger';

const SALT_ROUNDS = 10;

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerPlayer = async (data: RegisterData) => {
  const { username, email, password } = data;

  // Check if user already exists
  const existingPlayer = await prisma.player.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  });

  if (existingPlayer) {
    throw new Error('Player with this email or username already exists');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create player with initial resources and base
  const player = await prisma.player.create({
    data: {
      username,
      email,
      passwordHash,
      resources: {
        create: {
          energyCores: 1000,
          nanobots: 500,
          scrapMetal: 500,
          dataChips: 100
        }
      },
      base: {
        create: {}
      }
    },
    include: {
      resources: true
    }
  });

  // Generate tokens
  const accessToken = generateAccessToken({ playerId: player.id, email: player.email });
  const refreshToken = generateRefreshToken({ playerId: player.id, email: player.email });

  logger.info(`New player registered: ${username}`);

  return {
    player: {
      id: player.id,
      username: player.username,
      email: player.email,
      level: player.level,
      xp: player.xp,
      resources: player.resources!
    },
    tokens: {
      accessToken,
      refreshToken
    }
  };
};

export const loginPlayer = async (data: LoginData) => {
  const { email, password } = data;

  // Find player
  const player = await prisma.player.findUnique({
    where: { email },
    include: {
      resources: true,
      allianceMember: {
        include: {
          alliance: true
        }
      }
    }
  });

  if (!player) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, player.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  await prisma.player.update({
    where: { id: player.id },
    data: { lastLogin: new Date() }
  });

  // Generate tokens
  const accessToken = generateAccessToken({ playerId: player.id, email: player.email });
  const refreshToken = generateRefreshToken({ playerId: player.id, email: player.email });

  logger.info(`Player logged in: ${player.username}`);

  return {
    player: {
      id: player.id,
      username: player.username,
      email: player.email,
      level: player.level,
      xp: player.xp,
      resources: player.resources!,
      allianceId: player.allianceMember?.alliance.id,
      allianceName: player.allianceMember?.alliance.name,
      allianceRole: player.allianceMember?.role
    },
    tokens: {
      accessToken,
      refreshToken
    }
  };
};