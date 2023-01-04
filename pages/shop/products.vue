<template>
  <div class="container-shop pb-5">
    <section class="section-filters">
      <div class="d-none d-sm-block container">
        <h1 class="fs-48 fw-7 font-adobe-garamond my-4">
          {{ $t('shop.browse_shop') }}
        </h1>
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
      class="section-nav text-center"
      btn-class="px-lg-5 px-0"
      @change="handleCategoryChange"
    />
    <section>
      <h1 class="fw-7 section-header heading-garamond text-left mx-4 mx-lg-0">
        {{ productType }}
      </h1>

      <!-- <template v-if="products.length"> -->
      <div
        class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2 product-section"
      >
        <div
          v-for="(product, index) in products"
          :key="`product-carousel-${index}`"
          class="item col"
        >
          <ShopProductCard :product="product" :showActions="false">
            <template v-if="pageType === 'instant-shipping'" #badge>
              <Badge
                :title="$t('home_page.instant')"
                :icon="require('~/assets/img/home/instant.svg')"
                color="black"
                right
              />
            </template>
          </ShopProductCard>
        </div>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="handleLoading">
        <template slot="spinner">
          <Loader />
        </template>
        <template slot="no-more"> No More Data </template>
      </infinite-loading>
      <!-- </template> -->
      <!-- <template v-if="!loading && products.length === 0">
        <div class="d-flex align-items-center justify-content-center h-300">
          <div class="no-items-found-title">
            {{ $t('auctions.frontpage.no_results_found') }}
          </div>
        </div>
      </template> -->
    </section>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
import { mapActions, mapGetters } from 'vuex'
import ShopFilters from '~/components/shop/ShopFilters.vue'
import SearchAndFilter from '~/components/shop/SearchAndFilter'
import ShopProductCard from '~/components/shop/ProductCard'
import Badge from '~/components/product/Badge'
import Loader from '~/components/shop/ShopProductLoader'
import { NavGroup } from '~/components/common'

export default {
  components: {
    ShopFilters,
    Badge,
    SearchAndFilter,
    NavGroup,
    ShopProductCard,
    Loader,
  },
  layout: 'IndexLayout',
  fetchOnServer: false,
  data() {
    return {
      currentPage: 1,
      maxPerPage: 12,
      totalResults: 0,
      loading: true,
      prices: null,
      products: [],
      pageType: this.$route.query.type,
      state: '',
      url: '',
      productType: '',
      category: 'all',
      CATEGORIES: [
        { label: this.$t('common.all'), value: 'all' },
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$t('common.accessories', 2), value: 'accessories' },
      ],
      infiniteId: +new Date(),
    }
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
      'selectedGender',
      'selectedProductType',
      'getIsFilterActive',
    ]),
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage)
    },
    pageOffset() {
      return this.maxPerPage * this.currentPage
    },
  },
  created() {
    this.resetFilters()
  },
  mounted() {
    this.fetchProducts()
    this.fetchFilters(this.category)
  },
  methods: {
    ...mapActions('browse', ['fetchFilters', 'resetFilters']),
    async handleLoading($state) {
      this.state = $state
      await this.fetchProducts()
    },
    fetchProducts: debounce(async function () {
      this.loading = true
      const filters = {}
      if (this.search) {
        filters.search = this.search
      }
      if (this.category) {
        filters.category = this.category !== 'all' ? this.category : ''
      }
      if (this.selectedPrices.length > 0) {
        this.prices =
          this.selectedPrices[0] * 100 + '-' + this.selectedPrices[1] * 100
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
      if (this.selectedSearch) {
        filters.search = this.selectedSearch
      }
      if (this.selectedSort) {
        filters.desc = this.selectedSort ?? 'true'
      }
      if (this.selectedProductType) {
        filters.product_type = this.selectedProductType
      }
      if (this.selectedGender) {
        filters.gender = this.selectedGender
      }
      if (this.selectedSizeType) {
        filters.size_types = this.selectedSizeType
      }
      if (this.getIsFilterActive === true) {
        this.products = []
        this.currentPage = 1
      }
      filters.take = this.maxPerPage
      filters.page = this.currentPage

      if (this.pageType === 'recent') {
        this.url = '/products/shop'
        this.productType = this.$t('auctions.frontpage.recently_viewed')
        await this.getRecentProducts(filters)
      } else if (this.pageType === 'new-release') {
        this.url = '/products/shop'
        this.productType = this.$t('banner.new_release')
        await this.getNewRelease(filters)
      } else if (this.pageType === 'trending') {
        this.url = '/products/shop/trending'
        this.productType = this.$t('home.trending')
        await this.getTrending(filters)
      } else if (this.pageType === 'instant-shipping') {
        this.url = '/products/shop/instant-shipping'
        this.productType = this.$t('home_page.instant_shipping')
        await this.getInstantShip(filters)
      }
    }, 200),
    async getRecentProducts(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'views'
      }
      await this.loadData(filters)
    },
    async getNewRelease(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'created_at'
      }
      await this.loadData(filters)
    },
    async getTrending(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'created_at'
      }
      await this.loadData(filters)
    },
    async getInstantShip(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'created_at'
      }
      await this.loadData(filters)
    },
    async loadData(filters) {
      await this.$axios
        .get(this.url, {
          params: filters,
        })
        .then((res) => {
          
          if (res.data.data.length) {
            this.currentPage += 1
            this.products.push(...res.data.data)
            this.state.loaded()
          } else {
            this.state.complete()
          }
          this.$store.commit('browse/setIsFilter', false)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async handleCategoryChange(category) {
      if (this.category === category) {
        return
      }
      this.category = category
      this.$store.commit('browse/setIsFilter', true)
      this.$store.commit('browse/setSelectedCategory', category)
      await this.fetchProducts()
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.h-300
  height: 300px
.container-shop
  .item
    margin-bottom: 70px
  .section-header
    margin-bottom: 50px
    margin-top: 70px
  @media (min-width: 576px)
    margin: 0px 60px
  .section-nav
    margin: 45px 0 70px 0
  @media (max-width: 425px)
    .section-header
      margin-bottom: 25px
      margin-top: 18px
    .section-nav
      margin: 16px 16px 18px 16px
    .product-section
      margin: 0 16px
</style>
