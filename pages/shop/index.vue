<template>
  <b-overlay :opacity="0.85" blur="2px" :show="loadingFilter" rounded="sm">
    <div class="container-shop pb-5">
      <section class="section-filters">
        <div class="d-none d-sm-block container">
          <h1 class="fs-48 fw-7 font-adobe-garamond my-4">{{$t('shop.browse_shop')}}</h1>
          <ShopFilters ref="filterSidebar" @apply="fetchProducts" />
        </div>
        <div class="searchbar d-block d-sm-none">
          <SearchAndFilter @apply="fetchProducts"  />
        </div>
      </section>
      <NavGroup
        :data="CATEGORIES"
        :value="category"
        nav-key="category"
        btn-class="px-lg-5 px-0"
        class="section-nav text-center my-4 mx-3 mx-sm-0"
        @change="handleCategoryChange"
      />
      <div v-if="!noSearchResult" class="container">
        <section class="recently-viewed">
          <SectionHeader
            :title="$t('auctions.frontpage.recently_viewed')"
            :label="$t('home.view_more_products')"
            to="/shop/products?type=recent"
            full-width
          />
        <div
          v-if="recentLoading"
          class="d-flex align-items-center justify-content-center h-300"
        >
          <Loader :loading="recentLoading"></Loader>
        </div>
          <ProductShopCarousel
            v-if="!recentLoading"
            class="mt-4 mb-5"
            :products="recentProducts"
            :showActions="false"
            showArrowsOnHover
            loop
          />
        </section>
       
        <section class="new-release">
          <SectionHeader
            :title="$t('banner.new_release')"
            :label="$t('banner.view_more_release')"
            to="/shop/products?type=new-release"
            full-width
          />
          <div
          v-if="newReleaseLoading"
          class="d-flex align-items-center justify-content-center h-300"
        >
          <Loader :loading="newReleaseLoading"></Loader>
        </div>
          <ProductShopCarousel v-if="!newReleaseLoading" class="mt-4 mb-5" :products="newRelease" loop />
        </section>
       
        <section class="trending">
          <SectionHeader
            :title="$t('home.trending')"
            :label="$t('banner.view_more_trending')"
            to="/shop/products?type=trending"
            full-width
          />
          <div
          v-if="trendingLoading"
          class="d-flex align-items-center justify-content-center h-300"
        >
          <Loader :loading="trendingLoading"></Loader>
        </div>
          <ProductShopCarousel  v-if="!trendingLoading" class="mt-4 mb-5" :products="trendingPRoducts" loop />
        </section>
        <section class="ad-banner">
          <AdBanner class="d-block d-md-none" />
        </section>
        
        <section class="instant-shipping">
          <SectionHeader
            :title="$t('home_page.instant_shipping')"
            :label="$t('home_page.view_more_products')"
            to="/shop/products?type=instant-shipping"
            full-width
          />
          <div
          v-if="instantShippingLoading"
          class="d-flex align-items-center justify-content-center h-300"
        >
          <Loader :loading="instantShippingLoading"></Loader>
        </div>
          <ProductShopCarousel v-if="!instantShippingLoading" class="mt-4 mb-5" :products="instantShippingProducts" loop>
            <template #product>
              <div
                v-for="(product, index) in products"
                :key="`product-carousel-${index}`"
                class="item"
              >
                <ProductCard :product="product">
                  <template #badge>
                    <!-- TODO -->
                    <Badge
                      :title="$t('home_page.instant')"
                      :icon="require('~/assets/img/home/instant.svg')"
                      color="black"
                      right
                    />
                  </template>
                </ProductCard>
              </div>
            </template>
          </ProductShopCarousel>
        </section>
      </div>
      <div v-else>
        <div class="text-center no-items-found">
          <img src="~/assets/img/no-items-found.png" class="mr-3" />
          <div>
            <div class="no-items-found-title">
              {{ $t('auctions.frontpage.no_results_found') }}
            </div>
            <div class="no-items-found-subtitle">
              {{ $t('auctions.frontpage.cant_find_anything') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-overlay>
</template>
<script>
import debounce from 'lodash.debounce';
import { mapActions, mapGetters } from 'vuex'
import {
  MEN
} from '~/static/constants'
import ShopFilters from '~/components/shop/ShopFilters.vue'
import AdBanner from '~/components/shop/AdBanner.vue'
import { NavGroup,Loader } from '~/components/common'
import ProductCard from '~/components/product/Card'
import Badge from '~/components/product/Badge'
import SearchAndFilter from '~/components/shop/SearchAndFilter'
import ProductShopCarousel from '~/components/shop/ProductCarousel'

export default {
  components: {
    NavGroup,
    ProductCard,
    Badge,
    AdBanner,
    ShopFilters,
    SearchAndFilter,
    ProductShopCarousel,
    Loader
  },
  layout: 'IndexLayout',
  fetchOnServer: false,
  data() {
    return {
      noSearchResult: false,
      recentLoading:true,
      newReleaseLoading:true,
      trendingLoading:true,
      instantShippingLoading:true,
      MEN,
      // todo
      products: [],
      CATEGORIES: [
        { label: this.$t('common.all'), value: 'all' },
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$t('common.all_sizes', 2), value: 'all_sizes' },
      ],
      category: 'sneakers',
      loading: false,
      loadingFilter: false,
      prices:null,
      perPage: 12,
      page: 1,
      recentProducts: [],
      newRelease: [],
      trendingPRoducts: [],
      instantShippingProducts: [],
      desc: true
    }
  },
  async fetch() {
    const categoryName = this.$router.currentRoute.query.category.toLowerCase();
    this.$store.commit('browse/setSelectedCategory', categoryName)
    await this.fetchFilters()
    this.fetchProducts()
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedPrices',
      'selectedYears',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeType',
      'selectedSearch',
      'selectedSort',
      'selectedOrdering',
      'selectedCategory'
    ]),
  },
  created(){
    this.resetFilters()
  },
  methods: {
    ...mapActions('browse', ['fetchFilters','resetFilters']),

    handleCategoryChange(category) {
      this.category = category
      this.$store.commit('browse/setSelectedCategory', category)
      this.fetchProducts()
    },
    fetchProducts: debounce(function () {
      if (!this.perPage || !this.page) return
      this.loading = false
      const filters = {}
      if (this.selectedCategory) {
        filters.category = this.selectedCategory !== 'all' ? this.selectedCategory :  '';
        this.category = this.selectedCategory
      }
      if (this.selectedPrices.length  > 0) {
        this.prices = this.selectedPrices[0] * 100 +'-'+this.selectedPrices[1] * 100
        filters.prices = this.prices
      }
      if (this.selectedBrands) {
        filters.brands = this.selectedBrands.join(',')
      }
      if (this.selectedSizes) {
        filters.sizes = this.selectedSizes.join(',')
      }
      if (this.selectedYears) {
        filters.years = this.selectedYears.join('-')
      }
      if(this.selectedSearch){
        filters.search = this.selectedSearch
      }
      filters.size_types = this.selectedSizeType ?? MEN
      filters.desc = this.selectedSort?this.selectedSort:'true'

      filters.take =  this.perPage
      this.saveRecentSearch(this.selectedSearch)
      this.getRecentProducts(filters)
      this.getNewRelease(filters)
      this.getTrending(filters);
      this.getInstantShip(filters)
    }, 200),
    getRecentProducts(filters) {
      this.recentLoading =true
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      }else{
        filters.order_by = 'views'
      }
      this.$axios
        .get('/products/shop', {
          params: filters
        })
        .then((res) => {
          this.recentProducts = res.data.data
        })
        .finally(() => {
          this.recentLoading = false
        })
      },
    getNewRelease(filters){
      this.newReleaseLoading =true
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      }else{
        filters.order_by = 'created_at'
      }
      this.$axios
        .get('/products/shop', {
          params: filters
        })
        .then((res) => {
          this.newRelease = res.data.data
        })
        .finally(() => {
          this.newReleaseLoading = false
        })
    },
    getTrending(filters){
      this.trendingLoading =true
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      }else{
        filters.order_by = 'created_at'
      }
      this.$axios
        .get('/products/shop/trending', {
          params: filters
        })
        .then((res) => {
          this.trendingPRoducts = res.data.data
        })
        .finally(() => {
          this.trendingLoading = false
        })
    },
    getInstantShip(filters){
      this.instantShippingLoading =true
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      }else{
        filters.order_by = 'created_at'
      }
      this.$axios
        .get('/products/shop/instant-shipping', {
          params: filters
        })
        .then((res) => {
          this.instantShippingProducts = res.data.data
        })
        .finally(() => {
          this.instantShippingLoading = false
        })
    },
    saveRecentSearch(keyword){
      if (this.authenticated) {
        if(!keyword){
          return;
        }
          this.$axios
        .post(`/recent/search/${keyword}`)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-shop
  .h-300
    height: 300px
    
  @media (min-width: 1024px)
    .scroll-to-top
      display: flex !important
      bottom: -100px
      right: 60px
      border: 2px solid $color-blue-20
      width: 40px
      aspect-ratio: 1
      z-index: 1020
      transition: 0.5s all ease-in-out
      &.scrolled
        bottom: 40px
  .no-items-found
    img
      width: 130px
    &-title
      @include heading-7
      color: $color-gray-5
      font-family: $font-sp-pro
    &-subtitle
      @include body-1-regular
      font-family: $font-sp-pro
      color: $black
::v-deep .section-header
  @media (max-width: 576px)
    margin: 30px 12.5px
.container-shop
  @media (min-width: 576px)
    margin: 0px 60px

</style>
