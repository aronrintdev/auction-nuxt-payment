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
import { mapActions} from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import orderDetailsMixin from '~/plugins/mixins/order-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import Button from '~/components/common/Button'
import { BAD_REQUEST, NOT_FOUND } from '~/static/constants'

export default {
  name: 'OrderSummary',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, OrderSummaryCard, PromoCodeInput, Button },
  mixins: [ emitEventMixin, orderDetailsMixin ],
  data() {
    return {
      loading: false,
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
