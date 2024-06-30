export const useOtherStore = defineStore('otherStore', () => {
  /**
   * 取得首頁 選擇我們的理由
   * @returns api 資料
   */
  const getWhyUsList = async () => {
    const { data } = await useFetch('/api/whyUsList')
    return data.value
  }

  return {
    getWhyUsList
  }
})
