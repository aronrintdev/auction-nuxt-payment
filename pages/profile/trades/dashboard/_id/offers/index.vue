<template>
  <div class="container-fluid">
    <b-col md="12" class="pl-54 pt-4">
      <b-row class="heading">{{$t('trades.trade_id')}} #{{ trade && trade.id }}</b-row>
      <b-row class="sub-heading pt-4">{{$t('trades.trade_summary')}}</b-row>
    </b-col>
    <trade-summary v-if="trade !== null" :trade="trade" />

    <!-- Search Input -->
    <b-row class="mt-3">
      <b-col md="7" class="pl-30">
        <SearchInput
          :value="searchText"
          variant="primary"
          placeholder="Search Offers"
          :clearSearch="true"
          @change="onSearchInput"
        />
      </b-col>

    </b-row>

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
    <b-row class="justify-content-between pl-30">
      <b-col >
        <label>{{$t('trades.filter_by')}}</label>
        <b-row class="pl-2">
        <custom-dropdown
          v-model="orderFilter"
          type="single-select"
          :options="conditionFilterItems"
          :label="conditionFilterLabel"
          variant="white"
          maxWidth="162px"
          dropDownHeight="38px"
          @change="changeConditionFilter"
        />
        <Button  variant="blue" class="ml-4" @click="fetchOffersListing()">{{$t('trades.filter')}}</Button>
        </b-row>
      </b-col>
      <b-col>
        <label></label>
        <b-row class="justify-content-end pr-5">
        <custom-dropdown
          v-model="conditionFilter"
          type="single-select"
          :options="orderFilterItems"
          :label="orderFilterLabel"
          variant="white"
          maxWidth="245px"
          class="pt-2"
          dropDownHeight="38px"
          @change="changeOrderFilter"/>
        </b-row>
      </b-col>
    </b-row>
    <all-offers-items :offerType="offerType" :offers="tradeOffers" />
  </div>
</template>

<script>
import TradeSummary from '~/pages/profile/trades/dashboard/TradeSummary';
import SearchInput from '~/components/common/SearchInput';
import NavGroup from '~/components/common/NavGroup';
import AllOffersItems from '~/pages/profile/trades/dashboard/AllOffersItems';
import CustomDropdown from '~/components/common/CustomDropdown';
import Button from '~/components/common/Button';
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
    SearchInput,
    TradeSummary,
  },
  layout: 'Profile',
  data(){
    return {
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
    onSearchInput(term) {
      if (term) {
        this.searchText = term
      } else{
        this.searchText =  null
      }
    },

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

.offers-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1

.pl-30
  padding-left: 30px

</style>
