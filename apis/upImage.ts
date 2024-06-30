import type { imageParams, imageModel } from '@/apis/types/upImageType'

enum Api {
  uploadImage = '/upload/image'
}

// 上傳圖片
export function postUploadImage(body: imageParams) {
  return useHttp.post<imageModel>(Api.uploadImage, body)
}
