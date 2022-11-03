<template>
  <div class="container-trade-dashboard">
    <b-row class="heading-dashboard mt-4 mx-0 d-none d-sm-flex">
      {{$t('trades.my_trade_offer')}}
    </b-row>
    <b-row class="m-0 mt-sm-3 justify-content-lg-between">
      <b-col lg="8" sm="12" class="d-flex justify-content-between align-items-center px-0 pr-sm-auto pl-sm-0">
        <div class="col-11 px-0 d-sm-none">
          <SearchInput
            class="searchInput"
            :value="searchText"
            :inputStyle="{
              paddingLeft: '44px !important', 
              fontWeight: 400,
              letterSpacing: '0.06em', 
              color: '#626262',
              fontSize: '12px',
              fontFamily: 'Montserrat',
              background: '#F7F7F7',
              height: '33px',
            }"
            iconStyle='color: #979797; width: 14px; height: 14px;'
            variant="primary"
            :clearSearch="true"
            @change="onSearchInput"
            @clear="onSearchInput"
          />
        </div>
        <img
          class="d-sm-none"
          :src="require('~/assets/img/filterTradeList.svg')" 
          width="20"
          height="20"
          @click="isFiltersModalOpen=true"
        />
        <SearchInput
          class="w-100 d-none d-sm-block"
          :value="searchText"
          variant="primary"
          :inputStyle="{
            height: '38px'
          }"
          :placeholder="$t('trades.search_trades_offers')"
          :clearSearch="true"
          bordered
          @change="onSearchInput"
          @clear="onSearchInput"
        />
        <SearchBarProductsList 
          v-if="searchedProducts.length > 0" 
          :productItems="searchedProducts" 
          width="700px" 
          class="position-absolute"
          :style="{ top: '33px', width: '94% !important' }"
        />
      </b-col>
      <b-col lg="3" sm="12" class="justify-content-end mt-2 mt-lg-0 px-0 d-none d-sm-flex">
        <CustomDropdown
          v-model="orderFilter"
          type="single-select"
          :options="orderFilterItems"
          :label="orderFilterLabel"
          variant="white"
          maxWidth="100%"
          :dropdownStyle="{
            background: '#FFF'
          }"
          width="100%"
          dropDownHeight="38px"
          @change="changeOrderFilter"
        />
      </b-col>
    </b-row>
    <b-row class="d-none d-sm-flex mt-4 justify-content-lg-between">
      <b-col lg="5" xl="5" sm="12" class="">
        <label>{{$t('trades.filter_by')}}</label>
        <b-row class="">
          <b-col md="5" lg="7" xl="5" sm="12">
            <CustomDropdown
              v-model="conditionFilter"
              type="multi-select-checkbox"
              :options="getConditionFilterItems"
              :label="conditionFilterLabel"
              variant="white"
              dropDownHeight="38px"
              optionsWidth="custom"
              maxWidth="100%"
              width="100%"
              :arrowStyle="{
                marginLeft: 0
              }"
              :dropdownStyle="{
                position: 'relative'
              }"
              @getResults="fetchOffersListing"
              @change="changeConditionFilter"
            />
          </b-col>
          <b-col class="mt-2 mt-md-0" md="7" lg="5" xl="7" sm="12">
            <CustomDropdown
              v-model="statusFilter"
              type="multi-select-checkbox"
              :options="getStatusFilterItems"
              :label="statusFilterLabel"
              variant="white"
              dropDownHeight="38px"
              optionsWidth="custom"
              width="100%"
              maxWidth="100%"
              :dropdownStyle="{
                position: 'relative'
              }"
              @getResults="fetchOffersListing"
              @change="changeStatusFilter"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="6" xl="6" sm="12" class="mt-3 mt-lg-0 px-2">
        <label class="">{{$t('selling_page.offer_date')}}</label>
        <b-row class="justify-content-end justify-content-sm-start justify-content-lg-between">
          <b-col sm="4" md="5" lg="4">
            <CalendarInput
              :value="start_date"
              :placeholder="$t('trades.start_date')"
              groupClass="w-100"
              @context="(context) => start_date = context.selectedYMD"
            />
          </b-col>
          <b-col sm="4" md="5" lg="4">
            <CalendarInput
              :value="end_date"
              :placeholder="$t('trades.end_date')"
              groupClass="w-100"
              @context="(context) => end_date = context.selectedYMD"
            />
          </b-col>
          <b-col class="mt-2 mt-sm-0 d-flex justify-content-sm-end" sm="4" md="2" lg="3">
            <Button variant="blue" class="" @click="applyFilters">
              {{$t('trades.apply')}}
            </Button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="px-2 listings justify-content-between">
      {{ $t('trades.trade_offers', { '0': totalOffers }) }}
      <div class="d-sm-none">
        <div
          v-if="!action"
          class="d-flex align-items-center"
          @click="action = 'delete'"
        >
          <img
            :src="require('~/assets/img/icons/delete-rounded.svg')"
            :alt="$t('product_page.delete_multiple')"
          />
          <div class="ml-2 mt-1 delete-offers">
            {{ $t('offers_received.delete_offers') }}
          </div>
        </div>
        <div 
          v-else-if="action === 'delete' || action === 'deselect_all'"
          class="d-flex align-items-center"
          @click="selectAll()"
        >
          <div class="circle-gray"></div>
          <div class="mt-1 ml-2 delete-offers">{{ $t('common.select_all') }}</div>
        </div>
        <div
          v-else-if="action === 'select_all'"
          class="d-flex align-items-center"
          @click="action = 'deselect_all'; selected = []"
        >
          <div class="circle-blue-outer">
            <div class="circle-blue-inner"></div>
          </div>
          <div class="mt-1 ml-2 delete-offers">{{ $t('common.deselect_all') }}</div>
        </div>
      </div>
    </b-row>
    <b-row class="justify-content-center mt-3 d-none d-sm-flex">
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
        <div class="text-center w-100 px-2">
        <trade-offer-items 
          v-if="tradeOffers.length > 0" 
          :offers="tradeOffers"
          :action="action"
          :selected="selected"
          @select="selectOffer"
        />
        <div v-else>
          <div class="d-none d-sm-block">
            {{ 
              (offerType !== ALL_OFFER_TYPE) ? 
              $t('trades.no_trade_offers_have_been') + $t('trades.offer_type.' + offerType) : 
              $t('trades.no_trade_offers_have_been_found') 
            }}
          </div>
          <div class="d-sm-none mt-5">
            <div class="no-trades">{{ $t('common.no_trades') }}</div>
            <div class="mt-2 no-trades">{{ $t('common.list_product_today') }}</div>
            <div class="mt-4 create-listing mx-auto" @click="redirectToListing()">
              {{ $t('home.create_listing') }}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

    <div 
      class="d-sm-none mb-3"
      :class="{
        'd-none': !action
      }"
    >
      <div class="delete-header">{{ $t('offers_received.tap_on_offers_to_delete') }}</div>
      <div class="d-flex justify-content-between">
        <div 
          class="cancel-button"
          @click="action = ''; selected = []"
        >
          {{ $t('common.cancel') }}
        </div>
        <div 
          class="delete-button"
          :class="{
            'active-delete-button': selected.length > 0
          }"
          @click="$bvModal.show('confirm-offers-delete')"
        >
          {{ $t('common.delete') }} {{ selected.length > 0 ? `(${selected.length})` : ''}}
        </div>
      </div>
    </div>

    <b-row class="justify-content-center mt-1 mb-3">
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

    <OffersFiltersModal
      :isOpen="isFiltersModalOpen"
      @closed="isFiltersModalOpen = false"
      @opened="isFiltersModalOpen = true"
      @submit="submitFiltersModal"
    />

    <ConfirmModal
      id="confirm-offers-delete"
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
      @confirm="deleteSelected()"
    />
    <AlertModal
      id="items-deleted"
      :message="$t('common.items_deleted')"
      icon="trash"
      :messageStyle="{
        fontFamily: 'SF Pro Display',
        fontWeight: 400,
        fontSize: '18px',
        color: '#000',
        width: '100%'
      }"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput';
import CustomDropdown from '~/components/common/CustomDropdown';
import CalendarInput from '~/components/common/form/CalendarInput';
import Button from '~/components/common/Button';
import Pagination from '~/components/common/Pagination';
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar';
import NavGroup from '~/components/common/NavGroup';
import OffersFiltersModal from '~/components/modal/OffersFiltersModal.vue';
import { ConfirmModal, AlertModal } from '~/components/modal'


import {
  PAGE,
  PER_PAGE,
  PER_PAGE_OPTIONS,
  DEFAULT_OFFER_TYPE,
  FILTER_RECENT_TO_OLDEST,
  FILTER_OLDEST_TO_RECENT,
  ALL_OFFER_TYPE,
  FILTER_OFFER_STATUS_OPEN,
  FILTER_OFFER_STATUS_DECLINED,
  FILTER_OFFER_STATUS_ACCEPTED,
  FILTER_OFFER_STATUS_DELETED,
  FILTER_CONDITION_POOR,
  FILTER_CONDITION_FAIR,
  FILTER_CONDITION_EXCELLENT,
  TAKE_SEARCHED_PRODUCTS,
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
    SearchBarProductsList,
    OffersFiltersModal,
    ConfirmModal,
    AlertModal
  },
  layout: 'Profile',
  data () {
    return {
      ALL_OFFER_TYPE,
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
        { text: this.$t('trades.offer_status.open'), value: FILTER_OFFER_STATUS_OPEN },
        { text: this.$t('trades.offer_status.declined'), value: FILTER_OFFER_STATUS_DECLINED },
        { text: this.$t('trades.offer_status.accepted'), value: FILTER_OFFER_STATUS_ACCEPTED },
        { text: this.$t('trades.offer_status.deleted'), value: FILTER_OFFER_STATUS_DELETED },
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
      action: '',
      selected: [],
      isFiltersModalOpen: false
    }
  },
  computed: {
    getConditionFilterItems(){
      return this.conditionFilterItems.map(condition => condition.value)
    },
    getStatusFilterItems(){
      return this.statusFilterItems.map(status => status.value)
    }
  },
  mounted() {
    this.fetchOffersListing()
    // To filter trade offers
    this.$root.$on('productClick', (product) => {
      this.searchOffers(product)
    })
    // const wrapper = document.querySelector('.main-wrapper')
    // if (wrapper.querySelector('.container-trade-dashboard')) {
    //   wrapper.style.backgroundColor = '#f7fbef'
    // }

    // To reset search filter trade offers
    this.$root.$on('click_outside', () => {
      this.searchedProducts = []
    })
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
      this.conditionFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.conditionFilter, 2) || this.$t('trades.trade_condition') // 2 is max number of labels show in filter
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
    searchOffers(product){
      this.searchText = (product) ? product.name : ''
      this.searchedProducts = []
      this.fetchOffersListing()
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
            search: this.searchText,
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
    onSearchInput: debounce(function (term) {
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
      this.fetchOffersListing()
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
      this.fetchOffersListing()
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

    applyFilters() {
      this.fetchOffersListing()
    },

    redirectToListing() {
      this.$router.push('/sell/create-listing')
    },

    submitFiltersModal(filters) {
      this.offerType = filters.offerType.value
      this.conditionFilter = filters.trade
      this.orderFilter = filters.sortBy
      this.statusFilter = filters.status
      this.start_date = filters.start_date
      this.end_date = filters.end_date
      this.fetchOffersListing()
      this.isFiltersModalOpen = false
    },

    selectOffer(value) {
      const foundIndex = this.selected.findIndex(s => s === value)
      if (foundIndex !== -1) {
        this.selected.splice(foundIndex, 1)
      } else {
        this.selected.push(value)
      }
    },

    selectAll() {
      this.action = 'select_all'
      this.selected = this.tradeOffers.reduce((acc, item) => {
        if (!item.deleted_at) {
          acc.push(item.id)
        }
        return acc
      }, [])
    },

    deleteSelected() {
      if (this.selected.length < 1) return
      console.log('deleteSelected', `trades/offers/deactivate?offer_ids=${this.selected.join(',')}`);
      this.$axios
        .post(`trades/offers/deactivate?offer_ids=${this.selected.join(',')}`)
        .then((response) => {
          this.action = ''
          this.selected = []
          this.fetchOffersListing()
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

.circle-gray, .circle-blue-outer
  width: 19px
  height: 19px
  border-radius: 25px

.circle-gray
  border: 1px solid $color-gray-47

.circle-blue-outer
  border: 1px solid $color-blue-20
  display: flex
  align-items: center
  justify-content: center

.circle-blue-inner
  width: 11px
  height: 11px
  border-radius: 25px
  background: $color-blue-20

.create-listing
  @include body-4-medium
  display: flex
  align-items: center
  justify-content: center
  color: $color-white-1
  width: 309px
  height: 40px
  border-radius: 21px
  background: $color-blue-20

.no-trades
  @include body-5-medium
  line-height: 17px
  color: $color-gray-5

.delete-offers
  @include body-9-normal
  font-family: $font-family-sf-pro-display
  color: $color-gray-47

.heading-dashboard
  font-family: $font-family-montserrat
  font-style: normal
  @include heading-13
  text-transform: capitalize
  color: $color-black-1

.container-trade-dashboard
  padding-left: 12px
  padding-right: 12px
  @media (min-width: 992px)
    padding-left: 54px
    padding-right: 54px

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
  @include body-17-normal
  color: $color-black-1
  padding-top: 25px
  margin-bottom: 24px
  @media (min-width: 576px)
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-7-bold
    margin-bottom: 0
    padding-top: 57px

.mt-custom
  margin-top: 32px

.cancel-button, .delete-button
  @include body-10-medium
  width: 162px
  height: 40px
  border-radius: 20px
  display: flex
  justify-content: center
  align-items: center

.cancel-button
  color: $color-gray-76
  border: 1px solid $color-gray-76

.delete-button
  background: $color-gray-75
  color: $color-gray-47

.active-delete-button
  background: $color-blue-20
  color: $color-white-1

.delete-header
  @include body-9-normal
  color: $color-gray-77
  margin-bottom: 15px
  text-align: center

</style>

