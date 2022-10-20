<template>
  <div>
        <img class="float-right image-filter"
             :src="require('~/assets/img/filterIcon.svg')"  @click="showFilters = !showFilters">
    <div class="col-md-12 d-flex justify-content-center">
    <div v-if="showFilters" class="filter-options col-md-10 ">
      <b-row class="d-flex justify-content-start m-5">
        <b-col md="12" class="text-center filter-details mb-5">
          <h3>{{$tc('common.filter', 2)}}</h3>
        </b-col>
        <b-col md="1">
        </b-col>
        <b-col md="2" class="mr-2">
          <h4>{{$tc('common.size_type', 1)}}</h4>
          <b-list-group>

            <!-- Display all size types for selection -->
            <b-list-group-item v-for="(sizeType, index) in sizeTypeOptions" :key="'sizetype-' + index" class="border-transparent px-0">
              <b-form-checkbox v-model="selectedSizeTypes" :value="sizeType" class="filter-item" @change="toggleSizeTypeSelection(sizeType)">{{prettySizeTypeName(sizeType)}}</b-form-checkbox>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col md="2" class="mr-2">
          <h4>{{$tc('common.category', 2)}}</h4>
          <b-list-group>

            <!-- Display all categories for selection -->
            <b-list-group-item v-for="(category, key) in categories" :key="'cat-' + key" class="border-transparent px-0">
              <b-form-checkbox v-model="selectedCategories" :value="category.value" class="filter-item" @change="toggleCategorySelection(category.value)">{{category.text}}</b-form-checkbox>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col md="2">
          <h4>{{$t('common.trade_value')}}</h4>

          <!-- Display price range selection filter -->
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
        </b-col>
      </b-row>

      <!-- Display all sizes with respect to categories selection -->
      <div v-if="Object.keys(sizeOptions).length > 0">
        <b-row v-for="(categorySizes, key) in sizeOptions" :key="'sizecat-' + key" class="d-flex justify-content-start m-5">
          <b-col md="1">
          </b-col>
          <b-col v-if="Object.keys(categorySizes).length > 0" md="9">
            <h4>{{$t('common.'+key+'_sizes')}}</h4>
            <b-list-group horizontal="md" class="d-inline-block">
              <b-list-group-item v-for="(size, sizeKey) in categorySizes" :key="'size-' + sizeKey" class="border-transparent d-inline-block">
                <b-form-checkbox v-model="selectedSizes[key]" :value="size.id" class="filter-item" @change="toggleSizeSelection(key, size.id)">{{size.size}}</b-form-checkbox>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </div>

      <!-- Display all selected filters -->
      <b-row class="d-flex justify-content-start m-5">
        <b-col md="1">
        </b-col>
        <b-col v-if="selectedSizeTypes.length > 0 || selectedCategories.length > 0 || selectedSizes.length > 0" md="8" class="selected-filters">
          <label><u @click="clearAllFilters">{{$t('common.clear_all_filters')}}</u></label>
          <div class="d-inline-block">

            <!-- Display all selected size types -->
            <span v-for="(selectedSizeType, key) in selectedSizeTypes" :key="'sizetype-selected-' + key">{{prettySizeTypeName(selectedSizeType)}}<a class="cross-icon cursor-pointer" @click="toggleSizeTypeSelection(selectedSizeType)">x</a></span>

            <!-- Display all selected categories -->
            <span v-for="(selectedCategory, key) in selectedCategories" :key="'category-selected-' + key">{{findCategoryName(selectedCategory)}}<a class="cross-icon cursor-pointer" @click="toggleCategorySelection(selectedCategory)">x</a></span>

            <!-- Display all selected category sizes -->
            <span v-for="(categorySizes, key) in selectedSizes" :key="'selectedcategory-' + key">
              <span v-for="(size, sizeKey) in categorySizes" :key="'selectedcategorysizes-' + sizeKey">{{size}}<a class="cross-icon cursor-pointer" @click="toggleSizeSelection(key, size)">x</a></span>
            </span>
          </div>
        </b-col>
        <b-col v-else md="8">

        </b-col>
        <b-col md="2">
          <Button :whiteText="true" variant="primary-color-disabled" @click="applyFilters">{{$tc('common.apply_filter', 2)}}</Button>
        </b-col>
      </b-row>
    </div>
    </div>
    <b-row v-if="showFilters" class="d-flex justify-content-center m-3" @click="showFilters = !showFilters">
      <img :src="require('~/assets/img/icons/arrow-up-dark-gray.svg')" />
    </b-row>
  </div>
</template>

<script>
// import component
import { mapActions, mapGetters } from 'vuex'
import { capitalizeFirstLetter } from '~/utils/string'
import SliderInput from '~/components/common/SliderInput'
// import CustomSelect from '~/components/common/CustomSelect'
import Button from '~/components/common/Button.vue'

export default {
  name: 'BrowseTradeFilters',
  components: {
    // CustomSelect, // custom select component
    Button, // Button component
    SliderInput, // Input component slider
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
.image-filter
  position: relative
  margin-top: -11rem
  margin-right: 2rem
.filter-btn
  background-color: $color-white-1
  border: none
  color: $color-black-1
  font-weight: $medium
  font-family: $font-montserrat
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
