<script setup>
definePageMeta({
  layout: 'sponsor'
});

import { ref, onMounted } from 'vue';
import EventTable from '~/components/EventTable.vue';
import { getSponsorEvents } from '~/apis/getSponsorEvents';

const events = ref([]);
const isLoading = ref(true);

const fetchEvents = async () => {
  try {
    const response = await getSponsorEvents('664e8f0713276632c8bb4e0b', { page: 1, pageSize: 10 });
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
    <EventTable :events="events" @editEvent="editEvent" @deleteEvent="deleteEvent" v-if="!isLoading" />
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped></style>
