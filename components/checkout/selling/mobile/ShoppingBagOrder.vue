<template>
  <!-- Dynamic Component Rendering of OrderSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" :properties="renderedProperties" />
  <!-- End of Dynamic Component Rendering -->
</template>

<script>
import CheckoutSummary from '~/components/checkout/selling/mobile/CheckoutSummary'
import OrderSummary from '~/components/checkout/selling/mobile/OrderSummary'
import ListItemOptionsMenu from '~/components/checkout/selling/mobile/ListItemOptionsMenu'
import ShippingForm from '~/components/checkout/common/mobile/ShippingForm'
import ShippingInformation from '~/components/checkout/common/mobile/ShippingInformation'
import PaymentOptionsMenu from '~/components/checkout/selling/mobile/payment/PaymentOptionsMenu'
import PaymentCard from '~/components/checkout/common/mobile/PaymentCard'
import BillingForm from '~/components/checkout/common/mobile/BillingForm'
import PaymentCrypto from '~/components/checkout/selling/mobile/payment/PaymentCrypto'
import PaymentGiftCard from '~/components/checkout/selling/mobile/payment/PaymentGiftCard'
import WishList from '~/components/checkout/selling/mobile/WishList'
import CreateWishList from '~/components/checkout/selling/mobile/CreateWishList'
import SignUpForm from '~/components/checkout/selling/mobile/SignUpForm'

export default {
  name: 'ShoppingCartOrder',
  components: {
    CheckoutSummary,
    OrderSummary,
    ListItemOptionsMenu,
    ShippingForm,
    ShippingInformation,
    PaymentOptionsMenu,
    PaymentCard,
    BillingForm,
    PaymentCrypto,
    PaymentGiftCard,
    WishList,
    CreateWishList,
    SignUpForm,
  },
  data: () => {
    return {
      renderedComponent: CheckoutSummary.name,
      renderedProperties: null,
    }
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName, properties) => {
      this.renderedComponent = componentName
      this.renderedProperties = properties
    })
  },
}
</script>
