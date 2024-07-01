import { useUserStoreAuth } from '~/stores/AuthProfile'

export function useAuth() {
  const userStore = useUserStoreAuth()

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