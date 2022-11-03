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
      :offer-details="offerDetails"
      product-options
      @item-options-clicked="handleItemOptionsClick"
    />

    <PromoCodeInput v-if="! promoCode" @click="applyPromoCode">
      <template #label>
        <div class="section-title body-5-medium">{{ $t('shopping_cart.promo_code') }}&colon;</div>
      </template>
    </PromoCodeInput>

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
              {{ $t('place_offer.duration') }}&colon;&nbsp;{{ offerDuration }}&nbsp;{{ $tc('place_offer.days', offerDuration) }}
            </span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- End of Offer Details Section -->

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
import { mapGetters, mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ListItem from '~/components/checkout/place-offer/mobile/ListItem'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import Button from '~/components/common/Button'
import ShoppingBagOrder from '~/components/checkout/place-offer/mobile/ShoppingBagOrder'
import { AMOUNT_OFFSET, BAD_REQUEST, FIXED_PRODUCT, NOT_FOUND, PERCENT, PERCENT_OFFSET } from '~/static/constants'

export default {
  name: 'ShoppingBag',
  components: { ShoppingBagTitle, ListItem, PromoCodeInput, OrderSummaryCard, Button, ShoppingBagOrder },
  mixins: [ emitEventMixin ],
  data() {
    return {
      offerDuration: 10, // TODO: NP - Fill this once implemented.
      bottomSheetMaxWidth: '640px',
      bottomSheetMaxHeight: '95%',
    }
  },
  computed: {
    ...mapGetters({
      offerDetails: 'offer/getOfferDetails',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
      promoCode: 'order-details/getPromoCode',
      billingAddress: 'auth/getBillingAddress',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubTotal: (vm) => {
      return vm.offerDetails.bid_price
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      items.push({ key: 'sub_total', label: vm.$t('place_offer.offer_amount'), value: vm.getSubTotal > 0 ? vm.getSubTotal : 0 })
      items.push({ key: 'sub_total_after_discount', label: '', value: vm.getSubtotalAfterDiscount > 0 ? vm.getSubtotalAfterDiscount : 0 })
      items.push({ key: 'shipping_fee', label: vm.$t('shopping_cart.shipping_fee'), value: vm.shippingFee > 0 ? vm.shippingFee : 0 })
      items.push({ key: 'processing_fee', label: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee > 0 ? vm.getProcessingFee : 0 })
      items.push({ key: 'tax', label: vm.$t('shopping_cart.tax'), value: vm.getTax > 0 ? vm.getTax : 0 })

      return items
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      return Math.max(vm.getSubTotal - vm.getPromoDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return Math.trunc(vm.processingFee * vm.getSubTotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.getSubTotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      return vm.getSubtotalAfterDiscount + vm.shippingFee + vm.getProcessingFee + vm.getTax
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {

            if (vm.offerDetails.product.sku === vm.promoCode.sku) {
              discount += vm.promoCode.amount * AMOUNT_OFFSET
            }

            break;
          }
          case PERCENT: {
            discount += vm.getSubTotal * (vm.promoCode.amount / PERCENT_OFFSET)

            break;
          }
          default:
            discount += vm.promoCode.amount * AMOUNT_OFFSET
        }
      }

      return discount
    },
  },
  mounted() {
    this.getTaxRateByZip({ zip: this.billingAddress.zipCode })
  },
  methods: {
    ...mapActions({
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
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
      this.emitRenderComponentEvent(this.$options.components.ShoppingBagOrder.components.OfferSummary.name)
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
