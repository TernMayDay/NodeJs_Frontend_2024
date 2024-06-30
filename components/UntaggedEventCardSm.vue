<script setup>
/* import dayjs from 'dayjs' */

defineProps({
  event: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <NuxtLink :to="`events/${event._id}`" class="card h-100">
    <div class="card-body d-flex align-items-center gap-4">
      <img
        :src="event.eventPic"
        class="rounded rounded-3 event-img object-fit"
        :alt="event.eventName"
      />
      <ul class="list-unstyled gap-1 gap-md-2 mb-0 card-text flex-fill d-flex flex-column">
        <li class="d-grid gap-2 mb-auto">
          <h5 class="card-title mb-0 text-h4 text-truncate-row-2">{{ event.eventName }}</h5>
          <span class="text-s1 text-gray5">2024.03.14 ~ 03.17</span>
        </li>
        <!-- 若為 0 為免費 -->
        <li class="border-top mt-2 pt-2 mt-mb-3 pt-mb-3 text-btn1 text-color-primary">$450 起</li>
      </ul>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  background: $gray_3;

  &:hover {
    background: $card-hover-bg;

    // 卡片文字
    .card-text {
      color: $card-hover-text;

      span {
        color: $card-hover-text !important;
      }

      .icon {
        background: $card-hover-text !important;
      }
    }

    .border-top {
      border-color: $white !important;
    }

    .text-color-primary {
      -webkit-text-fill-color: $card-hover-text;
    }
  }

  .card-body {
    @include media-breakpoint-down(md) {
      padding: rem(12px);
    }
  }

  .event-img {
    width: rem(100px);
    height: rem(100px);

    @include media-breakpoint-up(md) {
      width: rem(120px);
      height: rem(120px);
    }
  }
}
</style>
