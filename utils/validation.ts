/**
 * @nuxt/content v3 の記事データを検証するユーティリティ
 */

/**
 * 目次 (TOC) のリンク
 */
export interface TocLink {
  id: string
  depth: string
  text: string
  children?: TocLink[]
}

/**
 * 検証済みの記事。title と path が必須
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
 * queryCollection の結果が、trim 後に空でない文字列の title と、文字列の path を持つかを判定する
 */
export function isValidArticle(result: unknown): result is ValidArticle {
  if (
    result === null ||
    result === undefined ||
    typeof result !== 'object' ||
    !result
  ) {
    return false
  }

  const resultObject = result as Record<string, unknown>

  return (
    'title' in resultObject &&
    typeof resultObject.title === 'string' &&
    resultObject.title.trim() !== '' &&
    'path' in resultObject &&
    typeof resultObject.path === 'string'
  )
}
