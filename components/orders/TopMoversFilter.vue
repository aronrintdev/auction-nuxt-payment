<template>
  <div>
    <!--      End Header Search and Filter   -->
    <b-row class="mt-4">
      <b-col md="12" lg="7">
        <span class="header-title">&nbsp;</span>
        <b-row>
          <b-col md="12" lg="12" class="mt-2">
            <div class="d-flex align-items-center">
              <SearchInput
                :value="filters.search"
                :placeholder="$t('orders.search_placeholder')"
                class="flex-grow-1 mw-734 search"
                :debounce="1000"
                @change="handleSearch"
              />
              <div class="p-1 cursor-pointer d-block d-md-none" @click="toggleBottomSheet">
                <img :src="require('assets/img/icons/filter.svg')"/>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="12" lg="5" class="d-none d-md-block">
        <span class="header-title">{{ $t('orders.date_ordered') }}</span>
        <b-row>
          <b-col sm="12" md="4" class="mt-2">
            <CalendarInput
              class="mr-4"
              :value="filters.start_date"
              :placeholder="$t('bids.start_date')"
              @context="(context) => filters.start_date = context.selectedYMD"
            ></CalendarInput>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <CalendarInput
              class="mr-4"
              :value="filters.end_date"
              :placeholder="$t('bids.end_date')"
              @context="(context) => filters.end_date = context.selectedYMD"
            ></CalendarInput>
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
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
    <b-row class="mt-2 d-none d-md-block">
      <b-col sm="8">
        <span class="header-title">{{ $t('orders.filter_by') }}</span>
        <b-row>
          <b-col sm="12" md="4" class="mt-2">
            <CustomSelectwithCheckbox
              id="auction-type-selector"
              class="mr-4 dropdown-filters"
              :value="filters.auctionType"
              :options="orderTypes"
              :icon-arrow-down="DownArrow"
              title="Type"
              :updateFilters="filters.activeTypeFilters"
            />
          </b-col>
          <b-col sm="12" md="4" class="mt-2">
            <CustomSelectwithCheckbox
              id="auction-status-selector"
              class="mr-4 dropdown-filters"
              :value="filters.statusType"
              :options="orderStatuses"
              :title="$t('bids.status')"
              :updateFilters="filters.activeStatusFilters"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <bottom-sheet :show="bottomSheetShow" title="Filter By">
      <div class="p-3">
        <div>
          <button @click="() => bottomSheetShow=false">Hide</button>
          <b-form-group label="Sort" v-slot="{ ariaDescribedby }">
            <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="A">Date Ordered: Recent to
              Oldest
            </b-form-radio>
            <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">Date Ordered: Oldest to
              Recent
            </b-form-radio>
            <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">Product Name: A -> Z
            </b-form-radio>
            <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">Product Name: Z -> A
            </b-form-radio>
            <b-form-radio :aria-describedby="ariaDescribedby" name="some-radios" value="B">Vendor Payout: Lowest to
              Highest
            </b-form-radio>
          </b-form-group>
        </div>
        <div class="border-top">
          Type
        </div>
        <div class="border-top">
          Status
        </div>
        <div class="border-top">
          Date Ordered
        </div>
      </div>
    </bottom-sheet>
  </div>
</template>

<script>
import {Button, CustomSelectwithCheckbox, SearchInput} from '~/components/common';
import DownArrow from '~/assets/img/icons/down-arrow.svg';
import CalendarImg from '~/assets/img/icons/calendar-gray.svg';
import CalendarInput from '~/components/common/form/CalendarInput';
import BottomSheet from '~/components/common/BottomSheet';

export default {
  name: 'TopMoversFilter',
  components: {
    CalendarInput,
    SearchInput,
    CustomSelectwithCheckbox,
    Button,
    BottomSheet
  },
  data() {
    return {
      bottomSheetShow: false,
      DownArrow,
      CalendarImg,
      orderTypes: Object.keys(this.$t('orders.order_types')).map(a => {
        return {
          text: this.$t('orders.order_types.' + a),
          value: a
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
      }

      this.$store.commit('vendors/setFilters', this.filters)
      this.$store.dispatch('vendors/getVendorOrders', 1)
    },
    applyFilter() {
      this.$store.commit('vendors/setFilters', this.filters)
      this.$store.dispatch('vendors/getVendorOrders', 1)
    },
    toggleBottomSheet() {
      this.bottomSheetShow = !this.bottomSheetShow
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

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
</style>
