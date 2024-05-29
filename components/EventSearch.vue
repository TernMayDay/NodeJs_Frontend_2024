<script setup>
const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()
const categoryStore = useCategoryStore()
const eventStore = useEventStore()
const hotCategorys = ref([])
const searchInputVal = ref('')
const events = ref([])
let navbarCollapse

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  navbarCollapse = useNavbarCollapse()
})

/* 監聽 route 取得搜尋表單值 */
watch(
  () => route.fullPath,
  async (newFullPath) => {
    const { query, path } = route
    const { q } = query
    searchInputVal.value = q && path === '/events' ? q : ''

    if (searchInputVal.value) {
      events.value = await eventStore.getEvents('all', searchInputVal.value, 5)
    }
  },
  { immediate: true }
)

/* 取得熱門標籤 */
const hotTags = computed(() => tagStore.top20Tags.slice(0, 5))

/* 熱門賽事項目 */
hotCategorys.value = await categoryStore.getCategorys('hot', 9)

/* 監聽 click 事件 */
onMounted(() => {
  document.body.addEventListener('click', checkSelectedDom)
})

onUnmounted(() => {
  document.body.removeEventListener('click', checkSelectedDom)
})

/**
 * 確認當前選取的 dom
 * @param event dom
 */
const checkSelectedDom = (event) => {
  openSearchDropdown(event.target?.id.includes('searchInput'))
}

/**
 * 開啟搜尋下拉選單
 * @param { boolean } isOpen 是否開啟搜尋下拉選單
 */
const openSearchDropdown = (isOpen) => {
  emit('update:modelValue', isOpen)

  if (!isOpen) {
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
  <div class="dropdown">
    <div class="input-container">
      <input
        id="searchInput"
        v-model.lazy.trim="searchInputVal"
        class="form-control"
        type="search"
        placeholder="搜尋運動項目、賽事名稱"
        aria-label="Search"
        autocomplete="off"
        @focus="openSearchDropdown(true)"
      />
      <button id="searchInputBtn" type="button" class="btn btn-link text-btn1">
        <div id="searchInputIcon" class="icon icon-search"></div>
      </button>
    </div>
    <div
      class="dropdown-menu dropdown-menu-dark py-0 px-3 px-xl-0"
      :class="{ show: props.modelValue }"
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
                <h6 class="text-btn2 mb-0">{{ event.eventName }}</h6>
                <h4 class="text-s2 mb-0 text-gray5 category-hover">{{ event.categorysNameTC }}</h4>
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
            <li v-for="category in hotCategorys" :key="category._id" class="g-col-4">
              <NuxtLink
                role="button"
                class="btn category-btn"
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

  @include media-breakpoint-down(xl) {
    padding-inline: $front-navbar-dropdown-py;
  }

  .form-control {
    padding-right: rem(36px);
    height: 40px;
    font-size: 0.875rem;

    @include media-breakpoint-up(xl) {
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

    @include media-breakpoint-up(xl) {
      right: $input-padding-x;
    }
  }
}

// 搜尋下拉選單內容
.dropdown-menu {
  width: 100%;
  max-height: rem(309px);
  margin-top: var(--bs-header-dropdown-spacer);
  flex-direction: column;
  overflow: hidden;

  @include media-breakpoint-down(xl) {
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  @include media-breakpoint-up(xl) {
    width: rem(540px);
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
