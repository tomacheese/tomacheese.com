import { logger } from '~/utils/logger'
import type { ApiResponse, ApiError } from '~/types/api'

/**
 * API呼び出しとエラーハンドリングを統一するComposable
 */
export const useApi = () => {
  /**
   * エラーオブジェクトを標準化する
   * @param error - 発生したエラー
   * @returns 標準化されたAPIエラー
   */
  const handleApiError = (error: unknown): ApiError => {
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message
      }
    }
    
    // オブジェクトの場合、statusとmessageを抽出
    if (typeof error === 'object' && error !== null) {
      const errorObj = error as Record<string, unknown>
      return {
        status: typeof errorObj.status === 'number' ? errorObj.status : 500,
        message: typeof errorObj.message === 'string' ? errorObj.message : 'Unknown error occurred'
      }
    }
    
    return {
      status: 500,
      message: 'Unknown error occurred'
    }
  }

  /**
   * エラーハンドリング付きでAPIを呼び出す
   * @param url - 呼び出すURL
   * @returns データまたはnull
   */
  const fetchWithErrorHandling = async <T>(url: string): Promise<T | null> => {
    try {
      const data = await $fetch<ApiResponse<T>>(url)
      return data.body || null
    } catch (error) {
      const apiError = handleApiError(error)
      logger.error('API fetch failed', apiError)
      return null
    }
  }

  /**
   * 複数のAPIを並行して呼び出し、個別にエラーハンドリングする
   * @param urls - 呼び出すURL配列
   * @returns 結果配列（エラーの場合はnull）
   */
  const fetchMultiple = async <T>(urls: string[]): Promise<(T | null)[]> => {
    const results = await Promise.allSettled(
      urls.map(url => fetchWithErrorHandling<T>(url))
    )
    
    return results.map(result => 
      result.status === 'fulfilled' ? result.value : null
    )
  }

  return {
    fetchWithErrorHandling,
    fetchMultiple,
    handleApiError
  }
}