<script setup>
const { data } = await useFetch(`${process.env.API_URL}/rooms`);
console.log(data);
</script>

<template>
  <div>Page: index</div>
  <NuxtLink to="/admin"> admin </NuxtLink>
  <NuxtLink to="/guidelines"> Guidelines </NuxtLink>
</template>

<style scoped></style>
