<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#999'
  }
})

const symbolId = computed(() => {
  return props.name.includes('/') ? `#${props.name}` : `#/${props.name}`
})
</script>
<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="props.color" />
  </svg>
</template>
