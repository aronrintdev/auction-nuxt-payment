<template>
  <!-- Order Summary -->
  <b-col md="3">
    <OrderTitle
      :title="$t('shopping_cart.order_summary')"
    />

    <!-- Quantity of Items Purchased Indication -->
    <b-row class="mt-3">
      <b-col md="12">
        <div class="body-5-bold">
          {{ $t('shopping_cart.items_purchasing') }}&colon;&nbsp;{{
            getTotalQuantity
          }}
        </div>
      </b-col> </b-row
    ><!-- End of Quantity of Items Purchased Indication -->

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
      :promo-code-discount="getPromoDiscount"
      :gift-card-number="giftCard.number"
      :gift-card-discount="getGiftCardDiscount"
      @clear-promo="clearPromoCode"
      @clear-gift-card="removeGiftCard"
    />
    <!-- End of Shopping Cart Order Summary Card -->

    <!-- Deadstock Reward Card -->
    <b-row v-if="redeemedReward">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.deadstock_rewards') }}&colon;
        </div>
      </b-col>
    </b-row>
    <RewardCard
      v-if="redeemedReward"
      :redeemed-reward-type="redeemedReward.reward_threshold.reward_type"
      class="mt-2"
      @clear-reward="clearReward"
    />
    <!-- End of Deadstock Reward Card -->

    <!-- Shopping Cart Promo Code Button -->
    <PromoCodeButton v-if="! isPromoCodeVisible && ! promoCode" @show-promo="isPromoCodeVisible = true" />
    <!-- End of Shopping Cart Promo Code Button -->

    <!-- Shopping Cart Promo Code -->
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
      @click="applyPromoCode"
    />
    <!-- End of Shopping Cart Promo Code -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-show="billingAddress" :class="{ 'mt-3': !promoCode }">
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
      v-show="paymentMethod || giftCard || cryptoDetails.estimatedAmount"
      :class="{ 'mt-3': !billingAddress & !shippingAddress }"
    >
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    <InstallmentPlanDetailsCard
      v-show="paymentMethod.paymentType === isInstallment"
      class="mt-2"
      editable
      clearable
      :installment-plan-date="installmentPlans.date"
      :installment-plan-type="installmentPlans.type"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)"
      @clear="removeInstallmentPlan()"
    />
    <PaymentCardDetailsCard
      v-show="paymentMethod.paymentType === isCard"
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
      clearable
      :crypto-currency="cryptoDetails.currency"
      :estimated-amount="cryptoDetails.estimatedAmount"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)"
      @clear="removeCryptoDetails()"
    />
    <!-- End of Shopping Cart Payment Details -->

    <!-- Shopping Cart Applied Gift Card -->
    <GiftCardDetailsCard
      v-if="giftCard"
      :class="{ 'mt-2': ! cryptoDetails.amount && ! paymentMethod }"
      editable
      clearable
      :amount="giftCard.amount"
      :number="giftCard.number"
      :image="giftCard.image"
      @edit="emitRenderComponentEvent($parent.$options.components.PaymentGiftCard.name)"
      @clear="removeGiftCard()"
    />
    <!-- End of Shopping Cart Applied Gift Card -->

    <!-- Terms & Conditions Paragraph -->
    <b-row v-show="billingAddress && shippingAddress && (paymentMethod || cryptoDetails.amount)" class="mt-4 px-4">
      <b-col md="12">
        <b-form-checkbox v-model="form.agreedToTerms">
          <template #default>
            <i18n
              path="shopping_cart.terms_and_conditions_paragraph"
              tag="p"
              class="body-5-normal justify-content-start pl-1"
            >
              <span class="text-decoration-underline" role="button" @click="$router.push('/terms-and-conditions')">
                {{ $t('shopping_cart.terms_and_conditions') }}
              </span>
            </i18n>
          </template>
        </b-form-checkbox>
      </b-col>
     </b-row><!-- End of Terms & Conditions Paragraph -->

    <!-- Shopping Cart Total Price Heading -->
    <b-row class="mt-4">
      <b-col md="12" class="d-flex align-items-center">
        <span class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</span>
        <span class="body-4-medium ml-auto">&dollar;{{ getTotal | formatPrice }}</span>
      </b-col>
    </b-row><!-- End of Shopping Cart Total Price Heading -->

    <!-- Insufficient Quantity Modal -->
    <b-modal
      id="insufficient-quantity-modal"
      centered
      hide-footer
      content-class="radius-3"
      header-class="border-bottom-0"
      body-class="pt-0"
    >
      <b-container fluid>
        <b-row>
          <b-col md="8" offset-md="2" class="text-center">
            <div class="body-3-regular text-pre-line">{{ $t('shopping_cart.we_do_not_have_enough_in_stock') }}</div>
          </b-col>
        </b-row>
        <b-row class="mt-3 mb-2 d-flex align-items-center">
          <b-col md="4" offset-md="2">
            <b-button
              block
              pill
              variant="confirm"
              @click="$bvModal.hide('insufficient-quantity-modal')"
            >{{ $t('shopping_cart.get_notified') }}
            </b-button>
          </b-col>
          <b-col md="4">
            <b-button
              block
              pill
              variant="outline-dark"
              @click="$bvModal.hide('insufficient-quantity-modal')"
            >{{ $t('shopping_cart.cancel') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <!-- End of Insufficient Quantity Modal -->

    <!-- Alternative Items Modal -->
    <b-modal
      id="alternative-items-modal"
      centered
      size="lg"
      hide-footer
      content-class="radius-3"
      header-class="border-bottom-0"
      body-class="pt-0"
    >
      <b-container fluid>
        <b-row>
          <b-col md="10" offset-md="1" class="text-center">
            <div class="body-3-regular text-pre-line">{{ $t('shopping_cart.stock_from_different_vendors') }}</div>
            <!-- Shopping Cart Alternative Item -->
            <ListItem
              v-for="product in alternativeItems"
              :key="product.listing_item_id"
              :product="product"
            /><!-- End of Shopping Cart Alternative Item -->
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-2 d-flex align-items-center">
          <b-col md="4" offset-md="2">
            <b-button
              block
              pill
              variant="confirm"
              @click="handleAddToBag"
            >{{ $t('shopping_cart.add_to_bag') }}
            </b-button>
          </b-col>
          <b-col md="4">
            <b-button
              block
              pill
              variant="outline-dark"
              @click="$bvModal.hide('alternative-items-modal')"
            >{{ $t('shopping_cart.cancel') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <!-- End of Alternative Items Modal -->

    <!-- Shopping Cart Place Order Button -->
    <b-row class="mt-4">
      <b-col v-if="loading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="text-center place-order-wrapper">
        <b-button v-if="!billingAddress" :disabled="! getTotalQuantity" type="button" class="px-0" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.BillingForm.name)">{{
            $t('shopping_cart.proceed_to_billing')
          }}</b-button>
        <b-button v-else-if="!shippingAddress" :disabled="! getTotalQuantity" type="button" class="px-0" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)">{{
            $t('shopping_cart.proceed_to_shipping')
          }}</b-button>
        <b-button v-else-if="!paymentMethod && !cryptoDetails.estimatedAmount" :disabled="! getTotalQuantity" type="button" class="px-0" variant="confirm" pill @click="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)">{{
            $t('shopping_cart.proceed_to_payment')
          }}</b-button>
        <b-button v-else-if="paymentMethod && paymentMethod.paymentType === isCard" type="button" :disabled=" ! form.agreedToTerms || ! getTotalQuantity" class="px-0" variant="confirm" pill @click="checkoutWithCard">{{
            $t('shopping_cart.place_order')
          }}</b-button>
        <b-button v-else-if="paymentMethod" type="button" :disabled=" ! form.agreedToTerms || ! getTotalQuantity" class="px-0" variant="confirm" pill @click="checkoutWithInstallment">{{
            $t('shopping_cart.place_order')
          }}</b-button>
        <b-button v-else type="button" :disabled="! form.agreedToTerms  || ! getTotalQuantity" class="px-0" variant="confirm" pill @click="checkoutWithCrypto">{{
            $t('shopping_cart.place_order')
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
import PromoCodeButton from '~/components/checkout/common/PromoCodeButton'
import PromoCodeInput from '~/components/checkout/common/PromoCodeInput'
import AddressCard from '~/components/checkout/common/AddressCard'
import InstallmentPlanDetailsCard from '~/components/checkout/common/InstallmentPlanDetailsCard'
import PaymentCardDetailsCard from '~/components/checkout/common/PaymentCardDetailsCard'
import CryptoDetailsCard from '~/components/checkout/common/CryptoDetailsCard'
import GiftCardDetailsCard from '~/components/checkout/common/GiftCardDetailsCard'
import RewardCard from '~/components/checkout/common/RewardCard'
import ListItem from '~/components/checkout/selling/order-confirmation/ListItem'
import {
  PERCENT,
  FIXED_PRODUCT,
  PAYMENT_METHOD_TYPE_CARD,
  PAYMENT_METHOD_TYPE_INSTALLMENT,
  BAD_REQUEST,
  NOT_FOUND,
  PERCENT_OFFSET,
  AMOUNT_OFFSET
} from '~/static/constants'

export default {
  name: 'OrderSummary',
  components: {
    OrderTitle,
    OrderSummaryCard,
    PromoCodeButton,
    PromoCodeInput,
    AddressCard,
    InstallmentPlanDetailsCard,
    PaymentCardDetailsCard,
    CryptoDetailsCard,
    GiftCardDetailsCard,
    RewardCard,
    ListItem,
  },
  mixins: [ emitEvent ],
  data() {
    return {
      loading: false,
      isPromoCodeVisible: false,
      alternativeItems: [],
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
      shoppingCart: 'shopping-cart/getShoppingCart',
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      paymentToken: 'order-details/getPaymentToken',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
      redeemedReward: 'redeemed-reward/getRedeemedReward',
      freeShippingRedeemedReward: 'redeemed-reward/getFreeShippingRedeemedReward',
      freeSneakersRedeemedReward: 'redeemed-reward/getFreeSneakersRedeemedReward',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate'
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
    getShippingFullName: (vm) => {
      return `${vm.shippingAddress.firstName} ${vm.shippingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingAddress: (vm) => {
      return `${vm.shippingAddress.addressLine}, ${vm.shippingAddress.city}, ${vm.shippingAddress.country}, ${vm.shippingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      let totalQuantity =  vm.shoppingCart.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)

      if (vm.freeSneakersRedeemedReward) {
        ++totalQuantity
      }

      return totalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterInstantShip: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        if (product.instantShipPrice) {
          return sum + product.instantShipPrice * product.quantity
        }

        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      if (vm.getSubtotalAfterInstantShip) {
        return Math.max(vm.getSubtotalAfterInstantShip - vm.getDiscount, 0)
      }

      return Math.max(vm.getSubtotal - vm.getDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      if (vm.freeShippingRedeemedReward) {
        return 0.00
      }

      return vm.shippingFee * vm.getTotalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getProcessingFee: (vm) => {
      if (vm.freeSneakersRedeemedReward) {
        return Math.trunc(vm.processingFee * (vm.getSubtotal + vm.freeSneakersRedeemedReward.price))
      }

      return Math.trunc(vm.processingFee * vm.getSubtotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.getSubtotalAfterDiscount)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotalAfterDiscount

      return vm.getTotalQuantity > 0 ? total : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
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
            if (vm.getSubtotalAfterInstantShip) {
              discount += vm.getSubtotalAfterInstantShip * (vm.promoCode.amount / PERCENT_OFFSET)
            } else {
              discount += vm.getSubtotal * (vm.promoCode.amount / PERCENT_OFFSET)
            }

            break;
          }
          default:
            discount += vm.promoCode.amount * AMOUNT_OFFSET
        }
      }

      return discount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
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
      // DVQ-24 items should be calculated if there is product in cart
      if (vm.getSubtotalAfterInstantShip) {
        items.push({ key: 'sub_total', label: vm.$t('shopping_cart.subtotal'), value: vm.getTotalQuantity > 0 ? vm.getSubtotalAfterInstantShip : 0 })
      } else {
        items.push({ key: 'sub_total', label: vm.$t('shopping_cart.subtotal'), value: vm.getTotalQuantity > 0 ? vm.getSubtotal : 0 })
      }

      items.push({ key: 'sub_total_after_discount', label: '', value: vm.getTotalQuantity > 0 ? vm.getSubtotalAfterDiscount : 0 })
      items.push({ key: 'shipping_fee', label: vm.$t('shopping_cart.shipping_fee'), value: vm.getTotalQuantity > 0 ? vm.getShippingFee : 0 })
      items.push({ key: 'processing_fee', label: vm.$t('shopping_cart.processing_fee'), value: vm.getTotalQuantity > 0 ? vm.getProcessingFee : 0 })
      items.push({ key: 'tax', label: vm.$t('shopping_cart.tax'), value: vm.getTotalQuantity > 0 ? vm.getTax : 0 })

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
      cardCheckout: 'shopping-cart/cardCheckout',
      installmentCheckout: 'shopping-cart/installmentCheckout',
      cryptoCheckout: 'shopping-cart/cryptoCheckout',
      removeProducts: 'shopping-cart/removeProducts',
      addOrderDetails: 'order-details/addOrderDetails',
      removePaymentToken: 'order-details/removePaymentToken',
      removeRedeemedReward: 'redeemed-reward/removeRedeemedReward',
      clearRedeemedReward: 'redeemed-reward/clearRedeemedReward',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
      addAlternativeProducts: 'shopping-cart/addAlternativeProducts',
      removeGiftCard: 'order-details/removeGiftCard',
      removeCryptoDetails: 'order-details/removeCryptoDetails',
      removePaymentMethod: 'auth/removePaymentMethod',
      removeInstallmentPlan: 'order-details/removeInstallmentPlan',
    }),
    clearPromoCode() {
      this.removePromoCode()
      this.inputPromoCode = ''
    },
    applyPromoCode(promoCode) {
      this.$axios.post('coupons/check', {
        promo_code: promoCode,
        listing_items: this.shoppingCart
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
    clearReward() {
      this.removeRedeemedReward()
    },
    // TODO: Extract the pattern shown in the checkout methods.
    checkoutWithCard() {
      this.loading = true
      this.cardCheckout({
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotalAfterInstantShip,
        total: this.getTotal,
        promoCode: this.promoCode ? this.promoCode.code : '',
        giftCardNumber: this.giftCard ? this.giftCard.number : '',
        giftCardAmount: this.giftCard ? this.giftCard.amount : 0,
        paymentToken: this.paymentToken,
        paymentMethod: this.paymentMethod,
        billingAddress: this.billingAddress,
        shippingAddress: this.shippingAddress,
        shoppingCart: this.shoppingCart,
        redeemedReward: this.freeSneakersRedeemedReward
      }).then((data) => {
        if (data.message === 'shopping_cart.stock_from_different_vendors') {
          this.alternativeItems = data.data
          this.$bvModal.show('alternative-items-modal')
          this.loading = false
        } else {
          data.products = this.shoppingCart
          data.redeemedReward = this.redeemedReward
          this.removeProducts()
          this.clearRedeemedReward()
          this.addOrderDetails(data).then(() => {
            this.$router.push('selling/order-confirmation')
          })
        }
      }).catch(error => {
        this.loading = false

        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          if (error.response.data?.message === 'shopping_cart.insufficient_quantity') {
            this.$bvModal.show('insufficient-quantity-modal')
          }

          return
        }

        this.$toasted.error(error.response.statusText)
      })
      this.removePaymentToken()
    },
    checkoutWithInstallment() {
      this.loading = true
      this.installmentCheckout({
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotalAfterInstantShip,
        total: this.getTotal,
        promoCode: this.promoCode ? this.promoCode.code : '',
        giftCardNumber: this.giftCard ? this.giftCard.number : '',
        giftCardAmount: this.giftCard ? this.giftCard.amount : 0,
        paymentToken: this.paymentToken,
        paymentMethod: this.paymentMethod,
        billingAddress: this.billingAddress,
        shippingAddress: this.shippingAddress,
        shoppingCart: this.shoppingCart,
        installmentDetails: this.installmentPlans,
        redeemedReward: this.freeSneakersRedeemedReward
      }).then((data) => {
          if (data.message === 'shopping_cart.stock_from_different_vendors') {
            this.alternativeItems = data.data
            this.$bvModal.show('alternative-items-modal')
            this.loading = false
          } else {
            data.products = this.shoppingCart
            data.redeemedReward = this.redeemedReward
            this.removeProducts()
            this.clearRedeemedReward()
            this.addOrderDetails(data).then(() => {
              this.$router.push('selling/order-confirmation')
            })
          }
      }).catch(error => {
        this.loading = false

        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          if (error.response.data?.message === 'shopping_cart.insufficient_quantity') {
            this.$bvModal.show('insufficient-quantity-modal')
          }

          return
        }

        this.$toasted.error(error.response.statusText)
      })
      this.removePaymentToken()
    },
    checkoutWithCrypto() {
      this.loading = true
      this.cryptoCheckout({
        discount: this.getDiscount,
        processingFee: this.getProcessingFee,
        shippingFee: this.getShippingFee,
        tax: this.getTax,
        subTotal: this.getSubtotalAfterInstantShip,
        total: this.getTotal,
        promoCode: this.promoCode ? this.promoCode.code : '',
        giftCardNumber: this.giftCard ? this.giftCard.number : '',
        giftCardAmount: this.giftCard ? this.giftCard.amount : 0,
        billingAddress: this.billingAddress,
        shippingAddress: this.shippingAddress,
        shoppingCart: this.shoppingCart,
        paymentMethod: this.cryptoDetails,
        redeemedReward: this.freeSneakersRedeemedReward
      }).then((data) => {
          if (data.message === 'shopping_cart.stock_from_different_vendors') {
            this.alternativeItems = data.data
            this.$bvModal.show('alternative-items-modal')
            this.loading = false
          } else {
            data.products = this.shoppingCart
            data.redeemedReward = this.redeemedReward
            this.removeProducts()
            this.clearRedeemedReward()
            this.addOrderDetails(data).then(() => {
              this.$router.push('selling/order-confirmation')
            })
          }
      }).catch(error => {
        this.loading = false

        if (error.response.status === BAD_REQUEST) {
          this.$toasted.error(this.$t(error.response.data.error).toString())

          if (error.response.data?.message === 'shopping_cart.insufficient_quantity') {
            this.$bvModal.show('insufficient-quantity-modal')
          }

          return
        }

        this.$toasted.error(error.response.statusText)
      })
    },
    handleAddToBag() {
      this.addAlternativeProducts(this.alternativeItems)
      this.$bvModal.hide('alternative-items-modal')
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

*
  font-family: 'SF Pro Display', serif

/* Promo code input & button styles */
#btn-promo
  border-radius: 0 0.25rem 0.25rem 0
  font-weight: $medium

#promo-input
  border-radius: 0.25rem

.text-pre-line
  white-space: pre-line

.place-order-wrapper
  button
    width: 216px
    height: 40px
</style>
