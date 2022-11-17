<template>
  <div class="main-container p-2">
      <div class="d-flex mt-2">
        <div>
          <SearchInput
            :value="searchText"
            :placeholder="$t('home_page.search')"
            variant="light"
            :clearSearch="true"
            bordered
            inputHeight="33px"
            class="create-trade-search"
            @change="onSearchInput"
          />
          <SearchedProductsBelowSearchTextBox v-if="searchedItems.length > 0" :productItems="searchedItems" productsFor="wantItemTrade" width="700px" class="position-absolute"/>
        </div>
        <div @click="showFilters">
          <img class="ml-3 mt-1" :src="require('~/assets/img/filters.svg')" />
        </div>
      </div>
    <!-- Filters Section -->
    <client-only>
        <vue-bottom-sheet ref="filterSheet" max-height="90%" :is-full-screen="true" >
          <trade-arena-filters :orderFilter="true" @change="applyFilters"/>
        </vue-bottom-sheet>
      </client-only>
    <div class="mt-2">
      <div class="d-flex justify-content-center mt-3 align-items-center">
        <NavGroup
          :data="listingItems"
          :value="selectedItems"
          nav-key="trade-type"
          class="section-nav pb-4"
          @change="changeTotalTradeItems"
        />
      </div>
      <div v-show="selectedItems === 'wants_inventory'">
        <b-row>
          <b-col v-for="item in generalListItems" :key="item.id"  cols="6 mb-4">
            <div  class="create-trade-item-mobile position-relative" :draggable="true"
                  @dragstart="startDrag($event, item)">
              <div class="position-relative">
                <img alt="No Image" class="plus-icon-add position-absolute" :src="require('~/assets/img/icons/addPlus.svg')"
                     @click="addOrIncrementWantedItem(item)"/>
              </div>
              <div class="position-relative d-flex align-items-center justify-content-center prod-img">
              <object
                class="create-trade-item-image-mobile justify-content-center"
                :data="`${IMAGE_PATH}/${item.product && item.product.category && item.product.category.name}/${item.product && item.product.sku}/800xAUTO/IMG01.jpg`"
                type="image/png">
                <img class="create-trade-item-image-mobile-no justify-content-center mb-2" :src="fallbackImgUrl" alt="image"/>
              </object>
              <div class="overlay-mob position-absolute"></div>
              </div>
              <div class="create-trade-item-caption-mobile">
              <span :id="`name${item.id}`" class="create-trade-item-name">{{item.product && item.product.name }}</span>
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
                {{ item.product && item.product.colorway }}
              </b-tooltip>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!generalListItems || generalListItems.length === 0" class="col-md-12 justify-content-center">
          {{$t('create_listing.trade.no_item_found')}}
        </b-row>
      </div>
      <div v-show="selectedItems === 'wants_combinations'">
        <b-row class="d-inline">
          <b-col v-for="(combination, combinationIndex) in combinationItems" :key="combination.combination_id" cols="6" class="mb-4">
            <div class="combination-div-mobile" :draggable="true"
                 @dragstart="startDragCombination($event, combination)">
              <div class="d-flex">
                <div>
                  <object v-if="combination.combination_items[combination.selectedItemIndex].product.image"
                          :data="combination.combination_items[combination.selectedItemIndex].product.image"
                          class="com-img pointer ma-2 mt-4"
                          type="image/png">
                    <img class="com-img pointer" :src="fallbackImgUrl" alt="image"/>
                  </object>
                  <img v-else class="com-img pointer" :src="fallbackImgUrl" alt="image"/>
                </div>
                <div>
                  <div class="d-flex mt-2">
                    <div>
                      <img :src="require('~/assets/img/combination.svg')">
                      <span class="combination-title">
                          {{ $t('trades.create_listing.vendor.wants.combination_no') }} {{ combinationIndex + 1 }}
                        </span>
                    </div>
                    <div>
                      <img role="button" :alt="$t('trades.create_listing.vendor.wants.on_image')"
                           class="plus-icon"
                           :src="require('~/assets/img/icons/addPlus.svg')"
                           @click="addWantCombinationItem(combination)"/>
                    </div>
                  </div>
                  <div class="combination-info">
                    {{ combination.combination_items[combination.selectedItemIndex].product.name }}
                  </div>
                  <div class="combination-info">
                    {{ $t('trades.create_listing.vendor.wants.sku') }}:
                    {{ combination.combination_items[combination.selectedItemIndex].product.sku }}
                  </div>
                  <div class="combination-info">
                    {{ $t('trades.create_listing.vendor.wants.color') }}:
                    {{ combination.combination_items[combination.selectedItemIndex].product.colorway }}
                  </div>
                  <div class="combination-info">
                    {{ $t('trades.create_listing.vendor.wants.box_condition') }}:
                    {{ combination.combination_items[combination.selectedItemIndex].packaging_condition.name }}
                  </div>
                  <div class="combination-info">{{ $t('trades.create_listing.vendor.wants.lowest_ask') }}:
                    {{ combination.combination_items[combination.selectedItemIndex].product.estimated_market_value }}</div>
                </div>
              </div>

              <div class="d-flex justify-content-center align-items-center mt-1">
                <div v-for="(item, index) in combination.combination_items"
                     :key="item.id"  class="ml-2">
                  <div  :class="combination.selectedItemIndex === index ? 'selected-circle' : 'un-selected-circle'"  @click="setCombinationSelectedItem(combinationIndex, index)"></div>
                </div>
              </div>


              <div class="d-flex justify-content-center align-center mt-2">
                <div class="estimate-amount ml-5">{{
                    $t('trades.create_listing.vendor.wants.total_est_value')
                  }}:   ${{ estValue(combination.combination_items) }}
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!combinationItems || combinationItems.length === 0" class="col-md-12 justify-content-center">
          {{$t('trades.create_listing.no_combination_found')}}
        </b-row>
      </div>
    </div>

    <!-- Main content -->
    <create-trade-search-item v-if="search_item" :product="search_item" productFor="wantOffer"/>

    <section v-else class="content">
      <b-container fluid class="px-3">
        <div v-if="showOffer" class="selection-section show-offers" >
          <div class="row create-trade-drag-drop-item-mobile justify-content-center text-center py-2 mt-2"
               @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
            <div v-if="getTradeItemsWants.length < 1">
              <div class="create-trade-drag-drop-heading">
                {{ $t('create_listing.trade.offer_items.drag_drop_want_mobile') }}
              </div>
              <span class="create-trade-drag-drop-sub-heading">{{
                  $t('create_listing.trade.offer_items.search_at')
                }}</span>
              <b-row class="justify-content-center mt-2">
                <img class="plus-image" :src="require('~/assets/img/Plus-circle.svg')">
              </b-row>
            </div>
            <b-row v-else class="justify-content-center">
              <div v-for="item in getTradeItemsWants" :key="item.id"
                   class="create-trade-item-sm d-flex justify-content-between flex-column mr-2">
                <div class="position-relative">
                  <div class="create-trade-minus-icon-sm position-absolute" @click="removeOrDecrementWantItem(item.id)">
                    <div class="create-trade-minus-line-sm"></div>
                  </div>
                </div>
                <div class="offer-item-img-sm position-relative d-flex align-items-center justify-content-center">
                <object
                    :data="item.image"
                    class="create-trade-item-image-sm" type="image/png">
                    <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
                  </object>
                <div class="overlay-mob position-absolute"></div>
                </div>
                <div class="create-trade-item-caption-sm">
          <span :id="`name-sm${item.id}`"
                class="create-trade-item-name-sm">{{ item.name ? item.name : item.product.name }}</span>
                  <span :id="`colorway-sm${item.id}`"
                        class="create-trade-item-caption-description-sm">{{ item.colorway ? item.colorway : item.product.colorway }}</span>
                  <span class="create-trade-item-caption-description-sm">Box: {{
                      item.packaging_condition && item.packaging_condition.name
                    }}</span>
                </div>

                <b-tooltip :target="`name-sm${item.id}`" triggers="hover">
                  {{ item.name ? item.name : item.product.name }}
                </b-tooltip>

                <!-- tooltip for colorway -->
                <b-tooltip :target="`colorway-sm${item.id}`" triggers="hover">
                  {{ item.colorway ? item.colorway : item.product.colorway }}
                </b-tooltip>

              </div>
              <div v-if="getTradeWantItemQuantity < MAX_ITEMS_ALLOWED" class="create-trade-item-sm">
                <div>
                  <img class="create-trade-item-image-sm-dummy"  :src="require('~/assets/img/three-items.svg')">
                </div>
              </div>
            </b-row>
            <img :src="require('~/assets/img/trades/updown.svg')" role="button" class="position-absolute up-down-arrow" @click="showOffer = !showOffer">
          </div>
        </div>
        <infinite-loading :identifier="infiniteId" @infinite="getGeneralListItems">
          <span slot="no-more"></span>
          <span slot="no-results"></span>
        </infinite-loading>
        <infinite-loading :identifier="infiniteId" @infinite="getCombinations">
          <span slot="no-more"></span>
          <span slot="no-results"></span>
        </infinite-loading>
        <div class="d-flex justify-content-center">
          <b-btn class="create-trade-next-btn position-fixed" :disabled="!getTradeItemsWants.length"
                 @click="$router.push('/profile/create-listing/trades/confirmation')">
            {{  $t('trades.create_listing.vendor.wants.next')  }}
          </b-btn>
        </div>
        <b-col class="position-relative">
          <div v-if="!showOffer" class="offers-items d-flex align-items-center" role="button" @click="showOffer = !showOffer">
            <img :src="require('~/assets/img/trades/updown.svg')">
            <span class="offer-text">{{$t('trades.want')}}</span>
            <div v-if="getTradeItemsWants.length" class="counter-icon position-absolute d-flex justify-content-center align-items-center">{{getTradeItemsWants.length}}</div>
          </div>
        </b-col>

        <!-- /.row (main row) -->
      </b-container>
      <!-- /.container-fluid -->
    </section>
    <ViewOfferItemsModal />
    <!-- /.content -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import SearchInput from '~/components/common/SearchInput'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBoxMobile'
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem';
import ViewOfferItemsModal from '~/pages/profile/create-listing/trades/wants/ViewOfferItemsModal';
import { NavGroup } from '~/components/common'
import {IMAGE_PATH, MAX_ITEMS_ALLOWED} from '~/static/constants/create-listing'
import { PRODUCT_FALLBACK_URL } from '~/static/constants'
import { TAKE_SEARCHED_PRODUCTS } from '~/static/constants/trades'
import TradeArenaFilters from '~/components/trade/TradeArenaFilters';

/*
  Trade Wants Page
 */
export default {
  name: 'TradeWants',
  components: {
    TradeArenaFilters,
    NavGroup,
    SearchInput, // search input
    SearchedProductsBelowSearchTextBox, //  component for items show below search as search results
    CreateTradeSearchItem, // component used for item via search selection
    ViewOfferItemsModal // model to show offers items
  },
  layout: 'Profile', // Layout
  data() {
    return {
      filterSection:false,
      IMAGE_PATH, // Image production path
      MAX_ITEMS_ALLOWED,
      generalListIsOpen: false,
      combinationIsOpen: false,
      tradeWantQuantity: 0,
      categoryItems: [
        { text: this.$t('common.footwear'), value: 'sneakers' },
        { text: this.$t('common.apparel'), value: 'apparel' },
        { text: this.$tc('common.accessory', 2), value: 'accessories' },
      ],
      steps: [
        {name: this.$t('trades.create_listing.vendor.wants.offer_items'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.enter_what_you_want'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.confirm_trade'), active: false}
      ],
      searchText: null,
      pageCombination: 1,
      perPageCombination: 2,
      totalCountCombination: 0,
      perPageOptionsCombinations: [2, 4, 6, 8],
      page: 1,
      perPage: 4,
      totalCount: 0,
      perPageOptions: [4, 8, 16, 24],
      generalListItems: [],
      generalListItemsFilter: 'most_viewed',
      generalListItemsCustomFilter: [
        { text: this.$t('trades.create_listing.vendor.wants.price_low_to_high'), value: 'price_asc' },
        { text: this.$t('trades.create_listing.vendor.wants.price_high_to_low'), value: 'price_desc' }
      ],
      combinationCustomFilter: [
        { text: this.$t('trades.create_listing.vendor.wants.price_low_to_high'), value: 'price_asc' },
        { text: this.$t('trades.create_listing.vendor.wants.price_high_to_low'), value: 'price_desc' }
      ],
      combinationItems: [],
      searchedItems: [],
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      orderFilter: null,
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      orderFilterLabel: this.$t('trades.create_listing.vendor.wants.sort_by'),
      orderFilterLabelCombination: this.$t('trades.create_listing.vendor.wants.sort_by'),
      orderFilterCombination: null,
      selected_index: 0,
      selected_checkbox: [],
      combination_checkbox: [],
      search_item:  null,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      total_item_count: 3,
      listingItems: [
        { label: this.$t('trades.create_listing.vendor.wants.wants_inventory'), value: 'wants_inventory' },
        { label: this.$t('trades.create_listing.vendor.wants.wants_combinations'), value: 'wants_combinations' },
      ],
      selectedItems: 'wants_inventory',
      showOffer: false,
      wantUrl: 'vendor/want-items',
      combUrl: 'vendor/want-items',
      infiniteId: +new Date(),
      infiniteIdComb: +new Date()

  }
  },
  // get current language
  computed: {
    // Get the filters from browse store
    ...mapGetters('browse', ['filters']),

    // Get Wants items list from trade store
    ...mapGetters('trades', ['getTradeItemsWants']),

    // Get Wants item quantity  list from trade store
    ...mapGetters('trades', ['getTradeWantItemQuantity']),

  },
  mounted() {
    // emit listener use to add want item
    this.$root.$on('add_product_want',(val)=>{
      this.search_item = val
    })

    // emit listener use for search item want
    this.$root.$on('add_trade_item_want',(val)=>{
      this.search_item = val
      this.searchText =  null
      this.searchedItems = []
    })

    // emit listener use to take user back from search selection
    this.$root.$on('back_to_search_wants',()=>{
      this.search_item = false
      this.searchText =  null
      this.searchedItems =  []
    })

    this.fetchFilters()

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
    changeTotalTradeItems(listingItems) {
      this.selectedItems = listingItems
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
      this.generalListItems = []
      this.combinationItems = []
      this.infiniteId += 1;
      this.$refs.filterSheet.close();
    },
    /**
     * This function is used to return estimated total value
     * param combination contain list of items
     */
    estValue(combinationLists) {
      return combinationLists.reduce((a, b) => a + b.product.estimated_market_value, 0)
    },
    /**
     * This function is used for drag combination items
     * evt param will use to drag for transfer data
     * combination param contains data of item
     * @param evt
     * @param combination
     */
    startDragCombination (evt, combination) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('combination', JSON.stringify(combination))
    },
    /**
     * This function is used to drag wants item general
     * evt param will use to drag for transfer data
     * item param contains data of item
     * @param evt
     * @param item
     */
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('item', JSON.stringify(item))
    },

    /**
     * THis function is used to drop drag items combination
     * /general items then add these item in want list by check quantity limit
     * evt item used to drop info
     * @param evt
     */
    onDrop (evt) {
      if (evt.dataTransfer.getData('item').length > 0) {
        const items = evt.dataTransfer.getData('item')
        const data = JSON.parse(items)
        const item = this.getTradeItemsWants.find(item => item.id === (data.product_id + data.size_id + data.packaging_condition_id))
        if (this.checkSelectedWantItems()) {
          if (!item && item === undefined) {
            this.addWantItemToState(data)
          } else{
            this.$store.commit('trades/incrementTradeWantItemQuantity', item.id) // quantity increase of item on base of id
          }
        } else{
          this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])) // error of quantity increase
        }
      }
      if (evt.dataTransfer.getData('combination').length > 0) {
        const combinations = evt.dataTransfer.getData('combination')
        const data = JSON.parse(combinations)
        const _self = this
        Array.from(data.combination_items).forEach(function(combinationItem) {
          if (_self.checkSelectedWantItems()) {
            const item = _self.getTradeItemsWants.find(item => item.id === (combinationItem.product_id + combinationItem.size_id + combinationItem.packaging_condition_id))
            if (!item && item === undefined) {
              _self.addWantItemToState(combinationItem)
            } else{
              _self.$store.commit('trades/incrementTradeWantItemQuantity', item.id) // quantity increase of item on base of id
            }
          } else{
            _self.$toasted.error(_self.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])) // error of quantity increase
          }
        });

      }
      this.$nextTick(() => this.$forceUpdate())
    },

    /**
     * This function is used to check want item quantity limit
     * it should not be more then 3
     * @param newQuantityToBeAdded
     * @returns {boolean}
     */
    checkSelectedWantItems(newQuantityToBeAdded = 1) {// by default 1 quantity to be added
      const totalItems = this.getTradeItemsWants.length
      const totalPreviousQuantities = this.getTradeItemsWants.map(i => parseInt(i.selected_quantity)).reduce((a, b) => a + b, 0)

      return (totalItems < this.total_item_count
        && (newQuantityToBeAdded + totalPreviousQuantities) <= this.total_item_count)
    },

    /**
     * This function is used to add want item in a state first
     * this method check for items limit if condition fulfilled
     * @param item
     * @private
     */
    addWantItemToState(item) {
      if (this.checkSelectedWantItems()) {
        const selectedProductWithAttributes = {
          id: (item.size_id) ? item.product_id + item.size_id + item.packaging_condition_id : item.id,
          product_id: item.product_id,
          name: item.product.name,
          colorway: item.product.colorway,
          sku: item.product.sku,
          category: item.product.category.name,
          image: item.product.image,
          selected_year: (item.size_id) ? item.year : item.selected_year,
          selected_box_condition: (item.packaging_condition_id) ? (item.packaging_condition_id) : item.selected_box_condition,
          selected_box_condition_name: (item.packaging_condition) ? item.packaging_condition.name : item.selected_box_condition_name,
          selected_size: (item.size_id) ? item.size_id : item.selected_size,
          selected_size_name: (item.size) ? this.$t('trades.create_listing.vendor.wants.size') + ' ' + item.size.size : item.selected_size_name,
          product: item.product
        }
        this.$store.commit('trades/setWantsItemsTrade', selectedProductWithAttributes)
        this.$nextTick(() => this.$forceUpdate())
      } else{
        this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED]))
      }
    },

    /**
     * This function is used to add want items in listing
     * @param item
     */
    addWantItem(item) {
      if (this.checkSelectedWantItems()) {
        const itemCheck = this.getTradeItemsWants.find(prod =>
          (prod.id) === (item.product_id + item.size_id + item.packaging_condition_id))
        if (itemCheck) {
          this.$store.commit('trades/incrementTradeWantItemQuantity', itemCheck.id)
        } else {
          this.addWantItemToState(item)
        }
        this.$nextTick(() => this.$forceUpdate())
      } else {
        this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED]))
      }
    },

    /**
     * This function is used to add new want item or to increase quantity of already listed item
     * @param item
     */
    addOrIncrementWantedItem(item) {
      const itemsCount = this.getTradeItemsWants.map(i => i.selected_quantity).reduce((a, b) => a + b, 0)
      const existingItem = this.getTradeItemsWants.find(val => val.id === (item.product_id + item.size_id + item.packaging_condition_id))
      if (itemsCount < MAX_ITEMS_ALLOWED) {
        if (existingItem) {
          this.$store.commit('trades/incrementTradeWantItemQuantity', existingItem.id)
        } else {
          this.addWantItemToState(item)
        }
        this.$nextTick(() => this.$forceUpdate())
      } else {
        this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED]))
      }
    },

    /**
     * This function is used to add want items combination in want list
     * @param combination
     */
    addWantCombinationItem(combination) {
      const _self = this;
      Array.from(combination.combination_items).forEach(function (combinationItem) {
        if (_self.checkSelectedWantItems()) {
          _self.tradeWantQuantity += 1
          const itemCheck = _self.getTradeItemsWants.find(prod =>
            prod.id === (combinationItem.product_id + combinationItem.size_id + combinationItem.packaging_condition_id))
          if (itemCheck) {
            _self.$store.commit('trades/incrementTradeWantItemQuantity', itemCheck.id)
          } else {
            _self.addWantItemToState(combinationItem)
          }
          _self.$nextTick(() => _self.$forceUpdate())
        } else {
          _self.$toasted.error(_self.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED]))
        }
      });

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

    /**
     * This function is used to set combination want
     * item detail in variable to display detail in template
     * @param combinationIndex
     * @param itemIndex
     */
    setCombinationSelectedItem(combinationIndex, itemIndex) {
      const _myCombinations = this.combinationItems;
      this.combinationItems = [];
      _myCombinations[combinationIndex].selectedItemIndex = itemIndex
      this.combinationItems = _myCombinations
    },

    /**
     * This function is used to get combination items listing
     * from api
     */
    getCombinations: debounce(function ($state) {
      // api url
      // Do the api call
      this.$axios
        .get(this.combUrl, {
          params: {
            type: 'combinations',  // Type param for get req
            page: this.pageCombination, // page no param for req
            sort_by: this.orderFilterCombination, // sorting param for req
            perPage: this.perPageCombination  // per page no of records param
          }
        })
        .then((response) => { // response will get combination data for want items
          const _self = this
          const res = response?.data?.data
          if (!res.next_page_url) {
            $state.complete()
          }
          else{
            _self.pageCombination += 1;
            _self.combinationItems.push(...res.data)
            $state.loaded()
          }
          this.totalCountCombination = parseInt(response.data.data.total)
          this.combinationItems.forEach(function(combination, index) {
            _self.combinationItems[index].selectedItemIndex = (_self.totalCountCombination > 0) ? 0 : null
          });
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    }, 500),

    /**
     * This function is used to get list of general want items
     */
    getGeneralListItems: debounce(function ($state) {
      // api url
      // Do the api call
      this.$axios
        .get(this.wantUrl, {
          params: {
            type: 'general_items', // Type param for get req
            page: this.page, // page no param for req
            category: this.categoryFilter, // category type filter param for req
            size_types: this.sizeTypesFilter.join(','), // size type filter param for req
            sizes: this.sizeFilter.join(','), // size filter param for req
            sort_by: this.orderFilter,  // sorting param for req
            perPage: this.perPage // per page no of records param
          }
        })
        .then((response) => { // response will get general wants items
          this.generalListItems = response.data.data && response.data.data.data
          const res = response.data?.data
          if (!res.next_page_url) {
            $state.complete()
          }
          else{
            this.page+=1;
            this.generalListItems.push(...res.data)
            $state.loaded()
          }
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    }, 500),

    ...mapActions('browse', ['fetchFilters']), // action for calling api req for browse filter from store

    /***
     * This function is used to change order listing of
     * want items general
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
      this.sizeTypesFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeTypesFilter, 1) || this.$t('trades.create_listing.vendor.wants.size_type') // 1 is no of labels show in filter as selected
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
      this.sizeFilterLabel = this.joinAndCapitalizeFirstLetters(this.sizeFilter, 5) || this.$t('trades.create_listing.vendor.wants.size') // 5 is a max labels show in filter
    },

    /**
     * This function do first letter of word capital
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter(string) {
      if (typeof string === 'string')
        return string[0].toUpperCase() + string.slice(1);
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
      selectedOptionsArray = selectedOptionsArray.map(item => item[0].toUpperCase() + item.slice(1))
      return (selectedOptionsArray.length > maxLabelsAllowed) ? selectedOptionsArray.slice(0, maxLabelsAllowed).join(', ') + '...' // append dots if labels exceed limits of showing characters
        : selectedOptionsArray.join(', ')
    },

    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput(term) {
      if (term) {
        this.searchText = term
        this.$axios
          .post('search/products', {
            filters: {
              search: term.toLowerCase(),  // search query param
              take: TAKE_SEARCHED_PRODUCTS // get 5 record
            },
            page: 1 // no of page
          })
          .then((response) => {
            this.searchedItems = response.data && response.data.results && response.data.results.data // items for search list
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
            this.searchedItems =  []
          })
      } else{
        this.searchText =  null
        this.searchedItems =  []
      }
    },

    /***
     * This function is used to change order listing of
     * want items combination
     * @param selectedOrder
     */
    changeOrderFilterCombination(selectedOrder) {
      this.orderFilterCombination = selectedOrder
      const orderFilteredKey = this.combinationCustomFilter.find(item => item.value === this.orderFilterCombination)
      this.orderFilterLabelCombination = (orderFilteredKey.text) ? this.capitalizeFirstLetter(orderFilteredKey.text) : this.orderFilterLabelCombination
    },

    /**
     * This function is used to remove want item or decrement want item quantity
     * @param id
     */
    removeOrDecrementWantItem(id) {
      const existingItem = this.getTradeItemsWants.find(val => val.id === id)
      const index = this.getTradeItemsWants.indexOf(existingItem)
      if (existingItem.selected_quantity > 1) {
        this.$store.commit('trades/decrementTradeWantItemQuantity', index)
      } else {
        this.$store.commit('trades/removeWantsItemsTrade', index)
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
     * This function is used to change pagination page no
     * and get record again for combination items
     * @param bvEvent
     * @param page
     */
    handlePageClickCombination(bvEvent, page) {
      if (this.pageCombination !== page) {
        this.pageCombination = page
      }
    },

    /**
     * This function is used to change pagination page no
     * and get record again for that page
     * @param bvEvent
     * @param page
     */
    handlePerPageChangeCombination(value) {
      if (this.perPageCombination !== value) {
        this.perPageCombination = value
        this.pageCombination = 1
      }
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
#nav-wants
  padding: 0px !important
.border-dotted
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='16%2c 16%2c 16%2c 16' stroke-dashoffset='50' stroke-linecap='square'/%3e%3c/svg%3e")
  border-radius: 20px

.collapse-btn .btn-light:hover
  background-color: transparent
  border: none

.width-156
  width: 156px
  background: $color-white-1

.width-200
  width: 220px
  background: $color-white-1

.back-to-offers-link
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $regular
  @include body-13
  line-height: 19px
  letter-spacing: 0.06em
  color: $color-black-1
  @media (min-width: 300px)  and (max-width: 349px)
    @include body-9
  @media (min-width: 350px)  and (max-width: 399px)
    @include body-9
  @media (min-width: 400px)  and (max-width: 500px)
    @include body-9
.back-image
  margin-right: 0.5rem
  @media (min-width: 300px)  and (max-width: 349px)
    margin-right: 5px
    width: 6px
  @media (min-width: 350px)  and (max-width: 399px)
    margin-right: 5px
    width: 6px
  @media (min-width: 400px)  and (max-width: 500px)
   margin-right: 5px
   width: 6px
.general-list
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $bold
  @include body-12
  line-height: 21px
  color: $color-gray-5

.font-22
  font-size: 22px

.mt-custom
  margin-top: 45px
  padding-right: 30px
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
.create-trade-item-mobile
  width: 164px
  height: 212px
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
  margin-left: 20px
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
  width: 343px
  min-height: 140px
  max-height: 201px
  margin-right: 0
  border-radius: 3px
  background-color: $color-white-1
  border: 0.5px solid $color-gray-23
  @media (min-width: 300px)  and (max-width: 349px)
    width: 294px
  @media (min-width: 400px)  and (max-width: 500px)
    width: 400px

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
.main-container
  background: $color-white-1
.combination-div-mobile
  width: 340px
  background: $color-white-1
  height: 165px
  border-radius: 10px
  box-shadow: 0px 1px 4px $color-black-rgb1
  @media (min-width: 300px)  and (max-width: 349px)
    width: 290px
.com-img
  width: 100px
.combination-title
  @include body-5
  font-weight: $medium
  font-family: $font-sp-pro
  margin-left: 8px
  @media (min-width: 300px)  and (max-width: 349px)
    @include body-18
.combination-info
  margin-left: 25px
  @include body-18
  font-weight: $normal
  font-family: $font-sp-pro
  margin-top: 3px
.plus-icon
  height: 18px
  margin-left: 3.5rem

.set-margin
  margin-top: -5rem
.item-image-combination
  height: 70px
  width: 70px
.estimate-amount
  @include body-9
  font-weight: $medium
  font-family: $font-montserrat
.un-selected-circle
  height: 5px
  width: 5px
  border-radius: 50%
  background: $color-gray-4
.selected-circle
  height: 5px
  width: 5px
  border-radius: 50%
  background: $color-black-1
#nav-wants::v-deep
  font-size: 12px
  height: 45px
  padding-bottom: 5px
  background-color: $color-gray-75
  padding-top: 5px
  padding-left: 15px
  border-radius: 20px
.prod-img
  height: 185px
.overlay-mob
  background: $light-opacity
  top: 0
  left: 0
  width: 100%
  height: 100%
.show-offers
  position: fixed
  bottom: 120px
  z-index: 80
.offers-items
  background: $color-white-27
  box-shadow: inset 0 1px 4px $drop-shadow1
  border-radius: 9px
  width: 92px
  height: 28px
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
.create-trade-search
  width: 303px
  @media (max-width: 330px)
    width: 260px
</style>


