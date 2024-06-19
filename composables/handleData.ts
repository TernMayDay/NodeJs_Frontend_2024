import dayjs from 'dayjs'

/**
 * 處理賽事日期
 * @param eventDate 賽事日期
 * @returns 起始日 ~ 結束日 或 起始日
 */
export const handleEventDate = (eventDate: string) => {
  if (!eventDate) {
    return eventDate
  }

  const eventDateArr = splitDate(eventDate)
  const newEventDateArr = eventDateArr.map((date, index) => {
    switch (index) {
      case 0:
        return dayjs(date).format('YYYY.MM.DD')
      case 1:
        return dayjs(date).format('MM.DD')
      default:
        return null
    }
  })

  return newEventDateArr.join(' ~ ')
}

/**
 * 售票狀態
 * @param event 單一賽事資料
 * @returns 已售出、未開賣、開賣中
 */
export const handleSalesStatus = (event: any) => {
  const { ticketSales, eventDate } = event
  const startDate = splitDate(eventDate)[0]
  const today = new Date()

  if (today >= new Date(startDate)) {
    return ticketSales !== 0 ? '已售出' : '開賣中'
  } else {
    return '未開賣'
  }
}

/**
 * 處理賽事價格
 * @param price 賽事價格
 * @returns EX. $ 1000 起 或 免費
 */
export const handleEventPrice = (price: number) => {
  return price ? `$${price}起` : '免費'
}

/**
 * 裁切日期
 * @param date 日期
 * @returns [起始日, 結束日] 或 [起始日]
 */
const splitDate = (date: string) => (date ? date.split(' - ') : [])
