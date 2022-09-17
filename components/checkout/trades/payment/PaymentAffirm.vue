<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.installment_plan')"
      @click="
        emitRenderComponentEvent($parent.$options.components.PaymentOption.name)
      "
    /><!-- End of Order Title -->

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
                {{ $t('shopping_cart.subtotal') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="body-5-regular text-gray-25 pull-right">
                &dollar;{{ getSubtotal | formatPrice }}
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
            <b-col md="6" class="d-flex align-items-center">
              <div class="body-5-normal">
                {{ $t('shopping_cart.total') }}&colon;
              </div>
            </b-col>
            <b-col md="6">
              <div class="pull-right body-5-normal">
                &dollar;{{ getTotal | formatPrice }}
              </div>
            </b-col>
          </b-row>
          <div class="row mt-3">
            <div class="d-flex align-items-center col-md-12">
              <div class="body-5-normal">
                <small>
                  {{
                    $t('shopping_cart.affirm_loan_text', {
                      price: Math.ceil($options.filters.formatPrice(getTotal)),
                    })
                  }}
                </small>
              </div>
            </div>
          </div>
        </b-card>
      </b-col> </b-row
    ><!-- End of Shopping Cart Total Card -->

    <!-- Instalment Plan Radio Option -->
    <RadioOptionCard
      class="mt-3"
      :name="instalmentPlanOption.name"
      :checked="instalmentPlanOption.checked"
      :value="instalmentPlanOption.value"
      :image-urls="instalmentPlanOption.imageUrls"
    >
      <template #text>{{ instalmentPlanOption.text }}</template>
    </RadioOptionCard>
    <!-- End of Instalment Plan Radio Option Radio Option -->
    <b-row class="mt-4">
      <b-col md="12">
        <!-- Continue Button -->
        <b-row class="mt-3">
          <b-col md="12" class="text-center">
            <b-button
              ref="viewAffirmDetails"
              type="submit"
              class="px-5"
              variant="confirm"
              pill
              @click="loadCheckOut"
              >{{ $t('shopping_cart.view_affirm_pay') }}</b-button
            >
          </b-col>
        </b-row>
        <!-- End of Continue Button -->
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard'

import {
  AMOUNT_OFFSET,
  FIXED_PRODUCT,
  PAYMENT_METHOD_INSTALLMENT_AFFIRMPAY,
  PAYMENT_METHOD_TYPE_INSTALLMENT, PERCENT, PERCENT_OFFSET,
} from '~/static/constants'
import eventMixin from '~/plugins/mixins/emit-event'
export default {
  name: 'PaymentAffirm',

  components: { OrderTitle, RadioOptionCard },

  mixins: [eventMixin],

  data() {
    return {
      instalmentPlanOption: {
        name: 'payment-option',
        checked: 'PaymentAffirm',
        value: 'PaymentAffirm',
        imageUrls: 'affirm-logo.png',
        text: this.$t('shopping_cart.affirm'),
      },
      appUrl: process.env.APP_URL,
      orderID: '',
      form: {
        inputCardHolderName: '',
        inputCardNumber: '',
        inputCardExpiryDate: '',
        inputCardBrand: '',
        saveForNextTime: false,
      },
    }
  },

  async fetch() {
    // Get the last OrderID from the system
    await this.$axios
      .get('/get-last-orderid')
      .then((response) => {
        this.orderID = response.data.orderID
      })
      .catch((error) => {
        // TODO: If error
        this.$toasted.error(this.$t(error.response.data.message))
      })
  },

  computed: {
    ...mapGetters({
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      shoppingCart: 'shopping-cart/getShoppingCart',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      freeShippingRedeemedReward: 'redeemed-reward/getFreeShippingRedeemedReward',
      freeSneakersRedeemedReward: 'redeemed-reward/getFreeSneakersRedeemedReward',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate',
    }),
    // Restructure the users billing address
    getBillingAddress: (vm) => {
      return {
        name: {
          first: vm.billingAddress.firstName,
          last: vm.billingAddress.lastName,
        },
        address: {
          line1: vm.billingAddress.addressLine,
          line2: '',
          city: vm.billingAddress.city,
          state: vm.billingAddress.state,
          zipcode: vm.billingAddress.zipCode,
          country: vm.billingAddress.country,
        },
        phone_number: vm.billingAddress.phone || '',
        email: vm.billingAddress.email,
      }
    },
    // Restructure the users shippingAddress
    getShippingAddress: (vm) => {
      return {
        name: {
          first: vm.shippingAddress.firstName,
          last: vm.shippingAddress.lastName,
        },
        address: {
          line1: vm.shippingAddress.addressLine,
          line2: '',
          city: vm.shippingAddress.city,
          state: vm.shippingAddress.state,
          zipcode: vm.shippingAddress.zipCode,
          country: vm.shippingAddress.country,
        },
        phone_number: vm.shippingAddress.phone || '',
        email: vm.shippingAddress.email,
      }
    },
    getShoppingCart: (vm) => {
      const items = []
      for (let i = 0; i < vm.shoppingCart.length; i++) {
        const array = {
          display_name: vm.shoppingCart[i].name,
          sku: vm.shoppingCart[i].sku,
          unit_price: vm.$options.filters.formatPrice(vm.shoppingCart[i].price),
          qty: vm.shoppingCart[i].quantity,
          item_image_url: vm.shoppingCart[i].image,
          item_url: `${vm.appUrl}/shop/${vm.shoppingCart[i].sku}`,
        }
        items.push(array)
      }
      return items
    },
    getSubtotal: (vm) => {
      return vm.shoppingCart.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      const total = vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotalAfterDiscount

      return vm.getTotalQuantity > 0 ? total : 0
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterDiscount: (vm) => {
      return Math.max(vm.getSubtotal - vm.getDiscount, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getDiscount: (vm) => {
      return Math.trunc(vm.getPromoDiscount + vm.getGiftCardDiscount)
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
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingFee: (vm) => {
      if (vm.freeShippingRedeemedReward) {
        return 0.00
      }

      return vm.shippingFee * vm.getTotalQuantity
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
    getProcessingFee: (vm) => {
      if (vm.freeSneakersRedeemedReward) {
        return Math.trunc(vm.processingFee * (vm.getSubtotal + vm.freeSneakersRedeemedReward.price))
      }

      return Math.trunc(vm.processingFee * vm.getSubtotal)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTax: (vm) => {
      return Math.trunc(vm.taxRate * vm.getSubtotal)
    },
  },

  methods: {
    ...mapActions({
      addPaymentMethod: 'auth/addPaymentMethod',
      addPaymentToken: 'order-details/addPaymentToken',
      addInstallmentPlans: 'order-details/addInstallmentPlans',
    }),
    injectAffirm() {
      // Inject Affirm JS
      const affirmConfig = {
        public_api_key: process.env.AFFIRM_PUBLIC_API_KEY, // Affirm Key
        script: process.env.AFFIRMJS_URL, // AffirmJS Url
      }

      ;(function (m, g, n, d, a, e, h, c) {
        const b = m[n] || {}
        const k = document.createElement(e)
        const p = document.getElementsByTagName(e)[0]
        const l = function (a, b, c) {
          return function () {
            a[b]._.push([c, arguments])
          }
        }
        b[d] = l(b, d, 'set')
        const f = b[d]
        b[a] = {}
        b[a]._ = []
        f._ = []
        b._ = []
        b[a][h] = l(b, a, h)
        b[c] = function () {
          b._.push([h, arguments])
        }
        a = 0
        for (
          c =
            'set add save post open empty reset on off trigger ready setProduct'.split(
              ' '
            );
          a < c.length;
          a++
        )
          f[c[a]] = l(b, d, c[a])
        a = 0
        for (c = ['get', 'token', 'url', 'items']; a < c.length; a++)
          f[c[a]] = function () {}
        k.async = !0
        k.src = g[e]
        p.parentNode.insertBefore(k, p)
        delete g[e]
        f(g)
        m[n] = b
      })(
        window,
        affirmConfig,
        'affirm',
        'checkout',
        'ui',
        'script',
        'ready',
        'jsReady'
      )
    },

    loadCheckOut() {
      this.injectAffirm()
      this.$refs.viewAffirmDetails.disabled = true
      const checkoutObject = {
        merchant: this.merchantData(),
        shipping: this.getShippingAddress,
        billing: this.billingAddress,
        items: this.getShoppingCart,
        // Set to modal to enable the modal checkout flow (default uses redirect checkout flow). Possible values:- modal, redirect
        // More details: https://docs.affirm.com/developers/docs/modal-vs-redirect-checkout
        metadata: { mode: 'modal' },
        order_id: this.orderID,
        currency: 'USD',
        shipping_amount: this.$options.filters.formatPrice(this.shippingFee),
        tax_amount: this.$options.filters.formatPrice(this.tax),
        total: Math.ceil(this.$options.filters.formatPrice(this.getTotal)), // The checkout total must be a positive integer
      }
      // eslint-disable-next-line no-undef
      affirm.checkout(checkoutObject)

      // eslint-disable-next-line no-undef
      affirm.checkout.open({
        // Called when the customer exits, cancels, or is declined in the Affirm checkout flow.
        onFail: (err) => {
          const wrapper = window.$nuxt
          // Show the error
          wrapper.$toasted.error(
            wrapper.$t('shopping_cart.affirm_request_', {
              type: err.reason,
            })
          )
          this.removeAffirmJS()
        },
        // Called when the customer exits, cancels, or is declined in the Affirm checkout flow.
        onSuccess: (res) => {
          this.checkoutAffirmProceed(res)
          this.submit()
        },
      })
    },
    // Merchant Object for Affirm Pay
    merchantData() {
      // TODO:
      const merchant = {
        user_confirmation_url: '',
        user_cancel_url: `${this.appUrl}/shopping-cart`,
        user_confirmation_url_action: 'POST',
        name: process.env.APP_NAME,
        exchange_lease_enabled: true,
      }
      return merchant
    },
    // Proceed the affirm checkout
    checkoutAffirmProceed(payload) {
      // Save the details for installment payments
      // Add type as installment in Payment method and make the card details null
      // To seperate between normal and installment payments
      this.addPaymentMethod({
        paymentMethod: this.form,
        paymentMethodType: PAYMENT_METHOD_TYPE_INSTALLMENT, // TODO: Temporary payment method type. Will be dynamic in the near future.
      })
      this.addInstallmentPlans({
        isSelected: true,
        type: PAYMENT_METHOD_INSTALLMENT_AFFIRMPAY, // TODO: Temporary payment method type. Will be dynamic in the near future.
        date: this.$options.filters.formatDate(payload.created),
      })
      // Save the newly created payment token in order to be used for placing the order.
      this.addPaymentToken({
        paymentToken: payload.checkout_token,
        amount: Math.ceil(this.$options.filters.formatPrice(this.getTotal)),
      })
    },
    submit() {
      this.emitRenderComponentEvent(
        this.$parent.$options.components.OrderSummary.name
      )
    },
    removeAffirmJS() {
      this.$refs.viewAffirmDetails.disabled = false
      const el = document.querySelector(
        `script[src="${process.env.AFFIRMJS_URL}"]`
      )
      if (el) {
        el.parentNode.removeChild(el)
      }
    },
  },
}
</script>
