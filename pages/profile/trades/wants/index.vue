<template>
  <div class="wants-container">
    <edit-combination v-if="editCombination" :combination="editCombination"/>
    <edit-item 
      v-else-if="editItem" 
      :product="editItem" 
      productFor="wantsList" 
      :itemId="editItem.id"
      :combinations="combinationItems"
    />
    <div v-else class="wants-main-container">
      <div class="wants-heading">
        {{$t('trades.wants_listing.trading_wants_list')}}
      </div>
      <div class="wants-sub-heading col-md-6 pl-0 pt-1 mb-4">
        {{$t('trades.wants_listing.wants_list_contains_items')}}
      </div>
      <div class="mt-2 pt-2 d-flex flex-sm-column flex-md-row justify-content-between">
        <b-col sm="12" md="7" xl="8" class="mt-2 px-0">
          <div class="d-flex flex-column d-sm-none">
            <div class="d-flex justify-content-between">
              <div class="col-11 px-0">
                <SearchInput
                  class="searchInput"
                  :value="searchText"
                  :inputStyle="{
                    ...inputClass,
                    paddingLeft: '45px', 
                    fontSize: '12px',
                    background: '#F7F7F7',
                    height: '33px',
                  }"
                  iconStyle='color: #979797; width: 14px; height: 14px;'
                  :placeholder="$t('common.search_wants')"
                  variant="primary"
                  :clearSearch="true"
                  @change="filterData"
                />
              </div>
              <img :src="require('assets/img/icons/filter.svg')" @click="filtersModalOpen = true" />
            </div>
            <SearchedProductsBelowSearchTextBox 
              v-if="searchedItems.length > 0 && searchText.length > 0" 
              :productItems="searchedItems" 
              inputType="wantsList"
              :wrapperStyle="{ margin: 0 }"
              :itemStyle="{ padding: 0 }"
              :suggestNewStyle="{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                height: '74px'
              }"
              @add_product_want_list="redirectToAddWant"
            />
          </div>
          <div class="show-desktop">
            <SearchInput
              class="searchInput"
              :value="searchText"
              :inputStyle="{ 
                backgroundColor: '#FFF', 
                ...inputClass,
                border: searchedItems.length > 0 ? '1px solid rgba(0,0,0,.125)' : '0',
                borderBottom: '0 !important',
                borderBottomLeftRadius: searchedItems.length > 0 ? 0 : '8px',
                borderBottomRightRadius: searchedItems.length > 0 ? 0 : '8px',
              }"
              iconStyle='position: relative; left: 12px;'
              variant="primary"
              :clearSearch="true"
              inputHeight="46px"
              @change="filterData"
            />
            <div class="position-relative">
              <SearchedProductsBelowSearchTextBox 
                v-if="searchedItems.length > 0 && searchText.length > 0" 
                :productItems="searchedItems" 
                class="position-absolute"
                :style="{
                  zIndex: 9999
                }"
                inputType="wantsList"
                :wrapperStyle="{ margin: 0 }"
                :itemStyle="{ padding: 0 }"
                :suggestNewStyle="{
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  height: '74px'
                }"
                @add_product_want_list="redirectToAddWant"
              />
            </div>
          </div>
        </b-col>

        <b-col sm="12" md="4" xl="3" class="dropdown-container mt-2 px-0">
          <CustomDropdown
            v-model="orderFilter"
            :labelLeftImage="require('~/assets/img/icons/feature.png')"
            :options="generalListItemsCustomFilter"
            type="single-select"
            :label="orderFilterLabel"
            class="bg-white"
            optionsWidth="custom"
            labelStyle='font-weight: 500 !important; font-size: 16px; color: #000'
            paddingX="23px"
            :arrowStyle="{
              marginTop: '0 !important',
              color: '#999'
            }"
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
      </div>
      <b-row class="d-none d-sm-flex justify-content-between justify-content-md-start px-2">
        <div 
          class="listing-heading" 
          :style="{'color': currentTab === 'inventory' ? '#000' : '#999'}"
          role="button"
          @click="currentTab = 'inventory'"
        >
          {{ $t('trades.wants_listing.general_list_items', { 0: totalCount }) }}
        </div>
        <div 
          class="wanted-items-heading" 
          :style="{'color': currentTab === 'combinations' ? '#000' : '#999'}"
          role="button"
          @click="currentTab = 'combinations'"
        >
          {{ $t('trades.wants_listing.combinations', { 0: combinationItems.length }) }}
        </div>
      </b-row>
      <div class="mt-3 d-flex d-sm-none navigation-container">
        <div 
          class="navigation-item" 
          :class="{'navigation-item-active': currentTab === 'inventory'}"
          @click="currentTab = 'inventory'"
        >
          <span class="navigation-text">{{ $t('common.wants_inventory') }}</span>
        </div>
        <div 
          class="navigation-item" 
          :class="{'navigation-item-active': currentTab === 'combinations'}"
          @click="currentTab = 'combinations'"
        >
          <span class="navigation-text font-weight-normal">{{ $t('common.wants_combinations') }}</span>
        </div>
      </div>

      <div class="d-sm-none d-flex justify-content-end mt-3">
        <div 
          class="d-flex align-items-center"
          @click="deleteMultiple()"
        >
          <img
            :src="require('~/assets/img/icons/delete-rounded.svg')"
            :alt="$t('product_page.delete_multiple')"
          />
          <div 
            :style="{
              
            }"
            class="delete-multiple"
          >
            {{ $t('product_page.delete_multiple') }}
          </div>
        </div>
      </div>

      <div class="mt-4 d-none d-sm-block">
        <span class="filter-label">{{ $t('common.filter_by') }}</span>
      </div>

      <div class="row mb-4 d-none d-sm-flex row justify-content-lg-between pr-2 ml-0 align-items-center">
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
            paddingX="10px"
            :dropdownStyle="{ 
              border: '1px solid #cbcbcb', 
              borderTop: 0,
              borderRadius: '0 0 4px 4px'
            }"
            borderRadiusClose="4px 4px 0 0"
            labelStyle="font-size: 14px; color: #626262;"
            :arrowStyle="{
              color: '#000',
              marginTop: '0 !important'
            }"
            @change="changeCategory"
          />
        </b-col>
        <b-col class="pr-0 pl-lg-0" sm="6" lg="2">
          <CustomDropdown 
            v-model="sizeTypesFilter"
            :options="sizeTypesOptions"
            type="multi-select-checkbox"
            :label="sizeTypesFilterLabel"
            class="mb-sm-2 mb-lg-0"
            optionsWidth="custom"
            dropDownHeight="38px"
            variant="white"
            borderRadius="4px"
            paddingX="10px"
            :dropdownStyle="{ 
              border: '1px solid #cbcbcb', 
              borderTop: 0,
              borderRadius: '0 0 4px 4px'
            }"
            borderRadiusClose="4px 4px 0 0"
            labelStyle="font-size: 14px; color: #626262;"
            :arrowStyle="{
              color: '#000',
              marginTop: '0 !important'
            }"
            @change="changeSizeTypeFilter"
          />
        </b-col>
        <b-col class="px-0" lg="2" >
          <CustomDropdown 
            v-model="sizeFilter"
            :options="sizeOptions"
            type="multi-select-checkbox"
            :label="sizeFilterLabel"
            class="mb-sm-2 mb-lg-0"
            optionsWidth="custom"
            dropDownHeight="38px"
            variant="white"
            borderRadius="4px"
            paddingX="10px"
            :dropdownStyle="{ 
              border: '1px solid #cbcbcb', 
              borderTop: 0,
              borderRadius: '0 0 4px 4px'
            }"
            borderRadiusClose="4px 4px 0 0"
            labelStyle="font-size: 14px; color: #626262;"
            :arrowStyle="{
              color: '#000',
              marginTop: '0 !important'
            }"
            @change="changeSizeFilter"
          />
        </b-col>
        <b-col sm="6" lg="2" class="pl-0">
          <div class="button-filter" role="button" @click="getWantItems">
            {{ $t('create_listing.trade.offer_items.filter_btn') }}
          </div>
        </b-col>

        <b-col sm="6" lg="3" class="pr-0 d-lg-flex justify-content-lg-end">
          <div role="button" class="button-delete-multiple" @click="deleteMultiple">
            {{ $t('product_page.delete_multiple') }}
          </div>
        </b-col>
      </div>

      <div class="d-none d-sm-block bulk-wrapper">
        <BulkSelectToolbar
          ref="bulkSelectToolbar"
          :active="!!action"
          :selected="selected"
          :unit-label="$tc('common.item', selected.length)"
          :action-label="`${$tc(`trades.${action}_selected`)}`"
          :total="action === 'delete_combination' ? combinationItems.length : wantedItems.length"
          :error="errorSelection"
          class=""
          @close="cancelAction()"
          @selectAll="handleSelectAll()"
          @deselectAll="handleDeselectAll()"
          @submit="submitBulk()"
        />
      </div>

      <div class="">
        <div 
          v-if="currentTab === 'inventory'" 
          class=""
        >
          <div v-if="!wantedItems.length" :style="{ height: '100vh' }" class="no-items text-center mt-5">
            {{ $t('trades.wants_listing.you_have_no_items_in') }}
            <span class="add-new-item" role="button" @click="$router.push('/profile/trades/wants/addwantitem')">
              {{ $t('common.add_new_item') }}
            </span>
          </div>
          <div v-else class="d-flex flex-column bg-white content-container pb-3">
            <div class="d-flex flex-wrap justify-content-around">
              <div 
                v-for="item in wantedItems" 
                :key="`want-item-${item.id}`"
                class="col-6 col-md-3"
              >
                <want-item-card
                  :wantItem="item"
                  :selected="!!selected.find((id) => id === item.id)"
                  :editRemove="action === 'delete' || action === 'create_combination'"
                  :actionType="action"
                  :selectedItems="selected"
                  @select="selectItem"
                  @click="editDelete"
                />
              </div>
            </div>
            <Pagination
              v-model="page"
              :total="totalCount"
              :per-page="perPage"
              :per-page-options="perPageOptions"
              class="mt-4"
              @page-click="handlePageClick"
              @per-page-change="handlePerPageChange"
            />
          </div>
        </div>
        <div v-else>
          <div v-if="!combinationItems.length" class="vh-100">
            <div 
              class="d-sm-none text-center mb-4"
              :style="{
                fontWeight: 600,
                fontSize: '14px',
                color: '#626262',
                marginTop: '42px'
              }"
            >
              {{ $t('product_page.no_combinations_found') }}
            </div>
            <div 
              class="position-fixed d-sm-none bg-black rounded-circle d-flex align-items-center justify-content-center"
              :style="{
                width: '42px',
                height: '42px',
                right: '20px',
                bottom: '20px',
                background: '#63769d'
              }"
              @click="createCombination"
            >
              <img
                :src="require('~/assets/img/icons/product/Plus.svg')"
                :alt="$t('common.add')"
              />
            </div>
            <div 
              class="d-none d-sm-flex flex-column flex-sm-row justify-content-center mt-3 create-combination"
            >
              <span>{{ $t('trades.wants_listing.have_no_combinations') }}</span>
              <span
                role="button"
                class="add-new-item ml-1"
                @click="createCombination"
              >
                {{ $t('trades.wants_listing.create_combination_label') }}
              </span>
            </div>
          </div>
          <div v-else class="d-flex flex-wrap px-1 pt-3 pt-sm-5 bg-white border-3">
            <div
              v-for="(combination, combinationIndex) in combinationItems"
              :key="`${combination.combination_id}_${combination.combinationItems && combination.combinationItems.length}`"
              class="mb-4 px-0 px-xl-1 col-xl-6"
            >
              <CombinationItemCard
                :combination="combination"
                :combination-index="combinationIndex + 1"
                :selected="!!selected.find((id) => id === combination.combination_id)"
                :editRemove="action === 'delete_combination'"
                class="h-100"
                productType="combination"
                @select="selectItemCombination"
                @click="editDeleteCombination"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div
      v-if="action === 'delete_combination' || action === 'delete' || action === 'create_combination'"
      class="d-flex flex-column d-sm-none px-3 pb-3"
    >
      <div class="col-12 tap-to-delete">
        {{ action === 'create_combination' ? $t('common.tap_to_include') : $t('common.tap_to_delete') }}
      </div>
      <div class="d-flex justify-content-between">
        <div 
          class="col-5 d-flex align-items-center justify-content-center cancel-button"
          @click="cancelAction()"
        >
          {{ $t('common.cancel') }}
        </div>
        <input 
          type="button"
          :disabled="selected.length < 1"
          :value="actionButtonText"
          class="col-5 d-flex align-items-center justify-content-center delete-button-mobile border-0"
          @click="submitBulk()"
        />
      </div>
    </div>

    <FiltersModal
      :isOpen="filtersModalOpen"
      @closed="filtersModalOpen = false"
      @opened="filtersModalOpen = true"
      @submit="setFilters"
    />
    <ConfirmModal
      id="confirm-bulk-delete"
      :confirmLabel="$t('common.delete')"
      :message="$t('common.bulk_delete_warning')"
      :messageStyle="{
        fontFamily: 'SF Pro Display',
        fontWeight: 400,
        fontSize: '18px',
        color: '#000',
        marginTop: '-30px',
        width: '100%'
      }"
      @confirm="handleBulkAction"
    />
    <AlertModal
      id="items-deleted"
      :message="$t('common.items_deleted')"
      icon="trash"
      :messageStyle="{
        fontFamily: 'SF Pro Display',
        fontWeight: 400,
        fontSize: '18px',
        color: '#000',
        width: '100%'
      }"
    />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {mapActions, mapGetters} from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput'
import CustomDropdown from '~/components/common/CustomDropdown'
import {
  CATEGORY_ITEMS,
  PAGE,
  PER_PAGE,
  PER_PAGE_COMBINATION,
  PER_PAGE_OPTIONS,
  PER_PAGE_OPTIONS_COMBINATION,
  TAKE_SEARCHED_PRODUCTS,
  TOTAL_COUNT,
  WANTS_NAV_ITEMS,
  WANTS_SORT_OPTIONS,
  SIZE_TYPES,
  THREE_ITEMS
} from '~/static/constants/trades'
import {Pagination, Button } from '~/components/common'
import CombinationItemCard from '~/pages/profile/trades/wants/CombinationItemCard';
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar';
import WantItemCard from '~/pages/profile/trades/wants/WantItemCard';
import EditItem from '~/pages/profile/trades/wants/EditItem';
import EditCombination from '~/pages/profile/trades/wants/EditCombination';
import FiltersModal from '~/pages/profile/trades/wants/FiltersModal'
import { ConfirmModal, AlertModal } from '~/components/modal'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox';
import { APPAREL_SIZES } from '~/static/constants/sizes'

export default {
  name: 'Index',
  components: {
    EditCombination,
    EditItem,
    WantItemCard,
    BulkSelectToolbar,
    CombinationItemCard,
    Pagination, 
    FiltersModal,
    CustomDropdown, 
    SearchInput,
    ConfirmModal,
    AlertModal,
    SearchedProductsBelowSearchTextBox,
    Button
  },
  layout: 'Profile',
  data() {
    return {
      searchText: null,
      orderFilter: null,
      generalListItemsCustomFilter: WANTS_SORT_OPTIONS.map(item => ({ text: this.$t(item.text), value: item.value })),
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      category: null,
      categories: WANTS_NAV_ITEMS.map(item => ({ label: this.$t(item.label), value: item.value })),
      sizeTypesOptions: SIZE_TYPES.map(item => ({ text: this.$t(item.text), value: item.value })),
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
      combinationNum: 1,
      errorSelection: null,
      pageCombination: PAGE,
      perPageCombination: PER_PAGE_COMBINATION,
      totalCountCombination: TOTAL_COUNT,
      perPageOptionsCombinations: PER_PAGE_OPTIONS_COMBINATION,
      selectedActionType: null,
      editItem: null,
      editCombination: null,
      TAKE_SEARCHED_PRODUCTS,
      filtersModalOpen: false,
      searchedItems: [],
      sizeOptions: APPAREL_SIZES.map(item => ({ text: item, value: item })),
    }
  },
  computed: {
    ...mapGetters('browse', ['filters']),
    inputClass() {
      return {
        backgroundColor: '#FFF',
        fontFamily: 'Montserrat', 
        paddingLeft: '74px !important', 
        fontWeight: 400,
        fontSize: '16px', 
        lineHeight: '20px', 
        letterSpacing: '0.06em', 
        textTransform: 'capitalize',
        color: '#626262'
      }
    },
    actionButtonText() {
      const count = this.selected.length > 0 ? `(${this.selected.length})` : ''
      const text = this.action === 'create_combination' ? this.$t('common.add') : this.$t('common.delete')
      return `${text} ${count}`
    },
  },
  mounted() {
    const wrapper = document.querySelector('.main-wrapper')
    if (wrapper.querySelector('.wants-main-container')) {
      wrapper.classList.add('bg-white-5')
    }
    const mobile = document.querySelector('.mobile-p-b')
    if (mobile) {
      mobile.classList.add('pb-0')
    }

    this.$root.$on('edit', (product) => {
      this.editItem = product
    })
    this.$root.$on('delete', (productId, combinationId) => {
      this.$axios.post('/trades/wants/destroy', {
          type: 'combination_item',
          want_item_id: productId,
          combination_id: combinationId
      })
      .then(this.getCombinations())
    })
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
      this.searchedItems = []
      this.editCombination = null
      this.editItem = null
    })
    this.getWantItems()
    this.getCombinations()
    this.getCombinationOptions()
  },
  methods: {
    ...mapActions('trades', ['searchProductsList']),
    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store

    submitBulk() {
      if (this.action === 'delete' || this.action === 'delete_combination') {
        this.$bvModal.show('confirm-bulk-delete')
      } else {
        this.handleBulkAction();
      }
    },

    redirectToAddWant(product) {
      this.editItem = {
        product,
        sku: product.product && product.product.sku,
        packaging_condition: {
          id: '',
          name: ''
        },
        packaging_condition_id: '',
        size: {
          id: ''
        },
        latestSales: null
      }
    },

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
        this.action = item?.value
      }
    },
    handleSelect(item) {
      this.selected = []
      if (item?.value === 'create_combination') {
        this.action = item?.value
      } else {
        this.action = item?.value
      }
    },

    cancelAction() {
      this.action = null
      this.selected = []
    },

    handleSelectAll() {
      if (this.action === 'delete_combination') {
        this.selected = this.combinationItems.map((p) => p.combination_id)
      } else if (this.action === 'create_combination' && this.wantedItems.length > 3) {
        this.selected = this.wantedItems.slice(0, THREE_ITEMS).map((p) => p.id)
        this.makeError()
      } else {
        this.selected = this.wantedItems.map((p) => p.id)
      }
    },

    handleDeselectAll() {
      this.selected = []
    },

    selectItem(id, action) {
      if (this.selected?.length > 2 && this.action === 'create_combination' && action !== 'remove') {
        this.makeError()
      } else if (action === 'add') {
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },
    editDelete(data, type) {
      if(type === 'delete') {
        this.selected.push(data)
        this.deleteWant(type)
      }
      else {
        this.editItem = data
      }
    },
    editDeleteCombination(data, type) {
      if(type === 'delete_combination') {
        this.selected.push(data)
        this.deleteWant(type)
      }
      else {
        this.editCombination = data
      }
    },
    deleteWant(type) {
      this.$axios.post('/trades/wants/destroy', { type, selected_ids: this.selected })
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
      this.$axios.post('/trades/wants/destroy', { type: 'delete_combination', selected_ids: [2, 5] })
      this.errorSelection = this.$t('vendor_hub.error_messages.you_cannot_select_more')
      setTimeout(() => {
        this.errorSelection = null
      }, 3000)
    },
    selectItemCombination(data, type) {
      if (type === 'add') {
        this.selected.push(data)
      } else {
        this.selected.splice(this.selected.indexOf(data), 1)
      }
    },
    createCombination() {
      this.selected = []
      this.currentTab = 'inventory'
      this.action = 'create_combination'
    },
    deleteMultiple() {
      this.selected = []
      this.action = this.currentTab === 'inventory' ? 'delete' : 'delete_combination'
    },
    setFilters(filters) {
      this.category = filters.category.value
      this.orderFilter = filters.sortBy
      this.sizeTypesFilter = filters.size_type
      this.sizeFilter = filters.size
      this.getWantItems();
      this.filtersModalOpen = false
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
        this.combinationItems = response.data && response.data.data.data.sort(
          (a, b) => b.combination_items.length - a.combination_items.length
        )
        this.totalCountCombination = parseInt(response.data.data.total)
        this.perPageCombination = parseInt(response.data.data.per_page)
        this.combinationItems.forEach((combination, index) => {
          this.combinationItems[index].selectedItemIndex = (this.totalCountCombination > 0) ? 0 : null
        });
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
      const isDeleteAction = this.action === 'delete' || this.action === 'delete_combination'
      if (isDeleteAction) {
        this.deleteWant(this.action)
        this.action = null
      }
      if (this.action === 'create_combination') {
        this.addCombination(this.action)
        this.action = null
        this.currentTab = 'combinations'
      }
      if (isDeleteAction) {
        this.$bvModal.show('items-deleted')
      }
    },
    addCombination() {
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
      if (!this.sizeFilter.includes(selectedSize)) {
        this.sizeFilter.push(selectedSize)
      } else {
        this.sizeFilter = this.sizeFilter.filter(item => item !== selectedSize)
      }
      this.sizeFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeFilter, this.TAKE_SEARCHED_PRODUCTS)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
    },
    filterData(text){
      this.searchText = text
      if(text !== '') {
        this.searchProductsList({
          search: this.searchText.toLowerCase(),
          take: TAKE_SEARCHED_PRODUCTS
        })
        .then((response) => {
          this.searchedItems = response.data && response.data.results && response.data.results.data
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.searchedItems = []
        })
        this.wantedItems = this.wantedItems
          .filter(o => 
            o.product.name
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
              || 
            o.product.sku
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          );
      } else {
        this.getWantItems()
        this.searchedItems = []
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.bg-white-5
  background: $color-white-5 !important

.delete-multiple
  @include body-9-normal
  font-family: $font-family-sf-pro-display
  color: $color-gray-4,
  margin-left: 4px

.tap-to-delete
  @include body-9-normal
  text-align: center
  color: $color-gray-77
  margin-bottom: 23px

.cancel-button
  @include body-10-medium
  border: 1px solid $color-gray-76
  border-radius: 20px
  color: $color-gray-76
  height: 35px

.delete-button-mobile
  @include body-10-medium
  border-radius: 20px
  background: $color-blue-20
  color: $color-white-1
  height: 35px

.wants-container
  background: $white-11

.wants-main-container
  padding-left: 15px
  padding-right: 15px
  background-color: $color-white-1
  margin-top: -10px
  @media (min-width: 576px)
    background-color: $color-white-5
    margin-top: 0
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
  @include body-13-normal
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-gray-5
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
  font-weight: 500
  color: $color-gray-5

.wanted-items-container
  padding-bottom: 34px
  padding-top: 36px
  @media (min-width: 992px)
    padding-left: 10px
    padding-right: 10px
  border-radius: 3px

.content-container
  border-radius: 3px
  padding-top: 40px

.filter-label
  @include body-8-normal
  font-family: $font-family-sf-pro-display
  font-style: normal
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
  @include body-6-medium
  font-family: $font-family-montserrat

.navigation-item-active
  background-color: $color-white-1
  border-radius: 14.5px

.create-combination
  @include body-4-normal
  font-family: $font-family-sf-pro-display
  color: $color-gray-5

.add-new-item
  color: $color-blue-1
  padding-bottom: 2px
  @media (min-width: 576px)
    border-bottom: 2px solid $color-blue-1

.button-delete-multiple
  @include body-5
  border: 1px solid $color-blue-20
  background: $white-11
  color: $color-gray-5
  font-family: $font-family-montserrat
  display: flex
  justify-content: center
  align-items: center
  border-radius: 4px
  height: 46px
  @media (min-width: 992px)
    width: 156px

.bulk-wrapper
  position: relative
  top: 18px

.button-filter
  @include body-4-normal
  background: $color-blue-20
  border-radius: 5px
  font-family: $font-family-sf-pro-display
  color: $color-white-1
  display: flex
  justify-content: center
  align-items: center
  height: 46px
  @media (min-width: 992px)
    height: 38px
    width: 86px

.border-3
  border-radius: 3px

</style>