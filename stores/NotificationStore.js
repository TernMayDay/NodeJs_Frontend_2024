const apiRoom = '/notification'

export const useNotificationStore = defineStore('notificationStore', () => {
  const authProfileStore = useAuthProfileStore()
  const { userId } = storeToRefs(authProfileStore)
  const notifications = ref([])

  /**
   * 取得所有通知
   */
  const getNotifications = async () => {
    const data = await useHttp.get(`${apiRoom}/user/${userId.value}`)
    const { notifications: reslt } = data.data
    notifications.value = reslt
    return reslt
  }

  /**
   * 改變單筆通知讀取狀態
   * @param { string } notificationId 通知 id
   */
  const changeNotificationIsRead = async (notificationId) => {
    const data = await useHttp.patch(`${apiRoom}/${notificationId}/user/${userId.value}`)
    const { notifications: reslt } = data.data
    return reslt
  }

  return {
    notifications,
    getNotifications,
    changeNotificationIsRead
  }
})
