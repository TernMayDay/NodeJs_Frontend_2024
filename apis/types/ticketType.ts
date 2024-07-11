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

// 取得單筆訂單內容
export interface orderId {
  id: string
}

export interface orderSingleModel {
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

export interface ticketParams {
  ticketId: string
  status: boolean
}
