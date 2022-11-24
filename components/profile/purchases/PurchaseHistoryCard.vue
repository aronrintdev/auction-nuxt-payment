<template>
  <b-card
      v-if="orderType !== giftCard && totalQuantity > 0 && purchaseStatus !== ''"
      class="purchase-card-wrapper card p-2 m-0"
  >
    <b-card-title>
      <!-- Order Number -->
      <span class="body-12-bold font-secondary text-capitalize mb-5">
        {{ $t('vendor_purchase.order_no', {orderNo: purchase.order_id}) }}
        &#40;{{ purchaseLabel(purchase.type.label) }}&#41;
      </span>
      <!-- ./Order Number -->
      <!-- View Order -->
      <span
          class="view-order font-secondary d-flex align-items-center color-link"
          role="button"
          @click="viewOrder"
      >{{ $t('vendor_purchase.view_order') }}</span
      >
      <!-- ./View Order -->
    </b-card-title>

    <!-- Ordered Date -->
    <b-card-text class="order-on-wrapper">
      <span
          class="body-13-medium font-secondary mt-6 text-capitalize d-flex align-items-center"
      >
        {{ $t('vendor_purchase.ordered_on', {orderedDate: getOrderedDate}) }}
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
            <div
                :class="indexKey === 2 && balanceImage >= 1 && 'bg-blur'"
                class="image-wrapper"
            >
              <b-img
                  :src="item.product.image || fallbackImage"
                  class="product-img"
              />
              <p
                  v-if="indexKey === 2 && balanceImage >= 1"
                  class="overlap-text"
              >
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
        <b-col class="purchase-details-col body-5-normal font-secondary" md="6">
          <div>
            {{ $t('vendor_purchase.quantity') }}&colon;
            {{ totalQuantity }}
          </div>
          <div class="mt-6">
            {{ $t('vendor_purchase.order_total') }}&colon;
            {{ purchase.total | toCurrency('USD', 'N/A') }}
          </div>
        </b-col>
        <b-col md="6" class="purchase-status-btn">
          <!-- Status Button -->
          <Button
              v-if="ORDERS_HAS_ITEMS.includes(orderType)"
              :class="{ [purchaseBtnClass]: purchaseBtnClass }"
              :variant="purchaseStatus"
              class="m-auto body-13-normal font-secondary text-capitalize text-center status-button d-flex"
          >
            {{
              $t(
                  `vendor_purchase.orderstatus.${purchaseStatus
                      .split(' ')
                      .join('_')}`
              )
            }}
          </Button>
          <div
            v-if="orderType === giftCard"
            :class="`${purchaseStatus}-status text-uppercase d-flex giftcard-status`"
          >
            {{
              $t(
                  `vendor_purchase.orderstatus.${purchaseStatus
                      .split(' ')
                      .join('_')}`
              )
            }}
          </div>
        </b-col>
      </b-row>
    </b-card-text>
    <!--  -->
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
  SELL,
  ORDERS_HAS_ITEMS,
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
      ORDERS_HAS_ITEMS,
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
    // Status Class
    purchaseBtnClass: (vm) => {
      return vm.purchase.items.length > 1
          ? 'item-status-multiple'
          : 'item-status-' + vm.purchase.items[0].status
    },
  },

  methods: {
    purchaseLabel(label) {
      return label === BUY ? this.$t('common.shop') : label
    },
    // On click view order
    viewOrder() {
      this.$router.push(`/profile/purchases/summary/${this.purchase.id}`)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.color-link
  color: $color-blue-1

.mt-6
  margin-top: 6px

.purchase-details-col
  align-self: flex-end
.status-button.item-status-pending
  background: $orange-btn-bg !important
  color: $color-orange-1 !important
.status-button.item-status-shipped_to_ds,
.status-button.item-status-shipped_to_deadstock,
.status-button.item-status-ship_to_deadstock
  background: $purple-btn-bg !important
  color: $color-purple-7 !important
.status-button.item-status-cancelled,
.status-button.item-status-cancel,
.status-button.item-status-voided,
.status-button.item-status-refunded
  background: $red-btn-bg !important
  color: $color-red-3 !important
.status-button.item-status-processing_payment
  background: $yellow-btn-bg !important
  color: $color-orange-22 !important
.status-button.item-status-authenticated_and_shipped
  background: $purple-btn-bg !important
  color: $color-purple-7 !important
.status-button.item-status-arrived_at_ds
  background: $green-btn-bg !important
  color: $color-green-3 !important
.status-button.item-status-delivered
  background: $blue-btn-bg !important
  color: $color-blue-17 !important
button.status-button,
.status-button.item-status-multiple,
.status-button.item-status-authentication_complete,
.status-button.item-status-arrived_at_deadstock
  background: $green-btn-bg !important
  color: $color-green-3 !important
.font-size14
  font-size: 14px
button.status-button
  width: 141px
  height: 57px !important
  background: $green-btn-bg !important
  color: $color-green-3 !important
  text-overflow: ellipsis
  overflow: hidden
  margin: 0 !important
  float: right
  font-weight: normal
  border: none
  box-shadow: none

::v-deep.purchase-card-wrapper
  width: 455px

  &.card
    background: $color-white-1
    border: 1px solid $color-gray-60
    border-radius: 10px
    box-shadow: none

.order-no
  font-style: normal
  font-weight: $medium
  @include body-3
  align-items: center
  color: $color-black-1
.date
  @include body-5-medium
  font-style: normal
  color: $color-black-1
  font-weight: $normal
  line-height: 25px
.view-order
  @include body-5-medium
  font-style: normal
  align-items: center
  text-decoration-line: underline
  float: right
  font-weight: $normal
.card-body
  display: flex
  flex-direction: column
  padding: 1rem 1.25rem
.product-img
  width: 113px
  height: 100%
.order-images
  .row
    margin:0
.overlap-text
  @include heading-2
  z-index: 9
  position: absolute
  text-align: center
  top: 33%
  left: 0
  width: 100%
  margin: 0
.bg-blur
  background: $color-gray-68
  position: relative
.image-wrapper.bg-blur::after
  content: ""
  background: $image-overlay
  top: 0
  left: 0
  width: 100%
  height: 100%
  position: absolute
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
.order-images .row div .image-wrapper
  width: 100%
  text-align: center
  background: transparent
.order-images .row div
  width: 33%
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

@media (min-width: 1280px) and (max-width: 1524px)
  .purchase-card-wrapper
    width: 500px
    margin: 0
/* media query ends */
</style>
