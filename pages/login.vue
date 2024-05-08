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
  layout: 'template/base-layout',  
 
  setup() {
    const username = ref('');
    const password = ref('');

    function onSubmit() {
      console.log('Username:', username.value, 'Password:', password.value);
    }

    return { username, password, onSubmit };
  }
});
</script>

<style>
</style>
