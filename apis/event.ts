import type { addTagParams, addTagModel } from '@/apis/types/eventType'
enum Api {
  tagAll = '/tag/all',
  categoriesAll = '/categories/all',
  addTag = '/tag'
}

// 取得所有 tag
export function getTagAll() {
  return useHttp.get(Api.tagAll)
}

// 取得所有 標籤
export function getCategoriesAll() {
  return useHttp.get(Api.categoriesAll)
}

// 新增標籤
export function postAddTag(body: addTagParams) {
  return useHttp.post<addTagModel>(Api.addTag, body)
}
