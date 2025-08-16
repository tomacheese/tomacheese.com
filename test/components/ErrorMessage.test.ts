import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ErrorMessage from '~/components/ErrorMessage.vue'

describe('ErrorMessage', () => {
  it('displays default error message and icon', () => {
    const wrapper = mount(ErrorMessage)

    expect(wrapper.text()).toContain('⚠️')
    expect(wrapper.text()).toContain(
      'データの読み込みに失敗しました。しばらくしてからもう一度お試しください。',
    )
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.find('.retry-button').exists()).toBe(false)
  })

  it('displays custom message and icon', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'カスタムエラーメッセージ',
        icon: '❌',
      },
    })

    expect(wrapper.text()).toContain('❌')
    expect(wrapper.text()).toContain('カスタムエラーメッセージ')
  })

  it('shows retry button when retry prop is true', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        retry: true,
      },
    })

    expect(wrapper.find('.retry-button').exists()).toBe(true)
    expect(wrapper.find('.retry-button').text()).toBe('再試行')
  })

  it('emits retry event when retry button is clicked', async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        retry: true,
      },
    })

    await wrapper.find('.retry-button').trigger('click')
    expect(wrapper.emitted().retry).toBeTruthy()
    expect(wrapper.emitted().retry).toHaveLength(1)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(ErrorMessage)

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })
})
