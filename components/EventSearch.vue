<script setup>
const { $bootstrap } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()
const categoryStore = useCategoryStore()
const { top9HotCategories } = storeToRefs(categoryStore)
const eventStore = useEventStore()
const searchDropdownRef = ref(null)
const searchDropdownToggleRef = ref(null)
const searchDropdown = ref(null)
const searchInputVal = ref('')
const events = ref([])
let navbarCollapse

defineProps({
  modelValue: Boolean,
  // 是否在 banner
  inBanner: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  navbarCollapse = useNavbarCollapse()
  searchDropdown.value = $bootstrap.dropdown(searchDropdownToggleRef.value)

  // 監聽 下拉選單以外的 click 事件
  document.addEventListener('click', (event) => {
    if (searchDropdownToggleRef.value && !searchDropdownToggleRef.value.contains(event.target)) {
      searchDropdown.value.hide()
    }
  })

  // 監聽下拉選單
  if (searchDropdownRef.value) {
    const currentDropdown = searchDropdownRef.value
    // 當這個物件可被看見時會觸發此事件 (完成 CSS 轉換後)
    currentDropdown.addEventListener('shown.bs.dropdown', function () {
      emitModelValue(true)
    })
    // 當這個下拉選單被隱藏後會觸發此事件 (完成 CSS 轉換後)
    currentDropdown.addEventListener('hidden.bs.dropdown', function () {
      emitModelValue(false)
    })
  }
})

/* 監聽 route 取得搜尋表單值 */
watch(
  () => route.fullPath,
  async () => {
    const { query, path } = route
    const { q } = query
    searchInputVal.value = q && path === '/events' ? q : ''

    if (searchInputVal.value) {
      const { events: reslt } = await eventStore.getEvents({
        q: searchInputVal.value,
        pageSize: 5
      })
      events.value = reslt
    }
  },
  { immediate: true }
)

/* 取得熱門標籤 */
const hotTags = computed(() => tagStore.top20Tags.slice(0, 5))

/* 熱門賽事項目 */
await categoryStore.getCategories('hot', 9)

/**
 * 發送資料至父層
 * @param { boolean } value 是否開啟搜尋下拉選單
 */
const emitModelValue = (value) => {
  emit('update:modelValue', value)

  if (!value) {
    navbarCollapse.value.hide()
  }
}

/* 監聽搜尋 Input 值 */
watch(searchInputVal, (newVal) => {
  if (route.path === '/events') {
    const routerData = {
      path: '/events'
    }

    if (newVal) {
      routerData.query = {
        q: newVal
      }
    }

    router.push(routerData)
  }
})
</script>

<template>
  <div ref="searchDropdownRef" class="dropdown">
    <div
      ref="searchDropdownToggleRef"
      class="input-container dropdown-toggle dropdown-toggle-hide-arrow"
      :class="{ 'input-container-in-banner': inBanner }"
    >
      <input
        id="searchInput"
        v-model.lazy.trim="searchInputVal"
        class="form-control form-control-sm shadow"
        type="search"
        placeholder="搜尋運動項目、賽事名稱"
        aria-label="Search"
        autocomplete="off"
        @focus="searchDropdown.show()"
      />
      <button
        id="searchInputBtn"
        type="button"
        class="btn text-btn1"
        :class="[inBanner ? 'search-btn' : 'btn-link']"
        @click="searchDropdown.show()"
      >
        <div id="searchInputIcon" class="icon icon-search"></div>
        <span v-if="inBanner">搜尋</span>
      </button>
    </div>
    <div
      class="dropdown-menu dropdown-menu-dark py-0 px-3 px-lg-4"
      :class="{ 'dropdown-menu-in-banner': inBanner }"
    >
      <!-- 有關鍵字 -->
      <template v-if="searchInputVal">
        <template v-if="events.length">
          <div class="list-group list-group-flush overflow-y-auto">
            <NuxtLink
              v-for="event in events"
              :key="event._id"
              class="list-group-item event-list-item d-flex align-items-center gap-2"
              :to="`/events/${event._id}`"
            >
              <img :src="event.eventPic" :alt="event.eventName" class="rounded rounded-1" />
              <div class="d-grid gap-1">
                <h6 class="text-btn2 mb-0 text-truncate">{{ event.eventName }}</h6>
                <h4 class="text-s2 mb-0 text-gray5 category-hover">{{ event.categoryId?.nameTC }}</h4>
              </div>
            </NuxtLink>
          </div>
          <button type="button" class="btn login-btn text-btn2 w-100 rounded-1 py-2 h-auto mb-4">
            <span>更多{{ searchInputVal }}賽事</span>
          </button>
        </template>
        <NoData v-else />
      </template>
      <ul v-else class="list-group list-group-flush">
        <!-- 無關鍵字 -->
        <li class="list-group-item d-grid gap-3 py-4">
          <h1 class="text-btn1 mb-0">熱門關鍵字</h1>
          <TagBtns :tags="hotTags" />
        </li>
        <li class="list-group-item d-grid gap-3 py-4">
          <h1 class="text-btn1 mb-0">熱門賽事項目</h1>
          <ul class="list-unstyled grid gap-3">
            <li v-for="category in top9HotCategories" :key="category._id" class="g-col-4">
              <NuxtLink
                role="button"
                class="btn category-btn justify-content-start"
                :to="{
                  path: '/events',
                  query: {
                    q: category.nameTC
                  }
                }"
                ><img :src="category.photo" :alt="`${category.nameTC}(${category.nameEN})`" />
                <span class="text-s2">{{ category.nameTC }}</span>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 搜尋 input 容器
.input-container {
  position: relative;

  &:not(.input-container-in-banner) {
    @include media-breakpoint-down(lg) {
      padding-inline: $front-navbar-dropdown-py;
    }
  }

  .form-control {
    padding-right: rem(36px);
    height: 40px;
    font-size: 0.875rem;

    @include media-breakpoint-up(lg) {
      width: 270px;
    }
  }

  // 右側按鈕
  button {
    display: flex;
    align-content: center;
    position: absolute;
    top: 50%;
    right: rem(20px);
    transform: translateY(-50%);

    @include media-breakpoint-up(lg) {
      right: $input-padding-x-sm;
    }
  }

  // 用於 banner 樣式
  &.input-container-in-banner {
    @include media-breakpoint-up(lg) {
      width: rem(416px);
    }

    .form-control {
      border-radius: rem(30px);
      width: 100%;
      padding: rem(4px) rem(calc(116px + 4px * 2)) rem(4px) rem(16px);
      height: rem(48px);
      font-size: rem(12px);
      font-weight: 400;

      @include media-breakpoint-up(lg) {
        padding: rem(8px) rem(calc(116px + 8px * 2)) rem(8px) rem(24px);
        height: rem(64px);
        font-size: 1rem;
      }
    }

    button {
      @include media-breakpoint-down(lg) {
        height: rem(40px);
      }

      .icon:hover {
        background: $white;
      }
    }
  }
}

// 搜尋下拉選單內容
.dropdown-menu {
  width: 100%;
  max-height: rem(309px);
  flex-direction: column;
  overflow: hidden;

  &:not(.dropdown-menu-in-banner) {
    @include media-breakpoint-down(lg) {
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }

  &.dropdown-menu-in-banner {
    @include media-breakpoint-down(lg) {
      margin-top: var(--bs-header-dropdown-spacer);
    }
  }

  @include media-breakpoint-up(lg) {
    width: rem(540px);
    margin-top: var(--bs-header-dropdown-spacer);
  }

  &.show {
    display: flex;
  }
}

// 賽事 列表 - 單一
.event-list-item {
  img {
    width: rem(40px);
    height: rem(40px);
  }

  &:hover {
    color: $secondary;

    .category-hover {
      color: $white !important;
    }
  }
}
</style>
