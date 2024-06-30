<script setup>
import Swal from 'sweetalert2'
const cartStore = useCartStore()
const emit = defineEmits(['update:open'])
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  cart: {
    type: Object,
    default: () => ({})
  }
})

const isOpen = ref(props.open)
const orderCart = ref(props.cart)

const closeDialog = () => {
  isOpen.value = false
  emit('update:open', isOpen.value)
}

const totalAmount = computed(() => {
  return orderCart.value.areaTicketType.reduce((sum, ticket) => {
    const price =
      ticket.ticketDiscount !== 0
        ? orderCart.value.areaPrice * ticket.ticketDiscount
        : orderCart.value.areaPrice
    return sum + ticket.count * price
  }, 0)
})

const totalCount = computed(() => {
  return orderCart.value.areaTicketType.reduce((sum, ticket) => sum + ticket.count, 0)
})

// 加減票券數量
const addCount = (ticket) => {
  ticket.count += 1
}

const minusCount = (ticket) => {
  if (ticket.count > 0) {
    ticket.count -= 1
  }
}

const addToCart = () => {
  const orderItems = orderCart.value.areaTicketType
    .filter((item) => item.count > 0)
    .map((item) => {
      return {
        count: item.count,
        areaName: orderCart.value.areaName,
        areaColor: orderCart.value.areaColor,
        ticketName: item.ticketName,
        ticketDiscount: item.ticketDiscount,
        areaPrice:
          item.ticketDiscount !== 0
            ? orderCart.value.areaPrice * item.ticketDiscount
            : orderCart.value.areaPrice
      }
    })

  // 提示 需要至少一張票券
  if (orderItems.length === 0) {
    Swal.fire({
      title: '購物車沒有任何票券',
      text: '請選擇至少一張票券',
      icon: 'question'
    })
    return
  }

  // 加入購物車
  orderItems.forEach((item) => {
    cartStore.addItem(item)
  })
  closeDialog()
}
</script>
<template>
  <div class="add-order-dialog">
    <div class="col-lg-8 col-md-12 add-order">
      <ul>
        <button type="button" class="close-btn" @click="closeDialog">
          <i class="icon-close"></i>
        </button>
        <p class="add-order__header d-flex align-items-center">
          <i class="area-color me-2" :style="{ backgroundColor: orderCart.areaColor }"></i>
          <span class="area-title text-s1">{{ orderCart.areaName }}</span>
        </p>
        <li
          v-for="(ticket, ticketIdx) in orderCart.areaTicketType"
          :key="ticketIdx"
          class="add-order__list"
        >
          <div class="add-order__left text-s1">
            <span class="area-ticket-name">{{ ticket.ticketName }}</span>
            <span class="area-price">
              {{
                ticket.ticketDiscount !== 0
                  ? orderCart.areaPrice * ticket.ticketDiscount
                  : orderCart.areaPrice
              }}
            </span>
          </div>
          <div class="add-order__right">
            <button type="button" class="minus-btn">
              <i class="icon-minus" @click="minusCount(ticket)"></i>
            </button>
            <span class="text-base">{{ ticket.count }}</span>
            <button type="button" class="add-btn">
              <i class="icon-add" @click="addCount(ticket)"></i>
            </button>
          </div>
        </li>
      </ul>
      <div class="add-order__cart">
        <div class="d-flex">
          <span class="order-number">{{ totalCount }}</span>
          <span class="order-amount">{{ totalAmount }}</span>
        </div>
        <button type="button" class="btn buy-intro-btn text-btn1" @click="addToCart">
          <span>加入購物車</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-order-dialog {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgb(5 5 5 / 90%);
}
.add-order {
  position: relative;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: auto;
  background: $gray_2;
  border-radius: 8px;
  padding: rem(16px) rem(24px);
  min-height: 440px;
  @include media-breakpoint-up(lg) {
    padding: rem(40px);
    min-height: 500px;
  }
  & ul {
    margin: 0;
    padding: 0;
  }
  & li {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: $gray_1;
    height: rem(74px);
    padding: 12px;
    border: $gray_1 1px solid;
    margin-bottom: rem(16px);

    @include media-breakpoint-up(lg) {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      height: rem(48px);
      padding: 0 12px;
    }

    &:hover {
      border: $gray_5 1px solid;
    }
  }

  & li + li {
    margin-bottom: 0;
  }

  &__right {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    @include media-breakpoint-up(lg) {
      margin-top: 0;
    }

    & span {
      padding: 0 20px;
      color: $primary_0;
    }
  }

  &__cart {
    border: 1px solid $gray_4;
    border-radius: 4px;
    display: flex;
    margin-top: rem(20px);
    padding: rem(12px) rem(16px);
    flex-direction: column;

    @include media-breakpoint-up(lg) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    & div {
      justify-content: center;
      margin-bottom: 12px;
      @include media-breakpoint-up(lg) {
        margin-bottom: 0;
      }
    }
  }
}

.order-number {
  color: $primary_0;
  &:before {
    color: white;
    display: inline-flex;
    content: '總數量';
    margin-right: 5px;
  }
}
.order-amount {
  color: $primary_0;
  &:before {
    color: white;
    display: inline-flex;
    content: '總金額NT$';
    margin: 0 5px 0 20px;
  }
}

.area-color {
  width: rem(16px);
  height: rem(16px);
  border-radius: 4px;
  display: inline-flex;
}
.area-price {
  &:before {
    display: inline-flex;
    content: 'NT$';
    margin-left: 12px;
    margin-right: 4px;
  }
}
.area-ticket-name {
  color: $gray_5;
}

.close-btn {
  position: absolute;
  padding: 0;
  top: rem(12px);
  right: rem(12px);
  background: none;
  height: rem(40px);
  width: rem(40px);
  border: none;
  align-items: center;
  display: inline-flex;

  &:hover,
  &:active,
  &.active {
    & .icon-close {
      display: inline-block;
      width: rem(40px);
      height: rem(40px);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2300ffa3' d='m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z'/%3E%3C/svg%3E");
    }
  }

  & .icon-close {
    display: inline-block;
    width: rem(40px);
    height: rem(40px);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z'/%3E%3C/svg%3E");
  }
}

.minus-btn {
  padding: 0;
  background: none;
  height: rem(24px);
  width: rem(24px);
  border: none;
  align-items: center;
  display: inline-flex;

  &:hover,
  &:active,
  &.active {
    & .icon-minus {
      display: inline-block;
      width: rem(24px);
      height: rem(24px);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2300ffa3' d='M5 13v-1h13v1z'/%3E%3C/svg%3E");
    }
  }

  & .icon-minus {
    display: inline-block;
    width: rem(24px);
    height: rem(24px);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M5 13v-1h13v1z'/%3E%3C/svg%3E");
  }
}

.add-btn {
  padding: 0;
  background: none;
  height: rem(24px);
  width: rem(24px);
  border: none;
  align-items: center;
  display: inline-flex;

  &:hover,
  &:active,
  &.active {
    & .icon-add {
      display: inline-block;
      width: rem(24px);
      height: rem(24px);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2300ffa3' d='M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z'/%3E%3C/svg%3E");
    }
  }

  & .icon-add {
    display: inline-block;
    width: rem(24px);
    height: rem(24px);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M11.5 12.5H6v-1h5.5V6h1v5.5H18v1h-5.5V18h-1z'/%3E%3C/svg%3E");
  }
}
</style>
