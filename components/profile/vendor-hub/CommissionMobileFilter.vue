<template>
  <div v-show="mobileClass" :class="`sidebar-wrapper ${mobileClass} d-flex w-100 flex-column align-items-start`">
    <div :class="`header ${mobileClass} w-100 px-5 py-3 border-bottom`">
      <div :class="`filter-by w-100 ${mobileClass} d-flex aling-items-center justify-content-center`">
        <span>{{ $t('common.filter_by') }}</span>
      </div>
    </div>
    <div :class="`filter-body ${mobileClass} p-4 w-100 h-100`">
      <!-- Status -->
      <div v-show="filterVisibility" class="collapses flex-column w-100">
        <CollapseSelector
          v-model="filters.activeStatusFilters"
          collapseKey="status"
          :title="$t('bids.status')"
          :options="STATUSES"
        />
      </div>
      <!-- Status ends -->

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

      <div v-show="filterVisibility" :class="`section-actions ${mobileClass} d-flex align-items-center w-100 justify-content-between`">
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
export default {
  name: 'MobileFilter',

  components: {
    CollapseSelector,
    Button,
    CollapseDate,
  },

  mixins: [screenSize],

  data() {
    return {
      showFilter: true,
      date: {
        start: '',
        end: ''
      },
      filters: {
        startDate: '',
        endDate: '',
        activeStatusFilters: [],
      },
      STATUSES: Object.keys(this.$t('vendor_hub.commission.statuses')).map(a => {
        return {
          text: this.$t('vendor_hub.commission.statuses.' + a),
          value: a
        }
      }),
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
      if (this.filters.startDate && this.filters.endDate) count += 1
      if (this.filters.activeStatusFilters.length) count += 1
      return count
    }
  },

  methods: {
    resetFilter() {
      this.date = {
        start: '',
        end: ''
      }
      this.filters.startDate = ''
      this.filters.endDate = ''
      this.filters.activeStatusFilters = []
      this.applyFilter()
    },

    // If date is selected.
    dateSelected(value) {
      this.showFilter = value
    },

    // On start date select
    startDateSelected(value) {
      this.date.start = value
      this.filters.startDate = new Date(value).toISOString().substring(0, 10);
    },

    // On end date select
    endDateSelected(value) {
      this.date.end = value
      this.filters.endDate = new Date(value).toISOString().substring(0, 10);
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
    font-style: normal
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
</style>
