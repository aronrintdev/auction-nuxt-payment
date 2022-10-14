<template>
  <b-col md="7">
    <BaseTitle />

    <b-row>
      <b-col md="8" offset="2">
        <b-row class="mt-4">
          <!-- Order Date Column -->
          <b-col md="2" offset="1">
            <div class="body-5-normal text-gray-6 mb-3">
              {{ $t('shopping_cart.order_date') }}
            </div>
            <div class="body-5-normal">{{ orderDate }}</div>
          </b-col>
          <!-- End of Order Date Column -->

          <!-- Shipping Address Column -->
          <b-col md="3">
            <div class="body-5-normal text-gray-6 mb-3">
              {{ $t('shopping_cart.shipping_address') }}
            </div>
            <div class="body-5-normal">{{ getBillingAddress }}</div> </b-col
          ><!-- End of Shipping Address Column -->

          <!-- Billing Address Column -->
          <b-col md="3">
            <div class="body-5-normal text-gray-6 mb-3">
              {{ $t('shopping_cart.billing_address') }}
            </div>
            <div class="body-5-normal">{{ getShippingAddress }}</div> </b-col
          ><!-- End of Billing Address Column -->

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
                {{ paymentMethod.paymentType }}&nbsp;{{ $t('shopping_cart.payment') }}
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

        <!-- Reward Item -->
        <div v-if="freeSneakersRedeemedReward">
          <RewardItem
            :product="freeSneakersRedeemedReward"
          />
        </div>
        <!-- End of Reward Item -->

        <!-- Shopping Cart List Item -->
        <ListItem
          v-for="product in products"
          :key="product.listing_item_id"
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
                  &dollar;{{ getSubtotalAfterInstantShip | formatPrice }}
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
                  &lpar;&dollar;{{ getPromoDiscount | formatPrice }}&rpar;
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
            <b-row class="mt-3">
              <b-col md="6" offset="1">
                <div class="body-5-regular text-uppercase">
                  {{ $t('shopping_cart.shipping_fee') }}&colon;
                </div>
              </b-col>
              <b-col md="5">
                <div class="body-5-regular pull-right">
                  &dollar;{{ getShippingFee | formatPrice }}
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="6" offset="1">
                <div class="body-5-regular text-uppercase">
                  {{ $t('shopping_cart.processing_fee') }}&colon;
                </div>
              </b-col>
              <b-col md="5">
                <div class="body-5-regular pull-right">
                  &dollar;{{ getProcessingFee | formatPrice }}
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col md="6" offset="1">
                <div class="body-5-regular text-uppercase">
                  {{ $t('shopping_cart.tax') }}&colon;
                </div>
              </b-col>
              <b-col md="5">
                <div class="body-5-regular pull-right">
                  &dollar;{{ getTax | formatPrice }}
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
                class="bg-color-white-5"
                readonly
                :value="cryptoDetails.estimatedAmount"
              ></b-input>
              <b-input-group-append class="pr-1 d-flex align-items-center bg-color-white-5">
                <CopyIcon role="button" class="btn-copy" @click="copyToClipboard(cryptoDetails.estimatedAmount)" />
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
                class="bg-color-white-5"
                readonly
                :value="cryptoDetails.address"
              ></b-input>
              <b-input-group-append class="pr-1 d-flex align-items-center bg-color-white-5">
                <CopyIcon role="button" class="btn-copy" @click="copyToClipboard(cryptoDetails.address)" />
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row><!-- End of Crypto Details -->

        <!-- Time Remaining Countdown -->
        <b-row v-if="cryptoDetails.address" class="mt-4">
          <b-col md="12">
            <VueCountdown :time="2 * 24 * 60 * 60 * 1000" class="pull-right text-red-6">
              <template slot-scope="props">
                {{ $t('shopping_cart.remaining_time') }}&colon;&nbsp;{{ props.hours }}h&nbsp;{{ props.minutes }}m&nbsp;{{ props.seconds }}s
              </template>
            </VueCountdown>
          </b-col>
        </b-row><!-- End of Time Remaining Countdown -->

        <!-- Hide Order Details Button -->
        <b-row class="mt-4">
          <b-col md="12" class="text-center">
            <b-button
              type="button"
              class="px-5"
              variant="confirm"
              pill
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
import {mapActions, mapGetters} from 'vuex'
import VueCountdown from '@chenfengyuan/vue-countdown'
import CopyIcon from '~/assets/img/shopping-cart/clone.svg?inline'
import emitEvent from '~/plugins/mixins/emit-event'
import clipboard from '~/plugins/mixins/clipboard'
import BaseTitle from '~/components/checkout/selling/order-confirmation/BaseTitle'
import ListItem from '~/components/checkout/selling/order-confirmation/ListItem'
import ListItemModal from '~/components/checkout/selling/ListItemModal'
import RewardItem from '~/components/checkout/selling/order-confirmation/RewardItem'
import {
  AMOUNT_OFFSET,
  FIXED_PRODUCT,
  PAYMENT_METHOD_TYPE_CARD,
  PAYMENT_METHOD_TYPE_INSTALLMENT,
  PERCENT,
  PERCENT_OFFSET
} from '~/static/constants'

export default {
  name: 'OrderDetails',
  components: { BaseTitle, ListItem, ListItemModal, CopyIcon, VueCountdown, RewardItem },
  mixins: [emitEvent, clipboard],
  data() {
    return {
      percent: PERCENT,
      orderDate: new Date().toLocaleDateString(),
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
      freeShippingRedeemedReward: 'order-details/getFreeShippingRedeemedReward',
      freeSneakersRedeemedReward: 'order-details/getFreeSneakersRedeemedReward',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      taxRate: 'tax-rate/getTaxRate'
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
      let totalQuantity =  vm.products.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)

      if (vm.freeSneakersRedeemedReward) {
        ++totalQuantity
      }

      return totalQuantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotal: (vm) => {
      return vm.products.reduce((sum, product) => {
        return sum + product.price * product.quantity
      }, 0)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubtotalAfterInstantShip: (vm) => {
      return vm.products.reduce((sum, product) => {
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
      return vm.getShippingFee + vm.getProcessingFee + vm.getTax + vm.getSubtotalAfterDiscount
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getPromoDiscount: (vm) => {
      let discount = 0

      if (vm.promoCode.code) {
        switch (vm.promoCode.type) {
          case FIXED_PRODUCT: {
            const items = vm.products.filter((item) => {
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
    getGiftCardDiscount: (vm) => {
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
  },
  mounted() {
    this.$root.$on('showModal', (product) => {
      this.productShownInModal = product
    })
  },
  destroyed() {
    this.removePromoCode()
    this.removeGiftCard()
  },
  methods: {
    ...mapActions({
      removePromoCode: 'order-details/removePromoCode',
      removeGiftCard: 'order-details/removeGiftCard',
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Custom background color */
.bg-color-white-5
  background: $color-white-5
</style>
