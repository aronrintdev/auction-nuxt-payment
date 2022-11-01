<template>
  <b-container fluid class="position-relative container-auction-search h-100" >
    <div class="d-none d-md-flex justify-content-between align-items-center">
      <h2 class="title">{{ selectedAuctionTypeTitle }}</h2>
      <div v-if="selectedAuctionType === AUCTION_TYPE_COLLECTION">
        <FormStepper :steps="steps" :selected="getCollectionState"/>
      </div>
    </div>
    <div class="d-none d-md-flex justify-content-between mt-3 align-items-start">
      <div class="position-relative w-100">
        <SearchInput
          :value="searchText"
          :placeholder="$t('inventory.search_placeholder')"
          class="flex-grow-1 mr-5"
          :class="{'show-results': !inventories.length && inventoryProducts.length > 0}"
          :debounce="1000"
          bordered
          @change="onSearchProduct"
        />
        <!-- Show product search result -->
        <div v-if="!inventories.length && inventoryProducts.length > 0" class="flex-grow-1 product-search-results mr-5">
          <div v-for="product in inventoryProducts" :key="product.id" class="w-100 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center px-3">
              <ProductThumb :product="product" width="60" height="60" />
              <span class="pl-3 body-4-normal">{{ product.name }}</span>
            </div>
            <div
              class="d-flex align-items-center add-product-btn px-3"
              role="button"
              @click="addAuctionFromProduct(product)"
            >
              <span class="body-4-normal px-2">{{ $t('create_listing.search.add_product') }}</span>
              <img :src="longArrowRightIcon" />
            </div>
          </div>
        </div>
      </div>
      <Button
        to="/profile/inventory/search"
        variant="primary"
        pill
        class="btn-add"
      >{{ $t('inventory.add_inventory') }}
      </Button>
    </div>
    <!-- Mobile search box -->
    <inventory-listing-filters :isCollection="selectedAuctionType === AUCTION_TYPE_COLLECTION"></inventory-listing-filters>
    <div class="d-none d-md-flex justify-content-between mt-3 align-items-center">
      <div class="d-flex justify-content-between align-items-center">

        <CustomDropdown
          v-model="categorySelect"
          :options="CATEGORIES"
          type="single-select"
          :label="categoryFilterLabel"
          class="categories-selector mr-4"
          optionsWidth="custom"
          width="150px"
          dropDownHeight="38px"
          variant="white"
          borderRadius="4"
          borderRadiusClose="4"
          borderRadiusOptions="4"
          @change="handleCategorySelect"
        />

        <SelectWithCheckbox
          class="mr-4 size-select-box"
          :default="sizeTypeSelect"
          :options="SIZE_TYPES"
          :title="$t('auctions.frontpage.filterbar.size_type')"
          :updateFilters="activeSizeTypeFilters"
          @filters="typeFilters"
        />

        <SelectWithCheckbox
          class="mr-4 size-select-box"
          :default="sizeSelect"
          :options="SIZES"
          :title="$t('heatcheck.size')"
          :updateFilters="activeSizeFilters"
          @filters="sizeFilters"
        />

        <Button
          variant="primary"
          class="btn-add px-2"
          @click="getInventories"
        >{{ $t('common.filter') }}
        </Button>
      </div>
      <div>
        <FormDropdown
          id="sort-by"
          :value="sortBy"
          :placeholder="$t('auctions.frontpage.filterbar.sortby.placeholder')"
          :items="SORTBY"
          :icon="require('~/assets/img/icons/three-lines.svg')"
          :icon-arrow-down="
            require('~/assets/img/icons/arrow-down-black.svg')
          "
          class="dropdown-sort"
          can-clear
          @select="handleSortBySelect"
        />
      </div>
    </div>
    <div class="d-flex mt-3 align-items-center filter-row">
      <b-badge
        v-if="categorySelect"
        class=" filter-badge px-2 rounded-pill py-1 mr-2 font-weight-light text-capitalize"
      >
        {{ categoryLabel }}
        <i
          class="fa fa-times"
          role="button"
          aria-hidden="true"
          @click="removeCategoryFilter"
        ></i>
      </b-badge>
      <b-badge
        v-for="(type, typeIndex) in activeSizeTypeFilters"
        :key="`type-${typeIndex}`"
        class=" filter-badge px-2 rounded-pill py-1 mr-2 font-weight-light"
      >
        {{ type.text }}
        <i
          class="fa fa-times"
          role="button"
          aria-hidden="true"
          @click="removeSizeTypeFilter(type)"
        ></i>
      </b-badge>
      <b-badge
        v-for="(size, sizeIndex) in activeSizeFilters"
        :key="`size-${sizeIndex}`"
        class=" filter-badge px-2 rounded-pill py-1 mr-2 font-weight-light"
      >
        {{ $t('common.size') }}: {{ size.text }}
        <i
          class="fa fa-times"
          role="button"
          aria-hidden="true"
          @click="removeSizeFilter(size)"
        ></i>
      </b-badge>
      <span
        v-if="haveFilters"
        role="button"
        class="justify-content-center d-flex text-primary"
        @click="clearAllFilters()"
      >
              <u>{{ $t('vendor_purchase.clear_all_filters') }}</u>
            </span>
    </div>

    <div class="d-flex flex-row flex-md-column justify-content-between align-items-center align-items-md-start mt-2">
      <h2 class="title">{{ $t('selling_page.inventory') }} ({{ totalCount }} {{$t('common.results')}})</h2>
      <h6 v-if="selectedAuctionType===AUCTION_TYPE_COLLECTION" class="title d-none d-md-block">{{ $t('create_listing.collection.subtitle') }}</h6>
      <!-- <span class="d-md-none add-inventory-btn" role="button" @click="$router.push('/profile/inventory/search')">+ Create New Inventory</span> -->
    </div>


    <div v-if="loading" class="d-flex justify-content-center align-items-center h-25">
      <b-spinner
        :label="`${$t('login.loading')}...`"
        variant="primary"
        type="grow"
      ></b-spinner>
    </div>

    <div v-else class="bg-white pb-md-5 inventory-card-list">
      <b-row v-if="inventories.length === 0 && !loading" class="d-flex justify-content-center align-items-center mx-auto w-50 text-center no-items-found">
        {{ $t('create_listing.no_items_found') }}
      </b-row>
      <b-row v-else class="mt-3 mx-auto">
          <b-col
            v-for="inventory in inventories"
            :key="`inventory-${inventory.id}`"
            class="inventory-card "
            :draggable="selectedAuctionType === AUCTION_TYPE_COLLECTION"
            @dragstart="(evt) => dragStart(evt, inventory)"
          >
            <InventoryCard
              :inventory="inventory"
              :is-actions-visible="false"
              :addable="selectedAuctionType === AUCTION_TYPE_COLLECTION"
              :selectable="selectedAuctionType === AUCTION_TYPE_SINGLE"
              :stock-visible="false"
              :selected="!!selected.find((id) => id === inventory.id)"
              class="my-3"
              @select="selectItem"
              @add="addItem"
            />
          </b-col>
      </b-row>

      <Pagination
        v-if="inventories.length > 0"
        v-model="page"
        :total="totalCount"
        :per-page="perPage"
        :per-page-options="perPageOptions"
        class="mt-2"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </div>
    <div v-if="selectedAuctionType === AUCTION_TYPE_COLLECTION" class="mt-md-4 mx-md-5 px-2 collection-items-preview">
      <PreviewDragAndDrop :inventories="selectedInventoryItems" :hide-info="onPreview"
                          @next="handleBulkAction()" @removed="(index) => selected.splice(index, 1)" @dragged="addItem"/>
    </div>
    <BulkSelectToolbar
      v-if="selectedAuctionType === AUCTION_TYPE_SINGLE"
      ref="bulkSelectToolbar"
      :active="selected.length>0"
      :selected="selected"
      :unit-label="$tc('common.product', selected.length)"
      :total="inventories.length"
      :action-label="$tc('sell.create_listing.continue_listing')"
      class="d-none d-md-flex mt-3"
      @close="selected = []"
      @selectAll="handleSelectAll()"
      @deselectAll="selected = []"
      @submit="handleBulkAction()"
    />
    <div v-if="selectedAuctionType === AUCTION_TYPE_SINGLE && selected.length" class="d-md-none position-fixed continue-btn-container p-4">
      <button class='btn text-white d-flex align-items-center justify-content-center text-white m-auto' @click="handleBulkAction">
        {{ $t('create_listing.continue') }} ({{ selected.length }})
      </button>
    </div>
  </b-container>
</template>
<script>
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'
import SearchInput from '~/components/common/SearchInput.vue'
import {Button, FormDropdown, Pagination, BulkSelectToolbar } from '~/components/common'
import CustomDropdown from '~/components/common/CustomDropdown'
import InventoryCard from '~/components/inventory/Card'
import SelectWithCheckbox from '~/components/common/CustomSelectwithCheckbox.vue'
import {SNEAKER_SIZES,AUCTION_TYPE_COLLECTION, AUCTION_TYPE_SINGLE, AUCTIONS_PER_PAGE_OPTIONS, DEFAULT_PER_PAGE_OPTION} from '~/static/constants';
import createListingAuction from '~/plugins/mixins/create-listing-auction';
import PreviewDragAndDrop from '~/components/createListing/PreviewDragAndDrop';
import FormStepper from '~/components/createListing/FormStepper';
import {MAX_AUCTION_ITEM_COUNT, PER_PAGE_COLLECTION, PER_PAGE_SINGLE} from '~/static/constants/create-listing';
import longArrowRightIcon from '~/assets/img/icons/long-arrow-right.svg'
import InventoryListingFilters from '~/components/createListing/InventoryListingFilters'

export default {
  name: 'SearchForCategoryPage',
  components: {
    FormStepper,
    PreviewDragAndDrop,
    SearchInput,
    InventoryCard,
    Button,
    FormDropdown,
    SelectWithCheckbox,
    Pagination,
    BulkSelectToolbar,
    InventoryListingFilters,
    CustomDropdown,
  },
  mixins: [createListingAuction],
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      onPreview: false,
      page: 1,
      perPage: DEFAULT_PER_PAGE_OPTION,
      totalCount: 0,
      loading: false,
      perPageOptions: AUCTIONS_PER_PAGE_OPTIONS,
      selected: [],
      inventories: [],
      activeSizeTypeFilters: [],
      sizeTypeFilter: [],
      activeSizeFilters: [],
      sizeFilter: [],
      productsFilter: 'most_viewed',
      searchText: null,
      hasSearchResult: false,
      categorySelect: null,
      sizeTypeSelect: null,
      sizeSelect: null,
      sortBy: null,
      products: [],
      CATEGORIES: [
        {
          text: this.$t('common.footwear'),
          value: 'sneakers',
        },
        {
          text: this.$t('common.apparel'),
          value: 'apparel',
        },
        {
          text: this.$tc('common.accessory', 2),
          value: 'accessories',
        },
      ],
      SIZES: SNEAKER_SIZES.map(a => {
        return {
          text: a,
          value: a,
        }
      }) || [],
      SIZE_TYPES: [
        {
          text: this.$t('auctions.frontpage.filterbar.men'),
          value: 'men',
        },
        {
          text: this.$t('auctions.frontpage.filterbar.women'),
          value: 'women',
        },
        {
          text: this.$t('auctions.frontpage.filterbar.unisex'),
          value: 'unisex',
        },
        {
          text: this.$t('auctions.frontpage.filterbar.child'),
          value: 'child',
        },
        {
          text: this.$t('auctions.frontpage.filterbar.toddler'),
          value: 'toddler',
        },
      ],
      SORTBY: [
        {
          label: this.$t('create_listing.auction.sort_by.price_low_high'),
          value: 'price_asc',
        },
        {
          label: this.$t('create_listing.auction.sort_by.price_high_low'),
          value: 'price_desc',
        },
        {
          label: this.$t('create_listing.auction.sort_by.size_low_high'),
          value: 'size_asc',
        },
        {
          label: this.$t('create_listing.auction.sort_by.size_high_low'),
          value: 'size_desc',
        }
      ],
      inventoryProducts: [],
      AUCTION_TYPE_SINGLE,
      AUCTION_TYPE_COLLECTION,
      longArrowRightIcon,
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
    }
  },
  computed: {
    ...mapGetters({
      selectedProducts: 'create-listing/getSelectedInventoryProducts',
    }),
    categoryLabel() {
      return this.CATEGORIES.filter(a => a.value === this.categorySelect)[0].label
    },
    selectedInventoryItems() {
      return this.selectedAuctionItems[0]?.items || []
    },
    haveFilters() {
      return this.categorySelect || this.activeSizeTypeFilters.length > 0 || this.activeSizeFilters.length > 0
    },
    editItem() {
      return this.$store.state['create-listing'].editItem
    },
    stateParams() {
      return this.$store.state['create-listing'].singleItemFilters
    },
    selectedAuctionItems() {
      return _.cloneDeep(this.$store.state['create-listing'].auctionItems)
    },
    selectedAuctionType() {
      return this.$store.state['create-listing'].auctionType
    },
    isDraggable(){
      return this.selectedAuctionType === AUCTION_TYPE_COLLECTION
    },
    selectedAuctionTypeTitle() {
      return this.selectedAuctionType === AUCTION_TYPE_SINGLE ? this.$t('create_listing.search.title') : this.$t('create_listing.collection.title')
    },
  },
  watch: {
    selected(val) {
      const auctionItems = []
      if (this.selectedAuctionType === AUCTION_TYPE_SINGLE) {
        val.map(a => {
          const item = this.selectedProducts.filter(z => z.id === a)[0]
          if (item) {
            const savedAuctionInfo = this.selectedAuctionItems.find(it => it.items[0].inventory_id === a)
            auctionItems.push({
              id: this.randomStringId(),
              time_limit: null,
              start_bid_price: null,
              status: 'live',
              is_reserved: false,
              reserve_price: null,
              scheduled_date: null,
              type: AUCTION_TYPE_SINGLE,
              name: null,
              items: [{
                id: this.randomStringId(),
                inventory_id: item.id,
                quantity: 1
              }],
              item,
              ...savedAuctionInfo,
            })
          }
          return a
        })
      } else {
        auctionItems.push({
          id: this.randomStringId(),
          time_limit: null,
          start_bid_price: null,
          status: 'live',
          is_reserved: false,
          reserve_price: null,
          scheduled_date: null,
          type: AUCTION_TYPE_COLLECTION,
          name: null,
          items: [],
        })
        this.selected.map(a => {
          const item = this.selectedProducts.filter(z => z.id === a)[0]
          if (item) {
            auctionItems[0].items.push({
              id: this.randomStringId(),
              inventory_id: item.id,
              quantity: 1,
              item
            })
          }

          return a
        })

      }
      this.$store.commit('create-listing/setAuctionItems', auctionItems)
    }
  },
  mounted() {
    this.perPage = this.selectedAuctionType === AUCTION_TYPE_SINGLE? PER_PAGE_SINGLE:PER_PAGE_COLLECTION
    this.getInventories()
  },
  methods: {
    ...mapActions({
      fetchPublicInventories: 'create-listing/fetchPublicInventories',
    }),
    dragStart(ev, inv){
      ev.dataTransfer.setData('item', JSON.stringify(inv));
    },
    moveItem(evt){
      this.onPreview = evt.to.id === 'previewDraggable';
    },
    endItem(evt){
      this.onPreview = false
    },
    handleBulkAction() {
      if (this.selectedAuctionType === AUCTION_TYPE_SINGLE) {
        this.$router.push({
          name: 'create-listing-confirm'
        })
      } else {
        this.$router.push({
          path: '/create-listing/confirm/collection'
        })
      }
    },
    handleSelectAll() {
      this.selected = this.inventories.map(a => a.id)
    },
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.getInventories()
      }
    },
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.getInventories()
      }
    },
    removeSizeFilter(size) {
      this.activeSizeFilters = this.activeSizeFilters.filter(item => item.value !== size.value)
      this.sizeFilter = this.sizeFilter.filter(item => item.value !== size.value)
      this.$nextTick(() => this.getInventories())
    },
    removeSizeTypeFilter(type) {
      this.sizeTypeFilter = this.sizeTypeFilter.filter(item => item.value !== type.value)
      this.activeSizeTypeFilters = this.activeSizeTypeFilters.filter(item => item.value !== type.value)
      this.getInventories()
    },
    getInventories() {
      this.loading = true
      let params = {
        search: this.searchText,
        page: this.page,
        per_page: this.perPage,
        category: this.categorySelect,
        type: this.type,
        sizes: this.activeSizeFilters.map(a => a.value),
        size_types: this.activeSizeTypeFilters.map(a => a.value),
        sort_by: this.sortBy
      }

      // if edit item selected we need use previous search in order to show that item
      if (this.editItem) {
        params = this.stateParams
        this.$store.commit('create-listing/setEditItem', null)
      }
      this.$store.commit('create-listing/setSingleItemFilters', params)
      this.fetchPublicInventories(params).then((res) => {
        this.inventories = res.data
        this.totalCount = parseInt(res.total)
        this.perPage = parseInt(res.per_page)
        this.loading = false

        if (this.selectedAuctionItems.length > 0) {
          if (this.selectedAuctionType === AUCTION_TYPE_SINGLE) {
            this.selected = this.selectedAuctionItems.map(a => a.item.id)
          } else {
            this.selected = this.selectedAuctionItems[0].items.map(a => a.inventory_id)
          }
        }

        // if no inventories, try to find products
        if (res.data.length === 0) {
          this.$axios.get('/products', {
            params: {
              search: this.searchText,
            }
          }).then((res) => {
            this.inventoryProducts = res.data
          })
        }
      })
    },
    selectItem(id, event) {
      if (event.target.checked) {
        this.selected.push(id)
        this.$store.commit('create-listing/addSelectedInventoryProducts', this.inventories.filter(a => a.id === id)[0])
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },
    addItem(id) {
      if (this.selected.length === MAX_AUCTION_ITEM_COUNT) {
        this.$toasted.error(this.$t('create_listing.collection.max_count') + MAX_AUCTION_ITEM_COUNT)
      } else {
        this.selected.push(id)
        this.$store.commit('create-listing/addSelectedInventoryProducts', this.inventories.filter(a => a.id === id)[0])
      }
    },
    removeCategoryFilter() {
      this.categorySelect = null;
      this.getInventories()
    },
    clearAllFilters() {
      this.categorySelect = null;
      this.activeSizeTypeFilters = []
      this.activeSizeFilters = []
      this.sizeFilter = []
      this.sizeTypeFilter = []
      this.page = 1
      this.getInventories()
    },
    handleSortBySelect(item) {
      if (item && item.value !== this.sortBy) {
        this.sortBy = item.value
        this.page = 1
        this.getInventories()
      } else if (this.sortBy !== null) {
        this.sortBy = null
        this.page = 1
        this.getInventories()
      }
    },
    handleCategorySelect(item) {
      if (item && item.value !== this.sortBy) {
        this.categorySelect = item.value
      } else if (this.categorySelect !== null) {
        this.categorySelect = null
      }
      const categoryFilteredKey = this.CATEGORIES.find(item => item.value === this.categorySelect)
      this.categoryFilterLabel = this.$options.filters.capitalizeFirstLetter(categoryFilteredKey.text)
    },
    typeFilters({array, value}) {
      this.activeTypeFilters = array
      // For backend
      if (this.sizeTypeFilter.includes(value)) {
        this.sizeTypeFilter.splice(this.sizeTypeFilter.indexOf(value), 1)
      } else {
        this.sizeTypeFilter.push(value)
      }
    },
    sizeFilters({array, value}) {
      this.activeFilters = array
      // For backend
      if (this.sizeFilter.includes(value)) {
        this.sizeFilter.splice(this.sizeFilter.indexOf(value), 1)
      } else {
        this.sizeFilter.push(value)
      }
    },
    handleFilterChanged(filter) {
      this.productsFilter = filter
    },
    // Search product
    onSearchProduct(term) {
      this.searchText = term
      this.getInventories()
    },

    // Products dropdown "Click" event listener
    selectProduct(sku) {
      const index = this.products.findIndex((p) => p.sku === sku)
      this.product = this.products[index]
      this.hasSearchResult = false
      const {listing, type} = this.$route.query
      this.$router.push(`/create-listing/${listing}/${type}`)
      // Save selected product in session storage
      window.sessionStorage.setItem(
        'create-listing-product',
        JSON.stringify(this.product)
      )
    },

    // Add new auction from product
    addAuctionFromProduct(product) {
      this.$store.commit('create-listing/setActiveInventoryProduct', product)
      if (this.selectedAuctionType === AUCTION_TYPE_COLLECTION) {
        this.$router.push('/create-listing/product/collection/inventory')
      } else {
        this.$router.push('/create-listing/product/inventory')
      }
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'


.dropdown-container-sort-by
  min-width: 200px

.filter-badge
  background: $color-blue-10
  color: $color-blue-2

  i
    &:before
      color: white
      border-radius: 42px
      padding: 0 2.5px
      background: $color-blue-2

.container-auction-search
  padding: 47px 54px
  background-color: $color-white-4

  h2.title
    @include heading-3
    color: $color-black-1
    font-weight: $bold

    @media (max-width: 576px)
      font-size: 14px
      line-height: 17px
      margin-bottom: 0

  .btn-draft::v-deep
    @include body-5-bold
    color: $color-gray-4
    width: 168px
    display: flex
    justify-content: center

  .products-count
    @include body-3-medium
    color: $color-black-1

  .btn-add::v-deep
    @include body-4-medium
    height: 40px
    white-space: nowrap
    padding: 0 1em
    display: flex
    align-items: center
    justify-content: center

  .dropdown-actions::v-deep
    .btn-dropdown
      @include body-4-normal
      color: $color-blue-1
      border: 1px solid $color-blue-1
      border-radius: 34px
      height: 42px
      width: 168px
      justify-content: center

      &.opened
        border-top-left-radius: 10px
        border-top-right-radius: 10px
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

    .search-results
      .popover-body
        > div
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
  .no-items-found
    font-weight: $medium
    font-size: 16px
    line-height: 20px
    color: $color-gray-5
  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    min-height: calc(100vh - 130px)
    .no-items-found
      margin-top: 90px
      margin-bottom: 120px
      font-size: 14px
      line-height: 24px
  .dropdown-filters::v-deep
    .btn-dropdown
      @include body-4-normal
      color: $color-black-1
      border: 1px solid $color-white-1
      border-radius: 8px
      height: 46px
      width: 100%
      padding: 0 60px
      justify-content: start

      &.opened
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        border-bottom: 1px solid $color-gray-23

    .search-results
      .popover-body
        > div
          @include body-4-normal
          font-family: $font-family-base
          color: $color-black-1
          height: 46px
          border: 1px solid $color-white-1
          border-bottom: 1px solid $color-gray-23
          padding: 0 23px

          &:hover
            color: $color-gray-5

          &:last-child
            border-bottom-left-radius: 8px
            border-bottom-right-radius: 8px
            border-bottom: none

  .size-select-box
    min-width: 180px

  .add-inventory-btn
    font-family: $font-family-sf-pro-display
    font-weight: $regular
    font-size: 14px
    line-height: 17px
    color: $color-gray-5

  .inventory-card
    flex: 0 0 50%
    max-width: 50%
    padding: 0

    @media (min-width: 1280px)
      flex: 0 0 33.33%
      max-width: 33.33%

    @media (min-width: 1525px)
      flex: 0 0 25%
      max-width: 25%

    @media (min-width: 1800px)
      flex: 0 0 25%
      max-width: 25%
  .continue-btn-container 
    bottom: 98px
    left: 0
    width: 100%
    background: $white
    z-index: 10
    button
      border-radius: 30px
      background: $color-blue-20
      width: 215px
      font-family: $font-montserrat-serif
      font-weight: $medium
      font-size: 13px
      line-height: 16px
      padding-top: 12px
      padding-bottom: 12px

  .categories-selector::v-deep
    .label-wrapper 
      border-radius: 4px
      label
        padding: 7px 10px
      .fa
        color: $black
        font-size: 20px
        padding-top: 3px
        margin-right: 6px
    ul.custom-dropdown-options
      margin-top: -2px
      border-top: 0
      li
        padding: 5px 10px
        color: $black

  
  .inventory-card-wrapper::v-deep
    .checkbox-label
      top: 8px
      right: 8px
    .product-info
      background: transparent
      border: none
      .product-image
        .product-overlay
          background: rgba(200, 200, 200, 0.1)
      .product-detail
        .product-price
          color: $black
  .inventory-card-list
    @media (max-width: 576px)
      margin: 0 -6px
  .collection-items-preview::v-deep
    @media (max-width: 576px)
      position: fixed
      bottom: 98px
      left: 0
      width: 100%
      background: $white
      z-index: 10
      .simple-content
        @include body-5-normal
        border: 0.5px solid rgba($light-gray-2, 0.5)
        border-radius: 5px
        background: $white
        padding: 12px 10px 10px
        height: 42px
        margin-top: 10px
      .expand-btn
        bottom: 80px
        right: 20px
      .preview-drag
        background: $white
        border: 0.5px solid rgba($light-gray-2, 0.5)
        margin: 0
        border-radius: 5px
        padding: 10px 2.5px
        &.no-items
          border: none
          padding: 0
        .inventory-card-wrapper
          .product-info
            padding: 0
            .product-image
              padding: 0
              height: auto
              .thumb-wrapper
                height: 0
                padding-top: 100%
                width: 100% !important
                img
                  position: absolute
                  top: 0
                  left: 0
                  width: 100%
                  height: 100%
              .check-box
                width: 10px
                height: 10px
                top: 0
                img
                  width: 100%
            .product-detail
              padding: 5px 0
              .product-title,
              .product-color,
              .product-price
                font-size: 11px

.dropdown-sort::v-deep
  .btn-dropdown
    @include body-4-regular
    color: $color-gray-5
    border: 1px solid $color-gray-60
    background-color: $white
    border-radius: 4px
    height: 40px
    width: 200px
    padding: 0 8px 0 14px

    .icon-main
      margin-right: 15px
    .icon-default
      width: 12px
  .search-results
    border: 1px solid $light-gray-2
    margin-top: -2px
    border-top-left-radius: 0
    border-top-right-radius: 0
    background: $white
    .popover-body
      .dropdownItem
        @include body-5-normal
        font-family: $font-family-base
        color: $color-black-1
        padding: 0 23px
        max-height: unset
        height: 35px
        border: none
        border-bottom: 0.2px solid $light-gray-2
        color: $black
        background: $white
        &:hover
          color: $color-gray-5

        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px
          border: none
</style>
