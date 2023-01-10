<template>
  <b-col cols="12" sm="12" class="px-0 bid-shopping-bag">
    <!-- Top Title -->
    <ShoppingBagTitle
      :title="`${$t('common.auction')}: ${ auction.id }`"
      back-link
      text-center
      @click="$router.push(`/auction/${auction.id}`)"
    />
    <!-- End of Top Title -->

    <AuctionCart :auction="auction" />

    <PromoCodeButton v-if="! isPromoCodeVisible && ! promoCode" @show-promo="isPromoCodeVisible = true" />

    <PromoCodeInput v-if="isPromoCodeVisible && !promoCode" @click="applyPromoCode">
      <template #label>
        <div class="section-title body-5-medium">{{ $t('shopping_cart.promo_code') }}&colon;</div>
      </template>
    </PromoCodeInput>

    <OrderSummaryCard
      class="order-summary-card"
      :items="getItems"
      :promo-code="promoCode"
      :promo-code-discount="getPromoDiscount"
      :gift-card-number="giftCard.number"
      :gift-card-discount="getGiftCardDiscount"
      @clear-promo="removePromoCode"
      @clear-gift-card="removeGiftCard"
    >
      <template #label>
        <div class="section-title total-text body-5-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </template>
    </OrderSummaryCard>

    <!-- Checkout Button -->
    <b-row class="btn-wrapper">
      <b-col cols="12" sm="12" class="text-center">
        <Button
          class="body-13-medium place-bid-btn"
          pill
          variant="dark-blue"
          @click="handleCheckoutButtonClick"
        >{{ $t('auctions.frontpage.place_bid') }}
        </Button>
      </b-col>
    </b-row>
    <!-- End of Checkout Button -->

    <!-- Bottom Sheet with Dynamic Component Rendering -->
    <vue-bottom-sheet
      ref="shoppingBagOrder"
      :max-width="bottomSheetMaxWidth"
      :max-height="bottomSheetMaxHeight"
    >
      <ShoppingBagOrder />
    </vue-bottom-sheet>
    <!-- End of Bottom Sheet with Dynamic Component Rendering -->
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import orderDetailsMixin from '~/plugins/mixins/order-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import AuctionCart from '~/components/Auctions/AuctionCart'
import PromoCodeButton from '~/components/checkout/common/PromoCodeButton'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import ShoppingBagOrder from '~/components/checkout/bid/mobile/ShoppingBagOrder'
import Button from '~/components/common/Button'
import {
  BAD_REQUEST,
  NOT_FOUND, 
  FIXED_PRODUCT,
  PERCENT,
} from '~/static/constants'

export default {
  name: 'ShoppingBag',
  components: { ShoppingBagTitle, AuctionCart, PromoCodeButton, PromoCodeInput, OrderSummaryCard, Button, ShoppingBagOrder },
  mixins: [ emitEventMixin, orderDetailsMixin ],
  data() {
    return {
      bottomSheetMaxWidth: '640px',
      bottomSheetMaxHeight: '95%',
      isPromoCodeVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/authenticated',
      auction: 'auction/activeAuction',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      paymentToken: 'order-details/getPaymentToken',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
    }),
    shoppingCart: (vm) => {
      return vm.auction ? [vm.auction] : []
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingFullName: (vm) => {
      return `${vm.billingAddress.firstName} ${vm.billingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingAddress: (vm) => {
      return `${vm.billingAddress.addressLine}, ${vm.billingAddress.city}, ${vm.billingAddress.country}, ${vm.billingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFullName: (vm) => {
      return `${vm.shippingAddress.firstName} ${vm.shippingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingAddress: (vm) => {
      return `${vm.shippingAddress.addressLine}, ${vm.shippingAddress.city}, ${vm.shippingAddress.country}, ${vm.shippingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart[0].bid_price || 0
    },
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {
            const items = vm.auction.auction_items.filter((item) => {
              return item.inventory.product.sku === vm.promoCode.sku
            })

            if (items) {
              const totalQuantity = items.length

              discount += totalQuantity * vm.promoCode.amount * 100
            }

            break;
          }
          case PERCENT: {
            discount += vm.getSubtotal * (vm.promoCode.amount / 100)

            break;
          }
          default:
            discount += vm.promoCode.amount * 100
        }
      }

      return discount
    },
    getTotalQuantity: (vm) => {
      return vm.auction.auction_items ? vm.auction.auction_items.length : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      return vm.shippingFee * vm.getTotalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return Math.trunc(vm.processingFee * vm.getSubtotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * (vm.getSubtotal - vm.getDiscount))
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotal - vm.getDiscount
      return total
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      return vm.getPromoDiscount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []

      items.push({ label: vm.$t('auction.bid_amount'), value: vm.getSubtotal })
      items.push({ label: vm.$t('shopping_cart.shipping_fee'), value: vm.getShippingFee })
      items.push({ label: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee })
      items.push({ label: vm.$t('shopping_cart.tax'), value: vm.getTax })

      return items
    }
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
    openBottomSheet(maxHeight = '95%', maxWidth = '640px') {
      this.bottomSheetMaxHeight = maxHeight
      this.bottomSheetMaxWidth = maxWidth
      this.$refs.shoppingBagOrder.open()
    },
    handleCheckoutButtonClick() {
      if (this.isAuthenticated) {
        this.emitRenderComponentEvent(this.$options.components.ShoppingBagOrder.components.CheckoutSummary.name)
        this.openBottomSheet('95%')
      } else {
        this.emitRenderComponentEvent(this.$options.components.ShoppingBagOrder.components.SignUpForm.name)
        this.openBottomSheet('95%')
      }
    },
    handleItemOptionsClick(product) {
      this.emitRenderComponentEvent(this.$options.components.ShoppingBagOrder.components.ListItemOptionsMenu.name, product)
      this.openBottomSheet('328px')
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/css/_variables'

.text-gray-102
  color: $color-gray-102

.empty-cart-section
  margin: 167px 50px 0
  height: calc(100vh - 200px)

  .body-15-bold
    font-family: $font-sp-pro

  .body-3-normal
    font-family: $font-sf-pro-text

  .text-gray-102
    margin-top: 18px

  button
    @include body-4-medium
    margin-top: 50px
    width: 222px
    height: 40px
    border-radius: 2px

.btn-wrapper
  height: 40px
  width: 100%
  margin-top: 14px
  margin-bottom: 14px

  .btn
    &.btn-dark-blue
      &.btn-checkout
        font-family: $font-sp-pro
        font-style: $normal
        position: fixed
        bottom: 35px
        left: 50%
        transform: translateX(-50%)
        width: 216px
        height: 40px

        &:disabled
          border: none
          background: $color-gray-1
          color: $color-gray-47

.section-title
  margin-bottom: 7px

  &.total-text
    @include body-13-medium
    font-family: $font-sp-pro

/* Override bottom sheet settings in order to fix height readjustment. */
.bottom-sheet
  &__content
    height: 100%
    font-family: $font-sp-pro !important
    overflow-x: hidden !important

.bid-shopping-bag::v-deep
  .promo-btn-wrapper
    padding: 0 15px 19px 17px
    margin: 19px 0 0
    .body-5-regular
      font-family: $font-montserrat
      letter-spacing: 0.06em
      color: $color-gray-5

.place-bid-btn
  width: 216px
  margin-top: 5px
  height: 40px
</style>
