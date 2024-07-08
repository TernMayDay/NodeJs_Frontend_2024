// 新增 tag
export interface addTagParams {
  name: string
}

export interface tagObj {
  name: string
  eventNum: number
  isDeleted: boolean
  _id: string
  __v: number
}

export interface addTagModel {
  status: string
  data: {
    tag: tagObj
  }
}

// 取得 eventList  => displayMode 只有 list
// filterEvent => displayMode 排除 list
// DisplayMode 顯示模式的類型
export type displayMode =
  | 'all'
  | 'recent'
  | 'latestSell'
  | 'latest'
  | 'hot'
  | 'upcoming'
  | 'other'
  | 'list'

// 賽事列表 API 回應的接口 （改用 filter）
export interface eventListModel {
  status: string
  data: {
    events: Array<any>
    pagination?: {
      totalItems: number
      totalPages: number
      currentPage: number
      pageSize: number
    }
  }
}

// list 查詢參數的接口
export interface eventListParams {
  displayMode?: displayMode
  // categoryId?: string
  pageSize?: number
  page?: number
  q?: string
}

// filter 查詢參數的接口
export interface filterEventParams {
  displayMode: displayMode
  nameTC?: string // 分類 categoryId
  q?: string // tagList
  limit?: number
}

// 新增賽事
export interface addEventModel {
  status: string
  data: object
}

export interface addEventParams {
  eventSetting: object
  sessionSetting: Array<object>
}

// 賽事詳情、場次詳情
export interface idParams {
  id: string
}

export interface detailModel {
  status: string
  data: object
}

// 訂單
export interface addOrderParams {
  eventId: string
  sessionId: string
  cart: Array<object>
  total: number
}

export interface OrderData {
  order: object
}

export interface addOrderModel {
  status: string
  data: OrderData
}

// 綠界 ecPay
export interface ecPayParams {
  itemName: string
  itemPrice: number
  orderID: string
}

export interface ecPayModel {
  formHtml: string
}
