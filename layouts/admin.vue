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

// 防止 disabled 鏈接的點擊事件
const preventClick = (event) => {
  event.preventDefault()
}
</script>

<template>
  <div v-if="checkAdminAccess" class="admin-layout">
    <Header />
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
    background-color: #373737; // Gary4
    color: #00ffa3; // Primary color
  }

  &.disabled {
    color: #848484; // Gary5
    cursor: not-allowed;
    pointer-events: none;

    &:hover {
      background-color: transparent;
      color: #848484; // Gary5
    }
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

// 其他樣式保持不變...</style>