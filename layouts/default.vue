<script setup>
import 'virtual:svg-icons-register'
const route = useRoute()

// 是否新增 Margin Top
const addMarginTop = computed(() => {
  return route.path !== '/'
})
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <CustomLoadingIndicator />
    <!-- <NuxtLoadingIndicator class="color-primary" :height="10" :throttle="0">
      <h2>Loading...</h2>
    </NuxtLoadingIndicator> -->

    <Header />
    <div class="flex-grow-1" :class="{ 'main-margin-top': addMarginTop }">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.main-margin-top {
  margin-top: rem($front-header-height-mobile);

  @include media-breakpoint-up(lg) {
    margin-top: rem($front-header-height);
  }
}
</style>
