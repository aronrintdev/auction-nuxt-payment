<template>
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.order_summary')"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.CheckoutSummary.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <!-- Quantity of Items Purchased Indication -->
      <b-row class="quantity-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-5-normal text-gray-25 text-center">
            {{ $tc('shopping_cart.item_purchasing', getTotalQuantity) }}&colon;&nbsp;{{ getTotalQuantity }}
          </div>
        </b-col>
      </b-row>
      <!-- End of Quantity of Items Purchased Indication -->

      <OrderSummaryCard
        :items="getItems"
        :promo-code="promoCode"
        :promo-code-discount="getPromoDiscount"
        :gift-card-number="giftCard.number"
        :gift-card-discount="getGiftCardDiscount"
        @clear-promo="removePromoCode"
        @clear-gift-card="removeGiftCard"
      >
        <template #label>
          <div class="section-title body-5-medium">{{ $t('shopping_cart.total') }}&colon;</div>
        </template>
      </OrderSummaryCard>

      <PromoCodeInput v-if="!promoCode" @click="applyPromoCode">
        <template #label>
          <div class="section-title body-5-medium">{{ $t('shopping_cart.promo_code') }}&colon;</div>
        </template>
      </PromoCodeInput>

      <!-- Estimated Total -->
      <b-row class="estimated-total-wrapper">
        <b-col cols="6" sm="6">
           <span class="body-5-normal text-black">{{ $t('shopping_cart.estimated_total') }}&colon;</span>
        </b-col>
        <b-col cols="6" sm="6" class="text-right">
           <span class="body-5-normal text-black">{{ getTotal | toCurrency }}</span>
        </b-col>
      </b-row>
      <!-- End of Estimated Total -->

      <!-- Shopping Bag Place Order Button -->
      <b-row class="place-order-wrapper">
        <b-col v-if="isLoading" md="12" class="text-center">
          <b-spinner variant="blue-20"></b-spinner>
        </b-col>
        <b-col v-else md="12" class="text-center">
          <Button :disabled="! getTotalQuantity" type="button" variant="dark-blue" pill @click="handlePlaceOrder">{{
              $t('shopping_cart.place_order')}}
          </Button>
        </b-col>
      </b-row><!-- End of Shopping Bag Place Order Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import billingAddressMixin from '~/plugins/mixins/billing-address'
import shippingAddressMixin from '~/plugins/mixins/shipping-address'
import orderDetailsMixin from '~/plugins/mixins/order-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import Button from '~/components/common/Button'
import {
  BAD_REQUEST,
  NOT_FOUND,
  PAYMENT_METHOD_TYPE_CARD,
  PAYMENT_METHOD_TYPE_CRYPTO,
} from '~/static/constants'

export default {
  name: 'OrderSummary',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, OrderSummaryCard, PromoCodeInput, Button },
  mixins: [ emitEventMixin, billingAddressMixin, shippingAddressMixin, orderDetailsMixin ],
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      paymentMethod: 'auth/getPaymentMethod',
      paymentToken: 'order-details/getPaymentToken',
      cryptoDetails: 'order-details/getCryptoDetails',
    })
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      cardCheckout: 'shopping-cart/cardCheckout',
      cryptoCheckout: 'shopping-cart/cryptoCheckout',
      removeProducts: 'shopping-cart/removeProducts',
      addOrderDetails: 'order-details/addOrderDetails',
      removePaymentToken: 'order-details/removePaymentToken',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      removeGiftCard: 'order-details/removeGiftCard',
    }),
    applyPromoCode(promoCode) {
      this.$axios.post('coupons/check', {
        promo_code: promoCode,
        listing_items: this.shoppingCart
      }, { handleError: false }).then((response) => {
        this.addPromoCode({
          promoCode: response.data.data,
        })
      }).catch((error) => {
        if (error.response.status === BAD_REQUEST || error.response.status === NOT_FOUND) {
          this.$toasted.error(this.$t(error.response.data.message).toString())

          return
        }

        this.$toasted.error(error)
      })
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
        default: {
          payload.paymentMethod = this.cryptoDetails
        }
      }

      return payload
    },
    handlePlaceOrder() {
      if (this.cryptoDetails.amount){
        this.checkoutWithCrypto()
      } else {
        this.checkoutWithCard()
      }
    },
    // TODO: Extract the pattern shown in the checkout methods. Implement alternative products flow
    checkoutWithCard() {
      this.isLoading = true
      this.cardCheckout(this.prepareCheckoutPayload(PAYMENT_METHOD_TYPE_CARD)).then((data) => {
        data.products = this.shoppingCart
        data.redeemedReward = []
        this.removePaymentToken()
        this.removeProducts()
        this.addOrderDetails(data).then(() => {
          this.$parent.$parent.close()
          this.$router.push('selling/order-confirmation')
        })
      }).catch(error => {
        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())
        } else {
          this.$toasted.error(error.response.statusText)
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
    checkoutWithCrypto() {
      this.isLoading = true
      this.cryptoCheckout(this.prepareCheckoutPayload(PAYMENT_METHOD_TYPE_CRYPTO)).then((data) => {
        data.products = this.shoppingCart
        data.redeemedReward = []
        this.removeProducts()
        this.addOrderDetails(data).then(() => {
          this.$parent.$parent.close()
          this.$router.push('selling/order-confirmation')
        })
      }).catch(error => {
        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())
        } else {
          this.$toasted.error(error.response.statusText)
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.quantity-wrapper
  margin-top: 7px

.section-title
  margin-bottom: 7px

.summary-wrapper
  margin-bottom: 0
  padding-bottom: 19px
  border-bottom: 1px solid $color-gray-23b

.promo-wrapper
  border-bottom: none
  margin-top: 19px
  padding-bottom: 0

.estimated-total-wrapper
  margin: 31px 40px 0

.place-order-wrapper
  margin: 41px 0

  .btn
    min-width: 216px
    min-height: 40px
</style>
