import { vi } from 'vitest'

// Mock Nuxt global functions
global.defineEventHandler = vi.fn((handler) => handler)
global.createError = vi.fn((error) => new Error(error.statusMessage))

// Mock Vue composables globally
global.useColorMode = vi.fn(() => ({
  value: 'light',
  preference: 'light',
}))

global.computed = vi.fn((fn) => ({ value: fn() }))
global.watchEffect = vi.fn()
global.ref = vi.fn((value) => ({ value }))
global.reactive = vi.fn((value) => value)
global.onMounted = vi.fn((callback) => callback && callback())
global.useFetch = vi.fn(() => ({
  data: { value: null },
  error: { value: null },
  pending: { value: false },
}))

// Mock @nuxt/ui Icon component
vi.mock('#components', () => ({
  UIcon: {
    name: 'UIcon',
    props: ['name', 'size'],
    template:
      '<div class="mock-icon" data-testid="icon" :data-name="name" :data-size="size"></div>',
  },
}))

// Mock nuxt runtime
vi.mock('#app', () => ({
  useNuxtApp: vi.fn(() => ({})),
  navigateTo: vi.fn(),
  useFetch: vi.fn(() => ({
    data: { value: null },
    error: { value: null },
    pending: { value: false },
  })),
  $fetch: vi.fn(() => Promise.resolve({})),
}))
