<template>
  <div class="saved-payments-content">
    <Denomination />

    <PaymentOptions
      @savedPayments="savedPayments"
    />

    <AlertModal
      id="reload-success"
      :message="$t('giftcard_section.reload_success')"
      icon="tick"
      auto-hide
      :auto-hide-timeout="MODAL_FADE_TIMEOUT"
      @hidden="onSuccessModalHidden"
    >
    </AlertModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Denomination from '../common/Denomination.vue'
import PaymentOptions from './PaymentOptions.vue'
import { AlertModal } from '~/components/modal'
import emitEvent from '~/plugins/mixins/emit-event'
import { SAVED } from '~/static/constants'
export default {
  name: 'SavedUserPayments',

  components: {
    Denomination,
    PaymentOptions,
    AlertModal
  },

  mixins: [emitEvent],

  data() {
    return {
      // TODO: Temporary dummy data
      // Since a virtual service there will be no shipping, value is given 0.
      shippingFee: 0,
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
      amount: this.getAmount,
      MODAL_FADE_TIMEOUT: 2000,
      saved: SAVED
    }
  },
  
  computed: {
    ...mapGetters({
      reloadAmount: 'preferences/getSelectedAmount',
      selectedCard: 'preferences/getSelectedGiftCard'
    }),
    // Get the selected amount
    getAmount: (vm) => {
      return vm.$store.state.preferences.selectedAmount
    },
    // Total amount
    gettotal: (vm) => {
      const totalAmount =  parseInt(vm.shippingFee) + parseInt(vm.processingFee) + parseInt(vm.tax) + parseInt(vm.getAmount)
      return totalAmount
    }
  },

  created() {
    // On create, update the page title and content
    this.updatePageTitle(this.$t('giftcard_section.add_funds'))
    this.getUserPaymentMethods()
    this.toggleContent({
      transactionHistory: false,
      howToUse: false,
      backTo: 'AddFundButton'
    })
  },
  
  methods: {
    ...mapActions({
      addFunds: 'preferences/addFundsToGiftCard',
      updatePageTitle: 'preferences/viewPageTitle',
      toggleContent: 'preferences/toggleContent',
      saveGiftCardDetails: 'preferences/saveGiftCardDetails',
      savePaymentMethods: 'preferences/savePaymentMethods'
    }),
    // On saved user payment optionclick, do the card reload
    savedPayments(val){
      this.addFunds({
        paymentType: this.saved,
        paymentId: val,
        shippingFee: this.shippingFee,
        processingFee: this.processingFee,
        tax: this.tax,
        subTotal: this.getAmount,
        total: this.gettotal
      }).then((res) => {
        // On success show popup
        this.saveGiftCardDetails(this.$route.params.id)
        if(res.success === true){
          this.$bvModal.show('reload-success');
        }
      }).catch((error) => {
        this.$logger.logToServer('Giftcard Add funds saved payment', error.response)
      });
    },
    // On success modal hidden
    onSuccessModalHidden(){ 
      this.emitRenderComponentEvent(this.$parent.$options.components.AddFundButton.name)
    },
    // Get the users paymenst
    getUserPaymentMethods() {
      this.$axios
        .get('/preferences/payments/user-payment-methods')
        .then((res) => {
          this.savePaymentMethods({
            data: res.data,
          })
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>