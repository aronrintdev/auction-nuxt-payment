<template>
  <!-- Order Summary -->
  <b-col>
    <OrderTitle
      :title="$t('shopping_cart.order_summary')"
      @click="emitRenderComponentEvent($parent.$options.name)"
    />

    <!-- Shopping Cart Order Summary Card -->
    <b-row class="mt-4">
      <b-col md="12">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
    </b-row>
    <OrderSummaryCard
      class="mt-2"
      :items="getItems"
      :promo-code="promoCode"
      @clear-promo="clearPromoCode"
    />
    <!-- End of Shopping Cart Order Summary Card -->

    <!-- Shopping Cart Promo Code -->
    <b-row v-if="!promoCode" class="mt-3">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.promo_code') }}&colon;
        </div>
      </b-col>
    </b-row>
    <PromoCodeInput
      v-if="!promoCode"
      class="mt-2"
      @click="applyPromoCode"
    />
    <!-- End of Shopping Cart Promo Code -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-if="billingAddress" class="mt-4">
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

    <!-- Shopping Cart Payment Details -->
    <b-row v-if="paymentMethod">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    <PaymentCardDetailsCard
      v-if="paymentMethod.paymentType === isCard"
      class="mt-2"
      editable
      :card-brand="paymentMethod.cardBrand"
      :card-expiry-date="paymentMethod.cardExpiryDate"
      :card-last-digits="paymentMethod.cardLastDigits"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)"
    />
    <!-- End of Shopping Cart Payment Details -->

    <!-- Terms & Conditions Paragraph -->
    <b-row v-if="billingAddress && paymentMethod" class="mt-4">
      <b-col md="3" class="text-center">
        <b-form-checkbox v-model="form.agreedToTerms"></b-form-checkbox>
      </b-col>
      <b-col md="9">
        <i18n
          path="create_listing.details.terms_and_conditions_paragraph"
          tag="p"
          class="body-5-normal justify-content-start"
        >
          <span class="text-decoration-underline">{{
            $t('create_listing.details.terms_and_conditions')
          }}</span>
        </i18n>
      </b-col> </b-row
    ><!-- End of Terms & Conditions Paragraph -->

    <!-- Shopping Cart Total Price Heading -->
    <b-row class="mt-4 mx-4">
      <b-col md="6" class="text-left">
        <div class="body-4-medium">{{ $t('common.total') }}&colon;</div>
      </b-col>
      <b-col md="6" class="text-right">
        <div class="body-4-medium">&dollar;{{ getTotal | formatPrice }}</div>
      </b-col>
    </b-row><!-- End of Shopping Cart Total Price Heading -->

    <!-- Shopping Cart Place Order Button -->
    <b-row class="mt-5">
      <b-col v-if="loading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="text-center">
        <b-button v-if="!billingAddress" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.BillingForm.name)">{{
            $t('shopping_cart.proceed_to_billing')
          }}</b-button>
        <b-button v-else-if="!paymentMethod" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)">{{
            $t('shopping_cart.proceed_to_payment')
          }}</b-button>
        <b-button v-else-if="paymentMethod && paymentMethod.paymentType === isCard" type="button" :disabled=" ! form.agreedToTerms" class="px-5" variant="confirm" pill @click="checkoutWithCard">{{
            $t('create_listing.details.post_auctions')
          }}</b-button>
      </b-col>
    </b-row><!-- End of Shopping Cart Place Order Button -->
  </b-col><!-- End of Order Summary -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import AddressCard from '~/components/checkout/common/AddressCard'
import PaymentCardDetailsCard from '~/components/checkout/common/PaymentCardDetailsCard'
import {
  PERCENT,
  FIXED_PRODUCT,
  PAYMENT_METHOD_TYPE_CARD,
  PERCENT_OFFSET,
  AMOUNT_OFFSET
} from '~/static/constants'

export default {
  name: 'OrderSummary',
  components: {
    OrderTitle,
    OrderSummaryCard,
    PromoCodeInput,
    AddressCard,
    PaymentCardDetailsCard,
  },
  mixins: [ emitEvent ],
  data() {
    return {
      loading: false,
      inputPromoCode: '',
      shippingFee: 0,
      processingFee: 0,
      tax: 0,
      reserveFee: 0.0799, // unit: %
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
      shoppingCart: 'create-listing/getAuctionItems',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      promoCode: 'order-details/getPromoCode',
      paymentToken: 'order-details/getPaymentToken',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingFullName: (vm) => {
      return `${vm.billingAddress.firstName} ${vm.billingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingAddress: (vm) => {
      return `${vm.billingAddress.addressLine}, ${vm.billingAddress.city}, ${vm.billingAddress.country}, ${vm.billingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      const value = vm.shoppingCart.reduce((sum, auction) => {
        if (auction.reserve_price) {
          return sum + auction.reserve_price * 100 * vm.reserveFee
        }
        return sum
      }, 0)
      return parseInt(value)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      return Math.max(vm.getSubtotal - vm.getDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      return parseInt(vm.shippingFee)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return parseInt(vm.processingFee)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return parseInt(vm.tax)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      // TODO: Handle coupons as well
      let total = vm.shippingFee + vm.processingFee + vm.tax + vm.getSubtotal

      if (vm.promoCode) {
        total -= vm.promoCode.amount
      }

      return parseInt(total)
    },
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {
            const items = vm.shoppingCart.filter((item) => {
              return item.sku === vm.promoCode.sku
            })

            if (items) {
              const totalQuantity = items.reduce((sum, item) => {
                return sum + item.quantity
              }, 0)

              discount += totalQuantity * vm.promoCode.amount * AMOUNT_OFFSET
            }

            break;
          }
          case PERCENT: {
            discount += vm.getSubtotal * (vm.promoCode.amount / PERCENT_OFFSET)

            break;
          }
          default:
            discount += vm.promoCode.amount * AMOUNT_OFFSET
        }
      }

      return discount
    },
    getGiftCardDiscount(vm) {
      let discount = 0

      if (vm.giftCard) {
        discount += vm.giftCard.amount
      }

      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      return Math.trunc(vm.getPromoDiscount + vm.getGiftCardDiscount)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []

      items.push({ key: vm.$t('shopping_cart.reserve_fee'), value: vm.getSubtotal })

      return items
    }
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      cardCheckout: 'create-listing/cardCheckout',
      removePaymentToken: 'order-details/removePaymentToken',
      removePaymentMethod: 'auth/removePaymentMethod',
      addOrderDetails: 'order-details/addOrderDetails',
    }),
    clearPromoCode() {
      this.removePromoCode()
      this.inputPromoCode = ''
    },
    applyPromoCode(promoCode) {
      this.addPromoCode({
        promoCode,
      })
    },
    // TODO: Extract the pattern shown in the checkout methods.
    checkoutWithCard() {
      this.loading = true
      const promises = this.shoppingCart.map(item => this.$axios.post('/auctions', {
        ...item,
        reserve_price: item.reserve_price * 100,
        start_bid_price: item.start_bid_price * 100,
        payment_token: this.paymentToken,
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
          is_default: this.billingAddress.isDefault,
          id: this.billingAddress.id,
        },
      }))
      Promise.all(promises)
        .then(response => response.map(res => res.data))
        .then((data) => {
          if (this.getTotal) {
            this.cardCheckout({
              discount: this.getDiscount,
              processingFee: this.getProcessingFee,
              shippingFee: this.getShippingFee,
              tax: this.getTax,
              subTotal: this.getSubtotalAfterDiscount,
              total: this.getTotal,
              promoCode: this.promoCode ? this.promoCode.code : '',
              giftCardNumber: this.giftCard ? this.giftCard.number : '',
              giftCardAmount: this.giftCard ? this.giftCard.amount : 0,
              paymentToken: this.paymentToken,
              paymentMethod: this.paymentMethod,
              billingAddress: this.billingAddress,
              shippingAddress: this.billingAddress,
              shoppingCart: data.map(auction => ({
                auction_id: auction.id,
                quantity: 1,
                price: auction.is_reserved ? auction.reserve_price * this.reserveFee : 0,
              })),
            }).then((resp) => {
              this.addOrderDetails(resp.data)
              this.emitRenderComponentEvent(this.$parent.$options.components.ThankYou.name)
            })
            .catch(error => {
              if (error.response.status === 400) {
                this.$toasted.error(this.$t(error.response.data.response_text).toString())
              } else {
                this.$toasted.error(error.response.statusText)
              }
              this.$axios.delete('/auctions', {
                data: {
                  ids: data.map(auction => auction.id)
                }
              })
            })
            .finally(() => {
              this.loading = false
              this.removePaymentToken()
              this.removePaymentMethod()
            })
          } else {
            this.loading = false
            this.removePaymentToken()
            this.removePaymentMethod()
            this.emitRenderComponentEvent(this.$parent.$options.components.ThankYou.name)
          }
        })
    },
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

</style>