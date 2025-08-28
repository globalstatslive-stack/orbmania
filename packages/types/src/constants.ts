// Orbmania.io - Game Constants
// All game balance and configuration constants

import { z } from 'zod';

// Physics Constants
export const PHYSICS_CONSTANTS = {
  // Tick rate and timing
  TICK_RATE: 30, // Hz
  TICK_INTERVAL: 1000 / 30, // ms
  MAX_DELTA_TIME: 100, // ms - prevent large jumps
  
  // Arena boundaries
  ARENA_WIDTH: 2000,
  ARENA_HEIGHT: 2000,
  ARENA_PADDING: 50,
  
  // Player core physics
  CORE_RADIUS: 12,
  CORE_MASS: 1.0,
  MAX_VELOCITY: 300, // pixels/second
  ACCELERATION: 800, // pixels/second²
  FRICTION: 0.85, // velocity multiplier per tick
  
  // Energy shard physics
  SHARD_RADIUS: 4,
  SHARD_MASS: 0.1,
  SHARD_SPAWN_RATE: 2.0, // shards per second
  SHARD_LIFETIME: 30000, // ms
  SHARD_COLLECTION_DISTANCE: 20,
  
  // Orbital mechanics
  ORBIT_RADIUS_MIN: 25,
  ORBIT_RADIUS_MAX: 60,
  ORBIT_SPEED_BASE: 120, // degrees/second
  ORBIT_SPEED_VARIANCE: 0.3,
  MAX_ORBIT_SLOTS: 8,
  ORBIT_COLLISION_DAMAGE_BASE: 10,
  
  // Collision detection
  COLLISION_GRID_SIZE: 64,
  COLLISION_LAYERS: {
    CORES: 1,
    SHARDS: 2,
    ORBITS: 4,
    WALLS: 8,
    POWERUPS: 16,
  } as const,
} as const;

// Player Role Constants
export const ROLE_CONSTANTS = {
  RUNNER: {
    SPEED_MULTIPLIER: 1.4,
    DASH_COOLDOWN: 3000, // ms
    DASH_DISTANCE: 120,
    DASH_DAMAGE_MULTIPLIER: 2.0,
    ORBIT_SLOTS: 4,
  },
  BULWARK: {
    SPEED_MULTIPLIER: 0.8,
    SHIELD_COOLDOWN: 8000, // ms
    SHIELD_DURATION: 4000, // ms
    SHIELD_ARC: 90, // degrees
    ORBIT_SLOTS: 6,
  },
  TACTICIAN: {
    SPEED_MULTIPLIER: 1.0,
    EMP_COOLDOWN: 12000, // ms
    EMP_RADIUS: 100,
    TRAP_COOLDOWN: 6000, // ms
    ORBIT_SLOTS: 5,
  },
} as const;

// Power-up Constants
export const POWERUP_CONSTANTS = {
  SPAWN_INTERVAL: 15000, // ms
  MAX_ACTIVE_POWERUPS: 3,
  
  OVERDRIVE: {
    DURATION: 8000, // ms
    SPEED_BOOST: 1.5,
    ENERGY_GENERATION_BOOST: 2.0,
    COOLDOWN: 30000, // ms
  },
  MAGNET_SURGE: {
    DURATION: 6000, // ms
    ATTRACTION_RADIUS: 150,
    ATTRACTION_FORCE: 400,
    COOLDOWN: 25000, // ms
  },
  PHASE_SHIFT: {
    DURATION: 3000, // ms
    INVULNERABILITY: true,
    PASS_THROUGH_ORBITS: true,
    COOLDOWN: 35000, // ms
  },
  ORBIT_SPLIT: {
    SPLIT_MULTIPLIER: 2,
    SPLIT_DURATION: 10000, // ms
    COOLDOWN: 40000, // ms
  },
} as const;

// Network Constants
export const NETWORK_CONSTANTS = {
  // Connection limits
  MAX_PLAYERS_PER_ROOM: 50,
  MAX_ROOMS_PER_SERVER: 10,
  CONNECTION_TIMEOUT: 30000, // ms
  PING_INTERVAL: 5000, // ms
  
  // Message rates
  INPUT_RATE_LIMIT: 60, // messages per second
  CHAT_RATE_LIMIT: 5, // messages per second
  
  // Packet sizes
  MAX_MESSAGE_SIZE: 1024, // bytes
  MAX_CHAT_LENGTH: 100, // characters
  MAX_USERNAME_LENGTH: 20, // characters
  
  // Interpolation
  CLIENT_PREDICTION_TIME: 100, // ms
  SERVER_RECONCILIATION_BUFFER: 200, // ms
} as const;

// Game Balance Constants
export const BALANCE_CONSTANTS = {
  // Scoring
  SHARD_COLLECTION_POINTS: 1,
  PLAYER_ELIMINATION_POINTS: 10,
  SURVIVAL_BONUS_PER_MINUTE: 5,
  
  // Energy system
  STARTING_ENERGY: 0,
  MAX_ENERGY: 100,
  ENERGY_DECAY_RATE: 0.1, // per second when not collecting
  
  // Match settings
  MATCH_DURATION: 300000, // ms (5 minutes)
  ELIMINATION_RESPAWN_TIME: 5000, // ms
  SAFE_SPAWN_RADIUS: 100,
  
  // Leaderboard
  TOP_PLAYERS_COUNT: 10,
  MATCH_HISTORY_LIMIT: 50,
} as const;

// Map Constants
export const MAP_CONSTANTS = {
  PRISM_YARD: {
    TYPE: 'hexagonal',
    WALL_COUNT: 6,
    WALL_REFLECTION_ANGLE: 60, // degrees
    CRYSTAL_WALL_THICKNESS: 8,
    SPAWN_ZONES: 6,
    POWERUP_SPAWN_POINTS: 8,
  },
} as const;

// Validation Schemas
export const PhysicsConstantsSchema = z.object({
  TICK_RATE: z.number().positive(),
  TICK_INTERVAL: z.number().positive(),
  MAX_DELTA_TIME: z.number().positive(),
  ARENA_WIDTH: z.number().positive(),
  ARENA_HEIGHT: z.number().positive(),
  ARENA_PADDING: z.number().nonnegative(),
  CORE_RADIUS: z.number().positive(),
  CORE_MASS: z.number().positive(),
  MAX_VELOCITY: z.number().positive(),
  ACCELERATION: z.number().positive(),
  FRICTION: z.number().min(0).max(1),
});

export const RoleConstantsSchema = z.object({
  RUNNER: z.object({
    SPEED_MULTIPLIER: z.number().positive(),
    DASH_COOLDOWN: z.number().positive(),
    DASH_DISTANCE: z.number().positive(),
    DASH_DAMAGE_MULTIPLIER: z.number().positive(),
    ORBIT_SLOTS: z.number().positive().max(8),
  }),
  BULWARK: z.object({
    SPEED_MULTIPLIER: z.number().positive(),
    SHIELD_COOLDOWN: z.number().positive(),
    SHIELD_DURATION: z.number().positive(),
    SHIELD_ARC: z.number().min(0).max(360),
    ORBIT_SLOTS: z.number().positive().max(8),
  }),
  TACTICIAN: z.object({
    SPEED_MULTIPLIER: z.number().positive(),
    EMP_COOLDOWN: z.number().positive(),
    EMP_RADIUS: z.number().positive(),
    TRAP_COOLDOWN: z.number().positive(),
    ORBIT_SLOTS: z.number().positive().max(8),
  }),
});

// Type exports
export type PhysicsConstants = typeof PHYSICS_CONSTANTS;
export type RoleConstants = typeof ROLE_CONSTANTS;
export type PowerUpConstants = typeof POWERUP_CONSTANTS;
export type NetworkConstants = typeof NETWORK_CONSTANTS;
export type BalanceConstants = typeof BALANCE_CONSTANTS;
export type MapConstants = typeof MAP_CONSTANTS;