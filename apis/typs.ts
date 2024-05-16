export interface roomsParams {
  name: string
  price?: number
  rating?: number
}

export interface roomsModel {
  name: string
  price: number
  rating: number
  _id: string
  createdAt: string
}

export type roomId = string
