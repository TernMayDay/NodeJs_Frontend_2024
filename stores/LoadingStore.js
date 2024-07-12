// const api = runApi()

import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref(true)
  let _throttleTimer = null

  const clear = () => {
    clearTimeout(_throttleTimer)
    _throttleTimer = null
  }

  const show = (throttle = 200) => {
    // console.log('=== show ===')
    clear()
    if (process.client) {
      if (throttle > 0) {
        _throttleTimer = setTimeout(() => {
          isLoading.value = true
        }, throttle)
      } else {
        isLoading.value = true
      }
    }
  }

  const hide = (hold = 400) => {
    // console.log('=== hide ===')
    clear()
    if (process.client) {
      setTimeout(() => {
        isLoading.value = false
      }, hold)
    }
  }

  return {
    isLoading,
    show,
    hide
  }
})
