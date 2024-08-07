<script setup>
const categoryStore = useCategoryStore()
await categoryStore.getCategoriesAll()
const { categoriesAll } = storeToRefs(categoryStore)
const loadingStore = useLoadingStore()
const { hide, show } = loadingStore

const route = useRoute()
const router = useRouter()

// console.log('params =>', route, route.path)
const eventStore = useEventStore()
const eventList = ref([])
const activeMode = ref('all')
const activeCategory = ref({ nameTC: '全部' })

const navTabs = ref([
  {
    value: 'all',
    label: '全部'
  },
  {
    value: 'latestSell',
    label: '最新開賣'
  },
  {
    value: 'recent',
    label: '近期賽事'
  }
])

show() // open loading

const handlerDisplayMode = async ({ mode, query }) => {
  show() // open loading
  activeMode.value = mode
  const nameTC = activeCategory.value.nameTC
  try {
    const paramsData = {
      displayMode: mode,
      nameTC: nameTC !== '全部' ? nameTC : '',
      q: query || ''
    }
    await eventStore.filterEventList(paramsData)
    const { eventData } = storeToRefs(eventStore)
    eventList.value = eventData.value

    await router.push({
      query: {
        displayMode: mode,
        nameTC: nameTC !== '全部' ? nameTC : '',
        q: query || ''
      }
    })

    hide() // 關閉 loading
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API error:', error)
    eventList.value = []

    hide() // 關閉 loading
  }
}

const changeCategory = async (category) => {
  activeCategory.value = category // 更新 activeCategory
  const query = route.query.q
  await handlerDisplayMode({ mode: activeMode.value, query })
}

// show()

onMounted(() => {
  const { displayMode, nameTC, q } = route.query
  activeCategory.value.nameTC = nameTC || '全部'
  handlerDisplayMode({ mode: displayMode || 'all', nameTC: nameTC || '全部', query: q })

  // isLoading.value = true
  // isLoading.value = false
})
</script>

<template>
  <div class="event-list container-lg">
    <div class="latest-hot-block py-5 pt-md-9 pb-md-11">
      <div class="d-flex justify-content-center">
        <IndexTitle en="Events" tc="找賽事" />
      </div>
    </div>

    <!-- 分類 -->
    <ol class="list-unstyled gap-3 py-4 d-flex">
      <h1 class="text-btn1 mb-0 d-inline-flex align-items-center">分類：</h1>
      <ul class="list-unstyled d-inline-flex gap-3">
        <li class="g-col-4 me-2">
          <button
            role="button"
            class="btn category-btn"
            :class="{ active: activeCategory.nameTC === '全部' }"
            @click="changeCategory((category = { nameTC: '全部' }))"
          >
            <img src="" alt="全部" />
            <span class="text-s2">全部</span>
          </button>
        </li>
        <li v-for="category in categoriesAll" :key="category._id" class="g-col-4 me-2">
          <button
            role="button"
            class="btn category-btn"
            :class="{ active: activeCategory.nameTC === category.nameTC }"
            @click="changeCategory(category)"
          >
            <img :src="category.photo" :alt="`${category.nameTC}(${category.nameEN})`" />
            <span class="text-s2">{{ category.nameTC }}</span>
          </button>
        </li>
      </ul>
    </ol>

    <!-- 切換模式 -->
    <nav class="nav nav-border-bottom text-h3 mb-5 mb-md-9">
      <button
        v-for="navTab in navTabs"
        :key="navTab.value"
        class="nav-link"
        :class="{ active: activeMode === navTab.value }"
        type="button"
        @click="handlerDisplayMode({ mode: navTab.value })"
      >
        {{ navTab.label }}
      </button>
    </nav>

    <!-- 內容 -->
    <section class="row event-list__content">
      <li
        v-for="event in eventList.events"
        :key="event._id"
        class="list-unstyled col-md-3 col-sm-12"
      >
        <EventListCard :event="event" />
      </li>
    </section>
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
.event-list {
  & nav {
    border-top: 1px solid $gray_4;
    padding-top: 20px;
  }
  &__content {
    li {
      padding-bottom: 50px;
    }
  }
}
</style>
