<template>
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1289 1.5625C13.1649 1.5625 14.1585 1.97405 14.891 2.70661C15.6236 3.43918 16.0352 4.43275 16.0352 5.46875V6.25H8.22266V5.46875C8.22266 4.43275 8.63421 3.43918 9.36677 2.70661C10.0993 1.97405 11.0929 1.5625 12.1289 1.5625ZM17.5977 6.25V5.46875C17.5977 4.01835 17.0215 2.62735 15.9959 1.60176C14.9703 0.57617 13.5793 0 12.1289 0C10.6785 0 9.28751 0.57617 8.26192 1.60176C7.23633 2.62735 6.66016 4.01835 6.66016 5.46875V6.25H1.19141V21.875C1.19141 22.7038 1.52065 23.4987 2.1067 24.0847C2.69275 24.6708 3.4876 25 4.31641 25H19.9414C20.7702 25 21.5651 24.6708 22.1511 24.0847C22.7372 23.4987 23.0664 22.7038 23.0664 21.875V6.25H17.5977Z"
      fill="black"
    />
    <text
      font-family="Sans Pro"
      font-size="10px"
      text-anchor="middle"
      dominant-baseline="middle"
      x="50%"
      y="65%"
      fill="white"
    >
      {{ getTotalQuantity }}
    </text>
  </svg>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BagIcon',
  computed: {
    ...mapGetters({
      shoppingCart: 'shopping-cart/getShoppingCart',
      freeSneakersRedeemedReward: 'redeemed-reward/getFreeSneakersRedeemedReward'
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      let totalQuantity =  vm.shoppingCart.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)

      if (vm.freeSneakersRedeemedReward) {
        ++totalQuantity
      }

      return totalQuantity
    },
  },
}
</script>
