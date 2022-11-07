import { defineNuxtConfig } from '@nuxt/bridge'
import webpack from 'webpack'

export default defineNuxtConfig({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Deadstock',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
    script: [{ src: '/magic360.js', body: true }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/adminlte.min.css',
    '~/assets/css/login.sass',
    '~/assets/css/main.sass',
    '~/assets/css/magic360.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-toasted.js', mode: 'client' },
    { src: '~/plugins/mixins/user.js', mode: 'client' },
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/persistedState.js', mode: 'client' },
    { src: '~/plugins/owl.js', mode: 'client' },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/logger.js', mode: 'client' },
    { src: '~/plugins/utils.js', mode: 'client' },
    { src: '~/plugins/vue-chartjs.js', mode: 'client' },
    { src: '~/plugins/vue-doughnut-chart.js', mode: 'client' },
    { src: '~/plugins/axios', mode: 'client' },
    { src: '~/plugins/vue-paycard.js', mode: 'client' },
    { src: '~/plugins/vue-slider-component.js', mode: 'client' },
    { src: '~/plugins/vue-pinch-scroll-zoom.js', mode: 'client' },
    { src: '~/plugins/vue-360.js', mode: 'client' },
    { src: '~/plugins/magic360.js', mode: 'client' },
    { src: '~/plugins/tawk.js', mode: 'client' },
    { src: '~/plugins/vue-bottom-sheet.js', mode: 'client'},
    { src: '~/plugins/vue-click-outside.js', mode: 'client'},
    { src: '~/plugins/v-calendar.js', mode: 'client'},
    { src: '~/plugins/infinteloading', mode: 'client' },
    { src: '~/plugins/vue-moment.js', mode: 'client' },
    { src: '~/plugins/numberOnly.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/html-validator',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-social-sharing/nuxt',
    'nuxt-clipboard',
    '@nuxtjs/recaptcha',
  ],
  bootstrapVue: {
    icons: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    proxy: false,
  },

  proxy: {
    '/laravel': {
      target: 'https://laravel-auth.nuxtjs.app',
      pathRewrite: { '^/laravel': '/' },
    },
  },

  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.API_URL,
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: '/user',
            method: 'get',
            propertyName: 'data',
          },
          logout: {
            method: 'post',
            url: '/logout',
          },
          refresh: {
            url: '/refresh',
            method: 'post',
          },
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
      },
    },
    redirect: {
      login: '/',
      home: '/',
      logout: '/',
    },
    plugins: [{src: '~/plugins/echo.js', mode: 'client'}]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {},
    extractCSS: process.env.NODE_ENV !== 'development', // Disable in development mode for debugging css
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    ],
  },

  generate: {
    fallback: '404.html',
  },

  router: {
    middleware: ['i18n', 'remember'],
  },

  vue: {
    config: {
      devtools: true,
    },
  },

  htmlValidator: {
    usePrettier: true,
    failOnError: true,
  },

  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
  },

  recaptcha: {
    hideBadge: true,
    mode: 'enterprise',
    siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    version: 3,
    size: 'invisible',
  },
})
