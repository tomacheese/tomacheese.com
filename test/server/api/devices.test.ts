import { describe, expect, it, vi } from 'vitest'

// Mock the JSON data first
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

// Mock the content import
vi.mock('~/content/devices.json', () => ({
  default: mockDevicesData,
}))

// Mock h3 functions
vi.mock('h3', () => ({
  defineEventHandler: vi.fn((handler) => handler),
}))

describe('server/api/devices', () => {
  it('デバイスデータを正常に返す', async () => {
    // Import the actual handler after mocking
    const devicesHandler = await import('~/server/api/devices')
    const handler = devicesHandler.default

    const result = handler()

    expect(result).toBeDefined()
    expect(result.title).toBe('テストデバイス一覧')
    expect(result.overview).toBeDefined()
    expect(result.devices).toBeDefined()
    expect(result.devices.mainPc).toBeDefined()
    expect(result.devices.mainPc.title).toBe('メインPC')
  })

  it('デバイスデータの構造が正しい', async () => {
    const devicesHandler = await import('~/server/api/devices')
    const handler = devicesHandler.default

    const result = handler()

    expect(typeof result.title).toBe('string')
    expect(typeof result.overview).toBe('object')
    expect(typeof result.devices).toBe('object')
  })

  it('メインPCデータが含まれる', async () => {
    const devicesHandler = await import('~/server/api/devices')
    const handler = devicesHandler.default

    const result = handler()

    expect(result.devices.mainPc).toBeDefined()
    expect(result.devices.mainPc.title).toBe('メインPC')
    expect(result.devices.mainPc.description).toBe('テスト用PC')
  })
})
