<template>
  <div>
    <trade-completed v-if="trade_completed" :trade="getSubmittedOffer"></trade-completed>
    <add-cash v-else-if="addCash" :yourAmount="yourTotal()" :theirAmount="theirTotal()" :addedAmount="optional_cash" :selectedType="optional_cash_type" @click="cancelCash" @change="addAmount" />
    <div v-else>
      <create-trade-search-item v-if="search_item" :product="search_item" productFor="tradeArena" :progressBar="false" :padding="true" />
      <div v-else>
        <b-col v-if="Object.keys(trade).length && !trade_completed">
          <div class="d-flex justify-content-between price-container">
            <div class="theirs-total d-flex align-items-center">
              <img class="list-icon" :src="require('~/assets/img/trades/list-icon.svg')">
              <div class="price-text" @click="leftDataShow = !leftDataShow">
                {{$t('trades.trade_arena.theirs')}}: {{theirTotal()}}
              </div>
            </div>
            <div class="theirs-total d-flex align-items-center">
              <img class="list-icon" :src="require('~/assets/img/trades/list-icon.svg')">
              <div class="price-text">
                {{$t('trades.trade_arena.yours')}}: {{yourTotal()}}
              </div>
            </div>
          </div>
          {{trade.offers.length}} | {{getYourTradeItems.length}}
          <div  :class="trade.offers.length  === ITEM_COUNT_ONE && getYourTradeItems.length === ITEM_COUNT_ONE ? 'center-container-one'
             :trade.offers.length  === ITEM_COUNT_ONE && getYourTradeItems.length === ITEM_COUNT_0 ? 'center-container-one'
             :trade.offers.length  === ITEM_COUNT_TWO && getYourTradeItems.length === ITEM_COUNT_0 ? 'center-container-20'
             : trade.offers.length  === ITEM_COUNT_ONE && getYourTradeItems.length === ITEM_COUNT_TWO ? 'center-container-two'
 : trade.offers.length  === ITEM_COUNT_ONE && getYourTradeItems.length === ITEM_COUNT_THREE ?'center-container-three' 
 : 'center-container' ">


            <div v-if="leftDataShow" class="left-item"  :class="trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_0 ? 'left-item-one-zero'
                :getYourTradeItems.length === ITEM_COUNT_ONE && trade.offers.length === ITEM_COUNT_ONE  ?  'left-item-one' 
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_0 ? 'left-item-two-zero' 
                : trade.offers.length === ITEM_COUNT_THREE && getYourTradeItems.length === ITEM_COUNT_0 ? 'left-item-three-zero'
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_ONE ? 'left-item-21'
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'left-item-22'
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_THREE ? 'left-item-23'
                : trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'left-item-one-two' : trade.offers.length === ITEM_COUNT_ONE
                &&  getYourTradeItems.length === ITEM_COUNT_THREE ? 'left-item-one-three' : ''">
               
               <div v-for="(item,index) in trade.offers" :id="trade.offers.length === ITEM_COUNT_THREE ?'card-'+index : ''" :key="index" class="item mb-4">
                  <div class="image-wrapper">
                    <img class="pro-image" :src="getProductImageUrl(item.inventory.product)"/>
                    <div class="overlay-black"></div>
                    <div class="item-caption-black">
                    <span class="wants-size-hover">{{ item.inventory.product.name}}</span>
                    <div class="wants-size-hover">{{item.inventory.product.colorway}},{{$t('trades.trade_arena.size')}} {{item.inventory.size.size}}</div>
                    <div class="wants-box-hover">Box: {{item.inventory.packaging_condition.name}}</div>
                    <div></div>
                  </div>
                  </div>
                </div>
              </div>
              <div v-else class="left-item" :class="trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_0 ? 'left-item-one-zero'
                :getYourTradeItems.length === ITEM_COUNT_ONE && trade.offers.length === ITEM_COUNT_ONE  ?  'left-item-one' 
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_0 ? 'left-item-two-zero' 
                : trade.offers.length === ITEM_COUNT_THREE && getYourTradeItems.length === ITEM_COUNT_0 ? 'left-item-three-zero'
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_ONE ? 'left-item-21'
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'left-item-22'
                : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_THREE ? 'left-item-23'
                : trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'left-item-one-two' : trade.offers.length === ITEM_COUNT_ONE
                &&  getYourTradeItems.length === ITEM_COUNT_THREE ? 'left-item-one-three' : ''">
                
                
                
                <div v-for="(item,index) in trade.offers" :id="trade.offers.length === ITEM_COUNT_THREE ?'card-'+index : ''" :key="index" class="item mb-4">
                  <div class="image-wrapper">
                    <img class="pro-image" :src="getProductImageUrl(item.inventory.product)"/>
                    <div class="overlay"></div>
                  </div>
                  <div class="item-caption">
                    <span class="item-name">{{ item.inventory.product.name}}</span>
                  </div>
                </div>
              </div>
              <div class="center-item">
                <div v-if="trade.offers.length > ITEM_COUNT_ONE" class="pointer-left" :class="{'pointer-right-two-items':trade.offers.length === ITEM_COUNT_TWO}"></div>
                <div class="position-relative center-img d-flex justify-content-between">
                <div v-if="(trade.offers.length === ITEM_COUNT_THREE || trade.offers.length === ITEM_COUNT_ONE || trade.offers.length === ITEM_COUNT_TWO)" class="line-bar"></div>
                <div class="fair-text position-absolute">{{$t('trades.fair')}}</div>
                <img class="trade-img position-absolute" :src="require('~/assets/img/trades/mb-trade-icon.svg')" />
                <div v-if="(trade.offers.length === ITEM_COUNT_THREE || trade.offers.length === ITEM_COUNT_ONE || trade.offers.length === ITEM_COUNT_TWO)" class="line-bar-2"></div>
                <div v-if="(getYourTradeItems.length === ITEM_COUNT_THREE || getYourTradeItems.length === ITEM_COUNT_ONE || getYourTradeItems.length === ITEM_COUNT_TWO)" class="line-bar"></div>
                </div>
                <div v-if="getYourTradeItems.length > ITEM_COUNT_ONE" class="pointer-right" :class="{'pointer-right-two-items':getYourTradeItems.length === ITEM_COUNT_TWO}"></div>
              </div>
              <div class="right-item" :class="trade.offers.length === ITEM_COUNT_TWO && 
               getYourTradeItems.length === ITEM_COUNT_ONE ?  'right-item-one' : trade.offers.length === ITEM_COUNT_TWO &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'right-item-two-two' : trade.offers.length === ITEM_COUNT_THREE &&  getYourTradeItems.length === ITEM_COUNT_ONE ? 'right-item-three-one': trade.offers.length === ITEM_COUNT_THREE &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'right-item-three-two' : trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_ONE ? 'right-item-one-one' : trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_TWO ? 'right-item-one-two' : trade.offers.length === ITEM_COUNT_ONE &&  getYourTradeItems.length === ITEM_COUNT_THREE ? 'right-item-one-three' : ''">
                <div  v-if="getYourTradeItems.length" class="">
                  <div  v-for="(item,index) in getYourTradeItems" :id="getYourTradeItems.length > ITEM_COUNT_ONE ?'your-card-'+index : 'your-item'" :key="index" class="preview mb-4">
                    <div class="remove-item" @click="decrementOrRemoveItem(item)">
                      <div class="minus"></div>
                    </div>
                    <div class="image-wrapper">
                      <img class="pro-image" :src="getProductImageUrl(item.product ? item.product : item )" alt="image" />
                      <div class="overlay"></div>
                    </div>
                    <div class="item-caption">
                      <span class="item-name">{{  (item.product && item.product.name) ? item.product.name : item.name  }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="getYourTradeItems.length === ITEM_COUNT_0 || getYourTradeItems.length < ITEM_COUNT_THREE"
                >
            <img v-if="getYourTradeItems.length <= 0 " :class="trade.offers.length  === ITEM_COUNT_ONE && getYourTradeItems.length === ITEM_COUNT_0 ? 'dumy-image'
              : trade.offers.length  === ITEM_COUNT_TWO  && getYourTradeItems.length === ITEM_COUNT_0 ? 'dumy-image-0'
              : trade.offers.length  === ITEM_COUNT_THREE  && getYourTradeItems.length === ITEM_COUNT_0 ? 'dumy-image-03'
        : getYourTradeItems.length  === ITEM_COUNT_ONE ? 'dumy-image-1'
        : getYourTradeItems.length  === ITEM_COUNT_TWO ? 'dumy-image-2'
        : 'dumy-image-3'" :src="require('~/assets/img/box3.svg')">
            </div>
              </div>
            </div>
          <div class="d-flex justify-content-center">
            <!-- Meter -->
            <Meter :fair="getFairTradeValue()" heading="trades.trade_arena.fair_trade_meter" :highest="theirTotal(false)" :lowest="0" :value="yourTotal(false)"/>
          </div>
          <div>
            <b-btn  class="add-cash" @click="cashAdd">{{buttonText}}</b-btn>
            <div v-if="!isExpire && !isPayment" >
              <div class="d-flex guranty-box">
                 <div>
                  <img class="granty-img" :src="require('~/assets/img/guranty.png')">
                 </div>
                 <div class="authenticity-text">
                   {{$t('features.auctions.certified_authentic_products_desc_new')}}
                 </div>
              </div>
            </div>

            <div v-if="!isExpire && !isPayment" >
            <div class="detail-heading">
              {{$t('trades.create_listing.table_columns.details')}}
            </div>
            <div class="details pb-4">
              <b-row class="justify-content-between pb-2">
                <div>{{$t('trades.trade_id')}}</div>
                <div>{{trade.id}}</div>
              </b-row>
              <b-row class="justify-content-between pb-2">
                <div>{{$t('trades.trade_arena.time_left')}}</div>
                <div class="timer">
                  <countdown :time="countDownTimer(trade.created_at)" :transform="countDownTimerTransform">
                    <template slot-scope="{days, hours, minutes}">
                      <div class="time-left">
                        <span class="time">{{ days }} {{ hours }} {{ minutes }}</span>
                      </div>
                    </template>
                  </countdown>
                </div>
              </b-row>
              <b-row class="justify-content-between pb-2">
                <div>{{$t('products.offers')}}</div>
                <div>{{totalOffersReceived}}</div>
              </b-row>
              <b-row class="justify-content-between">
                <div>{{$t('trades.estimated_value_trade')}}</div>
                <div>{{theirTotal()}}</div>
              </b-row>
            </div>
            </div>
            <!-- Wants section -->
            <div v-if="!isExpire && !isPayment" >
            <div class="wants-heading">
              {{$t('trades.trader_wants')}} 
            </div>
            <div class="d-flex wants-container">
              <div v-for="(item,index) in wants" :key="index" class="trader-wants">
                <div class="wants-wrapper">
                  <img :src="item.product.image" >
                  <div class="overlay"></div>
                </div>
                <div class="wants-name">{{item.product.name}}</div>
                <div class="wants-size">{{item.product.colorway}},{{$t('trades.trade_arena.size')}} {{item.size.size}}</div>
                <div class="wants-box">Box: {{item.packaging_condition.name}}</div>
              </div>
            </div>
            </div>
            <!-- Buttons Section -->
            <div v-if="!isExpire && !isPayment"  class="d-flex justify-content-between mt-3 mb-4  ml-1 mr-1">
              <b-btn   class="invent-btn" @click="showInventory">{{$t('orders.inventory')}}</b-btn>
              <b-btn   class="next-btns" @click="showPoorTradeConfirmationModal">{{$t('trades.trade_arena.next')}}</b-btn>
            </div>
          </div>
          <inventory-bottom-sheet ref="inventory"/>
          <TraderWants :wants="wants"/>
          <PoorTradeConfirmationModal :poorTrade="checkForPoorTrade()"></PoorTradeConfirmationModal>
          <AlreadyListedModal :listingId="itemListingId" :item="alreadyListedItemDetails" @confirm="addOrIncrementYourItem" />
        </b-col>
        <CheckoutSidebar  v-if="isPayment" class="bg-white order-summary" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import debounce from 'lodash.debounce'
import Countdown from '@chenfengyuan/vue-countdown'
import PoorTradeConfirmationModal from '~/pages/trades/_id/PoorTradeConfirmationModal'
import TraderWants from '~/pages/trades/_id/TraderWants'
import TradeCompleted from '~/pages/trades/_id/TradeCompleted'
import AlreadyListedModal from '~/pages/profile/create-listing/trades/AlreadyListedModal'
import CheckoutSidebar from '~/components/checkout/trades/ShoppingCartOrder'
import {
  GOOGLE_MAPS_BASE_URL
} from '~/static/constants/environments'
import {
  TRADE_EXPIRY_DAYS,
  API_PROD_URL,
  PRODUCT_IMG_WIDTH,
  MAX_ITEMS_ALLOWED,
  PER_PAGE_ITEMS,
  DEFAULT_PER_PAGE_ITEMS,
  DEFAULT_CATEGORY
} from '~/static/constants'
import { fromNow } from '~/utils/string'
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem'
import {
  ITEM_COUNT_0,
  ITEM_COUNT_ONE,
  ITEM_COUNT_TWO,
  ITEM_COUNT_THREE,
  DEFAULT_FAIR_TRADE_VALUE,
  FILTER_CONDITION_POOR,
  FILTER_CONDITION_FAIR,
  FILTER_CONDITION_EXCELLENT,
  CASH_TYPE_ADDED,
  OFFER_TYPE_YOURS,
  OFFER_TYPE_THEIR,
  OFFER_TYPE,
  TAKE_SEARCHED_PRODUCTS, CASH_TYPE_REQUESTED
} from '~/static/constants/trades'
import InventoryBottomSheet from '~/pages/trades/_id/InventoryBottomSheet';
import Meter from '~/components/common/Meter';
import AddCash from '~/pages/trades/_id/AddCash';

export default {
  name: 'IndexMobile',
  components: {
    AddCash,
    Meter,
    InventoryBottomSheet,
    CreateTradeSearchItem,
    TraderWants,
    PoorTradeConfirmationModal,
    TradeCompleted,
    AlreadyListedModal,
    CheckoutSidebar,
    Countdown,
  },
  layout: 'IndexLayout',
  data() {
    return {
      infoIcon: require('~/assets/img/icons/info-icon.svg'),
      selected_category: DEFAULT_CATEGORY,
      trade: {},
      wants: [],
      url: API_PROD_URL,
      width: PRODUCT_IMG_WIDTH,
      inventoryItems: [],
      isPayment:false,
      login_user: true,
      trade_completed: false,
      perPage: DEFAULT_PER_PAGE_ITEMS,
      page: 1,
      totalCount: 0,
      perPageOptions: PER_PAGE_ITEMS,
      searchText: null,
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.trade_arena.category'),
      sizeTypesFilterLabel: this.$t('trades.trade_arena.size_type'),
      sizeFilterLabel: this.$t('trades.trade_arena.size'),
      categoryItems: [
        {text: this.$t('common.footwear'), value: 'sneakers'},
        {text: this.$t('common.apparel'), value: 'apparel'},
        {text: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      totalOffersReceived: 0,
      MAX_ITEMS_ALLOWED,
      optional_cash: '0.00',
      optional_cash_type:null,
      cash_added: 0,
      searchedItems: [],
      itemListingId: 0,
      alreadyListedItemDetails: {},
      search_item: null,
      ITEM_COUNT_0,
      ITEM_COUNT_ONE,
      ITEM_COUNT_TWO,
      ITEM_COUNT_THREE,
      userTradeOffer: null,
      fairTradePercentage: (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
      tradeCondition: FILTER_CONDITION_POOR,
      FILTER_CONDITION_FAIR,
      FILTER_CONDITION_EXCELLENT,
      FILTER_CONDITION_POOR,
      cashType: CASH_TYPE_ADDED,
      OFFER_TYPE_YOURS,
      OFFER_TYPE_THEIR,
      OFFER_TYPE,
      cashTypeAdded:CASH_TYPE_ADDED,
      cashTypeReq:CASH_TYPE_REQUESTED,
      addCash: false,
      leftDataShow:false,
    }
  },
  head() {
    return {
      script: [
        {
          src: GOOGLE_MAPS_BASE_URL,
          async: true,
          preload: true,
        }
      ]
    }
  },
  computed:{
    ...mapGetters('browse', ['filters'                            ]),
    ...mapGetters('trade', ['getYourTradeItems', 'getSubmittedOffer', 'getVendorTradeSummary']),// List of your trade items from store

    isExpire(){
      const date = new Date(this.trade.created_at)
      // add expiry days to date
      const expiryDate = date.setDate(date.getDate() + TRADE_EXPIRY_DAYS)
      return new Date(expiryDate) < new Date()
    },
    buttonText(){
      if (this.optional_cash > 0 && this.optional_cash_type === 'add_cash')
        return this.$t('trades.cash_added',{0:this.optional_cash})
      else if (this.optional_cash > 0 && this.optional_cash_type === 'request_cash')
        return this.$t('trades.cash_requested',{0:this.optional_cash})
      else return this.$t('trades.add_cash')
    }
  },
  created() {
    this.getTrade()
  },
  mounted(){

    this.$root.$on('trade_done',(val)=>{ // this emit is used to complete trade and show result
      this.trade_completed = val
    })
    this.$root.$on('add_product_trade_arena', (val) => { // this emit is used to add product in yours item
      this.search_item = val
    })
    // To move user from search page to back in trade offer page
    this.$root.$on('back_to_search_offer',()=>{
      this.search_item = false
      this.searchText =  null
      this.searchedItems =  []
    })
    this.$store.commit('trade/addTrade',null) // commit is used to set state empty
    this.fetchFilters()
    this.fetchVendorTradeSummary()

    this.trade_completed = this.getSubmittedOffer

  },
  methods: {
    ...mapActions('browse', ['fetchFilters']), // Action to call api request to get filter
    ...mapActions('trade', ['fetchVendorTradeSummary']), // Action to call api request to get vendor trade summary

    /**
     * check if trade is poor/fair
     */
    checkForPoorTrade(){
      const yourTotalInNumber = this.yourTotal(false)
      const theirTotalInNumber = this.theirTotal(false)
      if(yourTotalInNumber >= theirTotalInNumber){
        this.tradeCondition = FILTER_CONDITION_EXCELLENT
      }else if(yourTotalInNumber >= this.getFairTradeValue()){
        this.tradeCondition = FILTER_CONDITION_FAIR
      }else{
        this.tradeCondition = FILTER_CONDITION_POOR
      }
      return this.tradeCondition === FILTER_CONDITION_POOR
    },
    getFairTradeValue(){
      return (this.theirTotal(false) * this.fairTradePercentage)
    },

    /**
     * This function is used to get total amount of offer items vendor
     * and return amount in string
     * @returns {string}
     */
    theirTotal(formattedPrice = true){
      const price = this.trade.offers.map((value) => value.inventory.sale_price)
      if(price.length) {
        return (formattedPrice) ?
          '$' + (price.reduce((a, b) => a + b, 0)/100).toFixed(2) : price.reduce((a, b) => a + b, 0)
      }
      return (formattedPrice) ? '$0.00' : 0
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
     * Load Product Image URL
     * @param item
     */
    getProductImageUrl(product){
      return API_PROD_URL + '/' + product?.category?.name + '/' + product?.sku + '/image?width=' + PRODUCT_IMG_WIDTH
    },
    /**
     * This function is used to drag item and store data of dragged item in its
     * event
     * @param evt
     * @param item
     */
    startDrag (evt, item) { // evt consist of draggable event listeners for dragged item
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('item', JSON.stringify(item))
    },
    /**
     * This function is used to drop dragged item and pass item data
     * to function add in your items
     * @param evt
     */
    onDrop (evt) { // event consist of event listener data contain stored item
      const data = evt.dataTransfer.getData('item')
      const fData = JSON.parse(data)
      if(this.canAddMoreItems() && this.checkIfItemAlreadyListed(fData)){
        this.addOrIncrementYourItem(fData)
      }
    },
    /**
     * This function is used to add or increment your trade item in store
     * @param item
     */
    addOrIncrementYourItem: debounce(function (item) {
      this.$store.commit('trade/setYourTradeItems', item)
      this.updateActiveTrade()
      this.$nextTick(() => this.$forceUpdate())
    }, 100),
    /**
     * This function is used to get trade items against trade id
     * get trade ID from route parameter
     */
    getTrade() {
      this.$axios.get(`trades/${this.$route.params.id}`)
        .then(result => {
          this.trade = result.data.data
          this.wants = result.data.data.wants
          this.totalOffersReceived = result.data.data.submitted_offers.length
          this.checkForPoorTrade()
          this.$store.commit('trade/setActiveTrade', {
            trade: this.trade,
            theirItems: this.trade.offers,
            yourItems: this.getYourTradeItems,
            cashAdded: parseInt(parseFloat(this.optional_cash)*100),
            cashType: this.cashType,
            tradeCondition: this.tradeCondition,
            submittedItemType: OFFER_TYPE_YOURS,
            offerType: OFFER_TYPE,
            theirVendorId: this.trade.vendor_id,
            tradeId: parseInt(parseFloat(this.$route.params.id)),
            offerParentId: null
          })
          // if vendor is owner of this trade then redirect to dashboard
          if(this.trade.vendor_id === this.$auth.user.vendor.id){
            this.$router.push(`/profile/trades/dashboard/${this.trade.id}/offers`)
          }
        })
        .catch((error) => { // error will return us error
          this.$toasted.error(this.$t(error.response.data.error))
        })
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
     * This function do first letter of word capital
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter(string) {
      if(typeof string === 'string')
        return string[0].toUpperCase() + string.slice(1)
      else if(typeof string === 'object' && string.size && typeof string.size === 'string')
        return string.size[0].toUpperCase() + string.size.slice(1)
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
      this.sizeTypesFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeTypesFilter, 1) || this.$t('trades.create_listing.vendor.wants.size_type') // 1 is max number of labels show in filter
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
      this.sizeFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeFilter, 2) || this.$t('trades.create_listing.vendor.wants.size') // 2 is a max labels show in filter
    },
    /**
     * This function is used to show selected items by joining them
     * in string format separated by commas
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
     * This function is used to get expired time by calculating time
     * dateTime param receive expired date and time
     * @param dateTime
     * @returns {number}
     */
    countDownTimer(dateTime) {
      const date = new Date(dateTime)
      // add expiry days to date
      const expiryDate = date.setDate(date.getDate() + TRADE_EXPIRY_DAYS)
      return expiryDate - new Date().getTime()
    },
    /**
     * This function is used to make expiry remaining time in fancy format (i.e. in 5 days, in 3 hours, in 1 week)
     * dateTime param receive expired date and time
     * @param dateTime
     * @returns {String}
     */
    remainingTime(dateTime){
      const date = new Date(dateTime)
      // add expiry days to date
      const expiryDate = date.setDate(date.getDate() + TRADE_EXPIRY_DAYS)
      return fromNow(new Date(expiryDate))
    },
    /**
     * Get trade expiry datetime
     * @param createdAt
     */
    getExpiryDateTime(createdAt){
      const date = new Date(createdAt)
      // add expiry days to date
      const expiryDate = date.setDate(date.getDate() + TRADE_EXPIRY_DAYS)
      return (new Date(expiryDate))
    },
    /**
     * This function is used to return time if value
     * is greater than 0 and key is seconds
     * @param props
     * @returns {{}}
     */
    countDownTimerTransform(props) {
      const transformedProps = {}

      Object.entries(props).forEach(([key, value]) => {
        if (value > 0 || (key === 'seconds' && props.totalSeconds > 0)) transformedProps[key] = `${value}${key[0]}`
      })

      return transformedProps
    },
    /**
     * This function is used to add your trade item by click plus icon
     * @param item
     */
    addYourItem(item){
      if(this.canAddMoreItems() && this.checkIfItemAlreadyListed(item)){
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
        cashType: this.optional_cash_type === 'add_cash' ? this.cashTypeAdded : this.cashTypeReq,
        tradeCondition: this.tradeCondition
      })
    },

    /**
     * This function is used to check if item exit in any other
     * Listing it will show us modal
     */
    showPoorTradeConfirmationModal() {
      if(this.checkForPoorTrade()){
        this.$root.$emit('bv::show::modal', 'poor_trade_confirmation', '#btnShow')
      }else{
        this.isPayment = true
      }
    },

    /**
     * This function is used to open wants model to view
     * trader wants items
     */
    viewWants() {
      this.$root.$emit('bv::show::modal', 'wantItems', '#btnWant')
    },
    /**
     * This function is used to move back from
     */
    goBack(){
      this.isPayment = false
    },
    /**
     * This function is used to show result on the basis of search
     * it passes a param term which consist of search query then it will
     * call api to get records
     * @param term
     */
    onSearchInput(term) {
      this.searchText = term
      if (term) {
        this.$axios
          .post('/search/products', {
            filters: {
              search: term.toLowerCase(), // search query param
              take: TAKE_SEARCHED_PRODUCTS, // No of record to take
            },
            page: 1
          })
          .then((response) => { // response will get us list of search query
            this.searchedItems = response.data.results.data
          })
          .catch((error) => { // error will return us error
            this.$toasted.error(this.$t(error.response.data.error))
            this.searchedItems = []
          })
      } else {
        this.searchText = null
        this.searchedItems = []
      }
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
            search: '', // search query param for api call
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
     * This function is used to change pagination page no
     * and get record again for that page
     * @param bvEvent
     * @param page
     */
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
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
      }
    },
    /**
     * This function is used to check item can be added for trade
     * or limit exceeds
     * @returns {boolean}
     */
    canAddMoreItems(){
      const itemsCount = this.getYourTradeItems.map(i => i.quantity).reduce((a, b) => a + b, 0)
      if (itemsCount < MAX_ITEMS_ALLOWED) {
        return true
      } else {
        this.$toasted.error(this.$t('trades.trade_arena.your_items_length', [MAX_ITEMS_ALLOWED]))
        return false
      }
    },
    /**
     * This function is used to confirm add optional cash or edit
     * optional cash
     * @param value
     */
    addOptionalCash(value){
      this.cash_added = value
      this.updateActiveTrade()
    },
    showInventory(){
      this.$refs.inventory.open();
    },
    cashAdd(){
      this.addCash = true;
    },
    cancelCash(){
      this.addCash = false;
    },
    addAmount(value){
      this.optional_cash = value.amount
      this.optional_cash_type = value.add_cash ? 'add_cash':'request_cash'
      this.addCash = false
      this.yourTotal(false)
      this.updateActiveTrade()
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.h-43
  height: 43px

.width-156
  min-width: 156px
  background: $color-white-1

.heading-left
  position: absolute
  margin-top: 30%
  left: 105%
  width: 275px

.heading-right
  position: absolute
  margin-top: 30%
  left: -140%
  width: 275px

.d-relative
  position: relative

.plus-icon-add-trade
  position: absolute
  right: 5%
  top: 15px
  z-index: 1000

.optional-input-field
  width: 236px
  height: 38px
  background: $color-white-1
  border: 0.5px solid $color-gray-4
  box-sizing: border-box
  border-radius: 31px
  padding-left: 20px

.input-mt
  margin-top: 7px

.cash-added
  background: $color-gray-1
  border-radius: 4px
  min-width: 247px
  padding: 7px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 17px
  color: $color-black-1

.edit-cash
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 17px
  color: $color-blue-1

.item-image-trade
  width: 95px
  height: 61px
  border-radius: 0

.image-wrapper
  height: 134px
  background: $color-white-4
  position: relative

.right-item,.left-item
  width: 118px
  height: 153px

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

.item-name
  @include body-6
  font-weight: $light
  font-family: $font-sp-pro
  font-style: normal
.item-name-hover
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 11px
  color: $color-white-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.center-item
  min-width: 10px
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 21px
  margin: 0 10px
  width: unset
  max-width: 780px

.pointer-left,.pointer-right
  width: 25px
  height: 370px

.pointer-left
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2

.pointer-right
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2

.long-line
  width: 17px

.center-img
  width: 31px
.trade-img
  background: $color-white-1
  margin-left: -5px
  height: 25px
  width: 25px

.center-container
  min-height: 450px
  margin: 0 15px
  display: flex
  justify-content: center
  margin-bottom: 140px
.center-container-one
  min-height: 100px
  margin: 0 30px
  display: flex
  justify-content: center
.center-container-20
  min-height: 450px
  margin: 0 30px
  display: flex
  justify-content: center

.center-container-two
  min-height: 300px
  margin: 0 30px
  display: flex
  justify-content: center
  margin-bottom: 60px
.center-container-three
  min-height: 510px
  margin: 0 30px
  display: flex
  justify-content: center
  margin-bottom: 60px

.image-wrapper
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70
  .overlay-black
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #0c0c0ccf
.pro-image
  width: 117px
  height: 100%
.line-bar
  width: 9px
  height: 2px
  background: #E3E3E3
  margin: 15px 9px 6px -20px
.line-bar-2
  width: 9px
  height: 2px
  background: #E3E3E3
  margin-right: -4px
  margin-top: 15px
  margin-left: 9px

.item-caption
  background: $color-white-1
  padding: 5px 0

.right-item .item, .right-item .preview
  border: unset
.pointer-right-two-items
  height: 223px
.right-item-margin-top
  margin-top: 60px
.right-item-one
  margin-top: 148px
  margin-bottom: 60px
  margin-left: 15px
.right-item-one-one
  margin-top: 60px
  margin-bottom: 60px
  margin-left: 15px
.right-item-two-two
  margin-top: 60px
  margin-bottom: 60px
  margin-left: 15px
.right-item-one-two
  margin-top: 10px
  margin-bottom: 60px
  margin-left: 15px
.right-item-three-one
  margin-top: 148px
  margin-bottom: 60px
  margin-left: 15px
.right-item-three-two
  margin-top: 60px
  margin-bottom: 60px
  margin-left: 15px
.left-item-one
  margin-top: 60px
  margin-bottom: 60px
  margin-right: 15px
.left-item-21
  margin-top: 60px
  margin-bottom: 60px
  margin-right: 15px
.left-item-22
  margin-top: 60px
  margin-bottom: 60px
  margin-right: 15px
.left-item-23
  margin-top: 60px
  margin-bottom: 60px
  margin-right: 15px
.left-item-one-zero
  margin-top: 60px
  margin-bottom: 60px
  margin-right: 15px
.left-item-two-zero
  margin-top: 60px
  margin-bottom: 60px
  margin-right: 15px
.left-item-one-one
  margin-top: 60px
  margin-bottom: 60px
  margin-left: 15px
.left-item-two-two
  margin-top: 60px
  margin-bottom: 60px
  margin-left: 15px
.left-item-one-two
  margin-top: 148px
  margin-bottom: 60px
.left-item-three-one
  margin-top: 148px
  margin-bottom: 60px
.left-item-three-two
  margin-top: 60px
  margin-bottom: 60px
  margin-left: 15px
.left-item-one-three
   margin-top: 148px
.fair-text
  background: $color-white-1
  color: $color-black-1
  height: 30px
  width: 40px
  text-align: center
  z-index: 98
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  margin-top: -30px
  margin-left: -10px
  padding-top: 5px
.price-container
  margin-top: 20px
  margin-left: 30px
  margin-right: 30px

.theirs-total
  background: $color-white-4
  border-radius: 2px
  height: 38px
  width: 118px

.price-text
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 11px
  line-height: 13px
  color: $color-black-1
  padding-left: 6px

.list-icon
  height: 24px
  width: 24px
  padding-left: 6px
.add-cash
  height: 37px
  width: 315px
  margin-left: 20px
  border-radius: unset
  margin-top: 19px
  font-family: $font-montserrat
  @include body-5
  font-weight: $normal
  font-style: normal
  line-height: 17px
  background-color: $color-white-1
  color: #7196B1
.authenticity
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 14.5px
  line-height: 18px
  letter-spacing: -0.04em
  color: $color-black-1
  padding-top: 25px
.authenticity-text
  font-family: $font-montserrat
  font-style: normal
  @include body-9
  color: $color-black-1
  border-left : 1px solid #EFEFEF
  padding-left : 10px
  height : 80px
  width: 236px
  line-height: 16px


.detail-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-black-1
  margin-top: 24px
  padding-left: 10px
  padding-bottom: 15px
.details
  padding: 0 18px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-regular
  color: $color-gray-5
.timer
  color: $color-red-3
.trader-wants
  width: 164px
  height: 265px
  margin-right: 12px
.wants-wrapper
  position: relative
  width: 164px
  height: 185px
  background: $color-white-4
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70
  img
    width: 120px
    height: auto
    margin: 25px
.wants-container
    width: 375px
    overflow: scroll
    padding-left: 10px
.wants-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 13px
  line-height: 130%
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
.wants-size,.wants-box
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 13px
  line-height: 130%
  color: $color-gray-5
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.wants-size-hover,.wants-box-hover
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 12px
  line-height: 130%
  color: $color-white-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
.wants-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-black-1
  padding-left: 10px
  padding-bottom: 14px

.invent-btn,.next-btns
  width: 162px
  height: 40px

@media (max-width: 576px)
  .order-summary::v-deep
    min-width: 0
    width: 100%
    .custom-card .card-body
      padding: 15px
      background: $color-white-5
      border-radius: 10px
    .heading-1-medium
      @include body-13
    .body-4-medium
      @include body-9
    .custom-form .form-control
      background: $color-white-5
.pb-100
  padding-bottom: 100px
.dumy-image
  width : 118px
  height : 134px
  margin-top: 60px
  margin-bottom: 60px
.dumy-image-0
  width : 118px
  height : 134px
  margin-top: 148px
  margin-bottom: 60px
  margin-left : 10px
.dumy-image-1
  width : 118px
  height : 134px
  margin-top: 60px
  margin-bottom: 60px
.dumy-image-2
  width : 118px
  height : 134px
  margin-top: 148px
  margin-bottom: 60px
.dumy-image-3
  width : 118px
  height : 134px
  margin-top: 148px
  margin-bottom: 60px
.dumy-image-03
  width : 118px
  height : 134px
  margin-top: 148px
  margin-bottom: 60px
.guranty-box
  margin-top : 24px
.granty-img
  margin-left : 21px
  height : 70px
  width: 68px
.invent-btn
  background: #FFFFFF
  border: 1px solid #667799
  border-radius: 21px
  color: #667799
.next-btns
  background: #667799
  border-radius: 21px
.item-caption-black
  position: relative
  top: -100px
  padding: 10px
</style>
