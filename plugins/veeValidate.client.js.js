import { configure, defineRule } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import { required, email, min, max, image, size } from '@vee-validate/rules'

// 配置訊息
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})

setLocale('zh_TW')

// 必須定義，用來封裝 plugin
export default defineNuxtPlugin((_nuxtApp) => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('image', image)
  defineRule('size', size)
})
