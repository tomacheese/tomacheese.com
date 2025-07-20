import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '~/app.vue'

// Mock NuxtPage and NuxtLayout
const NuxtPageStub = {
  name: 'NuxtPage',
  template: '<div class="nuxt-page">Mock Page Content</div>',
}

const NuxtLayoutStub = {
  name: 'NuxtLayout',
  template: '<div class="nuxt-layout"><slot /></div>',
}

describe('app.vue', () => {
  it('正常にマウントされる', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          NuxtPage: NuxtPageStub,
          NuxtLayout: NuxtLayoutStub,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('NuxtLayoutとNuxtPageコンポーネントがレンダリングされる', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          NuxtPage: NuxtPageStub,
          NuxtLayout: NuxtLayoutStub,
        },
      },
    })

    expect(wrapper.find('.nuxt-layout').exists()).toBe(true)
    expect(wrapper.find('.nuxt-page').exists()).toBe(true)
    expect(wrapper.find('.nuxt-page').text()).toBe('Mock Page Content')
  })
})