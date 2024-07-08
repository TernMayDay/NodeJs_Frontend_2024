const apiRoom = '/user'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeApiRoom = `/api${apiRoom}`

export const useUserStore = defineStore('user', () => {
  const authProfileStore = useAuthProfileStore()
  const { userId } = storeToRefs(authProfileStore)

  // 取得我的資料
  const getUserProfile = async () => {
    console.log('getUserProfile')
    const data = await useHttp.get(`${apiRoom}/profile/${userId.value}`)

    // 讀取 Fake API 方式
    // const { data } = await useFetch(`${fakeApiRoom}/profile`)

    // 若讀取 Fake API：data.data => data.value.data
    let { user } = data.data
    await authProfileStore.setUserData({ data: { user } })
    return user
  }

  // 編輯我的資料
  const editUserProfile = async (bady) => {
    // eslint-disable-next-line no-console
    console.log(bady)
    const res = await useHttp.patch(`${apiRoom}/${userId.value}`, bady)
    const { status } = res
    if (status === 'success') {
      await getUserProfile()
    }
    return status === 'success'
  }

  return {
    getUserProfile,
    editUserProfile
  }
})
