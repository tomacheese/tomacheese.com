import { describe, expect, it } from 'vitest'
import {
  isValidArticle,
  type ValidArticle,
  type TocLink,
} from '~/utils/validation'

describe('validation', () => {
  describe('isValidArticle', () => {
    it('有効な記事オブジェクトをtrueと判定する', () => {
      const validArticle: ValidArticle = {
        title: 'Test Article',
        path: '/test-article',
      }

      expect(isValidArticle(validArticle)).toBe(true)
    })

    it('タイトルと説明、パスを持つ記事をtrueと判定する', () => {
      const validArticle = {
        title: 'Test Article',
        path: '/test-article',
        description: 'Test description',
        body: {
          toc: {
            links: [{ id: '1', depth: '1', text: 'Section 1' }] as TocLink[],
          },
        },
      }

      expect(isValidArticle(validArticle)).toBe(true)
    })

    it('titleが空文字の場合はfalseと判定する', () => {
      const invalidArticle = {
        title: '',
        path: '/test-article',
      }

      expect(isValidArticle(invalidArticle)).toBe(false)
    })

    it('titleが空白のみの場合はfalseと判定する', () => {
      const invalidArticle = {
        title: '   ',
        path: '/test-article',
      }

      expect(isValidArticle(invalidArticle)).toBe(false)
    })

    it('titleがない場合はfalseと判定する', () => {
      const invalidArticle = {
        path: '/test-article',
      }

      expect(isValidArticle(invalidArticle)).toBe(false)
    })

    it('pathがない場合はfalseと判定する', () => {
      const invalidArticle = {
        title: 'Test Article',
      }

      expect(isValidArticle(invalidArticle)).toBe(false)
    })

    it('titleが文字列でない場合はfalseと判定する', () => {
      const invalidArticle = {
        title: 123,
        path: '/test-article',
      }

      expect(isValidArticle(invalidArticle)).toBe(false)
    })

    it('pathが文字列でない場合はfalseと判定する', () => {
      const invalidArticle = {
        title: 'Test Article',
        path: 123,
      }

      expect(isValidArticle(invalidArticle)).toBe(false)
    })

    it('nullの場合はfalseと判定する', () => {
      expect(isValidArticle(null)).toBe(false)
    })

    it('undefinedの場合はfalseと判定する', () => {
      expect(isValidArticle(undefined)).toBe(false)
    })

    it('オブジェクトでない場合はfalseと判定する', () => {
      expect(isValidArticle('string')).toBe(false)
      expect(isValidArticle(123)).toBe(false)
      expect(isValidArticle(true)).toBe(false)
    })
  })
})
