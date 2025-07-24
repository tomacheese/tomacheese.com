/**
 * API レスポンスの共通型定義
 */
export interface ApiResponse<T> {
  body?: T
  status?: number
  message?: string
}

/**
 * API エラーの型定義
 */
export interface ApiError {
  status: number
  message: string
  code?: string
}