<script setup>
import { globalMiddleware } from '#build/middleware'

const props = defineProps({
  throttle: {
    type: Number,
    default: 200
  },
  hold: {
    type: Number,
    default: 400
  }
})

const isLoading = ref(false)

let _throttleTimer = null

function clear() {
  clearTimeout(_throttleTimer)
  _throttleTimer = null
}

function show() {
  // console.log(' === show ===')
  clear()
  if (process.client) {
    if (props.throttle > 0) {
      _throttleTimer = setTimeout(() => {
        isLoading.value = true
      }, props.throttle)
    } else {
      isLoading.value = true
    }
  }
}

function hide() {
  // console.log(' === hide ===')
  clear()
  if (process.client) {
    setTimeout(() => {
      isLoading.value = false
    }, props.hold)
  }
}

globalMiddleware.unshift(show)
function unsubRouterBeforeMiddleware() {
  globalMiddleware.splice(globalMiddleware.indexOf(show, 1))
}

const nuxtApp = useNuxtApp()
const unsubPageFinish = nuxtApp.hook('page:finish', hide)
const unsubError = nuxtApp.hook('vue:error', hide)

onBeforeUnmount(() => {
  unsubRouterBeforeMiddleware()
  unsubPageFinish()
  unsubError()
})

const router = useRouter()

router.onError(() => {
  hide()
})

router.beforeResolve((to, from) => {
  if (
    to === from ||
    to.matched.every(
      (comp, index) =>
        comp.components && comp.components?.default === from.matched[index]?.components?.default
    )
  )
    hide()
})

router.afterEach((_to, _from, failure) => {
  if (failure) hide()
})
</script>

<template>
  <div
    v-if="isLoading"
    class="loading-overlay"
    :class="isLoading ? 'loader-visible' : 'loader-hidden'"
  >
    <div class="loading-content">
      <img src="/assets/icons/Interwind.svg" alt="Loading" class="loading-icon" />
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading-overlay.loader-visible {
  visibility: visible;
  opacity: 1;
  scale: 1.5;
}

.loading-overlay.loader-hidden {
  visibility: hidden;
  opacity: 0;
  scale: 1;
}
.loading-content {
  text-align: center;
}
</style>
