import { defineNuxtRouteMiddleware, useRuntimeConfig } from 'nuxt/app';

// 攔截 router 變化
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('authToken');
    const config = useRuntimeConfig();
    console.log(token)
    if (!token) {
      return navigateTo('/login');
    }
  }
})
