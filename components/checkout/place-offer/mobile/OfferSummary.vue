<template>
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('place_offer.offer_summary')"
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
            {{ name }}
          </div>
        </b-col>
      </b-row>
      <!-- End of Quantity of Items Purchased Indication -->

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
          <Button :disabled="! canPlaceOffer" type="button" variant="dark-blue" pill>{{
              $t('place_offer.place_offer')}}
          </Button>
        </b-col>
      </b-row><!-- End of Shopping Bag Place Order Button -->
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import offerDetailsMixin from '~/plugins/mixins/offer-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import Button from '~/components/common/Button'
import { BAD_REQUEST, NOT_FOUND } from '~/static/constants'

export default {
  name: 'OfferSummary',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, OrderSummaryCard, PromoCodeInput, Button },
  mixins: [ emitEventMixin, offerDetailsMixin ],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    name: (vm) => {
      return vm.offerDetails.product.name.substr(0, 32)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    canPlaceOffer(vm) {
      return !!(vm.billingAddress
        && vm.shippingAddress
        && vm.paymentMethod
        && vm.offerDetails)
    }
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      offerSubmit: 'offer/offerSubmit',
      removePaymentToken: 'order-details/removePaymentToken',
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
    placeOffer() {
      this.loading = true
      this.offerSubmit({
        billingAddress: this.billingAddress,
        shippingAddress: this.shippingAddress,
        paymentMethod: this.paymentMethod,
        offerDetails: this.offerDetails,
        priceDetails: {
          shipping_fee: this.shippingFee,
          processing_fee: this.getProcessingFee,
          tax: this.getTax,
          sub_total: this.getSubtotalAfterDiscount,
          total: this.getTotal
        },
        paymentToken: this.paymentToken
      }).then(() => {
        this.removePaymentToken().then(() => {
          this.$parent.$parent.close()
          this.$router.push('/checkout/place-offer/order-confirmation')
        })
      }).catch((err) => {
        this.$logger.logToServer('Place Offer Error', err.response);
      }).finally(() => {
        this.loading = false
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

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47
</style>
