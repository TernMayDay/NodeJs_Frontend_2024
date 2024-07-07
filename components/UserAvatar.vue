<script setup>
const authProfileStore = useAuthProfileStore()
const { profile } = storeToRefs(authProfileStore)

const props = defineProps({
  // 隱藏暱稱
  isHideNickname: {
    type: Boolean,
    default: true
  },
  // 隱藏等級
  isHideRole: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="d-flex gap-1 align-items-center">
    <button type="button" class="btn live-btn active p-0" :class="{ 'is-photo': profile.photo }">
      <img
        v-if="profile.photo"
        :src="profile.photo"
        :alt="profile.nickname"
        class="object-fit rounded-circle"
      />
      <div v-else class="icon icon-profile-bold"></div>
    </button>
    <ul class="list-unstyled g-grid gap-1 text-start">
      <li v-if="!props.isHideNickname" class="text-s2">{{ profile.nickname }}</li>
      <li v-if="!props.isHideRole && profile.role !== '2'" class="text-s2 text-gray5">
        {{ profile.role === '0' ? '平台管理者' : '主辦單位' }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
$profile-avatar-width: 2.25rem;

.live-btn {
  &::before {
    width: $profile-avatar-width;
    height: $profile-avatar-width;
  }

  // 有圖片
  &.is-photo {
    &::before {
      background: transparent;
    }

    img {
      width: $profile-avatar-width;
      height: $profile-avatar-width;
    }
  }
}
</style>
