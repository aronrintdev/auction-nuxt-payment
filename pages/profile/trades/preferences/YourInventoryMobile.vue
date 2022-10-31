<template>
  <div>
    <div class="d-flex">
      <div>
        <SearchInput
          :value="searchText"
          variant="primary"
          :placeholder="$t('create_listing.trade.offer_items.search_by')"
          :clearSearch="true"
          bordered
          inputHeight="46px"
          @change="onSearchInput"
        />
      </div>
      <div class="ml-2 mt-1"> <img class="image-tick"  src="~/assets/img/filterIcon.svg" /></div>
    </div>
    <NavGroup
      :data="categories"
      :value="category"
      nav-key="category"
      class="section-nav text-center mt-2"
      @change="handleCategoryChange"
    />
    <b-col class="mt-4 p-0" md="12" sm="12">
      <span class="filter-by">{{ $t('create_listing.trade.offer_items.filter_by') }}</span>
      <div class="row d-flex">
        <b-col md="2" ms="12">
          <CustomDropdown v-model="categoryFilter"
                          :options="categoryItems"
                          type="single-select"
                          :label="categoryFilterLabel"
                          class="mr-3 width-156"
                          optionsWidth="custom"
                          width="150px"
                          dropDownHeight="38px"
                          variant="white"
                          borderRadius="4px"
                          @getResults="getInventory"
                          @change="changeCategory"/>
          </b-col>
        <b-col md="2" sm="12">
        <CustomDropdown v-model="sizeTypesFilter"
                          :options="filters.size_types"
                          type="multi-select-checkbox"
                          :label="sizeTypesFilterLabel"
                          class="mr-3 width-156"
                          optionsWidth="custom"
                          dropDownHeight="38px"
                          variant="white"
                          borderRadius="4px"
                          @getResults="getInventory"
                          @change="changeSizeTypeFilter"/>
        </b-col>
        <b-col md="2" sm="12">
          <CustomDropdown v-model="sizeFilter"
                          :options="filters.sizes"
                          type="multi-select-checkbox"
                          :label="sizeFilterLabel"
                          class="mr-3 width-156"
                          optionsWidth="custom"
                          dropDownHeight="38px"
                          variant="white"
                          borderRadius="4px"
                          @getResults="getInventory"
                          @change="changeSizeFilter"/>
        </b-col>
        <b-col md="2" sm="12">
        <Button class="mr-3" variant="primary" @click="getInventory">
          {{ $t('create_listing.trade.offer_items.filter_btn') }}
        </Button>
        </b-col>
        <b-col md="4" sm="12" class="d-flex align-items-center">
          <img :src="require('~/assets/img/icons/info-blue.svg')" alt="No Image" width="13" height="13">
          <span  v-if="category === DEFAULT_INVENTORY_STATUS" class="info-text ml-2">{{$t('trades.preferences.make_it_public')}}</span>
          <span  v-else class="info-text ml-2">{{$t('trades.preferences.make_it_private')}}</span>
        </b-col>
      </div>
    </b-col>
    <b-row class="mt-4 pl-2">
    <inventory-card-item :items="inventoryItems" :selectedItems="publicItems" @changePublicInventories="emitParentChangePublicInventories" />
    </b-row>
    <b-row class="col-md-12 justify-content-center">
      <Pagination
        v-model="page"
        :total="totalCount"
        :per-page="perPage"
        :per-page-options="perPageOptions"
        class="mt-4"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </b-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput'
import CustomDropdown from '~/components/common/CustomDropdown.vue'
import Button from '~/components/common/Button'
import {Pagination} from '~/components/common'
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
  components: {NavGroup, InventoryCardItem, Pagination,Button, CustomDropdown,SearchInput},
  data(){
    return {
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
    }
  },
  computed:{
    ...mapGetters('browse', ['filters']), // getter for getting list of filters data
  },
  mounted(){
    this.getInventory()
  },
  methods:{

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
     getInventory: debounce(function (filters = {}) {
      filters.sort_by = this.orderFilter // sorting filter
      filters.category = this.categoryFilter // category type filter
      filters.sizes = this.sizeFilter.join(',') // size filter
      filters.size_types = this.sizeTypesFilter.join(',') // size type filter
      this.$axios
        .get('/vendor/inventory', {
          params: {
            search: this.searchText,   // for search query
            visibility: this.category,
            page: this.page, // no of page to change
            per_page: this.perPage, // no of records to show on per page
            ...filters
          },
        })
        .then((response) => {  // list of vendor inventory
          this.inventoryItems = response.data.data
          this.publicItems = this.inventoryItems.filter((item) => item.visibility === PUBLIC_INVENTORY_STATUS).map((item) => item.id)
          this.totalCount = parseInt(response.data.total)
          this.perPage = parseInt(response.data.per_page)
          this.$emit('updateTotal', this.totalCount)
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
</style>
