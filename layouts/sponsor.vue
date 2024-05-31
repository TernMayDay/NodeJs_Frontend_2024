<script lang="ts" setup>
import 'virtual:svg-icons-register'
</script>

<template>
  <div>
    <NuxtLoadingIndicator class="color-primary" :height="10" :throttle="0">
      <h2>Loading...</h2>
    </NuxtLoadingIndicator>
    <Header />
    <slot />
  </div>
</template>

<style scoped></style>
