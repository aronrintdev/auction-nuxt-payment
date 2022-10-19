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
    </section>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import ClickOutside from 'vue-click-outside'
  import debounce from 'lodash.debounce'
  import SearchBox from '../RoundSearchBox'
  import { FormDropdown} from '~/components/common'
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