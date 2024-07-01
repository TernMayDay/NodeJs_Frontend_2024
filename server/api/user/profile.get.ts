export default defineEventHandler(() => {
  return {
    status: 'success',
    data: {
      user: {
        _id: '663a0b4fadbf444649c6ba03',
        account: 'admin',
        email: 'admin@gmail.com',
        role: '1',
        gender: '2',
        address: '台北市奧運區運動街籃球一號\n',
        phone: '12345678',
        nickname: 'pips',
        notification: true,
        active: true,
        __v: 68,
        favorites: ['6648aeb4ad951f8670f97a7c', '666f020b5a50918640c4f3f2'],
        focusedEvents: [],
        subscribes: [
          {
            status: 1,
            _id: '664af6f3fde231a168975c3c',
            type: 'sponsor',
            sponsor: {
              _id: '6622041e060e1c9cf3acb890',
              name: '悍將'
            },
            tag: null,
            createdAt: '2024-05-20T07:08:35.829Z',
            updatedAt: '2024-05-20T07:08:35.829Z',
            __v: 0
          },
          {
            status: 1,
            _id: '664af70afde231a168975c3e',
            type: 'tag',
            sponsor: null,
            tag: {
              _id: '6617e9ce1db3d12e4efe5c4d',
              name: '戴資穎'
            },
            createdAt: '2024-05-20T07:08:58.584Z',
            updatedAt: '2024-05-20T07:08:58.584Z',
            __v: 0
          }
        ],
        updatedAt: '2024-06-19T07:30:07.663Z',
        orders: [],
        photo:
          'https://images.pexels.com/photos/20147082/pexels-photo-20147082.jpeg?auto=compress&cs=tinysrgb&w=400&h=400'
      }
    }
  }
})
