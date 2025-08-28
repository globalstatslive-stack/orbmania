// Player types - NO references to agar.io mechanics
import { z } from 'zod';
import { Vector2Schema, PlayerCoreSchema, OrbitSlotSchema } from './game';

// Player roles with unique abilities
export const PlayerRoleSchema = z.enum(['runner', 'bulwark', 'tactician']);
export type PlayerRole = z.infer<typeof PlayerRoleSchema>;

// Player abilities based on role
export const PlayerAbilitiesSchema = z.object({
  // Runner abilities
  dashCriticalMultiplier: z.number().optional(), // Extra damage on dash
  movementSpeedBonus: z.number().optional(),
  
  // Bulwark abilities  
  frontalShieldActive: z.boolean().optional(),
  extraOrbitSlots: z.number().optional(), // +2 slots
  
  // Tactician abilities
  empCooldown: z.number().optional(),
  gravitationalTrapCount: z.number().optional(),
});

export type PlayerAbilities = z.infer<typeof PlayerAbilitiesSchema>;

// Complete player state
export const PlayerStateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(20),
  role: PlayerRoleSchema,
  core: PlayerCoreSchema,
  orbitSlots: z.array(OrbitSlotSchema).max(8),
  abilities: PlayerAbilitiesSchema,
  
  // Combat stats
  health: z.number().min(0).max(100),
  energy: z.number().min(0).max(1000),
  score: z.number().min(0),
  
  // Cooldowns (in milliseconds)
  dashCooldown: z.number().min(0),
  abilityCooldown: z.number().min(0),
  
  // Status effects
  isDashing: z.boolean(),
  isInvulnerable: z.boolean(),
  lastDamageTime: z.number(),
  
  // Network
  lastUpdateTime: z.number(),
  ping: z.number().min(0),
});

export type PlayerState = z.infer<typeof PlayerStateSchema>;

// Player input for client-server communication
export const PlayerInputSchema = z.object({
  movement: Vector2Schema, // Normalized direction vector
  isDashing: z.boolean(),
  useAbility: z.boolean(),
  targetPosition: Vector2Schema.optional(), // For targeted abilities
  timestamp: z.number(),
});

export type PlayerInput = z.infer<typeof PlayerInputSchema>;