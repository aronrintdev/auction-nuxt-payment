<template>
  <div class="row mb-bb mt-md-4 mt-2">
    <div class="col-md-12 col-lg-12 vendor-dashboard-body px-5 py-5">
      <!-- Row -->
      <div class="row vd-purchase-css mt-md-4 mt-2">
        <!-- Heading -->
        <div class="col-12 purchase-heading">
          {{ $t('vendor_purchase.shipping_details') }}
        </div>
        <!-- ./Heading -->
      </div>
      <!-- ./Row -->
      <div class="row mt-md-4 mt-2">
        <!-- Delivery Address -->
        <div class="col-12">
          <p class="text-muted text-bold">
            {{ $t('vendor_purchase.delivery_address') }}
          </p>
          <div class="delivery-address-section">
            <p class="text-bold">
              {{ $t('vendor_purchase.shipping_address') }}&colon;
              <span v-if="shippingAddress.address_line_1"
                >{{ shippingAddress.address_line_1 }}&#x2c;</span
              ><br />
              <span v-if="shippingAddress.address_line_2"
                >{{ shippingAddress.address_line_2 }}&#x2c;</span
              >
              <span v-if="shippingAddress.city"
                >{{ shippingAddress.city }}&#x2c;</span
              >
              <span v-if="shippingAddress.state"
                >{{ shippingAddress.state }}&#x2c;</span
              >
              <span v-if="shippingAddress.country">{{
                shippingAddress.country
              }}</span>
            </p>
          </div>
        </div>
        <!-- ./Delivery Address -->
      </div>
      <div class="row mt-md-4 mt-2">
        <!-- Items -->
        <div class="col-md-5 col-sm-12 shipping-items-col h-100">
          <template v-if="orderItems">
            <VendorPurchaseShippingItems
              v-for="(items, index) in orderDetails.listing_item_order"
              :key="index"
              :items="items"
              :activeItem="selectedItemDetails.id"
              :updatedAt="orderDetails.updated_at"
              :status="orderDetails.status.toLowerCase()"
              @selectedItem="selectedItem"
            />
          </template>
        </div>
        <!-- ./Items -->
        <!-- TODO: Location marker -->
        <div
          v-if="selectedItemDetails.status !== arrivedToDeastock"
          class="col-md-7 col-sm-12 location-marker-col"
        >
          <div class="location-map">
            <!-- TODO: Harcoded latitude and longitude for now -->
            <GoogleMap
              :latitude="latitude"
              :longitude="longitude"
              :className="`w-100 gmap-height`"
            />
            <!-- ./TODO -->
          </div>
        </div>
        <!-- ./Location marker -->
      </div>
      <!-- Tracking History -->
      <div
        v-if="selectedItemDetails.id"
        class="row vd-purchase-css mt-md-4 mt-5"
      >
        <!-- Heading -->
        <div class="col-12 purchase-heading">
          {{ $t('vendor_purchase.tracking_history') }}
        </div>
        <!-- ./Heading -->
      </div>

      <div v-if="selectedItemDetails.id" class="row mt-md-4 mt-2">
        <div class="col-md-12">
          <VendorPurchaseTrackingHistory
            :selectedItemDetails="selectedItemDetails"
            :orderedOn="orderDetails.created_at"
            :status="orderDetails.status.toLowerCase()"
          />
        </div>
      </div>
      <!-- ./Tracking History -->
      <div class="row my-4" @click="viewPurchase">
        <b-button variant="purchase rounded-pill">
          {{ $t('vendor_purchase.back_to_purchases') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import VendorPurchaseShippingItems from './Items.vue'
import VendorPurchaseTrackingHistory from './TrackingHistory.vue'
import GoogleMap from '~/components/common/GoogleMap.vue'
import { ARRIVED_TO_DEADSTOCK } from '~/static/constants'
export default {
  name: 'VendorPurchaseShippingDetails',

  components: {
    VendorPurchaseShippingItems,
    VendorPurchaseTrackingHistory,
    GoogleMap,
  },

  props: {
    orderDetails: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      shippingAddress: this.orderDetails.shipping_address,
      orderItems: this.orderDetails.listing_item_order,
      selectedItemDetails: {},
      latitude: 45.508, // TODO: Hardcoded for now - latitude for google map location marker
      longitude: -73.587, // TODO: Hardcoded for now - longitude for google map location marker
      arrivedToDeastock: ARRIVED_TO_DEADSTOCK,
    }
  },
  methods: {
    // Selected item in shipping details
    selectedItem(val) {
      if (this.selectedItemDetails === val) {
        this.selectedItemDetails = {}
        return
      }
      this.selectedItemDetails = val
    },
    // View Purchase Details
    viewPurchase() {
      this.$root.$emit('viewShippingDetails', false)
    },
  },
}
</script>