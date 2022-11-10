<template>
  <div class="collection-browser">
    <div class="collection-browser-banner">
      <img src="~/assets/img/auctions/collection-browse-bg.png" class="d-none d-md-block w-100" />
      <img src="~/assets/img/auctions/auctioncollectionsmobiledoubled2.png" class="d-md-none w-100" />
    </div>
    <div v-if="activeAuction" class="pt-3 px-3 px-md-5 py-md-4">
      <!-- [mobile] time remaining block -->
      <mobile-time-remaining
        :is-expired="isExpired"
        :is-scheduled="isScheduled"
        :is-sold="isSold"
        :end-at="mobileTimeRemainingDate"
      />
      <div class="d-flex align-items-center justify-content-between justify-content-md-start mb-0 mb-md-2 collection-browser-id">
        <span>{{ `${$t('auctions.frontpage.auction_id')} #${activeAuction.id}` }}</span>
        <div class="round-btn ml-4" role="button">
          <Icon
            src="eye.svg"
            hover-src="red-eye.svg"
            :active="!!watchlist"
            width="22"
            height="22"
            tabindex="0"
            disableHover
            class="action-icon"
            :alt-text="watchlist ? watchlist.name : ''"
            :tooltip-text="watchlist ? watchlist.name : ''"
          />
        </div>
      </div>
      <div class="collection-browser-name mb-3 mb-md-2">{{ activeAuction.name }} ({{ activeAuction.auction_items && activeAuction.auction_items.length }} {{ $t('common.items') }})</div>
      <!-- estimate value & time remaining -->
      <div class="d-flex align-items-end justify-content-between">
        <div v-if="isSold" class="text-uppercase estimate-value">
          <div class="estimate-value-label">{{ $t('auctions.bid_details.highest_bid') }}</div>
          <div class="estimate-value-price">${{ activeAuction.highest_bid | formatPrice }}</div>
        </div>
        <div v-else-if="isScheduled" class="text-uppercase estimate-value">
          <div class="estimate-value-label">{{ $t('auction.estimate_value') }}</div>
          <div class="estimate-value-price">${{ estimatedLowPrice | formatPrice }} - ${{ estimatedHighPrice | formatPrice }}</div>
        </div>
        <div v-else-if="isExpired" class="text-uppercase estimate-value">
          <div class="estimate-value-label">{{ $t('auction.estimate_value') }}</div>
          <div class="estimate-value-price">${{ estimatedLowPrice | formatPrice }} - ${{ estimatedHighPrice | formatPrice }}</div>
        </div>
        <div v-else class="text-uppercase estimate-value">
          <div class="estimate-value-label">{{ $t('auctions.frontpage.current_bid') }}</div>
          <div class="estimate-value-price">${{ (activeAuction.highest_bid || activeAuction.start_bid_price) | formatPrice }}</div>
        </div>
        <div class="d-none d-md-block">
          <!-- Sold -->
          <div v-if="isSold" class="d-flex flex-column align-items-center justify-content-center sold-status">
            <span>{{ $t('auction.status_array.sold') }}</span>
            <div class="d-flex mt-3"><span class="date">{{ formatDate(activeAuction.updated_at) }}</span><span class="ml-2 time">@ {{ formatTime(activeAuction.end_date) }}</span></div>
          </div>
          <!-- Expired mark -->
          <div v-else-if="isExpired" class="d-flex flex-column align-items-center justify-content-center expired-status">
            <span>{{ $t('auction.status_array.expired') }}</span>
            <div class="d-flex mt-3"><span class="date">{{ formatDate(activeAuction.end_date) }}</span><span class="ml-2 time">@ {{ formatTime(activeAuction.end_date) }}</span></div>
          </div>
          <!-- Scheduled -->
          <div v-else-if="isScheduled" class="d-flex flex-column align-items-center justify-content-center scheduled-status">
            <span>{{ $t('auction.status_array.scheduled') }}</span>
            <div class="d-flex mt-3"><span class="date">{{ formatDate(activeAuction.scheduled_date) }}</span><span class="ml-2 time">@ {{ formatTime(activeAuction.end_date) }}</span></div>
          </div>
          <div v-else class="d-flex justify-content-center time-remaining">
            <div class="time d-flex flex-column justify-content-center align-items-center">
              <div class="time-value">{{ timeRemaining.days }}</div>
              <div class="time-unit mt-4 text-lowercase ">{{ $t('promotions.days') }}</div>
            </div>
            <div class="time d-flex flex-column justify-content-center align-items-center">
              <div class="time-value">{{ timeRemaining.hours }}</div>
              <div class="time-unit mt-4 text-lowercase">{{ $t('promotions.hours') }}</div>
            </div>
            <div class="time d-flex flex-column justify-content-center align-items-center">
              <div class="time-value">{{ timeRemaining.mins }}</div>
              <div class="time-unit mt-4 text-lowercase">{{ $t('promotions.mins') }}</div>
            </div>
            <div class="time d-flex flex-column justify-content-center align-items-center">
              <div class="time-value">{{ timeRemaining.secs }}</div>
              <div class="time-unit mt-4 text-lowercase">{{ $t('promotions.secs') }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- auction details -->
      <div class="d-flex flex-column flex-md-row mt-4 mt-md-5">
        <div class="auction-details">
          <div class="auction-details-title mb-3">{{ $t('auctions.frontpage.details') }}</div>
          <div class="auction-details-content">
            <div class="mt-0 mt-md-2 d-flex align-items-center justify-content-between">
              <span>{{ $t('auctions.frontpage.estimated_value') }}</span>
              <span>${{ estimatedLowPrice | formatPrice }} - ${{ estimatedHighPrice | formatPrice }}</span>
            </div>
            <div class="mt-2 mt-md-3 d-flex align-items-center justify-content-between">
              <span>{{ $t('auctions.frontpage.number_of_bids') }}</span>
              <span class="text-primary">{{ activeAuction.bids ? activeAuction.bids.length : 0 }}</span>
            </div>
            <div class="mt-2 mt-md-3 d-flex align-items-center justify-content-between">
              <span>{{ $t('auctions.frontpage.watchers') }}</span>
              <span>{{ activeAuction.number_of_bidders }}</span>
            </div>
            <div class="mt-2 mt-md-3 d-flex align-items-center justify-content-between">
              <span>{{ $t('auctions.frontpage.auctioneer_rating') }}</span>
              <span>97%</span> <!-- Todo -->
            </div>
          </div>
        </div>
        <div class="auction-details auction-details-description">
          <div class="auction-details-title mb-0 mb-md-3">{{ $t('auctions.frontpage.description') }}:</div>
          <!-- todo -->
          <div class="auction-details-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit consectetur risus sed diam eu est cursus senectus. Dui tincidunt non venenatis, consequat fusce sit consequat viverra amet. Quis convallis quam amet arcu suspendisse 
          </div>
        </div>
      </div>
      <!-- Collection items -->
      <div class="collection-items mt-0 mt-md-5">
        <div class="collection-items-title">{{ $t('auctions.frontpage.collection_items') }}</div>
        <div class="d-flex flew-wrap collection-items-list">
          <nuxt-link v-for="(item, index) in activeAuction.auction_items" :key="item.id" :to="`/auction/${activeAuction.id}`" class="item">
            <div class="thumbnail auct-card">
              <div class="d-inline-flex align-items-center justify-content-center number">
                {{ index + 1 }} {{ $t('common.of') }} {{ activeAuction.auction_items.length }}
              </div>
              <div class="auct-card-body mt-3">
                <div class="product-image">
                  <ProductThumb :product="item.inventory.product" overlay />
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-end mt-3">
              <div class="flex-grow-1 overflow-hidden mr-4">
                <h5 class="auct-card-title mb-1">{{ item.inventory.product.name }}</h5>
                <div class="auct-card-text mb-1">
                  <span class="auct-card-text-colorway">{{ item.inventory.color }},&nbsp;</span>
                  <span class="auct-card-text-size">{{ $t('common.box_condition') }}: {{ item.inventory.packaging_condition.name  }}</span>
                </div>
                <div class="auct-card-price">{{ `${$t('auctions.frontpage.size')} ${item.inventory.size.size}` }}</div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="pt-5 d-md-none">
        <nuxt-link :to="`/auction/${activeAuction.id}`" class="w-100 d-flex align-items-center justify-content-center view-auction-btn">{{ $t('bids.view') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

import Icon from '~/components/common/Icon.vue'
import MobileTimeRemaining from '~/components/Auctions/MobileTimeRemaining'
import {
  EXPIRED_STATUS,
  COMPLETED_STATUS,
  SCHEDULED_STATUS,
} from '~/static/constants'

export default {
  name: 'AuctionCollectionBrowser',
  components: {
    Icon,
    MobileTimeRemaining,
  },
  layout: 'IndexLayout',
  data() {
    return {
      auction: null,
      loading: false,
      watchlist: null,
      timeRemaining: {
        days: '00',
        mins: '00',
        secs: '00',
        hours: '00',
      },
    }
  },
  computed: {
    ...mapGetters({
      activeAuction: 'auction/activeAuction',
    }),
    isExpired() {
      return this.activeAuction && this.activeAuction.remaining_time === EXPIRED_STATUS
    },
    isScheduled() {
      return this.activeAuction && this.activeAuction.status === SCHEDULED_STATUS
    },
    isSold() {
      return this.activeAuction && this.activeAuction.status === COMPLETED_STATUS
    },
    mobileTimeRemainingDate() {
      if (!this.activeAuction) return null
      if (this.isSold) return this.activeAuction.updated_at
      if (this.isScheduled) return this.activeAuction.scheduled_date
      return this.activeAuction.end_date
    },
    estimatedLowPrice() {
      return this.activeAuction ? this.activeAuction.start_bid_price : 0
    },
    estimatedHighPrice() {
      return this.activeAuction ? Math.round(this.activeAuction.start_bid_price * 1.84 / 1000) * 1000 : 0
    }
  },
  watch: {
    activeAuction(newV) {
      this.watchlist = newV.watchlist_item?.watchlist
      setInterval(() => {
        this.timeRemaining = this.getDiff()
      }, 1000);
    },
  },
  mounted() {
    this.loadAuction()
  },
  methods: {
    ...mapActions({
      getAuctionDetails: 'auction/getAuctionDetails',
    }),
    // Load auction details
    loadAuction() {
      this.loading = true
      const { id: auctionId } = this.$route.params
      this.getAuctionDetails(auctionId)
    },
    getDiff() {
      const endingTimestamp = new Date(this.activeAuction.end_date).valueOf()
      const currentTimestamp = new Date().valueOf()
      let diffInSeconds = (endingTimestamp - currentTimestamp) / 1000
      if (diffInSeconds > 0) {
        const days = parseInt(diffInSeconds / 86400)
        diffInSeconds = diffInSeconds - days * 86400
        const hours = parseInt(diffInSeconds / 3600)
        diffInSeconds = diffInSeconds - hours * 3600
        const mins = parseInt(diffInSeconds / 60)
        const secs = Math.ceil(diffInSeconds % 60)
        return {
          days: days < 10 ? `0${days}` : days,
          hours: hours < 10 ? `0${hours}` : hours,
          mins: mins < 10 ? `0${mins}` : mins,
          secs: secs < 10 ? `0${secs}` : secs,
        }
      }
      return {
        days: '00',
        mins: '00',
        secs: '00',
        hours: '00',
      }
    },
    formatTime(time) {
      return dayjs(time).format('h:mm A')
    },
    formatDate(date) {
      return dayjs(date).format('MMM DD YYYY')
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.collection-browser
  &-id
    @include heading-7
    color: $black
  &-name
    font-weight: $regular
    @include body-17
    color: $black
  .estimate-value
    &-label
      font-weight: $medium
      @include body-1
      color: $black
    &-price
      font-weight: $medium
      @include body-36
      letter-spacing: -0.02em
      color: $color-black-10
  .time-remaining
    & > div:last-child
      margin-right: 0
    .time
      width: 115px
      height: 115px
      border: 1px solid $color-gray-23
      margin-right: 30px
      &-value
        font-family: $font-sp-pro
        font-weight: $normal
        @include body-1
        color: $black
      &-unit
        font-family: $font-sp-pro
        font-weight: $light
        @include body-4
        color: $black
  .auction-details
    flex: 1
    padding: 20px 30px
    background: $color-white-10
    &-description
      margin-left: 50px
      .auction-details-content
        font-family: $font-sp-pro
        font-weight: $normal
        @include body-24
        color: $color-gray-5
    &-title
      font-weight: $medium
      @include body-4
      color: $black
    &-content
      font-weight: $normal
      @include body-4
      color: $black
  .collection-items
    &-title
      font-family: $font-sp-pro
      font-weight: $bold
      @include body-2
      color: $black
      border-bottom: 0.5px solid $light-gray-2
      padding: 14px 30px
    &-list
      padding: 40px 0
      margin: 0 -12px
      .item
        flex: 0 0 25%
        max-width: 25%
        padding: 12px
        .number
          font-weight: $medium
          @include body-5
          color: $black
          background: $dark-gray-8
          width: 94px
          height: 30px
        .thumb-wrapper::v-deep
          .overlay
            background: rgba(200, 200, 200, 0.1)
        .auct-card
          background: $color-white-4
          padding: 20px
          &-title
            font-family: $font-sp-pro
            font-weight: $medium
            @include body-8
            color: $black
          &-text
            font-family: $font-sp-pro
            font-weight: $normal
            @include body-5
            color: $color-gray-5
          &-price
            font-weight: $bold
            @include body-2
            color: $black
  .expired-status,
  .scheduled-status,
  .sold-status
    background: transparent
    padding: 20px 0
    width: 550px
    border: 1px solid $color-gray-23
    span
      font-weight: $normal
      font-family: $font-sp-pro
      @include body-2
      color: $color-gray-5
      &.time
        @include body-2
        color: $color-gray-5
      &.date
        @include body-2
        color: $black
  @media (max-width: 576px)
    &-id
      padding-top: 10px
      border-top: 1px solid $color-gray-16f
      @include body-3
    &-name
      @include body-8
    .estimate-value
      &-label
        font-weight: $medium
        @include body-8
      &-price
        @include body-1
    .auction-details
      padding: 0
      background: transparent
      width: 100%
      &-description
        margin-left: 0
        .auction-details-content
          @include body-1424
      &-title
        @include body-4
      &-content
        @include body-5
        margin: 10px 0 24px
    .collection-items
      &-title
        display: none
      &-list
        padding: 0
        margin: 0 -8px
        .item
          flex: 0 0 50%
          max-width: 50%
          padding: 8px
          .number
            @include body-18
            width: 70px
            height: 25px
          .auct-card
            padding: 10px 6px
            &-title
              @include body-21
            &-text
              @include body-21
            &-price
              @include body-9
    .view-auction-btn
      background: $color-black-5
      border-radius: 20px
      font-weight: $medium
      @include body-10
      color: $white
      height: 40px
</style>