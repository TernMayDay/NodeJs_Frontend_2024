<!-- layouts/admin.vue -->
<script setup>
import { useAuthProfileStore } from '~/stores/AuthProfile'

const authProfileStore = useAuthProfileStore()
const { profile } = storeToRefs(authProfileStore)

// 檢查用戶是否有權限訪問後台
const checkAdminAccess = () => {
  if (!profile.value || (profile.value.role !== '1' && profile.value.role !== '0')) {
    return navigateTo('/')
  }
}

onMounted(checkAdminAccess)
watch(profile, checkAdminAccess)

const preventClick = (event) => {
  event.preventDefault()
}
</script>

<template>
  <div v-if="checkAdminAccess" class="admin-layout">
    <CustomLoadingIndicator />
    <AdminHeader />
    <div class="admin-content">
      <aside class="admin-sidebar">
        <nav>
          <ul class="list-unstyled">
            <li>
              <NuxtLink to="/sponsor/admin/eventManagement" class="admin-nav-link">賽事管理</NuxtLink>
            </li>
            <li>
              <span class="admin-nav-link disabled" @click="preventClick">粉絲管理</span>
            </li>
            <li>
              <span class="admin-nav-link disabled" @click="preventClick">營收管理</span>
            </li>
            <li>
              <span class="admin-nav-link disabled" @click="preventClick">驗票功能</span>
            </li>
          </ul>
        </nav>
        <div class="mt-auto">
          <NuxtLink to="/" class="admin-nav-link return-link">
            <i class="icon-return"></i> 返回前台
          </NuxtLink>
        </div>
      </aside>
      <main class="admin-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #050505;
  color: #fff;
}

.admin-content {
  display: flex;
  flex-grow: 1;
  padding-top: $front-header-height;
}

.admin-sidebar {
  width: 250px;
  background-color: #1e1e1e;
  padding: 1rem;
  height: calc(100vh - $front-header-height);
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: $front-header-height;
  display: flex;
  flex-direction: column;
}

.admin-main {
  flex-grow: 1;
  padding: 3rem;
  margin-left: 250px; // 為側邊欄留出空間
  background-color: #282828; // Gary3
}

.admin-nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &.router-link-active {
    background-color: #373737;
    color: #00ffa3;
  }

  &.disabled {
    color: #848484;
    cursor: not-allowed;
    pointer-events: none;

    &:hover {
      background-color: transparent;
      color: #848484;
    }
  }
}

.return-link {
  margin-top: auto;
  border-top: 1px solid #373737;
  padding-top: 1rem;
}

// 使用 guidelines 中的字體樣式
.admin-nav-link,
.admin-main {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 1px;
}

.icon-return::before {
  content: '←';
  margin-right: 0.5rem;
}
</style>