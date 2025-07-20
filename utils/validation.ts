/**
 * Article validation utilities for @nuxt/content v3
 */

/**
 * Type definition for table of contents link
 */
export interface TocLink {
  id: string
  depth: string
  text: string
  children?: TocLink[]
}

/**
 * Type definition for a valid article from @nuxt/content
 */
export interface ValidArticle {
  title: string
  path: string
  body?: {
    toc?: {
      links?: TocLink[]
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
export function isValidArticle(result: unknown): result is ValidArticle {
  return (
    result !== null &&
    result !== undefined &&
    typeof result === 'object' &&
    result &&
    'title' in result &&
    typeof (result as Record<string, unknown>).title === 'string' &&
    ((result as Record<string, unknown>).title as string).trim() !== '' &&
    'path' in result &&
    typeof (result as Record<string, unknown>).path === 'string'
  )
}