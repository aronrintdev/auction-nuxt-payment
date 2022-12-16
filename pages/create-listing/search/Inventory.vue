<template>
  <b-container fluid class="position-relative container-auction-search h-100" >
    <div class="d-none d-sm-flex justify-content-between align-items-center">
      <h2 class="title">{{ selectedAuctionTypeTitle }}</h2>
    </div>
    <div class="d-none d-sm-flex justify-content-between align-items-center searchbar">
      <div class="position-relative w-100">
        <SearchInput
          :value="searchText"
          :placeholder="$t('inventory.search_placeholder')"
          class="flex-grow-1 mr-3"
          :class="{'show-results': !inventories.length && inventoryProducts.length > 0}"
          :debounce="1000"
          inputHeight="46px"
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
      <Button class="btn-file">
        <b-img :src="require('~/assets/img/bx_upload.svg')" class="mr-3" />
        <span>{{ $t('create_listing.search.bulk_file') }}</span>
      </Button>
    </div>
    <!-- Mobile search box -->
    <inventory-listing-filters :isCollection="selectedAuctionType === AUCTION_TYPE_COLLECTION"></inventory-listing-filters>
    <div class="inventories-wrapper">

      <div class="d-flex flex-row flex-md-column justify-content-between align-items-center align-items-md-start">
        <h2 class="inventories-wrapper-title">{{ $t('selling_page.inventory') }} ({{ totalCount }})</h2>
        <h6 v-if="selectedAuctionType===AUCTION_TYPE_COLLECTION" class="title d-none d-md-block">{{ $t('create_listing.collection.subtitle') }}</h6>
        <h6 v-else class="title d-none d-md-block">{{ $t('create_listing.search.description') }}</h6>
      </div>

      <div class="d-none d-md-flex justify-content-between align-items-end">
        <div class="d-flex align-items-end">
          <div>
            <div class="form-label">{{ $t('common.filter_by') }}</div>
            <CustomDropdown
              v-model="categorySelect"
              :options="CATEGORIES"
              type="single-select"
              :label="categoryFilterLabel"
              class="categories-selector"
              optionsWidth="custom"
              width="156px"
              dropDownHeight="38px"
              :dropdownStyle="{ 
                borderRadius: '0 0 4px 4px'
              }"
              borderRadiusClose="4px 4px 0 0"
              variant="white"
              borderRadius="4px"
              borderRadiusOptions="4"
              @change="handleCategorySelect"
            />
          </div>

          <SelectWithCheckbox
            class="sizetype-select-box dropdown-filters"
            inputClass="w-100"
            :default="sizeTypeSelect"
            :options="SIZE_TYPES"
            :title="$t('auctions.frontpage.filterbar.size_type')"
            :updateFilters="activeSizeTypeFilters"
            @filters="typeFilters"
          />

          <SelectWithCheckbox
            class="size-select-box dropdown-filters"
            inputClass="w-100"
            :default="sizeSelect"
            :options="SIZES"
            :title="$t('heatcheck.size')"
            :updateFilters="activeSizeFilters"
            @filters="sizeFilters"
          />
          <Button
            variant="primary"
            class="btn-filter px-2"
            @click="getInventories"
          >
            {{ $tc('common.filter', 1) }}
          </Button>
        </div>
        <FormDropdown
          id="sort-by"
          :value="sortBy"
          :placeholder="$t('auctions.frontpage.filterbar.sortby.placeholder')"
          :items="SORTBY"
          :icon="require('~/assets/img/icons/three-lines.svg')"
          :icon-arrow-down="
            require('~/assets/img/icons/arrow-down-black.svg')
          "
          class="dropdown-filters sort-by"
          can-clear
          @select="handleSortBySelect"
        />
      </div>
      <div class="d-flex mt-3 align-items-center filter-row">
        <b-badge
          v-if="categorySelect"
          class=" filter-badge px-2 rounded-pill py-1 mr-2 font-weight-light text-capitalize"
        >
          {{ categoryFilterLabel }}
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
          {{ $tc('common.size', 1) }}: {{ size.text }}
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


      <div v-if="loading" class="d-flex justify-content-center align-items-center h-25">
        <b-spinner
          :label="`${$t('login.loading')}...`"
          variant="primary"
          type="grow"
        ></b-spinner>
      </div>

      <div class="bg-white inventory-card-list">
        <b-row v-if="inventories.length === 0 && !loading" class="pt-md-5 d-flex justify-content-center align-items-center mx-auto w-50 text-center no-items-found">
          {{ $t('create_listing.no_items_found') }}
        </b-row>
        <div v-else class="d-flex flex-wrap">
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
              @select="selectItem"
              @add="addItem"
            />
          </b-col>
        </div>

        <template v-if="!isMobileSize">
          <Pagination
            v-if="inventories.length > 0"
            v-model="page"
            :total="totalCount"
            :per-page="perPage"
            :per-page-options="perPageOptions"
            class="mt-2 pb-3"
            @page-click="handlePageClick"
            @per-page-change="handlePerPageChange"
          />
        </template>
        <template v-else>
          <infinite-loading :key="`${totalCount}-${sortBy}`" :identifier="infiniteId" @infinite="handleLoading">
            <div slot="no-more" class="text-center"><div class="no-more-bar my-5 mx-auto"></div></div>
          </infinite-loading>
        </template>
      </div>
      <div v-if="selectedAuctionType === AUCTION_TYPE_COLLECTION" class="mt-md-4 collection-items-preview">
        <PreviewDragAndDrop :inventories="selectedInventoryItems" :hide-info="onPreview"
                            @next="handleBulkAction()" @removed="(index) => selected.splice(index, 1)" @dragged="addItem"/>
      </div>
      <BulkSelectToolbar
        v-if="selectedAuctionType === AUCTION_TYPE_SINGLE"
        ref="bulkSelectToolbar"
        :active="selected.length>0"
        :selected="selected"
        :unit-label="$tc('common.item', selected.length)"
        :total="inventories.length"
        :action-label="$tc('sell.create_listing.continue_listing')"
        class="d-none d-md-flex"
        @close="selected = []"
        @selectAll="handleSelectAll()"
        @deselectAll="selected = []"
        @submit="handleBulkAction()"
      />
      <div v-if="selectedAuctionType === AUCTION_TYPE_SINGLE && selected.length" class="d-md-none position-fixed continue-btn-container">
        <button class='btn text-white d-flex align-items-center justify-content-center text-white m-auto' @click="handleBulkAction">
          {{ $t('create_listing.continue') }} ({{ selected.length }})
        </button>
      </div>
    </div>
  </b-container>
</template>
<script>
/* eslint-disable vue/no-unused-components */
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
import {MAX_AUCTION_ITEM_COUNT, PER_PAGE_COLLECTION, PER_PAGE_SINGLE} from '~/static/constants/create-listing';
import longArrowRightIcon from '~/assets/img/icons/long-arrow-right.svg'
import InventoryListingFilters from '~/components/createListing/InventoryListingFilters'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'SearchForCategoryPage',
  components: {
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
  mixins: [createListingAuction, screenSize],
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
      infiniteId: +new Date(),
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
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
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
          name: null,
          type: AUCTION_TYPE_COLLECTION,
          ...this.selectedAuctionItems[0],
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
        sizes: this.activeSizeFilters.map(a => a.value),
        size_types: this.activeSizeTypeFilters.map(a => a.value),
        sort_by: this.sortBy,
        available_only: 1,
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
      this.categoryFilterLabel = this.$t('trades.create_listing.vendor.wants.category');
      this.getInventories()
    },
    clearAllFilters() {
      this.categorySelect = null;
      this.categoryFilterLabel = this.$t('trades.create_listing.vendor.wants.category');
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
      if (item !== this.categorySelect) {
        this.categorySelect = item
      } else if (this.categorySelect !== null) {
        this.categorySelect = null
      }
      const categoryFilteredKey = this.CATEGORIES.find(item => item.value === this.categorySelect)
      if (categoryFilteredKey) {
        this.categoryFilterLabel = this.$options.filters.capitalizeFirstLetter(categoryFilteredKey.text)
      }
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
    },
    handleLoading($state) {
      this.loading = true
      const params = {
        search: this.searchText,
        page: this.page,
        per_page: this.perPage,
        category: this.categorySelect,
        sizes: this.activeSizeFilters.map(a => a.value),
        size_types: this.activeSizeTypeFilters.map(a => a.value),
        sort_by: this.sortBy,
        available_only: 1,
      }
      this.fetchPublicInventories(params).then((res) => {
        this.totalCount = parseInt(res.total)
        this.loading = false
        if (this.totalCount <= this.inventories.length) {
          $state.complete()
        }
        if (this.page === 1) {
          this.inventories = res.data
        } else {
          this.inventories = [...this.inventories, ...res.data]
        }
        this.page = this.page + 1
        $state.loaded()
      }).catch(() => {
        this.loading = false
        this.totalCount = 0
        $state.loaded()
      })
    },
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
  padding: 36px 30px 0
  background-color: $color-white-5

  h2.title
    font-weight: $bold
    @include body-1
    color: $black
    margin-bottom: 0

    @media (max-width: 576px)
      font-size: 14px
      line-height: 17px
  
  .searchbar
    margin: 43px 0 40px

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

  .add-inventory-btn
    font-family: $font-family-sf-pro-display
    font-weight: $regular
    font-size: 14px
    line-height: 17px
    color: $color-gray-5

  .inventory-card
    flex: 0 0 50%
    max-width: 50%
    padding: 0 7.5px 7.5px

    @media (min-width: 992px)
      flex: 0 0 33.33%
      max-width: 33.33%
      padding: 0 18px 18px

    @media (min-width: 1400px)
      flex: 0 0 25%
      max-width: 25%
      padding: 0 18px 18px
    @media (min-width: 1800px)
      flex: 0 0 25%
      max-width: 25%
      padding: 0 18px 18px
  .continue-btn-container 
    bottom: 94px
    padding: 18px 16px
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
    margin-right: 20px
    &.open
      .label-wrapper
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
    .label-wrapper 
      border-radius: 4px
      padding: 0 10px
      label
        font-family: $font-montserrat
        font-weight: $regular
        @include body-5
        color: $color-gray-5
        padding: 7px 10px
      .fa
        color: $black
        font-size: 20px
        padding-top: 3px
        padding: 0
        margin-right: -4px
        transform: translateY(-2px)
    ul.custom-dropdown-options
      margin-top: 0
      border-top: 0
      border-bottom-left-radius: 4px
      border-bottom-right-radius: 4px
      li
        padding: 5px 10px
        color: $black

  .inventory-card-list
    margin: 21px -18px
    @media (max-width: 576px)
      margin: 0 -7.5px
  .collection-items-preview::v-deep
    @media (max-width: 576px)
      position: fixed
      bottom: 94px
      left: 0
      width: 100%
      background: $white
      z-index: 10
      .preview-container
        margin: 0 16px
      .simple-content
        @include body-5-normal
        border: 0.5px solid rgba($light-gray-2, 0.5)
        border-radius: 5px
        background: $white
        padding: 8px 5px
        height: auto
        margin-top: 10px
      .expand-btn
        bottom: 76px
        right: 24px
      .preview-drag
        background: $white
        border: 0.5px solid rgba($light-gray-2, 0.5)
        box-shadow: none
        margin: 0
        border-radius: 5px
        padding: 13px 5px 17px
        &.no-items
          border: none
          padding: 0
        .inventory-card
          flex: 0 0 98px
          max-width: 98px
          margin: 0 6px
          padding: 0
          .inventory-card-wrapper
            .product-info
              padding: 0
              background-size: 70%
              .product-image
                padding: 30px 10px 20px
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
                  top: 2px
                  right: 4px
                  img
                    width: 11px
                    height: 11px
              .product-detail
                padding: 5px 0
                .product-title,
                .product-color,
                .product-price
                  font-size: 11px
.no-more-bar
  width: 38px
  background: $black
  height: 3px
  border-radius: 5px

.search-input-wrapper::v-deep
  border-radius: 8px
  background: $white
  max-width: 688px
  img.icon-search
    margin-left: 21px
    width: 18px
    height: 18px
  input.search-input
    padding-left: 74px
    letter-spacing: 0.06em
    text-transform: capitalize
    color: $color-gray-5
    padding-right: 45px
.btn-file.btn
  background: $black
  border-radius: 4px
  padding: 8px
  white-space: nowrap
  border: 1px solid $black
  min-width: 179px
  height: 40px
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-13
  color: $white
  &:hover
    background-color: $color-black-10
    border-color: $color-black-10
.inventories-wrapper
  padding: 30px 21px 0
  background: $white
  @media (max-width: 576px)
    padding: 0
  &-title
    font-family: $font-sp-pro
    color: $black
    margin-bottom: 4px
    @include body-1
    font-weight: $bold
  h6.title
    font-family: $font-sp-pro
    font-weight: $regular
    @include body-12
    color: $color-gray-5
    margin-bottom: 19px
  .btn-filter
    font-family: $font-sp-pro
    font-weight: $normal
    @include body-13
    color: $white
    background-color: $color-blue-20
    border-color: $color-blue-20
    min-width: 86px
    &:hover
      background-color: $color-blue-20
      border-color: $color-blue-20
  .dropdown-filters.sort-by::v-deep
    border: none
    .fw-5
      font-family: $font-montserrat
      font-weight: $regular
      color: $color-gray-5
      @include body-5
    .btn-dropdown
      min-width: 203px
      padding: 0 9px 0 10px
      height: 38px
      border-radius: 4px
      border-color: $color-gray-60

  ::v-deep
    .custom-control-input:checked
      ~ .custom-control-label::before
        color: $white
        border-radius: 0px
        background-color: $color-blue-20
        box-shadow: none
        border: 1px solid $color-blue-20

    .custom-control-input
      ~ .custom-control-label::before
        color: $white
        background-color: $white
        box-shadow: none
        border-radius: 0px
        top: 4px
        left: -20px
        width: 10px
        height: 10px
        border: 1px solid $color-gray-60
      ~ .custom-control-label::after
        left: -20px
  @media (max-width: 576px)
    margin-top: 0
    padding: 0
    &-title
      font-family: $font-montserrat
      font-weight: $bold
      @include body-5
      margin: 22px 0 5px

.dropdown-filters::v-deep
  height: 38px
  border: none
  .selected
    height: 38px
    border: 1px solid $color-gray-60
    padding: 9px 9px 9px 10px
    &.open
      border: 1px solid $color-gray-60
      border-bottom: none
      &::after
        top: 2px
    &::after
      top: 2px
      right: 25px
  .items
    padding: 0
    overflow: auto
    border: 1px solid $color-gray-60
    .filter-select-count
      padding: 10px !important
    .item-wrapper
      border: none
      & > div
        border: none
        border-bottom: 1px solid $color-gray-60
      .d-flex
        font-weight: $regular
        @include body-5
        color: $black
        border: none
        padding: 9px 10px !important
        .custom-checkbox
          min-height: 18px
          line-height: 18px
          margin-left: 20px !important
  .btn-dropdown
    display: flex
    justify-content: space-between
    color: $color-gray-5
    border-radius: 6px
    height: 46px
    padding: 0 23px

    &.opened
      border-bottom: none

  .search-results
    .popover-body
      > div
        font-family: $font-family-base
        color: $color-black-1
        height: auto
        border: 1px solid $color-gray-58
        padding: 0 23px

        &:hover
          color: $white

        &:last-child
          border-bottom-left-radius: 6px
          border-bottom-right-radius: 6px

        &:first-child
          border-top: none

      .active
        color: $white
        margin: 0 -24px
        background-color: $color-blue-20
        border-radius: 0
      .dropdownItem
        height: 38px
        &:hover
          color: $white
          margin: 0 -24px
          background-color: $color-blue-20
          border-radius: 0
.form-label
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-8
  color: $black
  margin-bottom: 5px
.sizetype-select-box
  width: 156px
  margin-right: 20px
.size-select-box
  width: 120px
  margin-right: 18px
</style>
