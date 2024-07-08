import { defineNuxtRouteMiddleware, useRuntimeConfig } from 'nuxt/app'

// 攔截 router 變化
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const authProfileStore = useAuthProfileStore()
    const config = useRuntimeConfig()
    if (!authProfileStore.token) {
      return navigateTo('/login')
    }
  }
})
