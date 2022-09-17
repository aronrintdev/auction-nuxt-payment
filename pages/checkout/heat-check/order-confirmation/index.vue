<template>
  <b-row>
    <ProductPreview class="product-preview" />

    <ThankYou />
  </b-row>
</template>

<script>
import ProductPreview from '~/components/checkout/heat-check/order-confirmation/ProductPreview'
import ThankYou from '~/components/checkout/heat-check/order-confirmation/ThankYou'
export default {
  name: 'Index',
  components: { ProductPreview, ThankYou },
  layout: 'IndexLayout',
  head() {
    return {
      title: this.$t('shopping_cart.shopping_cart_order_confirmation'),
    }
  },
}
</script>
