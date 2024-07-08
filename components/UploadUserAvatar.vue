<script setup>
const imageStore = useImageStore()
const userStore = useUserStore()
const authProfileStore = useAuthProfileStore()
const { profile } = storeToRefs(authProfileStore)

const { errors } = useForm()
const isFormSending = ref(false)

/**
 * 上傳圖片
 * @param event 上傳事件
 */
const upload = async (event) => {
  isFormSending.value = true
  const file = event.target.files[0]
  const { uploadfile: errMsg } = errors.value

  if (errMsg || !file) {
    handleUploadResult('error', errMsg?.replace('uploadfile ', '圖片上傳'))
  } else {
    const imgData = new FormData()
    imgData.append('file', file)
    const result = await imageStore.uploadImage(imgData)

    if (result) {
      await userStore.editUserProfile({ photo: result.fileLocation })
      handleUploadResult('success')
    } else {
      handleUploadResult('error', '圖片上傳時發生異常，請重新上傳')
    }
  }
}

/**
 * 處理上傳結果
 * @param { 'success' | 'error' } state 同 Swal icon
 * @param text 訊息
 */
const handleUploadResult = (state, text) => {
  isFormSending.value = false
  setSwalFire({
    stype: state === 'success' ? 'toast' : 'popup',
    icon: state,
    title: `圖片上傳${state === 'success' ? '成功' : '失敗'}`,
    text
  })
}
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="position-relative my-5 my-4-md-1 user-avatar">
      <div class="dots"></div>
      <div class="dots dots-gray5"></div>
      <div class="dots dots-secondary"></div>
      <div class="border border-2 border-gray4 w-100 h-100 rounded-circle">
        <img :src="profile.photo" :alt="profile.nickname" class="object-fit" v-if="profile" />
      </div>
      <div
        v-if="isFormSending"
        class="rounded-circle w-100 h-100 position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      >
        <div class="d-flex justify-content-center align-items-center text-white gap-1">
          <div
            class="spinner-border ms-auto spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></div>
          <span class="text-s2">Loading...</span>
        </div>
      </div>
      <div class="upload-file-icon position-absolute">
        <label class="btn live-btn p-0" :class="{ disabled: isFormSending }">
          <div class="icon icon-add-outline icon-size-sm"></div>
          <VeeField
            name="uploadfile"
            class="form-control d-none"
            as="input"
            type="file"
            accept="image/*"
            rules="required|image|size:1024"
            :disabled="isFormSending"
            @change="upload"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$dots-base-width: 7px;
$dots-gray5-width: 4px;
$dots-secondary-width: 8px;
$add-btn-width: 24px;

.user-avatar {
  width: rem(96px);
  height: rem(96px);

  @include media-breakpoint-up(md) {
    width: rem(120px);
    height: rem(120px);
  }

  img {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }

  .live-btn {
    width: rem($add-btn-width);
    height: rem($add-btn-width);
    background: $gray_4;
    cursor: pointer;

    &:hover::before {
      width: rem($add-btn-width);
      height: rem($add-btn-width);
    }
  }

  // 圓點
  .dots {
    position: absolute;
    bottom: rem(4.49px);
    left: rem(3.5px);
    width: rem($dots-base-width);
    height: rem($dots-base-width);
    border-radius: 50%;
    background: $primary_gradient;

    &.dots-gray5 {
      background: $gray_5;
      width: rem($dots-gray5-width);
      height: rem($dots-gray5-width);
      bottom: rem(24.7px);
      left: rem(-9.91px);
    }

    &.dots-secondary {
      background: $secondary;
      width: rem($dots-secondary-width);
      height: rem($dots-secondary-width);
      top: rem(16px);
      right: rem(-13px);
      bottom: unset;
      left: unset;
    }
  }

  // 上傳 icon
  .upload-file-icon {
    bottom: 0;
    left: rem(78px);

    @include media-breakpoint-up(md) {
      left: rem(88px);
    }
  }
}
</style>
