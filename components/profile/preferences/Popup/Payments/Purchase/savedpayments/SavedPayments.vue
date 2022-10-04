<template>
  <div class="payment-option-wrapper">
    <saved-payment-options
      v-for="(payment, index) in paymentMethods"
      :key="index"
      :payment="payment"
      showEdit
      showDelete
      @savedPayment="savedPayment"
      @savePaymentOnEdit="onEdit"
      @removePayment="onRemove"
    />

    <b-row class="mt-2">
      <b-col md="12">
        <b-card class="custom-card giftcard-payment-options">
          <b-row>
            <b-col md="12" class="d-flex align-items-center">
              <b-form-radio
                v-model="paymentOption"
                name="payment-option"
                value="new-payment"
                >{{
                  $t('preferences.payments.continue_new_payment')
                }}</b-form-radio
              >
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col md="12">
        <h5 class="text-bold float-right">
          {{ $t('preferences.payments.total') }}&colon;
          {{ giftCardAmount | toCurrency('USD', 'N/A') }}
        </h5>
      </b-col>
      <b-col md="12" class="mt-2">
        <b-button
          class="float-right px-3 text-white"
          :disabled="disabled"
          :variant="disabled ? 'disabled' : 'active'"
          pill
          @click="viewPaymentOptions"
          >{{ $t('preferences.payments.purchase_gift_card') }}</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SavedPaymentOptions from './SavedPaymentOptions.vue'
import emitEvent from '~/plugins/mixins/emit-event'
import { SAVED, NEWPAYMENT } from '~/static/constants'
export default {
  name: 'SavedPayments',

  components: {
    SavedPaymentOptions,
  },

  mixins: [emitEvent],

  props: {
    paymentMethods: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedId: '',
      paymentOption: '',
      disabled: true,
      selectedOption: '',
      newPayments: NEWPAYMENT,
      savedPayments: SAVED,
      // TODO: Temporary dummy data
      // Since a virtual service there will be no shipping, value is given 0.
      shippingFee: 0,
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
      form: {
        saveforNextTime: false,
        cardholderName: '',
        cardNumber: '',
        cardExp: '',
        cardCvv: '',
        cardBrand: '',
        paymentToken: '',
      },
    }
  },

  computed: {
    ...mapGetters({
      getGiftCardDetails: 'preferences/getGiftCardDetails',
      getSelectedGiftCard: 'preferences/giftCardSelected',
    }),
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
    // Payment method variable on update.
    paymentOption(option) {
      if (option) {
        this.disabled = false
        this.selectedOption = option
      }
    },
  },

  methods: {
    ...mapActions({
      savePaymentMethods: 'preferences/savePaymentMethods',
      giftCardCheckoutWithCard: 'preferences/giftCardCheckoutWithCard',
      savePurchaseResponse: 'preferences/savePurchaseResponse',
      savePayment: 'preferences/storePaymentVia',
    }),

    // on radio button on change of payment options.
    savedPayment(value) {
      this.disabled = false
      this.selectedOption = value.type
      this.selectedId = value.id
      this.form.cardholderName = value.id.card_holder_name
      this.form.cardNumber = value.id.card_last_digits
      this.form.cardExp = value.id.card_expiry_date
      this.form.cardBrand = value.id.card_brand
    },

    // On continue button click.
    viewPaymentOptions() {
      switch (this.selectedOption) {
        // If selected option is new-payment. emit the type
        case this.newPayments:
          this.$emit('showPaymentList', { type: this.selectedOption, id: '' })
          break
        case this.savedPayments:
          this.purchaseGiftCard()

          break
        default:
          this.$bvModal.hide('payment-methods-modal')
          break
      }
    },

    onEdit(val) {
      this.savedPayment(val)
      this.$emit('showPaymentList', {
        type: this.selectedOption,
        id: this.selectedId,
      })
    },

    onRemove(value) {
      this.$axios
        .delete('payment-method', {
          params: { ...value },
        })
        .then((res) => {
          if (res.data.success) {
            this.$toasted.success(this.$t(res.data.message))
            this.getUserPaymentMethods()
          }
        })
        .catch((err) => {
          this.$logger.logToServer('Delete Payment:', err.response)
          this.$toasted.error(this.$t(err.response.data.response_text))
        })
    },

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

    purchaseGiftCard() {
      this.giftCardCheckoutWithCard({
        data: this.getGiftCardDetails, // Details of the giftcard
        payment: this.form, // Payment details
        total: this.giftCardAmount, // Total
        shippingFee: this.shippingFee, // Shipping Fee
        processingFee: this.processingFee, // Processing Fee
        tax: this.tax, // Tax
        customerVaultId: null, // CustomerVaultID
      }).then((res) => {
        this.savePayment({ via: this.selectedId.card_last_digits })
        // Save the purchase response
        this.savePurchaseResponse({
          response: res,
        })
        // Render the success screen.
        this.$emit('showSuccessScreen')
      }).catch((err) => {
        this.$logger.logToServer('Gift card payment error', err.response)
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.btn-disabled
  background: $color-gray-47
  border: 1px solid $color-gray-47
  border-radius: 20px
.btn-active
  background: $color-blue-20
  border: 1px solid $color-blue-20
  border-radius: 20px
</style>
