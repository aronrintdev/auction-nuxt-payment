<template>
  <b-col md="7">
    <BaseTitle />

    <b-row>
      <b-col md="8" offset="2">
        <b-row class="mt-4">
          <!-- Order Date Column -->
          <b-col md="3" offset="1">
            <div class="body-5-normal text-gray-6 mb-3">
              {{ $t('shopping_cart.order_date') }}
            </div>
            <div class="body-5-normal">{{ orderDate }}</div>
          </b-col>
          <!-- End of Order Date Column -->

          <!-- Shipping Address Column -->
          <b-col md="5">
            <div class="body-5-normal text-gray-6 mb-3">
              {{ $t('shopping_cart.shipping_address') }}
            </div>
            <div class="body-5-normal">{{ getBillingAddress }}</div> </b-col
          ><!-- End of Shipping Address Column -->

          <!-- Payment Column -->
          <b-col md="2">
            <div class="body-5-normal text-gray-6 mb-3">
              {{ $t('shopping_cart.payment') }}
            </div>
            <template v-if="paymentMethod.paymentType === isInstallment">
              <div class="body-5-normal">
                <span class="text-capitalize">
                  {{ installmentPlans.type }}&nbsp;{{
                    $t('shopping_cart.payment')
                  }}</span
                >
              </div>
            </template>
            <template v-else-if="paymentMethod.paymentType === isCardPayment">
              <div class="body-5-normal text-capitalize">
                {{ paymentMethod.paymentType }}&nbsp;{{
                  $t('shopping_cart.payment')
                }}
              </div>
              <div class="body-5-normal">
                <span class="text-capitalize">{{
                  paymentMethod.cardBrand
                }}</span
                >&nbsp;&dash;&nbsp;{{ paymentMethod.cardLastDigits }}
              </div>
              <div class="body-5-normal">
                {{ $t('shopping_cart.exp') }}&colon;&nbsp;{{
                  paymentMethod.cardExpiryDate
                }}
              </div>
            </template>
            <template v-else>
              <div class="body-5-normal">
                <span class="text-capitalize">
                  {{ $t('shopping_cart.' + cryptoDetails.currency) }}
                </span>
              </div>
            </template>
          </b-col> </b-row
        ><!-- End of Payment Column -->

        <!-- Order Number -->
        <b-row class="mt-5">
          <b-col md="12">
            <div class="heading-2-bold pull-right">
              {{ getTotalQuantity }}&nbsp;{{
                $tc('shopping_cart.item', getTotalQuantity)
              }}
            </div>
          </b-col> </b-row
        ><!-- End of Order Number -->

        <hr class="mb-5 mt-4 w-100" />

        <!-- Shopping Cart List Headers -->
        <b-row class="mb-4">
          <b-col md="8">
            <div class="body-5-bold text-gray-6 text-uppercase">
              {{ $t('shopping_cart.my_products') }}
            </div>
          </b-col>
          <b-col md="4">
            <b-row>
              <b-col md="6" class="text-center">
                <div class="body-5-bold text-gray-6 text-uppercase">
                  {{ $t('shopping_cart.quantity') }}
                </div>
              </b-col>
              <b-col md="6">
                <div class="body-5-bold text-gray-6 text-uppercase pull-right">
                  {{ $t('shopping_cart.total') }}
                </div>
              </b-col>
            </b-row>
          </b-col> </b-row
        ><!-- End Of Product List Headers -->

        <!-- Shopping Cart List Item -->
        <ListItem
          v-for="product in products"
          :key="product.name"
          :product="product"
        /><!-- End of Shopping Cart List Item -->

        <!-- List Item Modal -->
        <ListItemModal
          :product="productShownInModal"
        /><!-- End of List Item Modal -->

        <!-- Shopping Cart Total -->
        <b-row class="mt-2">
          <b-col md="6" offset="6">
            <b-row>
              <b-col md="6" offset="1">
                <div class="body-5-regular text-uppercase">
                  {{ $t('shopping_cart.subtotal') }}&colon;
                </div>
              </b-col>
              <b-col md="5">
                <div class="body-5-regular pull-right">
                  &dollar;{{ getSubtotal | formatPrice }}
                </div>
              </b-col>
            </b-row>
            <b-row v-if="promoCode" class="mt-3">
              <b-col md="6" offset="1">
                <div class="body-5-regular text-uppercase">
                  {{ $t('shopping_cart.promotion') }}&colon;
                </div>
              </b-col>
              <b-col md="5">
                <div class="body-5-regular pull-right">
                  &lpar;&dollar;{{ promoCode.amount | formatPrice }}&rpar;
                </div>
              </b-col>
            </b-row>
            <b-row v-if="giftCard" class="mt-3">
              <b-col md="6" offset="1">
                <div class="body-5-regular text-uppercase">
                  {{ $t('shopping_cart.gift_card') }}&colon;
                </div>
              </b-col>
              <b-col md="5">
                <div class="body-5-regular pull-right">
                  &lpar;&dollar;{{ giftCard.amount | formatPrice }}&rpar;
                </div>
              </b-col>
            </b-row>
          </b-col> </b-row
        ><!-- End of Shopping Cart Total Card -->

        <hr class="my-4 w-100" />

        <!-- Shopping Cart Total Price -->
        <b-row>
          <b-col md="6" offset="6">
            <b-row>
              <b-col md="6">
                <div class="body-2-bold pull-right text-uppercase">
                  {{ $t('shopping_cart.total') }}&colon;
                </div>
              </b-col>
              <b-col md="6">
                <div class="body-2-bold pull-right">
                  &dollar;{{ getTotal | formatPrice }}
                </div>
              </b-col>
            </b-row>
          </b-col> </b-row
        ><!-- End of Shopping Cart Total Price -->

        <!-- Crypto Details -->
        <b-row v-if="cryptoDetails.address" class="mt-4">
          <b-col md="4">
            <div class="body-5-regular text-gray-25">
              {{ $t('shopping_cart.requested_amount') }}&colon;
            </div>
            <b-input-group class="mt-3">
              <b-input
                class="input-crypto"
                readonly
                :value="cryptoDetails.estimatedAmount"
              ></b-input>
              <b-input-group-append
                class="pr-1 d-flex align-items-center bg-color-white-5"
              >
                <CopyIcon
                  class="btn-copy"
                  @click="copyToClipboard(cryptoDetails.estimatedAmount)"
                />
              </b-input-group-append>
              <b-input-group-append class="ml-2 d-flex align-items-center">
                <span class="text-uppercase">{{ cryptoDetails.currency }}</span>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col md="6" offset-md="2">
            <div class="body-5-regular text-gray-25">
              BTC&nbsp;{{ $t('shopping_cart.wallet_address') }}&colon;
            </div>
            <b-input-group class="mt-3">
              <b-input
                class="input-crypto"
                readonly
                :value="cryptoDetails.address"
              ></b-input>
              <b-input-group-append
                class="pr-1 d-flex align-items-center bg-color-white-5"
              >
                <CopyIcon
                  class="btn-copy"
                  @click="copyToClipboard(cryptoDetails.address)"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col> </b-row
        ><!-- End of Crypto Details -->

        <!-- Time Remaining Countdown -->
        <b-row v-if="cryptoDetails.address" class="mt-4">
          <b-col md="12">
            <VueCountdown
              :time="2 * 24 * 60 * 60 * 1000"
              class="pull-right text-color-red-6"
            >
              <template slot-scope="props">
                {{ $t('shopping_cart.remaining_time') }}&colon;&nbsp;{{
                  props.hours
                }}h&nbsp;{{ props.minutes }}m&nbsp;{{ props.seconds }}s
              </template>
            </VueCountdown>
          </b-col> </b-row
        ><!-- End of Time Remaining Countdown -->

        <!-- Hide Order Details Button -->
        <b-row class="mt-4">
          <b-col md="12" class="text-center">
            <b-button
              type="button"
              class="px-5"
              variant="confirm"
              @click="
                emitRenderComponentEvent(
                  $parent.$options.components.OrderPlaced.name
                )
              "
            >
              {{ $t('shopping_cart.hide_order_details') }}
            </b-button>
          </b-col> </b-row
        ><!-- End of Hide Order Details Button -->
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import VueCountdown from '@chenfengyuan/vue-countdown'
import CopyIcon from '~/assets/img/shopping-cart/clone.svg?inline'
import emitEvent from '~/plugins/mixins/emit-event'
import clipboard from '~/plugins/mixins/clipboard'
import BaseTitle from '~/components/checkout/heat-check/order-confirmation/BaseTitle'
import ListItem from '~/components/checkout/heat-check/order-confirmation/ListItem'
import ListItemModal from '~/components/checkout/heat-check/ListItemModal'
import {
  PAYMENT_METHOD_TYPE_CARD,
  PAYMENT_METHOD_TYPE_INSTALLMENT,
} from '~/static/constants'
export default {
  name: 'OrderDetails',
  components: { BaseTitle, ListItem, ListItemModal, CopyIcon, VueCountdown },
  mixins: [emitEvent, clipboard],
  data() {
    return {
      orderDate: new Date().toLocaleDateString(),
      shippingFee: 0, // TODO: Temporary dummy data
      processingFee: 0, // TODO: Temporary dummy data
      tax: 0, // TODO: Temporary dummy data
      productShownInModal: {},
      isInstallment: PAYMENT_METHOD_TYPE_INSTALLMENT,
      isCardPayment: PAYMENT_METHOD_TYPE_CARD,
    }
  },
  computed: {
    ...mapGetters({
      billingAddress: 'auth/getBillingAddress',
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
      products: 'order-details/getProducts',
      giftCard: 'order-details/getGiftCard',
      promoCode: 'order-details/getPromoCode',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingAddress: (vm) => {
      return `${vm.billingAddress.addressLine}, ${vm.billingAddress.city}, ${vm.billingAddress.country}, ${vm.billingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getShippingAddress: (vm) => {
      return `${vm.shippingAddress.addressLine}, ${vm.shippingAddress.city}, ${vm.shippingAddress.country}, ${vm.shippingAddress.zipCode}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      return vm.products.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.products.reduce((sum, product) => {
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
    // TODO: Connect with coupons feature.
    getTotal: (vm) => {
      let total = vm.shippingFee + vm.processingFee + vm.tax + vm.getSubtotal
      if (vm.promoCode) {
        total -= vm.promoCode.amount
      }
      if (vm.giftCard) {
        total -= vm.giftCard.amount
      }
      return total
    },
  },
  mounted() {
    this.$root.$on('showModal', (productId) => {
      this.productShownInModal = this.products.find(
        (product) => product.id === productId
      )
    })
  },
}
</script>
