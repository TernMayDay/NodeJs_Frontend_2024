<script setup>
import { logo } from '~/data/imagePaths.js'
import { useAuthProfileStore } from '~/stores/AuthProfile'

const authProfileStore = useAuthProfileStore()
const { profile } = storeToRefs(authProfileStore)
</script>

<template>
  <nav class="navbar navbar-dark fixed-top admin-navbar">
    <div class="container-fluid px-4">
      <NuxtLink class="navbar-brand" to="/">
        <img :src="logo" alt="SportsPass LOGO" class="logo" />
      </NuxtLink>
      <div class="d-flex align-items-center">
        <NuxtLink to="/sponsor/event" class="btn btn-add-event me-3">
          <i class="icon-add"></i>
          <span>新增賽事</span>
        </NuxtLink>
        <NotificationComponent class="me-3" />
        <div class="dropdown">
          <a id="userNavbarDropdown" class="nav-link dropdown-toggle dropdown-toggle-hide-arrow py-0" href="#"
            role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <UserAvatar />
          </a>
          <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="userNavbarDropdownMenuLink">
            <li>
              <UserAvatar :is-hide-nickname="false" :is-hide-role="false" />
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <span class="dropdown-item disabled">編輯我的資料</span>
            </li>
            <li>
              <NuxtLink class="dropdown-item" to="/sponsor/admin/eventManagement">
                賽事管理
              </NuxtLink>
            </li>
            <li>
              <span class="dropdown-item disabled">粉絲管理</span>
            </li>
            <li>
              <span class="dropdown-item disabled">營收管理</span>
            </li>
            <li>
              <span class="dropdown-item disabled">驗票功能</span>
            </li>
            <li class="pt-2">
              <button type="button" class="btn login-btn text-btn1 w-100" @click="authProfileStore.clearUserData">
                <span>登出</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.admin-navbar {
  background-color: #1e1e1e;
  height: $front-header-height;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.logo {
  height: 30px;
}

.btn-add-event {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(to right, #00ffa3, #00efff);
  color: #050505;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  .icon-add {
    margin-right: 0.5rem;
  }
}

.dropdown-menu {
  --bs-dropdown-spacer: 0.25rem;

  @include media-breakpoint-up(lg) {
    --bs-dropdown-spacer: var(--bs-header-dropdown-spacer);
  }
}

.login-btn {
  background: linear-gradient(to right, #00ffa3, #00efff);
  color: #050505;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}

.dropdown-item {
  &.disabled {
    color: $gray_5;
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }
}
</style>