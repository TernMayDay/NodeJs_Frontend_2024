import { defineStore } from 'pinia'
const api = runApi()
export const useCategoryStore = defineStore('categoryStore', () => {
  const categoriesAll = ref([])

  /**
   * 取得所有/熱門賽事項目
   * @param { "all" | "hot" } type 指定標籤類型資料：all 全部、hot 熱門
   * @param { number } limit 資料筆數
   * @returns api 資料
   */
  const getCategorys = async (type, limit) => {
    // eslint-disable-next-line no-console
    console.log(type, limit)
    const { data } = await useFetch('/api/categorys')
    // eslint-disable-next-line no-console
    console.log(data.value)
    return data.value
  }

  const getCategoriesAll = async () => {
    const response = await api.getCategoriesAll()
    categoriesAll.value = response.data.categories
    return response.data.categories
  }

  return {
    getCategorys,
    getCategoriesAll,
    categoriesAll
  }
})
