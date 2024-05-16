// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  css: ['normalize.css', '@/assets/scss/app.scss'],
  postcss: {
    plugins: {
      autoprefixer: true
    }
  },
  imports: {
    dirs: ['stores']
  },
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui', 'nuxt-lodash'],
  quasar: {
    config: {
      // Add Quasar configurations here
      notify: {}, // This ensures notify is correctly configured
    },
    // Specify Quasar plugins you want to include
    plugins: ['Notify'],
  },
  vite: {
    define: {
      'process.env': process.env
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/_color.scss";
            @import "@/assets/scss/_variables.scss";
            @import "@/assets/scss/_mixins.scss";
            @import "@/assets/scss/_function.scss";
          `
        }
      }
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        symbolId: '[dir]/[name]',
        customDomId: '__svg__icons__dom__'
      })
    ]
  },
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  }
})
