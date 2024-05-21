<script setup>
import { storeToRefs } from 'pinia'

const room = ref({
  name: '庭園樓中樓套房',
  price: 3000,
  rating: 5
})

const roomId = ref('66458377afa47f084027e3de')
const editId = ref('66458373afa47f084027e3db')

const modifyRoom = ref({
  name: '修改一筆資料111'
})

const store = useTestStore()
const { getRooms, createRoom, deleteAll, deleteRoom, patchRoom } = store
const { roomInfo } = storeToRefs(store)

const { data, refresh } = await useAsyncData('rooms', () => getRooms())
</script>

<template>
  <div>
    <h1>Page: api</h1>
    <button type="button" class="btn check-btn text-btn1" @click="refresh">
      <span>refresh</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="createRoom(room)">
      <span>新增Rooms</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="deleteRoom(roomId)">
      <span>刪除一筆</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="deleteAll">
      <span>全部刪除</span>
    </button>

    <button type="button" class="btn check-btn text-btn1" @click="patchRoom(editId, modifyRoom)">
      <span>修改一筆資料</span>
    </button>

    <p style="color: yellow">roomInfo :{{ roomInfo }}</p>
    <p style="color: yellow">data :{{ data }}</p>
  </div>
</template>

<style scoped></style>
