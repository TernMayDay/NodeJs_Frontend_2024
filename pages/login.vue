<template>
  <div class="container d-flex justify-content-center align-items-center px-14 my-14">
    <div class="col-md-6">
      <h2 class="flex justify-center">登入</h2>
      <div class="card">
        <div class="card-body rounded">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="username" class="form-label">帳號</label>
              <input id="username" v-model="email" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密碼</label>
              <input id="password" v-model="password" type="password" class="form-control" />
            </div>
            <!-- <button type="submit" class="btn login-btn text-btn1 w-100">忘記密碼</button> -->
            <div class="justify-center flex">
              <button type="submit" class="btn login-btn text-btn1 w-50 flex justify-center align-center">
                登入
              </button>
            </div>
            <!-- <button type="submit" class="btn login-btn text-btn1 w-100">註冊</button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'
import { useAuthProfileStore } from '~/stores/AuthProfile'

const router = useRouter()
const { createData } = useApi()
const authProfileStore = useAuthProfileStore()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const error = ref(null)
const loadingStore = useLoadingStore()

async function onSubmit() {
  error.value = null
  loadingStore.show()
  const { data, error: loginError } = await createData('/user/login', {
    account: email.value,
    password: password.value
  })

  if (loginError) {
    // eslint-disable-next-line no-console
    console.error('Login Error:', loginError)
    error.value = '登入失敗，請稍後再試。'
    return
  }

  if (data && data.token) {
    // eslint-disable-next-line no-console
    console.log('data', data)
    await authProfileStore.setUserData(data)
    await userStore.getUserProfile()
    loadingStore.hide()
    router.push('/')
  } else {
    error.value = '登入失敗，請檢查您的用戶名或密碼。'
    loadingStore.hide()
  }
}
onMounted(() => {
  loadingStore.hide()
})
</script>

<style lang="scss" scoped>
.card {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.25rem;
}

.card-header {
  background-color: #343a40;
  color: #ffffff;
}

.card-body {
  background: $gray_2;
  color: #212529;
  padding-left: 8.5rem;
  padding-right: 8.5rem;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}
</style>
