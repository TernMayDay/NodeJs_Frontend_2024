import dayjs, { locale } from 'dayjs'
import localeZh from 'dayjs/locale/zh-cn'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('timeformat', {
    mounted(el, binding) {
      locale(localeZh)
      const time = dayjs(binding.value).format('YYYY/MM/DD (dddd) hh:mm')
      el.innerText = time
    }
  })
})
