// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  routeRules: {
    '/': { prerender: true },
    //'/dashboard/**': { ssr: false },
    '/schedule/**': { ssr: true },
    '/login/**': { prerender: true }
    //'/api/**': { cors: true },
  },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {

  },
  nitro: {
    preset: 'cloudflare-pages',
    compressPublicAssets: true,
  },
  imports: {
    dirs: [
      'composables',
      'composables/**',
      'app/composables'
    ]
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          crossorigin: ''
        }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
