<script setup lang="ts">
const orderStore = useOrderStore()
const { uncollectedTicketSwitchChecked } = storeToRefs(orderStore)
</script>

<template>
  <div class="form-check form-switch mb-0">
    <input
      id="uncollectedTicketSwitchCheck"
      v-model="uncollectedTicketSwitchChecked"
      class="form-check-input"
      type="checkbox"
      role="switch"
    />
    <label class="form-check-label" for="uncollectedTicketSwitchCheck">僅顯示未取票</label>
  </div>
</template>

<style scoped></style>
