import { defineStore } from 'pinia'
const api = runApi()
const apiRoom = '/categories'

export const useCategoryStore = defineStore('categoryStore', () => {
  const categoriesAll = ref([])
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
    // 熱門賽事項目最小長度
    const hotCategoriesMinLimit = 9
    if ((type === 'all' && !limit) || (type === 'hot' && limit >= hotCategoriesMinLimit)) {
      top9HotCategories.value = [...categories]
        .sort((a, b) => b.eventNum - a.eventNum)
        .slice(0, hotCategoriesMinLimit)
    }
    return categories
  }

  const getCategoriesAll = async () => {
    const response = await api.getCategoriesAll()
    categoriesAll.value = response.data.categories
    return response.data.categories
  }

  return {
    top9HotCategories,
    getCategories,
    getCategoriesAll,
    categoriesAll
  }
})
