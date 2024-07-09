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
  <div class="admin-layout">
    <Header />
    <div class="admin-content">
      <aside class="admin-sidebar">
        <nav>
          <ul class="list-unstyled">
            <li>
              <NuxtLink to="/admin/eventManagement" class="admin-nav-link">賽事管理</NuxtLink>
            </li>
            <li v-if="profile?.role === '1'">
              <NuxtLink to="/admin/fanManagement" class="admin-nav-link">粉絲管理</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/revenueManagement" class="admin-nav-link">營收管理</NuxtLink>
            </li>
            <li v-if="profile?.role === '1'">
              <NuxtLink to="/admin/checkTickets" class="admin-nav-link">驗票功能</NuxtLink>
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
}

.admin-content {
  display: flex;
  flex-grow: 1;
  padding-top: $front-header-height; // 確保內容不被 Header 覆蓋
}

.admin-sidebar {
  width: 250px;
  background-color: #f0f0f0;
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
}

.admin-nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover,
  &.router-link-active {
    background-color: #e0e0e0;
  }
}
</style>