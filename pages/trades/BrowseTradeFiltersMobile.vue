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
          <span class="filtersHeading ml-2">Sort</span>
          <b-form-radio-group
            class="radios mt-1 mb-1 sorted ml-3"
            v-model="sortFilters"
            :options="sortOptions"
            :checked="getSortOrder"
            @change="setSortOrder($event, 'CUSTOM_VARIABLE')"
          />
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-1'">
            <div class="filtersHeading ml-2">
              Category
            </div>
            <div class="d-flex ml-2">
              <img  v-if="isVisible" class="arrow-image pull-right" :src="require('~/assets/img/chev-up.svg')"/>
              <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/chev-down.svg')"/>
            </div>
          </div>
          <b-collapse id="collapse-1" v-model="isVisible">
            <b-row class="row">
              <b-col v-for="(category, key) in categories" :key="'cat-' + key">
                <div :class="getCategoryFilterSelection.includes(category.value) ?'selected-item':'unselected-item' " :value="category.value" class="m-1 d-flex justify-content-center align-content-center"
                     @click="toggleCategorySelection(category.value)">
                  {{category.text}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-sizeType'">
            <div class="filtersHeading ml-2">
              Size Type
            </div>
            <div class="d-flex ml-2">
              <img  v-if="isVisibleSizeType" class="arrow-image pull-right" :src="require('~/assets/img/chev-up.svg')"/>
              <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/chev-down.svg')"/>
            </div>
          </div>
          <b-collapse id="collapse-sizeType" v-model="isVisibleSizeType">
            <b-row class="row">
              <b-col v-for="(sizeType, index) in sizeTypeOptions" :key="'sizetype-' + index">
                <div :class="getSizeTypeFilterSelection.includes(sizeType) ?'selected-item':'unselected-item' " :value="sizeType" class="m-1 d-flex justify-content-center align-content-center" @click="toggleSizeTypeSelection(sizeType)">
                  {{sizeType}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />

        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-slight'">
            <div class="filtersHeading ml-2">
             {{$t('common.trade_value')}}
            </div>
            <div class="d-flex ml-2">
              <img  v-if="isVisibleSlight" class="arrow-image pull-right" :src="require('~/assets/img/chev-up.svg')"/>
              <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/chev-down.svg')"/>
            </div>
          </div>
          <b-collapse id="collapse-slight" v-model="isVisibleSlight">
            <div class="d-flex mt-3 ml-2">
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
          </b-collapse>
        </div>
        <hr class="hr" />

        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-sizes'">
            <div class="filtersHeading ml-2">
              Sizes
            </div>
            <div class="d-flex ml-2">
              <img  v-if="isVisibleSize" class="arrow-image pull-right" :src="require('~/assets/img/chev-up.svg')"/>
              <img  v-else class="arrow-image pull-right" :src="require('~/assets/img/chev-down.svg')"/>
            </div>
          </div>
          <b-collapse id="collapse-sizes" v-model="isVisibleSize">
            <b-row class="row" v-for="(categorySizes, key) in sizeOptions" :key="'sizecat-' + key">
              <b-col v-for="(size, sizeKey) in categorySizes" :key="'size-' + sizeKey" >
                <div :class="getSizeFilterSelection.includes(size.id) ? 'selected-item':'unselected-item' "
                     :value="size.id" class="m-1 d-flex justify-content-center align-content-center"
                     @click="toggleSizeSelection(size.id)">
                  {{size.size}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />



        <div class="d-flex">
          <div class="ml-2">
            <b-btn class="resetBtn" @click="clearAllFilters">Reset</b-btn>
          </div>
          <div class="ml-5">
            <b-btn class="filter-btn" @click="applyFilters">Apply Filter</b-btn>
          </div>
        </div>
      </div>
<!--      <div class="col-md-12 d-flex justify-content-center">-->
<!--        <div  class="filter-options col-md-10 ">-->
<!--          &lt;!&ndash; Display all sizes with respect to categories selection &ndash;&gt;-->
<!--          <div v-if="Object.keys(sizeOptions).length > 0">-->
<!--            <b-row v-for="(categorySizes, key) in sizeOptions" :key="'sizecat-' + key" class="d-flex justify-content-start m-5">-->
<!--              <b-col md="1">-->
<!--              </b-col>-->
<!--              <b-col v-if="Object.keys(categorySizes).length > 0" md="9">-->
<!--                <h4>{{$t('common.'+key+'_sizes')}}</h4>-->
<!--                <b-list-group horizontal="md" class="d-inline-block">-->
<!--                  <b-list-group-item v-for="(size, sizeKey) in categorySizes" :key="'size-' + sizeKey" class="border-transparent d-inline-block">-->
<!--                    <b-form-checkbox v-model="selectedSizes[key]" :value="size.id" class="filter-item" @change="toggleSizeSelection(key, size.id)">{{size.size}}</b-form-checkbox>-->
<!--                  </b-list-group-item>-->
<!--                </b-list-group>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
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
// import Button from '~/components/common/Button.vue'

export default {
  name: 'BrowseTradeFilters',
  components: {
    // CustomSelect, // custom select component
    // Button, // Button component
    SliderInput, // Input component slider
  },
  data() {
    return {
      isVisible: false,
      isVisibleSizeType:false,
      isVisibleSizes:false,
      isVisibleSize:false,
      isVisibleSlight:false,
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
    // handle when category is changed
    toggleCategorySelection(category){
      this.$store.commit('trade/setCategoryFilterSelection', category)
      this.fetchTradeBrowseFilters()
    },
    // capitalize size type firs letters
    prettySizeTypeName(sizeType){
      return capitalizeFirstLetter(sizeType)
    },

    // // handle when size type is changed
    toggleSizeTypeSelection(sizeType){
      this.$store.commit('trade/setSizeTypeFilterSelection', sizeType)
    },
    // handle when size is changed
    toggleSizeSelection(sizeId){
      this.$store.commit('trade/setSizeTypeFilterSelectionMobile', sizeId)
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
      this.$refs.browseFiltersSheet.close();
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
      this.isVisible = false
      this.isVisibleSizeType = false
      this.isVisibleSizes= false
      this.isVisibleSlight=false
    },

    // find selected category name from local
    findCategoryName(categoryToBeSearched){
      return this.categories.find(category => category.value === categoryToBeSearched)?.text
    },

    // apply all selected filters
    applyFilters(){
      this.showFilters = false
      this.$emit('applyFilters')
      this.$refs.browseFiltersSheet.close();

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
  @include body-9
  font-weight: $normal
  color: #424242
  display: grid

.hr
  border-top: 1px solid #E1E1E1
  width: 318px
.unselected-item
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
  //padding-left: 20px
  cursor: pointer
.sorted
  display: grid !important
.filter-options
  background-color: $color-white-1
.image-filter
  position: relative
  margin-top: -11rem
  margin-right: 2rem
.resetBtn
  width: 130px
  height: 40px
  border-radius: 30px
  font-family: $font-sp-pro
  font-weight: $medium
  font-style: normal
  font-size: 16px
  color:  #000000
  background-color: #FFFFFF
  margin-left: 10px
.filter-btn
  width: 130px
  height: 40px
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 600
  font-size: 16px
  color: #FFFFFF
  background-color: #667799
  border-radius: 30px
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
  //padding-left: 20px
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
