<template>
  <div class="search-page-container">
    <SearchBanner />

    <div class="main">
      <div class="d-flex align-items-center heading">
        <h2 class="flex-grow-1">{{ $t('common.all') }}</h2>

        <FormDropdown
          id="sort-by"
          :value="sortBy"
          :placeholder="$t('selling_page.sortby')"
          :items="SORT_OPTIONS"
          :icon="require('~/assets/img/icons/three-lines.svg')"
          :icon-arrow-down="require('~/assets/img/icons/arrow-down-gray.svg')"
          class="dropdown-sort flex-shrink-1"
          can-clear
          @select="handleSortBySelect"
        />

        <Button
          ref="btnFilters"
          v-b-toggle.collapse-filters
          variant="light"
          class="btn-filters"
          >{{ $tc('common.filter', 2) }}</Button
        >
      </div>

      <b-collapse id="collapse-filters">
        <SearchFilters
          class="search-filters"
          @close="closeFilter()"
          @apply="applyFilters"
        />
      </b-collapse>

      <div v-if="showShop" class="shop-section">
        <div class="d-flex justify-content-between align-items-center">
          <SubTitle :title="$t('common.shop')" />

          <ViewMoreButton @click="$router.push('/shop')" />
        </div>

        <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
          <ProductCarousel
            :products="sellingProducts"
            variant="detail"
            class="section-carousel"
          />
        </b-overlay>
      </div>

      <div v-if="showTrade" class="trade-section text-center">
        <div class="d-flex justify-content-between align-items-center">
          <SubTitle :title="$t('common.trade')" />

          <ViewMoreButton />
        </div>

        <NavGroup
          :data="TRADE_TYPES"
          :value="tradeType"
          nav-key="trade"
          class="section-nav mx-auto"
          @change="changeTradeType"
        />

        <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
          <TradeCarousel
            :products="tradeProducts"
            class="section-carousel"
            card-border
          />
        </b-overlay>
      </div>

      <div v-if="showAuction" class="auction-section text-center">
        <div class="d-flex justify-content-between align-items-center">
          <SubTitle :title="$t('common.auction')" />

          <ViewMoreButton />
        </div>

        <NavGroup
          :data="AUCTION_TYPES"
          :value="auctionType"
          nav-key="auction"
          class="section-nav mx-auto"
          @change="changeAuctionType"
        />

        <b-overlay :opacity="0.85" blur="2px" :show="loading" rounded="sm">
          <AuctionCarousel
            :products="auctionProducts"
            class="section-carousel"
          />
        </b-overlay>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import debounce from 'lodash.debounce'
import { SEARCH_PRODUCT_COUNT } from '~/static/constants'
import SearchBanner from '~/components/search/Banner'
import { FormDropdown, Button, NavGroup } from '~/components/common'
import SubTitle from '~/components/search/SubTitle'
import ViewMoreButton from '~/components/search/ViewMoreButton'
import ProductCarousel from '~/components/product/Carousel'
import TradeCarousel from '~/components/trade/Carousel'
import AuctionCarousel from '~/components/Auctions/Carousel.vue'
import SearchFilters from '~/components/search/Filters'

export default {
  name: 'Search',

  components: {
    SearchBanner,
    FormDropdown,
    Button,
    SubTitle,
    ViewMoreButton,
    ProductCarousel,
    TradeCarousel,
    AuctionCarousel,
    NavGroup,
    SearchFilters,
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
      TRADE_TYPES: [
        {
          label: this.$t('common.one') + ' ' + this.$tc('common.item', 1),
          value: 'one_item',
        },
        {
          label: this.$t('common.two') + ' ' + this.$tc('common.item', 2),
          value: 'two_items',
        },
        {
          label: this.$t('common.three') + ' ' + this.$tc('common.item', 2),
          value: 'three_items',
        },
      ],
      tradeType: 'one_item',
      AUCTION_TYPES: [
        {
          label: this.$t('common.all'),
          value: null,
        },
        {
          label: this.$tc('common.single_item', 2),
          value: 'single_items',
        },
        {
          label: this.$tc('common.collection', 2),
          value: 'collections',
        },
      ],
      auctionType: null,
      sellingProducts: [],
      tradeProducts: [
        {
          id: 8,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
        },
      ],
      auctionProducts: [
        {
          id: 8,
          sku: 'DC6515-100',
          name: 'Velit libero voluptas minima.',
          colorway: 'MistyRose',
          brand: 'Lockman, Lehner and Kling',
          category: 'sneakers',
          release_year: 2003,
          created_at: '2022-03-04T04:05:29.000000Z',
          updated_at: '2022-03-04T04:05:29.000000Z',
          vendor_id: 8,
          size_category_id: 5,
        },
      ],
      loading: true,
      filters: {},
    }
  },

  async fetch() {
    this.loading = true
    await this.fetchFilters()
    await this.searchProducts()
    this.loading = false
  },

  computed: {
    showShop() {
      return !this.filters.types || this.filters.types.includes('shop')
    },

    showAuction() {
      return !this.filters.types || this.filters.types.includes('auction')
    },

    showTrade() {
      return !this.filters.types || this.filters.types.includes('trade')
    },
  },

  watch: {
    '$route.query.q'() {
      this.searchProducts()
    },
  },

  methods: {
    ...mapActions('browse', ['fetchFilters']),

    changeTradeType(value) {
      this.tradeType = value
    },

    changeAuctionType(value) {
      this.auctionType = value
    },

    closeFilter() {
      this.$refs.btnFilters.$el.click()
    },

    applyFilters(filters) {
      this.filters = filters
      this.searchProducts()
    },

    handleSortBySelect(value) {
      this.sortBy = value?.value
      this.searchProducts()
    },

    searchProducts() {
      if (this.showShop) {
        this.fetchSellingProducts()
      }
      // fetch auctions and trades later
    },

    fetchSellingProducts: debounce(function () {
      this.loading = true
      const filters = {}
      if (this.sortBy) {
        filters.sort_by = this.sortBy
      }
      if (this.$route.query?.q) {
        filters.search = this.$route.query.q
      }
      if (this.filters.categories) {
        filters.categories = this.filters.categories.join(',')
      }
      if (this.filters.sizes) {
        filters.sizes = this.filters.sizes.join(',')
      }
      if (this.filters.sizeTypes) {
        filters.size_types = this.filters.sizeTypes.join(',')
      }
      if (this.filters.years) {
        filters.years = this.filters.years.join('-')
      }

      this.$axios
        .get('/list-all-products', {
          params: { filters, page: 1, per_page: SEARCH_PRODUCT_COUNT },
        })
        .then((res) => {
          this.sellingProducts = res.data?.data
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

.search-page-container
  .main
    max-width: 1440px
    margin-left: auto
    margin-right: auto
    padding: 42px 93px 104px 93px

    .heading
      h2
        @include heading-3
        font-weight: $bold
        color: $color-black-1
        margin: 0 0 0 19px

      .dropdown-sort::v-deep
        margin-right: 40px

        .btn-dropdown
          @include body-4-normal
          color: $color-black-1
          border: 1px solid $color-white-1
          background-color: $color-white-5
          border-radius: 8px
          height: 46px
          width: 253px
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

      .btn-filters
        @include body-4-normal
        height: 46px
        border-radius: 8px

    .search-filters
      margin-top: 80px

    .shop-section
      margin-top: 64px

      .section-carousel
        margin-top: 41px

    .trade-section
      margin-top: 102px

      .section-nav
        margin-top: 28px

      .section-carousel
        margin-top: 42px

    .auction-section
      margin-top: 103px

      .section-nav
        margin-top: 28px

      .section-carousel
        margin-top: 42px

@media (max-width: 680px)
  .search-page-container
    .main
      .heading
        flex-wrap: wrap

        h2
          width: 100%
          margin-bottom: 20px

        .btn-filters
          flex-grow: 1

      .search-filters
        margin-top: 20px

@media (max-width: 628px)
  .search-page-container
    .main
      .heading
        flex-direction: column
        align-items: flex-start !important

        > *
          width: 100%

        .dropdown-sort::v-deep
          margin-bottom: 20px

          .btn-dropdown
            width: 100%

@media (max-width: 576px)
  .search-page-container
    .main
      padding: 42px 30px 104px 30px

      .heading
        padding: 0 20px

        h2
          margin-left: 0

        .dropdown-sort::v-deep
          margin-bottom: 20px
          margin-right: 0

      .section-carousel
        margin-left: -10px
        margin-right: -10px
</style>
