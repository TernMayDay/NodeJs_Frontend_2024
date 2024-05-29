<script setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const navbarCollapseRef = ref(null)
let navbarCollapse
const isOpenSearchDropdown = ref(false)

onMounted(() => {
  useCreateNavbarCollapse(navbarCollapseRef)
  navbarCollapse = useNavbarCollapse()
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="deco-bg-image"></div>
    <div class="container-lg">
      <button class="navbar-toggler border-0 p-0" type="button" @click="navbarCollapse.toggle()">
        <span class="navbar-toggler-icon icon icon-menu bg-white"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/">
        <img src="~images/logo.svg" alt="SportsPass LOGO" class="logo" />
      </NuxtLink>
      <NotificationComponent class="d-lg-none" />
      <div ref="navbarCollapseRef" class="collapse navbar-collapse py-4 py-lg-0">
        <EventSearch v-model="isOpenSearchDropdown" />
        <ul
          class="navbar-nav ms-auto gap-2 gap-lg-8 align-items-center"
          :class="{ 'd-none-down-lg': isOpenSearchDropdown }"
        >
          <!-- 未登入 -->
          <li v-if="!user" class="nav-item order-last">
            <NuxtLink
              role="button"
              to="/login"
              class="btn login-btn text-btn1"
              @click="navbarCollapse.hide()"
            >
              <span>登入</span>
            </NuxtLink>
          </li>
          <!-- 已登入 -->
          <li v-else class="nav-item dropdown order-lg-last">
            <a
              id="userNavbarDropdown"
              class="nav-link dropdown-toggle dropdown-toggle-hide-arrow d-none d-lg-block"
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
                <UserAvatar :is-hide-nickname="false" :is-hide-role="false" />
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <NuxtLink
                  class="dropdown-item"
                  :to="`/${user.role === 2 ? 'member' : 'admin'}/editMyInfo`"
                  @click="navbarCollapse.hide()"
                  >編輯我的資料
                </NuxtLink>
              </li>
              <template v-if="user.role === 2">
                <li>
                  <NuxtLink
                    class="dropdown-item"
                    to="/member/myTicket"
                    @click="navbarCollapse.hide()"
                    >我的票券
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="dropdown-item"
                    to="/member/mySubscription"
                    @click="navbarCollapse.hide()"
                    >我的訂閱
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="dropdown-item"
                    to="/member/myFavorite"
                    @click="navbarCollapse.hide()"
                    >我的最愛
                  </NuxtLink>
                </li>
              </template>
              <template v-else>
                <li>
                  <NuxtLink
                    class="dropdown-item"
                    to="/admin/eventManagement"
                    @click="navbarCollapse.hide()"
                    >賽事管理
                  </NuxtLink>
                </li>
                <li v-if="user.role === 1">
                  <NuxtLink
                    class="dropdown-item"
                    to="/admin/fanManagement"
                    @click="navbarCollapse.hide()"
                    >粉絲管理
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="dropdown-item"
                    to="/admin/revenueManagement"
                    @click="navbarCollapse.hide()"
                    >營收管理
                  </NuxtLink>
                </li>
                <li v-if="user.role === 1">
                  <NuxtLink
                    class="dropdown-item"
                    to="/admin/checkTickets"
                    @click="navbarCollapse.hide()"
                    >驗票功能
                  </NuxtLink>
                </li>
              </template>
              <li class="pt-2 d-none d-lg-block">
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
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/guidelines" @click="navbarCollapse.hide()">
              guidelines</NuxtLink
            >
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/events" @click="navbarCollapse.hide()">找賽事</NuxtLink>
          </li>
          <li class="nav-item d-none d-lg-block">
            <NuxtLink
              class="nav-link"
              :to="user.role === 2 ? '/member/myTicket' : '/admin/eventManagement'"
              >{{ user.role === 2 ? '我的票券' : '後台管理' }}
            </NuxtLink>
          </li>
          <li v-if="user" class="nav-item d-lg-none">
            <button
              type="button"
              class="btn login-btn text-btn1 w-100"
              @click="navbarCollapse.hide(), authStore.logOut()"
            >
              <span>登出</span>
            </button>
          </li>
          <li class="nav-item d-none d-lg-block">
            <NotificationComponent />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  z-index: 1;
  background: $front-header-bg-mobile;
  height: $front-header-height-mobile;
  padding-top: rem(20px);
  padding-bottom: rem(4px);

  @include media-breakpoint-up(lg) {
    padding-top: rem(76px);
    padding-bottom: rem(28px);
    height: $front-header-height;
    background: $front-header-bg-gradient;
  }

  // 波紋背景圖
  .deco-bg-image {
    position: absolute;
    top: 0;
    background: url('@/assets/images/deco.svg') no-repeat;
    background-position: center bottom;
    background-size: cover;
    width: 100%;
    height: 16px;

    @include media-breakpoint-up(lg) {
      height: 60px;
    }
  }

  .navbar-toggler {
    &[aria-expanded='true'] {
      .navbar-toggler-icon {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z'/%3E%3C/svg%3E");
      }
    }

    .navbar-toggler-icon {
      width: rem(40px);
      height: rem(40px);
    }
  }

  .navbar-brand {
    @include media-breakpoint-down(lg) {
      --bs-navbar-brand-margin-end: 0;
    }
  }

  .logo {
    height: 24px;

    @include media-breakpoint-up(lg) {
      height: 40px;
    }
  }

  .nav-link {
    padding-left: 0;
    padding-right: 0;

    @include media-breakpoint-down(lg) {
      font-size: rem(14px);
      padding-top: rem(12px);
      padding-bottom: rem(12px);
    }
  }

  .dropdown-menu {
    --bs-dropdown-spacer: 0.25rem;

    @include media-breakpoint-up(lg) {
      --bs-dropdown-spacer: 1.5rem;
    }

    @include media-breakpoint-down(lg) {
      &[aria-labelledby='userNavbarDropdownMenuLink'] {
        text-align: center;
        padding-top: rem(8px);
        padding-bottom: rem(8px);
        margin-top: rem(8px);
        background-color: $gray_3;
        display: block;
        width: calc(100vw - $front-navbar-dropdown-py * 2);
      }
    }
  }

  .navbar-collapse {
    @include media-breakpoint-down(lg) {
      position: relative;
      margin-inline: -$front-navbar-dropdown-py;
      background-color: $dropdown-dark-bg;

      .dropdown-item {
        font-weight: 500;
        padding-top: rem(12px);
        padding-bottom: rem(12px);
      }
    }
  }

  .d-none-down-lg {
    @include media-breakpoint-down(lg) {
      display: none;
    }
  }
}
</style>
