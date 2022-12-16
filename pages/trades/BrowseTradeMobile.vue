<template>
  <div>
    <div>
    <!-- Display all filter options -->
    <BrowserTradeFilters @applyFilters="applyTradeFilters"
                         @clearFilters="resetTradeFilters" @applySorting="filterTrades"/>
    <div class="d-flex align-content-center justify-content-center mt-3">
        <NavGroup
          :data="tradeTotalItems"
          :value="selectedTradeTotalItems"
          nav-key="trade-type"
          class="section-nav pb-4"
          @change="changeTotalTradeItems"
        />
    </div>
    </div>
    <div class="bg-white">
    <!-- Display all sections -->
    <div v-if="getTradeType === 'All'">
      <div v-for="(trades, key, index) in sectionTypes" :key="key">
        <!-- show banner in between sections -->
        <div v-if="index === 2">
          <div class="trade-us-box">
            <div class="d-flex">
              <div class="d-inline ml-3">
                <div class="trade-text mt-3">{{$t('trades.index.browse.trade_with_us')}}</div>
                <div class="trade-subtext mt-2">{{$t('trades.index.browse.explore_trading_opportunities_mobile')}}</div>
                <div>
                  <b-btn class="create-btn mt-4 ml-3">
                    {{$t('home.create_listing')}}
                  </b-btn>
                </div>
              </div>
              <div>
                <img class="trad-image ml-3" :src="require('~/assets/img/trade_us_box.svg')" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex justify-content-between align-content-center mb-2 mt-3 p-3">
            <div class="">
              <div class="pretty-label" v-html="prettyLabel(key)"></div>
            </div>
           <div class="" role="button" @click="showTradeTypeDetails(key)">
               <img :src="require('~/assets/img/moreicon.svg')"/>
           </div>
          </div>
          <div v-if="selectedTradeTotalItems === 'one'" class="p-0">
            <BrowseCarousel v-if="trades.length"
                            :trades="trades" :type="key" />
            <p v-else class="text-center">{{$t('trades.trade_hub.no_trade_listing_found')}}</p>
          </div>
          <div v-else>
            <CarouselMultipleItems v-if="trades.length" :trades="trades" />
            <p v-else class="text-center">{{$t('trades.trade_hub.no_trade_listing_found')}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Display single section -->
    <div v-else>
      <div>
        <div class="pt-5">
            <b-row>
              <b-col md="12" class="d-flex carousel-heading mb-5 pl-4">
                <h2 v-if="labelName" v-html="prettyLabel(labelName)"></h2>
              </b-col>
              <!-- Display trades with single items -->
              <b-col v-if="selectedTradeTotalItems === 'one' && sectionTypes.length" md="12" class="d-flex flex-wrap pl-4">
                <div v-for="(trade) in sectionTypes" :key="'trade-item-' + trade.id" class="trade-card mb-5 d-inline-block">
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
              <b-col v-else-if="sectionTypes.length" md="11">
                <TradeCardWithMultipleItems :trades="sectionTypes" />
              </b-col>
              <b-col v-else>
                <p class="text-center">{{$t('trades.trade_hub.no_trade_listing_found')}}</p>
              </b-col>
            </b-row>
          </div>
        </div>
    </div>
    <infinite-loading :identifier="infiniteId" @infinite="filterTrades">
        <span slot="no-more"></span>
        <span slot="no-results"></span>
    </infinite-loading>
    </div>
  </div>
</template>

<script>
// import component
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import { tradeRemainingTime, isRemainingTimeLessThan12Hours } from '~/utils/string'
import BrowserTradeFilters from '~/pages/trades/BrowseTradeFiltersMobile'
import BrowseCarousel from '~/components/trade/BrowseCarouselMobile.vue'
import CarouselMultipleItems from '~/components/trade/CarouselMultipleItemsMobile.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import BrowseItemCard from '~/components/trade/BrowseItemCardMobile.vue'
import TradeCardWithMultipleItems from '~/components/trade/TradeCardWithMultipleItemsMobile.vue'
import {DEFAULT_PER_PAGE_ITEMS, TRADE_EXPIRY_DAYS} from '~/static/constants'
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
        perPage: DEFAULT_PER_PAGE_ITEMS,
        page: 1,
        infiniteId: +new Date(),
        labelName: '',
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
  },
  methods: {
    // make section label pretty
    prettyLabel(label){
      const words = label.split('_')
      return this.$tc('common.'+words[0], 1)  + this.$tc('common.' + words[1], 1)
    },

    // filter if no of trade items is change
    changeTotalTradeItems(tradeTotalItems) {
      this.selectedTradeTotalItems = tradeTotalItems
      this.$store.commit('trade/setTotalItemTrades', tradeTotalItems)
      this.page = 1;
      this.sectionTypes = []
      this.infiniteId += 1;
    },

    // filter if single section is selected
    showTradeTypeDetails(tradeType) {
      this.$store.commit('trade/setTradeType', tradeType)
      this.page = 1;
      this.sectionTypes = []
      this.infiniteId += 1;
    },

    // load trade items when filters are applied
    applyTradeFilters(){
      this.$store.commit('trade/setTradeType', 'search_results')
      this.page = 1;
      this.sectionTypes = []
      this.infiniteId += 1;
    },

    // reset all filters
    resetTradeFilters(){
      this.selectedTradeTotalItems = 'one'
      this.$store.commit('trade/setTradeType', 'All')
      this.page = 1;
      this.sectionTypes = []
      this.infiniteId += 1;
    },

    // fetch trade offer items
    filterTrades: debounce(function ($state) {
      const priceRange = this.getPriceRangeFilterSelection
      this.$axios.post('/trades/offers', {
            trade_type: this.getTradeType,
            categories: this.getCategoryFilterSelection.join(','),
            size_types: this.getSizeTypeFilterSelection.join(','),
            sizes: this.getSizeFilterSelection.join(','),
            searched_text: this.getSearchedText,
            sort_by: this.getSortOrder,
            trade_total_items: this.getTotalItemTrades,
            price_min: priceRange[0],
            price_max: priceRange[1],
            page: this.page,
            per_page: this.perPage,
        })
        .then(resp => {  // trades listing items in response
          const res = resp?.data?.data
          if(this.getTradeType !== 'All' && Object.keys(res).length < 2){
            this.labelName = Object.keys(res)[0]
            if (!res[this.getTradeType].next_page_url) {
              $state.complete()
            }else {
              this.page += 1;
              this.sectionTypes.push(...res[this.getTradeType].data);
              $state.loaded()
            }
          }
          else {
            this.page += 1;
            this.sectionTypes = res;
            $state.complete()
          }
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
.trad-image
  width: 162px
  height: 162px
  @media (max-width: 350px) and  (min-width: 300px)
    width: 120px
.trade-us-box
  width: 375px
  height: 181px
  background: #F7F7F7
  @media (max-width: 350px) and  (min-width: 300px)
    width: 310px
.trade-card
  width: 164px
  background: $color-white-1
  box-sizing: border-box
.btn-expire
  @include body-9
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
.create-btn
  width: 160px
  height: 35px
  background-color: #667799
  color: #FFFFFF
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 500
  font-size: 16px
  border-radius: 30px
  @media (max-width: 350px) and  (min-width: 300px)
    width: 100px
    font-size: 10px
    height: auto
.trade-text
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 500
  font-size: 20px
  color: #272727
.trade-subtext
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 500
  font-size: 15px
  color: #AFAFAF
.carousel-heading
  & h2
    font-weight: $bold
    font-size: 40px
    font-family: $font-adobe-garamond-pro
    font-style: normal
    letter-spacing: 2px
    ::v-deep & u
      text-decoration-color: $color-blue-2
      text-underline-offset: 15px
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

.pretty-label
  width: 190px
  height: 22px
  font-family: $font-family-garamond
  font-style: normal
  font-weight: $bold
  font-size: 22px
  line-height: 100%
  color: $color-black-1
</style>
