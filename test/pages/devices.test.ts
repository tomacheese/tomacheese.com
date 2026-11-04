import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'

// 静的な構造だけを検証する簡易テスト
describe('pages/devices.vue', () => {
  it('エラーなく import できる', async () => {
    const DevicesPage = await import('~/pages/devices.vue')
    expect(DevicesPage).toBeDefined()
    expect(DevicesPage.default).toBeDefined()
  })

  it('ページファイルが存在する', () => {
    const filePath = path.join(process.cwd(), 'pages', 'devices.vue')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
