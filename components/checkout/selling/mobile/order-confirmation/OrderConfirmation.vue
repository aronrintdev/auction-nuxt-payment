<template>
  <b-col cols="12" sm="12" class="px-0">
    <ProductPreview :products="combinedProducts" />

    <ThankYou :order-details="orderDetails" @view-order-details="$refs.orderDetails.open()" />

    <!-- Bottom Sheet with the Order Summary -->
    <vue-bottom-sheet ref="orderDetails">
      <OrderDetails />
    </vue-bottom-sheet>
    <!-- End of Bottom Sheet with the Order Summary -->
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductPreview from '~/components/checkout/common/mobile/order-confirmation/ProductPreview'
import ThankYou from '~/components/checkout/common/mobile/order-confirmation/ThankYou'
import OrderDetails from '~/components/checkout/selling/mobile/order-confirmation/OrderDetails'

export default {
  name: 'OrderConfirmation',
  components: { ProductPreview, ThankYou, OrderDetails },
  computed: {
    ...mapGetters({
      products: 'order-details/getProducts',
      freeSneakersRedeemedReward: 'order-details/getFreeSneakersRedeemedReward',
      orderDetails: 'order-details/getOrderDetails',
    }),
    combinedProducts(vm) {
      const products = [...vm.products]

      if (vm.freeSneakersRedeemedReward) {
        products.push(vm.freeSneakersRedeemedReward)
      }

      return products
    }
  }
}
</script>

<style lang="sass" scoped>
/* Override bottom sheet settings in order to fix height readjustment. */
.bottom-sheet
  &__content
    height: 100% !important
</style>
