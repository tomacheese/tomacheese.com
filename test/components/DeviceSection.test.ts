import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DeviceSection from '~/components/DeviceSection.vue'
import type { Device } from '~/types/devices'

// Mock formatPrice utility
vi.mock('~/utils/formatters', () => ({
  formatPrice: vi.fn((price) =>
    price ? `${price.toLocaleString('ja-JP')}円` : '',
  ),
}))

describe('DeviceSection', () => {
  const mockDevice: Device = {
    title: 'テストデバイス',
    description: 'テスト用のデバイスです',
  }

  it('正常にマウントされる', () => {
    const wrapper = mount(DeviceSection, {
      props: {
        device: mockDevice,
        deviceType: 'test',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.device-section').exists()).toBe(true)
  })

  it('デバイスのタイトルが表示される', () => {
    const wrapper = mount(DeviceSection, {
      props: {
        device: mockDevice,
        deviceType: 'test',
      },
    })

    expect(wrapper.find('h2').text()).toBe('テストデバイス')
  })

  it('デバイスの説明が表示される', () => {
    const wrapper = mount(DeviceSection, {
      props: {
        device: mockDevice,
        deviceType: 'test',
      },
    })

    expect(wrapper.text()).toContain('テスト用のデバイスです')
  })

  describe('メインPC表示', () => {
    const mainPcDevice: Device = {
      title: 'メインPC',
      description: 'メインPCです',
      sections: {
        summary: {
          title: '概要',
          items: ['高性能PC', '最新スペック'],
        },
        components: {
          title: '構成品',
          description: 'PC構成品一覧',
          categories: {
            cpu: {
              title: 'CPU',
              items: [
                {
                  name: 'Intel Core i7-13700K',
                  status: '現役',
                  price: 50000,
                  purchaseDate: '2023-01-01',
                  links: [{ name: 'Amazon', url: 'https://amazon.com' }],
                },
              ],
            },
          },
        },
      },
    }

    it('メインPCの概要セクションが表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: mainPcDevice,
          deviceType: 'mainPc',
        },
      })

      expect(wrapper.text()).toContain('概要')
      expect(wrapper.text()).toContain('高性能PC')
      expect(wrapper.text()).toContain('最新スペック')
    })

    it('構成品セクションが表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: mainPcDevice,
          deviceType: 'mainPc',
        },
      })

      expect(wrapper.text()).toContain('構成品')
      expect(wrapper.text()).toContain('PC構成品一覧')
      expect(wrapper.text()).toContain('CPU')
      expect(wrapper.text()).toContain('Intel Core i7-13700K')
    })

    it('構成品の詳細情報が表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: mainPcDevice,
          deviceType: 'mainPc',
        },
      })

      expect(wrapper.text()).toContain('ステータス: 現役')
      expect(wrapper.text()).toContain('購入価格:')
      expect(wrapper.text()).toContain('購入日: 2023-01-01')
    })

    it('構成品のリンクが表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: mainPcDevice,
          deviceType: 'mainPc',
        },
      })

      const link = wrapper.find('a[href="https://amazon.com"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('Amazon')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('ノートPC・サブPC表示', () => {
    const simpleDevice: Device = {
      title: 'ノートPC',
      specs: ['CPU: Intel Core i5', 'RAM: 16GB', 'Storage: 512GB SSD'],
      warranty: '3年保証',
      totalPrice: 150000,
      purchaseInfo: 'Amazon購入',
      notes: 'モバイル用',
    }

    it('ノートPCのスペックが表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: simpleDevice,
          deviceType: 'notebookPc',
        },
      })

      expect(wrapper.text()).toContain('CPU: Intel Core i5')
      expect(wrapper.text()).toContain('RAM: 16GB')
      expect(wrapper.text()).toContain('Storage: 512GB SSD')
    })

    it('ノートPCの追加情報が表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: simpleDevice,
          deviceType: 'notebookPc',
        },
      })

      expect(wrapper.text()).toContain('保証: 3年保証')
      expect(wrapper.text()).toContain('総額:')
      expect(wrapper.text()).toContain('購入情報: Amazon購入')
      expect(wrapper.text()).toContain('モバイル用')
    })
  })

  describe('モバイルデバイス表示', () => {
    const mobileDevice: Device = {
      title: 'モバイルデバイス',
      devices: [
        { name: 'iPhone 14', notes: 'メイン使用', purchaseDate: '2023-03-01' },
        { name: 'iPad Air', purchaseDate: '2023-02-01' },
      ],
    }

    it('モバイルデバイス一覧が表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: mobileDevice,
          deviceType: 'mobileDevices',
        },
      })

      expect(wrapper.text()).toContain('iPhone 14')
      expect(wrapper.text()).toContain('メイン使用')
      expect(wrapper.text()).toContain('2023-03-01購入')
      expect(wrapper.text()).toContain('iPad Air')
      expect(wrapper.text()).toContain('2023-02-01購入')
    })
  })

  describe('スマートウォッチ表示', () => {
    const smartWatchDevice: Device = {
      title: 'スマートウォッチ',
      devices: [
        {
          name: 'Apple Watch Series 8',
          price: 50000,
          purchaseDate: '2023-01-15',
          links: [{ name: 'Apple Store', url: 'https://apple.com' }],
        },
      ],
    }

    it('スマートウォッチ情報が表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: smartWatchDevice,
          deviceType: 'smartWatches',
        },
      })

      expect(wrapper.text()).toContain('Apple Watch Series 8')
      expect(wrapper.text()).toContain('2023-01-15購入')
    })

    it('スマートウォッチのリンクが表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: smartWatchDevice,
          deviceType: 'smartWatches',
        },
      })

      const link = wrapper.find('a[href="https://apple.com"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('Apple Store')
    })
  })

  describe('その他デバイス表示', () => {
    const otherDevice: Device = {
      title: 'その他デバイス',
      devices: ['キーボード', 'マウス', 'ヘッドセット'],
    }

    it('その他デバイス一覧が表示される', () => {
      const wrapper = mount(DeviceSection, {
        props: {
          device: otherDevice,
          deviceType: 'otherDevices',
        },
      })

      expect(wrapper.text()).toContain('キーボード')
      expect(wrapper.text()).toContain('マウス')
      expect(wrapper.text()).toContain('ヘッドセット')
    })
  })
})
