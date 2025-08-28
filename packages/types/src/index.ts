// Orbmania.io - Shared Types Package
// Strict TypeScript types for all game entities and network messages

export * from './game';
export * from './network';
export * from './player';
export * from './arena';
export * from './powerups';

// Re-export commonly used types for convenience
export type {
  Vector2,
  PlayerCore,
  EnergyShard,
  OrbitSlot,
} from './game';

export type {
  PlayerState,
  PlayerInput,
  PlayerRole,
  PlayerAbilities,
} from './player';

export type {
  Arena,
  Wall,
  WallType,
  SpawnZone,
} from './arena';

export type {
  PowerUp,
  ActivePowerUp,
  PowerUpType,
  PowerUpConfig,
} from './powerups';

export type {
  ClientMessage,
  ServerMessage,
  NetworkEvents,
} from './network';