<template>
    <b-row
      v-if="inventory.product"
      :class="{'border shadow-sm' : isMobileSize}"
      class="mt-3 text-center mx-0 ml-md-n1 font-weight-bold w-100 bg-white single-item"
      role="button"
      @click="$emit('click')"
    >
      <b-col sm="12" md="5" class="text-left">
        <b-row>
          <b-col cols="4" md="4">
            <ProductThumb :product="inventory.product" />
            <div v-if="!isMobileSize" class="auction-id text-decoration-underline text-center mt-1 sf-pro-display body-5-medium">
              {{ $t('bids.auction_id') }}: {{ auction.id }}
            </div>
          </b-col>
          <b-col cols="8" md="8" class="pl-4 d-flex align-items-center">
            <b-row class="d-block" :class="{ 'flex-grow-1' : isMobileSize }">
              <div class="body-4-bold sf-pro-display mb-1 mb-md-2">
                <span :class="isMobileSize ? 'body-5-medium': 'body-8-medium'">{{ inventory.product.name }}</span>
              </div>
              <div class="mb-1 mb-md-2 text-gray-6 text-uppercase sf-pro-display" :class="isMobileSize ? 'body-6-normal' : 'body-21-normal'">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ inventory.product.sku }}
              </div>
              <div class="mb-1 mb-md-2 text-gray-6 sf-pro-display" :class="isMobileSize ? 'body-6-normal' : 'body-21-normal'">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ inventory.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{inventory.size.size }}
              </div>
              <div class="text-gray-6 sf-pro-display" :class="isMobileSize ? 'body-6-normal' : 'body-21-normal'">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{inventory.packaging_condition.name}}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col v-if="isMobileSize" class="d-flex justify-content-around flex-column py-1 py-md-0">
        <div class="d-flex justify-content-between d-md-block sf-pro-display">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.auction_id') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-decoration-underline text-blue-30' : 'body-4-normal'">
            {{auction.id}}
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column py-1 py-md-0 py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block sf-pro-display">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.type') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal'">{{$t('auction.auction_types.'+auction.type)}}</span>
        </div>
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column body-4-normal py-1 py-md-0">
        <div class="d-flex justify-content-between d-md-block sf-pro-display">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.highest_bid') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal'">
            <span v-if="auction.bids.length">{{ auction.highest_bid | formatPrice }} &dollar;</span>
            <span v-else>-</span>
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-normal py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block sf-pro-display">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.bids') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal'">
           {{auction.bids.length|| '-'}}
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column body-4-normal py-1 py-md-0">
        <div class="d-flex justify-content-between d-md-block text-capitalize sf-pro-display">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.time_remaining') }}:</span>
          <span class="text-capitalize" :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal'">
            {{ isExpired || auction.status !== LIVE_STATUS ? '-' : auction.remaining_time }}
          </span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-normal py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">

        <div class="d-flex justify-content-between d-md-block sf-pro-display">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.status') }}:</span>
          <span :class="[isMobileSize ? 'body-9-regular' : 'body-4-normal', {'text-green' : !isExpired && auction.status === LIVE_STATUS, 'text-danger': isExpired && auction.status === LIVE_STATUS }]">
            {{ (isExpired && auction.status === LIVE_STATUS) ? $t('bids.expired') : $t('auction.status_array.' + auction.status)}}
          </span>
          <div v-if="auction.status === SCHEDULED_STATUS" class="d-none d-md-block text-center mt-2">
            <span class="body-4-normal">{{ auction.scheduled_date | formatDate('DD/MM/YYYY') }}</span>
          </div>
        </div>
      </b-col>
    </b-row>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';
import {EXPIRED_STATUS, LIVE_STATUS, SCHEDULED_STATUS} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'SingleItemAuction',
  components: {ProductThumb},
  mixins: [screenSize],
  props: {
    auction: {
      type: Object,
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      LIVE_STATUS,
      SCHEDULED_STATUS,
    }
  },
  computed:{
    inventory(){
      return this.auction.auction_items[0].inventory
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    },
    isExpired() {
      return this.auction.remaining_time === EXPIRED_STATUS
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.chekbox
  margin-top: 35px

.single-item
  padding: 15px 10px

.auction-id
  color: $color-blue-31

.text-blue-30
  color: $color-blue-30

.border
  border: 1px solid $color-gray-60
  border-radius: 12px
  overflow: hidden

.thumb-wrapper::v-deep
  max-width: 120px
  margin: auto
  img
    padding: 0 !important

</style>
