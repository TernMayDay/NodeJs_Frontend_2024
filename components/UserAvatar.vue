<script lang="ts" setup>
import { useAuthStore } from '~/stores/AuthStore'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

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
    <button type="button" class="btn live-btn active p-0" :class="{ 'is-photo': user.photo }">
      <img
        v-if="user.photo"
        :src="user.photo"
        :alt="user.nickname"
        class="object-fit rounded-circle"
      />
      <div v-else class="icon icon-user-bold"></div>
    </button>
    <ul class="list-unstyled g-grid gap-1 text-start">
      <li v-if="!props.isHideNickname" class="text-s2">{{ user.nickname }}</li>
      <li v-if="!props.isHideRole && user.role !== 2" class="text-s2 text-gray5">
        {{ user.role === 0 ? '平台管理者' : '主辦單位' }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
$user-avatar-width: 2.25rem;

.live-btn {
  &::before {
    width: $user-avatar-width;
    height: $user-avatar-width;
  }

  // 有圖片
  &.is-photo {
    &::before {
      background: transparent;
    }

    img {
      width: $user-avatar-width;
      height: $user-avatar-width;
    }
  }
}
</style>
