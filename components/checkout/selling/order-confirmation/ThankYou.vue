<template>
  <!-- Dynamic Component Rendering of OrderPlaced, OrderDetails -->
  <component :is="renderedComponent" class="py-5"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderPlaced from '~/components/checkout/selling/order-confirmation/OrderPlaced'
import OrderDetails from '~/components/checkout/selling/order-confirmation/OrderDetails'

export default {
  name: 'OrderConfirmationThankYou',
  components: { OrderPlaced, OrderDetails },
  data() {
    return {
      renderedComponent: OrderPlaced.name
    }
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
}
</script>
