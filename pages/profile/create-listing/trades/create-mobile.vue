<template>
  <div class="main-container p-2">
    <div class="d-flex mt-2" v-if="!filterSection">
       <div>
         <SearchInput
           :value="searchText"
           variant="primary"
           :placeholder="$t('create_listing.trade.offer_items.search_by')"
           :clearSearch="true"
           bordered
           inputHeight="60px"
           @change="onSearchInput"
         />
         <SearchedProductsBelowSearchTextBox v-if="searchedItems.length > 0" :productItems="searchedItems" productsFor="tradeItem" width="700px" class="position-absolute"/>
       </div>
      <div @click="filterSection = !filterSection">
        <img class="ml-3 mt-1" :src="require('~/assets/img/filters.svg')" />
      </div>
    </div>
    <!-- Filters Section -->
    <div v-if="filterSection">
      <mobileFilters @click="applyFilters"/>
    </div>
    <div v-else>
      <div class="d-flex mt-2">
        <div class="inventory-heading">
          {{ $t('create_listing.trade.offer_items.available_inventory_mobile', {'0': totalCount}) }}
        </div>
        <div class="ml-5">
        <span class="create-inventory-btn" @click="setReferrer()">
        <img :src="require('~/assets/img/plus.svg')"/>  {{ $t('create_listing.trade.offer_items.create_inventory') }}
        </span>
        </div>
      </div>
      <div class="mt-2">
        <b-row class="inventory-area">
          <b-col v-for="item in inventory_items" :key="'offer-'+item.id" cols="6 mb-4">
            <div class="create-trade-item-mobile" :draggable="true" @dragstart="startDrag($event, item)">
              <div class="d-flex mt-1">
                <div class="size ml-2">{{$t('trades.create_listing.vendor.wants.size')}} {{ item.size && item.size.size }}</div>
                <div>
                  <img alt="No Image" class="plus-icon-add" :src="require('~/assets/img/icons/addPlus.svg')"
                       @click="checkIfItemAlreadyListed(item)"/>
                </div>
              </div>
              <object
                :data="`${IMAGE_PATH}/${item.product && item.product.category && item.product.category.name}/${item.product && item.product.sku}/800xAUTO/IMG01.jpg`"
                class="create-trade-item-image-mobile justify-content-center"
                type="image/png">
                <img class="create-trade-item-image-mobile-no justify-content-center mb-2" :src="fallbackImgUrl" alt="image"/>
              </object>
              <div class="create-trade-item-caption-mobile">
                <span :id="`name${item.id}`"
                      class="create-trade-item-name">{{ item.product && item.product.name }}</span>
                <span :id="`colorway${item.id}`"
                      class="create-trade-item-caption-description">{{ item.product && item.product.colorway }}</span>
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
                {{ item.product && item.product.colorway }}
              </b-tooltip>
            </div>
          </b-col>
          <b-row v-if="!inventory_items || inventory_items.length === 0"
                 class="col-md-12 justify-content-center no-found">
            {{ $t('trades.create_listing.vendor.wants.no_products_found-mobile') }}
          </b-row>
          <b-row class="col-md-12 justify-content-center">
            <Pagination
              v-if="inventory_items && inventory_items.length > 0"
              v-model="page"
              :total="totalCount"
              :per-page="perPage"
              :per-page-options="perPageOptions"
              class="mt-4"
              @page-click="handlePageClick"
              @per-page-change="handlePerPageChange"
            />
          </b-row>
        </b-row>
      </div>
      <div class="mt-2" v-if="inventory_items.length">
        <div class="row create-trade-drag-drop-item-mobile justify-content-center text-center py-2"
             @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
          <div v-if="getTradeItems.length < 1">
            <div class="create-trade-drag-drop-heading">
              {{ $t('create_listing.trade.offer_items.drag_drop_mobile') }}
            </div>
            <span class="create-trade-drag-drop-sub-heading">{{
                $t('create_listing.trade.offer_items.search_at')
              }}</span>
            <b-row class="justify-content-center mt-2">
              <img class="plus-image" :src="require('~/assets/img/Plus-circle.svg')">
            </b-row>
          </div>
          <b-row v-else class="justify-content-center">
            <div v-for="(prod, index) in getTradeItems"
                 :key="'selected-'+index+prod.id" class="create-trade-item-sm d-flex justify-content-between flex-column mr-2">
              <div class="d-flex justify-content-between mt-2 mx-2">
                <div v-if="prod.quantity > 1" class="create-trade-quantity-car-sm">x{{ prod.quantity || 1 }}</div>
                <div class="create-trade-minus-icon-sm" @click="decrementOrRemoveItem(prod.id)">
                  <div class="create-trade-minus-line-sm"></div>
                </div>
              </div>
              <div class="create-trade-item-image-div-sm">
                <object
                  :data="`${IMAGE_PATH}/${prod.product && prod.product.category.name ? prod.product.category.name : prod.category.name }/${prod.sku ? prod.sku : prod.product.sku}/800xAUTO/IMG01.jpg`"
                  class="create-trade-item-image-sm" type="image/png">
                  <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
                </object>
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
        </div>
      </div>
      <div class="mt-2">
        <div>
          <FormStepProgressBar :steps="steps" variant="transparent"/>
        </div>
      </div>
      <div class="mt-2">
        <b-btn class="create-trade-next-btn" :disabled="getTradeItems.length < 1"
               @click="$router.push('/profile/create-listing/trades/wants/wants-mobile')">
          {{ $t('create_listing.trade.offer_items.next') }}
        </b-btn>
      </div>
    </div>


  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import debounce from 'lodash.debounce';
import FormStepProgressBar from '~/components/common/FormStepProgressBar.vue'
import SearchInput from '~/components/common/SearchInput';
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBoxMobile.vue'
import mobileFilters from '~/pages/profile/create-listing/trades/filtersMobile'
import {IMAGE_PATH, MAX_ITEMS_ALLOWED, PRODUCT_FALLBACK_URL} from '~/static/constants';
import {TAKE_SEARCHED_PRODUCTS} from '~/static/constants/trades';

// import CustomDropdown from '~/components/common/CustomDropdown';
// import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem';
// import AlreadyListedModal from '~/pages/profile/create-listing/trades/AlreadyListedModal';
import {Pagination} from '~/components/common'
// import {IMAGE_PATH, MAX_ITEMS_ALLOWED} from '~/static/constants/create-listing'
// import { PRODUCT_FALLBACK_URL } from '~/static/constants'
// import { TAKE_SEARCHED_PRODUCTS } from '~/static/constants/trades'

export default {
  name: 'create-mobile',
  components: {
    SearchInput,
    SearchedProductsBelowSearchTextBox,
    FormStepProgressBar,
    // CreateTradeSearchItem,
    // CustomDropdown,
    Pagination,
    mobileFilters,
    // AlreadyListedModal
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
    this.$root.$on('closeFilters', (val) => {
      this.filterSection = val
    })
  },
  methods: {
    closeFiltersSection() {
      this.filterSection = false
    },
    applyFilters(data){
      this.orderFilter = data.orderFilter ? data.orderFilter : null
      this.categoryFilter = data.category ? data.category : null
      this.sizeTypesFilter = data.sizeType ? data.sizeType : null
      this.sizeFilter = data.sizes ? data.sizes: null
      this.getInventory()
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
      this.getInventory();
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
    getInventory: debounce(function (filters = {}) {
      filters.sort_by = this.orderFilter // sorting filter
      filters.category = this.categoryFilter // category type filter
      filters.sizes = this.sizeFilter.join(',') // size filter
      filters.size_types = this.sizeTypesFilter.join(',') // size type filter
      this.$axios
        .get('/vendor/inventory', {
          params: {
            search: '',   // for search query
            page: this.page, // no of page to change
            per_page: this.perPage, // no of records to show on per page
            ...filters
          },
        })
        .then((response) => {  // list of vendor inventory
          this.inventory_items = response.data.data
          this.totalCount = parseInt(response.data.total)
          this.perPage = parseInt(response.data.per_page)
          this.filterSection = false
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.searchedItems = []
        })
    }, 500),

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
      if (existingItem.quantity > 1) {
        this.$store.commit('trades/decrementTradeItemQuantity', id)
      } else {
        this.$store.commit('trades/removeTradeItem', id)
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
.main-container
  background-color: #fff
.inventory-heading
  @include body-5
  font-weight: $bold
  font-family: $font-montserrat
  @media (min-width: 300px)  and (max-width: 349px)
    @include body-6
  @media (min-width: 400px)  and (max-width: 500px)
    @include body-13
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
  height: 212px
  border: 1px solid #C4C4C4
  @media (min-width: 300px)  and (max-width: 349px)
    width: 140px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 190px
.size
  @include body-9

.plus-icon-add
  width: 19px
  margin-left: 5rem
  height: 19px
  cursor: pointer
  z-index: 1000
  @media (min-width: 300px)  and (max-width: 349px)
    margin-left: 4rem
  @media (min-width: 400px)  and (max-width: 500px)
    margin-left: 6.5rem
.create-trade-item-image-mobile
  width: 109px
  margin-left: 20px
.create-trade-item-image-mobile-no
  width: 109px
.create-trade-item-caption-mobile
  width: 162px
  background-color: #F7F7F7
  margin-top: 16px
  padding: 5px
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
  width: 343px
  height: 140px
  margin-left: 5px
  margin-right: 0px
  border-radius: 3px
  background-color: #FBFAFA
  @media (min-width: 300px)  and (max-width: 349px)
    width: 294px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 400px

.create-trade-drag-drop-heading
  font-family: $font-sp-pro
  font-weight: $medium
  @include body-5
  padding: 0px
.create-trade-drag-drop-sub-heading
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-9
  padding: 0px
.plus-image
  padding-top: 10px
  height: 40px
  width: 40px
.create-trade-item-sm
  width: 100px
  height: 128px
  border: 1px solid #D8D8D8
  @media (min-width: 300px)  and (max-width: 349px)
    width: 90px
.create-trade-item-image-sm
  width: 79px
  height: 46px
.create-trade-item-caption-sm
  width: 98px
  height: 57px
  border: 1px solid #F7F7F7
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
  background-color: #FF9696
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
  background-color: #667799
  border-radius: 20px
  float: right
  margin-bottom: 7px
  cursor: pointer
  width: 162px
  font-family: $font-montserrat
  font-weight: $medium
  @include body-10
</style>
