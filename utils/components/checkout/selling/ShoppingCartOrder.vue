<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" class="px-4 py-5"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/selling/OrderSummary'
import BillingForm from '~/components/checkout/selling/BillingForm'
import ShippingForm from '~/components/checkout/selling/ShippingForm'
import PaymentOption from '~/components/checkout/selling/payment/PaymentOption'
import PaymentCard from '~/components/checkout/selling/payment/PaymentCard'
import PaymentOptionError from '~/components/checkout/selling/payment/PaymentOptionError'
import PaymentGiftCard from '~/components/checkout/selling/payment/PaymentGiftCard'
import PaymentAffirm from '~/components/checkout/selling/payment/PaymentAffirm'
import PaymentCrypto from '~/components/checkout/selling/payment/PaymentCrypto'
import LoginForm from '~/components/checkout/selling/LoginForm'
import ForgotPassword from '~/components/checkout/selling/ForgotPassword'

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
