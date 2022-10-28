<template>
  <section class="auction-filters">
    <div class="auction-filters-content">
      <div class="d-flex justify-content-between">
        <div v-click-outside="hideDropdown" class="searchbox" :class="{ 'open': hasSearchResult }">
          <search-box :searchText="searchText" :placeholder="$t('deadstock_exchange.filter_by.details_placeholder')" @search="search" />
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
    <div  class="mt-4 d-flex align-items-center">
      <!-- Categories -->
      <MultiSelectDropdown
        v-model="selectedFilters.category_id"
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
      <!-- Current Bid -->
      <SliderDropdown
        :start-label="$t('filter_sidebar.price_items.min')"
        :end-label="$t('filter_sidebar.price_items.max')"
        :start-placeholder="$t('filter_sidebar.price_items.from')"
        :end-placeholder="$t('filter_sidebar.price_items.to')"
        :minValue="MIN_PRICE"
        :maxValue="MAX_PRICE / 100"
        :step="50"
        :title="$t('deadstock_exchange.filter_by.price_range')"
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

      <!-- Brand -->
      <MultiSelectDropdown
        v-model="selectedFilters.brands"
        collapseKey="brands"
        :title="$t('filter_sidebar.brands')"
        :options="brandOptions"
        class="mr-3 mr-xl-4 d-none d-md-block d-xl-none"
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
        :title="$t('deadstock_exchange.filter_by.years')"
        :value="selectedYears"
        class="mr-3 mr-xl-4"
        :width="250"
        @change="updateYearFilters"
      />
    </div>
        <!-- Filters -->
        <div class="row filter-row">
      <div class="col-md-12 col-sm-12 mt-md-4 mt-4">
        <!-- Selected Filters -->
        <div
          v-if="
            selectedFilters.brands != [] ||
            selectedFilters.sizeTypes != [] ||
            selectedFilters.category_id != []
          "
          class="col-md-2 clearall-filter float-right"
        >
          <span
            role="button"
            class="justify-content-center d-flex text-primary"
            @click="clearFilters()"
          >
            <u>{{ $t('vendor_purchase.clear_all_filters') }}</u>
          </span>
        </div>

        <b-badge
          v-for="(options, typeIndex) in activeTypeFilters"
          :key="`type-${typeIndex}`"
          class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize float-right"
        >
          {{ options }}&colon;
          <i
            class="fa fa-times"
            role="button"
            aria-hidden="true"
            @click="removeTypeFilter(options)"
          ></i>
        </b-badge>
        <!-- ./Type Filters -->
      </div>
    </div>
    <!-- ./ -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ClickOutside from 'vue-click-outside'
import debounce from 'lodash.debounce'
import SearchBox from '../RoundSearchBox'
import { FormDropdown, MultiSelectDropdown, SliderDropdown } from '~/components/common'
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
 * Stock Exchange Filter Bar Component
 */
export default {
  name: 'ExchangeFilterBar',
  components: {
    SearchBox,
    FormDropdown,
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
      activeTypeFilters: [],
      searchText: null,
      hasSearchResult: false,
      searchedProducts: [],
      SORT_OPTIONS: [
        {
          value: 'relevance',
          label: this.$t('deadstock_exchange.sortby.relevance'),
        },
        {
          value: 'end_date_asc',
          label: this.$t('deadstock_exchange.sortby.end_date_asc'),
        },
        {
          value: 'end_date_desc',
          label: this.$t('deadstock_exchange.sortby.end_date_desc'),
        },
        {
          value: 'price_asc',
          label: this.$t('deadstock_exchange.sortby.price_asc'),
        },
        {
          value: 'price_desc',
          label: this.$t('deadstock_exchange.sortby.price_desc'),
        },
        {
          value: 'most_viewed',
          label: this.$t('deadstock_exchange.sortby.most_viewed'),
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
        category_id: [],
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
    },
    selectedFilters: {
      handler (newV) {
        this.emitChange(newV)
      },
      deep: true
    }
  },
  mounted() {
    const auctionFilters = document.querySelector('.auction-filters');
    console.log(auctionFilters)
    if (auctionFilters)
    auctionFilters.style.padding='70px 10px';
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

    // Submit updated filters
    emitChange: debounce(function(filters) {
      this.$emit('filterList', filters)
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
        price_from: value[0] === MIN_PRICE ? undefined : value[0] * 100,
        price_to: value[1] === MAX_PRICE ? undefined : value[1] * 100,
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
    setActiveFilter() {
      const val = this.selectedFilters
      this.activeTypeFilters = []
      for (const value of Object.values(val)) {
        if (value !== '') {
          const category = this.allCategories.filter((el) => el.id === value)
          if (
            !this.activeTypeFilters.includes(value) &&
            category[0] === undefined
          ) {
            this.activeTypeFilters.push(value)
          }
        }
      }
    },
    // Clear the values
    clearFilters() {
      this.activeTypeFilters = []
      this.activeStatusFilters = []
      this.selectedFilters = {
        type: 'single',
        sizeTypes: [],
        sizes: [],
        brands: [],
        category_id: [],
        status: [],
        sortby: null,
        product: null,
      }
      this.$store.commit('stock-exchange/removeActiveFilters')
      this.$emit('filterList', this.selectedFilters)
    },
        // Remove the filter from respective arrays
    removeTypeFilter(option) {
      const statusFilter = this.activeTypeFilters
      if (statusFilter.includes(option)) {
        statusFilter.splice(statusFilter.indexOf(option), 1)
        this.$store.commit(
          'stock-exchange/setActiveFilters',
          this.selectedFilters
        )
        this.$emit('filterList', this.selectedFilters)
      }
      if (statusFilter.lenght === 0) {
        this.clearFilters()
      }
    },
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

  // .search-results
  //   .popover-body
  //     >div
  //       @include body-4-normal
  //       font-family: $font-family-base
  //       color: $color-black-1
  //       background-color: $color-white-4
  //       height: 46px
  //       border: none
  //       border-bottom: 0.2px solid $light-gray-2
  //       padding: 0 23px
  //       &:hover
  //         color: $color-gray-5

  //       &:last-child
  //         border-bottom-left-radius: 8px
  //         border-bottom-right-radius: 8px
  //         border: none
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
