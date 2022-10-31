<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.add_card_payment')"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.PaymentOptionsMenu.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <!-- Card Details Form -->
      <b-row class="payment-details-wrapper">
        <b-col cols="12" sm="12">
          <!-- Card Holder Name Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <b-form-group>
                <div id="card-holder-name" class="payment-details" />
                <span
                  v-if="formErrors.checkname.message"
                  class="body-18-normal text-red-3"
                >
                  {{ formErrors.checkname.message }}
                </span>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- End of Card Holder Name Field -->

          <!-- Card Number Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <b-form-group>
                <div id="card-number" class="payment-details" />
                <span
                  v-if="formErrors.ccnumber.message"
                  class="body-18-normal text-red-3"
                >
                  {{ formErrors.ccnumber.message }}
                </span>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- End of Card Number Field -->

          <!-- Loading Spinner -->
          <b-row v-if="isLoading" class="spinner-wrapper">
            <b-col cols="12" sm="12" class="text-center">
              <b-spinner variant="blue-20"></b-spinner>
            </b-col>
          </b-row>
          <!-- End of Loading Spinner -->

          <!-- Card Expiry Date Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <b-form-group>
                <div id="exp-date" class="payment-details" />
                <span
                  v-if="formErrors.ccexp.message"
                  class="body-18-normal text-red-3"
                >
                  {{ formErrors.ccexp.message }}
                </span>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- End of Card Expiry Date Field -->

          <!-- Card Security Code Field -->
          <b-row>
            <b-col cols="12" sm="12">
              <b-form-group>
                <div id="security-code" class="payment-details" />
                <span
                  v-if="formErrors.cvv.message"
                  class="body-18-normal text-red-3"
                >
                  {{ formErrors.cvv.message }}
                </span>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- End of Card Security Code Field -->
        </b-col>
      </b-row>
      <!-- End of Card Details Form -->

      <!-- Loading Spinner -->
      <b-row v-if="isButtonLoading" class="btn-spinner-wrapper">
        <b-col cols="12" sm="12" class="text-center">
          <b-spinner variant="blue-20"></b-spinner>
        </b-col>
      </b-row>
      <!-- End of Loading Spinner -->

      <!-- Continue Button -->
      <b-row v-else class="continue-btn-wrapper">
        <b-col cols="12" sm="12" class="text-center px-0">
          <Button id="continue" type="button" variant="dark-blue" pill @click="isButtonLoading = true">
            {{ $t('shopping_cart.continue') }}
          </Button>
        </b-col>
      </b-row>
      <!-- End of Continue Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import Button from '~/components/common/Button'
import { CARD_LAST_DIGITS_OFFSET, NMI_COLLECTJS_URL, PAYMENT_METHOD_TYPE_CARD } from '~/static/constants'

export default {
  name: 'PaymentCard',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, Button },
  mixins: [ emitEventMixin ],
  data() {
    return {
      isLoading: true,
      isButtonLoading: false,
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        saveForNextTime: false,
      },
      formErrors: {
        checkname: {
          message: '',
        },
        ccnumber: {
          message: '',
        },
        ccexp: {
          message: '',
        },
        cvv: {
          message: '',
        },
      },
      paymentToken: {},
      shippingFee: 1000, // TODO: Temporary dummy data
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
    }
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'shopping-cart/getShoppingCart',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      // TODO: Handle coupons as well
      let total = vm.shippingFee + vm.processingFee + vm.tax + vm.getSubtotal

      if (vm.promoCode) {
        total -= vm.promoCode.amount
      }

      if (vm.giftCard) {
        total -= vm.giftCard.amount
      }

      return total
    },
  },
  mounted() {
    this.injectCollectJs()
  },
  methods: {
    ...mapActions({
      addPaymentMethod: 'auth/addPaymentMethod',
      addPaymentToken: 'order-details/addPaymentToken',
      removeCryptoDetails: 'order-details/removeCryptoDetails',
    }),
    // Inject Collect.js into document head
    // Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
    injectCollectJs() {
      const el = document.createElement('script')
      el.setAttribute('src', NMI_COLLECTJS_URL)
      el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
      el.async = true
      el.addEventListener('load', () => {
        /* Global CollectJS */
        // eslint-disable-next-line no-undef
        CollectJS.configure({
          paymentSelector: '#continue',
          fields: {
            checkname: {
              selector: '#card-holder-name',
              title: this.$t('shopping_cart.card_holder_name'),
              placeholder: this.$t('shopping_cart.card_holder_name'),
            },
            ccnumber: {
              selector: '#card-number',
              title: this.$t('shopping_cart.card_number'),
              placeholder: this.$t('shopping_cart.card_number'),
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
            price: this.getTotal,
          },
          styleSniffer: 'true',
          variant: 'inline',
          validationCallback: (field, status, message) => {
            if (! status) {
              this.isButtonLoading = false
            }

            this.formErrors[field].message = status ? '' : message

          },
          fieldsAvailableCallback: () => {
            this.isLoading = false
          },
          callback: async (response) => {
            this.isButtonLoading = true
            // If token exists
            if (response.token) {
              this.form.inputCardHolderName = response.check.name
              // Extract the last 4 digits of the card number.
              this.form.inputCardNumber = response.card.number.slice(
                response.card.number.length - CARD_LAST_DIGITS_OFFSET
              )
              // Format the date to MM / YYYY.
              this.form.inputCardExpiryDate =
                response.card.exp.substring(0, 2) +
                '/' +
                response.card.exp.substring(2)
              this.form.inputCardBrand = response.card.type
              this.paymentToken = response.token
              await this.savePaymentDetails()
              this.submit()
            } else {
              this.isButtonLoading = false
              this.$toasted.error(this.$t('payments.please_enter_valid_info').toString())
            }
          },
        })
      })
      document.head.appendChild(el)
    },
    savePaymentDetails() {
      this.removeCryptoDetails().then(() => {
        // Save the payment method for future purchases, otherwise keep it temporarily.
        this.addPaymentMethod({
            paymentMethod: this.form,
            paymentMethodType: PAYMENT_METHOD_TYPE_CARD,
        })
        // Save the newly created payment token in order to be used for placing the order.
        this.addPaymentToken({
          paymentToken: this.paymentToken,
          amount: this.getTotal,
        })
      })
    },
    submit() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.BillingForm.name
      )
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.spinner-wrapper
  margin-top: 26px

  .spinner-border
    width: 3rem
    height: 3rem

.btn-spinner-wrapper
  margin: 34px 0 34px

  .spinner-border
    width: 3rem
    height: 3rem

.payment-details-wrapper::v-deep
  margin: 20px 18px 0

  .form-group
    margin-bottom: 0

  input
    margin: 16px 0 0
    border-radius: 0.5rem
    background: $color-white-5
    color: $black-1
    @include body-5-regular

    &::placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder
      @include body-5-regular
      color: $color-gray-47

.continue-btn-wrapper
  margin: 34px 0 34px

  .btn
    min-height: 40px
    min-width: 216px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47
</style>
