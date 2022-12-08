<template>
  <component :is="renderedComponent" class="responsive-payment-component custom-pad w-100"></component>
</template>

<script>
import PaymentComponent from './Payments/PaymentsComponent.vue'
import CardPayments from './Payments/CardPayments.vue'
import AddCardComponent from './Payments/AddCardComponent.vue'
import GiftCardMethod from '~/components/profile/preferences/GiftCard/RedeemGiftcard/GiftCardMethod.vue'
import ResponsiveRedeemGiftCard from '~/components/profile/preferences/GiftCard/RedeemGiftcard/ResponsiveRedeemGiftCard.vue'
export default {
  name: 'ResponsivePaymentComponent',

  components: {
    PaymentComponent,
    CardPayments,
    AddCardComponent,
    GiftCardMethod,
    ResponsiveRedeemGiftCard,
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

    if(this.$auth.$storage.getUniversal('showGiftCardMethod')){
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.renderedComponent = GiftCardMethod
      this.$auth.$storage.removeUniversal('showGiftCardMethod')
    }
  },
}
</script>
<style lang="sass" scoped>
.custom-pad
  padding: 2%
</style>