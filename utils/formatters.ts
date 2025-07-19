/**
 * Format price number as Japanese yen currency
 * @param price - Price as number
 * @returns Formatted price string with yen symbol
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('ja-JP')}円`
}

/**
 * Format date string in Japanese format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string in Japanese format (e.g., "2024年12月16日")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}