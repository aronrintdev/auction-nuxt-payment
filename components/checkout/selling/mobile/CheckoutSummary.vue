<template>
  <!-- Checkout Summary -->
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.checkout')"
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

      <!-- User Actions List Items -->
      <b-row class="options-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item @click="handleShippingAddressClick">
              <b-row class="d-flex">
                <b-col cols="3" sm="3">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.shipping') }}</span>
                </b-col>
                <b-col v-if="shippingAddress" cols="9" sm="9" class="text-right">
                  <div>
                    <span class="option-action text-gray-25 body-5-regular">{{ getShippingFullName }}</span>
                    <ArrowRightBlackSVG />
                  </div>
                  <div class="shipping-detail text-gray-25 body-5-regular">{{ getShippingAddress }}</div>
                  <div class="shipping-detail text-gray-25 body-5-regular">{{ getShippingCity }}</div>
                  <div class="shipping-detail text-gray-25 body-5-regular">{{ getShippingCountry }}</div>
                </b-col>
                <b-col v-else cols="9" sm="9" class="text-right">
                  <span class="option-action text-blue-20 body-5-normal">{{ $t('shopping_cart.add_shipping') }}</span>
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item @click="emitRenderComponentEvent($parent.$options.components.PaymentOptionsMenu.name)">
              <PaymentDetailsListItem />
            </b-list-group-item>
            <b-list-group-item @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)">
              <b-row>
                <b-col cols="6" sm="6">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.total') }}</span>
                </b-col>
                <b-col cols="6" sm="6" class="text-right">
                  <span class="option-action text-gray-25 body-5-normal">{{ getTotal | toCurrency }}</span>
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <!-- End of User Actions List Items -->

      <!-- Terms And Conditions Text -->
      <b-row class="mt-3">
        <b-col cols="12" sm="12">
          <i18n
            path="shopping_cart.terms_and_conditions_paragraph_mobile"
            tag="div"
            class="body-10-normal text-center text-gray-25"
          >
            <span class="text-blue-30 text-decoration-underline" role="button" @click="$router.push('/terms-and-conditions')">{{ $t('shopping_cart.terms_and_conditions') }}</span>
          </i18n>
        </b-col>
      </b-row>
      <!-- End of Terms And Conditions Text -->

      <!-- Shopping Bag Place Order Button -->
      <b-row class="place-order-wrapper">
        <b-col v-if="loading" md="12" class="text-center">
          <b-spinner variant="blue-20"></b-spinner>
        </b-col>
        <b-col v-else md="12" class="text-center">
          <Button :disabled="! canPlaceOrder" type="button" variant="dark-blue" pill @click="handlePlaceOrder">{{
              $t('shopping_cart.place_order')}}
          </Button>
        </b-col>
      </b-row><!-- End of Shopping Bag Place Order Button -->
    </b-col>
  </b-row><!-- End of Checkout Summary -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import orderDetailsMixin from '~/plugins/mixins/order-details'
import billingAddressMixin from '~/plugins/mixins/billing-address'
import shippingAddressMixin from '~/plugins/mixins/shipping-address'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'
import Button from '~/components/common/Button'
import PaymentDetailsListItem from '~/components/checkout/selling/mobile/payment/PaymentDetailsListItem'
import { BAD_REQUEST, PAYMENT_METHOD_TYPE_CARD, PAYMENT_METHOD_TYPE_CRYPTO, PAYMENT_METHOD_TYPE_INSTALLMENT } from '~/static/constants'

export default {
  name: 'CheckoutSummary',
  components: {
    ShoppingBagTitle,
    ArrowRightBlackSVG,
    Button,
    PaymentDetailsListItem,
  },
  mixins: [ emitEventMixin, billingAddressMixin, shippingAddressMixin, orderDetailsMixin ],
  data() {
    return {
      loading: false,
      alternativeItems: [],
    }
  },
  computed: {
    ...mapGetters({
      paymentMethod: 'auth/getPaymentMethod',
      paymentToken: 'order-details/getPaymentToken',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
    }),
    canPlaceOrder(vm) {
      return !!(vm.getTotalQuantity
        && vm.billingAddress
        && vm.shippingAddress
        && (vm.cryptoDetails.amount || vm.paymentMethod))
    }
  },
  mounted() {
    this.getTaxRateByZip({ zip: this.billingAddress.zipCode })
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      cardCheckout: 'shopping-cart/cardCheckout',
      installmentCheckout: 'shopping-cart/installmentCheckout',
      cryptoCheckout: 'shopping-cart/cryptoCheckout',
      removeProducts: 'shopping-cart/removeProducts',
      addOrderDetails: 'order-details/addOrderDetails',
      removePaymentToken: 'order-details/removePaymentToken',
      removeRedeemedReward: 'redeemed-reward/removeRedeemedReward',
      clearRedeemedReward: 'redeemed-reward/clearRedeemedReward',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      addAlternativeProducts: 'shopping-cart/addAlternativeProducts',
      removeGiftCard: 'order-details/removeGiftCard',
      removeCryptoDetails: 'order-details/removeCryptoDetails',
      removePaymentMethod: 'auth/removePaymentMethod',
      removeInstallmentPlan: 'order-details/removeInstallmentPlan',
    }),
    clearReward() {
      this.removeRedeemedReward()
    },
    prepareCheckoutPayload(type) {
      const payload = {
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotalAfterInstantShip,
        total: this.getTotal,
        promoCode: this.promoCode ? this.promoCode.code : '',
        giftCardNumber: this.giftCard ? this.giftCard.number : '',
        giftCardAmount: this.giftCard ? this.giftCard.amount : 0,
        billingAddress: this.billingAddress,
        shippingAddress: this.shippingAddress,
        shoppingCart: this.shoppingCart,
        redeemedReward: this.freeSneakersRedeemedReward
      }

      switch (type) {
        case PAYMENT_METHOD_TYPE_CARD: {
          payload.paymentMethod = this.paymentMethod
          payload.paymentToken = this.paymentToken

          break;
        }
        case PAYMENT_METHOD_TYPE_INSTALLMENT: {
          payload.paymentMethod = this.paymentMethod
          payload.paymentToken = this.paymentToken
          payload.installmentDetails = this.installmentPlans

          break
        }
        default: {
          payload.paymentMethod = this.cryptoDetails
        }
      }

      return payload
    },
    handlePlaceOrder() {
      if (this.cryptoDetails.amount){
        this.checkoutWithCrypto()
      } else if (this.installmentPlans) {
        this.checkoutWithInstallment()
      } else {
        this.checkoutWithCard()
      }
    },
    // TODO: Extract the pattern shown in the checkout methods.
    checkoutWithCard() {
      this.loading = true
      this.cardCheckout(this.prepareCheckoutPayload(PAYMENT_METHOD_TYPE_CARD)).then((data) => {
        if (data.message === 'shopping_cart.stock_from_different_vendors') {
          this.alternativeItems = data.data
          this.$bvModal.show('alternative-items-modal')
          this.loading = false
        } else {
          data.products = this.shoppingCart
          data.redeemedReward = this.redeemedReward
          this.removeProducts()
          this.clearRedeemedReward()
          this.addOrderDetails(data).then(() => {
            this.$router.push('selling/order-confirmation')
          })
        }
      }).catch(error => {
        this.loading = false

        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          if (error.response.data?.message === 'shopping_cart.insufficient_quantity') {
            this.$bvModal.show('insufficient-quantity-modal')
          }

          return
        }

        this.$toasted.error(error.response.statusText)
      })
      this.removePaymentToken()
    },
    checkoutWithInstallment() {
      this.loading = true
      this.installmentCheckout(this.prepareCheckoutPayload(PAYMENT_METHOD_TYPE_INSTALLMENT)).then((data) => {
        if (data.message === 'shopping_cart.stock_from_different_vendors') {
          this.alternativeItems = data.data
          this.$bvModal.show('alternative-items-modal')
          this.loading = false
        } else {
          data.products = this.shoppingCart
          data.redeemedReward = this.redeemedReward
          this.removeProducts()
          this.clearRedeemedReward()
          this.addOrderDetails(data).then(() => {
            this.$router.push('selling/order-confirmation')
          })
        }
      }).catch(error => {
        this.loading = false

        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          if (error.response.data?.message === 'shopping_cart.insufficient_quantity') {
            this.$bvModal.show('insufficient-quantity-modal')
          }

          return
        }

        this.$toasted.error(error.response.statusText)
      })
      this.removePaymentToken()
    },
    checkoutWithCrypto() {
      this.loading = true
      this.cryptoCheckout(this.prepareCheckoutPayload(PAYMENT_METHOD_TYPE_CRYPTO)).then((data) => {
        if (data.message === 'shopping_cart.stock_from_different_vendors') {
          this.alternativeItems = data.data
          this.$bvModal.show('alternative-items-modal')
          this.loading = false
        } else {
          data.products = this.shoppingCart
          data.redeemedReward = this.redeemedReward
          this.removeProducts()
          this.clearRedeemedReward()
          this.addOrderDetails(data).then(() => {
            this.$router.push('selling/order-confirmation')
          })
        }
      }).catch(error => {
        this.loading = false

        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          if (error.response.data?.message === 'shopping_cart.insufficient_quantity') {
            this.$bvModal.show('insufficient-quantity-modal')
          }

          return
        }

        this.$toasted.error(error.response.statusText)
      })
    },
    handleAddToBag() {
      this.addAlternativeProducts(this.alternativeItems)
      this.$bvModal.hide('alternative-items-modal')
    },
    handleShippingAddressClick() {
      if (this.shippingAddress) {
        this.emitRenderComponentEvent(this.$parent.$options.components.ShippingInformation.name)
      } else {
        this.emitRenderComponentEvent(this.$parent.$options.components.ShippingForm.name)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.quantity-wrapper
  margin-top: 7px

.options-wrapper
  margin-top: 20px

  .list-group-item
    padding: 20px
    border-color: $color-gray-23b

    .option-action
      margin-right: 29px
      margin-left: 8px

    .shipping-detail
      margin-right: 41px

    .gift-card-detail
      margin-left: 10px

    &:hover, &:active, &:focus
      background: $color-gray-23b

.place-order-wrapper
  margin: 41px 0

  .btn
    min-width: 216px
    min-height: 40px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47

</style>
