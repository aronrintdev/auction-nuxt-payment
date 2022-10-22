<template>
  <div class="row mt-md-4 mt-2 vd-purchase-history">
    <div class="col-12 purchase-history-heading mt-md-4 mt-2">
      <span class="purchase-heading">{{
          $t('vendor_purchase.purchase_summary')
        }}</span>
      <!-- Export to PDF -->
      <Button
        v-if="exportStatus.includes(orderDetails.status) || orderType === giftCard"
        variant="export-to-pdf"
        class="text-white export-to-pdf"
        @click="exportToPDF(orderDetails.id)"
      >
        {{ $t('vendor_purchase.export_to_pdf') }}
      </Button>
      <!-- Export to PDF -->
    </div>
    <!-- Purchase Summary Details -->
    <div class="col-12 purchase-summary-details mt-3">
      <b-card class="shadow-none border">
        <div class="d-flex justify-content-between">
          <!-- Order Id with type -->
          <div>
            <h5 class="text-bold text-capitalize">
              {{
                $t('vendor_purchase.order', {orderNo: orderDetails.order_id})
              }}&nbsp;({{ orderType }})
            </h5>
          </div>
          <!-- ./Order Id with type -->
          <!-- Order Status -->
          <div class="order-bar">
            <div
              v-if="orderType === buy || orderType === sell && orderDetails.status !== multiple"
              :id="orderDetails.status.toLowerCase()"
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
                {{$t(`vendor_purchase.orderstatus.${orderDetails.orderable.status.toLowerCase().split(' ').join('_')}`)}}
              </div>
            </div>
          </div>
          <!-- ./Order Status -->
        </div>
        <b-card-text class="order-on">
          <!-- Ordered on Date -->
          <span
            v-if="orderDetails.quantity === 1"
            class="text-bold text-capitalize ordered-on-date"
          >
            {{
              $t('vendor_purchase.ordered_on', {
                orderedDate: $options.filters.formatDateTimeString(
                  orderDetails.created_at
                ),
              })
            }}
          </span>
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
        </b-card-text>
        <!-- Shipping Address -->
        <b-card-text v-if="orderType === buy || orderType === sell" class="shipping-address">
          <span class="shipping-address-description">
            {{ $t('vendor_purchase.shipping_address') }}&colon;
            {{ shippingAddress }}
          </span>
          <span
            v-if="orderType !== giftCard && orderDetails.quantity === 1 && orderDetails.items.length>=1 && orderDetails.items[0].shipment"
            class="d-flex tracking-number"
          >
            {{ $t('vendor_purchase.tracking_no') }}&colon;
            <a :href="orderDetails.items[0].shipment.tracking_url"
               target="_blank" class="text-decoration-underline">{{ orderDetails.items[0].shipment.tracking_no }}</a>
          </span>
        </b-card-text>
        <!-- ./Shipping Address -->
        <!-- Details: Single Order-->
        <SingleOrderVue
          v-if="orderDetails.quantity === 1 && orderType === buy || orderType === sell"
          :orderDetails="orderDetails.listing_item_order"
          :fullOrderDetails='orderDetails'
          :fields="fields"
          :orderType="orderType"
          :itemCount="orderDetails.quantity"
          :timelineStatus="timelineStatus"
          :itemStatus="orderDetails.status.toLowerCase()"
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
          :itemStatus="orderDetails.status.toLowerCase()"
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
      </b-card>
      <!-- Details: Multiple Order -->
      <div v-if="orderDetails.quantity > 1" class="row">
        <div class="col-12">
          <h5 class="text-bold">
            {{ $t('vendor_purchase.order_items') }}&colon;
          </h5>
        </div>
      </div>
      <template v-if="orderDetails.quantity > 1">
        <MultipleOrderVue
          v-for="(purchaseItems, indexVal) in orderDetails.listing_item_order"
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
  PENDING,
  PROCESSING,
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
      months: MONTHS,
      fields: [
        {
          key: 'products',
          label: this.$t('vendor_purchase.products'),
          tdClass: 'vd-img-col',
        },
        {key: 'details', label: this.$t('vendor_purchase.product_details')},
        {key: 'quantity', label: this.$t('vendor_purchase.quantity')},
        {key: 'total', label: this.$t('vendor_purchase.total')},
      ],
      timelineStatus: [
        {
          id: 1,
          status: this.$t('vendor_purchase.arrived_at_ds'),
          description: this.$t('vendor_purchase.package_arrived'),
          value: ARRIVED_TO_DEADSTOCK,
          class: 'start',
        },
        {
          id: 2,
          status: this.$t('vendor_purchase.send_to_ds'),
          description: this.$t('vendor_purchase.package_send_to_deadstock'),
          value: SEND_TO_DEADSTOCK,
          class: 'status',
        },
        {
          id: 3,

          status: this.$t('vendor_purchase.orderstatus.pending'),
          description: this.$t('vendor_purchase.awaiting_shipment'),
          value:
            this.orderDetails.status.toLowerCase() === PROCESSING
              ? PROCESSING
              : PENDING,
          class: 'tracking-end',
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

    // Item status
    orderType: (vm) => {
      return vm.orderDetails.type.label
    },
    // Item quantity
    itemQuantity: (vm) => {
      return vm.orderDetails.quantity
    },
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
.success-status
  font-style: normal
  @include heading-9
  color: $color-green-20
  background: none
</style>
