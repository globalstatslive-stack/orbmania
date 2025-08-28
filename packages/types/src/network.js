"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerMessageSchema = exports.ClientMessageSchema = void 0;
// Network message types - Strict typing for client-server communication
const zod_1 = require("zod");
const player_1 = require("./player");
const game_1 = require("./game");
// Client to Server messages
exports.ClientMessageSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        type: zod_1.z.literal('join_game'),
        payload: zod_1.z.object({
            playerName: zod_1.z.string().min(1).max(20),
            preferredRole: zod_1.z.enum(['runner', 'bulwark', 'tactician']),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('player_input'),
        payload: player_1.PlayerInputSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal('ping'),
        payload: zod_1.z.object({
            timestamp: zod_1.z.number(),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('leave_game'),
        payload: zod_1.z.object({}),
    }),
]);
// Server to Client messages
exports.ServerMessageSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        type: zod_1.z.literal('game_joined'),
        payload: zod_1.z.object({
            playerId: zod_1.z.string(),
            playerState: player_1.PlayerStateSchema,
            gameState: zod_1.z.object({
                arena: zod_1.z.object({
                    width: zod_1.z.number(),
                    height: zod_1.z.number(),
                }),
                tickRate: zod_1.z.number(),
            }),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('game_state_update'),
        payload: zod_1.z.object({
            players: zod_1.z.array(player_1.PlayerStateSchema),
            shards: zod_1.z.array(game_1.EnergyShardSchema),
            timestamp: zod_1.z.number(),
            tick: zod_1.z.number(),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('player_eliminated'),
        payload: zod_1.z.object({
            playerId: zod_1.z.string(),
            eliminatedBy: zod_1.z.string().optional(),
            reason: zod_1.z.enum(['collision', 'timeout', 'disconnect']),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('pong'),
        payload: zod_1.z.object({
            timestamp: zod_1.z.number(),
            serverTime: zod_1.z.number(),
        }),
    }),
    zod_1.z.object({
        type: zod_1.z.literal('error'),
        payload: zod_1.z.object({
            code: zod_1.z.string(),
            message: zod_1.z.string(),
        }),
    }),
]);
//# sourceMappingURL=network.js.map