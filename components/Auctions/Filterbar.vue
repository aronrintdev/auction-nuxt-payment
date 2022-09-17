<template>
  <section class="auction-filters">
    <div class="auction-filters-content">
      <h1 class="text-center auction-filters-title">
        {{ $t('auctions.frontpage.filterbar.title') }}
        <InfoIcon v-b-tooltip.hover :title="$t('auctions.frontpage.filterbar.title_tooltip')" />
      </h1>
      <div class="d-flex justify-content-center">
        <div
          class="auction-type-btn"
          :class="{ 'inactive': selectedType, 'active': selectedType === 'single' }"
          @click="auctionTypeChanged('single')"
        >
          {{ $t('auctions.frontpage.filterbar.types.single') }}
          <ArrowIcon />
        </div>
        <div
          class="auction-type-btn"
          :class="{ 'inactive': selectedType, 'active': selectedType === 'collection' }"
          @click="auctionTypeChanged('collection')"
        >
          {{ $t('auctions.frontpage.filterbar.types.collections') }}
          <ArrowIcon />
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div v-click-outside="hideDropdown" class="searchbox" :class="{ 'open': hasSearchResult }">
          <search-box :searchText="searchText" :placeholder="$t('auctions.frontpage.filterbar.searchbox')" @search="search" />
          <div v-if="hasSearchResult" class="dropdown-options">
            <div
              v-for="prod in searchedProducts"
              :key="`${prod.sku}-${prod.category.name}`"
              class="dropdown-option flex justify-content-around"
              @click="selectProduct(prod)"
            >
              <b-img
                :src="`${prod.image  || 'https://images.deadstock.co/404.png'}?width=150}`"
                class="mx-auto"
                alt="..."
              />
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
            require('~/assets/img/icons/arrow-down-gray2.svg')
          "
          class="dropdown-sort flex-shrink-1"
          can-clear
          @select="changeOption"
        />
        <b-button
          class="px-3 ml-4 border-0"
          :class="`${moreFiltersVisible ? 'bg-secondary': 'bg-white'}`"
          pills
          variant="light"
          @click="showFilters"
        >
          {{ $t('auctions.frontpage.filterbar.filters') }}
        </b-button>
      </div>
    </div>
    <div v-if="moreFiltersVisible" class="auction-filters-content">
      <h5 class="text-center body-2-bold my-3">{{ $t('auctions.frontpage.filterbar.more_filters') }}</h5>
      <div :key="filterTags.length" class="bg-white p-4 auction-more-filters">
        <div class="auction-more-filters-block">
          <div class="auction-more-filters-block-column">
            <strong class="text-left mb-3">{{ $t('auctions.frontpage.filterbar.size_type') }}</strong>
            <label
              v-for="type in sizeTypes"
              :key="type.value"
              role="button"
            >
              <input
                type="checkbox"
                :checked="isFilterSelected('type', type.value)"
                @click="addFilterTag('type', type.value, type.label)"
              >
              {{ type.label }}
            </label>
          </div>
          <div class="auction-more-filters-block-column">
            <strong class="text-left mb-3">{{ $t('auctions.frontpage.filterbar.categories') }}</strong>
            <label
              v-for="category in categories"
              :key="category.id"
              role="button"
            >
              <input
                type="checkbox"
                :checked="isFilterSelected('category', category.id)"
                @click="addFilterTag('category', category.id, category.name)"
              >
              <span class="text-capitalize">{{ category.name }}</span>
            </label>
          </div>
          <div class="auction-more-filters-block-column">
            <b-row class="filter-price">
              <b-col class="text-left mb-3" cols="12">
                <strong>{{ $t('auctions.frontpage.filterbar.current_bid_price') }}</strong>
              </b-col>
              <b-col cols="6">
                <label for="formFileSm" class="form-label">{{
                  $t('filter_sidebar.price_items.min')
                }}</label>
                <div class="input-group input-group-sm mb-3">
                  <span
                    id="inputGroup-sizing-sm"
                    class="input-group-text from-to"
                    >{{ $t('filter_sidebar.price_items.from') }}</span
                  >
                  <!-- Dividing by 100 to convert cents into dollars -->
                  <input
                    :value="selectedPrices[0]"
                    aria-describedby="inputGroup-sizing-sm"
                    aria-label="Sizing example input"
                    class="form-control"
                    name="min"
                    placeholder="$0"
                    type="text"
                    @input="updatePriceFilters"
                  />
                </div>
              </b-col>
              <b-col cols="6">
                <label for="formFileSm" class="form-label">{{
                  $t('filter_sidebar.price_items.max')
                }}</label>
                <div class="input-group input-group-sm mb-3">
                  <span
                    id="inputGroup-sizing-sm"
                    class="input-group-text from-to"
                    >{{ $t('filter_sidebar.price_items.to') }}</span
                  >
                  <!-- Dividing by 100 to convert cents into dollars -->
                  <input
                    :value="selectedPrices[1]"
                    aria-describedby="inputGroup-sizing-sm"
                    aria-label="Sizing example input"
                    class="form-control"
                    name="max"
                    placeholder="$0"
                    type="text"
                    @input="updatePriceFilters"
                  />
                </div>
              </b-col>

              <b-col cols="12">
                <!-- Price Range -->
                <vue-slider
                  v-model="selectedPrices"
                  :drag-on-click="false"
                  :enable-cross="false"
                  :max="MAX_PRICE"
                  :min="MIN_PRICE"
                  :min-range="MIN_PRICE_RANGE_WINDOW"
                  tooltip="none"
                  class="vue-slider-ltr-browse"
                ></vue-slider>
                <!-- Price Range -->
              </b-col>
            </b-row>
          </div>
          <div class="auction-more-filters-block-column">
            <b-row class="filter-price">
              <b-col class="text-left mb-3" cols="12">
                <strong>{{ $t('auctions.frontpage.filterbar.year') }}</strong>
              </b-col>
              <b-col cols="6">
                <label for="formFileSm" class="form-label">{{
                  $t('filter_sidebar.price_items.min')
                }}</label>
                <div class="input-group input-group-sm mb-3">
                  <span
                    id="inputGroup-sizing-sm"
                    class="input-group-text from-to"
                    >{{ $t('filter_sidebar.price_items.from') }}</span
                  >
                  <!-- Dividing by 100 to convert cents into dollars -->
                  <input
                    :value="selectedYears[0]"
                    aria-describedby="inputGroup-sizing-sm"
                    aria-label="Sizing example input"
                    class="form-control"
                    name="min"
                    type="text"
                    @input="updateYearFilters"
                  />
                </div>
              </b-col>
              <b-col cols="6">
                <label for="formFileSm" class="form-label">{{
                  $t('filter_sidebar.price_items.max')
                }}</label>
                <div class="input-group input-group-sm mb-3">
                  <span
                    id="inputGroup-sizing-sm"
                    class="input-group-text from-to"
                    >{{ $t('filter_sidebar.price_items.to') }}</span
                  >
                  <!-- Dividing by 100 to convert cents into dollars -->
                  <input
                    :value="selectedYears[1]"
                    aria-describedby="inputGroup-sizing-sm"
                    aria-label="Sizing example input"
                    class="form-control"
                    name="max"
                    type="text"
                    @input="updateYearFilters"
                  />
                </div>
              </b-col>

              <b-col cols="12">
                <!-- Price Range -->
                <vue-slider
                  v-model="selectedYears"
                  :drag-on-click="false"
                  :enable-cross="false"
                  :max="MAX_YEAR"
                  :min="MIN_YEAR"
                  :min-range="MIN_YEAR_RANGE_WINDOW"
                  tooltip="none"
                  class="vue-slider-ltr-browse"
                ></vue-slider>
                <!-- Price Range -->
              </b-col>
            </b-row>
          </div>
        </div>
        <div v-if="hasSneakersCategory" class="auction-more-filters-block">
          <div class="text-left auction-more-filters-block-column">
            <strong>{{ $t('auctions.frontpage.filterbar.footwear_sizes') }}</strong>
            <div class="mt-3 d-flex flex-wrap">
              <label
                v-for="size in SNEAKER_SIZES"
                :key="size"
                role="button"
                class="mr-4 size"
              >
                <input
                  type="checkbox"
                  :checked="isFilterSelected('size', size)"
                  @click="addFilterTag('size', size, size)"
                >
                {{ size.toFixed(1) }}
              </label>
            </div>
          </div>
        </div>
        <div v-if="hasApparelCategory" class="auction-more-filters-block">
          <div class="text-left auction-more-filters-block-column">
            <strong>{{ $t('auctions.frontpage.filterbar.apparel_sizes') }}</strong>
            <div class="mt-3 d-flex flex-wrap">
              <label
                v-for="size in APPAREL_SIZES"
                :key="size"
                role="button"
                class="mr-4"
              >
                <input
                  type="checkbox"
                  :checked="isFilterSelected('size', size)"
                  @click="addFilterTag('size', size, size)"
                >
                {{ size }}
              </label>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between p-2">
          <div class="d-flex align-items-center">
            <span role="button" @click="clearFilters"><u class="text-black body-5-medium">{{ $t('auctions.frontpage.filterbar.clear_all_filters') }}</u></span>
            <!-- Tags -->
            <div v-for="(tag, idx) in filterTags" :key="idx" class="apply-filters-tag">
              <span>{{ tag.label }}</span>
              <CloseIcon role="button" @click="removeFilterTag(idx)" />
            </div>
          </div>
          <div>
            <b-button pills class="apply-filters-btn" @click="applyFilters">{{ $t('auctions.frontpage.filterbar.apply_filters') }}</b-button>
          </div>
        </div>
      </div>
      <div class="mt-2 text-center">
        <UpArrowIcon role="button" @click="moreFiltersVisible=false" />
      </div>
    </div>
  </section>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/material.css'

import SearchBox from '../RoundSearchBox'
import ArrowIcon from '~/assets/img/icons/arrow-in-circle.svg?inline'
import InfoIcon from '~/assets/img/icons/info.svg?inline'
import UpArrowIcon from '~/assets/img/icons/up-arrow.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import { FormDropdown } from '~/components/common'
import {
  MAX_PRICE,
  MIN_PRICE,
  MIN_PRICE_RANGE_WINDOW,
  MAX_YEAR,
  MIN_YEAR,
  MIN_YEAR_RANGE_WINDOW,
  SNEAKER_SIZES,
  APPAREL_SIZES,
} from '~/static/constants'

/*
 * Auction Filter Bar Component
 */
export default {
  name: 'AuctionFilterBar',
  components: {
    ArrowIcon,
    SearchBox,
    InfoIcon,
    UpArrowIcon,
    VueSlider,
    CloseIcon,
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
      selectedOption: null,
      selectedType: null,
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
      selectedPrices: [MIN_PRICE, MAX_PRICE],
      MAX_PRICE,
      MIN_PRICE,
      MIN_PRICE_RANGE_WINDOW,
      MAX_YEAR,
      MIN_YEAR,
      MIN_YEAR_RANGE_WINDOW,
      moreFiltersVisible: false,
      selectedYears: [MIN_YEAR, MAX_YEAR],
      filterTags: [],
      sizeTypes: [
        {
          value: 'men',
          label: this.$t('auctions.frontpage.filterbar.men'),
        },
        {
          value: 'women',
          label: this.$t('auctions.frontpage.filterbar.women'),
        },
        {
          value: 'unisex',
          label: this.$t('auctions.frontpage.filterbar.unisex'),
        },
        {
          value: 'child',
          label: this.$t('auctions.frontpage.filterbar.child'),
        },
        {
          value: 'toddler',
          label: this.$t('auctions.frontpage.filterbar.toddler'),
        },
      ],
      categories: [],
      SNEAKER_SIZES,
      APPAREL_SIZES,
    }
  },
  computed: {
    hasSneakersCategory() {
      return this.filterTags.findIndex(tag => tag.type === 'category' && tag.label === 'sneakers') > -1
    },
    hasApparelCategory() {
      return this.filterTags.findIndex(tag => tag.type === 'category' && tag.label === 'apparel') > -1
    }
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
        this.categories = res.data
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

.filter-price
  width: 250px

.dropdown-sort::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid $color-white-1
    background-color: $color-white-1
    border-radius: 8px
    height: 48px
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
        background-color: $color-white-1
        height: 46px
        border: 1px solid $color-gray-59
        border-top: none
        padding: 0 23px

        &:hover
          color: $color-gray-5

        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px

</style>