/**
 * Content related type definitions
 */

export interface TimelineItem {
  icon: string
  date: string
  text: string
  color?: string
  id?: string
}

export interface DetailItem {
  id: string
  icon: string
  text: string
  order?: number
}