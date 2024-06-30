<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> MyApp </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title> Footer </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<!-- <script setup>
import { ref } from 'vue';
const drawerOpen = ref(false);
</script> -->
