<template>
  <div>
    <div class="d-flex">
      <div>
        <SearchInput
          :value="searchText"
          variant="secondary"
          :placeholder="$t('create_listing.trade.offer_items.search_by')"
          :clearSearch="true"
          bordered
          inputHeight="33px"
          @change="onSearchInput"

        />
      </div>
      <div class="ml-2 mt-1"> <img class="image-tick"  src="~/assets/img/filtersPrefer.svg" @click="openBottomFilter()"/></div>
      <vue-bottom-sheet
        ref="browseFiltersSheet"
        class="more-options"
        max-width="auto"
        max-height="90vh"
        :rounded="true"
      >
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-1'">
            <b-row class="filtersHeading ml-2">
              <b-col class="col-sm-6">{{$tc('common.category')}}</b-col>
              <b-col class="col-sm-6">
                <div class="d-flex justify-content-end mr-3">

                  <img  v-if="isVisible" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                  <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-collapse id="collapse-1" v-model="isVisible">
            <b-row class="row mt-1">
              <b-col v-for="(cat, key) in categoryItems" :key="'cat-' + key">
                <div :value="cat" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                     @click="changeCategory(cat.value)">
                  {{cat.text}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-2'">
            <b-row class="filtersHeading ml-2">
              <b-col class="col-sm-6">Size Type</b-col>
              <b-col class="col-sm-6">
                <div class="d-flex justify-content-end mr-3">
                  <img  v-if="isVisibleType" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                  <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-collapse id="collapse-2" v-model="isVisibleType">
            <b-row class="row mt-1 sizesTypes">
              <b-col v-for="(st, key) in filters.size_types" :key="'cat-' + key">
                <div :value="st" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                     @click="changeSizeTypeFilter(st)">
                  {{st}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="mt-1 ml-2">
          <div class="d-flex" v-b-toggle="'collapse-3'">
            <b-row class="filtersHeading ml-2">
              <b-col class="col-sm-6">Size</b-col>
              <b-col class="col-sm-6">
                <div class="d-flex justify-content-end mr-3">
                  <img  v-if="isVisibleSize" class="arrow-image" :src="require('~/assets/img/chev-up.svg')"/>
                  <img  v-else class="arrow-image" :src="require('~/assets/img/chev-down.svg')"/>
                </div>
              </b-col>
            </b-row>
          </div>
          <b-collapse id="collapse-3" v-model="isVisibleSize">
            <b-row class="row mt-1 sizesTypes">
              <b-col v-for="(size, key) in filters.sizes" :key="'cat-' + key">
                <div :value="size" class= "unselected-item m-1 d-flex justify-content-center align-content-center"
                     @click="changeSizeFilter(size)">
                  {{size.size}}
                </div>
              </b-col>
            </b-row>
          </b-collapse>
        </div>
        <hr class="hr" />
        <div class="d-flex mb-3">
          <div class="ml-2">
            <b-btn class="resetBtn" @click="clearAllFilters">{{$t('common.reset')}}</b-btn>
          </div>
          <div class="ml-5">
            <b-btn class="filter-btn" @click="getInventory"> {{ $t('create_listing.trade.offer_items.filter_btn') }}</b-btn>
          </div>
        </div>
      </vue-bottom-sheet>
    </div>
    <NavGroup
      :data="categories"
      :value="category"
      nav-key="category"
      class="section-nav text-center mt-2"
      @change="handleCategoryChange"
    />
    <b-row class="mt-4 pl-2">
    <inventory-card-item :items="inventoryItems" :selectedItems="publicItems" @changePublicInventories="emitParentChangePublicInventories" />
    </b-row>
    <infinite-loading :identifier="infiniteId" @infinite="getInventory">
      <span slot="no-more"></span>
    </infinite-loading>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput'
import {
  CATEGORY_ITEMS,
  NAV_CATEGORY_OPTIONS,
  PAGE, PER_PAGE,
  PER_PAGE_OPTIONS,
  TOTAL_COUNT,
  PUBLIC_INVENTORY_STATUS,
  DEFAULT_INVENTORY_STATUS,
  ALL_INVENTORY_STATUS,
  INVENTORY_STATUS_CUSTOM
} from '~/static/constants/trades'
import InventoryCardItem from '~/pages/profile/trades/preferences/InventoryCardItem'
import NavGroup from'~/components/common/NavGroup'

export default {
  name: 'YourInventory',
  components: {NavGroup, InventoryCardItem,SearchInput},
  data(){
    return {
      isVisible: false,
      isVisibleType: false,
      isVisibleSize:false,
      PUBLIC_INVENTORY_STATUS,
      DEFAULT_INVENTORY_STATUS,
      searchText: null,
      categoryItems: CATEGORY_ITEMS.map(item => ({text: this.$tc(item.text, item.choice), value: item.value})),
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      page: PAGE,
      perPage: PER_PAGE,
      totalCount: TOTAL_COUNT,
      perPageOptions: PER_PAGE_OPTIONS,
      category: ALL_INVENTORY_STATUS,
      categories: NAV_CATEGORY_OPTIONS.map(item => ({label: this.$t(item.label), value: item.value})),
      inventoryItems: [],
      publicItems: [],
      infiniteId: +new Date(),
      url: '/vendor/inventory'

    }
  },
  computed:{
    ...mapGetters('browse', ['filters']), // getter for getting list of filters data
  },
  mounted(){
    this.getInventory()
  },
  methods:{
    openBottomFilter() {
      this.$refs.browseFiltersSheet.open();
    },
    clearAllFilters(){
      this.orderFilter = null
      this.categoryFilter = null
      this.sizeFilter = []
      this.sizeTypesFilter = []
      this.getInventory()
      this.isVisible = false
      this.isVisibleType = false
      this.isVisibleSize = false
    },
  /**
   * This function is used to get product and show in
   * listing below input search field
   * @param term
   */
    onSearchInput: debounce(function (term) {
    this.searchText = term
  }, 500),
    /**
     * This function is used to get user listing of inventory
     */
     getInventory: debounce(function ($state,filters = {}) {
      const that = this
      filters.sort_by = this.orderFilter // sorting filter
      filters.category = this.categoryFilter // category type filter
      filters.sizes = this.sizeFilter.join(',') // size filter
      filters.size_types = this.sizeTypesFilter.join(',') // size type filter
      this.$axios
        .get(this.url, {
          params: {
            search: this.searchText,   // for search query
            visibility: this.category,
            page: this.page, // no of page to change
            per_page: this.perPage, // no of records to show on per page
            ...filters
          },
        })
        .then((response) => {  // list of vendor inventory
          const res = response?.data
          if (!res.next_page_url) {
            $state.complete()
          }else{
            that.page += 1;
            that.inventoryItems.push(...res.data);
            that.publicItems = that.inventoryItems.filter((item) => item.visibility === PUBLIC_INVENTORY_STATUS).map((item) => item.id)
            that.isVisible = false
            that.isVisibleType = false
            that.isVisibleSize = false
            that.$refs.browseFiltersSheet.close();
            $state.loaded()
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.searchedItems = []
        })
    }, 500),

    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeCategory(selectedCategory) {
      this.categoryFilter = selectedCategory
      const categoryFilteredKey = this.categoryItems.find(item => item.value === this.categoryFilter)
      this.categoryFilterLabel = this.$options.filters.capitalizeFirstLetter(categoryFilteredKey.text)
    },
    /**
     * This function is used to change product size filter
     * @param selectedSizeType
     */
    changeSizeTypeFilter(selectedSizeType) {

      if (!this.sizeTypesFilter.includes(selectedSizeType)) {
        this.sizeTypesFilter.push(selectedSizeType)
      } else {
        this.sizeTypesFilter = this.sizeTypesFilter.filter(item => item !== selectedSizeType)
      }
      this.sizeTypesFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeTypesFilter, 2) || this.$t('trades.create_listing.vendor.wants.size_type') // 2 is max number of labels show in filter
    },

    /**
     * This function is used to change size filter
     * for product
     * @param selectedSize
     */
    changeSizeFilter(selectedSize) {
      if (!this.sizeFilter.includes(selectedSize.size)) {
        this.sizeFilter.push(selectedSize.size)
      } else {
        this.sizeFilter = this.sizeFilter.filter(item => item !== selectedSize.size)
      }

      this.sizeFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeFilter, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
    },

    /**
     * This function is used to change pagination page no
     * and get record again for that page
     * @param bvEvent
     * @param page
     */
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.getInventory()
      }
    },

    /**
     * This function is used for change no records showing on per page
     * @param value
     */
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.getInventory()
      }
    },

    handleCategoryChange(value) {
      this.category = value
      this.page = 1
      if(this.category !== INVENTORY_STATUS_CUSTOM){
        this.inventoryItems = []
      }
      this.getInventory()
    },

    emitParentChangePublicInventories(itemId){
      if(this.publicItems.includes(itemId)){
        const index = this.publicItems.findIndex(item => item === itemId)
        if(index > -1)
          this.publicItems.splice(index, 1)
      }else{
        this.publicItems.push(itemId)
      }
      this.$emit('change', this.publicItems)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.info-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-light
  color: $color-black-1
.hr
  border-top: 1px solid $color-gray-62
  width: 318px
.unselected-item
  width: 99px
  height: 45px
  border-radius: 3px
  background: $color-white-1
  border: 1px solid $color-gray-47
  @include body-5
  font-weight: $normal
  font-family: $font-sp-pro
  color: $color-gray-47
  padding-top: 10px
  cursor: pointer
.selected-item
  width: 99px
  height: 45px
  border-radius: 3px
  border: 1px solid $color-black-1
  @include body-5
  font-weight: $medium
  font-family: $font-sp-pro
  color: $color-gray-47
  padding-top: 10px
  cursor: pointer
  background: $color-white-7
.filtersHeading
  @include body-13-bold
  font-family: $font-sp-pro
  color: $color-blue-20
  width: 100%
.sizesTypes
  height: 100px
  overflow-y: scroll
.filter-btn
  width: 130px
  height: 40px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 16px
  color: $color-white-1
  background-color: $color-blue-20
  border-radius: 30px
  @media (max-width: 350px) and  (min-width: 300px)
    width: 100px
    height: auto
    font-size: 12px
.resetBtn
  width: 130px
  height: 40px
  border-radius: 30px
  font-family: $font-sp-pro
  font-weight: $medium
  font-style: normal
  font-size: 16px
  color:  $color-black-1
  background-color: $color-white-1
  margin-left: 10px
  @media (max-width: 350px) and  (min-width: 300px)
    width: 100px
    height: auto
    font-size: 12px

</style>
