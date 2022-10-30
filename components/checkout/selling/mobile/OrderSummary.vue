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
        <b-col v-if="loading" md="12" class="text-center">
          <b-spinner variant="color-blue-2"></b-spinner>
        </b-col>
        <b-col v-else md="12" class="text-center">
          <Button :disabled="! getTotalQuantity" type="button" variant="dark-blue" pill>{{
              $t('shopping_cart.place_order')}}
          </Button>
        </b-col>
      </b-row><!-- End of Shopping Bag Place Order Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import Button from '~/components/common/Button'
import { AMOUNT_OFFSET, BAD_REQUEST, FIXED_PRODUCT, NOT_FOUND, PERCENT, PERCENT_OFFSET } from '~/static/constants'

export default {
  name: 'OrderSummary',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, OrderSummaryCard, PromoCodeInput, Button },
  mixins: [ emitEventMixin ],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'shopping-cart/getShoppingCart',
      promoCode: 'order-details/getPromoCode',
      giftCard: 'order-details/getGiftCard',
      redeemedReward: 'redeemed-reward/getRedeemedReward',
      freeSneakersRedeemedReward: 'redeemed-reward/getFreeSneakersRedeemedReward',
      freeShippingRedeemedReward: 'redeemed-reward/getFreeShippingRedeemedReward',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
    }),
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
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterInstantShip: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
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
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotalAfterDiscount

      return vm.getTotalQuantity > 0 ? total : 0
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
    getGiftCardDiscount(vm) {
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
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      // DVQ-24 items should be calculated if there is product in cart
      if (vm.getSubtotalAfterInstantShip) {
        items.push({ key: 'sub_total', label: vm.$t('shopping_cart.subtotal'), value: vm.getTotalQuantity > 0 ? vm.getSubtotalAfterInstantShip : 0 })
      } else {
        items.push({ key: 'sub_total', label: vm.$t('shopping_cart.subtotal'), value: vm.getTotalQuantity > 0 ? vm.getSubtotal : 0 })
      }

      items.push({ key: 'sub_total_after_discount', label: '', value: vm.getTotalQuantity > 0 ? vm.getSubtotalAfterDiscount : 0 })
      items.push({ key: 'shipping_fee', label: vm.$t('shopping_cart.shipping_fee'), value: vm.getTotalQuantity > 0 ? vm.getShippingFee : 0 })
      items.push({ key: 'processing_fee', label: vm.$t('shopping_cart.processing_fee'), value: vm.getTotalQuantity > 0 ? vm.getProcessingFee : 0 })
      items.push({ key: 'tax', label: vm.$t('shopping_cart.tax'), value: vm.getTotalQuantity > 0 ? vm.getTax : 0 })

      return items
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    additionalTitle(vm) {
      return '(' + vm.getTotalQuantity + ' ' + vm.$tc('shopping_cart.item', vm.getTotalQuantity) + ')'
    },
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
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
