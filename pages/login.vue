<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card>
          <q-card-section>
            <div class="text-h6">登入</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="onSubmit">
              <q-input filled v-model="email" label="Email" />
              <q-input filled v-model="password" label="密碼" type="password" />
              <q-btn label="登入" type="submit" color="primary" />
            </q-form>
          </q-card-section>
          <q-card-section v-if="error" class="text-negative">
            {{ error }}
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'quasar-layout'
})
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useApi } from '~/composables/useApi'

// Define the structure of the user data and the login response

interface LoginResponse {
  token: string
  data: {
    user: {
      _id: string
      email: string
      gender: string
      phone: string
      nickname: string
      address: string
    }
  }
}

const $q = useQuasar()
const router = useRouter()
const { createData } = useApi()
const email = ref<string>('')
const password = ref<string>('')
const error = ref<string | null>(null)

async function onSubmit() {
  error.value = null

  // Specify the expected data structure using the LoginResponse interface
  const { data, error: loginError } = await createData<LoginResponse>('user/login', {
    email: email.value,
    password: password.value
  })

  if (loginError) {
    console.error('Login Error:', loginError)
    $q.notify({
      color: 'negative',
      position: 'top',
      message: '登入失敗，請稍後再試。',
      icon: 'report_problem'
    })
    error.value = '登入失敗，請稍後再試。'
    return
  }
  console.log(data)
  if (data && data.token) {
    localStorage.setItem('authToken', data.token)

    // Save the user details in local storage
    if (data.data && data.data.user) {
      localStorage.setItem('userData', JSON.stringify(data.data.user))
      localStorage.setItem('userId', data.data.user._id)
    }

    router.push('/')
  } else {
    error.value = '登入失敗，請檢查您的用戶名或密碼。'
    $q.notify({
      color: 'negative',
      position: 'top',
      message: '登入失敗，請檢查您的用戶名或密碼。',
      icon: 'report_problem'
    })
  }
}
</script>
