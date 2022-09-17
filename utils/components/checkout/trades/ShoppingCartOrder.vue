<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" class="px-4 py-5"></component>
  <!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/trades/OrderSummary'
import BillingForm from '~/components/checkout/trades/BillingForm'
import ShippingForm from '~/components/checkout/trades/ShippingForm'
import PaymentOption from '~/components/checkout/trades/payment/PaymentOption'
import PaymentCard from '~/components/checkout/trades/payment/PaymentCard'
import PaymentOptionError from '~/components/checkout/trades/payment/PaymentOptionError'
import PaymentGiftCard from '~/components/checkout/trades/payment/PaymentGiftCard'
import PaymentAffirm from '~/components/checkout/trades/payment/PaymentAffirm'
import PaymentCrypto from '~/components/checkout/trades/payment/PaymentCrypto'
import LoginForm from '~/components/checkout/trades/LoginForm'
import ForgotPassword from '~/components/checkout/trades/ForgotPassword'

export default {
  name: 'ShoppingCartOrder',
  components: {
    OrderSummary,
    BillingForm,
    ShippingForm,
    PaymentOption,
    PaymentCard,
    PaymentOptionError,
    PaymentGiftCard,
    PaymentAffirm,
    PaymentCrypto,
    LoginForm,
    ForgotPassword,
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
