<template>
  <div class="container-trade-dashboard">
    <b-row class="heading-dashboard mt-4">
      {{$t('trades.trade_dashboard')}}
    </b-row>
    <b-row>
      <b-col md="7" class="mt-4">
        <SearchInput
          :value="searchText"
          variant="primary"
          :placeholder="$t('trades.search_trades')"
          :clearSearch="true"
          @change="onSearchInput"
        />
        <SearchBarProductsList v-if="searchedProducts.length > 0" :productItems="searchedProducts" width="700px" class="position-absolute" @productClick="searchTrades"/>
      </b-col>
    </b-row>

    <!--Trade Listing section-->
    <div class="my-trade-listing-section mb-3">
      <b-row>
        <b-col md="8">
          <div class="my-listing-heading mt-4 pt-3">
            {{$t('trades.my_trade_listing',{'0':totalTrades})}}
            <nuxt-link v-if="tradeListing && tradeListing.length" to="/profile/create-listing/trades/create" class="create-new-listing-link ml-3">{{$t('trades.create_a_new_listing')}}</nuxt-link>
          </div>
          <div class="my-listing-subheading pt-2">
            <span v-if="tradeListing && tradeListing.length">{{$t('trades.the_listings_you_have_created')}}</span>
            <span v-else>
            {{$t('trades.these_are_the_listing_you_have_created')}}
            </span>
          </div>
        </b-col>
        <b-col md="4" class="text-right">
          <div class="d-flex mt-4 pt-3 pr-3 justify-content-end" role="button" @click="$router.push('/profile/trades/preferences')"><img :src="require('~/assets/img/icons/cog.svg')"><span class="ml-1 preferences">{{$t('trades.trade_preferences')}}</span></div>
        </b-col>
      </b-row>
      <div v-if="tradeListing && tradeListing.length">
      <trade-listing-items :tradesList="tradeListing"></trade-listing-items>
      <b-row class="justify-content-center mt-3">
        <Button variant="blue" @click="$router.push('/profile/trades/dashboard/alltradelistings')">{{$t('trades.view_all')}}</Button>
      </b-row>
      </div>
      <div v-else class="text-center">
      <b-row class="justify-content-center">
        <div class="d-block text-center no-item mt-4 pt-4">
        <div>{{$t('trades.no_items_have_been_found')}}</div>
        <div>{{$t('trades.list_a_trade_today_on_deadstock')}}!</div>
        </div>
      </b-row>
        <Button pill variant="blue" class="mt-4" @click="$router.push('/profile/create-listing/trades/create')">{{$t('trades.create_listing.create_a_listing')}}</Button>
      </div>
    </div>

    <!--offers section-->
    <div class="my-trade-listing-section mb-3">
      <b-row>
        <b-col md="12">
          <div class="my-listing-heading mt-4 pt-3">
           {{$t('trades.my_trade_offers',{'0': totalOffers})}}
          </div>
          <div class="my-listing-subheading pt-2">
            <span v-if="totalOffers > 0">
              {{$t('trades.all_offers_on_trade_your_and_their_listings')}}
            </span>
            <span v-else>
              {{$t('trades.your_offers_that_you_have_placed_on_other_listings')}}
            </span>
          </div>
        </b-col>
      </b-row>
      <div class="text-center">
        <div v-if="totalOffers > 0">
          <NavGroup
            v-model="offerType"
            :data="offerTypeData"
            nav-key="type"
            class="type-nav mt-3 mb-3"
            @change="handleMethodNavClick"
          />
          <div class="row justify-content-center">
          <trade-offer-items :offers="tradeOffers"></trade-offer-items>
          </div>
          <b-row class="justify-content-center mt-3">
            <Button variant="blue" @click="$router.push('/profile/trades/dashboard/alloffers')">{{$t('trades.view_all')}}</Button>
          </b-row>
        </div>
        <div v-else>
        <b-row class="justify-content-center">
        <div class="d-block text-center no-item mt-4 pt-4">
        <div>{{$t('trades.no_trade_offers_have_been_placed')}}</div>
        <div>{{$t('trades.find_a_trade_today_on_deadstock')}}</div>
        </div>
      </b-row>
        <Button pill variant="blue" class="button-listing mt-4" @click="$router.push('/trades')">{{$t('trades.browse_btn')}}</Button>
        </div>
      </div>
    </div>

    <b-row class="bg-white d-flex align-items-center wants-list-section mx-4 p-4 mt-5 mb-5">
      <b-col md="9">
        <div class="my-listing-heading">
          {{$t('trades.want_list')}}
        </div>
        <div class="my-listing-subheading pt-2">
          {{$t('trades.wants_list_contains_items_saved_from')}}
        </div>
      </b-col>
      <b-col md="3">
        <Button  variant="blue" class="mt-1" @click="$router.push('/profile/trades/wants')">{{$t('trades.view_wants_list')}}</Button>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import SearchInput from '~/components/common/SearchInput';
import Button from '~/components/common/Button';
import TradeListingItems from '~/pages/profile/trades/dashboard/TradeListingItems';
import { NavGroup } from '~/components/common';
import TradeOfferItems from '~/pages/profile/trades/dashboard/TradeOfferItems'
import SearchBarProductsList from '~/components/product/SearchBarProductsList'
import {
  PROFILE_DASHBOARD_MAX_TRADES,
  PROFILE_DASHBOARD_MAX_OFFERS,
  DEFAULT_OFFER_TYPE,
  ALL_OFFER_TYPE,
  TAKE_SEARCHED_PRODUCTS
} from '~/static/constants/trades'

export default {
  name: 'Index',
  components:{
    TradeOfferItems,
    TradeListingItems,
    Button,
    SearchInput,
    NavGroup,
    SearchBarProductsList
  },
  layout: 'Profile',
  data(){
    return {
      TAKE_SEARCHED_PRODUCTS,
      PROFILE_DASHBOARD_MAX_TRADES,
      PROFILE_DASHBOARD_MAX_OFFERS,
      ALL_OFFER_TYPE,
      searchText: null,
      searchedProducts: [],
      tradeListing: [],
      totalTrades: 0,
      tradeOffers: [],
      totalOffers: 0,
      offerType: DEFAULT_OFFER_TYPE,
      offerTypeData: Object.keys(this.$t('trades.offer_type')).map(a => {
        return {
          label: this.$t('trades.offer_type.' + a),
          value: a
        }
      }),
    }
  },
  mounted() {
    this.fetchTradesListing()
    this.fetchOffersListing(DEFAULT_OFFER_TYPE)
    this.fetchTotalOffers()
  },
  methods:{
    fetchTotalOffers(){
      this.$axios
        .get('trades/submitted-offers', {
          params: {
            type: ALL_OFFER_TYPE
          }
        })
        .then((response) => {
          this.totalOffers = parseInt(response.data.data.total)
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.totalOffers =  0
        })
    },
    fetchOffersListing(offerType){
      this.$axios
        .get('trades/submitted-offers', {
          params: {
            type: offerType,
            per_page: PROFILE_DASHBOARD_MAX_OFFERS
          }
        })
        .then((response) => {
          this.tradeOffers = response.data.data.data
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.tradeOffers =  []
        })
    },
    fetchTradesListing(){
      this.$axios
        .get('trades', {
          params: {
            search: this.searchText,
            per_page: PROFILE_DASHBOARD_MAX_TRADES
          }
        })
        .then((response) => {
          this.tradeListing = response.data.data.data
          this.totalTrades = parseInt(response.data.data.total)
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.tradeListing =  []
          this.totalTrades = 0
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
    },

    handleMethodNavClick(type) {
      if (type) {
        this.offerType = type
        this.fetchOffersListing(type)
      }
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

.my-listing-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-1-bold
  color: $color-black-1

.my-listing-subheading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-normal
  color: $color-gray-4

.preferences
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-8-normal
  color: $color-black-1

.no-item
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-gray-5

.button-listing
  width: 163px

.wants-list-section
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.create-new-listing-link
  color: $color-blue-2
  font-family: $font-family-sf-pro-display
  font-size: 16px

.container-trade-dashboard
  padding-left: 54px
</style>
