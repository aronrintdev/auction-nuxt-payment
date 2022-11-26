<template>
  <section class="position-relative inventory-listing-filters">
    <div class="d-flex align-items-center inventory-listing-filters-content searchbox">
      <search-box :searchText="searchText" :placeholder="$t('common.search')" @search="search"/>
      <img src="~/assets/img/icons/more-filter-icon.svg" role="button" class="ml-3 mr-1 more-btn" @click="openBottomFilter" />
    </div>
    <div v-if="hasSearchResult" class="products">
      <div v-for="prod in searchedProducts" :key="prod.id" class="text-left text-capitalize product d-flex align-items-center">
        <div class="position-relative d-inline-flex">
          <b-img
            :src="`${prod.image  || 'https://images.deadstock.co/404.png'}?width=150}`"
            class="mx-auto"
            alt="..."
          />
        </div>
        <div class="product-name flex-grow-1">{{ prod.name }}</div>
        <button class="btn btn-primary" @click="addAuctionFromProduct(prod)">{{ $t('create_listing.add') }}</button>
      </div>
    </div>
    <!-- Bottom Sheet -->
    <vue-bottom-sheet ref="auctionFiltersSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('create_listing.filterbar.filter_by') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <!-- Sort -->
          <div class="filter-group">
            <div class="filter-group-title mb-3">{{ $t('create_listing.filterbar.sort') }}</div>
            <div class="flex-wrap justify-content-between filter-group-body">
              <label v-for="(option, idx) in SORT_OPTIONS" :key="idx" class="d-flex align-items-center">
                <input v-model="selectedFilters.sortby" :value="option.value" type="radio" name="sortby"/>
                <span class="ml-2">{{ option.label }}</span>
              </label>
            </div>
          </div>
          <FilterGroup
            :title="$t('home_page.categories')"
            :options="categoryOptions"
            :selectedValues="selectedFilters.categories"
            name="category"
            @change="(value) => filterGroupChanged(value, 'categories')"
          />
          <FilterGroup
            :title="$t('filter_sidebar.size_types')"
            :options="sizeTypeOptions"
            :selectedValues="selectedFilters.sizeTypes"
            name="sizeTypes"
            @change="(value) => filterGroupChanged(value, 'sizeTypes')"
          />
          <FilterGroup
            :title="$t('filter_sidebar.sizes')"
            :options="sizeOptions"
            :selectedValues="selectedFilters.sizes"
            name="size"
            multiple
            @change="(value) => filterGroupChanged(value, 'sizes')"
          />
        </div>
        <div class="d-flex align-items-center justify-content-between filters-sheet-footer">
          <button class="btn btn-pills" @click="resetFilters">{{ $t('create_listing.filterbar.reset') }}</button>
          <button class="btn btn-pills apply-btn" @click="applyFilters">{{ $t('create_listing.filterbar.apply_filters') }}</button>
        </div>
      </div>
    </vue-bottom-sheet>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import SearchBox from '../RoundSearchBox'
import FilterGroup from './FilterGroup'

/*
 * Auction Mobile FilterBar
 */
export default {
  name: 'AuctionMobileFilter',
  components: {
    SearchBox,
    FilterGroup,
  },
  props: {
    isCollection: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      searchText: null,
      hasSearchResult: false,
      searchedProducts: [],
      searchEnabled: false,
      selectedFilters: {
        type: 'single',
        sizeTypes: [],
        categories: [],
        brands: [],
        sizes: [],
        status: [],
        sortby: null,
      },
      categoryOptions: [],
      SORT_OPTIONS: [
        {
          label: this.$t('create_listing.auction.sort_by.price_low_high'),
          value: 'price_asc',
        },
        {
          label: this.$t('create_listing.auction.sort_by.price_high_low'),
          value: 'price_desc',
        },
        {
          label: this.$t('create_listing.auction.sort_by.size_low_high'),
          value: 'size_asc',
        },
        {
          label: this.$t('create_listing.auction.sort_by.size_high_low'),
          value: 'size_desc',
        }
      ],
    }
  },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
    ]),
    sizeOptions() {
      let options = this.filters?.sizes
      if (options && this.selectedFilters.sizeTypes && this.selectedFilters.sizeTypes.length > 0) {
        options = options.filter(({ type }) => this.selectedFilters.sizeTypes.includes(type))
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
    this.$axios.get('/categories', {
      params: {
        take: 3,
      }
    })
      .then(res => {
        this.categoryOptions = res.data.map(cat => ({
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
        this.$axios.get('/products', {
          params: {
            search: value.toLowerCase(),
          }
        }).then(response => {
          this.hasSearchResult = true;
          this.searchedProducts = response.data.data || []
        }).catch(error => {
          this.hasSearchResult = false;
          this.$toasted.error(error)
        });
      } else {
        this.selectedFilters = {
          ...this.selectedFilters,
          product: null,
        }
        this.searchedProducts = []
        this.hasSearchResult = false
      }
    },
    enableSearch() {
      this.searchEnabled = true
    },
    auctionTypeChanged(type) {
      if (this.selectedFilters.type !== type) {
        this.selectedFilters = {
          ...this.selectedFilters,
          type
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
      this.$refs.auctionFiltersSheet.open();
    },
    closeBottomFilter() {
      this.$refs.auctionFiltersSheet.close();
    },
    // Add new auction from product
    addAuctionFromProduct(product) {
      this.$store.commit('create-listing/setActiveInventoryProduct', product)
      if (this.isCollection) {
        this.$router.push('/create-listing/product/collection/inventory')
      } else {
        this.$router.push('/create-listing/product/inventory')
      }
    },
    resetFilters() {
      this.selectedFilters = {}
    },
    applyFilters() {
      this.$emit('change', this.selectedFilters)
      this.closeBottomFilter()
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/css/_variables'

  .products
    margin: 20px 0
    .product
      background: $white
      box-shadow: 0px -0.1px 2px rgba($black, 0.25), 0px 1px 2px rgba($black, 0.25)
      border-radius: 8px
      margin-bottom: 10px
      padding: 8px
      img
        width: 80px
        height: 50px
        object-fit: cover
      &-name
        font-weight: $normal
        font-size: 13px
        line-height: 130%
        letter-spacing: -0.02em
        color: $color-black-15
        margin: 0 10px
      .btn
        font-family: $font-family-sf-pro-display
        font-weight: $medium
        font-size: 12px
        line-height: 20px
        color: $white
        background: $color-blue-20
        border-color: $color-blue-20
        padding: 0px 15px
        height: auto
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
  .inventory-listing-filters
    &-bg
      height: 56vw
    .more-btn
      width: 20px
      height: 20px
    &-content
      top: 0
      left: 0
      padding: 0
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