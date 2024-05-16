import type { FetchResponse, SearchParameters } from 'ofetch'
import Swal from 'sweetalert2'
import { useUserStore } from '~/stores/User'

export interface ResOptions<T> {
  data: T
  code: number
  message: string
  success: boolean
}

function handleError<T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) {
  const err = (text: string) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: '',
      text: response?._data?.message ?? text,
      showConfirmButton: false,
      timer: 1500
    })
  }
  if (!response._data) {
    err('請求超時，伺服器無響應！')
    return
  }
  const userStore = useUserStore()
  const handleMap: { [key: number]: () => void } = {
    404: () => err('你要找的頁面不存在'),
    500: () => err('伺服器出錯'),
    403: () => err('沒有權限訪問該資源'),
    401: () => {
      err('登入狀態已過期，需要重新登入')
      userStore.clearUserInfo()
      // TODO 跳到實際登入頁面
      navigateTo('/')
    }
  }
  handleMap[response.status] ? handleMap[response.status]() : err('未知的錯誤！')
}
// get方法 参数
function paramsSerializer(params?: SearchParameters) {
  if (!params) return

  const query = useCloneDeep(params)
  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === 'object' && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v: any) => JSON.stringify(v))
      delete query[key]
    }
  })
  return query
}

const fetch = $fetch.create({
  // onRequest
  onRequest({ options }) {
    // get方法 参数
    options.params = paramsSerializer(options.params)
    // baseURL
    const {
      public: { apiBase }
    } = useRuntimeConfig()
    options.baseURL = apiBase
    // header,没登入就不帶 token
    const userStore = useUserStore()
    if (!userStore.isLogin) return
    options.headers = new Headers(options.headers)
    options.headers.set('Authorization', `Bearer ${userStore.getToken}`)
  },
  // onResponse
  onResponse({ response }) {
    if (response.headers.get('content-disposition') || response.status === 200) return response
    // error
    if (response._data.code !== 200) {
      handleError(response)
      return Promise.reject(response._data)
    }
    // success
    return response._data
  },
  // onResponseError
  onResponseError({ response }) {
    handleError(response)
    return Promise.reject(response?._data ?? null)
  }
})

// 導出
export const useHttp = {
  get: <T>(url: string, params?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'get', params })
  },

  post: <T>(url: string, body?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'post', body })
  },

  put: <T>(url: string, body?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'put', body })
  },

  patch: <T>(url: string, body?: any, params?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'patch', params, body })
  },

  delete: <T>(url: string, body?: any, params?: any) => {
    return fetch<ResOptions<T>>(url, { method: 'delete', params, body })
  }
}
