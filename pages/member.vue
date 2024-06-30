<script setup>
// definePageMeta({
//   middleware: ['auth']
// })

const route = useRoute()
const userStore = useUserStore()
const { userProfile, getToken } = storeToRefs(userStore)

const navTabs = ref([
  {
    value: 'editMyInfo',
    label: '編輯我的資料'
  },
  {
    value: 'myTicket',
    label: '我的票券'
  },
  {
    value: 'mySubscription',
    label: '我的訂閱'
  },
  {
    value: 'myFavorite',
    label: '我的最愛'
  }
])

// eslint-disable-next-line no-console
console.error('有 middleware 後移除判斷，且主辦、平台方不能進入')
if (getToken.value) {
  await userStore.getUserProfile()
  // eslint-disable-next-line no-console
  console.log('userProfile', userProfile.value)
}

// 是否為票券詳細頁面
const isTicketDetailedPage = computed(() => {
  const { path, params } = route
  return path.includes('/member/myTicket') && params.orderId
})
</script>

<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-6 col-md-2">
          <UploadUserAvatar />
          <h6 class="text-h3 mb-0 text-truncate">{{ userProfile.nickname }}</h6>
        </div>
      </div>
      <ul class="list-unstyled mb-0 text-s1 row justify-content-center py-5 py-md-8">
        <li class="col col-lg-2">
          <span class="text-color-primary text-eng1 d-block">{{ userProfile.orders?.length }}</span
          >票券
        </li>
        <li class="col col-lg-2 border-start border-end">
          <span class="text-color-primary text-eng1 d-block">{{
            userProfile.subscribes?.length
          }}</span
          >訂閱中
        </li>
        <li class="col col-lg-2">
          <span class="text-color-primary text-eng1 d-block">
            {{ userProfile.favorites?.length }}</span
          >我的最愛
        </li>
      </ul>
    </div>
    <!-- 會員專區 nav -->
    <div class="bg-gray3">
      <div class="container">
        <nav
          class="nav nav-border-bottom justify-content-center justify-content-lg-start text-btn2 pt-4"
        >
          <NuxtLink
            v-for="navTab in navTabs"
            :key="navTab.value"
            class="nav-link"
            :class="{ active: isTicketDetailedPage && navTab.value === 'myTicket' }"
            aria-current="page"
            :to="`/member/${navTab.value}`"
            >{{ navTab.label }}</NuxtLink
          >
          <div v-if="isTicketDetailedPage" class="ms-auto d-none d-lg-block">
            <FilterUncollectedTicketSwitch />
          </div>
        </nav>
      </div>
    </div>
    <div class="bg-gray1">
      <div class="container py-5 pt-lg-9 pb-lg-11">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
nav.nav {
  @include media-breakpoint-down(md) {
    @include font(1, $text-weight-medium, $s1-font-size, 1.5, 2);
  }
}
</style>
