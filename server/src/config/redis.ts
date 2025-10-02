import { createClient } from 'redis';
import logger from '../utils/logger';

let redisClient: ReturnType<typeof createClient> | null = null;

const REDIS_ENABLED = process.env.REDIS_ENABLED !== 'false';
console.log(`🔍 REDIS_ENABLED env var: "${process.env.REDIS_ENABLED}"`);
console.log(`🔍 REDIS_ENABLED computed: ${REDIS_ENABLED}`);

if (REDIS_ENABLED) {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379')
    },
    password: process.env.REDIS_PASSWORD || undefined
  });

  redisClient.on('error', (err) => {
    logger.error('Redis Client Error:', err);
  });

  redisClient.on('connect', () => {
    logger.info('Redis connected successfully');
  });
}

export const connectRedis = async (): Promise<void> => {
  console.log(`🔌 connectRedis called - REDIS_ENABLED: ${REDIS_ENABLED}, redisClient: ${redisClient ? 'exists' : 'null'}`);
  if (!REDIS_ENABLED || !redisClient) {
    console.log('✅ Redis is disabled - running without cache');
    logger.info('Redis is disabled - running without cache');
    return;
  }

  try {
    console.log('🔌 Attempting to connect to Redis...');
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.error('❌ Redis connection failed (continuing without cache):', error);
    logger.error('Redis connection failed (continuing without cache):', error);
  }
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.disconnect();
    logger.info('Redis disconnected');
  }
};

export default redisClient;