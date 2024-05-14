export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref([])

  const getNotifications = async () => {
    const { data } = await useFetch('/api/notifications')
    notifications.value = data.value
  }

  return {
    notifications,
    getNotifications
  }
})
