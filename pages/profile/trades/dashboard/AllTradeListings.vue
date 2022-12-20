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
              <div class="mt-1">
                <span class="filtersHeading">{{$t('auctions.frontpage.filterbar.sort')}}</span>
                  <b-form-radio-group
                    v-model="orderFilter"
                    class="radios mt-1 mb-1 sorted"
                    :options="orderFilterItems"
                    :checked="orderFilter"
                    @change="changeOrderFilter($event, 'CUSTOM_VARIABLE')"
                  />
              </div>
              <hr class="hr" />
              <div class="mt-1">
                <div v-b-toggle="'collapse-1'" class="d-flex">
                  <b-row class="filtersHeading align-items-center">
                    <b-col class="col-sm-6">{{$tc('common.category')}}</b-col>
                    <b-col class="col-sm-6">
                      <div class="d-flex justify-content-end">

                        <img  v-if="isVisible" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                        <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                      </div>
                    </b-col>
                  </b-row>
                </div>
                <b-collapse id="collapse-1" v-model="isVisible">
                  <b-row class="row mt-1">
                    <b-col v-for="(status, key) in getStatusFilterItems" :key="'cat-' + key">
                      <div
                        :value="status"
                        class="unselected-item m-1 d-flex justify-content-center align-items-center"
                        :class="{
                          'active-item': statusFilter.includes(status)
                        }"
                        @click="changeStatusFilterMobile(status)"
                      >
                        <span>{{ $t(`trades.${status}`) }}</span>
                      </div>
                    </b-col>
                  </b-row>
                </b-collapse>
              </div>
              <hr class="hr" />
              <div class="mt-1">
                <div v-b-toggle="'collapse-dateSent'" class="d-flex">
                  <b-row class="filtersHeading align-items-center">
                    <b-col class="col-sm-6">{{$tc('trades.date_sent')}}</b-col>
                    <b-col class="col-sm-6">
                      <div class="d-flex justify-content-end">
                        <img  v-if="isVisibleSizeType" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                        <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                      </div>
                    </b-col>
                  </b-row>
                </div>
                <b-collapse id="collapse-dateSent" v-model="isVisibleSizeType">
                  <div class="row mt-2">
                    <div class="col-6">
                      <CalendarInput
                        :value="start_date"
                        :placeholder="$t('trades.start_date')"
                        class="w-100"
                        @context="(context) => start_date = context.selectedYMD"
                      />
                    </div>
                    <div class="col-6">
                      <CalendarInput
                        :value="end_date"
                        :placeholder="$t('trades.end_date')"
                        class="w-100"
                        @context="(context) => end_date = context.selectedYMD"
                      />
                    </div>
                  </div>
                </b-collapse>
              </div>
              <hr class="hr" />
              <div class="buttons-section d-flex justify-content-between mb-3">
                <Button
                  pill
                  variant="outline-dark"
                  @click="clearAllFilters"
                >
                  {{ $t('notifications.reset') }}
                </Button>

                <Button
                  pill
                  variant="dark-blue"
                  @click="applyFilters"
                >
                  {{ $t('common.apply_filters') }}
                </Button>
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
        <b-col xl="8" sm="12" class="">
          <SearchInput
            :value="searchText"
            variant="primary"
            :placeholder="$t('trades.index.search_bar_text')"
            :clearSearch="true"
            bordered
            class="listings-search-desktop"
            :inputStyle="{
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
        <b-col xl="3" sm="12" class="d-flex justify-content-end mt-2 mt-xl-0">
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
            :dropdownStyle="{
              border: '1px solid #cbcbcb',
              borderTop: 0,
              borderRadius: '0 0 5px 5px'
            }"
            class="w-100 listings-filter"
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
      <div class="mt-3 row flex-wrap">
        <div class="col-4 col-xl-3 col-xxl-2">
          <div class="filter-label">{{ $t('trades.filter_by') }}</div>
          <CustomDropdown
            v-model="statusFilter"
            type="multi-select-checkbox"
            :options="getStatusFilterItems"
            :label="statusFilterLabel"
            optionsWidth="custom"
            variant="white"
            dropDownHeight="38px"
            class="w-100 listings-filter"
            borderRadius="5px"
            borderRadiusClose="5px 5px 0 0"
            borderRadiusOptions="0 0 5px 5px"
            paddingX="10px"
            :dropdownStyle="{
              border: '1px solid #cbcbcb',
              borderTop: 0,
              borderRadius: '0 0 5px 5px'
            }"
            :arrowStyle="{
              color: '#000',
              marginTop: '0 !important'
            }"
            @getResults="fetchTradesListing"
            @change="changeStatusFilter"
          />
        </div>
        <div class="col-4 col-xl-3 col-xxl-2">
          <div class="filter-label">{{ $t('trades.listed_date') }}</div>
          <CalendarInput
            :value="start_date"
            :placeholder="$t('trades.start_date')"
            class="w-100"
            inputClass="bg-white"
            @context="(context) => start_date = context.selectedYMD"
          />
        </div>
        <div class="pt-4 col-4 col-xl-3 col-xxl-2">
          <CalendarInput
            :value="end_date"
            :placeholder="$t('trades.end_date')"
            class="w-100"
            inputClass="bg-white"
            @context="(context) => end_date = context.selectedYMD"
          />
        </div>
        <div class="mt-3 mt-xl-4 col-6 col-xl-3 col-xxl-2 d-flex flex-column align-items-xl-end">
          <Button variant="dark-blue" @click="applyFilters">
            {{ $t('trades.apply') }}
          </Button>
          <div class="text-center" v-if="start_date !== '' || end_date !== '' || statusFilter.length  ">
            <span
              class="clear-all"
              role="button"
              @click="clearAllFilters()"
            >
              {{ $t('common.clear_all_filters') }}
            </span>
          </div>
        </div>
        <div class="mt-3 mt-xl-0 col-6 col-xl-12 col-xxl-3 align-items-xl-center
                    d-flex justify-content-end justify-content-xl-start del-btn
        ">
          <Button v-if="totalCount" variant="transparent" @click="removeExpired()">{{$t('trades.delete_expired_listings')}}</Button>
        </div>
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
      orderFilterLabel: this.$t('trades.recent_to_oldest'),
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
    getStatusFilterItems() {
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
    changeStatusFilterMobile(selectedStatuses) {
      const index = this.statusFilter.findIndex(s => s === selectedStatuses)
      if (index === -1) {
        this.statusFilter.push(selectedStatuses)
      } else {
        this.statusFilter.splice(index, 1)
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
            status: this.statusFilter ? this.statusFilter.join(',') : ''
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
      if (this.$refs.browseFiltersSheet) {
        this.$refs.browseFiltersSheet.close();
      }
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
      if (this.$refs.browseFiltersSheet) {
        this.$refs.browseFiltersSheet.close();
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

    clearAllFilters() {
      this.start_date = null
      this.end_date = null
      this.orderFilter = null
      this.statusFilter = []
      this.statusFilterLabel = this.$t('trades.status')
      this.fetchTradesListing()
      this.isVisible = false
      this.isVisibleSizeType = false
    },

    deleteMySelectedTrades() {
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

.del-btn
  @media (min-width: 1400px)
    margin-left: auto
    justify-content: end !important

.col-xxl-2
  @media (min-width: 1400px)
    flex: 0 0 16.666667
    max-width: 16.666667%
.col-xxl-3
  @media (min-width: 1400px)
    flex: 0 0 25%
    max-width: 25%

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
    //margin-top: -50px
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
      background-color: $white

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
  ::v-deep.custom-control-label
    display: flex
    align-items: center

.filtersHeading
  @include body-13-bold
  font-family: $font-sp-pro
  color: $color-blue-20
  width: 100%
.hr
  border-top: 1px solid $color-gray-62

.unselected-item
  height: 45px
  border-radius: 3px
  background: $color-white-1
  border: 1px solid $color-gray-47
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: $color-gray-47
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
  width: 44%
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
.status-drop
  width: 170px
.strt-dt
  width: 170px
.end-dt
  width: 170px
  margin-top: 2rem
.btn-fil
  width: 250px

.filter-label
  @include body-8-normal
  font-family: $font-family-sf-pro-display
  color: $color-black-1
  margin-bottom: 5px

.buttons-section
  button
    width: 44%
    padding-left: 15px
    padding-right: 15px

.filtersSection
  padding-left: 20px
  padding-right: 10px

.active-item
  border-color: $color-black-1
  span
    color: $color-black-1

.listings-filter::v-deep
  .label-wrapper
    border: 1px solid $color-gray-60
  label, span
    @include body-5-regular
    color: $color-black-1

.listings-search-desktop::v-deep
  input.search-input
    font-size: 14px !important
    font-weight: $regular !important
    letter-spacing: 0.06em
    border: 1px solid $color-gray-60 !important
    height: 38px !important

.clear-all
  @include body-9-regular
  margin-top: 8px
  color: $color-blue-20
  text-decoration: underline
  @media (min-width: 1200px)
    margin-right: 8px

</style>
