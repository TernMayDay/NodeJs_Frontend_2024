<script lang="ts" setup>
import { useAuthStore } from '~/stores/AuthStore'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const props = defineProps({
  // 隱藏暱稱
  isHideNickname: {
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
      <div v-else class="icon user-bold"></div>
    </button>
    <span v-if="!props.isHideNickname" class="text-s2">{{ user.nickname }}</span>
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
