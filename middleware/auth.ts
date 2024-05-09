// 攔截 router 變化
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('auth')
})
