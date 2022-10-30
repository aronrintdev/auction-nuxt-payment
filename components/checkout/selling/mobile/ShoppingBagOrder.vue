<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/selling/mobile/OrderSummary'
import ListItemOptionsMenu from '~/components/checkout/selling/mobile/ListItemOptionsMenu'
import PaymentOptionsMenu from '~/components/checkout/selling/mobile/payment/PaymentOptionsMenu'
import PaymentCard from '~/components/checkout/selling/mobile/payment/PaymentCard'
import BillingForm from '~/components/checkout/selling/mobile/payment/BillingForm'
import PaymentCrypto from '~/components/checkout/selling/mobile/payment/PaymentCrypto'
import PaymentGiftCard from '~/components/checkout/selling/mobile/payment/PaymentGiftCard'

export default {
  name: 'ShoppingCartOrder',
  components: { OrderSummary, ListItemOptionsMenu, PaymentOptionsMenu, PaymentCard, BillingForm, PaymentCrypto, PaymentGiftCard },
  data: () => {
    return {
      renderedComponent: OrderSummary.name,
    }
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
}
</script>
