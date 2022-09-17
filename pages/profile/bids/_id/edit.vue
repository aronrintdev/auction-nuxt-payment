<template>
  <b-container fluid class="container-profile-auctions h-100">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="title">{{ $t('bids.bids_summary') }}</h2>
      <span role="button" class="view-similar mt-2 "
      >{{$t('bids.view_similar')}}</span>
    </div>
    <div v-if="selectedBid">
      <BidAuctionSummary/>
    </div>

    <div v-if="selectedBid && isHighest && isLive"  class="mt-4">
      <AutoBidSettings @update-bid="fetchSingleBid"/>
    </div>

    <div v-if="selectedBid">
      <div class="d-flex mt-4 mx-1">
        <div class="mr-5" role="button" @click="changeTab(BIDS_TAB_ALL)">
          <h2 class="title" :class="{'non-active': bidsTab === BIDS_TAB_YOUR}">{{ $t('bids.all_bids') }}
            ({{ bidsTotal }})</h2>
        </div>
        <div role="button" @click="changeTab(BIDS_TAB_YOUR)">
          <h2 class="title " :class="{'non-active': bidsTab === BIDS_TAB_ALL}">{{ $t('bids.your_bids') }}
            ({{ myBidsTotal }})</h2>
        </div>
      </div>

      <div v-if="bidsLoading" class="mx-auto my-5">
        <Loader :loading="bidsLoading"/>
      </div>

      <div v-else>
        <SummaryBid v-for="bid in bidsForList" :key="bid.id" :bid="bid" :is-mine="isBidMine(bid)" :is-highest="isHighestBid(bid)" />
      </div>


      <div class="d-flex align-items-center justify-content-center">
        <Button
          variant="primary"
          class="bg-blue-2 mt-3"
          :disabled="bidsLoading"
          @click="fetchBids(true)"
        >{{ $t('bids.view_more') }}
        </Button
        >
      </div>
    </div>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import BidAuctionSummary from '~/components/profile/bids/BidAuctionSummary';
import SummaryBid from '~/components/profile/bids/SummaryBid';
import {Button, Loader} from '~/components/common';
import {AUCTION_BIDS_PER_PAGE, BIDS_TAB_ALL, BIDS_TAB_YOUR} from '~/static/constants';
import AutoBidSettings from '~/components/profile/bids/AutoBidSettings';

export default {
  name: 'Edit',
  components: {AutoBidSettings, SummaryBid, BidAuctionSummary, Button, Loader},
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
      myBids: []
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
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.view-similar
  @include body-4
  color: $color-blue-2
  width: 200px
  font-weight: $normal

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none

.container-profile-auctions
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1
    font-weight: $bold

    &.non-active
      color: $color-gray-47

  h3.title
    @include heading-2
    color: $color-black-1
    font-weight: $bold
</style>
