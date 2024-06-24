<script setup>
const formData = ref({
  eventSetting: {
    eventName: '',
    eventDate: [],
    eventPic: '',
    categorysNameTC: '',
    coverPic: '',
    tags: [],
    tagOptions: [],
    smallBanner: '',
    releaseDate: ''
  },
  eventIntro: {
    editorData: ''
  },
  sessionSetting: []
})

const onSubmit = (value) => {
  if (!value) return

  // console.log(!value, value)

  // eslint-disable-next-line no-console
  console.log('formData =>', formData.value)
  // Default storage is in memory
}
</script>

<template>
  <div class="container add-event">
    <VeeForm @submit="onSubmit">
      <tabs :options="{ disableScrollBehavior: true, defaultTabHash: 'second-tab' }">
        <tab id="first-tab" name="賽事設定">
          <sponsorEventSetting v-model="formData.eventSetting" />
        </tab>
        <tab id="second-tab" name="賽事介紹">
          <sponsorEventIntro v-model="formData.eventIntro" />
        </tab>
        <tab name="場次設定">
          <sponsorSessionSetting v-model="formData.sessionSetting" />
        </tab>
      </tabs>

      <button
        type="submit"
        class="btn check-btn mt-4 d-block m-auto submit-btn"
        @click="onSubmit(value)"
      >
        <span>全部送出</span>
      </button>
    </VeeForm>
  </div>
</template>

<style lang="scss" scoped>
.add-event {
  background: $gray_2;
  padding: 12px 80px 40px 80px;
  border-radius: 8px;
  border: 1px solid #888;
}
</style>
