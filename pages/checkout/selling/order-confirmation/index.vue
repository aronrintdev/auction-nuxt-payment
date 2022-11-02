<template>
  <b-row>
    <ProductPreview v-if="! isResponsive" class="product-preview" />

    <ThankYou v-if="! isResponsive" />

    <OrderConfirmation v-else />
  </b-row>
</template>

<script>
import ProductPreview from '~/components/checkout/selling/order-confirmation/ProductPreview';
import ThankYou from '~/components/checkout/selling/order-confirmation/ThankYou';
import OrderConfirmation from '~/components/checkout/selling/mobile/order-confirmation/OrderConfirmation'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'Index',
  components: { ProductPreview, ThankYou, OrderConfirmation },
  mixins: [ screenSize ],
  layout: 'IndexLayout',
  head() {
    return {
      title: this.$t('shopping_cart.checkout_selling_order_confirmation'),
    }
  },
  computed: {
    isResponsive(vm) {
      return vm.isScreenSM || vm.isScreenXS
    },
  },
  beforeMount() {
    enquireScreenSizeHandler((type) => {
      this.$store.commit('size/setScreenType', type)
    })
  }
}
</script>
