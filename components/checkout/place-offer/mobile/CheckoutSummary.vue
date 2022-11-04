<template>
  <!-- Checkout Summary -->
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="name"
        text-center
        class="mt-0"
      />
      <!-- End of Top Title -->

      <!-- Sub Title -->
      <b-row class="quantity-wrapper">
        <b-col cols="12" sm="12">
          <div class="body-5-normal text-gray-25 text-center">
            {{ subTitle }}
          </div>
        </b-col>
      </b-row>
      <!-- End of Sub Title -->

      <!-- User Actions List Items -->
      <b-row class="options-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item @click="handleShippingAddressClick">
              <b-row class="d-flex">
                <b-col cols="3" sm="3">
                  <span class="text-black body-17-normal">{{ $t('shopping_cart.shipping') }}</span>
                </b-col>
                <b-col v-if="shippingAddress" cols="9" sm="9" class="text-right">
                  <div>
                    <span class="option-action text-gray-25 body-5-regular">{{ getShippingFullName }}</span>
                    <ArrowRightBlackSVG />
                  </div>
                  <div class="shipping-detail text-gray-25 body-5-regular">{{ getShippingAddress }}</div>
                  <div class="shipping-detail text-gray-25 body-5-regular">{{ getShippingCity }}</div>
                  <div class="shipping-detail text-gray-25 body-5-regular">{{ getShippingCountry }}</div>
                </b-col>
                <b-col v-else cols="9" sm="9" class="text-right">
                  <span class="option-action text-blue-20 body-5-normal">{{ $t('shopping_cart.add_shipping') }}</span>
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item @click="emitRenderComponentEvent($parent.$options.components.PaymentCard.name)">
              <PaymentDetailsListItem />
            </b-list-group-item>
            <b-list-group-item @click="emitRenderComponentEvent($parent.$options.components.OfferSummary.name)">
              <b-row>
                <b-col cols="6" sm="6">
                  <span class="text-black body-17-normal">{{ $t('place_offer.offer_summary') }}</span>
                </b-col>
                <b-col cols="6" sm="6" class="text-right">
                  <span class="option-action text-gray-25 body-5-normal">{{ getTotal | toCurrency }}</span>
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <!-- End of User Actions List Items -->

      <!-- Terms And Conditions Text -->
      <b-row class="mt-3 terms-and-conditions">
        <b-col cols="12" sm="12">
          <i18n
            path="shopping_cart.terms_and_conditions_paragraph_mobile"
            tag="div"
            class="body-10-normal text-center text-gray-25"
          >
            <span class="text-blue-30 text-decoration-underline" role="button" @click="$router.push('/terms-and-conditions')">{{ $t('shopping_cart.terms_and_conditions') }}</span>
          </i18n>
        </b-col>
      </b-row>
      <!-- End of Terms And Conditions Text -->

      <!-- Offer Accepted Text -->
      <b-row class="mt-3">
        <b-col cols="12" sm="12" class="text-center">
          <span class="body-10-regular text-gray-25">
            {{ $t('place_offer.offer_accepted_text') }}&period;
          </span>
        </b-col>
      </b-row>
      <!-- End of Offer Accepted Text -->

      <!-- Shopping Bag Place Order Button -->
      <b-row class="place-offer-wrapper">
        <b-col v-if="loading" md="12" class="text-center">
          <b-spinner variant="blue-20"></b-spinner>
        </b-col>
        <b-col v-else md="12" class="text-center">
          <Button :disabled="! canPlaceOffer" type="button" variant="dark-blue" pill @click="placeOffer">{{
              $t('place_offer.place_offer')}}
          </Button>
        </b-col>
      </b-row><!-- End of Shopping Bag Place Order Button -->
    </b-col>
  </b-row><!-- End of Checkout Summary -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import offerDetailsMixin from '~/plugins/mixins/offer-details'
import billingAddressMixin from '~/plugins/mixins/billing-address'
import shippingAddressMixin from '~/plugins/mixins/shipping-address'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'
import Button from '~/components/common/Button'
import PaymentDetailsListItem from '~/components/checkout/selling/mobile/payment/PaymentDetailsListItem'

export default {
  name: 'CheckoutSummary',
  components: {
    ShoppingBagTitle,
    ArrowRightBlackSVG,
    Button,
    PaymentDetailsListItem,
  },
  mixins: [ emitEventMixin, billingAddressMixin, shippingAddressMixin, offerDetailsMixin ],
  data() {
    return {
      loading: false,
      alternativeItems: [],
    }
  },
  computed: {
    ...mapGetters({
      paymentMethod: 'auth/getPaymentMethod',
      paymentToken: 'order-details/getPaymentToken',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    subTitle(vm) {
      return vm.$t('shopping_cart.color')
        + ': '
        + vm.colorWay
        + ' | '
        + vm.$t('shopping_cart.size')
        + ': '
        + vm.size
        + ' | '
        + vm.$t('shopping_cart.box_condition')
        + ': '
        + vm.boxCondition
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    name: (vm) => {
      return vm.offerDetails.product.name.substr(0, 32)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    colorWay: (vm) => {
      return vm.offerDetails.product.colorway.substr(0, 4)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    size: (vm) => {
      const size = vm.offerDetails.product.sizes.filter(
        (i) => i.id === vm.offerDetails.size_id
      )

      return size[0].size
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    boxCondition: (vm) => {
      const condition = vm.offerDetails.product.packaging_conditions.filter(
        (i) =>  i.id === vm.offerDetails.packaging_condition_id
      )

      return condition[0].name.substr(0, 10)
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
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      offerSubmit: 'offer/offerSubmit'
    }),
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
        this.$router.push('/checkout/place-offer/order-confirmation')
      }).catch((err) => {
        this.$logger.logToServer('Place Offer Error', err.response);
      }).finally(() => {
        this.loading = false
      })
    },
    handleShippingAddressClick() {
      if (this.shippingAddress) {
        this.emitRenderComponentEvent(this.$parent.$options.components.ShippingInformation.name)
      } else {
        this.emitRenderComponentEvent(this.$parent.$options.components.ShippingForm.name)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.quantity-wrapper
  margin-top: 7px

.options-wrapper
  margin-top: 20px

  .list-group-item
    padding: 20px
    border-color: $color-gray-23b

    .option-action
      margin-right: 29px
      margin-left: 8px

    .shipping-detail
      margin-right: 41px

    .gift-card-detail
      margin-left: 10px

    &:hover, &:active, &:focus
      background: $color-gray-23b

.terms-and-conditions
  div
    font-family: 'SF Pro Text', serif

.place-offer-wrapper
  margin: 41px 0

  .btn
    min-width: 216px
    min-height: 40px

    &:disabled
      border: none
      background: $color-gray-1
      color: $color-gray-47

</style>
