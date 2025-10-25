type ErrorContext = {
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, any>
}

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode = 500,
    public context?: ErrorContext,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function logError(error: unknown, context?: ErrorContext): void {
  const timestamp = new Date().toISOString()
  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorStack = error instanceof Error ? error.stack : undefined

  console.error(`[v0] Error at ${timestamp}:`, {
    message: errorMessage,
    stack: errorStack,
    context,
  })

  // In production, you could send this to an error tracking service like Sentry
  if (process.env.NODE_ENV === "production") {
    // Example: Sentry.captureException(error, { contexts: { custom: context } })
  }
}

export function handleApiError(error: unknown, defaultMessage = "An error occurred"): Response {
  logError(error, { component: "API" })

  if (error instanceof AppError) {
    return Response.json({ error: error.message, code: error.code }, { status: error.statusCode })
  }

  if (error instanceof Error) {
    return Response.json({ error: error.message || defaultMessage }, { status: 500 })
  }

  return Response.json({ error: defaultMessage }, { status: 500 })
}

export function createApiError(message: string, code: string, statusCode = 400): AppError {
  return new AppError(message, code, statusCode)
}
