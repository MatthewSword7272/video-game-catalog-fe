// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: true
    }
  },

  build: {
    transpile: ["oh-vue-icons"]
  },

  plugins: ["~/plugins/oh-vue-icons.js"],

  ssr: true,

  fonts : {
    families : [{
      name: 'Pixelify Sans',
      provider: 'google',
      weights: [400],
      styles: ['normal', 'italic', 'oblique'],
    }]
  },
  app: {
    head: {
      title: "Matthew's Video Game Catalog"
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    app: {
      apiURL: process.env.API_URL,
      clientID: process.env.TWITCH_CLIENT_ID,
      accessToken: process.env.TWITCH_ACCESS_TOKEN,
    }
  }
})