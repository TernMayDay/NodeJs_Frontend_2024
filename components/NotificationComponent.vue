<script setup>
import dayjs from 'dayjs'

const router = useRouter()
const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
await notificationStore.getNotifications()

// 通知未讀數量
const notificationNotIsReadNum = computed(() => {
  const num = notifications.value.filter((notification) => !notifications.isRead).length
  return num >= 10 ? '9+' : num
})

/**
 * 所有/單筆 通知標示已讀
 * @param notification 通知
 */
function changeIsRead(notification) {
  if (notification?._id) {
    const { _id, url } = notification
    console.log('單筆 標示為已讀', _id, url)
    if (url) {
      router.push(`${url}/${_id}`)
    }
  } else {
    console.log('全部 標示為已讀')
  }
}
</script>

<template>
  <div class="dropdown">
    <button id="notificationNavbarDropdownLink" type="button"
      class="nav-link dropdown-toggle dropdown-toggle-hide-arrow d-flex p-2 p-lg-3"
      :class="{ disabled: !notifications.length }" data-bs-toggle="dropdown" data-bs-auto-close="true"
      aria-expanded="false">
      <div class="icon icon-bell"></div>
      <span v-if="notificationNotIsReadNum"
        class="notification-badge position-absolute top-0 start-100 translate-middle badge bg-secondary rounded-circle text-s2 d-flex justify-content-center align-items-center">{{
        notificationNotIsReadNum }}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end menu-dropdown-after-bg"
      aria-labelledby="notificationNavbarDropdownLink">
      <li class="d-flex align-items-center">
        <h1 class="text-btn1 mb-0">通知</h1>
        <div class="d-flex align-items-center gap-2 ms-auto">
          <button :disabled="!notificationNotIsReadNum" type="button" class="btn btn-link text-btn1"
            @click.stop="changeIsRead()">
            <span class="text-color-gray5">全部標示為已讀</span>
          </button>
          <NuxtLink to="/member/mySubscription">
            <div class="icon icon-setting-fill color-gary4"></div>
          </NuxtLink>
        </div>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li class="notifications-block">
        <div class="list-group list-group-flush gap-3">
          <button v-for="(notification, index) in notifications" :key="notification._id" type="button"
            class="list-group-item list-group-item-action d-flex align-items-start gap-2 border-0 py-0"
            @click="changeIsRead(notification)">
            <div class="dots flex-shrink-0" :class="{ 'opacity-0': !notification.isRead }"></div>
            <div class="gap-1" :class="{ 'border-bottom pb-3': index !== notifications.length - 1 }">
              <h1 class="text-btn2 mb-0 text-truncate-row-2">{{ notification.title }}</h1>
              <span class="text-s2 text-gray5">{{
                dayjs(notification.createdAt).format('YYYY.MM.DD HH:mm:ss')
                }}</span>
            </div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  @include media-breakpoint-down(lg) {
    transform: translateX(-100vw);
    left: rem(52px);
  }

  // 下拉選單 - 通知列表
  &[aria-labelledby='notificationNavbarDropdownLink'] {
    --bs-dropdown-min-width: 100vw;

    @include media-breakpoint-up(lg) {
      --bs-dropdown-min-width: 264px;
      --bs-dropdown-spacer: calc(var(--bs-header-dropdown-spacer) - 4px);
    }
  }

  // 通知區塊
  .notifications-block {
    max-height: 300px;
    overflow-y: auto;
  }
}

// 通知未讀標籤
.notification-badge {
  width: rem(18px);
  height: rem(18px);
  margin-top: rem(8px);
  margin-left: rem(-8px);
  -webkit-text-fill-color: $white;

  @include media-breakpoint-up(lg) {
    margin-top: rem(12px);
    margin-left: rem(-12px);
  }
}

// 通知用 圓點
.dots {
  margin-top: 0.5rem;
  width: rem(4px);
  height: rem(4px);
  border-radius: 50%;
  background: $primary_gradient;
}
</style>
