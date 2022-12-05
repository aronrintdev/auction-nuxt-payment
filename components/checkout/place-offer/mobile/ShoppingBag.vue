<template>
  <b-col cols="12" sm="12">
    <!-- Top Title -->
    <ShoppingBagTitle
      :title="$t('place_offer.offer_summary')"
      back-link
      text-center
      @click="$router.back()"
    />
    <!-- End of Top Title -->

    <ListItem
      v-show="Object.keys(offerDetails).length"
      :offer-details="offerDetails"
      product-options
      @item-options-clicked="handleItemOptionsClick"
    />

    <!-- Offer Details Section -->
    <b-row class="offer-details-wrapper">
      <b-col cols="12" sm="12">
        <div class="section-title body-4-medium text-black">{{ $t('place_offer.details') }}</div>
        <b-row>
          <b-col cols="6" sm="6" class="pr-0">
            <span class="body-5-normal text-gray-5">
              {{ $t('place_offer.offer_amount') }}&colon; &nbsp;{{ offerDetails.bid_price | toCurrency }}
            </span>
          </b-col>
          <b-col cols="6" sm="6">
            <span class="body-5-normal text-gray-5 text-right">
              {{ $t('place_offer.duration') }}&colon;&nbsp;{{ offerDetails.duration }}&nbsp;{{ $tc('place_offer.days', offerDetails.duration) }}
            </span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- End of Offer Details Section -->

    <PromoCodeButton v-if="! isPromoCodeVisible && ! promoCode" @show-promo="isPromoCodeVisible = true" />

    <PromoCodeInput v-if="isPromoCodeVisible && ! promoCode" @click="applyPromoCode">
      <template #label>
        <div class="section-title body-5-medium">{{ $t('shopping_cart.promo_code') }}&colon;</div>
      </template>
    </PromoCodeInput>

    <OrderSummaryCard
      :items="getItems"
      :promo-code="promoCode"
      :promo-code-discount="getPromoDiscount"
      @clear-promo="removePromoCode"
    >
      <template #label>
        <div class="section-title body-5-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </template>
    </OrderSummaryCard>

    <!-- Next Button -->
    <b-row class="btn-wrapper">
      <b-col cols="12" sm="12" class="text-center">
        <Button
          class="btn-next body-13-medium"
          pill
          variant="dark-blue"
          @click="handleNextButtonClick"
        >{{ $t('place_offer.next') }}
        </Button>
      </b-col>
    </b-row>
    <!-- End of Next Button -->

    <!-- Bottom Sheet with Dynamic Component Rendering -->
    <vue-bottom-sheet
      ref="shoppingBagOffer"
      :max-width="bottomSheetMaxWidth"
      :max-height="bottomSheetMaxHeight"
    >
      <ShoppingBagOrder />
    </vue-bottom-sheet>
    <!-- End of Bottom Sheet with Dynamic Component Rendering -->
  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import offerDetailsMixin from '~/plugins/mixins/offer-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ListItem from '~/components/checkout/place-offer/mobile/ListItem'
import PromoCodeButton from '~/components/checkout/common/PromoCodeButton'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import Button from '~/components/common/Button'
import ShoppingBagOrder from '~/components/checkout/place-offer/mobile/ShoppingBagOrder'
import { BAD_REQUEST, NOT_FOUND } from '~/static/constants'

export default {
  name: 'ShoppingBag',
  components: { ShoppingBagTitle, ListItem, PromoCodeButton, PromoCodeInput, OrderSummaryCard, Button, ShoppingBagOrder },
  mixins: [ emitEventMixin, offerDetailsMixin ],
  data() {
    return {
      bottomSheetMaxWidth: '640px',
      bottomSheetMaxHeight: '95%',
      isPromoCodeVisible: false,
    }
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
    }),
    applyPromoCode(promoCode) {
      this.$axios.post('coupons/check', {
        promo_code: promoCode,
        listing_items: [this.offerDetails.product]
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
      this.$refs.shoppingBagOffer.open()
    },
    handleNextButtonClick() {
      this.emitRenderComponentEvent(this.$options.components.ShoppingBagOrder.components.CheckoutSummary.name)
      this.openBottomSheet('95%')
    },
    handleItemOptionsClick() {
      this.emitRenderComponentEvent(this.$options.components.ShoppingBagOrder.components.ListItemOptionsMenu.name)
      this.openBottomSheet('328px')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

div, span, button
  font-family: 'SF Pro Display', serif

.offer-details-wrapper
  margin-top: 23px
  padding: 0 18px 26px
  border-bottom: 1px solid $color-gray-23b

.section-title
  margin-bottom: 7px

.btn
  &.btn-dark-blue
    &.btn-next
      width: 216px
      height: 40px
      margin-bottom: 14px

/* Override bottom sheet settings in order to fix height readjustment. */
.bottom-sheet
  &__content
    height: 100% !important
</style>
