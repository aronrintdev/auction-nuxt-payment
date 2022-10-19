<template>
  <b-row
    v-if="auction.auction_items"
    :class="{'border shadow-sm' : isMobileSize}"
    class="mt-3 text-center font-weight-bold w-100 bg-white ml-n1 collection-item position-relative"
  >
    <div
      class="position-absolute tag-bid d-flex align-items-center justify-content-center text-white"
      :class="bid.place"
    >
      {{ $t('bids.bid_status.' + bid.place) }}
    </div>
    <b-row class="w-100 pr-0">
      <b-col sm="12" md="5" class="text-left mt-4">
        <b-row>
          <b-col cols="4" md="4" :class="isMobileSize ? 'text-right' : 'text-center'">
            <div @click.stop>
              <b-form-checkbox
                v-if="selectable"
                :checked="selected"
                class="position-absolute ml-n4 chekbox"
                @change="$emit('selected', bid.id)"
              >
              </b-form-checkbox>
            </div>
            <div class="my-0 my-md-3"><img :src="CollectionSvg" alt="collection image my-2" /></div>
            <div v-if="!isMobileSize" class="auction-id">{{ $t('bids.auction_id') }}: {{ auction.id }}</div>
          </b-col>
          <b-col cols="8" md="8" class="pl-4 d-flex justify-content-between align-items-center justify-content-md-around flex-md-column"
                 :class="isMobileSize ? 'body-5-medium': 'body-4-bold'">
            <span>{{ auction.name }} ( {{ auction.auction_items.length }}
            {{ $t('bids.items') }} )
            </span>
            <div v-if="acceptable && isMobileSize">
              <Button size="sm" variant="primary" class="btn-dark-blue px-2" @click="$emit('accept', bid)">
                <div class="body-9-medium"> {{ $t('bids.accept') }}</div>
              </Button>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <template v-if="!isMobileSize">
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column pt-4">
        <span class="body-4-medium">{{ $t('bids.auction_types.' + auction.type) }}</span>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column pt-4">
        <span class="body-4-medium">{{ $t('bids.outbid_types.' + (haveAutoBidOn ? 'on' : 'off')) }}</span>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column pt-4">
        <span class="body-4-medium">{{ bid.price / 100 }}</span>
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column pt-4">
        <span class="body-4-medium">
          {{ !isExpiredOrDelisted ? bid.auction.remaining_time : $t('bids.expired') }}
        </span>
      </b-col>
      <b-col
        v-if="bidType === BID_TYPE_OUTGOING"
        sm="12"
        md="2"
        class="d-flex justify-content-start align-items-center flex-column"
      >
        <Button class="bg-blue-2 mt-4 border-0" pill @click="$emit('edit', bid)">
          <span>
            {{
              isExpiredOrDelisted ? $t('bids.view') : $t('bids.edit_bid')
            }}</span
          >
        </Button>

        <span
          role="button"
          class="view-similar mt-2"
          @click="viewSimilarAuction"
          >{{ $t('bids.view_similar') }}</span
        >
      </b-col>
      <b-col
        v-if="acceptable"
        sm="12"
        md="2"
        class="d-flex justify-content-center align-items-center flex-column pt-4"
      >
        <Button variant="success" pill class="w-100" @click="$emit('accept', bid)">
          <div class="px-0 px-md-1 px-lg-2 px-xl-3 body-4-medium"> {{ $t('bids.accept') }}</div>
        </Button>
      </b-col>
      </template>
    </b-row>

    <div v-if="isMobileSize" class="collection-items">
      <b-carousel controls indicators>
        <b-carousel-slide v-for="(item, i) in auction.auction_items" :key="i" class="h-auto">
          <template #img>
            <b-row>
              <b-col cols="4">
                <ProductThumb :product="item.inventory.product" />
              </b-col>
              <b-col class="d-flex flex-column justify-content-center pl-3">
              <div class="text-gray-6 body-6-medium text-uppercase text-left mb-2">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
              </div>
               <div class="text-gray-6 body-6-medium text-uppercase text-left mb-2">
                 {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                   item.inventory.product.colorway
                 }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                   item.inventory.size.size
                 }}
              </div>
               <div class="text-gray-6 body-6-medium text-uppercase text-left mb-2">
                 {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
              </div>
             </b-col>

            </b-row>
          </template>
        </b-carousel-slide>
      </b-carousel>
      <b-col class="py-1">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.auction_id') }}:</span>
          <span class="body-9-regular text-underline text-blue-30">{{ auction.id }}</span>
        </div>
      </b-col>
      <b-col class="py-1 bg-lightgrey">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auction_type') }}:</span>
          <span class="body-9-regular text-gray-6">{{ $t('bids.auction_types.' + auction.type) }}</span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="py-1">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auto_bid') }}:</span>
          <span class="body-9-regular text-gray-6">{{ $t('bids.outbid_types.' + (haveAutoBidOn ? 'on' : 'off')) }}</span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="py-1 bg-lightgrey">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.highest_bid_amt') }}:</span>
          <span class="body-9-regular text-gray-6">{{ bid.price / 100 }}</span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="py-1">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.time_remaining') }}:</span>
          <span class="body-9-regular text-gray-6">{{ !isExpiredOrDelisted ? bid.auction.remaining_time : 'Expired' }}</span>
        </div>
      </b-col>
    </div>
    <b-row v-else>
      <b-col sm="12" md="2" class="text-left"> </b-col>
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
              <b-col
                md="9"
                class="pl-2 pr-3 d-flex align-items-center"
              >
                <div class="body-5-medium flex-grow-1 text-nowrap overflow-hidden text-truncate">
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
import { mapActions } from 'vuex'
import CollectionSvg from '~/assets/img/icons/collection.svg'
import ProductThumb from '~/components/product/Thumb'
import { Button } from '~/components/common'
import screenSize from '~/plugins/mixins/screenSize'
import {
  BID_TYPE_INCOMING,
  BID_TYPE_OUTGOING,
  DELISTED_STATUS,
  EXPIRED_STATUS,
  HIGHEST_BID_STATUS,
} from '~/static/constants'
export default {
  name: 'BidCollectionItem',
  components: { ProductThumb, Button },
  mixins: [screenSize],
  props: {
    bid: {
      type: Object,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    acceptable: {
      type: Boolean,
      default: false,
    },
    bidType: {
      type: String,
      default: BID_TYPE_INCOMING,
    },
  },
  data() {
    return {
      BID_TYPE_INCOMING,
      BID_TYPE_OUTGOING,
      HIGHEST_BID_STATUS,
      CollectionSvg,
    }
  },
  computed: {
    product() {
      return this.auction.auction_items[0]
    },
    auction() {
      return this.bid.auction
    },
    /**
     * Checking if the bid is expired or delisted
     * @returns {boolean|*}
     */
    haveAutoBidOn() {
      return this.auction?.autoBidSetting?.is_disabled
    },
    /**
     * Checking if the bid is expired or delisted
     * @returns {boolean}
     */
    isExpiredOrDelisted() {
      return (
        this.bid.auction.status === EXPIRED_STATUS ||
        this.bid.auction.status === DELISTED_STATUS
      )
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  methods: {
    ...mapActions({
      setProductFilter: 'auction/setProductFilter',
    }),
    viewSimilarAuction() {
      const product = this.bid.auction.auction_items[0].inventory.product
      this.setProductFilter({ sku: product.sku, name: product.name })
      this.$router.push('/auction')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

// Setting the background color of the bid status.
.highest_bid
  background-color: $color-green-15
.outbid
  background-color: $color-red-15
.winner
  background-color: $color-blue-1

.tag-bid
  @include body-4
  font-weight: $regular
  height: 30px
  width: 120px
  left: 0
  top: 0
  z-index: 10
  border-top-left-radius: 0px
  border-bottom-right-radius: 10px

.view-similar
  @include body-4
  color: $color-blue-2
  width: 200px
  font-weight: $normal

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2

.collection-item
  padding: 10px

.border
  border: 1px solid $color-gray-60
  border-radius: 12px
  overflow: hidden

.auction-id
  color: $color-blue-31
  text-decoration: underline
  text-align: center
  font-size: 14px

.text-blue-30
  color: $color-blue-30
  text-decoration: underline
</style>
<style lang="sass">
.collection-items
  .carousel-indicators
    position: relative
    margin: 0
  .carousel-indicators li
    background-color: gray
    width: 12px
    height: 12px
    border-radius: 50%
</style>
