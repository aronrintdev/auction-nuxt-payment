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
      class="section-nav text-center mt-4 mb-5 mx-sm-0"
      btn-class="px-lg-5 px-0"
      @change="handleCategoryChange"
    />
    <section>
      <div class="pt-1">
        <h1 class="fw-7 heading-garamond text-left mb-4 mx-4 mx-lg-0">
          {{ productType }}
        </h1>

        <template v-if="products.length">
          <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
            <div
              v-for="(product, index) in products"
              :key="`product-carousel-${index}`"
              class="item mb-5 col"
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
        </template>
        <template v-else-if="!state">
          <div class="text-center no-items-found h-300">
            <div class="no-items-found-title">
              {{ $t('auctions.frontpage.no_results_found') }}
            </div>
          </div>
        </template>

        <infinite-loading :identifier="infiniteId" @infinite="handleLoading">
        </infinite-loading>
      </div>
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
import { NavGroup } from '~/components/common'

export default {
  components: {
    ShopFilters,
    Badge,
    SearchAndFilter,
    NavGroup,
    ShopProductCard
  },
  layout: 'IndexLayout',
  fetchOnServer: false,
  data() {
    return {
      currentPage: 1,
      maxPerPage: 12,
      totalResults: 0,
      loading: true,
      filter: false,
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
      'selectedProductType'
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
    handleLoading($state) {
      this.state = $state
      this.fetchProducts()
    },
    fetchProducts: debounce(function () {
      const filters = {}
      if (this.search) {
        this.filter = true
        filters.search = this.search
      }
      if (this.category) {
        this.filter = true
        filters.category = this.category !== 'all' ? this.category : ''
      }
      if (this.selectedPrices.length > 0) {
        this.filter = true
        this.prices =
          this.selectedPrices[0] * 100 + '-' + this.selectedPrices[1] * 100
        filters.prices = this.prices
      }
      if (this.selectedBrands) {
        this.filter = true
        filters.brands = this.selectedBrands.join(',')
      }
      if (this.selectedSizes) {
        this.filter = true
        filters.sizes = this.selectedSizes.join(',')
      }
      if (this.selectedYears) {
        this.filter = true
        filters.years = this.selectedYears.join('-')
      }
      if (this.selectedSearch) {
        this.filter = true
        filters.search = this.selectedSearch
      }
      if (this.selectedSort) {
        this.filter = true
        filters.desc = this.selectedSort ?? 'true'
      }
      if (this.selectedProductType) {
        this.filter = true
        filters.product_type = this.selectedProductType
      }
      if (this.selectedGender) {
        this.filter = true
        filters.gender = this.selectedGender
      }
      if(this.selectedSizeType){
         this.filter = true
        filters.size_types = this.selectedSizeType
      }
      
      filters.take = this.maxPerPage
      filters.page = this.currentPage

      if (this.pageType === 'recent') {
        this.url = '/products/shop'
        this.productType = this.$t('auctions.frontpage.recently_viewed')
        this.getRecentProducts(filters)
      } else if (this.pageType === 'new-release') {
        this.url = '/products/shop'
        this.productType = this.$t('banner.new_release')
        this.getNewRelease(filters)
      } else if (this.pageType === 'trending') {
        this.url = '/products/shop/trending'
        this.productType = this.$t('home.trending')
        this.getTrending(filters)
      } else if (this.pageType === 'instant-shipping') {
        this.url = '/products/shop/instant-shipping'
        this.productType = this.$t('home_page.instant_shipping')
        this.getInstantShip(filters)
      }
    }, 200),
     getRecentProducts(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'views'
      }
      this.loadData(filters)
    },
    getNewRelease(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'created_at'
      }
      this.loadData(filters)
    },
    getTrending(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'created_at'
      }
      this.loadData(filters)
    },
    getInstantShip(filters) {
      if (this.selectedOrdering) {
        filters.order_by = this.selectedOrdering
      } else {
        filters.order_by = 'created_at'
      }
      this.loadData(filters)
    },
    loadData(filters) {
      this.$axios
        .get(this.url, {
          params: filters,
        })
        .then((res) => {
          if (this.filter === true) {
            this.products = []
            this.currentPage = 1
          }
          this.loading = false
          const that = this
          this.filter = false
          if (!res.data.next_page_url) {
            this.state.complete()
          } else {
            this.currentPage += 1
            this.url = res.data.next_page_url
          }
          if (res.data.current_page === 1) {
            this.products = [...res.data.data]
          } else {
            this.products = [...that.products, ...res.data.data]
          }

          this.state.loaded()
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCategoryChange(category) {
      if (this.category === category) {
        return
      }
      this.filter = true
      this.category = category
      this.$store.commit('browse/setSelectedCategory', category)
      this.fetchProducts()
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.h-300
  height: 300px
.container-shop
  @media (min-width: 576px)
    margin: 0px 60px
</style>
