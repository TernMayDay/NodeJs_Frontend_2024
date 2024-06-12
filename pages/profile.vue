<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card>
          <q-card-section>
            <div class="text-h6">Edit Profile</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit.prevent="updateProfile">
              <q-input v-model="profile.email" filled label="Email" type="email" />
              <q-input v-model="profile.gender" filled label="Gender" />
              <q-input v-model="profile.phone" filled label="Phone" />
              <q-input v-model="profile.nickname" filled label="Nickname" />
              <q-input v-model="profile.address" filled label="Address" />
              <q-input v-model="profile.password" filled label="Password" type="password" />
              <q-btn label="Update Profile" type="submit" color="primary" class="full-width" />
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
import { useQuasar } from 'quasar'
import { useApi } from '~/composables/useApi'

definePageMeta({
  layout: 'quasar-layout'
})

interface Profile {
  email: string
  gender: string
  phone: string
  nickname: string
  address: string
  password: string
}

const $q = useQuasar()
const { updateData } = useApi()
const profile = ref<Profile>({
  email: '',
  gender: '',
  phone: '',
  nickname: '',
  address: '',
  password: ''
})
const error = ref<string | null>(null)

onMounted(() => {
  loadProfile()
})

function loadProfile() {
  const userData = localStorage.getItem('userData')
  if (userData) {
    const user = JSON.parse(userData)
    profile.value.email = user.email || ''
    profile.value.gender = user.gender || ''
    profile.value.phone = user.phone || ''
    profile.value.nickname = user.nickname || ''
    profile.value.address = user.address || ''
    // Do not load the password for security reasons
  }
}

async function updateProfile() {
  const userId = localStorage.getItem('userId')
  const authToken = localStorage.getItem('authToken')

  if (!userId || !authToken) {
    error.value = 'Missing user ID or authentication token.'
    return
  }

  const { data, error: updateError } = await updateData<Profile>(`user/${userId}`, profile.value, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${authToken}` }
  })

  if (updateError) {
    error.value = 'Failed to update profile: ' + updateError
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Profile update failed. Please try again.',
      icon: 'report_problem'
    })
    return
  }

  if (data) {
    $q.notify({
      color: 'positive',
      position: 'top',
      message: 'Profile successfully updated.',
      icon: 'check_circle'
    })
    // Update local storage with new user data
    localStorage.setItem('userData', JSON.stringify(profile.value))
  }
}
</script>
