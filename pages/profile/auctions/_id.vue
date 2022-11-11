<template>
  <b-container fluid class="container-profile-auctions h-100">
    <div class="d-flex align-items-center mt-3">
      <h2 class="title">{{ $tc('auction.auction_summary', 1) }}</h2>
      <div class="ml-4 reserve-not-met-title">
        {{!reserveMet? $t('auction.reserve_no_met'): ''}}
      </div>
    </div>
    <div v-if="selectedAuction">
      <AuctionSummary :auction="selectedAuction"  @update-auction="getUpdatedAuction"/>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-3 mt-md-5 mb-3">
      <h4 class="mb-0 title">{{ $tc('auction.bids', 1) }} ({{selectedAuction?selectedAuction.bids.length: 0}})</h4>
      <Button
        v-if="selectedAuction && sortedBids.length > 0"
        variant="outline-primary"
        pill
        class="send-final-btn"
        @click="selectAction = true"
      >
        {{ $t('auction.send_final') }}
      </Button>
    </div>

    <BulkSelectToolbar
      v-if="selectedAuction"
      ref="bulkSelectToolbar"
      :active="selectAction"
      :selected="selected"
      :unit-label="$tc('auction.bids', selected.length)"
      :total="selectedAuction.bids.length"
      :action-label="$tc(`auction.next`)"
      class="mt-3"
      @close="cancelAction()"
      @selectAll="handleSelectAll()"
      @deselectAll="handleDeselectAll()"
      @submit="handleBulkAction()"
    />

    <b-row class="mt-2 text-center px-0 px-md-5 bids-table-columns font-weight-bold">
      <b-col cols="5" md="5" class="text-left d-flex align-items-center">
        <b-form-checkbox
        v-if="selectAction"
        id="checkbox-1"
        :checked="selectedAll"
        class="custom-checkbox"
        @change="selectAllChange"
      >
          &nbsp;
      </b-form-checkbox> {{ $t('auction.recent_history') }}</b-col>
      <b-col cols="4" md="4">{{ $t('auction.bid_amount') }}</b-col>
      <b-col cols="3" md="3">{{ $t('auction.date_time') }}</b-col>
    </b-row>
    <div v-if="selectedAuction">
      <Bid
        v-for="bid in sortedBids"
        :key="bid.id"
        :bid="bid"
        :is-highest="bid.price===selectedAuction.highest_bid && !isDelistedOrExpired"
        :selectable="selectAction"
        :selected="selected.includes(bid.id)"
        @accept="acceptBid"
        @selected="selectBid"
      />

      <div v-if="!sortedBids.length">
        <b-row class="mt-2 text-center px-0 px-md-5 bids-table-columns">
          <b-col cols="5" md="5" class="text-left">-</b-col>
          <b-col cols="4" md="4">-</b-col>
          <b-col cols="3" md="3">-</b-col>
        </b-row>
      </div>

      <div v-if="totalCount > sortedBids.length" class="d-flex align-items-center justify-content-center">
        <Button
          variant="primary"
          class="bg-blue-2 mt-3"
          :disabled="bidsLoading"
          @click="fetchBids"
        >{{ $t('auction.view_more') }}
        </Button
        >
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-around mt-5 body-5-bold text-gray-24">
      {{$t('auction.no_bid')}}
    </div>

    <Modal
      id="accept-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $tc('auction.accept_body', 1).replace(':amount:', selectedAuction.highest_bid/100) }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="bg-blue-2"
              pill
              :disabled="modalActionLoading"
              @click="acceptBidModalOk"
            >{{ $t('auction.accept') }}</Button>
            <Button
              variant="outline-dark"
              pill
              :disabled="modalActionLoading"
              @click="$bvModal.hide('accept-item-modal')"
            >{{ $t('common.cancel') }}</Button
            >
          </b-row>
        </div>

      </template>
    </Modal>

    <Modal
      id="bid-accepted-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $tc('auction.sold_body', 1) }}<br/>
              {{ $tc('auction.sold_body', 2) }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              iconOnly
              variant="primary"
              pill
            >
              <img :src="whiteCheck"/>
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>

  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {Button, BulkSelectToolbar, Modal} from '~/components/common';
import Bid from '~/components/profile/auctions/Bid';
import AuctionSummary from '~/components/profile/auctions/AuctionSummary';
import whiteCheck from '~/assets/img/icons/white-check.svg'
import {BIDS_PER_PAGE, DELISTED_STATUS, EXPIRED_STATUS} from '~/static/constants';
export default {
  name: 'Details',
  components: {AuctionSummary, Bid, Button, BulkSelectToolbar, Modal},
  layout: 'Profile',
  data(){
    return{
      EXPIRED_STATUS,
      bidsLoading: false,
      whiteCheck,
      selectAction: false,
      selected: [],
      search: '',
      acceptedBid: null,
      selectedAll: false,
      modalActionLoading: false,
      take: BIDS_PER_PAGE,
      page: 1,
      totalCount: 0,
    }
  },

  computed: {
    ...mapGetters({
      selectedAuction: 'profile-auction/getSelectedAuction'
    }),
    /**
     *Checking if the auction is delisted or expired.
     * @return boolean
     */
    isDelistedOrExpired() {
      return this.selectedAuction.status === DELISTED_STATUS || this.selectedAuction.status === EXPIRED_STATUS
    },
    /**
     * Sorting the bids by price.
     * @return {*[]}
     */
    sortedBids(){
      return this.selectedAuction? [...this.selectedAuction.bids].sort((bid1,bid2)=> bid2.price - bid1.price ): []
    },
    /**
     * Checking if the reserve price is met.
     * @return {boolean|boolean}
     */
    reserveMet() {
      return this.selectedAuction?.is_reserved ? this.selectedAuction.reserve_price / 100 <= this.selectedAuction.highest_bid / 100 : true
    },
  },
  mounted() {
    if (!this.$route.params.id){
      this.$router.back()
    }
    this.getUpdatedAuction()
  },
  methods: {
    ...mapActions({
      acceptAuctionBid: 'profile-auction/acceptAuctionBid',
      getSingleAuction: 'profile-auction/getSingleAuction',
      getAuctionBids: 'profile-auction/getAuctionBids',
    }),
    getUpdatedAuction(){
      this.getSingleAuction({id: this.$route.params.id || this.selectedAuction.id}).then(res => {
        this.$store.commit('profile-auction/setSelectedAuction', res.data)
      })
    },
    fetchBids(){
      // if user clicks 'More Bids' we fetch BIDS_PER_PAGE more bids
      this.take += BIDS_PER_PAGE
      const payload  = {
        id: this.selectedAuction.id,
        take: this.take,
        page: this.page
      }
      this.bidsLoading = true
      this.getAuctionBids(payload).then(res => {
        this.totalCount = res.data.total
        this.$store.commit('profile-auction/setBidsOfAuction', {id: this.selectedAuction.id, bids: res.data.data})
      }).catch(err => {
        this.$toasted.error(err.message || err.data.error)
      }).finally(()=> {
        this.bidsLoading = false
      })

    },
    acceptBidModalOk(){
      this.modalActionLoading = true
      const payload = {
        id: this.selectedAuction.id,
        bid_id: this.acceptedBid.id
      }
      this.acceptAuctionBid(payload).then(res => {
        this.$bvModal.hide('accept-item-modal')
        this.$bvModal.show('bid-accepted-modal')
        this.$router.push({
          path: '/orders',
        })
        this.$toasted.success(res.data.message)
      }).catch(err => {
        this.$toasted.error(err.message || err.data.error)
      }).finally(()=> {
        this.modalActionLoading = false
      })
    },
    handleBulkAction(){
      this.$store.commit('profile-auction/setSelectedBids', this.selectedAuction.bids.filter(bid => this.selected.includes(bid.id)))
      this.$nextTick(() => {
        this.$router.push({
          path: '/profile/auctions/send-offer'
        })
      })
    },
    selectBid(bidID){
      const ind = this.selected.findIndex(id => id === bidID)
      if (ind>-1){
        this.selected.splice(ind,1)
      }else{
        this.selected.push(bidID)
      }
      this.selectedAll = this.selected.length === this.selectedAuction.bids.length
    },
    selectAllChange(selectedAll){
      return selectedAll? this.handleSelectAll() : this.handleDeselectAll()
    },
    handleSelectAll(){
      this.selected = this.selectedAuction.bids.map(bid => bid.id)
      this.selectedAll = true
    },
    handleDeselectAll(){
      this.selected = []
      this.selectedAll = false
    },
    acceptBid(bid){
      this.acceptedBid = bid
      this.$bvModal.show('accept-item-modal')
    },
    cancelAction(){
      this.selectAction = false
      this.handleDeselectAll()
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.bg-blue-2
  background-color: $color-blue-2
  border: none

.reserve-not-met-title
  color: $color-red-1

::v-deep
  .custom-control-input:checked
    ~ .custom-control-label::before
      transform: scale(1.5)
      color: $white
      background-color: $black
      box-shadow: none
      border-radius: 2px
      border: 2px solid $black

::v-deep
  .custom-control-input:checked
    ~ .custom-control-label::after
      transform: scale(1)

::v-deep
  .custom-control-input
    ~ .custom-control-label::before
      transform: scale(1)
      color: $white
      background-color: $white
      box-shadow: none
      border-radius: 2px
      border: 2px solid $color-gray-4

.mw-734
  max-width: 734px

.container-profile-auctions
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1

  h4.title
    @include heading-1-medium
    color: $color-black-1

  @media (max-width: 576px)
    padding: 16px
    background: $white
    h2.title
      @include body-3-bold

    h4.title
      @include body-4-bold
    .send-final-btn
      @include body-21
      border: none
      padding: 0
      height: auto
      &::focus
        background: transparent
    .bids-table-columns
      @include body-9
      font-weight: $medium
      ::v-deep
        .custom-control
          margin-top: 0
    ::v-deep
      .custom-control
        padding-left: 0
        margin-right: 1em
        margin-top: 10px
      .custom-control-input:checked
        ~ .custom-control-label::before
          transform: scale(1)
    ::v-deep
      .custom-control-input:checked
        ~ .custom-control-label::after
          transform: scale(1)
          top: -1.7rem

    ::v-deep
      .custom-control-label
        height: 15px

      .custom-control-label::before,
      .custom-control-label::after
        left: 0
        position: relative
      .custom-control-input
        ~ .custom-control-label::before
          transform: scale(1)
    .bulk-select-toolbar-wrapper::v-deep
      @include body-9
      .btn
        @include body-9
</style>
