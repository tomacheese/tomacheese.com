/**
 * API 呼び出しとエラー処理を共通化する composable
 */
import { logger } from '~/utils/logger'
import type { ApiResponse, ApiError } from '~/types/api'

export const useApi = () => {
  /**
   * 任意のエラーを ApiError に正規化する
   */
  const handleApiError = (error: unknown): ApiError => {
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message,
      }
    }
    return {
      status: 500,
      message: 'Unknown error occurred',
    }
  }

  /**
   * URL からデータを取得し、レスポンスの body を返す。失敗時はログを出して null を返す
   */
  const fetchWithErrorHandling = async <T>(url: string): Promise<T | null> => {
    try {
      const data = await $fetch<ApiResponse<T>>(url)
      return data.body !== undefined ? data.body : null
    } catch (error) {
      logger.error('API fetch failed', handleApiError(error))
      return null
    }
  }

  return {
    fetchWithErrorHandling,
    handleApiError,
  }
}
