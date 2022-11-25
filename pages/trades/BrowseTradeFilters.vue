<template>
  <div>
    <b-row class="d-flex justify-content-center">
      <b-col cols="7">
        <SearchInput  variant="secondary" :placeholder="$t('trades.index.browse.search_for_your_favorite_street_wear')" :value="searchedText" @input="setSearchedText" />
        <SearchedOfferItems :searchedOfferItems="searchedItems" />
      </b-col>
      <b-col cols="5" class="d-flex justify-content-end">
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
        <!-- Sort options -->

        <!--        <CustomSelect :options="sortOptions" :default="selectedSortOrder" @input="setSortOrder" />-->
      </b-col>
    </b-row>
    <div v-if="!moreFiltersVisible" class="mt-2 mt-xl-4 row align-items-center flex-wrap">
      <!-- Categories -->
      <div class="col-6 col-xl-2">
        <MultiSelectDropdown
          v-model="selectedFilters.categories"
          collapseKey="categories"
          :title="$t('home_page.categories')"
          :options="categoryOptions"
          class="mr-3 mr-xl-4 w-100"
        />
      </div>

      <div class="col-6 col-xl-2">
        <!-- Size Types -->
        <MultiSelectDropdown
          v-model="selectedFilters.sizeTypes"
          collapseKey="size-types"
          :title="$t('filter_sidebar.size_types')"
          :options="sizeTypeOptions"
          class="mr-3 mr-xl-4 w-100"
        />
      </div>

      <div class="mt-2 mt-xl-0 col-6 col-xl-2">
        <!-- Sizes -->
        <MultiSelectDropdown
          v-model="selectedFilters.sizes"
          collapseKey="sizes"
          :title="$t('filter_sidebar.sizes')"
          :options="sizeOptions"
          class="mr-3 mr-xl-4 flex-grow-1 w-100"
        />
      </div>

      <div class="mt-2 mt-xl-0 col-6 col-xl-2">
        <!-- Current Bid -->
        <SliderDropdown
          :start-label="$t('filter_sidebar.price_items.min')"
          :end-label="$t('filter_sidebar.price_items.max')"
          :start-placeholder="$t('filter_sidebar.price_items.from')"
          :end-placeholder="$t('filter_sidebar.price_items.to')"
          :minValue="MIN_PRICE"
          :maxValue="MAX_PRICE / 100"
          :step="50"
          :title="$t('home_page.trade_value')"
          :value="selectedPrices"
          class="mr-3 mr-xl-4 flex-grow-1 w-100"
          @change="updatePriceFilters"
        />
      </div>
      <div class="col-xl-3 pr-3">
        <!-- Brand -->
        <MultiSelectDropdown
          v-model="selectedFilters.brands"
          collapseKey="brands"
          :title="$t('filter_sidebar.brands')"
          :options="brandOptions"
          class="mr-3 mr-xl-4 d-none d-xl-block flex-grow-1 w-100"
        />
      </div>
      <div 
        role="button" 
        class="d-inline-flex align-items-center more-filters-btn mt-2 mt-xl-0 col-12 col-xl-1 justify-content-end" 
        @click="moreFiltersVisible=true"
      >
        <span class="text-nowrap">{{ $t('auctions.frontpage.filterbar.more_filters') }}</span>
        <img class="ml-2" src="~/assets/img/home/arrow-right.svg" />
      </div>
    </div>
    <div v-else class="mt-4 d-flex align-items-center justify-content-between justify-content-xl-start">
      <div role="button" class="d-inline-flex align-items-center more-filters-btn" @click="moreFiltersVisible=false">
        <img class="mr-2 before" src="~/assets/img/home/arrow-right.svg" />
        <span class="text-nowrap">{{ $t('auctions.frontpage.filterbar.more_filters') }}</span>
      </div>
      <!--       Status -->
      <MultiSelectDropdown
        v-model="selectedFilters.status"
        collapseKey="status"
        :title="$t('filter_sidebar.status')"
        :options="statusOptions"
        class="mx-2 mr-xl-4"
        :width="250"
      />

      <!--       Years -->
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
        class="mr-xl-4"
        :width="250"
        @change="updateYearFilters"
      />
    </div>
    <!-- filters -->
    <div class="d-flex justify-content-end">
      <div class="mt-1">
        <label><u class="clear-all-text" @click="clearAllFilters">{{$t('common.clear_all')}}</u></label>
      </div>
    </div>
  </div>
</template>

<script>
// import component
import debounce from 'lodash.debounce';
import { mapActions, mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import SearchInput from '~/components/common/SearchInput'
import SearchedOfferItems from '~/components/trade/SearchedOfferItems.vue'
import { MultiSelectDropdown,SliderDropdown,FormDropdown} from '~/components/common'
import {MAX_PRICE, MAX_YEAR, MIN_PRICE, MIN_PRICE_RANGE_WINDOW, MIN_YEAR} from '~/static/constants';


export default {
  name: 'BrowseTradeFilters',
  components: {
    FormDropdown,
    SliderDropdown,
    MultiSelectDropdown,
    SearchInput, // Search input component
    SearchedOfferItems // Search offer items
  },
  data() {
    return {
      showFilters: false,
      sortOptions: {
        relevance: this.$t('trades.index.browse.relevance'),
        end_date_ascending: this.$t('trades.index.browse.end_date_ascending'),
        end_date_descending: this.$t('trades.index.browse.end_date_descending'),
        most_viewed: this.$t('trades.index.browse.most_viewed')
      },
      categories: [
        {text: this.$t('trades.index.browse.categories.footwear'), value: 'sneakers'},
        {text: this.$t('trades.index.browse.categories.apparel'), value: 'apparel'},
        {text: this.$t('trades.index.browse.categories.accessories'), value: 'accessories'}
      ],
      selectedPriceRange: [0, 100],
      selectedSortOrder: 'relevance',
      searchedText: '',
      searchedItems: [],
      selectedFilters: {
        type: 'single',
        sizeTypes: [],
        sizes: [],
        brands: [],
        categories: [],
        status: [],
        sortby: null,
        product: null,
        maxYear:null,
        minYear:null
      },
      moreFiltersVisible: false,
      categoryOptions: [],
      MAX_PRICE,
      MIN_PRICE,
      MAX_YEAR,
      MIN_YEAR,
      MIN_PRICE_RANGE_WINDOW,
      selectedPrices: [MIN_PRICE, MAX_PRICE / 100],
      selectedYears: [MIN_YEAR, MAX_YEAR],
      statusOptions: [
        {
          label: this.$t('filter_sidebar.status_options.live'),
          value: 'live'
        },
        {
          label: this.$t('filter_sidebar.status_options.traded'),
          value: 'traded'
        },
        {
          label: this.$t('filter_sidebar.status_options.expired'),
          value: 'expired'
        }
      ],
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
  computed: {
    ...mapGetters('trade', [
      'sizeOptions', // Size options getter from trade store
      'sizeTypeOptions', // Size type options from getter store
      'priceRangeOptions', // Price Range option from getter list
      'getCategoryFilterSelection', // category filter from getter of trade store
      'getSizeTypeFilterSelection', // size Type filter from getter of trade store
      'getSizeFilterSelection', // size filter selection  from getter of trade store
      'getPriceRangeFilterSelection', // Price range filter values from trade store
      'getSortOrder', // sort order filter values from trade store
      'getSearchedText' //  searched text from trade store
    ]),
    ...mapGetters('browse', [
      'filters',
      'selectedBrands',
      'selectedSizes',
      'selectedSizeTypes',
    ]),
    sizeTypeOptions() {
      return this.filters?.size_types?.map((type) => {
        return { label: type, value: type }
      })
    },
    sizeOptions() {
      let options = this.filters?.sizes
      if (options && this.selectedFilters.sizeTypes && this.selectedFilters.sizeTypes.length > 0) {
        options = options.filter(({ type }) => this.selectedFilters.sizeTypes.includes(type))
      }
      return (
        options?.map(({ id, size, type }) => {
          return {
            label: `${type} - ${size}`,
            value: size,
          }
        }) || []
      )
    },
    brandOptions() {
      return this.filters?.brands?.map(({ name }) => {
        return { label: name, value: name }
      })
    },
  },
  mounted() {
    // Get trade browse page filters
    this.fetchTradeBrowseFilters(this.selectedFilters)
    this.$root.$on('changeSlider',(val)=>{
      this.$store.commit('trade/setPriceRangeFilters',val)
    })
    this.selectedSortOrder = this.getSortOrder

    this.searchedText = this.getSearchedText
    this.$axios.get('/categories', {
      params: {
        take: 3,
      }
    })
      .then(res => {
        this.categoryOptions = res.data.map(cat => ({
          label: this.$t(`common.categories.${cat.name}`),
          value: cat.name,
        }))
      })
      .catch(() => {
        this.categoryOptions = []
      })
  },
  methods: {
    ...mapActions('trade', ['fetchTradeBrowseFilters']), // get filters from api call by calling action from store

    emitChange: debounce(function(filters) {
      this.$emit('click', filters)
    }, 300),
    // Select SortBy option
    changeOption(option) {
      this.selectedFilters = {
        ...this.selectedFilters,
        sortby: option?.value
      }
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
    updateYearFilters(value) {
      this.selectedYears = value
      this.selectedFilters = {
        ...this.selectedFilters,
        minYear: value[0] === MIN_YEAR ? undefined : value[0],
        maxYear: value[1] === MAX_YEAR ? undefined : value[1],
      }
    },
    // capitalize size type firs letters
    prettySizeTypeName(sizeType){
      return capitalizeFirstLetter(sizeType)
    },

    // handle when size type is changed
    toggleSizeTypeSelection(sizeType){
      this.$store.commit('trade/setSizeTypeFilterSelection', sizeType)
    },

    // handle when category is changed
    toggleCategorySelection(category){
      this.$store.commit('trade/setCategoryFilterSelection', category)
      this.fetchTradeBrowseFilters()
    },

    // handle when size is changed
    toggleSizeSelection(key, sizeId){
      this.$store.commit('trade/setSizeFilterSelection', key, sizeId)
    },

    // handle when price range is changed
    setPriceRangeSelection(priceRange){
      this.$store.commit('trade/setPriceRangeFilterSelection', priceRange)
    },

    // handle when search text is entered
    setSearchedText(searchedText){
      this.searchedText = searchedText
      this.$store.commit('trade/setSearchedText', searchedText)
      this.$emit('applyFilters')
    },

    // handle when sorting filters are selected
    setSortOrder(sortOrder){
      this.selectedSortOrder = this.sortOrder
      this.$store.commit('trade/setSortOrder', sortOrder)
      this.applySorting()
    },

    // clear all filters
    clearAllFilters(){
      this.selectedFilters.sizes = []
      this.selectedFilters.sizeTypes =[]
      this.selectedFilters.brands =[]
      this.selectedFilters.categories =[]
      this.selectedFilters.status=[]
      this.selectedFilters.sortby = null
      this.selectedFilters.product = null
      this.selectedFilters.maxYear = null
      this.selectedFilters.minYear = null
      this.searchedText = ''
      this.$store.commit('trade/resetAllFilters')
      this.$emit('clearFilters')
    },

    // find selected category name from local
    findCategoryName(categoryToBeSearched){
      return this.categories.find(category => category.value === categoryToBeSearched)?.text
    },

    // apply all selected filters
    applyFilters(){
      this.showFilters = false
      this.$emit('applyFilters')
    },

    // apply sorting filter
    applySorting(){
      this.$emit('applySorting')
    }
  }

}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.filter-btn
  width: 100px
  height: 39px
  background: $color-blue-20
  border-radius: 8px
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  @include body-10
  line-height: 20px
  color: $color-white-1
  cursor: pointer
.dropdown-sort::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid transparent
    background-color: $color-white-4
    border-radius: 8px
    height: 48px
    padding: 0 13px 0 23px
    @media (min-width: 1200px)
      width: 327px

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
.filter-options
  background-color: $color-white-1
.filter-button
  width: 150px
  font-weight: $medium
  font-size: 16px
  color: $color-white-1
  background-color: $color-blue-20
  border: none
  font-family: $font-montserrat
.clear-all-text
  color: $color-gray-5
  font-weight: $medium
  font-family: $font-family-sf-pro-display
  @include body-5
  cursor: pointer
.list-grp
  background-color: $color-white-4
.filter-details
  font-family: $font-montserrat
  & h3
    font-size: 20px
    font-weight: $medium
  & h4
    font-family: $font-family-sf-pro-display
    font-weight: $bold
    font-size: 16px
.filter-item
  font-family: $font-family-sf-pro-display
  $font-size: 16px
  label
    font-weight: $regular
  .custom-control-label
    font-weight: $regular
.selected-filters
  font-family: $font-family-sf-pro-display
  $font-size: 16px
  & label
    font-weight: $normal
  & span
    background-color: rgba($color-blue-2, 0.08)
    padding: 5px 10px 5px 15px
    border-radius: 20px
    font-size: 12px
    color: $color-blue-2
    & .cross-icon
      margin-left: 15px
      color: $color-white-1
      background-color: $color-blue-2
      border-radius: 50%
      padding: 0 5px 1px 4px

</style>
