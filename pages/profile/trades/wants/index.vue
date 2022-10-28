<template>
  <div>
   <edit-combination v-if="editCombination" :combination="editCombination"/>
   <edit-item v-else-if="editItem" :product="editItem" productFor="wantsList" :itemId="editItem.id"/>
   <div v-else class="wants-main-container">
    <div class="wants-heading">
      {{$t('trades.wants_listing.trading_wants_list')}}
    </div>
    <div class="wants-sub-heading col-md-7 pl-0 pt-1">
      {{$t('trades.wants_listing.wants_list_contains_items')}}
    </div>
    <b-row class="mt-4">
      <b-col md="7" sm="=12">
        <SearchInput
          :value="searchText"
          variant="primary"
          :placeholder="$t('trades.wants_listing.search_wants_list')"
          :clearSearch="true"
          inputHeight="46px"
          @change="filterData"
          @clear="filterData('')"
        />
      </b-col>
      <b-col md="5 pl-3" sm="12">
        <CustomDropdown
          v-model="orderFilter"
          :labelLeftImage="require('~/assets/img/icons/feature.png')"
          :options="generalListItemsCustomFilter"
          type="single-select"
          :label="orderFilterLabel"
          class="bg-white"
          optionsWidth="custom"
          maxWidth="328px"
          variant="white"
          dropDownHeight="46px"
          borderRadius="8px"
          borderRadiusClose="8px 8px 0 0"
          borderRadiusOptions="0 0 8px 8px"
          :bordered="false"
          width="328px"
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
      :total="action === 'delete_combination' ? combinationItems.length : wantedItems.length"
      :error="errorSelection"
      class="mt-3"
      @close="cancelAction()"
      @selectAll="handleSelectAll()"
      @deselectAll="handleDeselectAll()"
      @submit="handleBulkAction()"
    />
    <div v-if="wantedItems.length" class="listing-heading">
      {{ $t('trades.wants_listing.general_list_items', {0: wantedItems.length}) }}
    </div>
    <div class="d-flex flex-wrap" :class="!wantedItems.length && 'mt-4'">
      <NavGroup
        :data="categories"
        :value="category"
        nav-key="category"
        class="section-nav text-center col-md-10 col-sm-12"
        @change="handleCategoryChange"
      />
      <FormDropdown
          id="wants-actions"
          :placeholder="$tc('common.action', 2)"
          :items="ACTIONS"
          class="dropdown-actions"
          labelAlignmet="center"
          :icon-arrow-up="require('~/assets/img/icons/arrow-up-blue.svg')"
          :icon-arrow-down="require('~/assets/img/icons/arrow-down-blue.svg')"
          @select="handleActionSelect"

      />
    </div>
    <div v-if="wantedItems.length" class="row d-flex mt-3 mb-4">

      <b-col  md="2" ms="12">
        <CustomDropdown v-model="category"
                        :options="categoryItems"
                        type="single-select"
                        :label="categoryFilterLabel"
                        class="mr-3 width-156"
                        optionsWidth="custom"
                        width="150px"
                        dropDownHeight="38px"
                        variant="white"
                        borderRadius="4px"
                        @change="changeCategory"
      />
      </b-col>
      <b-col  md="2" sm="12">
        <CustomDropdown v-model="sizeTypesFilter"
                        :options="filters.size_types"
                        type="multi-select-checkbox"
                        :label="sizeTypesFilterLabel"
                        class="mr-3 width-156"
                        optionsWidth="custom"
                        dropDownHeight="38px"
                        variant="white"
                        borderRadius="4px"
                        @change="changeSizeTypeFilter"
        />
      </b-col>
      <b-col  md="2" sm="12">
        <CustomDropdown v-model="sizeFilter"
                        :options="filters.sizes"
                        type="multi-select-checkbox"
                        :label="sizeFilterLabel"
                        class="mr-3 width-156"
                        optionsWidth="custom"
                        dropDownHeight="38px"
                        variant="white"
                        borderRadius="4px"
                        @change="changeSizeFilter"
        />
      </b-col>
      <b-col  md="2" sm="12">
        <Button class="mr-3" variant="primary" @click="getWantItems">
          {{ $t('create_listing.trade.offer_items.filter_btn') }}
        </Button>
      </b-col>
    </div>
    <div class="wanted-items-container" :class="{'wanted-items-container-border': wantedItems.length}">
      <div v-if="!wantedItems.length" class="mt-3">
        <div>
          <span class="wanted-items-heading">{{ $t('trades.wants_listing.wanted_items', {0: wantedItems.length}) }}</span>
          <span class="list-text pl-3">{{ $t('trades.wants_listing.general_list') }}</span>
        </div>
        <div class="no-items">
          {{ $t('trades.wants_listing.you_have_no_items_in') }} <span class="add-new-item" role="button" @click="$router.push('/profile/trades/wants/addwantitem')">{{ $t('common.add_new_item') }}</span>
        </div>
      </div>
      <div v-if="wantedItems.length">
      <div class="d-flex flex-wrap">
        <div v-for="item in wantedItems" :key="`want-item-${item.id}`">
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
    <div class="combination-items-container mt-4">
      <div v-if="!combinationItems.length && wantedItems.length" class="mt-2 pb-5">
        <div>
          <span class="wanted-items-heading">{{ $t('trades.wants_listing.combinations', {0: combinationItems.length}) }}</span>
        </div>
        <div class="no-items pb-5">
          {{$t('trades.wants_listing.have_no_combinations')}} <span class="add-new-item" role="button" @click="createCombination">{{$t('trades.wants_listing.create_combination', {count: ''})}}</span>
        </div>
      </div>
      <div v-if="combinationItems.length && wantedItems.length" class="mb-4">
        <b-row class="col-md-12 justify-content-between mb-4">
          <div>
            <span class="wanted-items-heading">{{ $t('trades.wants_listing.combinations', {0: combinationItems.length}) }}</span>
          </div>
          <FormDropdown
            id="combination-actions"
            :placeholder="$tc('common.action', 2)"
            :items="actionCombinations"
            class="dropdown-actions"
            labelAlignmet="center"
            :icon-arrow-up="require('~/assets/img/icons/arrow-up-blue.svg')"
            :icon-arrow-down="require('~/assets/img/icons/arrow-down-blue.svg')"
            @select="handleSelect"
          />
        </b-row>
        <b-row>
          <b-col
            v-for="(combination, combinationIndex) in combinationItems"
            :key="combination.combination_id"
            cols="6" class="mb-4"
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
        </b-row>
        <b-row class="col-md-12 justify-content-center">
          <Pagination
            v-model="pageCombination"
            :total="totalCountCombination"
            :per-page="perPageCombination"
            :per-page-options="perPageOptionsCombinations"
            class="mt-4"
            @page-click="handlePageClickCombination"
            @per-page-change="handlePerPageChangeCombination"
          />
        </b-row>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import debounce from 'lodash.debounce'
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
import NavGroup from '~/components/common/NavGroup'
import FormDropdown from '~/components/common/form/Dropdown'
import Button from '~/components/common/Button'
import {Pagination} from '~/components/common'
import CombinationItemCard from '~/pages/profile/trades/wants/CombinationItemCard'
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar'
import WantItemCard from '~/pages/profile/trades/wants/WantItemCard'
import EditItem from '~/pages/profile/trades/wants/EditItem'
import EditCombination from '~/pages/profile/trades/wants/EditCombination'

export default {
  name: 'Index',
  components: {
    EditCombination,
    EditItem,
    WantItemCard,
    BulkSelectToolbar,
    CombinationItemCard,
    Pagination, Button, FormDropdown, NavGroup, CustomDropdown, SearchInput
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
  },
  mounted() {
    this.$root.$on('discard_changes', () => {
      this.getWantItems()
      this.getCombinations()
      this.editItem = null
    })
    this.$root.$on('back_to_combination', () => {
      this.getWantItems()
      this.getCombinations()
      this.editCombination = null
    })
    this.$root.$on('back_to_list', () => {
      this.getWantItems()
      this.getCombinations()
      this.editCombination = null
      this.editItem = null
    })
    this.getWantItems()
    this.getCombinations()
    this.getCombinationOptions()
  },
  methods: {

    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store

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
        this.removeCombination = false
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
      this.removeWantItems = false
      this.removeCombination = false
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
          this.pageCombination = 1
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
      if (checked) {
        this.selected.push(data)
      } else {
        this.selected.splice(this.selected.indexOf(data), 1)
      }
    },
    createCombination() {
      this.selected = []
      this.removeWantItems = true
      this.action = CREATE_COMBINATION
    },
    getWantItems: debounce(function () {
      this.searchText = ''
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
          this.$nextTick(() => this.$forceUpdate())
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
          })
          this.combinationNum = this.combinationItems.length + 1
          this.$nextTick(() => this.$forceUpdate())
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
      .then(() => {
        this.getCombinations()
        this.selected = []
      })
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
      if(text !== ''){
        this.wantedItems = this.wantedItems.filter(o => o.product.name.toLowerCase().includes(this.searchText.toLowerCase()) || o.product.sku.toLowerCase().includes(this.searchText.toLowerCase()));
      }else{
        this.getWantItems()
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.wants-main-container
  padding-left: 54px
  padding-right: 54px

.wants-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include heading-13
  color: $color-black-1
  padding-top: 47px

.wants-sub-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  color: $color-gray-5

.listing-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-1-bold
  color: $color-black-1
  margin-top: 56px

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
  color: $color-black-1

.list-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-gray-5

.no-items
  font-family: 'SF Pro Display'
  font-style: normal
  @include body-13-regular
  color: $color-gray-5
  padding-top: 30px

.add-new-item
  color: $color-blue-1

.wanted-items-container
  padding-bottom: 34px

.wanted-items-container-border
  border-bottom: 0.5px solid $color-gray-5
</style>
