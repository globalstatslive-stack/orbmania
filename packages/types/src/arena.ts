// Arena and map types - Original geometric designs
import { z } from 'zod';
import { Vector2Schema } from './game';

// Wall types for Prism Yard map
export const WallTypeSchema = z.enum(['reflective', 'absorbing', 'portal']);
export type WallType = z.infer<typeof WallTypeSchema>;

// Wall geometry
export const WallSchema = z.object({
  id: z.string(),
  type: WallTypeSchema,
  start: Vector2Schema,
  end: Vector2Schema,
  normal: Vector2Schema, // Surface normal for reflections
  reflectionAngle: z.number().optional(), // For angled reflections (60° in Prism Yard)
  thickness: z.number().min(1).max(20),
});

export type Wall = z.infer<typeof WallSchema>;

// Spawn zones for players and shards
export const SpawnZoneSchema = z.object({
  id: z.string(),
  center: Vector2Schema,
  radius: z.number().min(50).max(200),
  type: z.enum(['player', 'shard', 'powerup']),
  cooldown: z.number().min(0), // Respawn cooldown in ms
});

export type SpawnZone = z.infer<typeof SpawnZoneSchema>;

// Complete arena definition
export const ArenaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  
  // Dimensions
  width: z.number().min(1000).max(5000),
  height: z.number().min(1000).max(5000),
  
  // Geometry
  walls: z.array(WallSchema),
  spawnZones: z.array(SpawnZoneSchema),
  
  // Visual theme
  backgroundColor: z.string(),
  wallColor: z.string(),
  ambientEffects: z.array(z.string()).optional(),
  
  // Gameplay settings
  maxPlayers: z.number().min(2).max(50),
  shardSpawnRate: z.number().min(0.1).max(5.0), // Shards per second
  powerupSpawnRate: z.number().min(0.01).max(1.0),
});

export type Arena = z.infer<typeof ArenaSchema>;

// Prism Yard - First map with 60° reflective walls
export const PRISM_YARD_ARENA: Arena = {
  id: 'prism_yard',
  name: 'Prism Yard',
  description: 'Hexagonal arena with 60° reflective crystal walls',
  width: 2000,
  height: 2000,
  backgroundColor: '#0B1021',
  wallColor: '#6EE7F2',
  maxPlayers: 20,
  shardSpawnRate: 2.0,
  powerupSpawnRate: 0.1,
  walls: [
    // Hexagonal boundary walls with 60° reflection angles
    // TODO: Generate hexagonal wall geometry
  ],
  spawnZones: [
    // Player spawn zones in corners
    {
      id: 'player_spawn_1',
      center: { x: 300, y: 300 },
      radius: 100,
      type: 'player',
      cooldown: 0,
    },
    // Shard spawn zones throughout arena
    {
      id: 'shard_spawn_center',
      center: { x: 1000, y: 1000 },
      radius: 150,
      type: 'shard',
      cooldown: 1000,
    },
  ],
};