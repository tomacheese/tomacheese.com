import { describe, expect, it } from 'vitest'
import { formatPrice, formatDate } from '~/utils/formatters'

describe('formatters', () => {
  describe('formatPrice', () => {
    it('正常な価格をフォーマットすることができる', () => {
      expect(formatPrice(1000)).toBe('1,000円')
      expect(formatPrice(123456)).toBe('123,456円')
      expect(formatPrice(0)).toBe('0円')
    })

    it('undefinedの場合は空文字を返す', () => {
      expect(formatPrice(undefined)).toBe('')
    })

    it('nullの場合は空文字を返す', () => {
      // @ts-expect-error Testing null input
      expect(formatPrice(null)).toBe('')
    })

    it('日本のロケールで数値を適切にフォーマットする', () => {
      expect(formatPrice(1234567)).toBe('1,234,567円')
      expect(formatPrice(1)).toBe('1円')
    })
  })

  describe('formatDate', () => {
    it('YYYY-MM-DD形式の日付をyyyy/MM/dd形式に変換する', () => {
      expect(formatDate('2024-12-16')).toBe('2024/12/16')
      expect(formatDate('2023-01-01')).toBe('2023/01/01')
      expect(formatDate('2023-12-31')).toBe('2023/12/31')
    })

    it('一桁の月日を適切にゼロパディングする', () => {
      expect(formatDate('2024-01-01')).toBe('2024/01/01')
      expect(formatDate('2024-01-09')).toBe('2024/01/09')
      expect(formatDate('2024-09-01')).toBe('2024/09/01')
    })

    it('年月日が正しく解析される', () => {
      expect(formatDate('2024-03-15')).toBe('2024/03/15')
      expect(formatDate('2025-11-22')).toBe('2025/11/22')
    })
  })
})