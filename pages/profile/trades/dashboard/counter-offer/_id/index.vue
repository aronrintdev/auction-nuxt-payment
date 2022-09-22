<template>
  <div>
    <b-row v-if="getLastSubmittedOffer && !searchItem">
      <b-col :md="isPayment ? 9 : 12">
        <b-row class="justify-content-between d-flex justify-content-center ml-54 pt-4">
          <b-col>
            <div class="offer-id-head">{{ $t('trades.offer_id') }} #{{getOffer.id}}</div>
            <div class="offer-sum-text">{{ $t('trades.counter_offer') }}</div>
          </b-col>
        </b-row>
        <div class="offer-card m-3">
          <div class="center-container"
              :class="{'center-cont-height':(getTheirItems.length > ONE_ITEM || getYourItems.length) }">
            <div class="left-item" :class="{'left-item-margin':getTheirItems.length === ONE_ITEM && getYourItems.length}">
              <div class="item-head-trade-hub">{{ $t('trades.trade_arena.theirs') }}:</div>
              <div v-for="(item, index) in getTheirItems" :id="getTheirItems.length === THREE_ITEMS ?'trade-item-'+index : ''"
                  :key="'their-trade-item-key-'+index" class="item mb-4"
                  :class="[((getTheirItems.length > ONE_ITEM )|| (getYourItems.length)) ? 'item-length' : 'item-normal']">
                <div v-if="!editYours" class="position-relative">
                  <div class="position-absolute remove-item-icon" role="button" @click="removeItem(index)">
                    <img :src="require('~/assets/img/trades/minus-icon.svg')">
                  </div>
                </div>
                <img class="item-image" :src="item.inventory.product | getProductImageUrl"
                    :class="{'item-image-cond':(getTheirItems.length > ONE_ITEM || getYourItems.length) }"/>
                <div class="item-caption">
                  <span class="item-name">{{ item.inventory.product.name }}</span>
                  <span
                    class="item-box-condition">{{
                      $t('trades.trade_arena.box_condition')
                    }}: {{ item.inventory.packaging_condition.name }}</span>
                  <span class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                  <span class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                </div>
              </div>
            </div>
            <div class="center-item">
              <div v-if="getTheirItems.length > ONE_ITEM" class="pointer-left"></div>
              <div class="long-line" :class="{'long-line-length' : getTheirItems.length === ONE_ITEM }"></div>
              <img :src="require('~/assets/img/trades/border.svg')"/>
              <div class="long-line" :class="{'long-line-length' : getYourItems.length === ONE_ITEM }"></div>
              <div v-if="getYourItems.length > ONE_ITEM" class="pointer-right"></div>
            </div>
            <div class="right-item"
                :class="{'right-item-margin':getTheirItems.length > ONE_ITEM || getYourItems.length === ONE_ITEM,'mt-10p': getTheirItems.length > ONE_ITEM && getYourItems.length === ONE_ITEM,'mt-8p': getTheirItems.length === ONE_ITEM && getYourItems.length === ONE_ITEM}">
              <div class="item-head-trade-hub">{{ $t('trades.trade_arena.yours') }}:</div>
              <div v-if="getYourItems.length" >
                <div v-for="(item, index) in getYourItems"
                    :id="getYourItems.length > TWO_ITEMS ?'your-trade-item-'+index : 'your-item'" :key="'your-trade-item-key-'+index"
                    class="preview item-length mb-4">
                  <div v-if="editYours" class="position-relative">
                    <div class="position-absolute remove-item-icon" role="button" @click.stop="removeItem(index)">
                      <img :src="require('~/assets/img/trades/minus-icon.svg')">
                    </div>
                  </div>
                  <img v-if="item.inventory.product" class="item-image" :src="item.inventory.product.image" alt="image"
                      :class="{'item-image-cond':(getTheirItems.length > ONE_ITEM || getYourItems.length) }"/>
                  <img v-else class="item-image" :src="item.inventory.image" alt="image"
                      :class="{'item-image-cond':(getTheirItems.length > ONE_ITEM || getYourItems.length) }"/>
                  <div class="item-caption">
                    <span v-if="item.inventory.product" class="item-name">{{ item.inventory.product.name }}</span>
                    <span v-else class="item-name">{{ item.inventory.name }}</span>
                    <span v-if="item.inventory.product" class="item-box-condition">
                      {{ $t('trades.trade_arena.box_condition') }}: {{ item.inventory.packaging_condition.name }}
                    </span>
                    <span v-else class="item-box-condition">
                      {{ $t('trades.trade_arena.box_condition') }}: {{ item.inventory.packaging_condition.name }}
                    </span>
                    <span v-if="item.inventory.product" class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                    <span v-else class="item-caption-description">{{ item.inventory.colorway }}</span>
                    <span v-if="item.inventory.product" class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                    <span v-else class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
              <Meter :highest="getTheirTotal(false)"
                    :lowest="0"
                    :value="getYourTotal(false)"
                    :fair="getFairTradeValue()"
                    :heading="false"
              />
            </div>
            <div>
              <div class="amounts-input">
                <!-- TODO -->
                <input type="text" class="theirs" disabled :value="$t('trades.trade_arena.theirs') + `: ${getTheirTotal()}`">
                <input type="text" class="yours" disabled :value="$t('trades.trade_arena.yours') + `: ${getYourTotal()}`">
              </div>
            </div>
            <div class="trade-hub-buttons mt-4 mb-4">
              <span class="optional-text">{{ $t('trades.trade_arena.optional') }}</span>
              <div v-if="!cashAdded" class="optional-input d-flex">
                <div class="position-relative">
                  <span v-if="optionalCash" class="position-absolute input-mt ml-2">$</span>
                  <input v-model="optionalCash" type="text" :placeholder="$t('trades.trade_arena.enter_amount_usd')"
                        class="optional-input-field">
                </div>
                <Button v-if="editYours" variant="primary" pill class="add-cash-btn" @click="addOptionalCash(true)">{{ $t('trades.add_cash') }}</Button>
                <Button v-else variant="primary" pill class="add-cash-btn" @click="addOptionalCash(true)">{{ $t('trades.request_cash') }}</Button>
              </div>
              <div v-else-if="cashAdded">
                <div class="d-flex cash-added justify-content-center mt-4">
                  <div>
                    <img :src="require('~/assets/img/icons/dollar.svg')" class="ml-4 mr-2">
                    {{$t('trades.trade_arena.you_added_cash',{'0': optionalCash })}}
                    <sup class="ml-1 mr-4" role="button"><img  id="cashPopover" :src="infoIcon"/></sup>
                  </div>
                  <b-popover target="cashPopover" triggers="hover" placement="top" >
                    {{$t('trades.trade_arena.balance_the_deal')}}
                  </b-popover>
                </div>
                <div class="text-center edit-cash pt-1" role="button" @click="addOptionalCash(false)">
                  {{$t('trades.trade_arena.edit_cash')}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-3 p-3 inventory-card-trade">
          <div class="inventory-heading pl-4">
            {{ (editYours) ? $t('trades.your_inventory', {0: inventoryItems.length}) : $t('trades.their_inventory', {0: inventoryItems.length}) }}
            <span v-if="editYours" class="sub-heading-inventory">{{ $t('trades.add_remove_items') }}</span>
            <Button v-if="editYours" variant="primary" class="pull-right mr-5" @click="editTheirsItems()">{{ $t('trades.edit_theirs') }}</Button>
            <Button v-else variant="primary" class="pull-right mr-5" @click="editYoursItems()">{{ $t('trades.edit_yours') }}</Button>
          </div>
          <b-col v-if="editYours" md="9" sm="12" class="pt-4 pl-4">
            <SearchInput
              bordered
              variant="primary"
              :placeholder="$t('trades.trade_arena.search_inventory')"
              :clearSearch="true"
              @change="onSearchInput"
            />
            <SearchedProductsBelowSearchTextBox v-if="searchedItems.length > 0" :productItems="searchedItems" :productsFor="productFor" width="700px" class="position-absolute"/>
          </b-col>
          <b-col md="12" class="pt-4 pl-4">
            <label>{{ $t('trades.filter_by') }}</label>
            <div class="d-flex">
              <b-col md="2" sm="12" class="pl-0">
                <client-only>
                  <CustomDropdown v-model="categoryFilter" :options="categoryItems" type="single-select"
                    :label="categoryFilterLabel" class="mr-3 width-156" optionsWidth="custom"
                    width="150px"
                    dropDownHeight="38px" variant="white"
                    @getResults="getInventory"
                    @change="changeCategory"/>
                </client-only>
              </b-col>
              <b-col md="2" sm="12">
                <client-only>
                  <CustomDropdown v-model="sizeTypesFilter" :options="filters.size_types" type="multi-select-checkbox"
                    :label="sizeTypesFilterLabel" class="mr-3 width-156" optionsWidth="custom"
                    dropDownHeight="38px" variant="white"
                    @getResults="getInventory"
                    @change="changeSizeTypeFilter"/>
                </client-only>
              </b-col>
              <b-col md="2" sm="12">
                <client-only>
                  <CustomDropdown v-model="sizeFilter" :options="filters.sizes" type="multi-select-checkbox"
                    :label="sizeFilterLabel" class="mr-3 width-156" optionsWidth="custom"
                    dropDownHeight="38px" variant="white"
                    @getResults="getInventory"
                    @change="changeSizeFilter"/>
                </client-only>
              </b-col>
              <b-col md="2" sm="12">
                <Button class="filter-btn" @click="getInventory">{{ $t('trades.filter') }}</Button>
              </b-col>
            </div>
          </b-col>
          <div v-if="inventoryItems.length" class="carousel row justify-content-between inventory-items-trade">
            <div v-for="(item) in inventoryItems" :key="item.id" class="item invent-item">
              <div>
                <b-row class="justify-content-between">
                  <b-col>
                    <div class="size-car">{{ $t('trades.trade_arena.size') }} {{item.size.size}}</div>
                  </b-col>
                  <b-col class="d-flex justify-content-end pr-3 pt-3">
                    <img v-if="!editYours" class="plus-icon-add-trade" role="button"
                        :src="require('~/assets/img/icons/addPlus.svg')" @click="checkIfItemAlreadyListed(item)"/>
                    <img v-else class="plus-icon-add-trade" role="button"
                        :src="require('~/assets/img/icons/addPlus.svg')" @click="addYourInventoryItem(item)"/>
                  </b-col>
                </b-row>
                <img class="item-image-counteroffer" :src="item.product | getProductImageUrl" width="200px" />
                <div class="item-caption">
                  <span class="item-name">{{ item.product.name }}</span>
                  <span class="item-box-condition">{{ $t('common.box_condition') }}: {{item.packaging_condition.name}}</span>
                  <span class="item-caption-description">{{item.product.colorway}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="row justify-content-between inventory-items-trade">
            {{ $t('trades.create_listing.vendor.wants.no_products_found') }}
          </div>
          <b-row class="justify-content-center mb-3">
            <Pagination
              v-model="page"
              :total="totalCount"
              :per-page="perPage"
              :per-page-options="perPageOptions"
              @page-click="handlePageClick"
              @per-page-change="handlePerPageChange"
            />
          </b-row>
        </div>
        <b-row class="justify-content-center mb-5 mt-4">
          <Button variant="primary" class="mr-5" @click="showPoorTradeConfirmationModal">{{ $t('trades.counter_offer') }}</Button>
          <Button variant="outline-secondary" @click="$bvModal.show('discardModel')">{{ $t('trades.discard_changes') }}
          </Button>
        </b-row>
      </b-col>
      <CheckoutSidebar v-if="isPayment" class="order-summary" />
    </b-row>
    <create-trade-search-item v-if="searchItem" :yourItems="getYourItems" :product="searchItem" :productFor="productFor" :progressBar="false" :padding="true" />
    <discard-model @discard="redirectToOfferPage()" />
    <AlreadyListedModal :listingId="itemListingId" :item="alreadyListedItemDetails" @confirm="addYourInventoryItem" />
    <PoorTradeConfirmationModal :poorTrade="(tradeCondition === FILTER_CONDITION_POOR)"></PoorTradeConfirmationModal>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import debounce from 'lodash.debounce'
  import Meter from '~/components/common/Meter'
  import PoorTradeConfirmationModal from '~/pages/trades/_id/PoorTradeConfirmationModal'
  import Button from '~/components/common/Button'
  import SearchInput from '~/components/common/SearchInput'
  import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox.vue'
  import CustomDropdown from '~/components/common/CustomDropdown'
  import AlreadyListedModal from '~/pages/profile/create-listing/trades/AlreadyListedModal'
  import Pagination from '~/components/common/Pagination'
  import DiscardModel from '~/pages/profile/trades/dashboard/counter-offer/DiscardModel'
  import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem'
  import CheckoutSidebar from '~/components/checkout/trades/ShoppingCartOrder'
  import {
    GOOGLE_MAPS_BASE_URL
  } from '~/static/constants/environments'
  import {
    PAGE,
    PER_PAGE,
    PER_PAGE_OPTIONS,
    TOTAL_COUNT,
    ONE_ITEM,
    TWO_ITEMS,
    THREE_ITEMS,
    PUBLIC_INVENTORY,
    MAX_LABELS_IN_CUSTOM_DROP_DOWN,
    CASH_TYPE_ADDED,
    CASH_TYPE_REQUESTED,
    PRODUCT_FOR_COUNTER_OFFER,
    FILTER_CONDITION_POOR,
    FILTER_CONDITION_EXCELLENT,
    FILTER_CONDITION_FAIR,
    DEFAULT_FAIR_TRADE_VALUE,
    OFFER_TYPE_YOURS,
    OFFER_TYPE_THEIR,
    COUNTER_OFFER_TYPE,
    TAKE_SEARCHED_PRODUCTS
  } from '~/static/constants/trades'
  import {
    MAX_ITEMS_ALLOWED
  } from '~/static/constants/create-listing'

export default {
  name: 'Index',
  components: {
    DiscardModel,
    Pagination,
    CustomDropdown,
    SearchInput,
    Meter,
    Button,
    SearchedProductsBelowSearchTextBox,
    PoorTradeConfirmationModal,
    CreateTradeSearchItem,
    AlreadyListedModal,
    CheckoutSidebar
  },
  layout: 'Profile',
  data() {
    return {
      GOOGLE_MAPS_BASE_URL,
      infoIcon: require('~/assets/img/icons/info-icon.svg'),
      offer: null,
      tradeId: 0,
      ONE_ITEM,
      THREE_ITEMS,
      TWO_ITEMS,
      PUBLIC_INVENTORY,
      searchText: null,
      searchedItems: [],
      searchItem: null,
      categoryItems: [
        {text: this.$t('common.footwear'), value: 'sneakers'},
        {text: this.$t('common.apparel'), value: 'apparel'},
        {text: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      optionalCash: '0.00',
      cashAdded: 0,
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      inventoryItems: [],
      perPage: PER_PAGE,
      page: PAGE,
      totalCount: TOTAL_COUNT,
      perPageOptions: PER_PAGE_OPTIONS,
      editYours: true,
      cashType: CASH_TYPE_ADDED,
      CASH_TYPE_REQUESTED,
      productFor: PRODUCT_FOR_COUNTER_OFFER,
      itemListingId: 0,
      alreadyListedItemDetails: {},
      tradeCondition: FILTER_CONDITION_POOR,
      FILTER_CONDITION_POOR,
      FILTER_CONDITION_EXCELLENT,
      FILTER_CONDITION_FAIR,
      fairTradePercentage:  (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
      isPayment: false,
      MAX_ITEMS_ALLOWED,
      submittedItemType: OFFER_TYPE_YOURS,
      OFFER_TYPE_THEIR,
      COUNTER_OFFER_TYPE
    }
  },
  computed: {
    ...mapGetters('browse', ['filters']),
    ...mapGetters('counter-offer', ['getOffer', 'getYourItems', 'getTheirItems', 'getLastSubmittedOffer', 'getYourVendorId', 'getTheirVendorId']),
    ...mapGetters('trade', ['getActiveTrade'])
  },
  created() {
    this.$store.commit('counter-offer/clearStates')
  },
  mounted(){

    this.loadData()
    this.fetchFilters()

    this.$root.$on('add_product_counter_offer', (val) => { // this emit is used to add product in yours item
      this.searchItem = val
    })

    this.$root.$on('add_new_product', (item) => {
      this.resetSearch()
      this.addYourInventoryItem(item)
    })

    // To move user from search page to back in trade offer page
    this.$root.$on('back_to_counter_offer',()=>{
      this.resetSearch()
    })

    // Emit listener to emtpy search items
    this.$root.$on('click_outside', () => {
      this.resetSearch()
    })
  },
  methods: {
    ...mapActions('counter-offer', ['fetchOfferDetails']), // get filters from api call by calling action from store
    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store

    /**
     * check if trade is poor/fair
     */
     checkForPoorTrade(){
      const yourTotal = this.getYourTotal(false)
      const theirTotal = this.getTheirTotal(false)
      if(yourTotal >= theirTotal){
        this.tradeCondition = FILTER_CONDITION_EXCELLENT
      }else if(yourTotal >= this.getFairTradeValue()){
        this.tradeCondition = FILTER_CONDITION_FAIR
      }else{
        this.tradeCondition = FILTER_CONDITION_POOR
      }
      return this.tradeCondition === FILTER_CONDITION_POOR
    },
    /**
     * check if trade is poor/fair if theirs items are edited
     */
     checkForPoorTradeTheirItemsEdited(){
      const yourTotal = this.getYourTotal(false)
      const theirTotal = this.getTheirTotal(false)
      if(theirTotal >= yourTotal){
        this.tradeCondition = FILTER_CONDITION_EXCELLENT
      }else if(yourTotal >= this.getFairTradeValueForYourItems()){
        this.tradeCondition = FILTER_CONDITION_FAIR
      }else{
        this.tradeCondition = FILTER_CONDITION_POOR
      }
      return this.tradeCondition === FILTER_CONDITION_POOR
    },
    getFairTradeValue(){
      return (this.getTheirTotal(false) * this.fairTradePercentage)
    },
    getFairTradeValueForYourItems(){
      return (this.getYourTotal(false) * this.fairTradePercentage)
    },
    resetSearch(){
      this.searchItem = false
      this.searchText =  null
      this.searchedItems =  []
    },
    /**
     * This function is used to confirm add optional cash or edit
     * optional cash
     * @param value
     */
    addOptionalCash(value){
      this.cashAdded = value
      this.updateActiveTrade()
    },
    removeItem(itemIndex){
      if(this.editYours){
        this.$store.commit('counter-offer/removeYourItem', itemIndex)
      }else{
        this.$store.commit('counter-offer/removeTheirItem', itemIndex)
      }
      this.$nextTick(() => this.$forceUpdate())
      this.updateActiveTrade()
    },
    addTheirsInventoryItem(item){
      if(this.canAddMoreItems()){
        this.$store.commit('counter-offer/addTheirItem', item)
        this.updateActiveTrade()
        this.$toasted.success(this.$t('trades.item_added'))
        this.$nextTick(() => this.$forceUpdate())
      }
    },
    addYourInventoryItem(item){
      if(this.canAddMoreItems()){
        this.$store.commit('counter-offer/addYourItem', item)
        this.updateActiveTrade()
        this.$toasted.success(this.$t('trades.item_added'))
        this.$nextTick(() => this.$forceUpdate())
      }
    },

    editTheirsItems(){
      this.submittedItemType = OFFER_TYPE_THEIR
      this.editYours = false
      this.loadData()
      this.cashType = CASH_TYPE_REQUESTED
    },
    editYoursItems(){
      this.submittedItemType = OFFER_TYPE_YOURS
      this.editYours = true
      this.loadData()
      this.cashType = CASH_TYPE_ADDED
    },
    loadData(){
      const offerId = parseInt(this.$route.params.id)
      this.fetchOfferDetails({ offerId })
      this.getInventory()
    },
    redirectToOfferPage(){
      const offerId = parseInt(this.$route.params.id)
      this.$router.push(`/profile/trades/dashboard/${offerId}`)
    },
    /**
     * This function is used to check  if item
     * exits in already some listing if exists it will
     * show model else call function to add item
     * @param item
     */
    checkIfItemAlreadyListed(item) {
      const existingItem = this.getYourItems.find(val => val.id === item.id)
      if(existingItem) return true;
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
          } else{
            this.addTheirsInventoryItem(item)
            return true
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.itemListingId = null
        })
    },
    getTheirTotal(formattedPrice = true){
      const optionalCash = (!this.editYours) ? this.optionalCash : 0
      const totalPrice = this.getTheirItems.map((inventoryItem) => (inventoryItem.inventory ? inventoryItem.inventory.sale_price : inventoryItem.sale_price))
      if(totalPrice.length) {
        return (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + parseFloat(optionalCash)).toFixed(2) : totalPrice.reduce((a, b) => a + b, 0) + (optionalCash * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(optionalCash)) : optionalCash * 100
    },
    getYourTotal(formattedPrice = true){
      const optionalCash = (this.editYours) ? this.optionalCash : 0
      const totalPrice = this.getYourItems.map((inventoryItem) => (inventoryItem.inventory ? inventoryItem.inventory.sale_price : inventoryItem.sale_price))
      if(totalPrice.length) {
        return (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + parseFloat(optionalCash)).toFixed(2) : totalPrice.reduce((a, b) => a + b, 0) + (optionalCash * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(optionalCash)) : optionalCash * 100
    },
    /**
     * This function is used to check item can be added for trade
     * or limit exceeds
     * @returns {boolean}
     */
    canAddMoreItems(){
      let itemsCount = this.getYourItems.length
      if(!this.editYours){
        itemsCount = this.getTheirItems.length
      }
      if (itemsCount < MAX_ITEMS_ALLOWED) {
        return true
      } else {
        this.$toasted.error(this.$t('trades.trade_arena.your_items_length', [MAX_ITEMS_ALLOWED]))
        return false
      }
    },

    /**
     * This function is used to check if item exit in any other
     * Listing it will show us modal
     */
    showPoorTradeConfirmationModal() {
      this.updateActiveTrade()
      if(!this.editYours && this.checkForPoorTradeTheirItemsEdited()) {
        this.$root.$emit('bv::show::modal', 'poor_trade_confirmation', '#btnShow')
      }else if(!this.editYours){
        this.submitCounterOffer()
      } else if(this.checkForPoorTrade()){
        this.$root.$emit('bv::show::modal', 'poor_trade_confirmation', '#btnShow')
      }else {
        this.isPayment = true
      }
    },
    getTradeFee() {
      return 1000
    },

    setActiveTrade(){
      this.$store.commit('trade/setActiveTrade', {
        trade: this.getOffer,
        theirItems: this.getTheirItems,
        yourItems: this.getYourItems,
        cashAdded: parseInt(parseFloat(this.optionalCash)*100),
        cashType: this.cashType,
        tradeCondition: this.tradeCondition,
        submittedItemType: this.submittedItemType,
        offerType: COUNTER_OFFER_TYPE,
        theirVendorId: this.getTheirVendorId,
        tradeId: this.getOffer.trade_id,
        offerParentId: (this.getOffer.parent_id ? this.getOffer.parent_id : this.getOffer.id)
      })
    },

    updateActiveTrade(){
      this.$store.commit('trade/updateActiveTrade', {
        trade: this.getOffer,
        theirItems: this.getTheirItems,
        yourItems: this.getYourItems,
        cashAdded: parseInt(parseFloat(this.optionalCash)*100),
        cashType: this.cashType,
        tradeCondition: this.tradeCondition,
        submittedItemType: this.submittedItemType,
        offerType: COUNTER_OFFER_TYPE,
        theirVendorId: this.getTheirVendorId,
        tradeId: this.getOffer.trade_id,
        offerParentId: (this.getOffer.parent_id ? this.getOffer.parent_id : this.getOffer.id)
      })
    },
    submitCounterOffer(){
      if(this.getActiveTrade.trade){
        this.setActiveTrade()
      }
      this.$axios.post(`trades/${this.getOffer.trade_id}/offer`, {
          price: 0,
          shipping_fee: 0,
          processing_fee: 0,
          trade_fee: this.getTradeFee,
          tax: 0,
          total: 0,
          cash_added: (this.optionalCash * 100),
          cash_type: this.cashType,
          card_details: 'n/a',
          condition: this.tradeCondition,
          payment_token: 'n/a',
          offer_type: COUNTER_OFFER_TYPE,
          their_vendor_id: this.getTheirVendorId,
          your_items: this.getYourItems,
          their_items: this.getTheirItems,
          billing_address: null,
          shipping_address: null,
        }).then(() => {
          this.redirectToOfferPage()
        }).catch(error => {
          if (error.response.status === 400) {
            this.$toasted.error(this.$t(error.response.data.response_text).toString())
            return
          }
          this.$toasted.error(error.response.statusText)
      })
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
      this.getInventory()
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

      this.sizeFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeFilter, MAX_LABELS_IN_CUSTOM_DROP_DOWN)
        || this.$t('trades.create_listing.vendor.wants.size')
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
        return string.size[0].toUpperCase() + string.size.slice(1)
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
            user_id: (this.editYours ? this.getYourVendorId : this.getTheirVendorId),   // for search query
            visibility: (this.editYours ? '' : PUBLIC_INVENTORY),
            page: this.page, // no of page to change
            per_page: this.perPage, // no of records to show on per page
            ...filters
          },
        })
        .then((response) => {  // list of vendor inventory
          this.inventoryItems = response.data.data
          this.totalCount = parseInt(response.data.total)
          this.perPage = parseInt(response.data.per_page)
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
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.offer-id-head
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-16-bold
  letter-spacing: -0.02em
  text-transform: capitalize
  color: $color-black-1

.offer-sum-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1
  padding-top: 15px

.ml-54
  margin-left: 54px

.center-container
  margin: 45px 2%

.offer-card
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.item-head-trade-hub
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 17px
  color: $color-black-1
  margin-bottom: 10px
  height: 35px
  padding-top: 15px

#trade-item-0
  position: absolute
  margin-left: 115%
  margin-top: 107px

#your-trade-item-0
  position: absolute
  margin-top: 107px
  margin-left: -115%

.item
  border: 0.5px solid $light-gray-2

.optional-input-field
  width: 210px
  height: 38px
  background: $color-white-1
  border: 0.5px solid $color-gray-4
  box-sizing: border-box
  border-radius: 31px
  padding-left: 20px

.input-mt
  margin-top: 7px

.add-cash-btn
  font-size: 14px
  min-width: 180px

.inventory-card-trade
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.inventory-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1

.sub-heading-inventory
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-normal
  color: $color-gray-47
  padding-left: 15px

.filter-btn
  border-radius: 5px
  height: 42px

.inventory-items-trade
  padding: 30px 30px 30px 30px

.remove-item-icon
  right: 5px
  top: 5px

.order-summary
  padding: 0

</style>
