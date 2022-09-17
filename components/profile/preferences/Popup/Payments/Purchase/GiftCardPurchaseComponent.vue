<template>
  <!-- Parent component of Purchase Gift card Section -->
  <!-- Used to dynamically switch between components -->
  <component :is="renderedComponent"></component>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import GiftCardPurchase from './GiftCardPurchase.vue'
import GiftCardPayment from './GiftCardPayment.vue'
import AllGiftCard from './AllGiftCard.vue' // Payment page
import GiftCardAddress from './GiftCardAddress.vue'
import GiftCardPaymentCard from './GiftCardPaymentCard'
import GiftCardPaymentOrderSuccess from './GiftCardPaymentOrderSuccess'
export default {
  name: 'GiftCardPurchaseComponent',

  components: {
    GiftCardPurchase,
    GiftCardPayment,
    AllGiftCard,
    GiftCardAddress,
    GiftCardPaymentCard,
    GiftCardPaymentOrderSuccess,
  },

  data: () => {
    return {
      renderedComponent: GiftCardPurchase.name
    }
  },

  computed: {
    ...mapGetters({
      modalHeader: 'preferences/getModalHeader',
    }),
  },
  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },
  beforeMount(){
    // Get the users payment methods
    this.getUserPaymentMethods()
  },
 

  methods: {
    ...mapActions({
      savePaymentMethods: 'preferences/savePaymentMethods'
    }),
    // Get the users saved payment informations.
    getUserPaymentMethods(){
      this.$axios.get('/preferences/payments/user-payment-methods').then((res) => {
        this.savePaymentMethods({
          data: res.data
        });
      }).catch((err) => {
        this.logger.logToServer(err.response)
      });
    }
  },
}
</script>
