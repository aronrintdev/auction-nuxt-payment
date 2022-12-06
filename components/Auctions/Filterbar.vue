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
          :value="selectedFilters.sortby"
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
        v-model="selectedFilters.categories"
        collapseKey="categories"
        :title="$t('home_page.categories')"
        :options="categoryOptions"
        class="mr-3 mr-xl-4"
        width="160"
      />

      <!-- Size Types -->
      <MultiSelectDropdown
        v-model="selectedFilters.sizeTypes"
        collapseKey="size-types"
        :title="$t('filter_sidebar.size_types')"
        :options="sizeTypeOptions"
        class="mr-3 mr-xl-4"
        width="180"
      />

      <!-- Sizes -->
      <MultiSelectDropdown
        v-model="selectedFilters.sizes"
        collapseKey="sizes"
        :title="$t('filter_sidebar.sizes')"
        :options="sizeOptions"
        class="mr-3 mr-xl-4 flex-grow-1"
      />

      <!-- Current Bid -->
      <SliderDropdown
        :start-label="$t('filter_sidebar.price_items.min')"
        :end-label="$t('filter_sidebar.price_items.max')"
        :start-placeholder="$t('filter_sidebar.price_items.from')"
        :end-placeholder="$t('filter_sidebar.price_items.to')"
        :minValue="MIN_PRICE"
        :maxValue="MAX_PRICE / 100"
        :step="50"
        :title="$t('home_page.current_bid')"
        :value="selectedPrices"
        class="mr-3 mr-xl-4 flex-grow-1"
        @change="updatePriceFilters"
      />

      <!-- Brand -->
      <MultiSelectDropdown
        v-model="selectedFilters.brands"
        collapseKey="brands"
        :title="$t('filter_sidebar.brands')"
        :options="brandOptions"
        class="mr-3 mr-xl-4 d-none d-xl-block flex-grow-1"
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
       <!-- Brand -->
       <MultiSelectDropdown
        v-model="selectedFilters.brands"
        collapseKey="brands"
        :title="$t('filter_sidebar.brands')"
        :options="brandOptions"
        class="mr-3 mr-xl-4 d-none d-md-block d-xl-none"
        :width="250"
      />
      <!-- Status -->
      <MultiSelectDropdown
        v-model="selectedFilters.status"
        collapseKey="status"
        :title="$t('filter_sidebar.status')"
        :options="statusOptions"
        class="mr-3 mr-xl-4"
        :width="250"
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
        class="mr-3 mr-xl-4"
        :width="250"
        @change="updateYearFilters"
      />
    </div>
    <div v-if="selectedFiltersArray.length" class="filter-list d-flex flex-wrap">
      <div v-for="(filter, index) in selectedFiltersArray" :key="index" class="filter-list-item d-flex align-items-center">
        <span>{{ filter.label }}</span>
        <img :src="require('~/assets/img/icons/dark-blue-close.svg')" role="button" @click="removeFilter(filter.type, filter.index)" />
      </div>
    </div>
    <div class="text-center auction-filters-type-selector">
      <NavGroup :value="selectedFilters.type" :data="auctionTypes" @change="auctionTypeChanged"/>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ClickOutside from 'vue-click-outside'
import debounce from 'lodash.debounce'

import SearchBox from '../RoundSearchBox'
import { FormDropdown, NavGroup, MultiSelectDropdown, SliderDropdown } from '~/components/common'
import {
  MAX_PRICE,
  MIN_PRICE,
  MIN_YEAR,
  MAX_YEAR,
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
      MAX_YEAR,
      MIN_YEAR,
      MIN_PRICE_RANGE_WINDOW,
      moreFiltersVisible: false,
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
          value: 'ending_soon'
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
      selectedPrices: [MIN_PRICE, MAX_PRICE / 100],
      selectedYears: [MIN_YEAR, MAX_YEAR],
      selectedFilters: {
        type: 'single',
        sizeTypes: [],
        sizes: [],
        brands: [],
        categories: [],
        status: [],
        sortby: null,
        product: null,
      }
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
    selectedFiltersArray() {
      const data = []
      for (const prop in this.selectedFilters) {
        const value = this.selectedFilters[prop]
        if (Array.isArray(value)) {
          value.forEach((item, idx) => {
            let label, index
            switch (prop) {
              case 'sizeTypes':
                index = this.sizeTypeOptions.findIndex(it => it.value === item)
                label = index > -1 ? this.sizeTypeOptions[index].label : ''
                break;
              case 'brands':
                index = this.brandOptions.findIndex(it => it.value === item)
                label = index > -1 ? this.brandOptions[index].label : ''
                break;
              case 'sizes':
                index = this.sizeOptions.findIndex(it => it.value === item)
                label = index > -1 ? this.sizeOptions[index].label : ''
                break;
              case 'categories':
                index = this.categoryOptions.findIndex(it => it.value === item)
                label = index > -1 ? this.categoryOptions[index].label : ''
                break;
              case 'status':
                index = this.statusOptions.findIndex(it => it.value === item)
                label = index > -1 ? this.statusOptions[index].label : ''
                break;
              default:
                label = ''
                index = 0
            }
            data.push({
              label,
              index: idx,
              type: prop,
            })
          })
        }
      }
      if (this.selectedPrices[0] !== MIN_PRICE || this.selectedPrices[1] !== MAX_PRICE / 100) {
        data.push({
          type: 'selectedPrices',
          label: this.selectedPrices.map(price => `$${price}`).join(' - ')
        })
      }
      if (this.selectedYears[0] !== MIN_YEAR || this.selectedYears[1] !== MAX_YEAR) {
        data.push({
          type: 'selectedYears',
          label: this.selectedYears.join(' - ')
        })
      }
      return data
    }
  },
  watch: {
    searchKeyword(newV) {
      this.searchText = newV
    },
    selectedFilters: {
      handler (newV) {
        this.emitChange(newV)
      },
      deep: true
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
      this.selectedFilters = {
        ...this.selectedFilters,
        product: this.selectedProduct,
      }
      this.hideDropdown()
    },
    // Select SortBy option
    changeOption(option) {
      this.selectedFilters = {
        ...this.selectedFilters,
        sortby: option?.value
      }
    },
    // Auction Type Change Event
    auctionTypeChanged(type) {
      if (this.selectedFilters.type !== type) {
        this.selectedFilters = {
          ...this.selectedFilters,
          type
        }
      }
    },
    // Submit updated filters
    emitChange: debounce(function(filters) {
      this.$emit('change', filters)
    }, 300),
    hideDropdown() {
      this.hasSearchResult = false
      this.searchedProducts = []
    },
    // Update selected prices and pass to parent component
    updatePriceFilters(value) {
      this.selectedPrices = value
      this.selectedFilters = {
        ...this.selectedFilters,
        minPrice: value[0] === MIN_PRICE ? undefined : value[0] * 100,
        maxPrice: value[1] === MAX_PRICE ? undefined : value[1] * 100,
      }
    },
    // Update selected years and pass to parent component
    updateYearFilters(value) {
      this.selectedYears = value
      this.selectedFilters = {
        ...this.selectedFilters,
        minYear: value[0] === MIN_YEAR ? undefined : value[0],
        maxYear: value[1] === MAX_YEAR ? undefined : value[1],
      }
    },
    removeFilter(type, index) {
      switch (type) {
        case 'selectedYears':
          this.selectedYears = [MIN_YEAR, MAX_YEAR]
          break;
        case 'selectedPrices':
          this.selectedPrices = [MIN_PRICE, MAX_PRICE / 100]
          break;
        default: {
          this.selectedFilters[type].splice(index, 1)
        }
      }
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
      > div
        @include body-4-normal
        font-family: $font-family-base
        color: $color-black-1
        border: none
        border-bottom: 0.2px solid $light-gray-2
        padding: 0 23px
        max-height: unset
        &:hover
          color: $color-gray-5

        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px
          border: none
        .dropdownItem
          height: 48px
          background: transparent
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
    max-width: 480px
    background-color: $white-3
    .btn
      background-color: $white-3
.overlay
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba($gray, 0.05)

.filter-list
  padding: 31px 0 0
  gap: 1em 0
  &-item
    background: $color-white-5
    padding: 4px 8px
    margin-right: 23px
    span
      font-family: $font-montserrat
      font-weight: $normal
      @include body-21
      color: $color-black-15
      margin-right: 16px
    img
      width: 10px
</style>
