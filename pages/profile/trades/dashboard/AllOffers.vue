<template>
  <div class="container-trade-dashboard">
    <b-row class="heading-dashboard mt-4">
      {{$t('trades.my_trade_offer')}}
    </b-row>
    <b-row class="mt-5">
      <b-col lg="8" sm="12" class="pl-0">
        <SearchInput
          :value="searchText"
          variant="primary"
          :placeholder="$t('trades.search_trades_offers')"
          :clearSearch="true"
          bordered
          @change="onSearchInput"
        />
        <SearchBarProductsList v-if="searchedProducts.length > 0" :productItems="searchedProducts" width="700px" class="position-absolute" @productClick="searchTrades"/>
      </b-col>
      <b-col lg="4" sm="12" class="d-flex justify-content-end pr-4">
        <CustomDropdown
          v-model="orderFilter"
          type="single-select"
          :options="orderFilterItems"
          :label="orderFilterLabel"
          variant="white"
          maxWidth="245px"
          dropDownHeight="38px"
          @change="changeOrderFilter"
        />
      </b-col>
    </b-row>
    <b-row class="d-flex mt-4">
      <b-col lg="5" sm="12" class="pl-0 pr-3">
        <label>{{$t('trades.filter_by')}}</label>
        <b-row class="pl-2">
          <b-col md="5 p-0" sm="12">
            <CustomDropdown
              v-model="conditionFilter"
              type="multi-select"
              :options="conditionFilterItems"
              :label="conditionFilterLabel"
              variant="white"
              dropDownHeight="38px"
              @getResults="fetchOffersListing"
              @change="changeConditionFilter"
            />
          </b-col>
          <b-col md="7 pl-3" sm="12">
            <CustomDropdown
              v-model="statusFilter"
              type="multi-select"
              :options="statusFilterItems"
              :label="statusFilterLabel"
              variant="white"
              dropDownHeight="38px"
              @getResults="fetchOffersListing"
              @change="changeStatusFilter"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" sm="12" class="pl-0 offset-1">
        <label class="offset-md-1">{{$t('trades.listed_date')}}</label>
        <b-row class="justify-content-end">
          <b-col md="4" sm="12" >
            <CalendarInput
              :value="start_date"
              :placeholder="$t('trades.start_date')"
              @context="(context) => start_date = context.selectedYMD"
            />
          </b-col>
          <b-col md="4" sm="12" >
            <CalendarInput
              :value="end_date"
              :placeholder="$t('trades.end_date')"
              @context="(context) => end_date = context.selectedYMD"
            />
          </b-col>
          <b-col md="3" sm="12"  >
            <Button variant="blue" @click="applyFilters">{{$t('trades.apply')}}</Button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="pt-57 listings">
      {{$t('trades.trade_offers',{'0': totalOffers})}}
    </b-row>
    <b-row class="justify-content-center mt-3">
        <NavGroup
          v-model="offerType"
          :data="offerTypeFilters"
          nav-key="type"
          class="type-nav mt-3 mb-3"
          @change="handleMethodNavClick"
        />
    </b-row>
    <b-row v-if="deleteExpired">
      <BulkSelectToolbar
        ref="bulkSelectToolbar"
        :active="selected.length>0"
        :selected="selected"
        :unit-label="$tc('common.product', selected.length)"
        action-label="Delete Selected"
        class="mt-3"
        @close="selected = []"
        @selectAll="handleSelectAll()"
        @deselectAll="selected = []"
      />
    </b-row>
    <b-row v-if="deleteExpired" class="pt-2 pl-4">
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        {{$t('trades.select_all_expired_trades')}}
      </b-form-checkbox>
    </b-row>
    <div class="my-trade-listing-section">
      <div class="row justify-content-center">
        <div class="text-center">
        <trade-offer-items v-if="tradeOffers.length > 0" :offers="tradeOffers"></trade-offer-items>
        <div v-else>{{(offerType !== ALL_OFFER_TYPE) ? $t('trades.no_trade_offers_have_been') + $t('trades.offer_type.' + offerType) : $t('trades.no_trade_offers_have_been_found')}}</div>
        </div>
      </div>
    </div>
    <b-row class="justify-content-center mt-4 mb-5">
      <Pagination
        v-if="totalOffers"
        v-model="page"
        :total="totalOffers"
        :per-page="perPage"
        class="mb-4 mt-2"
        :per-page-options="perPageOptions"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </b-row>
  </div>
</template>

<script>

import SearchInput from '~/components/common/SearchInput';
import CustomDropdown from '~/components/common/CustomDropdown';
import CalendarInput from '~/components/common/form/CalendarInput';
import Button from '~/components/common/Button';
import Pagination from '~/components/common/Pagination';
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar';
import NavGroup from '~/components/common/NavGroup';
import {
  PAGE,
  PER_PAGE,
  PER_PAGE_OPTIONS,
  DEFAULT_OFFER_TYPE,
  FILTER_RECENT_TO_OLDEST,
  FILTER_OLDEST_TO_RECENT,
  ALL_OFFER_TYPE,
  FILTER_STATUS_LIVE,
  FILTER_STATUS_EXPIRED,
  FILTER_CONDITION_POOR,
  FILTER_CONDITION_FAIR,
  FILTER_CONDITION_EXCELLENT,
  TAKE_SEARCHED_PRODUCTS
} from '~/static/constants/trades';
import TradeOfferItems from '~/pages/profile/trades/dashboard/TradeOfferItems';
import SearchBarProductsList from '~/components/product/SearchBarProductsList'



export default {
  name: 'AllOffers',
  components:{
    BulkSelectToolbar,
    Pagination,
    TradeOfferItems,
    Button,
    CalendarInput,
    CustomDropdown,
    SearchInput,
    NavGroup,
    SearchBarProductsList
  },
  layout: 'Profile',
  data (){
    return {
      ALL_OFFER_TYPE,
      FILTER_STATUS_LIVE,
      FILTER_STATUS_EXPIRED,
      FILTER_CONDITION_POOR,
      FILTER_CONDITION_FAIR,
      FILTER_CONDITION_EXCELLENT,
      searchText: null,
      searchedProducts: [],
      offerType: DEFAULT_OFFER_TYPE,
      offerTypeFilters: Object.keys(this.$t('trades.offer_type')).map(a => {
        return {
          label: this.$t('trades.offer_type.' + a),
          value: a
        }
      }),
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      orderFilter: FILTER_RECENT_TO_OLDEST,
      orderFilterItems: [
        { text: this.$t('trades.recent_to_oldest'), value: FILTER_RECENT_TO_OLDEST },
        { text: this.$t('trades.oldest_to_recent'), value: FILTER_OLDEST_TO_RECENT },
      ],
      statusFilterLabel: this.$t('trades.status'),
      statusFilter: [],
      statusFilterItems: [
        { text: this.$t('trades.live'), value: FILTER_STATUS_LIVE },
        { text: this.$t('trades.expired'), value: FILTER_STATUS_EXPIRED },
      ],
      conditionFilterLabel: this.$t('trades.trade_condition'),
      conditionFilter: [],
      conditionFilterItems: [
        { text: this.$t('trades.poor'), value: FILTER_CONDITION_POOR },
        { text: this.$t('trades.fair'), value: FILTER_CONDITION_FAIR },
        { text: this.$t('trades.excellent'), value: FILTER_CONDITION_EXCELLENT },
      ],
      start_date: null,
      end_date: null,
      page: PAGE,
      perPage: PER_PAGE,
      totalOffers: 0,
      tradeOffers: [],
      perPageOptions: PER_PAGE_OPTIONS,
      deleteExpired: false,
      selected: [],
    }
  },
  mounted() {
    this.fetchOffersListing()
  },
  methods:{
    /**
     * This function is used to change condition filter
     * @param selectedConditions
     */
     changeConditionFilter(selectedConditions) {
      if (!this.conditionFilter.includes(selectedConditions)) {
        this.conditionFilter.push(selectedConditions)
      } else {
        this.conditionFilter = this.conditionFilter.filter(item => item !== selectedConditions)
      }
      this.conditionFilterLabel = this.joinAndCapitalizeFirstLetters(this.conditionFilter, 2) || this.$t('trades.trade_condition') // 2 is max number of labels show in filter
    },
    /**
     * This function is used to change status filter
     * @param selectedStatuses
     */
     changeStatusFilter(selectedStatuses) {
      if (!this.statusFilter.includes(selectedStatuses)) {
        this.statusFilter.push(selectedStatuses)
      } else {
        this.statusFilter = this.statusFilter.filter(item => item !== selectedStatuses)
      }
      this.statusFilterLabel = this.joinAndCapitalizeFirstLetters(this.statusFilter, 2) || this.$t('trades.status') // 2 is max number of labels show in filter
    },
    /**
     * This function is used to show selected items by joining them
     * in string format separated by commas
     * @param selectedOptionsArray
     * @param maxLabelsAllowed
     * @returns {string|*}
     */
    joinAndCapitalizeFirstLetters(selectedOptionsArray, maxLabelsAllowed) {
      selectedOptionsArray = selectedOptionsArray.map(o => o[0].toUpperCase() + o.slice(1))
      return (selectedOptionsArray.length > maxLabelsAllowed)
        ? selectedOptionsArray.slice(0, maxLabelsAllowed).join(', ') + '...' // append dots if labels exceed limits of showing characters
        : selectedOptionsArray.join(', ')
    },
    fetchOffersListing(){
      this.$axios
        .get('trades/submitted-offers', {
          params: {
            type: this.offerType,
            per_page: this.perPage,
            page: this.page,
            from_date: this.start_date,
            to_date: this.end_date,
            searchText: this.searchText,
            order_by: this.orderFilter,
            condition: this.conditionFilter.join(','),
            status: this.statusFilter.join(',')
          }
        })
        .then((response) => {
          this.tradeOffers = response.data.data.data
          this.totalOffers = parseInt(response.data.data.total)
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.tradeOffers =  []
          this.totalOffers =  0
        })
    },
    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput(term) {
      if (term) {
        this.searchText = term
        this.$axios
          .post('search/products', {
            filters: {
              search: term.toLowerCase(),
              take: TAKE_SEARCHED_PRODUCTS // get 5 record
            },
            page: 1
          })
          .then((response) => {
            this.searchedProducts = response.data && response.data.results && response.data.results.data
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
            this.searchedProducts =  []
          })
      } else{
        this.searchText =  null
        this.searchedProducts =  []
      }
    },

    /***
     * This function is used to change order listing of
     * inventory items
     * @param selectedOrder
     */
    changeOrderFilter(selectedOrder) {
      this.orderFilter = selectedOrder
      const orderFilteredKey = this.orderFilterItems.find(item => item.value === this.orderFilter)
      this.orderFilterLabel = this.capitalizeFirstLetter(orderFilteredKey.text)
      this.fetchOffersListing()
    },

    /**
     * This function do first letter of word capital
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter(string) {
      if (typeof string === 'string')
        return string[0].toUpperCase() + string.slice(1)
      else if (typeof string === 'object' && string.size && typeof string.size === 'string')
        return string.size[0].toUpperCase() + string.size.slice(1);
    },

    /**
     * This function is used to change pagination page no
     * and get record again for that page
     * @param bvEvent
     * @param page
     */
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.fetchOffersListing()
      }
    },

    /**
     * This function is used for change no records showing on per page
     * @param value
     */
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.fetchOffersListing()
      }
    },

    handleSelectAll() {
      this.selected = ''
    },

    removeExpired(){
      this.deleteExpired = !this.deleteExpired
    },

    handleMethodNavClick(type) {
      if (type) {
        this.offerType = type
        this.fetchOffersListing()
      }
    },
    applyFilters(){
      this.fetchOffersListing()
    },

  }
}
</script>

<style scoped lang="sass">

@import '~/assets/css/_variables'

.heading-dashboard
  font-family: $font-family-montserrat
  font-style: normal
  @include heading-13
  text-transform: capitalize
  color: $color-black-1

.container-trade-dashboard
  padding-left: 54px

::v-deep .date-input-icon
  background-color: $color-white-1
  border: 1px solid $color-gray-60
  border-left: none
  border-radius: 0 6px 6px 0
  height: 38px

::v-deep .date-input-group
  width: 170px

::v-deep .date-dp
  .btn-secondary
    background-color: $white
    border: none

    &:hover
      background-color: $white-2

::v-deep .label-wrapper
  border-radius: 5px

.listings
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-7-bold
  color: $color-black-1

.mt-custom
  margin-top: 32px

.pt-57
  padding-top: 57px
</style>

