<script setup>
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const agreementChecked = ref(false)
const isOpen = ref(false)
const orderCart = ref([])
const formHtml = ref('')

const optionList = JSON.parse(localStorage.getItem('filterSessions'))
const selectedOption = ref(route.params.id)

const eventData = ref({})
const sessionList = ref([])
const areaList = ref([])

const getData = async () => {
  try {
    const sessionId = route.params.id
    const paramsId = { id: sessionId }
    await sessionStore.fetchDetailSession(paramsId)
    const { sessionDetail } = storeToRefs(sessionStore)
    sessionList.value = sessionDetail.value.session
    areaList.value = sessionDetail.value.session.areaSetting
    eventData.value = sessionDetail.value.session.eventId
  } catch (error) {
    // api 壞去改用
    // eslint-disable-next-line no-console
    console.error('API error:', error)
    const { data } = await useFetch('/api/session')
    eventData.value = data.value.eventData.data.event
    sessionList.value = eventData.value.sessionList
    areaList.value = eventData.sessionList[1].areaSetting
  } finally {
    // 清空購物車
    cartStore.clearCart()
  }
}
// 取資料
onMounted(() => {
  getData()
})

const handlerSession = async (id) => {
  await router.push(`/session/${id}`)
  selectedOption.value = id
}

const isOptionDisabled = (item) => {
  return dayjs().isAfter(dayjs(item.sessionTime))
}

const openDialog = (area) => {
  isOpen.value = !isOpen.value
  orderCart.value = {
    ...area,
    areaTicketType: area.areaTicketType.map((ticket) => ({ ...ticket, count: 0 }))
  }
}
const removeSession = (index) => {
  cartStore.removeItem(index)
}

const payCart = async () => {
  if (!agreementChecked.value) {
    Swal.fire('請同意會員服務條款及其公告')
    return
  }

  const cart = cartStore.cartItems.map((item) => {
    return {
      areaColor: item.areaColor,
      areaName: item.areaName,
      ticketName: item.ticketName,
      ticketDiscount: item.ticketDiscount === 0 ? '原價' : `${item.ticketDiscount * 10}折`,
      ticketNumber: item.count,
      price: item.areaPrice
    }
  })
  const total = cartStore.totalAmount()
  const data = {
    eventId: eventData.value._id,
    sessionId: route.params.id,
    cart,
    total
  }

  try {
    const response = await orderStore.createdOrder(JSON.stringify(data))
    const time = dayjs().isAfter(dayjs(sessionList.value.sessionTime))
    const itemName = `${time}_${sessionList.value.sessionName}`

    const ecPayParams = {
      itemName,
      itemPrice: total,
      orderID: response.order._id
    }
    const ecPayRes = await orderStore.createdEcPay(ecPayParams)

    formHtml.value = ecPayRes

    nextTick(() => {
      const formElement = document.querySelector('.hidden.ec-pay form')
      if (formElement) {
        formElement.submit()
      }
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Order creation error:', error)
    Swal.fire('訂單建立失敗，請稍後再試')
  }
}
</script>

<template>
  <div class="container-lg session">
    <AddOrderDialog v-if="isOpen" :open="isOpen" :cart="orderCart" @update:open="isOpen = $event" />
    <section class="session-header d-flex">
      <div class="session-header__left">
        <div class="session-header__pic">
          <img :src="eventData.smallBanner" :alt="eventData.eventName" />
        </div>
      </div>
      <div class="session-header__right">
        <p class="session-header__title mt-1 text-h3">{{ eventData.eventName }}</p>
        <!-- 下拉選單 -->
        <div class="mt-auto">
          <label class="form-label text-s1 text-color-gary5" for="sessionTime">賽事日期</label>
          <select
            id="sessionTime"
            v-model="selectedOption"
            class="form-select"
            aria-label="Default select example"
            name="賽事日期"
            @change="handlerSession($event.target.value)"
          >
            <option
              v-for="item in optionList"
              :key="item._id"
              :value="item._id"
              :disabled="isOptionDisabled(item)"
            >
              {{ item.sessionTime }}&nbsp;&nbsp;&nbsp;{{ item.sessionName }}
            </option>
          </select>
        </div>
      </div>
    </section>
    <!-- 選取票券區域 -->
    <section class="session-content">
      <div class="session-content__box">
        <div class="venue-pic">
          <img :src="sessionList.areaVenuePic" />
        </div>
      </div>
      <div class="session-content__box area-content">
        <div class="area-content__text text-s1 text-gray5">請選擇票券區域</div>
        <ul>
          <li
            v-for="area in areaList"
            :key="area.areaName"
            class="area-content__list"
            @click.prevent="openDialog(area)"
          >
            <div class="text-s1 d-flex align-items-center">
              <i class="area-color me-2" :style="{ backgroundColor: area.areaColor }"></i>
              <span class="area-title">{{ area.areaName }}</span>
              <span class="area-price">{{ area.areaPrice }}</span>
            </div>
            <div class="area-seats-remaining text-s1">
              <span class="text-secondary">剩餘 {{ area.areaNumber }} 張</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- 購買資訊 -->
    <section v-if="cartStore.cartItems.length > 0" class="buy-intro">
      <div class="buy-intro__title">購買資訊</div>
      <div class="buy-intro__list">
        <table class="table table-borderless table-hover align-middle text-center buy-intro-table">
          <thead>
            <tr>
              <th scope="col">票券種類 / 價錢</th>
              <th scope="col">所選區域</th>
              <th scope="col">張數</th>
              <th scope="col">金額</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartStore.cartItems" :key="index">
              <td>{{ item.ticketName }} / NT$ {{ item.areaPrice }}</td>
              <td>
                <i class="area-color me-1" :style="{ backgroundColor: item.areaColor }"></i>
                {{ item.areaName }}
              </td>
              <td>{{ item.count }}</td>
              <td>{{ item.areaPrice * item.count }}</td>
              <td>
                <button
                  type="button"
                  class="btn delete-btn text-btn1"
                  @click="removeSession(index)"
                >
                  <span>刪除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="buy-intro__box d-flex">
        <div class="col-9 buy-intro__terms">
          <div class="form-check">
            <input
              id="flexCheckDefault"
              v-model="agreementChecked"
              class="form-check-input"
              type="checkbox"
            />
            <label class="form-check-label" for="flexCheckDefault">
              我已詳細閱讀且同意 會員服務條款
              及賽事資訊公告，並同意放棄契約審閱期，且授權貴公司於條款目的範圍內，進行本人之個人資料蒐集、處理及利用。
            </label>
          </div>
        </div>
        <div class="col-3 buy-intro__total text-right">
          <span>總金額 NT$</span> <span class="total-amount">{{ cartStore.totalAmount() }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn buy-intro-btn text-btn1" @click="payCart">
          <span>前往付款</span>
        </button>
      </div>
    </section>
    <div class="hidden ec-pay" v-html="formHtml"></div>
  </div>
</template>

<style lang="scss" scoped>
.session-header {
  margin: rem(24px) 0;
  @include media-breakpoint-up(lg) {
    margin: rem(48px) 0;
  }
  &__left {
    width: 136px;
    height: 136px;
  }

  &__pic {
    width: 136px;
    height: 136px;
    border-radius: 8px;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__right {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 136px;
    margin-left: rem(24px);
  }
}

.session-content {
  display: flex;
  flex-direction: column;
  background: $gray_1;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;

  @include media-breakpoint-up(lg) {
    padding: 40px 80px;
    margin-bottom: 48px;
    flex-direction: row;
    justify-content: space-between;
  }

  &__box {
    width: 100%;
    @include media-breakpoint-up(lg) {
      width: 48%;
    }
  }
}

.venue-pic {
  width: 100%;
  border-radius: 8px;
  border: 1px solid $gray_4;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.area-content {
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    border: 1px $gray_2 solid;
    align-items: center;
    margin-bottom: rem(12px);
    border-radius: 8px;
    background: $gray_2;
    padding: 0 12px;
    height: rem(48px);

    &:hover {
      background: $gray_4;
      border: 1px $gray_5 solid;
      cursor: pointer;
    }
  }
  &__text {
    margin: rem(12px) 0;
    @include media-breakpoint-up(lg) {
      margin: 0 0 rem(16px) 0;
    }
  }
  & .area-color {
    width: rem(24px);
    height: rem(24px);
    border-radius: 4px;
    display: inline-flex;
  }
}
.area-seats-remaining {
}

// 購買資訊
.buy-intro {
  margin-bottom: 24px;
  @include media-breakpoint-up(lg) {
    margin-bottom: 60px;
  }
  &__title {
    @include font(1, $text-weight-medium, $h4-font-size, 1.2, 2);
    margin-bottom: 24px;
  }
  &__box {
    margin-bottom: rem(16px);
    padding: 0 10px;
    @include media-breakpoint-up(lg) {
      padding: 0 20px;
      margin-bottom: rem(24px);
    }
  }
  &__terms {
  }
  &__total {
  }
}

/*  table 樣式 */
.buy-intro-table thead tr {
  // background: linear-gradient(45deg, $primary_0, $primary_1);
  // color: $gray_5;
  height: 45px;
  background-color: $gray_3;
  @include font(1, $text-weight-regular, $s1-font-size, 1.5, 1);
}

.table.buy-intro-table > :not(caption) > * > * {
  background-color: unset;
}

.table.buy-intro-table > :not(caption) > * > th {
  color: $gray_5;
  vertical-align: middle;
}
.table.buy-intro-table > :not(caption) > * > td {
  background: none;
  border-bottom: 1px solid $gray_4;
  height: 125px;
  color: white;
  padding: 10px;
}

.buy-intro-table {
  .area-color {
    width: rem(16px);
    height: rem(16px);
    border-radius: 4px;
    display: inline-flex;
  }
}

.total-amount {
  color: $primary_0;
  @include font(1, $text-weight-bold, $h3-font-size, 1.2, 2);
}
</style>
