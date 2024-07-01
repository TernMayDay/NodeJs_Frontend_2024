<script setup>
const orderStore = useOrderStore()
await orderStore.getOrders()
</script>

<template>
  <NuxtPage />
</template>

<style scoped></style>
