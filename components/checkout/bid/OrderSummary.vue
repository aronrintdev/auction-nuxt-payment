<template>
  <!-- Order Summary -->
  <b-col md="3">
    <OrderTitle
      :title="$t('auction_cart.bid_summary')"
      @click="emitRenderComponentEvent($parent.$options.name)"
    />

    <!-- Shopping Cart Order Summary Card -->
    <b-row class="mt-3">
      <b-col md="12">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
    </b-row>
    <OrderSummaryCard
      class="mt-2"
      :items="getItems"
      :promo-code="promoCode"
      :promoCodeDiscount="getDiscount"
      @clear-promo="clearPromoCode"
    />
    <!-- End of Shopping Cart Order Summary Card -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-if="billingAddress" :class="{ 'mt-3': !promoCode }">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.billing_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <AddressCard
      v-if="billingAddress"
      class="mt-2"
      editable
      :full-name="getBillingFullName"
      :full-address="getBillingAddress"
      @edit="emitRenderComponentEvent($parent.$options.components.BillingForm.name)"
    />
    <!-- End of Shopping Cart Billing Address -->

    <!-- Shopping Cart Shipping Address -->
    <b-row v-if="shippingAddress">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.shipping_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <AddressCard
      v-if="shippingAddress"
      class="mt-2"
      editable
      :full-name="getShippingFullName"
      :full-address="getShippingAddress"
      @edit="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)"
    />
    <!-- End of Shopping Cart Shipping Address -->

    <!-- Shopping Cart Payment Details -->
    <b-row
      v-if="paymentMethod || giftCard || cryptoDetails.estimatedAmount"
      :class="{ 'mt-3': !billingAddress & !shippingAddress }"
    >
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    <b-row
      v-if="paymentMethod.paymentType === isInstallment"
      class="mt-2"
    >
      <b-col md="12">
        <b-card class="custom-card">
          <b-row>
            <b-col md="2" class="d-flex align-items-center">
              <img
                :src="
                  require('~/assets/img/shopping-cart/' +
                    installmentPlans.type +
                    '-logo.png')
                "
                :alt="`${installmentPlans.type}-logo`"
              />
            </b-col>
            <b-col md="5" class="d-flex align-items-center">
              <div class="body-5-normal">
                {{ $t('shopping_cart.installment_plan') }}&nbsp;
              </div>
            </b-col>
            <b-col md="4" class="d-flex align-items-center">
              <div class="body-5-normal">
                {{ $t('shopping_cart.date') }}&colon;&nbsp;{{
                  installmentPlans.date
                }}
              </div>
              <div class="body-5-normal"></div>
            </b-col>
            <b-button
              variant="edit"
              @click="
                emitRenderComponentEvent(
                  $parent.$options.components.PaymentOption.name
                )
              "
              ><b-img :src="require('~/assets/img/icons/pencil.svg')"></b-img
            ></b-button>
          </b-row>
        </b-card>
      </b-col>
    </b-row
    >
    <PaymentCardDetailsCard
      v-if="paymentMethod.paymentType === isCard"
      class="mt-2"
      editable
      clearable
      :card-brand="paymentMethod.cardBrand"
      :card-expiry-date="paymentMethod.cardExpiryDate"
      :card-last-digits="paymentMethod.cardLastDigits"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)"
      @clear="removePaymentMethod()"
    />
    <CryptoDetailsCard
      v-if="cryptoDetails.amount"
      class="mt-2"
      editable
      :crypto-currency="cryptoDetails.currency"
      :estimated-amount="cryptoDetails.estimatedAmount"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)"
    />
    <!-- End of Shopping Cart Payment Details -->

    <!-- Shopping Cart Applied Gift Card -->
    <GiftCardDetailsCard
      v-if="giftCard"
      editable
      :amount="giftCard.amount"
      :number="giftCard.number"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentGiftCard.name)"
    />
    <!-- End of Shopping Cart Applied Gift Card -->

    <!-- Terms & Conditions Paragraph -->
    <b-row v-if="billingAddress && shippingAddress && (paymentMethod || cryptoDetails.amount)" class="mt-2">
      <b-col cols="1" md="3" class="text-center">
        <b-form-checkbox v-model="form.agreedToTerms"></b-form-checkbox>
      </b-col>
      <b-col cols="11" md="9">
        <i18n
          path="shopping_cart.terms_and_conditions_paragraph"
          tag="p"
          class="body-5-normal justify-content-start terms-and-conditions"
        >
          <span class="text-decoration-underline">{{
            $t('shopping_cart.terms_and_conditions')
          }}</span>
        </i18n>
      </b-col> </b-row
    ><!-- End of Terms & Conditions Paragraph -->

    <!-- Shopping Cart Total Price Heading -->
    <b-row class="mt-3">
      <b-col cols="6" md="6" class="text-center">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
      <b-col cols="6" md="6" class="text-center">
        <div class="body-4-medium">&dollar;{{ getTotal | formatPrice }}</div>
      </b-col>
    </b-row><!-- End of Shopping Cart Total Price Heading -->

    <!-- Shopping Cart Place Order Button -->
    <b-row class="mt-3">
      <b-col v-if="loading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="text-center">
        <b-button v-if="!billingAddress" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.BillingForm.name)">{{
            $t('shopping_cart.proceed_to_billing')
          }}</b-button>
        <b-button v-else-if="!shippingAddress" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)">{{
            $t('shopping_cart.proceed_to_shipping')
          }}</b-button>
        <b-button v-else-if="!paymentMethod && !cryptoDetails.estimatedAmount" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)">{{
            $t('shopping_cart.proceed_to_payment')
          }}</b-button>
        <b-button v-else type="button" class="px-5 place-bid-btn" variant="confirm" :disabled="!form.agreedToTerms" @click="placeBid">{{
          $t('shopping_cart.place_bid')
        }}</b-button>
      </b-col>
    </b-row><!-- End of Shopping Cart Place Order Button -->
    <b-modal id="order-success-modal" hide-footer hide-header size="md" @hidden="backToAuction">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('order-success-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ $t('auctions.frontpage.highest_bidder_thanks_msg') }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon" role="button" @click="$bvModal.hide('order-success-modal')">
          <CheckmarkIcon />
        </div>
      </div>
    </b-modal>
  </b-col><!-- End of Order Summary -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import AddressCard from '~/components/checkout/common/AddressCard'
import PaymentCardDetailsCard from '~/components/checkout/common/PaymentCardDetailsCard'
import CryptoDetailsCard from '~/components/checkout/common/CryptoDetailsCard'
import GiftCardDetailsCard from '~/components/checkout/common/GiftCardDetailsCard'
import {
  PAYMENT_METHOD_TYPE_CARD,
  PAYMENT_METHOD_TYPE_INSTALLMENT,
  BAD_REQUEST,
  NOT_FOUND,
  FIXED_PRODUCT,
  PERCENT,
} from '~/static/constants'
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'

export default {
  name: 'OrderSummary',
  components: {
    OrderTitle,
    OrderSummaryCard,
    AddressCard,
    PaymentCardDetailsCard,
    CryptoDetailsCard,
    GiftCardDetailsCard,
    CheckmarkIcon,
    CloseIcon,
  },
  mixins: [ emitEvent ],
  data() {
    return {
      loading: false,
      inputPromoCode: '',
      isInstallment: PAYMENT_METHOD_TYPE_INSTALLMENT,
      isCard: PAYMENT_METHOD_TYPE_CARD,
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        agreedToTerms: false,
      },
    }
  },
  computed: {
    ...mapGetters({
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

      items.push({ label: vm.$t('shopping_cart.subtotal'), value: vm.getSubtotal })
      items.push({ label: vm.$t('shopping_cart.shipping_fee'), value: vm.getShippingFee })
      items.push({ label: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee })
      items.push({ label: vm.$t('shopping_cart.tax'), value: vm.getTax })

      return items
    }
  },
  mounted() {
    this.getTaxRateByZip({ zip: this.billingAddress.zipCode })
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      removePaymentToken: 'order-details/removePaymentToken',
      removePaymentMethod: 'auth/removePaymentMethod',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
    }),
    clearPromoCode() {
      this.removePromoCode()
      this.inputPromoCode = ''
    },
    applyPromoCode(promoCode) {
      this.$axios.post('coupons/check', {
        promo_code: promoCode,
        listing_items: this.auction.auction_items.map(item => item.inventory.product),
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
    // Place new bid for current auction
    placeBid() {
      this.loading = true
      // Place bid API
      this.$axios.post(`auctions/${this.auction.id}/bids`, {
          discount: this.getDiscount,
          price: this.getSubtotal,
          shipping_fee: this.getShippingFee,
          processing_fee: this.getProcessingFee,
          tax: this.getTax,
          total: this.getTotal,
          payment_token: this.paymentToken,
          payment_method: {
            card_holder_name: this.paymentMethod.cardHolderName,
            card_brand: this.paymentMethod.cardBrand,
            card_last_digits: this.paymentMethod.cardLastDigits,
            card_expiry_date: this.paymentMethod.cardExpiryDate,
            is_default: this.paymentMethod.isDefault,
          },
          billing_address: {
            first_name: this.billingAddress.firstName,
            last_name: this.billingAddress.lastName,
            address_line_1: this.billingAddress.addressLine,
            email: this.billingAddress.email,
            city: this.billingAddress.city,
            state: this.billingAddress.state,
            zip: this.billingAddress.zipCode,
            country: this.billingAddress.country,
            type: this.billingAddress.type,
            is_default: this.paymentMethod.isDefault
          },
          shipping_address: {
            first_name: this.shippingAddress.firstName,
            last_name: this.shippingAddress.lastName,
            email: this.shippingAddress.email,
            address_line_1: this.shippingAddress.addressLine,
            city: this.shippingAddress.city,
            state: this.shippingAddress.state,
            zip: this.shippingAddress.zipCode,
            country: this.shippingAddress.country,
            type: this.shippingAddress.type,
            is_default: this.paymentMethod.isDefault
          },
          auto_bid_enabled: this.auction.auto_bid_settings[0] && !this.auction.auto_bid_settings[0].is_disabled,
        }).then(() => {
          this.loading = false
          this.$bvModal.show('order-success-modal')
          this.removePaymentToken()
        }).catch(error => {
          this.loading = false
          this.removePaymentToken()

          if (error.response.status === 400) {
          this.$toasted.error(this.$t(error.response.data.response_text).toString())

          return
        }

        this.$toasted.error(error.response.statusText)
      })
    },
    // Back to auction details page
    backToAuction() {
      this.$router.push(`/auction/${this.auction.id}`)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Promo code input & button styles */
#btn-promo
  border-radius: 0 0.25rem 0.25rem 0
  font-weight: $medium

#promo-input
  border-radius: 0.25rem

.order-summary::v-deep
  .heading-1-medium
    @include body-2
  .body-4-medium
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-4b
    color: $black

  .btn.btn-link.custom-link
    @include body-10

  .summary-wrapper
    .body-5-regular
      font-family: $font-montserrat
    div.custom-card.card
      border-radius: 10px
      & > .card-body
        padding: 12px 14.5px
      .summary-row
        margin-top: 13px
        &:first-child
          margin-top: 0
  .terms-and-conditions
    font-family: $font-sf-pro-text
    font-weight: $normal
    @include body-30
    color: $black
    width: 231px
    &-wrapper
      margin: 23px 0 33px
  
  .place-bid-btn
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
    border-radius: 21px
    width: 216px
    height: 38px
    font-family: $font-sf-pro-text
    font-weight: $medium
    @include body-4b
    color: $white

  @media (max-width: 576px)
    .custom-card
      .card-body
        .d-flex
          & > div:first-child
            flex: 1
            &.images-squard
              flex: none
              width: calc(100% - 21px)
</style>
