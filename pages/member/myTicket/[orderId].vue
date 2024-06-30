<script setup>
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const { myOrder, uncollectedTicketSwitchChecked } = storeToRefs(orderStore)
const orderDetail = ref(null)
usePageTitle()

// 第一筆 ticket
const firstTicket = computed(() => orderDetail.value.ticketList[0])

watch(
  () => route.params.orderId,
  (newOrderId) => {
    orderDetail.value = myOrder.value.find((order) => order._id === newOrderId)

    if (!orderDetail.value) {
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
            <li class="col-6 col-xl customize-td" data-th="座位">K9</li>
            <li class="col-6 col-xl customize-td border-0 pb-0 mb-0" data-th="票價">
              {{ handleFare(ticket.price) }}
            </li>
            <li class="col-6 col-xl customize-td border-0 pb-0 mb-0" data-th="狀態">
              {{ handleTicketStatus(ticket.status) }}
            </li>
            <li class="col-xl customize-td border-0 pt-4 pt-xl-0">
              <button type="button" class="btn qrcode-btn text-btn1">
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
