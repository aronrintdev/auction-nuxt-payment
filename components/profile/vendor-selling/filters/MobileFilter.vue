<template>
  <div v-show="mobileClass" :class="`sidebar-wrapper ${mobileClass} d-flex w-100 flex-column align-items-start`">
    <div :class="`header ${mobileClass} w-100 px-5 py-3 border-bottom`">
      <div :class="`filter-by w-100 ${mobileClass} d-flex aling-items-center justify-content-center`">
        <span>{{ $t('common.filter_by') }}</span>
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
            <b-form-radio
              v-model="filter.sortby"
              class="recent-to-old text-normal"
              name="sortby"
              value="date-new-old"
              >{{ $t('offers_received.offers_recent_old') }}</b-form-radio
            >
            <b-form-radio
              v-model="filter.sortby"
              class="old-to-recent text-normal"
              name="sortby"
              value="date-old-new"
              >{{ $t('offers_received.offers_old_recent') }}</b-form-radio
            >
          </div>
        </div>
        <hr />
      </div>
      <!-- Sort By ends -->
      <!-- Status -->
      
      <div v-show="filterVisibility" class="collapses flex-column w-100">
        <CollapseStatus
          :value="filter.status"
          collapseKey="status"
          :title="$t('selling_page.filter.status')"
          :options="status"
          @selected="statusSelected"
        />
      </div>
      <!-- Status ends -->
      <hr v-show="filterVisibility" />
      <div class="collapses flex-column">
        <CollapseDate
          :value="filter.date"
          collapseKey="offer-date"
          :title="$t('selling_page.filter.date_send')"
          :options="status"
          :clearDate="!filter.date"
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
import CollapseStatus from './CollapseStatus.vue'
import CollapseDate from './CollapseDate.vue'
import screenSize from '~/plugins/mixins/screenSize'
import { Button } from '~/components/common'
export default {
  name: 'MobileFilter',

  components: {
    CollapseStatus,
    Button,
    CollapseDate,
  },

  mixins: [screenSize],

  data() {
    return {
      status: [
        {
          label: this.$t('selling_page.listed'),
          value: 'listed',
        },
        {
          label: this.$t('selling_page.delisted'),
          value: 'delisted',
        },
      ],
      showFilter: true,
      filter: {
        date: {
          start: '',
          end: ''
        },
        status: [],
        sortby: null,
      },
      count: 0,

    }
  },

  computed: {
    filterVisibility: (vm) => {
      return vm.showFilter
    },

    sortbyStatus: (vm) => {
      return vm.filter.sortby
    },

    filterStatus: (vm) => {
      return vm.filter.status
    }
  },

  watch: {
    sortbyStatus: {
      deep: true,
      handler(newValue, oldValue) {
        if(!oldValue){
          this.count = this.count + 1
        }
      }
    },
  },

  methods: {
    resetFilter() {
      this.count = 0
      this.filter.date = null
      this.filter.status = []
      this.filter.sortby = null
      this.applyFilter()
    },

    // If status is selected
    statusSelected(value) {
      value.forEach(element => {
        if(!this.filter.status.includes(element)){
          this.count = this.count + 1
        }
      });
      this.filter.status = value
    },

    // If date is selected.
    dateSelected(value) {
      this.showFilter = value
    },

    // On start date select
    startDateSelected(value) {
      if(this.filter.date && !this.filter.date.end){
        if(this.filter.date && !this.filter.date.start) {
          this.count = this.count + 1
        }
        if(this.filter.date && this.filter.date.start && !value){
          this.count = this.count - 1
        }
      }
      this.filter.date.start = value
    },

    // On end date select
    endDateSelected(value) {
      if(this.filter.date && !this.filter.date.start){
        if(this.filter.date && !this.filter.date.end) {
          this.count = this.count + 1
        }
        if(this.filter.date && this.filter.date.end && !value){
          this.count = this.count - 1
        }
      }
      this.filter.date.end = value
    },

    applyFilter(){
      this.$emit('filter', { ...this.filter })
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
      margin-top: 6rem

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
