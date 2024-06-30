<!-- 注意事項 -->
<script setup>
const { data } = await useFetch('/api/session')
const noteList = data.value.noteData
</script>
<template>
  <div>
    <ol>
      <ul style="list-style-type: decimal">
        <li v-for="(item, index) in noteList" :key="index">{{ item }}</li>
      </ul>
    </ol>
  </div>
</template>
<style lang="scss" scoped>
ol {
  padding: 0;
}
li {
  color: $gray_5;
}
</style>
