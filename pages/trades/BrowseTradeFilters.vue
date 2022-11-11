<template>
  <div>
    <b-row class="d-flex justify-content-center m-5">
      <b-col md="9">
        <SearchInput :placeholder="$t('trades.index.browse.search_for_your_favorite_street_wear')" :value="searchedText" @input="setSearchedText" />
        <SearchedOfferItems :searchedOfferItems="searchedItems" />
      </b-col>
      <b-col md="3">
        <!-- Sort options -->
        <CustomSelect :options="sortOptions" :default="selectedSortOrder" @input="setSortOrder" />
      </b-col>
    </b-row>

    <!-- filters -->
    <div class="d-flex ml-5">
      <div>
        <b-dropdown  id="dropdown-1" text="Select Size Type" class="m-md-2">
            <b-list-group-item v-for="(sizeType, index) in sizeTypeOptions" :key="'sizetype-' + index" class="border-transparent p-2">
              <b-form-checkbox v-model="selectedSizeTypes" :value="sizeType" class="filter-item" @change="toggleSizeTypeSelection(sizeType)">{{prettySizeTypeName(sizeType)}}</b-form-checkbox>
            </b-list-group-item>
        </b-dropdown>
      </div>
      <div>
        <b-dropdown id="dropdown-2" text="Select Category" class="m-md-2">
          <b-list-group-item v-for="(category, key) in categories" :key="'cat-' + key" class="border-transparent p-2">
            <b-form-checkbox v-model="selectedCategories" :value="category.value" class="filter-item" @change="toggleCategorySelection(category.value)">{{category.text}}</b-form-checkbox>
          </b-list-group-item>
        </b-dropdown>
      </div>
      <div>
        <b-dropdown id="dropdown-3" text="Trade Value" class="m-md-2">
          <div class="p-2">
            <span>{{$t('common.trade_value')}}</span>
            <SliderInput
              v-model="selectedPriceRange"
              :title="$t('filter_sidebar.price')"
              :minLabel="$t('filter_sidebar.price_items.min')"
              :maxLabel="$t('filter_sidebar.price_items.max')"
              :fromLabel="$t('filter_sidebar.price_items.from')"
              :toLabel="$t('filter_sidebar.price_items.to')"
              :minValue="priceRangeOptions[0]"
              :maxValue="priceRangeOptions[1]"
              :minRange="priceRangeOptions[0]"
              :multiplier="100"
              class="mt-4"
            />
          </div>
        </b-dropdown>
      </div>
      <div class="mt-1">
        <b-btn class="filter-button" @click="applyFilters">{{$t('common.apply_filters')}}</b-btn>
        <label><u @click="clearAllFilters" class="ml-2 clear-all-text">{{$t('common.clear_all')}}</u></label>
      </div>
    </div>
  </div>
</template>

<script>
// import component
import { mapActions, mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import SearchInput from '~/components/common/SearchInput'
import SliderInput from '~/components/common/SliderInput'
import CustomSelect from '~/components/common/CustomSelect'
import SearchedOfferItems from '~/components/trade/SearchedOfferItems.vue'

export default {
  name: 'BrowseTradeFilters',
  components: {
    SearchInput, // Search input component
    CustomSelect, // custom select component
    SliderInput, // Input component slider
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
      selectedSizeTypes: [],
      selectedCategories: [],
      selectedPriceRange: [0, 100],
      selectedSortOrder: 'relevance',
      selectedSizes: [],
      searchedText: '',
      searchedItems: []
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
  },
  mounted() {
    // Get trade browse page filters
    this.fetchTradeBrowseFilters()

    this.$root.$on('changeSlider',(val)=>{
      this.$store.commit('trade/setPriceRangeFilters',val)
    })

    // set filters as per previous state
    this.selectedCategories = this.getCategoryFilterSelection
    this.selectedSizeTypes = this.getSizeTypeFilterSelection
    this.selectedSizes = this.getSizeFilterSelection
    this.selectedPriceRange = this.getPriceRangeFilterSelection
    this.selectedSortOrder = this.getSortOrder
    this.searchedText = this.getSearchedText
  },
  methods: {
    ...mapActions('trade', ['fetchTradeBrowseFilters']), // get filters from api call by calling action from store

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
      this.showFilters = false
      this.selectedCategories = []
      this.selectedSizeTypes = []
      this.selectedSizes = []
      this.selectedPriceRange = [0, 100]
      this.selectedSortOrder = 'relevance'
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
  color: #626262
  font-weight: $medium
  font-family: $font-family-sf-pro-display
  @include body-5
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
