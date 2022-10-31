<template>
  <div>
    <div>
    <!-- Display all filter options -->
    <BrowserTradeFilters @applyFilters="applyTradeFilters" @clearFilters="resetTradeFilters" @applySorting="filterTrades"/>
    <b-row class="w-100">
      <b-col md="12" class="text-center">
        <!-- Display total items filter selection one, two or three items -->
        <NavGroup
          :data="tradeTotalItems"
          :value="selectedTradeTotalItems"
          nav-key="trade-type"
          class="section-nav pb-4"
          @change="changeTotalTradeItems"
        />
      </b-col>
    </b-row>
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
                <button class="banner-btn">{{$t('common.list')}}</button>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="p-5">
          <b-row class="d-flex justify-content-center col-md-12">
            <b-col :md="selectedTradeTotalItems === 'one'? 10 : 11" class="d-flex justify-content-between carousel-heading mb-5">
              <h2 v-html="prettyLabel(key)"></h2>
              <label v-if="trades.length" @click="showTradeTypeDetails(key)">{{$t('common.view_more')}}<img :src="require('~/assets/img/icons/arrow-right-gray.svg')" class="ml-3 mr-2" /></label>
            </b-col>

            <!-- Display trade with single items -->
            <b-col v-if="selectedTradeTotalItems === 'one'" md="11">
              <BrowseCarousel v-if="trades.length"
                :trades="trades" />
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
              <b-col md="12" class="d-flex justify-content-between carousel-heading mb-5 ml-5">
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
                      <BrowseItemCard :product="product.inventory.product" />
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
// import component
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import BrowserTradeFilters from '~/pages/trades/BrowseTradeFilters'
import BrowseCarousel from '~/components/trade/BrowseCarousel.vue'
import CarouselMultipleItems from '~/components/trade/CarouselMultipleItems.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import BrowseItemCard from '~/components/trade/BrowseItemCard.vue'
import TradeCardWithMultipleItems from '~/components/trade/TradeCardWithMultipleItems.vue'
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
        sectionTypes: []
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
    // make section label pretty
    prettyLabel(label){
      const words = label.split('_')
      return '<u>'+this.$tc('common.'+words[0], 1) + '</u> ' + this.$tc('common.' + words[1], 1)
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

    // reset all filters
    resetTradeFilters(){
      this.selectedTradeTotalItems = 'one'
      this.$store.commit('trade/setTradeType', 'All')
      this.filterTrades()
    },

    // fetch trade offer items
    filterTrades: debounce(function () {
      this.sectionTypes = []
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
            price_max: priceRange[1]
        })
        .then(res => {  // trades listing items in response
          this.sectionTypes = res.data.data
        })
    }, 500)
  }
}
</script><style lang="sass" scoped>
@import '~/assets/css/_variables'

.trade-card
  width: 255px
  background: $color-white-1
  border: 1px solid $light-gray-2
  box-sizing: border-box
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

</style>