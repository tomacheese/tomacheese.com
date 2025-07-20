import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TopAbout from '~/components/TopAbout.vue'

// DOMPurifyのモック
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html: string, options: { ALLOWED_TAGS?: string[]; ALLOWED_ATTR?: string[] }) => {
      // 実際のサニタイゼーション動作をDOMPurifyに委譲
      const DOMPurify = require('dompurify').default;
      return DOMPurify.sanitize(html, options);
    }),
  },
}))

// Icon コンポーネントのグローバルモック
const IconComponent = {
  name: 'Icon',
  props: ['name', 'size'],
  template: '<div class="mock-icon" data-testid="icon" :data-name="name" :data-size="size"></div>',
}

describe('TopAbout.vue', () => {
  // 各テスト前にモックをクリア
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockDetails = [
    {
      id: 'test-1',
      icon: 'mdi:user',
      text: 'テストユーザー',
    },
    {
      id: 'test-2',
      icon: 'mdi:location',
      text: '日本',
    },
  ]

  const mockTimelines = [
    {
      icon: 'mdi:cake-variant',
      date: '2001',
      text: '山梨県で生まれる',
      color: 'pink',
    },
    {
      icon: 'mdi:minecraft',
      date: '2016',
      text: '<a href="https://jaoafa.com">jao Minecraft Server</a> でプラグイン等の開発に取り組む',
      color: 'green',
    },
  ]

  it('正常にマウントされる', () => {
    const wrapper = mount(TopAbout, {
      props: {
        details: mockDetails,
        timelines: mockTimelines,
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('detailsが正しく表示される', () => {
    const wrapper = mount(TopAbout, {
      props: {
        details: mockDetails,
        timelines: [],
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    const detailItems = wrapper.findAll('.detail-item')
    expect(detailItems).toHaveLength(2)

    // 最初のdetail項目をチェック
    const firstDetail = detailItems[0]
    expect(firstDetail).toBeDefined()
    expect(firstDetail.find('.detail-text').text()).toBe('テストユーザー')

    // アイコンの属性をチェック
    const icon = firstDetail.find('[data-testid="icon"]')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('data-name')).toBe('mdi:user')
  })

  it('timelinesが正しく表示される', () => {
    const wrapper = mount(TopAbout, {
      props: {
        details: [],
        timelines: mockTimelines,
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    const timelineItems = wrapper.findAll('.timeline-item')
    expect(timelineItems).toHaveLength(2)

    // 最初のtimeline項目をチェック
    const firstTimeline = timelineItems[0]
    expect(firstTimeline).toBeDefined()
    expect(firstTimeline.find('.timeline-date').text()).toBe('2001')
    expect(firstTimeline.find('.timeline-text').text()).toBe('山梨県で生まれる')
  })

  it('HTMLコンテンツが適切にサニタイズされて表示される', () => {
    const wrapper = mount(TopAbout, {
      props: {
        details: [],
        timelines: [
          {
            icon: 'mdi:minecraft',
            date: '2016',
            text: '<a href="https://jaoafa.com">jao Minecraft Server</a> でプラグイン等の開発に取り組む',
          },
        ],
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    const timelineText = wrapper.find('.timeline-text')
    // サニタイズされたHTMLが含まれていることを確認
    expect(timelineText.html()).toContain('<a href="https://jaoafa.com">jao Minecraft Server</a>')
  })

  it('XSS攻撃を防ぐ - scriptタグが除去される', () => {
    const maliciousTimeline = {
      icon: 'mdi:alert',
      date: '2024',
      text: '<script>alert("XSS")</script>悪意のあるコンテンツ',
    }

    const wrapper = mount(TopAbout, {
      props: {
        details: [],
        timelines: [maliciousTimeline],
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    const timelineText = wrapper.find('.timeline-text')
    // scriptタグが除去されていることを確認
    expect(timelineText.html()).not.toContain('<script>')
    expect(timelineText.html()).not.toContain('alert("XSS")')
    expect(timelineText.html()).toContain('悪意のあるコンテンツ')
  })

  it('XSS攻撃を防ぐ - onclickなどのイベントハンドラが除去される', () => {
    const maliciousTimeline = {
      icon: 'mdi:alert',
      date: '2024',
      text: '<a href="#" onclick="alert(\'XSS\')">悪意のあるリンク</a>',
    }

    const wrapper = mount(TopAbout, {
      props: {
        details: [],
        timelines: [maliciousTimeline],
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    const timelineText = wrapper.find('.timeline-text')
    // onclickイベントハンドラが除去されていることを確認
    expect(timelineText.html()).not.toContain('onclick')
    expect(timelineText.html()).toContain('悪意のあるリンク') // テキストは残る
  })

  it('sanitizeHtml関数が呼び出される', async () => {
    const DOMPurify = await import('dompurify')
    
    mount(TopAbout, {
      props: {
        details: [],
        timelines: mockTimelines,
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    // DOMPurify.sanitizeが呼び出されたことを確認
    expect(DOMPurify.default.sanitize).toHaveBeenCalled()
  })

  it('空のデータでもエラーが発生しない', () => {
    const wrapper = mount(TopAbout, {
      props: {
        details: [],
        timelines: [],
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('.detail-item')).toHaveLength(0)
    expect(wrapper.findAll('.timeline-item')).toHaveLength(0)
  })

  it('適切なクラスが適用されている', () => {
    const wrapper = mount(TopAbout, {
      props: {
        details: mockDetails,
        timelines: mockTimelines,
      },
      global: {
        components: {
          Icon: IconComponent,
        },
      },
    })

    expect(wrapper.find('.about-section').exists()).toBe(true)
    expect(wrapper.find('.user-header').exists()).toBe(true)
    expect(wrapper.find('.content-grid').exists()).toBe(true)
    expect(wrapper.find('.details-section').exists()).toBe(true)
    expect(wrapper.find('.timeline-section').exists()).toBe(true)
  })
})