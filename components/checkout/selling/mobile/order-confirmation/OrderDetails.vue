<template>
  <b-row class="outer-wrapper">
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.order_details')"
        text-center
        class="mt-0"
      />
      <!-- End of Top Title -->

      <!-- Quantity of Items Purchased Indication -->
      <b-row class="quantity-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-5-normal text-gray-25 text-center">
            {{ getTotalQuantity}}&nbsp;{{ $tc('shopping_cart.item', getTotalQuantity) }}
          </div>
        </b-col>
      </b-row>
      <!-- End of Quantity of Items Purchased Indication -->

      <ItemsList />

      <!-- Order Summary Section Title -->
      <b-row class="summary-text-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-4-medium">{{ $t('shopping_cart.order_summary') }}</div>
        </b-col>
      </b-row>
      <!-- End of Order Summary Section Title -->

      <!-- Order Summary Card -->
      <b-row class="summary-card-wrapper">
        <b-col cols="12" sm="12">
          <b-card class="mx-3">
            <!-- Order Details -->
            <b-row class="order-details-wrapper">
              <b-col cols="12" sm="12">
                <div class="body-5-regular text-gray-25">
                  <span>{{ $t('shopping_cart.subtotal') }}&colon;</span>
                  <span class="pull-right">{{ getSubtotalAfterInstantShip | toCurrency }}</span>
                </div>
                <div class="body-5-regular text-gray-25 mt-2">
                  <span>{{ $t('shopping_cart.shipping_fee') }}&colon;</span>
                  <span class="pull-right">{{ getShippingFee | toCurrency }}</span>
                </div>
                <div class="body-5-regular text-gray-25 mt-2">
                  <span>{{ $t('shopping_cart.processing_fee') }}&colon;</span>
                  <span class="pull-right">{{ getProcessingFee | toCurrency }}</span>
                </div>
                <div class="body-5-regular text-gray-25 mt-2">
                  <span>{{ $t('shopping_cart.tax') }}&colon;</span>
                  <span class="pull-right">{{ getTax | toCurrency }}</span>
                </div>
                <div class="body-5-normal text-black mt-2">
                  <span>{{ $t('shopping_cart.total') }}&colon;</span>
                  <span class="pull-right">{{ getTotal | toCurrency }}</span>
                </div>
              </b-col>
            </b-row>
            <!-- End of Order Details -->

            <!-- Crypto Details -->
            <b-row v-if="cryptoDetails.address" class="crypto-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-5-regular text-black">{{ $t('shopping_cart.requested_amount') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col cols="6" sm="6">
                    <b-input-group class="wallet-address-group">
                      <b-input
                        readonly
                        :value="cryptoDetails.estimatedAmount"
                      ></b-input>
                      <b-input-group-append class="d-flex align-items-center">
                        <CopyBlackSVG @click="copyToClipboard(cryptoDetails.estimatedAmount)" />
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col cols="6" sm="6" class="d-flex align-items-center">
                    <div class="body-10-medium text-black text-uppercase">{{ cryptoDetails.currency }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col cols="12" sm="12">
                    <div class="body-5-regular text-gray-25 text-uppercase">
                      &bull;&nbsp;1&nbsp;{{ cryptoDetails.currency }}&nbsp;&equals;&nbsp;{{ getCryptoPriceInDollars | formatPrice }}&nbsp;USD
                    </div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="12" sm="12">
                    <div class="body-5-regular text-black">{{ $t('shopping_cart.wallet_address') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col cols="12" sm="12">
                    <b-input-group class="wallet-address-group">
                      <b-input
                        readonly
                        :value="cryptoDetails.address"
                      ></b-input>
                      <b-input-group-append class="d-flex align-items-center">
                        <CopyBlackSVG @click="copyToClipboard(cryptoDetails.address)" />
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Crypto Details -->

            <!-- Payment Details -->
            <b-row class="payment-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-4-medium text-black">{{ $t('shopping_cart.payment') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.order_date') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ orderDate }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.payment') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getPaymentMethod }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Payment Details -->

            <!-- Billing Details -->
            <b-row class="billing-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-4-medium text-black">{{ $t('shopping_cart.billing') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6" class="pr-0">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.customer_information') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getBillingFullName }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.billing_address') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getBillingAddress }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getBillingCity }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getBillingCountry }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Billing Details -->

            <!-- Shipping Details -->
            <b-row class="shipping-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-4-medium text-black">{{ $t('shopping_cart.shipping') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.shipping_method') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ shippingMethod }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ shippingArrival }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.shipping_address') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getShippingAddress }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getShippingCity }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getShippingCountry }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Shipping Details -->

          </b-card>
        </b-col>
      </b-row>
      <!-- End of Order Summary Card -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import clipboardMixin from '~/plugins/mixins/clipboard'
import billingAddressMixin from '~/plugins/mixins/billing-address'
import shippingAddressMixin from '~/plugins/mixins/shipping-address'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ItemsList from '~/components/checkout/selling/mobile/order-confirmation/ItemsList'
import CopyBlackSVG from '~/assets/img/shopping-cart/copy-black.svg?inline'
import { AMOUNT_OFFSET, FIXED_PRODUCT, PERCENT, PERCENT_OFFSET } from '~/static/constants'

export default {
  name: 'OrderDetails',
  components: { ShoppingBagTitle, ItemsList, CopyBlackSVG },
  mixins: [ clipboardMixin, billingAddressMixin, shippingAddressMixin ],
  data() {
    return {
      orderDate: new Date().toLocaleDateString(),
      shippingMethod: 'Ground Shipping',
      shippingArrival: '(3-7 Business Days)',
    }
  },
  computed: {
    ...mapGetters({
      orderDetails: 'order-details/getOrderDetails',
      products: 'order-details/getProducts',
      paymentMethod: 'auth/getPaymentMethod',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
      freeShippingRedeemedReward: 'order-details/getFreeShippingRedeemedReward',
      freeSneakersRedeemedReward: 'order-details/getFreeSneakersRedeemedReward',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate'
    }),
    getPaymentMethod(vm) {
      if (vm.cryptoDetails.address) {
        return this.$t(`shopping_cart.${vm.cryptoDetails.currency}`)
      } else {
        return vm.paymentMethod.cardBrand.toUpperCase() + ' - ' + vm.paymentMethod.cardLastDigits + ', Exp. ' + vm.paymentMethod.cardExpiryDate
      }
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      let totalQuantity =  vm.products.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)

      if (vm.freeSneakersRedeemedReward) {
        ++totalQuantity
      }

      return totalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getCryptoPriceInDollars: (vm) => {
      // Returns the cryptocurrency logo.
      if (vm.cryptoDetails.currency) {
        return Math.floor(vm.getTotal / vm.cryptoDetails.estimatedAmount)
      }
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.products.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterInstantShip: (vm) => {
      return vm.products.reduce((sum, product) => {
        if (product.instantShipPrice) {
          return sum + product.instantShipPrice * product.quantity
        }

        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      if (vm.getSubtotalAfterInstantShip) {
        return Math.max(vm.getSubtotalAfterInstantShip - vm.getDiscount, 0)
      }

      return Math.max(vm.getSubtotal - vm.getDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      if (vm.freeShippingRedeemedReward) {
        return 0.00
      }

      return vm.shippingFee * vm.getTotalQuantity
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
      return Math.trunc(vm.taxRate * vm.getSubtotalAfterDiscount)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      return vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotalAfterDiscount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {
            const items = vm.products.filter((item) => {
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
            if (vm.getSubtotalAfterInstantShip) {
              discount += vm.getSubtotalAfterInstantShip * (vm.promoCode.amount / PERCENT_OFFSET)
            } else {
              discount += vm.getSubtotal * (vm.promoCode.amount / PERCENT_OFFSET)
            }

            break;
          }
          default:
            discount += vm.promoCode.amount * AMOUNT_OFFSET
        }
      }

      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getGiftCardDiscount: (vm) => {
      let discount = 0

      if (vm.giftCard) {
        discount += vm.giftCard.amount
      }

      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      return Math.trunc(vm.getPromoDiscount + vm.getGiftCardDiscount)
    },
  },
  destroyed() {
    this.removePromoCode()
    this.removeGiftCard()
  },
  methods: {
    ...mapActions({
      removePromoCode: 'order-details/removePromoCode',
      removeGiftCard: 'order-details/removeGiftCard',
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.outer-wrapper
  overflow-y: auto
  overflow-x: hidden
  height: 100%

.quantity-wrapper
  margin-top: 7px
  padding-bottom: 27px
  border-bottom: 1px solid $color-gray-47

.summary-text-wrapper
  background: $color-gray-23b
  padding: 11px 18px 14px

.summary-card-wrapper
  background: $color-gray-23b

  .card
    border-radius: 1.5rem

    .crypto-details-wrapper
      svg
        margin-left: 15px

      .wallet-address-group
        input
          border-radius: 0.5rem
          background: $color-white-5
          color: $black-1
          @include body-5-medium

        div
          background: $color-white-5
          padding-right: 11px
          border-top-right-radius: 0.5rem
          border-bottom-right-radius: 0.5rem

    .order-details-wrapper, .crypto-details-wrapper, .payment-details-wrapper, .billing-details-wrapper
      border-bottom: 1px solid $color-gray-23b
      padding-top: 16px
      padding-bottom: 16px

      div
        font-family: "SF Pro Display", serif

    .shipping-details-wrapper
      padding-top: 16px

      div
        font-family: "SF Pro Display", serif
</style>
