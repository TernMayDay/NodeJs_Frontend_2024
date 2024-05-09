<script lang="ts" setup>
const { data } = await useFetch('/api/guidelines')
</script>

<template>
  <div class="container">
    <!-- Color -->
    <div class="row pb-4">
      <div class="col-12">
        <h2>
          <span>01</span>
          <span class="text-color-primary">COLOR</span>
        </h2>
      </div>
      <div class="col-4 mb-3">
        <div class="color-box color-primary"></div>
        <div class="color-detail">
          <span>Primary</span>
          <span>/ #00FFA3 ~ #00Efff</span>
        </div>
      </div>
      <div class="col-4 mb-3">
        <div class="color-box color-secondary"></div>
        <div class="color-detail">
          <span>Secondary</span>
          <span>/ #FC6A00</span>
        </div>
      </div>
      <div class="col-4 mb-3">
        <div class="color-box color-gary1"></div>
        <div class="color-detail">
          <span>Gary1</span>
          <span>/ #050505</span>
        </div>
      </div>
      <div class="col-4 mb-3 offset-8">
        <div class="color-box color-gary2"></div>
        <div class="color-detail">
          <span>Gary2</span>
          <span>/ #1E1E1E</span>
        </div>
      </div>
      <div class="col-4 mb-3 offset-8">
        <div class="color-box color-gary3"></div>
        <div class="color-detail">
          <span>Gary3</span>
          <span>/ #282828</span>
        </div>
      </div>
      <div class="col-4 mb-3 offset-8">
        <div class="color-box color-gary4"></div>
        <div class="color-detail">
          <span>Gary4</span>
          <span>/ #373737</span>
        </div>
      </div>
      <div class="col-4 mb-3 offset-8">
        <div class="color-box color-gary5"></div>
        <div class="color-detail">
          <span>Gary5</span>
          <span>/ #848484</span>
        </div>
      </div>
    </div>
    <hr class="text-color-white pb-4" />
    <!-- Font-1 -->
    <div class="row mb-4">
      <div class="col-12 pb-4">
        <h2 class="mb-4">
          <span>02</span>
          <span class="text-color-primary">TYPOGRAPHY</span>
        </h2>
        <p class="text-s1 text-color-white">Font 1 / <span class="text-h3">Noto Sans TC</span></p>
      </div>
      <div class="col-12">
        <table class="table align-middle font-table">
          <thead>
            <tr class="text-s1">
              <th scope="col" width="45%">Name / Sample</th>
              <th scope="col" class="text-center">Weight</th>
              <th scope="col" class="text-center">Size</th>
              <th scope="col" class="text-center">Line height</th>
              <th scope="col" class="text-center">Letter spacing</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data?.fontData" :key="item.name">
              <th scope="row">
                <span :class="item.class">{{ item.name }}</span>
              </th>
              <th class="text-center">{{ item.weight }}</th>
              <th class="text-center">{{ item.size }}</th>
              <th class="text-center">{{ item.lineHeight }}</th>
              <th class="text-center">{{ item.letterSpacing }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Font-2 -->
    <div class="row pb-4">
      <div class="col-12">
        <p class="text-s1 text-color-white">
          Font 2 / <span class="text-h3">Roboto Condensed Italic</span>
        </p>
      </div>
      <div class="col-12">
        <table class="table align-middle font-table">
          <thead class="color-gary4">
            <tr class="text-s1">
              <th scope="col" width="45%">Name / Sample</th>
              <th scope="col" class="text-center">Weight</th>
              <th scope="col" class="text-center">Size</th>
              <th scope="col" class="text-center">Line height</th>
              <th scope="col" class="text-center">Letter spacing</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data?.engData" :key="item.name">
              <th scope="row">
                <span :class="item.class">{{ item.name }}</span>
              </th>
              <th class="text-center">{{ item.weight }}</th>
              <th class="text-center">{{ item.size }}</th>
              <th class="text-center">{{ item.lineHeight }}</th>
              <th class="text-center">{{ item.letterSpacing }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr class="text-color-white pb-4" />
    <!-- Button -->
    <div class="row mb-4">
      <div class="col-12 pb-4">
        <h2 class="mb-4">
          <span>03</span>
          <span class="text-color-primary">BUTTONS</span>
        </h2>
      </div>
      <div class="col-12">
        <table class="table align-middle table-borderless btn-table">
          <thead>
            <tr class="text-s1">
              <th scope="col" width="45%">Basic / Dark bg</th>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <span class="th-name">Default</span>
              </th>
              <th class="text-center">
                <button type="button" class="btn live-btn"><i class="icon-like"></i></button>
              </th>
              <th class="text-center">
                <button type="button" class="btn check-btn text-btn1">
                  <span>立即訂票</span>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn search-btn text-btn1">
                  <i class="icon-search"></i><span>搜尋</span>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn login-btn text-btn1">
                  <span>登入</span>
                </button>
              </th>
            </tr>
            <tr>
              <th scope="row">
                <span class="th-name">Hover</span>
              </th>
              <th class="text-center">
                <button type="button" class="btn live-btn active"><i class="icon-like"></i></button>
              </th>
              <th class="text-center">
                <button type="button" class="btn check-btn active text-btn1">
                  <span>立即訂票</span>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn search-btn active text-btn1">
                  <i class="icon-search"></i><span>搜尋</span>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn login-btn active text-btn1">
                  <span>登入</span>
                </button>
              </th>
            </tr>
            <tr>
              <th scope="row">
                <span class="th-name">Disable</span>
              </th>
              <th class="text-center">
                <button type="button" class="btn live-btn" disabled>
                  <i class="icon-like"></i>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn check-btn text-btn1" disabled>
                  <span>立即訂票</span>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn search-btn text-btn1" disabled>
                  <i class="icon-search"></i><span>搜尋</span>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn login-btn text-btn1" disabled>
                  <span>登入</span>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12">
        <table class="table align-middle table-borderless btn-table">
          <thead>
            <tr class="text-s1">
              <th scope="col" width="45%">Arrow / Card slider</th>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <span class="th-name">Default</span>
              </th>
              <th class="text-center"></th>
              <th class="text-center"></th>
              <th class="text-center">
                <button type="button" class="btn arrow-btn arrow-btn--left text-btn1">
                  <i class="icon-arrow"></i>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn arrow-btn arrow-btn--right text-btn1">
                  <i class="icon-arrow"></i>
                </button>
              </th>
            </tr>
            <tr>
              <th scope="row">
                <span class="th-name">Hover</span>
              </th>
              <th class="text-center"></th>
              <th class="text-center"></th>
              <th class="text-center">
                <button type="button" class="btn arrow-btn arrow-btn--left active text-btn1">
                  <i class="icon-arrow"></i>
                </button>
              </th>
              <th class="text-center">
                <button type="button" class="btn arrow-btn arrow-btn--right active text-btn1">
                  <i class="icon-arrow"></i>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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

thead > tr,
tbody > tr {
  line-height: rem(62px);
}

thead > tr > th {
  background: $gray_4;
  color: white;
}

tbody > tr > th {
  background-color: transparent;
  color: white;
}

.font-table tbody > tr {
  &:hover {
    & > th {
      background-color: $gray_3;
      color: $gray_5;
    }
  }
}

.btn-table thead > tr > th {
  background: transparent;
  color: white;
}

.btn-table tbody > tr {
  background-color: #151515;
}

.th-name {
  color: #717171;
  @include font(1, $text-weight-regular, $s1-font-size, 1.5, 1);
}
</style>
