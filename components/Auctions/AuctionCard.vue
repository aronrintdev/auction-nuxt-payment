<template>
  <div v-if="auction" class="mb-4 item">
    <nuxt-link :to="`/auction/${auction.id}`">
      <div class="thumbnail auct-card">
        <div class="d-flex align-items-end justify-content-between pa-0 h-auto">
          <div class="auct-current-bid">
            <div class="text-uppercase mb-1">{{ $t('home_page.current_bid') }}</div>
            <div class="auct-bid-price">${{ auction.highest_bid | formatPrice }}</div>
          </div>
          <div class="bids-count">{{ `${auction.bids.length} ${$t('home_page.bidnow_text')}` }}</div>
        </div>

        <div v-if="auction.auction_items && auction.auction_items.length > 0" class="auct-card-body">
          <div class="product-image my-3">
            <ProductThumb :product="auction.auction_items[0].inventory.product" overlay />
          </div>
          <div class="auct-card-body-title pt-1">
            <h5 class="auct-card-title text-left">{{ auction.auction_items[0].inventory.product.name }}</h5>
            <p class="auct-card-text text-left">
              <span class="auct-card-text-colorway">{{ auction.auction_items[0].inventory.color }},&nbsp;</span>
              <span class="auct-card-text-size">{{ `${$t('common.size')} ${auction.auction_items[0].inventory.size.size}` }}</span>
            </p>
            <div class="d-flex justify-content-between text-danger">
              <div class="text-left text-capitalize bid-description-text text-bold">{{ $t('home_page.timeremaining') }}</div>
              <div class="text-right text-capitalize bid-description-text">{{ auction | remainingTime('short') }}</div>
            </div>
            <div v-if="auction.type === AUCTION_TYPE_SINGLE" class="row">
              <div class="col-12 mt-4">
                <button class="w-100 btn btn-outline-primary bid-now-btn">{{ $t('home_page.bid_now') }}</button>
              </div>
            </div>
          </div>
        </div>
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
    </nuxt-link>
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
