<template>
  <section class="container shop-filters d-none d-sm-block">
    <div class="filters-wrapper">
      <div class="row">
        <div class="col-9">
          <SearchInput
            :value="search"
            placeholder="Search"
            variant="light"
            class="search-input"
            :debounce="1000"
            @change="handleSearchChange"
          />
        </div>
        <div class="col-3">
          <FormDropdown
            id="sort-products"
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
      </div>
      <div class="row mt-3">
        <div class="col-2">
          <FormDropdown
            id="size-type"
            :value="sortBy"
            placeholder="Size Type"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort flex-shrink-1"
            can-clear
          >
            <template #body>
              <!-- Sizes Type -->
              <div class="filter-body">
                <div
                  v-for="(item, index) in sizeTypeOptions"
                  :key="index"
                  class="form-check"
                >
                  <input
                    :id="`sizeType-flexCheckDefault-${index}`"
                    v-model="sizesType"
                    class="form-check-input"
                    :value="item.value"
                    type="radio"
                  />
                  <label
                    :for="`sizeType-flexCheckDefault-${index}`"
                    class="form-check-label text-capitalize"
                  >
                    {{ item.label }}
                  </label>
                </div>
              </div>
            </template>
          </FormDropdown>
        </div>
        <div class="col-2">
          <FormDropdown
            id="sizes"
            :value="sortBy"
            placeholder="Sizes"
            :items="SORT_OPTIONS"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort"
            can-clear
          >
            <template #body>
              <!-- Sizes -->
              <div class="filter-body">
                <div
                  v-for="(item, index) in sizeOptions"
                  :key="index"
                  class="form-check"
                >
                  <input
                    :id="`sizeType-flexCheckDefault-${index}`"
                    v-model="sizes"
                    class="form-check-input"
                    :value="item.value"
                    type="checkbox"
                  />
                  <label
                    :for="`sizeType-flexCheckDefault-${index}`"
                    class="form-check-label text-capitalize"
                  >
                    {{ item.label }}
                  </label>
                </div>
              </div>
            </template>
          </FormDropdown>
        </div>
        <div class="col-2">
          <FormDropdown
            id="Price"
            :value="sortBy"
            placeholder="Price"
            :items="SORT_OPTIONS"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort flex-shrink-1"
            can-clear
          >
            <template #body>
              <!-- Price -->
              <div class="filter-body">
                <SliderInput
                  v-model="prices"
                  :minLabel="$t('filter_sidebar.price_items.min')"
                  :maxLabel="$t('filter_sidebar.price_items.max')"
                  :fromLabel="$t('filter_sidebar.price_items.from')"
                  :toLabel="$t('filter_sidebar.price_items.to')"
                  :minValue="minPrice"
                  :maxValue="maxPrice"
                  :minRange="MIN_PRICE_RANGE_WINDOW"
                  :multiplier="100"
                  class="mt-4"
                />
              </div>
            </template>
          </FormDropdown>
        </div>
        <div class="col-4">
          <FormDropdown
            id="brands"
            :value="sortBy"
            placeholder="Brands"
            :items="SORT_OPTIONS"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort flex-shrink-1"
            can-clear
          >
            <template #body>
              <!-- brands -->
              <div class="filter-body">
                <div class="search-bar position-relative mb-2">
                  <input type="search" placeholder="Search for Brands" />
                  <img
                    class="searchbarIcon"
                    width="11px"
                    :src="require('~/assets/img/icons/search.svg')"
                  />
                </div>
                <div
                  v-for="(item, index) in brandOptions"
                  :key="index"
                  class="form-check"
                >
                  <input
                    :id="`sizeType-flexCheckDefault-${index}`"
                    v-model="brands"
                    class="form-check-input"
                    :value="item.value"
                    type="checkbox"
                  />
                  <label
                    :for="`sizeType-flexCheckDefault-${index}`"
                    class="form-check-label text-capitalize"
                  >
                    {{ item.label }}
                  </label>
                </div>
              </div>
            </template>
          </FormDropdown>
        </div>
        <div class="col-2">
          <FormDropdown
            id="years"
            :value="sortBy"
            placeholder="Years"
            :items="SORT_OPTIONS"
            :icon-arrow-down="
              require('~/assets/img/icons/arrow-down-gray2.svg')
            "
            class="dropdown-sort flex-shrink-1"
            can-clear
          >
            <template #body>
              <!-- Price -->
              <div class="filter-body">
                <SliderInput
                  v-model="years"
                  :minLabel="$t('filter_sidebar.year_items.start')"
                  :maxLabel="$t('filter_sidebar.year_items.end')"
                  :fromLabel="$t('filter_sidebar.year_items.from')"
                  :toLabel="$t('filter_sidebar.year_items.to')"
                  :minValue="minYear"
                  :maxValue="maxYear"
                  :minRange="MIN_YEAR_RANGE_WINDOW"
                  class="mt-4"
                />
              </div>
            </template>
          </FormDropdown>
        </div>
      </div>
      <div
        class="mt-3 d-flex align-items-center text-secondary flex-wrap gap-2"
      >
        <div
          v-if="sizesType"
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ sizesType }}
          <span class="remove-filter ml-3" @click="sizeType = null"> ✖ </span>
        </div>
        <div
          v-for="(x, index) in sizes"
          :key="`sizes${index}`"
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ x }}
          <span
            class="remove-filter ml-3"
            @click="removeFilter('sizes', index)"
          >
            ✖
          </span>
        </div>
        <div
          v-for="(x, index) in brands"
          :key="`brands${index}`"
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ x }}
          <span
            class="remove-filter ml-3"
            @click="removeFilter('brands', index)"
          >
            ✖
          </span>
        </div>
        <div
          v-if="prices.length > 0"
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          ${{ prices[0] }} - {{ prices[1] }}
          <span class="remove-filter ml-3" @click="removeFilter('prices')">
            ✖
          </span>
        </div>
        <div
          v-if="years.length > 0"
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ years[0] }} - {{ years[1] }}
          <span class="remove-filter ml-3" @click="removeFilter('years')">
            ✖
          </span>
        </div>
        <div
          v-if="
            sizes.length > 0 ||
            sizesType ||
            brands.length > 0 ||
            prices.length > 0 ||
            years.length > 0
          "
          class="font-secondary fs-14 fw-5 border-bottom border-secondary cursor-pointer"
          @click="clearAllFilters"
        >
          Clear all
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import debounce from 'lodash.debounce'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import {
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE,
  MAX_PRICE,
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
} from '~/static/constants'
import { SearchInput, FormDropdown } from '~/components/common'
import SliderInput from '~/components/common/SliderInput'
export default {
  name: 'ShopFilters',
  components: {
    SearchInput,
    FormDropdown,
    SliderInput,
  },
  fetchOnServer: false,
  data() {
    return {
      SORT_OPTIONS: [
        {
          label: 'Trending',
          value: 'trending',
        },
        {
          label: 'Newest',
          value: 'newest',
        },
        {
          label: this.$t('shop.sort_by.price_low_first'),
          value: 'price_asc',
        },
        {
          label: this.$t('shop.sort_by.price_high_first'),
          value: 'price_desc',
        },
      ],
      sortBy: null,
      search: '',
      sizesType: null,
      sizes: [],
      years: [],
      prices: [],
      brands: [],
      sizeTypes: [],
    }
  },
  // async fetch() {
  //   await this.fetchFilters()
  //   this.loadOptions()
  // },
  computed: {
    ...mapGetters('browse', [
      'filters',
      'selectedPrices',
      'selectedYears',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
    ]),
    minYear() {
      if (this.filters?.year_range?.min == null) {
        return MIN_YEAR
      } else {
        return Number(this.filters?.year_range?.min)
      }
    },

    maxYear() {
      if (this.filters?.year_range?.max == null) {
        return MAX_YEAR
      } else {
        return Number(this.filters?.year_range?.max)
      }
    },

    minPrice() {
      if (this.filters?.price_range?.min == null) {
        return MIN_PRICE
      } else {
        return Number(this.filters?.price_range?.min)
      }
    },

    maxPrice() {
      if (this.filters?.price_range?.max == null) {
        return MAX_PRICE
      } else {
        return Number(this.filters?.price_range?.max)
      }
    },

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

    filtersUpdated() {
      return (
        !_.isEqual(this.prices, this.selectedPrices) ||
        !_.isEqual(this.years, this.selectedYears) ||
        _.xor(this.brands, this.selectedBrands).length > 0 ||
        _.xor(this.sizes, this.selectedSizes).length > 0 ||
        _.xor(this.sizeTypes, this.selectedSizeTypes).length > 0
      )
    },

    filtersCleared() {
      return (
        !this.prices &&
        !this.years &&
        !this.brands &&
        !this.sizes &&
        !this.sizeTypes
      )
    },
  },
  created() {
    this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
    this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
  },

  methods: {
    ...mapActions('browse', ['resetFilters', 'fetchFilters']),
    loadOptions() {
      this.prices = this.selectedPrices
      this.years = this.selectedYears
      this.brands = this.selectedBrands
      this.sizes = this.selectedSizes
      this.sizeTypes = this.selectedSizesTypes
    },

    applyFilters() {
      this.$store.commit('browse/setSelectedYears', this.years)
      this.$store.commit('browse/setSelectedPrices', this.prices)
      this.$store.commit('browse/setSelectedBrands', this.brands)
      this.$store.commit('browse/setSelectedSizeTypes', this.sizeTypes)
      if (this.sizeTypes && this.sizeTypes.length > 0 && this.sizes) {
        const newSizes = this.sizes.filter((size) =>
          this.filters?.sizes?.find(
            (s) => s.id === size && this.sizeTypes.includes(s.type)
          )
        )
        this.$store.commit('browse/setSelectedSizes', newSizes)
      } else {
        this.$store.commit('browse/setSelectedSizes', this.sizes)
      }
      this.$emit('apply')
    },

    removeFilter(type, index) {
      type === 'sizesType'
        ? this.sizesType.splice(index, 1)
        : type === 'sizes'
        ? this.sizes.splice(index, 1)
        : type === 'brands'
        ? this.brands.splice(index, 1)
        : type === 'prices'
        ? (this.prices = [])
        : (this.years = [])
    },
    clearAllFilters() {
      this.sizes = []
      this.sizesType = null
      this.brands = []
      this.prices = []
      this.years = []
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
@import '@/assets/css/_variables'
.shop-filters
  .selected-filter
    background-color: $color-white-5
    .remove-filter
      color: $color-blue-20
      cursor: pointer
  .filters-wrapper
    margin-top: 70px
  .dropdown-sort::v-deep
    .btn-dropdown
      color: $color-black-1
      border-width: 0
      background-color: $color-white-4
      border-radius: 8px
      height: 44px
      width: 100%
      padding: 0 23px
      .icon-main
        margin-right: 20px !important
      .icon-clear
        right: 23px
      &.opened
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
    .search-results
      .popover-body
        .dropdownItem
          background-color: $color-white-4
          height: 46px
          padding: 0 23px
          &:hover
            color: $color-gray-5
          &:last-child
            border-bottom-left-radius: 8px
            border-bottom-right-radius: 8px
// Responsive Screen
@media only screen and (max-width: 450px)
  .shop-hero-banner
    background-image: url('~assets/img/shop/banner-sm.png')
    min-height: 208px
    background-position: center
    .change_color
      background-color: white
@media (max-width: 550px)
  .product-card-wrapper::v-deep
    .product-badge
      .px-2.py-1
        height: 25px
    .badge-icon
      width: 7px

// filter checkboxes
.filter-body
  max-height: 252px
  padding-bottom: 10px
  margin-bottom: 20px
  overflow-x: hidden
  overflow-y: auto
  scroll-behavior: smooth
  .search-bar
    input[type="search"]
      border: 0
      width: calc(100% - 10px)
      height: 26px
      padding-left: 26px
      padding-right: 10px
    img
      position: absolute
      left: 10px
      top: 50%
      transform: translate(0 , -50%)

  .slider-input::v-deep
    margin-top: 0 !important
  .form-check
    margin-bottom: 7px
    & > *
      cursor: pointer !important
    .form-check-input
      border: none
      box-shadow: none
      &::after
        content: ' '
        background-color: $color-gray-3
        position: absolute
        left: 0
        top: 50%
        width: 16px
        height: 16px
        transform: translateY(-7px)
        border-radius: 2px
      &:checked
        &::after
          background-color: $color-blue-2
          border-color: $color-blue-2
          box-shadow: none
    label
      @include body-5-normal
      text-align: left
      color: $color-gray-41
      padding-left: 6px
      width: 100%
::-webkit-scrollbar
  width: 6px !important
::-webkit-scrollbar-thumb
  background-color: $color-blue-2
  border: none !important
::-webkit-scrollbar-track
  background-color: $color-gray-3
</style>
