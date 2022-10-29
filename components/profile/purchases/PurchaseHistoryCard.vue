<template>
  <b-card v-if="purchase.type.label !== 'auction' && totalQuantity > 0 && purchaseStatus !== ''" class="purchase-card-wrapper card p-2">
    <b-card-title>
      <!-- Order Number -->
      <span class="order-no text-capitalize">
        {{ $t('vendor_purchase.order_no', { orderNo: purchase.order_id }) }}
        &#40;{{ purchase.type.label }}&#41;
      </span>
      <!-- ./Order Number -->
      <!-- View Order -->
      <span role="button" class="view-order" @click="viewOrder">{{
        $t('vendor_purchase.view_order')
      }}</span>
      <!-- ./View Order -->
    </b-card-title>

    <!-- Ordered Date -->
    <b-card-text class="order-on-wrapper">
      <span class="date text-capitalize d-flex align-items-center">
        {{ $t('vendor_purchase.ordered_on', { orderedDate: getOrderedDate }) }}
      </span>
    </b-card-text>
    <!-- ./Ordered Date -->

    <!-- Images -->
    <b-card-text class="order-images">
      <div class="row">
        <!-- Order Type - Buy -->
        <template v-if="ORDERS_HAS_ITEMS.includes(orderType) && purchase.items">
          <div
              v-for="(item, indexKey) in purchase.items.slice(0, 3)"
              :key="indexKey"
          >
            <div class="image-wrapper" :class="indexKey === 2 && 'bg-blur'">
              <b-img
                  class="product-img"
                  :src="item.product.image || fallbackImage"
              />
              <p v-if="indexKey === 2" class="overlap-text">
                &#x002B;{{ balanceImage }}
              </p>
            </div>
          </div>
        </template>
        <!-- ./Order Type - Buy -->
        <!-- .OrderType - Giftcard -->
        <div v-if="orderType === giftCard && purchase.purchaseItem">
          <div class="image-wrapper">
            <img
              :src="
                require(`~/assets/img/preferences/giftcard/${purchase.purchaseItem.image_name}`)
              "
              class="product-img"
            />
          </div>
        </div>
        <!-- .OrderType - Giftcard -->
      </div>
    </b-card-text>
    <!-- ./Images -->

    <!--  -->
    <b-card-text class="mt-auto">
      <b-row class="py-2">
        <b-col md="6" class="purchase-details-col">
          <div class="text-bold">
            {{ $t('vendor_purchase.quantity') }}&colon;
            {{ totalQuantity }}
          </div>
          <div class="text-bold">
            {{ $t('vendor_purchase.order_total') }}&colon;
            {{ purchase.total | toCurrency('USD', 'N/A') }}
          </div>
        </b-col>
        <b-col md="6" class="purchase-status-btn">
          <!-- Status Button -->
          <Button
              v-if="ORDERS_HAS_ITEMS.includes(orderType)"
              :variant="purchaseStatus"
              class="m-auto text-capitalize text-center status-button d-flex"
              :class="`btn-${purchaseStatus.split(' ').join('_')}`"
          >
            {{ $t(`vendor_purchase.orderstatus.${purchaseStatus.split(' ').join('_')}`) }}
          </Button>
          <div
            v-if="orderType === giftCard"
            :class="`${purchaseStatus}-status text-uppercase d-flex giftcard-status`"
          >
            {{ $t(`vendor_purchase.orderstatus.${purchaseStatus.split(' ').join('_')}`) }}
          </div>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import { Button } from '~/components/common'
import {
  MONTHS,
  GIFTCARD,
  PRODUCT_FALLBACK_URL,
  PRODUCT_IMG_WIDTH,
  IMAGE_COUNT,
  BUY,
  SELL, ORDERS_HAS_ITEMS
} from '~/static/constants'
export default {
  name: 'PurchaseHistoryCard',

  components: {
    Button,
  },

  props: {
    purchase: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      months: MONTHS,
      giftCard: GIFTCARD,
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      imageCount: IMAGE_COUNT,
      buy: BUY,
      sell: SELL,
      ORDERS_HAS_ITEMS
    }
  },

  computed: {
    // Order type
    orderType: (vm) => {
      return vm.purchase.type.label
    },
    // Ordered date
    getOrderedDate: (vm) => {
      const d = new Date(vm.purchase.created_at)

      return `${
        vm.months[d.getMonth()].text
      } ${d.getDate()}, ${d.getFullYear()}`
    },

    // Total quantity
    totalQuantity: (vm) => {
      if (
        typeof vm.purchase.type.label === 'string' &&
        vm.purchase.type.label === vm.giftCard
      ) {
        return 1
      }
      return vm.purchase.quantity
    },

    // Image
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
    // Balance image to show
    balanceImage: (vm) => {
      return vm.totalQuantity - vm.imageCount
    },
    // Status
    purchaseStatus: (vm) => {
      if (vm.purchase.type.label === vm.giftCard) {
        return vm.purchase.orderable.status.toLowerCase()
      }
      return vm.purchase.status.toLowerCase()
    },
  },

  methods: {
    viewOrder() {
      this.$router.push(`/profile/purchases/summary/${this.purchase.id}`)
      console.log('order data is',this.$router);
      console.log('order data is');
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.purchase-card-wrapper
  width: 484px
  height: 310px
  margin: 50px auto 30px
.order-no
  font-style: normal
  font-weight: $bold
  @include body-3
  align-items: center
  color: $color-black-1
.date
  @include body-5-medium
  font-style: normal
  color: $color-black-1
.view-order
  @include body-5-medium
  font-style: normal
  align-items: center
  text-decoration-line: underline
  color: $color-blue-2
  float: right
.card-body
  display: flex
  flex-direction: column
.product-img
  width: 113px
  height: 100%
.order-images
  .row
    justify-content: space-between
.overlap-text
  @include heading-2
  left: 75%
  padding-left: 20px
  padding-right: 20px
  position: absolute
  text-align: center
  top: 45%
.bg-blur
  background: $color-gray-68

/* Status indicator buttons */
.btn-multiple
  @include body-4-normal
  left: 1151px
  top: 662px
  background: $color-gray-69
  border-radius: 4px
  font-style: normal
  color: $color-purple-7
  float: right
.btn-processing,
.btn-pending
  @include body-4-normal
  left: 631px
  top: 662px
  background: $color-orange-18
  border-radius: 4px
  font-style: normal
  color: $color-yellow-5
  float: right
.btn-arrived_to_ds
  color: $color-green-8
  background: $color-green-14
  float: right
.btn-on_hold
  @include body-1-medium
  color: $color-gray-15
  float: right
.btn-send_to_ds
  background: $color-purple-8
  color: $color-purple-7
  float: right
.btn-arrived_to_ds
  color: $color-green-8
  background: $color-green-14
  float: right
.btn-awaiting_shipment
  @include body-3-medium
  color: $color-yellow-4
  float: right
.btn-awaiting_auth
  @include body-3-medium
  color: $color-red-2
  float: right
.btn-auth_issued
  background: $color-red-9
  color: $color-red-8
  font-weight: $bold
  float: right
.btn-shipped_to_buyer
  background: $color-grey-33
  color: $color-gray-15
  font-weight: $bold
  float: right
.btn-pending
  background-color: $color-yellow-3
  border-color: $color-yellow-3
  color: $color-orange-9
  float: right
.btn-processing_payment
  background-color: $color-orange-10
  color: $color-orange-7
  background-color: $color-orange-10
  float: right
.btn-authenticated_and_shipped
  color: $color-blue-16
  padding: 6px
  background: $color-blue-18
  float: right
.btn-delivered
  background-color: $color-blue-8
  color: $color-blue-17
  float: right
.btn-processing
  color: $color-orange-7
  font-size: 1.6rem
  font-weight: $bold
  float: right
.btn-auth_completed
  background-color: $color-blue-8
  border-color: none
  color: $color-blue-3
  font-weight: $bold
  float: right
.btn-pending
  background-color: $color-red-3
  border-color: $color-red-3
  float: right
.btn-received_at_deadstock
  color: $color-green-4
  padding: 10px
  background: $color-green-14
  float: right
.btn-auth_failed
  background-color: none
  color: $color-red-7
  font-size: 1.3rem
  font-weight: $bold
  float: right
.btn-shipped_to_ds
  background-color: $color-green-6
  color: $color-green-7
  float: right
.btn-ordered
  @include body-1-bold
  color: $color-green-7
  float: right
.btn-cancelled,
.btn-declined
  color: $color-red-3
  background: $color-red-11
  font-weight: $regular
  float: right
:deep(.giftcard-status)
  font-style: normal
  @include heading-9
  color: $color-green-20
  background: none
  float: right
/* Status indicator buttons */

/* media query */
@media (max-width: 360px)
  .purchase-card-wrapper
    width: 239px
    height: 366px
    .order-no
      font-size: 16px
      line-height: 20px
    .view-order
      float: left
      margin-top: 4px
    .date
      margin-top: 4px
    .product-img
      width: 66px
    .overlap-text
      top: 42%
      left: 60%
    .purchase-status-btn
      margin-top: 10px
      button,
      .giftcard-status
        float: right
@media (min-width:360px) and (max-width: 375px)
  .purchase-card-wrapper
    width: 294px
    height: 380px
    .product-img
      width: 84px
    .overlap-text
      top: 43%
      left: 65%
    .view-order
      float: left
      margin-top: 4px
    .date
      margin-top: 4px
    .purchase-status-btn
      margin-top: 10px
      button,
      .giftcard-status
        float: none
@media (min-width:376px) and (max-width: 425px)
  .purchase-card-wrapper
    width: 309px
    height: 380px
    .product-img
      width: 84px
    .order-no
      font-size: 17px
      line-height: 24px
    .overlap-text
      top: 40%
      left: 70%
    .view-order
      float: left
      margin-top: 4px
    .date
      margin-top: 4px
    .purchase-status-btn
      margin-top: 10px
      button,
      .giftcard-status
        float: none
@media (min-width: 426px) and (max-width: 555px)
  .purchase-card-wrapper
    width: 345px
    height: 370px
    margin: 0 auto
    .overlap-text
      top: 37%
      left: 68%
    .order-no
      @include body-5
    .view-order
      float: left
      margin-top: 4px
    .date
      margin-top: 4px
    :deep(.order-on-wrapper)
      margin-bottom: 0
    .product-img
      width: 100px
    .purchase-status-btn
      margin-top: 10px
      button,
      .giftcard-status
        float: none
      .status-button
        justify-content: center
        display: flex
@media (min-width: 556px) and (max-width: 767px)
  :deep(.purchase-details-col),
  :deep(.purchase-status-btn)
    width: 50%

@media (min-width: 1440px) and (max-width: 1524px)
  .purchase-card-wrapper
    width: 345px
    height: 370px
    margin: 0 auto
@media (min-width: 1280px)
  .purchase-card-wrapper
    width: 459.5px
/* media query ends */
.btn-cancelled
  color: #e00f0e
  background: #fdebeb
.btn-refunded
  color: #F4B53F
  background: #fff9f0
.btn-ship_to_deadstock
  color: #8136bd
  background: #f5effa
  padding: 10px
.btn-authentication_complete
  color: #4ac557
  background: #effaf4
  padding: 20px 4px
.btn-multiple
  color: #fff
  background: #000
.btn-voided
  color: #fff
  background: #000
.btn-cancel
  color: #DE0100
  background: rgba(222, 1, 0, 0.2)
</style>
