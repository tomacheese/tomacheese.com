/**
 * コンソール出力用のロガー。info / warn は開発環境のみ出力し、error は常に出力する
 */
export const logger = {
  info: (message: string, data?: unknown) => {
    if (import.meta.dev) {
      if (data !== undefined) {
        // eslint-disable-next-line no-console
        console.log(`[INFO] ${message}`, data)
      } else {
        // eslint-disable-next-line no-console
        console.log(`[INFO] ${message}`)
      }
    }
  },

  warn: (message: string, data?: unknown) => {
    if (import.meta.dev) {
      if (data !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(`[WARN] ${message}`, data)
      } else {
        // eslint-disable-next-line no-console
        console.warn(`[WARN] ${message}`)
      }
    }
  },

  error: (message: string, error?: unknown) => {
    if (error !== undefined) {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${message}`, error)
    } else {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${message}`)
    }
  },
}
