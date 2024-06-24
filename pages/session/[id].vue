<script setup>
const route = useRoute()
</script>

<template>
  <div class="container-lg session">
    <div>Page: [sessionId] {{ route.params.id }} 單一場次</div>
    <section class="session-header">header</section>
    <section class="session-content">
      <div class="venue-pic"></div>
      <div class="area-content"></div>
    </section>
    <section class="buy-intro">購買資訊</section>
  </div>
</template>

<style lang="scss" scoped></style>
