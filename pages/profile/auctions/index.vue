<template>
  <b-container fluid class="h-100 container-profile-auctions-listing" :class="{'container-profile-auctions' : !isMobileSize}">
    <div
      :class="{'border-bottom border-dark' : isMobileSize}"
      class="d-none d-md-flex justify-content-center justify-content-md-between align-items-center">
      <h2 class="title mb-0" :class="{'body-4-medium' : isMobileSize}">{{ $t('home.auctions') }}</h2>
    </div>
    <template v-if="!isMobileSize">
      <div class="d-flex justify-content-start align-items-center mt-4">
        <SearchInput
          :value="search"
          :placeholder="$t('auction.search_placeholder')"
          class="flex-grow-1 mw-734"
          :debounce="1000"
          inputHeight="38"
          @input="handleSearch"
        />
        <div class="flex-grow-0">
          <FormDropdown
            id="sortBySelect"
            :value="sortBy"
            :placeholder="$t('auction.sort_by')"
            :items="SORT_BY"
            :iconArrowDown="require('~/assets/img/icons/arrow-down-black.svg')"
            class="dropdown-filters sort-by mr-4"
            @select="handleSortBySelect"
          ></FormDropdown>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-md-3 pt-1">
        <div class="d-flex align-items-end justify-content-start filters-bar">
          <div>
            <div class="body-8-normal mb-1 sf-pro-display">{{ $t('common.filter_by') }}</div>
            <div class="d-flex align-items-center">
              <SelectWithCheckbox
                id="auction-type-selector"
                class=" mr-10 dropdown-filters"
                :default="auctionType"
                :options="AUCTION_TYPES"
                :title="$t('auction.auction_type')"
                :updateFilters="activeTypeFilters"
              />

              <SelectWithCheckbox
                id="auction-status-selector"
                class=" mr-10 dropdown-filters"
                :default="auctionStatus"
                :options="STATUS_TYPES"
                :title="$t('auction.status_type')"
                :updateFilters="activeStatusFilters"
              />
            </div>
          </div>
          <div>
            <div class="body-8-normal mb-1 sf-pro-display">{{ $t('selling_page.date_listed') }}</div>
            <div class="d-flex align-items-center">
              <b-input-group class="date-input-group mr-10">
                <b-form-input class="date-input" :placeholder="$t('auction.start_date')" :value="start_date"></b-form-input>
                <b-input-group-append class="date-input-icon">
                  <b-form-datepicker
                    v-model="start_date"
                    button-only
                    hide-header
                    hide-footer
                    class="date-dp"
                    right
                    locale="en-US"
                  >
                    <template #button-content>
                      <img :src="CalendarImg">
                    </template>
                  </b-form-datepicker>
                </b-input-group-append>
              </b-input-group>

              <b-input-group class="date-input-group mr-10">
                <b-form-input class="date-input" :placeholder="$t('auction.end_date')" :value="end_date"></b-form-input>
                <b-input-group-append class="date-input-icon">
                  <b-form-datepicker
                    v-model="end_date"
                    button-only
                    hide-header
                    hide-footer
                    class="date-dp"
                    right
                    locale="en-US"
                  >
                    <template #button-content>
                      <img :src="CalendarImg">
                    </template>
                  </b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>

          <b-button
            variant="primary"
            size="sm"
            class=" apply-button text-white shadow border-0 px-4 py-2"
            @click="FetchAuctions"
          >{{ $t('vendor_purchase.apply') }}
          </b-button>
          <span v-if="haveFilters" role="button" class="clear-filters text-nowrap ml-4"
                @click="clearFilters">{{ $t('auction.clear_filters') }}</span>
        </div>
      </div>
    </template>
    <div v-if="isMobileSize" class="d-flex align-items-center mt-md-3">
      <MobileSearchInput :value="search" class="flex-grow-1" @input="handleSearch" />
      <span class="ml-3" @click="showMobileFilter"><img src="~/assets/img/icons/filter-icon.png" /></span>
    </div>

    <div class="d-flex justify-content-start align-items-center mt-4 pt-1 pt-md-0 mt-md-5">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="title" :class="{'body-4-medium' : isMobileSize}">
          {{ $tc('auction.auctions_listings', 1) }} ({{ totalCount }})
        </h4>
      </div>
    </div>

    <div
      class="d-flex d-md-none justify-content-around align-items-center mt-3"
    >
      <NavGroup
        v-model="status"
        :data="DURATIONS.filter(a => a.value !== 'delisted')"
        nav-key="duration"
        class="duration-nav"
        :class="{'flex-1 w-100 text-center' : isMobileSize}"
        @change="handleMethodNavClick"
      />
    </div>

    <BulkSelectToolbar
      ref="bulkSelectToolbar"
      :active="deleteAction"
      :selected="selected"
      :unit-label="$tc('common.product', selected.length)"
      :total="getAuctions.length"
      :action-disabled="deleteLoading"
      :action-label="$tc(`auction.delete_selected`)"
      class="mt-3"
      @close="cancelAction()"
      @selectAll="handleSelectAll()"
      @deselectAll="handleDeselectAll()"
      @submit="handleBulkAction()"
    />

    <BulkSelectToolbar
      ref="bulkUndo"
      :active="undoAction"
      :action-disabled="deleteLoading"
      :successMessage="successMessage"
      class="mt-3"
      @undo="undoDeleted"
    />

    <div v-if="deleteAction" class="mt-2 ml-3">
      <b-form-checkbox
        id="selectAllAuction"
        :checked="selectedAll"
        @change="selectAllChange"
      >
        {{ $tc(`auction.select_all`) }}
      </b-form-checkbox>
    </div>

    <div v-if="!fetchLoading" class="auction-listings-table">
      <b-row v-if="!isMobileSize" class="text-center font-weight-bold">
        <b-col sm="12" md="2" class="text-center">{{ $t('auction.auction_id') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
        <b-col sm="12" md="3" class="text-left pl-0">{{ $t('auction.product') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
        <b-col sm="12" md="1">{{ $t('auction.type') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
        <b-col sm="12" md="2">{{ $t('auction.highest_bid') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
        <b-col sm="12" md="1">{{ $t('auction.bids') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
        <b-col sm="12" md="2">{{ $t('auction.time_remaining') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
        <b-col sm="12" md="1">{{ $t('auction.status') }} <img class="mt-n1" src="~/assets/img/icons/triangle-arrow-down.svg"></b-col>
      </b-row>

      <client-only>
        <div v-if="haveAuction" class="w-100">
          <div v-for="item in getAuctions" :key="item.id" class="p-0">
            <SingleItemAuction v-if="item.type === AUCTION_TYPE_SINGLE" :auction="item" :selectable="isSelectable(item)"
                               :selected="selected.includes(item.id)" @click="auctionClicked(item)"
                               @selected="selectAuction"/>
            <CollectionAuction v-if="item.type === AUCTION_TYPE_COLLECTION" :auction="item"
                               :selectable="isSelectable(item)" :selected="selected.includes(item.id)"
                               @click="auctionClicked(item)" @selected="selectAuction"/>
          </div>
        </div>
        <div v-else class="w-100 mt-5 d-flex flex-column align-items-center justify-content-around">
          <div class="text-gray-24 font-weight-bold mt-5 text-center">
            {{ $t('auction.no_items') }}
          </div>
          <div class="text-gray-24 font-weight-bold mt-2 text-center">
            {{ $t('auction.list_auction_today') }}
          </div>
          <div>
            <Button
              to="/profile/create-listing"
              class="bg-blue-2 mt-4"
              pill
            >
              <span class="px-4"> {{ $t('auction.create_listing') }}</span>
            </Button>
          </div>
        </div>
      </client-only>
    </div>
    <div v-if="fetchLoading" class="mx-auto mt-5">
      <Loader :loading="fetchLoading"/>
    </div>
    <!--    no item text and action    -->

    <template v-if="!isMobileSize">
      <Pagination
        v-if="haveAuction && !fetchLoading"
        v-model="page"
        :total="totalCount"
        :per-page="perPage"
        :per-page-options="perPageOptions"
        class="mt-4"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </template>
    <template v-else>
      <infinite-loading :key="`${status}-${totalCount}-${sortBy}`" :identifier="infiniteId" @infinite="handleLoading"></infinite-loading>
    </template>
    <!-- For mobile filters begin -->
    <vue-bottom-sheet
      ref="mobileFilter"
      class="responsive-filter"
      max-width="auto"
      max-height="100vh"
      :rounded="true"
    >
      <MobileFilter @filter="onMobileFilter" />
    </vue-bottom-sheet>
    <!-- For mobile filters end -->
  </b-container>
</template>

<script>
import debounce from 'lodash.debounce'
import {mapActions, mapGetters} from 'vuex';
import {SearchInput, FormDropdown, BulkSelectToolbar, Button} from '~/components/common';
import SelectWithCheckbox from '~/components/common/CustomSelectwithCheckbox.vue'
import CalendarImg from '~/assets/img/icons/calendar-gray.svg'
import NavGroup from '~/components/common/NavGroup';
import Pagination from '~/components/common/Pagination';
import SingleItemAuction from '~/components/profile/auctions/SingleItemAuction';
import CollectionAuction from '~/components/profile/auctions/CollectionAuction';
import Loader from '~/components/common/Loader';
import {DELISTED_STATUS, EXPIRED_STATUS, AUCTION_TYPE_SINGLE, AUCTION_TYPE_COLLECTION} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize';
import MobileFilter from '~/components/profile/auctions/filters/MobileFilter.vue';

export default {
  name: 'ProfileAuction',
  components: {
    Loader,
    Button,
    CollectionAuction,
    SingleItemAuction,
    Pagination,
    NavGroup,
    SearchInput,
    FormDropdown,
    SelectWithCheckbox,
    BulkSelectToolbar,
    MobileFilter
  },
  mixins: [screenSize],
  layout: 'Profile',
  middleware: ['vendor'],
  data() {
    return {
      AUCTION_TYPE_SINGLE,
      AUCTION_TYPE_COLLECTION,
      start_date: null,
      end_date: null,
      activeTypeFilters: [],
      activeStatusFilters: [],
      fetchLoading: false,
      selected: [],
      page: 1,
      totalCount: 0,
      perPageOptions: [8, 16, 32, 48],
      perPage: 6,
      CalendarImg,
      uppArrow: '&#8593;',
      downArrow: '&#8595;',
      sortBy: null,
      status: 'all',
      search: '',
      auctionType: null,
      auctionStatus: null,
      deleteAction: false,
      undoAction: false,
      selectedAll: false,
      deleteLoading: false,
      deletePayload: [],
      successMessage: this.$t('auction.success_deleted'),
      SORT_BY: Object.keys(this.$t('auction.sort')).map(key => {
        return {
          label: this.$t('auction.sort.' + key),
          value: key
        }
      }),
      DURATIONS: Object.keys(this.$t('auction.duration_type')).map(key => {
        return {
          label: this.$t('auction.duration_type.' + key),
          value: key
        }
      }),
      AUCTION_TYPES: Object.keys(this.$t('auction.auction_types')).map(key => {
        return {
          text: this.$t('auction.auction_types.' + key),
          value: key
        }
      }),
      STATUS_TYPES: Object.keys(this.$t('auction.status_types')).map(key => {
        return {
          text: this.$t('auction.status_types.' + key),
          value: key
        }
      }),
      infiniteId: +new Date(),
    }
  },
  computed: {
    ...mapGetters({
      getAuctions: 'profile-auction/getAuctions'
    }),
    haveAuction() {
      return this.getAuctions.length > 0
    },
    /**
     * Checking if there are any active filters.
     * @return {boolean}
     */
    haveFilters() {
      return this.activeTypeFilters.length > 0 || this.activeStatusFilters.length > 0 || !!this.start_date || !!this.end_date
    },
    /**
     * Checking if there are any auctions that have expired.
     * @return {boolean}
     */
    haveExpired() {
      return this.getAuctions.filter(auction => auction.status === EXPIRED_STATUS || auction.status === DELISTED_STATUS).length > 0
    },
    isSelectable() {
      return (item) => this.isExpiredOrDelisted(item)
    },
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  mounted() {
    this.FetchAuctions()
  },
  methods: {
    ...mapActions({
      fetchAuctions: 'profile-auction/fetchAuctions',
      deleteAuctions: 'profile-auction/deleteAuctions',
      editAuction: 'profile-auction/editAuction',
    }),
    /**
     * Checking if the item is expired or delisted.
     * @param item
     * @return {boolean}
     */
    isExpiredOrDelisted(item) {
      return this.deleteAction && (item.status === EXPIRED_STATUS || item.status === DELISTED_STATUS)
    },
    /**
     *  Undoing the delete action.
     */
    undoDeleted() {
      this.deleteLoading = true
      this.editAuction({items: this.deletePayload}).then(res => {
        this.deleteAction = false
        this.FetchAuctions()
      }).catch(e => {
        this.$toasted.error(e)
      }).finally(() => {
        this.deleteLoading = false
      })
    },
    /**
     * This method is deleting the selected auctions.
     */
    handleBulkAction() {
      this.deleteLoading = true
      // Create and save payload for deleted auctions in case user tries to UNDO deletion
      this.deletePayload = this.getAuctions.filter(auction => this.selected.includes(auction.id)).map(auction => {
        return {
          id: auction.id,
          status: auction.status
        }
      })
      this.deleteAuctions({ids: this.selected}).then(res => {
        this.deleteAction = false
        this.successMessage += ' '
        this.undoAction = true
        // remove Undo Action after 3 seconds
        setTimeout(() => {
          this.undoAction = false
        }, 3000)
        this.FetchAuctions()
      }).catch(e => {
        this.$toasted.error(e)
      }).finally(() => {
        this.deleteLoading = false
      })
    },
    /**
     * This method is selecting the auction ID and pushing it into the selected array.
     * @param auctionID
     */
    selectAuction(auctionID) {
      const index = this.selected.findIndex(selectedAuctionID => selectedAuctionID === auctionID)
      if (index > -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(auctionID)
      }
      this.selectedAll = this.selected.length === this.getAuctions.length
    },
    selectAllChange(selectedAll) {
      return selectedAll ? this.handleSelectAll() : this.handleDeselectAll()
    },
    /**
     * Selecting all the expired and delisted items.
     */
    handleSelectAll() {
      // only expired/delisted items can be selected
      this.selected = this.getAuctions.filter(auction => auction.status === EXPIRED_STATUS || auction.status === DELISTED_STATUS).map(auction => auction.id)
      if (this.selected.length > 0)
        this.selectedAll = true
    },
    handleDeselectAll() {
      this.selected = []
      this.selectedAll = false
    },
    /**
     * Setting the selected auction to the item that was clicked on and redirect to details page
     * @param item
     */
    auctionClicked(item) {
      this.$store.commit('profile-auction/setSelectedAuction', item)
      this.$nextTick(() => {
        this.$router.push({
          path: `/profile/auctions/${item.id}`,
          params: {
            selected: item
          }
        })
      })
    },
    /**
     * Clearing the filters and update auctions
     */
    clearFilters() {
      this.activeTypeFilters = []
      this.activeStatusFilters = []
      this.start_date = null
      this.end_date = null
      this.FetchAuctions()
    },
    /**
     * Fetching the auctions from the backend and setting the data in the store.
     */
    FetchAuctions() {
      this.fetchLoading = true
      const payload = {
        take: this.perPage,
        page: this.page,
        search: this.search,
        sort_by: this.sortBy,
        types: this.activeTypeFilters.map(filter => filter.value).filter(filter => filter),
        start_date: this.start_date ? this.$moment(this.start_date).format('YYYY-MM-DD') : null,
        end_date: this.end_date ? this.$moment(this.end_date).format('YYYY-MM-DD') : null,
        category: this.duration === 'all' ? null : this.duration,
      }
      if(this.activeStatusFilters.length) {
        const hasAll = this.activeStatusFilters.filter((f) => f.value === 'all')
        if (hasAll.length) {
          payload.status = null
        } else {
          payload.status = this.activeStatusFilters.map((s) => s.value)
        }
      }
      this.fetchAuctions(payload).then(res => {
        this.$store.commit('profile-auction/setAuctions', res.data.data)
        this.totalCount = res.data.total
      }).finally(() => {
        this.fetchLoading = false
      })
    },
    /**
     * A method that is called when the user clicks the delete button. It sets the deleteAction variable to true.
     */
    deleteActionNow() {
      this.deleteAction = true
    },
    /**
     * method is called when the user clicks the cancel button. It sets the deleteAction to false
     * and calls the handleDeselectAll method.
     */
    cancelAction() {
      this.deleteAction = false
      this.handleDeselectAll()
    },
    /**
     * A method that is called when the pagination component is clicked. It is checking if the page is not the same as the
     * page clicked, if it is not, it sets the page to the page clicked and calls the FetchAuctions method.
     * @param bvEvent
     * @param page
     */
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.FetchAuctions()
      }
    },
    /**
     *  A method that is called when the user changes the number of items per page.
     * @param value
     */
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.FetchAuctions()
      }
    },
    /**
     * A method that is called when the user selects a sort by option.
     * @param item
     */
    handleSortBySelect(item) {
      if (item && item.value !== this.sortBy) {
        this.sortBy = item.value
      } else if (this.sortBy !== null) {
        this.sortBy = null
      }
      this.FetchAuctions()
    },
    /**
     * A method that is called when a user clicks on a link in the navbar.
     * @param duration
     */
    handleMethodNavClick(duration) {
      if (duration) {
        this.duration = duration
        this.page = 1
        this.FetchAuctions()
      }
    },
    /**
     * method that is called when the user types in the search bar. It takes the text that the user
     * types in and sets it to the search variable. Then it calls the FetchAuctions method.
     * @param text
     */
    handleSearch: debounce(function (text) {
      this.search = text
      this.FetchAuctions()
    }, 300),

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

    onMobileFilter(filters) {
      this.page = 1
      this.activeStatusFilters = filters.activeStatusFilters;
      this.activeTypeFilters = filters.activeTypeFilters;
      this.sortBy = filters.sortBy;
      this.start_date = filters.start_date;
      this.end_date = filters.end_date;
      this.closeMobileFilter()
      this.FetchAuctions()
    },
    handleLoading($state) {
      const payload = {
        take: this.perPage,
        page: this.page,
        search: this.search,
        sort_by: this.sortBy,
        types: this.activeTypeFilters.map(filter => filter.value).filter(filter => filter),
        start_date: this.start_date ? this.$moment(this.start_date).format('YYYY-MM-DD') : null,
        end_date: this.end_date ? this.$moment(this.end_date).format('YYYY-MM-DD') : null,
        category: this.duration === 'all' ? null : this.duration,
      }
      if(this.activeStatusFilters.length) {
        const hasAll = this.activeStatusFilters.filter((f) => f.value === 'all')
        if (hasAll.length) {
          payload.status = null
        } else {
          payload.status = this.activeStatusFilters.map((s) => s.value)
        }
      }
      this.fetchAuctions(payload).then(res => {
        this.totalCount = res.data.total
        if (this.totalCount <= this.getAuctions.length) {
          $state.complete()
        }
        if (this.page === 1) {
          this.$store.commit('profile-auction/setAuctions', res.data?.data)
        } else {
          const data = [...this.getAuctions, ...res.data?.data]
          this.$store.commit('profile-auction/setAuctions', data)
        }
        this.page = this.page + 1
        $state.loaded()
      })
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.dropdown-filters.sort-by::v-deep
  border: none
  .fw-5
    font-family: $font-montserrat
    font-weight: $regular
    color: $color-gray-5
    @include body-5
  .btn-dropdown
    min-width: 245px
    padding: 0 9px 0 10px
    height: 38px
    border-color: $color-gray-60


.clear-filters
  color: $color-blue-2
  text-decoration: underline
  width: 200px

.bg-blue-2.btn
  background-color: $color-blue-2
  border: none

::v-deep
  .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      border-radius: 0px
      background-color: $color-blue-20
      box-shadow: none
      border: 1px solid $color-blue-20

::v-deep
  .custom-control-input
    ~ .custom-control-label::before
      color: $white
      background-color: $white
      box-shadow: none
      border-radius: 0px
      top: 4px
      left: -20px
      width: 10px
      height: 10px
      border: 1px solid $color-gray-60
    ~ .custom-control-label::after
      left: -20px

::v-deep
  .bg-light
    position: relative
    padding: 0

::v-deep
  .date-dp
    .btn-secondary
      background-color: $white
      border: none

      &:hover
        background-color: $white-2

.delete-expired
  @include body-8-medium
  background-color: $white
  color: $black

.apply-button
  background: $color-blue-20
  color: $color-white-1
  border-radius: 6px

  &:hover
    border: none
    box-shadow: $color-black-1 0 5px 15px
    background: $color-blue-20f
    color: $color-white-1

.date-input
  background-color: white
  border: 1px solid $color-gray-58
  border-right: none
  @include body-5
  font-weight: $regular

.date-input-icon
  background-color: white
  border: 1px solid $color-gray-58
  border-left: none
  border-radius: 0 6px 6px 0

.date-input-group
  max-width: 200px

.mw-734
  max-width: 734px
  margin-right: 71px

::v-deep
  #auction-filters
    button
      border-radius: 4px !important


.container-profile-auctions
  background-color: $color-white-5

  h2.title
    @include heading-3
    font-weight: $bold
    color: $color-black-1

.search-input-wrapper.search-primary::v-deep
  img.icon-search
    object-fit: cover
    height: 18px
  input.search-input
    height: 38px
    border: 1px solid $color-gray-60
    border-radius: 5px
    font-weight: $regular
    @include body-5
    letter-spacing: 0.06em
    color: $color-gray-5
    text-transform: capitalize
.dropdown-filters::v-deep
  min-width: 170px
  height: 38px
  border: none
  .selected
    height: 38px
    border: 1px solid $color-gray-60
    padding: 9px 9px 9px 10px
    &.open
      border: 1px solid $color-gray-60
      border-bottom: none
      &::after
        top: 2px
    &::after
      top: 2px
      right: 25px
  .items
    padding: 0
    overflow: auto
    border: 1px solid $color-gray-60
    .filter-select-count
      padding: 10px !important
    .item-wrapper
      border: none
      & > div
        border: none
        border-bottom: 1px solid $color-gray-60
      .d-flex
        font-weight: $regular
        @include body-5
        color: $black
        border: none
        padding: 9px 10px !important
        .custom-checkbox
          min-height: 18px
          line-height: 18px
          margin-left: 20px !important
  .btn-dropdown
    display: flex
    justify-content: space-between
    color: $color-gray-5
    border-radius: 6px
    height: 46px
    padding: 0 23px

    &.opened
      border-bottom: none

  .search-results
    .popover-body
      > div
        font-family: $font-family-base
        color: $color-black-1
        height: auto
        border: 1px solid $color-gray-58
        padding: 0 23px

        &:hover
          color: $white

        &:last-child
          border-bottom-left-radius: 6px
          border-bottom-right-radius: 6px

        &:first-child
          border-top: none

      .active
        color: $white
        margin: 0 -24px
        background-color: $color-blue-20
        border-radius: 0
      .dropdownItem
        height: 38px
        &:hover
          color: $white
          margin: 0 -24px
          background-color: $color-blue-20
          border-radius: 0
.mr-10
  margin-right: 10px

h4.title
  font-family: $font-sp-pro
  font-weight: $bold
  @include body-1
  @media (max-width: 576px)
    @include body-4
    font-weight: $medium
.container-profile-auctions-listing
  padding: 47px 54px
  .auction-listings-table
    margin: 37px -25px 0
  @media (max-width: 576px)
    padding: 12px 16px
    min-height: calc(100vh - 360px)
    .auction-listings-table
      margin: 27px 0 0
</style>
