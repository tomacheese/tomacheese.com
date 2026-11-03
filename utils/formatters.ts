/**
 * 価格を「1,234円」形式に整形する。未指定の場合は空文字を返す
 */
export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) {
    return ''
  }
  return `${price.toLocaleString('ja-JP')}円`
}

/**
 * YYYY-MM-DD 形式の日付文字列を yyyy/MM/dd 形式に整形する (例: 2024/12/16)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}/${month}/${day}`
}
