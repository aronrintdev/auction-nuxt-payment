<template>
  <b-col cols="12" sm="12">
    <!-- Top Title -->
    <ShoppingBagTitle
      :title="$t('sell_now.review_sale')"
      back-link
      text-center
      @click="$router.back()"
    />
    <!-- End of Top Title -->

    <ListItem
      v-show="Object.keys(sellItem).length"
      :sell-item="sellItem"
      product-options
      @item-options-clicked="handleItemOptionsClick"
    />

    <PromoCodeInput v-if="! promoCode" @click="applyPromoCode">
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

    <!-- Payout Not Connected Text -->
    <b-row v-if="! hasPayoutMethodConnected" class="payout-text-wrapper">
      <b-col cols="12" sm="12" class="text-center">
          <span class="body-13-normal text-black">
            {{ $t('sell_now.payout_not_connected') }}&nbsp;&minus;
          </span>
        <span class="body-13-normal text-blue-30" @click="$router.push({ path: '/profile/vendor-hub' })">
          {{ $t('sell_now.connect_payout') }}
        </span>
      </b-col>
    </b-row>
    <!-- End of Payout Not Connected Text -->

    <!-- Ask Summary Text -->
    <b-row class="ask-text-wrapper">
      <b-col cols="12" sm="12" class="text-center">
          <span class="body-10-regular text-gray-25">
            {{ $t('sell_now.ask_summary_text') }}&period;
          </span>
      </b-col>
    </b-row>
    <!-- End of Ask Summary Text -->

    <!-- Sell Now Button -->
    <b-row>
      <b-col v-if="isLoading" md="12" class="text-center">
        <b-spinner variant="blue-20"></b-spinner>
      </b-col>
      <b-col v-else cols="12" sm="12" class="text-center">
        <Button
          class="btn-sell body-13-medium"
          pill
          variant="dark-blue"
          :disabled="! hasPayoutMethodConnected"
          @click="handleSellNowButtonClick"
        >{{ $t('sell_now.sell_now') }}
        </Button>
      </b-col>
    </b-row>
    <!-- End of Sell Now Button -->

    <!-- Bottom Sheet with Dynamic Component Rendering -->
    <vue-bottom-sheet
      ref="shoppingBagSellNow"
      :max-width="bottomSheetMaxWidth"
      :max-height="bottomSheetMaxHeight"
    >
      <ListItemOptionsMenu />
    </vue-bottom-sheet>
    <!-- End of Bottom Sheet with Dynamic Component Rendering -->
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sellNowDetailsMixin from '~/plugins/mixins/sell-now-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ListItem from '~/components/checkout/sell-now/mobile/ListItem'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import Button from '~/components/common/Button'
import ListItemOptionsMenu from '~/components/checkout/sell-now/mobile/ListItemOptionsMenu'
import { BAD_REQUEST, NOT_FOUND } from '~/static/constants'

export default {
  name: 'ShoppingBag',
  components: { ShoppingBagTitle, ListItem, PromoCodeInput, OrderSummaryCard, Button, ListItemOptionsMenu },
  mixins: [ sellNowDetailsMixin ],
  data() {
    return {
      isLoading: false,
      bottomSheetMaxWidth: '640px',
      bottomSheetMaxHeight: '95%',
    }
  },
  computed: {
    ...mapGetters({
      vendorPayoutMethod: 'auth/getVendorPayoutMethod',
    }),
    hasPayoutMethodConnected(vm) {
      if (vm.vendorPayoutMethod) {
        return !! Object.keys(vm.vendorPayoutMethod).length
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      doSellNow: 'sell-now/doSellNow',
      addSellNowItem: 'sell-now/addItem',
      selectedInventoryAndListing: 'sell-now/selectedItem',
    }),
    applyPromoCode(promoCode) {
      this.$axios.post('coupons/check', {
        promo_code: promoCode,
        listing_items: [this.sellItem]
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
      this.$refs.shoppingBagSellNow.open()
    },
    handleSellNowButtonClick() {
      this.isLoading = true
      // make data for the sell now.
      const data = {
        ...this.sellItem,
        totalPayout: Math.round(this.getTotal),
        sellerFee: Math.round(this.getSellerFee),
        transactionFee: Math.round(this.getTransactionFee),
        payoutmethod: this.vendorPayoutMethod,
        // Shipping Fee, processing fee and tax is added when placing an offer.
        shippingFee: 0,
        processingFee: 0,
        askPrice: this.getSubTotal,
      }
      // Do the sell now.
      this.doSellNow(data)
        .then((res) => {
          if (res.data.data.response) {
            this.addSellNowItem({})
            this.selectedInventoryAndListing({})
            this.$toasted.success(this.$t('sell_now.sell_successfull'))
            this.$router.push('/')
          }
        })
        .catch((error) => {
          this.$logger.logToServer('Sell now error', error.response.data)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handleItemOptionsClick() {
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

.summary-wrapper
  padding-bottom: 2px

.payout-text-wrapper
  margin: 0 0 26px

.ask-text-wrapper
  margin: 0 0 6px

.btn
  &.btn-dark-blue
    &.btn-sell
      width: 216px
      height: 40px
      margin-bottom: 14px

      &:disabled
        border: none
        background: $color-gray-1
        color: $color-gray-47

/* Override bottom sheet settings in order to fix height readjustment. */
.bottom-sheet
  &__content
    height: 100% !important
</style>
