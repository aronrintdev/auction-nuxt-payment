<template>
  <div class="row mt-md-4 mt-2 vd-purchase-history">
    <div class="col-12 d-flex align-items-center justify-content-between   mt-md-4 mt-2">
      <span class="body-16-bold font-secondary">{{
          $t('vendor_purchase.purchase_summary')
        }}</span>
      <!-- Export to PDF -->
      <Button
        v-if="exportStatus.includes(purchaseStatus) || orderType === giftCard"
        variant="dark-blue"
        @click="exportToPDF(orderDetails.id)"
      >
        {{ $t('vendor_purchase.export_to_pdf') }}
      </Button>
      <!-- Export to PDF -->
    </div>
    <!-- Purchase Summary Details -->
    <div class="col-12 purchase-summary-details mt-3">
      <b-card class="shadow-none border card-web position-relative">
        <div class="d-flex justify-content-between mb-27">
          <!-- Order Id with type -->
          <div>
            <h5 class="body-15-bold font-secondary text-capitalize">
              {{
                $t('vendor_purchase.order', {orderNo: orderDetails.order_id})
              }}&nbsp;({{ orderType }})
            </h5>
          </div>
          <!-- ./Order Id with type -->
          <!-- Order Status -->
          <div class="order-bar">
            <div
              v-if="ORDERS_HAS_ITEMS.includes(orderType) && purchaseStatus !== multiple"
              :id="purchaseStatus.toLowerCase()"
            >
              <div>
                {{ orderDetails.status_label }}
              </div>
            </div>
            <div
              v-if="orderType === giftCard"
              :id="orderDetails.orderable.status.toLowerCase()"
              class="success-status d-flex align-items-center float-right"
            >
              <div class="p-3 text-uppercase">
                {{ $t(`vendor_purchase.orderstatus.${purchaseStatus}`) }}
              </div>
            </div>
          </div>
          <!-- ./Order Status -->
        </div>

        <div>
          <!-- Ordered on Date -->
          <div
            v-if="orderDetails.quantity === 1"
            class="body-12-medium font-secondary text-capitalize  mb-14"
          >
            {{
              $t('vendor_purchase.ordered_on', {
                orderedDate: $options.filters.formatDateTimeString(
                  orderDetails.created_at
                ),
              })
            }}
          </div>
          <span v-else class="text-bold text-capitalize"
          >{{ itemQuantity }}&nbsp;{{ $tc('common.item', 1) }}</span
          >
          <!-- Ordered on Date -->
          <span
            v-if="orderType !== giftCard && orderDetails.quantity === 1 && orderDetails.items.length>=1 && orderDetails.items[0].shipment"
            class="d-flex shipping-label"
          >
            {{ $t('vendor_purchase.shipping_carrier') }}&colon;
            {{
              orderDetails.items[0].shipment.shipping_method_text
            }}
          </span>
          <!-- ./Shipping Label -->
        </div>
        <!-- Shipping Address -->
        <b-card-text v-if="ORDERS_HAS_ITEMS.includes(orderType)" class="shipping-address mb-62">
          <div class="body-13-medium font-secondary">
            {{ $t('vendor_purchase.shipping_address') }}&colon;
            {{ shippingAddress }}
          </div>
          <span
            v-if="orderType !== giftCard && orderDetails.quantity === 1 && orderDetails.items.length>=1 && orderDetails.items[0].shipment"
            class="d-flex tracking-number"
          >
            {{ $t('vendor_purchase.tracking_no') }}&colon;
            <a v-if="orderDetails.items[0].shipment" :href="orderDetails.items[0].shipment.tracking_url"
               target="_blank" class="text-decoration-underline">{{ orderDetails.items[0].shipment.tracking_no }}</a>
          </span>
        </b-card-text>
        <!-- ./Shipping Address -->
        <!-- Details: Single Order-->
        <SingleOrderVue
          v-if=" ORDERS_HAS_ITEMS.includes(orderType)"
          :orderDetails="orderDetails.items"
          :fullOrderDetails='orderDetails'
          :fields="fields"
          :orderType="orderType"
          :itemCount="orderDetails.quantity"
          :timelineStatus="timelineStatus"
          :itemStatus="purchaseStatus"
          :updatedAt="orderDetails.updated_at"
        />

        <SingleOrderVue
          v-if="orderType === giftCard"
          :orderDetails="orderDetails.orderable"
          :fullOrderDetails='orderDetails'
          :fields="fields"
          :orderType="orderType"
          :itemCount="orderDetails.quantity"
          :timelineStatus="timelineStatus"
          :itemStatus="purchaseStatus"
          :updatedAt="orderDetails.updated_at"
        />
        <!-- ./Details:Single Order -->

        <!-- TODO: will implement Trade purchase is done. -->
        <TradeItem v-if="orderType === 'trade'" :orderDetails="orderDetails"/>
        <!-- Trade -->

        <!-- TODO: Implement when heat check is done -->
        <div v-if="orderType === 'heatcheck'" class="row float-right">
          <span class="text-decoration-underline">
            <nuxt-link v-if="orderType" to="#">{{
                $t('vendor_purchase.view_heatcheck')
              }}</nuxt-link></span
          >
        </div>

        <div
          v-if="ORDERS_HAS_ITEMS.includes(orderType) && isSingle"
          :class="{[purchaseBtnClass]: purchaseBtnClass}"
          class="m-auto body-13-normal font-secondary text-capitalize text-center status-badge position-absolute"
        >
          {{ $t(`vendor_purchase.orderstatus.${purchaseStatus.split(' ').join('_')}`) }}
        </div>
      </b-card>
      <!-- Details: Multiple Order -->
      <div v-if="orderDetails.quantity > 1" class="row">
        <div class="col-12">
          <h5 class="body-15-bold font-secondary">
            {{ $t('vendor_purchase.order_items') }}&colon;
          </h5>
        </div>
      </div>
      <template v-if="orderDetails.quantity > 1">
        <MultipleOrderVue
          v-for="(purchaseItems, indexVal) in orderDetails.items"
          :key="indexVal"
          :orderItems="purchaseItems"
          :orderDetails="orderDetails"
          :status="purchaseItems.status"
          :orderType="orderType"
          :updatedAt="orderDetails.updated_at"
        />
      </template>
      <!-- ./Details: Multiple Order -->
    </div>
    <!-- ./Purchase Summary Details -->
  </div>
</template>

<script>
import SingleOrderVue from './SingleOrder.vue'
import MultipleOrderVue from './MultipleOrder.vue'
import TradeItem from './TradeItem.vue'
import {
  ARRIVED_TO_DEADSTOCK,
  AUTHENTICATED_AND_SHIPPED,
  BUY,
  CANCELLED,
  DELIVERED,
  GIFTCARD,
  MONTHS,
  MULTIPLE,
  ORDERS_HAS_ITEMS,
  ORDERS_HAS_TYPES,
  PENDING,
  SELL,
  SEND_TO_DEADSTOCK,
  SHIPPED_AND_AUTH,
} from '~/static/constants'
import {Button} from '~/components/common'

export default {
  name: 'PurchaseSummary',

  components: {
    SingleOrderVue,
    MultipleOrderVue,
    Button,
    TradeItem,
  },

  props: {
    orderDetails: {
      type: Object,
      default: () => {
      },
      required: true,
    },
  },

  data() {
    return {
      ORDERS_HAS_ITEMS,
      ORDERS_HAS_TYPES,
      months: MONTHS,
      fields: [
        {
          key: 'products',
          label: this.$t('vendor_purchase.products'),
          tdClass: 'vd-img-col',
          thClass: 'body-12-medium font-primary font-secondary'
        },
        {
          key: 'details',
          label: this.$t('vendor_purchase.product_details'),
          thClass: 'body-12-medium font-secondary',
          tdClass: 'body-12-regular font-secondary',
        },
        {
          key: 'quantity',
          label: this.$t('vendor_purchase.quantity'),
          thClass: 'body-12-medium font-secondary',
          tdClass: 'body-12-regular font-secondary',
        },
        {
          key: 'total',
          label: this.$t('vendor_purchase.total'),
          thClass: 'body-12-medium font-secondary',
          tdClass: 'body-12-regular font-secondary',
        },
      ],
      // Export to PDF will only show when the order is
      exportStatus: [
        PENDING,
        SEND_TO_DEADSTOCK,
        ARRIVED_TO_DEADSTOCK,
        CANCELLED,
        SHIPPED_AND_AUTH,
        AUTHENTICATED_AND_SHIPPED,
        DELIVERED,
        MULTIPLE,
      ],
      pending: PENDING,
      sendToDeadstock: SEND_TO_DEADSTOCK,
      giftCard: GIFTCARD,
      sell: SELL,
      buy: BUY,
      multiple: MULTIPLE
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    shippingAddress: (vm) => {
      let address = ''
      // Get the shipping Address
      if (vm.orderDetails.shipping_address) {
        // Add the address_line_1 value to address variable.
        if (vm.orderDetails.shipping_address.address_line_1) {
          address += vm.orderDetails.shipping_address.address_line_1
        }
        // Add the address_line_2 value to address variable with a prefix comma.
        if (vm.orderDetails.shipping_address.address_line_2) {
          address += ', ' + vm.orderDetails.shipping_address.address_line_2
        }
        // Add the city value to address variable with a prefix comma.
        if (vm.orderDetails.shipping_address.city) {
          address += ', ' + vm.orderDetails.shipping_address.city
        }
        // Add the state value to address variable with a prefix comma.
        if (vm.orderDetails.shipping_address.state) {
          address += ', ' + vm.orderDetails.shipping_address.state
        }
        // Add the country value to address variable with a prefix comma.
        if (vm.orderDetails.shipping_address.country) {
          address += ', ' + vm.orderDetails.shipping_address.country
        }
      }
      return address
    },

    timelineStatus: (vm) => {
      if (vm.orderDetails.items[0].status_history && vm.orderDetails.quantity === 1) {
        return vm.orderDetails.items[0].status_history.map((status, index) => {
          return {
            id: status.id,
            status: status.status_label,
            description: status.status_label,
            value: status.status_key,
            class: (index + 1) === vm.orderDetails.items[0].status_history.length ? 'tracking-end' : ''
          }
        })
      }
    },

    // Item status
    orderType: (vm) => {
      return vm.orderDetails.type
    },
    // Item quantity
    itemQuantity: (vm) => {
      return vm.orderDetails.quantity
    },
    // Item quantity
    isSingle: (vm) => {
      return vm.orderDetails.quantity === 1
    },
    purchaseBtnClass: (vm) => {
      return (vm.orderDetails.items.length > 1) ? 'multiple' : vm.orderDetails.items[0].status;
    },
    purchaseStatus: (vm) => {
      if (vm.orderType === GIFTCARD) {
        return vm.orderDetails.orderable.status.toLowerCase().split(' ').join('_')
      }
      return vm.orderDetails.status.toLowerCase().split(' ').join('_')
    }
  },
  methods: {
    // Emit an export to PDF event
    exportToPDF(val) {
      this.$emit('exportPDF', val)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.status-badge
  top: 0
  right: 0
  width: 141px
  height: 61px
  display: flex
  align-items: center
  border-radius: 4px 10px 4px 4px
  padding: 21px 11px

  &.delivered
    background-color: $color-blue-8
    color: $color-blue-17

  &.processing
    color: $color-orange-7
    background-color: $color-orange-18

  &.auth_completed
    background-color: $color-blue-8
    color: $color-blue-3

  &.pending
    background-color: $color-red-3
    border-color: $color-red-3

  &.received_at_deadstock
    color: $color-green-4
    background: $color-green-14

  &.auth_failed, &.multiple
    color: $color-red-7
    font-size: 1.3rem

  &.shipped_to_ds
    background-color: $color-green-6
    color: $color-green-7

  &.ordered
    color: $color-green-7

  &.on_hold
    color: $color-gray-15

  &.send_to_ds
    background: $color-purple-8
    color: $color-purple-7

  &.arrived_to_ds
    color: $color-green-8
    background: $color-green-14

  &.awaiting_shipment
    color: $color-yellow-4

  &.awaiting_auth
    color: $color-red-2

  &.auth_issued
    background: $color-red-9
    color: $color-red-8

  &.shipped_to_buyer
    background: $color-grey-33
    color: $color-gray-15

  &.pending
    background-color: $color-yellow-3
    color: $color-orange-9

  &.processing_payment
    background-color: $color-orange-10
    color: $color-orange-7

  &.authenticated_and_shipped
    color: $color-blue-16
    background: $color-blue-18

  &.cancelled,
  &.declined
    color: $color-red-3
    background: $color-red-11

.mb-27
  margin-bottom: 27px

.mb-62
  margin-bottom: 62px

.mb-14
  margin-bottom: 14px

.success-status
  font-style: normal
  @include heading-9
  color: $color-green-20
  background: none
</style>
