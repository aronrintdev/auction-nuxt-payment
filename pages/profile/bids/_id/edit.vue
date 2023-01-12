<template>
  <b-container fluid class="container-profile-auctions h-100">
    <div class="d-flex justify-content-between align-items-center summary-header">
      <h2 class="title mb-0">{{ $t('bids.bids_summary') }}</h2>
      <span role="button" class="view-similar mt-0 mt-md-2" @click="viewSimilarAuction">{{$t('bids.view_similar')}}</span>
    </div>
    <div v-if="selectedBid" class="d-none d-md-block">
      <BidAuctionSummary />
    </div>
    <div v-if="selectedBid" class="d-md-none">
      <BidAuctionSummaryMobile :bid="selectedBid" />
    </div>

    <div v-if="selectedBid && isHighest && isLive"  class="mt-4">
      <AutoBidSettings @update-bid="fetchSingleBid"/>
    </div>

    <div v-if="selectedBid" class="bids-container">
      <div class="d-none d-md-flex auction-bids">
        <div class="mr-5" role="button" @click="changeTab(BIDS_TAB_ALL)">
          <h2 class="title" :class="{'non-active': bidsTab === BIDS_TAB_YOUR}">{{ $t('bids.all_bids') }}
            ({{ bidsTotal }})</h2>
        </div>
        <div role="button" @click="changeTab(BIDS_TAB_YOUR)">
          <h2 class="title " :class="{'non-active': bidsTab === BIDS_TAB_ALL}">{{ $t('bids.your_bids') }}
            ({{ myBidsTotal }})</h2>
        </div>
      </div>

      <b-row class="d-none d-md-flex mx-0 item-header-row">
        <b-col cols="4" md="5" class="text-left pl-3">
          {{ $t('auction.recent_history') }}
        </b-col>
        <b-col cols="4" md="5" class="d-flex flex-column align-items-center justify-content-center">
          {{ $t('auction.bid_amount') }}
        </b-col>
        <b-col cols="4" md="2" class="d-flex flex-column align-items-center justify-content-center text-center">
          {{ $t('auction.date_time') }}
        </b-col>
      </b-row>

      <div class="d-md-none">
        <div class="bids-history-xs">{{ $t('auction.bid_history') }}</div>
        <NavGroup
          :data="tabOptions"
          :value="bidsTab"
          nav-key="auctions_ending_soon"
          class="section-nav"
          @change="changeTab"
        />
      </div>

      <div v-if="bidsLoading" class="mx-auto my-5">
        <Loader :loading="bidsLoading"/>
      </div>

      <div v-else>
        <SummaryBid v-for="bid in bidsForList" :key="bid.id" :bid="bid" :is-mine="isBidMine(bid)" :is-highest="isHighestBid(bid)" />
      </div>


      <div class="d-flex align-items-center justify-content-center">
        <Button
          v-if="bidsForList && bidsTotal > bidsForList.length"
          variant="primary"
          class="bg-blue-2 mt-3"
          :disabled="bidsLoading"
          @click="fetchBids(true)"
        >{{ $t('bids.view_more') }}
        </Button
        >
      </div>
    </div>
    <client-only>
      <Portal to="page-title"><span class="pl-2">{{ $tc('common.bid', 2) }}</span></Portal>
      <!-- If back icons needed -->
      <Portal to="back-icon-slot">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="pl-2"
          @click="$router.push('/profile/bids/outgoing')"
        />
      </Portal>
    </client-only>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import BidAuctionSummary from '~/components/profile/bids/BidAuctionSummary';
import BidAuctionSummaryMobile from '~/components/profile/bids/BidAuctionSummaryMobile';
import SummaryBid from '~/components/profile/bids/SummaryBid';
import {Button, Loader, NavGroup} from '~/components/common';
import {AUCTION_BIDS_PER_PAGE, BIDS_TAB_ALL, BIDS_TAB_YOUR} from '~/static/constants';
import AutoBidSettings from '~/components/profile/bids/AutoBidSettings';

export default {
  name: 'Edit',
  components: {AutoBidSettings, SummaryBid, BidAuctionSummary, Button, Loader, NavGroup, BidAuctionSummaryMobile},
  layout: 'Profile',
  data() {
    return {
      BIDS_TAB_ALL,
      BIDS_TAB_YOUR,
      bidsTab: BIDS_TAB_ALL,
      bidsLoading: false,
      take: AUCTION_BIDS_PER_PAGE,
      bidsTotal: 0,
      myBidsTotal: 0,
      myBids: [],
      tabOptions: [{
        label: this.$t('bids.all_bids'),
        value: BIDS_TAB_ALL,
      }, {
        label: this.$t('bids.your_bids'),
        value: BIDS_TAB_YOUR,
      }]
    }
  },
  computed: {
    ...mapGetters({
      selectedBid: 'profile-bids/getSelectedBid',
    }),
    selectedAuctionBids() {
      return this.selectedBid.auction.bids
    },
    /**
     * A computed property that returns the bids for the current tab.
     * @returns {default.computed.selectedBid.auction.bids|[]}
     */
    bidsForList(){
      return this.bidsTab === BIDS_TAB_ALL? this.selectedAuctionBids : this.myBids
    },
    /**
     * Checking if the bid is the highest bid.
     * @returns {boolean}
     */
    isHighest(){
      return this.selectedBid.auction.highest_bid === this.selectedBid.price
    },
    isLive(){
      return this.selectedBid.auction.status === 'live'
    },
    /**
     * A computed property that returns a function that checks if the given bid is the highest bid.
     * @returns {function(*): boolean}
     */
    isHighestBid(){
      return (bid) => this.selectedBid.auction.highest_bid === bid.price
    }
  },
  mounted() {
    // check if user came from index page which sets store, if not fetch Bid with id from route and fetch bids of auction
    if (this.selectedBid) {
      const ParamID = parseInt(this.$route.params.id)
      if (ParamID && this.selectedBid.id !== ParamID)
        this.fetchSingleBid()
      else {
        this.fetchBids()
        this.fetchBids(false, BIDS_TAB_YOUR)
      }
    } else if (this.$route.params.id) {
      this.fetchSingleBid()
    }else {
      this.$router.back()   // if param is not set or user did not select bid, then go back
    }
  },
  methods: {
    ...mapActions({
      getAuctionBids: 'profile-bids/getAuctionBids',
      getMyAuctionBids: 'profile-bids/getMyAuctionBids',
      getSingleBid: 'profile-bids/getSingleBid',
      setProductFilter: 'auction/setProductFilter',
    }),
    /**
     * A method that changes the tab of the bids.
     * @param tab
     */
    changeTab(tab) {
      this.bidsTab = tab
      this.take = AUCTION_BIDS_PER_PAGE
      this.fetchBids(false, tab)
    },
    isBidMine(bid) {
      return bid.user_id === this.$auth.user.id
    },
    /**
     *  Fetching the bid with the id from the route.
     */
    fetchSingleBid() {
      this.getSingleBid({id: this.$route.params.id}).then(res => {
        this.$store.commit('profile-bids/setSelectedBid', res.data)
        this.$nextTick(() => {
          this.fetchBids()
        })
      }).catch(err => {
        this.$toasted.error(err.message || err.data.error)
      })
    },
    /**
     * Fetching the bids for the auction.
     * @param moreBids
     * @param allOrYours Param for fetching either user's bids or all bids of auction
     */
    fetchBids(moreBids = false, allOrYours = BIDS_TAB_ALL) {
      if (moreBids)
        this.take += AUCTION_BIDS_PER_PAGE
      const payload = {
        id: this.selectedBid.auction.id, // id of selected bid's auction
        take: this.take, // param for backend to fetch only limited number of rows
        page: this.page // page number for pagination
      }
      this.bidsLoading = true
      let promise = this.getAuctionBids(payload)
      if (allOrYours === BIDS_TAB_YOUR) // requested bids type equal tab of users bids then fetch users auctions
        promise = this.getMyAuctionBids(payload)

      promise.then(res => {
        // depending on created promise type, sets selected auction's bids in sorted way
        // or just sets myBids of component for showing only users bids which made to selected auction
        if (allOrYours === BIDS_TAB_ALL)
          this.$store.commit('profile-bids/setSelectedAuctionBids', res.data.data.sort((a, b) => b.price - a.price))
        else
          this.myBids = res.data.data

        if (allOrYours === BIDS_TAB_ALL)
          this.bidsTotal = res.data.total
        else
          this.myBidsTotal = res.data.total
      }).catch(err => {
        this.$toasted.error(err.message || err.data.error)
      }).finally(() => {
        this.bidsLoading = false
      })
    },
    viewSimilarAuction() {
      const product = this.selectedBid.auction.auction_items[0].inventory.product
      this.setProductFilter({ sku: product.sku, name: product.name })
      this.$router.push('/auction')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.view-similar
  @include body-4
  font-family: $font-sp-pro
  color: $color-blue-2
  font-weight: $normal

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none

.container-profile-auctions
  padding: 42px 40px
  background-color: $color-white-5
  .item-header-row
    font-family: $font-montserrat
    font-weight: $bold
    @include body-4
    color: $black
    margin-bottom: 15px
    padding: 0 47px
  .summary-header
    margin-bottom: 36px
  h2.title
    font-family: $font-montserrat
    font-weight: $bold
    @include body-16
  .auction-bids
    margin: 31px 6px 24px
    &:first-child
      margin-right: 59px
    h2.title
      font-family: $font-sp-pro
      font-weight: $bold
      @include body-2
      color: $black
      margin: 0
      &.non-active
        color: $color-gray-47

  h3.title
    @include heading-2
    color: $color-black-1
    font-weight: $bold
  
  .bids-container
    margin: 0 -15px

  @media (max-width: 576px)
    padding: 20px 16px
    background: $white
    min-height: 100vh
    .summary-header
      margin-bottom: 26px
    .bids-history-xs
      font-family: $font-montserrat
      font-weight: $medium
      @include body-5
      color: $black
      margin: 25px 0 26px
    .nav-group
      margin-bottom: 21px
    h2.title
      margin-bottom: 0
      font-family: $font-montserrat
      font-weight: $medium
      @include body-5
      color: $black
    .view-similar
      font-weight: $normal
      font-family: $font-sp-pro
      @include body-1214
      text-decoration-line: underline
      color: $color-blue-20
      width: auto
    .bids-container
      margin: 0
</style>
