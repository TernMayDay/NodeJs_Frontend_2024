import { useAuthProfileStore } from '~/stores/AuthProfile'

export function useAuth() {
  const userStore = useAuthProfileStore()

  const getToken = () => userStore.token
  const getProfile = () => userStore.profile
  const getId = () => userStore.userId
  const getRole = () => userStore.role

  return {
    getToken,
    getProfile,
    getId,
    getRole
  }
}
