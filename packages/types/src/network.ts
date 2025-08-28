// Orbmania.io - Network Protocol Types
// Complete message schemas for real-time multiplayer communication

import { z } from 'zod';
import { Vector2Schema, PlayerCoreSchema, EnergyShardSchema, GameRoomSchema, PlayerStatsSchema, LeaderboardSchema } from './game';
import { PlayerStateSchema, PlayerRoleSchema, PlayerInputSchema } from './player';
import { PowerUpTypeSchema } from './powerups';

// Connection and Authentication
export const AuthTokenSchema = z.object({
  playerId: z.string(),
  username: z.string(),
  sessionId: z.string(),
  expiresAt: z.number(),
  signature: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;

// Client -> Server Messages
export const ClientMessageSchema = z.discriminatedUnion('type', [
  // Authentication
  z.object({
    type: z.literal('authenticate'),
    token: AuthTokenSchema.optional(),
    username: z.string().min(1).max(20),
    version: z.string(),
  }),
  
  // Room Management
  z.object({
    type: z.literal('joinRoom'),
    roomId: z.string().optional(),
    password: z.string().optional(),
    role: PlayerRoleSchema,
    region: z.string().optional(),
  }),
  z.object({
    type: z.literal('createRoom'),
    name: z.string().min(1).max(50),
    mode: z.enum(['FREE_FOR_ALL', 'TEAM_BATTLE', 'SURVIVAL', 'TOURNAMENT']),
    maxPlayers: z.number().min(2).max(50),
    private: z.boolean().default(false),
    password: z.string().optional(),
    settings: z.record(z.unknown()).optional(),
  }),
  z.object({
    type: z.literal('leaveRoom'),
  }),
  z.object({
    type: z.literal('listRooms'),
    region: z.string().optional(),
    mode: z.enum(['FREE_FOR_ALL', 'TEAM_BATTLE', 'SURVIVAL', 'TOURNAMENT']).optional(),
  }),
  
  // Game Input
  z.object({
    type: z.literal('input'),
    input: PlayerInputSchema,
  }),
  z.object({
    type: z.literal('ping'),
    timestamp: z.number(),
  }),
  
  // Communication
  z.object({
    type: z.literal('chat'),
    message: z.string().min(1).max(100),
    channel: z.enum(['ALL', 'TEAM']).default('ALL'),
  }),
  z.object({
    type: z.literal('emote'),
    emoteId: z.string(),
  }),
  
  // Spectating
  z.object({
    type: z.literal('spectate'),
    targetPlayerId: z.string().optional(),
  }),
  
  // Settings
  z.object({
    type: z.literal('updateSettings'),
    settings: z.object({
      graphics: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      audio: z.boolean().optional(),
      showNames: z.boolean().optional(),
      showHUD: z.boolean().optional(),
    }),
  }),
]);

export type ClientMessage = z.infer<typeof ClientMessageSchema>;

// Server -> Client Messages
export const ServerMessageSchema = z.discriminatedUnion('type', [
  // Authentication Response
  z.object({
    type: z.literal('authenticated'),
    success: z.boolean(),
    playerId: z.string().optional(),
    token: AuthTokenSchema.optional(),
    error: z.string().optional(),
  }),
  
  // Room Management
  z.object({
    type: z.literal('roomJoined'),
    room: GameRoomSchema,
    yourPlayerId: z.string(),
  }),
  z.object({
    type: z.literal('roomLeft'),
    reason: z.enum(['VOLUNTARY', 'KICKED', 'BANNED', 'SERVER_SHUTDOWN']),
    message: z.string().optional(),
  }),
  z.object({
    type: z.literal('roomList'),
    rooms: z.array(GameRoomSchema),
    totalRooms: z.number(),
  }),
  z.object({
    type: z.literal('roomCreated'),
    room: GameRoomSchema,
  }),
  
  // Game State
  z.object({
    type: z.literal('gameState'),
    tick: z.number(),
    timestamp: z.number(),
    players: z.array(PlayerStateSchema),
    shards: z.array(EnergyShardSchema),
    powerUps: z.array(z.object({
      id: z.string(),
      type: PowerUpTypeSchema,
      position: Vector2Schema,
      spawnTime: z.number(),
    })),
    events: z.array(z.unknown()),
  }),
  z.object({
    type: z.literal('gamePhaseChanged'),
    phase: z.enum(['WAITING', 'STARTING', 'ACTIVE', 'ENDING', 'FINISHED']),
    countdown: z.number().optional(),
    message: z.string().optional(),
  }),
  
  // Player Events
  z.object({
    type: z.literal('playerJoined'),
    player: PlayerStateSchema,
  }),
  z.object({
    type: z.literal('playerLeft'),
    playerId: z.string(),
    username: z.string(),
    reason: z.enum(['VOLUNTARY', 'DISCONNECTED', 'ELIMINATED']),
  }),
  z.object({
    type: z.literal('playerEliminated'),
    playerId: z.string(),
    eliminatedBy: z.string().optional(),
    position: Vector2Schema,
    stats: PlayerStatsSchema,
  }),
  z.object({
    type: z.literal('playerRespawned'),
    playerId: z.string(),
    position: Vector2Schema,
  }),
  
  // Game Events
  z.object({
    type: z.literal('collision'),
    entityA: z.string(),
    entityB: z.string(),
    damage: z.number(),
    position: Vector2Schema,
    timestamp: z.number(),
  }),
  z.object({
    type: z.literal('shardCollected'),
    playerId: z.string(),
    shardId: z.string(),
    energyGained: z.number(),
    position: Vector2Schema,
  }),
  z.object({
    type: z.literal('powerUpSpawned'),
    id: z.string(),
    powerUpType: PowerUpTypeSchema,
    position: Vector2Schema,
  }),
  z.object({
    type: z.literal('powerUpCollected'),
    playerId: z.string(),
    powerUpId: z.string(),
    powerUpType: PowerUpTypeSchema,
  }),
  z.object({
    type: z.literal('abilityUsed'),
    playerId: z.string(),
    abilityType: z.string(),
    position: Vector2Schema,
    target: Vector2Schema.optional(),
  }),
  
  // Communication
  z.object({
    type: z.literal('chat'),
    playerId: z.string(),
    username: z.string(),
    message: z.string(),
    channel: z.enum(['ALL', 'TEAM']),
    timestamp: z.number(),
  }),
  z.object({
    type: z.literal('emote'),
    playerId: z.string(),
    emoteId: z.string(),
    position: Vector2Schema,
  }),
  
  // Match Results
  z.object({
    type: z.literal('matchEnded'),
    winner: z.string().optional(),
    winningTeam: z.string().optional(),
    finalStats: z.array(PlayerStatsSchema),
    duration: z.number(),
  }),
  z.object({
    type: z.literal('leaderboardUpdate'),
    leaderboard: LeaderboardSchema,
  }),
  
  // Network
  z.object({
    type: z.literal('pong'),
    timestamp: z.number(),
    serverTime: z.number(),
  }),
  z.object({
    type: z.literal('serverInfo'),
    tickRate: z.number(),
    maxPlayers: z.number(),
    region: z.string(),
    version: z.string(),
  }),
  
  // Errors
  z.object({
    type: z.literal('error'),
    code: z.enum([
      'AUTHENTICATION_FAILED',
      'ROOM_FULL',
      'ROOM_NOT_FOUND',
      'INVALID_PASSWORD',
      'RATE_LIMITED',
      'INVALID_INPUT',
      'SERVER_ERROR',
      'VERSION_MISMATCH',
      'BANNED',
      'MAINTENANCE',
    ]),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }),
  
  // Debug (development only)
  z.object({
    type: z.literal('debug'),
    data: z.unknown(),
  }),
]);

export type ServerMessage = z.infer<typeof ServerMessageSchema>;

// Network Events (for internal game event system)
export const NetworkEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('collision'),
    entityA: z.string(),
    entityB: z.string(),
    damage: z.number(),
    position: Vector2Schema,
    normal: Vector2Schema,
    impulse: z.number(),
  }),
  z.object({
    type: z.literal('shardCollected'),
    playerId: z.string(),
    shardId: z.string(),
    energyGained: z.number(),
    orbitSlot: z.number(),
  }),
  z.object({
    type: z.literal('playerEliminated'),
    playerId: z.string(),
    eliminatedBy: z.string().optional(),
    cause: z.enum(['COLLISION', 'OUT_OF_BOUNDS', 'TIMEOUT', 'DISCONNECT']),
  }),
  z.object({
    type: z.literal('powerUpActivated'),
    playerId: z.string(),
    powerUpType: PowerUpTypeSchema,
    duration: z.number().optional(),
  }),
  z.object({
    type: z.literal('abilityUsed'),
    playerId: z.string(),
    abilityType: z.enum(['DASH', 'SHIELD', 'EMP', 'TRAP']),
    position: Vector2Schema,
    target: Vector2Schema.optional(),
    success: z.boolean(),
  }),
  z.object({
    type: z.literal('orbitalDamage'),
    sourcePlayerId: z.string(),
    targetPlayerId: z.string(),
    damage: z.number(),
    shardId: z.string(),
    critical: z.boolean(),
  }),
]);

export type NetworkEvent = z.infer<typeof NetworkEventSchema>;

// Rate Limiting
export const RateLimitSchema = z.object({
  endpoint: z.string(),
  maxRequests: z.number(),
  windowMs: z.number(),
  currentCount: z.number(),
  resetTime: z.number(),
});

export type RateLimit = z.infer<typeof RateLimitSchema>;

// Connection State
export const ConnectionStateSchema = z.enum(['CONNECTING', 'CONNECTED', 'RECONNECTING', 'DISCONNECTED', 'ERROR']);
export type ConnectionState = z.infer<typeof ConnectionStateSchema>;

export const ConnectionInfoSchema = z.object({
  state: ConnectionStateSchema,
  playerId: z.string().optional(),
  roomId: z.string().optional(),
  ping: z.number().optional(),
  lastPingTime: z.number().optional(),
  reconnectAttempts: z.number().default(0),
  maxReconnectAttempts: z.number().default(5),
});

export type ConnectionInfo = z.infer<typeof ConnectionInfoSchema>;

// Message Validation Helpers
export const validateClientMessage = (data: unknown): ClientMessage => {
  return ClientMessageSchema.parse(data);
};

export const validateServerMessage = (data: unknown): ServerMessage => {
  return ServerMessageSchema.parse(data);
};

export const validateNetworkEvent = (data: unknown): NetworkEvent => {
  return NetworkEventSchema.parse(data);
};

// Combined network types export
export const NetworkTypes = {
  ClientMessage: ClientMessageSchema,
  ServerMessage: ServerMessageSchema,
  NetworkEvent: NetworkEventSchema,
  AuthToken: AuthTokenSchema,
  RateLimit: RateLimitSchema,
  ConnectionInfo: ConnectionInfoSchema,
} as const;

// Type-safe event handlers
export type NetworkEvents = {
  // Client events
  authenticate: (data: Extract<ClientMessage, { type: 'authenticate' }>) => void;
  joinRoom: (data: Extract<ClientMessage, { type: 'joinRoom' }>) => void;
  createRoom: (data: Extract<ClientMessage, { type: 'createRoom' }>) => void;
  leaveRoom: (data: Extract<ClientMessage, { type: 'leaveRoom' }>) => void;
  listRooms: (data: Extract<ClientMessage, { type: 'listRooms' }>) => void;
  input: (data: Extract<ClientMessage, { type: 'input' }>) => void;
  ping: (data: Extract<ClientMessage, { type: 'ping' }>) => void;
  chat: (data: Extract<ClientMessage, { type: 'chat' }>) => void;
  emote: (data: Extract<ClientMessage, { type: 'emote' }>) => void;
  spectate: (data: Extract<ClientMessage, { type: 'spectate' }>) => void;
  updateSettings: (data: Extract<ClientMessage, { type: 'updateSettings' }>) => void;
  
  // Server events
  authenticated: (data: Extract<ServerMessage, { type: 'authenticated' }>) => void;
  roomJoined: (data: Extract<ServerMessage, { type: 'roomJoined' }>) => void;
  roomLeft: (data: Extract<ServerMessage, { type: 'roomLeft' }>) => void;
  roomList: (data: Extract<ServerMessage, { type: 'roomList' }>) => void;
  roomCreated: (data: Extract<ServerMessage, { type: 'roomCreated' }>) => void;
  gameState: (data: Extract<ServerMessage, { type: 'gameState' }>) => void;
  gamePhaseChanged: (data: Extract<ServerMessage, { type: 'gamePhaseChanged' }>) => void;
  playerJoined: (data: Extract<ServerMessage, { type: 'playerJoined' }>) => void;
  playerLeft: (data: Extract<ServerMessage, { type: 'playerLeft' }>) => void;
  playerEliminated: (data: Extract<ServerMessage, { type: 'playerEliminated' }>) => void;
  playerRespawned: (data: Extract<ServerMessage, { type: 'playerRespawned' }>) => void;
  collision: (data: Extract<ServerMessage, { type: 'collision' }>) => void;
  shardCollected: (data: Extract<ServerMessage, { type: 'shardCollected' }>) => void;
  powerUpSpawned: (data: Extract<ServerMessage, { type: 'powerUpSpawned' }>) => void;
  powerUpCollected: (data: Extract<ServerMessage, { type: 'powerUpCollected' }>) => void;
  abilityUsed: (data: Extract<ServerMessage, { type: 'abilityUsed' }>) => void;
  matchEnded: (data: Extract<ServerMessage, { type: 'matchEnded' }>) => void;
  leaderboardUpdate: (data: Extract<ServerMessage, { type: 'leaderboardUpdate' }>) => void;
  pong: (data: Extract<ServerMessage, { type: 'pong' }>) => void;
  serverInfo: (data: Extract<ServerMessage, { type: 'serverInfo' }>) => void;
  error: (data: Extract<ServerMessage, { type: 'error' }>) => void;
  debug: (data: Extract<ServerMessage, { type: 'debug' }>) => void;
};