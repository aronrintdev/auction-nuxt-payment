<template>
  <div class="container-shop">
    <b-overlay :opacity="0.85" blur="2px" :show="loadingFilter" rounded="sm">
      <ShopBanner />

      <div class="wrapper">
        <div v-if="!loadingFilter" class="section-filters">
          <FilterSideBar ref="filterSidebar" @apply="fetchProducts" />
        </div>

        <div class="section-main flex-grow-1">
          <h2>{{ $t('navbar.shop') }}</h2>

          <div
            class="d-flex align-items-center justify-content-between mt-3 section-search"
          >
            <SearchInput
              :value="search"
              :placeholder="$t('shop.search_placeholder')"
              variant="light"
              class="flex-grow-1 mr-4 search-input"
              :debounce="1000"
              @change="handleSearchChange"
            />

            <FormDropdown
              id="sort-by"
              :value="sortBy"
              :placeholder="$t('selling_page.sortby')"
              :items="SORT_OPTIONS"
              :icon="require('~/assets/img/icons/three-lines.svg')"
              :icon-arrow-down="
                require('~/assets/img/icons/arrow-down-gray2.svg')
              "
              class="dropdown-sort flex-shrink-1"
              can-clear
              @select="handleSortBySelect"
            />
          </div>

          <BrandsCarousel class="mt-5" @select="handleBrandSelect" />

          <NavGroup
            :data="CATEGORIES"
            :value="category"
            nav-key="category"
            class="section-nav text-center"
            @change="handleCategoryChange"
          />

          <div class="mt-5">
            <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
              <ProductCardList
                :products="products"
                :page="page"
                :per-page="perPage"
                :margin="{ 0: 110, 992: 374 }"
                class="product-card-list"
                @page-change="handlePageChange"
              />
            </b-overlay>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash.debounce'
import ShopBanner from '~/components/shop/Banner.vue'
import BrandsCarousel from '~/components/shop/BrandsCarousel.vue'
import FilterSideBar from '~/components/shop/FilterSideBar.vue'
import ProductCardList from '~/components/product/CardList.vue'
import { SearchInput, FormDropdown, NavGroup } from '~/components/common'

export default {
  components: {
    ShopBanner,
    BrandsCarousel,
    FilterSideBar,
    ProductCardList,
    NavGroup,
    SearchInput,
    FormDropdown,
  },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      SORT_OPTIONS: [
        {
          label: this.$t('shop.sort_by.featured'),
          value: 'featured',
        },
        {
          label: this.$t('shop.sort_by.price_low_first'),
          value: 'price_asc',
        },
        {
          label: this.$t('shop.sort_by.price_high_first'),
          value: 'price_desc',
        },
        {
          label: this.$t('shop.sort_by.most_viewed'),
          value: 'most_viewed',
        },
        {
          label: this.$t('shop.sort_by.best_sellers'),
          value: 'best_sellers',
        },
      ],
      sortBy: null,
      search: '',
      CATEGORIES: [
        { label: this.$t('common.all'), value: null },
        { label: this.$t('common.footwear'), value: 'sneakers' },
        { label: this.$t('common.apparel'), value: 'apparel' },
        { label: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      category: null,
      products: {},
      loading: false,
      loadingFilter: true,
      page: 1,
      perPage: null,
    }
  },

  async fetch() {
    this.loadingFilter = true
    await this.fetchFilters()
    this.loadingFilter = false

    this.fetchProducts()
  },

  computed: {
    // Get the details from browse store
    ...mapGetters('browse', [
      'selectedPrices',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
      'selectedYears',
    ]),
  },

  methods: {
    ...mapActions('browse', ['fetchFilters']),

    handlePageChange(page, perPage) {
      this.page = page
      this.perPage = perPage
      this.fetchProducts()
    },

    handleBrandSelect(value) {
      this.$refs.filterSidebar.loadOptions()
      this.page = 1
      this.fetchProducts()
    },

    handleSearchChange(value) {
      this.search = value
      this.page = 1
      this.fetchProducts()
    },

    handleSortBySelect(value) {
      this.sortBy = value?.value
      this.page = 1
      this.fetchProducts()
    },

    handleCategoryChange(value) {
      this.category = value
      this.page = 1
      this.fetchProducts()
    },

    fetchProducts: debounce(function () {
      if (!this.perPage || !this.page) return

      this.loading = true
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
  background-color: $color-white-1
  box-sizing: border-box
  margin-left: -7.5px
  margin-right: -7.5px

  .wrapper
    display: flex

  .section-filters
    width: 264px
    flex-shrink: 0

  .section-main
    min-width: 350px
    padding: 47px 55px

    h2
      @include heading-3

    .dropdown-sort::v-deep
      .btn-dropdown
        @include body-4-normal
        color: $color-black-1
        border: 1px solid $color-white-1
        background-color: $color-white-5
        border-radius: 8px
        height: 44px
        width: 327px
        padding: 0 23px

        .icon-main
          margin-right: 20px !important

        .icon-clear
          right: 23px

        &.opened
          border-bottom-left-radius: 0
          border-bottom-right-radius: 0
          border: 1px solid $color-gray-59

      .search-results
        .popover-body
          >div
            @include body-4-normal
            font-family: $font-family-base
            color: $color-black-1
            background-color: $color-white-5
            height: 46px
            border: 1px solid $color-gray-59
            border-top: none
            padding: 0 23px

            &:hover
              color: $color-gray-5

            &:last-child
              border-bottom-left-radius: 8px
              border-bottom-right-radius: 8px

    .section-nav
      margin-top: 40px

  .product-card-list::v-deep
    .product-card
      margin-bottom: 98px

    .pagination-group
      margin-top: -70px

@media (max-width: 992px)
  .container-shop
    .wrapper
      flex-direction: column

      .section-filters
        width: 100%

@media (max-width: 805px)
  .container-shop
    .section-main
      .section-search
        flex-direction: column

      .search-input
        width: 100%
        margin-right: 0 !important

      .dropdown-sort::v-deep
        width: 100%
        margin-top: 3rem

        .btn-dropdown
          width: 100%
</style>
