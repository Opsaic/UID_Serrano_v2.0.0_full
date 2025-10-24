import { logger } from "./logger"

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public context?: Record<string, any>,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class APIError extends AppError {
  constructor(message: string, statusCode: number, context?: Record<string, any>) {
    super(message, "API_ERROR", statusCode, context)
    this.name = "APIError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, "VALIDATION_ERROR", 400, context)
    this.name = "ValidationError"
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, "AUTH_ERROR", 401)
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, "AUTHORIZATION_ERROR", 403)
    this.name = "AuthorizationError"
  }
}

export function handleError(error: unknown): AppError {
  // If it's already an AppError, return it
  if (error instanceof AppError) {
    logger.error(error.message, {
      code: error.code,
      statusCode: error.statusCode,
      context: error.context,
      stack: error.stack,
    })
    return error
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    logger.error(error.message, { stack: error.stack })
    return new AppError(error.message, "UNKNOWN_ERROR", 500)
  }

  // Handle string errors
  if (typeof error === "string") {
    logger.error(error)
    return new AppError(error, "UNKNOWN_ERROR", 500)
  }

  // Handle unknown error types
  logger.error("Unknown error occurred", { error })
  return new AppError("An unexpected error occurred", "UNKNOWN_ERROR", 500)
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  return "An unexpected error occurred"
}

export function isClientError(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 500
}

export function isServerError(statusCode: number): boolean {
  return statusCode >= 500
}
