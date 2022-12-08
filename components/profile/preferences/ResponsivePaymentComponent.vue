<template>
  <component :is="renderedComponent" class="responsive-payment-component custom-pad w-100"></component>
</template>

<script>
import PaymentComponent from './Payments/PaymentsComponent.vue'
import CardPayments from './Payments/CardPayments.vue'
import AddCardComponent from './Payments/AddCardComponent.vue'

export default {
  name: 'ResponsivePaymentComponent',

  components: {
    PaymentComponent,
    CardPayments,
    AddCardComponent,
  },

  data() {
    return {
      renderedComponent: PaymentComponent.name
    }
  },

  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
}
</script>
<style lang="sass" scoped>
.custom-pad
  padding: 2%
</style>