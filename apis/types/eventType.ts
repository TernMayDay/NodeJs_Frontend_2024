export interface addTagParams {
  name: string
}

export interface tagObj {
  name: string
  eventNum: number
  isDeleted: boolean
  _id: string
  __v: number
}

export interface addTagModel {
  status: string
  data: {
    tag: tagObj
  }
}
