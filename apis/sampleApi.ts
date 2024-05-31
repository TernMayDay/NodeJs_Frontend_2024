import type { roomsParams, roomsModel, roomId } from '@/apis/typs'

enum Api {
  rooms = '/rooms'
}

export function getRooms() {
  return useHttp.get(Api.rooms)
}

export function postRoom(body: roomsParams) {
  return useHttp.post<roomsModel>(Api.rooms, body)
}

export function deleteAll() {
  return useHttp.delete<void>(Api.rooms)
}

export function deleteRoom(params: roomId) {
  return useHttp.delete<void>(`${Api.rooms}/${params}`)
}

export function patchRoom(params: roomId, body: roomsParams) {
  return useHttp.patch<void>(`${Api.rooms}/${params}`, body)
}

