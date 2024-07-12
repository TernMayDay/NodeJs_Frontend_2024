<script setup>
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const router = useRouter()
const route = useRoute()
const eventStore = useEventStore()

const loadingStore = useLoadingStore()
const { hide, show } = loadingStore

const isSession = ref(false)

const sessionList = ref([])
const eventData = ref({})
const eventIntro = ref('')

show() // open loading

const saveSessionList = (list) => {
  // 篩選
  const filterSessions = list.map((session) => {
    return {
      sessionTime: formatDate(session.sessionTime),
      sessionName: session.sessionName,
      _id: session._id,
      eventId: session.eventId
    }
  })

  // 儲存到 localStorage 中
  localStorage.setItem('filterSessions', JSON.stringify(filterSessions))
}

const getData = async () => {
  show() // open loading
  try {
    const eventId = route.params.eventId
    const paramsId = { id: eventId }
    await eventStore.fetchDetailEvent(paramsId)
    const { eventDetail } = storeToRefs(eventStore)
    eventData.value = eventDetail.value.event
    sessionList.value = eventDetail.value.event.sessionList
    eventIntro.value = eventDetail.value.event.eventIntro
  } catch (error) {
    // api 壞去改用
    // eslint-disable-next-line no-console
    console.error('API error:', error)
    const { data } = await useFetch('/api/session')
    eventData.value = data.value.eventData.data.event
    sessionList.value = eventData.value.sessionList
    eventIntro.value = eventData.eventIntro
  } finally {
    saveSessionList(sessionList.value)
    hide() // 關閉 loading
  }
}

// 取資料
getData()

const formatDate = (dateValue) => {
  if (!dateValue || dateValue.length !== 2) {
    return `${format(new Date(dateValue), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })}`
  } else {
    const [start, end] = dateValue
    return `${format(new Date(start), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })} ~ ${format(new Date(end), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })}`
  }
}

/* 計算 現在時間 < 販賣區間
    1. 顯示販售區間的第一個
  計算 現在時間 >= 販賣區間
    2. 立即購票 剩餘 ? 張
     seatsTotal > bookTicket
     seatsTotal - bookTicket  (座位總數 - 訂票人數)
     isSoldOut = false        [是否皆已完成付款程序 (場次)(區域)]
    3. 立即購票 選購一空
     seatsTotal === bookTicket
     isSoldOut = false        [是否皆已完成付款程序 (場次)(區域)]
    4. 已售完
     seatsTotal === bookTicket
     isSoldOut = true        [是否皆已完成付款程序 (場次)(區域)]
*/

// 確認狀態
const checkStatus = (session) => {
  const now = new Date()
  const salesStart = new Date(session.sessionSalesPeriod[0])
  const salesEnd = new Date(session.sessionSalesPeriod[1])

  if (now < salesStart) {
    return {
      status: 'pre-sale',
      message: `${formatDate(session.sessionSalesPeriod[0])} 開賣`
    }
  } else if (now >= salesStart && now <= salesEnd) {
    const seatsRemaining = session.seatsTotal - session.bookTicket
    if (seatsRemaining > 0 && !session.isSoldOut) {
      return {
        status: 'on-sale',
        message: `立即購票 (剩餘 ${seatsRemaining} 張)`
      }
    } else if (seatsRemaining === 0 && !session.isSoldOut) {
      return {
        status: 'sold-out',
        message: '選購一空'
      }
    } else {
      return {
        status: 'completely-sold-out',
        message: '已售完'
      }
    }
  } else {
    return {
      status: 'post-sale',
      message: '銷售已結束'
    }
  }
}

// 剩餘
const getRemainingSeats = (session) => {
  return session.seatsTotal - session.bookTicket
}

const getStatusMessage = (session) => {
  return checkStatus(session).message
}

const handlerSession = async (id) => {
  await router.push(`/session/${id}`)
}
</script>

<template>
  <div class="event">
    <section class="cover-pic">
      <div class="cover-pic__content">
        <h2 class="cover-pic__title">{{ eventData.eventName }}</h2>
        <button type="button" class="btn check-btn text-btn1" @click="isSession = !isSession">
          <span>立即訂票</span>
        </button>
      </div>
      <img :src="eventData.coverPic" :alt="eventData.eventName" />
    </section>
    <section class="container-lg favorite text-right">
      <FavoriteBtn :event-id="eventData._id" /><span class="ms-2">我的最愛</span>
    </section>

    <div class="container-lg">
      <section class="session-content">
        <transition name="slide-fade">
          <div v-show="isSession" class="session-list">
            <table
              class="table table-borderless table-hover align-middle text-center session-table"
            >
              <thead>
                <tr>
                  <th scope="col">場次時間</th>
                  <th scope="col">場次名稱</th>
                  <th scope="col">地點</th>
                  <th scope="col">購票狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in sessionList" :key="item._id">
                  <td>
                    <div class="session-list__time">{{ formatDate(item.sessionTime) }}</div>
                  </td>
                  <td>
                    <div class="session-list__name">{{ item.sessionName }}</div>
                  </td>
                  <td>
                    <div class="session-list__location">{{ item.sessionPlace }}</div>
                  </td>
                  <td>
                    <div class="session-list__sales">
                      <div
                        v-if="checkStatus(item).status === 'on-sale'"
                        class="session-list__sales--on-sale"
                      >
                        <button
                          type="button"
                          class="btn check-btn mb-1 text-btn1"
                          @click="handlerSession(item._id)"
                        >
                          <span>立即訂票</span>
                        </button>
                        <p class="text-s1">剩餘 {{ getRemainingSeats(item) }} 張</p>
                      </div>
                      <div
                        v-else-if="checkStatus(item).status === 'sold-out'"
                        class="session-list__sales--sold-out"
                      >
                        <button type="button" class="btn check-btn mb-1 text-btn1" disabled>
                          <span>立即訂票</span>
                        </button>
                        <p class="text-s1">選購一空</p>
                      </div>
                      <div
                        v-else-if="checkStatus(item).status === 'completely-sold-out'"
                        class="session-list__sales--completely-sold-out"
                      >
                        <p>已售完</p>
                      </div>
                      <div v-else class="session-list__sales--other">
                        <p>{{ getStatusMessage(item) }}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </transition>
        <p class="session-text">欲購票者，請先<NuxtLink to="/">加入會員</NuxtLink>方可開始購票。</p>
      </section>

      <section class="session-detail">
        <tabs :options="{ disableScrollBehavior: true, defaultTabHash: 'first-tab' }">
          <tab id="first-tab" name="賽事介紹">
            <sessionDetailIntro :intro="eventIntro" />
            <!-- 取得這個賽事的專屬標籤 -->
            <div class="d-flex flex-wrap align-items-center gap-2 gap-lg-3 pt-4">
              <NuxtLink
                v-for="tag in eventData.tagList"
                :key="tag._id"
                class="btn tag-btn text-s1"
                role="button"
              >
                <span>{{ tag.name }}</span>
              </NuxtLink>
            </div>
          </tab>
          <tab id="second-tab" name="注意事項">
            <sessionDetailNote />
          </tab>
          <tab id="three-tab" name="購票提醒">
            <sessionDetailTicket />
          </tab>
          <tab id="four-tab" name="退票說明">
            <sessionDetailUnTicket />
          </tab>
        </tabs>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover-pic {
  display: flex;
  width: 100%;
  height: 190px;
  overflow: hidden;

  @include media-breakpoint-up(lg) {
    height: 540px;
    margin-top: -144px;
  }

  &__content {
    position: absolute;
    margin-top: 65px;
    width: 100%;
    text-align: center;
    @include media-breakpoint-up(lg) {
      margin-top: 265px;
    }
  }
  &__title {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    margin-bottom: 12px;
    @include font(1, $text-weight-medium, $h4-font-size, 1.2, 2);

    @include media-breakpoint-up(lg) {
      margin-bottom: 24px;
      @include font(1, $text-weight-bold, $h2-font-size, 1.2, 4);
    }
  }
}

.cover-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.favorite {
  margin: 12px 0;
  text-align: right;
  @include font(1, $text-weight-regular, $s2-font-size, 1.5, 1);
  @include media-breakpoint-up(lg) {
    @include font(1, $text-weight-medium, $s1-font-size, 1.5, 2);
    margin: -65px auto 0 auto;
  }
}

.session-content {
  margin-top: 12px;
  margin-bottom: 24px;

  @include media-breakpoint-up(lg) {
    margin-top: 60px;
    margin-bottom: 47px;
  }
}

.session-list {
  &__sales--on-sale,
  &__sales--sold-out {
    p {
      color: $secondary;
    }
  }

  &__sales--completely-sold-out {
    p {
      color: $gray_5;
    }
  }

  &__sales--other {
    & p {
      background: linear-gradient(45deg, $primary_0, $primary_1);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  & p {
    margin-bottom: 0;
  }
}

.session-detail {
  border-radius: 20px;
  background: $gray_1;
  padding: 24px 24px 24px 24px;
  margin-bottom: rem(24px);
  @include media-breakpoint-up(lg) {
    padding: 24px 110px 48px 110px;
    margin-bottom: rem(60px);
  }
}

/* 滑動動畫 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 500px;
  opacity: 1;
}

/*  table 樣式 */
.session-table thead tr {
  background: linear-gradient(45deg, $primary_0, $primary_1);
  @include font(1, $text-weight-regular, $s1-font-size, 1.5, 1);
}

.table.session-table > :not(caption) > * > * {
  background-color: unset;
}

.table.session-table > :not(caption) > * > th {
  color: $gray_1;
}
.table.session-table > :not(caption) > * > td {
  background: none;
  border-bottom: 1px solid $gray_4;
  height: 125px;
  color: white;
  padding: 10px;
}

// 圓角
.session-table thead th:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.session-table thead th:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

// 提示 會員登入
.session-text {
  @include font(1, $text-weight-regular, $s2-font-size, 1.5, 1);
  background: $gray_3;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  height: rem(26px);
  line-height: rem(26px);

  & a {
    background: linear-gradient(45deg, $primary_0, $primary_1);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @include media-breakpoint-up(lg) {
    @include font(1, $text-weight-regular, $s1-font-size, 1.5, 1);
    height: rem(37px);
    line-height: rem(37px);
  }
}
</style>
