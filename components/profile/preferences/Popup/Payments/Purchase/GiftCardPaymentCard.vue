<template>
  <b-card-text class="gift-card-purchase px-4 pb-4">
    <!-- Back button -->
    <b-row>
      <b-col md="12" class="ml-4">
        <span
          id="backto-btn"
          role="button"
          class="text-muted float-left text-bold"
          @click="backtoPaymentMethods"
        >
          &#60; {{ $t('preferences.payments.back_to_paymentmethods') }}
        </span>
      </b-col>
    </b-row>
    <!-- ./Back button -->
    <!-- Content -->
    <b-row class="gift-cards-paymentmethods mt-3">
      <b-col md="12" class="selected-card-heading">
        <span class="text-bold ml-4"
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
    <!-- Card Selected -->
    <RadioOptionCard
      class="mt-2 radio-option"
      :checked="cardOption.checked"
      :name="cardOption.name"
      :value="cardOption.value"
      :image-urls="cardOption.imageUrls"
      :text="cardOption.text"
    />
    <!-- ./Card Selected -->

    <!-- Card Details -->
    <b-row class="mt-4">
      <b-col md="12">
        <b-card class="custom-card">
          <!-- Card Holder Name Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="card-holder-name" label-cols-md="6">
                <template slot="label"
                  ><span class="d-flex justify-content-start"
                    >{{ $t('preferences.payments.cardholder_name') }}&ast;</span
                  ></template
                >
                <div id="card-holder-name" class="payment-details">
                  <b-row v-if="loading">
                    <b-col md="12" class="text-center">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.checkname.message"
                  :class="formErrors.checkname.textClass"
                  class="p-2"
                >
                  <small>{{ formErrors.checkname.message }}</small>
                </span>
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Holder Name Field -->

          <!-- Card Number Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="card-number" label-cols-md="6">
                <template slot="label"
                  ><span class="d-flex justify-content-start"
                    >{{ $t('preferences.payments.card_number') }}&ast;</span
                  ></template
                >
                <div id="card-number" class="payment-details">
                  <b-row v-if="loading">
                    <b-col md="12" class="text-center">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.ccnumber.message"
                  :class="formErrors.ccnumber.textClass"
                  class="p-2"
                >
                  <small>{{ formErrors.ccnumber.message }} </small>
                </span>
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Number Field -->

          <!-- Card Expiry Date Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="exp-date" label-cols-md="6" class="pr-0">
                <template slot="label" class="pr-0 d-flex justify-content-start"
                  ><span class="d-flex justify-content-start"
                    >{{ $t('preferences.payments.exp_date') }}&ast;</span
                  ></template
                >
                <div id="exp-date" class="payment-details">
                  <b-row v-if="loading">
                    <b-col md="12" class="text-center">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.ccexp.message"
                  :class="formErrors.ccexp.textClass"
                  class="p-2"
                >
                  <small>{{ formErrors.ccexp.message }}</small></span
                >
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Expiry Date Field -->

          <!-- Card Security Code Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="security-code" label-cols-md="6">
                <template slot="label" class="d-flex justify-content-start"
                  ><span class="d-flex justify-content-start"
                    >{{ $t('preferences.payments.security_code') }}&ast;</span
                  ></template
                >
                <div id="security-code" class="payment-details">
                  <b-row v-if="loading">
                    <b-col md="12" class="text-center">
                      <b-spinner small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.cvv.message"
                  :class="formErrors.cvv.textClass"
                  class="p-2"
                >
                  <small>{{ formErrors.cvv.message }}</small></span
                >
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Security Code Field -->
        </b-card>
      </b-col>
    </b-row>
    <!-- ./Card Details -->
    <b-row v-if="validInfoError" class="info-error">
      <b-col md="12">
        <span class="text-danger text-bold"
          >&ast;{{ $t('preferences.payments.please_enter_valid_info') }}</span
        >
      </b-col>
    </b-row>

    <b-row
      v-if="typeof paymentType === 'string' && paymentType === 'new-payment'"
    >
      <b-col md="12">
        <b-form-checkbox
          id="checkbox-save"
          v-model="form.saveforNextTime"
          name="checkbox-save"
        >
          {{ $t('preferences.payments.save_for_nexttime') }}
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col md="12">
        <h5 class="text-bold float-right">
          {{ $t('preferences.payments.total') }}&colon;
          {{ getTotal | toCurrency('USD', 'N/A') }}
        </h5>
      </b-col>

      <b-col v-if="buttonSpinnerLoading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="mt-2">
        <b-button
          id="purchaseGiftCard"
          ref="purchaseGiftcard"
          class="float-right px-3 text-white"
          pill
          @click="buttonSpinnerLoading = true"
          >{{ $t('preferences.payments.purchase_gift_card') }}</b-button
        >
      </b-col>
    </b-row>
  </b-card-text>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard.vue'

import { CARD_LAST_DIGITS_OFFSET } from '~/static/constants'
import emitEvent from '~/plugins/mixins/emit-event'

export default {
  name: 'GiftCardPaymentCard',

  components: {
    RadioOptionCard,
  },

  mixins: [emitEvent],

  data() {
    return {
      loading: false,
      buttonSpinnerLoading: false,
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
      validInfoError: false,
      form: {
        saveforNextTime: false,
        cardholderName: '',
        cardNumber: '',
        cardExp: '',
        cardCvv: '',
        cardBrand: '',
        paymentToken: '',
      },
      // TODO: Temporary dummy data
      // Since a virtual service there will be no shipping, value is given 0.
      shippingFee: 0,
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
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
      selectedOption: 'PaymentCard',
      disabled: false,

      placeholder: {
        cardholderName: '',
        cardNumber: '',
        cardExp: '',
        cardCvv: '',
      },
      userDetails: false,
      customerVaultId: '',
      paymentType: '',
    }
  },

  async fetch() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    const paymentID = window.localStorage.getItem('getPaymentDetails')
    this.paymentType = window.localStorage.getItem('paymentType')
    // If payment ID exist get the details from nmi, inject nmi.
    if (paymentID) {
      this.loading = true
      await this.$axios
        .get(`/preferences/payments/get-card-details/${paymentID}`)
        .then((res) => {
          if (res.data.data) {
            // Get the user details from nmi
            this.userDetails = true
            this.placeholder.cardholderName = res.data.data.ccname
            this.placeholder.cardExp = res.data.data.ccexp
            this.placeholder.cardNumber = res.data.data.ccnumber
            this.form.cardBrand = res.data.data.cctype
            this.customerVaultId = res.data.data.customer_vault_id
            // Inject Collect JS
            // Data is loaded.
            this.injectCollectJS(() => {
              // eslint-disable-next-line no-undef
              CollectJS.configure({
                paymentSelector: '#purchaseGiftCard',
                fields: {
                  checkname: {
                    selector: '#card-holder-name',
                    title: this.$t('preferences.payments.cardholder_name'),
                    placeholder: this.placeholder.cardholderName
                      ? this.placeholder.cardholderName
                      : '',
                  },
                  ccnumber: {
                    selector: '#card-number',
                    title: this.$t('preferences.payments.card_number'),
                    placeholder: this.placeholder.cardNumber
                      ? this.placeholder.cardNumber
                      : '',
                  },
                  ccexp: {
                    selector: '#exp-date',
                    title: this.$t('preferences.payments.exp_date'),
                    placeholder: this.placeholder.cardExp
                      ? this.placeholder.cardExp
                      : this.$t('preferences.payments.mm/yyyy'),
                  },
                  cvv: {
                    selector: '#security-code',
                    title: this.$t('preferences.payments.security_code'),
                    placeholder: this.$t('preferences.payments.cvv'),
                  },
                },
                styleSniffer: 'true',
                variant: 'inline',
                validationCallback: (field, status, message) => {
                  if (!status) {
                    this.buttonSpinnerLoading = status
                  }
                  this.formErrors[field].message = status ? '' : message
                  this.formErrors[field].textClass = status ? '' : 'text-danger'
                },
                fieldsAvailableCallback: () => {
                  this.loading = false
                },
                callback: (response) => {
                  // If token exists
                  if (response.token) {
                    this.validInfoError = false
                    this.form.cardBrand = response.card.type
                    this.form.paymentToken = response.token
                    this.form.cardholderName = response.check.name
                    this.form.cardNumber = response.card.number.slice(
                      response.card.number.length - CARD_LAST_DIGITS_OFFSET
                    )
                    this.form.cardExp =
                      response.card.exp.substring(0, 2) +
                      '/' +
                      response.card.exp.substring(2)
                    // Do the purchase
                    this.purchaseGiftCard()
                  } else {
                    this.buttonSpinnerLoading = false
                    this.validInfoError = true
                  }
                },
              })
            })
          }
        })
        .catch((err) => {
          this.$logger.logToServer('Get payout Details', err.response)
        })
    } else {
      // If  a new payment info is selected.
      this.loading = true
      this.injectCollectJS(() => {
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#purchaseGiftCard',
          fields: {
            checkname: {
              selector: '#card-holder-name',
              title: this.$t('preferences.payments.cardholder_name'),
              placeholder: '',
            },
            ccnumber: {
              selector: '#card-number',
              title: this.$t('preferences.payments.card_number'),
              placeholder: '',
            },
            ccexp: {
              selector: '#exp-date',
              title: this.$t('preferences.payments.exp_date'),
              placeholder: this.$t('preferences.payments.mm/yyyy'),
            },
            cvv: {
              selector: '#security-code',
              title: this.$t('preferences.payments.security_code'),
              placeholder: this.$t('preferences.payments.cvv'),
            },
          },
          styleSniffer: 'true',
          variant: 'inline',
          validationCallback: (field, status, message) => {
            if (!status) {
              this.buttonSpinnerLoading = status
            }
            this.formErrors[field].message = status ? '' : message
            this.formErrors[field].textClass = status ? '' : 'text-danger'
          },
          fieldsAvailableCallback: () => {
            this.loading = false
          },
          callback: (response) => {
            // If token exists
            if (response.token) {
              this.validInfoError = false
              this.form.cardBrand = response.card.type
              this.form.paymentToken = response.token
              this.form.cardholderName = response.check.name
              this.form.cardNumber = response.card.number.slice(
                response.card.number.length - CARD_LAST_DIGITS_OFFSET
              )
              this.form.cardExp =
                response.card.exp.substring(0, 2) +
                '/' +
                response.card.exp.substring(2)
              this.purchaseGiftCard()
            } else {
              this.buttonSpinnerLoading = false
              this.validInfoError = true
            }
          },
        })
      })
    }
  },

  computed: {
    ...mapGetters({
      getSelectedGiftCard: 'preferences/giftCardSelected',
      getGiftCardDetails: 'preferences/getGiftCardDetails',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImageName: (vm) => {
      return vm.getSelectedGiftCard.giftCard.image_name
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardAmount: (vm) => {
      return vm.getGiftCardDetails.cardDetails.giftCardAmount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total =
        vm.shippingFee +
        vm.processingFee +
        vm.tax +
        vm.getGiftCardDetails.cardDetails.giftCardAmount
      return total
    },
  },

  unmounted() {
    // Unmount collectJS
    this.removeCollectJS()
  },
  methods: {
    ...mapActions({
      giftCardCheckoutWithCard: 'preferences/giftCardCheckoutWithCard',
      savePurchaseResponse: 'preferences/savePurchaseResponse',
      savePayment: 'preferences/storePaymentVia',
    }),
    // Back to Purchase Gift Card
    backtoPaymentMethods() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardPayment.name
      )
    },

    // Purchase section
    purchaseGiftCard() {
      this.giftCardCheckoutWithCard({
        data: this.getGiftCardDetails, // Details of the giftcard
        payment: this.form, // Payment details
        total: this.getTotal, // Total
        shippingFee: this.shippingFee, // Shipping Fee
        processingFee: this.processingFee, // Processing Fee
        tax: this.tax, // Tax
        customerVaultId: this.customerVaultId, // CustomerVaultID
      }).then((res) => {
        this.savePayment({ via: this.form.cardNumber })
        // Save the purchase response
        // Store the response
        this.savePurchaseResponse({
          response: res,
        })
        // Render the success screen.
        this.emitRenderComponentEvent(
          this.$parent.$options.components.GiftCardPaymentOrderSuccess.name
        )
      }).catch((err) => {
        this.buttonSpinnerLoading = false
        this.$fetch();
        this.form.saveforNextTime = false
        this.$logger.logToServer('Gift card payment error', err.response)
      })
    },

    // Inject Collect.js into document head
    // ! Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
    injectCollectJS(callback) {
      this.removeCollectJS()
      const el = document.querySelector(
        'script[src="https://secure.networkmerchants.com/token/Collect.js"]'
      )
      if (el) {
        callback()
      } else {
        const el = document.createElement('script')
        el.setAttribute(
          'src',
          'https://secure.networkmerchants.com/token/Collect.js'
        )
        el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
        el.async = true
        el.addEventListener('load', () => callback())
        document.head.appendChild(el)
      }
    },

    // Remove the collect JS
    removeCollectJS() {
      let el = document.querySelector(
        'script[src="https://secure.networkmerchants.com/token/Collect.js"]'
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
.selected-card-heading
  span
    width: 134px
    height: 22px
    left: 580px
    top: 265px
    font-family: $font-family-montserrat
    font-style: normal
    @include body-3-medium
    color: $color-black-1
    float: left
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
  border-radius: 20px
.save-text
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-medium
  color: $color-black-1
input.form-control
  &.invalid
    border: 1px solid $color-red-1
</style>