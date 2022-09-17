<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" class="px-4 py-5"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import OrderSummary from '~/components/checkout/auction/OrderSummary'
import BillingForm from '~/components/checkout/auction/BillingForm'
import ShippingForm from '~/components/checkout/auction/ShippingForm'
import PaymentOption from '~/components/checkout/auction/payment/PaymentOption'
import PaymentCard from '~/components/checkout/auction/payment/PaymentCard'
import PaymentOptionError from '~/components/checkout/auction/payment/PaymentOptionError'
import LoginForm from '~/components/checkout/auction/LoginForm'
import ForgotPassword from '~/components/checkout/auction/ForgotPassword'
import ThankYou from '~/components/checkout/auction/order-confirmation/ThankYou'

export default {
  name: 'ShoppingCartOrder',
  components: {
    OrderSummary,
    BillingForm,
    ShippingForm,
    PaymentOption,
    PaymentCard,
    PaymentOptionError,
    LoginForm,
    ForgotPassword,
    ThankYou,
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
