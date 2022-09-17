<template>
  <!-- Order Summary -->
  <b-col md="3">
    <OrderTitle
      back-link
      :title="$t('shopping_cart.order_summary')"
      @click="emitRenderComponentEvent($parent.$options.name)"
    />

    <!-- Quantity of Items Purchased Indication -->
    <b-row class="mt-3">
      <b-col md="12">
        <div class="body-5-bold">
          {{ $t('shopping_cart.items_purchasing') }}&colon;&nbsp;1
        </div>
      </b-col> </b-row
    ><!-- End of Quantity of Items Purchased Indication -->

    <!-- Shopping Cart Total Card -->
    <b-row class="mt-3 mb-2">
      <b-col md="12">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
    </b-row>
    <OrderSummaryCard
      :items="getItems"
      :promo-code="promoCode"
      @clear-promo="clearPromoCode"
    />
    <!-- End of Shopping Cart Total Card -->

    <!-- Shopping Cart Promo Code -->
    <b-row v-if="!promoCode" class="mt-4 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.promo_code') }}&colon;
        </div>
      </b-col>
    </b-row>
    <PromoCodeInput v-if="!promoCode" @click="applyPromoCode" />
    <!-- End of Shopping Cart Promo Code -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-if="billingAddress" class="mt-3 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.billing_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <AddressCard
      v-if="billingAddress"
      editable
      :full-name="getBillingFullName"
      :full-address="getBillingAddress"
      @edit="
        emitRenderComponentEvent($parent.$options.components.BillingForm.name)
      "
    />
    <!-- End of Shopping Cart Billing Address -->

    <!-- Shopping Cart Payment Details -->
    <b-row
      v-if="paymentMethod || giftCard || cryptoDetails.estimatedAmount"
      class="mt-4 mb-2"
    >
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    <b-row v-if="paymentMethod.paymentType === isInstallment">
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
    </b-row>
    <PaymentCardDetailsCard
      v-if="paymentMethod.paymentType === isCard"
      editable
      :card-brand="paymentMethod.cardBrand"
      :card-expiry-date="paymentMethod.cardExpiryDate"
      :card-last-digits="paymentMethod.cardLastDigits"
      @edit="
        emitRenderComponentEvent($parent.$options.components.PaymentOption.name)
      "
    />
    <CryptoDetailsCard
      v-if="cryptoDetails.amount"
      editable
      :crypto-currency="cryptoDetails.currency"
      :estimated-amount="cryptoDetails.estimatedAmount"
      @edit="
        emitRenderComponentEvent($parent.$options.components.PaymentOption.name)
      "
    />
    <!-- End of Shopping Cart Payment Details -->

    <!-- Shopping Cart Applied Gift Card -->
    <GiftCardDetailsCard
      v-if="giftCard"
      editable
      :amount="giftCard.amount"
      :number="giftCard.number"
    />
    <!-- End of Shopping Cart Applied Gift Card -->

    <!-- Terms & Conditions Paragraph -->
    <b-row
      v-if="billingAddress && (paymentMethod || cryptoDetails.amount)"
      class="mt-4"
    >
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
    </b-row>
    <b-row class="mt-4">
      <b-col v-if="loading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="text-center">
        <b-button
          v-if="!billingAddress"
          type="button"
          class="px-5"
          variant="confirm"
          @click="
            emitRenderComponentEvent(
              $parent.$options.components.BillingForm.name
            )
          "
          >{{ $t('shopping_cart.proceed_to_billing') }}</b-button
        >
        <b-button
          v-else-if="!paymentMethod && !cryptoDetails.estimatedAmount"
          type="button"
          class="px-5"
          variant="confirm"
          @click="
            emitRenderComponentEvent(
              $parent.$options.components.PaymentOption.name
            )
          "
          >{{ $t('shopping_cart.proceed_to_payment') }}</b-button
        >
        <b-button
          v-else-if="paymentMethod && paymentMethod.paymentType === isCard"
          type="button"
          :disabled="!form.agreedToTerms"
          class="px-5"
          variant="confirm"
          @click="checkoutWithCard"
          >{{ $t('shopping_cart.place_order') }}</b-button
        >
        <b-button
          v-else-if="paymentMethod"
          type="button"
          :disabled="!form.agreedToTerms"
          class="px-5"
          variant="confirm"
          @click="checkoutWithInstallment"
          >{{ $t('shopping_cart.place_order') }}</b-button
        >
        <b-button
          v-else
          type="button"
          :disabled="!form.agreedToTerms"
          class="px-5"
          variant="confirm"
          @click="checkoutWithCrypto"
          >{{ $t('shopping_cart.place_order') }}</b-button
        >
      </b-col> </b-row
    ><!-- End of Shopping Cart Total Price Heading --> </b-col
  ><!-- End of Order Summary -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import OrderSummaryCard from '~/components/checkout/common/OrderSummaryCard'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import AddressCard from '~/components/checkout/common/AddressCard'
import PaymentCardDetailsCard from '~/components/checkout/common/PaymentCardDetailsCard'
import CryptoDetailsCard from '~/components/checkout/common/CryptoDetailsCard'
import GiftCardDetailsCard from '~/components/checkout/common/GiftCardDetailsCard'
import {
  PAYMENT_METHOD_TYPE_CARD,
  PAYMENT_METHOD_TYPE_INSTALLMENT,
} from '~/static/constants'
export default {
  name: 'OrderSummary',
  components: {
    OrderTitle,
    OrderSummaryCard,
    PromoCodeInput,
    AddressCard,
    PaymentCardDetailsCard,
    CryptoDetailsCard,
    GiftCardDetailsCard,
  },
  mixins: [emitEvent],
  data() {
    return {
      sku: '',
      heatcheckId: '',
      loading: false,
      inputPromoCode: '',
      shippingFee: 0, // TODO: Temporary dummy data
      processingFee: 0, // TODO: Temporary dummy data
      tax: 0, // TODO: Temporary dummy data
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
      shoppingCart: 'shopping-cart/getShoppingCart',
      products: 'order-details/getProducts',
      billingAddress: 'auth/getBillingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      paymentToken: 'order-details/getPaymentToken',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
      shoppingType: 'shopping-cart/getType',
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
    getTotalQuantity: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      return vm.shippingFee
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      return vm.processingFee
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return vm.tax
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      // TODO: Handle coupons as well
      let total = vm.shippingFee + vm.processingFee + vm.tax + vm.getSubtotal
      if (vm.promoCode) {
        total -= vm.promoCode.amount
      }
      if (vm.giftCard) {
        total -= vm.giftCard.amount
      }
      return total
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      let discount = 0
      if (vm.promoCode) {
        discount += vm.promoCode.amount
      }
      if (vm.giftCard) {
        discount += vm.giftCard.amount
      }
      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      items.push({
        key: vm.$t('shopping_cart.subtotal'),
        value: vm.getSubtotal,
      })
      items.push({
        key: vm.$t('shopping_cart.shipping_fee'),
        value: vm.getShippingFee,
      })
      items.push({
        key: vm.$t('shopping_cart.processing_fee'),
        value: vm.getProcessingFee,
      })
      items.push({ key: vm.$t('shopping_cart.tax'), value: vm.getTax })
      return items
    },
  },
  mounted() {
    this.heatcheckId = this.$route.query.id
    if (this.$route.query.sku !== undefined) {
      this.sku = this.$route.query.sku
    }
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      addOrderProducts: 'order-details/addOrderProducts',
      removePromoCode: 'order-details/removePromoCode',
      cardCheckout: 'heat-check/cardCheckout',
      installmentCheckout: 'heat-check/installmentCheckout',
      cryptoCheckout: 'heat-check/cryptoCheckout',
      removeProducts: 'shopping-cart/removeProducts',
      addOrderDetails: 'order-details/addOrderDetails',
      removePaymentToken: 'order-details/removePaymentToken',
      addPaymentMethod: 'auth/addPaymentMethod',
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
      this.cardCheckout({
        type: this.shoppingType,
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotal,
        total: this.getTotal,
        promoCode: this.promoCode.code,
        giftCardCode: this.giftCard.number,
        paymentToken: this.paymentToken,
        paymentMethod: this.paymentMethod,
        billingAddress: this.billingAddress,
        shoppingCart: this.shoppingCart,
        id: this.heatcheckId,
      })
        .then((data) => {
          data.products = this.shoppingCart
          this.removeProducts()
          this.addOrderDetails(data).then(() => {
            this.$router.push('/checkout/heat-check/order-confirmation')
          })
        })
        .catch((error) => {
          this.loading = false
          if (error.response.status === 400) {
            this.$toasted.error(
              this.$t(error.response.data.response_text).toString()
            )
            return
          }
          this.$toasted.error(error.response.statusText)
        })
      this.removePaymentToken()
    },
    checkoutWithInstallment() {
      this.loading = true
      this.installmentCheckout({
        type: this.shoppingType,
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotal,
        total: Math.ceil(this.$options.filters.formatPrice(this.getTotal)),
        promoCode: this.promoCode.code,
        giftCardCode: this.giftCard.number,
        paymentToken: this.paymentToken,
        paymentMethod: this.paymentMethod,
        billingAddress: this.billingAddress,
        shoppingCart: this.shoppingCart,
        installmentDetails: this.installmentPlans,
        id: this.heatcheckId,
      })
        .then((data) => {
          data.products = this.shoppingCart
          this.removeProducts()
          this.addOrderDetails(data).then(() => {
            this.$router.push('heat-check/order-confirmation')
          })
        })
        .catch((error) => {
          this.loading = false
          if (error.response.status === 400) {
            this.$toasted.error(
              this.$t(error.response.data.response_text).toString()
            )
            return
          }
          this.$toasted.error(error.response.statusText)
        })
      this.removePaymentToken()
    },
    checkoutWithCrypto() {
      this.loading = true
      this.cryptoCheckout({
        type: this.shoppingType,
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotal,
        total: this.getTotal,
        promoCode: this.promoCode.code,
        giftCardCode: this.giftCard.number,
        billingAddress: this.billingAddress,
        shoppingCart: this.shoppingCart,
        paymentMethod: this.cryptoDetails,
        id: this.heatcheckId,
      })
        .then((data) => {
          data.products = this.shoppingCart
          this.removeProducts()
          this.addOrderDetails(data).then(() => {
            this.$router.push('heat-check/order-confirmation')
          })
        })
        .catch((error) => {
          this.loading = false
          if (error.response.status === 400) {
            this.$toasted.error(
              this.$t(error.response.data.response_text).toString()
            )
            return
          }
          this.$toasted.error(error.response.statusText)
        })
    },
  },
}
</script>
