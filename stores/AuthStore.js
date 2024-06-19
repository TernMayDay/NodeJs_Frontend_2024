export const useAuthStore = defineStore('authStore', () => {
  const user = ref({
    _id: '663a0b4fadbf444649c6ba03',
    account: 'player',
    email: 'player@gmail.com',
    password: '$2a$10$Hc3HBfCncyPiDMyzCqY/OuhNceAmjk93k/zloQJLe5vsOoPufIISe',
    phone: 12345678,
    role: 1, // 0.管理者, 1.主辦方, 2.球迷
    active: true,
    nickname: 'pips',
    photo:
      'https://images.pexels.com/photos/20147082/pexels-photo-20147082.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
  })

  // const user = ref(null)

  /**
   * 登出
   */
  const logOut = () => {
    // eslint-disable-next-line no-console
    console.log('登出')
  }

  return {
    user,
    logOut
  }
})
