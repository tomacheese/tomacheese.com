/**
 * Logger utility for development-only console output
 * Provides structured logging that only outputs in development environment
 */
export const logger = {
  /**
   * Log information messages (development only)
   * @param message - The message to log
   * @param data - Optional additional data to log
   */
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

  /**
   * Log warning messages (development only)
   * @param message - The warning message to log
   * @param data - Optional additional data to log
   */
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

  /**
   * Log error messages (always shown)
   * @param message - The error message to log
   * @param error - Optional error object or additional data
   */
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
