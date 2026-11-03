import { describe, expect, it, vi } from 'vitest'

// 先に JSON データをモックする
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

// content の import をモックする
vi.mock('~/content/devices.json', () => ({
  default: mockDevicesData,
}))

// h3 の関数をモックする
vi.mock('h3', () => ({
  defineEventHandler: vi.fn((handler) => handler),
}))

describe('server/api/devices', () => {
  it('デバイスデータを正常に返す', async () => {
    // モック後に実際のハンドラーを import する
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
