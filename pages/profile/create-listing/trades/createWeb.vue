<template>
  <div>
    <create-trade-search-item v-if="search_item" :product="search_item" productFor="tradeOffer"/>
    <div v-else class="create-trade-bg">
      <b-row class="">
        <b-col md="6">
          <div  class="create-trade-heading">
            {{ $t('create_listing.trade.offer_items.offer') }}<sup>*</sup>
          </div>
          <div  class="create-trade-subheading mt-1">
            {{ $t('create_listing.trade.offer_items.offer_subheading') }}
          </div>
        </b-col>
      </b-row>
      <div>
        <b-row class="mt-4 justify-content-between align-items-center">
          <b-col md="7" xl="8" lg="8">
            <SearchInput
              :value="searchText"
              variant="primary"
              :placeholder="$t('create_listing.trade.offer_items.search_by')"
              :clearSearch="true"
              :inputStyle="{
                borderBottomLeftRadius: searchedItems.length > 0 && !isScreenXS ? 0 : '8px',
                borderBottomRightRadius: searchedItems.length > 0 && !isScreenXS ? 0 : '8px',
                letterSpacing: '0.06em'
              }"
              class="w-100"
              bordered
              inputHeight="60px"
              @change="onSearchInput"
            />
            <div class="position-relative">
              <SearchedProductsBelowSearchTextBox
                v-if="searchedItems.length > 0"
                :productItems="searchedItems"
                productsFor="tradeItem"
                class="position-absolute z-100"
                addBtnClass="text-right"
                :itemStyle="{
                  padding: 0
                }"
                :wrapperStyle="{
                  margin: 0
                }"
              />
            </div>
          </b-col>
          <b-col md="4" class="mt-2 mt-md-0 text-center d-flex justify-content-end">
            <Button
              class="flex-shrink-0 btn-file"
              @click="handleUploadCSVClick"
            ><b-img
              :src="require('~/assets/img/bx_upload.svg')"
               class="mr-2"
            /><span class="">{{ $t('inventory.upload_csv_bulk_file') }}</span></Button
            >
          </b-col>
        </b-row>
        <div class="inventory-section-module mt-5 mb-2 pb-5">
          <div class="available-invent-trade-heading">
            {{ $t('create_listing.trade.offer_items.available_inventory', {'0': totalCount}) }}
          </div>
          <b-row class="justify-content-between">
            <div class="col-12 col-xl-8 mt-4 d-flex flex-column">
              <span class="filter-by mb-1">{{ $t('create_listing.trade.offer_items.filter_by') }}</span>
              <div class="row">
                <client-only>
                  <div class="col-12 col-md-6 col-xl-3">
                    <CustomDropdown
                      v-model="categoryFilter"
                      :options="categoryItems"
                      type="single-select"
                      :label="categoryFilterLabel"
                      class=""
                      optionsWidth="custom"
                      paddingX="10px"
                      :arrowStyle="{
                        marginTop: '0 !important',
                        color: '#000'
                      }"
                      :dropdownStyle="{
                        border: '1px solid #CCC',
                        borderTop: 0,
                        borderRadius: '0 0 4px 4px'
                      }"
                      borderRadiusClose="4px 4px 0 0"
                      border-radius="4px"
                      dropDownHeight="38px"
                      variant="white"
                      @change="changeCategory"
                    />
                  </div>
                  <div class="mt-2 mt-md-0 col-12 col-md-6 col-xl-3">
                    <CustomDropdown
                      v-model="sizeTypesFilter"
                      :options="filters.size_types"
                      type="multi-select-checkbox"
                      :label="sizeTypesFilterLabel"
                      class=""
                      optionsWidth="custom"
                      dropDownHeight="38px"
                      variant="white"
                      :arrowStyle="{
                        marginTop: '0 !important',
                        color: '#000'
                      }"
                      :dropdownStyle="{
                        border: '1px solid #CCC',
                        borderTop: 0,
                        borderRadius: '0 0 4px 4px'
                      }"
                      borderRadiusClose="4px 4px 0 0"
                      padding-x="10px"
                      border-radius="4px"
                      @change="changeSizeTypeFilter"
                    />
                  </div>
                  <div class="mt-2 mt-xl-0 col-12 col-md-6 col-xl-3">
                    <CustomDropdown
                      v-model="sizeFilter"
                      :options="filters.sizes"
                      type="multi-select-checkbox"
                      :label="sizeFilterLabel"
                      class=""
                      optionsWidth="custom"
                      dropDownHeight="38px"
                      variant="white"
                      :dropdownStyle="{
                        border: '1px solid #CCC',
                        borderTop: 0,
                        borderRadius: '0 0 4px 4px'
                      }"
                      borderRadiusClose="4px 4px 0 0"
                      :arrowStyle="{
                        marginTop: '0 !important',
                        color: '#000'
                      }"
                      padding-x="10px"
                      border-radius="4px"
                      @change="changeSizeFilter"
                    />
                  </div>
                </client-only>
                <div class="mt-2 mt-xl-0 col-12 col-xl-3 d-flex justify-content-center justify-content-xl-start">
                  <b-btn class="filter-btn-create-trade" @click="applyFilters">
                    {{ $t('create_listing.trade.offer_items.filter_btn') }}
                  </b-btn>
                </div>
              </div>
            </div>
            <div class="mt-2 mt-xl-5 col-md-6 col-xl-3">
              <client-only>
                <CustomDropdown
                  v-model="orderFilter"
                  :labelLeftImage="require('~/assets/img/icons/feature.png')"
                  :options="generalListItemsCustomFilter" type="single-select"
                  :label="orderFilterLabel" class="bg-white w-100" optionsWidth="custom"
                  variant="white"
                  padding-x="10px"
                  dropDownHeight="38px"
                  border-radius="4px"
                  :dropdownStyle="{
                    border: '1px solid #CCC',
                    borderTop: 0,
                    borderRadius: '0 0 4px 4px'
                  }"
                  borderRadiusClose="4px 4px 0 0"
                  :arrowStyle="{
                    marginTop: '0 !important',
                    color: '#000'
                  }"
                  @change="changeOrderFilter"
                />
              </client-only>
            </div>
          </b-row>
          <div class="mt-4 position-relative">
            <div class="row align-items-center flex-wrap inventory-area">
              <b-col
                v-for="item in inventory_items"
                :key="'offer-'+item.id"
                cols="6 mb-4"
                xl="3"
                class="d-flex justify-content-center"
              >
                <div :draggable="true" @dragstart="startDrag($event, item)">
                  <div class="image-cont d-flex justify-content-center align-items-center position-relative">
                  <img alt="No Image" class="plus-icon-add position-absolute" :src="require('~/assets/img/icons/addPlus.svg')"
                        @click="checkIfItemAlreadyListed(item)"/>
                  <div class="position-relative">
                    <object
                      :data="`${IMAGE_PATH}/${item.product && item.product.category && item.product.category.name}/${item.product && item.product.sku}/800xAUTO/IMG01.jpg`"
                      class="img-fluid"
                      type="image/png">
                      <img class="img-fluid mb-2" :src="fallbackImgUrl" alt="image"/>
                    </object>
                  </div>
                  </div>
                  <div class="create-trade-item-caption">
                  <span :id="`name${item.id}`"
                        class="create-trade-item-name">{{ item.product && item.product.name }}</span>
                    <span :id="`colorway${item.id}`"
                          class="create-trade-item-caption-description">{{ item.product && item.product.colorway }}, {{$tc('common.size')}} {{ item.size && item.size.size }}</span>
                    <span
                      class="create-trade-item-caption-description">{{$t('common.box')}}: {{
                        item.packaging_condition && item.packaging_condition.name
                      }}</span>
                  </div>
                  <!-- tooltip for name -->
                  <b-tooltip :target="`name${item.id}`" triggers="hover">
                    {{ item.product && item.product.name }}
                  </b-tooltip>
                  <!-- tooltip for colorway -->
                  <b-tooltip :target="`colorway${item.id}`" triggers="hover">
                    {{ item.product && item.product.colorway }}
                  </b-tooltip>
                </div>
              </b-col>
              <b-row v-if="!inventory_items || inventory_items.length === 0"
                    class="col-md-12 justify-content-center">
                {{ $t('trades.create_listing.vendor.wants.no_products_found') }}
              </b-row>
            </div>
            <div class="overlay-container position-fixed">
              <div  class="d-flex create-trade-drag-drop-item-float mx-0 justify-content-center text-center py-4"
                  @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
                <div v-if="getTradeItems.length < 1">
                  <div class="create-trade-drag-drop-heading">
                    {{ $t('create_listing.trade.offer_items.drag_drop') }}
                  </div>
                  <span class="create-trade-drag-drop-sub-heading">{{
                      $t('create_listing.trade.offer_items.search_at')
                    }}</span>
                  <b-row class="justify-content-center mt-2">
                    <img :src="require('~/assets/img/Plus-circle.svg')">
                  </b-row>
                </div>
                <b-row v-else class="justify-content-center">
                  <div v-for="(prod, index) in getTradeItems"
                      :key="'selected-'+index+prod.id" class="create-trade-item-web mr-4">
                    <div class="position-relative d-flex justify-content-center align-items-center sm-img-cont">
                      <div v-if="prod.quantity > 1" class="create-trade-quantity-car-sm position-absolute">x{{ prod.quantity || 1 }}</div>

                      <div class="create-trade-remove-icon-web position-absolute" @click="decrementOrRemoveItem(prod.id)">
                        <img :src="require('~/assets/img/minusSign.svg')" />
                      </div>
                    <div class="create-trade-item-image-div-sm position-relative">
                      <object
                        :data="`${IMAGE_PATH}/${prod.product && prod.product.category.name ? prod.product.category.name : prod.category.name }/${prod.sku ? prod.sku : prod.product.sku}/800xAUTO/IMG01.jpg`"
                        class="create-trade-item-image-sm" type="image/png">
                        <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
                      </object>
                    </div>
                    <div class="overlay-item"></div>
                    </div>
                    <div class="create-trade-item-caption-web">
                    <span :id="`name-sm${prod.id}`"
                          class="create-trade-item-name-sm">{{ prod.name ? prod.name : prod.product.name }}</span>
                      <span :id="`colorway-sm${prod.id}`"
                            class="create-trade-item-caption-description-sm">{{ prod.colorway ? prod.colorway : prod.product.colorway }}, {{$tc('common.size')}} {{ prod.size && prod.size.size }}</span>
                      <span class="create-trade-item-caption-description-sm">{{$t('common.box')}}: {{
                          prod.packaging_condition && prod.packaging_condition.name
                        }}</span>
                    </div>

                    <b-tooltip :target="`name-sm${prod.id}`" triggers="hover">
                      {{ prod.name ? prod.name : prod.product.name }}
                    </b-tooltip>

                    <b-tooltip :target="`colorway-sm${prod.id}`" triggers="hover">
                      {{ prod.colorway ? prod.colorway : prod.product.colorway }}
                    </b-tooltip>

                  </div>
                  <div v-if="getTradeOfferItemQuantity < MAX_ITEMS_ALLOWED" class="create-trade-item-web">
                    <div>
                      <img :src="require('~/assets/img/three-items.svg')">
                    </div>
                  </div>
                </b-row>
              </div>

              <b-row  class="justify-content-end my-2">
              <b-col class="position-relative">
                <b-btn v-if="getTradeItems.length >= 1" class="create-trade-next-web"
                       @click="$router.push('/profile/create-listing/trades/wants')">
                  {{ $t('create_listing.trade.offer_items.next') }}
                </b-btn>
              </b-col>
              </b-row>
            </div>
          </div>

        </div>

      </div>
    </div>
    <infinite-loading :identifier="infiniteId" @infinite="getInventory">
      <span slot="no-more"></span>
      <span slot="no-results"></span>
    </infinite-loading>
    <AlreadyListedModal :listingId="itemListingId" :item="alreadyListedItemDetails" @confirm="addOrIncrementOfferItem" />
    <InventoryCsvUploadModal
      id="csv-upload-modal"
      :message="$t('inventory.message.csv_upload')"
      @uploaded="onCsvUploaded"
    />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {mapActions, mapGetters} from 'vuex'
import SearchInput from '~/components/common/SearchInput';
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem';
import AlreadyListedModal from '~/pages/profile/create-listing/trades/AlreadyListedModal';
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox.vue'
import CustomDropdown from '~/components/common/CustomDropdown.vue'
import {IMAGE_PATH, MAX_ITEMS_ALLOWED} from '~/static/constants/create-listing'
import { PRODUCT_FALLBACK_URL } from '~/static/constants'
import { TAKE_SEARCHED_PRODUCTS } from '~/static/constants/trades'

import {
  InventoryCsvUploadModal,
} from '~/components/modal'
import ScreenSize from '~/plugins/mixins/screenSize'


export default {
  name: 'CreateTradeListing',
  components: {
    InventoryCsvUploadModal,
    CreateTradeSearchItem, // component used for item via search selection
    SearchInput,            // component used for search input field
    SearchedProductsBelowSearchTextBox, // component for items show below search as search results
    CustomDropdown,   // custom dropdown component used for filters
    AlreadyListedModal // model used for telling product is already listed in other category
  },
  mixins: [ScreenSize],
  layout: 'Profile', // Layout
  middleware: 'auth',
  data() {
    return {
      showOffer: false,
      infiniteId: +new Date(),
      url: '/vendor/inventory',
      IMAGE_PATH, // Image path const
      MAX_ITEMS_ALLOWED,
      selected_category: null,
      productsFilter: 'most_viewed',
      selected_checkbox: [],
      search_item: null,
      steps: [
        {name: this.$t('trades.create_listing.vendor.wants.offer_items'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.enter_what_you_want'), active: false},
        {name: this.$t('trades.create_listing.vendor.wants.confirm_trade'), active: false}
      ],
      searchText: null,
      searchedItems: [],
      categoryItems: [
        {text: this.$t('common.footwear'), value: 'sneakers'},
        {text: this.$t('common.apparel'), value: 'apparel'},
        {text: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      inventory_items: [],
      page: 1,
      perPage: 4,
      totalCount: 0,
      perPageOptions: [4, 8, 16, 24],
      orderFilter: null,
      generalListItemsCustomFilter: [
        { text: this.$t('trades.create_listing.vendor.wants.price_low_to_high'), value: 'price_low_to_high' },
        { text: this.$t('trades.create_listing.vendor.wants.price_high_to_low'), value: 'price_high_to_low' },
      ],
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      itemListingId: 0,
      alreadyListedItemDetails: {},
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
    }
  },
  computed: {
    ...mapGetters('trades', ['getTradeItems', 'getTradeId', 'getTradeOfferItemQuantity']), // Getter for getting trade items listing,quantity trade id from store
    ...mapGetters('browse', ['filters']), // getter for getting list of filters data
  },
  mounted() {
    // emit use to add item for search selection component
    this.$root.$on('add_product_trade', (val) => {
      this.search_item = val
    })

    // setting referrer to null
    this.$store.commit('inventory/setReferrer', null)

    // if trade id exists then set items in page for editing
    if (this.getTradeId) {
      this.$store.commit('trades/removeAllOfferItems')
      this.$store.commit('trades/removeAllWantItems')
      this.getAndSetTradeItems(this.getTradeId)
    }

    // To move user from search page to back in trade offer page
    this.$root.$on('back_to_search_offer',()=>{
      this.search_item = false
      this.searchText =  null
      this.searchedItems =  []
    })

    // To add product in search item for search page
    this.$root.$on('add_trade_item', (val) => {
      this.search_item = val
      this.searchText =  null
      this.searchedItems = []
    })
    this.fetchFilters();
    this.getInventory();
    // Emit listener to emtpy search items
    this.$root.$on('click_outside', () => {
      this.searchedItems = []
    })
  },
  methods: {

    /**
     * This function is used to check  if item
     * exits in already some listing if exists it will
     * show model else call function to add item
     * @param item
     */
    checkIfItemAlreadyListed(item) {
      if (this.canAddMoreItems()) {
        this.$axios
          .post('check/product/in/listing', {
            inventory_id: item.id
          })
          .then((response) => { // return product information that exits in already listing
            const existingItem = this.getTradeItems.find(val => val.id === item.id)
            if (response.data.is_listing_item && !existingItem) {
              this.itemListingId = response.data.listingId
              this.alreadyListedItemDetails = item
              this.$bvModal.show('alreadyListed')
            } else{
              this.addOrIncrementOfferItem(item)
            }
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
            this.itemListingId = null
          })
      }
    },
    handleUploadCSVClick() {
      this.$bvModal.show('csv-upload-modal')
    },
    onCsvUploaded() {
      this.$router.push('/profile/inventory/csv-drafts')
    },
    /**
     * This function is used to check item can be added for trade
     * or limit exceeds
     * @returns {boolean}
     */
    canAddMoreItems() {
      const itemsCount = this.getTradeItems.map(i => i.quantity).reduce((a, b) => a + b, 0)
      if (itemsCount < MAX_ITEMS_ALLOWED) {
        return true
      } else {
        this.$toasted.error(this.$t('trades.create_listing.vendor.wants.offer_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED]));
        return false
      }
    },

    /**
     * This function use trade idd as param and check draft listing
     * against trade id then set offer items and want items for editing
     * @param tradeId
     */
    getAndSetTradeItems(tradeId) {
      this.$axios
        .get('trades', {
          params: {
            trade_id: tradeId,
            status: 'draft'
          }
        })
        .then((response) => { // return offer items and wants item
          const _self = this
          const offerItemsList = response && response.data.data && response.data.data.data[0].offers
          if (offerItemsList.length > 0) {
            offerItemsList.forEach(function(offerItem) {
              const item = offerItem.inventory
              item.quantity = offerItem.quantity
              item.id = offerItem.inventory_id
              _self.$store.commit('trades/setTradeItems', item)
              _self.$nextTick(() => _self.$forceUpdate())
            })
          }
          const self = this;
          const wantItemsList = response && response.data.data && response.data.data.data[0].wants
          if (wantItemsList.length > 0) {
            wantItemsList.forEach(function(wantItem) {
              const selectedProductWithAttributes = {
                id: wantItem.id,
                product_id: wantItem.product_id,
                name: wantItem.product.name,
                colorway: wantItem.product.colorway,
                sku: wantItem.product.sku,
                category: wantItem.product.category.name,
                image: wantItem.product.image,
                selected_year: wantItem.year,
                selected_box_condition: wantItem.packaging_condition_id,
                selected_box_condition_name: wantItem.packaging_condition.name,
                selected_quantity: wantItem.quantity,
                selected_size: wantItem.size_id,
                selected_size_name: self.$t('trades.create_listing.vendor.wants.size') + wantItem.size.size,
                product: wantItem.product
              }
              self.$store.commit('trades/setWantsItemsTrade', selectedProductWithAttributes)
              self.$nextTick(() => _self.$forceUpdate())
            })
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    /**
     * This function is used to set referrer that user move
     * from this page to inventory
     */
    setReferrer() {
      this.$store.commit('inventory/setReferrer', '/profile/create-listing/trades/create')
      this.$router.push('/profile/inventory/search')
    },

    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store

    /**
     * This function is used to drag offer item
     * @param evt
     * @param item
     */
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('item', JSON.stringify(item))
    },

    /**
     * This function is used to drop item which is drag
     * @param evt
     */
    onDrop(evt) {
      const items = evt.dataTransfer.getData('item')
      const data = JSON.parse(items)
      this.checkIfItemAlreadyListed(data)
    },

    /***
     * This function is used to change order listing of
     * inventory items
     * @param selectedOrder
     */
    changeOrderFilter(selectedOrder) {
      this.orderFilter = selectedOrder
      const orderFilteredKey = this.generalListItemsCustomFilter.find(item => item.value === this.orderFilter)
      this.orderFilterLabel = this.capitalizeFirstLetter(orderFilteredKey.text)
      this.page = 1;
      this.inventory_items = []
      this.infiniteId += 1;
    },

    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeCategory(selectedCategory) {
      this.categoryFilter = selectedCategory
      const categoryFilteredKey = this.categoryItems.find(item => item.value === this.categoryFilter)
      this.categoryFilterLabel = this.capitalizeFirstLetter(categoryFilteredKey.text)
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
      this.sizeTypesFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeTypesFilter, 2) || this.$t('trades.create_listing.vendor.wants.size_type') // 2 is max number of labels show in filter
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

      this.sizeFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeFilter, 5)
        || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
    },

    /**
     * This function do first letter of word capital
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter(string) {
      if (typeof string === 'string')
        return string[0].toUpperCase() + string.slice(1)
      else if (typeof string === 'object' && string.size && typeof string.size === 'string')
        return string.size[0].toUpperCase() + string.size.slice(1);
    },

    /**
     * This function is used to show selected items by joining them
     * in string format seperated by commas
     * @param selectedOptionsArray
     * @param maxLabelsAllowed
     * @returns {string|*}
     */
    joinAndCapitalizeFirstLetters(selectedOptionsArray, maxLabelsAllowed) {
      selectedOptionsArray = selectedOptionsArray.map(o => o[0].toUpperCase() + o.slice(1))
      return (selectedOptionsArray.length > maxLabelsAllowed)
        ? selectedOptionsArray.slice(0, maxLabelsAllowed).join(', ') + '...' // append dots if labels exceed limits of showing characters
        : selectedOptionsArray.join(', ')
    },

    /**
     * This function is used to add or increment offer item in listing
     * @param item
     */
    addOrIncrementOfferItem(item) {
      const existingItem = this.getTradeItems.find(val => val.id === item.id)
      if (existingItem) {
        this.$store.commit('trades/incrementTradeItemQuantity', item)
      } else {
        this.$store.commit('trades/setTradeItems', item)
      }
      this.$nextTick(() => this.$forceUpdate())
    },

    /**
     * This function is used to get user listing of inventory
     */
    getInventory($state,filters = {}) {
      const that = this
      filters.sort_by = this.orderFilter // sorting filter
      filters.category = this.categoryFilter // category type filter
      filters.sizes = this.sizeFilter.join(',') // size filter
      filters.size_types = this.sizeTypesFilter.join(',') // size type filter
      this.$axios
        .get(this.url, {
          params: {
            search: '',   // for search query
            page: this.page, // no of page to change
            per_page: this.perPage, // no of records to show on per page
            ...filters
          }
        })
        .then((response) => {  // list of vendor inventory
          const res = response?.data
          if (!res.next_page_url) {
            $state.complete()
          }else {
            that.page += 1;
            that.inventory_items.push(...res.data);
            that.filterSection = false
            $state.loaded()
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.searchedItems = []
        })
    },
    applyFilters(){
      this.page = 1;
      this.inventory_items = []
      this.getInventory()
    },
    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput(term) {
      this.searchText = term
      if (term) {
        this.$axios
          .post('/search/products', {
            filters: {
              search: term.toLowerCase(), // search query param
              take: TAKE_SEARCHED_PRODUCTS,      // get 5 record
            },
            page: 1 // no of page
          })
          .then((response) => {
            this.searchedItems = response.data && response.data.results && response.data.results.data // items for search list
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
            this.searchedItems = []
          })
      } else {
        this.searchText = null
        this.searchedItems = []
      }
    },

    /**
     * This function is used to remove or decrement product
     * quantity from offer listing
     * @param id
     */
    decrementOrRemoveItem(id) {
      const existingItem = this.getTradeItems.find(val => val.id === id)
      const index = this.getTradeItems.indexOf(existingItem)
      if (existingItem.quantity > 1) {
        this.$store.commit('trades/decrementTradeItemQuantity', index)
      } else {
        this.$store.commit('trades/removeTradeItem', index)
      }
      this.$nextTick(() => this.$forceUpdate())
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

    /**
     * This function is used to clear all selected filters
     */
    clearFilters() {
      this.orderFilter = null
      this.categoryFilter = ''
      this.sizeFilter = []
      this.sizeTypesFilter = []
      this.categoryFilterLabel = this.$t('trades.create_listing.vendor.wants.category')
      this.sizeTypesFilterLabel = this.$t('trades.create_listing.vendor.wants.size_type')
      this.sizeFilterLabel = this.$t('trades.create_listing.vendor.wants.size')
      this.orderFilterLabel = this.$t('trades.create_listing.vendor.wants.sort_by')
      this.$nextTick(() => {
        this.getInventory()
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.mt-custom
  margin-top: 45px

.width-156
  min-width: 156px

.clear-filter
  font-family: $font-montserrat
  font-style: normal
  font-weight: $regular
  @include body-9
  text-align: right
  text-decoration-line: underline
  color: $color-blue-2
  margin-left: 10px
  padding-top: 15px
  cursor: pointer

.plus-icon-add
  right: 10px
  top: 10px
  cursor: pointer
  z-index: 88

.inventory-area
  margin-bottom: 33px
  padding-left: 15px
  padding-right: 15px
  padding-top: 15px

.filter-by
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  @include body-8
  color: $color-black-1

.sort-by
  padding-right: 66px

.pointer
  cursor: pointer

.flex-flow-column
  flex-flow: column
.create-trade-subheading
  font-family: $font-sp-pro
  @include body-12-regular
  color: $color-gray-5
.inventory-section-module
  background: $color-white-1
  padding: 30px 10px 66px 21px

.btn-file
  @include body-4-medium
  font-family: $font-sp-pro
  background: $color-black-1
  color: $color-white-1
  padding: 10px 25px 10px 25px
  border-radius: 4px
  border: 0

.create-trade-next-web
  padding: 0 25px 0 14px
  right: 15px
  //bottom: 120px
  position: fixed
  z-index: 80
  width: 151px
  height: 38px
  background: $color-grey-101
  border-radius: 4px
  border: 1px solid $color-blue-20
  margin-top: 10px
  margin-right: 25px
  color: $color-white-1
  @include body-13
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $medium

.create-trade-bg
  padding: 15px 30px 78px 30px
.overlay-item
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.image-cont
  padding-left: 35px
  padding-right: 35px
.create-trade-item-image
  width: 100%
  aspect-ratio: 1
.create-trade-item-image-sm
  width: 100%
  aspect-ratio: 1
.create-trade-item-image-div-sm
  background: $color-white-1
.create-trade-quantity-car-sm
  left: 10px
  top: 10px
.create-trade-remove-icon-web
  right: 10px
  top: 10px
  z-index: 102
.sm-img-cont
  height: 185px
  width: 164px
  background: $color-white-1
  padding: 25px
.create-trade-item-web
  background: $color-white-1

.overlay-container
  z-index: 1000
  bottom:  76px
  width: 75%

  @media (min-width: 1500px) and (max-width: 1600px)
   width: 77%

  @media (min-width: 1601px) and (max-width: 1800px)
    width: 79%

  @media (min-width: 1801px) and (max-width: 2000px)
    width: 82%

  @media (min-width: 2001px) and (max-width: 2500px)
    width: 84%

.offers-items
  background: $color-white-27
  box-shadow: inset 0 1px 4px$drop-shadow1
  border-radius: 9px
  width: 100px
  height: 38px
  padding: 0 25px 0 14px
  right: 15px
  bottom: 120px
  position: fixed
  z-index: 80
.offer-text
  font-family: $font-family-montserrat
  font-style: normal
  @include body-9-regular
  letter-spacing: -0.02em
  color: $color-gray-5
  padding-left: 10px
.up-down-arrow-empty
  height: 50px
  width: 30px
  right: 8px
  bottom: 10px
  z-index: 20
.counter-icon
  background: $color-red-29
  width: 18px
  height: 18px
  border-radius: 50%
  font-size: 13px
  font-family: $font-family-montserrat
  color: $color-white-1
  top: -5px
  right: -5px
</style>
