import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import VDarkSwitch from '~/components/VDarkSwitch.vue'

// Mock Icon component
const IconStub = {
  name: 'Icon',
  props: ['name', 'size'],
  template: '<div class="mock-icon" :data-name="name" :data-size="size"></div>',
}

describe('VDarkSwitch', () => {
  it('正常にマウントされる', () => {
    const wrapper = mount(VDarkSwitch, {
      global: {
        stubs: {
          Icon: IconStub,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('theme-toggleクラスが適用されている', () => {
    const wrapper = mount(VDarkSwitch, {
      global: {
        stubs: {
          Icon: IconStub,
        },
      },
    })

    expect(wrapper.find('button').classes()).toContain('theme-toggle')
  })

  it('toggle-trackとtoggle-thumbの構造が正しい', () => {
    const wrapper = mount(VDarkSwitch, {
      global: {
        stubs: {
          Icon: IconStub,
        },
      },
    })

    expect(wrapper.find('.toggle-track').exists()).toBe(true)
    expect(wrapper.find('.toggle-thumb').exists()).toBe(true)
    expect(wrapper.find('.toggle-thumb .mock-icon').exists()).toBe(true)
  })

  it('buttonにtitle属性が設定されている', () => {
    const wrapper = mount(VDarkSwitch, {
      global: {
        stubs: {
          Icon: IconStub,
        },
      },
    })

    const button = wrapper.find('button')
    const title = button.attributes('title')

    // Title should be either light or dark mode switch text
    expect(
      title === 'ライトモードに切り替え' || title === 'ダークモードに切り替え',
    ).toBe(true)
  })

  it('Iconコンポーネントに適切なpropsが渡される', () => {
    const wrapper = mount(VDarkSwitch, {
      global: {
        stubs: {
          Icon: IconStub,
        },
      },
    })

    const icon = wrapper.find('.mock-icon')
    expect(icon.attributes('data-size')).toBe('16')
    
    // Icon name should be either sun or moon
    const iconName = icon.attributes('data-name')
    expect(
      iconName === 'mdi:white-balance-sunny' || iconName === 'mdi:moon-waning-crescent'
    ).toBe(true)
  })

  it('buttonがクリック可能である', async () => {
    const wrapper = mount(VDarkSwitch, {
      global: {
        stubs: {
          Icon: IconStub,
        },
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')
    
    // After click, the component should still exist
    expect(wrapper.exists()).toBe(true)
  })
})
