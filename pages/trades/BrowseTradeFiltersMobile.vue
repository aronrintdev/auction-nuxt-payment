<template>
  <div>
        <img class="float-right image-filter"
             :src="require('~/assets/img/filterIcon.svg')"  @click="openBottomFilter()"/>
    <vue-bottom-sheet
      ref="browseFiltersSheet"
      class="more-options"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <div class="filtersSection">
        <div class="mt-1 ml-2">
          <span class="filtersHeading">Sort</span>
          <b-form-radio-group
            class="radios mt-1 mb-1 sorted"
            v-model="sortFilters"
            :options="sortOptions"
            :checked="getSortOrder"
          />
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-1'">
            <div class="filtersHeading">
              Category
            </div>
            <div class="d-flex">
              <img  v-if="isVisible" class="arrow-image pull-right" :src="require('~/assets/img/chev-up.svg')"/>
              <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/chev-down.svg')"/>
            </div>
          </div>
          <b-collapse id="collapse-1" v-model="isVisible">
            <div class="d-flex mt-3">
              <div :class="[selectedCategories == 'footwear' ? 'selected-item' : 'footwear-box']" @click="category('footwear')">Footwear</div>
              <div :class="[selectedCategories == 'apparel' ? 'selected-item' : 'apparel-box']" class="ml-2" @click="category('apparel')">Apparel</div>
              <div :class="[selectedCategories == 'accessories' ? 'selected-item' : 'accessories-box']" class="ml-2"  @click="category('accessories')">Accessories</div>
            </div>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-sizeType'">
            <div class="filtersHeading">
              Size Type
            </div>
            <div class="d-flex">
              <img  v-if="isVisibleSizeType" class="arrow-image pull-right" :src="require('~/assets/img/chev-up.svg')"/>
              <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/chev-down.svg')"/>
            </div>
          </div>
          <b-collapse id="collapse-sizeType" v-model="isVisibleSizeType">
            <div class="d-flex mt-3">
              <div :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('men')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('men')) ? 'selected-item' : 'footwear-box']" id="men-box" @click="onSelect('men')">Men</div>
              <div :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('women')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('women')) ? 'selected-item' : 'footwear-box']"  class="ml-2" id="women-box" @click="onSelect('women')">Women</div>
              <div :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('unisex')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('unisex')) ? 'selected-item' : 'footwear-box']" class="ml-2"  id="unisex-box" @click="onSelect('unisex')">Unisex</div>
            </div>
            <div class="d-flex mt-3">
              <div :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('child')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('child')) ? 'selected-item' : 'footwear-box']" @click="onSelect('child')">Child</div>
              <div :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('youth')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('youth')) ? 'selected-item' : 'footwear-box']" class="ml-2" @click="onSelect('youth')">Youth</div>
              <div  :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('toddler')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('toddler')) ? 'selected-item' : 'footwear-box']" class="ml-2" @click="onSelect('toddler')">Toddler</div>
            </div>
            <div class="d-flex mt-3">
              <div  :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('infant')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('infant')) ? 'selected-item' : 'footwear-box']" @click="onSelect('infant')">Infant</div>
              <div  :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('preschool')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('preschool')) ? 'selected-item' : 'footwear-box']" class="ml-2" @click="onSelect('preschool')">Preschool</div>
              <div  :class="[(this.selectedSizeTypes !== null && selectedSizeTypes.includes('streetwear')) || (getSizeTypeFilterSelection!== undefined && getSizeTypeFilterSelection !== null && getSizeTypeFilterSelection.includes('streetwear')) ? 'selected-item' : 'footwear-box']" class="ml-2" @click="onSelect('streetwear')">Streetwear</div>
            </div>
          </b-collapse>
        </div>
        <hr class="hr" />
      </div>



      <div class="col-md-12 d-flex justify-content-center">
        <div  class="filter-options col-md-10 ">
          <b-row class="d-flex justify-content-start m-5">
<!--            <b-col md="12" class="text-center filter-details mb-5">-->
<!--              <h3>{{$tc('common.filter', 2)}}</h3>-->
<!--            </b-col>-->
<!--            <b-col md="1">-->
<!--            </b-col>-->
<!--            <b-col md="2" class="mr-2">-->
<!--              <h4>{{$tc('common.size_type', 1)}}</h4>-->
<!--              <b-list-group>-->

                <!-- Display all size types for selection -->
<!--                <b-list-group-item v-for="(sizeType, index) in sizeTypeOptions" :key="'sizetype-' + index" class="border-transparent px-0">-->
<!--                  <b-form-checkbox v-model="selectedSizeTypes" :value="sizeType" class="filter-item" @change="toggleSizeTypeSelection(sizeType)">{{prettySizeTypeName(sizeType)}}</b-form-checkbox>-->
<!--                </b-list-group-item>-->
<!--              </b-list-group>-->
<!--            </b-col>-->
<!--            <b-col md="2" class="mr-2">-->
<!--              <h4>{{$tc('common.category', 2)}}</h4>-->
<!--              <b-list-group>-->

<!--                &lt;!&ndash; Display all categories for selection &ndash;&gt;-->
<!--                <b-list-group-item v-for="(category, key) in categories" :key="'cat-' + key" class="border-transparent px-0">-->
<!--                  <b-form-checkbox v-model="selectedCategories" :value="category.value" class="filter-item" @change="toggleCategorySelection(category.value)">{{category.text}}</b-form-checkbox>-->
<!--                </b-list-group-item>-->
<!--              </b-list-group>-->
<!--            </b-col>-->
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
    </vue-bottom-sheet>

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
      isVisible: false,
      isVisibleSizeType:false,
      isVisibleSizes:false,
      filterSection:false,
      showFilters: false,
      sortFilters: null,
      sortOptions: [
        { text: this.$t('trades.index.browse.relevance'), value: 'relevance' },
        { text: this.$t('trades.index.browse.end_date_ascending'), value: 'end_date_ascending' },
        { text: this.$t('trades.index.browse.end_date_descending'), value: 'end_date_descending' },
        { text: this.$t('trades.index.browse.most_viewed'), value: 'most_viewed' },

      ],
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
  watch:{
    sortFilters(sort) {
      console.log('sort',sort)
      this.sortFilters = sort
    },
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
  created() {
    this.sortFilters = this.getSortOrder
    this.selectedCategories = this.getCategoryFilterSelection
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

    openBottomFilter() {
      this.$refs.browseFiltersSheet.open();
    },
    category(cat) {
      this.selectedCategories = cat
    },

    onSelect(item) {
      if(this.selectedSizeTypes !== null && this.selectedSizeTypes.includes(item)) {
        const checkArray = this.selectedSizeTypes.indexOf(item)
        this.selectedSizeTypes.splice(checkArray,1)
      } else if(this.getSizeTypeFilterSelection !== undefined && this.getSizeTypeFilterSelection !== null && this.getSizeTypeFilterSelection.length > 0)  {
        if(this.getSizeTypeFilterSelection.includes(item)) {
          this.$store.commit('trades/setSizeTypeFilterSelectionRemoveMobile', item)
        } else {
          this.$store.commit('trade/setSizeTypeFilterSelectionMobile', item)
        }
      }
      else {
        this.selectedSizeTypes.push(item)
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
      this.showFilters = false
      this.selectedCategories = []
      this.selectedSizeTypes = []
      this.selectedSizes = []
      this.selectedPriceRange = [0, 100]
      this.selectedSortOrder = 'relevance'
      this.searchedText = ''
      this.$store.commit('trade/resetAllFilters')
      this.$emit('clearFilters')
      this.$refs.browseFiltersSheet.close();
    },

    // find selected category name from local
    findCategoryName(categoryToBeSearched){
      return this.categories.find(category => category.value === categoryToBeSearched)?.text
    },

    // apply all selected filters
    applyFilters(){
      this.showFilters = false
      this.$refs.browseFiltersSheet.close();
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
.filtersHeading
  @include body-13
  font-weight: 700
  font-family: $font-sp-pro
  color: #667799
.radios
  @include body-5
  font-weight: $normal
  color: #424242
  display: grid
.hr
  border-top: 1px solid #E1E1E1
  width: 318px
.cat-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: #999999
  padding-top: 10px
  padding-left: 14px
  cursor: pointer
.footwear-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: #999999
  padding-top: 10px
  padding-left: 20px
  cursor: pointer
.apparel-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: #999999
  padding-top: 10px
  padding-left: 25px
  cursor: pointer
.accessories-box
  width: 99px
  height: 45px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: #999999
  padding-top: 10px
  padding-left: 10px
  cursor: pointer
.sorted
  display: grid !important
.filter-options
  background-color: $color-white-1
.image-filter
  position: relative
  margin-top: -11rem
  margin-right: 2rem
.reset
  margin-left: 11px
  padding-top: 0.5rem
  padding-left: 3rem
  width: 135px
  height: 40px
  border-radius: 20px
  border: 1px solid #000000
  color: #000000
  @include body-13
  font-family: $font-sp-pro
  font-weight: $medium
  cursor: pointer
  @media (min-width: 300px)  and (max-width: 349px)
    padding-left: 25px
.filter-btn
  width: 135px
  height: 40px
  background: #667799
  border-radius: 20px
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-13
  line-height: 19px
  text-align: center
  color: #FFFFFF
  cursor: pointer
  margin-left: 3rem
.selected-catgory
  @include body-13
  font-weight: $normal
  font-family: $font-sp-pro
  color: #000000
//margin-left: 10rem
.selected-item
  width: 99px
  height: 45px
  border-radius: 3px
  border: 1px solid #000
  @include body-5
  font-weight: $medium
  font-family: $font-sp-pro
  color: #999999
  padding-top: 10px
  padding-left: 20px
  cursor: pointer
  background: #F2F2F2
.selected-size
  width: 42px
  height: 42px
  border-radius: 3px
  border: 1px solid #000
  @include body-5
  font-weight: $medium
  font-family: $font-sp-pro
  color: #999999
  padding: 5px
  cursor: pointer
  background: #F2F2F2
  margin: 2px
.size-box
  width: 42px
  height: 42px
  border-radius: 3px
  background: #FFFFFF
  border: 1px solid #999999
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: #999999
  padding: 5px
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
