<template>
  <div ref="tradeArena" class="trade-arena">
    <index-mobile v-if="mobileView"/>
    <div v-else>
    <trade-completed v-if="trade_completed" :trade="getSubmittedOffer"></trade-completed>
    <div v-else>
    <create-trade-search-item v-if="search_item" :product="search_item" productFor="tradeArena" :progressBar="false" :padding="true" />
    <b-row v-else>
    <b-col v-if="Object.keys(trade).length && !trade_completed" class=" p-0" :class="{'cont-height':isPayment}" :md="isPayment ? 9 : 12">
      <div>
        <div class="text-center mb-1">
          <div class="heading d-flex justify-content-center pt-2">{{$t('trades.trade_arena.arena')}}</div>
          <div class="sub-heading">{{$t('trades.trade_hub.trade_id')}}:{{ $route.params.id }}</div>
        </div>
        <div v-if="!isPayment && !isExpire" class="share-icons position-absolute">
          <div class="icons">
            <div id="popover-bottom" class="mr-2">
              <img :src="require('~/assets/img/trades/share.svg')">
            </div>
            <div class="">
              <img :src="require('~/assets/img/trades/eye.svg')">
            </div>
          </div>
          <b-popover target="popover-bottom" placement="bottom" triggers="click">
            <div class="d-flex align-items-start flex-column justify-content-center h-90">
              <span class="font-weight-bold ml-4 mb-3">{{$t('trades.trade_arena.share')}}</span>
              <div class="social-icons">
                <div class="twitter">
                  <b-icon icon="twitter" class="twt-icon" role="button"></b-icon></div>
                <b-icon icon="facebook" class="facebook" role="button"></b-icon>
                <img :src="require('~/assets/img/instagram.png')" class="instagram" role="button">
                <b-icon icon="link45deg" class="link-icon" role="button"></b-icon>
              </div>
            </div>
          </b-popover>
        </div>
        <div class="d-flex justify-content-center trade-values align-items-center">
          <div class="header-values-div d-flex justify-content-between align-items-center">
            <div class="their-value text-center">
              <div>{{$t('trades.their_value')}}</div>
              <div class="their-value-text">{{theirTotal()}}</div>
            </div>
            <div>
              <div v-if="!isExpire" class="">
                <countdown :time="countDownTimer(trade.created_at)" :transform="countDownTimerTransform">
                  <template slot-scope="{days, hours, minutes,seconds}">
                    <div class="d-flex">
                      <div class="d-block text-center p-o-17"  v-if="days">
                        <div class="time-val">{{ days? days.replace('d','') : '' }}</div>
                        <div class="time-text">{{$tc('common.day')}}</div>
                      </div>
                      <div class="d-block text-center p-17">
                        <div class="time-val">{{ hours ? hours.replace('h','') : '' }}</div>
                        <div class="time-text">{{$t('common.hours')}}</div>
                      </div>
                      <div class="d-block text-center p-17">
                        <div class="time-val">{{ minutes? minutes.replace('m',''): '' }}</div>
                        <div class="time-text">{{$t('common.mins')}}</div>
                      </div>
                      <div class="d-block text-center p-17">
                        <div class="time-val">{{seconds ? seconds.replace('s','') : ''}}</div>
                        <div class="time-text">{{$t('common.secs')}}</div>
                      </div>
                    </div>
                  </template>
                </countdown>
              </div>
              <div v-else class="text-danger text-bold text-capitalize text-center">{{$t('trades.trade_arena.expired_at')}} {{ getExpiryDateTime(trade.created_at) | formatDateTimeString }}</div>
            </div>
            <div class="their-value text-center">
              <div>{{$t('trades.your_value')}}</div>
              <div class="their-value-text">{{yourTotal()}}</div>
            </div>
          </div>
        </div>
        <div :class="{'timings-left' : isPayment}">
        </div>
        <div class="center-container" :class="{'center-cont-height':(trade.offers.length > ITEM_COUNT_ONE || getYourTradeItems.length > ITEM_COUNT_ONE) , 'center-container-margin': isPayment, 'mt-5': isExpire, 'pt-5': isExpire }">
          <div class="left-item" :class="{'left-item-margin':trade.offers.length == ITEM_COUNT_ONE && getYourTradeItems.length > ITEM_COUNT_ONE}">
<!--            <div class="item-head" :class="{'heading-left': trade.offers.length > ITEM_COUNT_ONE}">{{$t('trades.trade_arena.theirs')}}</div>-->
            <div v-for="(item,index) in trade.offers" :id="trade.offers.length === ITEM_COUNT_THREE ?'item-'+index : ''" :key="index" class="item" :class="[((trade.offers.length > ITEM_COUNT_ONE )|| (getYourTradeItems.length > ITEM_COUNT_0)) ? 'item-length' : 'item-normal']">
              <div class="image-wrapper position-relative">
              <img class="item-image" :src="item.inventory.product | getProductImageUrl" :class="{'item-image-cond':(trade.offers.length > ITEM_COUNT_ONE || getYourTradeItems.length > ITEM_COUNT_0) }"/>
              <div class="overlay"></div>
              </div>
              <div class="item-caption">
                <span class="item-name">{{ item.inventory.product.name}}</span>
                <span class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{ item.inventory.packaging_condition.name }}</span>
                <span class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                <span class="item-size">{{$t('trades.trade_arena.size')}} {{ item.inventory.size.size }}</span>
              </div>
            </div>
          </div>
          <div class="center-item">
            <div v-if="trade.offers.length > ITEM_COUNT_ONE" class="pointer-left"></div>
            <div class="long-line" :class="{'long-line-length' : trade.offers.length == ITEM_COUNT_ONE }"></div>
            <img :src="require('~/assets/img/trades/border.svg')" />
            <div class="long-line" :class="{'long-line-length' : (getYourTradeItems.length == ITEM_COUNT_0 || getYourTradeItems.length == ITEM_COUNT_ONE) }"></div>
            <div v-if="getYourTradeItems.length > ITEM_COUNT_ONE" class="pointer-right"></div>
          </div>
          <div class="right-item" :class="{'right-item-margin':trade.offers.length > ITEM_COUNT_ONE && (getYourTradeItems.length === ITEM_COUNT_0 || getYourTradeItems.length === ITEM_COUNT_ONE)}">
<!--            <div class="item-head" :class="{'heading-right': getYourTradeItems.length > ITEM_COUNT_0}">{{$t('trades.trade_arena.yours')}}</div>-->
            <div  v-if="getYourTradeItems.length" class="">
              <div  v-for="(item,index) in getYourTradeItems" :id="getYourTradeItems.length > ITEM_COUNT_TWO ?'your-item-'+index : 'your-item'" :key="index" class="preview item-length mb-4" :class="{'yml': isPayment && getYourTradeItems.length > ITEM_COUNT_TWO}">
                <div class="remove-item" @click="decrementOrRemoveItem(item)">
                  <div class="minus"></div>
                </div>
                <div class="image-wrapper position-relative">
                <img v-if="item.product" class="item-image" :src="item.product | getProductImageUrl" alt="image" :class="{'item-image-cond':(trade.offers.length > ITEM_COUNT_ONE || getYourTradeItems.length > ITEM_COUNT_0) }"/>
                <img v-else class="item-image" :src="item | getProductImageUrl" alt="image" :class="{'item-image-cond':(trade.offers.length > ITEM_COUNT_ONE || getYourTradeItems.length > ITEM_COUNT_0) }"/>
                <div v-if="item.product" class="overlay"></div>
                </div>
                <div class="item-caption">
                  <span class="item-name">{{  (item.product && item.product.name) ? item.product.name : item.name  }}</span>
                  <span class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{  (item.box_condition && item.box_condition.name) ? item.box_condition.name :item.box_condition }}</span>
                  <span class="item-caption-description">{{  (item.product  && item.product.colorway) ? item.product.colorway : item.colorway }}</span>
                  <span class="item-size">{{$t('trades.trade_arena.size')}} {{ item.size && item.size.size }}</span>
                </div>
              </div>
            </div>
            <div v-if="getYourTradeItems.length === ITEM_COUNT_0" :class="[getYourTradeItems.length > ITEM_COUNT_ONE ? 'item-length' : 'item-normal']"   @drop="onDrop($event)"
                @dragover.prevent
                @dragenter.prevent>
            <img :src="require('~/assets/img/trades/tradeNow.svg')">
            </div>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center mb-4">
          <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
            <span class="fair-trade-label"></span>
            <Meter :fair="getFairTradeValue()" heading="trades.trade_arena.fair_trade_meter" :highest="theirTotal(false)" :lowest="0" :value="yourTotal(false)"/>
          </div>
<!--          <div>-->
<!--            <div class="amounts-input">-->
<!--              <input type="text"  class="theirs" disabled :value="`${$t('trades.trade_arena.theirs')}: ${theirTotal()}`">-->
<!--              <input type="text"  class="yours" disabled :value="`${$t('trades.trade_arena.yours')}: ${yourTotal()}`">-->
<!--            </div>-->
<!--          </div>-->
          <span v-if="!cash_added && !isExpire" class="optional-text"><span :class="{'active': addCash}" @click="setCashType(addCashType)">{{$t('trades.add_cash')}}</span><span class="ml-4" :class="{'active': !addCash}" @click="setCashType(requestCashType)">{{$t('trades.request_cash')}}</span></span>
          <div v-if="!cash_added && !isExpire" class="optional-input d-flex">
            <div class="position-relative">
            <span v-if="optional_cash" class="position-absolute input-mt ml-2">$</span>
            <input v-model="optional_cash" type="text" :placeholder="$t('trades.trade_arena.enter_amount_usd')" class="optional-input-field">
            </div>
            <button @click="addOptionalCash(true)">{{$t('trades.trade_arena.confirm')}}</button>
          </div>
          <div v-else-if="cash_added && !isExpire">
            <div class="d-flex cash-added justify-content-center mt-4">
              <div>
                <img :src="require('~/assets/img/icons/dollar.svg')" class="ml-4 mr-2">
                {{$t('trades.trade_arena.you_added_cash',{'0': optional_cash })}}
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
          <b-btn  v-if="!isExpire && !isPayment" ref="btnShow" class="next-btn" @click="showPoorTradeConfirmationModal">
            {{$t('trades.trade_arena.next')}}
          </b-btn>
          <b-btn v-if="isPayment" class="back-btn-trade" @click="goBack" >{{$t('trades.trade_arena.go_back')}}</b-btn>
        </div>
        <div v-if="!isPayment || isExpire" class="trade-footer pb-5">
          <div v-if="!login_user" class="overlay">
            <b-row class="justify-content-center">
              <b-row class="col-md-12 justify-content-center">
                <div class="signup-text">
                {{$t('trades.trade_arena.sign_up_buy_sell_offer_or_trade')}}
                </div>
              </b-row>
              <b-row class="col-md-12 justify-content-center">
                <b-btn class="acc-btn" @click="$router.push('/login')">
                  {{$t('trades.trade_arena.create_an_account')}}
                </b-btn>
              </b-row>
            </b-row>
          </div>
          <div v-if="isExpire" class="expired">
            <div class="expire-item">{{$t('trades.trade_arena.expired')}}</div>
          </div>
          <div v-else class="px-5">
            <div class="d-flex pl-4">
            <span class="trade-inventory pt-4">
              {{$t('trades.trade_arena.your_inventory',[inventoryItems.length])}}
              <sup role="button"><img  id="inventoryPopover" :src="infoIcon"/></sup>
            </span>
            <span class="show-wants pt-4" @click="viewWants()" role="button">{{$t('trades.trader_wants')}}</span>
            </div>
            <b-popover target="inventoryPopover" triggers="hover" placement="top" >
              {{$t('trades.trade_arena.inventory_popover')}}
            </b-popover>
            <hr>
            <div class="container-fluid p-0 mt-4 pt-3">
              <div class="pb-md-4 w-100 d-flex">
                <div class="col-md-6 pl-0">
                  <div class="form browse-search">
                    <SearchInput
                      :value="searchText"

                      :placeholder="$t('create_listing.trade.offer_items.search_by')"
                      :clearSearch="true"
                      inputHeight="46px"
                      bordered
                      @change="onSearchInput"
                    />
                  </div>
                  <div class="position-absolute z-100">
                    <SearchedProductsBelowSearchTextBox :productItems="searchedItems" productsFor="tradeItemArena" />
                  </div>
                </div>
                <div class="col-md-6 mt--4 pl-5 pr-0">
                  <span class="filter-by">{{$t('trades.trade_arena.filter_by')}}</span>
                  <div class="d-flex">
                    <client-only>
                      <CustomDropdown v-model="categoryFilter" :options="categoryItems" type="single-select"
                          :label="categoryFilterLabel" class="mr-3 width-156 h-43" width="155px" borderRadius="4px" paddingX="5px"
                          optionsWidth="custom" dropDownHeight="46px" @getResults="getInventory" @change="changeCategory" />
                      <CustomDropdown v-model="sizeTypesFilter" :options="filters.size_types" type="multi-select-checkbox"
                          :label="sizeTypesFilterLabel" class="mr-3 width-156 h-43" width="155px" borderRadius="4px" paddingX="5px"
                          optionsWidth="custom" dropDownHeight="46px" @getResults="getInventory" @change="changeSizeTypeFilter"/>
                      <CustomDropdown v-model="sizeFilter" :options="filters.sizes" type="multi-select-checkbox"
                          :label="sizeFilterLabel" class="mr-3 width-156 h-43" width="155px" borderRadius="4px" paddingX="5px"
                          optionsWidth="custom" dropDownHeight="46px" @getResults="getInventory" @change="changeSizeFilter" />
                    </client-only>
                    <b-btn class="filter-btn ml-19" @click="getInventory()">{{$t('trades.trade_arena.apply')}}</b-btn>
                  </div>
                </div>
              </div>
              <client-only>
                <div v-if="!inventoryItems.length" class="col-md-12">
                  <div class="no-item">{{$t('trades.trade_arena.no_items')}}</div>
                  <b-btn class="add-items">{{$t('trades.trade_arena.add_items')}}</b-btn>
                </div>
                <div v-else class="carousel row pl-2">
                  <div v-for="(item,index) in inventoryItems" :key="index" class="item invent-item">
                    <div draggable @dragstart="startDrag($event, item)">
                      <div class="d-relative">
                        <img alt="No Image" class="plus-icon-add-trade" role="button" :src="require('~/assets/img/icons/addPlus.svg')"
                            @click="addYourItem(item)"/>
                      </div>
                      <div class="d-relative">
                        <img class="item-image-trade" :src="item.product | getProductImageUrl" alt="image" />
                        <div class="overlay"></div>
                      </div>
                      <div class="item-caption">
                        <span class="item-name">{{item.product && item.product.name}}</span>
                        <span class="item-box-condition">{{$t('common.box_condition')}}: {{item.packaging_condition && item.packaging_condition.name}}</span>
                        <span class="item-caption-description">{{item.product && item.product.colorway}} {{$t('trades.trade_arena.size')}} {{item.size && item.size.size}}</span>
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
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <TraderWants :wants="wants"/>
      <PoorTradeConfirmationModal :poorTrade="checkForPoorTrade()"></PoorTradeConfirmationModal>
      <AlreadyListedModal :listingId="itemListingId" :item="alreadyListedItemDetails" @confirm="addOrIncrementYourItem" />
    </b-col>
    <CheckoutSidebar  v-if="isPayment" class="order-summary" />
    </b-row>
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
import Meter from '~/components/common/Meter'
import SearchInput from '~/components/common/SearchInput'
import CustomDropdown from '~/components/common/CustomDropdown'
import {Pagination} from '~/components/common'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox'
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
  DEFAULT_CATEGORY,
  UNAUTHORIZED
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
  TAKE_SEARCHED_PRODUCTS,
  OFFER_SENT, CASH_TYPE_REQUESTED
} from '~/static/constants/trades'
import IndexMobile from '~/pages/trades/_id/IndexMobile';

export default {
  name: 'Index',
  components: {
    IndexMobile,
    CreateTradeSearchItem,
    SearchedProductsBelowSearchTextBox,
    TraderWants,
    PoorTradeConfirmationModal,
    CustomDropdown,
    SearchInput,
    Meter,
    TradeCompleted,
    Countdown,
    Pagination,
    AlreadyListedModal,
    CheckoutSidebar
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
      mobileView: false,
      addCashType: CASH_TYPE_ADDED,
      requestCashType: CASH_TYPE_REQUESTED,
      addCash: true,
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
    ...mapGetters('browse', ['filters']),
    ...mapGetters('trade', ['getYourTradeItems', 'getSubmittedOffer', 'getVendorTradeSummary']),// List of your trade items from store

    isExpire(){
      const date = new Date(this.trade.created_at)
      // add expiry days to date
      const expiryDate = date.setDate(date.getDate() + TRADE_EXPIRY_DAYS)
      return new Date(expiryDate) < new Date()
    }
  },
  created() {
    this.getTrade()
  },
  mounted(){
    this.screenWidth();
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
    this.$store.commit('trade/removeYourTradeItems')
    this.$store.commit('trade/addTrade',null) // commit is used to set state empty
    this.fetchFilters()
    this.fetchVendorTradeSummary()
    this.getInventory()
    this.fetchSubmittedOffer({ trade_id: this.$route.params.id, type: OFFER_SENT }).then(() => {
      this.trade_completed = !!this.getSubmittedOffer
    })

  },
  methods: {
    ...mapActions('browse', ['fetchFilters']), // Action to call api request to get filter
    ...mapActions('trade', ['fetchVendorTradeSummary', 'fetchSubmittedOffer']), // Action to call api request to get vendor trade summary
    ...mapActions('trades', ['checkIfItemIsInListingItem', 'searchProductsList']),
    ...mapGetters('auth', ['isVendor']),

    screenWidth(){
      const self = this;
      const myObserver = new ResizeObserver(entries => {
        // this will get called whenever div dimension changes
        entries.forEach(entry => {
          self.mobileView = entry.contentRect.width <= 450;
        });
      });
      const tradeDiv = this.$refs.tradeArena
      myObserver.observe(tradeDiv);
    },
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
    addOrIncrementYourItem(item) {
        this.$store.commit('trade/setYourTradeItems', item)
        this.updateActiveTrade()
        this.$nextTick(() => this.$forceUpdate())
    },
    /**
     * This function is used to get trade items against trade id
     * get trade ID from route parameter
     */
    getTrade() {
      if(this.$auth.user.id && !this.isVendor()){
        this.$router.push('/profile/vendor-hub/apply')
      }else{
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
            if(error.response.status === UNAUTHORIZED){
              this.$store.commit('auth/setLoginRedirectUrl', `/trades/${this.$route.params.id}`)
            }
            this.$toasted.error(this.$t(error.response.data.error))
          })
        }
    },
    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeCategory(selectedCategory) {
      this.categoryFilter = selectedCategory
      const categoryFilteredKey = this.categoryItems.find(item => item.value === this.categoryFilter)
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
      this.sizeTypesFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeTypesFilter, 1) || this.$t('trades.create_listing.vendor.wants.size_type') // 1 is max number of labels show in filter
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
      this.sizeFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeFilter, 2) || this.$t('trades.create_listing.vendor.wants.size') // 2 is a max labels show in filter
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
        this.checkIfItemIsInListingItem({
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
        this.searchProductsList({
          search: term.toLowerCase(),
          take: TAKE_SEARCHED_PRODUCTS
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
    setCashType(val){
     this.addCash = val === this.addCashType
     this.cashType = val
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.h-43
  height: 43px
.heading
  font-family: $font-family-montserrat
  font-style: normal
  @include body-1-medium
  letter-spacing: -0.02em
  text-transform: uppercase
  color: $color-black-1
  width: unset
  height: unset
.sub-heading
  line-height: 130%
  color: $color-gray-5
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
  z-index: 99

.optional-input-field
  width: 251px
  height: 38px
  background: $color-white-1
  border: 0.5px solid $color-gray-23
  border-radius: 4px
  box-shadow: inset 0px 6px 9px $color-gray-100
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
  width: 204px
  height: 232px
  border-radius: 0

.image-wrapper
  height: 220px
  background: $color-white-4

#item-0
  margin-top: 130px
#your-item-0
  margin-top: 130px
.header-values-div
  background: $color-white-4
  border-radius: 4px
  height: 72px

.their-value
  font-family: $font-family-montserrat
  font-style: normal
  @include body-17-normal
  text-transform: uppercase
  color: $color-gray-5
  width: 364px
.their-value-text
  font-weight: $medium
  line-height: 150%
  color: $color-black-1
.p-o-17
  padding: 0 17px
.p-17
  padding: 0 17px
  border-left: 0.5px solid $color-white-20
.time-val
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-medium
  color: $color-gray-5
.time-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $light
  @include body-6
  color: $color-gray-5
.left-item,.right-item
  height: 280px
  width: 203px
.item-normal
  width: 203px
  height: 280px
  max-height: 280px
  min-height: 280px
.item-image
  width: 191px
  height: auto
  margin-left: 6px
.overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.item-caption
  background: $color-white-1
#item-1
  margin-bottom: 30px
.right-item-margin,.left-item-margin
  margin-top: 11%
.right-item .item,.right-item .preview
  border: unset
.item-length
  height: 280px
.remove-item
  z-index: 100
.share-icons
  right: 11.4%
  margin-top: -30px
  z-index: 10
.fair-trade-division
  border: unset
.active
  color: $color-black-4
  font-weight: $medium
.optional-input > button
  border-radius: 4px
  background: $color-blue-20
  border: 1px solid $color-blue-20
.next-btn
  border-radius: 4px
  background: $color-black-1
  width: 111px
  border: 1px solid $color-black-1
  color: $color-gray-56
  @include body-13-medium
.trade-footer
  background: unset
.expired
  background: $color-white-1
.trade-inventory
  font-family: $font-family-sf-pro-display
  font-size: 20px
  line-height: 100%
.show-wants
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold
  font-size: 20px
  line-height: 100%
  letter-spacing: 0.01em
  color: $color-gray-4
  margin-left: 67px
.filter-btn
  border: 1px solid $color-black-1
  border-radius: 5px
  color: $color-black-1
  background: $color-white-1
  height: 46px

.back-btn-trade
  border: 1px solid $color-blue-20
  border-radius: 8px
  color: $color-blue-20
.back-btn-trade:hover
  color: $color-white-1
.z-100
  z-index: 100
</style>
