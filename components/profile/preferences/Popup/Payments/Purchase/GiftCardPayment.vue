<template>
  <b-card-text class="gift-card-purchase px-4 pb-4">
    <!-- Back button -->
    <b-row>
      <b-col md="12" class="ml-4">
        <span
          id="backto-btn"
          role="button"
          class="text-muted text-bold float-left"
          @click="backtoBillingAddress"
        >
          &#60; {{ $t('preferences.payments.back_to_billing_address') }}
        </span>
      </b-col>
    </b-row>
    <!-- ./Back button -->
    <!-- Content -->
    <b-row class="gift-cards-paymentmethods mt-3">
      <b-col md="12" class="selected-card-heading">
        <span class="text-bold float-left ml-4"
          >{{ $t('preferences.payments.selected_card') }}&colon;</span
        >
      </b-col>
    </b-row>
    <b-row class="gc-payments-card my-4">
      <b-col class="col justify-content-center d-flex">
        <img
          :src="
            require(`~/assets/img/preferences/giftcard/${giftCardImageName}`)
          "
          alt="Demo Debit Card"
          class="w-50 justify-content-center d-flex"
        />
      </b-col>
    </b-row>
    <!-- ./Content -->
    <SavedPayments
      v-if="paymentMethods && !paymentList"
      :paymentMethods="paymentMethods"
      @showPaymentList="showList"
      @showSuccessScreen="showSuccess"
    />
  </b-card-text>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SavedPayments from './savedpayments/SavedPayments.vue'
import emitEvent from '~/plugins/mixins/emit-event'
import { SAVED, NEWPAYMENT } from '~/static/constants'
export default {
  name: 'GiftCardPayment',

  components: {
    SavedPayments,
  },

  mixins: [emitEvent],

  data() {
    return {
      paymentOption: '',
      disabled: true,
      selectedPaymentMethod: '',
      paymentList: false,
      // TODO: Temporary dummy data
      // Since a virtual service there will be no shipping, value is given 0.
      shippingFee: 0,
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
      savedPaymentType: SAVED,
      newPaymentType: NEWPAYMENT,
    }
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/giftCardSelected',
      getGiftCardDetails: 'preferences/getGiftCardDetails',
      paymentMethods: 'preferences/getUserPaymentMethods',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImageName: (vm) => {
      return vm.getSelectedGiftCard.giftCard.image_name
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardAmount: (vm) => {
      const total =
        vm.shippingFee +
        vm.processingFee +
        vm.tax +
        vm.getGiftCardDetails.cardDetails.giftCardAmount
      return total
    },
  },

  watch: {
    // Watch the radio button change
    // currently card payments details are displayed as figma design
    paymentOption(selectedPaymentOption) {
      if (selectedPaymentOption) {
        this.disabled = false
        this.selectedPaymentMethod = selectedPaymentOption
      }
    },
  },

  created() {
    // Update the modal header title.
    this.updateModalHeader({
      title: this.$t('preferences.payments.purchase_gift_card'),
      showTabs: false,
      size: 'md',
    })
  },

  methods: {
    ...mapActions({
      updateModalHeader: 'preferences/updateModalHeader',
    }),
    // Back to Purchase Gift Card
    backtoBillingAddress() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardAddress.name
      )
    },

    // Show the success screen
    showSuccess() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardPaymentOrderSuccess.name
      )
    },

    /**
     * Show the payment details screen
     * @param val
     */
    showList(val) {
      // In case of new payment, remove if any id is stored in storage, and add a type "new-payment"
      if (typeof val.type === 'string' && val.type === this.newPaymentType) {
        this.paymentList = val.type
        window.localStorage.removeItem('getPaymentDetails')
        window.localStorage.setItem('paymentType', this.newPaymentType)
      }
      // In case of saved payment, store the id in local storage, with type as "saved"
      if (typeof val.type === 'string' && val.type === this.savedPaymentType) {
        window.localStorage.setItem('getPaymentDetails', val.id)
        window.localStorage.setItem('paymentType', this.savedPaymentType)
      }
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardPaymentCard.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.selected-card-heading
  span
    font-family: $font-family-montserrat
    font-style: normal
    @include body-3-medium
    color: $color-black-1
.btn-disabled
  width: 203px
  height: 42px
  left: 791px
  top: 967px
  background: $color-gray-47
  border: 1px solid $color-gray-47
  border-radius: 20px
.btn-active
  width: 203px
  height: 42px
  left: 791px
  top: 967px
  background: $color-blue-20
  border-color: $color-blue-20
  border-radius: 20px
</style>