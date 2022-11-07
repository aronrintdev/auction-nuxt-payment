<template>
  <b-row class="outer-wrapper">
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('place_offer.offer_details')"
        text-center
        class="mt-0"
      />
      <!-- End of Top Title -->

      <!-- Quantity of Items Purchased Indication -->
      <b-row class="quantity-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-5-normal text-gray-25 text-center">
            {{ offerDetails.quantity }}&nbsp;{{ $tc('shopping_cart.item', offerDetails.quantity) }}
          </div>
        </b-col>
      </b-row>
      <!-- End of Quantity of Items Purchased Indication -->

      <ListItem :offer-details="offerDetails" />

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

      <!-- Order Summary Section Title -->
      <b-row class="summary-text-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-4-medium">{{ $t('shopping_cart.order_summary') }}</div>
        </b-col>
      </b-row>
      <!-- End of Order Summary Section Title -->

      <!-- Order Summary Card -->
      <b-row class="summary-card-wrapper">
        <b-col cols="12" sm="12">
          <b-card class="mx-3">
            <!-- Order Details -->
            <b-row class="order-details-wrapper">
              <b-col cols="12" sm="12">
                <div class="body-5-regular text-gray-25">
                  <span>{{ $t('shopping_cart.subtotal') }}&colon;</span>
                  <span class="pull-right">{{ getSubTotal | toCurrency }}</span>
                </div>
                <div class="body-5-regular text-gray-25 mt-2">
                  <span>{{ $t('shopping_cart.shipping_fee') }}&colon;</span>
                  <span class="pull-right">{{ shippingFee | toCurrency }}</span>
                </div>
                <div class="body-5-regular text-gray-25 mt-2">
                  <span>{{ $t('shopping_cart.processing_fee') }}&colon;</span>
                  <span class="pull-right">{{ getProcessingFee | toCurrency }}</span>
                </div>
                <div class="body-5-regular text-gray-25 mt-2">
                  <span>{{ $t('shopping_cart.tax') }}&colon;</span>
                  <span class="pull-right">{{ getTax | toCurrency }}</span>
                </div>
                <div class="body-5-normal text-black mt-2">
                  <span>{{ $t('shopping_cart.total') }}&colon;</span>
                  <span class="pull-right">{{ getTotal | toCurrency }}</span>
                </div>
              </b-col>
            </b-row>
            <!-- End of Order Details -->

            <!-- Payment Details -->
            <b-row class="payment-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-4-medium text-black">{{ $t('shopping_cart.payment') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.order_date') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ orderDate }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.payment') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getPaymentMethod }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Payment Details -->

            <!-- Billing Details -->
            <b-row class="billing-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-4-medium text-black">{{ $t('shopping_cart.billing') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6" class="pr-0">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.customer_information') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getBillingFullName }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.billing_address') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getBillingAddress }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getBillingCity }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getBillingCountry }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Billing Details -->

            <!-- Shipping Details -->
            <b-row class="shipping-details-wrapper">
              <b-col cols="12" sm="12">
                <b-row>
                  <b-col cols="12" sm="12">
                    <div class="body-4-medium text-black">{{ $t('shopping_cart.shipping') }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.shipping_method') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ shippingMethod }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ shippingArrival }}</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="6" sm="6">
                    <div class="body-5-medium text-gray-25">{{ $t('shopping_cart.shipping_address') }}</div>
                  </b-col>
                  <b-col cols="6" sm="6">
                    <div class="body-10-regular text-gray-25">{{ getShippingAddress }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getShippingCity }}</div>
                    <div class="body-10-regular text-gray-25 mt-1">{{ getShippingCountry }}</div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- End of Shipping Details -->

          </b-card>
        </b-col>
      </b-row>
      <!-- End of Order Summary Card -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import billingAddressMixin from '~/plugins/mixins/billing-address'
import shippingAddressMixin from '~/plugins/mixins/shipping-address'
import offerDetailsMixin from '~/plugins/mixins/offer-details'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ListItem from '~/components/checkout/place-offer/mobile/ListItem'

export default {
  name: 'OrderDetails',
  components: { ShoppingBagTitle, ListItem },
  mixins: [ billingAddressMixin, shippingAddressMixin, offerDetailsMixin ],
  data() {
    return {
      offerDuration: 10, // TODO: NP - Fill this once implemented.
      orderDate: new Date().toLocaleDateString(),
      shippingMethod: 'Ground Shipping',
      shippingArrival: '(3-7 Business Days)',
    }
  },
  computed: {
    ...mapGetters({
      paymentMethod: 'auth/getPaymentMethod'
    }),
    getPaymentMethod(vm) {
      return vm.paymentMethod.cardBrand.toUpperCase() + ' - ' + vm.paymentMethod.cardLastDigits + ', Exp. ' + vm.paymentMethod.cardExpiryDate
    },
  },
  destroyed() {
    this.removePromoCode()
  },
  methods: {
    ...mapActions({
      removePromoCode: 'order-details/removePromoCode',
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.outer-wrapper
  overflow-y: auto
  overflow-x: hidden
  height: 100%

  div
    font-family: 'SF Pro Display', serif

  .product-wrapper
    border-bottom: 1px solid $color-gray-47

.quantity-wrapper
  margin-top: 7px
  padding-bottom: 27px
  border-bottom: 1px solid $color-gray-47

.offer-details-wrapper
  margin-top: 23px
  padding: 0 18px 26px
  border-bottom: none

.summary-text-wrapper
  background: $color-gray-23b
  padding: 11px 18px 14px

.summary-card-wrapper
  background: $color-gray-23b

  .card
    border-radius: 1.5rem

    .crypto-details-wrapper
      svg
        margin-left: 15px

      .wallet-address-group
        input
          border-radius: 0.5rem
          background: $color-white-5
          color: $black-1
          @include body-5-medium

        div
          background: $color-white-5
          padding-right: 11px
          border-top-right-radius: 0.5rem
          border-bottom-right-radius: 0.5rem

    .order-details-wrapper, .crypto-details-wrapper, .payment-details-wrapper, .billing-details-wrapper
      border-bottom: 1px solid $color-gray-23b
      padding-top: 16px
      padding-bottom: 16px

      div
        font-family: "SF Pro Display", serif

    .shipping-details-wrapper
      padding-top: 16px

      div
        font-family: "SF Pro Display", serif
</style>
