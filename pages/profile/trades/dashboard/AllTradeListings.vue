<template>
  <b-col class="container-trade-dashboard">
    <b-row class="heading-dashboard mt-4">
      {{$t('trades.my_trade_listings')}}
    </b-row>
    <b-row class="mt-5">
      <b-col lg="8" sm="12" class="pl-0">
        <SearchInput
          :value="searchText"
          variant="primary"
          :placeholder="$t('trades.search_trades')"
          :clearSearch="true"
          bordered
          @change="onSearchInput"
          @clear="onSearchInput"
        />
        <SearchBarProductsList v-if="searchedProducts.length > 0" :productItems="searchedProducts" width="700px" class="position-absolute"/>
      </b-col>
      <b-col lg="4" sm="12" class="d-flex justify-content-end pr-4">
        <CustomDropdown
          v-model="orderFilter"
          type="single-select"
          :options="orderFilterItems"
          :label="orderFilterLabel"
          variant="white"
          width="250px"
          maxWidth="245px"
          dropDownHeight="38px"
          @change="changeOrderFilter"
        />
      </b-col>
    </b-row>
    <b-row class="d-flex mt-4">
      <b-col lg="3" sm="12" class="pl-0 pr-3">
        <label>{{$t('trades.filter_by')}}</label>
        <b-row class="pl-2">
          <b-col md="12 p-0" sm="12">
            <CustomDropdown
              v-model="statusFilter"
              type="multi-select-checkbox"
              :options="getStatusFilterItems"
              :label="statusFilterLabel"
              optionsWidth="custom"
              variant="white"
              dropDownHeight="38px"
              width="390px"
              @getResults="fetchTradesListing"
              @change="changeStatusFilter"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" sm="12" class="pl-0">
        <label>{{$t('trades.listed_date')}}</label>
        <b-row class="pl-2">
          <b-col md="4 p-0" sm="12" class="mr-3">
            <CalendarInput
              :value="start_date"
              :placeholder="$t('trades.start_date')"
              @context="(context) => start_date = context.selectedYMD"
            />
          </b-col>
          <b-col md="4 p-0" sm="12" class="mr-3">
            <CalendarInput
              :value="end_date"
              :placeholder="$t('trades.end_date')"
              @context="(context) => end_date = context.selectedYMD"
            />
          </b-col>
          <b-col md="2 p-0" sm="12" class="mr-3">
            <Button variant="blue" @click="applyFilters">{{$t('trades.apply')}}</Button>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="3" class="mt-custom d-flex justify-content-end pr-4">
        <Button v-if="totalCount" variant="transparent" @click="removeExpired()">{{$t('trades.delete_expired_listings')}}</Button>
      </b-col>
    </b-row>
    <b-row class="mt-4 listings">
      {{$t('trades.listings',{'0': totalCount})}}
    </b-row>
    <b-row v-if="delete_expired">
      <BulkSelectToolbar
        ref="bulkSelectToolbar"
        :active="selected.length>0"
        :selected="selected"
        :unit-label="$tc('common.product', selected.length)"
        :action-label="$t('trades.delete_selected')"
        class="mt-3"
        @close="selected = []"
        @selectAll="handleSelectAll()"
        @deselectAll="selected = []"
        @submit="deleteMySelectedTrades"
      />
    </b-row>
    <b-row v-if="delete_expired" class="pt-2 pl-4">
      <b-form-checkbox
        id="checkbox-1"
        v-model="selectAllExpired"
        name="checkbox-1"
        @change="toggleAllExpired()"
      >
        {{$t('trades.select_all_expired_trades')}}
      </b-form-checkbox>
    </b-row>
    <div v-if="width<= 500">
      <trade-listing-items-mobile
        v-if="totalCount"
        :tradesList="tradeListing"
        :selectable="delete_expired"
        :selected="selected"
        @click="selectItems"
      ></trade-listing-items-mobile>
      <div v-else>{{$t('trades.no_trade_list_have_been_found')}}</div>
    </div>
    <div v-else>
      <trade-listing-items-web
        v-if="totalCount"
        :tradesList="tradeListing"
        :selectable="delete_expired"
        :selected="selected"
        @click="selectItems"
      ></trade-listing-items-web>
      <div v-else>{{$t('trades.no_trade_list_have_been_found')}}</div>
    </div>
<!--    <trade-listing-items-->
<!--      v-if="totalCount"-->
<!--      :tradesList="tradeListing"-->
<!--      :selectable="delete_expired"-->
<!--      :selected="selected"-->
<!--      @click="selectItems"-->
<!--    ></trade-listing-items>-->

    <b-row class="justify-content-center mt-4 mb-5">
      <Pagination
        v-if="totalCount"
        v-model="page"
        :total="totalCount"
        :per-page="perPage"
        class="mb-4 mt-2"
        :per-page-options="perPageOptions"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </b-row>
  </b-col>
</template>

<script>
import {mapActions} from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput';
import CustomDropdown from '~/components/common/CustomDropdown';
import CalendarInput from '~/components/common/form/CalendarInput';
import Button from '~/components/common/Button';
// import TradeListingItems from '~/pages/profile/trades/dashboard/TradeListingItems';
import Pagination from '~/components/common/Pagination';
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar';
import SearchBarProductsList from '~/components/product/SearchBarProductsList'
import {
  PAGE,
  PER_PAGE,
  PER_PAGE_OPTIONS,
  FILTER_RECENT_TO_OLDEST,
  FILTER_OLDEST_TO_RECENT,
  FILTER_STATUS_LIVE,
  FILTER_STATUS_EXPIRED,
  TAKE_SEARCHED_PRODUCTS,
  FILTER_STATUS_DELISTED
} from '~/static/constants/trades'

export default {
  name: 'AllTradeListings',
  components:{
    BulkSelectToolbar,
    Pagination,
    // TradeListingItems,
    Button,
    CalendarInput,
    CustomDropdown,
    SearchInput,
    SearchBarProductsList,
    tradeListingItemsMobile:()=> import('./TradeListingItemsMobile'),
    tradeListingItemsWeb:()=>import('./TradeListingItemsWeb'),
  },
  layout: 'Profile',
  data (){
    return {
      width:'',
      searchText: null,
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      orderFilter: null,
      orderFilterItems: [
        { text: this.$t('trades.recent_to_oldest'), value: FILTER_RECENT_TO_OLDEST },
        { text: this.$t('trades.oldest_to_recent'), value: FILTER_OLDEST_TO_RECENT },
      ],
      statusFilterLabel: this.$t('trades.status'),
      statusFilter: [],
      statusFilterItems: [
        { text: this.$t('trades.live'), value: FILTER_STATUS_LIVE },
        { text: this.$t('trades.expired'), value: FILTER_STATUS_EXPIRED },
        { text: this.$t('trades.delisted'), value: FILTER_STATUS_DELISTED },
      ],
      start_date: null,
      end_date: null,
      searchedProducts: [],
      tradeListing: [],
      page: PAGE,
      perPage: PER_PAGE,
      totalCount: 0,
      perPageOptions: PER_PAGE_OPTIONS,
      delete_expired: false,
      selected: [],
      TAKE_SEARCHED_PRODUCTS,
      selectAllExpired: false
    }
  },
  computed: {
    getStatusFilterItems(){
      return this.statusFilterItems.map(status => status.value)
    }
  },
  mounted() {
    this.fetchTradesListing()

    // To filter trades
    this.$root.$on('productClick', (product) => {
      this.searchTrades(product)
    })

    // To reset search filter trades
    this.$root.$on('click_outside', () => {
      this.searchedProducts = []
    })
    this.width = window.innerWidth
  },
  methods:{
    ...mapActions('trades', ['deleteSelectedTrades']),

    toggleAllExpired(){
      const expiredTradesNotSelected = this.tradeListing.filter(trade => (trade.is_expired && ! this.selected.includes(trade.id))).map((trade) => {
        return trade.id
      })
      const expiredTradesSelected = this.tradeListing.filter(trade => (trade.is_expired && this.selected.includes(trade.id))).map((trade) => {
        return trade.id
      })
      if(this.selectAllExpired){
        if(expiredTradesNotSelected.length){
          this.selected = this.selected.concat(expiredTradesNotSelected)
        }
      }else{
        this.selected = this.selected.filter((selectedTradeId) => {
          return ! expiredTradesSelected.includes(selectedTradeId)
        })
      }
    },
    selectItems(id){
      if(!this.selected.includes(id)){
        this.selected.push(id);
      }else{
        this.selected.splice(this.selected.indexOf(id), 1);
      }
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
      this.statusFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.statusFilter, 2) || this.$t('trades.status') // 2 is max number of labels show in filter
    },
    searchTrades(product){
      this.searchText = (product) ? product.name : ''
      this.searchedProducts = []
      this.fetchTradesListing()
    },
    fetchTradesListing(){
      this.selected = []
      this.selectAllExpired = false
      this.$axios
        .get('trades', {
          params: {
            search: this.searchText,
            per_page: this.perPage,
            page: this.page,
            from_date: this.start_date,
            to_date: this.end_date,
            order_by: this.orderFilter,
            status: this.statusFilter.join(',')
          }
        })
        .then((response) => {
          this.tradeListing = response.data.data.data
          this.totalCount = parseInt(response.data.data.total)
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.tradeListing =  []
          this.totalCount = 0
        })
    },
    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput: debounce(function (term) {
      if (term) {
        this.searchText = term
        this.$axios
          .post('search/products', {
            filters: {
              search: term.toLowerCase(),
              take: TAKE_SEARCHED_PRODUCTS
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
      this.fetchTradesListing()
    }, 500),

    /***
     * This function is used to change order listing of
     * inventory items
     * @param selectedOrder
     */
    changeOrderFilter(selectedOrder) {
      this.orderFilter = selectedOrder
      const orderFilteredKey = this.orderFilterItems.find(item => item.value === this.orderFilter)
      this.orderFilterLabel = this.$options.filters.capitalizeFirstLetter(orderFilteredKey.text)
      this.fetchTradesListing()
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
        this.fetchTradesListing()
      }
    },

    applyFilters(){
      this.fetchTradesListing()
    },

    /**
     * This function is used for change no records showing on per page
     * @param value
     */
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.fetchTradesListing()
      }
    },

    handleSelectAll() {
      this.selected = this.tradeListing.map((trade) => {
        return trade.id
      })
    },

    removeExpired(){
      this.delete_expired = !this.delete_expired
    },

    deleteMySelectedTrades(){
      this.deleteSelectedTrades({
        trade_ids: this.selected.join(',')
      })
        .then(() => {
          this.$toasted.success(this.$t('trades.trades_deleted_successfully'))
          this.selected = []
          this.selectAllExpired = false
          this.delete_expired = false
          this.page = 1
          this.fetchTradesListing()
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    }

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
  @media(min-width: 300px) and (max-width : 500px)
   padding-left: 15px
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
</style>
