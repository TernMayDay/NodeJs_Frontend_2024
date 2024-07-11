import type {
  ticketParams,
  addOrderParams,
  addOrderModel,
  ecPayParams,
  ecPayModel,
  orderId,
  orderSingleModel
} from '@/apis/types/ticketType'

enum Api {
  order = '/order',
  ecPay = '/green/checkout',
  ticket = '/ticket/status'
}

// 新增訂單
export function postAddOrder(body: addOrderParams) {
  return useHttp.post<addOrderModel>(Api.order, body)
}

// 取得單筆訂單內容
export function getSingleOrder(params: orderId) {
  const { id } = params
  const url = `${Api.order}/${id}`
  return useHttp.get<orderSingleModel>(url)
}

// 綠界
export function postEcPay(body: ecPayParams) {
  return useHttp.post<ecPayModel>(Api.ecPay, body)
}

// 掃描ＱrCode 更新票券狀態
export function updateTicket(body: ticketParams) {
  return useHttp.patch<void>(`${Api.ticket}`, body)
}
