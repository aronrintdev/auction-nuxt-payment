<template>
  <b-row>
    <OrderConfirmation v-if="isResponsive" />
  </b-row>
</template>

<script>
import OrderConfirmation from '~/components/checkout/place-offer/mobile/order-confirmation/OrderConfirmation'
import screenSize from '~/plugins/mixins/screenSize'
import { enquireScreenSizeHandler } from '~/utils/screenSizeHandler'

export default {
  name: 'Index',
  components: { OrderConfirmation },
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
