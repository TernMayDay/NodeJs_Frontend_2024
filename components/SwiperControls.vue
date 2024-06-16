<script setup>
const swiper = useSwiper()

defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  emit('update:modelValue', swiper)
})
</script>
<style scoped></style>
