<template>
  <b-container fluid class="h-100 container-profile-bids-page" :class="{'container-profile-bids': !isMobileSize}">
    <div class="d-none mb-3 d-md-flex justify-content-center justify-content-md-between align-items-center">
      <h2 class="title mb-0" :class="{'body-4-medium' : isMobileSize}">{{ $tc('common.bid', 2) }}</h2>
    </div>
    <!--    Bids Filters and mobile search    -->
    <div v-if="isMobileSize" class="d-flex align-items-center">
      <MobileSearchInput :value="filters.search" class="flex-grow-1" @input="mobileSearch" />
      <span class="ml-3 mr-1" @click="showMobileFilter"><img src="~/assets/img/icons/filter-icon.png" /></span>
    </div>

    <BidsFilters v-else @update="FetchBids(true)"/>


    <div v-if="isVendor" class="d-none d-md-flex justify-content-between align-items-center">
      <b-row class=" w-100">
        <b-col md="6"></b-col>
        <b-col md="6" class="text-right pr-0">
          <Button
            variant="link"
            size="sm"
            class="delete-expired"
            @click="deleteAction = true"
          >
            {{ $t('bids.delete_expired') }}
          </Button>
        </b-col>
      </b-row>
    </div>

    <div class="d-md-none d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center mt-0">
        <h4 class="title">
          {{ $t('bids.bid_title.' + bidType) }} ({{ totalCount || 0 }})
        </h4>
      </div>
      <Button
        variant="link"
        size="sm"
        class="delete-expired-mobile"
        @click="deleteAction = true"
      >
        <img src="~/assets/img/profile/mobile/mobile-delete.svg" class="mr-1" />
        <span>{{ $t('bids.delete_expired') }}</span>
      </Button>
    </div>

    <div class="d-none d-md-flex align-items-center">
      <h4 class="title mb-0">
        {{ $t('bids.bid_title.' + bidType) }} ({{ totalCount || 0 }})
      </h4>
      <span class="mx-4 mt-1 d-none d-md-inline-flex body-5-normal text-gray-5">{{ $t('bids.highest_bid_info') }}</span>
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
      <div :class="isMobileSize ? 'body-5-medium' : 'not-found-text'">{{ $t('bids.no_bids') }}</div>
    </div>
    <div v-if="bidsCount>0" class="bids-listing">
      <div class="px-3 d-none d-md-flex bids-listing-header">
        <div class="d-flex align-items-center bids-listing-column pl-4 product">
          <div class="bids-listing-header-name">{{ $t('bids.headers.product') }}</div>
          <div class="ml-1" role="button" @click="FetchBids(bidSort)">
            <img :src="FilterDown" alt="down">
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center bids-listing-column auction-type">
          <div class="bids-listing-header-name">{{ $t('bids.headers.auction_type') }}</div>
          <div class="ml-1" role="button" @click="FetchBids(bidSort)">
            <img :src="FilterDown" alt="down">
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center bids-listing-column bid-amt">
          <div class="bids-listing-header-name">{{ $t('bids.headers.bid_amt') }}</div>
          <div class="ml-1" role="button" @click="FetchBids(bidSort)">
            <img :src="FilterDown" alt="down">
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center bids-listing-column time-remaining">
          <div class="bids-listing-header-name">{{ $t('bids.headers.time_remaining') }}</div>
          <div class="ml-1" role="button" @click="FetchBids(bidSort)">
            <img :src="FilterDown" alt="down">
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center bids-listing-column action">
          <div class="bids-listing-header-name">{{ $t('bids.headers.action') }}</div>
        </div>
      </div>

      <client-only>
        <div v-if="bidsCount>0" class="w-100">
          <div v-for="bid in bids" :key="bid.id" class="p-0">
            <BidSingleItem
              v-if="bid.auction.type===BID_AUCTION_TYPE_SINGLE"
              :bid-type="bidType"
              :selected="selected.includes(bid.id)"
              :bid="bid"
              :selectable="isSelectable(bid)"
              :acceptable="bidTagStatus(bid) === HIGHEST_BID_STATUS && bidType === BID_TYPE_INCOMING && isAuctionActive(bid)"
              @selected="selectBidAction"
              @accept="acceptBid"
              @edit="handleEdit"
            />
            <BidCollectionItem
              v-else
              :selected="selected.includes(bid.id)"
              :bid-type="bidType"
              :bid="bid"
              :acceptable="bidTagStatus(bid) === HIGHEST_BID_STATUS && bidType === BID_TYPE_INCOMING && isAuctionActive(bid)"
              :selectable="isSelectable(bid)"
              @selected="selectBidAction"
              @accept="acceptBid"
              @edit="handleEdit"
            />
          </div>
        </div>
      </client-only>
    </div>
    <div v-if="fetchLoading" class="mx-auto mt-5 mb-5 pb-5 pt-5">
      <Loader :loading="fetchLoading"/>
    </div>

    <Pagination
      v-if="bidsCount>0 && !fetchLoading && !isMobileSize"
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
      <div class="px-4 bid-accept-sheet">
        <b-row class="mt-3">
          <b-col md="12" class="text-center bid-accept-sheet-content">
            <span v-if="acceptedBid">
              {{ $tc('bids.accept_body', 1).replace(':amount:', acceptedBid.price / 100) }}
            </span>
          </b-col>
        </b-row>
        <b-row class="d-flex flex-column">
          <Button
            variant="primary"
            class="bg-dark-blue d-flex align-items-center justify-content-center accept-btn"
            pill
            :disabled="modalActionLoading"
            @click="acceptBidModalOk"
          >{{ $t('bids.accept') }}
          </Button>
          <Button
            variant="outline"
            class="text-dark-blue cancel-btn"
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
      @hidden="$router.push({ path: '/orders' })"
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
      lastPage: 1,
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
      return this.bids.filter(a => a.auction.remaining_time === EXPIRED_STATUS || a.auction.status === DELISTED_STATUS).length > 0
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    },
    isAuctionActive() {
      return (item) => (item.auction.remaining_time !== EXPIRED_STATUS && item.auction.status !== DELISTED_STATUS)
    }
  },
  mounted() {
    this.FetchBids(true)
    if (process.browser) {
      const container = document.getElementById('profile-layout')
      window.onscroll = (ev) => {
        if (container && !this.fetchLoading) {
          if ((window.innerHeight + window.scrollY) >= container.offsetHeight - 10 && this.isMobileSize) {
            if (this.page < this.lastPage) {
              this.page++
              this.FetchBids()
            }
          }
        }
      };
    }
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

      this.acceptAuctionBid(payload).then(res => {
        this.closeBidModals()
        this.$bvModal.show('bid-accepted-modal')
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
      return this.deleteAction && (item.auction.remaining_time === EXPIRED_STATUS || item.auction.status === DELISTED_STATUS)
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
    FetchBids(isNewRecordCollection = false, page = 1) {
      if (this.fetchLoading) return
      /* start new lazy loading collection */
      if (isNewRecordCollection) {
        this.page = page // lazy loading will start from first page
        this.bids = [] // new lazy loading record list
      }
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
        this.bids.push(...data)
        this.totalCount = res.data.total
        this.lastPage = res.data.last_page
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
        this.FetchBids(true, page)
      }
    },
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.FetchBids(true)
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
    // hide filter
    closeMobileFilter() {
      const { mobileFilter } = this.$refs
      if (mobileFilter) {
        mobileFilter.close()
      }
    },
    async onMobileFilter(mobileFilters) {
      const filterData = {
        ...this.filters,
        ...mobileFilters
      }
      this.closeMobileFilter()
      await this.$store.commit('profile-bids/setFilters', filterData)
      this.FetchBids(true)
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
  &.mobile
    background-color: $color-blue-20
    font-weight: 500

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
  @include body-5-normal
  background-color: $white
  color: $black
  width: 228px
  height: 38px
  font-family: $font-montserrat
  margin: 46px 0 40px

.delete-expired-mobile.btn
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-1214
  color: $color-gray-47
  height: auto

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

.expire-button-gray
  color: $color-gray-30

h4.title
  font-family: $font-sp-pro
  font-weight: $bold
  @include body-1
  @media (max-width: 576px)
    margin: 22px 0 23px
    @include body-4
    font-weight: $medium
    font-family: $font-montserrat
    color: $black
.bids-listing
  margin: 0 -25px
  &-header
    margin-top: 50px
    margin-bottom: 13px
  &-header-name
    font-family: $font-montserrat
    font-weight: $bold
    @include body-4
    color: $black
  &-column
    padding: 0 12px
  .product
    flex: 1
    padding-left: 24px
  .action
    width: 18%
  .time-remaining
    width: 17%
  .bid-amt
    width: 11.6%
  .auction-type
    width: 10.6%
  @media (max-width: 576px)
    margin: 0

.container-profile-bids-page
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    font-weight: $bold
    color: $color-black-1
  .mb-13
    margin-bottom: 13px

  @media (max-width: 576px)
    padding: 20px 16px 
    background-color: $white

    .bid-accept-sheet
      &-content
        font-family: $font-sp-pro
        font-weight: $normal
        @include body-32
        color: $black
        margin-bottom: 35px
      .accept-btn
        font-family: $font-sp-pro
        font-weight: $medium
        @include body-13
        color: $white
        height: 40px
        width: 216px
      .cancel-btn
        font-family: $font-sp-pro
        font-weight: $medium
        @include body-17
        color: $color-blue-20
        height: 24px
        width: 54px
        padding: 0
        margin: 19px auto 20px
</style>

