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
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return dateString
}