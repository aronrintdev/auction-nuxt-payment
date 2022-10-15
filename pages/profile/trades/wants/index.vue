<template>
  <div class="wants-container">
   <edit-combination v-if="editCombination" :combination="editCombination"/>
   <edit-item v-else-if="editItem" :product="editItem" productFor="wantsList" :itemId="editItem.id"/>
   <div v-else class="wants-main-container">
    <div class="wants-heading">
      {{$t('trades.wants_listing.trading_wants_list')}}
    </div>
    <div class="wants-sub-heading col-md-6 pl-0 pt-1 mb-4">
      {{$t('trades.wants_listing.wants_list_contains_items')}}
    </div>
    <b-row class="mt-2 pt-2 d-flex justify-content-between">
      <b-col sm="=12" md="7" xl="8"  class="mt-2">
        <div class="d-flex d-sm-none row">
          <SearchInput
            class="searchInput"
            :value="searchText"
            :inputClass="inputClass + 'padding-left: 45px; width: 95%; font-size: 12px;'"
            placeholder="Search for Wants"
            variant="primary"
            :clearSearch="true"
            inputHeight="46px"
            @change="filterData"
            containerStyle="width: 92.5%"
          />
          <img :src="require('assets/img/icons/filter.svg')" />
        </div>
        <div class="show-desktop">
          <SearchInput
            class="searchInput"
            :value="searchText"
            :inputClass="inputClass + 'background-color: #FFF;'"
            iconStyle='position: relative; left: 12px;'
            variant="primary"
            :clearSearch="true"
            inputHeight="46px"
            @change="filterData"
          />
        </div>
        
      </b-col>
      <b-col sm="12" md="4" xl="3" class="dropdown-container mt-2">
        <CustomDropdown
          v-model="orderFilter"
          :labelLeftImage="require('~/assets/img/icons/feature.png')"
          :options="generalListItemsCustomFilter"
          type="single-select"
          :label="orderFilterLabel"
          class="bg-white"
          optionsWidth="custom"
          labelStyle='font-family: Montserrat; font-style: normal; font-weight: 500 !important; font-size: 16px; color: #000'
          paddingX="23px"
          variant="white"
          dropDownHeight="46px"
          borderRadius="8px"
          borderRadiusClose="8px 8px 0 0"
          borderRadiusOptions="0 0 8px 8px"
          :bordered="false"
          :dropdownStyle="{ border: '1px solid #cbcbcb', borderRadius: 0 }"
          @change="changeOrderFilter"
        />
      </b-col>
    </b-row>
    <BulkSelectToolbar
      ref="bulkSelectToolbar"
      :active="!!action"
      :selected="selected"
      :unit-label="$tc('common.item', selected.length)"
      :action-label="`${$tc(`trades.${action}_selected`)} ${action === 'create_combination' ? `#${combinationNum}` : ''}`"
      :total="action === 'delete_combination' ? combinationItems.length :wantedItems.length"
      :error="errorSelection"
      class="mt-3"
      @close="cancelAction()"
      @selectAll="handleSelectAll()"
      @deselectAll="handleDeselectAll()"
      @submit="handleBulkAction()"
    />
    <b-row class="d-none d-sm-flex justify-content-between justify-content-md-start px-2">
      <div 
        v-if="wantedItems.length" 
        class="listing-heading" 
        v-on:click="currentTab = 'inventory'"
        :style="{'color': currentTab === 'inventory' ? '#000' : '#999'}"
        role="button"
      >
        {{ $t('trades.wants_listing.general_list_items', {0: wantedItems.length}) }}
      </div>
      <div 
        class="wanted-items-heading" 
        v-on:click="currentTab = 'combinations'"
        :style="{'color': currentTab === 'combinations' ? '#000' : '#999'}"
        role="button"
      >
        {{ $t('trades.wants_listing.combinations', {0: combinationItems.length}) }}
      </div>
    </b-row>
    <div class="mt-3 d-flex d-sm-none row navigation-container">
      <div 
        class="navigation-item" 
        v-on:click="currentTab = 'inventory'"
        :class="{'navigation-item-active': currentTab === 'inventory'}"
      >
        <span class="navigation-text">Wants Inventory</span>
      </div>
      <div 
        class="navigation-item" 
        v-on:click="currentTab = 'combinations'"
        :class="{'navigation-item-active': currentTab === 'combinations'}"
      >
        <span class="navigation-text font-weight-normal">Wants Combinations</span>
      </div>
    </div>

    <div class="mt-4 d-none d-sm-block">
      <span class="filter-label">Filter by</span>
    </div>

    <div v-if="wantedItems.length" class="row mb-4 d-none d-sm-flex row justify-content-lg-between pr-2 ml-0 align-items-center">
      <b-col class="pl-0 pr-lg-0" sm="6" lg="2">
        <CustomDropdown 
          v-model="category"
          :options="categoryItems"
          type="single-select"
          :label="categoryFilterLabel"
          class="mb-sm-2 mb-lg-0"
          optionsWidth="custom"
          dropDownHeight="38px"
          variant="white"
          borderRadius="4px"
          @change="changeCategory"
          paddingX="10px"
          :dropdownStyle="{ border: '1px solid #cbcbcb', borderTop: 0 }"
          labelStyle="font-family: Montserrat; font-style: normal; font-weight: 400; font-size: 14px; color: #626262;"
          arrowStyle='color: #000'
        />
      </b-col>
      <b-col class="pr-0 pl-lg-0" sm="6" lg="2">
        <CustomDropdown 
          v-model="sizeTypesFilter"
          :options="filters.size_types"
          type="multi-select-checkbox"
          :label="sizeTypesFilterLabel"
          class="mb-sm-2 mb-lg-0"
          optionsWidth="custom"
          dropDownHeight="38px"
          variant="white"
          borderRadius="4px"
          @change="changeSizeTypeFilter"
          paddingX="10px"
          :dropdownStyle="{ border: '1px solid #cbcbcb', borderTop: 0 }"
          labelStyle="font-family: Montserrat; font-style: normal; font-weight: 400; font-size: 14px; color: #626262;"
          arrowStyle='color: #000'
        />
      </b-col>
      <b-col class="px-0" lg="2" >
        <CustomDropdown 
          v-model="sizeFilter"
          :options="filters.sizes"
          type="multi-select-checkbox"
          :label="sizeFilterLabel"
          class="mb-sm-2 mb-lg-0"
          optionsWidth="custom"
          dropDownHeight="38px"
          variant="white"
          borderRadius="4px"
          @change="changeSizeFilter"
          paddingX="10px"
          :dropdownStyle="{ border: '1px solid #cbcbcb', borderTop: 0 }"
          labelStyle="font-family: Montserrat; font-style: normal; font-weight: 400; font-size: 14px; color: #626262;"
          arrowStyle='color: #000'
        />
      </b-col>
      <b-col sm="6" lg="2" class="pl-0">
        <div class="button-filter" @click="getWantItems">
          {{ $t('create_listing.trade.offer_items.filter_btn') }}
        </div>
      </b-col>
      <!-- <b-col class="d-none d-xl-block" lg="1"></b-col> -->
      <b-col sm="6" lg="3" class="pr-0 d-lg-flex justify-content-lg-end" @click="getWantItems">
        <div class="button-delete-multiple">
        <!-- {{ $t('create_listing.trade.offer_items.delete_multiple') }} -->
          Delete Multiple
        </div>
      </b-col>
    </div>
    <div class="wanted-items-container bg-white">
      <div v-if="!wantedItems.length" class="mt-3">
        <div>
          <span class="wanted-items-heading">{{ $t('trades.wants_listing.wanted_items', {0: wantedItems.length}) }}</span>
          <span class="list-text pl-3">{{ $t('trades.wants_listing.general_list') }}</span>
        </div>
        <div class="no-items">
          {{ $t('trades.wants_listing.you_have_no_items_in') }} <span class="add-new-item" role="button" @click="$router.push('/profile/trades/wants/addwantitem')">{{ $t('common.add_new_item') }}</span>
        </div>
      </div>
      <div v-if="currentTab === 'inventory'">
        <div class="d-flex flex-wrap justify-content-center justify-content-sm-around">
          <div class="mx-auto mx-sm-0" v-for="item in wantedItems" :key="`want-item-${item.id}`">
            <want-item-card
              :wantItem="item"
              :selected="!!selected.find((id) => id === item.id)"
              :editRemove="removeWantItems"
              :actionType="action"
              :selectedItems="selected"
              @select="selectItem"
              @click="editDelete"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <div class="d-flex flex-column flex-xl-row" v-if="combinationItems.length">
          <b-col
            v-for="(combination, combinationIndex) in combinationItems"
            :key="combination.combination_id"
            class="mb-4 px-0"
          >
            <CombinationItemCard
              :combination="combination"
              :combination-index="combinationIndex + 1"
              :selected="!!selected.find((id) => id === combination.combination_id)"
              :editRemove="removeCombination"
              @select="selectItemCombination"
              @click="editDeleteCombination"
            />
          </b-col>
        </div>
        <div v-else>
          <div class="text-center create-combination">
            <span>{{ $t('trades.wants_listing.have_no_combinations') }}</span>
            <span
              role="button"
              class="create-combination-link"
              @click="createCombination"
            >
              {{ $t('trades.wants_listing.create_combination_label') }}
            </span>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import debounce from 'lodash.debounce';
import SearchInput from '~/components/common/SearchInput'
import CustomDropdown from '~/components/common/CustomDropdown'
import {
  CATEGORY_ITEMS,
  CREATE_COMBINATION,
  PAGE,
  PER_PAGE,
  PER_PAGE_COMBINATION,
  PER_PAGE_OPTIONS,
  PER_PAGE_OPTIONS_COMBINATION,
  SORT_BY, TAKE_SEARCHED_PRODUCTS,
  TOTAL_COUNT,
  WANTS_NAV_ITEMS
} from '~/static/constants/trades'
// import NavGroup from '~/components/common/NavGroup'
// import FormDropdown from '~/components/common/form/Dropdown'
import {Pagination} from '~/components/common'
import CombinationItemCard from '~/pages/profile/trades/wants/CombinationItemCard';
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar';
import WantItemCard from '~/pages/profile/trades/wants/WantItemCard';
import EditItem from '~/pages/profile/trades/wants/EditItem';
import EditCombination from '~/pages/profile/trades/wants/EditCombination';

export default {
  name: 'Index',
  components: {
    EditCombination,
    EditItem,
    WantItemCard,
    BulkSelectToolbar,
    CombinationItemCard,
    Pagination, 
    // FormDropdown,
    CustomDropdown, SearchInput
  },
  layout: 'Profile',
  data() {
    return {
      searchText: null,
      orderFilter: null,
      generalListItemsCustomFilter: SORT_BY.map(item => ({text: this.$t(item.text), value: item.value})),
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      category: null,
      categories: WANTS_NAV_ITEMS.map(item => ({label: this.$t(item.label), value: item.value})),
      ACTIONS: [
        {
          label: this.$t('common.add_new_item'),
          value: 'add_new_item',
        },
        {
          label: this.$t('common.delete'),
          value: 'delete',
        },
      ],
      actionCombinations: [
        {
          label: this.$t('trades.add_new_item'),
          value: 'create_combination',
        },
        {
          label: this.$t('common.delete'),
          value: 'delete_combination',
        },
      ],
      categoryItems: CATEGORY_ITEMS.map(item => ({text: this.$tc(item.text, item.choice), value: item.value})),
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      wantedItems: [],
      currentTab: 'inventory',
      page: PAGE,
      perPage: PER_PAGE,
      totalCount: TOTAL_COUNT,
      perPageOptions: PER_PAGE_OPTIONS,
      combinationItems: [],
      action: null,
      selected: [],
      removeWantItems: false,
      combinationNum: 1,
      removeCombination: false,
      errorSelection: null,
      pageCombination: PAGE,
      perPageCombination: PER_PAGE_COMBINATION,
      totalCountCombination: TOTAL_COUNT,
      perPageOptionsCombinations: PER_PAGE_OPTIONS_COMBINATION,
      selectedActionType: null,
      editItem: null,
      editCombination: null,
      TAKE_SEARCHED_PRODUCTS,
    }
  },
  computed: {
    ...mapGetters('browse', ['filters']),
    inputClass() {
      return 'background-color: #F7F7F7; font-family: Montserrat; padding-left: 74px !important; font-weight: 400; font-size: 16px; line-height: 20px; letter-spacing: 0.06em; text-transform: capitalize; color: #626262;';
    }
  },
  mounted() {
    this.$root.$on('discard_changes', () => {
      this.getWantItems();
      this.getCombinations();
      this.editItem = null
    })
    this.$root.$on('back_to_combination', () => {
      this.getWantItems();
      this.getCombinations();
      this.editCombination = null
    })
    this.$root.$on('back_to_list', () => {
      this.getWantItems();
      this.getCombinations();
      this.editCombination = null
      this.editItem = null
    })
    this.getWantItems();
    this.getCombinations();
    this.getCombinationOptions();
  },
  methods: {

    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store

    // changeTab(tab) {
    //   this.currentTab = tab;
    // },

    handleCategoryChange(value) {
      this.category = value
      this.getWantItems()
      this.getCombinations()
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
        this.getWantItems()
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
        this.getWantItems()
      }
    },

    /**
     * This function is used to change pagination page no
     * and get record again for combination items
     * @param bvEvent
     * @param page
     */
    handlePageClickCombination(bvEvent, page) {
      if (this.pageCombination !== page) {
        this.pageCombination = page
        this.getCombinations()
      }
    },

    /**
     * This function is used to change pagination page no
     * and get record again for that page
     * @param value
     */
    handlePerPageChangeCombination(value) {
      if (this.perPageCombination !== value) {
        this.perPageCombination = value
        this.pageCombination = 1
        this.getCombinations()
      }
    },

    handleActionSelect(item) {
      this.selected = []
      if (item?.value === 'add_new_item') {
        this.$router.push('/profile/trades/wants/addwantitem')
      } else {
        this.removeCombination = false
        this.removeWantItems = true
        this.action = item?.value
      }
    },
    handleSelect(item) {
      this.selected = []
      if (item?.value === 'create_combination') {
        this.removeCombination = false;
        this.removeWantItems = true
        this.action = item?.value
      } else {
        this.removeWantItems = false
        this.removeCombination = true
        this.action = item?.value
      }
    },

    cancelAction() {
      this.action = null
      this.removeWantItems = false;
      this.removeCombination = false;
      this.selected = []
    },

    handleSelectAll() {
      if (this.action === 'delete_combination') {
        this.selected = this.combinationItems.map((p) => p.combination_id)
      } else {
        this.selected = this.wantedItems.map((p) => p.id)
      }
    },

    handleDeselectAll() {
      this.selected = []
    },

    selectItem(id, checked) {
      if (this.selected?.length > 2 && this.action === 'create_combination') {
        this.makeError()
      } else if (checked) {
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },
    editDelete(data, type) {
      if(type === 'delete'){
        this.selected.push(data)
        this.deleteWant(type)
      }
      else{
        this.editItem = data
      }
    },
    editDeleteCombination(data, type) {
      if(type === 'delete_combination'){
        this.selected.push(data)
        this.deleteWant(type)
      }
      else {
        this.editCombination = data
      }
    },
    deleteWant(type) {
      this.$axios.post('/trades/wants/destroy', {type, selected_ids: this.selected})
        .then(() => {
          this.selected = []
          this.getWantItems()
          this.getCombinations()
        })
        .catch(() => {
          this.selected = []
        })
    },
    makeError() {
      this.errorSelection = this.$t('you_cannot_select_more_than')
      setTimeout(() => {
        this.errorSelection = null
      }, 3000)
    },
    selectItemCombination(data, checked) {
      this.selectedActionType = data.type
      if (checked) {
        this.selected.push(data.id)
      } else {
        this.selected.splice(this.selected.indexOf(data.id), 1)
      }
    },
    createCombination() {
      this.selected = []
      this.removeWantItems = true
      this.action = CREATE_COMBINATION
    },
    getWantItems: debounce(function () {
      // Do the api call
      this.$axios.get('trades/wants', {
        params: {
          type: 'general_items',
          page: this.page, // page no param for req
          category: this.category, // category type filter param for req
          size_types: this.sizeTypesFilter.join(','), // size type filter param for req
          sizes: this.sizeFilter.join(','), // size filter param for req
          sort_by: this.orderFilter,  // sorting param for req
          perPage: this.perPage // per page no of records param
        }
      })
        .then((response) => { // response will get combination data for want items
          this.wantedItems = response.data && response.data.data.data
          this.totalCount = parseInt(response.data.data.total)
          this.perPage = parseInt(response.data.data.per_page)
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    }, 500),
    getCombinations: debounce(function () {
      // Do the api call
      this.$axios.get('trades/wants', {
        params: {
          type: 'combinations',
          page: this.pageCombination, // page no param for req
          category: this.category, // category type filter param for req
          size_types: this.sizeTypesFilter.join(','), // size type filter param for req
          sizes: this.sizeFilter.join(','), // size filter param for req
          sort_by: this.orderFilter,  // sorting param for req
          perPage: this.perPageCombination // per page no of records param
        }
      })
        .then((response) => { // response will get combination data for want items
          this.combinationItems = response.data && response.data.data.data
          this.totalCountCombination = parseInt(response.data.data.total)
          this.perPageCombination = parseInt(response.data.data.per_page)
          this.combinationItems.forEach((combination, index) => {
            this.combinationItems[index].selectedItemIndex = (this.totalCountCombination > 0) ? 0 : null
          });
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    }, 500),
    changeOrderFilter(selectedOrder) {
      this.orderFilter = selectedOrder
      const orderFilteredKey = this.generalListItemsCustomFilter.find(item => item.value === this.orderFilter)
      this.orderFilterLabel = this.$options.filters.capitalizeFirstLetter(orderFilteredKey.text)
      this.getWantItems()
      this.getCombinations()
    },
    handleBulkAction() {
      if (this.action === 'delete' || this.action === 'delete_combination') {
        this.deleteWant(this.action)
        this.action = null
      }
      if (this.action === 'create_combination') {
        this.addCombination(this.action)
        this.action = null
      }
    },
    addCombination(){
      const url = 'trades/wants/combination'
      const data = {
        selected_ids: this.selected
      }
      this.$axios.post(url,data)
      .then(this.getCombinations)
      .catch((error)=>{
        this.$toasted.error(this.$t(error.response.data.error))
      })
    },
    getCombinationOptions(){
      this.$axios.get('trades/wants/combination/options')
        .then((response) => { // response will get combination data for want items
          this.$store.commit('trade/setCombinationsId', response?.data?.data)
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    },
    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeCategory(selectedCategory) {
      this.category = selectedCategory
      const categoryFilteredKey = this.categoryItems.find(item => item.value === this.category)
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

      this.sizeFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeFilter, this.TAKE_SEARCHED_PRODUCTS)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
    },
    filterData(text){
      this.searchText = text
      this.wantedItems = this.wantedItems.filter(o => o.product.name.toLowerCase().includes(this.searchText.toLowerCase()) || o.product.sku.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.wants-main-container
  padding-left: 15px
  padding-right: 15px
  background-color: #FFF
  @media (min-width: 576px)
    background-color: $color-white-5
    padding-left: 54px
    padding-right: 54px

.wants-heading
  font-family: $font-family-montserrat
  font-style: normal
  margin-bottom: 10
  @include heading-13
  color: $color-black-1
  padding-top: 47px
  display: none
  @media (min-width: 576px)
    display: block


.wants-sub-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  color: $color-gray-5
  font-weight: 500
  display: none
  @media (min-width: 576px)
    display: block

.dropdown-container
  display: none
  @media (min-width: 576px)
    display: block

.listing-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-1-bold
  margin-top: 56px
  margin-right: 54px

.dropdown-actions::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-blue-1
    border: 1px solid $color-blue-1
    border-radius: 34px
    height: 42px
    width: 168px
    justify-content: center !important

    &.opened
      border-top-left-radius: 10px
      border-top-right-radius: 10px
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0

  .search-results
    .popover-body
      >div
        @include body-4-normal
        font-family: $font-family-base
        color: $color-gray-5
        height: 42px
        display: flex
        justify-content: center
        align-items: center
        border-bottom: 1px solid $color-gray-23
        border-left: 1px solid $color-blue-1
        border-right: 1px solid $color-blue-1

        &:hover
          color: $color-black-1

        &:last-child
          border-bottom-left-radius: 10px
          border-bottom-right-radius: 10px
          border-bottom: 1px solid $color-blue-1

.wanted-items-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-1-bold
  color: $color-gray-47
  margin-top: 56px

.list-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-gray-5

.no-items
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  color: $color-gray-5
  padding-top: 30px

.add-new-item
  color: $color-blue-1

.wanted-items-container
  padding-bottom: 34px
  padding-top: 36px
  @media (min-width: 992px)
    padding-left: 10px
    padding-right: 10px
  border-radius: 3px

.filter-label
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: 500
  font-size: 15px
  line-height: 18px
  margin-top: 32px
  margin-bottom: 7px

.delete-button
  border-color: $color-blue-20
  border-radius: 4px
  border-width: 1

.show-mobile
  display: block
  @media (min-width: 576px)
    display: none

.show-desktop
  display: none
  @media (min-width: 576px)
    display: block

.navigation-container
  background-color: $color-white-19
  border-radius: 14.5px
  padding-left: 4px
  padding-right: 4px
  height: 34px
  display: flex
  align-items: center

.navigation-item
  height: 25.5px
  width: 50%
  display: flex
  align-items: center
  justify-content: center

.navigation-text
  font-family: 'Montserrat'
  font-weight: 600
  font-size: 11px

.navigation-item-active
  background-color: #FFF
  border-radius: 14.5px

.create-combination
  font-family: $font-family-sf-pro-display
  font-weight: 500
  font-size: 16
  color: $color-gray-5

.create-combination-link
  color: $color-blue-1
  padding-bottom: 2px
  border-bottom: 2px solid $color-blue-1

.button-delete-multiple
  border: 1px solid $color-blue-20
  background: #FDFDFD
  color: $color-gray-5
  font-family: $font-family-montserrat
  font-size: 14px
  display: flex
  justify-content: center
  align-items: center
  border-radius: 4px
  height: 46px
  @media (min-width: 992px)
    width: 156px


.button-filter
  background: $color-blue-20
  border-radius: 5px
  font-family: $font-family-sf-pro-display
  font-weight: 500
  font-size: 16
  color: #FFF
  display: flex
  justify-content: center
  align-items: center
  height: 46px
  @media (min-width: 992px)
    height: 38px
    width: 86px


</style>

