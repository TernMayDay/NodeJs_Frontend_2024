<script setup>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const ckeditor = defineComponent(CKEditor.component)

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ editorData: '' })
  }
})

const editorData = ref(props.modelValue.editorData)
const editorConfig = {
  ckfinder: {
    uploadUrl: '/'
  },
  placeholder: 'type the content here'
}

watch(editorData, (newVal) => {
  emit('update:modelValue', { editorData: newVal })
})

// validate editor
const editorError = ref(false)
const validateEditorData = () => {
  if (!editorData.value || editorData.value.trim() === '') {
    editorError.value = true
  } else {
    editorError.value = false
  }
}
</script>

<template>
  <div class="event-intro">
    <ckeditor
      v-model="editorData"
      name="賽事介紹"
      :editor="ClassicEditor"
      :config="editorConfig"
      @blur="validateEditorData"
    ></ckeditor>
    <span v-if="!editorData" class="text-s1 error-message" name="賽事介紹"
      >賽事介紹 內容需要填寫</span
    >
  </div>
</template>

<style lang="scss">
/* CKEditor 編輯區塊  */
.event-intro .ck-editor__editable {
  min-height: 500px;
}

.event-intro .error-message {
  color: $secondary;
}
</style>
