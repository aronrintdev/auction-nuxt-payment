<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.payment_information')"
      @click="handleClick"
    /><!-- End of Order Title -->

    <!-- Crypto Payment Radio Option -->
    <RadioOptionCard
      class="mt-3"
      :name="cryptoOption.name"
      :checked="cryptoOption.checked"
      :value="cryptoOption.value"
      :text="$t(`shopping_cart.${cryptoDetails.currency}`)"
      :image-urls="`${cryptoDetails.currency}-logo.png`"
    />
   <!-- End of Crypto Payment Radio Option -->

    <!-- Payment Crypto Details -->
    <b-row>
      <b-col md="12">
        <b-card class="custom-card">
          <b-row>
            <b-col md="3">
              <div class="body-4-medium">
                {{ $t('shopping_cart.total') }}&colon;
              </div>
            </b-col>
            <b-col v-if="! spinnerLoading" md="9">
              <div class="pull-right">
                <span class="body-5-normal">&dollar;{{ getTotal | formatPrice }}&nbsp;&#8275;</span>
                <span class="body-4-medium">{{ cryptoDetails.estimatedAmount }}</span>
                <span class="body-4-medium text-uppercase">{{ cryptoDetails.currency }}</span>
              </div>
            </b-col>
            <b-col v-else md="9">
              <b-spinner class="pull-right" variant="color-blue-2" small></b-spinner>
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="! spinnerLoading" md="12">
              <span class="body-5-regular text-gray-25 text-uppercase pull-right">
                &bull;&nbsp;1&nbsp;{{ cryptoDetails.currency }}&nbsp;&equals;&nbsp;{{ getCryptoPriceInDollars | formatPrice }}&nbsp;USD
              </span>
            </b-col>
            <b-col v-else md="12">
              <b-spinner class="pull-right" variant="color-blue-2" small></b-spinner>
            </b-col>
          </b-row>

          <!-- Crypto Estimated Amount & Copy to Clipboard -->
          <b-row class="mt-3">
            <b-col md="8">
              <div class="body-5-regular text-gray-25">
                {{ $t('shopping_cart.please_send_exactly') }}&colon;
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col v-if="! spinnerLoading" md="7">
              <b-input-group>
                <b-input
                  class="bg-color-white-5"
                  readonly
                  :value="cryptoDetails.estimatedAmount"
                ></b-input>
                <b-input-group-append class="pr-1 d-flex align-items-center bg-color-white-5">
                  <CopyIcon role="button" class="btn-copy" @click="copyToClipboard(cryptoDetails.estimatedAmount)" />
                </b-input-group-append>
                <b-input-group-append class="ml-2 d-flex align-items-center">
                  <span class="text-uppercase">{{ cryptoDetails.currency }}</span>
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col v-else md="7">
              <b-spinner variant="color-blue-2" small></b-spinner>
            </b-col>
          </b-row><!-- End of Crypto Estimated Amount & Copy to Clipboard -->

          <!-- Crypto Address QR Code & Copy to Clipboard -->
          <b-row class="mt-3">
            <b-col md="12">
              <i18n
                path="shopping_cart.crypto_address"
                tag="div"
                class="body-5-regular text-gray-25"
              >
                <span class="text-uppercase">{{ cryptoDetails.currency }}</span>
              </i18n>
            </b-col>
          </b-row>
          <b-row v-if="! spinnerLoading">
            <b-col md="12" class="text-center">
              <VueQrcode
                :value="cryptoDetails.address"
                :options="qrCodeOptions"
              />
            </b-col>
          </b-row>
          <b-row v-else class="mt-4">
            <b-col md="12" class="text-center">
              <b-spinner class="w-120 h-120" variant="color-blue-2"></b-spinner>
            </b-col>
          </b-row>
          <b-row v-if="! spinnerLoading" class="mt-2">
            <b-col md="12">
              <b-input-group class="mt-1">
                <b-input
                  class="bg-color-white-5"
                  readonly
                  :value="cryptoDetails.address"
                ></b-input>
                <b-input-group-append class="pr-1 d-flex align-items-center bg-color-white-5">
                  <CopyIcon role="button" class="btn-copy" @click="copyToClipboard(cryptoDetails.address)" />
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row><!-- End of Crypto Address QR Code & Copy to Clipboard -->
          <b-row v-else class="mt-2">
            <b-col md="12" class="text-center">
              <b-spinner variant="color-blue-2" small></b-spinner>
            </b-col>
          </b-row>

          <!-- Terms & Conditions Paragraph -->
          <b-row class="mt-4">
            <b-col md="3" class="text-center">
              <b-form-checkbox v-model="agreedToTerms"></b-form-checkbox>
            </b-col>
            <b-col md="9">
              <i18n
                path="shopping_cart.terms_and_conditions_paragraph"
                tag="p"
                class="body-5-normal justify-content-start"
              >
                <span class="text-decoration-underline">{{
                  $t('shopping_cart.terms_and_conditions')
                }}</span>
              </i18n>
            </b-col> </b-row
          ><!-- End of Terms & Conditions Paragraph -->
        </b-card>

        <!-- Continue Button -->
        <b-row class="mt-4">
          <b-col v-if="! spinnerLoading" class="text-center">
            <b-button type="button" :disabled="! agreedToTerms" class="px-5" variant="confirm" pill @click="selectPaymentOption">{{
                $t('shopping_cart.deposit')
              }}</b-button>
          </b-col>
          <b-col v-else class="text-center">
            <b-spinner variant="color-blue-2"></b-spinner>
          </b-col>
        </b-row
        ><!-- End of Continue Button -->
      </b-col> </b-row
    ><!-- End of Payment Crypto Details -->
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import clipboardMixin from '~/plugins/mixins/clipboard'
import CopyIcon from '~/assets/img/shopping-cart/clone.svg?inline'
import eventMixin from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard'
import {AMOUNT_OFFSET, FIXED_PRODUCT, PERCENT, PERCENT_OFFSET} from '~/static/constants';

export default {
  name: 'PaymentCrypto',
  components: {
    OrderTitle,
    RadioOptionCard,
    VueQrcode,
    CopyIcon,
  },
  mixins: [eventMixin, clipboardMixin],
  data() {
    return {
      cryptoOption: {
        name: 'payment-option',
        value: 'crypto',
        checked: 'crypto',
      },
      spinnerLoading: true,
      qrCodeOptions: {
        width: 150,
        height: 150,
      },
      agreedToTerms: false,
    }
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'shopping-cart/getShoppingCart',
      cryptoDetails: 'order-details/getCryptoDetails',
      promoCode: 'order-details/getPromoCode',
      freeShippingRedeemedReward: 'redeemed-reward/getFreeShippingRedeemedReward',
      freeSneakersRedeemedReward: 'redeemed-reward/getFreeSneakersRedeemedReward',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getCryptoPriceInDollars: (vm) => {
      // Returns the cryptocurrency logo.
      if (vm.cryptoDetails.currency) {
        return Math.floor(vm.getTotal / vm.cryptoDetails.estimatedAmount)
      }
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotalAfterDiscount

      return vm.getTotalQuantity > 0 ? total : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      return Math.max(vm.getSubtotal - vm.getDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      return Math.trunc(vm.getPromoDiscount + vm.getGiftCardDiscount)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getGiftCardDiscount(vm) {
      let discount = 0

      if (vm.giftCard) {
        discount += vm.giftCard.amount
      }

      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {
            const items = vm.shoppingCart.filter((item) => {
              return item.sku === vm.promoCode.sku
            })

            if (items) {
              const totalQuantity = items.reduce((sum, item) => {
                return sum + item.quantity
              }, 0)

              discount += totalQuantity * vm.promoCode.amount * AMOUNT_OFFSET
            }

            break;
          }
          case PERCENT: {
            discount += vm.getSubtotal * (vm.promoCode.amount / PERCENT_OFFSET)

            break;
          }
          default:
            discount += vm.promoCode.amount * AMOUNT_OFFSET
        }
      }

      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      if (vm.freeShippingRedeemedReward) {
        return 0.00
      }

      return vm.shippingFee * vm.getTotalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      let totalQuantity =  vm.shoppingCart.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)

      if (vm.freeSneakersRedeemedReward) {
        ++totalQuantity
      }

      return totalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      if (vm.freeSneakersRedeemedReward) {
        return Math.trunc(vm.processingFee * (vm.getSubtotal + vm.freeSneakersRedeemedReward.price))
      }

      return Math.trunc(vm.processingFee * vm.getSubtotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.getSubtotal)
    },
  },
  beforeMount() {
    this.spinnerLoading = true
    this.getEstimatedCryptoPrice({
      cryptoCurrency: this.cryptoDetails.currency,
      total: this.getTotal
    }).then(() => {
      this.createCryptoPayment({
        paymentMethod: this.cryptoDetails,
        total: this.getTotal
      }).catch(error => {
        if (error.response.status === 400) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          return false
        }

        this.$toasted.error(error.response.statusText)
      }).finally(() => {
        this.spinnerLoading = false
      })
    }).catch((error) => {
      this.$toasted.error(error.response.statusText)
    })
  },
  methods: {
    ...mapActions({
      getEstimatedCryptoPrice: 'order-details/getEstimatedCryptoPrice',
      removePaymentMethod: 'auth/removePaymentMethod',
      createCryptoPayment: 'order-details/createCryptoPayment',
      removeCryptoDetails: 'order-details/removeCryptoDetails'
    }),
    selectPaymentOption() {
      this.removePaymentMethod().then(() => {
        this.emitRenderComponentEvent(this.$parent.$options.components.OrderSummary.name)
      })
    },
    handleClick() {
      this.removeCryptoDetails().then(() => {
        this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOption.name)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Helper classes for the spinner size */
.w-120
  width: 120px

.h-120
  height: 120px

/* Custom background color */
.bg-color-white-5
  background: $color-white-5
</style>
