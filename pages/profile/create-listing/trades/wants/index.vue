<template>
  <div class="bg-grey-wants">
    <!-- Main content -->

    <create-trade-search-item v-if="search_item" :product="search_item" productFor="wantOffer"/>

    <section v-else class="content">
      <b-container fluid class="px-3">
        <!-- Main row -->
        <b-row>
          <b-col class="text-left col-12 col-md-6">
            <NuxtLink class="back-to-offers-link text-gray" to="/profile/create-listing/trades/create">
              <b-img
                :src="require('~/assets/img/icons/back-btn-slim.svg')"
                :alt="$t('trades.create_listing.vendor.wants.back_to_offers_item')"
                class="mr-2"
              />
              <span>{{ $t('trades.create_listing.vendor.wants.back_to_offers_item') }}</span>
            </NuxtLink>
          </b-col>
          <b-col class="text-right">
            <FormStepProgressBar :steps="steps" variant="transparent"/>
          </b-col>
        </b-row>
        <b-row cols="1" class="pr-md-5 pr-lg-5 pr-sm-0">
          <b-col class="w-100">
            <h2 class="font-weight-bold">{{ $t('trades.create_listing.vendor.wants.add_wants') }} <span class="ml-3 font-weight-lighter">({{ $t('trades.create_listing.vendor.wants.optional') }})</span></h2>
          </b-col>
          <b-col class="w-100">
            <p>{{ $t('trades.create_listing.vendor.wants.search_information', [MAX_ITEMS_ALLOWED]) }}</p>
          </b-col>
        </b-row>
        <b-row class="pr-md-5 pr-lg-5 pr-sm-0 mb-2">
          <b-col class="col-md-8 col-12 col-sm-6 mt-md-4">
            <SearchInput
              :value="searchText"
              :placeholder="$t('trades.create_listing.vendor.wants.search_by_options')"
              size="lg"
              bordered
              inputHeight="60px"
              @change="onSearchInput"
            />
            <SearchedProductsBelowSearchTextBox v-if="searchedItems.length > 0" :productItems="searchedItems" productsFor="wantItemTrade" width="700px" class="position-absolute"/>
          </b-col>
          <b-col align-self="center" class="col-md-4 col-12 col-sm-6 mt-md-4 text-right">
            <a class="font-weight-bolder text-gray cursor-pointer" @click="$bvModal.show('offer-item-modal')">
              <b-img
                :src="require('~/assets/img/icons/clarity_eye-line.svg')"
                :alt="$t('trades.create_listing.vendor.wants.view_offer_items')"
              />
              <span class="border-bottom border-dark">{{
                  $t('trades.create_listing.vendor.wants.view_offer_items')
                }}</span>
            </a>
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-2">
          <h2 class="font-weight-bold">{{ $t('trades.create_listing.vendor.wants.trade_wants_list') }}</h2>
        </b-row>
        <!-- General list -->
        <b-row class="collapse-btn pr-md-5 pr-lg-5 pr-sm-0">
          <b-button v-b-toggle.collapse-1 variant="light" class="pl-3 bg-white w-100 text-left general-list"
                    @click="generalListIsOpen = !generalListIsOpen">
            {{ $t('trades.create_listing.vendor.wants.general_list') }} ({{ generalListItems.length }})
            <div class="pull-right font-22">
              <i class="fa" :class="generalListIsOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
            </div>
          </b-button>
          <b-collapse id="collapse-1" class="mt-1 w-100">
            <div class="d-flex create-trade-pl-22 bg-white">
              <div class="col-md-8 mt-4 p-0">
                <span class="filter-by">{{ $t('create_listing.trade.offer_items.filter_by') }}</span>
                <div class="d-flex">
                  <client-only>
                    <CustomDropdown v-model="categoryFilter" :label="categoryFilterLabel" :options="categoryItems"
                        class="mr-3 width-156" type="single-select" optionsWidth="custom"
                        width="156px"
                        @change="changeCategory"
                        @getResults="getGeneralListItems"/>
                    <CustomDropdown v-model="sizeTypesFilter" :label="sizeTypesFilterLabel" :options="filters.size_types"
                        class="mr-3 width-156" type="multi-select-checkbox" optionsWidth="custom"
                        @change="changeSizeTypeFilter"
                        @getResults="getGeneralListItems"/>
                    <CustomDropdown v-model="sizeFilter" :label="sizeFilterLabel" :options="filters.sizes"
                        class="mr-3 width-156" type="multi-select-checkbox" optionsWidth="custom"
                        @change="changeSizeFilter"
                        @getResults="getGeneralListItems"/>
                  </client-only>
                  <b-btn class="filter-btn-create-trade mr-3" @click="getGeneralListItems">
                    {{ $t('create_listing.trade.offer_items.filter_btn') }}
                  </b-btn>
                  <div class="clear-filter" @click="clearFilters">
                    {{ $t('trades.create_listing.vendor.wants.clear_all_filters') }}
                  </div>
                </div>
              </div>
              <div class="col-md-4 mt-custom">
                <b-row class="d-flex justify-content-center sort-by">
                  <client-only>
                    <CustomDropdown v-model="orderFilter" :labelLeftImage="require('~/assets/img/icons/feature.png')"
                        :options="generalListItemsCustomFilter" type="single-select"
                        :label="orderFilterLabel" class="width-200"
                        optionsWidth="custom"
                        width="220px"
                        @getResults="getGeneralListItems" @change="changeOrderFilter"/>
                  </client-only>
                </b-row>
              </div>
            </div>

            <div class="bg-white inventory-area mb-0">
              <b-row class="p-4">
                <b-col v-for="item in generalListItems" :key="item.id" cols="3" class="mb-5">
                  <div class="create-trade-item position-relative" :draggable="true"
                       @dragstart="startDrag($event, item)">
                    <div>
                      <div class="create-trade-size-car">{{$t('trades.create_listing.vendor.wants.size')}} {{ item.size && item.size.size }}</div>
                      <img role="button" alt="No Image" class="plus-icon-add create-trade-plus-icon mt-0" :src="require('~/assets/img/icons/addPlus.svg')"
                           @click="addOrIncrementWantedItem(item)"/>
                    </div>
                    <object
                      class="create-trade-item-image"
                      :data="`${IMAGE_PATH}/${item.product && item.product.category && item.product.category.name}/${item.product && item.product.sku}/800xAUTO/IMG01.jpg`"
                      type="image/png">
                      <img class="create-trade-item-image mb-2" :src="fallbackImgUrl" alt="image"/>
                    </object>
                    <div class="create-trade-item-caption">
                  <span :id="`name${item.id}`" class="create-trade-item-name">{{
                      item.product && item.product.name
                    }}</span>
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
              </b-row>
              <b-row v-if="!generalListItems || generalListItems.length === 0" class="col-md-12 justify-content-center">
                {{$t('create_listing.trade.no_item_found')}}
              </b-row>
              <b-row class="col-md-12 justify-content-center mt-4 mb-3">
                <Pagination
                  v-if="generalListItems && generalListItems.length > 0"
                  v-model="page"
                  :total="totalCount"
                  :per-page="perPage"
                  :per-page-options="perPageOptions"
                  class="mt-2"
                  @page-click="handlePageClick"
                  @per-page-change="handlePerPageChange"
                />
              </b-row>
            </div>
          </b-collapse>
        </b-row>

        <!-- Collapse -->
        <b-row class="collapese-btn mt-3 pr-md-5 pr-lg-5 pr-sm-0 ">
          <b-button v-b-toggle.collapse-2 variant="light" class="pl-3 bg-white w-100 text-left general-list"
                    @click="combinationIsOpen = !combinationIsOpen">
            {{ $t('trades.create_listing.vendor.wants.combinations') }} ({{ combinationItems.length }})
            <div class="pull-right font-22">
              <i class="fa" :class="combinationIsOpen ? 'fa-angle-up' : 'fa-angle-down'"></i>
            </div>
          </b-button>
          <b-collapse id="collapse-2" class="mt-1 w-100">
            <div class="bg-white pt-4">
              <b-row class="combination-sort-row mr-5 mb-4">
                <CustomDropdown v-model="orderFilterCombination" :label="orderFilterLabelCombination"
                                :labelLeftImage="require('~/assets/img/icons/feature.png')"
                                :options="combinationCustomFilter" class="width-200" type="single-select"
                                optionsWidth="custom"
                                width="220px"
                                @change="changeOrderFilterCombination" @getResults="getCombinations"/>
              </b-row>
              <b-row class="px-5">
                <b-col v-for="(combination, combinationIndex) in combinationItems" :key="combination.combination_id" cols="6" class="mb-4">
                  <div class="combination-div py-4 mx-1" :draggable="true"
                       @dragstart="startDragCombination($event, combination)">
                    <div class="d-flex justify-content-between ml-5">
                      <div class="text-left title-combination">
                        {{ $t('trades.create_listing.vendor.wants.combination_no') }} {{ combinationIndex + 1 }}
                      </div>
                      <img role="button" :alt="$t('trades.create_listing.vendor.wants.on_image')"
                           class="plus-icon-add mt-2 mr-3 create-trade-plus-icon"
                           :src="require('~/assets/img/icons/addPlus.svg')"
                           @click="addWantCombinationItem(combination)"/>
                    </div>
                    <div class="col-md-12 d-flex">
                      <div class="col-md-6 d-flex justify-content-center">
                        <object v-if="combination.combination_items[combination.selectedItemIndex].product.image"
                                :data="combination.combination_items[combination.selectedItemIndex].product.image"
                                class="large-image-combination pointer"
                                type="image/png">
                          <img class="large-image-combination pointer" :src="fallbackImgUrl" alt="image"/>
                        </object>
                        <img v-else class="large-image-combination pointer" :src="fallbackImgUrl" alt="image"/>
                      </div>
                      <div
                        class="col-md-6 d-block text-left text-div-combination d-flex flex-column justify-content-center">
                        <div class="text-bold">
                          {{ combination.combination_items[combination.selectedItemIndex].product.name }}
                        </div>
                        <div class="">
                          {{ $t('trades.create_listing.vendor.wants.sku') }}:
                          {{ combination.combination_items[combination.selectedItemIndex].product.sku }}
                        </div>
                        <div>
                          {{ $t('trades.create_listing.vendor.wants.color') }}:
                          {{ combination.combination_items[combination.selectedItemIndex].product.colorway }}
                        </div>
                        <div>
                          {{ $t('trades.create_listing.vendor.wants.box_condition') }}:
                          {{ combination.combination_items[combination.selectedItemIndex].packaging_condition.name }}
                        </div>
                        <div class="text-bold">{{ $t('trades.create_listing.vendor.wants.lowest_ask') }}: {{ combination.combination_items[combination.selectedItemIndex].product.estimated_market_value }}</div>
                      </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                      <b-col v-for="(item, index) in combination.combination_items"
                             :key="item.id" class="d-flex justify-content-center flex-column align-items-center">
                        <object v-if="item.product.image" :data="item.product.image"
                                class="item-image-combination pointer"
                                type="image/png"
                                @click="setCombinationSelectedItem(combinationIndex, index)">
                          <img class="item-image-combination mb-2 pointer" :src="fallbackImgUrl"
                               alt="image"/>
                        </object>
                        <img v-else alt="image"
                             class="item-image-combination mb-2 pointer" :src="fallbackImgUrl"
                             @click="setCombinationSelectedItem(combinationIndex, index)"/>
                        <div class="position-relative">
                        <div v-if="combination.selectedItemIndex === index" class="bar-combination"></div>
                        </div>
                      </b-col>
                    </div>
                    <div class="col-md-12 d-flex">
                      <div class="text-bold ml-auto mr-auto mt-3">{{
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
              <b-row class="col-md-12 justify-content-center my-3">
                <Pagination
                  v-if="combinationItems && combinationItems.length > 0"
                  v-model="pageCombination"
                  :total="totalCountCombination"
                  :per-page="perPageCombination"
                  :per-page-options="perPageOptionsCombinations"
                  class="mt-2"
                  @page-click="handlePageClickCombination"
                  @per-page-change="handlePerPageChangeCombination"
                />
              </b-row>
            </div>
          </b-collapse>
        </b-row>
        <b-row class="mt-5 mr-5 p-5 border-dotted text-center d-flex justify-content-center" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
          <div v-if="getTradeItemsWants.length < 1">
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
            <div v-for="item in getTradeItemsWants" :key="item.id" class="create-trade-item-sm d-flex justify-content-between flex-column mr-4">
              <div class="d-flex justify-content-between mt-2 mx-2">
                <div class="create-trade-size-car-sm">{{ item.selected_size_name }}</div>
                <div v-if="item.selected_quantity > 1" class="create-trade-quantity-car-sm">
                  x{{ item.selected_quantity || 1 }}
                </div>
                <div class="create-trade-minus-icon-sm" @click="removeOrDecrementWantItem(item.id)">
                  <div class="create-trade-minus-line-sm"></div>
                </div>
              </div>
              <div class="create-trade-item-image-div-sm">
                <object :data="item.image" class="create-trade-item-image-sm" type="image/png">
                  <img class="create-trade-item-image-sm mb-2" :src="fallbackImgUrl" alt="image"/>
                </object>
              </div>
              <div class="create-trade-item-caption-sm">
                <span :id="`name-sm${item.id}`"
                      class="create-trade-item-name-sm">{{ item.name ? item.name : item.product.name }}</span>
                <span :id="`colorway-sm${item.id}`"
                      class="create-trade-item-caption-description-sm">{{ item.product.colorway }}</span>
                <span class="create-trade-item-caption-description-sm">{{ $t('trades.create_listing.vendor.wants.box') }}: {{
                    item.selected_box_condition_name
                  }}</span>
              </div>

              <b-tooltip :target="`name-sm${item.id}`" triggers="hover">
                {{ item.name ? item.name : item.product.name }}
              </b-tooltip>

              <!-- toltip for colorway -->
              <b-tooltip :target="`colorway-sm${item.id}`" triggers="hover">
                {{ item.colorway ? item.colorway : item.product.colorway }}
              </b-tooltip>

            </div>
            <div v-if="getTradeWantItemQuantity < MAX_ITEMS_ALLOWED" class="create-trade-item-sm">
              <div>
                <img :src="require('~/assets/img/three-items.svg')" alt="">
              </div>
            </div>
          </b-row>
        </b-row>
        <b-row class="mt-5 d-block pr-5">
          <b-col class="w-25 pull-right">
            <Button pill :disabled="!getTradeItemsWants.length" size="lg" class="w-50 pull-right mb-4" @click="$router.push('/profile/create-listing/trades/confirmation')">{{ $t('trades.create_listing.vendor.wants.next') }}</Button>
          </b-col>
        </b-row>
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

import FormStepProgressBar from '~/components/common/FormStepProgressBar'
import Button from '~/components/common/Button'
import SearchInput from '~/components/common/SearchInput'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox'
import CustomDropdown from '~/components/common/CustomDropdown'
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem';
import ViewOfferItemsModal from '~/pages/profile/create-listing/trades/wants/ViewOfferItemsModal';
import { Pagination } from '~/components/common'
import {IMAGE_PATH, MAX_ITEMS_ALLOWED} from '~/static/constants/create-listing'
import { PRODUCT_FALLBACK_URL } from '~/static/constants'
import { TAKE_SEARCHED_PRODUCTS } from '~/static/constants/trades'


/*
  Trade Wants Page
 */
export default {
  name: 'TradeWants',
  components: {
    FormStepProgressBar, // Stepper component
    Button, // Button component
    SearchInput, // search input
    SearchedProductsBelowSearchTextBox, //  component for items show below search as search results
    CustomDropdown, // custom dropdown component used for filters
    CreateTradeSearchItem, // component used for item via search selection
    Pagination, // Pagination component
    ViewOfferItemsModal // model to show offers items
  },
  layout: 'Profile', // Layout
  data() {
    return {
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
      total_item_count: 3
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
    this.getGeneralListItems()
    this.getCombinations()

    // Emit listener to emtpy search items
    this.$root.$on('click_outside', () => {
      this.searchedItems = []
    })
  },

  methods: {
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
        this.getGeneralListItems()
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
    getCombinations: debounce(function () {
      // api url
      const url = 'vendor/want-items'
      // Do the api call
      this.$axios
        .get(url, {
          params: {
            type: 'combinations',  // Type param for get req
            page: this.pageCombination, // page no param for req
            sort_by: this.orderFilterCombination, // sorting param for req
            perPage: this.perPageCombination  // per page no of records param
          }
        })
        .then((response) => { // response will get combination data for want items
          const _self = this
          this.combinationItems = response.data.data && response.data.data.data
          this.totalCountCombination = parseInt(response.data.data.total)
          this.combinationItems.forEach(function(combination, index) {
            _self.combinationItems[index].selectedItemIndex = (_self.totalCountCombination > 0) ? 0 : null
          });
          this.perPageCombination = parseInt(response.data.data.per_page)
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    }, 500),

    /**
     * This function is used to get list of general want items
     */
    getGeneralListItems: debounce(function () {
      // api url
      const url = 'vendor/want-items'
      // Do the api call
      this.$axios
        .get(url, {
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
          this.totalCount = parseInt(response.data.data.total)
          this.perPage = parseInt(response.data.data.per_page)
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
      this.getGeneralListItems();
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
      this.getCombinations()
    },

    /**
     * This function is used to remove want item or decrement want item quantity
     * @param id
     */
    removeOrDecrementWantItem(id) {
      const existingItem = this.getTradeItemsWants.find(val => val.id === id)
      if (existingItem.selected_quantity > 1) {
        this.$store.commit('trades/decrementTradeWantItemQuantity', id)
      } else {
        this.$store.commit('trades/removeWantsItemsTrade', id)
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
        this.getGeneralListItems()
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
        this.getGeneralListItems()
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
        this.getCombinations()
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
        this.getCombinations()
      }
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
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
  font-size: 16px
  line-height: 19px
  letter-spacing: 0.06em
  color: $color-black-1

.general-list
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $bold
  font-size: 18px
  line-height: 21px
  color: $color-gray-5

.font-22
  font-size: 22px

.mt-custom
  margin-top: 45px
  padding-right: 30px
</style>
