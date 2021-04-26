import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'

const baseName = process.env.BASE_NAME || 'Tomachi Site'
const baseUrl = process.env.BASE_URL || 'https://tomacheese.com'
const baseDescription = process.env.BASE_DESCRIPTION || 'Tomachiの個人サイト'

const { MICROCMS_API_URL, MICROCMS_API_KEY } = process.env

const config: NuxtConfig = {
  srcDir: 'src/',

  target: 'static',

  head: {
    titleTemplate: '%s - Tomachi Site',
    title: 'Tomachi Site',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: baseName,
      },
      {
        name: 'application-name',
        content: baseName,
      },
      {
        name: 'msapplication-TileColor',
        content: '#f0fecd',
      },
      {
        name: 'msapplication-config',
        content: '/favicons/browserconfig.xml',
      },
      {
        name: 'theme-color',
        content: '#f0fecd',
      },
      {
        hid: 'description',
        name: 'description',
        content: baseDescription,
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: baseName,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: baseUrl,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: baseName,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: baseDescription,
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@book000',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@book000',
      },
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

  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics',
  ],

  modules: ['@nuxtjs/axios', 'nuxt-webfontloader', 'vue-scrollto/nuxt'],

  webfontloader: {
    google: {
      families: ['Montserrat:wght@600', 'Noto+Sans+JP:wght@700'],
    },
  },

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          maincolor: colors.shades.white,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.grey.darken4,
          archiveTitleColor: colors.amber.darken2,
          archiveSubTitleColor: colors.blueGrey.darken3,
        },
        light: {
          maincolor: colors.shades.black,
          background: colors.grey.lighten4,
          archiveTitleColor: colors.amber.darken2,
          archiveSubTitleColor: colors.blueGrey.lighten4,
        },
      },
      options: {
        customProperties: true,
      },
    },
  },

  build: {},

  googleAnalytics: {
    id: 'UA-117159378-1',
    dev: process.env.NODE_ENV === 'development',
  },

  [process.env.NODE_ENV === 'development'
    ? 'publicRuntimeConfig'
    : 'privateRuntimeConfig']: {
    MICROCMS_API_KEY,
    MICROCMS_API_URL,
  },

  server: {
    host: '0.0.0.0',
  },
}

export default config
