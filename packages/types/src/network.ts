// Network message types - Strict typing for client-server communication
import { z } from 'zod';
import { PlayerStateSchema, PlayerInputSchema } from './player';
import { EnergyShardSchema } from './game';

// Client to Server messages
export const ClientMessageSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('join_game'),
    payload: z.object({
      playerName: z.string().min(1).max(20),
      preferredRole: z.enum(['runner', 'bulwark', 'tactician']),
    }),
  }),
  z.object({
    type: z.literal('player_input'),
    payload: PlayerInputSchema,
  }),
  z.object({
    type: z.literal('ping'),
    payload: z.object({
      timestamp: z.number(),
    }),
  }),
  z.object({
    type: z.literal('leave_game'),
    payload: z.object({}),
  }),
]);

export type ClientMessage = z.infer<typeof ClientMessageSchema>;

// Server to Client messages
export const ServerMessageSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('game_joined'),
    payload: z.object({
      playerId: z.string(),
      playerState: PlayerStateSchema,
      gameState: z.object({
        arena: z.object({
          width: z.number(),
          height: z.number(),
        }),
        tickRate: z.number(),
      }),
    }),
  }),
  z.object({
    type: z.literal('game_state_update'),
    payload: z.object({
      players: z.array(PlayerStateSchema),
      shards: z.array(EnergyShardSchema),
      timestamp: z.number(),
      tick: z.number(),
    }),
  }),
  z.object({
    type: z.literal('player_eliminated'),
    payload: z.object({
      playerId: z.string(),
      eliminatedBy: z.string().optional(),
      reason: z.enum(['collision', 'timeout', 'disconnect']),
    }),
  }),
  z.object({
    type: z.literal('pong'),
    payload: z.object({
      timestamp: z.number(),
      serverTime: z.number(),
    }),
  }),
  z.object({
    type: z.literal('error'),
    payload: z.object({
      code: z.string(),
      message: z.string(),
    }),
  }),
]);

export type ServerMessage = z.infer<typeof ServerMessageSchema>;

// Network event types for type-safe event handling
export type NetworkEvents = {
  // Client events
  join_game: (data: Extract<ClientMessage, { type: 'join_game' }>['payload']) => void;
  player_input: (data: Extract<ClientMessage, { type: 'player_input' }>['payload']) => void;
  ping: (data: Extract<ClientMessage, { type: 'ping' }>['payload']) => void;
  leave_game: (data: Extract<ClientMessage, { type: 'leave_game' }>['payload']) => void;
  
  // Server events
  game_joined: (data: Extract<ServerMessage, { type: 'game_joined' }>['payload']) => void;
  game_state_update: (data: Extract<ServerMessage, { type: 'game_state_update' }>['payload']) => void;
  player_eliminated: (data: Extract<ServerMessage, { type: 'player_eliminated' }>['payload']) => void;
  pong: (data: Extract<ServerMessage, { type: 'pong' }>['payload']) => void;
  error: (data: Extract<ServerMessage, { type: 'error' }>['payload']) => void;
};