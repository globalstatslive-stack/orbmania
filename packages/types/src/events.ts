// Orbmania.io - Game Event System Types
// Event-driven architecture for game state changes and notifications

import { z } from 'zod';
import { Vector2Schema, DamageEventSchema, CollisionInfoSchema } from './game';
import { PlayerRoleSchema, StatusEffectTypeSchema } from './player';
import { PowerUpTypeSchema } from './powerups';

// Base Event Schema
export const BaseEventSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  source: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Game Events
export const GameEventSchema = z.discriminatedUnion('type', [
  // Match Events
  z.object({
    type: z.literal('MATCH_STARTED'),
    ...BaseEventSchema.shape,
    matchId: z.string(),
    mode: z.enum(['FREE_FOR_ALL', 'TEAM_BATTLE', 'SURVIVAL', 'TOURNAMENT']),
    playerCount: z.number().positive(),
    mapId: z.string(),
  }),
  z.object({
    type: z.literal('MATCH_ENDED'),
    ...BaseEventSchema.shape,
    matchId: z.string(),
    duration: z.number().positive(),
    winner: z.string().optional(),
    winningTeam: z.string().optional(),
    reason: z.enum(['TIME_LIMIT', 'LAST_PLAYER', 'OBJECTIVE_COMPLETE', 'ADMIN_END']),
  }),
  z.object({
    type: z.literal('MATCH_PHASE_CHANGED'),
    ...BaseEventSchema.shape,
    matchId: z.string(),
    phase: z.enum(['WAITING', 'STARTING', 'ACTIVE', 'ENDING', 'FINISHED']),
    previousPhase: z.enum(['WAITING', 'STARTING', 'ACTIVE', 'ENDING', 'FINISHED']).optional(),
    countdown: z.number().optional(),
  }),

  // Player Events
  z.object({
    type: z.literal('PLAYER_JOINED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    username: z.string(),
    role: PlayerRoleSchema,
    position: Vector2Schema,
  }),
  z.object({
    type: z.literal('PLAYER_LEFT'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    username: z.string(),
    reason: z.enum(['VOLUNTARY', 'DISCONNECTED', 'KICKED', 'BANNED']),
  }),
  z.object({
    type: z.literal('PLAYER_SPAWNED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    position: Vector2Schema,
    spawnProtection: z.number().optional(),
  }),
  z.object({
    type: z.literal('PLAYER_ELIMINATED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    eliminatedBy: z.string().optional(),
    cause: z.enum(['COLLISION', 'OUT_OF_BOUNDS', 'TIMEOUT', 'DISCONNECT']),
    position: Vector2Schema,
    survivalTime: z.number().nonnegative(),
  }),
  z.object({
    type: z.literal('PLAYER_RESPAWNED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    position: Vector2Schema,
    respawnDelay: z.number().nonnegative(),
  }),

  // Combat Events
  z.object({
    type: z.literal('COLLISION_OCCURRED'),
    ...BaseEventSchema.shape,
    collision: CollisionInfoSchema,
    damage: z.number().nonnegative(),
    critical: z.boolean().default(false),
  }),
  z.object({
    type: z.literal('DAMAGE_DEALT'),
    ...BaseEventSchema.shape,
    damage: DamageEventSchema,
  }),
  z.object({
    type: z.literal('ORBITAL_COLLISION'),
    ...BaseEventSchema.shape,
    sourcePlayerId: z.string(),
    targetPlayerId: z.string(),
    shardId: z.string(),
    damage: z.number().positive(),
    position: Vector2Schema,
    velocity: z.number().nonnegative(),
    critical: z.boolean().default(false),
  }),

  // Energy and Collection Events
  z.object({
    type: z.literal('SHARD_SPAWNED'),
    ...BaseEventSchema.shape,
    shardId: z.string(),
    position: Vector2Schema,
    energyValue: z.number().positive(),
    shardType: z.enum(['basic', 'charged', 'volatile']),
  }),
  z.object({
    type: z.literal('SHARD_COLLECTED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    shardId: z.string(),
    energyGained: z.number().positive(),
    orbitSlot: z.number().nonnegative(),
    position: Vector2Schema,
  }),
  z.object({
    type: z.literal('SHARD_EXPIRED'),
    ...BaseEventSchema.shape,
    shardId: z.string(),
    position: Vector2Schema,
    lifetime: z.number().positive(),
  }),
  z.object({
    type: z.literal('ORBIT_STABILIZED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    shardId: z.string(),
    orbitSlot: z.number().nonnegative(),
    radius: z.number().positive(),
    angularVelocity: z.number(),
  }),

  // Ability Events
  z.object({
    type: z.literal('ABILITY_USED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    abilityType: z.enum(['DASH', 'SHIELD', 'EMP', 'TRAP']),
    position: Vector2Schema,
    target: Vector2Schema.optional(),
    success: z.boolean(),
    cooldownRemaining: z.number().nonnegative(),
  }),
  z.object({
    type: z.literal('DASH_EXECUTED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    startPosition: Vector2Schema,
    endPosition: Vector2Schema,
    distance: z.number().positive(),
    damageReduction: z.number().min(0).max(1),
    playersHit: z.array(z.string()),
  }),
  z.object({
    type: z.literal('SHIELD_ACTIVATED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    duration: z.number().positive(),
    shieldArc: z.number().min(0).max(360),
    position: Vector2Schema,
    rotation: z.number(),
  }),
  z.object({
    type: z.literal('EMP_DETONATED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    position: Vector2Schema,
    radius: z.number().positive(),
    affectedPlayers: z.array(z.string()),
    disableDuration: z.number().positive(),
  }),
  z.object({
    type: z.literal('TRAP_PLACED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    trapId: z.string(),
    position: Vector2Schema,
    radius: z.number().positive(),
    duration: z.number().positive(),
  }),
  z.object({
    type: z.literal('TRAP_TRIGGERED'),
    ...BaseEventSchema.shape,
    trapId: z.string(),
    triggeredBy: z.string(),
    position: Vector2Schema,
    pullForce: z.number().positive(),
    affectedPlayers: z.array(z.string()),
  }),

  // Power-up Events
  z.object({
    type: z.literal('POWERUP_SPAWNED'),
    ...BaseEventSchema.shape,
    powerUpId: z.string(),
    powerUpType: PowerUpTypeSchema,
    position: Vector2Schema,
    duration: z.number().positive(),
  }),
  z.object({
    type: z.literal('POWERUP_COLLECTED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    powerUpId: z.string(),
    powerUpType: PowerUpTypeSchema,
    position: Vector2Schema,
  }),
  z.object({
    type: z.literal('POWERUP_ACTIVATED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    powerUpType: PowerUpTypeSchema,
    duration: z.number().positive(),
    effects: z.array(z.string()),
  }),
  z.object({
    type: z.literal('POWERUP_EXPIRED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    powerUpType: PowerUpTypeSchema,
    duration: z.number().positive(),
  }),

  // Status Effect Events
  z.object({
    type: z.literal('STATUS_EFFECT_APPLIED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    effectType: StatusEffectTypeSchema,
    duration: z.number().positive(),
    intensity: z.number().default(1.0),
    sourcePlayerId: z.string().optional(),
  }),
  z.object({
    type: z.literal('STATUS_EFFECT_REMOVED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    effectType: StatusEffectTypeSchema,
    reason: z.enum(['EXPIRED', 'DISPELLED', 'OVERRIDDEN', 'DEATH']),
  }),

  // Environmental Events
  z.object({
    type: z.literal('WALL_COLLISION'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    wallId: z.string(),
    position: Vector2Schema,
    reflectionAngle: z.number(),
    velocityChange: Vector2Schema,
  }),
  z.object({
    type: z.literal('BOUNDARY_VIOLATION'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    position: Vector2Schema,
    violationType: z.enum(['OUT_OF_BOUNDS', 'SAFE_ZONE_EXIT']),
  }),

  // Score and Achievement Events
  z.object({
    type: z.literal('SCORE_CHANGED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    previousScore: z.number().nonnegative(),
    newScore: z.number().nonnegative(),
    scoreChange: z.number(),
    reason: z.string(),
  }),
  z.object({
    type: z.literal('ACHIEVEMENT_UNLOCKED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    achievementId: z.string(),
    achievementName: z.string(),
    description: z.string(),
  }),
  z.object({
    type: z.literal('MILESTONE_REACHED'),
    ...BaseEventSchema.shape,
    playerId: z.string(),
    milestoneType: z.enum(['KILLS', 'SHARDS', 'SURVIVAL_TIME', 'SCORE']),
    value: z.number().nonnegative(),
    milestone: z.number().positive(),
  }),

  // System Events
  z.object({
    type: z.literal('SERVER_TICK'),
    ...BaseEventSchema.shape,
    tickNumber: z.number().nonnegative(),
    deltaTime: z.number().positive(),
    playerCount: z.number().nonnegative(),
    shardCount: z.number().nonnegative(),
  }),
  z.object({
    type: z.literal('PERFORMANCE_WARNING'),
    ...BaseEventSchema.shape,
    metric: z.enum(['CPU', 'MEMORY', 'NETWORK', 'TICK_RATE']),
    value: z.number(),
    threshold: z.number(),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  }),
]);

export type GameEvent = z.infer<typeof GameEventSchema>;

// Event Handler Types
export type EventHandler<T extends GameEvent = GameEvent> = (event: T) => void | Promise<void>;

export type EventHandlerMap = {
  [K in GameEvent['type']]: EventHandler<Extract<GameEvent, { type: K }>>;
};

// Event Bus Interface
export interface EventBus {
  emit<T extends GameEvent>(event: T): void;
  on<K extends GameEvent['type']>(
    eventType: K,
    handler: EventHandler<Extract<GameEvent, { type: K }>>
  ): void;
  off<K extends GameEvent['type']>(
    eventType: K,
    handler: EventHandler<Extract<GameEvent, { type: K }>>
  ): void;
  once<K extends GameEvent['type']>(
    eventType: K,
    handler: EventHandler<Extract<GameEvent, { type: K }>>
  ): void;
  removeAllListeners(eventType?: GameEvent['type']): void;
  getListenerCount(eventType: GameEvent['type']): number;
}

// Event Filter Types
export const EventFilterSchema = z.object({
  types: z.array(z.string()).optional(),
  playerId: z.string().optional(),
  timeRange: z.object({
    start: z.number(),
    end: z.number(),
  }).optional(),
  source: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type EventFilter = z.infer<typeof EventFilterSchema>;

// Event Query Types
export const EventQuerySchema = z.object({
  filter: EventFilterSchema.optional(),
  limit: z.number().positive().max(1000).default(100),
  offset: z.number().nonnegative().default(0),
  sortBy: z.enum(['timestamp', 'type', 'source']).default('timestamp'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type EventQuery = z.infer<typeof EventQuerySchema>;

// Event Statistics
export const EventStatsSchema = z.object({
  totalEvents: z.number().nonnegative(),
  eventsByType: z.record(z.number().nonnegative()),
  eventsPerSecond: z.number().nonnegative(),
  averageProcessingTime: z.number().nonnegative(),
  errorRate: z.number().min(0).max(1),
  timeRange: z.object({
    start: z.number(),
    end: z.number(),
  }),
});

export type EventStats = z.infer<typeof EventStatsSchema>;

// Validation helpers
export const validateGameEvent = (data: unknown): GameEvent => {
  return GameEventSchema.parse(data);
};

export const validateEventFilter = (data: unknown): EventFilter => {
  return EventFilterSchema.parse(data);
};

export const validateEventQuery = (data: unknown): EventQuery => {
  return EventQuerySchema.parse(data);
};

// Event creation helpers
export const createEvent = <T extends GameEvent['type']>(
  type: T,
  data: Omit<Extract<GameEvent, { type: T }>, 'id' | 'timestamp' | 'type'>
): Extract<GameEvent, { type: T }> => {
  return {
    type,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    ...data,
  } as Extract<GameEvent, { type: T }>;
};

// Event type guards
export const isPlayerEvent = (event: GameEvent): boolean => {
  return [
    'PLAYER_JOINED',
    'PLAYER_LEFT',
    'PLAYER_SPAWNED',
    'PLAYER_ELIMINATED',
    'PLAYER_RESPAWNED',
  ].includes(event.type);
};

export const isCombatEvent = (event: GameEvent): boolean => {
  return [
    'COLLISION_OCCURRED',
    'DAMAGE_DEALT',
    'ORBITAL_COLLISION',
  ].includes(event.type);
};

export const isAbilityEvent = (event: GameEvent): boolean => {
  return [
    'ABILITY_USED',
    'DASH_EXECUTED',
    'SHIELD_ACTIVATED',
    'EMP_DETONATED',
    'TRAP_PLACED',
    'TRAP_TRIGGERED',
  ].includes(event.type);
};