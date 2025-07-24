/**
 * タイムライン項目の型定義
 */
export interface TimelineItem {
  icon: string
  date: string
  text: string
  color?: string
  id?: string
}

/**
 * 詳細項目の型定義
 */
export interface DetailItem {
  id: string
  icon: string
  text: string
  order?: number
}