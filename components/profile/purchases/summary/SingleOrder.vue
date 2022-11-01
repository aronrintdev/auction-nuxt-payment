<template>
  <div class="container-fluid">
    <div class="row w-100">
      <div class="col-md-8 col-sm-12">
        <!-- Table -->
        <b-table v-if="ORDERS_HAS_ITEMS.includes(orderType)" :fields="fields" :items="orderDetails" borderless
                 class="vendor-purchase-details-table" responsive="sm">
          <template #cell(products)="row">
            <div class="img-col w-100">
              <img :src="row.item.inventory.product | getProductImageUrl" alt="product-image"
                   class="product-image img-fluid" @error="imageLoadError"/>
            </div>
          </template>
          <template #cell(details)="row">
            <span>
              <p class="f-w-500 mb-0 name">
                {{ row.item.inventory.product.name }}
              </p>
              <p class="f-w-500 mb-0 colorway">
                {{ $t('vendor_purchase.colorway') }}&colon; {{row.item.inventory.product.colorway}}
              </p>
              <p class="f-w-500 mb-0 size">
                {{ $t('vendor_purchase.size') }}&colon; {{row.item.inventory.size.size}}
              </p>
              <p class="f-w-500 mb-0 box-condition">
                {{ $t('vendor_purchase.box_condition') }}&colon; {{row.item.inventory.packaging_condition.name}}
              </p>
              <p class="f-w-500 mb-0 sku">
                {{ $t('vendor_purchase.sku') }}&colon; {{row.item.inventory.product.sku}}
              </p>
            </span>
          </template>
          <template #cell(quantity)="row">
            <span>{{ row.item.quantity }}</span>
          </template>
          <template #cell(total)="row">
            <span>{{ row.item.inventory.sale_price | toCurrency('USD', 'N/A') }}</span>
          </template>
        </b-table>

        <b-table-simple v-if="orderType === giftCard" responsive borderless  role="table" aria-busy="false" aria-colcount="4" class="table b-table table-borderless table-responsive">
          <b-thead role="rowgroup">
            <b-tr role="row">
              <b-th role="columnheader" scope="col" aria-colindex="1">
                <div>{{ $t('vendor_purchase.product') }}</div>
              </b-th>
              <b-th role="columnheader" scope="col">
                <div>{{ $t('vendor_purchase.product_details') }}</div>
              </b-th>
              <b-th role="columnheader" scope="col">
                <div>{{ $t('vendor_purchase.quantity') }}</div>
              </b-th>
              <b-th role="columnheader" scope="col">
                <div>{{ $t('vendor_purchase.total') }}</div>
              </b-th>
            </b-tr>
          </b-thead>
          <b-tbody role="rowgroup">
            <b-tr role="row">
              <b-td role="cell" class="vd-giftcardimg">
                <div class="img-col w-100">
                  <img :src="require(`~/assets/img/preferences/giftcard/${orderDetails.user_gift_card.card.image_name}`)" alt="product-image" class="product-image img-fluid">
                </div>
              </b-td>
              <b-td role="cell">
                <span>
                  <p class="f-w-500 mb-0 name">{{ $t('vendor_purchase.gift_card.deadstock_giftcard') }}</p>
                  <p class="f-w-500 mb-0 card_no">{{ $t('vendor_purchase.gift_card.giftcard_no') }}&colon; {{ orderDetails.user_gift_card.giftcard_number }}</p>
                  <p class="f-w-500 mb-0 colorway">{{ $t('vendor_purchase.gift_card.recipient') }}&colon; {{ orderDetails.user_gift_card.to }}</p>
                  <p class="f-w-500 mb-0 size">{{ $t('vendor_purchase.gift_card.message') }}&colon; {{ orderDetails.user_gift_card.message }}</p>
                  <p class="f-w-500 mb-0 box-condition">{{ $t('vendor_purchase.gift_card.remaining_balance') }}&colon; {{ orderDetails.user_gift_card.remaining_amount | toCurrency('USD', 'N/A') }}</p>
                </span>
              </b-td>
              <b-td role="cell">
                <span>{{ itemCount }}</span>
              </b-td>
              <b-td role="cell">
                <span>{{ orderDetails.user_gift_card.giftcard_amount | toCurrency('USD', 'N/A') }}</span>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
        <!-- ./Table -->
      </div>
      <!-- Timeline -->

      <div class="col-md-4 col-sm-12">
        <PurchaseTimeline
          :timeline="timelineStatus"
          :orderStatus="itemStatus"
          :updatedAt="updatedAt"
        />
      </div>
      <!-- Timeline -->
    </div>
    <!-- Status is authenticated and shipped/ delivered -->
    <template
        v-if="ORDERS_HAS_ITEMS.includes(orderType) && itemStatus === authenticatedAndShipped || itemStatus === delivered">
      <hr/>
      <div class="row shipping-details-wrapper">
        <div class="col-md-6 col-sm-12">
          <p class="text-bold shipping-carrier">
            {{ $t('vendor_purchase.shipping_carrier') }}&colon;
            {{ shippingCarrier }}
          </p>
          <!-- TODO: Harcoded for now -->
          <p class="tracking_no">
            <span class="text-bold">
              {{ $t('vendor_purchase.tracking_no') }}&colon;
            </span>
            <span class="text-decoration-underline text-primary"> {{fullOrderDetails.items[0].shipment.tracking_no}}</span>
          </p>
          <!-- TODO: Harcoded for now -->
          <!--  Timeline -->
          <div class="timeline-wrapper">
            <PurchaseTimeline
              :timeline="authTimelineStatus"
              :orderStatus="itemStatus.toLowerCase()"
            />
          </div>
          <!-- Timeline -->
        </div>
        <div class="col-md-6 col-sm-12">
          <p>
            <span class="text-bold mr-3">{{
              $t('vendor_purchase.tracking')
            }}</span>
            <span
              class="text-decoration-underline text-primary"
              role="button"
              @click="viewShippingDetails"
              >{{ $t('vendor_purchase.view_details') }}</span
            >
          </p>
          <p class="text-capitalize">
            <span class="updated-on">{{
              $t('vendor_purchase.updated_on')
            }}</span
            >{{ updatedAt | formatDateTimeString }}
          </p>
          <!-- location marker -->
          <div v-if='loadMap===true' class="location-tracking-wrapper">
            <!-- TODO: Harcoded latitude and longitude for now -->
            <GoogleMap
              :latitude="latitude"
              :longitude="longitude"
              :className="`w-100 gmap-height`"
            />
            <!-- ./TODO -->
          </div>
          <!-- location marker -->
        </div>
      </div>
    </template>
    <!-- ./Status is authenticated and shipped/ delivered -->
    <!-- TODO: Harcoded for now. Single item refund in mult item list -->
    <template v-if="itemCount > 1 && itemStatus === cancelled">
      <hr />
      <div class="row">
        <div class="col-md-12">
          <h5 class="transaction-heading text-capitalize text-bold">
            {{ $t('vendor_purchase.transaction_id') }}
            {{ transactionCancelled }}
          </h5>
          <!-- TODO: Single item transaction id: Harcoded now. -->
          <p class="text-capitalize">
            {{ $t('vendor_purchase.refunded_on') }} {{ refundedOn }}
          </p>
          <!-- TODO: Single item refund - Harcoded for now -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 offset-4">
          <div class="payment-summary-details-subheading text-muted text-bold">
            {{ $t('vendor_purchase.payment_method') }}
          </div>
          <div class="payment-summary-details-description">
            <img
              :src="require(`~/assets/img/purchases/visa-logo.svg`)"
              alt="demo-visa"
              class="w-25"
            />
            {{ $t('vendor_purchase.paymentvia') }}
            {{ demoCardNumber }}
          </div>
        </div>
        <div class="col-md-4">
          <div class="payment-summary-details-subheading text-muted text-bold">
            {{ $t('vendor_purchase.refund_total') }}
          </div>
          <div class="refund-amount-total">
            <!-- TODO: Hardcoded for now -->
            $150
          </div>
        </div>
      </div>
    </template>
    <!-- ./TODO: Harcoded for now. Single item refund in mult item list -->
  </div>
</template>

<script>
/* eslint-disabel no-console */
import PurchaseTimeline from './Timeline.vue'
import GoogleMap from '~/components/common/GoogleMap.vue'
import {
  PENDING,
  PROCESSING,
  SEND_TO_DEADSTOCK,
  ARRIVED_TO_DEADSTOCK,
  AUTHENTICATED_AND_SHIPPED,
  PROCESSING_PAYMENT,
  DELIVERED,
  CANCELLED, PRODUCT_IMG_WIDTH,
  PRODUCT_FALLBACK_URL,
  BUY,
  GIFTCARD,
  SELL,
  ORDERS_HAS_ITEMS,
  ORDERS_HAS_TYPES
} from '~/static/constants'
export default {
  name: 'SingleOrder',
  components: {
    PurchaseTimeline,
    GoogleMap,
  },
  props: {
    orderDetails: {
      type: [Object, Array],
      default: () => {},
    },
    fullOrderDetails: {
      type: [Object, Array],
      default: () => {},
    },
    fields: {
      type: Array,
      required: true,
    },
    timelineStatus: {
      type: Array,
      required: true,
    },
    itemCount: {
      type: Number,
      default: 0,
    },
    itemStatus: {
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
      ORDERS_HAS_ITEMS,
      ORDERS_HAS_TYPES,
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      shippingCarrier: null, // Harcoded for now
      trackingNumber: null, // Harcoded for now,
      transactionCancelled: null, // Harcoded for now: Single item transction id,
      refundedOn: null, // Harcoded for now since no single item refund currently
      demoCardNumber: null,
      latitude: 38.8951, // TODO: Hardcoded for now - latitude for google map location marker
      longitude: -77.0364, // TODO: Hardcoded for now - longitude for google map location marker
      authTimelineStatus: [],
      pending: PENDING,
      sendToDeadstock: SEND_TO_DEADSTOCK,
      arrivedToDeadstock: ARRIVED_TO_DEADSTOCK,
      processingPayment: PROCESSING_PAYMENT,
      authenticatedAndShipped: AUTHENTICATED_AND_SHIPPED,
      delivered: DELIVERED,
      processing: PROCESSING,
      cancelled: CANCELLED,
      buy: BUY,
      sell: SELL,
      giftCard: GIFTCARD,
      trackingDetails : [],
      lastUpdate: '',
      loadMap: false
    }
  },

  computed: {
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
  },
  mounted() {
    if (this.fullOrderDetails?.items[0].shipment) {
      this.getShippingDetails(this.fullOrderDetails.items[0].shipment.tracking_no)
    }
  },
  methods: {
    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallbackImgUrl + '' + this.productImageWidth
    },
    // View the shipping details page
    viewShippingDetails() {
      this.$root.$emit('viewShippingDetails', true)
    },
    getShippingDetails(trackingNo) {
      this.$axios
        .get(`tracking/${trackingNo}`)
        .then((res) => {
          this.trackingDetails = res.data.data
          this.trackingDetails.forEach((item,index) => {
            if(index === 0){
              this.lastUpdate = (item.GMTDate+' '+item.GMTTime).toString()
              this.getLatitudeAndLongitude(item.ActivityLocation.Address)
            }
            const row = {
                          id: index,
                          status: item.Status.StatusType.Description,
                          description: item.ActivityLocation.Description,
                          value: item.Status.StatusType.Description,
                          class: 'status',
                          date: item.GMTDate+' '+item.GMTTime
                        }
            this.authTimelineStatus.push(row)
          })
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.message))
        })
    },
    getLatitudeAndLongitude(row){
      const geocoder = new window.google.maps.Geocoder()
      const that = this
      geocoder.geocode(
          {
            componentRestrictions: {
              country: row.CountryCode
            }
          }, function (results) {
            that.latitude = results[0].geometry.location.lat();
            that.longitude = results[0].geometry.location.lng();
            that.loadMap = true
          });
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 426px)
  .vendor-purchase-details-table
    .name, .sku, .colorway, .size, .box-condition
      margin-top: 0.5rem
      @include body-9
:deep(.vd-giftcardimg)
  width: 20%
</style>
