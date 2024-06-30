export const useCartStore = defineStore('cartStore', () => {
  const cartItems = ref([])

  const addItem = (item) => {
    cartItems.value.push(item)
  }
  const removeItem = (index) => {
    cartItems.value.splice(index, 1)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const totalAmount = () => {
    return cartItems.value.reduce((total, item) => total + item.areaPrice * item.count, 0)
  }

  return {
    addItem,
    removeItem,
    clearCart,
    totalAmount,
    cartItems
  }
})
