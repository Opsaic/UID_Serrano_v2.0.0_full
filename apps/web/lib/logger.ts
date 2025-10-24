type LogLevel = "debug" | "info" | "warn" | "error"

interface LogContext {
  [key: string]: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"
  private isClient = typeof window !== "undefined"

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const prefix = this.isClient ? "[Client]" : "[Server]"
    const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : ""
    return `${timestamp} ${prefix} [${level.toUpperCase()}] ${message}${contextStr}`
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const formattedMessage = this.formatMessage(level, message, context)

    // Always log errors
    if (level === "error") {
      console.error(formattedMessage)
      this.reportError(message, context)
      return
    }

    // Log warnings in all environments
    if (level === "warn") {
      console.warn(formattedMessage)
      return
    }

    // Only log debug and info in development
    if (this.isDevelopment) {
      if (level === "info") {
        console.info(formattedMessage)
      } else if (level === "debug") {
        console.log(formattedMessage)
      }
    }
  }

  private reportError(message: string, context?: LogContext) {
    // Send to error tracking service (Sentry, LogRocket, etc.)
    if (!this.isDevelopment && this.isClient) {
      // Example: Sentry.captureException(new Error(message), { extra: context })
      console.error("[Error Tracking]", message, context)
    }
  }

  debug(message: string, context?: LogContext) {
    this.log("debug", message, context)
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context)
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context)
  }

  error(message: string, context?: LogContext) {
    this.log("error", message, context)
  }

  // API-specific logging
  apiRequest(method: string, url: string, data?: any) {
    this.debug(`API Request: ${method} ${url}`, { data })
  }

  apiResponse(method: string, url: string, status: number, data?: any) {
    const level = status >= 400 ? "error" : "debug"
    this.log(level, `API Response: ${method} ${url} - ${status}`, { data })
  }

  apiError(method: string, url: string, error: any) {
    this.error(`API Error: ${method} ${url}`, {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    })
  }

  // Component lifecycle logging
  componentMount(componentName: string, props?: any) {
    this.debug(`Component Mounted: ${componentName}`, { props })
  }

  componentUnmount(componentName: string) {
    this.debug(`Component Unmounted: ${componentName}`)
  }

  // Performance monitoring
  performance(label: string, duration: number) {
    this.info(`Performance: ${label} took ${duration}ms`)
  }
}

export const logger = new Logger()
