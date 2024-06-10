<script setup>
import 'virtual:svg-icons-register'
</script>

<template>
  <!-- <NuxtLoadingIndicator class="color-primary" :height="10" :throttle="0">
    <h2>Loading...</h2>
  </NuxtLoadingIndicator> -->

  <div class="d-flex flex-column min-vh-100">
    <NuxtLoadingIndicator class="color-primary" :height="10" :throttle="0">
      <h2>Loading...</h2>
    </NuxtLoadingIndicator>

    <Header />
    <div class="flex-grow-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss"></style>
