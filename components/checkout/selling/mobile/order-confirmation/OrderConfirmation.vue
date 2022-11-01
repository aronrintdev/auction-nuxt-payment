<template>
  <b-col cols="12" sm="12" class="px-0">
    <ProductPreview />

    <ThankYou @view-order-details="$refs.orderDetails.open()" />

    <!-- Bottom Sheet with the Order Summary -->
    <vue-bottom-sheet ref="orderDetails">
      <OrderDetails />
    </vue-bottom-sheet>
    <!-- End of Bottom Sheet with the Order Summary -->
  </b-col>
</template>

<script>
import ProductPreview from '~/components/checkout/selling/mobile/order-confirmation/ProductPreview'
import ThankYou from '~/components/checkout/selling/mobile/order-confirmation/ThankYou'
import OrderDetails from '~/components/checkout/selling/mobile/order-confirmation/OrderDetails'

export default {
  name: 'OrderConfirmation',
  components: { ProductPreview, ThankYou, OrderDetails }
}
</script>

<style lang="sass" scoped>
/* Override bottom sheet settings in order to fix height readjustment. */
.bottom-sheet
  &__content
    height: 100% !important
    overflow-y: scroll !important
    padding-right: 0 !important
</style>
