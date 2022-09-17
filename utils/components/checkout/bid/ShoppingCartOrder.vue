<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" class="px-4 py-5"></component>
  <!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/bid/OrderSummary'
import BillingForm from '~/components/checkout/bid/BillingForm'
import ShippingForm from '~/components/checkout/bid/ShippingForm'
import PaymentOption from '~/components/checkout/bid/payment/PaymentOption'
import PaymentCard from '~/components/checkout/bid/payment/PaymentCard'
import PaymentOptionError from '~/components/checkout/bid/payment/PaymentOptionError'
import PaymentGiftCard from '~/components/checkout/bid/payment/PaymentGiftCard'
import PaymentAffirm from '~/components/checkout/bid/payment/PaymentAffirm'
import PaymentCrypto from '~/components/checkout/bid/payment/PaymentCrypto'
import LoginForm from '~/components/checkout/bid/LoginForm'
import ForgotPassword from '~/components/checkout/bid/ForgotPassword'

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
