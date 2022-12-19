<template>
  <div v-if="auction" class="item">
    <div class="thumbnail auct-card">
      <div
        v-if="auction.status === 'completed'"
        class="d-inline-flex align-items-center remaining-time bg-success text-white"
      >
        <div class="text-capitalize">{{ $t('filter_sidebar.status_options.sold') }}</div>
      </div>
      <div
        v-else-if="auction.status === 'scheduled'"
        class="d-inline-flex align-items-center remaining-time"
      >
        <CalendarIcon />
        <div class="text-capitalize">{{ auction.scheduled_date | diffForHumans }}</div>
      </div>
      <div
        v-else-if="auction.remaining_hours < 24 && auction.remaining_hours"
        class="d-inline-flex align-items-center remaining-time bg-danger text-white"
      >
        <ClockBackSvg v-if="auction.remaining_hours"/>
        <div class="text-capitalize">{{ auction.remaining_hours ? auction.remaining_time : $t('filter_sidebar.status_options.expired') }}</div>
      </div>
      <div
        v-else-if="auction.remaining_hours >= 24"
        class="d-inline-flex align-items-center remaining-time"
      >
        <ClockBackSvg />
        <div class="text-capitalize">{{ auction.remaining_time }}</div>
      </div>

      <div v-if="auction.auction_items && auction.auction_items.length > 0" class="auct-card-body collection-items">
        <div class="product-image">
          <ProductThumb :product="auction.auction_items[0].inventory.product" overlay />
        </div>
        <div v-if="auction.type === AUCTION_TYPE_COLLECTION" class="d-flex justify-content-center collection-product-imgs">
          <div v-for="item in auction.auction_items.slice(0, 2)" :key="item.id" class="collection-product-img">
            <ProductThumb :product="item.inventory.product" overlay />
          </div>
          <div v-if="auction.auction_items.length > 2" class="collection-product-img">
            <ProductThumb :product="auction.auction_items[2].inventory.product" overlay />
            <span class="collection-product-img-overlay">+{{ auction.auction_items.length - 2 }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-end mt-2 mt-md-3">
      <div class="w-100 overflow-hidden">
        <div v-if="auction.type === AUCTION_TYPE_SINGLE">
          <h5 class="auct-card-title mb-03">{{ auction.auction_items[0].inventory.product.name }}</h5>
          <div class="auct-card-text mb-md-1 mb-0" :class="{'small-card': small }">
            <span class="auct-card-text-colorway">{{ auction.auction_items[0].inventory.color }}</span>
            <span class="auct-card-text-size d-none d-md-block">,&nbsp;{{ `${$t('auctions.frontpage.size')} ${auction.auction_items[0].inventory.size.size}` }}</span>
          </div>
        </div>
        <div v-else>
          <h5 class="auct-card-title mb-03 text-capitalize">{{ auction.name }}</h5>
          <div class="auct-card-text mb-md-1 mb-0" :class="{'small-card': small }">
            <span v-for="(cat, idx) in auction.categories" :key="cat" class="auct-card-text-colorway">
              <span v-if="idx !== 0">&nbsp;&amp;&nbsp;</span>
              {{ $t(`common.categories.${cat}`) }}
            </span>
          </div>
        </div>
        <div class="d-flex align-items-end justify-content-between">
          <div class="auct-card-price">${{ (auction.highest_bid || auction.start_bid_price) / 100 }}<span class="auct-card-text-size d-md-none ml-1">({{ `${$t('auctions.frontpage.size')} ${auction.auction_items[0].inventory.size.size}` }})</span></div>
          <nuxt-link :to="auction.type === AUCTION_TYPE_COLLECTION ? `/auction/collection/${auction.id}` : `/auction/${auction.id}`" class="bid-now-btn-link">
            <button v-if="!small" class="btn bid-now-btn text-nowrap">{{ $t('home_page.bid_now') }}</button>
            <button v-else class="btn bid-now-btn small">{{ $tc('common.bid', 1) }}</button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="auct-card-quick-btns" :class="{ 'show-actions' : watchlistShow || shareShow }">
      <div class="d-flex align-items-center justify-content-center">
        <div class="round-btn" role="button">
          <Icon
            :id="`popover-watchlist-${auction.id}-${type}`"
            src="eye.svg"
            hover-src="red-eye.svg"
            :active="watchlistShow || !!watchlist"
            width="15"
            height="15"
            tabindex="0"
            disableHover
            class="action-icon"
            :alt-text="watchlist ? watchlist.name : ''"
            :tooltip-text="watchlist ? watchlist.name : ''"
            @click="removeFromWatchList"
          />
        </div>
        <div class="divider"></div>
        <div :id="`popover-share-${auction.id}-${type}`" class="round-btn" role="button" ><share-icon></share-icon></div>
      </div>
    </div>
    <WatchlistPopover
      v-if="!watchlist"
      :auction="auction"
      :target="`popover-watchlist-${auction.id}-${type}`"
      @show="watchlistShow = true"
      @hidden="watchlistShow = false"
      @watchlisted="onWatchlisted"
    />
    <b-popover
      ref="sharePopover"
      :target="`popover-share-${auction.id}-${type}`"
      triggers="hover"
      placement="bottom"
      :container="`popover-share-${auction.id}-${type}`"
      custom-class="watchlist-popover"
      delay="200"
      @show="shareShow = true"
      @hidden="shareShow = false"
    >
      <ShareButton
        :url="shareUrl + auction.id"
        :title="auctionName"
        :description="''"
      />
    </b-popover>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import {AUCTION_TYPE_COLLECTION, AUCTION_TYPE_SINGLE, WATCHLIST_TYPE_AUCTION} from '~/static/constants';
import WatchlistPopover from '~/components/watchlist/Popover'
import ShareButton from '~/components/common/ShareButton'
import ShareIcon from '~/assets/img/icons/share.svg?inline'
import ProductThumb from '~/components/product/Thumb'
import Icon from '~/components/common/Icon.vue'
import ClockBackSvg from '~/assets/img/icons/clock-back.svg?inline'
import CalendarIcon from '~/assets/img/icons/calendar-black.svg?inline'

export default {
  name: 'AuctionCard',
  components: {
    WatchlistPopover,
    ShareButton,
    ShareIcon,
    Icon,
    ProductThumb,
    ClockBackSvg,
    CalendarIcon,
  },
  filters: {

  },
  props: {
    auction: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      AUCTION_TYPE_COLLECTION,
      AUCTION_TYPE_SINGLE,
      shareShow: false,
      shareUrl: `${process.env.APP_URL}/auction/`,
      watchlistShow: false,
      watchlist: null,
    }
  },
  computed: {
    auctionName() {
      if (this.auction) {
        if (this.auction.type === AUCTION_TYPE_COLLECTION) {
          return this.auction.name
        }
        if (this.auction.auction_items && this.auction.auction_items.length > 0) {
          return this.auction.auction_items[0].inventory.product.name
        }
      }
      return ''
    },
  },
  watch: {
    auction(newV) {
      this.watchlist = newV.watchlist_item?.watchlist
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.item
  margin-bottom: 44px
  @media (max-width: 576px)
    margin-bottom: 31px
.auct-card
  &-quick-btns.show-actions
    opacity: 1
  .remaining-time
    background: $dark-gray-8
    padding: 4px 8px 4px 6px
    color: $black
    min-width: 90px
    min-height: 30px
    justify-content: center
    svg
      margin-right: 10px
      width: 24px
      path
        stroke: currentColor
    div
      @include body-5-medium
::v-deep
  .thumb-wrapper
    img
      padding: 0 !important
    .overlay
      background: rgba(180, 180, 180, 0.08)
.collection-product-imgs
  ::v-deep
    .thumb-wrapper
      .overlay
        background: rgba(153, 153, 153, 0.1)

@media (max-width: 576px)
  .auct-card
    .remaining-time
      padding: 4px 8px 4px 6px
      min-width: 70px
      min-height: 25px
      svg
        margin-right: 10px
        width: 15px
        height: 15px
        path
          stroke: currentColor
      div
        font-size: 10px
        line-height: 11px
.mb-03
  margin-bottom: 3px
</style>
