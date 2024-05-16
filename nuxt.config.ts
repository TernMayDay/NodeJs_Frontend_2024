// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { fileURLToPath } from 'url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  css: ['normalize.css', '@/assets/scss/app.scss'],
  alias: {
    icons: fileURLToPath(new URL('./assets/icons', import.meta.url)),
    images: fileURLToPath(new URL('./assets/images', import.meta.url))
  },
  postcss: {
    plugins: {
      autoprefixer: true
    }
  },
  imports: {
    dirs: ['stores']
  },
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui'],
  experimental: {
    defaults: {
      nuxtLink: {
        activeClass: 'active'
      }
    }
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
            @import "@/assets/scss/_variables.scss";
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
    // Public runtime configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000/api', // Adjust accordingly
    },
  },
})
