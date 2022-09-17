<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" class="px-4 py-5"></component>
  <!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/heat-check/OrderSummary'
import BillingForm from '~/components/checkout/heat-check/BillingForm'
import PaymentOption from '~/components/checkout/heat-check/payment/PaymentOption'
import PaymentCard from '~/components/checkout/heat-check/payment/PaymentCard'
import PaymentOptionError from '~/components/checkout/heat-check/payment/PaymentOptionError'
import PaymentGiftCard from '~/components/checkout/heat-check/payment/PaymentGiftCard'
import PaymentAffirm from '~/components/checkout/heat-check/payment/PaymentAffirm'
import PaymentCrypto from '~/components/checkout/heat-check/payment/PaymentCrypto'
export default {
  name: 'HeatcheckOrder',
  components: {
    OrderSummary,
    BillingForm,
    PaymentOption,
    PaymentCard,
    PaymentOptionError,
    PaymentGiftCard,
    PaymentAffirm,
    PaymentCrypto,
  },
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
