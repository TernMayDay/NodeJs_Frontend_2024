<!-- layouts/admin.vue -->
<script setup>
import { useAuthProfileStore } from '~/stores/AuthProfile'

const authProfileStore = useAuthProfileStore()
const { profile } = storeToRefs(authProfileStore)

// 檢查用戶是否有權限訪問後台
const checkAdminAccess = () => {
  if (!profile.value || (profile.value.role !== '1' && profile.value.role !== '0')) {
    // 如果用戶不是主辦方（role '1'）或平台方（role '0'），重定向到首頁
    return navigateTo('/')
  }
}

// 在組件掛載時檢查權限
onMounted(checkAdminAccess)

// 監聽 profile 變化，以便在用戶登出時重新檢查權限
watch(profile, checkAdminAccess)
</script>

<template>
  <div v-if="checkAdminAccess" class="admin-layout">
    <Header />
    <div class="admin-content">
      <aside class="admin-sidebar">
        <nav>
          <ul class="list-unstyled">
            <li>
              <NuxtLink to="/sponsor/admin/eventManagement" class="admin-nav-link"
                >賽事管理</NuxtLink
              >
            </li>
            <li v-if="profile?.role === '1'">
              <NuxtLink to="/sponsor/admin/fanManagement" class="admin-nav-link">粉絲管理</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sponsor/admin/revenueManagement" class="admin-nav-link"
                >營收管理</NuxtLink
              >
            </li>
            <li v-if="profile?.role === '1'">
              <NuxtLink to="/sponsor/admin/checkTickets" class="admin-nav-link">驗票功能</NuxtLink>
            </li>
            <li>
              <nuxt-link class="admin-nav-link" to="/sponsor/event">sponsorEvent</nuxt-link>
            </li>
          </ul>
        </nav>
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
  background-color: #050505; // Gary1
  color: #fff;
}

.admin-content {
  display: flex;
  flex-grow: 1;
  padding-top: $front-header-height; // 確保內容不被 Header 覆蓋
}

.admin-sidebar {
  width: 250px;
  background-color: #1e1e1e; // Gary2
  padding: 1rem;
  height: calc(100vh - $front-header-height); // 減去 Header 的高度
  overflow-y: auto; // 允許側邊欄滾動
  position: fixed; // 固定側邊欄
  left: 0;
  top: $front-header-height;
}

.admin-main {
  flex-grow: 1;
  padding: 1rem;
  margin-left: 250px; // 為側邊欄留出空間
  background-color: #282828; // Gary3
}

.admin-nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #fff;
  text-decoration: none;
  transition:
    background-color 0.3s,
    color 0.3s;
  border-radius: 4px;

  &:hover,
  &.router-link-active {
    background-color: #373737; // Gary4
    color: #00ffa3; // Primary color
  }
}

// 使用 guidelines 中的字體樣式
.admin-nav-link,
.admin-main {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 1px;
}

// 為主要按鈕添加樣式
.btn-primary {
  background: linear-gradient(to right, #00ffa3, #00efff);
  color: #050505; // Gary1
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}

// 為次要按鈕添加樣式
.btn-secondary {
  background-color: #fc6a00; // Secondary color
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}
</style>
