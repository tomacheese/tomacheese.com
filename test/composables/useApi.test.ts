import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useApi } from '~/composables/useApi'

// logger モジュールをモックする
vi.mock('~/utils/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}))

// $fetch をモックする
global.$fetch = vi.fn()

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('handleApiError', () => {
    it('Error オブジェクトを ApiError に変換する', () => {
      const { handleApiError } = useApi()
      const error = new Error('Test error message')

      const result = handleApiError(error)

      expect(result).toEqual({
        status: 500,
        message: 'Test error message',
      })
    })

    it('不明なエラーを汎用の ApiError に変換する', () => {
      const { handleApiError } = useApi()
      const error = 'string error'

      const result = handleApiError(error)

      expect(result).toEqual({
        status: 500,
        message: 'Unknown error occurred',
      })
    })
  })

  describe('fetchWithErrorHandling', () => {
    it('取得に成功した場合は body を返す', async () => {
      const { fetchWithErrorHandling } = useApi()
      const mockData = { body: ['test', 'data'] }

      vi.mocked($fetch).mockResolvedValue(mockData)

      const result = await fetchWithErrorHandling('/test-url')

      expect(result).toEqual(['test', 'data'])
      expect($fetch).toHaveBeenCalledWith('/test-url')
    })

    it('body が undefined の場合は null を返す', async () => {
      const { fetchWithErrorHandling } = useApi()
      const mockData = { status: 200 }

      vi.mocked($fetch).mockResolvedValue(mockData)

      const result = await fetchWithErrorHandling('/test-url')

      expect(result).toBeNull()
    })

    it('取得に失敗した場合はエラーをログに出して null を返す', async () => {
      const { fetchWithErrorHandling } = useApi()
      const error = new Error('Fetch failed')

      vi.mocked($fetch).mockRejectedValue(error)

      const result = await fetchWithErrorHandling('/test-url')

      expect(result).toBeNull()
      expect($fetch).toHaveBeenCalledWith('/test-url')
    })
  })
})
