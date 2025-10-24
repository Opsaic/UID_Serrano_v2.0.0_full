import { logger } from "./logger"

export const debug = {
  // Component debugging
  component: (name: string, action: string, data?: any) => {
    logger.debug(`[Component:${name}] ${action}`, data)
  },

  // State debugging
  state: (component: string, stateName: string, value: any) => {
    logger.debug(`[State:${component}] ${stateName}`, { value })
  },

  // Effect debugging
  effect: (component: string, effectName: string, dependencies?: any[]) => {
    logger.debug(`[Effect:${component}] ${effectName}`, { dependencies })
  },

  // API debugging
  api: (endpoint: string, method: string, data?: any) => {
    logger.debug(`[API] ${method} ${endpoint}`, data)
  },

  // Database debugging
  db: (operation: string, table: string, data?: any) => {
    logger.debug(`[DB:${table}] ${operation}`, data)
  },

  // Auth debugging
  auth: (action: string, data?: any) => {
    logger.debug(`[Auth] ${action}`, data)
  },

  // Navigation debugging
  nav: (from: string, to: string) => {
    logger.debug(`[Navigation] ${from} → ${to}`)
  },

  // Form debugging
  form: (formName: string, action: string, data?: any) => {
    logger.debug(`[Form:${formName}] ${action}`, data)
  },
}
