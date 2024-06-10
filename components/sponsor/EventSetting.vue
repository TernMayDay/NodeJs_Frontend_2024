<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      eventName: {
        type: String,
        default: ''
      },
      eventDate: {
        type: Array,
        default: () => []
      },
      eventPic: {
        type: Object,
        default: () => {
          return {}
        }
      },
      category: {
        type: String,
        default: ''
      },
      coverPic: {
        type: Object,
        default: () => {}
      },
      tag: {
        type: String,
        default: ''
      }
    })
  }
})

const formData = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const updateField = (propsName, value) => {
  emit('update:modelValue', { ...props.modelValue, [propsName]: value })
}

const handleFileChange = (propsName, event) => {
  const file = event.target.files[0]
  updateField(propsName, file)
}
</script>

<template>
  <div class="event-setting">
    <div class="row">
      <!-- 賽事名稱 Input -->
      <div class="col-12 mb-3">
        <label class="form-label text-s1 text-color-gary5" for="eventName">賽事名稱</label>
        <VeeField
          id="eventName"
          v-model="formData.eventName"
          placeholder="請輸入賽事名稱"
          class="form-control"
          name="賽事名稱"
          as="input"
          :rules="'required'"
          @update:model-value="updateField('eventName', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="賽事名稱" />
      </div>

      <!-- 日期 Data -->
      <div class="col-12 mb-3">
        <label class="form-label text-s1 text-color-gary5" for="eventDate">日期</label>
        <VeeField
          id="eventDate"
          v-model="formData.eventDate"
          class="form-control"
          name="日期"
          as="input"
          type="date"
          :rules="'required'"
          @update:model-value="updateField('eventDate', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="日期" />
      </div>

      <!-- 上傳 賽事列表-列表圖 -->
      <div class="col-6 mb-3 position-relative">
        <label class="form-label text-s1 text-color-gary5" for="eventPic">賽事列表-列表圖</label>
        <VeeField
          id="eventPic"
          v-model="formData.eventPic"
          class="form-control form-upload"
          name="上傳列表圖"
          as="input"
          type="file"
          :rules="'required|image|size:2048'"
          @change="handleFileChange('eventPic', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="上傳列表圖" />
      </div>

      <!-- 分類 -->
      <div class="col-6 mb-3">
        <label class="form-label text-s1 text-color-gary5" for="category">分類</label>
        <VeeField
          id="category"
          v-model="formData.category"
          class="form-select"
          name="分類"
          as="select"
          :rules="'required'"
          @update:model-value="updateField('category', $event)"
        >
          <option value="">请選擇一個分類</option>
          <option value="option1">羽球</option>
          <option value="option2">籃球</option>
        </VeeField>
        <VeeErrorMessage class="text-s1 error-message" name="分類" />
      </div>

      <!-- 上傳 詳細賽事-宣傳大圖 -->
      <div class="col-6 mb-3 position-relative">
        <label class="form-label text-s1 text-color-gary5" for="eventPic">詳細賽事-宣傳大圖</label>
        <VeeField
          id="eventPic"
          v-model="formData.coverPic"
          class="form-control form-upload"
          name="上傳宣傳大圖"
          as="input"
          type="file"
          :rules="'required|image|size:2048'"
          @change="handleFileChange('coverPic', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="上傳宣傳大圖" />
      </div>

      <!-- Tag設定 -->
      <div class="col-6 mb-3">
        <label class="form-label text-s1 text-color-gary5" for="tag">Tag設定</label>
        <VeeField
          id="tag"
          v-model="formData.tag"
          class="form-select"
          name="Tag設定"
          as="select"
          :rules="'required'"
          @update:model-value="updateField('tag', $event)"
        >
          <option value="">请選擇一個Tag設定</option>
          <option value="option1">戴資穎</option>
          <option value="option2">李洋</option>
          <option value="option3">籃球</option>
        </VeeField>
        <VeeErrorMessage class="text-s1 error-message" name="Tag設定" />
      </div>

      <!-- 上傳 購買頁面-宣傳小圖 -->
      <div class="col-6 position-relative">
        <label class="form-label text-s1 text-color-gary5" for="eventPic">購買頁面-宣傳小圖</label>
        <VeeField
          id="smallBanner"
          v-model="formData.smallBanner"
          class="form-control form-upload"
          name="上傳宣傳小圖"
          as="input"
          type="file"
          :rules="'required|image|size:2048'"
          @change="handleFileChange('smallBanner', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="上傳宣傳小圖" />
      </div>

      <!-- 上架日期 -->
      <div class="col-6">
        <label class="form-label text-s1 text-color-gary5" for="releaseDate">上架日期</label>
        <VeeField
          id="releaseDate"
          v-model="formData.releaseDate"
          class="form-control"
          name="上架日期"
          as="input"
          type="date"
          :rules="'required'"
          @update:model-value="updateField('releaseDate', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="上架日期" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.event-setting {
  & .form-select {
    background-color: $gray_1;
    border: 1px solid $gray_1;
    color: white;
    height: 48px;
    background: $gray_1
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z'/%3E%3C/svg%3E")
      no-repeat right 0.5rem center;
  }

  & .form-control {
    background-color: $gray_1;
    border: 1px solid $gray_1;
    color: white;
    height: 48px;
    line-height: 2;
    position: relative;

    &:focus {
      border-color: none;
      box-shadow: none;
    }
    &::placeholder {
      color: white;
    }
    // 自定义文件上传按钮的样式
    &::file-selector-button {
      display: none;
    }
  }

  .error-message {
    color: $secondary;
  }
}
.form-upload {
  &:after {
    content: '';
    display: inline-flex;
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%2300ffa3' stroke-linecap='round' stroke-width='1.5'%3E%3Cpath d='M17 9.002c2.175.012 3.353.109 4.121.877C22 10.758 22 12.172 22 15v1c0 2.829 0 4.243-.879 5.122C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.878C2 20.242 2 18.829 2 16v-1c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877'/%3E%3Cpath stroke-linejoin='round' d='M12 15V2m0 0l3 3.5M12 2L9 5.5'/%3E%3C/g%3E%3C/svg%3E");
  }
}
</style>
