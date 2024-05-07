<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">登入</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input filled v-model="username" label="用戶名" />
          <q-input filled v-model="password" label="密碼" type="password" />
          <q-btn label="登入" type="submit" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  layout: 'template/base-layout', // 注意小写和文件名一致性
  setup() {
    const username = ref('');
    const password = ref('');

    function onSubmit() {
      console.log('Username:', username.value, 'Password:', password.value);
      // 在此處理登入邏輯
    }

    return { username, password, onSubmit };
  }
});
</script>

<style>
/* 在此添加 CSS 樣式 */
</style>
