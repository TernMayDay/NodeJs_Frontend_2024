<script lang="ts" setup>
import type { roomsParams, roomId } from '@/apis/typs'
const { api } = useApi()

// get
const { data, refresh } = await useAsyncData('rooms', () => api.getRooms())

// post
const room = ref<roomsParams>({
  name: '庭園樓中樓套房',
  price: 3000,
  rating: 5
})

const createRoom = async () => {
  const params = room.value
  await api.postRoom(params)
  await refresh()
}

// delete all
const deleteAll = async () => {
  await api.deleteAll()
  await refresh()
}

// delete
const id = ref<roomId>('66457d9eafa47f084027e321')
const deleteRoom = async () => {
  await api.deleteRoom(id.value)
  await refresh()
}

// patch
const editId = ref<roomId>('66457cbeafa47f084027e318')
const modifyRoom = ref({ name: '修改一筆資料' })
const patchRoom = async () => {
  await api.patchRoom(editId.value, modifyRoom.value)
  await refresh()
}
</script>

<template>
  <div>
    <h1>Page: api</h1>
    <button type="button" class="btn check-btn text-btn1" @click="refresh()">
      <span>refresh</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="createRoom">
      <span>新增Rooms</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="deleteRoom">
      <span>刪除一筆</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="deleteAll">
      <span>全部刪除</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="patchRoom">
      <span>修改一筆資料</span>
    </button>
    <p style="color: yellow">data :{{ data }}</p>
  </div>
</template>

<style scoped></style>
