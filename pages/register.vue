<template>
  <q-page class="flex flex-center">
    <q-card class="my-card q-pa-md">
      <q-card-section>
        <div class="text-h6" style="text-align: center;">註冊</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input filled v-model="form.email" label="信箱" type="email" />
          <q-select filled v-model="form.gender" :options="genderOptions" label="性別" emit-value map-options />
          <q-input filled v-model="form.phone" label="手機" mask="####-###-###" />
          <q-input filled v-model="form.nickname" label="暱稱" />
          <q-input filled v-model="form.address" label="地址" type="textarea" />
          <q-input filled v-model="form.password" label="密碼" type="password" />
          <q-btn label="註冊" type="submit" color="primary" class="full-width" />
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
import { useApi } from '@/composables/useApi'; // Ensure path is correct to your useApi

interface RegisterForm {
  email: string;
  gender: string;
  phone: string;
  nickname: string;
  address: string;
  password: string;
  role: string;
}

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { createData } = useApi();

    const form = ref<RegisterForm>({
      email: '',
      gender: '',
      phone: '',
      nickname: '',
      address: '',
      password: '',
      role: "fan"
    });

    const genderOptions = [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '不透露', value: 'unspecified' },
    ];

    const error = ref<string | null>(null);

    async function onSubmit() {
      error.value = null;
      try {
        const { data, error: apiError } = await createData<RegisterForm>('user/register', form.value);

        if (apiError) {
          throw new Error(apiError);
        }

        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: '註冊成功!',
        });

        // Optionally store the token if your API returns one upon registration
        if (data && data['authToken']) {
          localStorage.setItem('authToken', data['authToken']);
        }

        // Redirect after registration
        router.push('/login');
      } catch (err: any) {
        console.error('Registration Error:', err);
        error.value = '註冊過程中出現錯誤。';
        $q.notify({
          color: 'negative',
          position: 'top',
          message: '註冊失敗，請稍後再試。',
          icon: 'report_problem',
        });
      }
    }

    return { form, genderOptions, onSubmit, error };
  },
});
definePageMeta({
  layout: 'template-base-layout',
});
</script>

<style>
.my-card {
  width: 90%;
  max-width: 400px;
}
</style>
