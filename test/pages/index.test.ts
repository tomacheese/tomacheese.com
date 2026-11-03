import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'

// 静的な構造だけを検証する簡易テスト
describe('pages/index.vue', () => {
  it('エラーなく import できる', async () => {
    const IndexPage = await import('~/pages/index.vue')
    expect(IndexPage).toBeDefined()
    expect(IndexPage.default).toBeDefined()
  })

  it('ページファイルが存在する', () => {
    const filePath = path.join(process.cwd(), 'pages', 'index.vue')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
