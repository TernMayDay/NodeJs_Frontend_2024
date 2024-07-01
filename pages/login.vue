<template>
  <div class="container d-flex justify-content-center align-items-center px-14 my-14">
    <div class="col-md-6">
      <h2 class="flex justify-center">登入</h2>
      <div class="card">
        <div class="card-body px-14 py-10 rounded">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="username" class="form-label">信箱</label>
              <input type="text" id="username" v-model="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密碼</label>
              <input type="password" id="password" v-model="password" class="form-control" />
            </div>
            <!-- <button type="submit" class="btn login-btn text-btn1 w-100">忘記密碼</button> -->
            <div class="flex flex-center">
              <button type="submit" class="btn login-btn text-btn1 w-50 flex justify-center">登入</button>
            </div>
            <!-- <button type="submit" class="btn login-btn text-btn1 w-100">註冊</button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  background-color: #ffffff;
  color: #212529;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'
import { useAuthProfileStore } from '~/stores/AuthProfile'

const router = useRouter()
const { createData } = useApi()
const authProfileStore = useAuthProfileStore()
const email = ref('')
const password = ref('')
const error = ref(null)

async function onSubmit() {
  error.value = null

  const { data, error: loginError } = await createData('/user/login', {
    email: email.value,
    password: password.value
  })

  if (loginError) {
    console.error('Login Error:', loginError)
    error.value = '登入失敗，請稍後再試。'
    return
  }

  if (data && data.token) {
    authProfileStore.setUserData(data)
    router.push('/')
  } else {
    error.value = '登入失敗，請檢查您的用戶名或密碼。'
  }
}
</script>
