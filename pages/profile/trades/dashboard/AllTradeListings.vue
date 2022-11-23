<template>
  <b-col class="container-trade-dashboard">
    <div v-if="!isScreenXS" class="mt-4 heading-dashboard">
      {{ $t('trades.my_trade_listings') }}
    </div>
    <div v-if="isScreenXS">
      <div class="d-flex justify-content-between pt-3">
        <div class="col-11 d-flex flex-column px-0">
          <SearchInputMobile
            :value="searchText"
            variant="primary"
            :placeholder="$t('trades.search_trades')"
            :clearSearch="true"
            inputHeight="33px"
            class="listings-search"
            bordered
            @change="onSearchInput"
            @clear="onSearchInput"
          />
          <div class="position-relative">
            <SearchBarProductsList 
              v-if="searchedProducts.length > 0" 
              :productItems="searchedProducts" 
              listItemClass="rounded-0"
              class="position-absolute right-0 left-0 mx-0 mt-1"
              wrapperClass="px-0"
            />
          </div>
        </div>
        <div class="mt-2">
          <img class="float-right image-filter"
              :src="require('~/assets/img/filterTradeList.svg')"  @click="openBottomFilter()"/>
          <vue-bottom-sheet
            ref="browseFiltersSheet"
            class="more-options"
            max-width="auto"
            max-height="90vh"
            :rounded="true"
          >
            <div class="filtersSection">
              <div class="mt-1 ml-2">
                <span class="filtersHeading ml-2">{{$t('auctions.frontpage.filterbar.sort')}}</span>
                  <b-form-radio-group
                    v-model="orderFilter"
                    class="radios mt-1 mb-1 sorted ml-3"
                    :options="orderFilterItems"
                    :checked="orderFilter"
                    @change="changeOrderFilter($event, 'CUSTOM_VARIABLE')"
                  />
              </div>
              <hr class="hr" />
              <div class="mt-1 ml-2">
                <div v-b-toggle="'collapse-1'" class="d-flex">
                  <b-row class="filtersHeading ml-2">
                    <b-col class="col-sm-6">{{$tc('common.category')}}</b-col>
                    <b-col class="col-sm-6">
                      <div class="d-flex justify-content-end mr-3">

                        <img  v-if="isVisible" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                        <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                      </div>
                    </b-col>
                  </b-row>
                </div>
                <b-collapse id="collapse-1" v-model="isVisible">
                  <b-row class="row mt-1">
                    <b-col v-for="(status, key) in getStatusFilterItems" :key="'cat-' + key">
                      <div :value="status" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                           @click="changeStatusFilterMobile(status)">
                        {{status}}
                      </div>
                    </b-col>
                  </b-row>
                </b-collapse>
              </div>
              <hr class="hr" />
              <div class="mt-1 ml-2">
                <div v-b-toggle="'collapse-dateSent'" class="d-flex">
                  <b-row class="filtersHeading ml-2">
                    <b-col class="col-sm-6">{{$tc('trades.date_sent')}}</b-col>
                    <b-col class="col-sm-6">
                      <div class="d-flex justify-content-end mr-3">
                        <img  v-if="isVisibleSizeType" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                        <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                      </div>
                    </b-col>
                  </b-row>
                </div>
                <b-collapse id="collapse-dateSent" v-model="isVisibleSizeType">
                  <div class="d-flex mt-2">
                    <div>
                      <CalendarInput
                        :value="start_date"
                        :placeholder="$t('trades.start_date')"
                        class="dates"
                        @context="(context) => start_date = context.selectedYMD"
                      />
                    </div>
                    <div>
                      <CalendarInput
                        :value="end_date"
                        :placeholder="$t('trades.end_date')"
                        class="dates"
                        @context="(context) => end_date = context.selectedYMD"
                      />
                    </div>
                  </div>
                </b-collapse>
              </div>
              <hr class="hr" />
              <div class="d-flex mb-3">
                              <div class="ml-2">
                                <b-btn class="resetBtn" @click="clearAllFilters">{{$t('common.reset')}}</b-btn>
                              </div>
                <div class="ml-5">
                  <b-btn class="filter-btn" @click="applyFilters">{{$t('common.apply_filters')}}</b-btn>
                </div>
              </div>
            </div>
          </vue-bottom-sheet>
          <b-row v-if="showFilters" class="d-flex justify-content-center m-3" @click="showFilters = !showFilters">
            <img :src="require('~/assets/img/icons/arrow-up-dark-gray.svg')" />
          </b-row>
        </div>
      </div>
    </div>

    <div v-else>
      <b-row class="mt-3 justify-content-between">
        <b-col lg="8" sm="12" class="">
          <SearchInput
            :value="searchText"
            variant="primary"
            :placeholder="$t('trades.search_trades')"
            :clearSearch="true"
            bordered
            :inputStyle="{
              border: '1px solid #CCC',
              height: '38px',
              borderBottomLeftRadius: searchedProducts.length > 0 ? 0 : '8px',
              borderBottomRightRadius: searchedProducts.length > 0 ? 0 : '8px',
            }"
            @change="onSearchInput"
            @clear="onSearchInput"
          />
          <SearchBarProductsList 
            v-if="searchedProducts.length > 0"
            :productItems="searchedProducts"
            listItemClass="rounded-0 border-top-0"
            class="position-absolute"
          />
        </b-col>
        <b-col lg="3" sm="12" class="d-flex justify-content-end mt-2 mt-lg-0">
          <CustomDropdown
            v-model="orderFilter"
            type="single-select"
            :options="orderFilterItems"
            :label="orderFilterLabel"
            variant="white"
            :arrowStyle="{
              color: '#000',
              marginTop: '0 !important'
            }"
            class="w-100"
            paddingX="10px"
            optionsWidth="custom"
            borderRadius="5px"
            borderRadiusClose="5px 5px 0 0"
            borderRadiusOptions="0 0 5px 5px"
            dropDownHeight="38px"
            @change="changeOrderFilter"
          />
        </b-col>
      </b-row>
      <div class="row mt-3 justify-content-lg-between flex-wrap">
        <b-col lg="3" sm="12" class="">
          <label>{{$t('trades.filter_by')}}</label>
          <b-row class="">
            <b-col sm="12">
              <CustomDropdown
                v-model="statusFilter"
                type="multi-select-checkbox"
                :options="getStatusFilterItems"
                :label="statusFilterLabel"
                optionsWidth="custom"
                variant="white"
                dropDownHeight="38px"
                class="w-100"
                borderRadius="5px"
                borderRadiusClose="5px 5px 0 0"
                borderRadiusOptions="0 0 5px 5px"
                paddingX="10px"
                :arrowStyle="{
                  color: '#000',
                  marginTop: '0 !important'
                }"
                @getResults="fetchTradesListing"
                @change="changeStatusFilter"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="3" lg="6" sm="12" class="mt-3 mt-lg-0">
          <label>{{ $t('trades.listed_date') }}</label>
          <b-row class="">
            <b-col md="6" sm="12" class="">
              <CalendarInput
                :value="start_date"
                :placeholder="$t('trades.start_date')"
                class="w-100"
                inputClass="bg-white"
                @context="(context) => start_date = context.selectedYMD"
              />
            </b-col>
            <b-col md="6" sm="12" class="mt-2 mt-md-0">
              <CalendarInput
                :value="end_date"
                :placeholder="$t('trades.end_date')"
                class="w-100"
                inputClass="bg-white"
                @context="(context) => end_date = context.selectedYMD"
              />
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="2" sm="6" class="mt-2 d-lg-flex align-items-lg-end justify-content-lg-end">
          <Button variant="dark-blue" @click="applyFilters">{{$t('trades.apply')}}</Button>
        </b-col>

        <b-col lg="4" sm="6" 
          class="mt-custom mt-2 d-flex justify-content-end 
                justify-content-lg-start justify-content-xl-end align-items-xl-end"
        >
          <Button v-if="totalCount" variant="transparent" @click="removeExpired()">{{$t('trades.delete_expired_listings')}}</Button>
        </b-col>
      </div>
    </div>

    <div class="mt-4 listings">
      {{ $t('trades.listings', { '0': totalCount }) }}
    </div>
    <div v-if="delete_expired">
      <BulkSelectToolbar
        ref="bulkSelectToolbar"
        :active="selected.length > 0"
        :selected="selected"
        :unit-label="$tc('common.product', selected.length)"
        :action-label="$t('trades.delete_selected')"
        class="mt-3"
        @close="selected = []"
        @selectAll="handleSelectAll()"
        @deselectAll="selected = []"
        @submit="$bvModal.show('confirm-bulk-delete')"
      />
    </div>
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
    <div v-if="isScreenXS">
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

    <ConfirmModal
      id="confirm-bulk-delete"
      :confirmLabel="$t('common.delete')"
      :message="$t('common.bulk_delete_warning')"
      :messageStyle="{
        fontFamily: 'SF Pro Display',
        fontWeight: 400,
        fontSize: '18px',
        color: '#000',
        marginTop: '-30px',
        width: '100%'
      }"
      @confirm="deleteMySelectedTrades"
    />
  </b-col>
</template>

<script>
import {mapActions} from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput';
import SearchInputMobile from '~/components/common/SearchInputMobile';
import CustomDropdown from '~/components/common/CustomDropdown';
import CalendarInput from '~/components/common/form/CalendarInput';
import Button from '~/components/common/Button';
import Pagination from '~/components/common/Pagination';
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar';
import SearchBarProductsList from '~/components/product/SearchBarProductsList'
import ScreenSize from '~/plugins/mixins/screenSize'
import { ConfirmModal } from '~/components/modal'
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
    Button,
    CalendarInput,
    CustomDropdown,
    SearchInput,
    SearchInputMobile,
    SearchBarProductsList,
    ConfirmModal,
    tradeListingItemsMobile:()=> import('./TradeListingItemsMobile'),
    tradeListingItemsWeb:()=>import('./TradeListingItemsWeb'),
  },
  mixins: [ScreenSize],
  layout: 'Profile',
  data (){
    return {
      isVisible:false,
      showFilters : false,
      isVisibleSizeType: false,
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
      selectAllExpired: false,
    }
  },
  computed: {
    getStatusFilterItems(){
      return this.statusFilterItems.map(status => status.value)
    }
  },
  mounted() {
    this.width = window.innerWidth
    this.fetchTradesListing()

    // To filter trades
    this.$root.$on('productClick', (product) => {
      this.searchTrades(product)
    })

    // To reset search filter trades
    this.$root.$on('click_outside', () => {
      this.searchedProducts = []
    })
  },
  methods:{
    ...mapActions('trades', ['deleteSelectedTrades']),
    openBottomFilter() {
      this.$refs.browseFiltersSheet.open();
    },
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
    changeStatusFilterMobile(selectedStatuses){
      if (!this.statusFilter.includes(selectedStatuses)) {
        this.statusFilter.push(selectedStatuses)
      }
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
      this.$refs.browseFiltersSheet.close();
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
      this.$refs.browseFiltersSheet.close();
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

    removeExpired() {
      this.delete_expired = !this.delete_expired
    },

    clearAllFilters(){
      this.start_date = null
      this.end_date = null
      this.orderFilter = null
      this.statusFilter = null
      this.fetchTradesListing()
      this.isVisible = false
      this.isVisibleSizeType = false
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
  margin-top: 50px

.container-trade-dashboard
  padding-left: 15px
  padding-right: 15px
  @media (min-width: 576px)
    margin-top: -50px
    padding-top: 50px
    background: $color-white-5
    padding-left: 25px
    padding-right: 25px
  @media (min-width: 768px)
    padding-left: 65px
    padding-right: 65px


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
.radios
  @include body-9
  font-weight: $normal
  color: $color-black-9
  display: grid
.filtersHeading
  @include body-13-bold
  font-family: $font-sp-pro
  color: $color-blue-20
  width: 100%
.hr
  border-top: 1px solid $color-gray-62
  width: 318px
.unselected-item
  width: 99px
  height: 45px
  border-radius: 3px
  background: $color-white-1
  border: 1px solid $color-gray-47
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: $color-gray-47
  padding-top: 10px
  cursor: pointer
.sorted
  display: grid !important
.filter-btn
  width: 130px
  height: 40px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 16px
  color: $color-white-1
  background-color: $color-blue-20
  border-radius: 30px
  @media (max-width: 350px) and  (min-width: 300px)
    width: 100px
    height: auto
    font-size: 12px
.selected-catgory
  @include body-13
  font-weight: $normal
  font-family: $font-sp-pro
  color: $color-black-1
.selected-item
  width: 99px
  height: 45px
  border-radius: 3px
  border: 1px solid $color-black-1
  @include body-5
  font-weight: $medium
  font-family: $font-sp-pro
  color: $color-gray-47
  padding-top: 10px
  cursor: pointer
  background: $color-white-7
.dates
  width: 150px
.resetBtn
  width: 130px
  height: 40px
  border-radius: 30px
  font-family: $font-sp-pro
  font-weight: $medium
  font-style: normal
  font-size: 16px
  color:  $color-black-1
  background-color: $color-white-1
  margin-left: 10px
  @media (max-width: 350px) and  (min-width: 300px)
    width: 100px
    height: auto
    font-size: 12px
</style>
