"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInputSchema = exports.PlayerStateSchema = exports.PlayerAbilitiesSchema = exports.PlayerRoleSchema = void 0;
// Player types - NO references to agar.io mechanics
const zod_1 = require("zod");
const game_1 = require("./game");
// Player roles with unique abilities
exports.PlayerRoleSchema = zod_1.z.enum(['runner', 'bulwark', 'tactician']);
// Player abilities based on role
exports.PlayerAbilitiesSchema = zod_1.z.object({
    // Runner abilities
    dashCriticalMultiplier: zod_1.z.number().optional(), // Extra damage on dash
    movementSpeedBonus: zod_1.z.number().optional(),
    // Bulwark abilities  
    frontalShieldActive: zod_1.z.boolean().optional(),
    extraOrbitSlots: zod_1.z.number().optional(), // +2 slots
    // Tactician abilities
    empCooldown: zod_1.z.number().optional(),
    gravitationalTrapCount: zod_1.z.number().optional(),
});
// Complete player state
exports.PlayerStateSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1).max(20),
    role: exports.PlayerRoleSchema,
    core: game_1.PlayerCoreSchema,
    orbitSlots: zod_1.z.array(game_1.OrbitSlotSchema).max(8),
    abilities: exports.PlayerAbilitiesSchema,
    // Combat stats
    health: zod_1.z.number().min(0).max(100),
    energy: zod_1.z.number().min(0).max(1000),
    score: zod_1.z.number().min(0),
    // Cooldowns (in milliseconds)
    dashCooldown: zod_1.z.number().min(0),
    abilityCooldown: zod_1.z.number().min(0),
    // Status effects
    isDashing: zod_1.z.boolean(),
    isInvulnerable: zod_1.z.boolean(),
    lastDamageTime: zod_1.z.number(),
    // Network
    lastUpdateTime: zod_1.z.number(),
    ping: zod_1.z.number().min(0),
});
// Player input for client-server communication
exports.PlayerInputSchema = zod_1.z.object({
    movement: game_1.Vector2Schema, // Normalized direction vector
    isDashing: zod_1.z.boolean(),
    useAbility: zod_1.z.boolean(),
    targetPosition: game_1.Vector2Schema.optional(), // For targeted abilities
    timestamp: zod_1.z.number(),
});
//# sourceMappingURL=player.js.map