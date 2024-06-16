const apiRoom = '/notification'

export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref([])

  /**
   * 取得所有通知
   */
  const getNotifications = async () => {
    console.error('[待處理]取得所有通知 API - 通知 userId 目前寫死')
    const userId = '664b4ab9e08db863ee132793'
    const data = await useHttp.get(`${apiRoom}/user/${userId}`)
    const { notifications: reslt } = data.data
    notifications.value = reslt
    console.error('notifications', reslt)
    return reslt
  }

  /**
   * 改變單筆通知讀取狀態
   * @param { string } notificationId 通知 id
   */
  const changeNotificationIsRead = async (notificationId) => {
    console.error('[待處理]改變單筆通知讀取狀態 API - 通知 notificationId 、 userId 目前寫死')
    const userId = '664b4ab9e08db863ee132793'
    const data = await useHttp.patch(`${apiRoom}/${notificationId}/user/${userId}`)
    const { notifications } = data.data
    return notifications
  }

  return {
    notifications,
    getNotifications,
    changeNotificationIsRead
  }
})
