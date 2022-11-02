<template>
  <b-overlay :opacity="0.85" blur="2px" :show="loadingFilter" rounded="sm">
    <div class="container-shop pb-5">
      <section class="section-filters">
        <div class="d-none d-sm-block container">
          <h1 class="fs-48 fw-7 font-adobe-garamond my-4">{{$t('shop.browse_shop')}}</h1>
          <ShopFilters ref="filterSidebar" @apply="fetchProducts" />
        </div>
        <div class="searchbar d-block d-sm-none">
          <SearchAndFilter @apply="fetchProducts" />
        </div>
      </section>
      <NavGroup
        :data="CATEGORIES"
        :value="category"
        nav-key="category"
        class="section-nav text-center mt-3 mx-3 mx-sm-0"
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
          <ProductCarousel
            class="mt-4 mb-5"
            :products="recentProducts"
            showArrows
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
          <ProductCarousel class="mt-4 mb-5" :products="newRelease" loop />
        </section>
        <section class="trending">
          <SectionHeader
            :title="$t('home.trending')"
            :label="$t('banner.view_more_trending')"
            to="/shop/products"
            full-width
          />
          <ProductCarousel class="mt-4 mb-5" :products="trendingPRoducts" loop />
        </section>
        <section class="ad-banner">
          <AdBanner class="d-block d-md-none" />
        </section>
        <section class="instant-shipping">
          <SectionHeader
            :title="$t('home_page.instant_shipping')"
            :label="$t('home_page.view_more_products')"
            to="/shop/products"
            full-width
          />
          <ProductCarousel class="mt-4 mb-5" :products="instantShippingProducts" loop>
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
          </ProductCarousel>
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
import { mapActions, mapGetters } from 'vuex'
import ShopFilters from '~/components/shop/ShopFilters.vue'
import AdBanner from '~/components/shop/AdBanner.vue'
import { NavGroup } from '~/components/common'
import ProductCard from '~/components/product/Card'
import Badge from '~/components/product/Badge'
import SearchAndFilter from '~/components/shop/SearchAndFilter'

export default {
  components: {
    NavGroup,
    ProductCard,
    Badge,
    AdBanner,
    ShopFilters,
    SearchAndFilter,
  },
  layout: 'IndexLayout',
  fetchOnServer: false,
  data() {
    return {
      noSearchResult: false,
      // todo
      products: [],
      CATEGORIES: [
        { label: this.$t('common.all'), value: 'all' },
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      category: 'all',
      loading: false,
      loadingFilter: false,
      perPage: 4,
      page: 1,
      recentProducts: [],
      newRelease: [],
      trendingPRoducts: [],
      instantShippingProducts: [],
      desc: true
    }
  },
  async fetch() {
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
      'selectedSizeTypes',
      'selectedSearch',
      'selectedSort',
      'selectedOrdering'
    ]),
  },

  methods: {
    ...mapActions('browse', ['fetchFilters']),

    handleCategoryChange(category) {
      this.noSearchResult = false
      this.category = category
      this.fetchProducts()
    },
    noSearchResultFound() {
      this.noSearchResult = true
    },
    fetchProducts() {
      if (!this.perPage || !this.page) return
      this.loading = false
      const filters = {}
      if (this.search) {
        filters.search = this.search
      }
      if (this.category) {
        filters.category = this.category !== 'all' ? this.category :  '';
      }
      if (this.selectedPrices) {
        filters.prices = this.selectedPrices.join('-')
      }
      if (this.selectedBrands) {
        filters.brands = this.selectedBrands.join(',')
      }
      if (this.selectedSizes) {
        filters.sizes = this.selectedSizes.join(',')
      }
      if (this.selectedSizeTypes) {
        filters.size_types = this.selectedSizeTypes
      }
      if (this.selectedYears) {
        filters.years = this.selectedYears.join('-')
      }
      if(this.selectedSearch){
        filters.search = this.selectedSearch
      }
      filters.desc = this.selectedOrdering

      filters.take = 4
      this.getRecentProducts(filters)
      this.getNewRelease(filters)
      this.getTrending(filters);
      this.getInstantShip(filters)
    },
    getRecentProducts(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
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
          this.loading = false
        })
    },
    getNewRelease(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
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
          this.loading = false
        })
    },
    getTrending(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.sort_by = 'created_at'
      }
      this.$axios
        .get('/products/shop/trending', {
          params: filters
        })
        .then((res) => {
          this.trendingPRoducts = res.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getInstantShip(filters){
      if (this.selectedSort) {
        filters.order_by = this.selectedSort
      }else{
        filters.sort_by = 'created_at'
      }
      this.$axios
        .get('/products/shop/instant-shipping', {
          params: filters
        })
        .then((res) => {
          this.instantShippingProducts = res.data.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-shop
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
</style>
