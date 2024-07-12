import dayjs from 'dayjs'

/**
 * 處理賽事日期
 * @param eventDate 賽事日期
 * @returns 起始日 ~ 結束日 或 起始日
 */
export const handleEventDate = (eventDateArr: (string | null)[]) => {
  if(!eventDateArr) {
    return ''
  }

  const newEventDateArr = eventDateArr
    .filter((data) => data)
    .map((date, index) => {
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
  if(!event.ticketSales) {
    return ''
  }

  const { ticketSales, eventDate } = event
  const startDate = eventDate[0]
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
 * @returns EX. $1000起 或 免費
 */
export const handleEventPrice = (price: number) => {
  return price ? `$${price}起` : '免費'
}

/**
 * 處理票價
 * @param price 賽事價格
 * @returns EX. NT$ 1000 起 或 免費
 */
export const handleFare = (price: number | string) => {
  if (typeof price === 'string') {
    price = +price
  }
  const formatter = new Intl.NumberFormat('zh-TW', {
    style: 'decimal',
    minimumFractionDigits: 0
  })

  return price ? `NT$ ${formatter.format(price)}` : '免費'
}

/**
 * 處理訂單狀態(0:未付款 1:已付款 2:已取消)
 * @param status 訂單狀態(0~2)
 * @returns EX. 未付款 或 已付款 或 已取消
 */
export const handleOrderStatus = (status: 0 | 1 | 2) => {
  switch (status) {
    case 0:
      return '未付款'
    case 1:
      return '已付款'
    case 2:
      return '已取消'
    default:
      return status
  }
}

/**
 * 處理票務品項
 * @param ticketList 票務列表
 * @returns EX. [{ ticketName: '全票', total: 1 }]
 */
export const handleTicketNameIntegrate = (ticketList: any[]) => {
  const data = ticketList.reduce((accumulator, currentValue) => {
    const { ticketName } = currentValue
    const find = accumulator.find((item: any) => item.ticketName === ticketName)
    if (find) {
      find.total += 1
    } else {
      accumulator.push({
        ticketName,
        total: 1
      })
    }
    return accumulator
  }, [])
  return data
}

/**
 * 處理票券狀態(0: 未使用 1: 已使用 2:退票 )
 * @param status 票券狀態(0~2)
 * @returns EX. 未使用 或 已使用 或 退票
 */
export const handleTicketStatus = (status: 0 | 1 | 2) => {
  switch (status) {
    case 0:
      return '未使用'
    case 1:
      return '已使用'
    case 2:
      return '退票'
    default:
      return status
  }
}
