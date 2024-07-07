import type {
  addTagParams,
  addTagModel,
  eventListParams,
  eventListModel,
  addEventParams,
  addEventModel,
  filterEventParams,
  idParams,
  detailModel,
  addOrderParams,
  addOrderModel
} from '@/apis/types/eventType'

enum Api {
  tagAll = '/tag/all',
  categoriesAll = '/categories/all',
  addTag = '/tag',
  eventList = '/event',
  filterEvent = '/event/filter',
  detailEvent = '/event/detail',
  session = '/session',
  order = '/order'
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

// 取得 eventList - list
// [範例]： /event/list?categoryId=123&pageSize=10&page=1&q=searchText
export function getEventList(params: eventListParams) {
  const { displayMode, ...queryParams } = params
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString()
  const url = queryString
    ? `${Api.eventList}/${displayMode}?${queryString}`
    : `${Api.eventList}/${displayMode}`
  return useHttp.get<eventListModel>(url)
}

// 取得 eventList - filter
// [範例]： /event/filter/recent?nameTC=羽球&limit=8
export function getFilterEvent(params: filterEventParams) {
  const { displayMode, nameTC, limit } = params
  let queryParams: Record<string, string> = {
    limit: limit.toString()
  }

  if (nameTC) {
    queryParams.nameTC = nameTC
  }
  
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `${Api.filterEvent}/${displayMode}?${queryString}`
  return useHttp.get<eventListModel>(url)
}

// (主辦方) 新增賽事
export function postAddEvent(body: addEventParams) {
  return useHttp.post<addEventModel>(Api.eventList, body)
}

// 取得賽事詳情
export function getDetailEvent(params: idParams) {
  const { id } = params
  const url = `${Api.detailEvent}/${id}`
  return useHttp.get<detailModel>(url)
}

// 取得場次詳情
export function getDetailSession(params: idParams) {
  const { id } = params
  const url = `${Api.session}/${id}`
  return useHttp.get<detailModel>(url)
}

// 新增訂單
export function postAddOrder(body: addOrderParams) {
  return useHttp.post<addOrderModel>(Api.order, body)
}
