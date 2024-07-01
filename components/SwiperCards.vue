<script setup>
const swiper = ref(null)
const hasPagination = ref(false)

defineProps({
  // 賽事資料
  events: {
    type: Array,
    default: () => []
  },
  // swiper 設定值
  swiperConfig: {
    type: Object,
    default: () => {}
  },
  // 顯示導航(Navigation)
  showNavigation: {
    type: Boolean,
    default: true
  }
})

onMounted(() => {
  // 有無 Pagination：取得到 .swiper-pagination-lock 標示，表示沒有 Pagination
  setTimeout(() => (hasPagination.value = !document.querySelector('.swiper-pagination-lock')), 1000)
})
</script>

<template>
  <div class="swiper-cards-container container-lg position-relative">
    <slot name="title"> </slot>
    <Swiper v-if="events.length" v-bind="swiperConfig" :class="{ showPagination: showNavigation }">
      <SwiperSlide
        v-for="(event, index) in events"
        :key="event._id"
        class="d-flex flex-column h-auto"
      >
        <slot name="eventCard" :event="event" :index="index" :swiper="swiper"></slot>
      </SwiperSlide>
      <SwiperControls v-model="swiper" />
    </Swiper>
    <!-- 上一頁 -->
    <div v-if="hasPagination && showNavigation && events.length" class="d-none d-md-block">
      <button
        type="button"
        class="btn arrow-btn arrow-btn--left text-btn1 position-absolute top-50 start-0 translate-middle"
        @click="swiper.slidePrev()"
      >
        <i class="icon-arrow"></i>
      </button>
      <!-- 下一頁 -->
      <button
        type="button"
        class="btn arrow-btn arrow-btn--right text-btn1 position-absolute top-50 end-0 translate-middle"
        @click="swiper.slideNext()"
      >
        <i class="icon-arrow"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$arrow-margin: 16px;
$arrow-margin-1920up: calc(($icon-arrow-size + 12px) * -1);
$focus-swiper-num: 12;
$focus-swiper-slide-col-width: calc(
  ((100% - ($swiper-card-space-between-desktop * ($focus-swiper-num - 1)))) / $focus-swiper-num
);
$focus-swiper-slide-active-width: calc(
  $focus-swiper-slide-col-width * 5 + $swiper-card-space-between-desktop * 4
);

:root {
  // swiper
  --swiper-pagination-bottom: 0;
}

// 焦點賽事
.focus-swiper {
  @include media-breakpoint-up(xl) {
    .swiper-slide {
      width: calc($focus-swiper-slide-col-width * 3.5 + $swiper-card-space-between-desktop * 2.5);
      transition: width 0.3s ease;

      &.swiper-slide-active {
        width: $focus-swiper-slide-active-width !important;
      }
    }
  }
}

// swiper
.swiper {
  // 有分頁
  &.showPagination {
    padding-bottom: rem(24px);

    @include media-breakpoint-up(md) {
      padding-bottom: rem(48px);
    }
  }
}

.swiper-pagination-bullets {
  bottom: 0;
}

.arrow-btn--left {
  margin-left: rem($arrow-margin);

  @media (min-width: 1920px) {
    margin-left: rem($arrow-margin-1920up);
  }
}

.arrow-btn--right {
  margin-right: rem($arrow-margin);

  @media (min-width: 1920px) {
    margin-right: rem($arrow-margin-1920up);
  }
}
</style>
