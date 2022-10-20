<template>
  <div class="purchase-summary">
    <div class="d-flex align-items-center justify-content-center">
      <Loader :loading="loading"/>
    </div>
    <div v-if="orderDetails">
      <div class="info-card d-flex flex-column">
        <div class="body-8-medium text-capitalize">
          {{ $t('vendor_purchase.order', {orderNo: orderDetails.id}) }} ({{ orderDetails.type.label }})
        </div>
        <div class="mt-1 body-5-regular date-text">
          {{ $t('vendor_purchase.ordered_on', {orderedDate: getOrderedDate}) }}
        </div>
        <Carousel
            ref="sizeCarousel"
            :center="true"
            :dots="true"
            :loop="false"
            :margin="20"
            :mouse-drag="false"
            :nav="true"
            :nav-text="['', '']"
            :responsive="{
            0: { items: 1, nav: false, center: true },
          }"
            class="carousel slide-fade position-relative size-carousel mt-20 body-21-normal"
            @changed="changeItem"
        >
          <template #default>
            <div
                v-for="(item, index) in orderDetails.items" :key="item.id"
                :data-position="index"
                :data-size="item.id"
            >
              <b-row class="">
                <b-col cols="4">
                  <ProductThumb :product="item.listing_item.inventory.product" width="82"/>
                </b-col>
                <b-col class="item-desc" cols="8">
                  <div v-if="item.listing_item.inventory.product.sku" class="text-nowrap text-truncate body-21-medium">
                    {{ item.listing_item.inventory.product.name }}
                  </div>
                  <div v-if="item.listing_item.inventory.product.sku" class="text-nowrap text-truncate">
                    <span class="color-gray">{{ $t('common.sku') }}: </span>{{
                      item.listing_item.inventory.product.sku
                    }}
                  </div>
                  <div v-if="item.listing_item.inventory.product.colorway" class="text-nowrap text-truncate">
                    <span class="color-gray">{{
                        $t('common.colorway')
                      }}:  </span>{{ item.listing_item.inventory.product.colorway }}
                  </div>
                  <div v-if="item.listing_item.inventory.product.colorway" class="text-nowrap text-truncate">
                    <span class="color-gray">{{
                        $tc('common.size', 2)
                      }}: </span>{{ item.listing_item.inventory.size.size }}
                  </div>
                  <div v-if="item.listing_item.inventory.product.sku" class="text-nowrap text-truncate">
                    <span class="color-gray">{{ $t('common.box_condition') }}: </span>
                    {{ item.listing_item.inventory.product.sku }}
                  </div>
                </b-col>
              </b-row>
            </div>
          </template>
        </Carousel>
        <div class="d-flex align-items-center justify-content-end body-5-medium">
          <span class="text-uppercase color-gray">{{ $t('selling_page.qty') }}</span>:
          &nbsp;<span>{{ orderDetails.items.length }}</span>
        </div>
        <div class="total-sec">
          <b-row class="align-items-center h-100">
            <b-col class="col-xs-offset-4 d-flex align-items-center justify-content-between body-5-medium" cols="8">
              <span class="ml-2">
                {{ $t('common.total') }}
              </span>
              <span class="color-primary total-amount">
                {{ orderDetails.total | toCurrency }}
              </span>
            </b-col>
          </b-row>
        </div>

        <div ref="map" class="map"></div>
        <div class="ship-info">
          <div class="body-8-medium text-capitalize">
            {{ $t('shipping.info') }}
          </div>
          <div class="mt-1 body-5-regular date-text">
            {{ $t('vendor_purchase.updated_on') }} {{ new Date(orderDetails.updated_at).toLocaleDateString() }}
          </div>
        </div>

        <ItemDivider/>

        <div v-if="selectedItem && selectedItem.status!=='processing'" class="tracking">
          <div><span>{{ $t('orders.shipping_carrier') }}:</span> <span>{{ shippingMethod }}</span></div>
          <div><span>{{ $t('orders.tracking_number') }}:</span> <a :href="trackingUrl" target="_blank">{{
              trackingNo
            }}</a></div>
        </div>

        <div>
          <TimelineIcon :status="'active'"/>
        </div>
        <div class="view-details d-flex align-items-center justify-content-between">
          <span class="title body-5-medium">
            {{ $t('vendor_purchase.view_shipping_details') }}
          </span>
          <arrow-down-black/>
        </div>
      </div>
    </div>
  </div>
</template>`

<script>
import Loader from '~/components/common/Loader';
import ProductThumb from '~/components/product/Thumb';
import {GOOGLE_MAPS_BASE_URL} from '~/static/constants';
import ItemDivider from '~/components/profile/notifications/ItemDivider';
import arrowDownBlack from '~/assets/img/icons/arrow-down-blue.svg?inline'
import TimelineIcon from '~/components/orders/TimelineIcon';

export default {
  name: 'ViewSummary',
  components: {TimelineIcon, ItemDivider, ProductThumb, Loader, arrowDownBlack},
  data() {
    return {
      orderDetails: null,
      loading: false,
      map: null,
      selectedItem: null
    }
  },
  computed: {
    getOrderedDate: (vm) => {
      const d = new Date(vm.orderDetails.created_at)
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    },
    trackingNo() {
      return this.selectedItem.vendor_shipment?.tracking_no
    },
    trackingUrl() {
      return this.selectedItem.vendor_shipment?.tracking_url
    },
    shippingMethod() {
      return this.selectedItem.vendor_shipment?.shipping_method_text
    },
  },
  mounted() {
    this.loadDetails()
    this.injectGoogleMapsApi()
  },
  methods: {
    changeItem(item) {
      this.selectedItem = this.orderDetails.items[item.item.index]
    },
    loadDetails() {
      this.loading = true
      this.$axios
          .get(`purchases/${this.$route.params.id}/details`)
          .then((res) => {
            console.log(res);
            this.orderDetails = res.data
            this.insertMap(this.orderDetails)
          })
          .catch((err) => {
            this.$toasted.error(this.$t(err.response.data.message).toString())
            this.$router.push('/profile/purchases')
          }).finally(() => {
        this.loading = false
      })
    },
    // Inject Google Maps Api (if it doesn't exist)
    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
      }
      return false
    },

    // Create a new script tag without the src attribute.
    createScriptTag() {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.async = true
      return scriptTag
    },
    // Insert a new script tag before the first found script tag.
    insertScript(scriptTag) {
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    },
    insertMap(order) {
      const options = {
        center: new window.google.maps.LatLng(
            order.shipping_address.latitude || 45.508,
            order.shipping_address.longitude || -73.587
        ),
      }
      this.$nextTick(() => {
        this.map = new window.google.maps.Map(this.$refs.map, options)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.purchase-summary
  background-color: $color-white-1
  padding: 16px 20px
  font-style: normal
  font-family: $font-family-sf-pro-display

  .info-card
    background: $color-white-1
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 10px
    padding: 22px 20px

    .view-details
      background: $color-white-1
      border: 1px solid $color-gray-84
      border-radius: 8px
      padding: 16px 20px

    .ship-info
      margin-top: 14px

    .total-sec
      background-color: $color-white-5
      margin-inline: -20px
      height: 41px

  .date-text
    letter-spacing: -0.005em
    color: $color-gray-77e9

  .map
    margin-inline: -20px
    height: 250px

  .mt-20
    margin-top: 20px

  .color-gray
    color: $color-gray-5

  .color-primary
    color: $color-blue-20

  .total-amount
    margin-right: 22px

  ::v-deep.divider
    border-top: 1px solid rgba($color-gray-23, 0.17)
    margin-inline: -17px
    margin-top: 8px
    margin-bottom: 18px

  ::v-deep.owl-theme
    .owl-nav.disabled + .owl-dots
      height: 10px
      margin-block: 5px

      .owl-dot
        margin-inline: 4px
        margin-block: 0

      .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span
        background-color: $color-black-1

      button
        span
          margin: 0
          height: 4px
          width: 4px
          background-color: $color-gray-4

</style>
