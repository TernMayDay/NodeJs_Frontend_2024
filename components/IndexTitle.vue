<script setup>
defineProps({
  en: {
    type: String,
    default: ''
  },
  tc: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <h5 class="mb-4 mb-md-5 text-center text-md-start">
    <span class="text-eng1 text-color-primary text-capitalize">{{ en }}</span
    ><span class="baseline px-2 fw-light text-color-primary">/</span
    ><span class="text-white text-btn1 baseline title-tc position-relative">{{ tc }}</span>
  </h5>
</template>

<style scoped lang="scss">
.title-tc {
  background: none;

  &::after {
    content: '';
    width: rem(6px);
    height: rem(6px);
    background: $primary_gradient;
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: rem(8px);
    border-radius: 50%;
  }
}
</style>
