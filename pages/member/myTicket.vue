<script setup>
const orderStore = useOrderStore()
onMounted(async () => {
  await orderStore.getOrders()
})
</script>

<template>
  <NuxtPage />
</template>

<style scoped></style>
