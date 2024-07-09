import { defineStore } from 'pinia'

export const useAuthProfileStore = defineStore('authProfile', {
  state: () => ({
    token: null,
    profile: null,
    role: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userId: (state) => (state.profile ? state.profile._id : null)
  },
  actions: {
    setUserData({ token, data }) {
      if (token) {
        this.token = token
        // Store in localStorage as well
        localStorage.setItem('authToken', this.token)
      }

      this.profile = data.user
      this.role = data.user.role || 'user'

      // Store in localStorage as well
      // localStorage.setItem('authToken', this.token)
      localStorage.setItem('userData', JSON.stringify(this.profile))
    },
    clearUserData() {
      this.token = null
      this.profile = null
      this.role = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      location.reload()
    }
  }
})
