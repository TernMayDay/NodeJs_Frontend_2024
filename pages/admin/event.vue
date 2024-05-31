// pages/sponsorList.vue
<script setup>
definePageMeta({
  layout: 'admin'
});

import { ref, onMounted } from 'vue';
import SponsorEventTable from '~/components/AdminEventTable.vue';
import { getEventList } from '~/apis/getEventList';

const events = ref([]);
const isLoading = ref(true);

const fetchEvents = async () => {
  try {
    const response = await getEventList({ page: 1, pageSize: 10 });
    console.log('Fetched events:', response); // 添加日志检查响应数据
    if (response.data && response.data.events) {
      events.value = response.data.events;
    } else {
      console.error('No events found in response:', response);
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchEvents();
});

const editEvent = (id) => {
  console.log(`編輯賽事 ID: ${id}`);
};

const deleteEvent = (id) => {
  console.log(`刪除賽事 ID: ${id}`);
};
</script>

<template>
  <div class="container mt-4">
    <SponsorEventTable :events="events" @editEvent="editEvent" @deleteEvent="deleteEvent" v-if="!isLoading" />
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped></style>
