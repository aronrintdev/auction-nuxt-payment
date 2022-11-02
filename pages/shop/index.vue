<template>
  <b-overlay :opacity="0.85" blur="2px" :show="loadingFilter" rounded="sm">
    <div class="container-shop pb-5">
      <section class="section-filters">
        <div class="d-none d-sm-block container">
          <h1 class="fs-48 fw-7 font-adobe-garamond my-4">Browse Shop</h1>
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
            to="/auctions"
            full-width
          />
          <ProductCarousel
            class="mt-4 mb-5"
            :products="products"
            showArrows
            loop
          />
        </section>
        <section class="new-release">
          <SectionHeader
            :title="$t('banner.new_release')"
            :label="$t('banner.view_more_release')"
            to="/auctions"
            full-width
          />
          <ProductCarousel class="mt-4 mb-5" :products="products" loop />
        </section>
        <section class="trending">
          <SectionHeader
            :title="$t('home.trending')"
            :label="$t('banner.view_more_trending')"
            to="/auctions"
            full-width
          />
          <ProductCarousel class="mt-4 mb-5" :products="products" loop />
        </section>
        <section class="ad-banner">
          <AdBanner class="d-block d-md-none" />
        </section>
        <section class="instant-shipping">
          <SectionHeader
            :title="$t('home_page.instant_shipping')"
            :label="$t('home_page.view_more_products')"
            to="/auctions"
            full-width
          />
          <ProductCarousel class="mt-4 mb-5" :products="products" loop>
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
import debounce from 'lodash.debounce'
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
      products: [
        {
          id: 1,
          sku: 'CZ0328-400',
          brand: 'Nike',
          name: 'Nike LeBron 8 South Beach (2021)',
          colorway: 'Retro/Pink Flash-Filament Green-Black',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-21',
          retail_price: 20000,
          estimated_market_value: 252,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60556a245d104527f351af92',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 27004,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 2,
          sku: 'DJ7998-100',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Hare Space Jam',
          colorway: 'White/Light Blue Fury-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 12000,
          estimated_market_value: 185,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DJ7998-100/800xAUTO/IMG01.jpg',
          _id: '60c9ea8eb842f35756e39442',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 23547,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 3,
          sku: 'CV7562-401',
          brand: 'Nike',
          name: 'Nike Lebron 18 Low Wile E. vs Roadrunner Space Jam',
          colorway: 'Racer Blue/Baltic Blue-University Gold-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 16000,
          estimated_market_value: 223,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/CV7562-401/800xAUTO/IMG01.jpg',
          _id: '60e59a7fea2d5e0f0a00c97a',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 26129,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 4,
          sku: 'DH5354-001',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Computer Chip Space Jam',
          colorway: 'Black/Light Blue Fury-Black',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-16',
          retail_price: 12000,
          estimated_market_value: 185,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60df02f5ffd94d9799292f38',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 22199,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 5,
          sku: 'DO7172-900',
          brand: 'Nike',
          name: "Xbox x Space Jam x LeBron 18 Low 'Wile E. x Roadrunner' Special Box",
          colorway: 'Racer Blue/Baltic Blue/University Gold/White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-07-15',
          retail_price: 22000,
          estimated_market_value: 950,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image: null,
          _id: '60e83d7fbbdf6b4a4fd2097c',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 40373,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 7,
          sku: 'DD1399-102',
          brand: 'Nike',
          name: 'Nike Dunk High Game Royal',
          colorway: 'White/Game Royal-Total Orange',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-29',
          retail_price: 11000,
          estimated_market_value: 139,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DD1399-102/800xAUTO/IMG01.jpg',
          _id: '60556a255d104527f3524e21',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 25505,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 6,
          sku: 'DJ6395-100',
          brand: 'Nike',
          name: 'Nike Air Force 1 Low Acorn (2021)',
          colorway: 'Natural/Underbrush-Acorn',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-29',
          retail_price: 13000,
          estimated_market_value: 105,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '2',
          image: null,
          _id: '60556a245d104527f352096c',
          views: 0,
          searches: 0,
          rank: 0,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 29671,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 8,
          sku: 'DH7683-100',
          brand: 'Nike',
          name: 'Nike Dunk SB High Pro Ishod Wair x Magnus Walker',
          colorway: 'Sail/University Blue-Red',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-25',
          retail_price: 12000,
          estimated_market_value: 369,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DH7683-100/800xAUTO/IMG01.jpg',
          _id: '60bf5e9a5719fe2a19be01ba',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 41814,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 9,
          sku: 'DD1391-102',
          brand: 'Nike',
          name: 'Nike Dunk Low UNC (2021)',
          colorway: 'White/University Blue-White',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-24',
          retail_price: 10000,
          estimated_market_value: 250,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '0',
          image:
            '//images.deadstock.co/products/sneakers/DD1391-102/800xAUTO/IMG01.jpg',
          _id: '60556a225d104527f350f1cf',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 23628,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
        {
          id: 10,
          sku: 'DH7913-001',
          brand: 'Nike',
          name: 'Nike Dunk Low Retro Animal Pack Zebra',
          colorway: 'Black/Pure Platinum-Canvas-Sail',
          gender: 'men',
          category_id: 1,
          release_year: '2021',
          release_date: '2021-06-22',
          retail_price: 11000,
          estimated_market_value: 158,
          story: '',
          ai: 0,
          enabled: 1,
          total_sales: '1',
          image:
            '//images.deadstock.co/products/sneakers/DH7913-001/800xAUTO/IMG01.jpg',
          _id: '60ae3ecf832eb91050f0d937',
          views: 0,
          searches: 0,
          rank: 2,
          created_at: '08/23/2022',
          updated_at: '08/23/2022',
          size_type: 'men',
          brand_id: 1,
          sale_price: 25207,
          previous_month_sale_percentage: 0,
          current_month_sale_percentage: 0,
          sales_percentage: 0,
          category: {
            id: 1,
            name: 'sneakers',
            _id: 'ueEbqPBxLbnTFLWwQdc4gv',
            created_at: '08/23/2022',
            updated_at: '08/23/2022',
          },
        },
      ],
      CATEGORIES: [
        { label: this.$t('common.all'), value: 'all' },
        { label: this.$t('common.footwear'), value: 'footwear' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      category: 'all',
      loading: false,
      loadingFilter: false,
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
    ]),
  },

  methods: {
    ...mapActions('browse', ['fetchFilters']),

    handleCategoryChange(category) {
      this.noSearchResult = false
      this.category = category
    },
    noSearchResultFound() {
      this.noSearchResult = true
    },
    fetchProducts: debounce(function () {
      if (!this.perPage || !this.page) return
      this.loading = false
      const filters = {}
      if (this.sortBy) {
        filters.sort_by = this.sortBy
      }
      if (this.search) {
        filters.search = this.search
      }
      if (this.category) {
        filters.category = this.category
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
        filters.size_types = this.selectedSizeTypes.join(',')
      }
      if (this.selectedYears) {
        filters.years = this.selectedYears.join('-')
      }
      this.$axios
        .get('/list-all-products', {
          params: { filters, page: this.page, per_page: this.perPage },
        })
        .then((res) => {
          this.products = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }, 500),
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
