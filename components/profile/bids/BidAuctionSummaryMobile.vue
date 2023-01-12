<template>
  <div>
    <div class="single-item">
      <div v-if="auction.auction_items.length < 2" class="text-left mb-md-3 mb-md-0 d-flex column-product product-details">
        <div class="product-details-image">
          <ProductThumb :product="inventory.product" />
        </div>
        <div class="pl-0 pl-md-4 pr-0 d-md-flex align-items-md-center product-details-content">
          <b-row class="mb-2 mb-md-0 d-block mx-0 w-100 flex-grow-1">
            <div class="mb-2 mb-md-1 d-flex align-items-start align-items-md-center w-100 product-details-info">
              <div class="d-flex align-items-center flex-grow-1 mt-1 overflow-hidden">
                <span class="body-5-medium flex-grow-1 text-truncate sf-pro-font">{{ inventory.product.name }}</span>
                <span v-if="auctionIsLive" class="status-text">&bull;{{ $t('bids.live') }}</span>
                <span v-else-if="auction.remaining_time !== EXPIRED_STATUS" class="status-text text-gray-24">
                  &bull;{{ $t(`auction.status_array.${auction.status}`) }}
                </span>
                <span v-else class="status-text text-danger">&bull;{{ $t('bids.expired') }}</span>
              </div>
              <div class="pl-2" @click="showMobileMenu">
                <img src="~/assets/img/icons/mobile-3-dot-menu.svg">
              </div>
            </div>
            <div class="mb-02 text-gray-6 text-uppercase body-6-normal sf-pro-font">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{
                inventory.product.sku
              }}
            </div>
            <div class="mb-02 text-gray-6 text-truncate body-6-normal sf-pro-font">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                inventory.product.colorway.replace('/', ',')
              }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                inventory.size.size
              }}
            </div>
            <div class="text-gray-6 body-6-normal sf-pro-font">
              {{ $t('products.box_condition') }}&colon;&nbsp;{{ $t(`common.box_conditions.${inventory.packaging_condition.category_id}.${inventory.packaging_condition.display_order}`) }}
            </div>
          </b-row>
        </div>
      </div>
      <div v-else class="product-details">
        <div class="d-flex">
          <div class="product-details-image text-right">
            <img class="collection-image" :src="require('~/assets/img/icons/collection.svg')" alt="collection image" />
          </div>
          <div class="d-flex align-items-start product-details-info">
            <div class="d-flex align-items-center flex-grow-1 mt-1 overflow-hidden">
              <span class="body-5-medium flex-grow-1 text-truncate sf-pro-font">{{ auction.name }} ( {{ auction.auction_items.length }}
              {{ $t('bids.items') }} )</span>
              <span v-if="auctionIsLive" class="status-text">&bull;{{ $t('bids.live') }}</span>
              <span v-if="auction.remaining_time !== EXPIRED_STATUS" class="status-text text-gray-24">
                &bull;{{ $t(`auction.status_array.${auction.status}`) }}
              </span>
              <span v-else class="status-text text-danger">&bull;{{ $t('bids.expired') }}</span>
            </div>
            <div class="pl-2" @click="showMobileMenu">
              <img src="~/assets/img/icons/mobile-3-dot-menu.svg">
            </div>
          </div>
        </div>
        <b-carousel indicators class="px-0 collection-items">
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
      </div>
      <div class="d-md-none d-flex justify-content-around flex-column px-0 w-100">
        <div class="d-flex justify-content-between d-md-block align-items-center high-row-section">
          <span class="body-9-medium">{{ $t('bids.auction_id') }}:</span>
          <NuxtLink :to="`/profile/auctions/${auction.id}`">
            <span class="body-9-regular text-underline text-blue-30">
              {{ auction.id }}
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0 bg-lightgrey">
        <div class="d-flex justify-content-between align-items-center short-row-section">
          <span class="body-9-medium text-capitalize">{{ $t('bids.listed_on') }}:</span>
          <span class="body-9-regular text-gray-6">{{ auction.listed_at | formatDate }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('auction.expires_on') }}:</span>
          <span class="body-9-regular text-gray-6">{{ auction.end_date | formatDate }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0 bg-lightgrey">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auction_type') }}:</span>
          <span class="body-9-regular text-gray-6">{{ $t('bids.auction_types.' + auction.type) }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.your_bid') }}</span>
          <span class="text-capitalize body-9-regular text-gray-6">&dollar;{{ bid.price | formatPrice }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0 bg-lightgrey">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('product_page.highest_bid') }}</span>
          <span class="text-capitalize body-9-regular text-gray-6">&dollar;{{ auction.highest_bid | formatPrice }}</span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column body-4-medium px-0">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.time_remaining') }}:</span>
          <span class="body-9-regular text-gray-6 text-capitalize">{{ !isExpiredOrDelisted ? bid.auction.remaining_time : 'Expired' }}</span>
        </div>
      </div>
    </div>

    <vue-bottom-sheet
      ref="mobileMenu"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <EditBidMobileMenu
        :auctionItems="auction.auction_items"
        :is-expired-or-delisted="isExpiredOrDelisted"
        @increase="openIncreaseBidSheet"
        @remove="openRemoveBidSheet"
        @close="hideMobileMenu"
      />
    </vue-bottom-sheet>
    <!-- Remove bid sheet -->
    <vue-bottom-sheet
      ref="removeBidSheet"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <div class="remove-bid-content d-flex flex-column align-items-center">
        <div class="bid-content">{{ $t('bids.remove_bid_content') }}</div>
        <b-button class="remove-btn" @click="removeBid">{{ $t('shopping_cart.remove') }}</b-button>
        <b-button class="cancel-btn" @click="$refs.removeBidSheet.close()">{{ $t('create_listing.confirm.cancel') }}</b-button>
      </div>
    </vue-bottom-sheet>
    <!-- Increase bid sheet -->
    <vue-bottom-sheet
      ref="increaseBidSheet"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <div class="increase-bid-sheet d-flex flex-column align-items-center">
        <div class="w-100 increase-bid-sheet-header d-flex align-items-center justify-content-between">
          <div class="increase-bid-sheet-title">{{ $t('bids.increase_bid') }}</div>
          <b-button class="cancel-btn" @click="$refs.increaseBidSheet.close()">{{ $t('create_listing.confirm.cancel') }}</b-button>
        </div>
        <div class="w-100 increase-bid-sheet-content text-center">
          <div class="d-flex align-items-center justify-content-between">
            <div class="increase-bid-sheet-content-label">{{ $t('auction.bid_amount') }}:</div>
            <div class="text-right">
              <input v-model="increasedPrice" type="number" placeholder="$" class="text-right" />
              <div class="min-value">{{ $t('products.enter_or_more', { amount: `$${auction.highest_bid / 100}` }) }}</div>
            </div>
          </div>
          <b-button class="send-btn" @click="increaseBid">{{ $t('common.send') }}</b-button>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

import ProductThumb from '~/components/product/Thumb'
import {
  DELISTED_STATUS,
  EXPIRED_STATUS,
} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import EditBidMobileMenu from '~/components/profile/bids/EditBidMobileMenu'

export default {
  name: 'BidSingleItem',
  components: {EditBidMobileMenu, ProductThumb },
  mixins: [screenSize],
  props: {
    bid: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      EXPIRED_STATUS,
      increasedPrice: 0,
    }
  },
  computed: {
    inventory() {
      return this.auction.auction_items[0].inventory
    },
    auction() {
      return this.bid.auction
    },
    /**
     * Checking if the bid is expired or delisted.
     * @returns {boolean}
     */
    isExpiredOrDelisted() {
      return (
        this.bid.auction.remaining_time === EXPIRED_STATUS ||
        this.bid.auction.status === DELISTED_STATUS
      )
    },
    auctionIsLive() {
      return this.auction.status === 'live' && this.auction.remaining_time !== EXPIRED_STATUS
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    },
  },
  methods: {
    ...mapActions({
      deleteBids: 'profile-bids/deleteBids',
      increaseBidPrice: 'profile-bids/increaseBidPrice',
    }),
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
    openRemoveBidSheet() {
      this.hideMobileMenu()
      this.$refs.removeBidSheet.open()
    },
    openIncreaseBidSheet() {
      this.hideMobileMenu()
      this.$refs.increaseBidSheet.open()
    },
    removeBid() {
      this.deleteBids({ids: this.bid.id})
        .then(() => {
          this.$toasted.success(this.$t('bids.success_deleted'))
        })
        .catch(e => {
          this.$toasted.error(e)
        })
    },
    increaseBid() {
      this.increaseBidPrice({ id: this.bid.id, price: this.increaseBidPrice * 100 })
        .then(() => {
          this.$toasted.success(this.$t('bids.increased_bid_price_message'))
          this.$refs.increaseBidSheet.close()
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

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

.thumb-wrapper::v-deep
  width: 85px
  margin: auto
  img
    padding: 0 !important
  @media (max-width: 576px)
    width: 86px
    margin-left: 0

.tag-bid
  font-family: $font-sp-pro
  @include body-4
  font-weight: $normal

.view-similar
  color: $color-blue-2

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none
.chekbox
  margin-top: 35px

.single-item
  padding: 16px
  margin-bottom: 11px
  color: $black
  background: $white
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
  border-radius: 10px

  .status-text
    font-family: $font-sp-pro
    font-weight: $normal
    @include body-1214
    color: $color-green-2
    white-space: nowrap
    padding: 0 4px

  .product-details
    &-image
      width: 130px
    &-content
      width: calc(100% - 130px)
  .collection-image
    width: 22px 
    margin-right: 5px

  @media (max-width: 576px)
    padding: 14px 0 6px
    margin-bottom: 15px
    &.incoming
      .column
        &-product
          width: 100%
    .column
      &-product,
      &-action,
      &-time-remaining,
      &-bid-amt,
      &-auto-bid,
      &-auction-type
        width: 100%
    .product-details
      padding: 0 12px
      &-image
        width: 115px
      &-content
        width: calc(100% - 115px)

.border
  border: 1px solid $color-gray-60
  border-radius: 12px !important
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
  text-decoration: underline

.sf-pro-text
  font-family: $font-sf-pro-text
.sf-pro-font
  font-family: $font-family-sf-pro-display

.btn-mobile-accept
  background-color: $color-blue-20
  width: 54px
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-31
  height: 22px
.bid-status
  left: 12px
  top: 7px
.bg-dark-blue.btn.btn-primary
  background-color: $color-blue-20
  border-color: $color-blue-20

.btn.edit-btn
  width: 169px
  height: 38px

@media (max-width: 576px)
  .product-details-content
    width: 100%
    img
      height: 20px
      vertical-align: top
    .mb-02
      margin-bottom: 2px
  .high-row-section
    height: 22px
    padding: 0 12px
  .short-row-section
    height: 20px
    padding: 0 12px

.collection-items
  margin: 0 -10px
  .carousel-indicators
    position: relative
    margin: 0
  .carousel-indicators li
    background-color: $color-gray-25
    width: 4px
    height: 4px
    border-radius: 50%
  

.remove-bid-content
  padding: 18px 0
  .bid-content
    font-family: $font-sp-pro
    font-weight: $normal
    @include body-32
    color: $black
    padding: 12px 0
  .remove-btn
    width: 216px
    height: 40px
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-4b
    color: $white
    margin: 35px 0 19px
    background: $color-blue-20
    border-radius: 21px
  .cancel-btn
    font-weight: $medium
    font-family: $font-sp-pro
    @include body-34
    color: $color-blue-20
    padding: 0
    border: none
    background: transparent

.increase-bid-sheet
  &-header
    padding: 0 20px 20px
  &-title
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-34
    letter-spacing: -0.02em
    color: $black
  .cancel-btn
    font-weight: $medium
    font-family: $font-sp-pro
    @include body-34
    color: $color-blue-20
    padding: 0
    border: none
    background: transparent
  &-content
    padding: 8px 20px
    border-top: 0.5px solid $color-gray-47
    &-label
      font-family: $font-sp-pro
      font-weight: $normal
      @include body-34
      color: $black
  input
    border: 0.5px solid $color-gray-47
    border-radius: 8px
    padding: 8px
    width: 75px
    height: 37px
    font-family: $font-sp-pro
    font-weight: $bold
    @include body-5
    letter-spacing: 0.045em
    color: $black
  .min-value
    margin-top: 1px
    font-family: $font-sf-pro-text
    font-weight: $normal
    @include body-18
    color: $color-gray-47
  .send-btn
    width: 216px
    height: 40px
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-4b
    color: $white
    margin: 20px 0 19px
    background: $color-blue-20
    border-radius: 21px

</style>
