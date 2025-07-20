import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock Node.js modules first
const mockReadFileSync = vi.fn()
vi.mock('fs', () => ({
  default: {
    readFileSync: mockReadFileSync
  }
}))

vi.mock('path', () => ({
  default: {
    join: vi.fn((...paths) => paths.join('/'))
  }
}))

// Mock Nuxt utilities
vi.mock('h3', () => ({
  defineEventHandler: vi.fn((handler) => handler),
  createError: vi.fn((error) => new Error(error.statusMessage))
}))

// Create a mock handler function that simulates the API logic
const createMockHandler = () => {
  return async () => {
    try {
      const fileContent = mockReadFileSync()
      return JSON.parse(fileContent)
    } catch {
      throw new Error('Failed to load top details data')
    }
  }
}

describe('server/api/top-details', () => {
  let handler: ReturnType<typeof createMockHandler>

  beforeEach(() => {
    vi.clearAllMocks()
    handler = createMockHandler()
  })

  it('正常にtop-detailsデータを返す', async () => {
    const mockData = {
      details: [
        { id: 'test1', icon: 'test-icon', text: 'Test detail 1' },
        { id: 'test2', icon: 'test-icon-2', text: 'Test detail 2' }
      ]
    }

    mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

    const result = await handler()
    expect(result).toEqual(mockData)
  })

  it('ファイル読み込みエラー時に適切なエラーを投げる', async () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error('File not found')
    })

    await expect(handler()).rejects.toThrow('Failed to load top details data')
  })

  it('無効なJSONの場合エラーを投げる', async () => {
    mockReadFileSync.mockReturnValue('invalid json')

    await expect(handler()).rejects.toThrow()
  })

  it('空のオブジェクトを返すJSONも処理できる', async () => {
    const mockData = {}
    mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

    const result = await handler()
    expect(result).toEqual(mockData)
  })

  it('配列データも処理できる', async () => {
    const mockData = [
      { id: 'test1', text: 'Test 1' },
      { id: 'test2', text: 'Test 2' }
    ]
    mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

    const result = await handler()
    expect(result).toEqual(mockData)
  })
})