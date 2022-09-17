<template>
  <div class="col-md-12 col-sm-12">
    <!-- Details -->
    <b-card>
      <div class="row">
        <div class="col-md-3">
          <div class="img-wrapper">
            <img
              :src="
                selectedItemDetails.listing_item.inventory.product.image ||
                fallbackImage
              "
              alt="product-image"
              class="img-fluid w-50"
              @error="imageLoadError"
            />
          </div>
        </div>
        <div class="col-md-9 col-sm-12">
          <h5 class="product-name">
            {{ selectedItemDetails.listing_item.inventory.product.name }}
          </h5>
          <p class="mb-0 tracking-number">
            {{ $t('vendor_purchase.tracking_no') }}&colon;
            <span class="text-decoration-underline text-primary">{{
              trackingNumber
            }}</span>
          </p>
          <p class="text-capitalize ordered_on mt-2">
            {{
              $t('vendor_purchase.ordered_on', {
                orderedDate: $options.filters.formatDateTimeString(orderedOn),
              })
            }}
          </p>
        </div>
      </div>
      <!-- ./Details -->
      <div class="row">
        <!-- TODO: Updating table with status of each item -->
        <b-table-simple responsive borderless>
          <b-thead>
            <b-tr>
              <b-th
                v-for="(head, index) in fields"
                :key="index"
                class="text-center"
                >{{ head.label }}</b-th
              >
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr class="text-center">
              <b-td class="date-time">
                <p class="text-bold mb-0">
                  {{ orderedOn | formatDate }}
                </p>
                <span>{{ getTime(new Date(orderedOn)) }}</span>
              </b-td>
              <b-td>
                <p class="text-bold mb-0">
                  {{ $t(`vendor_purchase.orderstatus.${status}`) }}
                </p>
                <span>{{ demoDescription }}</span>
              </b-td>
              <b-td>
                <div>
                  {{ demoLocation }}
                </div>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>
      <!-- ./Table -->
    </b-card>
  </div>
</template>

<script>
import {MONTHS, PRODUCT_IMG_WIDTH, PRODUCT_FALLBACK_URL} from '~/static/constants'
export default {
  name: 'VendorPurchaseTrackingHistory',

  props: {
    selectedItemDetails: {
      type: Object,
      required: true,
    },
    orderedOn: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      productImageWidth: PRODUCT_IMG_WIDTH,
      months: MONTHS,
      items: [],
      trackingNumber: 'Z1234567890', // TODO: Hardcoded for now
      fields: [
        { key: 'datevalue', label: 'Date/ Time' },
        { key: 'activity', label: 'Activity' },
        { key: 'location', label: 'Location' },
      ],
      demoDescription: 'In Transit', // TODO: Harcoded for now
      demoLocation: 'San Francisco, CA', // TODO: Harcoded for now
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
    }
  },

  computed: {
    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
  },

  methods: {
    getTime(val) {
      return val.getHours() + ':' + val.getMinutes() + ':' + val.getSeconds()
    },

    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallbackImgUrl + '' + this.productImageWidth
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/variables'
@media (max-width: 426px)
  .tracking-number,
  .ordered_on
    @include body-5
</style>
