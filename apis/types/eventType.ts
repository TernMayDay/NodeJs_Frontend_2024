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

// 取得 eventList
// DisplayMode 顯示模式的類型
export type displayMode = 'list' | 'recent' | 'latestSell' | 'latest' | 'hot' | 'upcoming' | 'other'

// 賽事列表 API 回應的接口
export interface eventListModel {
  status: string
  data: {
    events: Array<any>
    pagination?: {
      totalItems: Number
      totalPages: Number
      currentPage: Number
      pageSize: Number
    }
  }
}

// 查詢參數的接口
export interface eventListParams {
  displayMode?: displayMode
  categoryId?: string
  pageSize?: number
  page?: number
  q?: string
}
