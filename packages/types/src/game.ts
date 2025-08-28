// Orbmania.io - Core Game Types
// Fundamental game entities and physics types - NO references to agar.io mechanics

import { z } from 'zod';

// Basic 2D Vector
export const Vector2Schema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Vector2 = z.infer<typeof Vector2Schema>;

// Physics Types
export const PhysicsBodySchema = z.object({
  position: Vector2Schema,
  velocity: Vector2Schema,
  acceleration: Vector2Schema,
  mass: z.number().positive(),
  radius: z.number().positive(),
  rotation: z.number(), // radians
  angularVelocity: z.number(), // radians per second
});

export type PhysicsBody = z.infer<typeof PhysicsBodySchema>;

// Collision Types
export const CollisionLayerSchema = z.enum(['CORES', 'SHARDS', 'ORBITS', 'WALLS', 'POWERUPS']);
export type CollisionLayer = z.infer<typeof CollisionLayerSchema>;

export const CollisionInfoSchema = z.object({
  entityA: z.string(),
  entityB: z.string(),
  point: Vector2Schema,
  normal: Vector2Schema,
  penetration: z.number(),
  impulse: z.number(),
  timestamp: z.number(),
});

export type CollisionInfo = z.infer<typeof CollisionInfoSchema>;

// Player Core (the central entity)
export const PlayerCoreSchema = z.object({
  id: z.string(),
  physics: PhysicsBodySchema,
  shape: z.enum(['hexagon', 'octagon']),
  health: z.number().min(0).max(100),
  energy: z.number().min(0).max(100),
  maxEnergy: z.number().positive(),
  energyRegenRate: z.number().nonnegative(),
  invulnerable: z.boolean().default(false),
  invulnerabilityEndTime: z.number().optional(),
  lastDamageTime: z.number().default(0),
});

export type PlayerCore = z.infer<typeof PlayerCoreSchema>;

// Energy Shard (collectible orbital objects)
export const EnergyShardSchema = z.object({
  id: z.string(),
  physics: PhysicsBodySchema,
  energyValue: z.number().positive(),
  type: z.enum(['basic', 'charged', 'volatile']),
  spawnTime: z.number(),
  lifetime: z.number().positive(),
  collected: z.boolean().default(false),
  collectedBy: z.string().optional(),
  magnetized: z.boolean().default(false),
  magnetTarget: z.string().optional(),
});

export type EnergyShard = z.infer<typeof EnergyShardSchema>;

// Orbit Slot (where shards orbit around player core)
export const OrbitSlotSchema = z.object({
  index: z.number().nonnegative(),
  occupied: z.boolean(),
  shardId: z.string().optional(),
  angle: z.number(), // radians
  radius: z.number().positive(),
  angularVelocity: z.number(), // radians per second
  orbitDirection: z.enum(['clockwise', 'counterclockwise']).default('clockwise'),
  stabilized: z.boolean().default(false),
});

export type OrbitSlot = z.infer<typeof OrbitSlotSchema>;

// Game State Types
export const GamePhaseSchema = z.enum(['WAITING', 'STARTING', 'ACTIVE', 'ENDING', 'FINISHED']);
export type GamePhase = z.infer<typeof GamePhaseSchema>;

export const GameModeSchema = z.enum(['FREE_FOR_ALL', 'TEAM_BATTLE', 'SURVIVAL', 'TOURNAMENT']);
export type GameMode = z.infer<typeof GameModeSchema>;

export const GameRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  mode: GameModeSchema,
  phase: GamePhaseSchema,
  maxPlayers: z.number().positive(),
  currentPlayers: z.number().nonnegative(),
  playerIds: z.array(z.string()),
  spectatorIds: z.array(z.string()),
  mapId: z.string(),
  startTime: z.number().optional(),
  endTime: z.number().optional(),
  duration: z.number().positive(),
  settings: z.record(z.unknown()),
  private: z.boolean().default(false),
  password: z.string().optional(),
  region: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type GameRoom = z.infer<typeof GameRoomSchema>;

// Match Statistics
export const PlayerStatsSchema = z.object({
  playerId: z.string(),
  username: z.string(),
  score: z.number().nonnegative(),
  shardsCollected: z.number().nonnegative(),
  playersEliminated: z.number().nonnegative(),
  damageDealt: z.number().nonnegative(),
  damageTaken: z.number().nonnegative(),
  survivalTime: z.number().nonnegative(),
  powerUpsUsed: z.number().nonnegative(),
  rank: z.number().positive(),
  eliminated: z.boolean().default(false),
  eliminatedBy: z.string().optional(),
  eliminatedAt: z.number().optional(),
});

export type PlayerStats = z.infer<typeof PlayerStatsSchema>;

export const MatchResultSchema = z.object({
  matchId: z.string(),
  roomId: z.string(),
  mode: GameModeSchema,
  mapId: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  duration: z.number(),
  playerStats: z.array(PlayerStatsSchema),
  winner: z.string().optional(),
  winningTeam: z.string().optional(),
  totalPlayers: z.number().positive(),
  region: z.string(),
});

export type MatchResult = z.infer<typeof MatchResultSchema>;

// Leaderboard Types
export const LeaderboardEntrySchema = z.object({
  playerId: z.string(),
  username: z.string(),
  rank: z.number().positive(),
  score: z.number().nonnegative(),
  wins: z.number().nonnegative(),
  losses: z.number().nonnegative(),
  matchesPlayed: z.number().nonnegative(),
  winRate: z.number().min(0).max(1),
  averageScore: z.number().nonnegative(),
  bestScore: z.number().nonnegative(),
  totalShardsCollected: z.number().nonnegative(),
  totalPlayersEliminated: z.number().nonnegative(),
  totalSurvivalTime: z.number().nonnegative(),
  lastActive: z.number(),
});

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const LeaderboardSchema = z.object({
  type: z.enum(['GLOBAL', 'REGIONAL', 'WEEKLY', 'MONTHLY']),
  region: z.string().optional(),
  entries: z.array(LeaderboardEntrySchema),
  totalEntries: z.number().nonnegative(),
  lastUpdated: z.number(),
  season: z.string().optional(),
});

export type Leaderboard = z.infer<typeof LeaderboardSchema>;

// Damage System
export const DamageTypeSchema = z.enum(['COLLISION', 'ORBITAL', 'ABILITY', 'ENVIRONMENTAL']);
export type DamageType = z.infer<typeof DamageTypeSchema>;

export const DamageEventSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  type: DamageTypeSchema,
  amount: z.number().positive(),
  position: Vector2Schema,
  timestamp: z.number(),
  critical: z.boolean().default(false),
  blocked: z.boolean().default(false),
  absorbed: z.boolean().default(false),
});

export type DamageEvent = z.infer<typeof DamageEventSchema>;

// Spatial Partitioning (for collision detection optimization)
export const SpatialGridSchema = z.object({
  cellSize: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  cells: z.array(z.array(z.string())), // entity IDs in each cell
});

export type SpatialGrid = z.infer<typeof SpatialGridSchema>;

// Game Tick Data
export const GameTickSchema = z.object({
  tickNumber: z.number().nonnegative(),
  timestamp: z.number(),
  deltaTime: z.number().positive(),
  playerCores: z.array(PlayerCoreSchema),
  energyShards: z.array(EnergyShardSchema),
  collisions: z.array(CollisionInfoSchema),
  damageEvents: z.array(DamageEventSchema),
  spatialGrid: SpatialGridSchema.optional(),
});

export type GameTick = z.infer<typeof GameTickSchema>;