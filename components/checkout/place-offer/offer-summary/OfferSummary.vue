<template>
  <!-- Order Summary -->
  <b-col md="3">
    <OrderTitle
      back-link
      :title="$t('place_offer.offer_summary')"
    />

    <OfferSummaryCard
      :items="getItems"
    />

    <PromoCodeButton v-if="! isPromoCodeVisible && ! promoCode" @show-promo="isPromoCodeVisible = true" />

    <!-- Offer Summary Promo Code -->
    <b-row v-if="isPromoCodeVisible && !promoCode">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.promo_code') }}&colon;
        </div>
      </b-col>
    </b-row>
    <PromoCodeInput
      v-if="isPromoCodeVisible && !promoCode"
      class="mt-2"
    />
    <!-- End of Offer Summary Promo Code -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-show="billingAddress" class="mt-3">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.billing_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <AddressCard
      v-show="billingAddress"
      class="mt-2"
      editable
      :full-name="getBillingFullName"
      :full-address="getBillingAddress"
      @edit="emitRenderComponentEvent($parent.$options.components.BillingForm.name)"
    />
    <!-- End of Shopping Cart Billing Address -->

    <!-- Shopping Cart Shipping Address -->
    <b-row v-show="shippingAddress">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.shipping_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <AddressCard
      v-show="shippingAddress"
      class="mt-2"
      editable
      :full-name="getShippingFullName"
      :full-address="getShippingAddress"
      @edit="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)"
    />
    <!-- End of Shopping Cart Shipping Address -->

    <!-- Shopping Cart Payment Details -->
    <b-row
      v-show="paymentMethod"
      :class="{ 'mt-3': !billingAddress & !shippingAddress }"
    >
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    <PaymentCardDetailsCard
      v-show="paymentMethod.paymentType"
      class="mt-2"
      editable
      :card-brand="paymentMethod.cardBrand"
      :card-expiry-date="paymentMethod.cardExpiryDate"
      :card-last-digits="paymentMethod.cardLastDigits"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentCard.name)"
      @clear="removePaymentMethod()"
    />
    <!-- ./Shopping Cart Payment Details -->


     <!-- Terms & Conditions Paragraph -->
    <b-row v-show="billingAddress && shippingAddress && paymentMethod" class="mt-4">
      <b-col md="3" class="text-center">
        <b-form-checkbox v-model="form.agreedToTerms"></b-form-checkbox>
      </b-col>
      <b-col md="9">
        <i18n
          path="shopping_cart.terms_and_conditions_paragraph"
          tag="p"
          class="body-5-normal justify-content-start"
        >
          <span class="text-decoration-underline">{{
            $t('shopping_cart.terms_and_conditions')
          }}</span>
        </i18n>
      </b-col> </b-row
    ><!-- End of Terms & Conditions Paragraph -->

    <!-- Shopping Cart Total Price Heading -->
    <b-row class="mt-4">
      <b-col md="6" class="text-center">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
      <b-col md="6" class="text-center">
        <div class="body-4-medium">&dollar;{{ getTotal | formatPrice }}</div>
      </b-col>
    </b-row><!-- End of Shopping Cart Total Price Heading -->


    <!-- Shopping Cart Place Order Button -->
    <b-row class="mt-4">
      <b-col v-if="loading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="text-center">
        <b-button v-if="!billingAddress" :disabled="! getTotalQuantity" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.BillingForm.name)">{{
            $t('shopping_cart.proceed_to_billing')
          }}</b-button>
        <b-button v-else-if="!shippingAddress" :disabled="! getTotalQuantity" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)">{{
            $t('shopping_cart.proceed_to_shipping')
          }}</b-button>
        <b-button v-else-if="!paymentMethod" :disabled="! getTotalQuantity" type="button" class="px-5" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.PaymentCard.name)">{{
            $t('shopping_cart.proceed_to_payment')
          }}</b-button>
        <b-button v-else-if="paymentMethod && paymentMethod.paymentType === isCard" type="button" :disabled=" ! form.agreedToTerms || ! getTotalQuantity" class="px-5" variant="confirm" pill @click="placeOffer">{{
            $t('shopping_cart.place_order')
          }}</b-button>
      </b-col>
    </b-row><!-- End of Shopping Cart Place Order Button -->

    <AlertModal id="message-modal" :message="$t('products.message.offer_submitted')" icon="tick" @hidden="$router.push('/')"/>

  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OfferSummaryCard from './OfferSummaryCard.vue'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import PromoCodeButton from '~/components/checkout/common/PromoCodeButton'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import AddressCard from '~/components/checkout/common/AddressCard'
import PaymentCardDetailsCard from '~/components/checkout/common/PaymentCardDetailsCard'
import { PAYMENT_METHOD_TYPE_CARD } from '~/static/constants'
import { AlertModal } from '~/components/modal'
export default {
  name: 'OfferSummary',

  components: {
    OrderTitle,
    OfferSummaryCard,
    PromoCodeButton,
    PromoCodeInput,
    AddressCard,
    PaymentCardDetailsCard,
    AlertModal
  },

   mixins: [ emitEvent ],

  data() {
    return {
      message: null,
      isPromoCodeVisible: false,
      loading: false,
      isCard: PAYMENT_METHOD_TYPE_CARD,
      form: {
        agreedToTerms: false
      }
    }
  },

  computed: {
    ...mapGetters({
      getOfferDetails: 'offer/getOfferDetails',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
      promoCode: 'order-details/getPromoCode',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      paymentToken: 'order-details/getPaymentToken'
    }),

    subTotal: (vm) => {
      return vm.getOfferDetails.bid_price
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      items.push({ key: vm.$t('place_offer.offer_amount'), value: vm.subTotal > 0 ? vm.subTotal : 0 })
      items.push({ key: vm.$t('shopping_cart.shipping_fee'), value: vm.shippingFee > 0 ? vm.shippingFee : 0 })
      items.push({ key: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee > 0 ? vm.getProcessingFee : 0 })
      items.push({ key: vm.$t('shopping_cart.tax'), value: vm.getTax > 0 ? vm.getTax : 0 })

      return items
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
    getProcessingFee: (vm) => {
      return Math.trunc(vm.processingFee * vm.subTotal)
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.subTotal)
    },

    getTotal: (vm) => {
      return vm.subTotal + vm.shippingFee + vm.getProcessingFee + vm.getTax
    },

    getTotalQuantity: (vm) => {
      return vm.getOfferDetails.quantity
    }
  },

  mounted() {
    this.getTaxRateByZip({ zip: this.billingAddress.zipCode })
  },

  methods: {
    ...mapActions({
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      offerSubmit: 'offer/offerSubmit'
    }),

    placeOffer(){
      this.offerSubmit({
        billingAddress: this.billingAddress,
        shippingAddress: this.shippingAddress,
        paymentMethod: this.paymentMethod,
        offerDetails: this.getOfferDetails,
        priceDetails: {
          shipping_fee: this.shippingFee,
          processing_fee: this.getProcessingFee,
          tax: this.getTax,
          sub_total: this.subTotal,
          total: this.getTotal
        },
        paymentToken: this.paymentToken
      }).then((res) => {
        if(res.data.success){
          this.$bvModal.show('message-modal')
        }
      }).catch((err) => {
        this.$logger.logToServer('Place Offer Error', err.response);
      })
    },
  },
}
</script>
