export const useEventStore = defineStore('eventStore', () => {
  /**
   * 取得各種賽事
   * @param { "all" | "recent" | "latestSell" | "latest" | "hot" | "Upcoming" | "other" } displayMode 顯示的模式
   * 全部：all
   * 近期賽事：recent
   * 最新開賣：latestSell
   * 最新：latest
   * 熱門：hot
   * 即將開賽：Upcoming
   * 其他：other
   * @param { string } categoryId 賽事分類/項目
   * @param { string } q 搜尋活動標題或標籤名稱
   * @param { number } limit 每頁顯示幾筆
   * @param { number } p 頁碼，預設為 1
   * @returns api 資料
   */
  const getEvents = async (categoryId, q, limit, p) => {
    console.log('call api ----------------', categoryId, q, limit, p)
    const { data } = await useFetch('/api/events')
    console.log(data.value)
    return data.value.filter(
      (item) =>
        item.eventName.includes(q) || item.categorysNameTC.includes(q) || item.tags.includes(q)
    )
  }

  return {
    getEvents
  }
})
