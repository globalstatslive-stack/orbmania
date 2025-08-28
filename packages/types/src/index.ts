// Orbmania.io - Shared Types Package
// Strict TypeScript types for all game entities and network messages

export * from './constants';
export * from './game';
export * from './network';
export * from './player';
export * from './arena';
export * from './powerups';
export * from './events';
export * from './errors';

// Re-export commonly used types for convenience
export type {
  Vector2,
  PlayerCore,
  EnergyShard,
  OrbitSlot,
  PhysicsBody,
  CollisionInfo,
  GameRoom,
  GamePhase,
  GameMode,
  PlayerStats,
  MatchResult,
  Leaderboard,
  DamageEvent,
  GameTick,
} from './game';

export type {
  PlayerState,
  PlayerInput,
  PlayerRole,
  PlayerAbilities,
  PlayerProfile,
  PlayerSession,
  Ability,
  StatusEffect,
  PlayerStatistics,
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
  NetworkEvent,
  NetworkEvents,
  AuthToken,
  ConnectionInfo,
  RateLimit,
} from './network';

export type {
  GameEvent,
  EventHandler,
  EventBus,
  EventFilter,
  EventQuery,
  EventStats,
} from './events';

export type {
  GameError,
  ErrorResponse,
  ErrorHandler,
  ErrorSeverity,
  ErrorCategory,
  ErrorRecoveryStrategy,
  ErrorStats,
} from './errors';

export type {
  PhysicsConstants,
  RoleConstants,
  PowerUpConstants,
  NetworkConstants,
  BalanceConstants,
  MapConstants,
} from './constants';

// Validation helpers re-export
export {
  validateClientMessage,
  validateServerMessage,
  validateNetworkEvent,
} from './network';

export {
  validatePlayerInput,
  validatePlayerState,
  validatePlayerProfile,
} from './player';

export {
  validateGameEvent,
  validateEventFilter,
  validateEventQuery,
} from './events';

export {
  validateGameError,
  validateErrorResponse,
} from './errors';

// Utility functions re-export
export {
  getRoleDefaults,
} from './player';

export {
  createEvent,
  isPlayerEvent,
  isCombatEvent,
  isAbilityEvent,
} from './events';

export {
  createError,
  createAuthError,
  createValidationError,
  createNetworkError,
  createSystemError,
  isRetryableError,
  getErrorSeverityLevel,
  shouldEscalateError,
  formatErrorMessage,
  aggregateErrors,
} from './errors';