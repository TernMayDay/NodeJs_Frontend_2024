<template>
  <div>
    <table class="table table-striped table-responsive">
      <thead>
        <tr>
          <th>賽事名稱</th>
          <th>賽事日期</th>
          <th>賽事詳情</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event._id">
          <td>{{ event.eventName }}</td>
          <td>{{ event.eventDate }}</td>
          <td>{{ event.eventIntro }}</td>
          <td>{{ event.status }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="() => $emit('editEvent', event._id)">編輯</button>
            <button class="btn btn-danger btn-sm" @click="() => $emit('deleteEvent', event._id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['events']);

const emit = defineEmits(['editEvent', 'deleteEvent']);
</script>

<style scoped></style>
