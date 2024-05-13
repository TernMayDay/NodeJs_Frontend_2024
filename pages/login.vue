<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">登入</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit">
          <q-input filled v-model="email" label="email" />
          <q-input filled v-model="password" label="密碼" type="password" />
          <q-btn label="登入" type="submit" color="primary" />
        </q-form>
      </q-card-section>
      <q-card-section v-if="error" class="text-negative">
        {{ error }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useApi } from '~/composables/useApi';

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { createData } = useApi();
    const email = ref<string>('');
    const password = ref<string>('');
    const error = ref<string | null>(null);

    async function onSubmit() {
      error.value = null;

      const { data, error: loginError } = await createData<{ token: string }>('user/login', {
        email: email.value,
        password: password.value,
      });

      if (loginError) {
        console.error('Login Error:', loginError);
        $q.notify({
          color: 'negative',
          position: 'top',
          message: '登入失敗，請稍後再試。',
          icon: 'report_problem',
        });
        error.value = loginError;
        return;
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        router.push('/');
      } else {
        error.value = '登入失敗，請檢查您的用戶名或密碼。';
        $q.notify({
          color: 'negative',
          position: 'top',
          message: '登入失敗，請檢查您的用戶名或密碼。',
          icon: 'report_problem',
        });
      }
    }

    return { email, password, onSubmit, error };
  }
});
definePageMeta({
  layout: 'template-base-layout',
});
</script>

<style></style>
