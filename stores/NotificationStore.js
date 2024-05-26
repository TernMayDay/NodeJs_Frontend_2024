export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref([])

  /**
   * 取得所有通知
   */
  const getNotifications = async () => {
    const { data } = await useFetch('/api/notifications')
    notifications.value = data.value
  }

  return {
    notifications,
    getNotifications
  }
})
