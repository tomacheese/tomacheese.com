export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'nuxt-gtag',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#',
      },
      title: 'Tomachi Site',
      titleTemplate: '%s - Tomachi Site',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'Tomachi Site' },
        { name: 'application-name', content: 'Tomachi Site' },
        { name: 'msapplication-TileColor', content: '#f0fecd' },
        {
          name: 'msapplication-config',
          content: '/favicons/browserconfig.xml',
        },
        { name: 'theme-color', content: '#f0fecd' },
        { name: 'description', content: 'Tomachiの個人サイト' },
        { property: 'og:site_name', content: 'Tomachi Site' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: 'https://tomacheese.com' },
        { property: 'og:title', content: 'Tomachi Site' },
        { property: 'og:description', content: 'Tomachiの個人サイト' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@book000' },
        { name: 'twitter:creator', content: '@book000' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicons/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicons/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicons/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/favicons/site.webmanifest' },
        {
          rel: 'mask-icon',
          href: '/favicons/safari-pinned-tab.svg',
          color: '#ffb41d',
        },
        {
          rel: 'shortcut icon',
          type: 'image/x-icon',
          href: '/favicons/favicon.ico',
        },
      ],
    },
  },

  css: ['~/assets/styles/main.scss'],

  gtag: {
    id: 'UA-117159378-1',
  },

  content: {
    highlight: {
      theme: 'github-light',
    },
  },

  fonts: {
    google: {
      families: ['Montserrat:wght@600', 'Noto+Sans+JP:wght@700'],
    },
  },

  runtimeConfig: {
    public: {
      baseName: process.env.BASE_NAME || 'Tomachi Site',
      baseUrl: process.env.BASE_URL || 'https://tomacheese.com',
      baseDescription: process.env.BASE_DESCRIPTION || 'Tomachiの個人サイト',
    },
  },

  compatibilityDate: '2024-11-01',

  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig.prerender?.routes) {
        nitroConfig.prerender = nitroConfig.prerender || {}
        nitroConfig.prerender.routes = []
      }
      // contentディレクトリからページを自動検出
      const { readdirSync } = await import('fs')
      const path = await import('path')
      try {
        const pagesDir = path.resolve('./content/pages')
        const files = readdirSync(pagesDir)
        const routes = files
          .filter(file => file.endsWith('.md'))
          .map(file => `/${file.replace('.md', '')}`)
        
        nitroConfig.prerender.routes.push(...routes)
      } catch {
        // ディレクトリが存在しない場合のフォールバック
        nitroConfig.prerender.routes.push('/about', '/anime', '/devices', '/me')
      }
    }
  },

  nitro: {
    prerender: {
      failOnError: false
    },
  },

  ssr: false,
})
