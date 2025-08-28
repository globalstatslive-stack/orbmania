// Power-up types - Original abilities, no agar.io references
import { z } from 'zod';
import { Vector2Schema } from './game';

// Power-up types
export const PowerUpTypeSchema = z.enum([
  'overdrive',      // Temporary speed + energy generation boost
  'magnet_surge',   // Attract nearby shards automatically
  'phase_shift',    // Brief invulnerability + pass through orbits
  'orbit_split',    // Duplicate current orbiting shards
]);

export type PowerUpType = z.infer<typeof PowerUpTypeSchema>;

// Power-up entity in the arena
export const PowerUpSchema = z.object({
  id: z.string(),
  type: PowerUpTypeSchema,
  position: Vector2Schema,
  spawnTime: z.number(),
  duration: z.number(), // How long it stays in arena (ms)
  isActive: z.boolean(),
  
  // Visual properties
  glowColor: z.string(),
  pulseRate: z.number(), // Animation speed
});

export type PowerUp = z.infer<typeof PowerUpSchema>;

// Active power-up effect on player
export const ActivePowerUpSchema = z.object({
  type: PowerUpTypeSchema,
  startTime: z.number(),
  duration: z.number(), // Effect duration (ms)
  intensity: z.number().min(0.1).max(3.0), // Effect strength multiplier
});

export type ActivePowerUp = z.infer<typeof ActivePowerUpSchema>;

// Power-up configurations
export const POWERUP_CONFIGS = {
  overdrive: {
    duration: 8000, // 8 seconds
    speedMultiplier: 1.5,
    energyGenerationMultiplier: 2.0,
    glowColor: '#F59E0B', // Amber
    spawnWeight: 25, // Relative spawn probability
  },
  magnet_surge: {
    duration: 6000, // 6 seconds  
    attractionRadius: 200,
    attractionForce: 150,
    glowColor: '#6EE7F2', // Cyan
    spawnWeight: 20,
  },
  phase_shift: {
    duration: 3000, // 3 seconds
    invulnerabilityFrames: true,
    orbitPassThrough: true,
    glowColor: '#22C55E', // Green
    spawnWeight: 15, // Rarer due to power
  },
  orbit_split: {
    duration: 0, // Instant effect
    duplicateCount: 1, // Duplicate each orbiting shard once
    glowColor: '#EF4444', // Red
    spawnWeight: 10, // Rarest
  },
} as const;

export type PowerUpConfig = typeof POWERUP_CONFIGS[PowerUpType];