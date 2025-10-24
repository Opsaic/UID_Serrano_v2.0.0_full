import { logger } from "./logger"

export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()

  start(label: string) {
    this.marks.set(label, performance.now())
    logger.debug(`Performance tracking started: ${label}`)
  }

  end(label: string) {
    const startTime = this.marks.get(label)
    if (!startTime) {
      logger.warn(`Performance tracking not found: ${label}`)
      return
    }

    const duration = performance.now() - startTime
    this.marks.delete(label)
    logger.performance(label, Math.round(duration))
    return duration
  }

  measure<T>(label: string, fn: () => T): T {
    this.start(label)
    try {
      const result = fn()
      this.end(label)
      return result
    } catch (error) {
      this.end(label)
      throw error
    }
  }

  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label)
    try {
      const result = await fn()
      this.end(label)
      return result
    } catch (error) {
      this.end(label)
      throw error
    }
  }
}

export const performanceMonitor = new PerformanceMonitor()
