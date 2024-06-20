import type {
  addTagParams,
  addTagModel,
  eventListParams,
  eventListModel
} from '@/apis/types/eventType'

enum Api {
  tagAll = '/tag/all',
  categoriesAll = '/categories/all',
  addTag = '/tag',
  eventList = '/event'
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

// 取得 eventList
// [範例]： /event/list?categoryId=123&pageSize=10&page=1&q=searchText
export function getEventList(params: eventListParams) {
  const { displayMode, ...queryParams } = params
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString()
  const url = queryString
    ? `${Api.eventList}/${displayMode}?${queryString}`
    : `${Api.eventList}/${displayMode}`
  return useHttp.get<eventListModel>(url)
}
