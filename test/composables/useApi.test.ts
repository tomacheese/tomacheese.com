import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useApi } from '~/composables/useApi'

// Mock the logger module
vi.mock('~/utils/logger', () => ({
  logger: {
    error: vi.fn()
  }
}))

// Mock $fetch
global.$fetch = vi.fn()

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('handleApiError', () => {
    it('converts Error object to ApiError', () => {
      const { handleApiError } = useApi()
      const error = new Error('Test error message')
      
      const result = handleApiError(error)
      
      expect(result).toEqual({
        status: 500,
        message: 'Test error message'
      })
    })

    it('converts unknown error to generic ApiError', () => {
      const { handleApiError } = useApi()
      const error = 'string error'
      
      const result = handleApiError(error)
      
      expect(result).toEqual({
        status: 500,
        message: 'Unknown error occurred'
      })
    })
  })

  describe('fetchWithErrorHandling', () => {
    it('returns data body on successful fetch', async () => {
      const { fetchWithErrorHandling } = useApi()
      const mockData = { body: ['test', 'data'] }
      
      vi.mocked($fetch).mockResolvedValue(mockData)
      
      const result = await fetchWithErrorHandling('/test-url')
      
      expect(result).toEqual(['test', 'data'])
      expect($fetch).toHaveBeenCalledWith('/test-url')
    })

    it('returns null when data body is undefined', async () => {
      const { fetchWithErrorHandling } = useApi()
      const mockData = { status: 200 }
      
      vi.mocked($fetch).mockResolvedValue(mockData)
      
      const result = await fetchWithErrorHandling('/test-url')
      
      expect(result).toBeNull()
    })

    it('returns null and logs error on fetch failure', async () => {
      const { fetchWithErrorHandling } = useApi()
      const error = new Error('Fetch failed')
      
      vi.mocked($fetch).mockRejectedValue(error)
      
      const result = await fetchWithErrorHandling('/test-url')
      
      expect(result).toBeNull()
      expect($fetch).toHaveBeenCalledWith('/test-url')
    })
  })
})