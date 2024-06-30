import { Tabs, Tab } from 'vue3-tabs-component'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Tabs', Tabs)
  nuxtApp.vueApp.component('Tab', Tab)
})
