<template>
  <div v-show="mobileClass" :class="`sidebar-wrapper ${mobileClass} d-flex w-100 flex-column align-items-start`">
    <div :class="`header ${mobileClass} w-100 px-5 py-3 border-bottom`">
      <div :class="`filter-by w-100 ${mobileClass} d-flex aling-items-center justify-content-center`">
        <span class="font-weight-bold">{{ $t('common.filter_by') }}</span>
      </div>
    </div>
    <div :class="`filter-body ${mobileClass} p-4 w-100 h-100`">
      <!-- Sort By -->
      <div v-show="filterVisibility" class="sort-by">
        <div :class="`sort-by-filter ${mobileClass}`">
          <div class="header-filter">
            {{ $t('offers_received.sort') }}
          </div>
          <div :class="`body-filter mt-2 ${mobileClass} f-w-normal`">
            <b-form-radio v-for="(sortBy, index) in SORT_BY" :key="index"
              v-model="filters.sortBy"
              class="recent-to-old text-normal mt-1"
              name="sortby"
              :value="sortBy.value"
              >
              <span class="body-5-normal color-black-9 py-3">
                {{ sortBy.label }}
              </span>
            </b-form-radio>
          </div>
        </div>
        <hr />
      </div>
      <!-- Sort By ends -->
      <!-- Status -->
      <div v-show="filterVisibility" class="collapses flex-column w-100">
        <CollapseSelector
          v-model="filters.activeStatusFilters"
          collapseKey="status"
          :title="$t('selling_page.filter.status')"
          :options="STATUSES"
        />
      </div>
      <!-- Status ends -->
      <hr v-show="filterVisibility" />

      <!-- Auction Type -->
      <div v-show="filterVisibility" class="collapses flex-column w-100">
        <CollapseSelector
          v-model="filters.activeTypeFilters"
          collapseKey="auction_type"
          :title="$t('bids.auction_type')"
          :options="AUCTION_TYPES"
        />
      </div>
      <!-- Auction ends -->
      <hr v-show="filterVisibility" />

      <!-- Outbid Type -->
      <div v-show="filterVisibility" class="collapses flex-column w-100">
        <CollapseSelector
          v-model="filters.activeOnOffBidFilters"
          :multiSelect="false"
          collapseKey="outbid_type"
          :title="$t('bids.auto_bid_on_off')"
          :options="OUTBID_TYPES"
        />
      </div>
      <!-- Outbid ends -->
      <hr v-show="filterVisibility" />

      <div class="collapses flex-column">
        <CollapseDate
          :value="date"
          collapseKey="offer-date"
          :title="$t('selling_page.filter.date_send')"
          :options="STATUSES"
          :clearDate="!date"
          @showFilters="dateSelected"
          @startDate="startDateSelected"
          @endDate="endDateSelected"
        />
      </div>

      <hr v-show="filterVisibility" />

      <div v-show="filterVisibility" :class="`section-actions ${mobileClass} d-flex align-items-center w-100 justify-content-between pb-5`">
        <Button v-if="filterVisibility" pill class="btn-reset btn-light" @click="resetFilter">{{
          $t('offers_received.reset')
        }}</Button>

        <Button
          v-if="filterVisibility"
          pill
          class="btn-apply border-0"
          @click="applyFilter()"
          ><span
            >{{ $t('offers_received.apply_filters') }}
            <span v-if="count">&#40;{{ count }}&#41;</span></span
          ></Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import CollapseSelector from '~/components/common/mobileFilters/CollapseSelector'
import CollapseDate from '~/components/common/mobileFilters/CollapseDate'
import screenSize from '~/plugins/mixins/screenSize'
import { Button } from '~/components/common'
import profileBidsMixin from '~/plugins/mixins/profile-bid'
export default {
  name: 'MobileFilter',

  components: {
    CollapseSelector,
    Button,
    CollapseDate,
  },

  mixins: [screenSize, profileBidsMixin],

  data() {
    return {
      showFilter: true,
      date: {
        start: '',
        end: ''
      },
      filters: {
        bid_start_date: '',
        bid_end_date: '',
        activeTypeFilters: [],
        activeOnOffBidFilters: [],
        activeStatusFilters: [],
        sortBy: null,
      },
    }
  },

  computed: {
    filterVisibility: (vm) => {
      return vm.showFilter
    },
    sortbyStatus: (vm) => {
      return vm.filters.sortBy
    },
    count() {
      let count = 0
      if (this.filters.bid_start_date && this.filters.bid_end_date) count += 1
      if (this.filters.activeTypeFilters.length) count += 1
      if (this.filters.activeOnOffBidFilters.length) count += 1
      if (this.filters.activeStatusFilters.length) count += 1
      if (this.filters.sortBy) count += 1
      return count
    }
  },

  mounted() {
  },

  methods: {
    resetFilter() {
      this.date = {
        start: '',
        end: ''
      }
      this.filters.bid_start_date = ''
      this.filters.bid_end_date = ''
      this.filters.activeStatusFilters = []
      this.filters.sortBy = null
      this.filters.activeTypeFilters = []
      this.filters.activeOnOffBidFilters = []
      this.applyFilter()
    },

    // If date is selected.
    dateSelected(value) {
      this.showFilter = value
    },

    // On start date select
    startDateSelected(value) {
      this.date.start = value
      this.filters.bid_start_date = value
    },

    // On end date select
    endDateSelected(value) {
      this.date.end = value
      this.filters.bid_end_date = value
    },

    applyFilter(){
      this.$emit('filter', { ...this.filters })
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.sidebar-wrapper
  font-family: $font-sp-pro
  &.mobile
    height: 450px

  .btn-apply
    height: 40px
    left: 211px
    top: 746px
    background: $color-blue-20
    border-radius: 20px

  .btn-reset
    width: 135px
    height: 40px
    left: 28px
    top: 746px
    border: 1px solid $color-black-1
    border-radius: 20px
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-black-1

  .section-actions
    &.mobile
      margin-top: 20%

@media (max-width: 576px)
  .sidebar-wrapper
    .collapses
      >div
        max-width: 100%

        &:not(:last-child)
          margin-right: 0px
/** Filter css */
.filter-by
  &.mobile
    font-family: $font-sp-pro
    font-style: bold
    @include body-17-bold
    letter-spacing: -0.02em
    color: $color-black-1

.sort-by-filter
  &.mobile
    .header-filter
      font-family: $font-sp-pro
      font-style: normal
      @include body-4-bold
      color: $color-blue-20
/** Filter css ends */

@media (max-width: 407px)
  .btn-apply
    span
      font-family: $font-sp-pro
      font-style: normal
      @include body-4-medium
      color: $color-white-1
@media(max-width: 332px)
  .btn-apply
    span
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-white-1
.color-black-9
  color: $color-black-9
</style>
