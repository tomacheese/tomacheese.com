import { describe, expect, it, vi } from 'vitest'
import { useJsonld } from '~/composables/useJsonld'

// Mock useHead as a global
global.useHead = vi.fn()

describe('composables/useJsonld', () => {
  it('正常にJSON-LDを設定する', () => {
    const testJsonld = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Test User',
    }

    useJsonld(testJsonld)

    expect(global.useHead).toHaveBeenCalledWith({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(testJsonld),
        },
      ],
    })
  })

  it('複雑なオブジェクト構造でも正常に動作する', () => {
    const complexJsonld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
      author: {
        '@type': 'Person',
        name: 'Test Author',
      },
      datePublished: '2023-01-01',
    }

    useJsonld(complexJsonld)

    expect(global.useHead).toHaveBeenCalledWith({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(complexJsonld),
        },
      ],
    })
  })

  it('空のオブジェクトでも動作する', () => {
    const emptyJsonld = {}

    useJsonld(emptyJsonld)

    expect(global.useHead).toHaveBeenCalledWith({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(emptyJsonld),
        },
      ],
    })
  })
})