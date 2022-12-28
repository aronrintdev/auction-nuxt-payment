<template>
  <section class="container shop-filters">
    <div class="filters-wrapper">
      <div class="row">
        <div class="col-9">
          <Searchbar :searchKeyword="selectedSearch" @enter="searchProducts" />
        </div>
        <div class="col-3">
          <FormDropdown
            id="sort-products"
            :value="selectedFilters.sortBy"
            :placeholder="$t('selling_page.sortby')"
            :items="SORT_OPTIONS"
            :icon="require('~/assets/img/icons/three-lines.svg')"
            class="dropdown-sort flex-shrink-1"
            can-clear
            @select="handleSortBySelect"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div v-if="category === ACCESSORIES" class="col">
          <!-- Gender-->
          <SingleSelectDropdown
            v-model="selectedFilters.gender"
            collapseKey="gender"
            :title="$t('filter_sidebar.gender')"
            :options="sizeTypeOptions"
            class="mr-3 mr-xl-4 w-100"
          />
        </div>
        <div v-if="category !== ACCESSORIES" class="col">
          <!-- Size Types -->
          <SingleSelectDropdown
            v-model="selectedFilters.sizeType"
            collapseKey="size-types"
            :title="$t('filter_sidebar.size_types')"
            :options="sizeTypeOptions"
            class="mr-3 mr-xl-4 w-100"
          />
        </div>
        <div
          v-if="productTypeOptions && productTypeOptions.length"
          class="col-2"
        >
          <!-- Product Types -->
          <SingleSelectDropdown
            v-model="selectedFilters.productType"
            collapseKey="product-types"
            :title="$t('common.product_type')"
            :options="productTypeOptions"
            class="mr-3 mr-xl-4 w-100"
          />
        </div>
        <div
          v-if="sizeOptions && sizeOptions.length && category !== ACCESSORIES"
          class="col"
        >
          <!-- Sizes -->
          <MultiSelectDropdown
            v-model="selectedFilters.sizes"
            collapseKey="sizes"
            :title="$t('filter_sidebar.sizes')"
            :options="sizeOptions"
            class="mr-3 mr-xl-4 flex-grow-1 w-100"
          />
        </div>
        <div class="col">
          <SliderDropdown
            :start-label="$t('filter_sidebar.price_items.min')"
            :end-label="$t('filter_sidebar.price_items.max')"
            :start-placeholder="$t('filter_sidebar.price_items.from')"
            :end-placeholder="$t('filter_sidebar.price_items.to')"
            :minValue="MIN_PRICE"
            :maxValue="MAX_PRICE / 100"
            :step="50"
            :value="selectedPrices"
            :title="$t('common.price')"
            class="w-100"
            @change="updatePriceFilters"
          />
        </div>
        <div class="col">
          <BrandMultiSelectDropdown
            v-model="selectedFilters.brands"
            collapseKey="brands"
            :title="$t('filter_sidebar.brands')"
            :options="filterBrands"
            class="w-100"
          >
            <template #firstRow>
              <!-- brands -->
              <div class="filter-body">
                <div class="search-bar position-relative">
                  <input
                    v-model="brandName"
                    type="search"
                    placeholder="Search for Brands"
                  />
                  <img
                    class="searchbarIcon"
                    width="15"
                    :src="require('~/assets/img/icons/browse-magnify.svg')"
                  />
                </div>
              </div>
            </template>
          </BrandMultiSelectDropdown>
        </div>
        <div class="col">
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
            class="mr-3 mr-xl-4 w-100"
            :width="203"
            @change="updateYearFilters"
          />
        </div>
      </div>
    </div>
    <div class="mt-3 d-flex align-items-center text-secondary flex-wrap gap-2">
      <template v-if="selectedFilters.gender">
        <div
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ selectedFilters.gender }}
          <span class="remove-filter ml-3" @click="removeFilter('gender')">
            ✖
          </span>
        </div>
      </template>
      <template v-if="selectedFilters.sizeType">
        <div
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ selectedFilters.sizeType }}
          <span class="remove-filter ml-3" @click="removeFilter('sizeType')">
            ✖
          </span>
        </div>
      </template>
      <template v-if="selectedFilters.productType">
        <div
          class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
        >
          {{ selectedFilters.productType }}
          <span class="remove-filter ml-3" @click="removeFilter('productType')">
            ✖
          </span>
        </div>
      </template>
      <div
        v-for="(x, index) in selectedFilters.sizes"
        :key="`sizes${index}`"
        class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
      >
        {{ getSizeName(x) }}
        <span class="remove-filter ml-3" @click="removeFilter('sizes', index)">
          ✖
        </span>
      </div>
      <div
        v-for="(x, index) in selectedFilters.brands"
        :key="`brands${index}`"
        class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
      >
        {{ x }}
        <span class="remove-filter ml-3" @click="removeFilter('brands', index)">
          ✖
        </span>
      </div>
      <div
        v-if="selectedFilters.prices.length > 0"
        class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
      >
        ${{ selectedFilters.prices[0] }} - ${{ selectedFilters.prices[1] }}
        <span class="remove-filter ml-3" @click="removeFilter('prices')">
          ✖
        </span>
      </div>
      <div
        v-if="selectedFilters.years.length > 0"
        class="selected-filter text-uppercase px-3 py-2 font-primary fs-13 fw-5 text-gray-25"
      >
        {{ selectedFilters.years[0] }} - {{ selectedFilters.years[1] }}
        <span class="remove-filter ml-3" @click="removeFilter('years')">
          ✖
        </span>
      </div>
      <div
        v-if="
          selectedFilters.sizes.length > 0 ||
          selectedFilters.sizeType ||
          selectedFilters.gender ||
          selectedFilters.productType ||
          selectedFilters.brands.length > 0 ||
          selectedFilters.prices.length > 0 ||
          selectedFilters.years.length > 0
        "
        class="font-secondary fs-14 fw-5 border-bottom border-secondary cursor-pointer"
        @click="clearAllFilters"
      >
        {{ $t('shop.clear_all') }}
      </div>
    </div>
  </section>
</template>
<script>
import debounce from 'lodash.debounce'
import { mapGetters, mapActions } from 'vuex'
import {
  MIN_YEAR,
  MAX_YEAR,
  MIN_PRICE,
  MAX_PRICE,
  MIN_PRICE_RANGE_WINDOW,
  MIN_YEAR_RANGE_WINDOW,
  MEN,
  ACCESSORIES,
  APPAREL,
} from '~/static/constants'
import {
  FormDropdown,
  MultiSelectDropdown,
  SingleSelectDropdown,
  SliderDropdown,
} from '~/components/common'
import Searchbar from '~/components/shop/Searchbar'
import BrandMultiSelectDropdown from '~/components/shop/BrandMultiSelectDropdown'
export default {
  name: 'ShopFilters',
  components: {
    Searchbar,
    FormDropdown,
    MultiSelectDropdown,
    SingleSelectDropdown,
    SliderDropdown,
    BrandMultiSelectDropdown,
  },
  fetchOnServer: false,
  data() {
    return {
      SORT_OPTIONS: [
        {
          label: this.$t('shop.sort_by.price_low_first'),
          value: 'false',
        },
        {
          label: this.$t('shop.sort_by.price_high_first'),
          value: 'true',
        },
      ],
      MAX_PRICE,
      MIN_PRICE,
      MAX_YEAR,
      MIN_YEAR,
      MEN,
      ACCESSORIES,
      APPAREL,
      MIN_PRICE_RANGE_WINDOW,
      selectedPrices: [MIN_PRICE, MAX_PRICE / 100],
      selectedYears: [MIN_YEAR, MAX_YEAR],
      selectedFilters: {
        sizeType: null,
        productType: null,
        sizes: [],
        brands: [],
        status: [],
        sortBy: null,
        orderBy: '',
        prices: [],
        years: [],
        search: null,
        gender: null,
      },
      defaultSizetype: MEN,
      category: null,
      brandName: '',
      categoryFilterLabel: this.$t('filter_sidebar.size_types'),
      defaultValue: null,
    }
  },
  computed: {
    ...mapGetters(
      'browse',
      [
        'filters',
        'selectedBrands',
        'selectedSearch',
        'selectedSizes',
        'selectedSizeType',
        'selectedOrdering',
        'getSizesByType',
        'selectedCategory',
        'selectedProductType',
        'selectedGender',
      ],
      'auction',
      ['getProductFilter']
    ),
    filterBrands() {
      if (this.brandName.trim() === '') {
        return this.brandOptions
      }
      return this.brandOptions.filter(
        (brand) =>
          brand.label?.toLowerCase().indexOf(this.brandName.toLowerCase()) > -1
      )
    },
    sizeOptions() {
      let options = this.filters?.sizes
      if (options && (this.selectedFilters.sizeType || this.defaultSizetype)) {
        options = options.filter(
          ({ type }) =>
            (this.selectedFilters.sizeType || this.defaultSizetype) === type
        )
      }
      return (
        options?.map(({ id, size, type }) => {
          return {
            label: size,
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
      return this.filters?.size_types?.map(({ type }) => {
        return { label: type, value: type }
      })
    },

    genderOptions() {
      return this.filters?.size_types?.map(({ type }) => {
        return { label: type, value: type }
      })
    },

    productTypeOptions() {
      const options = this.filters?.product_types
      return (
        options?.map(({ id, type }) => {
          return {
            label: type,
            value: type.toLowerCase(),
          }
        }) || []
      )
    },
  },
  watch: {
    selectedFilters: {
      handler(newV) {
        this.emitChange(JSON.parse(JSON.stringify(newV)))
      },
      deep: true,
    },
    selectedCategory: {
      handler(newV) {
        switch (newV) {
          case APPAREL:
            this.defaultSizetype = APPAREL
            this.selectedFilters.sizeType = null
            this.$store.commit(
              'browse/setSelectedSizeType',
              this.selectedFilters.sizeType
            )
            break
          case ACCESSORIES:
            this.selectedFilters.sizeType = null
            this.selectedFilters.sizes = []
            this.$store.commit(
              'browse/setSelectedSizeType',
              this.selectedFilters.sizeType
            )
            break
          default:
            this.defaultSizetype = MEN
            this.$store.commit(
              'browse/setSelectedSizeType',
              this.defaultSizetype
        )
        }
        this.category = newV
      },
    },
  },
  created() {
    this.MIN_PRICE_RANGE_WINDOW = MIN_PRICE_RANGE_WINDOW
    this.MIN_YEAR_RANGE_WINDOW = MIN_YEAR_RANGE_WINDOW
  },

  methods: {
    ...mapActions('browse', ['resetFilters', 'fetchFilters']),
    emitChange: debounce(function () {
      this.applyFilters()
    }, 300),
    applyFilters() {
      const brands = JSON.parse(JSON.stringify(this.selectedFilters.brands))
      const sizes = JSON.parse(JSON.stringify(this.selectedFilters.sizes))
      this.$store.commit(
        'browse/setSelectedPrices',
        this.selectedFilters.prices
      )
      this.$store.commit('browse/setSelectedYears', this.selectedFilters.years)
      this.$store.commit('browse/setSelectedBrands', brands)
      this.$store.commit(
        'browse/setSelectedSizeType',
        this.selectedFilters.sizeType
      )
      this.$store.commit('browse/setSelectedSort', this.selectedFilters.sortBy)
      this.$store.commit(
        'browse/setSelectedOrdering',
        this.selectedFilters.orderBy
      )
      this.$store.commit(
        'browse/setSelectedSearch',
        this.selectedFilters.search
      )
<<<<<<< HEAD
      this.$store.commit(
        'browse/setProductType',
        this.selectedFilters.productType
      )
      this.$store.commit('browse/setGender', this.selectedFilters.gender)
      if (this.selectedFilters.sizeType && this.selectedFilters.sizes) {
=======
      this.$store.commit('browse/setIsFilter',true)
      if (
        this.selectedFilters.sizeTypes &&
        this.selectedFilters.sizeTypes.length > 0 &&
        this.selectedFilters.sizes
      ) {
>>>>>>> develop
        const newSizes = this.selectedFilters.sizes.filter((size) =>
          this.filters?.sizes?.find(
            (s) => s.id === size && this.selectedFilters.sizeType === s.type
          )
        )
        this.$store.commit('browse/setSelectedSizes', newSizes)
      } else {
        this.$store.commit('browse/setSelectedSizes', sizes)
      }
      this.$emit('apply')
    },

    removeFilter(type, index) {
      switch (type) {
        case 'sizeType':
          this.selectedFilters.sizeType = null
          break
        case 'productType':
          this.selectedFilters.productType = null
          break
        case 'gender':
          this.selectedFilters.gender = null
          break
        case 'sizes':
          this.selectedFilters.sizes.splice(index, 1)
          break
        case 'brands':
          this.selectedFilters.brands.splice(index, 1)
          break
        case 'years':
          this.selectedFilters.years = []
          this.selectedYears = [MIN_YEAR, MAX_YEAR]
          break
        case 'prices':
          this.selectedFilters.prices = []
          this.selectedPrices = [MIN_PRICE, MAX_PRICE / 100]
          break
        default:
        // code block
      }
    },
    clearAllFilters() {
      this.selectedPrices = [MIN_PRICE, MAX_PRICE / 100]
      this.selectedYears = [MIN_YEAR, MAX_YEAR]
      this.selectedFilters.sizes = []
      this.selectedFilters.sizeType = null
      this.selectedFilters.productType = null
      this.selectedFilters.brands = []
      this.selectedFilters.years = []
      this.selectedFilters.prices = []
      this.$store.commit('browse/setSelectedBrands', [])
      this.$store.commit('browse/setSelectedSizeType', null)
      this.$store.commit('browse/setProductType', null)
      this.$store.commit('browse/setGender', null)
      this.$store.commit('browse/setSelectedSort', null)
      this.$store.commit('browse/setSelectedOrdering', null)
      this.$store.commit('browse/setSelectedSearch', null)
      this.$store.commit('browse/setSizesByType', [])
      this.$store.commit('browse/setSelectedPrices', [])
      this.$store.commit('browse/setSelectedYears', [])
      this.$store.commit('browse/setIsFilter',false)
    },
    handleSortBySelect(option) {
      // Select SortBy option
      if (option) {
        this.selectedFilters = {
          ...this.selectedFilters,
          sortBy: option?.value,
          orderBy: 'sale_price',
        }
      } else {
        this.selectedFilters = {
          ...this.selectedFilters,
          sortBy: option?.value,
          orderBy: '',
        }
      }
    },
    searchProducts(searchKeyword) {
      if (searchKeyword) {
        this.selectedFilters.search = searchKeyword
      } else {
        this.selectedFilters.search = null
      }
    },
    // Update selected prices and pass to parent component
    updatePriceFilters(value) {
      this.selectedPrices = value
      this.selectedFilters = {
        ...this.selectedFilters,
        prices: value,
      }
    },
    // Update selected years and pass to parent component
    updateYearFilters(value) {
      this.selectedYears = value
      this.selectedFilters = {
        ...this.selectedFilters,
        years: value,
      }
    },
    getSizeName(id) {
      const size = this.filters?.sizes?.find((s) => s.id === id)
      return size.size
    },
    getSizeType(id) {
      const size = this.filters?.size_types?.find((s) => s.id === id)
      return size && size.type
    },
    getProductType(id) {
      const size = this.filters?.product_types?.find((p) => p.id === id)
      return size && size.type
    },
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
  ::v-deep .searchbox
    margin-right: 0
  .dropdown-sort::v-deep
    .btn-dropdown
      color: $color-black-1
      border-width: 0
      background-color: $color-white-19
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
      height: 30px
      padding: 0px 0px 0px 40px
      font-size: 14px
      font-weight: 500
      font-family: 'SF Pro Display'
      outline: none
      &::placeholder
        color: $color-black-15
      &::-webkit-search-cancel-button
        -webkit-appearance: none
        height: 0.9em
        width: 0.9em
        background: url(~assets/img/icons/close-gray.svg) no-repeat 50% 50%
        background-size: contain
        padding-right: 10px
        cursor: pointer

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
