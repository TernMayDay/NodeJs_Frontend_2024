<script setup>
import { useAuthStore } from '~/stores/AuthStore'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const { user } = storeToRefs(authStore)
const { notifications } = storeToRefs(notificationStore)

await notificationStore.getNotifications()

/**
 * 所有/單筆 通知標示已讀
 * @param notification 通知
 */
function changeIsRead(notification) {
  if (notification?._id) {
    const { _id, url } = notification
    console.log('單筆 標示為已讀', _id, url)
    if (url) {
      router.push(url)
    }
  } else {
    console.log('全部 標示為已讀')
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark deco-bg-image">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        <img src="~images/logo.svg" alt="SportsPass LOGO" class="logo" />
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="collapse navbar-collapse">
        <EventSearch />
        <ul class="navbar-nav ms-auto gap-8 align-items-center">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/guidelines">guidelines</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/events">找賽事</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/member/myTicket">我的票券</NuxtLink>
          </li>
          <li class="nav-item dropdown">
            <a
              id="notificationNavbarDropdown"
              class="nav-link dropdown-toggle dropdown-toggle-hide-arrow d-flex"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <div class="icon icon-bell"></div>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="notificationNavbarDropdownLink"
            >
              <li class="d-flex align-items-center">
                <h1 class="text-btn1 mb-0">通知</h1>
                <div class="d-flex align-items-center gap-2 ms-auto">
                  <button type="button" class="btn btn-link text-btn1" @click="changeIsRead()">
                    <span class="text-color-gray5">全部標示為已讀</span>
                  </button>
                  <NuxtLink to="/member/mySubscription">
                    <div class="icon setting-fill color-gary4"></div>
                  </NuxtLink>
                </div>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="notifications-block">
                <div class="list-group list-group-flush gap-3">
                  <button
                    v-for="(notification, index) in notifications"
                    :key="notification._id"
                    type="button"
                    class="list-group-item list-group-item-action d-flex align-items-start gap-2 border-0 py-0"
                    @click="changeIsRead(notification)"
                  >
                    <div class="dots flex-shrink-0"></div>
                    <div
                      class="gap-1 pb-3"
                      :class="{ 'border-bottom': index !== notifications.length - 1 }"
                    >
                      <h1 class="text-btn2 mb-0">{{ notification.title }}</h1>
                      <span class="text-s2 text-gray5">{{ notification.createdAt }}</span>
                    </div>
                  </button>
                </div>
              </li>
            </ul>
          </li>
          <li v-if="!user" class="nav-item">
            <NuxtLink role="button" to="/login" class="btn login-btn text-btn1">
              <span>登入</span>
            </NuxtLink>
          </li>
          <li v-else class="nav-item dropdown">
            <a
              id="userNavbarDropdown"
              class="nav-link dropdown-toggle dropdown-toggle-hide-arrow"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <UserAvatar />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="userNavbarDropdownMenuLink"
            >
              <li>
                <UserAvatar :is-hide-nickname="false" />
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/member/editMyInfo">編輯我的資料</NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/member/myTicket">我的票券</NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/member/mySubscription">我的訂閱</NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/member/myFavorite">我的最愛</NuxtLink>
              </li>
              <li class="pt-2">
                <button
                  type="button"
                  class="btn login-btn text-btn1 w-100"
                  @click="authStore.logOut"
                >
                  <span>登出</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  height: $front-header-height-mobile;

  @include media-breakpoint-up(md) {
    padding-top: 76px;
    padding-bottom: 28px;
    height: $front-header-height;
  }

  // 波紋背景圖
  &.deco-bg-image {
    background: url('@/assets/images/deco.svg') no-repeat;
    background-position: center 0;
    background-size: 100% 16px;

    @include media-breakpoint-up(md) {
      background-size: 100% 60px;
    }
  }

  .logo {
    height: 40px;
  }

  .nav-link {
    padding-left: 0;
    padding-right: 0;
  }

  .dropdown-menu {
    --bs-dropdown-spacer: 1.5rem;

    // 下拉選單 - 會員相關連結
    &[aria-labelledby='userNavbarDropdownMenuLink'] {
      //--bs-dropdown-spacer: 1.5rem;
    }

    // 下拉選單 - 通知列表
    &[aria-labelledby='notificationNavbarDropdownLink'] {
      --bs-dropdown-min-width: 264px;
    }

    // 通知區塊
    .notifications-block {
      max-height: 300px;
      overflow-y: auto;
    }
  }

  // 通知用 圓點
  .dots {
    margin-top: 0.5rem;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: $primary_gradient;
  }
}
</style>
