<script setup>
const route = useRoute()
const ticketStore = useTicketStore()
const loadingStore = useLoadingStore()
const { hide } = loadingStore

hide() // 關閉 loading
const ticketId = computed(() => route.query.ticketId)
const message = ref('票券確認中...')
const ticketStatus = ref(0)

const checkTicketStatus = async () => {
  try {
    await ticketStore.checkTicket({ ticketId: ticketId.value, status: true })
    ticketStatus.value = 1
    message.value = '票券兌換成功'
  } catch (error) {
    ticketStatus.value = 2
    message.value = '票券兌換失敗，請稍後再試'
  }
}

onMounted(() => {
  checkTicketStatus()
})
</script>

<template>
  <div class="container-lg ticket-status">
    <div class="ticket-status__content pt-3">
      <div v-if="ticketStatus === 0">
        <img src="/assets/images/look.gif" />
      </div>
      <div v-else-if="ticketStatus === 1" class="swal2-icon swal2-success">
        <div class="swal2-success-circular-line-left"></div>
        <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
        <div class="swal2-success-ring"></div>
        <div class="swal2-success-ring"></div>
        <div class="swal2-success-fix"></div>
        <div class="swal2-success-circular-line-right"></div>
      </div>
      <div v-else class="swal2-icon swal2-error d-flex">
        <span class="swal2-x-mark"
          ><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span
        ></span>
      </div>

      <div class="pt-3">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ticket-status {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
