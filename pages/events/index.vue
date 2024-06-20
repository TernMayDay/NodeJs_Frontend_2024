<script setup>
const router = useRouter()

const categoryStore = useCategoryStore()
await categoryStore.getCategoriesAll()
const { categoriesAll } = storeToRefs(categoryStore)

const eventStore = useEventStore()
const eventList = ref([])

const activeMode = ref('list')
const navTabs = ref([
  {
    value: 'list',
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

const handlerDisplayMode = async ({ mode, query }) => {
  activeMode.value = mode
  try {
    const paramsData =
      query !== undefined
        ? {
            displayMode: mode,
            q: query
          }
        : { displayMode: mode }
    const data = await eventStore.getEvents(paramsData)
    eventList.value = data
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API error:', error)
    eventList.value = []
  }
}

const changeCategory = async (category) => {
  const query = category.nameTC
  await router.push({
    query: {
      q: query
    }
  })
  await handlerDisplayMode({ mode: activeMode.value, query })
}

onMounted(() => {
  handlerDisplayMode({ mode: 'list' })
})
</script>

<template>
  <div class="event-list container-lg">
    <div class="latest-hot-block py-5 pt-md-9 pb-md-11">
      <div class="d-flex justify-content-center">
        <IndexTitle en="Events" tc="找賽事" />
      </div>
    </div>

    <ol class="list-unstyled gap-3 py-4 d-flex">
      <h1 class="text-btn1 mb-0 d-inline-flex align-items-center">分類：</h1>
      <ul class="list-unstyled d-inline-flex gap-3">
        <li v-for="category in categoriesAll" :key="category._id" class="g-col-4 me-2">
          <button role="button" class="btn category-btn" @click="changeCategory(category)">
            <img :src="category.photo" :alt="`${category.nameTC}(${category.nameEN})`" />
            <span class="text-s2">{{ category.nameTC }}</span>
          </button>
        </li>
      </ul>
    </ol>

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

    <session class="row event-list__content">
      <li v-for="event in eventList.events" :key="event._id" class="col-3">
        <TaggedEventCard :event="event" />
      </li>
    </session>

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
