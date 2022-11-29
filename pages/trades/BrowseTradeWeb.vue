<template>
  <div class="px-5">
    <div class="browse-tarde-heading my-3">{{$t('trades.browse_trade')}}</div>
    <div>
      <!-- Display all filter options -->
      <BrowserTradeFilters 
        @applyFilters="applyTradeFilters" 
        @click="applyTradeFiltersNew" 
        @clearFilters="resetTradeFilters" 
        @applySorting="filterTrades"
      />
      <div class="col-md-6 mx-auto">
        <!-- Display total items filter selection one, two or three items -->
        <NavGroup
          :data="tradeTotalItems"
          :value="selectedTradeTotalItems"
          nav-key="trade-type"
          class="section-nav pb-4"
          :btnGroupStyle="{
            margin: 0
          }"
          @change="changeTotalTradeItems"
        />
      </div>
    </div>
    <div class="bg-white">
      <!-- Display all sections -->
      <div v-if="Object.keys(sectionTypes).length > 1">
        <div v-for="(trades, key, index) in sectionTypes" :key="key">
          <!-- show banner in between sections -->
          <div v-if="index === 2" class="m-5 pt-5">
            <b-row>
              <b-col class="d-flex justify-content-center carousel-heading mb-5">
                <img :src="require('~/assets/img/home/shoe-2.png')" />
                <div class="mid-page-banner ml-5">
                  <h2>{{$t('trades.index.browse.trade_with_us')}}</h2>
                  <p>{{$t('trades.index.browse.explore_trading_opportunities')}}</p>
                  <button class="banner-btn" @click="loadNextPage()">{{$t('common.list')}}</button>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="p-5">
            <b-row class="d-flex justify-content-center col-md-12">
              <b-col :md="selectedTradeTotalItems === 'one'? 10 : 11" class="d-flex justify-content-between carousel-heading mb-5">
                <h2 v-html="prettyLabel(key)"></h2>
                <label v-if="trades.length" role="button" @click="showTradeTypeDetails(key)">{{$t('common.view_more')}}<img :src="require('~/assets/img/moreicon.svg')" class="ml-3 mr-2" /></label>
              </b-col>

              <!-- Display trade with single items -->
              <b-col v-if="selectedTradeTotalItems === 'one'" md="11">
                <BrowseCarousel v-if="trades.length"
                                :trades="trades" :type="key" />
                <p v-else class="text-center">{{$t('trades.trade_hub.no_trade_listing_found')}}</p>
              </b-col>

              <!-- Display trade with multiple items -->
              <b-col v-else md="12">
                <CarouselMultipleItems v-if="trades.length" :trades="trades" />
                <p v-else class="text-center">{{$t('trades.trade_hub.no_trade_listing_found')}}</p>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <!-- Display single section -->
      <div v-else>
        <div v-for="(trades, key) in sectionTypes" :key="key">
          <div class="px-5 pt-5">
            <b-row>
              <b-col md="12" class="d-flex justify-content-between carousel-heading mb-5 ml-5 pl-5">
                <h2 v-html="prettyLabel(key)"></h2>
              </b-col>
              <!-- Display trades with single items -->
              <b-col v-if="selectedTradeTotalItems === 'one' && trades.length" md="12" class="justify-content-center d-flex flex-wrap">
                <div v-for="(trade) in trades" :key="'trade-item-' + trade.id" class="trade-card mb-5 mx-3 d-inline-block">
                  <div
                    v-for="(product, index) in trade.offers"
                    :key="`trade-carousel-${index}`"
                    class="item"
                  >
                    <nuxt-link :to="'/trades/' + trade.id">
                      <div class="expire-wrapper">
			      <div class="btn-expire d-flex mt-2 ml-1 pt-2" :class="`${selectCounterBG(trade.created_at)}`">
				<div>
				  <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
				</div>
				<div class="text-created">{{prettifyExpiryDate(trade.created_at)}}</div>
			      </div>
			    </div>
                      <BrowseItemCard :inventory="product.inventory" />
                    </nuxt-link>
                  </div>
                </div>
              </b-col>

              <!-- Display trades with multiple items -->
              <b-col v-else-if="trades.length" md="11">
                <TradeCardWithMultipleItems :trades="trades" />
              </b-col>
              <b-col v-else>
                <p class="text-center">{{$t('trades.trade_hub.no_trade_listing_found')}}</p>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import { tradeRemainingTime, isRemainingTimeLessThan12Hours } from '~/utils/string'
import BrowserTradeFilters from '~/pages/trades/BrowseTradeFilters'
import BrowseCarousel from '~/components/trade/BrowseCarousel.vue'
import CarouselMultipleItems from '~/components/trade/CarouselMultipleItems.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import BrowseItemCard from '~/components/trade/BrowseItemCard.vue'
import TradeCardWithMultipleItems from '~/components/trade/TradeCardWithMultipleItems.vue'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'
export default {
  name: 'BrowseTrade',
  components: {
    BrowserTradeFilters, // filter component
    BrowseCarousel, // Carousal component for browse
    NavGroup, // navbar for browse trade
    BrowseItemCard, // card items component
    CarouselMultipleItems, // multiple items carousal
    TradeCardWithMultipleItems // multiple items cards component
  },
  layout: 'IndexLayout',
  data() {
    return {
      tradeTotalItems: [
        { label: this.$t('trades.index.browse.one_item'), value: 'one' },
        { label: this.$t('trades.index.browse.two_items'), value: 'two' },
        { label: this.$t('trades.index.browse.three_items'), value: 'three' },
      ],
      // by default choose 1 item trades
      selectedTradeTotalItems: 'one',
      sectionTypes: [],
      getFilters:{},
      selectedFilters: {
        type: 'single',
        sizeTypes: [],
        sizes: [],
        brands: [],
        categories: [],
        status: [],
        sortby: null,
        product: null,
        maxYear:null,
        minYear:null
      },
    }
  },
  async fetch() {
    await this.filterTrades()
  },
  computed: {
    ...mapGetters('trade', [
      'sizeOptions', // size options getter for listing from store
      'sizeTypeOptions', // Size type option listing from store
      'priceRangeOptions', // Price range options for listing from store
      'getCategoryFilterSelection', // category types for filter listing from store
      'getSizeTypeFilterSelection', // size type for filter
      'getSizeFilterSelection', // size filter selection from store
      'getPriceRangeFilterSelection', // price range filter from store
      'getSortOrder', // Sort order listing
      'getSearchedText', // Search text from store
      'getTotalItemTrades', // total item of trades
      'getTradeType' // Trade Type from store
    ]),
  },
  mounted() {
    // set filters as per previous state
    this.selectedTradeTotalItems = this.getTotalItemTrades
    this.filterTrades()
  },
  methods: {
    ...mapGetters({
      isVendor: 'auth/isVendor',
    }),
    loadNextPage(){
      if(this.$auth.user.id && !this.isVendor){
        this.$router.push({
          path: '/profile/vendor-hub/apply'
        })
      }else if(!this.$auth.user?.id){
        this.$router.push({
          path: '/login'
        })
      }else{
        this.$router.push({
          path: '/profile/create-listing'
        })
      }
    },
    // make section label pretty
    prettyLabel(label){
      const words = label.split('_')
      return this.$tc('common.'+words[0], 1)  + this.$tc('common.' + words[1], 1)
    },

    // filter if no of trade items is change
    changeTotalTradeItems(tradeTotalItems) {
      this.selectedTradeTotalItems = tradeTotalItems
      this.$store.commit('trade/setTotalItemTrades', tradeTotalItems)
      this.filterTrades()
    },

    // filter if single section is selected
    showTradeTypeDetails(tradeType) {
      this.$store.commit('trade/setTradeType', tradeType)
      this.filterTrades()
    },

    // load trade items when filters are applied
    applyTradeFilters(){
      this.$store.commit('trade/setTradeType', 'search_results')
      this.filterTrades()
    },
    applyTradeFiltersNew(filters){
      this.$store.commit('trade/setTradeType', 'search_results')
      this.filterTrades(filters)
    },

    // reset all filters
    resetTradeFilters(){
      this.selectedFilters.sizes = []
      this.selectedFilters.sizeTypes =[]
      this.selectedFilters.brands =[]
      this.selectedFilters.categories =[]
      this.selectedFilters.status=[]
      this.selectedFilters.sortby = null
      this.selectedFilters.product = null
      this.selectedFilters.sortby = null
      this.selectedFilters.maxYear = null
      this.selectedFilters.minYear = null
      this.selectedTradeTotalItems = 'one'
      this.$store.commit('trade/setTradeType', 'All')
      this.filterTrades()
    },

    // fetch trade offer items
    filterTrades: debounce(function (filters) {
      this.getFilters = filters !== undefined ? filters : this.selectedFilters
      this.sectionTypes = []
      this.$axios.post('/trades/offers', {
        trade_type: this.getTradeType,
        categories: this.getFilters.categories.join(','),
        size_types:  this.getFilters.sizeTypes.join(','),
        sizes: this.getFilters.sizes.join(','),
        brands: this.getFilters.brands.join(','),
        status:this.getFilters.status.join(','),
        product: this.getFilters.product,
        searched_text: this.getSearchedText,
        sort_by: this.getFilters.sortby,
        trade_total_items: this.getTotalItemTrades,
        price_min: this.getFilters.minPrice,
        price_max: this.getFilters.maxPrice,
        maxYear: this.getFilters.maxYear,
        minYear: this.getFilters.minYear,
      })
        .then(res => {  // trades listing items in response
          this.sectionTypes = res.data.data
        })
    }, 500),
    selectCounterBG(createdAt){
      return isRemainingTimeLessThan12Hours(createdAt, TRADE_EXPIRY_DAYS) ? 'red' : 'gray'
    },
    prettifyExpiryDate(createdAt){
      return tradeRemainingTime(createdAt, TRADE_EXPIRY_DAYS)
    },
  }
}
</script><style lang="sass" scoped>
@import '~/assets/css/_variables'

.trade-card
  width: 255px
  background: $color-white-1
  box-sizing: border-box
.carousel-heading
  & h2
    font-weight: $bold
    font-size: 40px
    font-family: $font-adobe-garamond-pro
    font-style: normal
    letter-spacing: 2px
    ::v-deep & u
      text-decoration-color: $color-transparent
  & label
    font-family: $font-montserrat
    font-weight: $regular
    color: $color-gray-30
  .banner-btn
    background-color: $color-blue-2
    color: $color-white-1
    font-weight: $medium
    border-radius: 45px
    line-height: 2.5
    width: 20%
    border: none
.btn-expire
  @include body-5
  font-weight: $medium
  width: 110px
  height: 30px
.gray
  background-color: $dark-gray-8
  color: $color-black-1
.red
  background-color: $color-red-24
  color: $color-white-1
.text-created
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px
  padding-top: 1px
.browse-trade-listing-image
  width: 227px

.pt-15
  padding-top: 85px

.browse-trade-listing-heading
  font-family: $font-family-garamond
  font-style: normal
  font-weight: $bold
  font-size: 40px
  line-height: 100%
  color: $color-black-1

.browse-trade-listing-text
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 16px
  line-height: 100%
  color: $color-black-1

.btn-list::v-deep
  background: $color-blue-2
  border-radius: 20px
  width: 171px
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 16px
  line-height: 20px
  color: $color-white-1
.browse-tarde-heading
  font-family: $font-family-garamond
  font-style: normal
  font-weight: $bold
  font-size: 48px
  line-height: 100%
  color: $color-black-1

</style>
