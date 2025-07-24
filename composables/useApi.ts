/**
 * API utilities composable
 * Provides consistent error handling and API interaction patterns
 */
import { logger } from '~/utils/logger'
import type { ApiResponse, ApiError } from '~/types/api'

export const useApi = () => {
  /**
   * Handle API errors in a consistent way
   * @param error - The error object to handle
   * @returns Standardized error object
   */
  const handleApiError = (error: unknown): ApiError => {
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message
      }
    }
    return {
      status: 500,
      message: 'Unknown error occurred'
    }
  }

  /**
   * Fetch data with consistent error handling
   * @param url - The URL to fetch from
   * @returns The response body or null on error
   */
  const fetchWithErrorHandling = async <T>(url: string): Promise<T | null> => {
    try {
      const data = await $fetch<ApiResponse<T>>(url)
      return data.body || null
    } catch (error) {
      logger.error('API fetch failed', handleApiError(error))
      return null
    }
  }

  return {
    fetchWithErrorHandling,
    handleApiError
  }
}