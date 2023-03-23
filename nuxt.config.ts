const baseName = process.env.BASE_NAME || 'Tomachi Site'
const baseDescription = process.env.BASE_DESCRIPTION || 'Tomachi の個人サイト'
const baseUrl = process.env.BASE_URL || 'https://tomacheese.com'
const isDev = process.env.NODE_ENV === 'development'
const isSsr = true

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: baseName },
        { name: 'application-name', content: baseName },
        { name: 'msapplication-TileColor', content: '#f0fecd' },
        {
          name: 'msapplication-config',
          content: '/favicons/browserconfig.xml'
        },
        { name: 'theme-color', content: '#f0fecd' },
        { key: 'description', name: 'description', content: baseDescription },
        { key: 'og:site_name', property: 'og:site_name', content: baseName },
        { key: 'og:type', property: 'og:type', content: 'article' },
        { key: 'og:url', property: 'og:url', content: baseUrl },
        { key: 'og:title', property: 'og:title', content: baseName },
        {
          key: 'og:description',
          property: 'og:description',
          content: baseDescription
        },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@book000'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@book000'
        },
        {
          key: 'msapplication-TileColor',
          name: 'msapplication-TileColor',
          content: '#00aba9'
        },
        {
          key: 'msapplication-config',
          name: 'msapplication-config',
          content: '/favicons/browserconfig.xml'
        },
        {
          key: 'theme-color',
          name: 'theme-color',
          content: '#1da1f2'
        }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicons/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicons/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicons/favicon-16x16.png'
        },
        {
          rel: 'mask-icon',
          href: '/favicons/safari-pinned-tab.svg',
          color: '#5bbad5'
        },
        {
          rel: 'shortcut icon',
          href: '/favicons/favicon.ico'
        }
      ],
      noscript: [{ children: 'This website requires JavaScript.' }]
    }
  },

  srcDir: 'src/',

  ssr: isSsr,

  typescript: {
    typeCheck: isDev,
    strict: true
  },

  vite: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    plugins: [isDev ? require('vite-plugin-eslint')() : undefined]
  },

  build: {
    transpile: ['vuetify']
  },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ]
})
