// Orbmania.io - Player Types
// Player entities, roles, abilities, and states - NO references to agar.io mechanics

import { z } from 'zod';
import { Vector2Schema, PlayerCoreSchema, OrbitSlotSchema, PhysicsBodySchema } from './game';

// Player roles with unique abilities
export const PlayerRoleSchema = z.enum(['RUNNER', 'BULWARK', 'TACTICIAN']);
export type PlayerRole = z.infer<typeof PlayerRoleSchema>;

// Ability Types
export const AbilityTypeSchema = z.enum(['DASH', 'SHIELD', 'EMP', 'TRAP']);
export type AbilityType = z.infer<typeof AbilityTypeSchema>;

export const AbilityStateSchema = z.enum(['READY', 'COOLDOWN', 'ACTIVE', 'DISABLED']);
export type AbilityState = z.infer<typeof AbilityStateSchema>;

// Individual Ability Definition
export const AbilitySchema = z.object({
  type: AbilityTypeSchema,
  state: AbilityStateSchema,
  cooldownRemaining: z.number().nonnegative(),
  maxCooldown: z.number().positive(),
  duration: z.number().nonnegative().optional(),
  maxDuration: z.number().positive().optional(),
  charges: z.number().nonnegative().optional(),
  maxCharges: z.number().positive().optional(),
  lastUsed: z.number().optional(),
});

export type Ability = z.infer<typeof AbilitySchema>;

// Role-specific abilities configuration
export const PlayerAbilitiesSchema = z.object({
  primary: AbilitySchema,
  secondary: AbilitySchema.optional(),
  passive: z.object({
    speedMultiplier: z.number().positive().default(1.0),
    orbitSlots: z.number().positive().max(8).default(4),
    specialEffects: z.array(z.string()).default([]),
  }),
});

export type PlayerAbilities = z.infer<typeof PlayerAbilitiesSchema>;

// Status Effects
export const StatusEffectTypeSchema = z.enum([
  'INVULNERABLE',
  'SPEED_BOOST',
  'SPEED_REDUCTION',
  'MAGNETIZED',
  'STUNNED',
  'SHIELDED',
  'PHASED',
  'OVERDRIVE',
  'EMP_DISABLED',
]);

export type StatusEffectType = z.infer<typeof StatusEffectTypeSchema>;

export const StatusEffectSchema = z.object({
  type: StatusEffectTypeSchema,
  duration: z.number().positive(),
  startTime: z.number(),
  intensity: z.number().default(1.0),
  source: z.string().optional(),
  stackable: z.boolean().default(false),
  stacks: z.number().positive().default(1),
});

export type StatusEffect = z.infer<typeof StatusEffectSchema>;

// Player Statistics
export const PlayerStatisticsSchema = z.object({
  // Match stats
  score: z.number().nonnegative().default(0),
  shardsCollected: z.number().nonnegative().default(0),
  playersEliminated: z.number().nonnegative().default(0),
  damageDealt: z.number().nonnegative().default(0),
  damageTaken: z.number().nonnegative().default(0),
  survivalTime: z.number().nonnegative().default(0),
  powerUpsUsed: z.number().nonnegative().default(0),
  abilitiesUsed: z.number().nonnegative().default(0),
  
  // Combat stats
  criticalHits: z.number().nonnegative().default(0),
  orbitalCollisions: z.number().nonnegative().default(0),
  successfulDashes: z.number().nonnegative().default(0),
  
  // Movement stats
  distanceTraveled: z.number().nonnegative().default(0),
  averageSpeed: z.number().nonnegative().default(0),
  maxSpeed: z.number().nonnegative().default(0),
});

export type PlayerStatistics = z.infer<typeof PlayerStatisticsSchema>;

// Player Preferences/Settings
export const PlayerSettingsSchema = z.object({
  graphics: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  audio: z.boolean().default(true),
  showNames: z.boolean().default(true),
  showHUD: z.boolean().default(true),
  showTrails: z.boolean().default(true),
  showDamageNumbers: z.boolean().default(true),
  cameraSmoothing: z.number().min(0).max(1).default(0.8),
  uiScale: z.number().min(0.5).max(2.0).default(1.0),
  colorBlindMode: z.boolean().default(false),
});

export type PlayerSettings = z.infer<typeof PlayerSettingsSchema>;

// Complete player state
export const PlayerStateSchema = z.object({
  // Identity
  id: z.string(),
  username: z.string().min(1).max(20),
  role: PlayerRoleSchema,
  
  // Core game state
  core: PlayerCoreSchema,
  orbitSlots: z.array(OrbitSlotSchema).max(8),
  abilities: PlayerAbilitiesSchema,
  
  // Status and effects
  statusEffects: z.array(StatusEffectSchema).default([]),
  health: z.number().min(0).max(100),
  energy: z.number().min(0).max(100),
  
  // Statistics
  stats: PlayerStatisticsSchema,
  
  // State flags
  isAlive: z.boolean().default(true),
  isSpectating: z.boolean().default(false),
  isReady: z.boolean().default(false),
  isConnected: z.boolean().default(true),
  
  // Timing
  spawnTime: z.number().optional(),
  lastInputTime: z.number().default(0),
  lastUpdateTime: z.number().default(0),
  
  // Network
  ping: z.number().nonnegative().default(0),
  packetLoss: z.number().min(0).max(1).default(0),
  
  // Team (for team-based modes)
  teamId: z.string().optional(),
  teamColor: z.string().optional(),
});

export type PlayerState = z.infer<typeof PlayerStateSchema>;

// Player input for client-server communication
export const PlayerInputSchema = z.object({
  // Movement
  movement: Vector2Schema, // Normalized direction vector (-1 to 1)
  targetPosition: Vector2Schema.optional(), // For click-to-move
  
  // Actions
  dash: z.boolean().default(false),
  useAbility: z.boolean().default(false),
  abilityTarget: Vector2Schema.optional(),
  
  // Input metadata
  timestamp: z.number(),
  sequenceNumber: z.number(),
  deltaTime: z.number().positive(),
  
  // Input state
  keys: z.object({
    up: z.boolean().default(false),
    down: z.boolean().default(false),
    left: z.boolean().default(false),
    right: z.boolean().default(false),
    space: z.boolean().default(false),
    shift: z.boolean().default(false),
  }).optional(),
});

export type PlayerInput = z.infer<typeof PlayerInputSchema>;

// Player Profile (persistent data)
export const PlayerProfileSchema = z.object({
  id: z.string(),
  username: z.string().min(1).max(20),
  email: z.string().email().optional(),
  
  // Progression
  level: z.number().positive().default(1),
  experience: z.number().nonnegative().default(0),
  totalMatches: z.number().nonnegative().default(0),
  totalWins: z.number().nonnegative().default(0),
  totalLosses: z.number().nonnegative().default(0),
  
  // Preferences
  preferredRole: PlayerRoleSchema.optional(),
  settings: PlayerSettingsSchema,
  
  // Social
  friends: z.array(z.string()).default([]),
  blockedPlayers: z.array(z.string()).default([]),
  
  // Timestamps
  createdAt: z.number(),
  lastLoginAt: z.number(),
  lastActiveAt: z.number(),
  
  // Moderation
  isBanned: z.boolean().default(false),
  banReason: z.string().optional(),
  banExpiresAt: z.number().optional(),
  warnings: z.number().nonnegative().default(0),
});

export type PlayerProfile = z.infer<typeof PlayerProfileSchema>;

// Player Session (temporary connection data)
export const PlayerSessionSchema = z.object({
  playerId: z.string(),
  sessionId: z.string(),
  socketId: z.string(),
  roomId: z.string().optional(),
  
  // Connection info
  ipAddress: z.string(),
  userAgent: z.string(),
  region: z.string(),
  
  // Session state
  isAuthenticated: z.boolean().default(false),
  connectedAt: z.number(),
  lastPingAt: z.number(),
  
  // Rate limiting
  messageCount: z.number().nonnegative().default(0),
  lastMessageTime: z.number().default(0),
  rateLimitViolations: z.number().nonnegative().default(0),
});

export type PlayerSession = z.infer<typeof PlayerSessionSchema>;

// Utility functions for role-specific configurations
export const getRoleDefaults = (role: PlayerRole): Partial<PlayerAbilities> => {
  switch (role) {
    case 'RUNNER':
      return {
        primary: {
          type: 'DASH',
          state: 'READY',
          cooldownRemaining: 0,
          maxCooldown: 3000,
          lastUsed: 0,
        },
        passive: {
          speedMultiplier: 1.4,
          orbitSlots: 4,
          specialEffects: ['critical_dash'],
        },
      };
    case 'BULWARK':
      return {
        primary: {
          type: 'SHIELD',
          state: 'READY',
          cooldownRemaining: 0,
          maxCooldown: 8000,
          duration: 0,
          maxDuration: 4000,
          lastUsed: 0,
        },
        passive: {
          speedMultiplier: 0.8,
          orbitSlots: 6,
          specialEffects: ['frontal_shield'],
        },
      };
    case 'TACTICIAN':
      return {
        primary: {
          type: 'EMP',
          state: 'READY',
          cooldownRemaining: 0,
          maxCooldown: 12000,
          lastUsed: 0,
        },
        secondary: {
          type: 'TRAP',
          state: 'READY',
          cooldownRemaining: 0,
          maxCooldown: 6000,
          charges: 2,
          maxCharges: 2,
          lastUsed: 0,
        },
        passive: {
          speedMultiplier: 1.0,
          orbitSlots: 5,
          specialEffects: ['emp_immunity'],
        },
      };
    default:
      return {};
  }
};

// Validation helpers
export const validatePlayerInput = (data: unknown): PlayerInput => {
  return PlayerInputSchema.parse(data);
};

export const validatePlayerState = (data: unknown): PlayerState => {
  return PlayerStateSchema.parse(data);
};

export const validatePlayerProfile = (data: unknown): PlayerProfile => {
  return PlayerProfileSchema.parse(data);
};