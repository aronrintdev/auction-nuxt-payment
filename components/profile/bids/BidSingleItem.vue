<template>
  <div>
    <div
      v-if="inventory.product"
      :class="isMobileSize ? 'border' : ''"
      class="position-relative text-center w-100 mx-0 bg-white d-flex flex-column flex-md-row align-items-center single-item"
    >
      <div v-if="isMobileSize && bidType === BID_TYPE_OUTGOING" :class="`${bid.place}_mobile`"
           class="position-absolute sf-pro-font text-left body-9-normal bid-status">
        {{ $t('bids.bid_status.' + bid.place) }}
      </div>
      <div class="text-left mb-md-3 mb-md-0 d-flex column-product product-details">
        <div class="product-details-image">
          <ProductThumb :product="inventory.product" />
          <template v-if="!isMobileSize">
            <NuxtLink v-if="bidType === BID_TYPE_OUTGOING" :to="`/auction/${auction.id}`">
              <div class="auction-id"> {{ $t('bids.auction_id') }}: {{ auction.id }}</div>
            </NuxtLink>
            <NuxtLink v-else :to="`/profile/auctions/${auction.id}`">
              <div class="auction-id"> {{ $t('bids.auction_id') }}: {{ auction.id }}</div>
            </NuxtLink>
          </template>
        </div>
        <div class="pl-0 pl-md-4 pr-0 d-md-flex align-items-md-center product-details-content">
          <b-row class="mb-2 mb-md-0 d-block mx-0 w-100" :class="{ 'flex-grow-1' : isMobileSize }">
            <div class="mb-12 mb-md-1 d-flex align-items-start align-items-md-center w-100 product-details-info">
              <div :class="isMobileSize ?
              'body-5-medium flex-grow-1 text-truncate sf-pro-font mt-1' : 'body-8-medium  text-truncate sf-pro-font'">
                {{ inventory.product.name }}
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
                <!-- MOBILE ACCEPT BUTTON END -->
              </template>
            </div>
            <div class="mb-02 mb-md-1 text-gray-6 text-uppercase"
                  :class="isMobileSize ? 'body-6-normal sf-pro-font' : 'body-5-normal sf-pro-font'">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{
                inventory.product.sku
              }}
            </div>
            <div class="mb-02 mb-md-1 text-gray-6 text-truncate " :class="isMobileSize ? 'body-6-normal sf-pro-font' : 'body-5-normal sf-pro-font'">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                inventory.product.colorway.replace('/', ',')
              }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                inventory.size.size
              }}
            </div>
            <div class="text-gray-6" :class="isMobileSize ? 'body-6-normal sf-pro-font' : 'body-5-normal sf-pro-font'">
              {{ $t('products.box_condition') }}&colon;&nbsp;{{ $t(`common.box_conditions.${inventory.packaging_condition.category_id}.${inventory.packaging_condition.display_order}`) }}
            </div>
          </b-row>
        </div>
      </div>
      <div class="d-md-none d-flex justify-content-around flex-column px-0 w-100">
        <div class="d-flex justify-content-between d-md-block align-items-center high-row-section">
          <span class="body-9-medium">{{ $t('bids.auction_id') }}:</span>
          <NuxtLink :to="`/profile/auctions/${auction.id}`">
            <span :class="isMobileSize ? 'body-9-regular text-underline text-blue-30' : 'body-4-medium'">
              {{ auction.id }}
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0 column-auction-type" :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auction_type') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal sf-pro-text'">
          {{ $t('bids.auction_types.' + auction.type) }}
        </span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column px-0 column-auto-bid">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auto_bid') }}:</span>
          <span class="text-capitalize" :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal sf-pro-text'">
          {{ autoBidDisabled ? $t('common.off') : $t('common.on') }}
        </span>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column body-4-medium px-0 column-bid-amt" :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block align-items-center high-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.highest_bid_amt') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-normal sf-pro-text'">
            &dollar;{{ bid.price | formatPrice }}
          </span>
          <div v-if="bidType === BID_TYPE_OUTGOING" class="d-none tag-bid d-md-flex align-items-center justify-content-center" :class="bid.place">
            {{ $t('bids.bid_status.' + bid.place) }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-around flex-column body-4-medium px-0 column-time-remaining">
        <div class="d-flex justify-content-between d-md-block  align-items-center short-row-section">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.time_remaining') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6 text-capitalize' : 'body-4-normal sf-pro-font text-capitalize'">
            {{ !isExpiredOrDelisted ? bid.auction.remaining_time : 'Expired' }}
          </span>
        </div>
      </div>
      <div
        v-if="bidType === BID_TYPE_OUTGOING && !isMobileSize"
        class="d-flex justify-content-start align-items-center flex-column column-action"
      >
        <Button class="bg-dark-blue body-4-normal sf-pro-font edit-btn" pill @click="$emit('edit', bid)">
          <span>
            {{ isExpiredOrDelisted ? $t('bids.view') : $t('bids.edit_bid') }}
          </span>
        </Button>
        <span
          role="button"
          class="view-similar mt-2 pt-1 body-8-normal sf-pro-font"
          @click="viewSimilarAuction"
        >
          {{ $t('bids.view_similar') }}
        </span>
      </div>
      <div
        v-if="bidType !== BID_TYPE_OUTGOING &&!isMobileSize"
        class="d-flex justify-content-center align-items-center flex-column column-action"
      >
        <Button v-if="acceptable" variant="success" pill class="w-100" @click="$emit('accept', bid)">
          <div class="px-0 px-md-1 px-lg-2 px-xl-3 body-4-medium"> {{ $t('bids.accept') }}</div>
        </Button>
        <div v-else class="text-gray-6">-</div>
      </div>
    </div>
    <vue-bottom-sheet
      ref="mobileMenu"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <MobileMenu
        :inventory="inventory"
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
import ProductThumb from '~/components/product/Thumb'
import { Button } from '~/components/common'
import {
  BID_TYPE_INCOMING,
  BID_TYPE_OUTGOING,
  DELISTED_STATUS,
  EXPIRED_STATUS,
} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import MobileMenu from '~/components/profile/bids/MobileMenu'

export default {
  name: 'BidSingleItem',
  components: {MobileMenu, ProductThumb, Button },
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
    }
  },
  computed: {
    inventory() {
      return this.auction.auction_items[0].inventory
    },
    auction() {
      return this.bid.auction
    },
    haveAutoBidOn() {
      return this.auction?.autoBidSetting?.is_disabled
    },
    /**
     * Checking if the bid is expired or delisted.
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
      setProductFilter: 'auction/setProductFilter'
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
  .product-details
    &-image
      width: 130px
    &-content
      width: calc(100% - 130px)

  @media (max-width: 576px)
    padding: 14px 0 6px
    margin-bottom: 15px
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
  .product-details-info
    width: 100%
    img
      height: 20px
      vertical-align: top
    .mb-12
      margin-bottom: 12px
    .mb-02
      margin-bottom: 2px
  .high-row-section
    height: 22px
    padding: 0 12px
  .short-row-section
    height: 20px
    padding: 0 12px
</style>
