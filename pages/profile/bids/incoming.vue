<template>
  <b-container fluid class="h-100 p-3 p-md-5" :class="{'container-profile-bids': !isMobileSize}">
    <!--    Bids Filters and mobile search    -->
    <div v-if="isMobileSize" class="d-flex align-items-center">
      <MobileSearchInput :value="filters.search" class="flex-grow-1" @input="mobileSearch" />
      <span class="ml-3" @click="showMobileFilter"><img src="~/assets/img/icons/filter-icon.png" /></span>
    </div>

    <BidsFilters v-else @update="FetchBids"/>


    <div v-if="isVendor" class="d-flex justify-content-between align-items-center mt-5">
      <Button
        v-if="haveExpired"
        variant="link"
        size="sm"
        class="mobile px-4 py-3 mt-0 mt-mb-5"
        :class="isMobileSize ? 'delete-expired-mobile' : 'delete-expired'"
        @click="deleteAction = true"
      >
        <img v-if="isMobileSize" src="~/assets/img/profile/mobile/mobile-delete.svg" class="mx-1" />
        {{ $t('bids.delete_expired') }}
      </Button>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-4 ">
      <div class="d-flex align-items-center mt-0 mt-md-5">
        <h3 class="title">
          <span :class="{ 'body-4-medium' : isMobileSize }">
            {{ $t('bids.bid_title.' + bidType) }} ({{ totalCount || 0 }})
          </span>
        </h3>
        <span class="mx-4 d-none d-md-inline-flex">{{ $t('bids.highest_bid_info') }}</span>
      </div>
      <Button
        v-if="haveExpired && !isVendor"
        variant="link"
        size="sm"
        class="mobile px-4 py-3 mt-0 mb-md-5"
        :class="isMobileSize ? 'delete-expired-mobile' : 'delete-expired'"
        @click="deleteAction = true"
      >
        <img v-if="isMobileSize" src="~/assets/img/profile/mobile/mobile-delete.svg" class="mx-1" />
        {{ $t('bids.delete_expired') }}
      </Button>
    </div>

    <BulkSelectToolbar
      ref="bulkSelectToolbar"
      :active="deleteAction || undoAction"
      :selected="selected"
      :unit-label="$tc('common.product', selected.length)"
      :total="bidsCount"
      :action-disabled="deleteLoading"
      :action-label="$tc(`bids.delete_selected`)"
      :successMessage="successMessage"
      class="mt-3"
      @close="cancelAction()"
      @selectAll="handleSelectAll()"
      @deselectAll="handleDeselectAll()"
      @submit="handleBulkAction()"
      @undo="undoDeleted()"
    />


    <div v-if="bidsCount===0 && !fetchLoading"
         class="d-flex align-items-center justify-content-center flex-column h-50">
      <div class="not-found-text"> {{ $t('bids.no_bids') }}</div>
      <div class="not-found-text mt-2"> {{ $t('bids.place_bid') }}</div>
      <Button
        to="/create-listing"
        class="bg-blue-2 mt-4"
        pill
      >
        <span class="px-4"> {{ $t('bids.browse_auction') }}</span>
      </Button>
    </div>
    <div v-if="fetchLoading" class="mx-auto mt-5">
      <Loader :loading="fetchLoading"/>
    </div>
    <div v-if="bidsCount>0 && !fetchLoading">
      <b-row class="mt-5 text-center p-0 font-weight-bold d-none d-md-flex">
        <b-col sm="12" md="2" class="text-center">{{ $t('bids.headers.auction_id') }}</b-col>
        <b-col sm="12" md="3" class="text-left px-0">{{ $t('bids.headers.product') }}</b-col>
        <b-col sm="12" md="1">{{ $t('bids.headers.auction_type') }}
          <span role="button"><img :src="FilterDown" alt="donw"></span>
        </b-col>
        <b-col sm="12" md="1">{{ $t('bids.headers.auto_bid') }}
          <span role="button"><img :src="FilterDown" alt="donw"></span>
        </b-col>
        <b-col sm="12" md="1">{{ $t('bids.headers.bid_amt') }}
          <span role="button"><img :src="FilterDown" alt="donw"></span>
        </b-col>
        <b-col sm="12" md="2">{{ $t('bids.headers.time_remaining') }}
          <span role="button"><img :src="FilterDown" alt="donw"></span>
        </b-col>
        <b-col sm="12" md="2" class="pr-5">{{ $t('bids.headers.action') }}</b-col>
      </b-row>

      <client-only>
        <div v-if="bidsCount>0" class="w-100">
          <div v-for="bid in bids" :key="bid.id" class="p-0">
            <BidSingleItem
              v-if="bid.auction.type===BID_AUCTION_TYPE_SINGLE"
              :bid-type="bidType"
              :selected="selected.includes(bid.id)"
              :bid="bid" :selectable="isSelectable(bid)"
              :acceptable="bidTagStatus(bid) === HIGHEST_BID_STATUS && bidType === BID_TYPE_INCOMING"
              @selected="selectBidAction"
              @accept="acceptBid"
              @edit="handleEdit"
            />
            <BidCollectionItem
              v-else
              :selected="selected.includes(bid.id)"
              :bid-type="bidType"
              :bid="bid"
              :acceptable="bidTagStatus(bid) === HIGHEST_BID_STATUS && bidType === BID_TYPE_INCOMING"
              :selectable="isSelectable(bid)"
              @selected="selectBidAction"
              @accept="acceptBid"
              @edit="handleEdit"
            />
          </div>
        </div>
      </client-only>
    </div>


    <Pagination
      v-if="bidsCount>0 && !fetchLoading"
      v-model="page"
      :total="totalCount"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      class="mt-4"
      @page-click="handlePageClick"
      @per-page-change="handlePerPageChange"
    />

    <!--    Bid accept confirmation modal -->
    <!-- desktop version --->
    <Modal
      id="accept-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12">
              {{ $tc('bids.accept_body', 1).replace(':amount:', acceptedBid.price / 100) }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              class="bg-blue-2"
              pill
              :disabled="modalActionLoading"
              @click="acceptBidModalOk"
            >{{ $t('bids.accept') }}
            </Button>
            <Button
              variant="outline-dark"
              pill
              :disabled="modalActionLoading"
              @click="$bvModal.hide('accept-item-modal')"
            >{{ $t('common.cancel') }}
            </Button
            >
          </b-row>
        </div>

      </template>
    </Modal>
    <!-- desktop version --->
    <vue-bottom-sheet
      ref="mobileBidAcceptConfirm"
      class="responsive-filter"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <div class="px-4">
        <b-row class="my-3">
          <b-col md="12" class="text-center">
            <span v-if="acceptedBid">
              {{ $tc('bids.accept_body', 1).replace(':amount:', acceptedBid.price / 100) }}
            </span>
          </b-col>
        </b-row>
        <b-row class="d-flex flex-column">
          <Button
            variant="primary"
            class="bg-dark-blue my-3 mx-5"
            pill
            :disabled="modalActionLoading"
            @click="acceptBidModalOk"
          >{{ $t('bids.accept') }}
          </Button>
          <Button
            variant="outline"
            class="mt-2 mb-3 text-dark-blue"
            pill
            :disabled="modalActionLoading"
            @click="$refs.mobileBidAcceptConfirm.close()"
          >{{ $t('common.cancel') }}
          </Button
          >
        </b-row>
      </div>
    </vue-bottom-sheet>

    <!--    Bid accepted success modal-->
    <Modal
      id="bid-accepted-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12">
              {{ $tc('auction.sold_body', 1) }}<br/>
              {{ $tc('auction.sold_body', 2) }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              iconOnly
              variant="success"
              pill
            >
              <img :src="whiteCheck"/>
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>

    <!-- Mobile filter begin -->
    <!-- For mobile filters -->
    <vue-bottom-sheet
      ref="mobileFilter"
      class="responsive-filter"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <MobileFilter @filter="onMobileFilter" />
    </vue-bottom-sheet>
    <!-- For mobile filters end -->
    <!-- Mobile filter begin -->
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import debounce from 'lodash.debounce'
import {
  Button,
  Pagination,
  BulkSelectToolbar,
  Loader,
  Modal
} from '~/components/common';
import FilterDown from '~/assets/img/icons/filter-down.svg'
import BidSingleItem from '~/components/profile/bids/BidSingleItem';
import BidCollectionItem from '~/components/profile/bids/BidCollectionItem';
import whiteCheck from '~/assets/img/icons/white-check.svg'
import BidsFilters from '~/components/profile/bids/BidsFilters';
import screenSize from '~/plugins/mixins/screenSize'
import MobileFilter from '~/components/profile/bids/filters/MobileFilter.vue'
import MobileSearchInput from '~/components/mobile/MobileSearchInput'

import {
  DELISTED_STATUS, EXPIRED_STATUS,
  BID_ACCEPTED, BID_AUCTION_TYPE_SINGLE, BID_TYPE_INCOMING,
  HIGHEST_BID_STATUS,
  OUTBID_BID_STATUS,
  WINNING_BID_STATUS,
} from '~/static/constants';



export default {
  name: 'ProfileIncomingBids',
  components: {
    MobileSearchInput,
    BidsFilters,
    BidCollectionItem,
    BidSingleItem,
    Button,
    Pagination,
    BulkSelectToolbar,
    Loader,
    Modal,
    MobileFilter
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      bids: [],
      BID_AUCTION_TYPE_SINGLE,
      HIGHEST_BID_STATUS,
      BID_TYPE_INCOMING,
      BID_TYPES: Object.keys(this.$t('bids.bid_type')).map(a => {
        return {
          label: this.$t('bids.bid_type.' + a),
          value: a
        }
      }),
      whiteCheck,
      successMessage: null,
      selectedAll: false,
      page: 1,
      deleteLoading: false,
      deleteAction: false,
      undoAction: false,
      totalCount: this.bidsCount,
      fetchLoading: false,
      selected: [],
      perPageOptions: [8, 16, 32, 48],
      perPage: 6,
      FilterDown,
      bidType: BID_TYPE_INCOMING,
      deletePayload: [],
      acceptedBid: null,
      modalActionLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      filters: 'profile-bids/getFilters',
      isVendor: 'auth/isVendor'
    }),

    /**
     * The below code is a method that is used to determine if an item is selectable.
     * @return {function(*=): boolean}
     */
    isSelectable() {
      return (item) => this.isExpiredOrDelisted(item)
    },
    /**
     * Returns length of bids
     * @return {number}
     */
    bidsCount() {
      return this.bids?.length || 0
    },
    // Checking if the auction has expired or not.
    haveExpired() {
      return this.bids.filter(a => a.auction.status === EXPIRED_STATUS || a.auction.status === DELISTED_STATUS).length > 0
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  mounted() {
    this.FetchBids()
  },
  methods: {
    ...mapActions({
      fetchBids: 'profile-bids/fetchBids',
      deleteBids: 'profile-bids/deleteBids',
      editBids: 'profile-bids/editBids',
      acceptAuctionBid: 'profile-bids/acceptAuctionBid',
    }),
    closeBidModals() {
      const { mobileBidAcceptConfirm } = this.$refs
      if (mobileBidAcceptConfirm) {
        mobileBidAcceptConfirm.close() // mobile
      }
      this.$bvModal.hide('accept-item-modal') // desktop
    },
    acceptBidModalOk() {
      this.modalActionLoading = true
      const payload = {
        id: this.acceptedBid.auction.id,
        bid_id: this.acceptedBid.id
      }

      // Test
      this.closeBidModals()
      this.$bvModal.show('bid-accepted-modal')


      this.acceptAuctionBid(payload).then(res => {
        this.closeBidModals()
        this.$bvModal.show('bid-accepted-modal')
        this.$router.push({
          path: '/orders',
        })
        this.$toasted.success(res.data.message)
      }).catch(() => {
        this.modalActionLoading = false
        this.closeBidModals()
      })
    },
    /**
     * The method showing a modal when the acceptBid function is called.
     * @param bid
     */
    acceptBid(bid) {
      this.acceptedBid = bid
      if (this.isMobileSize) {
        this.$nextTick(() => {
          const { mobileBidAcceptConfirm } = this.$refs
          if (mobileBidAcceptConfirm) {
            mobileBidAcceptConfirm.open() // mobile
          }
        })
      } else {
        this.$bvModal.show('accept-item-modal')
      }

    },
    /**
     * Committing the selected bid to the store and then pushing the router to the edit page.
     * @param bid
     */
    handleEdit(bid) {
      this.$store.commit('profile-bids/setSelectedBid', bid)
      this.$nextTick(() => {
        this.$router.push({
          path: `/profile/bids/${bid.id}/edit/`,
          params: {
            selected: bid
          }
        })
      })
    },
    /**
     * Selecting the bids that are selected.
     * @param bidID
     */
    selectBidAction(bidID) {
      const index = this.selected.findIndex(selectedID => selectedID === bidID)
      if (index > -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(bidID)
      }
      this.selectedAll = this.selected.length === this.bids.length
    },
    /**
     * Checking if the bid's auction is expired or delisted.
     * @param item
     * @returns {boolean}
     */
    isExpiredOrDelisted(item) {
      return this.deleteAction && (item.auction.status === EXPIRED_STATUS || item.auction.status === DELISTED_STATUS)
    },

    /**
     * A function that returns a string based on the status of the bid.
     * @param bid
     * @returns {string}
     */
    bidTagStatus(bid) {
      if (bid.status === BID_ACCEPTED) {
        return WINNING_BID_STATUS
      } else if (bid.price === bid.auction.highest_bid) {
        return HIGHEST_BID_STATUS
      } else {
        return OUTBID_BID_STATUS
      }
    },
    /**
     * Selecting all the bids that are expired or delisted.
     */
    handleSelectAll() {
      this.selected = this.bids.filter(z => this.isExpiredOrDelisted(z)).map(a => a.id)
      if (this.selected.length > 0)
        this.selectedAll = true
    },
    /**
     * Deleting the selected bids.
     */
    handleBulkAction() {
      this.deleteLoading = true
      this.deletePayload = this.bids.filter(a => this.selected.includes(a.id)).map(z => {
        return {
          id: z.id,
          status: z.status
        }
      })
      this.deleteBids({ids: this.selected}).then(res => {
        this.deleteAction = false
        this.successMessage = this.$t('bids.success_deleted')
        this.undoAction = true
        setTimeout(() => {
          this.undoAction = false
        }, 3000)
        this.FetchBids()
      }).catch(e => {
        this.$toasted.error(e)
      }).finally(() => {
        this.deleteLoading = false
      })
    },
    /**
     * Fetching bids from the backend and storing them in the store.
     */
    FetchBids() {
      this.fetchLoading = true
      const payload = {
        ...this.filters,
        take: this.perPage,
        page: this.page,
        bid_type: this.bidType,
        auction_type: this.filters.activeTypeFilters.map(a => a.value),
        autobid: this.filters.activeOnOffBidFilters.map(a => a.value),
        status: this.filters.activeStatusFilters.map(a => a.value),
      }
      this.fetchBids(payload).then(res => {
        const data = res.data.data.map(auction => {
          auction.place = this.bidTagStatus(auction)
          auction.bids = []
          return auction
        })
        this.bids = data
        this.totalCount = res.data.total
      }).finally(() => {
        this.fetchLoading = false
      })
    },
    mobileSearch: debounce(function (e) {
      if (this.filters.search === e) return
      const filter = {
        ...this.filters,
        search: e // override by mobile input
      }
      this.$store.commit('profile-bids/setFilters', filter)
      this.FetchBids()
    }, 300),

    cancelAction() {
      this.deleteAction = false
      this.handleDeselectAll()
    },
    handleDeselectAll() {
      this.selected = []
      this.selectedAll = false
    },
    handleMethodNavClick(type) {
      if (type) {
        this.bidType = type
      }
      this.FetchBids()
    },
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.FetchBids()
      }
    },
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.FetchBids()
      }
    },
    /** Undoing the delete action.
     */
    undoDeleted() {
      this.deleteLoading = true
      this.editBids({items: this.deletePayload}).then(res => {
        this.successMessage = null
        this.deleteAction = false
        this.FetchBids()
      }).catch(e => {
        this.$toasted.error(e)
      }).finally(() => {
        this.deleteLoading = false
      })
    },
    // Show the filter
    showMobileFilter() {
      const { mobileFilter } = this.$refs
      if (mobileFilter) {
        mobileFilter.open()
      }
    },
    async onMobileFilter(mobileFilters) {
      const filterData = {
        ...this.filters,
        ...mobileFilters
      }
      await this.$store.commit('profile-bids/setFilters', filterData)
      this.FetchBids()
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'


:deep(.nav-group)
  .btn-group .btn
    @include body-5

.not-found-text
  @include body-4
  font-family: $font-family-base
  font-weight: $medium
  color: $color-gray-5

:deep(.nav-group)
  .btn-group
    height: 40px


.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none

.bg-dark-blue.btn.btn-primary
  background: $color-blue-20
  border-color: $color-blue-20
  font-weight: $normal

.text-dark-blue
  color: $color-blue-20

:deep()
  .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      background-color: $black
      box-shadow: none
      border-radius: 2px
      border: 2px solid $black

::deep()
  .custom-control-input
    ~ .custom-control-label::before
      color: $white
      background-color: $white
      box-shadow: none
      border-radius: 2px
      border: 2px solid $color-gray-47


:deep()
  .bg-light
    position: relative
    padding: 0

:deep()
  .date-dp
    .btn-secondary
      background-color: $white
      border: none


      &:hover
        background-color: $white-2

.delete-expired.btn
  @include body-5-regular
  background-color: $white
  color: $black

.delete-expired-mobile.btn
  @include body-5-regular
  color: $color-gray-30


.container-profile-bids
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1
    font-weight: $bold

  h3.title
    @include heading-2
    color: $color-black-1
    font-weight: $bold


.custom-selectbox
  border: 1px solid $color-gray-60
  height: 38px

</style>

