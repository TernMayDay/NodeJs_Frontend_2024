export const useSwiperStore = defineStore('swiperStore', () => {
  // 基本
  const basicSwiperConfig = {
    modules: [SwiperNavigation, SwiperPagination],
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    navigation: true,
    pagination: true,
    resistanceRatio: 0
  }

  // 卡片類
  const cardSwiperConfig = {
    ...basicSwiperConfig,
    slidesPerView: 1.25,
    slidesPerGroup: 1,
    initialSlide: 0,
    loop: true,
    centeredSlides: true,
    navigation: false,
    breakpoints: {
      // 當視窗寬度 >= 768px 時
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 24,
        centeredSlides: false,
        loop: false
      },
      // 當視窗寬度 >= 1200px 時
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 24,
        centeredSlides: false,
        loop: false
      }
    }
  }

  // 焦點賽事
  const focusSwiperConfig = {
    ...cardSwiperConfig,
    slidesPerView: 1.25,
    slidesPerGroup: 1,
    centeredSlides: true,
    initialSlide: 0,
    navigation: false,
    loop: true,
    breakpoints: {
      // 當視窗寬度 >= 768px 時
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 24,
        initialSlide: 0,
        centeredSlides: false
      },
      // 當視窗寬度 >= 1200px 時
      1200: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        initialSlide: 0,
        centeredSlides: false,
        loop: true
      }
    }
  }

  // 最新/熱門賽事
  const latestOrHotSwiperConfig = {
    ...cardSwiperConfig,
    pagination: false,
    slidesPerView: 1.5,
    breakpoints: {
      // 當視窗寬度 >= 768px 時
      768: {
        slidesPerView: 2.25
      },
      // 當視窗寬度 >= 992px 時
      992: {
        slidesPerView: 3.25
      },
      // 當視窗寬度 >= 1200px 時
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        initialSlide: 0,
        centeredSlides: false
      }
    }
  }

  // 熱門賽事項目
  const hotCategoriesSwiperConfig = {
    ...basicSwiperConfig,
    slidesPerView: 1.3,
    slidesPerGroup: 1,
    centeredSlides: true,
    initialSlide: 0,
    pagination: false,
    navigation: false,
    loop: false,
    breakpoints: {
      // 當視窗寬度 >= 992px 時
      992: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        initialSlide: 2
      }
    }
  }

  return {
    basicSwiperConfig,
    cardSwiperConfig,
    focusSwiperConfig,
    latestOrHotSwiperConfig,
    hotCategoriesSwiperConfig
  }
})
