<template>
  <!-- Order Summary -->
  <b-col md="3">
    <OrderTitle
      title="Offer Summary"
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
    />
    <!-- End of Shopping Cart Order Summary Card -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-if="billingAddress" class="mt-3">
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
      v-if="paymentMethod"
      :class="{ 'mt-3': !billingAddress & !shippingAddress }"
    >
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
    <div v-if="isResponsive">
      <div v-if="billingAddress && shippingAddress && (paymentMethod)" class="mt-4 d-flex">
        <div> <b-form-checkbox v-model="form.agreedToTerms"></b-form-checkbox></div>
        <div>
          <i18n
            path="shopping_cart.terms_and_conditions_paragraph"
            tag="p"
            class="body-5-normal justify-content-start"
          >
          <span class="text-decoration-underline">{{
              $t('shopping_cart.terms_and_conditions')
            }}</span>
          </i18n>
        </div>
    </div>
    </div>
    <div v-else>
      <b-row v-if="billingAddress && shippingAddress && (paymentMethod)" class="mt-4">
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
    </div>

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
        <b-button v-if="!billingAddress" :disabled="!getTotalQuantity" class="px-5" pill type="button" variant="confirm" @click="emitRenderComponentEvent($parent.$options.components.BillingForm.name)">{{
            $t('shopping_cart.proceed_to_billing')
          }}</b-button>
        <b-button v-else-if="!shippingAddress" :disabled="!getTotalQuantity" class="px-5" pill type="button" variant="confirm" @click="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)">{{
            $t('shopping_cart.proceed_to_shipping')
          }}</b-button>
        <b-button v-else-if="!paymentMethod" :disabled="!getTotalQuantity" class="px-5" pill type="button" variant="confirm" @click="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)">{{
            $t('shopping_cart.proceed_to_payment')
          }}</b-button>
        <b-button v-else type="button" class="px-5" variant="confirm" :disabled="!form.agreedToTerms" @click="placeOffer">
          {{
            ((getOfferType === ACCEPT_OFFER) ? $t('trades.accept_offer') : $t('shopping_cart.send_offer'))
          }}
        </b-button>
      </b-col>
    </b-row><!-- End of Shopping Cart Place Order Button -->
    <b-modal id="order-success-modal" hide-footer hide-header size="md" @hidden="backToTradeDetails">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('order-success-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ ((getOfferType !== ACCEPT_OFFER) ? $t('trades.offer_has_been_placed') : $t('trades.offer_accepted_successfully')) }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon">
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
import screenSize from '~/plugins/mixins/screenSize'

import {
  PAYMENT_METHOD_TYPE_CARD
} from '~/static/constants'
import {
  COUNTER_OFFER_TYPE,
  OFFER_TYPE_THEIR,
  OFFER_TYPE_YOURS,
  ACCEPT_OFFER,
  SHIPPING_FEE_FIRST_ITEM,
  SHIPPING_FEE_SECOND_ITEM,
  SHIPPING_FEE_THIRD_ITEM
} from '~/static/constants/trades';
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'

export default {
  name: 'OrderSummary',
  components: {
    OrderTitle,
    OrderSummaryCard,
    AddressCard,
    PaymentCardDetailsCard,
    CheckmarkIcon,
    CloseIcon,
  },
  mixins: [ emitEvent, screenSize ],
  data() {
    return {
      width:'',
      loading: false,
      isCard: PAYMENT_METHOD_TYPE_CARD,
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        agreedToTerms: false,
      },
      OFFER_TYPE_THEIR,
      OFFER_TYPE_YOURS,
      ACCEPT_OFFER
    }
  },
  computed: {
    ...mapGetters({
      trade: 'trade/getActiveTrade',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      paymentToken: 'order-details/getPaymentToken',
      processingFee: 'order-settings/getProcessingFee',
      tradingFee: 'order-settings/getTradingFee',
      taxRate: 'tax-rate/getTaxRate',
    }),
    shoppingCart: (vm) => {
      return vm.trade ? vm.trade : []
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
    getTotalQuantity: (vm) => {
      const totalQuantity =  vm.shoppingCart.yourItems.reduce((sum, product) => {
        return sum + ((product.inventory) ? 1 : product.quantity)
      }, 0)

      return totalQuantity
    },
    getSubmittedItemType: (vm) => {
      return vm.shoppingCart.submittedItemType
    },
    getOfferType: (vm) => {
      return vm.shoppingCart.offerType
    },
    getOfferParentId: (vm) => {
      return vm.shoppingCart.offerParentId
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.getCashAdded
    },
    getCashAdded: (vm) => {
      return vm.getCashType === 'requested'? 0 : vm.shoppingCart.cashAdded
    },
    getTypeOffer: (vm) => {
      return  vm.shoppingCart.typeOffer
    },
    getCashType: (vm) => {
      return vm.shoppingCart.cashType
    },
    getTradeCondition: (vm) => {
      return vm.shoppingCart.tradeCondition
    },
    getYourItems: (vm) => {
      return vm.shoppingCart.yourItems
    },
    getTheirItems: (vm) => {
      return vm.shoppingCart.theirItems
    },
    getTheirVendorId: (vm) => {
      return vm.shoppingCart.theirVendorId
    },
    getTradeId: (vm) => {
      return vm.shoppingCart.tradeId ? vm.shoppingCart.tradeId : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      let items = vm.shoppingCart.theirItems
      if(vm.getSubmittedItemType === OFFER_TYPE_YOURS){
        items = vm.shoppingCart.yourItems
      }
      let shippingFee = SHIPPING_FEE_FIRST_ITEM
      if(items.length > 1){
        shippingFee += SHIPPING_FEE_SECOND_ITEM
        if(items.length > 2){
          shippingFee += SHIPPING_FEE_THIRD_ITEM
        }
      }
      return shippingFee
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFeePaymentDetails: (vm) => {
      let items = vm.shoppingCart.theirItems
      if(vm.getSubmittedItemType === OFFER_TYPE_YOURS){
        items = vm.shoppingCart.yourItems
      }
      let shippingFeeDetails = '1x$' + Math.trunc(SHIPPING_FEE_FIRST_ITEM / 100)
      if(items.length > 1){
        shippingFeeDetails = '1x$' + Math.trunc(SHIPPING_FEE_FIRST_ITEM / 100) + ' 1x$' + Math.trunc(SHIPPING_FEE_SECOND_ITEM / 100)
        if(items.length > 2){
          shippingFeeDetails = '1x$' + Math.trunc(SHIPPING_FEE_FIRST_ITEM / 100) + ' 2x$' + Math.trunc(SHIPPING_FEE_SECOND_ITEM / 100)
        }
      }
      return shippingFeeDetails
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return vm.getCashAdded > 0 ? Math.trunc(vm.processingFee * vm.getTotalExceptProcessingFee) : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.getTotalWithoutTax)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTradeFee: (vm) => {
      return vm.tradingFee
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalWithoutTax: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getSubtotal + vm.getTradeFee

      return vm.getTotalQuantity > 0 ? total : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalExceptProcessingFee: (vm) => {
      const total = vm.getShippingFee + vm.getSubtotal + vm.getTradeFee

      return vm.getTotalQuantity > 0 ? total : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotal + vm.getTradeFee

      return vm.getTotalQuantity > 0 ? total : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []

      items.push({ label: vm.$t('shopping_cart.cash_added'), key: vm.$t('shopping_cart.cash_added'), value: vm.getCashAdded })
      items.push({ label: vm.$t('shopping_cart.subtotal'), key: vm.$t('shopping_cart.subtotal'), value: vm.getSubtotal })
      items.push({ label: vm.$t('shopping_cart.trade_fee'), key: vm.$t('shopping_cart.trade_fee'), value: vm.getTradeFee })
      items.push({ label: vm.$t('shopping_cart.shipping_fee'), key: vm.$t('shopping_cart.shipping_fee'), value: vm.getShippingFee, paymentDetails: vm.getShippingFeePaymentDetails})
      items.push({ label: vm.$t('shopping_cart.processing_fee'), key: vm.$t('shopping_cart.processing_fee'), value: vm.getProcessingFee, hideWith0Value: true })
      items.push({ label: vm.$t('shopping_cart.tax'), key: vm.$t('shopping_cart.tax'), value: vm.getTax })

      return items
    },
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    },
  },
  mounted() {
    this.getTaxRateByZip({ zip: this.billingAddress.zipCode })
    this.width = window.innerWidth
  },
  methods: {
    ...mapActions({
      removePaymentToken: 'order-details/removePaymentToken',
      removePaymentMethod: 'auth/removePaymentMethod',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
    }),
    capitalize(myString){
      return myString.charAt(0).toUpperCase() + myString.slice(1)
    },
    getCardDetails(){
      return this.capitalize(this.paymentMethod.paymentType) + ' Payment ' + this.capitalize(this.paymentMethod.cardBrand) + ' -' + this.paymentMethod.cardLastDigits + ' Exp.' + this.paymentMethod.cardExpiryDate
    },
    getPaymentMethodDetails(){
      return {
        'id': this.paymentMethod?.id,
        'payment_type': this.paymentMethod.paymentType,
        'card_last_digits': this.paymentMethod.cardLastDigits,
        'card_holder_name': this.billingAddress.firstName + ' ' + this.billingAddress.lastName,
        'card_expiry_date': this.paymentMethod.cardExpiryDate,
        'card_brand': this.paymentMethod.cardBrand,
        'is_default': this.paymentMethod.isDefault
      }
    },
    // Place offer for current trade
    placeOffer() {
      this.loading = true

      let params = {
          price: this.getSubtotal,
          shipping_fee: this.getShippingFee,
          processing_fee: this.getProcessingFee,
          trade_fee: this.getTradeFee,
          tax: this.getTax,
          total: this.getTotal,
          cash_added: this.shoppingCart?.cashAdded,
          cash_type: this.getCashType,
          card_details: this.getCardDetails(),
          payment_method: this.getPaymentMethodDetails(),
          condition: this.getTradeCondition,
          payment_token: this.paymentToken,
          offer_type: this.getOfferType,
          parent_id: this.getOfferParentId,
          their_vendor_id: this.getTheirVendorId,
          your_items: this.getYourItems,
          their_items: this.getTheirItems,
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
        }
        let apiUrl = `trades/${this.getTradeId}/offer`
        if(this.getOfferType === ACCEPT_OFFER){
          params = {
            ...params,
            trade: this.shoppingCart.trade,
            latest_offer: this.shoppingCart.lastOffer,
          }
          apiUrl = `trades/${this.getTradeId}/accept-offer`
        }

      // Save Offer API
      this.$axios.post(apiUrl, params).then((response) => {
          this.loading = false
          this.$bvModal.show('order-success-modal')
          this.removePaymentToken()
          this.removePaymentMethod()
          this.$store.commit('trade/setSubmittedOffer', response.data.data.submitted_offer)
          if(this.getOfferType === COUNTER_OFFER_TYPE){
            this.$router.push(`/profile/trades/dashboard/${this.getOfferParentId}`)
          }
        }).catch(error => {
          this.loading = false
          this.removePaymentToken()
          this.removePaymentMethod()

          if (error.response.status === 400) {
          this.$toasted.error(this.$t(error.response.data.response_text).toString())

          return
        }

        this.$toasted.error(error.response.statusText)
      })
    },
    // Back to trade details page
    backToTradeDetails() {
      this.$root.$emit('trade_done',true)
    }
  },
}
</script>
