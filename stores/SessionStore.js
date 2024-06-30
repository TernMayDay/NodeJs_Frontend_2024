const api = runApi()

export const useSessionStore = defineStore('sessionStore', () => {
  const sessionDetail = ref([])

  // 取得賽事詳情
  const fetchDetailSession = async (params) => {
    try {
      const response = await api.getDetailSession(params)
      sessionDetail.value = response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error 取得場次詳情:', error)
      sessionDetail.value = { status: 'error', data: { session: [] } }
    }
  }

  return {
    fetchDetailSession,
    sessionDetail
  }
})
