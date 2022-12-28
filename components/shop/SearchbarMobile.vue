<template>
  <div class="container searchbar-main py-3 px-3">
    <div class="d-flex align-items-center sf-wrapper pb-2">
      <div class="back-arrow" @click="$emit('close')">
        <Arrowback class="backarrow_icon mr-2" />
      </div>
      <div class="searchbar-filter position-relative w-100">
        <b-form-input
          ref="searchInput"
          v-model="keyword"
          type="search"
          :placeholder="$t('common.search')"
          class="border-0 w-100 font-primary fs-12 fw-4"
          :autofocus="true"
        />
        <SearchIcon class="search_icon position-absolute" />
      </div>
      <div
        class="setting-filter d-flex justify-content-start px-0 ml-2"
        @click="$emit('showFilters')"
      >
        <FilterIcon class="filter_icon" />
      </div>
    </div>
    <section v-if="recentSearch.length" class="recent-searches mt-4 mb-3">
      <div class="d-flex justify-content-between align-items-center my-3">
        <h4 class="fs-16 fw-6 text-black font-primary mb-0">
          {{ $t('common.recent_searches') }}
        </h4>
        <h4 class="fs-13 fw-5 text-gray font-primary mb-0" @click="clearAllSearch">
          {{ $t('common.clear_all') }}
        </h4>
      </div>
      <!-- Todo  -->
      <div class="recent-searches-list">
        <div
          v-for="(search, key) in recentSearch"
          :key="`search-${key}`"
          class="d-flex justify-content-between align-items-center my-2"
        >
          <h4 class="fs-13 fw-5 text-gray font-primary mb-0 text-truncate">
            {{ search.keyword }}
          </h4>
          <div class="pr-3" @click="getTrending(search.keyword)">
            <Arrowforward class="backarrow_icon" />
          </div>
        </div>
      </div>
    </section>
    <!-- todo  -->
    <section class="trending-products my-3">
      <h4 class="fs-17 fw-5 text-black font-primary mb-0 my-3">
        {{ $t('home.trending') }}
      </h4>
      <div
        v-if="trendingLoading"
        class="d-flex align-items-center justify-content-center h-300"
      >
        <Loader/>
      </div>
      <template v-if="!noSearchResult">
        <div
          v-for="(product, index) in trendingProducts"
          :key="index"
          class="trending-products-list border br-5 p-2 my-2"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2 d-flex align-items-center">
              <div class="product-thumb">
                <Thumb :src="product.image" class="mr-2" />
              </div>
              <h4 class="fs-13 fw-5 text-gray font-primary mb-0 text-truncate pl-3">
                {{ getTruncateName(product) }}
              </h4>
            </div>
            <nuxt-link class="back" :to="`/shop/${product.sku}`">
              <Arrowforward class="backarrow_icon" />
            </nuxt-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-items-found-title d-flex align-items-center justify-content-center h-300">
          {{ $t('auctions.frontpage.no_results_found') }}
        </div>
      </template>
    </section>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
import FilterIcon from '~/assets/icons/FilterIcon'
import SearchIcon from '~/assets/icons/SearchIcon'
import Arrowback from '~/assets/icons/Arrowback'
import Arrowforward from '~/assets/icons/Arrowforward'
import Thumb from '~/components/product/Thumb'
import  Loader  from '~/components/shop/ShopProductLoader'

export default {
  name: 'SearchbarMobile',
  components: {
    FilterIcon,
    SearchIcon,
    Arrowback,
    Thumb,
    Arrowforward,
    Loader,
  },
  data() {
    return {
      noSearchResult: false,
      trendingLoading: true,
      trendingProducts: [],
      recentSearch: [],
      keyword: null,
    }
  },
  watch: {
    keyword: {
      handler(newV) {
          this.getTrending(newV)
       
      },
    },
  },
  methods: {
    focusInput() {
      this.$refs.searchInput.$el.focus()
    },
    getTruncateName(product) {
      const name = product.name.split(' ').slice(0, 3).join(' ')
      return name
    },
    getTrending: debounce(function (keyword) {
      const filters = {}
      this.trendingProducts = []
      this.trendingLoading = true
      this.keyword = keyword
      filters.search = this.keyword
       this.$axios
        .get('/products/shop/trending', {
          params: filters,
        })
        .then((res) => {
          
          console.log('trending response', res)
          this.noSearchResult = false
          this.trendingProducts = res.data.data
          this.saveRecentSearch()
          if(this.trendingProducts.length === 0) {
             this.noSearchResult = true
          } 
        })
        .finally(() => {
          this.trendingLoading = false
        })
    }, 500),
    getRecentSearches() {
      if (this.authenticated) {
        this.$axios
          .get('/recent/search')
          .then((res) => {
            this.recentSearch = res.data.data
          })
      }
    },
    saveRecentSearch: debounce(function () {
      if (this.authenticated) {
        if(!this.keyword){
          return;
        }
          this.$axios
        .post(`/recent/search/${this.keyword}`)
       
      }
    }, 500),
    clearAllSearch() {
        this.$axios
          .get('/recent/search/clear')
          .then((res) => {
            this.recentSearch = res.data.data
          })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.searchbar-main
  display: block
  .trending-products
    a
     padding-right: 5px
  .h-300
    height: 300px
  .searchbar-filter
    input[type="search"]
      background: $color-white-19
      padding-left: 39px
      padding-right: 10px
      height: 33px
      border-radius: 8px
      &::placeholder
        color:  $color-gray-6
        letter-spacing: 0.06em
      &::-webkit-search-cancel-button
        -webkit-appearance: none
        height: 1.5em
        width: 1.5em
        background: url(~assets/img/icons/search-close-circle.svg) no-repeat 50% 50%
        background-size: contain
        padding-right: 10px
        cursor: pointer
.search_icon::v-deep
    .strokeColor
        stroke: $color-gray-6
.filter_icon::v-deep
    .lineColor
        stroke: $color-gray-47
    .circleColor
        fill: $color-gray-23
.search_icon
    left: 14px
    top: 9px
    width: 14px
    height: 14px
.product-thumb
    width: 70px
.product-name-text
  color: $color-black-15
</style>
