const apiRoom = '/event'

export const useEventStore = defineStore('eventStore', () => {
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
    console.error('[待處理]取得各種賽事 API - displayMode, categoryId, q 參數確認')
    const data = await useHttp.get(`${apiRoom}/${displayMode}`, { categoryId, q, pageSize, page })
    return data.data
  }

  return {
    getEvents
  }
})
