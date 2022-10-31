<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/selling/mobile/OrderSummary'
import ListItemOptionsMenu from '~/components/checkout/selling/mobile/ListItemOptionsMenu'

export default {
  name: 'ShoppingCartOrder',
  components: { OrderSummary, ListItemOptionsMenu },
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
