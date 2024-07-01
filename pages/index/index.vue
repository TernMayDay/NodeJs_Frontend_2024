<script setup>
import { useAuthProfileStore } from '~/stores/AuthProfile'

const testStore = useAuthProfileStore()

// 測試獲取用戶認證狀態
console.log('User is Authenticated:', testStore.isAuthenticated)

// 測試獲取用戶ID
console.log('User ID:', testStore.userId)

// 測試獲取用戶資料
console.log('User Profile:', testStore.profile)

// 測試獲取用戶身份（role）
console.log('User Role:', testStore.role)

// 測試獲取用戶token
console.log('User Token:', testStore.token)

import { indexWhyUs, bxSwim, entypoBell, iconParkSolidTicket, mdiSale } from '~/data/imagePaths.js'
const swiperStore = useSwiperStore()
const otherStore = useOtherStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const eventStore = useEventStore()
const whyUsList = ref([])
const events = ref({
  latest: [],
  hot: [],
  upcoming: []
})
const activeNavTab = ref('latest')
const navTabs = ref([
  {
    value: 'latest',
    label: '最新'
  },
  {
    value: 'hot',
    label: '熱門'
  }
])

// eslint-disable-next-line no-console
console.error('focus 須限定為使用者本人之訂閱，焦點賽事部分欄位資料有誤')
await userStore.getUserProfile()
const fetchAllEvents = async () => {
  // eslint-disable-next-line no-console
  console.log(events.value)
  const apis = []
  const eventKeys = Object.keys(events.value)
  eventKeys.forEach((displayMode) => {
    // eslint-disable-next-line no-console
    console.error('api displayMode 無效', displayMode)
    apis.push(
      eventStore.getEvents({
        displayMode: 'list',
        pageSize: displayMode === 'upcoming' ? 9 : 4
      })
    )
  })

  const result = await Promise.all(apis)
  // eslint-disable-next-line no-console
  console.log(eventKeys, result)
  eventKeys.forEach((displayMode, index) => {
    events.value[displayMode] = result[index].events
  })
}
fetchAllEvents()

// 選擇我們的理由
whyUsList.value = await otherStore.getWhyUsList()

/* 熱門賽事項目 */
const hotCategories = computed(() => categoryStore.top9HotCategories.slice(0, 5))

// 關注焦點
const focusEvents = computed(() => {
  const data = userStore.userProfile.focusedEvents || []
  return data.sort((a, b) => (b.createdAt > a.createdAt ? -1 : 1)).slice(0, 9)
})

/**
 * 切換當前活動 nav tab
 * @param value { "latest" | "hot" } 選取中的 tab 值：latest 最新、hot 熱門
 */
const changActiveNavTab = (value) => {
  activeNavTab.value = value
}

/**
 * 取得選擇我們的理由 icon alt 文字
 * @param { icon: string, focusTitle: string, title: string, describe: string } item 單一選擇我們的理由內容
 * @returns icon alt 文字
 */
const getWhyUsIconAlt = ({ icon, focusTitle, title }) => {
  let text = '選擇我們的理由 - '
  switch (icon) {
    case 'bxSwim':
    case 'entypoBell':
      return (text += `${focusTitle}${title}`)
    default:
      return (text += `${title}${focusTitle}`)
  }
}

/**
 * Swiper 切换到指定 slide
 * @param { 'focus' | 'hotCategories' } theme 主題
 * @param { swiper } swiper 參數與函式
 * @param { swiper } index 觸發事件的 slide 索引值
 */
const slideTo = (theme, currentSwiper, index) => {
  const { activeIndex, params } = currentSwiper
  const { initialSlide } = params

  if (index !== initialSlide) {
    let toIndex
    if (theme === 'hotCategories') {
      toIndex = index >= initialSlide ? index - 1 : 2
    } else {
      toIndex = activeIndex >= index ? index + 1 : index
    }

    currentSwiper.slideTo(toIndex)
    currentSwiper.updateSlides()
  }
}
</script>
<template>
  <div>
    <!-- 關注焦點 -->
    <SwiperCards class="focus-swiper my-5 mt-md-11 mb-md-9" :events="focusEvents"
      :swiper-config="swiperStore.focusSwiperConfig">
      <template #title>
        <IndexTitle en="Focus" tc="關注焦點" />
      </template>
      <template #eventCard="{ event }">
        <TaggedEventCard :event="event" />
      </template>
    </SwiperCards>
    <!-- 最新 / 熱門 -->
    <div class="latest-hot-block bg-gray1 mx-xl-8 py-5 pt-md-9 pb-md-11">
      <nav class="nav justify-content-center nav-border-bottom text-h3 mb-5 mb-md-9">
        <button v-for="navTab in navTabs" :key="navTab.value" class="nav-link"
          :class="{ active: activeNavTab === navTab.value }" type="button" @click="changActiveNavTab(navTab.value)">
          {{ navTab.label }}
        </button>
      </nav>
      <SwiperCards v-if="activeNavTab === 'latest'" :events="events.latest"
        :swiper-config="swiperStore.latestOrHotSwiperConfig" :show-navigation="false">
        <template #eventCard="{ event }">
          <UntaggedEventCard :event="event" />
        </template>
      </SwiperCards>
      <SwiperCards v-else :events="events.hot" :swiper-config="swiperStore.latestOrHotSwiperConfig"
        :show-navigation="false">
        <template #eventCard="{ event }">
          <UntaggedEventCard :event="event" />
        </template>
      </SwiperCards>
    </div>
    <!-- 選擇我們的理由 -->
    <div class="container-lg">
      <div class="row gx-xl-10 gx-xxl-14 pb-5 py-lg-5 py-xl-0 justify-content-center">
        <div class="col-md-7 col-lg text-center">
          <img :src="indexWhyUs" alt="選擇我們的理由" class="object-fit why-us-img" />
        </div>
        <div class="col-lg-7 col-xxl-6 d-flex flex-column justify-content-center gap-8">
          <div class="d-grid gap-2 text-center text-lg-start">
            <span class="text-eng3 text-color-primary">Why Us</span>
            <h6 class="mb-0 text-h2">選擇我們的理由</h6>
          </div>
          <ul class="list-unstyled mb-0 row g-5 g-md-8">
            <li v-for="item in whyUsList" :key="item.title" class="col-md-6 d-flex align-items-start gap-3">
              <img v-if="item.icon === 'bxSwim'" class="why-us-icon" :src="bxSwim" :alt="getWhyUsIconAlt(item)" />
              <img v-if="item.icon === 'entypoBell'" class="why-us-icon" :src="entypoBell"
                :alt="getWhyUsIconAlt(item)" />
              <img v-if="item.icon === 'iconParkSolidTicket'" class="why-us-icon" :src="iconParkSolidTicket"
                :alt="getWhyUsIconAlt(item)" />
              <img v-if="item.icon === 'mdiSale'" class="why-us-icon" :src="mdiSale" :alt="getWhyUsIconAlt(item)" />
              <div class="d-grid gap-1 gap-md-3">
                <h5 class="mb-0 d-flex align-items-center text-h4 gap-1">
                  <span class="text-secondary" :class="{
                    'order-last': item.icon === 'iconParkSolidTicket' || item.icon === 'mdiSale'
                  }">{{ item.focusTitle }}</span>{{ item.title }}
                </h5>
                <p class="mb-0 text-s1 text-gray5">{{ item.describe }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 即將開賽 -->
    <div class="border-top mx-3 mx-md-0"></div>
    <SwiperCards class="my-5 my-md-9" :events="events.upcoming" :swiper-config="swiperStore.cardSwiperConfig">
      <template #title>
        <IndexTitle en="Coming Soon" tc="即將開賽" />
      </template>
      <template #eventCard="{ event }">
        <UntaggedEventCardSm :event="event" />
      </template>
    </SwiperCards>
    <!-- 熱門賽事項目 -->
    <div class="bg-gray1 py-5 py-md-11">
      <SwiperCards class="hot-categories-swiper my-5 mt-md-11 mb-md-9" :events="hotCategories"
        :swiper-config="swiperStore.hotCategoriesSwiperConfig" :show-navigation="false">
        <template #eventCard="{ event, index, swiper }">
          <NuxtLink :to="{
            path: '/events',
            query: {
              q: event.nameTC
            }
          }" class="card bg-transparent text-white" @mouseenter="slideTo('hotCategories', swiper, index)">
            <img :src="event.photo" class="card-img object-fit" :alt="`${event.nameTC}(${event.nameEN})`" />
            <div class="card-img-overlay d-grid gap-1 gap-md-2 p-4 p-md-5">
              <h5 class="card-title text-h3 mb-0">{{ event.nameTC }}</h5>
              <h6 class="text-eng3 mb-0">{{ index }}-{{ event.nameEN }}</h6>
            </div>
          </NuxtLink>
        </template>
      </SwiperCards>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 最新/熱門賽事區塊
.latest-hot-block {
  @include media-breakpoint-up(xl) {
    border-radius: rem(20px);
  }
}

// 選擇我們的理由 圖片
.why-us-img {
  @include media-breakpoint-down(xl) {
    width: rem(320px);
  }
}

// 選擇我們的理由 icon
.why-us-icon {
  width: rem(32px);
  height: rem(32px);

  @include media-breakpoint-up(md) {
    width: rem(40px);
    height: rem(40px);
  }
}
</style>
