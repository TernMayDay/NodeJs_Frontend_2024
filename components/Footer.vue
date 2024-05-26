<script setup>
const tagStore = useTagStore()

/* 取得 top20 熱門標籤 */
await tagStore.getTags('hot', 20)
</script>

<template>
  <div class="border-top">
    <div class="container-xl">
      <div class="d-grid d-xl-flex align-items-start gap-5 gap-xl-13 py-5 py-xl-11">
        <NuxtLink class="navbar-brand" to="/">
          <img src="~images/logo.svg" alt="SportsPass LOGO" class="logo" />
        </NuxtLink>
        <ul class="list-group list-group-flush gap-3 gap-xl-4 w-100">
          <li class="list-group-item py-0">
            <h1 class="text-h4 mb-3 mb-xl-4">熱門推薦</h1>
          </li>
          <li class="list-group-item py-0">
            <TagBtns :tags="tagStore.top20Tags" />
          </li>
        </ul>
      </div>
      <span class="text-s2 d-block text-center text-xl-end mb-5 mb-xl-4-1 text-gray5">
        © 2024 SportsPass 運動售票. All Rights
        Reserved｜資料、圖片、來源皆來自網路，僅用來做為學習用途
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: 30px;

  @include media-breakpoint-up(xl) {
    height: 40px;
  }
}
</style>
