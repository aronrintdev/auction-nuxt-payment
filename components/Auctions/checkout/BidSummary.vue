<template>
  <!-- Bid Summary -->
  <div>
    <div class="heading-1-medium d-block">{{ $t('auction_cart.bid_summary') }}</div>

    <!-- Quantity of Items Purchased Indication -->
    <b-row class="my-4">
      <b-col md="12">
        <div class="body-4-medium">
          {{ `${$t('shopping_cart.total')} ${$t('common.items')}: ${getTotalQuantity}` }}
        </div>
      </b-col> </b-row
    ><!-- End of Quantity of Items Purchased Indication -->

    <!-- Shopping Cart Total Card -->
    <b-row class="mt-3 mb-2">
      <b-col md="12">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-card class="custom-card radius-3">
          <b-row>
            <b-col md="6">
              <div class="body-5-regular text-gray-25">
                {{ $t('auction_cart.bid_price') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="body-5-regular text-gray-25 pull-right">
                &dollar;{{ getPrice | formatPrice }}
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col md="6">
              <div class="body-5-regular text-gray-25">
                {{ $t('shopping_cart.shipping_fee') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="body-5-regular text-gray-25 pull-right">
                &dollar;{{ getShippingFee | formatPrice }}
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col md="6">
              <div class="body-5-regular text-gray-25">
                {{ $t('shopping_cart.processing_fee') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="body-5-regular text-gray-25 pull-right">
                &dollar;{{ getProcessingFee | formatPrice }}
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col md="6">
              <div class="body-5-regular text-gray-25">
                {{ $t('shopping_cart.tax') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="body-5-regular text-gray-25 pull-right">
                &dollar;{{ getTax | formatPrice }}
              </div>
            </b-col>
          </b-row>
          <b-row v-if="promoCode" class="mt-3">
            <b-col md="6">
              <div class="body-5-regular text-gray-25">
                {{ $t('shopping_cart.promo_code') }}&colon;
              </div>
              <div class="body-5-regular text-success">
                {{ $t('shopping_cart.promo_code_applied') }}
              </div>
            </b-col>
            <b-col md="6" class="d-flex align-items-center">
              <b-button
                class="ml-auto pa-0"
                variant="img"
                @click="clearPromoCode"
                ><b-img
                  :src="require('~/assets/img/shopping-cart/x-close.svg')"
                ></b-img
              ></b-button>
              <span class="body-5-regular text-gray-25"
                >&minus;&dollar;{{ promoCode.amount | formatPrice }}</span
              >
            </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col md="6">
              <div class="body-5-bold text-gray-25">
                {{ $t('shopping_cart.total') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="body-5-bold text-gray-25 pull-right">
                &dollar;{{ getTotal | formatPrice }}
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row><!-- End of Shopping Cart Total Card -->

    <!-- Shopping Cart Promo Code -->
    <b-row v-if="!promoCode" class="mt-4 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.promo_code') }}&colon;
        </div>
      </b-col>
    </b-row>
    <b-row v-if="!promoCode">
      <b-col md="12">
        <b-input-group class="mb-3">
          <b-form-input
            id="promo-input"
            v-model="inputPromoCode"
            class="custom-form-element"
            :placeholder="$t('shopping_cart.enter_your_code')"
          ></b-form-input>
          <b-button
            id="btn-promo"
            type="button"
            variant="dark"
            @click="applyPromoCode"
            >{{ $t('shopping_cart.apply') }}</b-button
          >
        </b-input-group>
      </b-col> </b-row
    ><!-- End of Shopping Cart Promo Code -->

    <!-- Shopping Cart Billing Address -->
    <b-row v-if="billingAddress" class="mt-3 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.billing_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <b-row v-if="billingAddress">
      <b-col class="col-md-12">
        <b-card class="custom-card">
          <b-button
            variant="edit"
            @click="
              emitRenderComponentEvent(
                $parent.$options.components.BillingForm.name,
              )
            "
            ><b-img :src="require('~/assets/img/icons/pencil.svg')"></b-img
          ></b-button>
          <div class="body-5-normal mb-2">{{ getBillingFullName }}</div>
          <div class="body-5-regular">{{ getBillingAddress }}</div>
        </b-card>
      </b-col> </b-row
    ><!-- End of Shopping Cart Billing Address -->

    <!-- Shopping Cart Shipping Address -->
    <b-row v-if="shippingAddress" class="mt-4 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.shipping_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <b-row v-if="shippingAddress">
      <b-col class="col-md-12">
        <b-card class="custom-card">
          <b-button
            variant="edit"
            @click="
              emitRenderComponentEvent(
                $parent.$options.components.ShippingForm.name,
              )
            "
            ><b-img :src="require('~/assets/img/icons/pencil.svg')"></b-img
          ></b-button>
          <div class="body-5-normal mb-2">{{ getShippingFullName }}</div>
          <div class="body-5-regular">{{ getShippingAddress }}</div>
        </b-card>
      </b-col> </b-row
    ><!-- End of Shopping Cart Shipping Address -->

    <!-- Shopping Cart Payment Details -->
    <b-row
      v-if="paymentMethod || giftCard"
      class="mt-4 mb-2"
    >
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    
    <b-row v-if="paymentMethod">
      <template v-if="paymentMethod.paymentType === isInstallment">
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
                    $parent.$options.components.PaymentOption.name,
                  )
                "
                ><b-img :src="require('~/assets/img/icons/pencil.svg')"></b-img
              ></b-button>
            </b-row>
          </b-card>
        </b-col>
      </template>
      <b-col v-else md="12">
        <b-card class="custom-card">
          <b-row>
            <b-col md="2" class="d-flex align-items-center">
              <img
                :src="getCardBrandLogo"
                alt="..."
              />
            </b-col>
            <b-col md="5" class="d-flex align-items-center">
              <div class="body-5-normal">
                {{ $t('shopping_cart.ending_in') }}&colon;&nbsp;{{
                  paymentMethod.cardLastDigits
                }}
              </div>
            </b-col>
            <b-col md="4" class="d-flex align-items-center">
              <div class="body-5-normal">
                {{ $t('shopping_cart.exp') }}&colon;&nbsp;{{
                  paymentMethod.cardExpiryDate
                }}
              </div>
            </b-col>
            <b-button
              variant="edit"
              @click="
                emitRenderComponentEvent(
                  $parent.$options.components.PaymentOption.name,
                )
              "
              ><b-img :src="require('~/assets/img/icons/pencil.svg')"></b-img
            ></b-button>
          </b-row>
        </b-card>
      </b-col> </b-row
    ><!-- End of Shopping Cart Payment Details -->

    <!-- Shopping Cart Applied Gift Card -->
    <b-row v-if="giftCard" class="mt-4">
      <b-col md="12">
        <b-card class="custom-card">
          <b-row>
            <b-col md="2" class="d-flex align-items-center">
              <img
                :src="require('~/assets/img/shopping-cart/gift-card-logo.png')"
                alt="..."
              />
            </b-col>
            <b-col md="5" class="d-flex align-items-center">
              <div class="body-5-normal">{{ giftCard.number }}</div>
            </b-col>
            <b-col md="4" class="d-flex align-items-center">
              <div class="body-5-normal">
                &dollar;{{ giftCard.amount | formatPrice }}
              </div>
            </b-col>
            <b-button
              variant="edit"
              @click="
                emitRenderComponentEvent(
                  $parent.$options.components.PaymentGiftCard.name,
                )
              "
              ><b-img :src="require('~/assets/img/icons/pencil.svg')"></b-img
            ></b-button>
          </b-row>
        </b-card>
      </b-col> </b-row
    ><!-- End of Shopping Cart Applied Gift Card -->

    <!-- Terms & Conditions Paragraph -->
    <b-row v-if="billingAddress && shippingAddress && paymentMethod" class="mt-4">
      <b-col md="3" class="text-center">
        <b-form-checkbox v-model="isTermsAndConditionsChecked"></b-form-checkbox>
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
        <b-button v-if="!billingAddress" type="button" class="px-5" variant="confirm" @click="emitRenderComponentEvent($parent.$options.components.BillingForm.name)">{{
            $t('shopping_cart.proceed_to_billing')
          }}</b-button>
        <b-button v-else-if="!shippingAddress" type="button" class="px-5" variant="confirm" @click="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)">{{
            $t('shopping_cart.proceed_to_shipping')
          }}</b-button>
        <b-button v-else-if="!paymentMethod" type="button" class="px-5" variant="confirm" @click="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)">{{
            $t('shopping_cart.proceed_to_payment')
          }}</b-button>
        <b-button v-else type="button" class="px-5" variant="confirm" :disabled="!isTermsAndConditionsChecked" @click="placeBid">{{
            $t('shopping_cart.place_bid')
          }}</b-button>
      </b-col>
    </b-row><!-- End of Shopping Cart Total Price Heading -->
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
  </div><!-- End of Bid Summary -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import { PAYMENT_METHOD_TYPE_INSTALLMENT } from '~/static/constants'
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'

export default {
  name: 'BidSummary',
  components: {
    CheckmarkIcon,
    CloseIcon,
  },
  mixins: [emitEvent],
  data() {
    return {
      loading: false,
      inputPromoCode: '',
      shippingFee: 1000, // TODO: Temporary dummy data
      processingFee: 900, // TODO: Temporary dummy data
      tax: 100, // TODO: Temporary dummy data
      isInstallment: PAYMENT_METHOD_TYPE_INSTALLMENT,
      isTermsAndConditionsChecked: false,
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        saveForNextTime: false,
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
      installmentPlans: 'order-details/getInstallmentDetails'
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
    getCardBrandLogo: (vm) => {
      // Returns the card brand logo if found, otherwise returns the fallback logo.
      if (vm.paymentMethod) {
        try {
          return require('~/assets/img/shopping-cart/' + vm.paymentMethod.cardBrand + '-logo.png')
        } catch (error) {
          return require('~/assets/img/shopping-cart/visa-logo.png')
        }
      }
    },
    getTotalQuantity() {
      return this.auction && this.auction.auction_items ? this.auction.auction_items.length : 0
    },
    getPrice() {
      if (this.auction) {
        return this.auction.bid_price ? this.auction.bid_price : 0
      }
      return 0
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
      let total = vm.getPrice + vm.shippingFee + vm.processingFee + vm.tax

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
  },
  methods: {
    ...mapActions({
      addPromoCode: 'order-details/addPromoCode',
      removePromoCode: 'order-details/removePromoCode',
      checkout: 'shopping-cart/cardCheckout',
      removeProducts: 'shopping-cart/removeProducts',
      addOrderDetails: 'order-details/addOrderDetails',
      removePaymentToken: 'order-details/removePaymentToken',
      addPaymentMethod: 'auth/addPaymentMethod',
    }),
    // Remove promo code
    clearPromoCode() {
      this.removePromoCode()
      this.inputPromoCode = ''
    },
    // Apply promo code
    applyPromoCode() {
      this.addPromoCode({
        promoCode: this.inputPromoCode,
      })
    },
    // Place new bid for current auction
    placeBid() {
      this.loading = true
      // Place bid API
      this.$axios.post(`auctions/${this.auction.id}/bids`, {
        price: this.getPrice,
        shipping_fee: this.getShippingFee,
        processing_fee: this.getProcessingFee,
        tax: this.getTax,
        total: this.getTotal,
      }).then(() => {
        this.loading = false
        this.$bvModal.show('order-success-modal')
        this.removePaymentToken()
      }).catch(error => {
        this.loading = false

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
