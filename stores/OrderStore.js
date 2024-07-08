const api = runApi()
const apiRoom = '/order'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeApiRoom = `/api${apiRoom}`

export const useOrderStore = defineStore('orderStore', () => {
  const orderData = ref({})
  const myOrder = ref([])
  const ecPayForm = ref('')
  // 我的票券頁面 僅顯示未取票 switch
  const uncollectedTicketSwitchChecked = ref(true)

  // 取得使用者訂單
  const getOrders = async () => {
    const data = await useHttp.get(`${apiRoom}/list`)

    // 讀取 Fake API 方式
    // const { data } = await useFetch(`${fakeApiRoom}/list`)

    // 若讀取 Fake API：data.data => data.value.data
    const { orders } = data.data
    myOrder.value = orders
    // eslint-disable-next-line no-console
    console.log('orders', orders)
    return orders
  }

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

  // 綠界
  const createdEcPay = async (params) => {
    try {
      const response = await api.postEcPay(params)
      ecPayForm.value = response
      return response
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error ecPay:', error)
      ecPayForm.value = ''
    }
  }

  return {
    myOrder,
    uncollectedTicketSwitchChecked,
    getOrders,
    createdOrder,
    orderData,
    createdEcPay,
    ecPayForm
  }
})
