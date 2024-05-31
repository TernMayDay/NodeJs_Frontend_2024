// components/SponsorEventTable.vue
<template>
  <div>
    <table class="table table-striped table-responsive">
      <thead>
        <tr>
          <th>主辦單位名稱</th>
          <th>賽事名稱</th>
          <th>場次名稱</th>
          <th>場次時間</th>
          <th>地點</th>
          <th>賽事詳情</th>
          <th>售票期間</th>
          <th>訂票人數</th>
          <th>進場人數</th>
          <th>座位總數</th>
          <th>最後更新時間</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event._id">
          <td>{{ event.sponsorId }}</td>
          <td>{{ event.eventName }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].sessionName : 'N/A' }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].sessionTime : 'N/A' }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].sessionPlace : 'N/A' }}</td>
          <td>{{ event.eventIntro }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].sessionSalesPeriod : 'N/A' }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].bookTicket : 'N/A' }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].enterVenue : 'N/A' }}</td>
          <td>{{ event.sessionList.length > 0 ? event.sessionList[0].seatsTotal : 'N/A' }}</td>
          <td>{{ event.updatedAt }}</td>
          <td>{{ event.status }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="() => $emit('editEvent', event._id)">編輯</button>
            <button class="btn btn-danger btn-sm" @click="() => $emit('deleteEvent', event._id)">強制下架</button>
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
