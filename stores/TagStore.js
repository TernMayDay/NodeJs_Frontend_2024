import { defineStore } from 'pinia'

const apiRoom = '/tag'
const api = runApi()
export const useTagStore = defineStore('tagStore', () => {
  const tagAll = ref([])
  const top20Tags = ref([])
  /**
   * 取得所有/熱門標籤
   * @param { "all" | "hot" } type 指定標籤類型資料：all 全部、hot 熱門
   * @param { number } limit 資料筆數
   * @param { string } q 搜尋標籤名稱
   * @returns api 資料
   */

  const getTags = async (type, limit, q) => {
    const data = await useHttp.get(`${apiRoom}/${type}`, { limit, q })
    const { tags } = data.data

    // 熱門標籤最小長度
    const hotTagsMinLimit = 20
    if (((type === 'all' && !limit) || (type === 'hot' && limit >= hotTagsMinLimit)) && !q) {
      top20Tags.value = [...tags].sort((a, b) => b.eventNum - a.eventNum).slice(0, hotTagsMinLimit)
    }

    return tags
  }

  const getTagAll = async () => {
    const response = await api.getTagAll()
    tagAll.value = response.data.tags
    return response.data.tags
  }

  const createdTag = async (name) => {
    const response = await api.postAddTag({ name })
    return response.data.tag
  }

  return {
    top20Tags,
    getTags,
    getTagAll,
    tagAll,
    createdTag
  }
})
