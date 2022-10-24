<template>
  <div class="create-listing-selling-search-input mt-3 mx-2">
    <!-- Filter -->
    <div class="row mobile-filter-row">
      <div class="col-xs-10">
        <mobile-search-input
          id="search-textbox"
          :value="filter.keyword"
          hasScanner
          @showScanner="showScanner"
          @input="searchChanged"
        />
      </div>
      <div class="col-xs-2 filter-icon-col text-center m-auto">
        <span class="filter-wrapper" role="button" @click="showFilter">
          <img
            class="mobile-filter"
            :src="require('~/assets/img/icons/filter-icon.png')"
            alt="filter-icon"
          />
        </span>
      </div>
    </div>

    <!-- Filter ends -->
    <!-- Create inventory button -->
    <div class="row create-inv-row mt-3 justify-content-end">
      <div
        class="float-right create-new-inventory d-flex align-items-center"
        role="button"
        @click="$router.push('/profile/inventory')"
      >
        &#43; &nbsp;{{ $t('createlisting.create_new_inventory') }}
      </div>
    </div>
    <!-- Create inventory button ends -->

    <b-popover
      ref="popover"
      :target="`search-textbox`"
      placement="bottom"
      :container="`search-input`"
      :custom-class="`search-results search- search- bordered`"
      :boundary-padding="0"
    >
      <search-result :searchResult="searchResult" />
    </b-popover>
    <!-- Bottom sheet filter -->
    <MobileBottomSheet
      id="filter-bottom-sheet"
      :open="filterbottomSheetOpen"
      hasHeaderDivider
      :height="`75%`"
      :title="$t('notifications.filter_by')"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
    >
      <div :class="`filter-body ${mobileClass} p-4 w-100 h-100`">
        <!-- Sort By -->
        <div class="sort-by">
          <div :class="`sort-by-filter ${mobileClass}`">
            <div class="header-filter">
              {{ $t('offers_received.sort') }}
            </div>
            <div :class="`body-filter mt-2 ${mobileClass} f-w-normal`">
              <b-form-radio
                v-model="filter.sortby"
                class="recent-to-old text-normal"
                name="sortby"
                value="price_low_high"
                >{{ $t('createlisting.price_low_high') }}</b-form-radio
              >
              <b-form-radio
                v-model="filter.sortby"
                class="recent-to-old text-normal"
                name="sortby"
                value="price_high_low"
                >{{ $t('createlisting.price_high_low') }}</b-form-radio
              >
              <b-form-radio
                v-model="filter.sortby"
                class="recent-to-old text-normal"
                name="sortby"
                value="size_small_large"
                >{{ $t('createlisting.size_small_large') }}</b-form-radio
              >
              <b-form-radio
                v-model="filter.sortby"
                class="recent-to-old text-normal"
                name="sortby"
                value="size_large_small"
                >{{ $t('createlisting.size_large_small') }}</b-form-radio
              >
            </div>
          </div>
          <hr class="m-0" />
        </div>
        <!-- Sort By ends -->

        <!-- Category -->
        <FilterAccordion :title="$t('home_page.categories')" class="py-3">
          <div class="mt-2">
            <ButtonSelector
              id="button-selector"
              single
              :options="categoryFilter"
              :values="filter.category"
              @change="categorySelected"
            />
          </div>
        </FilterAccordion>
        <hr class="m-0" />
        <!-- Category ends -->

        <!-- SizeType -->
        <FilterAccordion :title="$tc('common.size_type', 1)" class="py-3">
          <div class="mt-2">
            <ButtonSelector
              id="button-selector"
              :options="sizeTypeFilter"
              :values="filter.sizeType"
              @change="typeChange"
            />
          </div>
        </FilterAccordion>
        <hr class="m-0" />
        <!-- Size Type ends -->

        <!-- Product Type -->
        <FilterAccordion
          v-if="showProductType"
          :title="$tc('common.product_type', 1)"
          class="py-3"
        >
          <div class="mt-2">
            <ButtonSelector
              id="button-selector"
              single
              :options="productTypeFilter"
              :values="filter.productType"
              @change="productTypeChange"
            />
          </div>
        </FilterAccordion>
        <hr class="m-0" />
        <!-- Product Type ends -->

        <!-- Size -->
        <FilterAccordion :title="$tc('common.size', 1)" class="py-3">
          <div class="mt-2">
            <ButtonSelector
              id="button-selector"
              :options="sizesOptions"
              :values="filter.sizes"
              @change="sizeChange"
            />
          </div>
        </FilterAccordion>
        <hr v-if="showGender" class="m-0" />
        <!-- Size ends -->

        <!-- Gender -->
        <FilterAccordion
          v-if="showGender"
          :title="$t('filter_sidebar.gender')"
          class="py-3"
        >
          <div class="mt-2">
            <ButtonSelector
              id="button-selector"
              single
              :options="genderFilter"
              :values="filter.gender"
              @change="genderChange"
            />
          </div>
        </FilterAccordion>
        <!-- Gender ends -->

        <div class="action-buttons d-flex justify-content-between">
          <Button variant="reset" @click="resetFilter">
            {{ $t('common.reset') }}
          </Button>
          <Button variant="apply-filter" @click="applyFilter">
            {{ $t('common.apply_filters') }}
          </Button>
        </div>
      </div>
    </MobileBottomSheet>

    <!-- Bottom sheet filter ends -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'

import MobileSearchInput from '~/components/mobile/MobileSearchInput.vue'
import SearchResult from '~/components/profile/create-listing/selling/SearchResult.vue'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet.vue'
import { Button } from '~/components/common'
import screenSize from '~/plugins/mixins/screenSize'
import FilterAccordion from '~/components/mobile/FilterAccordion'
import ButtonSelector from '~/components/mobile/ButtonSelector'

export default {
  name: 'MobileFilter',

  components: {
    SearchResult,
    MobileSearchInput,
    MobileBottomSheet,
    FilterAccordion,
    ButtonSelector,
    Button,
  },
  mixins: [screenSize],

  props: {
    searchResult: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      // For storing the values.
      category: [],
      productType: [],
      gender: [],
      filter: {
        category: '',
        sizeType: [],
        sizes: [],
        productType: '',
        keyword: '',
        sortby: '',
        gender: '',
      },
      initialSizeType: 'men',
      filterbottomSheetOpen: false,

      // For sorting and store filter
      categoryFilter: [],
      sizesOptions: [],
      productTypeFilter: [],
      genderFilter: [],
      accessories: 'accessories',
      apparel: 'apparel',
      sneakers: 'sneakers'
    }
  },

  computed: {
    ...mapGetters({
      filters: 'browse/filters',
    }),

    // size
    size: (vm) => {
      return vm.filters && vm.filters.sizes
    },

    // Size types
    sizeType: (vm) => {
      return vm.filters.size_types
    },

    // Size Type for filter
    sizeTypeFilter: (vm) => {
      const arr = []
      if (vm.sizeType) {
        vm.sizeType.forEach((element) => {
          arr.push({ text: capitalizeFirstLetter(element), value: element })
        })
      }
      return arr
    },
    // Show Product type filter
    showProductType: (vm) => {
      return [vm.apparel, vm.accessories].includes(vm.filter.category)
    },

    showGender: (vm) => {
      return vm.filter.category === vm.accessories
    },
  },

  created() {
    // Get the filter data
    this.fetchFilters()
    // Load product type
    this.loadProductTypes()
    // Get categories
    this.getCategory()
    // Loadsize according to sizetype
    this.loadSize(this.initialSizeType)

    this.loadGender()
  },

  methods: {
    ...mapActions({
      fetchFilters: 'browse/fetchFilters',
    }),

    // get category
    getCategory() {
      this.$axios
        .get('category', {
          handleError: false,
        })
        .then((res) => {
          this.category = res.data.data
          this.loadCategory()
        })
        .catch((err) => {
          this.$logger.logToServer('Category error', err.response)
        })
    },

    // load category
    loadCategory() {
      if (this.category) {
        this.category.forEach((i) => {
          if ([this.sneakers, this.apparel, this.accessories].includes(i.name)) {
            this.categoryFilter.push({
              text: capitalizeFirstLetter(i.name),
              value: i.name,
            })
          }
        })
      } else {
        this.categoryFilter = [
          {
            text: this.$t('common.footwear'),
            value: 'sneakers',
          },
          {
            text: this.$t('common.apparel'),
            value: 'apparel',
          },
          {
            text: this.$t('common.accessories'),
            value: 'accessories',
          },
        ]
      }
    },

    // load product type
    loadProductTypes() {
      this.$axios
        .get('product-types', {
          handleError: false,
        })
        .then((res) => {
          this.productType = res.data.data.data
        })
        .catch((err) => {
          this.$logger.logToServer(err.response)
        })
    },

    // Load gender
    loadGender() {
      this.$axios
        .get('gender', { handleError: false })
        .then((res) => {
          this.gender = res.data.data
          this.sortGender()
        })
        .catch((err) => {
          this.$logger.logToServer('Gender error:', err.response)
        })
    },

    // sort product type
    sortProductType(category) {
      if (this.productType) {
        this.productType.forEach((i) => {
          if (i.categories.name === category) {
            this.productTypeFilter = []
            this.productTypeFilter.push({
              text: i.name,
              value: i.name,
            })
          }
        })
      }
    },

    // Sort gender
    sortGender() {
      if (this.gender) {
        this.gender.forEach((i) => {
          this.genderFilter.push({
            text: capitalizeFirstLetter(i),
            value: i,
          })
        })
      }
    },

    // Load the mens size initially
    loadSize(type) {
      if (this.size) {
        this.size.forEach((element) => {
          if (element.type === type) {
            this.sizesOptions.push({ text: element.size, value: element.size })
          }
        })
      }
    },
    // Show filters
    showFilter() {
      this.filterbottomSheetOpen = !this.filterbottomSheetOpen
    },

    // TODO: Implement scanner block
    showScanner() {},

    // on input search change
    searchChanged(val) {
      this.$emit('onSearchInput', val)
    },

    // on category change
    categorySelected(val) {
      this.filter.category = val
      this.sortProductType(val)
    },

    // On size type change
    typeChange(val) {
      this.filter.sizeType = val
      this.sizesOptions = []
      this.filter.sizes = []

      val.map((i) => this.loadSize(i))
    },

    // on size change
    sizeChange(val) {
      this.filter.sizes = val
    },

    productTypeChange(val) {
      this.filter.productType = val
    },

    genderChange(val) {
      this.filter.gender = val
    },

    applyFilter() {
      this.$emit('applyFilters', this.filter)
      this.filterbottomSheetOpen = false
    },

    resetFilter() {
      this.filter.category = []
      this.filter.sizeType = []
      this.filter.sizes = []
      this.filter.productType = ''
      this.filter.keyword = ''
      this.filter.sortby = ''
      this.filter.gender = ''
      this.applyFilter()
    },
  },
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'
.create-listing-selling-search-input
  .btn-reset::v-deep
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-black-1
    width: 155px
    height: 40px
    border: 1px solid $color-black-1
    border-radius: 20px
  .btn-apply-filter
    width: 135px
    height: 40px
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    color: $color-white-1
    background: $color-blue-20
    border-radius: 20px
  .search-input-wrapper::v-deep
    #search-textbox-selling-search-input
      left: 0%
      right: 11.66%
      top: 0%
      bottom: 0%
      background: $color-white-5
      border-radius: 8px
      font-family: $font-montserrat
      font-style: normal
      @include body-9-regular
      letter-spacing: 0.06em
      color: $color-gray-5
  .create-inv-row
    .create-new-inventory
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-regular
      color: $color-gray-5
.search-results::v-deep
  background-color: transparent
  width: 100%
  max-width: 100%
  margin: 0
  border: none
  box-shadow: none

  .arrow
    display: none

  .popover-body
    padding: none

    >div
      color: $color-black-1

  &.search-sm
    .popover-body >div
      @include body-5-regular
      height: 36px

      &:last-child
        border-bottom-left-radius: 5px
        border-bottom-right-radius: 5px

  &.search-md
    .popover-body >div
      @include body-4-regular
      height: 46px

      &:last-child
        border-bottom-left-radius: 8px
        border-bottom-right-radius: 8px

  &.search-lg
    .popover-body >div
      @include body-4-normal
      height: 60px

      &:last-child
        border-bottom-left-radius: 10px
        border-bottom-right-radius: 10px

  &.search-primary
    .popover-body >div
      background-color: $color-white-1

    &.bordered
      .popover-body >div
        border-bottom: 1px solid $color-gray-4
        border-left: 1px solid $color-gray-4
        border-right: 1px solid $color-gray-4

  &.search-secondary
    .popover-body >div
      background-color: $color-gray-3
  .search-result-item
    height: 71px
    left: 16px
    top: 168px
    background: $color-white-1
    border: 0.5px solid $color-gray-89
    border-radius: 4px
    .product-name
      .product-img
        display: none

    .text-truncate
      font-weight: $normal

    button
      font-family: $font-family-base
      @include body-5-normal
      color: $color-blue-19
      text-decoration: underline
      margin-left: 40px
#filter-bottom-sheet::v-deep
  .filter-body
    .sort-by
      .body-filter
        font-family: $font-sp-pro
        font-style: normal
        @include body-5-normal
        color: $color-black-9
  .header-filter
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-bold
    color: $color-blue-20
  #button-selector::v-deep
    .custom-button-multi
      display: flex
      justify-content: space-between
</style>
