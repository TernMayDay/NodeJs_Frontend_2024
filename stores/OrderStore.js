const api = runApi()
export const useOrderStore = defineStore('orderStore', () => {
  const orderData = ref({})

  // 新增訂單
  const createdOrder = async (params) => {
    try {
      const response = await api.postAddOrder(params)
      orderData.value = response.data
      return response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error 新增訂單:', error)
      orderData.value = { status: 'error', data: { order: {} } }
    }
  }

  return {
    createdOrder,
    orderData
  }
})
