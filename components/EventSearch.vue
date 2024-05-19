<script lang="ts" setup></script>

<template>
  <div class="input-container">
    <input
      class="form-control"
      type="search"
      placeholder="搜尋運動項目、賽事名稱"
      aria-label="Search"
    />
    <button type="button" class="btn btn-link text-btn1">
      <div class="icon icon-search"></div>
    </button>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  position: relative;

  .form-control {
    padding-right: 2.75rem;
    width: 270px;
    height: 40px;
    font-size: 0.875rem;
  }

  // 右側按鈕
  button {
    display: flex;
    align-content: center;
    position: absolute;
    top: 50%;
    right: $input-padding-x;
    transform: translateY(-50%);
  }
}
</style>
