/**
 * API related type definitions
 */

export interface ApiResponse<T> {
  body?: T
  status?: number
  message?: string
}

export interface ApiError {
  status: number
  message: string
  code?: string
}
