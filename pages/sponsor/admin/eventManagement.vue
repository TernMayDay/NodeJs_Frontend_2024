<!-- pages/admin/eventManagement.vue -->
<script setup>
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div class="event-management">
    <div class="action-bar">
      <NuxtLink to="/sponsor/event" class="btn btn-add-event">
        <i class="icon-add"></i>
        <span>新增賽事</span>
      </NuxtLink>
    </div>
    <!-- 這裡放置賽事管理的具體內容 -->
  </div>
</template>

<style scoped lang="scss">
.event-management {
  padding: 20px;
}

.action-bar {
  margin-bottom: 20px;
}

.btn-add-event {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(to right, #00ffa3, #00efff);
  color: #050505; // Gary1 for contrast
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition:
    opacity 0.3s,
    transform 0.3s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .icon-add {
    margin-right: 8px;
    font-size: 18px;
  }
}

.page-title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
}

/* 假設你有一個通用的 icon 類 */
.icon-add::before {
  content: '+'; // 或使用您的圖標系統
}
</style>
