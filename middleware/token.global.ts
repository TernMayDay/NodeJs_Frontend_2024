export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const token = localStorage.getItem('authToken')
    let user = localStorage.getItem('userData')
    if (user) {
      user = JSON.parse(user)
    }

    const authProfileStore = useAuthProfileStore()
    const userStore = useUserStore()
    if (token) {
      if (user) {
        await authProfileStore.setUserData({ token, data: { user } })
      } else {
        await userStore.getUserProfile()
      }
    }
  }
})
