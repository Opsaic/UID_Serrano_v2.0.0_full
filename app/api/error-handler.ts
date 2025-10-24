import { NextResponse } from "next/server"
import { handleError } from "@/lib/error-handler"

export function createErrorResponse(error: unknown) {
  const appError = handleError(error)

  return NextResponse.json(
    {
      error: {
        message: appError.message,
        code: appError.code,
        ...(process.env.NODE_ENV === "development" && {
          stack: appError.stack,
          context: appError.context,
        }),
      },
    },
    { status: appError.statusCode || 500 },
  )
}

export function withErrorHandling<T>(handler: (req: Request, context?: any) => Promise<T>) {
  return async (req: Request, context?: any) => {
    try {
      return await handler(req, context)
    } catch (error) {
      return createErrorResponse(error)
    }
  }
}
