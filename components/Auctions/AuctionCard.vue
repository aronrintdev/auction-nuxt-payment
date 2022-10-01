<template>
  <div v-if="auction" class="mb-4 item">
    <div class="thumbnail auct-card">
      <div
        class="d-inline-flex align-items-center remaining-time"
        :class="{ 'bg-danger': auction.status === 'ending_soon' || auction.status === 'expired' }"
      >
        <img src="~/assets/img/icons/clock-back.svg" />
        <div>{{ auction | remainingTime('short') }}</div>
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
    <div class="d-flex justify-content-between align-items-end mt-3">
      <div class="flex-grow-1 overflow-hidden mr-4">
        <div v-if="auction.type === AUCTION_TYPE_SINGLE">
          <h5 class="auct-card-title mb-1">{{ auction.auction_items[0].inventory.product.name }}</h5>
          <div class="auct-card-text mb-1">
            <span class="auct-card-text-colorway">{{ auction.auction_items[0].inventory.color }}</span>
            <span class="auct-card-text-size">,&nbsp;{{ `${$t('auctions.frontpage.size')} ${auction.auction_items[0].inventory.size.size}` }}</span>
          </div>
        </div>
        <div v-else>
          <h5 class="auct-card-title mb-1 text-capitalize">{{ auction.name }}</h5>
          <div class="auct-card-text mb-1">
            <span v-for="(cat, idx) in auction.categories" :key="cat" class="auct-card-text-colorway">
              <span v-if="idx !== 0">&nbsp;&amp;&nbsp;</span>
              {{ $t(`common.categories.${cat}`) }}
            </span>
          </div>
        </div>
        <div v-if="auction.highest_bid" class="auct-card-price">${{ auction.highest_bid | formatPrice }}</div>
        <div v-else class="auct-card-price">{{ $t('sell.sell_now.not_available') }}</div>
      </div>
      <nuxt-link :to="`/auction/${auction.id}`">
        <button class="w-100 btn bid-now-btn text-nowrap">{{ $t('home_page.bid_now') }}</button>
      </nuxt-link>
    </div>
    <div class="auct-card-quick-btns">
      <div class="d-flex align-items-center justify-content-center">
        <div class="round-btn" role="button">
          <Icon
            :id="`popover-watchlist-${auction.id}-${type}`"
            src="eye.svg"
            hover-src="red-eye.svg"
            :active="!!watchlist"
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

export default {
  name: 'AuctionCard',
  components: {
    WatchlistPopover,
    ShareButton,
    ShareIcon,
    Icon,
    ProductThumb,
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
      removeItemsFromWatchList: 'watchlist/removeItemsFromWatchList',
    }),

    onWatchlisted(watchlist) {
      if (watchlist) {
        this.watchlistShow = false
        this.watchlist = watchlist
      }
    },
    removeFromWatchList() {
      if (this.watchlist) {
        this.removeItemsFromWatchList({
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

.auct-card
  .remaining-time
    background: #E2E2E2
    padding: 4px 8px 4px 6px
    img
      margin-right: 10px
      width: 24px
    div
      @include body-5-medium
      color: $black
::v-deep
  .thumb-wrapper
    .overlay
      background: rgba(153, 153, 153, 0.05)
.collection-product-imgs
  ::v-deep
    .thumb-wrapper
      .overlay
        background: rgba(153, 153, 153, 0.1)
</style>
