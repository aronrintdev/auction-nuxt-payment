<template>
  <div class="add-funds-section">
    <client-only v-if="isScreenXS">
      <Portal to="page-title"> {{ $t('giftcard_section.add_funds') }}</Portal>
      <Portal to="back-icon-slot"> 
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="$router.push(`/profile/preferences/giftcard/view-giftcard/${getSelectedGiftCard.id}`)"
        />
      </Portal>
    </client-only>

    <add-funds-component v-if="isScreenXS" :details="getSelectedGiftCard">
    <!-- Card Payments -->
      <b-col  v-if="isScreenXS" class="add-funds-flow px-0" cols="12">
        <div class="saved-payment-header mx-16">
          {{ $t('giftcard_section.saved_card_payment') }}
        </div>

        <div class="saved-payments">
          <responsive-saved-payment
            v-for="(payment, index) in paymentMethods"
            id="saved-payment-items"
            :key="index"
            class="mx-16"
            :payment="payment"
            @selected="selectedPayment"
          />
          <!-- Continue with new payment -->
          <b-row class="responsive-saved-payment-continue mx-16">
            <div class="d-flex">
              <div class="input-radio h-100 mt-3">
                <div class="form-check ">
                  <input
                    id="input-select"
                    v-model="selectedOption"
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value="new-payment"
                  />
                </div>
              </div>
              <div class="continue-text d-flex">
                <span class="new-payment-text my-auto">{{ $t('preferences.payments.continue_new_payment') }}</span>
              </div>
            </div>
          </b-row>
          <!-- ./Continue with new payment -->
        </div>
        
      </b-col>
    <!-- Card Payments -->
    </add-funds-component>

    <div  v-if="isScreenXS" class="bottom-button d-flex justify-content-center w-100 position-fixed">
      <b-spinner v-if="isSaving" variant="color-blue-2" class="mr-2" small></b-spinner>
      <template v-else>
        <Button v-if="selectedOption === selected" variant="add" :disabled="!enableButton" class="my-auto" @click="addFundsToCard">
        {{ $t('giftcard_section.add', { amount: $options.filters.formatPrice(amount) }) }}
      </Button>
      <Button v-if="selectedOption === newPayment" variant="add" class="my-auto" @click="$router.push(`/profile/preferences/giftcard/view-giftcard/add-funds/new-payment/${$route.params.id}`)">
        {{ $t('giftcard_section.next') }}
      </Button>
      </template>
      
    </div>

    <transparent-alert-modal
      id="alert-success-giftcard"
      :text="$t('giftcard_section.reload_success')"
      :show="showAlert"
      @hide="hideModal"
    />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import AddFundsComponent from '~/components/profile/preferences/ResponsiveGiftCardDetails/AddFunds/AddFundsComponent.vue'
import ResponsiveSavedPayment from '~/components/profile/preferences/ResponsiveGiftCardDetails/AddFunds/ResponsiveSavedPayment.vue'
import Button from '~/components/common/Button'
import { SAVED, SELECTED_OPTION, NEWPAYMENT } from '~/static/constants'
import TransparentAlertModal from '~/components/common/TransparentAlertModal.vue'

export default {
  name: 'AddFundsDetails',

  components: {
    AddFundsComponent,
    ResponsiveSavedPayment,
    Button,
    TransparentAlertModal
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      selected: SELECTED_OPTION,
      newPayment: NEWPAYMENT,
      selectedOption: 'selected',
      selectedPaymentDetail: {},
      saved: SAVED,
      showAlert: false,
      isSaving: false
    }
  },

  computed: {
    ...mapGetters({
      amount: 'preferences/getSelectedAmount',
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
      paymentMethods: 'preferences/getUserPaymentMethods',
      getTaxRate: 'tax-rate/getTaxRate',
      processingFee: 'order-settings/getProcessingFee',
    }),

    enableButton: (vm) => {
      return vm.amount && (vm.selectedPaymentDetail && vm.selectedPaymentDetail.id)
    },

    getTax: (vm) => {
      return vm.getTaxRate * vm.amount
    },

    getProcessingFee: (vm) => {
      return vm.processingFee * vm.amount
    },

    total: (vm) => {
      return (vm.getProcessingFee.toFixed(2) * 100) + (vm.getTax * 100) + vm.amount
    }
  },

  watch: {
    selectedOption (val) {
      if(val === 'new-payment') {
        this.selectedPaymentDetail = {}
      }
    }
  },
  

  mounted() {
    this.getUserPaymentMethods()
    this.getOrderSettings()
  },

  methods: {
    ...mapActions({
      savePaymentMethods: 'preferences/savePaymentMethods',
      addFunds: 'preferences/addFundsToGiftCard',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      getOrderSettings: 'order-settings/getOrderSettings'
    }),
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

    selectedPayment(val){
      this.selectedPaymentDetail = val
      this.selectedOption = 'selected'
    },

    addFundsToCard() {
      this.isSaving = true
      this.addFunds({
        paymentType: this.saved,
        paymentId: {
          selectedId: this.selectedPaymentDetail.id,
        },
        total: this.total,
        shippingFee: 0,
        processingFee: this.getProcessingFee.toFixed(2) * 100,
        tax: this.getTax * 100,
        subTotal: this.amount
      }).then((res) => {
        this.isSaving = false
        this.showSuccess()
      }).catch((error) => {
        this.buttonSpinnerLoading = false
        this.showAlert = false
        this.isSaving = false
        this.$logger.logToServer('Add funds to giftcard', error.response)
      })
    },

    hideModal(){
      this.$router.push(`/profile/preferences/giftcard/view-giftcard/${this.$route.params.id}`)
    },

    showSuccess() {
      this.showAlert = true
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.add-funds-section
  .mx-16
    margin-left: 16px
    margin-right: 16px
  .add-funds-flow
    .saved-payment-header
      font-family: $font-montserrat
      font-style: normal
      @include body-5-medium
      color: $color-black-1
      margin-top: 20px
      
    .saved-payments
      .responsive-saved-payment-continue
        margin-top: 15px
        height: 57px
        background: $color-white-5
        border-radius: 4px
        @media only screen and (max-width: 375px)
          max-width: 343px
        .input-radio
          margin-left: 12px
        .continue-text
          font-family: $font-sf-pro-text
          font-style: normal
          @include body-1214-normal
          color: $color-black-1
          margin-left: 24px
      #saved-payment-items
        margin-top: 15px
  .bottom-button
    height: 76px
    background: $color-white
    bottom: 11.4vh
    .btn-add::v-deep
      width: 216px
      background: $color-blue-20
      border-radius: 21px
      height: 40px
      font-family: $font-sp-pro
      font-style: normal
      @include body-13-medium
      display: flex
      align-items: center
      text-align: center
      color: $color-white
</style>