<!-- 購票提醒 -->
<script setup>
const { data } = await useFetch('/api/session')
const ticketList = data.value.ticket
</script>
<template>
  <div>
    <ol>
      <ul style="list-style-type: decimal">
        <li v-for="(item, index) in ticketList.note" :key="index">{{ item }}</li>
      </ul>
    </ol>
    <ol>
      <p>【信用卡付款】</p>
      <ul>
        <li v-for="(item, index) in ticketList.creditCard" :key="index">{{ item }}</li>
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
