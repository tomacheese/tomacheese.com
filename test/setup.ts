import { vi } from 'vitest'

global.defineEventHandler = vi.fn((handler) => handler)
global.createError = vi.fn((error) => new Error(error.statusMessage))

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

vi.mock('#components', () => ({
  UIcon: {
    name: 'UIcon',
    props: ['name', 'size'],
    template:
      '<div class="mock-icon" data-testid="icon" :data-name="name" :data-size="size"></div>',
  },
}))

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
