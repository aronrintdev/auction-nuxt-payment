<template>
  <div class="main-container py-2 px-3">
    <create-trade-search-item v-if="search_item" :product="search_item" productFor="tradeOffer"/>
    <div v-else>
      <div class="d-flex mt-2 justify-content-between">
        <div class="col-11 px-0">
          <SearchInput
            :value="searchText"
            variant="light"
            :placeholder="$t('home_page.search')"
            :clearSearch="true"
            inputHeight="33px"
            class="create-trade-search w-100"
            @change="onSearchInput"
          />
          <SearchedProductsBelowSearchTextBox
            v-if="searchedItems.length > 0"
            :productItems="searchedItems"
            productsFor="tradeItem"
            class="position-absolute"
            listGroupItemClass="w-100 justify-content-between px-2"
          />
        </div>
        <img :src="require('assets/img/icons/filter.svg')" @click="showFilters" />
      </div>
      <!-- Filters Section -->
        <client-only>
         <vue-bottom-sheet ref="filterSheet" max-height="90%" :is-full-screen="true" >
           <trade-arena-filters :orderFilter="true" @change="applyFilters"/>
         </vue-bottom-sheet>
        </client-only>
      <div>
        <div class="d-flex">
          <div class="inventory-heading">
            {{ $t('create_listing.trade.offer_items.available_inventory_mobile', {'0': totalCount}) }}
          </div>
        </div>
        <div class="">
          <b-row class="inventory-area">
            <b-col v-for="item in inventory_items" :key="'offer-'+item.id" cols="6 mb-4">
              <div class="create-trade-item-mobile position-relative" :draggable="true" @dragstart="startDrag($event, item)">
                <div class="position-relative">
                    <img alt="No Image" class="plus-icon-add position-absolute" :src="require('~/assets/img/icons/addPlus.svg')"
                         @click="checkIfItemAlreadyListed(item)"/>
                </div>
                <div class="position-relative d-flex align-items-center justify-content-center prod-img">
                <object
                  :data="`${IMAGE_PATH}/${item.product && item.product.category && item.product.category.name}/${item.product && item.product.sku}/800xAUTO/IMG01.jpg`"
                  class="create-trade-item-image-mobile justify-content-center"
                  type="image/png">
                  <img class="create-trade-item-image-mobile-no justify-content-center mb-2" :src="fallbackImgUrl" alt="image"/>
                </object>
               <div class="overlay-mob position-absolute"></div>
               </div>
                <div class="create-trade-item-caption-mobile">
                <span :id="`name${item.id}`"
                      class="create-trade-item-name">{{ item.product && item.product.name }}</span>
                  <span :id="`colorway${item.id}`"
                        class="create-trade-item-caption-description">{{ item.product && item.product.colorway }},{{$t('trades.create_listing.vendor.wants.size')}} {{ item.size && item.size.size }}</span>
                  <span
                    class="create-trade-item-caption-description">Box: {{
                      item.packaging_condition && item.packaging_condition.name
                    }}</span>
                </div>
                <!-- tooltip for name -->
                <b-tooltip :target="`name${item.id}`" triggers="hover">
                  {{ item.product && item.product.name }}
                </b-tooltip>
                <!-- tooltip for colorway -->
                <b-tooltip :target="`colorway${item.id}`" triggers="hover">
                  {{ item.product && item.product.colorway }},{{$t('trades.create_listing.vendor.wants.size')}} {{ item.size && item.size.size }}
                </b-tooltip>
              </div>
            </b-col>
            <b-row v-if="!inventory_items || inventory_items.length === 0"
                   class="col-md-12 justify-content-center no-found">
              {{ $t('trades.create_listing.vendor.wants.no_products_found-mobile') }}
            </b-row>
          </b-row>
        </div>
        <infinite-loading :identifier="infiniteId" @infinite="getInventory">
          <span slot="no-more"></span>
          <span slot="no-results"></span>
        </infinite-loading>
        <div v-if="showOffer" class="show-offers">
          <div class="row create-trade-drag-drop-item-mobile justify-content-center text-center position-relative"
               @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
            <div v-if="getTradeItems.length < 1">
              <div class="create-trade-drag-drop-heading">
                {{ $t('create_listing.trade.offer_items.drag_drop_mobile') }}
              </div>
              <span class="create-trade-drag-drop-sub-heading">{{
                  $t('create_listing.trade.offer_items.search_at')
                }}</span>
              <b-row class="justify-content-center mt-1">
                <img class="plus-image" :src="require('~/assets/img/Plus-circle.svg')">
              </b-row>
            </div>
            <b-row v-else class="justify-content-center">
              <div v-for="(prod, index) in getTradeItems"
                   :key="'selected-'+index+prod.id" class="create-trade-item-sm d-flex justify-content-between flex-column mr-2">
                <div class="position-relative">
                  <div class="create-trade-minus-icon-sm position-absolute" @click="decrementOrRemoveItem(prod.id)">
                    <div class="create-trade-minus-line-sm"></div>
                  </div>
                </div>
                <div class="offer-item-img-sm position-relative d-flex align-items-center justify-content-center">
                  <object
                    :data="`${IMAGE_PATH}/${prod.product && prod.product.category.name ? prod.product.category.name : prod.category.name }/${prod.sku ? prod.sku : prod.product.sku}/800xAUTO/IMG01.jpg`"
                    class="create-trade-item-image-sm" type="image/png">
                    <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
                  </object>
                  <div class="overlay-mob position-absolute"></div>
                </div>
                <div class="create-trade-item-caption-sm">
                <span :id="`name-sm${prod.id}`"
                      class="create-trade-item-name-sm">{{ prod.name ? prod.name : prod.product.name }}</span>
                  <span :id="`colorway-sm${prod.id}`"
                        class="create-trade-item-caption-description-sm">{{ prod.colorway ? prod.colorway : prod.product.colorway }}</span>
                  <span class="create-trade-item-caption-description-sm">Box: {{
                      prod.packaging_condition && prod.packaging_condition.name
                    }}</span>
                </div>

                <b-tooltip :target="`name-sm${prod.id}`" triggers="hover">
                  {{ prod.name ? prod.name : prod.product.name }}
                </b-tooltip>

                <!-- tooltip for colorway -->
                <b-tooltip :target="`colorway-sm${prod.id}`" triggers="hover">
                  {{ prod.colorway ? prod.colorway : prod.product.colorway }}
                </b-tooltip>

              </div>
              <div v-if="getTradeOfferItemQuantity < MAX_ITEMS_ALLOWED" class="create-trade-item-sm">
                <div>
                  <img class="create-trade-item-image-sm-dummy"  :src="require('~/assets/img/three-items.svg')">
                </div>
              </div>
            </b-row>
            <img :src="require('~/assets/img/trades/updown.svg')" role="button" class="position-absolute up-down-arrow" @click="showOffer = !showOffer">
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <b-btn class="create-trade-next-btn position-fixed mr-0" :disabled="getTradeItems.length < 1"
                 @click="$router.push('/profile/create-listing/trades/wants')">
            {{ $t('create_listing.trade.offer_items.next') }}
          </b-btn>
        </div>
        <b-col class="position-relative">
          <div v-if="!showOffer" class="offers-items d-flex align-items-center" role="button" @click="showOffer = !showOffer">
            <img :src="require('~/assets/img/trades/updown.svg')">
            <span class="offer-text">{{$t('trades.offer')}}</span>
            <div v-if="getTradeItems.length" class="counter-icon position-absolute d-flex justify-content-center align-items-center">{{getTradeItems.length}}</div>
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import SearchInput from '~/components/common/SearchInput';
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBoxMobile.vue'
import {IMAGE_PATH, MAX_ITEMS_ALLOWED, PRODUCT_FALLBACK_URL} from '~/static/constants';
import {TAKE_SEARCHED_PRODUCTS} from '~/static/constants/trades';

import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItemMobile';
import TradeArenaFilters from '~/components/trade/TradeArenaFilters';

export default {
  name: 'CreateMobile',
  components: {
    TradeArenaFilters,
    SearchInput,
    SearchedProductsBelowSearchTextBox,
    CreateTradeSearchItem,
  },
  layout: 'Profile', // Layout
  middleware: 'auth',
  data() {
    return {
      filterSection:false,
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
      showOffer: false,
      infiniteId: +new Date(),
      url: '/vendor/inventory'
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

    // Emit listener to emtpy search items
    this.$root.$on('click_outside', () => {
      this.searchedItems = []
    })
    this.$root.$on('closeFilters', (val) => {
      this.filterSection = val
    })
  },
  methods: {
    showFilters(){
      this.$refs.filterSheet.open();
    },
    closeFiltersSection() {
      this.filterSection = false
    },
    applyFilters(filters){
      this.orderFilter = filters.sortby
      this.categoryFilter =  filters?.categories?.join(',')
      this.sizeTypesFilter = filters?.sizeTypes
      this.sizeFilter = filters?.sizes
      this.page = 1;
      this.inventory_items = []
      this.infiniteId += 1;
      this.$refs.filterSheet.close();
    },
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
      })
    },
  }
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'
.main-container
  background-color: $color-white-1
.inventory-heading
  @include body-5
  font-weight: $bold
  font-family: $font-montserrat
  padding: 20px 0
  @media (min-width: 300px)  and (max-width: 500px)
    @include body-4
.create-inventory-btn
  @include body-5
  font-weight: 400
  line-height: 16.71px
  font-family: $font-sp-pro
  cursor: pointer
  @media (min-width: 300px)  and (max-width: 349px)
    @include body-9
  @media (min-width: 400px)  and (max-width: 500px)
    @include body-13
.create-trade-item-mobile
  width: 164px
  height: 265px
  @media (min-width: 300px)  and (max-width: 349px)
    width: 140px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 190px
.size
  @include body-9

.plus-icon-add
  width: 19px
  height: 19px
  cursor: pointer
  right: 7px
  top: 7px
  z-index: 10
  @media (min-width: 300px)  and (max-width: 349px)
    margin-left: 4rem
  @media (min-width: 400px)  and (max-width: 500px)
    margin-left: 6.5rem
.create-trade-item-image-mobile
  width: 109px
  margin-left: 5px
.create-trade-item-image-mobile-no
  width: 109px
.create-trade-item-caption-mobile
  width: 162px
  padding: 8px 3px
  @media (min-width: 300px)  and (max-width: 349px)
    width: 138px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 188px
.create-trade-item-name
  @include body-6
  font-weight: $medium
  width: 147px
  font-family: $font-sp-pro
  @media (min-width: 300px)  and (max-width: 349px)
    width: 120px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 180px
.create-trade-item-caption-description
  @include body-6
  font-weight: $normal
  font-family: $font-sp-pro
  width: 71px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 160px
.create-trade-drag-drop-item-mobile
  min-height: 140px
  max-height: 201px
  border-radius: 3px
  background-color: $color-white-1
  border: 0.5px solid $color-gray-23

.create-trade-drag-drop-heading
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-5
  padding-top: 25px
.create-trade-drag-drop-sub-heading
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-9
  padding-top: 8px
.plus-image
  padding-top: 10px
  height: 40px
  width: 40px
.create-trade-item-sm
  width: 99px
  height: 161px
  margin-top: 13px
  border: unset
  @media (min-width: 300px)  and (max-width: 349px)
    width: 90px
.create-trade-item-image-sm
  width: 79px
  height: 46px
.create-trade-item-caption-sm
  width: 98px
  height: 57px
  background: unset
.create-trade-item-name-sm
  width: 62px
  @include body-6
  font-weight: $medium
  font-family: $font-sp-pro
.create-trade-item-caption-description-sm
  width: 81px
  @include body-18
  font-weight: $normal
  font-family: $font-sp-pro
.create-trade-minus-icon-sm
  background-color: $color-red-27
  right: 5px
  top: 5px
  z-index: 81
.create-trade-item-image-sm-dummy
  width: 95px
  height: 125px
  padding: 2px

.no-found
  @include body-5
  font-weight: $medium
  font-family: $font-montserrat
  padding: 50px
.create-trade-next-btn
  background-color: $color-blue-20
  border-radius: 20px
  float: right
  margin-bottom: 7px
  cursor: pointer
  width: 162px
  font-family: $font-montserrat
  font-weight: $medium
  @include body-10
  bottom: 100px
  z-index: 100

.search-input-wrapper::v-deep
  width: 303px
  @media (max-width: 330px)
    width: 260px
.overlay-mob
  background: $light-opacity
  top: 0
  left: 0
  width: 100%
  height: 100%
.prod-img
  height: 185px
.offers-items
  background: $color-white-27
  box-shadow: inset 0 1px 4px$drop-shadow1
  border-radius: 9px
  width: 92px
  height: 28px
  padding: 0 25px 0 14px
  right: 15px
  bottom: 110px
  position: fixed
  z-index: 80
.offer-text
  font-family: $font-family-montserrat
  font-style: normal
  @include body-9-regular
  letter-spacing: -0.02em
  color: $color-gray-5
  padding-left: 10px
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
.up-down-arrow
  right: 8px
  bottom: 8px
  z-index: 20
.offer-item-img-sm
  height: 112px
.show-offers
  position: fixed
  bottom: 160px
  z-index: 80
  width: 92%
.create-trade-search
  font-family: $font-montserrat
  font-style: normal
  font-weight: $regular
  @include body-9
</style>
