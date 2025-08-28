// Core game types - NO references to agar.io mechanics
import { z } from 'zod';

// Base geometric types
export const Vector2Schema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Vector2 = z.infer<typeof Vector2Schema>;

// Energy Shard - collectible orbital objects
export const EnergyShardSchema = z.object({
  id: z.string(),
  position: Vector2Schema,
  velocity: Vector2Schema,
  energy: z.number().min(1).max(100),
  type: z.enum(['basic', 'charged', 'volatile']),
  spawnTime: z.number(),
});

export type EnergyShard = z.infer<typeof EnergyShardSchema>;

// Orbit Slot - where shards orbit around player core
export const OrbitSlotSchema = z.object({
  index: z.number().min(0).max(7), // Max 8 orbit slots
  shard: EnergyShardSchema.nullable(),
  angle: z.number(), // Radians
  radius: z.number().min(30).max(120),
  rotationSpeed: z.number(),
});

export type OrbitSlot = z.infer<typeof OrbitSlotSchema>;

// Player Core - hexagonal/octagonal nucleus
export const PlayerCoreSchema = z.object({
  id: z.string(),
  position: Vector2Schema,
  velocity: Vector2Schema,
  rotation: z.number(),
  shape: z.enum(['hexagon', 'octagon']),
  size: z.number().min(20).max(40),
  health: z.number().min(0).max(100),
  energy: z.number().min(0).max(1000),
});

export type PlayerCore = z.infer<typeof PlayerCoreSchema>;

// Game constants
export const GAME_CONSTANTS = {
  TICK_RATE: 30, // 30 Hz server tick rate
  MAX_PLAYERS: 50,
  ARENA_SIZE: { width: 2000, height: 2000 },
  ORBIT_SLOTS: 8,
  COLLISION_DAMAGE_MULTIPLIER: 0.5,
  DASH_COOLDOWN: 3000, // 3 seconds
  DASH_DISTANCE: 150,
  DASH_DAMAGE_REDUCTION: 0.7, // 70% damage reduction during dash
} as const;