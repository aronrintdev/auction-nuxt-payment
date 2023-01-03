<template>
  <div>
    <!--      End Header Search and Filter   -->
    <b-row class="d-flex align-items-center">
      <b-col sm="10">
        <b-row>
          <b-col md="12" lg="12">
            <div class="d-flex align-items-center">
              <SearchInput
                :value="filters.search"
                :placeholder="$t('orders.search_placeholder').toString()"
                class="flex-grow-1 search"
                :debounce="1000"
                @change="handleSearch"
              />
              <div class="p-1 cursor-pointer d-block d-md-none" @click="open">
                <img :src="require('assets/img/icons/filter.svg')"/>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="2" class="text-right d-none d-md-block">
        <button class="btn-export text-center border-0" @click="handleExportBtnClick">{{
            $t('orders.export_to_csv')
          }}
        </button>
      </b-col>
      <b-col sm="12" class="d-none d-md-block"></b-col>
      <b-col sm="10" class="d-none d-md-block">
        <b-row class="mt-md-2">
          <b-col sm="5">
            <span class="header-title">{{ $t('orders.filter_by') }}</span>
            <b-row class="d-flex justify-content-between">
              <b-col sm="5" class="mt-2">
                <CustomSelectwithCheckbox
                  id="auction-type-selector"
                  class="mr-4 dropdown-filters"
                  :value="filters.orderType"
                  :options="orderTypes"
                  :icon-arrow-down="DownArrow"
                  title="Type"
                  :updateFilters="filters.activeTypeFilters"
                />
              </b-col>
              <b-col sm="6" class="mt-2">
                <CustomSelectwithCheckbox
                  id="auction-status-selector"
                  class="mr-4 dropdown-filters"
                  :value="filters.statusType"
                  :options="orderStatuses"
                  :title="$t('bids.status').toString()"
                  :updateFilters="filters.activeStatusFilters"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <span class="header-title">{{ $t('orders.date_ordered') }}</span>
            <b-row>
              <b-col sm="4" class="mt-2">
                <CalendarInput
                  class="mr-4"
                  :value="filters.start_date"
                  :placeholder="$t('bids.start_date').toString()"
                  @context="(context) => filters.start_date = context.selectedYMD"
                ></CalendarInput>
              </b-col>
              <b-col sm="4" class="mt-2">
                <CalendarInput
                  class="mr-4"
                  :value="filters.end_date"
                  :placeholder="$t('bids.end_date').toString()"
                  @context="(context) => filters.end_date = context.selectedYMD"
                ></CalendarInput>
              </b-col>
              <b-col sm="4" class="mt-2">
                <div class="d-flex flex-column position-relative">
                  <Button
                    variant="primary"
                    class="bg-blue-2 apply-button text-white"
                    @click="applyFilter"
                  >{{ $t('vendor_purchase.apply') }}
                  </Button>
                  <span v-if="haveFilters" role="button" class="clear-filters position-absolute mt-5 ml-2"
                        @click="clearFilters">{{ $t('bids.clear_filters') }}</span>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="d-block d-md-none">
      <vue-bottom-sheet ref="ordersFilter" max-height="90%" :is-full-screen="true">
        <div class="d-flex flex-column justify-content-between h-100">
          <div>
            <div class="filter-title text-center pb-1">{{ $t('orders.filter_by') }}</div>
            <div class="p-3 bottom-sheet-content">
              <div>
                <b-form-group v-slot="{ ariaDescribedby }" :label="$t('orders.sort')">
                  <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="A">
                    {{ $t('orders.date_ordered') }}: {{ $t('orders.recent_to_oldest') }}
                  </b-form-radio>
                  <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">
                    {{ $t('orders.date_ordered') }}: {{ $t('orders.oldest_to_recent') }}
                  </b-form-radio>
                  <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">
                    {{ $t('orders.product_name') }}: {{ $t('orders.a_to_z') }}
                  </b-form-radio>
                  <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">
                    {{ $t('orders.product_name') }}: {{ $t('orders.z_to_a') }}
                  </b-form-radio>
                  <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">
                    {{ $t('orders.vendor_payout') }}: {{ $t('orders.lowest_to_highest') }}
                  </b-form-radio>
                </b-form-group>
              </div>
              <div class="border-top py-2">
                <collapsible-box :title="$t('orders.type').toString()" :second-title="selectedTypesString | truncate(32, '...')">
                  <div class="row my-2">
                    <div v-for="type in orderTypes" :key="type.key" class="col-4 my-1 filter-boxes">
                      <div
                        :class="`border p-1 cursor-pointer h-100 d-flex align-items-center ${selectedFilterStyle(type, filters.activeTypeFilters)}`"
                        @click="selectFilter(type, filters.activeTypeFilters, 'activeTypeFilters')">
                        <div class="text-center w-100 filter-text">{{ type.text }}</div>
                      </div>
                    </div>
                  </div>
                </collapsible-box>
              </div>
              <div class="border-top py-2">
                <collapsible-box :title="$t('orders.status').toString()" :second-title="selectedStatusString | truncate(32, '...')">
                  <div class="row my-2">
                    <div v-for="status in orderStatuses" :key="status.key" class="col-4 my-1 filter-boxes">
                      <div
                        :class="`border p-1 cursor-pointer h-100 d-flex align-items-center ${selectedFilterStyle(status, filters.activeStatusFilters)}`"
                        @click="selectFilter(status, filters.activeStatusFilters, 'activeStatusFilters')">
                        <div class="text-center w-100 filter-text">{{ status.text }}</div>
                      </div>
                    </div>
                  </div>
                </collapsible-box>
              </div>
              <div class="border-top py-2">
                <collapsible-box :title="$t('orders.date_ordered').toString()" :second-title="selectedDateString">
                  <div class="row">
                    <div class="col mt-2">
                      <CalendarInput
                        class="mr-4"
                        :value="filters.start_date"
                        :placeholder="$t('bids.start_date').toString()"
                        @context="(context) => filters.start_date = context.selectedYMD"
                      ></CalendarInput>
                    </div>
                    <div class="col mt-2">
                      <CalendarInput
                        class="mr-4"
                        :value="filters.end_date"
                        :placeholder="$t('bids.end_date').toString()"
                        @context="(context) => filters.end_date = context.selectedYMD"
                      ></CalendarInput>
                    </div>
                  </div>
                </collapsible-box>
              </div>
            </div>
          </div>
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center pb-4">
              <button class="btn-bottom-sheet reset" @click="clearFilters">{{ $t('orders.reset') }}</button>
              <button class="btn btn-bottom-sheet apply-filter" @click="applyFilter">{{
                  $t('orders.apply_filter')
                }}
              </button>
            </div>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
  </div>
</template>

<script>
import {Button, CustomSelectwithCheckbox, SearchInput} from '~/components/common';
import DownArrow from '~/assets/img/icons/down-arrow.svg';
import CalendarImg from '~/assets/img/icons/calendar-gray.svg';
import CalendarInput from '~/components/common/form/CalendarInput';
import CollapsibleBox from '~/components/common/CollapsibleBox';

export default {
  name: 'TopMoversFilter',
  components: {
    CalendarInput,
    SearchInput,
    CustomSelectwithCheckbox,
    Button,
    CollapsibleBox
  },
  data() {
    return {
      bottomSheetShow: false,
      DownArrow,
      CalendarImg,
      orderTypes: Object.keys(this.$t('orders.order_types')).map(a => {
        const rectify = {'buy': 1, 'auction': 3, 'trade': 4}
        return {
          text: this.$t('orders.order_types.' + a),
          value: rectify[a]
        }
      }),
      orderStatuses: Object.keys(this.$t('orders.order_statuses')).map(a => {
        return {
          text: this.$t('orders.order_statuses.' + a),
          value: a
        }
      }),
      filters: {
        activeTypeFilters: [],
        activeStatusFilters: [],
        search: '',
        start_date: null,
        end_date: null,
        orderType: null,
        statusType: null
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
        this.filters.start_date ||
        this.filters.end_date ||
        this.filters.activeStatusFilters.length > 0
    },
    selectedStatusString() {
      return this.filters.activeStatusFilters.map(x => x.text).join(', ')
    },
    selectedTypesString() {
      return this.filters.activeTypeFilters.map(x => x.text).join(', ')
    },
    selectedDateString() {
      if (this.filters.start_date || this.filters.end_date) {
        return this.filters.start_date + ' to ' + this.filters.end_date
      }
      return ''
    }
  },
  methods: {
    /**
     * user typed in the search input
     * @param text
     */
    handleSearch(text) {
      this.filters.search = text
    },
    clearFilters() {
      this.filters = {
        activeTypeFilters: [],
        activeStatusFilters: [],
        search: '',
        start_date: null,
        end_date: null,
        orderType: null,
        statusType: null
      }

      this.$store.commit('vendors/setFilters', this.filters)
      this.$store.dispatch('vendors/getVendorOrders', 1)
    },
    applyFilter() {
      this.$store.commit('vendors/setFilters', this.filters)
      this.$store.dispatch('vendors/getVendorOrders', 1)
      this.close()
    },
    open() {
      this.$refs.ordersFilter.open();
    },
    close() {
      this.$refs.ordersFilter.close();
    },
    selectFilter(type, activeFilters, filterName) {
      const tempActiveFilters = activeFilters
      const found = tempActiveFilters.findIndex(x => x.value === type.value)

      if (found >= 0) {
        tempActiveFilters.splice(found, 1)
      } else {
        tempActiveFilters.push({'text': type.text, 'value': type.value})
        this.$set(activeFilters, filterName, tempActiveFilters)
      }
    },
    selectedFilterStyle(type, activeFilters) {
      return activeFilters.find(x => x.value === type.value) ? 'active-filter' : ''
    },
    handleExportBtnClick(e){
      this.$emit('export', e)
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'
.btn-export
  height: 38px
  background: $black
  border-radius: 5px
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  @include body-8
  color: $white
  padding: 10px 25px

.filter-boxes
  border-color: $color-gray-28
  min-height: 45px
  padding-left: 3px !important
  padding-right: 3px !important

  .border
    border-radius: 3px

  .filter-text
    color: $color-gray-28

.filter-boxes
  @include body-5-regular

  .active-filter
    border-color: $color-black-1 !important
    background: $color-white-7

    .filter-text
      color: $color-black-1


.header-title
  @include body-4
  font-weight: $normal
  font-family: $font-family-sf-pro-display

.apply-button button
  background: $color-blue-20
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
  background-color: $color-blue-20
  border: none

::v-deep .btn.btn-secondary
  background-color: $white

::v-deep .input-group.date-input-group
  border-radius: 6px

.dropdown-filters.sortBy
  width: 300px

::v-deep .dropdown-filters
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

.search
  border: 1px solid $color-gray-60
  border-radius: 5px
  height: 38px

::v-deep #search-textbox-.search-input.form-control
  height: 36px !important

.mw-734
  max-width: 734px

.filter-title
  @include body-17-bold

.btn-bottom-sheet
  border-radius: 20px
  padding: 5px 30px
  font-size: 16px

.btn-bottom-sheet.reset
  background: $color-white-1
  border: 1px solid $color-black-1

.btn-bottom-sheet.apply-filter
  background: $color-blue-20
  border: 1px solid $color-blue-20
  color: $color-white-1
  font-family: $font-sp-pro

::v-deep .col-form-label
  font-weight: bold
  color: $color-blue-20
  @include body-14

::v-deep label.custom-control-label
  font-weight: normal
  color: $color-black-9

::v-deep .custom-control.custom-radio
  padding-top: 5px
  padding-bottom: 5px

::v-deep .search .search-input.form-control
  font-family: $font-montserrat
  @include body-9

::v-deep .custom-selectbox .selected
  padding: 10px 14px

  &::after
    top: 3px
    right: 20px

::v-deep .custom-control-label::before
  background-color: $color-white-1
  border: 1px solid $color-black-1

::v-deep .custom-radio .custom-control-input:checked ~ .custom-control-label::after
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23000'/%3E%3C/svg%3E")

::v-deep .custom-control-label::after
  background: 50%/90% 100% no-repeat

::v-deep .custom-control-input:checked ~ .custom-control-label::before
  border-color: $color-black-1
  background-color: $color-white-1

.dropdown-filters::v-deep
  height: 38px
  min-width: 170px
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

.dropdown-filters::v-deep
  .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      border-radius: 0px
      background-color: $color-blue-20
      box-shadow: none
      border: 1px solid $color-blue-20

.dropdown-filters::v-deep
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


@media (max-width: 992px)
  ::v-deep .search
    border: none

  ::v-deep .search-input-wrapper.search-md input.search-input
    font-size: 12px
    background: #F7F7F7
    border-radius: 8px

  ::v-deep
    .custom-control-label::before, .custom-control-input:focus ~ .custom-control-label::before
      box-shadow: none

@media (min-width: 993px)
  .search-text-wrapper
    flex: 0 0 56% !important
    max-width: 56% !important

  .search-date-wrapper
    flex: 0 0 44% !important
    max-width: 44% !important

  .box-gap
    gap: 24px
  ::v-deep .date-input
    background: $color-white-1
</style>
