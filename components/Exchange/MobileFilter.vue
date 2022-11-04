<template>
  <section class="position-relative auction-mobile-filter">
    <!-- <img
      src="~/assets/img/auctions/auctionbannermobilebrowse2.png"
      class="w-100 auction-mobile-filter-bg"
    /> -->
    <div
      class="d-flex align-items-center auction-mobile-filter-content searchbox"
      :class="{ active: searchEnabled }"
    >
      <img
        v-if="searchEnabled"
        src="~/assets/img/icons/back.svg"
        class="mr-2 back-btn"
        @click="searchEnabled = false"
      />
      <search-box
        :searchText="searchText"
        :placeholder="$t('deadstock_exchange.filter_by.details_placeholder')"
        @search="search"
        @focus="enableSearch"
      />
      <img
        src="~/assets/img/icons/more-filter-icon.svg"
        role="button"
        class="ml-3 more-btn"
        @click="openBottomFilter"
      />
    </div>
    <div v-if="searchEnabled" class="position-fixed search-results">
      <div v-if="hasSearchResult" class="products">
        <div
          v-for="prod in searchedProducts"
          :key="`${prod.sku}-${prod.category.name}`"
          class="text-left text-capitalize product d-flex align-items-center"
          @click="selectProduct(prod)"
        >
          <div class="position-relative d-inline-flex">
            <b-img
              :src="`${
                prod.image || 'https://images.deadstock.co/404.png'
              }?width=150}`"
              class="mx-auto"
              alt="..."
            />
          </div>
          <span class="flex-grow-1">&nbsp; {{ prod.name }}</span>
          <img
            src="~/assets/img/icons/long-arrow-right.svg"
            class="long-arrow"
          />
        </div>
        <div
          v-if="!searchedProducts.length"
          class="dropdown-option text-center"
        >
          {{ $t('sell.create_listing.no_result') }}
        </div>
      </div>
    </div>
    <vue-bottom-sheet ref="auctionFiltersSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">
          {{ $t('auctions.frontpage.filterbar.filter_by') }}
        </div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <!-- Sort -->
          <div class="filter-group">
            <div class="filter-group-title mb-3">
              {{ $t('auctions.frontpage.filterbar.sort') }}
            </div>
            <div class="flex-wrap justify-content-between filter-group-body">
              <label
                v-for="(option, idx) in SIMILAR_FILTER_SORT_OPTIONS"
                :key="idx"
                class="d-flex align-items-center"
              >
                <input
                  v-model="selectedFilters.sortby"
                  :value="option.value"
                  type="radio"
                  name="sortby"
                />
                <span class="ml-2">{{ option.label }}</span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-between filters-sheet-footer"
        >
          <button class="btn btn-pills" @click="resetFilters">
            {{ $t('auctions.frontpage.filterbar.reset') }}
          </button>
          <button class="btn btn-pills apply-btn" @click="applyFilters">
            {{ $t('auctions.frontpage.filterbar.apply_filters') }}
          </button>
        </div>
      </div>
    </vue-bottom-sheet>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import SearchBox from '../RoundSearchBox'
import { MIN_YEAR, MAX_YEAR, MIN_PRICE_RANGE_WINDOW } from '~/static/constants'

/*
 * Auction Mobile FilterBar
 */
export default {
  name: 'AuctionMobileFilter',
  components: {
    SearchBox,
  },
  data() {
    return {
      searchText: null,
      hasSearchResult: false,
      searchedProducts: [],
      searchEnabled: false,
      auctionTypes: [
        {
          label: this.$t('auctions.frontpage.filterbar.types.single'),
          value: 'single',
        },
        {
          label: this.$t('auctions.frontpage.filterbar.types.collections'),
          value: 'collection',
        },
      ],
      selectedFilters: {
        type: 'single',
        sizeTypes: [],
        categories: [],
        brands: [],
        sizes: [],
        status: [],
        sortby: null,
      },
      MAX_YEAR,
      MIN_YEAR,
      MIN_PRICE_RANGE_WINDOW,
      // selectedPrices: [MIN_PRICE, MAX_PRICE / 100],
      selectedYears: [MIN_YEAR, MAX_YEAR],
      SIMILAR_FILTER_SORT_OPTIONS: [
        {
          label: this.$t('vendor_purchase.sort_by'),
          value: 'default',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.highest_change'),
          value: 'highestChange',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.lowest_change'),
          value: 'lowestChange',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.release_date_asc'),
          value: 'releaseDateAsc',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.last_price_lh'),
          value: 'lastPriceLh',
        },
        {
          label: this.$t('deadstock_exchange.sort_by.last_price_hl'),
          value: 'lastPriceHl',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ filters: 'browse/filters' }),
    sizeOptions() {
      let options = this.filters?.sizes
      if (options && this.sizeTypes && this.sizeTypes.length > 0) {
        options = options.filter(({ type }) => this.sizeTypes.includes(type))
      }
      return (
        options?.map(({ id, size, type }) => {
          return {
            label: `${type} - ${size}`,
            value: id,
          }
        }) || []
      )
    },
    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
    },
    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: type, value: type }
      })
    },
  },
  mounted() {
    // Get categories list
    this.$axios
      .get('/categories', {
        params: {
          take: 3,
        },
      })
      .then((res) => {
        this.categoryOptions = res.data.map((cat) => ({
          label: this.$t(`common.categories.${cat.name}`),
          value: cat.id,
        }))
      })
      .catch(() => {
        this.categoryOptions = []
      })
  },
  methods: {
    search(value) {
      this.searchText = value
      if (value) {
        this.$axios
          .get('/products', {
            params: {
              search: value.toLowerCase(),
            },
          })
          .then((response) => {
            this.hasSearchResult = true
            this.searchedProducts = response.data.data || []
          })
          .catch((error) => {
            this.hasSearchResult = false
            this.$toasted.error(error)
          })
      } else {
        this.selectedFilters = {
          ...this.selectedFilters,
          product: null,
        }
      }
    },
    enableSearch() {
      this.searchEnabled = true
    },
    selectProduct(product) {
      this.searchText = product.name
      this.searchEnabled = false
      this.selectedFilters = {
        ...this.selectedFilters,
        product: product.sku,
      }
    },
    auctionTypeChanged(type) {
      if (this.selectedFilters.type !== type) {
        this.selectedFilters = {
          ...this.selectedFilters,
          type,
        }
        this.$emit('change', this.selectedFilters)
      }
    },
    filterGroupChanged(value, name) {
      this.selectedFilters = {
        ...this.selectedFilters,
        [name]: value,
      }
    },
    openBottomFilter() {
      this.$refs.auctionFiltersSheet.open()
    },
    closeBottomFilter() {
      this.$refs.auctionFiltersSheet.close()
    },
    // updatePriceFilters(value) {
    //   this.selectedPrices = value
    //   this.selectedFilters = {
    //     ...this.selectedFilters,
    //     minPrice: value[0] === MIN_PRICE ? undefined : value[0] * 100,
    //     maxPrice: value[1] === MAX_PRICE ? undefined : value[1] * 100,
    //   }
    // },
    // Update selected years and pass to parent component
    updateYearFilters(value) {
      this.selectedYears = value
      this.selectedFilters = {
        ...this.selectedFilters,
        minYear: value[0] === MIN_YEAR ? undefined : value[0],
        maxYear: value[1] === MAX_YEAR ? undefined : value[1],
      }
    },
    resetFilters() {
      this.selectedFilters = {}
    },
    applyFilters() {
      this.$emit('change', this.selectedFilters)
      this.closeBottomFilter()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.filters-sheet
  label
    font-family: $font-sp-pro
    font-weight: $normal
    font-size: 14px
    line-height: 17px
    color: $color-black-9
    margin-bottom: 15px
    &:last-child
      margin-bottom: 0
  &-title
    font-family: $font-sp-pro
    font-weight: $bold
    font-size: 17px
    line-height: 20px
    letter-spacing: -0.02em
    color: $black
    border-bottom: 0.5px solid $color-gray-4
    padding-bottom: 18px
  &-content
    padding: 20px 25px 0
  &-footer
    background: $white
    padding: 26px 25px
    .btn
      font-family: $font-sp-pro
      font-weight: $medium
      font-size: 16px
      line-height: 19px
      color: $black
      border-radius: 20px
      border: 1px solid $black
      padding: 10px
      width: 135px
    .apply-btn
      color: $white
      background: $color-blue-20
      border-color: $color-blue-20
.filter-group
  border-bottom: 1px solid $color-gray-62
  &-title
    font-weight: $medium
    font-size: 16px
    line-height: 19px
    color: $color-blue-20
    font-family: $font-sp-pro
  &-main
    padding: 20px 0
  &-body
    padding-bottom: 20px
.auction-mobile-filter
  &-bg
    height: 56vw
  .more-btn
    width: 20px
    height: 20px
  &-content
    top: 0
    left: 0
    padding: 15px
    width: 100%
  .search-results
    top: 0
    left: 0
    padding: 15px
    padding-top: 66px
    width: 100%
    z-index: 999
    background: $white
    height: 100vh
    overflow: auto
    .product
      font-size: 13px
      line-height: 16px
      letter-spacing: -0.02em
      color: $color-black-15
      border: 0.2px solid $color-gray-23
      font-weight: $normal
      border-radius: 4px
      padding: 5px 1em
      margin-bottom: 10px
      &:hover
        background-color: $color-white-5
      img
        height: 50px
        width: 50px
      .long-arrow
        width: 20px

::v-deep
  @media (max-width: 576px)
    .auction-filters-type-selector
      margin: 26px 0
      .nav-group
        .btn-group
          flex-direction: row
          border-radius: 20px
  .searchbox
    margin-right: 25px
    position: relative
    &.open
      .rounded-search-input
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        border: 1px solid $gray
    .rounded-search-input
      flex: 1
      border-radius: 8px
      background: rgba($color-white-5, 0.5)
      padding: 8px 12px
      display: flex
      align-items: center
      margin: 0
      border: 1px solid transparent
      .icon-search
        width: 18px
        height: 18px
        margin-right: 10px
      input
        font-size: 12px
        line-height: 15px
        font-weight: $regular
        color: $black
        letter-spacing: 0.06em
        text-transform: capitalize
        width: 100%
        border: none
        outline: none
        background: transparent
    &.active
      position: fixed
      background: white
      z-index: 1000
  @media (min-width: 576px)
    display: none
</style>
