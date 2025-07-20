/**
 * Format price number as Japanese yen currency
 * @param price - Price as number or undefined
 * @returns Formatted price string with yen symbol, or empty string if undefined
 */
export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) {
    return ''
  }
  return `${price.toLocaleString('ja-JP')}円`
}

/**
 * Format date string in yyyy/MM/dd format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string in yyyy/MM/dd format (e.g., "2024/12/16")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}