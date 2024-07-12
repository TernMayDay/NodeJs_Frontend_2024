<script setup>
import dayjs from 'dayjs'

const loadingStore = useLoadingStore()
const orderStore = useOrderStore()
const { myOrder } = storeToRefs(orderStore)

usePageTitle()
useHead({
  title: '我的票券｜會員專區'
})


onMounted(() => {
  loadingStore.hide() 
})


// 第一筆 ticket
const firstTicket = (ticketList) => {
  return ticketList[0]
}
</script>

<template>
  <div>
    <ul class="list-unstyled mb-0 customize-table">
      <li class="customize-thead">
        <ul class="list-unstyled mb-0 row customize-tr">
          <li class="col-xl-3">訂單編號</li>
          <li class="col">場次名稱</li>
          <li class="col">時間</li>
          <li class="col">地點</li>
          <li class="col">品項</li>
          <li class="col">金額</li>
          <li class="col">狀態</li>
          <li class="col">操作</li>
        </ul>
      </li>
      <li class="customize-tbody">
        <template v-if="myOrder.length">
          <ul
            v-for="order in myOrder"
            :key="order._id"
            class="list-unstyled mb-0 row align-items-stretch customize-tr"
          >
            <li class="col-xl-3 customize-td text-break" data-th="訂單編號">
              <div class="d-flex align-items-center gap-2">
                <img
                  :src="firstTicket(order.ticketList)?.eventPic"
                  class="object-fit img-size rounded-3"
                />{{ order._id }}
              </div>
            </li>
            <li class="col-6 col-xl customize-td" data-th="場次名稱">
              {{ firstTicket(order.ticketList)?.eventName }} -
              {{ firstTicket(order.ticketList)?.sessionName }}
            </li>
            <li class="col-6 col-xl customize-td" data-th="時間">
              {{ dayjs(firstTicket(order.ticketList)?.sessionTime).format('YYYY.MM.DD') }}
              {{ dayjs(firstTicket(order.ticketList)?.sessionTime).format('HH:mm:ss') }}
            </li>
            <li class="col-6 col-xl customize-td" data-th="地點">
              {{ firstTicket(order.ticketList)?.sessionPlace }}
            </li>
            <li class="col-6 col-xl customize-td" data-th="品項">
              <ul class="list-unstyled mb-0">
                <li
                  v-for="item in handleTicketNameIntegrate(order.ticketList)"
                  :key="item.ticketName"
                  class="d-flex align-items-center gap-1"
                >
                  <span>{{ item.ticketName }}</span
                  ><span>x</span><span>{{ item.total }}</span>
                </li>
              </ul>
            </li>
            <li class="col-6 col-xl customize-td border-0 pb-0 mb-0" data-th="金額">
              {{ handleFare(order.salesTotal) }}
            </li>
            <li class="col-6 col-xl customize-td border-0 pb-0 mb-0" data-th="狀態">
              {{ handleOrderStatus(order.status) }}
            </li>
            <li class="col-xl customize-td border-0 pt-4 pt-xl-0">
              <NuxtLink
                :to="`/member/myTicket/${order._id}`"
                role="button"
                class="btn qrcode-btn text-btn1"
              >
                <span>詳情</span>
              </NuxtLink>
            </li>
          </ul>
        </template>
        <div v-else class="py-5">
          <NoData />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.img-size {
  width: rem(70px);
  height: rem(70px);
}
</style>
