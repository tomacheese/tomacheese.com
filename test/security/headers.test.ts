import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Security Headers Configuration', () => {
  // Read the nuxt.config.ts file to check if security headers are configured
  const configPath = join(process.cwd(), 'nuxt.config.ts')
  const configContent = readFileSync(configPath, 'utf-8')

  it('CSP header is configured in nuxt.config.ts', () => {
    expect(configContent).toContain('Content-Security-Policy')
    expect(configContent).toContain("default-src 'self'")
    expect(configContent).toContain('fonts.googleapis.com')
    expect(configContent).toContain('fonts.gstatic.com')
    expect(configContent).toContain('www.googletagmanager.com')
    expect(configContent).toContain('www.google-analytics.com')
    expect(configContent).toContain("frame-ancestors 'none'")
  })

  it('X-Frame-Options header is configured', () => {
    expect(configContent).toContain('X-Frame-Options')
    expect(configContent).toContain('DENY')
  })

  it('X-Content-Type-Options header is configured', () => {
    expect(configContent).toContain('X-Content-Type-Options')
    expect(configContent).toContain('nosniff')
  })

  it('Referrer-Policy header is configured', () => {
    expect(configContent).toContain('Referrer-Policy')
    expect(configContent).toContain('strict-origin-when-cross-origin')
  })

  it('Strict-Transport-Security header is configured', () => {
    expect(configContent).toContain('Strict-Transport-Security')
    expect(configContent).toContain('max-age=31536000')
    expect(configContent).toContain('includeSubDomains')
  })

  it('routeRules for global security headers are configured', () => {
    expect(configContent).toContain('routeRules')
    expect(configContent).toContain("'/**'")
    expect(configContent).toContain('headers')
  })

  it('CSP allows required resources for the application', () => {
    // Check that the CSP policy allows Google Fonts
    expect(configContent).toContain('fonts.googleapis.com')
    expect(configContent).toContain('fonts.gstatic.com')

    // Check that data URIs are allowed for images
    expect(configContent).toContain('data:')

    // Check that Google Analytics is allowed
    expect(configContent).toContain('www.googletagmanager.com')
    expect(configContent).toContain('www.google-analytics.com')

    // Check that unsafe-inline is allowed for styles (required for Vue SFCs)
    expect(configContent).toContain("'unsafe-inline'")
  })

  it('CSP follows security best practices', () => {
    // Ensure frame-ancestors is set to none to prevent clickjacking
    expect(configContent).toContain("frame-ancestors 'none'")

    // Ensure default-src is restricted to self
    expect(configContent).toContain("default-src 'self'")

    // Ensure script-src includes necessary domains but not unsafe-eval
    expect(configContent).toContain('script-src')
    expect(configContent).not.toContain("'unsafe-eval'")
  })
})
