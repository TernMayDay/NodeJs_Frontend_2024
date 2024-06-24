const apiRoom = '/user'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const userProfile = ref({})
  const userInfo = ref({})
  const isLogin = ref(true)
  const getToken = ref(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGI0YWI5ZTA4ZGI4NjNlZTEzMjc5MyIsImlhdCI6MTcxODE3NjE3NywiZXhwIjoxNzE4NzgwOTc3fQ.7H15q7L0bnmdtAbjfb2hFwfZ-m8DnrqyThMhFhOBeUY'
  )

  const clearUserInfo = () => {
    userInfo.value = undefined
  }

  // 取得我的資料
  // const getUserProfile = async () => {
  //   const data = await useHttp.get(`${apiRoom}/profile/${user.value?._id}`)
  //   data.data.user = {
  //     focusedEvents: [
  //       {
  //         _id: '6648aeb4ad951f8670f97a7c',
  //         eventName: 'Sample Event',
  //         eventDate: '2024-06-01T00:00:00.000Z',
  //         eventPic: 'http://example.com/eventPic.jpg',
  //         coverPic: 'http://example.com/coverPic.jpg',
  //         smallBanner: 'http://example.com/smallBanner.jpg',
  //         releaseDate: '2024-05-01T00:00:00.000Z',
  //         eventIntro: 'This is a sample event introduction.',
  //         sponsorId: '664e8f0713276632c8bb4e0b',
  //         createdAt: '2024-05-18T13:35:48.006Z',
  //         updatedAt: '2024-05-28T15:59:50.275Z',
  //         __v: 5,
  //         status: 1,
  //         sessionList: ['664a3f5d6e67990407ba0d4a'],
  //         tagList: ['664b737cdfc9509a05e05563'],
  //         categoryId: '6655f57046c2cb1b51b0d0e5'
  //       },
  //       {
  //         _id: '66656937b3f9f0ca6ae6a50d',
  //         eventName: '中華台北羽球公開賽',
  //         eventDate: '2024-06-22T00:00:00.000Z',
  //         eventPic: 'https://cdn-icons-png.flaticon.com/512/8359/8359737.png',
  //         coverPic: 'https://cdn-icons-png.flaticon.com/512/8359/8359737.png',
  //         smallBanner: 'https://cdn-icons-png.flaticon.com/512/8359/8359737.png',
  //         categoryId: '66656665c3cfdb6bdfcf485b',
  //         tagList: ['666533ee67aa2092cbef3809'],
  //         releaseDate: '2024-03-22T00:00:00.000Z',
  //         eventIntro:
  //           "<div><img src='https://example.com/image.jpg'> 文字編輯器輸入一堆賽事介紹 </div>",
  //         status: 1,
  //         sessionList: ['66656937b3f9f0ca6ae6a50f', '66656937b3f9f0ca6ae6a513'],
  //         createdAt: '2024-06-09T08:35:03.007Z',
  //         updatedAt: '2024-06-09T08:35:03.187Z',
  //         __v: 1
  //       },
  //       {
  //         _id: '6669a6c4a7495ed5d886b7cb',
  //         eventName: '中華台北羽球公開賽',
  //         eventDate: '2024-06-22T00:00:00.000Z',
  //         eventPic: 'https://cdn-icons-png.flaticon.com/512/8359/8359737.png',
  //         coverPic: 'https://cdn-icons-png.flaticon.com/512/8359/8359737.png',
  //         smallBanner: 'https://cdn-icons-png.flaticon.com/512/8359/8359737.png',
  //         categoryId: '6665887d5a18c84f02b02124',
  //         tagList: ['666533ee67aa2092cbef3809'],
  //         releaseDate: '2024-03-22T00:00:00.000Z',
  //         eventIntro:
  //           "<div><img src='https://example.com/image.jpg'> 文字編輯器輸入一堆賽事介紹 </div>",
  //         status: 1,
  //         sessionList: ['6669a6c4a7495ed5d886b7cd', '6669a6c5a7495ed5d886b7d1'],
  //         createdAt: '2024-06-12T13:46:44.119Z',
  //         updatedAt: '2024-06-12T13:46:45.161Z',
  //         __v: 1
  //       }
  //     ]
  //   }
  //   const { user: reslt } = data.data
  //   userProfile.value = reslt
  //   return reslt
  // }

  // 編輯我的資料
  const editUserProfile = async (bady) => {
    // eslint-disable-next-line no-console
    console.log(bady)
    // eslint-disable-next-line no-console
    console.error('API CORE ERROR')
    const data = await useHttp.patch(`${apiRoom}/${user.value._id}`, bady)
    // eslint-disable-next-line no-console
    console.log('editUserProfile', data.data)
    return data.data
  }

  return {
    userProfile,
    isLogin,
    getToken,
    clearUserInfo,
    // getUserProfile,
    editUserProfile
  }
})
