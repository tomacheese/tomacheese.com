import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '~/layouts/default.vue'

// Mock the layout components
const TheHeaderStub = {
  name: 'TheHeader',
  template: '<div class="header">Mock Header</div>',
}

const TheFooterStub = {
  name: 'TheFooter',
  template: '<div class="footer">Mock Footer</div>',
}



describe('layouts/default.vue', () => {
  it('正常にマウントされる', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          TheHeader: TheHeaderStub,
          TheFooter: TheFooterStub,
        },
      },
      slots: {
        default: '<div class="slot-content">Mock Content</div>',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('TheHeaderコンポーネントが含まれている', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          TheHeader: TheHeaderStub,
          TheFooter: TheFooterStub,
        },
      },
      slots: {
        default: '<div class="slot-content">Mock Content</div>',
      },
    })

    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.header').text()).toBe('Mock Header')
  })

  it('TheFooterコンポーネントが含まれている', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          TheHeader: TheHeaderStub,
          TheFooter: TheFooterStub,
        },
      },
      slots: {
        default: '<div class="slot-content">Mock Content</div>',
      },
    })

    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.find('.footer').text()).toBe('Mock Footer')
  })

  it('スロットコンテンツが正しくレンダリングされる', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          TheHeader: TheHeaderStub,
          TheFooter: TheFooterStub,
        },
      },
      slots: {
        default: '<div class="test-content">Test Content</div>',
      },
    })

    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Test Content')
  })
})