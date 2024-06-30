<!-- 賽事介紹 -->
<script setup>
import DOMPurify from 'dompurify'
const props = defineProps({
  // 標籤
  intro: {
    type: String,
    required: true
  }
})

const cleanIntro = ref(props.intro)

onMounted(() => {
  cleanIntro.value = DOMPurify.sanitize(props.intro)
})
</script>

<template>
  <div class="event-intro" v-html="cleanIntro"></div>
</template>

<style lang="scss" scoped></style>
