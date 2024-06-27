const apiRoom = '/user'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeApiRoom = `/api${apiRoom}`

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const userProfile = ref({})
  const userInfo = ref({})
  const isLogin = ref(true)
  const getToken = ref(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGI0YWI5ZTA4ZGI4NjNlZTEzMjc5MyIsImlhdCI6MTcxOTM3ODE3NSwiZXhwIjoxNzE5OTgyOTc1fQ.DzL4THt4MyPbBQ5GZ4uP1TdHrXPnf9Y_VteZCkFidIQ'
  )

  const clearUserInfo = () => {
    userInfo.value = undefined
  }

  // 取得我的資料
  const getUserProfile = async () => {
    const data = await useHttp.get(`${apiRoom}/profile/${user.value?._id}`)

    // 讀取 Fake API 方式
    // const { data } = await useFetch(`${fakeApiRoom}/profile`)

    // 若讀取 Fake API：data.data => data.value.data
    const { user: reslt } = data.data
    userProfile.value = reslt
    return reslt
  }

  // 編輯我的資料
  const editUserProfile = async (bady) => {
    // eslint-disable-next-line no-console
    console.log(bady)
    const res = await useHttp.patch(`${apiRoom}/${user.value._id}`, bady)
    const { status } = res
    if (status === 'success') {
      await getUserProfile()
    }
    return status === 'success'
  }

  return {
    userProfile,
    isLogin,
    getToken,
    clearUserInfo,
    getUserProfile,
    editUserProfile
  }
})
