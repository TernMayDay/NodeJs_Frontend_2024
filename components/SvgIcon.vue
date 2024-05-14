<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#999'
  },
  size: {
    validator(value) {
      return ['lg'].includes(value)
    },
    default: ''
  }
})

const symbolId = computed(() => {
  return props.name.includes('/') ? `#${props.name}` : `#/${props.name}`
})
</script>
<template>
  <svg aria-hidden="true" :class="{ 'icon-size-lg': props.size === 'lg' }">
    <use :href="symbolId" :fill="props.color" />
  </svg>
</template>

<style scoped lang="scss">
svg {
  width: 24px;
  height: 24px;

  &.icon-size-lg {
    width: 32px;
    height: 32px;
  }
}
</style>
