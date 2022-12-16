<template>
  <div class="card-paymentInfo">
    <div class="add-new-heading mt-4">
      {{ $t('giftcard_section.add_new_paymentInfo') }}
    </div>

    <div class="payment-card">
      <b-row class="cardpayment-row">
        <b-col cols class="cardpayment-col mt-3">
          <RadioOptionCard
            class="mt-2 radio-option"
            :checked="cardOption.checked"
            :name="cardOption.name"
            :value="cardOption.value"
            :image-urls="cardOption.imageUrls"
            :text="cardOption.text"
          />
        </b-col>
      </b-row>

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
                    <b-row v-if="fieldsSpinnerLoading">
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
                    <b-row v-if="fieldsSpinnerLoading">
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
                    <b-row v-if="fieldsSpinnerLoading">
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
                    <b-row v-if="fieldsSpinnerLoading">
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

      <b-row>
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
          <b-col cols md="12">
            <span class="total float-right">
              {{ $t('common.total') }}&colon; &dollar;{{ $options.filters.formatPrice(getAmount) }}
            </span>
          </b-col>
          <b-col v-if="buttonSpinnerLoading" class="mt-4 text-center">
            <b-spinner variant="color-blue-2"></b-spinner>
          </b-col>
          <b-col v-if="!buttonSpinnerLoading" cols class="mt-4">
            <b-button
            id="add-button"
            ref="add-button"
            class="float-right px-3 text-white"
             pill
            @click="buttonSpinnerLoading = true"
            >{{ $t('giftcard_section.add', { amount: $options.filters.formatPrice(getAmount) }) }}</b-button
          >
          </b-col>
      </b-row>
    </div>
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
import { mapActions , mapGetters } from 'vuex'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard.vue'
import {NMI_COLLECTJS_URL} from '~/static/constants/environments'
import {
  CARD_LAST_DIGITS_OFFSET,
} from '~/static/constants'
import { AlertModal } from '~/components/modal'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'AddFundPaymentCard',

  components: {
    RadioOptionCard,
    AlertModal
  },

  mixins: [emitEvent],

  data() {
    return {
      MODAL_FADE_TIMEOUT: 2000,
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
      fieldsSpinnerLoading: true,
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

      form: {
        saveforNextTime: false,
        cardholderName: '',
        cardNumber: '',
        cardExp: '',
        cardCvv: '',
        cardBrand: '',
        paymentToken: '',
      },

      loading: false,

      // TODO: Temporary dummy data
      // Since a virtual service there will be no shipping, value is given 0.
      shippingFee: 0,
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
      amount: this.getAmount,
    }
  },

  computed: {
    ...mapGetters({
      billingDetails: 'preferences/billingDetails'
    }),
    // Selected amount
    getAmount: (vm) => {
      return vm.$store.state.preferences.selectedAmount
    },
    // Total amount
    gettotal: (vm) => {
      const totalAmount =  parseInt(vm.shippingFee) + parseInt(vm.processingFee) + parseInt(vm.tax) + parseInt(vm.getAmount)
      return totalAmount
    }
  },

  mounted() {
    this.injectCollectJs()
  },

  unmounted() {
    // Unmount collectJS
    this.removeCollectJs()
  },

  created() {
    // Update the content and page title
    this.updatePageTitle(this.$t('giftcard_section.add_funds'))

    this.toggleContent({
      transactionHistory: false,
      howToUse: false,
      backTo: 'NewPaymentInfo'
    })
  },

  methods: {
    ...mapActions({
      addFundsToGiftCard: 'preferences/addFundsToGiftCardWithNewPayment',
      updatePageTitle: 'preferences/viewPageTitle',
      toggleContent: 'preferences/toggleContent',
      saveGiftCardDetails: 'preferences/saveGiftCardDetails'
    }),
    // Inject collect js
    injectCollectJs() {
      const el = document.createElement('script')
      el.setAttribute('src', NMI_COLLECTJS_URL)
      el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
      el.async = true
      el.addEventListener('load', () => {
        /* Global CollectJS */
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#add-button',
          fields: {
            checkname: {
              selector: '#card-holder-name',
              title: this.$t('shopping_cart.card_holder_name'),
              placeholder: '',
            },
            ccnumber: {
              selector: '#card-number',
              title: this.$t('shopping_cart.card_number'),
              placeholder: '',
            },
            ccexp: {
              selector: '#exp-date',
              title: this.$t('shopping_cart.exp_date'),
              placeholder: this.$t('shopping_cart.mm/yyyy'),
            },
            cvv: {
              selector: '#security-code',
              title: this.$t('shopping_cart.security_code'),
              placeholder: this.$t('shopping_cart.cvv'),
            },
            price: this.gettotal,
          },
          invalidCss: {
            border: '#eb0000 1px solid',
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
            this.fieldsSpinnerLoading = false
          },
          callback: async (response) => {
            // If token exists
            if (response.token) {
              this.form.cardholderName = response.check.name
              // Extract the last 4 digits of the card number.
              this.form.cardNumber = response.card.number.slice(response.card.number.length - CARD_LAST_DIGITS_OFFSET)
              // Format the date to MM / YYYY.
              this.form.cardExp = response.card.exp.substring(0, 2) +'/' +response.card.exp.substring(2)
              this.form.cardBrand = response.card.type
              this.form.paymentToken = response.token
              await this.savePaymentDetails()
              
            } else {
              this.buttonSpinnerLoading = false
              this.$toasted.error(
                this.$t('payments.please_enter_valid_info').toString()
              )
            }
          },
        })
      })
      document.head.appendChild(el)
    },

    // Save payment details
    savePaymentDetails(){
      this.addFundsToGiftCard({
        paymentType: 'new',
        subTotal: this.getAmount,
        paymentId:{ selectedId: 0},
        tax: this.tax,
        shippingFee: this.shippingFee,
        processingFee: this.processingFee,
        total: this.gettotal,
        billing: this.billingDetails,
        payment: this.form,
        email: this.$auth.user.email
      }).then((res) => {
        this.saveGiftCardDetails(this.$route.params.id)
        if(res.success === true){
          this.$bvModal.show('reload-success');
        }
      }).catch((error) => {
        this.buttonSpinnerLoading = false
        this.removeCollectJs()
        this.injectCollectJs()
        this.$logger.logToServer('Add funds to giftcard', error.response)
      })
    },

    // On success
    onSuccessModalHidden(){
      this.emitRenderComponentEvent(this.$parent.$options.components.AddFundButton.name)
    },

    /**
     * Remove collect JS
     */
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
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.add-new-heading
  font-style: normal
  @include body-2-bold
  color: $color-black-1
.payment-card
  flex: 0 0 67%
  max-width: 67%
  @media (min-width:1154px) and (max-width: 1674px)
    flex: 0 0 100% 
    max-width: 100%
  @media (max-width: 1104px)
    flex: 0 0 100%
    max-width: 100%
  
.total
  font-style: normal
  @include body-1-medium
  color: $color-black-1
</style>