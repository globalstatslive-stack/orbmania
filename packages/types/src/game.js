"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAME_CONSTANTS = exports.PlayerCoreSchema = exports.OrbitSlotSchema = exports.EnergyShardSchema = exports.Vector2Schema = void 0;
// Core game types - NO references to agar.io mechanics
const zod_1 = require("zod");
// Base geometric types
exports.Vector2Schema = zod_1.z.object({
    x: zod_1.z.number(),
    y: zod_1.z.number(),
});
// Energy Shard - collectible orbital objects
exports.EnergyShardSchema = zod_1.z.object({
    id: zod_1.z.string(),
    position: exports.Vector2Schema,
    velocity: exports.Vector2Schema,
    energy: zod_1.z.number().min(1).max(100),
    type: zod_1.z.enum(['basic', 'charged', 'volatile']),
    spawnTime: zod_1.z.number(),
});
// Orbit Slot - where shards orbit around player core
exports.OrbitSlotSchema = zod_1.z.object({
    index: zod_1.z.number().min(0).max(7), // Max 8 orbit slots
    shard: exports.EnergyShardSchema.nullable(),
    angle: zod_1.z.number(), // Radians
    radius: zod_1.z.number().min(30).max(120),
    rotationSpeed: zod_1.z.number(),
});
// Player Core - hexagonal/octagonal nucleus
exports.PlayerCoreSchema = zod_1.z.object({
    id: zod_1.z.string(),
    position: exports.Vector2Schema,
    velocity: exports.Vector2Schema,
    rotation: zod_1.z.number(),
    shape: zod_1.z.enum(['hexagon', 'octagon']),
    size: zod_1.z.number().min(20).max(40),
    health: zod_1.z.number().min(0).max(100),
    energy: zod_1.z.number().min(0).max(1000),
});
// Game constants
exports.GAME_CONSTANTS = {
    TICK_RATE: 30, // 30 Hz server tick rate
    MAX_PLAYERS: 50,
    ARENA_SIZE: { width: 2000, height: 2000 },
    ORBIT_SLOTS: 8,
    COLLISION_DAMAGE_MULTIPLIER: 0.5,
    DASH_COOLDOWN: 3000, // 3 seconds
    DASH_DISTANCE: 150,
    DASH_DAMAGE_REDUCTION: 0.7, // 70% damage reduction during dash
};
//# sourceMappingURL=game.js.map