const apiRoom = '/user'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const userProfile = ref({})
  const userInfo = ref({})
  const isLogin = ref(true)
  const getToken = ref(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGI0YWI5ZTA4ZGI4NjNlZTEzMjc5MyIsImlhdCI6MTcxODU5MDAyMSwiZXhwIjoxNzE5MTk0ODIxfQ.w-H0doJqIqFvi2DTJNVvKJ3ZLDodu6vFJYkDkY5jWY8'
  )

  const clearUserInfo = () => {
    userInfo.value = undefined
  }

  // 取得我的資料
  const getUserProfile = async () => {
    const data = await useHttp.get(`${apiRoom}/profile/${user.value?._id}`)
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
