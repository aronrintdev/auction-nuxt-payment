<template>
    <b-row
      v-if="auction.auction_items"
      :class="{'border shadow-sm' : isMobileSize}"
      class="mt-3 text-center mx-0 ml-md-n1 font-weight-bold w-100 bg-white collection-item"
      role="button"
      @click="$emit('click')"
    >
      <b-row class="w-100 m-0">
        <b-col cols="12" md="5" class="text-left mt-md-4">
          <b-row>
            <b-col cols="4" md="4" class="text-right text-md-center">
              <img :src="CollectionSvg" alt="collection image">
            </b-col>
            <b-col cols="8" md="8" class="pl-4 d-flex align-items-center">
              <span class="auction-name sf-pro-display overflow-hidden text-nowrap text-capitalize" :class="isMobileSize ? 'body-5-medium': 'body-13-bold'">
                {{ auction.name }} ( {{auction.auction_items.length}} {{$t('auction.items')}} )
              </span>
            </b-col>
          </b-row>
        </b-col>
        <template v-if="!isMobileSize">
          <b-col sm="12" md="1" class="d-flex justify-content-around sf-pro-display flex-column pt-4">
            <span class="body-4-normal">{{$t('auction.auction_types.'+auction.type)}}</span>
          </b-col>
          <b-col  sm="12" md="2" class="d-flex justify-content-around sf-pro-display flex-column pt-4">
            <span v-if="auction.bids.length" class="body-4-normal">{{ auction.highest_bid | formatPrice }} &dollar;</span>
            <span v-else>-</span>

          </b-col>
          <b-col sm="12" md="1" class="d-flex justify-content-around sf-pro-display flex-column pt-4">
            <span class="body-4-normal">{{auction.bids.length|| '-'}}</span>
          </b-col>
          <b-col sm="12" md="2" class="d-flex justify-content-around sf-pro-display flex-column pt-4">
            <span class="body-4-normal text-capitalize">{{ isExpired || auction.status !== LIVE_STATUS ? '-' : auction.remaining_time }}</span>
          </b-col>
          <b-col
            sm="12"
            md="1"
            class="d-flex justify-content-around flex-column pt-4 sf-pro-display"
            :class="{'text-green' : !isExpired && auction.status === LIVE_STATUS, 'text-danger': isExpired && auction.status === LIVE_STATUS }"
          >
            <span class="body-4-normal">{{ (isExpired && auction.status === LIVE_STATUS) ? $t('bids.expired') : $t('auction.status_array.' + auction.status) }}</span>
            <div v-if="auction.status === SCHEDULED_STATUS" class="d-none d-md-block text-center mt-2 sf-pro-display ">
              <span class="body-4-normal">{{ auction.scheduled_date | formatDate('DD/MM/YYYY') }}</span>
            </div>
          </b-col>
        </template>
      </b-row>

      <div v-if="isMobileSize" class="w-100 collection-items mt-2">
        <b-carousel indicators>
          <b-carousel-slide v-for="(item, i) in auction.auction_items" :key="i" class="h-auto">
            <template #img>
              <b-row>
                <b-col cols="4">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col class="d-flex flex-column justify-content-center pl-3">
                  <div class="text-gray-6 body-6-normal text-left mb-1 sf-pro-display text-uppercase">
                    {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
                  </div>
                  <div class="text-gray-6 body-6-normal text-left mb-1 sf-pro-display text-wrap">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                      item.inventory.product.colorway
                    }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                      item.inventory.size.size
                    }}
                  </div>
                  <div class="text-gray-6 body-6-normal text-left mb-1 sf-pro-display ">
                    {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
                  </div>
                </b-col>

              </b-row>
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-col class="py-1">
          <div class="d-flex justify-content-between d-md-block sf-pro-display ">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.auction_id') }}:</span>
            <span class="body-9-regular text-decoration-underline text-blue-30">{{ auction.id }}</span>
          </div>
        </b-col>
        <b-col class="py-1 bg-lightgrey">
          <div class="d-flex justify-content-between d-md-block sf-pro-display ">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.type') }}:</span>
            <span class="body-9-regular text-gray-6">{{ $t('auction.auction_types.'+auction.type) }}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1">
          <div class="d-flex justify-content-between d-md-block sf-pro-display ">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.highest_bid') }}:</span>
            <span class="body-9-regular text-gray-6">
              <span v-if="auction.bids.length">{{ auction.highest_bid | formatPrice }} &dollar;</span>
              <span v-else>-</span>
            </span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1 bg-lightgrey">
          <div class="d-flex justify-content-between d-md-block sf-pro-display ">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.bids') }}:</span>
            <span class="body-9-regular text-gray-6">{{auction.bids.length|| '-'}}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1">
          <div class="d-flex justify-content-between d-md-block sf-pro-display ">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.time_remaining') }}:</span>
            <span class="body-9-regular text-gray-6">{{ isExpired || auction.status !== LIVE_STATUS ? '-' : auction.remaining_time }}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="py-1 bg-lightgrey">
          <div class="d-flex justify-content-between d-md-block sf-pro-display ">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.status') }}:</span>
            <span class="body-9-regular text-gray-6"
            :class="{'text-green' : !isExpired && auction.status === LIVE_STATUS, 'text-danger': isExpired && auction.status === LIVE_STATUS }">
            {{ (isExpired && auction.status === LIVE_STATUS) ? $t('bids.expired') : $t('auction.status_array.' + auction.status) }}
            </span>
            <div v-if="auction.status === SCHEDULED_STATUS" class="d-none d-md-block text-center mt-2">
              <span class="body-4-normal">{{ auction.scheduled_date | formatDate('DD/MM/YYYY') }}</span>
            </div>
          </div>
        </b-col>
      </div>
      <b-row v-else class="w-100 m-0">
        <b-col sm="12" md="2" class="text-left">
        </b-col>
        <b-col sm="12" md="10">
          <b-row class="mt-2">
            <b-col
              v-for="(item, i) in auction.auction_items"
              :key="i"
              cols="12"
              sm="12"
              md="4"
            >
              <b-row class="mr-3">
                <b-col md="3" class="p-0">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col md="9" class="pl-2 pr-3 d-flex align-items-center">
                  <div class="body-5-medium sf-pro-display flex-grow-1 text-nowrap overflow-hidden text-truncate text-left">
                    {{ item.inventory.product.name }}
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-row>
</template>

<script>
import CollectionSvg from '~/assets/img/icons/collection.svg'
import ProductThumb from '~/components/product/Thumb';
import {EXPIRED_STATUS, LIVE_STATUS, SCHEDULED_STATUS} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'CollectionAuction',
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
    return {
      CollectionSvg,
      LIVE_STATUS,
      SCHEDULED_STATUS,
    }
  },
  computed:{
    product(){
      return this.auction.auction_items[0]
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

.collection-item
  padding: 15px 10px


.border
  border: 1px solid $color-gray-60
  border-radius: 12px
  overflow: hidden

.auction-name
  text-overflow: ellipsis

.text-blue-30
  color: $color-blue-30
</style>
<style lang="sass">
@import '~/assets/css/_variables'
.collection-items
  .carousel-indicators
    position: relative
    margin: 0
  .carousel-indicators li
    background-color: $color-gray-25
    width: 12px
    height: 12px
    border-radius: 50%

.collection-item
  .thumb-wrapper
    max-width: 120px
    margin: auto
    img
      padding: 0 !important

</style>
