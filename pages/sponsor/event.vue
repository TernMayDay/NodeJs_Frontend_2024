<script setup>
const router = useRouter()
const eventStore = useEventStore()
const { createdEvent } = eventStore
const formData = ref({
  eventSetting: {
    eventName: '',
    eventDate: [],
    eventPic: '',
    coverPic: '',
    smallBanner: '',
    categorysNameTC: '',
    tags: [],
    releaseDate: '',
    tagOptions: [] // 顯示 取得所有的 tags （不用送出去）
  },
  eventIntro: {
    editorData: ''
  },
  sessionSetting: []
})

const addEvent = async (newValue) => {
  const data = await createdEvent(newValue)
  return data
}

const onSubmit = async (value) => {
  if (!value) return

  const data = formData.value

  const filteredEventSetting = {
    eventName: data.eventSetting.eventName,
    eventDate: data.eventSetting.eventDate,
    eventPic: data.eventSetting.eventPic,
    coverPic: data.eventSetting.coverPic,
    smallBanner: data.eventSetting.smallBanner,
    categorysNameTC: data.eventSetting.categorysNameTC,
    tags: data.eventSetting.tags.map((tag) => tag.name),
    releaseDate: data.eventSetting.releaseDate,
    eventIntro: data.eventIntro.editorData
  }
  const filteredArea = data.sessionSetting.map((session) => {
    const newSession = {
      sessionTime: session.sessionTime,
      sessionName: session.sessionName,
      sessionPlace: session.sessionPlace,
      sessionSalesPeriod: session.sessionSalesPeriod,
      areaVenuePic: session.areaVenuePic,
      areaSetting: session.areaSetting.map((area) => ({
        areaColor: area.areaColor,
        areaName: area.areaName,
        areaNumber: Number(area.areaNumber),
        areaPrice: Number(area.areaPrice),
        areaTicketType: area.areaTicketType.map((ticket) => ({
          ticketName: ticket.ticketName,
          ticketDiscount: Number(ticket.ticketDiscount)
        }))
      }))
    }
    return newSession
  })

  const eventData = {
    eventSetting: filteredEventSetting,
    sessionSetting: filteredArea
  }

  // console.log('eventData', eventData)

  try {
    const res = await addEvent(JSON.stringify(eventData))
    if (res.status === 'success') {
      await router.push('/sponsor/admin/eventManagement')
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    await router.push('/sponsor/admin/eventManagement')
  }
}
</script>

<template>
  <div class="container add-event">
    <VeeForm @submit="onSubmit">
      <tabs :options="{ disableScrollBehavior: true, defaultTabHash: 'first-tab' }">
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
