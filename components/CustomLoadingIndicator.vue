// components/CustomLoadingIndicator.vue
<script setup>
const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)
</script>

<template>
  <div
    v-if="isLoading"
    class="loading-overlay"
    :class="isLoading ? 'loader-visible' : 'loader-hidden'"
  >
    <div class="loading-content">
      <img src="/assets/icons/Interwind.svg" alt="Loading" class="loading-icon" />
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading-overlay.loader-visible {
  visibility: visible;
  opacity: 1;
  scale: 1.5;
}

.loading-overlay.loader-hidden {
  visibility: hidden;
  opacity: 0;
  scale: 1;
}
.loading-content {
  text-align: center;
}
</style>
