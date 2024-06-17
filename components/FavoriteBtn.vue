<script setup>
const userStore = useUserStore()
const { userProfile } = userStore

const props = defineProps({
  // 賽事 id
  eventId: {
    type: String,
    default: ''
  }
})

// 尋找 eventId 的索引值
const findIndex = computed(() => userProfile.favorites?.indexOf(props.eventId))

const changeFavorite = async () => {
  const favorites = userProfile.favorites
  // eslint-disable-next-line no-console
  console.log('收藏', favorites, findIndex.value)
  if (findIndex.value !== -1) {
    favorites.splice(findIndex.value, 1)
    // eslint-disable-next-line no-console
    console.log('移除收藏', favorites)
  } else {
    favorites.push(props.eventId)
    // eslint-disable-next-line no-console
    console.log('加入收藏', favorites)
  }

  const data = await userStore.editUserProfile(favorites)
  // eslint-disable-next-line no-console
  console.log(data)
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
