const api = runApi()
const apiRoom = '/event'
export const useEventStore = defineStore('eventStore', () => {
  const eventData = ref(null) // 取得賽事列表
  const newEventData = ref([]) // 新增賽事
  const eventDetail = ref([]) // 賽事詳情

  /**
   * 取得各種賽事
   * @param { 
        displayMode: { "list" | "recent" | "latestSell" | "latest" | "hot" | "Upcoming" | "other" }, 
        categoryId: string,
        q: string, 
        pageSize: number, 
        page: number 
      } API 相關參數
   * { "list": 全部(未確定 all 或 list) | "recent": 近期賽事 | "latestSell": 最新開賣 | "latest": 最新 | "hot": 熱門 | "Upcoming": 即將開賽 | "other":其他 } displayMode 顯示的模式
   * categoryId 賽事分類/項目
   * q 搜尋活動標題或標籤名稱
   * pageSize 每頁顯示幾筆
   * page 頁碼
   * @returns api 資料
   */
  const getEvents = async ({ displayMode, categoryId, q, pageSize, page }) => {
    // eslint-disable-next-line no-console
    console.error('[待處理]取得各種賽事 API - displayMode, categoryId, q 參數確認')
    const data = await useHttp.get(`${apiRoom}/${displayMode}`, { categoryId, q, pageSize, page })
    return data.data
  }
  /**
   * 取得賽事列表 (list) 與 取得賽事列表 filter
   * return 的資料皆為 eventData.value
   */

  // 取得賽事列表 (list)
  const fetchEventList = async (params) => {
    try {
      const response = await api.getEventList(params)
      eventData.value = response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error 取得賽事列表:', error)
      eventData.value = { status: 'error', data: { events: [] } }
    }
  }

  // 取得賽事列表 filter
  const filterEventList = async (params) => {
    try {
      const response = await api.getFilterEvent(params)
      eventData.value = response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error 取得 Filter 列表:', error)
      eventData.value = { status: 'error', data: { events: [] } }
    }
  }
  // 新增賽事
  const createdEvent = async (params) => {
    try {
      const response = await api.postAddEvent(params)
      newEventData.value = response.data
      return response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error 新增賽事:', error)
    }
  }

  // 取得賽事詳情
  const fetchDetailEvent = async (params) => {
    try {
      const response = await api.getDetailEvent(params)
      eventDetail.value = response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error 取得賽事詳情:', error)
      eventDetail.value = { status: 'error', data: { event: [] } }
    }
  }

  return {
    getEvents,
    fetchEventList,
    filterEventList,
    eventData,
    createdEvent,
    newEventData,
    fetchDetailEvent,
    eventDetail
  }
})
