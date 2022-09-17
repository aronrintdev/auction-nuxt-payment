<template>
  <!-- Dynamic Component Rendering of OfferSummary, BillingForm, ShippingForm, PaymentOption, PaymentCard, PaymentOptionError & PaymentGiftCard -->
  <component :is="renderedComponent" class="px-4 py-5"></component>
  <!-- End of Dynamic Component Rendering -->
</template>

<script>
import OfferSummary from './offer-summary/OfferSummary'
import BillingForm from './offer-summary/BillingForm.vue'
import ShippingForm from './offer-summary/ShippingForm.vue'
import PaymentCard from './offer-summary/PaymentCard.vue'
import PaymentOptionError from './offer-summary/PaymentOptionError.vue'
export default {
  name: 'PlaceOfferSummaryComponent',

  components: {
    OfferSummary,
    BillingForm,
    ShippingForm,
    PaymentCard,
    PaymentOptionError

  },

  data() {
    return {
      renderedComponent: OfferSummary.name,
    }
  },

  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
}
</script>