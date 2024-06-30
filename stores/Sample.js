import { defineStore } from 'pinia'
export const useTestStore = defineStore('test', () => {
  const api = runApi()
  const roomInfo = ref([])

  // 取得
  const getRooms = async () => {
    const data = await api.getRooms()
    roomInfo.value = data.rooms
    return data
  }

  // 新增一筆
  const createRoom = async (params) => {
    await api.postRoom(params)
    await getRooms()
  }

  // 刪除 all
  const deleteAll = async () => {
    await api.deleteAll()
    await getRooms()
  }

  // 刪除單筆
  const deleteRoom = async (params) => {
    await api.deleteRoom(params)
    await getRooms()
  }

  // 修改一筆資料
  const patchRoom = async (editId, modifyRoom) => {
    await api.patchRoom(editId, modifyRoom)
    await getRooms()
  }

  return {
    createRoom,
    roomInfo,
    getRooms,
    deleteAll,
    deleteRoom,
    patchRoom
  }
})
