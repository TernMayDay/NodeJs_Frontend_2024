<script setup>
defineProps({
  event: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <NuxtLink :to="`events/${event._id}`" class="card h-100">
    <div class="card-body d-flex flex-column">
      <div class="position-relative event-img-block">
        <img :src="event.eventPic" class="rounded rounded-3 object-fit" :alt="event.eventName" />
        <ul class="list-unstyled mb-0 card-img-overlay p-2 d-flex flex-column">
          <li>
            <span class="badge badge-category rounded-pill text-s1">{{
              event.categoryId?.name
            }}</span>
          </li>
          <li class="mt-auto text-end">
            <FavoriteBtn :event-id="event._id" />
          </li>
        </ul>
      </div>
      <ul class="list-unstyled d-grid gap-2 mt-4 mb-3 card-text">
        <li class="d-flex align-items-center gap-1 text-s2">
          <div class="icon icon-location icon-size-sm bg-gray5 text-truncate"></div>
          台東縣立體育場
        </li>
        <li class="text-truncate-row-2">
          <h5 class="card-title mb-0 text-h4">{{ event.eventName }}</h5>
        </li>
        <li class="text-s1 text-gray5" v-if="handleEventDate(event.eventDate)">
        {{ handleEventDate(event.eventDate) }}
        </li>
      </ul>
      <ul
        class="list-unstyled mt-auto mb-0 bg-gray1 px-3 py-2 d-flex justify-content-between align-items-center"
      >
        <!-- 若為 0 為免費 -->
        <li class="text-btn1 text-color-primary">$450 起</li>
        <li class="d-flex align-items-center gap-1 text-s2 text-white">
          <span>已售出</span>
          <span>2345</span>
        </li>
      </ul>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  background: $gray_2;

  &:hover {
    background: $card-hover-bg;

    // 卡片文字
    .card-text {
      color: $card-hover-text;

      li {
        color: $card-hover-text !important;
      }

      .icon {
        background: $card-hover-text !important;
      }
    }
  }

  .card-body {
    @include media-breakpoint-down(md) {
      padding: rem(12px);
    }
  }

  .event-img-block {
    height: rem(180px);
  }
}
</style>
