<template>
  <!-- Dynamic Component Rendering -->
  <component :is="renderedComponent" v-bind="componentProps" class="px-4 py-5"></component>
  <!-- End Dynamic Component Rendering -->
</template>

<script>
import BidSummary from '~/components/Auctions/checkout/BidSummary'
import BillingForm from '~/components/checkout/selling/BillingForm'
import ShippingForm from '~/components/checkout/selling/ShippingForm'
import PaymentOption from '~/components/checkout/selling/payment/PaymentOption'
import PaymentCard from '~/components/checkout/selling/payment/PaymentCard'
import PaymentOptionError from '~/components/checkout/selling/payment/PaymentOptionError'
import PaymentGiftCard from '~/components/checkout/selling/payment/PaymentGiftCard'
import PaymentAffirm from '~/components/checkout/selling/payment/PaymentAffirm'
import PaymentCrypto from '~/components/checkout/selling/payment/PaymentCrypto'
import LoginForm from '~/components/checkout/common/LoginForm'
import ForgotPassword from '~/components/checkout/common/ForgotPassword'

export default {
  name: 'CheckoutSidebar',
  components: {
    BidSummary,
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
      renderedComponent: BidSummary.name,
      componentProps: null,
    }
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName, props) => {
      this.renderedComponent = componentName
      this.componentProps = props
    })
  },
}
</script>
