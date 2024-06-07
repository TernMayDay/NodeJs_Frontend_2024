<template>
  <div>
    evenetManagement
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';



export default defineComponent({
  setup() {
  }
});
definePageMeta({
  layout: 'template-base-layout',
  middleware: 'auth', // 指定使用auth middleware
});
</script>

<style scoped></style>
