<script lang="ts" setup></script>

<template>
  <div class="container-fluid bg-guidelines">
    <div class="row">
      <div class="col-12">
        <h2>
          <span>01</span>
          <span class="text-color-primary">COLOR</span>
        </h2>
      </div>
      <div class="col-4">
        <div class="color-box color-primary"></div>
        <div class="color-detail">
          <span>Primary</span>
          <span>/ #00FFA3 ~ #00Efff</span>
        </div>
      </div>
      <div class="col-4">
        <div class="color-box color-secondary"></div>
        <div class="color-detail">
          <span>Secondary</span>
          <span>/ #FC6A00</span>
        </div>
      </div>
      <div class="col-4">
        <div class="color-box color-gary1"></div>
        <div class="color-detail">
          <span>Gary1</span>
          <span>/ #050505</span>
        </div>
      </div>
      <div class="col-4 offset-8">
        <div class="color-box color-gary2"></div>
        <div class="color-detail">
          <span>Gary2</span>
          <span>/ #1E1E1E</span>
        </div>
      </div>
      <div class="col-4 offset-8">
        <div class="color-box color-gary3"></div>
        <div class="color-detail">
          <span>Gary3</span>
          <span>/ #282828</span>
        </div>
      </div>
      <div class="col-4 offset-8">
        <div class="color-box color-gary4"></div>
        <div class="color-detail">
          <span>Gary4</span>
          <span>/ #373737</span>
        </div>
      </div>
      <div class="col-4 offset-8">
        <div class="color-box color-gary5"></div>
        <div class="color-detail">
          <span>Gary5</span>
          <span>/ #848484</span>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<style lang="scss" scoped>
h2 {
  & span:first-child {
    color: white;
    margin-right: 20px;
  }
}
.color-box {
  width: 100%;
  height: 60px;
}

.color-detail {
  & span:first-child {
    color: white;
  }

  & span:last-child {
    margin-left: 10px;
    color: $gray_5;
  }
}
.q-btn {
  background-color: $primary_0;
}
</style>
