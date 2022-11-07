<template>
  <!-- Dynamic Component Rendering of OfferSummary, ListItemOptionsMenu -->
  <component :is="renderedComponent"></component
  ><!-- End of Dynamic Component Rendering -->
</template>

<script>
import CheckoutSummary from '~/components/checkout/place-offer/mobile/CheckoutSummary'
import ListItemOptionsMenu from '~/components/checkout/place-offer/mobile/ListItemOptionsMenu'
import ShippingForm from '~/components/checkout/common/mobile/ShippingForm'
import ShippingInformation from '~/components/checkout/common/mobile/ShippingInformation'
import PaymentCard from '~/components/checkout/common/mobile/PaymentCard'
import BillingForm from '~/components/checkout/common/mobile/BillingForm'
import OfferSummary from '~/components/checkout/place-offer/mobile/OfferSummary'

export default {
  name: 'ShoppingBagOrder',
  components: {
    CheckoutSummary,
    ListItemOptionsMenu,
    ShippingForm,
    ShippingInformation,
    OfferSummary,
    PaymentCard,
    BillingForm,
  },
  data: () => {
    return {
      renderedComponent: CheckoutSummary.name,
    }
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
}
</script>
