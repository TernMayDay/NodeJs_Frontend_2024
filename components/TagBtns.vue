<script setup>
const props = defineProps({
  // 標籤
  tags: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="d-flex flex-wrap align-items-center gap-2 gap-xl-3">
    <NuxtLink
      v-for="tag in props.tags"
      :key="tag._id"
      :to="{
        path: '/events',
        query: {
          q: tag.name
        }
      }"
      class="btn tag-btn text-s1"
      role="button"
    >
      <span>{{ tag.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>
