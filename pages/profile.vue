<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Profile</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="updateProfile">
          <q-input filled v-model="profile.phone" label="Phone" />
          <q-input filled v-model="profile.nickname" label="Nickname" />
          <q-input filled v-model="profile.address" label="Address" />
          <q-input bg-color="white" filled v-model="profile.password" label="Password" type="password"
            :rules="[passwordLengthRule]" lazy-rules />
          <q-btn label="Update Profile" type="submit" color="primary" class="full-width" />
        </q-form>
      </q-card-section>
      <q-card-section v-if="error" class="text-negative">
        {{ error }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';

interface Profile {
  email: string;
  gender: string;
  phone: string;
  nickname: string;
  address: string;
  password: string;
}

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const { updateData } = useApi();
    const router = useRouter();
    const profile = ref<Profile>({
      email: '',
      gender: '',
      phone: '',
      nickname: '',
      address: '',
      password: '',
    });
    const error = ref<string | null>(null);

    const passwordLengthRule = computed(() => {
      return (val: string) => val.length >= 8 || 'Password must be at least 8 characters long';
    });

    onMounted(() => {
      loadProfile();
    });

    function loadProfile() {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        profile.value.email = user.email || '';
        profile.value.gender = user.gender || '';
        profile.value.phone = user.phone || '';
        profile.value.nickname = user.nickname || '';
        profile.value.address = user.address || '';
        // Do not load the password for security reasons
      }
    }

    async function updateProfile() {
      const userId = localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');

      if (!userId || !authToken) {
        error.value = "Missing user ID or authentication token.";
        return;
      }

      // Create a new object with only filled fields
      const filteredProfile = Object.fromEntries(
        Object.entries(profile.value).filter(([_, value]) => value !== '' && value !== null)
      );

      const { data, error: updateError } = await updateData<Profile>(`user/${userId}`, filteredProfile, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (updateError) {
        error.value = "Failed to update profile: " + updateError;
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Profile update failed. Please try again.',
          icon: 'report_problem',
        });
        return;
      }

      if (data) {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Profile successfully updated.',
          icon: 'check_circle',
        });
        // Update local storage with new user data
        localStorage.setItem('userData', JSON.stringify(profile.value));
        router.push('/');
      }
    }

    return { profile, error, updateProfile, passwordLengthRule };
  }
});
definePageMeta({
  layout: 'template-base-layout',
  middleware: 'auth', // 指定使用auth middleware
});
</script>

<style scoped></style>
