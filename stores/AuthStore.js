export const useAuthStore = defineStore('authStore', () => {
  const user = ref({
    _id: '663cc54961dd3c092489ca7f',
    account: 'player',
    email: 'player@gmail.com',
    password: '$2a$10$Hc3HBfCncyPiDMyzCqY/OuhNceAmjk93k/zloQJLe5vsOoPufIISe',
    phone: 12345678,
    role: 1,
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
    console.log('登出')
  }

  return {
    user,
    logOut
  }
})
