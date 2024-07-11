<script setup>
const route = useRoute()
const ticketStore = useTicketStore()
const ticketId = computed(() => route.query.ticketId)
const message = ref('票券確認中...')

const checkTicketStatus = async () => {
  try {
    await ticketStore.checkTicket({ ticketId: ticketId.value, status: true })
    message.value = '票券兌換成功'
  } catch (error) {
    message.value = '票券兌換失敗，請稍後再試'
  }
}

onMounted(() => {
  checkTicketStatus()
})
</script>

<template>
  <div>{{ message }}</div>
</template>

<style scoped></style>
