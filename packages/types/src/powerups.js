"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POWERUP_CONFIGS = exports.ActivePowerUpSchema = exports.PowerUpSchema = exports.PowerUpTypeSchema = void 0;
// Power-up types - Original abilities, no agar.io references
const zod_1 = require("zod");
const game_1 = require("./game");
// Power-up types
exports.PowerUpTypeSchema = zod_1.z.enum([
    'overdrive', // Temporary speed + energy generation boost
    'magnet_surge', // Attract nearby shards automatically
    'phase_shift', // Brief invulnerability + pass through orbits
    'orbit_split', // Duplicate current orbiting shards
]);
// Power-up entity in the arena
exports.PowerUpSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: exports.PowerUpTypeSchema,
    position: game_1.Vector2Schema,
    spawnTime: zod_1.z.number(),
    duration: zod_1.z.number(), // How long it stays in arena (ms)
    isActive: zod_1.z.boolean(),
    // Visual properties
    glowColor: zod_1.z.string(),
    pulseRate: zod_1.z.number(), // Animation speed
});
// Active power-up effect on player
exports.ActivePowerUpSchema = zod_1.z.object({
    type: exports.PowerUpTypeSchema,
    startTime: zod_1.z.number(),
    duration: zod_1.z.number(), // Effect duration (ms)
    intensity: zod_1.z.number().min(0.1).max(3.0), // Effect strength multiplier
});
// Power-up configurations
exports.POWERUP_CONFIGS = {
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
};
//# sourceMappingURL=powerups.js.map