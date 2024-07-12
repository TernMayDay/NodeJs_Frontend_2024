<script setup>
import dayjs from 'dayjs'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'
import logo from '@/assets/images/logo.svg'

const route = useRoute()
const router = useRouter()
const authProfileStore = useAuthProfileStore()
const { token } = storeToRefs(authProfileStore)
const orderStore = useOrderStore()
const { singleOrder, getOrders } = orderStore
const { myOrder, uncollectedTicketSwitchChecked } = storeToRefs(orderStore)
const orderDetail = ref(null)
let ticketTimer
usePageTitle()

// 第一筆 ticket
const firstTicket = computed(() => orderDetail.value.ticketList[0])

// 開啟 ＱrCode
const openQrcode = async (ticket) => {
  // isOpenQrcode.value = true
  const baseUrl = window.location.origin
  const ticketUrl = baseUrl + '/member/ticketStatus'
  const ticketData = JSON.stringify(`${ticketUrl}?ticketId=${ticket._id}`)
  // eslint-disable-next-line no-console
  console.log('ticketData', ticketData)

  // 創建臨時的 canvas
  const canvas = document.createElement('canvas')

  try {
    await QRCode.toCanvas(canvas, ticketData, { width: 200 })
    const qrCodeDataUrl = canvas.toDataURL()

    Swal.fire({
      html: `
        <h2 class="text-h2 text-white mb-6">
          <img src="${logo}" alt="SportsPass LOGO" class="logo" />
          <p class="text-h4 text-white-50">QR Code</p>
        </h2>
        <img src="${qrCodeDataUrl}" alt="QR Code">
        <dl class="mt-6 row">
          <dt class="col-4 text-end">訂票序號</dt>
          <dd class="col-8 text-base text-start">${ticket._id}</dd>
          <dt class="col-4 text-end">場次名稱</dt>
          <dd class="col-8 text-base text-start">${ticket.sessionName}</dd>
          <dt class="col-4 text-end">時間</dt>
          <dd class="col-8 text-base text-start">${dayjs(ticket.sessionTime).format('YYYY.MM.DD HH:mm')}</dd>
          <dt class="col-4 text-end">地點</dt>
          <dd class="col-8 text-base text-start">${ticket.sessionPlace}</dd>
          <dt class="col-4 text-end">座位</dt>
          <dd class="col-8 text-base text-start">${ticket.seats}</dd>
        </dl>
        <hr/>
        <div class="col-10 m-auto">
          <p class="text-start text-s1 mb-0">注意事項</p>
          <p class="text-start text-s2 mt-1 mb-0">
            請以此QRcode電子驗票直接免紙票入場。<br>訂票紀錄已寄到您的電子信箱,現場請出示此票券給工作人員入場。<br>如您使用優待票券訂票,取票時請務必攜帶您優待證件。</p>
        </div>
      `,
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        popup: 'qrcode-popup'
      }
    }).then(() => {
      clearInterval(ticketTimer)
    })

    // 每 5 秒檢查一次 ticket 狀態
    ticketTimer = setInterval(async () => {
      try {
        const data = await singleOrder({ id: route.params.orderId })
        const tickets = await data.order.ticketId
        const updatedTicket = tickets.find((t) => t._id === ticket._id)

        if (updatedTicket && updatedTicket.status === 1) {
          Swal.close() // 關閉彈窗
          const orderData = await getOrders() // 重新渲染資料
          orderDetail.value = await orderData.find((order) => order._id === route.params.orderId)
          clearInterval(ticketTimer) // 停止計時器
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error ticket status:', error)
      }
    }, 5000)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error QR code:', error)
    Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '無法生成 QR Code，請稍後再試。'
    }).then(() => {
      clearInterval(ticketTimer)
    })
  }
}

watch(
  () => route.params.orderId,
  async (newOrderId) => {
    if (!myOrder.value.length && token.value) {
      await orderStore.getOrders()
    }

    orderDetail.value = myOrder.value.find((order) => order._id === newOrderId)

    if (!orderDetail.value) {
      setTimeout(() => {
        setSwalFire({
          stype: 'popup',
          icon: 'error',
          title: '系統錯誤',
          text: '找不到該筆票券'
        }).then(({ isDismissed }) => {
          if (isDismissed) {
            router.push('/member/myTicket')
          }
        })
      }, 0)
    } else {
      const { eventName, sessionName } = firstTicket.value
      useHead({
        title: `我的票券詳情 - ${eventName} - ${sessionName}｜會員專區`
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="orderDetail" class="d-grid gap-8">
    <ul class="list-unstyled mb-0 row align-items-start gx-2 gap-4">
      <li class="col-lg-auto order-lg-last d-flex align-items-center">
        <FilterUncollectedTicketSwitch class="d-lg-none" />
        <div class="d-flex align-items-center gap-3 ms-auto">
          <NuxtLink :to="`/member/myTicket`" role="button" class="btn check-btn text-btn1">
            <span>返回</span>
          </NuxtLink>
          <RefundModal :order-id="orderDetail._id" />
        </div>
      </li>
      <li class="col-lg d-flex align-items-stretch gap-4 gap-lg-5">
        <img :src="firstTicket.eventPic" class="object-fit img-size rounded-3" />
        <div class="d-flex flex-column order-title">
          <NuxtLink :to="`/events/${orderDetail._id}`">
            <h1 class="text-h4 mb-1 mb-lg-2">{{ firstTicket.eventName }}</h1>
          </NuxtLink>
          <ul class="list-unstyled mb-0 d-flex align-items-center gap-2">
            <li class="text-s1 text-gray5">
              {{ dayjs(firstTicket.sessionTime).format('YYYY.MM.DD HH:mm') }}
            </li>
            <li class="d-flex align-items-center gap-1 text-s2">
              <div class="icon icon-location icon-size-sm bg-gray5 text-truncate text-s2"></div>
              {{ firstTicket.sessionPlace }}
            </li>
          </ul>
          <ul
            class="list-unstyled mb-0 mt-auto d-flex flex-column flex-lg-row align-items-lg-center gap-1 gap-lg-5 text-s1 text-gray5"
          >
            <li class="row align-items-center gx-2">
              <span class="col-auto">訂單編號</span>
              <span class="col text-color-primary text-truncate">{{ orderDetail._id }}</span>
            </li>
            <li class="row align-items-center gx-2 text-s2">
              <span class="col-auto">票券數量</span>
              <span class="col text-color-primary">{{ orderDetail.ticketList.length }}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <ul class="list-unstyled mb-0 customize-table">
      <li class="customize-thead">
        <ul class="list-unstyled mb-0 row customize-tr">
          <li class="col">序號</li>
          <li class="col">場次名稱</li>
          <li class="col">品項</li>
          <li class="col">座位</li>
          <li class="col">票價</li>
          <li class="col">狀態</li>
          <li class="col">操作</li>
        </ul>
      </li>
      <li class="customize-tbody">
        <template v-for="ticket in orderDetail.ticketList" :key="ticket._id">
          <ul
            v-if="
              (uncollectedTicketSwitchChecked && ticket.status === 0) ||
              !uncollectedTicketSwitchChecked
            "
            class="list-unstyled mb-0 row align-items-stretch customize-tr"
          >
            <li class="col-6 col-xl customize-td text-break" data-th="序號">{{ ticket._id }}</li>
            <li class="col-6 col-xl customize-td" data-th="場次名稱">
              {{ firstTicket.sessionName }}
            </li>
            <li class="col-6 col-xl customize-td" data-th="品項">{{ ticket.ticketName }}</li>
            <li class="col-6 col-xl customize-td" data-th="座位">{{ ticket.seatNumber }}</li>
            <li class="col-6 col-xl customize-td border-0 pb-0 mb-0" data-th="票價">
              {{ handleFare(ticket.price) }}
            </li>
            <li class="col-6 col-xl customize-td border-0 pb-0 mb-0" data-th="狀態">
              {{ handleTicketStatus(ticket.status) }}
            </li>
            <li class="col-xl customize-td border-0 pt-4 pt-xl-0">
              <button
                type="button"
                class="btn qrcode-btn text-btn1"
                :class="{ disabled: ticket.status === 1 }"
                @click="openQrcode(ticket)"
              >
                <span>QRCode入場</span>
              </button>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.img-size {
  width: rem(100px);
  height: rem(100px);
}

.order-title {
  @include media-breakpoint-down(lg) {
    h1 {
      @include font(1, $text-weight-medium, $s1-font-size, 1.5, 2);
    }

    li {
      @include font(1, $text-weight-regular, $s2-font-size, 1.5, 1);
    }
  }
}
</style>
