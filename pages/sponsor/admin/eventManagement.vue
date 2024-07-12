<template>
  <div class="event-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>賽事管理</h2>
      <NuxtLink to="/sponsor/event" class="btn btn-add-event">
        <i class="icon-add"></i>
        <span>新增賽事</span>
      </NuxtLink>
    </div>
    <ul class="list-unstyled mb-0 customize-table">
      <li class="customize-thead">
        <ul class="list-unstyled mb-0 row customize-tr">
          <li class="col-xl-3">賽事名稱</li>
          <li class="col">場次名稱</li>
          <li class="col">時間</li>
          <li class="col">地點</li>
          <li class="col">售票期間</li>
          <li class="col">訂票人數</li>
          <li class="col">座位總數</li>
          <li class="col">狀態</li>
          <li class="col">操作</li>
        </ul>
      </li>
      <li class="customize-tbody">
        <ul v-for="event in events" :key="event._id" class="list-unstyled mb-0 row align-items-stretch customize-tr">
          <li class="col-xl-3 customize-td text-break" data-th="賽事名稱">
            <div class="d-flex align-items-center gap-2">
              <img :src="event.eventPic" class="object-fit img-size rounded-3" />{{ event.eventName }}
            </div>
          </li>
          <li class="col-6 col-xl customize-td" data-th="場次名稱">
            {{ event.sessionList[0].sessionName }}
          </li>
          <li class="col-6 col-xl customize-td" data-th="時間">
            {{ formatDate(event.sessionList[0].sessionTime) }}
          </li>
          <li class="col-6 col-xl customize-td" data-th="地點">
            {{ event.sessionList[0].sessionPlace }}
          </li>
          <li class="col-6 col-xl customize-td" data-th="售票期間">
            {{ formatDateRange(event.sessionList[0].sessionSalesPeriod) }}
          </li>
          <li class="col-6 col-xl customize-td" data-th="訂票人數">
            {{ event.sessionList[0].bookTicket || 0 }}
          </li>
          <li class="col-6 col-xl customize-td" data-th="座位總數">
            {{ event.sessionList[0].seatsTotal }}
          </li>
          <li class="col-6 col-xl customize-td" data-th="狀態">
            {{ getEventStatus(event.status) }}
          </li>
          <li class="col-xl customize-td">
            <button class="btn qrcode-btn text-btn1" disabled>
              <span>詳情</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 分頁控制 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center custom-pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">上一頁</a>
        </li>
        <li v-for="page in displayedPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import dayjs from 'dayjs';
import { useAuthProfileStore } from '~/stores/AuthProfile';
import { storeToRefs } from 'pinia';

const authProfileStore = useAuthProfileStore();
const { userId } = storeToRefs(authProfileStore);

const events = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = ref(10);

const getEvents = async (page = 1) => {
  try {
    const data = await useHttp.get(`/event/sponsor/${userId.value}?page=${page}&pageSize=${pageSize.value}`);
    events.value = data.data.events;
    currentPage.value = data.data.pagination.currentPage;
    totalPages.value = data.data.pagination.totalPages;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

onMounted(() => getEvents());

watch(currentPage, (newPage) => {
  getEvents(newPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 计算要显示的页码
const displayedPages = computed(() => {
  let start = Math.max(currentPage.value - 2, 1);
  let end = Math.min(start + 4, totalPages.value);
  start = Math.max(end - 4, 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const formatDate = (date) => {
  return dayjs(date).format('YYYY.MM.DD HH:mm:ss');
};

const formatDateRange = (dateRange) => {
  return `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`;
};

const getEventStatus = (status) => {
  const statusMap = {
    0: '草稿',
    1: '售票中',
  };
  return statusMap[status] || '未知';
};
</script>

<style scoped lang="scss">
.event-management {
  padding: 20px;
}

.btn-add-event {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(to right, #00ffa3, #00efff);
  color: #050505; // Gary1 for contrast
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .icon-add {
    margin-right: 8px;
    font-size: 18px;
  }
}

.img-size {
  width: rem(70px);
  height: rem(70px);
}

.custom-pagination {
  .page-item {
    .page-link {
      color: #00FFA3;
      background-color: #282828;
      border-color: #373737;

      &:hover {
        color: #00EFFF;
        background-color: #373737;
      }
    }

    &.active .page-link {
      color: #050505;
      background-color: #00FFA3;
      border-color: #00FFA3;
    }

    &.disabled .page-link {
      color: #848484;
      background-color: #1E1E1E;
      border-color: #282828;
    }
  }
}

.qrcode-btn {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* 假设你有一个通用的 icon 类 */
.icon-add::before {
  content: '+'; // 或使用您的图标系统
}
</style>