/**
 * Article validation utilities for @nuxt/content v3
 */

/**
 * Type definition for a valid article from @nuxt/content
 */
export interface ValidArticle {
  title: string
  path: string
  body?: {
    toc?: {
      links?: unknown[]
    }
  }
  description?: string
  [key: string]: unknown
}

/**
 * Validates if a content result is a valid article
 * @param result - Result from queryCollection query
 * @returns True if the result is a valid article with required fields
 */
export function isValidArticle(result: unknown): result is ValidArticle {
  return (
    result !== null &&
    result !== undefined &&
    typeof result === 'object' &&
    typeof result.title === 'string' &&
    result.title.trim() !== '' &&
    typeof result.path === 'string'
  )
}