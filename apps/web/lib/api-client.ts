import { logger } from "./logger"
import { APIError, handleError } from "./error-handler"

interface RequestOptions extends RequestInit {
  timeout?: number
}

class APIClient {
  private baseURL: string

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = 30000, ...fetchOptions } = options
    const url = `${this.baseURL}${endpoint}`
    const method = options.method || "GET"

    logger.apiRequest(method, url, options.body)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      logger.apiResponse(method, url, response.status, data)

      if (!response.ok) {
        throw new APIError(data.message || "API request failed", response.status, { url, method, response: data })
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof APIError) {
        throw error
      }

      logger.apiError(method, url, error)
      throw handleError(error)
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new APIClient()
