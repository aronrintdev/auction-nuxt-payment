<template>
  <div>
    <!--      Header Search and Filter   -->
    <b-row class="mt-2">
      <b-col md="12" lg="7" class="mt-2">
        <SearchInput
          :value="filters.search"
          :placeholder="$t('bids.search_placeholder')"
          class="flex-grow-1 mw-734"
          :debounce="1000"
          @change="handleSearch"
        />
      </b-col>
      <b-col md="12" lg="5" class="mt-2 d-flex w-100 justify-content-end">
        <FormDropdown
          id="sortBySelect"
          :value="filters.sortBy"
          :placeholder="$t('bids.sort_by')"
          :items="SORT_BY"
          class="dropdown-filters sortBy "
          :icon-arrow-down="DownArrow"
          @select="handleSortBySelect"
        ></FormDropdown>
      </b-col>
    </b-row>
    <!--      End Header Search and Filter   -->
    <b-row class="mt-4">
      <b-col md="12" lg="7">
        <span class="header-title">{{ $t('bids.filter_by') }}</span>
        <b-row>
          <b-col sm="12" md="4" class="mt-2">
            <CustomSelectwithCheckbox
              id="auction-type-selector"
              class="mr-4 dropdown-filters"
              :value="filters.auctionType"
              :options="AUCTION_TYPES"
              :icon-arrow-down="DownArrow"
              :title="$t('bids.auction_type')"
              :updateFilters="filters.activeTypeFilters"
            />
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <CustomSelectwithCheckbox
              id="auction-status-selector"
              class="mr-4 dropdown-filters"
              :value="filters.statusType"
              :options="STATUSES"
              :title="$t('bids.status')"
              :updateFilters="filters.activeStatusFilters"
            />
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <CustomSelectwithCheckbox
              id="auction-autobid-selector"
              class="mr-4 dropdown-filters"
              :value="filters.outbidTypes"
              :options="OUTBID_TYPES"
              :title="$t('bids.auto_bid_on_off')"
              :updateFilters="filters.activeOnOffBidFilters"
            />
          </b-col>
        </b-row>

      </b-col>
      <b-col md="12" lg="5">
        <span class="header-title">{{ $t('bids.bid_date') }}</span>
        <b-row>
          <b-col sm="12" md="4" class="mt-2">
            <CalendarInput
              class="mr-4"
              :value="filters.bid_start_date"
              :placeholder="$t('bids.start_date')"
              @context="(context) => filters.bid_start_date = context.selectedYMD"
            ></CalendarInput>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <CalendarInput
              class="mr-4"
              :value="filters.bid_end_date"
              :placeholder="$t('bids.end_date')"
              @context="(context) => filters.bid_end_date = context.selectedYMD"
            ></CalendarInput>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <div class="d-flex flex-column position-relative">
              <Button
                variant="primary"
                class="bg-blue-2 apply-button text-white"
                @click="GetBids"
              >{{ $t('vendor_purchase.apply') }}
              </Button>
              <span v-if="haveFilters" role="button" class="clear-filters position-absolute mt-5 ml-2"
                    @click="clearFilters">{{ $t('bids.clear_filters') }}</span>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {SearchInput, FormDropdown, CustomSelectwithCheckbox, Button} from '~/components/common';
import profileBidsMixin from '~/plugins/mixins/profile-bid';
import DownArrow from '~/assets/img/icons/down-arrow.svg';
import CalendarImg from '~/assets/img/icons/calendar-gray.svg';
import CalendarInput from '~/components/common/form/CalendarInput';

export default {
  name: 'BidsFilters',
  components: {
    CalendarInput, SearchInput, FormDropdown, CustomSelectwithCheckbox, Button},
  mixins: [profileBidsMixin],
  data() {
    return {
      DownArrow,
      CalendarImg,
      filters: {
        activeTypeFilters: [],
        activeStatusFilters: [],
        activeOnOffBidFilters: [],
        search: '',
        sortBy: null,
        auctionType: null,
        statusType: null,
        outbidTypes: null,
        bid_start_date: null,
        bid_end_date: null,
      }
    }
  },
  computed: {
    /**
     * Checking if there are any filters active.
     * @returns {boolean|*}
     */
    haveFilters() {
      return this.filters.activeTypeFilters.length > 0 ||
        this.filters.bid_start_date ||
        this.filters.bid_end_date ||
        this.filters.activeStatusFilters.length > 0 ||
        this.filters.activeOnOffBidFilters.length > 0
    },
  },
  methods: {
    /**
     * user typed in the search input
     * @param text
     */
    handleSearch(text) {
      this.filters.search = text
      this.GetBids()
    },
    clearFilters() {
      this.filters = {
        activeTypeFilters: [],
        activeStatusFilters: [],
        activeOnOffBidFilters: [],
        search: '',
        sortBy: null,
        auctionType: null,
        statusType: null,
        outbidTypes: null,
        bid_start_date: null,
        bid_end_date: null,
      }
      this.GetBids()
    },
    /**
     * A method that is called when the user selects a sort option from the dropdown.
     * @param item
     */
    handleSortBySelect(item) {
      if (item && item.value !== this.filters.sortBy) {
        this.filters.sortBy = item.value
      } else {
        this.filters.sortBy = null
      }
    },
    GetBids() {
      this.$store.commit('profile-bids/setFilters', this.filters)
      this.$nextTick(() => {
        this.$emit('update')
      })
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.header-title
  @include body-4
  font-weight: $normal
  font-family: $font-family-base


.apply-button button
  background: $color-blue-2
  color: $color-white-1
  height: 60px
  button
    height: 42px


  &:hover
    border: none
    box-shadow: $color-black-12 0 5px 15px
    background: $color-blue-2
    color: $color-white-1

.clear-filters
  color: $color-blue-2
  text-decoration: underline
  width: 200px

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none

.dropdown-filters.sortBy
  width: 300px

@media (max-width: 993px)
  .dropdown-filters.sortBy
    width: 100%


:deep(.dropdown-filters)
  height: 38px

  .selected
    @include body-5
    font-weight: $regular
    color: $color-gray-5
    border-radius: 4px
    height: 35px
    overflow: hidden
    white-space: nowrap

  .btn-dropdown
    display: flex
    justify-content: space-between
    color: $color-gray-5
    border: 1px solid $color-gray-60
    border-radius: 6px
    height: 38px
    padding: 0 23px

    &.opened
      border: 2px solid $color-gray-60


  .search-results
    .popover-body
      > div
        font-family: $font-family-base
        color: $color-black-1
        height: 46px
        border: 1px solid $color-gray-60
        padding: 0 23px

        &:hover
          color: $white
          background-color: $color-blue-2
          border: none

        &:last-child
          border-bottom-left-radius: 6px
          border-bottom-right-radius: 6px

        &:first-child
          border-top: none

      .active
        color: $white
        background-color: $color-blue-2
        border: none

.date-input
  @include body-5
  font-weight: $regular
  color: $color-gray-5 !important
  background-color: white
  border: 1px solid $color-gray-60
  border-right: none

.date-input-icon
  background-color: white
  border: 1px solid $color-gray-60
  border-left: none
  border-radius: 0 6px 6px 0


.mw-734
  max-width: 734px

:deep(#auction-filters)
    button
      border-radius: 4px !important

::v-deep 
  .search-input-wrapper input.search-input
    border: 1px solid $white-2
  .form-dropdown-wrapper .btn-dropdown
    height: 40px
    border-radius: 5px
    border: 1px solid $white-2

  .custom-selectbox
    height: 40px
    border: 1px solid $white-2
    .selected
      padding: 10px 16px
      height: 38px

  .date-input-group
    height: 40px
    .form-control
      height: 100%
</style>
