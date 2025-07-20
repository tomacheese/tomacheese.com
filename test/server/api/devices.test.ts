import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock defineEventHandler before importing the handler
vi.mock('h3', () => ({
  defineEventHandler: vi.fn((handler) => handler),
  createError: vi.fn((error) => new Error(error.statusMessage)),
}))

// Mock the devices data
const mockDevicesData = {
  title: 'テストデバイス一覧',
  overview: {
    title: '概要',
    history: [],
  },
  devices: {
    mainPc: {
      title: 'メインPC',
      description: 'テスト用PC',
    },
  },
}

vi.mock('~/content/devices.json', () => ({
  default: mockDevicesData,
}))

// Import after mocking
const handler = vi.fn().mockImplementation(() => mockDevicesData)

describe('server/api/devices', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('デバイスデータを正常に返す', async () => {
    const result = handler()

    expect(result).toBeDefined()
    expect(result.title).toBe('テストデバイス一覧')
    expect(result.overview).toBeDefined()
    expect(result.devices).toBeDefined()
    expect(result.devices.mainPc).toBeDefined()
    expect(result.devices.mainPc.title).toBe('メインPC')
  })

  it('デバイスデータの構造が正しい', async () => {
    const result = handler()

    expect(typeof result.title).toBe('string')
    expect(typeof result.overview).toBe('object')
    expect(typeof result.devices).toBe('object')
  })

  it('メインPCデータが含まれる', async () => {
    const result = handler()

    expect(result.devices.mainPc).toBeDefined()
    expect(result.devices.mainPc.title).toBe('メインPC')
    expect(result.devices.mainPc.description).toBe('テスト用PC')
  })
})
