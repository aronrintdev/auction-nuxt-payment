<template>
  <div>
    <!--      Header Search and Filter   -->
    <div class="d-flex align-items-center flex-column flex-md-row">
      <SearchInput
        :value="filters.search"
        :placeholder="$t('bids.search_placeholder')"
        class="mw-734"
        :debounce="1000"
        inputHeight="38px"
        @change="handleSearch"
      />
      <FormDropdown
        id="sortBySelect"
        :value="filters.sortBy"
        :placeholder="$t('bids.sort_by')"
        :items="SORT_BY"
        class="dropdown-filters sortBy "
        :icon-arrow-down="DownArrow"
        @select="handleSortBySelect"
      ></FormDropdown>
    </div>
    <!--      End Header Search and Filter   -->
    <div class="filters d-flex">
      <div class="filter-group">
        <div class="header-title">{{ $t('bids.filter_by') }}</div>
        <div class="d-flex align-items-center">
          <CustomSelectwithCheckbox
            id="auction-type-selector"
            class="dropdown-filters"
            :value="filters.auctionType"
            :options="AUCTION_TYPES"
            :icon-arrow-down="DownArrow"
            :title="$t('bids.auction_type')"
            :updateFilters="filters.activeTypeFilters"
          />
          <CustomSelectwithCheckbox
            id="auction-status-selector"
            class="dropdown-filters mr-79"
            :value="filters.statusType"
            :options="STATUSES"
            :title="$t('bids.status')"
            :updateFilters="filters.activeStatusFilters"
          />
        </div>
      </div>
      <div class="filter-group">
        <div class="header-title">{{ $t('bids.bid_date') }}</div>
        <div class="d-flex align-items-center">
          <CalendarInput
            :value="filters.bid_start_date"
            :max-date="filters.bid_end_date"
            groupClass="mr-20"
            :placeholder="$t('bids.start_date')"
            @context="(context) => filters.bid_start_date = context.selectedYMD"
          ></CalendarInput>
          <CalendarInput
            :value="filters.bid_end_date"
            :min-date="filters.bid_start_date"
            groupClass="mr-20"
            :placeholder="$t('bids.end_date')"
            @context="(context) => filters.bid_end_date = context.selectedYMD"
          ></CalendarInput>
          <div class="d-flex align-items-center position-relative">
            <b-button
              variant="primary"
              class="apply-button text-white border-0"
              @click="GetBids"
            >{{ $t('vendor_purchase.apply') }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import {SearchInput, FormDropdown, CustomSelectwithCheckbox} from '~/components/common'
import profileBidsMixin from '~/plugins/mixins/profile-bid'
import DownArrow from '~/assets/img/icons/down-arrow.svg'
import CalendarImg from '~/assets/img/icons/calendar-gray.svg'
import CalendarInput from '~/components/common/form/CalendarInput'


export default {
  name: 'BidsFilters',
  components: {
    CalendarInput, SearchInput, FormDropdown, CustomSelectwithCheckbox },
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
  mounted() {
    this.filters.search = this.$store.getters['profile-bids/getFilters'].search
  },
  methods: {
    /**
     * user typed in the search input
     * @param text
     */
    handleSearch: debounce( function (text) {
      this.filters.search = text
      this.GetBids()
    }, 300),
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
      this.GetBids()
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
  @include body-8
  font-weight: $normal
  font-family: $font-sp-pro
  margin-bottom: 5px

.apply-button
  background: $color-blue-20
  color: $color-white-1
  border-radius: 5px
  box-shadow: none
  @include body-8
  font-weight: $normal
  font-family: $font-sp-pro
  height: 38px
  width: 89px

  &:hover
    border: none
    background: $color-blue-20f
    color: $color-white-1

.clear-filters
  color: $color-blue-20
  text-decoration: underline
  @include body-8
  white-space: nowrap

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none

.dropdown-filters.sortBy
  min-width: 245px
  margin-left: 71px

.filters
  margin-top: 18px
  .dropdown-filters
    width: 245px
    margin-right: 12px
    &.mr-79
      margin-right: 79px


@media (max-width: 993px)
  .dropdown-filters.sortBy
    width: 100%
    margin-left: 0


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
  .custom-checkbox
    .custom-control-input:checked ~ .custom-control-label::after
      background-image: none

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
    padding-right: 45px
    margin-left: -30px

.dropdown-filters::v-deep
  height: 38px
  min-width: 170px
  border: none
  .selected
    height: 38px
    border: 1px solid $color-gray-60
    padding: 9px 9px 9px 10px
    font-family: $font-montserrat
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
    padding: 0 9px 0 10px
    height: 38px
    border-color: $color-gray-60

    .fw-5
      font-family: $font-montserrat
      font-weight: $regular
      color: $color-gray-5
      @include body-5
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

.date-input-group::v-deep
  background-color: $white
  width: 170px

  .date-input
    @include body-5
    font-weight: $regular
    background-color: $white
    color: $color-gray-5
    letter-spacing: 0
    border: 1px solid $color-gray-60
    border-right: none
  .btn-secondary
    background-color: transparent

.date-input-icon
  background-color: $white
  border: 1px solid $color-gray-60
  border-left: none
  border-radius: 0 6px 6px 0

.mr-20
  margin-right: 20px

.mw-734
  width: 734px

:deep(#auction-filters)
    button
      border-radius: 4px !important

</style>
