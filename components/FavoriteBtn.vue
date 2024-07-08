<script setup>
const userStore = useUserStore()
const authProfileStore = useAuthProfileStore()
const { profile } = storeToRefs(authProfileStore)

const props = defineProps({
  // 賽事 id
  eventId: {
    type: String,
    default: ''
  }
})

// 尋找 eventId 的索引值
const findIndex = computed(() => profile.value?.favorites?.indexOf(props.eventId))

const changeFavorite = async () => {
  const favorites = profile.value.favorites
  let title = ''
  if (findIndex.value !== -1) {
    favorites.splice(findIndex.value, 1)
    title = '移除收藏'
  } else {
    favorites.push(props.eventId)
    title = '加入收藏'
  }

  // eslint-disable-next-line no-console
  console.log('待調整 API 錯誤回應')
  const success = await userStore.editUserProfile({ favorites })
  let text = ''
  if (success) {
    title += '成功'
    text = `您已成功${title}`
  } else {
    title += '失敗'
    text = `您無法成功${title}，請重新操作`
  }

  if (text) {
    setSwalFire({
      stype: 'toast',
      icon: success ? 'success' : 'error',
      title,
      text
    })
  }
}
</script>

<template>
  <button
    type="button"
    class="btn live-btn"
    :class="{ active: findIndex !== -1 }"
    @click.stop.prevent="changeFavorite"
  >
    <i class="icon-like"></i>
  </button>
</template>

<style scoped></style>
