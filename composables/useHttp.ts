import type { FetchResponse, SearchParameters } from 'ofetch'
import cloneDeep from 'lodash/cloneDeep'
import { useAuthProfileStore } from '~/stores/AuthProfile'

export interface ResOptions<T> {
  data: T
  code: number
  message: string
  success: boolean
}

function handleError<T>(response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>) {
  const { _data, status } = response
  const err = (text: string) => {
    // eslint-disable-next-line no-console
    console.error(_data?.message)

    setSwalFire({
      stype: 'popup',
      icon: 'error',
      title: '系統錯誤',
      text
    })
  }
  if (!_data) {
    err('請求超時，伺服器無響應！')
    return
  }
  const authProfileStore = useAuthProfileStore()
  const handleMap: { [key: number]: () => void } = {
    404: () => err('你要找的頁面不存在'),
    500: () => err('伺服器出錯'),
    403: () => err('沒有權限訪問該資源'),
    401: () => {
      err('登入狀態已過期，需要重新登入')
      authProfileStore.clearUserData()
      // TODO 跳到實際登入頁面
      navigateTo('/')
    }
  }

  handleMap[status] ? handleMap[status]() : err('未知的錯誤！')
}
// get方法 参数
function paramsSerializer(params?: SearchParameters) {
  if (!params) return

  const query = cloneDeep(params)
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
    const authProfileStore = useAuthProfileStore()
    if (!authProfileStore.token) return
    options.headers = new Headers(options.headers)
    options.headers.set('Authorization', `Bearer ${authProfileStore.token}`)
  },
  // onResponse
  onResponse({ response }) {
    if (
      response.headers.get('content-disposition') ||
      response.status === 200 ||
      response.status === 201
    )
      return response
    // error
    if (response._data.code !== 200 || response._data.code !== 201) {
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
