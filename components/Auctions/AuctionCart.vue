<template>
  <div class="flex-grow-1 auction-cart">
    <b-row class="d-none d-md-flex">
      <b-col md="12">
        <b-row>
          <b-col md="10">
            <div class="auction-cart-title">{{ `${$t('auction.auction_id')}# ${auction.id}` }}</div>
            <p class="d-none d-md-block auction-cart-desc">{{ $t('auctions.frontpage.auction_cart_desc') }}</p>
          </b-col>
          <b-col md="2">
            <div class="d-none d-md-block pull-right auction-cart-title">
              {{ getTotalQuantity }} {{ $tc('shopping_cart.item', getTotalQuantity) }}
            </div>
          </b-col>
        </b-row>
        <hr class="mb-3 pb-3 mt-0 d-none d-md-block" />
      </b-col>
    </b-row>

    <b-row class="mt-0 mb-4 d-none d-md-flex auction-cart-header">
      <b-col cols="12" md="10" class="d-flex align-items-center">
        <div class="body-5-bold text-gray-6 text-capitalize">
          {{ $t('auctions.frontpage.item_details') }}
        </div>
        <div role="button" class="d-none d-md-block auction-cart-header-watchlist">
          <Icon
            :id="`popover-watchlist-item-${auction.id}`"
            src="add-to-watchlist-icon.svg"
            hover-src="add-to-watchlist-red-icon.svg"
            :active="watchlistShow || !!watchlist"
            width="130"
            height="18"
            tabindex="0"
            disableHover
            class="action-icon"
            :alt-text="watchlist ? watchlist.name : ''"
            :tooltip-text="watchlist ? watchlist.name : ''"
            @click="removeFromWatchList"
          />
        </div>
      </b-col>
      <b-col cols="3" md="2" class="text-center d-flex justify-content-center">
        <div class="body-5-bold text-gray-6 text-uppercase">
            {{ $t('shopping_cart.quantity') }}
        </div>
      </b-col>
    </b-row>

    <b-row v-for="(item, index) in auction.auction_items" :key="item.id" class="auction-cart-item">
      <b-col cols="12" md="10">
        <b-row>
          <b-col cols="6" md="2">
            <ProductThumb :product="item.inventory.product" overlay />
          </b-col>
          <b-col cols="6" md="10" class="pl-md-4 position-relative">
            <div v-if="!index" class="position-absolute d-md-none more-button">
              <ThreeDotMenuSVG />
            </div>
            <b-row class="d-block">
              <div class="product-name">{{ item.inventory.product.name }}</div>
              <div class="product-sku text-uppercase">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
              </div>
              <div class="product-color d-flex align-items-center">
                <span class="text-truncate flex-1">{{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.inventory.color }}</span>
                <span class="product-size text-nowrap">
                  ,&nbsp;{{ $t('shopping_cart.size') }}&colon;&nbsp;{{ item.inventory.size ? item.inventory.size.size : '' }}
                </span>
              </div>
              <div class="product-condition">
                {{ $t('common.box') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3" md="2" class="text-center quantity d-none d-md-flex justify-content-center">
        {{ item.quantity }}
      </b-col>
    </b-row>
    <WatchlistPopover
      v-if="!watchlist"
      :auction="auction"
      :target="`popover-watchlist-item-${auction.id}`"
      @show="watchlistShow = true"
      @hidden="watchlistShow = false"
      @watchlisted="onWatchlisted"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import WatchlistPopover from '~/components/watchlist/Popover'
import Icon from '~/components/common/Icon.vue'
import ThreeDotMenuSVG from '~/assets/img/shopping-cart/three-dot-menu.svg?inline'
import { WATCHLIST_TYPE_AUCTION } from '~/static/constants'

export default {
  name: 'AuctionCart',
  components: { WatchlistPopover, Icon, ThreeDotMenuSVG },
  props: {
    auction: {
      type: Object,
      default: () => {},
    },
  },
  data: () => {
    return {
      watchlistShow: false,
      watchlist: null,
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity() {
      return this.auction.auction_items && this.auction.auction_items.length
    },
    
  },
  watch: {
    auction(newV) {
      return newV.watchlist_item?.watchlist
    }
  },
  mounted() {
    this.watchlist = this.auction.watchlist_item?.watchlist
  },
  methods: {
    ...mapActions({
      removeItemsFromWatchlist: 'watchlist/removeItemsFromWatchlist',
    }),
    onWatchlisted(watchlist) {
      if (watchlist) {
        this.watchlistShow = false
        this.watchlist = watchlist
      }
    },
    removeFromWatchList() {
      if (this.watchlist) {
        this.removeItemsFromWatchlist({
          watchlist: this.watchlist,
          ids: [this.auction.id],
          type: WATCHLIST_TYPE_AUCTION,
        })
        this.watchlist = null
      }
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.auction-cart
  padding: 44px 57px 0 76px
  font-family: $font-sf-pro-text
  &-title
    font-weight: $bold
    @include body-16
    color: $black
  &-desc
    font-family: $font-montserrat
    font-weight: $medium
    @include body-8
    color: $color-gray-5
    margin: 11px 0
  .quantity
    font-weight: $bold
    @include body-13
    color: $black
  &-header
    .body-5-bold
      letter-spacing: -0.02em
    &-watchlist
      margin-left: 67px
  &-item
    margin-bottom: 82px
  .product
    &-name
      font-family: $font-sf-pro-text
      font-weight: $bold
      @include body-4b
      color: $black
    &-sku,
    &-color,
    &-condition
      font-family: $font-sf-pro-text
      font-weight: $normal
      @include body-4b
      color: $color-gray-6
      margin-top: 8px
  @media (max-width: 576px)
    padding: 0
    &-title
      @include body-2
    &-desc
      @include body-21
    &-header
      .body-5-bold
        @include body-9
    &-item
      padding: 25px 28px 24px 8.5px
      margin: 0
      border-bottom: 1px solid rgba(196, 196, 196, 0.168627451)
    .quantity
      @include body-10
    .body-4-bold 
      @include body-10
    .body-4-normal
      @include body-9
    .product
      &-name
        font-family: $font-sp-pro
        font-weight: $medium
        @include body-21
        color: $black
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        padding: 0 2.5px
      &-sku,
      &-color,
      &-condition
        font-family: $font-sp-pro
        font-weight: $normal
        @include body-1214
        color: $color-gray-5
        margin-top: 6px
        padding: 0 2.5px
      &-condition
        margin-top: 7px
    .thumb-wrapper::v-deep
      height: 185px
      padding: 15px
      background: rgba(255, 255, 255, 0.78)
      .overlay
        background: rgba(200, 200, 200, 0.1)

.more-button
  top: 0
  right: -9px
  width: 6px
</style>
