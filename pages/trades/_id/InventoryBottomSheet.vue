<template>
  <client-only>
  <vue-bottom-sheet ref="myBottomSheet" max-height="90%" :is-full-screen="true" class="bottom-sheet">
    <div class="offer-items">
      <div class="d-flex justify-content-between pl-3 pr-3">
        <div class="clear" :class="{'color-blue': getYourTradeItems.length > 0}" role="button" @click="clearItems()">Clear</div>
        <div class="d-block text-center">
          <div class="offer-heading">{{$t('trades.your_offer')}}</div>
          <div class="est-val">{{$t('trades.estimated_value')}}:{{yourTotal()}}</div>
        </div>
        <div class="done"  :class="{'color-blue': getYourTradeItems.length > 0}" role="button" @click="doneClose()">Done</div>
      </div>
      <div v-if="getYourTradeItems.length > ITEM_COUNT_0" class="d-flex justify-content-center">
        <div  v-for="(item,index) in getYourTradeItems" :id="'your-card-'+index" :key="index" class="item-inventory mt-2 mb-4 ml-3">
          <div class="position-relative">
          <div class="remove-item mt-2" @click="decrementOrRemoveItem(item)">
            <div class="minus"></div>
          </div>
          </div>
          <div class="image-wrapper position-relative d-flex justify-content-center align-items-center">
            <img class="pro-image" :src="item.product.image" alt="image" />
            <div class="overlay-image position-absolute"></div>
          </div>
          <div class="item-caption">
            <div class="item-name">{{  (item.product && item.product.name) ? item.product.name : item.name  }}</div>
            <div class="item-caption-description">{{  (item.product  && item.product.colorway) ? item.product.colorway : item.colorway }},{{$t('trades.trade_arena.size')}} {{ item.size && item.size.size }}</div>
            <div class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{  (item.box_condition && item.box_condition.name) ? item.box_condition.name :item.box_condition }}</div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center mb-3">
        <div class="add-item-invent text-center">
          <div class="select-invent">
            {{$t('trades.trade_arena.select_from_inventory')}}
          </div>
          <div class="upto-three">
            {{$t('trades.trade_arena.up_to_three_items')}}
          </div>
        </div>
      </div>
    </div>
    <div class="your-inventory">
    <div class="d-block pt-4 pl-4">
      <div class="invent-heading">
        {{$t('trades.trade_arena.your_inventory',[inventoryItems.length])}}
      </div>
      <div class="invent-subheading mt-1">
        {{$t('trades.trade_arena.trade_upto_items', [MAX_ITEMS_ALLOWED])}}
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center">
    <SearchInput
        :value="searchText"
        variant="primary"
        :placeholder="$t('trades.trade_arena.search_inventory')"
        :clearSearch="true"
        bordered
        class="mt-3 pl-4 input-search"
        @change="onSearchInput"
      />
    <div class="pt-3 pr-4">
      <img role="button" :src="require('~/assets/img/trades/filter-icon.svg')" @click="showFilters()">
    </div>
    </div>
    <div class="inventory-items d-flex flex-wrap pt-3 pl-4">
      <div v-for="(item,index) in inventoryItems" :key="index" class="item invent-item">
        <div>
          <div class="position-relative">
            <img alt="No Image" class="plus-icon-add-trade position-absolute" role="button" :src="require('~/assets/img/icons/addPlus.svg')"
                 @click="addYourItem(item)"/>
          </div>
          <div class="image-wrapper-inventory position-relative d-flex justify-content-center align-items-center">
          <img class="item-image-trade" :src="item.product.image" alt="image" />
            <div class="overlay-inventory position-absolute"></div>
          </div>
          <div class="item-caption-inventory">
            <div class="invent-name pt-2">{{item.product && item.product.name}}</div>
            <div class="invent-box">{{$t('common.box_condition')}}: {{item.packaging_condition && item.packaging_condition.name}}</div>
            <div class="invent-color">{{item.product && item.product.colorway}}</div>
          </div>
        </div>
      </div>

      <b-row class="justify-content-center col-md-12">
        <Pagination
          v-if="inventoryItems && inventoryItems.length > ITEM_COUNT_0"
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
  </vue-bottom-sheet>
  </client-only>
</template>

<script>
import debounce from 'lodash.debounce';
import {mapGetters} from 'vuex';
import {
  ITEM_COUNT_0,
} from '~/static/constants/trades'
import {DEFAULT_PER_PAGE_ITEMS, MAX_ITEMS_ALLOWED, PER_PAGE_ITEMS} from '~/static/constants';
import {Pagination} from '~/components/common'
import SearchInput from '~/components/common/SearchInput';
export default {
  name: 'InventoryBottomSheet',
  components:{
    SearchInput,
    Pagination
  },
  data(){
    return {
      ITEM_COUNT_0,
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      perPage: DEFAULT_PER_PAGE_ITEMS,
      page: 1,
      inventoryItems: [],
      totalCount: 0,
      perPageOptions: PER_PAGE_ITEMS,
      optional_cash: '0.00',
      MAX_ITEMS_ALLOWED,
      searchText: '',
      filterScreen: false,

    }
  },
  computed:{
    ...mapGetters('trade', ['getYourTradeItems']),// List of your trade items from store
  },
  methods: {
    open() {
      this.$refs.myBottomSheet.open();
    },
    /**
     * This function is used to get listing of your inventory items
     * from api
     */
    getInventory: debounce(function (filters = {}) {
      filters.category = this.categoryFilter
      filters.sizes = this.sizeFilter.join(',')
      filters.size_types = this.sizeTypesFilter.join(',')
      this.$axios
        .get('/vendor/inventory', {
          params: {
            search: this.searchText, // search query param for api call
            page: this.page, // Current page No
            per_page: this.perPage, // Per page no of records
            ...filters // filters to be applied
          },
        })
        .then((response) => { // response will get us listing of
          this.inventoryItems = response.data.data
          this.totalCount = parseInt(response.data.total)
          this.perPage = parseInt(response.data.per_page)
        })
        .catch((error) => { // return error
          this.$toasted.error(this.$t(error.response.data.error))
          this.searchedItems = []
        })
    }, 500),
    /**
     * This function is used to remove or decrement your trade item
     * quantity from listing
     * @param id
     */
    decrementOrRemoveItem(item) {
      const existingItem = this.getYourTradeItems.find(val => val.id === item.id)
      if (existingItem.quantity > 1) {
        this.$store.commit('trade/decrementYourTradeItemQuantity', item.id)
      } else {
        this.$store.commit('trade/removeYourTradeItem', item.id)
      }
      this.updateActiveTrade()
      this.$nextTick(() => this.$forceUpdate())
    },
    updateActiveTrade(){
      this.$store.commit('trade/updateActiveTrade', {
        yourItems: this.getYourTradeItems,
        cashAdded: parseInt(parseFloat(this.optional_cash)*100),
        tradeCondition: this.tradeCondition
      })
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
     * This function is used to add your trade item by click plus icon
     * @param item
     */
    addYourItem(item) {
      if (this.canAddMoreItems() && this.checkIfItemAlreadyListed(item)) {
        this.addOrIncrementYourItem(item)
      }
    },
    /**
     * This function is used to check  if item
     * exits in already some listing if exists it will
     * show model else call function to add item
     * @param item
     */
    checkIfItemAlreadyListed(item) {
      const existingItem = this.getYourTradeItems.find(val => val.id === item.id)
      if (existingItem) return true;
      this.$axios
        .post('check/product/in/listing', {
          inventory_id: item.id
        })
        .then((response) => { // return product information that exits in already listing
          if (response.data.is_listing_item) {
            this.itemListingId = response.data.listingId
            this.alreadyListedItemDetails = item
            this.$bvModal.show('alreadyListed')
            return false
          } else {
            this.addOrIncrementYourItem(item)
            return true
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.itemListingId = null
        })
    },
    /**
     * This function is used to add or increment your trade item in store
     * @param item
     */
    addOrIncrementYourItem(item) {
      this.$store.commit('trade/setYourTradeItems', item)
      this.updateActiveTrade()
      this.$nextTick(() => this.$forceUpdate())
    },
    /**
     * This function is used to get total amount of wants items
     * offered by you for trade by default it return string 0
     * @returns {string|*}
     */
    yourTotal(formattedPrice = true){
      const price = this.getYourTradeItems.map((item) => item.sale_price)
      const cashAdded = !isNaN(parseFloat(this.optional_cash)) ? this.optional_cash : 0
      if(price.length) {
        return (formattedPrice) ?
          '$' + ((price.reduce((a, b) => a + b, 0)/100) + parseFloat(cashAdded)).toFixed(2) : price.reduce((a, b) => a + b, 0) + (cashAdded * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(cashAdded)) : cashAdded * 100
    },
    /**
     * This function is used to check item can be added for trade
     * or limit exceeds
     * @returns {boolean}
     */
    canAddMoreItems() {
      const itemsCount = this.getYourTradeItems.map(i => i.quantity).reduce((a, b) => a + b, 0)
      if (itemsCount < MAX_ITEMS_ALLOWED) {
        return true
      } else {
        this.$toasted.error(this.$t('trades.trade_arena.your_items_length', [MAX_ITEMS_ALLOWED]))
        return false
      }
    },
    /**
     * This function is used to show result on the basis of search
     * it passes a param term which consist of search query then it will
     * call api to get records
     * @param term
     */
    onSearchInput(term) {
      this.searchText = term
      this.getInventory()
    },
    doneClose(){
      this.$refs.myBottomSheet.close();
    },
    clearItems(){
      this.$store.commit('trade/setTradeItemsEmpty',[])
    },
    applyFilters(data){
      this.orderFilter = data.orderFilter ? data.orderFilter : null
      this.categoryFilter = data.category ? data.category : null
      this.sizeTypesFilter = data.sizeType ? data.sizeType : null
      this.sizeFilter = data.sizes ? data.sizes: null
      this.getInventory()
    },
    showFilters(){
      this.filterScreen = true;
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.clear,.done
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-regular
  letter-spacing: -0.02em
  color: $color-gray-23
.offer-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-bold
  letter-spacing: -0.02em
  color: $color-black-1
.est-val
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-regular
  letter-spacing: -0.02em
  color: $color-gray-25

.pro-image
  width: 81px
.remove-item
  height: 13px
  width: 13px
  z-index: 1000
  background: $color-red-24
.minus
  width: 7px
  height: 2px
  margin-top: 6px
  margin-left: 3px
.item-inventory
  height: 161px
  width: 99px
.item-name
  width: 85px
  font-size: 11px
  color: $color-gray-69
.item-box-condition,.item-caption-description
  width: 85px
  font-size: 11px
  color: $color-gray-5
.invent-item
  width: 164px
  height: 265px
.item-image-trade
  width: 134px
  border-radius: 0
.image-wrapper-inventory
  height: 185px
  width: 164px
.plus-icon-add-trade
  right: 5px
  top: 7px
  z-index: 1000
.your-inventory
  background: $color-white-1

.inventory-items
  @media (max-width: 380px)
    width: 375px
    overflow: hidden
.overlay-inventory
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.item-caption-inventory
  background: $color-white-1

.invent-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  @include body-30
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  max-width: 160px

.invent-color,.invent-box
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  @include body-30
  color: $color-gray-5
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  max-width: 160px
.overlay-image
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.image-wrapper
  width: 99px
  height: 112.4px
.item-caption
  background: $color-white-1
  padding-left: unset
.color-blue
  color: $color-blue-20
.bottom-sheet::v-deep
  .bottom-sheet__card
    background: $color-gray-1
.invent-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-bold
  letter-spacing: -0.02em
  color: $color-black-1
.invent-subheading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-regular
  letter-spacing: -0.02em
  color: $color-gray-25
.input-search
  width: 306px
.add-item-invent
  background: url('~/assets/img/trades/select-inventory.svg')
  width: 100px
  height: 143px
.select-invent
  font-family: $font-family-montserrat
  font-style: normal
  @include body-29-normal
  letter-spacing: 0.005em
  color: $color-black-1
  padding-top: 43px
.upto-three
  font-family: $font-family-montserrat
  font-style: normal
  @include body-29-bold
  letter-spacing: 0.005em
  color: $color-gray-5
  padding-top: 13px
</style>
