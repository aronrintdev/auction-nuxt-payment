<template>
  <div>
    <b-card class="purchase-multiple-orders">
      <!-- Down arrow -->
      <span
        class="float-right"
        :class="{ rotatearrowimage: showDetails }"
        @click="toggleDetails"
      >
        <!-- Size -->
        <span v-if="!showDetails" class="text-bold"
          >
          {{ $t('vendor_purchase.size') }}&colon;
          {{ orderItems.listing_item.inventory.size.size }}
        </span>
        <!-- ./Size -->
        <img :src="downArrow" alt="down-arrow" />
      </span>
      <!-- ./Down arrow -->
      <!-- TODO: Shipping Carrier - Harcoded for now -->
      
      <div v-if="showDetails" class="row">
        <div class="col details-col">
          <div class="list-product-name text-bold">
            {{ orderItems.listing_item.inventory.product.name }}
          </div>
          <div class="ordered-on text-capitalize">
            {{ $t('vendor_purchase.ordered_on', {
              orderedDate: $options.filters.formatDateTimeString(
                orderDetails.created_at
              ),
              })
            }}
          </div>
        </div>
        <div class="col shipping-col">
          <div v-if="showDetails" class="shipping-carrier">
            {{ $t('vendor_purchase.shipping_carrier') }}&colon;
            {{ shippingLabel }}
          </div>
          <div class="tracking-number">
            {{ $t('vendor_purchase.tracking_no') }}&colon;
              <nuxt-link to="#" class="text-underline">{{
                trackingNumber
              }}</nuxt-link>
          </div>
        
        </div>
        <div class="col status-col">
          <div :id="orderItems.status">
            <div class="p-3">
              {{ $t(`vendor_purchase.orderstatus.${orderItems.status}`) }}
            </div>
          </div>
        </div>
      </div>
    
      <!-- ./Shipping Carrier -->
      <span v-if="!showDetails" class="img-wrapper text-bold">
        <img
          :src="
            orderItems.listing_item.inventory.product.image || fallbackImage
          "
          alt="product-img"
          class="product-img"
          @error="imageLoadError"
        />
        <span class="list-product-name" >{{
          orderItems.listing_item.inventory.product.name
        }}</span>
      </span>

      <template v-if="showDetails">
        <!-- Order Details -->
        <b-card-text class="order-details">
          <!--  -->
          <SingleOrderVue
            :orderDetails="[orderItems]"
            :fields="fields"
            :itemCount="orderDetails.listing_item_order.length"
            :timelineStatus="timelineStatus"
            :itemStatus="status.toLowerCase()"
            :updatedAt="updatedAt"
            :orderType="orderType"
          />
        </b-card-text>
        <!-- .Order Details -->
      </template>
    </b-card>
  </div>
</template>

<script>
import SingleOrderVue from './SingleOrder.vue'
import DownArrow from '~/assets/img/icons/down-arrow.svg'
import {
  ARRIVED_TO_DEADSTOCK,
  SEND_TO_DEADSTOCK,
  PENDING, PRODUCT_IMG_WIDTH,
  PROCESSING,
  PRODUCT_FALLBACK_URL
} from '~/static/constants'
export default {
  name: 'MultipleOrder',

  components: {
    SingleOrderVue,
  },

  props: {
    orderItems: {
      type: Object,
      default: () => {},
    },
    orderDetails: {
      type: Object,
      default: () => {},
    },
    status: {
      type: String,
      required: true,
    },

    updatedAt: {
      type: String,
      required: true,
    },

    orderType: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      downArrow: DownArrow,
      showDetails: false,
      shippingLabel: 'Fe dex',
      trackingNumber: 123456789,
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      fields: [
        {
          key: 'products',
          label: this.$t('vendor_purchase.products'),
          tdClass: 'vd-img-col',
        },
        { key: 'details', label: this.$t('vendor_purchase.product_details') },
        { key: 'quantity', label: this.$t('vendor_purchase.quantity') },
        { key: 'total', label: this.$t('vendor_purchase.total') },
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
          value: this.status.toLowerCase() === PENDING ? PENDING : PROCESSING,
          class: 'tracking-end',
        },
      ],
    }
  },

  computed: {
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
  },

  methods: {
    // Show/hide details info of order item
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallbackImgUrl + '' + this.productImageWidth
    },
  },
}
</script>

<style lang="sass" scoped>

@media (max-width: 426px)
  .tracking-number
    float: initial
  .shipping-carrier
    display: none

@media (min-width: 1920px)
  .status-col
    flex: 0 0 9%
    max-width: 9%
  .shipping-col
    flex: 0 0 19%
    max-width: 19%
@media (min-width: 1680px)
  .status-col
    flex: 0 0 11%
    max-width: 11%
  .shipping-col
    flex: 0 0 20%
    max-width: 20%
@media (min-width: 1600px)
  .status-col
    flex: 0 0 13%
    max-width: 13%
  .shipping-col
    flex: 0 0 20%
    max-width: 20%
@media (min-width: 1400px)
  .status-col
    flex: 0 0 15%
    max-width: 15%
  .shipping-col
    flex: 0 0 24%
    max-width: 24%
@media (min-width: 1368px)
  .status-col
    flex: 0 0 9%
    max-width: 9%
  .shipping-col
    flex: 0 0 24%
    max-width: 24%
@media (min-width: 1280px) and (max-width: 1367px)
  .status-col
    flex: 0 0 17%
    max-width: 17%
  .shipping-col
    flex: 0 0 30%
    max-width: 30%
@media (min-width: 1152px) and (max-width: 1279px)
  .status-col
    flex: 0 0 19%
    max-width: 19%
  .shipping-col
    flex: 0 0 30%
    max-width: 30%
@media (min-width: 1024px) and (max-width: 1151px)
  .details-col
    flex: 0 0 100%
    max-width: 100%
  .status-col
    flex: 0 0 25%
    max-width: 25%
  .shipping-col
    flex: 0 0 75%
    max-width: 75%
    margin-top: 10px
@media (min-width: 692px) and (max-width: 1023px)
  .details-col
    flex: 0 0 100%
    max-width: 100%
  .status-col
    flex: 0 0 25%
    max-width: 25%
  .shipping-col
    flex: 0 0 75%
    max-width: 75%
    margin-top: 10px
@media (min-width: 500px) and (max-width: 691px)
  .details-col
    flex: 0 0 100%
    max-width: 100%
  .status-col
    flex: 0 0 45%
    max-width: 45%
  .shipping-col
    flex: 0 0 100%
    max-width: 100%
    margin-top: 10px
@media (min-width: 320px) and (max-width: 499px)
  .details-col
    flex: 0 0 100%
    max-width: 100%
  .status-col
    flex: 0 0 100%
    max-width: 100%
  .shipping-col
    flex: 0 0 100%
    max-width: 100%
    margin-top: 10px
</style>
