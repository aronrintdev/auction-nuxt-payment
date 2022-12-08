<template>
  <div class="new-payment-component">
    <b-col class="new-card-option px-0" cols="12">
      <div class="saved-payment-header">
        {{ $t('giftcard_section.saved_card_payment') }}
      </div>

      <RadioOptionCard
        id="radio-option-card"
        class="mt-2 radio-option mx-0"
        :checked="cardOption.checked"
        :name="cardOption.name"
        :value="cardOption.value"
        :image-urls="cardOption.imageUrls"
        :text="cardOption.text"
      />

      <!-- Card holder name -->
      <b-row class="card-payment-form mx-0">
        <b-col class="card-holder-name px-0" cols="12">
          <b-form-group label-for="card-holder-name" label-cols-md="6">
            <template id="form-label" #label>{{ $t('shopping_cart.card_holder_name') }}&ast;</template>
            <div id="card-holder-name" class="payment-details"></div>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- ./Card holder name -->

      <!-- Card Number -->
      <b-row class="card-payment-form mx-0">
        <b-col class="card-number  px-0" cols="12">
          <b-form-group label-for="card-number" label-cols-md="6">
            <template id="form-label" #label >{{ $t('shopping_cart.card_number') }}&ast;</template>
            <div class="d-flex cc-number-field">
              <div id="card-number" class="payment-details d-flex w-100"></div>
               <div class="card-brand-wrapper my-auto">
                <img :src="cardImage" class="img-fluid card-brand" />
              </div>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- ./Card Number -->

      <!-- Exp Date/ CVV -->
      <b-row class="card-payment-form mx-0">
        <b-col class="card-holder-name  px-0" cols="6">
          <b-form-group label-for="exp-date" label-cols-md="6" class="pr-0">
            <template id="form-label" #label class="pr-0">{{ $t('shopping_cart.exp_date') }}&ast;</template>
            <div id="exp-date" class="payment-details"></div>
          </b-form-group>
        </b-col>
        <b-col class="card-holder-name  px-0" cols="6">
          <b-form-group label-for="security-code" label-cols-md="6">
            <template id="form-label" #label>{{ $t('shopping_cart.security_code') }}&ast;</template>
            <div id="security-code" class="payment-details"></div>
          </b-form-group>
        </b-col>
      </b-row>
        <!-- ./Exp Date/ CVV -->
    </b-col>

    <div class="total-amount d-flex justify-content-end w-100 float-right text-align-center align-items-center">
      {{ $t('common.total') }}&colon; &dollar;{{ amount | formatPrice }}
    </div>

    <div class="bottom-button d-flex justify-content-center w-100 position-fixed">
      <b-spinner v-if="isSaving" variant="color-blue-2" class="mr-2" small></b-spinner>
      <b-button
        v-else
        id="saveCards"
        ref="saveCards"
        variant="add"
        pill
        class="d-flex align-items-center save-cards-button px-5 justify-content-center my-auto"
        @click="isSaving = true"
      >
        {{ $t('giftcard_section.add_funds') }}
      </b-button>
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
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard.vue'
import { CARD_LAST_DIGITS_OFFSET , NMI_COLLECTJS_URL } from '~/static/constants'
import TransparentAlertModal from '~/components/common/TransparentAlertModal.vue'

export default {
  name: 'NewPaymentComponent',

  components: {
    RadioOptionCard,
    TransparentAlertModal
  },

  data() {
    return {
      isSaving: false,
      showAlert: false,
      cardImage: '',
      cardOption: {
        name: 'payment-option',
        checked: 'PaymentCard',
        value: 'PaymentCard',
        imageUrls: [
          'visa-logo.png',
          'mastercard-logo.png',
          'amex-logo.png',
          'jcb-logo.png',
        ],
        text: this.$t('shopping_cart.card_payment'),
      },
      formErrors: {
        checkname: {
          message: '',
          textClass: '',
        },
        ccnumber: {
          message: '',
          textClass: '',
        },
        ccexp: {
          message: '',
          textClass: '',
        },
        cvv: {
          message: '',
          textClass: '',
        },
      },
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
      amount: 'preferences/getSelectedAmount',
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
      billingDetails: 'preferences/billingDetails',
      taxRate: 'tax-rate/getTaxRate',
      processingFee: 'order-settings/getProcessingFee',
    }),

    getTax: (vm) => {
      return vm.taxRate * vm.amount
    },

    getProcessingFee: (vm) => {
      return vm.processingFee * vm.amount
    },

    total: (vm) => {
      return Number(vm.getProcessingFee.toFixed(2) * 100) + Number(vm.getTax * 100) + Number(vm.amount)
    },
  },

  mounted() {
    this.getOrderSettings()
    this.getTaxRateByZip({ zip: this.billingDetails.inputZipCode })
    this.injectCollectJS(() => {
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#saveCards',
          fields: {
            ccnumber: {
              selector: '#card-number',
              title: this.$t('preferences.payments.card_number'),
              placeholder: ''
            },
            checkname: {
              selector: '#card-holder-name',
              title: this.$t('preferences.payments.cardholder_name'),
              placeholder: ''
            },
            ccexp: {
              selector: '#exp-date',
              title: this.$t('preferences.payments.exp_date'),
              placeholder: this.$t('preferences.payments.mm/yyyy')
            },
            cvv: {
              selector: '#security-code',
              title: this.$t('preferences.payments.security_code'),
              placeholder: ''
            }
          },
          styleSniffer: 'true',
          variant: 'inline',
          validationCallback: (field, status, message) => {
            this.formErrors[field].message = message
            this.formErrors[field].textClass = status
              ? 'text-success'
              : 'text-danger'
          },
          fieldsAvailableCallback: () => {
            this.loading = false
          },
          callback: (response) => {

            if(response.token) {
              this.renderCardImage(response.card.type)
              this.form.cardholderName = response.check.name
              this.form.cardNumber = response.card.number.slice(response.card.number.length - CARD_LAST_DIGITS_OFFSET )
              this.form.cardExp = response.card.exp.substring(0, 2) + '/' + response.card.exp.substring(2)
              this.form.cardBrand = response.card.type
              this.form.paymentToken = response.token
              
              this.savePaymentDetails()
            }else{
              this.isSaving = false
              this.$toasted.error(
                this.$t('payments.please_enter_valid_info').toString()
              )
            }
          },
        })
      })
  },

  unmounted() {
    // Unmount collectJS
    this.removeCollectJs()
  },

  methods: {
    ...mapActions({
      addFundsToGiftCard: 'preferences/addFundsToGiftCardWithNewPayment',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      getOrderSettings: 'order-settings/getOrderSettings',
      saveGiftCardDetails: 'preferences/saveGiftCardDetails',
      addPaymentDetails: 'preferences/addPaymentDetails',
    }),

    renderCardImage(type) {
      try {
         this.cardImage = require(`~/assets/img/preferences/${type.toLowerCase()}-logo.svg`)
      } catch (error) {
         this.cardImage = require('~/assets/img/preferences/visa-logo.svg')
      }
    },

    savePaymentDetails(){
      this.addFundsToGiftCard({
        paymentType: 'new',
        subTotal: this.amount,
        paymentId:{ selectedId: 0},
        tax: this.getTax * 100,
        shippingFee: 0,
        processingFee: this.getProcessingFee.toFixed(2) * 100,
        total: this.total,
        billing: this.billingDetails,
        payment: this.form,
        email: this.$auth.user.email
      }).then((res) => {
        if(res.success){
          this.saveGiftCardDetails(this.$route.params.id)
          this.showSuccess()
        }
      }).catch((error) => {
        this.isSaving = false
        this.$nuxt.refresh()
        this.$logger.logToServer('Add funds to giftcard', error.response)
      })
    },

    showSuccess() {
      this.showAlert = true
      this.addPaymentDetails({ payment: {} })
    },

    hideModal(){
      this.$router.push(`/profile/preferences/giftcard/view-giftcard/${this.$route.params.id}`)
    },

    // Inject Collect.js into document head
    // Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
    
    injectCollectJS(callback) {
      // this.removeCollectJS()
      const el = document.querySelector(
        'script[src="' + NMI_COLLECTJS_URL + '"]'
      )
      if (el) {
        callback()
      } else {
        const el = document.createElement('script')
        el.setAttribute(
          'src',
          NMI_COLLECTJS_URL,
        )
        el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
        el.async = true
        el.addEventListener('load', () => callback())
        document.head.appendChild(el)
      }
    },
    
    removeCollectJs(){
      let el = document.querySelector(
        `script[src="${NMI_COLLECTJS_URL}"]`
      )
      if (el) document.head.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlineccnumber"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckname"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlineccexp"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecvv"]')
      if (el) el.parentNode.removeChild(el)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.new-payment-component
  .total-amount
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-black-1
    padding-right: 16px
  .new-card-option::v-deep
    .card-payment-form
      padding-left: 16px
      padding-right: 16px
      .cc-number-field
        background: $color-white-5
        border-radius: 25px
        padding-left: 3px
        padding-right: 3px
        .card-brand
          width: 37px
          height: 12px
          margin-right: 12px
    #radio-option-card
      .custom-card-col
        padding-left: 16px
        padding-right: 16px
      .card-body
        background: color-white-5
        border-radius: 4px
    .col-form-label
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-gray-24
    .error-text
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-red-17
    .saved-payment-header
      font-family: $font-montserrat
      font-style: normal
      @include body-5-medium
      color: $color-black-1
      margin-top: 20px
      margin-left: 16px
      margin-right: 16px
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