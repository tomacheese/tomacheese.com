import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('セキュリティヘッダーの設定', () => {
  // nuxt.config.ts を読み込み、セキュリティヘッダーの設定を確認する
  const configPath = join(process.cwd(), 'nuxt.config.ts')
  const configContent = readFileSync(configPath, 'utf-8')

  it('nuxt.config.ts に CSP ヘッダーが設定されている', () => {
    expect(configContent).toContain('Content-Security-Policy')
    expect(configContent).toContain("default-src 'self'")
    expect(configContent).toContain('fonts.googleapis.com')
    expect(configContent).toContain('fonts.gstatic.com')
    expect(configContent).toContain('www.googletagmanager.com')
    expect(configContent).toContain('www.google-analytics.com')
    expect(configContent).toContain("frame-ancestors 'none'")
  })

  it('X-Frame-Options ヘッダーが設定されている', () => {
    expect(configContent).toContain('X-Frame-Options')
    expect(configContent).toContain('DENY')
  })

  it('X-Content-Type-Options ヘッダーが設定されている', () => {
    expect(configContent).toContain('X-Content-Type-Options')
    expect(configContent).toContain('nosniff')
  })

  it('Referrer-Policy ヘッダーが設定されている', () => {
    expect(configContent).toContain('Referrer-Policy')
    expect(configContent).toContain('strict-origin-when-cross-origin')
  })

  it('Strict-Transport-Security ヘッダーが設定されている', () => {
    expect(configContent).toContain('Strict-Transport-Security')
    expect(configContent).toContain('max-age=31536000')
    expect(configContent).toContain('includeSubDomains')
  })

  it('全ルート向けのセキュリティヘッダーが routeRules に設定されている', () => {
    expect(configContent).toContain('routeRules')
    expect(configContent).toContain("'/**'")
    expect(configContent).toContain('headers')
  })

  it('CSP がアプリケーションに必要なリソースを許可している', () => {
    expect(configContent).toContain('fonts.googleapis.com')
    expect(configContent).toContain('fonts.gstatic.com')

    expect(configContent).toContain('data:')

    expect(configContent).toContain('www.googletagmanager.com')
    expect(configContent).toContain('www.google-analytics.com')

    expect(configContent).toContain("'unsafe-inline'")
  })

  it('CSP がセキュリティのベストプラクティスに沿っている', () => {
    expect(configContent).toContain("frame-ancestors 'none'")

    expect(configContent).toContain("default-src 'self'")

    expect(configContent).toContain('script-src')
    expect(configContent).not.toContain("'unsafe-eval'")
  })
})
