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
      <div
        v-if="isSold"
        class="d-inline-flex align-items-center remaining-time bg-success text-white"
      >
        <div class="text-capitalize">{{ $t('filter_sidebar.status_options.sold') }}</div>
      </div>
      <div
        v-else-if="isScheduled"
        class="d-inline-flex align-items-center remaining-time danger-bg text-white"
      >
        <CalendarIcon />
        <div class="text-capitalize">{{ auction.scheduled_date | diffForHumans }}</div>
      </div>
      <div
        v-else-if="auction.remaining_hours < 24"
        class="d-inline-flex align-items-center remaining-time danger-bg text-white"
      >
        <ClockBackSvg v-if="auction.remaining_hours"/>
        <div class="text-capitalize">{{ auction.remaining_hours ? auction.remaining_time : $t('filter_sidebar.status_options.expired') }}</div>
      </div>
      <div
        v-else-if="auction.remaining_hours >= 24"
        class="d-inline-flex align-items-center remaining-time danger-bg text-white"
      >
        <ClockBackSvg />
        <div class="text-capitalize">{{ auction.remaining_time }}</div>
      </div>

      <div v-if="auction.auction_items && auction.auction_items.length > 0" class="auct-card-body collection-items">
        <div class="product-image">
          <ProductThumb :product="auction.auction_items[0].inventory.product" overlay />
        </div>
        <div v-if="auction.type === AUCTION_TYPE_COLLECTION" class="d-flex justify-content-center collection-product-imgs">
          <div v-for="it in auction.auction_items.slice(0, 2)" :key="it.id" class="collection-product-img">
            <ProductThumb :product="it.inventory.product" overlay />
          </div>
          <div v-if="auction.auction_items.length > 2" class="collection-product-img">
            <ProductThumb :product="auction.auction_items[2].inventory.product" overlay />
            <span class="collection-product-img-overlay">+{{ auction.auction_items.length - 2 }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="auct-card-details">
      <div v-if="auction.type === AUCTION_TYPE_SINGLE">
        <h5 class="auct-card-title">{{ auction.auction_items[0].inventory.product.name }}</h5>
        <div class="auct-card-text">
          <span class="auct-card-text-colorway">{{ auction.auction_items[0].inventory.color }},&nbsp;</span>
          <span class="auct-card-text-size">{{ `${$t('auctions.frontpage.size')} ${auction.auction_items[0].inventory.size.size}` }}</span>
        </div>
      </div>
      <div v-else>
        <h5 class="auct-card-title text-capitalize">{{ auction.name }}</h5>
        <div class="auct-card-text">
          <span v-for="(cat, idx) in auction.categories" :key="cat" class="auct-card-text-colorway">
            <span v-if="idx !== 0">&nbsp;&amp;&nbsp;</span>
            {{ $t(`common.categories.${cat}`) }}
          </span>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center align-items-md-end">
        <div class="auct-card-price">${{ auction.highest_bid / 100 || auction.start_bid_price / 100 }}</div>
        <nuxt-link :to="`/auction/${auction.id}`">
          <button class="btn bid-now-btn text-nowrap">{{ isScheduled || isSold || isExpired ? $t('common.view') : $tc('common.bid', 1) }}</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {AUCTION_TYPE_COLLECTION, AUCTION_TYPE_SINGLE, SCHEDULED_STATUS, COMPLETED, EXPIRED_STATUS} from '~/static/constants';
import ProductThumb from '~/components/product/Thumb'
import ClockBackSvg from '~/assets/img/icons/clock-back.svg?inline'
import CalendarIcon from '~/assets/img/icons/calendar-black.svg?inline'

export default {
  name: 'WatchlistAuctionCard',
  components: {
    ProductThumb,
    ClockBackSvg,
    CalendarIcon,
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
    },
    isSold() {
      return this.auction.status === COMPLETED
    },
    isScheduled() {
      return this.auction.status === SCHEDULED_STATUS
    },
    isExpired() {
      return this.auction.remaining_time === EXPIRED_STATUS
    }
  },
  methods: {
    toggleSelect(checked) {
      this.$emit('select', this.item.id, checked)
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.item
  padding: 0
  width: 213px
  @media (min-width: 1600px)
    flex: 0 0 25%
    max-width: 25%

.auct-card
  height: 240px
  .remaining-time
    background: $dark-gray-8
    padding: 4px 8px 4px 6px
    color: $black
    min-width: 86px
    min-height: 26px
    justify-content: center
    svg
      margin-right: 10px
      width: 20px
      height: 20px
      path
        stroke: currentColor
    div
      @include body-10
      font-weight: $medium
  .danger-bg
    background: #DD5E5E
  &-text
    font-weight: $normal
  &-details
    padding: 15px 6px 0 10px
  &-title 
    margin-bottom: 3px
  &-text
    margin-bottom: 7px
::v-deep
  .thumb-wrapper
    .overlay
      background: rgba(153, 153, 153, 0.05)
.collection-product-imgs
  ::v-deep
    .thumb-wrapper
      .overlay
        background: rgba(153, 153, 153, 0.1)

@media (max-width: 576px)
  .item
    padding: 0 8px
    max-width: 50%
    float: left
    .auct-card
      &-details
        padding: 8px 0 0 5px
      &-title
        margin-bottom: 1px
      &-text
        margin-bottom: 1px
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
</style>
