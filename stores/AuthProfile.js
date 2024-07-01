import { defineStore } from 'pinia'

export const useAuthProfileStore = defineStore('authProfile', {
  state: () => ({
    token: null,
    profile: null,
    role: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userId: (state) => state.profile ? state.profile._id : null
  },
  actions: {
    setUserData(userData) {
      this.token = userData.token
      this.profile = userData.data.user
      this.role = userData.data.user.role || 'user'
      
      // Store in localStorage as well
      localStorage.setItem('authToken', this.token)
      localStorage.setItem('userData', JSON.stringify(this.profile))
    },
    clearUserData() {
      this.token = null
      this.profile = null
      this.role = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    }
  }
})