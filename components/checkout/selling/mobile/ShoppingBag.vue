<template>
  <b-col cols="12" sm="12">
    <!-- Top Title -->
    <ShoppingBagTitle
      :title="$t('shopping_cart.shopping_cart')"
      :additional-title="additionalTitle"
      back-link
      text-center
      @click="$router.push('/shop')"
    />
    <!-- End of Top Title -->

    <ItemsList
      v-if="getTotalQuantity"
      @item-options-clicked="handleItemOptionsClick"
    />

    <b-row v-else class="empty-cart-section">
      <b-col cols="12" sm="12" class="d-flex flex-column align-items-center">
        <b-img block :src="require('~/assets/img/shopping-cart/empty-cart.svg')" width="157" height="107" />
        <div class="body-15-bold text-black mt-5">{{ $t('shopping_cart.empty_cart') }}</div>
        <div class="body-3-normal text-gray-102 text-center">{{ $t('shopping_cart.looks_like_you') }}&period;&period;&period;</div>
        <Button variant="dark-blue" to="/shop">{{ $t('shopping_cart.back_to_browse') }}</Button>
      </b-col>
    </b-row>

    <PromoCodeButton v-if="! isPromoCodeVisible && ! promoCode && getTotalQuantity" @show-promo="isPromoCodeVisible = true" />

    <PromoCodeInput v-if="isPromoCodeVisible && !promoCode && getTotalQuantity" @click="applyPromoCode">
      <template #label>
        <div class="section-title body-5-medium">{{ $t('shopping_cart.promo_code') }}&colon;</div>
      </template>
    </PromoCodeInput>

    <OrderSummaryCard
      v-if="getTotalQuantity"
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
    <b-row v-if="getTotalQuantity" class="btn-wrapper">
      <b-col cols="12" sm="12" class="text-center">
        <Button
          :disabled="! canCheckout"
          class="btn-checkout body-13-medium"
          pill
          variant="dark-blue"
          @click="handleCheckoutButtonClick"
        >{{ $t('shopping_cart.checkout') }}
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
import ItemsList from '~/components/checkout/selling/mobile/ItemsList'
import PromoCodeButton from '~/components/checkout/common/PromoCodeButton'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import ShoppingBagOrder from '~/components/checkout/selling/mobile/ShoppingBagOrder'
import Button from '~/components/common/Button'
import { BAD_REQUEST, NOT_FOUND } from '~/static/constants'

export default {
  name: 'ShoppingBag',
  components: { ShoppingBagTitle, ItemsList, PromoCodeButton, PromoCodeInput, OrderSummaryCard, Button, ShoppingBagOrder },
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
      isAuthenticated: 'auth/authenticated'
    }),
    canCheckout(vm) {
      return !!(vm.getTotalQuantity)
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
</style>
