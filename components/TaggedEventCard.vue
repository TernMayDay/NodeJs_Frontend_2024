<script setup>
const props = defineProps({
  event: {
    type: Object,
    default: () => {}
  }
})

// 過濾標籤
const filterTagList = computed(() => {
  const { tagList } = props.event
  let newTagList = []
  if (tagList) {
    if (!Array.isArray(tagList)) {
      newTagList.push(tagList)
    } else {
      newTagList = [...tagList]
    }
  }
  
  return newTagList.filter(tag => !tag.isDeleted).slice(0, 3)
})
</script>

<template>
  <NuxtLink :to="`events/${event._id}`" class="card bg-transparent h-100">
    <div class="position-relative">
      <div class="event-img-mask">
        <img :src="event.eventPic" class="card-img-top object-fit" :alt="event.eventName" />
      </div>
      <ul class="list-unstyled mb-0 card-img-overlay p-3 d-flex flex-column">
        <li>
          <span class="badge badge-category rounded-pill text-s1">{{ event.categoryId?.nameTC }}</span>
        </li>
        <li class="mt-auto d-flex justify-content-between align-items-end gap-1">
          <div class="text-s2 text-truncate d-flex align-items-center">
            <span class="text-truncate">{{ event.eventPlace }}</span
            ><span v-if="handleEventDate(event.eventDate)" class="flex-shrink-0"
              >｜{{ handleEventDate(event.eventDate) }}</span
            >
          </div>
          <FavoriteBtn :event-id="event._id" />
        </li>
      </ul>
    </div>
    <div class="card-body px-0 pb-0 pt-3 pt-md-4 d-grid gap-1 gap-md-2">
      <ul class="list-unstyled mb-0 d-flex gap-3 text-s2 text-gray5 text-truncate">
        <li v-for="tag in filterTagList" :key="tag._id" class="text-truncate">
            #{{ tag.name }}
          </li>
      </ul>
      <h5 class="card-title text-h4 mb-0 text-truncate-row-2">{{ event.eventName }}</h5>
    </div>
    <div
      class="card-footer bg-transparent mt-2 mt-md-4 pt-2 pt-md-4 pb-0 px-0 d-flex justify-content-between align-items-center"
    >
      <ul class="list-unstyled mb-0 d-grid gap-1">
        <li class="text-btn1 text-color-primary">{{ handleEventPrice(event.price) }}</li>
        <li class="d-flex align-items-center gap-1 text-s2 text-white">
          <span>{{ handleSalesStatus(event) }}</span>
          <span v-if="event.ticketSales">{{ event.ticketSales }}</span>
        </li>
      </ul>
      <NuxtLink :to="`events/${event._id}`" role="button" class="btn check-btn text-btn1">
        <span>立即訂票</span>
      </NuxtLink>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.card {
  &:hover {
    .card-title {
      color: $secondary;
    }

    .check-btn {
      color: $gray_1;
      background: linear-gradient(45deg, $primary_0, $primary_1);
    }
  }

  // 賽事圖片遮罩
  .event-img-mask {
    width: 100%;
    height: rem(160px);

    @include media-breakpoint-up(md) {
      height: rem(240px);
    }

    &::before {
      content: '';
      background: $black_gradient_lightToDark;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
