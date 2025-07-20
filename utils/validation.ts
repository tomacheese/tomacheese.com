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
 * @param result - Result from queryCollection query (ParsedContent or similar content object)
 * @returns True if the result is a valid article with required fields
 */
export function isValidArticle(result: Record<string, string | unknown> | null | undefined): result is ValidArticle {
  return (
    result !== null &&
    result !== undefined &&
    typeof result === 'object' &&
    'title' in result &&
    typeof result.title === 'string' &&
    result.title.trim() !== '' &&
    'path' in result &&
    typeof result.path === 'string'
  )
}