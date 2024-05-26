const navbarCollapse = ref(null)

export const useNavbarCollapse = () => {
  return useState('navbarCollapse', () => navbarCollapse.value)
}

export const useCreateNavbarCollapse = (currentRef: any) => {
  const { $bootstrap } = useNuxtApp()
  if (currentRef.value) {
    navbarCollapse.value = $bootstrap.collapse(currentRef.value, {
      toggle: false
    })
  }
  return navbarCollapse
}
