<template>
  <section class="auction-filters">
    <div class="auction-filters-content">
      <div class="d-flex justify-content-between">
        <div v-click-outside="hideDropdown" class="searchbox" :class="{ 'open': hasSearchResult }">
          <search-box :searchText="searchText" :placeholder="$t('auctions.frontpage.filterbar.searchbox')" @search="search" />
          <div v-if="hasSearchResult" class="dropdown-options">
            <div
              v-for="prod in searchedProducts"
              :key="`${prod.sku}-${prod.category.name}`"
              class="dropdown-option d-flex align-items-center"
              @click="selectProduct(prod)"
            >
              <div class="position-relative d-inline-flex">
                <b-img
                  :src="`${prod.image  || 'https://images.deadstock.co/404.png'}?width=150}`"
                  class="mx-auto"
                  alt="..."
                />
                <div class="position-absolute overlay"></div>
              </div>
              &nbsp; {{ prod.name }}
            </div>
            <div v-if="!searchedProducts.length" class="dropdown-option text-center">
              {{ $t('sell.create_listing.no_result') }}
            </div>
          </div>
        </div>
        <FormDropdown
          id="sort-by"
          :value="selectedOption"
          :placeholder="$t('selling_page.sortby')"
          :items="SORT_OPTIONS"
          :icon="require('~/assets/img/icons/three-lines.svg')"
          :icon-arrow-down="
            require('~/assets/img/icons/arrow-down-black.svg')
          "
          class="dropdown-sort flex-shrink-1"
          can-clear
          @select="changeOption"
        />
      </div>
    </div>
    <div v-if="!moreFiltersVisible" class="mt-4 d-flex align-items-center">
      <!-- Categories -->
      <MultiSelectDropdown
        v-model="categories"
        collapseKey="categories"
        :title="$t('home_page.categories')"
        :options="categoryOptions"
        class="mr-4"
        width="160"
      />

      <!-- Size Types -->
      <MultiSelectDropdown
        v-model="sizeTypes"
        collapseKey="size-types"
        :title="$t('filter_sidebar.size_types')"
        :options="sizeTypeOptions"
        class="mr-4"
        width="180"
      />

      <!-- Sizes -->
      <MultiSelectDropdown
        v-model="sizes"
        collapseKey="sizes"
        :title="$t('filter_sidebar.sizes')"
        :options="sizeOptions"
        class="mr-4 flex-grow-1"
      />

      <!-- Current Bid -->
      <SliderDropdown
        :start-label="$t('filter_sidebar.price_items.min')"
        :end-label="$t('filter_sidebar.price_items.max')"
        :start-placeholder="$t('filter_sidebar.price_items.from')"
        :end-placeholder="$t('filter_sidebar.price_items.to')"
        :minValue="MIN_PRICE"
        :maxValue="MAX_PRICE"
        :step="MIN_PRICE_RANGE_WINDOW"
        :title="$t('home_page.current_bid')"
        :value="selectedPrices"
        class="mr-4 flex-grow-1"
      />

      <!-- Brand -->
      <MultiSelectDropdown
        v-model="brands"
        collapseKey="brands"
        :title="$t('filter_sidebar.brands')"
        :options="brandOptions"
        class="mr-4 flex-grow-1"
      />
      <div role="button" class="d-inline-flex align-items-center more-filters-btn ml-3" @click="moreFiltersVisible=true">
        <span class="text-nowrap">{{ $t('auctions.frontpage.filterbar.more_filters') }}</span>
        <img class="ml-2" src="~/assets/img/home/arrow-right.svg" />
      </div>
    </div>
    <div v-else class="mt-4 d-flex align-items-center">
      <div role="button" class="d-inline-flex align-items-center more-filters-btn mr-3" @click="moreFiltersVisible=false">
        <img class="mr-2 before" src="~/assets/img/home/arrow-right.svg" />
        <span class="text-nowrap">{{ $t('auctions.frontpage.filterbar.more_filters') }}</span>
      </div>
      <!-- Status -->
      <MultiSelectDropdown
        v-model="sizes"
        collapseKey="status"
        :title="$t('filter_sidebar.status')"
        :options="statusOptions"
        class="ml-4"
        width="250"
      />

      <!-- Years -->
      <SliderDropdown
        :start-label="$t('filter_sidebar.price_items.min')"
        :end-label="$t('filter_sidebar.price_items.max')"
        :start-placeholder="$t('filter_sidebar.price_items.from')"
        :end-placeholder="$t('filter_sidebar.price_items.to')"
        :minValue="MIN_YEAR"
        :maxValue="MAX_YEAR"
        :step="1"
        :title="$t('auctions.frontpage.filterbar.year')"
        :value="selectedYears"
        class="ml-4"
        width="250"
      />
    </div>
    <div class="text-center auction-filters-type-selector">
      <NavGroup :value="selectedType" :data="auctionTypes" @change="auctionTypeChanged"/>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ClickOutside from 'vue-click-outside'

import SearchBox from '../RoundSearchBox'
import { FormDropdown, NavGroup, MultiSelectDropdown, SliderDropdown } from '~/components/common'
import {
  MAX_PRICE,
  MIN_PRICE,
  MIN_PRICE_RANGE_WINDOW,
  SNEAKER_SIZES,
  APPAREL_SIZES,
} from '~/static/constants'

/*
 * Auction Filter Bar Component
 */
export default {
  name: 'AuctionFilterBar',
  components: {
    SearchBox,
    FormDropdown,
    NavGroup,
    MultiSelectDropdown,
    SliderDropdown,
  },
  directives: {
    ClickOutside
  },
  props: {
    searchKeyword: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      searchText: null,
      selectedOption: null,
      selectedType: 'single',
      selectedProduct: null,
      hasSearchResult: false,
      searchedProducts: [],
      SORT_OPTIONS: [
        {
          value: 'relevance',
          label: this.$t('auctions.frontpage.filterbar.sortby.relevance'),
        },
        {
          value: 'end_date_asc',
          label: this.$t('auctions.frontpage.filterbar.sortby.end_date_asc'),
        },
        {
          value: 'end_date_desc',
          label: this.$t('auctions.frontpage.filterbar.sortby.end_date_desc'),
        },
        {
          value: 'price_asc',
          label: this.$t('auctions.frontpage.filterbar.sortby.price_asc'),
        },
        {
          value: 'price_desc',
          label: this.$t('auctions.frontpage.filterbar.sortby.price_desc'),
        },
        {
          value: 'most_viewed',
          label: this.$t('auctions.frontpage.filterbar.sortby.most_viewed'),
        },
      ],
      MAX_PRICE,
      MIN_PRICE,
      selectedPrices: [],
      MIN_PRICE_RANGE_WINDOW,
      moreFiltersVisible: false,
      selectedYears: [],
      filterTags: [],
      sizeTypes: [],
      categories: [],
      SNEAKER_SIZES,
      APPAREL_SIZES,
      auctionTypes: [
        {
          label: this.$t('auctions.frontpage.filterbar.types.single'),
          value: 'single'
        },
        {
          label: this.$t('auctions.frontpage.filterbar.types.collections'),
          value: 'collection'
        },
      ],
      brands: [],
      sizes: [],
      categoryOptions: [],
      statusOptions: [
        {
          label: this.$t('filter_sidebar.status_options.live'),
          value: 'live'
        },
        {
          label: this.$t('filter_sidebar.status_options.upcoming'),
          value: 'upcoming'
        },
        {
          label: this.$t('filter_sidebar.status_options.expiring'),
          value: 'expiring'
        },
        {
          label: this.$t('filter_sidebar.status_options.expired'),
          value: 'expired'
        },
        {
          label: this.$t('filter_sidebar.status_options.sold'),
          value: 'sold'
        },
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
  watch: {
    searchKeyword(newV) {
      this.searchText = newV
    }
  },
  mounted() {
    this.searchText = this.searchKeyword
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
    // Search event listener
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
        this.selectedProduct = null
        this.emitChange()
      }
    },
    // Select product
    selectProduct(product) {
      this.selectedProduct = product.sku
      this.searchText = product.name
      this.emitChange()
      this.hideDropdown()
    },
    // Select SortBy option
    changeOption(option) {
      this.selectedOption = option?.value
      this.emitChange()
    },
    // Auction Type Change Event
    auctionTypeChanged(type) {
      if (this.selectedType === type) {
        this.selectedType = null
      } else {
        this.selectedType = type
      }
      this.emitChange()
    },
    // Submit updated filters
    emitChange() {
      this.$emit('change', {
        type: this.selectedType, 
        sortby: this.selectedOption,
        product: this.selectedProduct,
        sizeTypes: this.filterTags.filter(tag => tag.type === 'type').map(tag => tag.value),
        categories: this.filterTags.filter(tag => tag.type === 'category').map(tag => tag.value),
        minPrice: this.selectedPrices[0] * 100,
        maxPrice: this.selectedPrices[1] * 100,
        minYear: this.selectedYears[0],
        maxYear: this.selectedYears[1],
        sizes: this.filterTags.filter(tag => tag.type === 'size').map(tag => tag.value),
      })
    },
    hideDropdown() {
      this.hasSearchResult = false
      this.searchedProducts = []
    },
    // Update selected prices and pass to parent component
    updatePriceFilters(e) {
      const value = e.target.value ? Math.abs(e.target.value) : 0
      this.selectedPrices[e.target.name === 'min' ? 0 : 1] = value
    },
    // Update selected years and pass to parent component
    updateYearFilters(e) {
      const value = e.target.value ? Math.abs(e.target.value) : 0
      this.selectedYears[e.target.name === 'min' ? 0 : 1] = value
    },
    showFilters() {
      this.moreFiltersVisible = true
    },
    // Remove size filter tag
    removeFilterTag(idx) {
      this.filterTags.splice(idx, 1)
    },
    // Click size checkbox
    addFilterTag(type, value, label) {
      const idx = this.filterTags.findIndex(t => t.value === value && t.type === type)
      if (idx > -1) {
        this.filterTags.splice(idx, 1)
      } else {
        const tag = { label, type, value }
        this.filterTags.push(tag)
      }
    },
    // Click "Apply filters" button
    applyFilters() {
      this.moreFiltersVisible = false
      this.emitChange()
    },
    // Check if filter is selected or not
    isFilterSelected(key, value) {
      const selected = this.filterTags.filter(t => t.value === value && t.type === key)
      return selected.length > 0
    },
    clearFilters() {
      this.filterTags = []
      this.selectedYears = [this.MIN_YEAR, this.MAX_YEAR]
      this.selectedPrices = [this.MIN_PRICE, this.MAX_PRICE]
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.dropdown-sort::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid transparent
    background-color: $color-white-4
    border-radius: 8px
    height: 48px
    width: 327px
    padding: 0 13px 0 23px

    .icon-main
      margin-right: 20px !important

    .icon-clear
      right: 23px

    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      border: 1px solid transparent

  .search-results
    .popover-body
      >div
        @include body-4-normal
        font-family: $font-family-base
        color: $color-black-1
        background-color: $color-white-4
        height: 46px
        border: none
        border-bottom: 0.2px solid $light-gray-2
        padding: 0 23px
        &:hover
          color: $color-gray-5

        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px
          border: none
.more-filters-btn
  @include body-13-regular
  font-family: $font-sp-pro
  color: $color-blue-20
  img
    width: 8px
    &.before
      transform: rotate(-180deg)
.overflow-x-hidden
  overflow-x: hidden
::v-deep .nav-group
  .btn-group
    background-color: $white-3
    .btn
      background-color: $white-3
.overlay
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba($gray, 0.05)
</style>