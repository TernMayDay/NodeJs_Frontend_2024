<script setup>
import "virtual:svg-icons-register";
</script>

<template>
  <NuxtLoadingIndicator class="color-primary" :height="10" :throttle="0">
    <h2>Loading...</h2>
  </NuxtLoadingIndicator>

  <div>
    <NuxtLoadingIndicator class="color-primary" :height="10" :throttle="0">
      <h2>Loading...</h2>
    </NuxtLoadingIndicator>

    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped></style>
