// Orbmania.io - Error Handling Types
// Comprehensive error types and validation for robust error handling

import { z } from 'zod';

// Error Severity Levels
export const ErrorSeveritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export type ErrorSeverity = z.infer<typeof ErrorSeveritySchema>;

// Error Categories
export const ErrorCategorySchema = z.enum([
  'AUTHENTICATION',
  'AUTHORIZATION',
  'VALIDATION',
  'NETWORK',
  'GAME_LOGIC',
  'PHYSICS',
  'COLLISION',
  'PLAYER_STATE',
  'ROOM_MANAGEMENT',
  'DATABASE',
  'RATE_LIMITING',
  'SYSTEM',
  'UNKNOWN',
]);
export type ErrorCategory = z.infer<typeof ErrorCategorySchema>;

// Error Codes
export const ErrorCodeSchema = z.enum([
  'AUTH_INVALID_TOKEN',
  'AUTH_USER_NOT_FOUND',
  'AUTH_BANNED_USER',
  'VALIDATION_INVALID_INPUT',
  'VALIDATION_SCHEMA_ERROR',
  'NETWORK_CONNECTION_LOST',
  'NETWORK_RATE_LIMITED',
  'NETWORK_MESSAGE_TOO_LARGE',
  'ROOM_NOT_FOUND',
  'ROOM_FULL',
  'ROOM_INVALID_PASSWORD',
  'ROOM_ALREADY_IN_GAME',
  'GAME_INVALID_STATE',
  'GAME_PLAYER_NOT_FOUND',
  'GAME_INVALID_ABILITY',
  'GAME_INVALID_MOVEMENT',
  'PHYSICS_COLLISION_ERROR',
  'PHYSICS_INVALID_ORBIT',
  'SYSTEM_OVERLOADED',
  'SYSTEM_MAINTENANCE',
  'DATABASE_CONNECTION_ERROR',
  'DATABASE_QUERY_ERROR',
  'UNKNOWN_ERROR',
]);
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

// Base Game Error Schema
export const GameErrorSchema = z.object({
  id: z.string(),
  code: ErrorCodeSchema,
  message: z.string(),
  category: ErrorCategorySchema,
  severity: ErrorSeveritySchema,
  timestamp: z.number(),
  context: z.record(z.unknown()).optional(),
  stack: z.string().optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  requestId: z.string().optional(),
  details: z.record(z.unknown()).optional(),
});

export type GameError = z.infer<typeof GameErrorSchema>;

// Error Response Schema (for API responses)
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: GameErrorSchema,
  timestamp: z.number(),
  requestId: z.string().optional(),
  retryable: z.boolean().default(false),
  retryAfter: z.number().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Error Statistics
export const ErrorStatsSchema = z.object({
  totalErrors: z.number().nonnegative(),
  errorsByCategory: z.record(z.number().nonnegative()),
  errorsBySeverity: z.record(z.number().nonnegative()),
  errorsByCode: z.record(z.number().nonnegative()),
  errorRate: z.number().min(0).max(1),
  averageResolutionTime: z.number().nonnegative(),
  timeRange: z.object({
    start: z.number(),
    end: z.number(),
  }),
});

export type ErrorStats = z.infer<typeof ErrorStatsSchema>;

// Error Handler Interface
export interface ErrorHandler {
  handle(error: GameError): void | Promise<void>;
  canHandle(error: GameError): boolean;
  priority: number;
}

// Error Recovery Strategy
export const ErrorRecoveryStrategySchema = z.enum([
  'RETRY',
  'FALLBACK',
  'IGNORE',
  'ESCALATE',
  'DISCONNECT',
  'RESTART',
]);

export type ErrorRecoveryStrategy = z.infer<typeof ErrorRecoveryStrategySchema>;

export const ErrorRecoveryConfigSchema = z.object({
  strategy: ErrorRecoveryStrategySchema,
  maxRetries: z.number().nonnegative().default(3),
  retryDelay: z.number().nonnegative().default(1000),
  backoffMultiplier: z.number().positive().default(2),
  maxRetryDelay: z.number().positive().default(30000),
  fallbackAction: z.string().optional(),
});

export type ErrorRecoveryConfig = z.infer<typeof ErrorRecoveryConfigSchema>;

// Error Factory Functions
export const createError = (
  code: ErrorCode,
  message: string,
  options: Partial<Omit<GameError, 'id' | 'code' | 'message' | 'timestamp'>> = {}
): GameError => {
  // Determine category based on code prefix
  let category: ErrorCategory = 'UNKNOWN';
  if (code.startsWith('AUTH_')) {
    category = code === 'AUTH_BANNED_USER' ? 'AUTHORIZATION' : 'AUTHENTICATION';
  } else if (code.startsWith('VALIDATION_')) {
    category = 'VALIDATION';
  } else if (code.startsWith('NETWORK_')) {
    category = code === 'NETWORK_RATE_LIMITED' ? 'RATE_LIMITING' : 'NETWORK';
  } else if (code.startsWith('ROOM_')) {
    category = 'ROOM_MANAGEMENT';
  } else if (code.startsWith('GAME_')) {
    category = 'GAME_LOGIC';
  } else if (code.startsWith('PHYSICS_')) {
    category = 'PHYSICS';
  } else if (code.startsWith('SYSTEM_')) {
    category = 'SYSTEM';
  } else if (code.startsWith('DATABASE_')) {
    category = 'DATABASE';
  }

  return {
    id: crypto.randomUUID(),
    code,
    message,
    category: options.category || category,
    severity: options.severity || 'MEDIUM',
    timestamp: Date.now(),
    ...options,
  };
};

export const createAuthError = (
  code: Extract<ErrorCode, 'AUTH_INVALID_TOKEN' | 'AUTH_USER_NOT_FOUND' | 'AUTH_BANNED_USER'>,
  message: string,
  userId?: string,
  details?: Record<string, unknown>
): GameError => {
  return createError(code, message, {
    severity: 'HIGH',
    userId,
    details,
  });
};

export const createValidationError = (
  field: string,
  value: unknown,
  expectedType: string,
  constraints?: string[]
): GameError => {
  return createError('VALIDATION_INVALID_INPUT', `Invalid value for field '${field}'`, {
    severity: 'MEDIUM',
    details: {
      field,
      value,
      expectedType,
      constraints,
    },
  });
};

export const createNetworkError = (
  code: Extract<ErrorCode, 'NETWORK_CONNECTION_LOST' | 'NETWORK_RATE_LIMITED' | 'NETWORK_MESSAGE_TOO_LARGE'>,
  message: string,
  details?: Record<string, unknown>
): GameError => {
  return createError(code, message, {
    severity: 'HIGH',
    details,
  });
};

export const createSystemError = (
  message: string,
  details?: Record<string, unknown>
): GameError => {
  return createError('SYSTEM_OVERLOADED', message, {
    severity: 'CRITICAL',
    details,
  });
};

// Error Validation Helpers
export const validateGameError = (data: unknown): GameError => {
  return GameErrorSchema.parse(data);
};

export const validateErrorResponse = (data: unknown): ErrorResponse => {
  return ErrorResponseSchema.parse(data);
};

// Error Utility Functions
export const isRetryableError = (error: GameError): boolean => {
  const retryableCodes: ErrorCode[] = [
    'NETWORK_CONNECTION_LOST',
    'DATABASE_CONNECTION_ERROR',
    'SYSTEM_OVERLOADED',
  ];
  return retryableCodes.includes(error.code);
};

export const getErrorSeverityLevel = (severity: ErrorSeverity): number => {
  const levels = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  return levels[severity];
};

export const shouldEscalateError = (error: GameError): boolean => {
  return error.severity === 'CRITICAL' || error.category === 'SYSTEM';
};

export const formatErrorMessage = (error: GameError): string => {
  const prefix = `[${error.category}:${error.severity}]`;
  const context = error.context ? ` (${JSON.stringify(error.context)})` : '';
  return `${prefix} ${error.message}${context}`;
};

// Error Aggregation
export const aggregateErrors = (errors: GameError[]): ErrorStats => {
  const now = Date.now();
  const oneHourAgo = now - 3600000;
  
  const recentErrors = errors.filter(e => e.timestamp >= oneHourAgo);
  
  const errorsByCategory = recentErrors.reduce((acc, error) => {
    acc[error.category] = (acc[error.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const errorsBySeverity = recentErrors.reduce((acc, error) => {
    acc[error.severity] = (acc[error.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const errorsByCode = recentErrors.reduce((acc, error) => {
    acc[error.code] = (acc[error.code] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalErrors: recentErrors.length,
    errorsByCategory,
    errorsBySeverity,
    errorsByCode,
    errorRate: recentErrors.length / 3600, // errors per second
    averageResolutionTime: 0, // Would need resolution tracking
    timeRange: {
      start: oneHourAgo,
      end: now,
    },
  };
};