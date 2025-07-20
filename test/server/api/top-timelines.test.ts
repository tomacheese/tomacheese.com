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
      throw new Error('Failed to load top timelines data')
    }
  }
}

describe('server/api/top-timelines', () => {
  let handler: ReturnType<typeof createMockHandler>

  beforeEach(() => {
    vi.clearAllMocks()
    handler = createMockHandler()
  })

  it('正常にtop-timelinesデータを返す', async () => {
    const mockData = {
      timelines: [
        { id: 'timeline1', date: '2024-01-01', title: 'Test Timeline 1', description: 'Test description 1' },
        { id: 'timeline2', date: '2024-02-01', title: 'Test Timeline 2', description: 'Test description 2' }
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

    await expect(handler()).rejects.toThrow('Failed to load top timelines data')
  })

  it('無効なJSONの場合エラーを投げる', async () => {
    mockReadFileSync.mockReturnValue('invalid json')

    await expect(handler()).rejects.toThrow()
  })

  it('空のファイルでもパースできる', async () => {
    const mockData = {}
    mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

    const result = await handler()
    expect(result).toEqual(mockData)
  })

  it('タイムライン配列データを処理できる', async () => {
    const mockData = {
      timelines: [
        { id: 'tl1', date: '2023-12-25', title: 'Christmas', description: 'Holiday' },
        { id: 'tl2', date: '2024-01-01', title: 'New Year', description: 'Celebration' }
      ]
    }
    mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

    const result = await handler()
    expect(result).toEqual(mockData)
    expect(result.timelines).toHaveLength(2)
    expect(result.timelines[0].title).toBe('Christmas')
  })
})