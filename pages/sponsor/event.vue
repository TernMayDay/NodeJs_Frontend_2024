<script setup>
const formData = ref({
  eventSetting: {
    eventName: '',
    eventDate: '',
    eventPic: '',
    category: '',
    coverPic: '',
    tag: '',
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
  // eslint-disable-next-line no-console
  console.log(!value, value)
  // eslint-disable-next-line no-console
  console.log('formData 1234', formData.value)
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

<style lang="scss" scope>
.add-event {
  background: $gray_2;
  padding: 12px 80px 40px 80px;
  border-radius: 8px;
  border: 1px solid #888;

  .tabs-component-tabs {
    display: inline-flex;
    list-style: none;
  }
  .tabs-component-tab {
    margin-right: 24px;
    height: 53px;

    & a {
      text-decoration: none;
      height: 100%;
      align-items: center;
      display: flex;
      color: $gray_5;
      @include font(1, $text-weight-medium, $s1-font-size, 1.5, 2);
    }

    & a:hover,
    a.is-active {
      color: white;
    }

    a:hover::after,
    &.is-active::after {
      content: '';
      display: flex;
      height: 2px;
      margin-top: -2px;
      background: linear-gradient(45deg, $primary_0, $primary_1);
      transition:
        width 0.3s ease,
        left 0.3s ease;
    }
  }
}
</style>
