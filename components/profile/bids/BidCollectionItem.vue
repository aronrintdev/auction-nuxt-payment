<template>
  <div>
    <div
      v-if="auction.auction_items"
      :class="{'border shadow-sm': isMobileSize, 'incoming': bidType !== BID_TYPE_OUTGOING }"
      class="text-center w-100 mx-0 bg-white collection-item position-relative"
    >
      <div v-if="isMobileSize && bidType === BID_TYPE_OUTGOING" :class="`${bid.place}_mobile`"
          class="position-absolute sf-pro-font text-left body-9-normal bid-status">
      {{ $t('bids.bid_status.' + bid.place) }}
      </div>
      <div class="w-100 pr-0 mr-0 d-flex align-items-center">
        <div class="text-left d-flex align-items-center product-details column-product">
          <div class="product-details-image">
            <div class="my-0 mb-md-3 text-center" :class="{'mobile-collection-svg position-absolute' : isMobileSize}">
              <img :src="CollectionSvg" alt="collection image" />
            </div>
            <template v-if="!isMobileSize">
              <NuxtLink v-if="bidType === BID_TYPE_OUTGOING" :to="`/auction/collection/${auction.id}`">
                <div class="auction-id"> {{ $t('bids.auction_id') }}: {{ auction.id }}</div>
              </NuxtLink>
              <NuxtLink v-else :to="`/profile/auctions/${auction.id}`">
                <div class="auction-id"> {{ $t('bids.auction_id') }}: {{ auction.id }}</div>
              </NuxtLink>
            </template>
          </div>
          <div class="pl-0 pl-md-4 pr-0  d-flex align-items-end align-items-md-center product-details-content">
            <div
              :class="isMobileSize
              ? 'body-5-medium flex-grow-1 text-nowrap overflow-hidden text-truncate sf-pro-text'
              : 'body-4-bold sf-pro-text'"
            >
              {{ auction.name }} ( {{ auction.auction_items.length }}
            {{ $t('bids.items') }} )
            </div>
            <template v-if="isMobileSize">
              <!-- MOBILE BID MENU BEGIN -->
              <div v-if="bidType === BID_TYPE_OUTGOING" class="pl-2" @click="showMobileMenu">
                <img src="~/assets/img/icons/mobile-3-dot-menu.svg">
              </div>
              <!-- MOBILE BID MENU END -->
              <!-- MOBILE ACCEPT BUTTON BEGIN -->
              <div v-if="acceptable" class="ml-1">
                <a role="button" class="btn-mobile-accept d-flex align-items-center justify-content-center body-6-normal text-white rounded"
                    @click="$emit('accept', bid)">
                  {{ $t('bids.accept') }}
                </a>
              </div>
              <div v-if="(bidType !== BID_TYPE_OUTGOING && !acceptable)">-</div>
              <!-- MOBILE ACCEPT BUTTON END -->
            </template>
          </div>
        </div>
        <template v-if="!isMobileSize">
          <div class="d-flex justify-content-around flex-column column-auction-type">
            <span class="body-4-normal sf-pro-text">{{ $t('bids.auction_types.' + auction.type) }}</span>
          </div>
          <div v-if="bidType === BID_TYPE_OUTGOING" class="d-flex justify-content-around flex-column column-auto-bid">
            <span class="body-4-normal sf-pro-text text-capitalize">{{ autoBidDisabled ? $t('common.off') : $t('common.on') }}</span>
          </div>
          <div class="d-flex justify-content-center flex-column column-bid-amt">
            <span class="body-4-normal sf-pro-text">${{ bid.price | formatPrice }}</span>
            <div v-if="bidType === BID_TYPE_OUTGOING" class="d-none tag-bid d-md-flex align-items-center justify-content-center" :class="bid.place">
              {{ $t('bids.bid_status.' + bid.place) }}
            </div>
          </div>
          <div class="d-flex justify-content-around flex-column column-time-remaining">
            <span class="body-4-normal sf-pro-font text-capitalize">
              {{ !isExpiredOrDelisted ? bid.auction.remaining_time : $t('bids.expired') }}
            </span>
          </div>
          <div
            v-if="bidType === BID_TYPE_OUTGOING && !isMobileSize" class="d-flex justify-content-start align-items-center flex-column column-action"
          >
            <Button class="bg-dark-blue mt-4 border-0 body-4-normal sf-pro-font" pill @click="$emit('edit', bid)">
              <span>{{ isExpiredOrDelisted ? $t('bids.view') : $t('bids.edit_bid') }}</span>
            </Button>

            <span
              role="button"
              class="view-similar mt-2 pt-1 body-8-normal sf-pro-font"
              @click="viewSimilarAuction"
              >{{ $t('bids.view_similar') }}</span
            >
          </div>
          <div
            v-if="acceptable" class="d-flex justify-content-center align-items-center flex-column pt-4 column-action"
          >
            <Button variant="success" pill class="w-100" @click="$emit('accept', bid)">
              <div class="px-0 px-md-1 px-lg-2 px-xl-3 body-4-medium"> {{ $t('bids.accept') }}</div>
            </Button>
          </div>
          <div
            v-if="(bidType !== BID_TYPE_OUTGOING && !acceptable)"
            class="d-flex justify-content-center align-items-center flex-column pt-4  column-action">-</div>
        </template>
      </div>

      <div v-if="isMobileSize" class="collection-items">
        <b-carousel indicators class="px-0">
          <b-carousel-slide v-for="(item, i) in auction.auction_items" :key="i" class="h-auto px-2">
            <template #img>
              <b-row>
                <b-col cols="4">
                  <ProductThumb :product="item.inventory.product" />
                </b-col>
                <b-col class="d-flex align-items-center pl-0">
                  <div>
                    <div class="text-gray-6 body-6-normal sf-pro-font text-left mb-02 mb-md-1 text-truncate">
                      {{ item.inventory.product.name }}
                    </div>
                    <div class="text-gray-6 body-6-normal sf-pro-font text-uppercase text-left mb-02 mb-md-1">
                      {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
                    </div>
                    <div class="text-gray-6 body-6-normal sf-pro-font text-left mb-02 mb-md-1">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                      item.inventory.product.colorway.replace('/', ',')
                    }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                      item.inventory.size.size
                    }}
                    </div>
                    <div class="text-gray-6 body-6-normal sf-pro-font text-left mb-02 mb-md-1">
                      {{ $t('products.box_condition') }}&colon;&nbsp;{{ $t(`common.box_conditions.${item.inventory.packaging_condition.category_id}.${item.inventory.packaging_condition.display_order}`) }}
                    </div>
                  </div>
               </b-col>
              </b-row>
            </template>
          </b-carousel-slide>
        </b-carousel>
        <b-col class="px-0">
          <div class="d-flex justify-content-between align-items-center high-row-section">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.auction_id') }}:</span>
            <NuxtLink :to="`/profile/auctions/${auction.id}`" class="p-0">
              <span class="body-9-regular text-decoration-underline text-blue-30">
                {{ auction.id }}
              </span>
            </NuxtLink>
          </div>
        </b-col>
        <b-col class="px-0 bg-lightgrey">
          <div class="d-flex justify-content-between align-items-center short-row-section">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auction_type') }}:</span>
            <span class="body-9-regular text-gray-6">{{ $t('bids.auction_types.' + auction.type) }}</span>
          </div>
        </b-col>
        <b-col class="px-0">
          <div class="d-flex justify-content-between align-items-center short-row-section">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auto_bid') }}:</span>
            <span class="body-9-regular text-gray-6">{{ autoBidDisabled ? $t('common.off') : $t('common.on') }}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="px-0 bg-lightgrey">
          <div class="d-flex justify-content-between align-items-center high-row-section">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.highest_bid_amt') }}:</span>
            <span class="body-9-regular text-gray-6">${{ bid.price | formatPrice }}</span>
          </div>
        </b-col>
        <b-col sm="12" md="1" class="px-0">
          <div class="d-flex justify-content-between align-items-center short-row-section">
            <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.time_remaining') }}:</span>
            <span class="body-9-regular text-gray-6 text-capitalize">{{ !isExpiredOrDelisted ? bid.auction.remaining_time : 'Expired' }}</span>
          </div>
        </b-col>
      </div>
      <b-row v-else class="w-100">
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
    </div>
    <vue-bottom-sheet
      ref="mobileMenu"
      max-width="auto"
      :rounded="true"
    >
      <MobileMenu
        :auctionItems="auction.auction_items"
        :is-expired-or-delisted="isExpiredOrDelisted"
        @viewSimilar="viewSimilarAuction"
        @edit="hideMobileMenu(); $emit('edit', bid)"
        @close="hideMobileMenu"
      />
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CollectionSvg from '~/assets/img/icons/collection.svg'
import ProductThumb from '~/components/product/Thumb'
import { Button } from '~/components/common'
import screenSize from '~/plugins/mixins/screenSize'
import MobileMenu from '~/components/profile/bids/MobileMenu'

import {
  BID_TYPE_INCOMING,
  BID_TYPE_OUTGOING,
  DELISTED_STATUS,
  EXPIRED_STATUS,
  HIGHEST_BID_STATUS,
} from '~/static/constants'
export default {
  name: 'BidCollectionItem',
  components: { ProductThumb, Button, MobileMenu },
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
    },
    autoBidDisabled() {
      return this.bid.auction.auto_bid_settings[0] ? this.bid.auction.auto_bid_settings[0].is_disabled : false
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
    },
    showMobileMenu() {
      const { mobileMenu } = this.$refs
      if (mobileMenu) {
        mobileMenu.open()
      }
    },
    hideMobileMenu() {
      const { mobileMenu } = this.$refs
      if (mobileMenu) {
        mobileMenu.close()
      }
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

// Setting the background color of the bid status.
.highest_bid
  color: $color-green-15
.outbid
  color: $color-red-15
.winner
  color: $color-blue-1

.highest_bid_mobile
  color: $color-green-15
  z-index: 2
.outbid_mobile
  color: $color-red-15
  z-index: 2
.winner_mobile
  color: $color-blue-1
  z-index: 2

.tag-bid
  font-family: $font-sp-pro
  @include body-4
  font-weight: $normal

.view-similar
  @include body-4
  color: $color-blue-2
  width: 200px
  font-weight: $normal

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2

.border
  border: 1px solid $color-gray-60
  border-radius: 12px
  overflow: hidden

.auction-id
  text-decoration: underline
  font-family: $font-sf-pro-text
  font-weight: $bold
  text-align: center
  @include body-5
  color: $color-blue-1

.text-blue-30
  color: $color-blue-30

.collection-items
  .carousel-indicators
    position: relative
    margin: 0
  .carousel-indicators li
    background-color: $color-gray-25
    width: 4px
    height: 4px
    border-radius: 50%
.mobile-collection-svg
  right: 0
  top: -2px
  z-index: 2
  img
    width: 22px

.sf-pro-font
  font-family: $font-family-sf-pro-display
.bid-status
  top: 7px
  left: 12px

.btn-mobile-accept
  background-color: $color-blue-20
  width: 54px
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-31
  height: 22px

.bg-dark-blue.btn.btn-primary
  background-color: $color-blue-20
  border-color: $color-blue-20

.collection-item
  padding: 12px 16px
  margin-bottom: 11px
  .product-details
    &-image
      width: 130px
    &-content
      width: calc(100% - 130px)
  @media (max-width: 576px)
    padding: 14px 0 6px
    margin-bottom: 15px
    .product-details
      padding: 0 12px
      width: 100%
      &-image
        position: relative
        width: 148px
        .mobile-collection-svg
          position: absolute
          right: 10px
          top: -10px
      &-content
        width: 100%

    .high-row-section
      height: 22px
      padding: 0 12px
    .short-row-section
      height: 20px
      padding: 0 12px

.mb-02
  margin-bottom: 2px


.sf-pro-text
  font-family: $font-sf-pro-text

.column
  &-product
    width: 32.8%
    .auction-id
      white-space: nowrap
  &-action
    width: 18%
  &-time-remaining
    width: 17%
  &-bid-amt
    width: 11.6%
  &-auto-bid
    width: 10%
  &-auction-type
    width: 10.6%
.collection-item.incoming
  .column
    &-product
      width: 42.8%
      @media (max-width: 576px)
        width: 100%

.thumb-wrapper::v-deep
  background-color: $white
  @media (max-width: 576px)
    text-align: left
    img
      padding: 0 !important
      width: 86px
      margin-left: 0
</style>
