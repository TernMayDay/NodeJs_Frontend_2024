import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const isLogin = ref(true)
  const getToken = ref('123To1j2ljl')

  const clearUserInfo = () => {
    userInfo.value = undefined
  }
  return { isLogin, getToken, clearUserInfo }
})
