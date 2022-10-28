<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.payment_information')"
      @click="
        emitRenderComponentEvent($parent.$options.components.OrderSummary.name)
      "
    /><!-- End of Order Title -->

    <!-- Card Payment Radio Option -->
    <RadioOptionCard
      class="mt-4"
      :checked="cardOption.checked"
      :name="cardOption.name"
      :value="cardOption.value"
      :text="cardOption.text"
      :image-urls="cardOption.imageUrls"
    />
    <!-- End of Card Payment Radio Option -->

    <!-- Card Details Form -->
    <b-row>
      <b-col md="12">
        <b-card class="custom-card">
          <!-- Card Holder Name Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="card-holder-name" label-cols-md="6">
                <template #label
                  >{{ $t('shopping_cart.card_holder_name') }}&ast;</template
                >
                <div id="card-holder-name" class="payment-details">
                  <b-row v-if="fieldsSpinnerLoading">
                    <b-col md="12" class="text-center">
                      <b-spinner variant="color-blue-2" small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.checkname.message"
                  :class="formErrors.checkname.textClass"
                  class="p-2"
                  >{{ formErrors.checkname.message }}</span
                >
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Holder Name Field -->

          <!-- Card Number Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="card-number" label-cols-md="6">
                <template #label
                  >{{ $t('shopping_cart.card_number') }}&ast;</template
                >
                <div id="card-number" class="payment-details">
                  <b-row v-if="fieldsSpinnerLoading">
                    <b-col md="12" class="text-center">
                      <b-spinner variant="color-blue-2" small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.ccnumber.message"
                  :class="formErrors.ccnumber.textClass"
                  class="p-2"
                  >{{ formErrors.ccnumber.message }}</span
                >
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Number Field -->

          <!-- Card Expiry Date Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="exp-date" label-cols-md="6" class="pr-0">
                <template #label class="pr-0"
                  >{{ $t('shopping_cart.exp_date') }}&ast;</template
                >
                <div id="exp-date" class="payment-details">
                  <b-row v-if="fieldsSpinnerLoading">
                    <b-col md="12" class="text-center">
                      <b-spinner variant="color-blue-2" small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.ccexp.message"
                  :class="formErrors.ccexp.textClass"
                  class="p-2"
                  >{{ formErrors.ccexp.message }}</span
                >
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Expiry Date Field -->

          <!-- Card Security Code Field -->
          <b-row class="mt-2">
            <b-col md="12">
              <b-form-group label-for="security-code" label-cols-md="6">
                <template #label
                  >{{ $t('shopping_cart.security_code') }}&ast;</template
                >
                <div id="security-code" class="payment-details">
                  <b-row v-if="fieldsSpinnerLoading">
                    <b-col md="12" class="text-center">
                      <b-spinner variant="color-blue-2" small></b-spinner>
                    </b-col>
                  </b-row>
                </div>
                <span
                  v-if="formErrors.cvv.message"
                  :class="formErrors.cvv.textClass"
                  class="p-2"
                  >{{ formErrors.cvv.message }}</span
                >
              </b-form-group>
            </b-col> </b-row
          ><!-- End of Card Security Code Field -->
        </b-card>

        <!-- Save For Next Time Checkbox -->
        <b-row class="mt-4">
          <b-col md="2" offset-md="1" class="text-center">
            <b-form-checkbox v-model="form.saveForNextTime"></b-form-checkbox>
          </b-col>
          <b-col md="9">
            <i18n
              path="shopping_cart.save_for_next_time"
              tag="p"
              class="body-5-regular justify-content-start"
            ></i18n>
          </b-col> </b-row
        ><!-- End of Save For Next Time Checkbox -->

        <!-- Continue Button -->
        <b-row class="mt-4">
          <b-col v-if="buttonSpinnerLoading" md="12" class="text-center">
            <b-spinner variant="color-blue-2"></b-spinner>
          </b-col>
          <b-col v-else md="12" class="text-center">
            <b-button
              id="continue"
              type="submit"
              class="px-5"
              variant="confirm"
              pill
              @click="buttonSpinnerLoading = true"
              >{{ $t('shopping_cart.continue') }}</b-button
            >
          </b-col>
        </b-row>
      </b-col> </b-row
    ><!-- End of Continue Button -->
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import eventMixin from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard'
import {
  CARD_LAST_DIGITS_OFFSET,
  PAYMENT_METHOD_TYPE_CARD,
} from '~/static/constants'
import {NMI_COLLECTJS_URL} from '~/static/constants/environments'

export default {
  name: 'PaymentCard',
  components: { OrderTitle, RadioOptionCard },
  mixins: [eventMixin],
  data() {
    return {
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
    getBillingFullName: (vm) => {
      return `${vm.billingAddress.firstName} ${vm.billingAddress.lastName}`
    },
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
    }),
    // Inject Collect.js into document head
    // Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
    injectCollectJs() {
      const el = document.createElement('script')
      el.setAttribute('src', NMI_COLLECTJS_URL)
      el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
      el.async = true
      el.addEventListener('load', () => {
        /* global CollectJS */
        /* eslint no-undef: 1 */
        CollectJS.configure({
          paymentSelector: '#continue',
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
            price: this.getTotal,
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
          callback: (response) => {
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
              this.savePaymentDetails()
              this.submit()
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
    savePaymentDetails() {
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
    },
    submit() {
      // If there is cardholder name & billing address name mismatch show the error page.
      if (
        this.getBillingFullName.toLowerCase() !==
        this.form.inputCardHolderName.toLowerCase()
      ) {
        this.emitRenderComponentEvent(
          this.$parent.$options.components.PaymentOptionError.name
        )
        return
      }
      this.emitRenderComponentEvent(
        this.$parent.$options.components.OrderSummary.name
      )
    },
  },
}
</script>
