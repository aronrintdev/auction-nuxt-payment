<template>
  <div v-if="auction" class="mb-4 item">
    <div class="thumbnail auct-card">
      <div class="d-flex justify-content-end">
        <b-checkbox
          v-if="selectable"
          class="check-box m-n2"
          :checked="selected"
          @change="toggleSelect"
        ></b-checkbox>
      </div>
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
              <button disabled class="w-100 btn btn-outline-primary bid-now-btn">{{ $t('home_page.bid_now') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="auction.type === AUCTION_TYPE_COLLECTION" class="d-flex justify-content-center collection-product-imgs">
      <div v-for="auctionItem in auction.auction_items.slice(0, 2)" :key="auctionItem.id" class="collection-product-img">
        <ProductThumb :product="auctionItem.inventory.product" overlay />
      </div>
      <div v-if="auction.auction_items.length > 2" class="collection-product-img">
        <ProductThumb :product="auction.auction_items[2].inventory.product" overlay />
        <span class="collection-product-img-overlay">+{{ auction.auction_items.length - 2 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {AUCTION_TYPE_COLLECTION, AUCTION_TYPE_SINGLE} from '~/static/constants';
import ProductThumb from '~/components/product/Thumb'

export default {
  name: 'WatchlistAuctionCard',
  components: {
    ProductThumb,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      AUCTION_TYPE_COLLECTION,
      AUCTION_TYPE_SINGLE,
    }
  },
  computed: {
    auction() {
      return this.item && this.item.watchlist_itemable
    }
  },
  methods: {
    toggleSelect(checked) {
      this.$emit('select', this.item.id, checked)
    },
  }
}
</script>
