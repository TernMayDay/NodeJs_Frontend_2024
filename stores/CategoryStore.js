export const useCategoryStore = defineStore('categoryStore', () => {
  /**
   * 取得所有/熱門賽事項目
   * @param { "all" | "hot" } type 指定標籤類型資料：all 全部、hot 熱門
   * @param { number } limit 資料筆數
   * @returns api 資料
   */
  const getCategorys = async (type, limit) => {
    console.log(type, limit)
    const { data } = await useFetch('/api/categorys')
    console.log(data.value)
    return data.value.slice(0, limit)
  }

  return {
    getCategorys
  }
})
