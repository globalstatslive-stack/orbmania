"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRISM_YARD_ARENA = exports.ArenaSchema = exports.SpawnZoneSchema = exports.WallSchema = exports.WallTypeSchema = void 0;
// Arena and map types - Original geometric designs
const zod_1 = require("zod");
const game_1 = require("./game");
// Wall types for Prism Yard map
exports.WallTypeSchema = zod_1.z.enum(['reflective', 'absorbing', 'portal']);
// Wall geometry
exports.WallSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: exports.WallTypeSchema,
    start: game_1.Vector2Schema,
    end: game_1.Vector2Schema,
    normal: game_1.Vector2Schema, // Surface normal for reflections
    reflectionAngle: zod_1.z.number().optional(), // For angled reflections (60° in Prism Yard)
    thickness: zod_1.z.number().min(1).max(20),
});
// Spawn zones for players and shards
exports.SpawnZoneSchema = zod_1.z.object({
    id: zod_1.z.string(),
    center: game_1.Vector2Schema,
    radius: zod_1.z.number().min(50).max(200),
    type: zod_1.z.enum(['player', 'shard', 'powerup']),
    cooldown: zod_1.z.number().min(0), // Respawn cooldown in ms
});
// Complete arena definition
exports.ArenaSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    // Dimensions
    width: zod_1.z.number().min(1000).max(5000),
    height: zod_1.z.number().min(1000).max(5000),
    // Geometry
    walls: zod_1.z.array(exports.WallSchema),
    spawnZones: zod_1.z.array(exports.SpawnZoneSchema),
    // Visual theme
    backgroundColor: zod_1.z.string(),
    wallColor: zod_1.z.string(),
    ambientEffects: zod_1.z.array(zod_1.z.string()).optional(),
    // Gameplay settings
    maxPlayers: zod_1.z.number().min(2).max(50),
    shardSpawnRate: zod_1.z.number().min(0.1).max(5.0), // Shards per second
    powerupSpawnRate: zod_1.z.number().min(0.01).max(1.0),
});
// Prism Yard - First map with 60° reflective walls
exports.PRISM_YARD_ARENA = {
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
//# sourceMappingURL=arena.js.map