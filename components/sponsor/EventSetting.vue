<script setup>
import VueMultiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const imageStore = useImageStore()
const tagStore = useTagStore()
const { createdTag, getTagAll } = tagStore
const { uploadImage } = imageStore
const categoryStore = useCategoryStore()

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
        type: String,
        default: ''
      },
      categorysNameTC: {
        type: String,
        default: ''
      },
      coverPic: {
        type: Object,
        default: () => {}
      },
      tags: {
        type: Array,
        default: () => []
      },
      tagOptions: {
        type: Array,
        default: () => []
      },
      smallBanner: {
        type: String,
        default: ''
      },
      releaseDate: {
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
  // console.log('formData =>', formData.value)
}

// 上傳圖片
const handleFileChange = async (propsName, event) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0]
    const imgData = new FormData()
    imgData.append('file', file)
    try {
      const result = await uploadImage(imgData)
      updateField(propsName, result.fileLocation)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`${propsName}：`, error)
    }
  }
}

// 取得所有 tag
const { refresh: tagListRefresh } = await useAsyncData('tags', async () => {
  const tagData = await getTagAll()
  formData.value.tagOptions = tagData
  emit('update:modelValue', formData.value)
  return tagData
})

// 新增 tag
const addTag = async (newTag) => {
  const tagData = await createdTag(newTag)
  formData.value.tags.push({ ...tagData })
  formData.value.tagOptions.push({ ...tagData })
  emit('update:modelValue', formData.value)

  // 刷新 tag
  tagListRefresh()
}

// 取得所有 categories
const { data: categoriesList } = await useAsyncData('categories', async () => {
  return await categoryStore.getCategoriesAll()
})

// 更新 顯示的日期
const staticDate = ref({
  eventDate: '請輸入日期',
  releaseDate: '請輸入上架日期'
})
const isOpen = ref(false)

const toggleDatePicker = () => {
  isOpen.value = !isOpen.value
}

const formatDateRange = (dateValue) => {
  if (!dateValue || dateValue.length !== 2) {
    return `${format(new Date(dateValue), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })}`
  } else {
    const [start, end] = dateValue
    return `${format(new Date(start), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })} ~ ${format(new Date(end), 'yyyy/MM/dd (EEE) HH:mm', { locale: zhTW })}`
  }
}

const updateDate = (fieldName, dateValue) => {
  updateField(fieldName, dateValue) // 更新至 props
  staticDate.value[fieldName] = formatDateRange(dateValue)
}

const clearDate = (fieldName, msg) => {
  formData.value[fieldName] = ''
  staticDate.value[fieldName] = msg
  emit('update:modelValue', formData.value)
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
        <VueDatePicker
          v-model="formData.eventDate"
          dark
          range
          date-style
          :is-open="isOpen"
          @focusout="isOpen = false"
          @cleared="clearDate('eventDate', '請輸入日期')"
          @update:model-value="(value) => updateDate('eventDate', value)"
        >
          <template #dp-input="{ onBlur, onKeypress, onPaste }">
            <VeeField
              id="eventDate"
              v-model="staticDate.eventDate"
              class="form-control"
              name="日期"
              as="input"
              type="text"
              :rules="'required'"
              @focus="toggleDatePicker"
              @blur="onBlur"
              @keypress="onKeypress"
              @paste="onPaste"
            />
          </template>
        </VueDatePicker>
        <VeeErrorMessage class="text-s1 error-message" name="日期" />
      </div>

      <!-- 上傳 賽事列表-列表圖 -->
      <div class="col-6 mb-3 position-relative">
        <label class="form-label text-s1 text-color-gary5" for="eventPic">賽事列表-列表圖</label>
        <VeeField
          id="eventPic"
          v-model="formData.eventPic"
          class="form-control form-upload--icon"
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
        <label class="form-label text-s1 text-color-gary5" for="categorysNameTC">分類</label>
        <VeeField
          id="categorysNameTC"
          v-model="formData.categorysNameTC"
          class="form-select"
          name="分類"
          as="select"
          :rules="'required'"
          @update:model-value="updateField('categorysNameTC', $event)"
        >
          <option value="" select disabled>请選擇一個分類</option>
          <option
            v-for="categories in categoriesList"
            :key="categories._id"
            :value="categories.nameTC"
          >
            {{ categories.nameTC }}
          </option>
        </VeeField>
        <VeeErrorMessage class="text-s1 error-message" name="分類" />
      </div>

      <!-- 上傳 詳細賽事-宣傳大圖 -->
      <div class="col-6 mb-3 position-relative">
        <label class="form-label text-s1 text-color-gary5" for="eventPic">詳細賽事-宣傳大圖</label>
        <VeeField
          id="eventPic"
          v-model="formData.coverPic"
          class="form-control form-upload--icon"
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
        <label class="form-label text-s1 text-color-gary5" for="tags">Tag設定</label>
        <VueMultiselect
          id="tags"
          v-model="formData.tags"
          name="Tag設定"
          :options="formData.tagOptions"
          select-label="加入 tag"
          deselect-label="移除 tag"
          selected-label="已選擇"
          :multiple="true"
          :taggable="true"
          class="form-select--tag"
          tag-placeholder="新增 tag"
          placeholder="輸入搜尋或新增tag"
          label="name"
          track-by="_id"
          :rules="'required'"
          @tag="addTag"
          @update:model-value="updateField('tags', $event)"
        />
        <VeeErrorMessage class="text-s1 error-message" name="Tag設定" />
      </div>

      <!-- 上傳 購買頁面-宣傳小圖 -->
      <div class="col-6 position-relative">
        <label class="form-label text-s1 text-color-gary5" for="eventPic">購買頁面-宣傳小圖</label>
        <VeeField
          id="smallBanner"
          v-model="formData.smallBanner"
          class="form-control form-upload--icon"
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
        <VueDatePicker
          v-model="formData.releaseDate"
          dark
          single
          date-style
          :is-open="isOpen"
          @focusout="isOpen = false"
          @cleared="clearDate('releaseDate', '請輸入上架日期')"
          @update:model-value="(dateValue) => updateDate('releaseDate', dateValue)"
        >
          <template #dp-input="{ onBlur, onKeypress, onPaste }">
            <VeeField
              id="releaseDate"
              v-model="staticDate.releaseDate"
              class="form-control"
              name="上架日期"
              as="input"
              type="text"
              :rules="'required'"
              @focus="toggleDatePicker"
              @blur="onBlur"
              @keypress="onKeypress"
              @paste="onPaste"
            />
          </template>
        </VueDatePicker>
        <VeeErrorMessage class="text-s1 error-message" name="上架日期" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.event-setting {
  & .date-style {
    height: 48px;
    background-color: $gray_1;
    border: 1px solid $gray_1;
    color: white;
    line-height: 2;
  }
  & .form-select {
    background-color: $gray_1;
    border: 1px solid $gray_4;
    color: white;
    height: 48px;
    background: $gray_1
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z'/%3E%3C/svg%3E")
      no-repeat right 0.5rem center;
  }

  & .form-control {
    background-color: $gray_1;
    border: 1px solid $gray_4;
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

  .form-upload--icon {
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
  .form-date--icon {
    &:after {
      content: '';
      display: inline-flex;
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 18px;
      height: 18px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%2300ffa3' d='M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z'/%3E%3Cpath fill='%2300ffa3' d='M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5'/%3E%3C/svg%3E");
    }
  }

  // tag
  .form-select--tag {
    &.multiselect {
      color: white;
    }
    & .multiselect__tags {
      display: inline-block;
      align-items: center;
      width: 100%;
      background: $gray_1;
      align-items: center;
      border: 1px solid $gray_4;
      min-height: 48px;
      padding: 12px 40px 10px 12px;

      // padding-top: 8px;
      // padding-bottom: 8px;
      background: $gray_1
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z'/%3E%3C/svg%3E")
        no-repeat right 0.5rem top center;
    }

    & .multiselect__tag {
      margin-bottom: 0px;
    }
    & .multiselect__select {
      display: none;
      height: 48px;
    }

    & .multiselect__input {
      // min-height: 40px;
      line-height: 48px;
      background: $gray_1;
      padding: 0;
      margin: 0;
      color: white;
      @include font(1, $text-weight-regular, $font-size-base, 1.5, 2);
      &::placeholder {
        color: white;
      }
    }

    & .multiselect__placeholder {
      margin: auto 0;
      color: white;
      @include font(1, $text-weight-regular, $font-size-base, 1.5, 2);
    }

    // 展開
    & .multiselect__content-wrapper {
      background: $gray_3;
      border: 1px solid $gray_4;
      color: white;
    }
    // highlight
    // & .multiselect__option--highlight {
    // }
  }
}

// .form-upload--icon {
//   &:after {
//     content: '';
//     display: inline-flex;
//     position: absolute;
//     right: 10px;
//     top: 0;
//     bottom: 0;
//     margin: auto;
//     width: 20px;
//     height: 20px;
//     background-repeat: no-repeat;
//     background-size: 100% 100%;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%2300ffa3' stroke-linecap='round' stroke-width='1.5'%3E%3Cpath d='M17 9.002c2.175.012 3.353.109 4.121.877C22 10.758 22 12.172 22 15v1c0 2.829 0 4.243-.879 5.122C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.878C2 20.242 2 18.829 2 16v-1c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877'/%3E%3Cpath stroke-linejoin='round' d='M12 15V2m0 0l3 3.5M12 2L9 5.5'/%3E%3C/g%3E%3C/svg%3E");
//   }
// }
// .form-date--icon {
//   &:after {
//     content: '';
//     display: inline-flex;
//     position: absolute;
//     right: 10px;
//     top: 0;
//     bottom: 0;
//     margin: auto;
//     width: 18px;
//     height: 18px;
//     background-repeat: no-repeat;
//     background-size: 100% 100%;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%2300ffa3' d='M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z'/%3E%3Cpath fill='%2300ffa3' d='M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5'/%3E%3C/svg%3E");
//   }
// }
</style>
