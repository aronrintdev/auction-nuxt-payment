<template>
  <div class="px-16" v-if="isScreenXS">
    <trade-summary v-if="trade !== null" :trade="trade" />
    <div class="mt-4 d-flex">
      <div class="offers-heading mr-2">
        {{ $t('trades.offers', { '0': tradeOffers.length }) }}
      </div>
      <img 
        class="float-right image-filter"
        :src="require('~/assets/img/filterTradeList.svg')"  
        @click="openBottomFilter()"
      />
    </div>
    <div class="d-flex mt-2">
      <div class="mt-2 ml-3">
        
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
                class="radios mt-1 mb-1 sorted ml-3"
                v-model="orderFilter"
                :options="orderFilterItems"
                :checked="orderFilter"
                @change="changeOrderFilter($event, 'CUSTOM_VARIABLE')"
              />
            </div>
            <hr class="hr" />
            <div class="mt-1 ml-2">
              <div class="d-flex" v-b-toggle="'collapse-1'">
                <b-row class="filtersHeading ml-2">
                  <b-col class="col-sm-6">{{$t('trades.trade_condition')}}</b-col>
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
                  <b-col v-for="(status, key) in conditionFilterItems" :key="'cat-' + key">
                    <div :value="status" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                         @click="changeConditionFilter(status.value)">
                      {{status.text}}
                    </div>
                  </b-col>
                </b-row>
              </b-collapse>
            </div>
            <hr class="hr" />
            <div class="d-flex mb-3">
              <div class="ml-5">
                <b-btn class="filter-btn" @click="fetchOffersListing">{{$t('common.apply_filters')}}r</b-btn>
              </div>
            </div>
          </div>
        </vue-bottom-sheet>
        <b-row v-if="showFilters" class="d-flex justify-content-center m-3" @click="showFilters = !showFilters">
          <img :src="require('~/assets/img/icons/arrow-up-dark-gray.svg')" />
        </b-row>
      </div>
    </div>
    <all-offers-items :offerType="offerType" :offers="tradeOffers" />
  </div>
  <div class="container-fluid bg-white-5 pt-5" v-else>
    <div class="heading mx-4">{{ $t('vendor_purchase.trade_summary') }}</div>
    <div class="sub-heading mx-4">{{ $t('common.your_listing') }}</div>
    <trade-summary v-if="trade !== null" :trade="trade" />

    <!--Offers Section-->
    <b-row class="mt-5 offers-heading pl-30">
      {{$t('trades.offers' , {'0': tradeOffers.length})}}
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
    <b-row class="justify-content-between px-4">
      <b-col>
        <label>{{$t('trades.filter_by')}}</label>
        <b-row class="pl-2">
        <custom-dropdown
          v-model="orderFilter"
          type="single-select"
          :options="conditionFilterItems"
          :label="conditionFilterLabel"
          variant="white"
          width="200px"
          maxWidth="162px"
          paddingX="10px"
          :arrowStyle="{
            marginTop: '0 !important',
            color: '#000'
          }"
          :dropdownStyle="{
            background: '#FFF'
          }"
          borderRadius="5px"
          borderRadiusClose="5px 5px 0 0"
          borderRadiusOptions="0 0 5px 5px"
          dropDownHeight="38px"
          @change="changeConditionFilter"
        />
        <Button variant="dark-blue" class="ml-4" @click="fetchOffersListing()">{{$t('trades.filter')}}</Button>
        </b-row>
      </b-col>
      <b-col class="d-flex align-items-end justify-content-end">
        <custom-dropdown
          v-model="conditionFilter"
          type="single-select"
          :options="orderFilterItems"
          :label="orderFilterLabel"
          variant="white"
          maxWidth="245px"
          width="245px"
          paddingX="10px"
          borderRadius="5px"
          borderRadiusClose="5px 5px 0 0"
          borderRadiusOptions="0 0 5px 5px"
          :dropdownStyle="{
            background: '#FFF'
          }"
          :arrowStyle="{
            marginTop: '0 !important',
            color: '#000'
          }"
          dropDownHeight="38px"
          @change="changeOrderFilter"
        />
      </b-col>
    </b-row>
    <all-offers-items :offerType="offerType" :offers="tradeOffers" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import TradeSummary from '~/pages/profile/trades/dashboard/TradeSummary';
import NavGroup from '~/components/common/NavGroup';
import AllOffersItems from '~/pages/profile/trades/dashboard/AllOffersItems';
import CustomDropdown from '~/components/common/CustomDropdown';
import Button from '~/components/common/Button';
import ScreenSize from '~/plugins/mixins/screenSize'
import {
  FILTER_RECENT_TO_OLDEST,
  FILTER_OLDEST_TO_RECENT,
  DEFAULT_OFFER_TYPE,
  SHOW_OFFERS_FOR_TRADE_DETAIL,
  TAKE_SEARCHED_PRODUCTS,
  FILTER_CONDITION_POOR,
  FILTER_CONDITION_FAIR,
  FILTER_CONDITION_EXCELLENT
} from '~/static/constants/trades'
export default {
  name: 'AllTradeOffers',
  components: {
    Button,
    CustomDropdown,
    AllOffersItems,
    NavGroup,
    TradeSummary,
  },
  mixins: [ScreenSize],
  layout: 'Profile',
  data(){
    return {
      width:'',
      isVisible:false,
      showFilters : false,
      isVisibleSizeType: false,
      TAKE_SEARCHED_PRODUCTS,
      FILTER_CONDITION_POOR,
      FILTER_CONDITION_FAIR,
      FILTER_CONDITION_EXCELLENT,
      searchText: null,
      offerType: DEFAULT_OFFER_TYPE,
      trade: null,
      offerTypeFilters: Object.keys(this.$t('trades.offer_type')).map(a => {
        return {
          label: this.$t('trades.offer_type.' + a),
          value: a
        }
      }),
      tradeOffers: [],
      totalOffers: 0,
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      orderFilter: FILTER_RECENT_TO_OLDEST,
      orderFilterItems: [
        { text: this.$t('trades.recent_to_oldest'), value: FILTER_RECENT_TO_OLDEST },
        { text: this.$t('trades.oldest_to_recent'), value: FILTER_OLDEST_TO_RECENT },
      ],
      perPage: SHOW_OFFERS_FOR_TRADE_DETAIL,
      conditionFilterLabel: this.$t('trades.trade_condition'),
      conditionFilter: [],
      conditionFilterItems: [
        { text: this.$t('trades.poor'), value: FILTER_CONDITION_POOR },
        { text: this.$t('trades.fair'), value: FILTER_CONDITION_FAIR },
        { text: this.$t('trades.excellent'), value: FILTER_CONDITION_EXCELLENT },
      ],
    }
  },
  mounted(){
    this.fetchTradeDetails()
    this.width = window.innerWidth
  },
  methods:{
    openBottomFilter() {
      this.$refs.browseFiltersSheet.open();
    },
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
    fetchTradeDetails(){
      this.tradeId = parseInt(this.$route.params.id)
      this.$axios
        .get('trades/' + this.tradeId)
        .then((response) => {
          this.trade = response.data.data
          this.fetchOffersListing()
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.trade = null
        })
    },
    fetchOffersListing(){
      this.$axios
        .get('trades/submitted-offers', {
          params: {
            type: this.offerType,
            order_by: this.orderFilter,
            trade_id: this.trade.id,
            searchText: this.searchText,
            condition: this.conditionFilter.join(','),
            per_page: this.perPage
          }
        })
        .then((response) => {
          this.tradeOffers = response.data.data.data
          this.totalOffers = parseInt(response.data.data.total)
          this.$refs.browseFiltersSheet.close();
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.tradeOffers =  []
          this.totalOffers =  0
        })
    },
    /**
     * Move vendor to trade offer page
     * @param {number} theirTradeId
     */
    viewTrade(theirTradeId) {
      this.$router.push(`/profile/trades/${theirTradeId}`)
    },
    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput: debounce(function (term) {
      if (term) {
        this.searchText = term
      } else{
        this.searchText =  null
      }
    }, 500),

    handleMethodNavClick(type) {
      if (type) {
        this.offerType = type
        this.fetchOffersListing()
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
      this.orderFilterLabel = this.$options.filters.capitalizeFirstLetter(orderFilteredKey.text)
      this.fetchOffersListing()
    },

  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.bg-white-5
  background: $color-white-5

.pl-54
  padding-left: 54px

.heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-16-bold
  letter-spacing: -0.02em
  text-transform: capitalize
  color: $color-black-1

.sub-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1
  margin-top: 35px
  margin-bottom: -40px

.offers-heading
  @include body-4-medium
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-black-1
  @media (min-width: 576px)
    @include body-15-bold

.pl-30
  padding-left: 30px
.radios
  @include body-9
  font-weight: $normal
  color: $color-gray-41
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

.px-16
  padding-left: 16px
  padding-right: 16px

</style>
