const apiRoom = '/categories'

export const useCategoryStore = defineStore('categoryStore', () => {
  const top9HotCategories = ref([])
  /**
   * 取得所有/熱門賽事項目
   * @param { "all" | "hot" } type 指定標籤類型資料：all 全部、hot 熱門
   * @param { number } limit 資料筆數
   * @returns api 資料
   */
  const getCategories = async (type, limit) => {
    const data = await useHttp.get(`${apiRoom}/${type}`, { limit })
    const { categories } = data.data
    if ((type === 'all' && !limit) || (type === 'hot' && limit >= 9)) {
      top9HotCategories.value = categories.sort((a, b) => b.eventNum - a.eventNum).slice(0, 9)
    }
    return categories
  }

  return {
    top9HotCategories,
    getCategories
  }
})
