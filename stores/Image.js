import { defineStore } from 'pinia'
const api = runApi()
export const useImageStore = defineStore('image', () => {
  const image = ref(null)

  // 上傳圖片
  const uploadImage = async (params) => {
    const response = await api.postUploadImage(params)
    image.value = response.data
    return response.data
  }

  return {
    uploadImage,
    image
  }
})
