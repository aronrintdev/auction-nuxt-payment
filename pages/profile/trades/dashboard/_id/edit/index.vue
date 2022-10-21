<template>
<div>
  <div v-if="!searchForProductsType && !showProductForm" class="trades-listing-table">
      <b-row class="pt-3">
        <b-col cols="6" class="create-trade-heading">
          <div>
            {{ $t('trades.edit_trade', [trade && trade.id]) }}
          </div>
        </b-col>
      </b-row>
      <b-row class="offered-item-confirm-trade">
        <b-col>
          {{ $t('trades.create_listing.vendor.wants.offered_items') }}
          <a v-if="canAddMoreOfferItems()" role="button" class="ml-4 body-4-medium" @click="addMoreOfferItems()">{{ $t('trades.add_another_item') }}</a>
        </b-col>
      </b-row>
      <b-row class="confirm-trade-detail-section mb-3">
        <b-col cols="8">{{ $t('trades.create_listing.vendor.wants.details') }}</b-col>
        <b-col cols="2">{{ $t('trades.create_listing.vendor.wants.quantity') }}</b-col>
        <b-col cols="2">{{ $t('trades.create_listing.vendor.wants.actions') }}</b-col>
      </b-row>
      <b-row v-for="(item, index) in getTradeItems" :key="'offer-'+index+item.id" class="confirm-trade-item">
        <b-col cols="8" class="d-flex">
          <div class="pt-3">
            <img class="confirm-trade-item-image"
                :src="item.product | getProductImageUrl"
                :alt="$t('trades.create_listing.vendor.wants.no_image')"/>
          </div>
          <div class="d-block pt-4 pl-4">
            <div class="confirm-trade-item-name">{{ item.name ? item.name : item.product.name }}</div>
            <div class="confirm-trade-item-detail">{{
                $t('trades.create_listing.vendor.wants.sku')
              }}:{{ item.sku ? item.sku : item.product.sku }}
            </div>
            <div class="confirm-trade-item-detail">{{ $t('trades.create_listing.vendor.wants.colorway') }}:
              {{ item.colorway ? item.colorway : item.product.colorway }}
            </div>
            <div class="confirm-trade-item-detail">{{ $t('trades.create_listing.vendor.wants.box_condition') }}:
              {{ item.packaging_condition.name }}
            </div>
          </div>
        </b-col>
        <b-col cols="2">
          <div class="confirm-trade-item-quantity">{{ item.quantity }}</div>
        </b-col>
        <b-col cols="2" class="confirm-trade-icons d-flex">
          <div>
            <img :src="require('~/assets/img/box-pencil.svg')" :alt="$t('trades.create_listing.vendor.wants.no_image')" role="button" @click="addOfferProduct(item.product, item, 0)" />
          </div>
          <div class="pl-3">
            <img :src="require('~/assets/img/box-delete.svg')" class="cursor-pointer"
                :alt="$t('trades.create_listing.vendor.wants.no_image')" role="button" @click="setOfferItemForDelete(item)"/>
          </div>
        </b-col>
      </b-row>

      <b-row class="offered-item-confirm-trade">
        <b-col>
          {{ $t('trades.create_listing.vendor.wants.wanted_items') }}
          <a v-if="canAddMoreWantItems()" role="button" class="ml-4 body-4-medium" @click="addMoreWantItems()">{{ $t('trades.add_another_item') }}</a>
        </b-col>
      </b-row>
      <b-row class="confirm-trade-detail-section mb-3">
        <b-col cols="8">{{ $t('trades.create_listing.vendor.wants.details') }}</b-col>
        <b-col cols="2">{{ $t('trades.create_listing.vendor.wants.quantity') }}</b-col>
        <b-col cols="2">{{ $t('trades.create_listing.vendor.wants.actions') }}</b-col>
      </b-row>
      <b-row v-for="(wantItem, index) in getTradeItemsWants" :key="'want-'+index+wantItem.id" class="confirm-trade-item">
        <b-col cols="8" class="d-flex">
          <div class="pt-3">
            <img class="confirm-trade-item-image" :src="wantItem.product | getProductImageUrl"
                :alt="$t('trades.create_listing.vendor.wants.no_image')"/>
          </div>
          <div class="d-block pt-4 pl-4">
            <div class="confirm-trade-item-name">{{ wantItem.name }} ({{ wantItem.product.release_year }})</div>
            <div class="confirm-trade-item-detail">{{
                $t('trades.create_listing.vendor.wants.sku')
              }}:{{ wantItem.sku }}
            </div>
            <div class="confirm-trade-item-detail">{{ $t('trades.create_listing.vendor.wants.colorway') }}:
              {{ wantItem.product.colorway }}
            </div>
            <div class="confirm-trade-item-detail">{{ $t('trades.create_listing.vendor.wants.box_condition') }}:
              {{ wantItem.selected_box_condition_name }}
            </div>
          </div>
        </b-col>
        <b-col cols="2">
          <div class="confirm-trade-item-quantity">{{ wantItem.selected_quantity }}</div>
        </b-col>
        <b-col cols="2" class="confirm-trade-icons d-flex">
          <div v-if="getTradeItemsWantCount < MAX_ITEMS_ALLOWED">
            <img class="cursor-pointer" :src="require('~/assets/img/box-copy.svg')"
                :alt="$t('trades.create_listing.vendor.wants.no_image')" role="button" @click="addProductWant(wantItem.product, 0, getTradeItemsWantCount)" />
          </div>
          <div class="pl-3">
              <img :src="require('~/assets/img/box-pencil.svg')" class="cursor-pointer" :alt="$t('trades.create_listing.vendor.wants.no_image')" role="button" @click="addProductWant(wantItem.product, wantItem, 0)"/>
          </div>
          <div class="pl-3">
            <img :src="require('~/assets/img/box-delete.svg')" class="cursor-pointer"
                :alt="$t('trades.create_listing.vendor.wants.no_image')" role="button" @click="setWantItemForDelete(wantItem)"/>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-4 mb-4">
        <Button class="confirm-trade-draft-btn" variant="listing" @click="saveVendorTrade('live')">{{ $t('trades.save_changes') }}</Button>
        <Button class="confirm-trade-post-btn ml-5" :disabled="!getTradeItemsWants.length || !getTradeItems.length" variant="listing" @click="$bvModal.show('discardModel')">{{ $t('trades.discard_changes') }}</Button>
      </b-row>
      <delete-offer-item-modal :product="deleteOfferProduct" @delete="removeOfferItem"></delete-offer-item-modal>
      <delete-want-item-modal :product="deleteWantProduct" @delete="removeWantItem"></delete-want-item-modal>
      <discard-model @discard="moveBackToTradeOffers(getTradeId)"></discard-model>
    </div>
    <b-row v-else-if="searchForProductsType" class="pr-md-5 pr-lg-5 pr-sm-0 mb-2">
      <div class="create-trade-back-to-search" @click="backToTradeEditing()">
        <b-icon icon="chevron-left" aria-hidden="true"></b-icon>
        {{ $t('trades.back_to_trade_editing') }}
      </div>
      <b-col class="col-md-8 col-12 col-sm-6 mt-md-5">
        <SearchInput
          :value="searchText"
          :placeholder="$t('trades.create_listing.vendor.wants.search_by_options')"
          size="lg"
          bordered
          inputHeight="60px"
          @change="onSearchInput"
        />
        <SearchedProductsBelowSearchTextBox v-if="searchedItems.length > 0" :productItems="searchedItems" :productsFor="searchForProductsType" width="700px" class="position-absolute"/>
      </b-col>
    </b-row>
    <create-trade-search-item v-else-if="showProductForm" :itemId="editableProductId" :product="editableProduct" :isTradeEditForm="isTradeEditForm" :productFor="productFor"/>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'
import DeleteOfferItemModal from '~/pages/profile/trades/dashboard/_id/edit/DeleteOfferItemModal'
import DeleteWantItemModal from '~/pages/profile/trades/dashboard/_id/edit/DeleteWantItemModal'
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem'
import SearchInput from '~/components/common/SearchInput'
import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox'
import DiscardModel from '~/pages/profile/trades/dashboard/counter-offer/DiscardModel'
import {
  IMAGE_PATH,
  MAX_ITEMS_ALLOWED,
  SEARCH_BAR_PRODUCTS,
  SEARCH_FOR_WANT_ITEMS,
  SEARCH_FOR_OFFER_ITEMS,
  PRODUCT_FOR_OFFER,
  PRODUCT_FOR_WANT
} from '~/static/constants/create-listing'
import Button from '~/components/common/Button';

export default {
  name: 'Index',
  components: {
    Button,
    DeleteWantItemModal,
    DeleteOfferItemModal,
    CreateTradeSearchItem,
    SearchInput,
    SearchedProductsBelowSearchTextBox,
    DiscardModel
  },
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      IMAGE_PATH,
      SEARCH_FOR_WANT_ITEMS,
      SEARCH_FOR_OFFER_ITEMS,
      SEARCH_BAR_PRODUCTS,
      PRODUCT_FOR_OFFER,
      PRODUCT_FOR_WANT,
      isTradeEditForm: true,
      showProductForm: false,
      productFor: null,
      editableProduct: null,
      deleteOfferProduct: {},
      deleteWantProduct: {},
      MAX_ITEMS_ALLOWED,
      trade_want_id: null,
      trade: null,
      searchText: null,
      searchedItems: [],
      searchForProductsType: false,
      editableProductId: 0
    }
  },
  computed:{
    ...mapGetters('trades',['getTradeItems', 'getTradeId', 'getTradeItemsWants', 'getEditTradePageReferrer']),  // Getter for getting listing of trade offer item and want item

    getTradeItemsWantCount(){
      return this.getTradeItemsWants.map(i => parseInt(i.selected_quantity)).reduce((a, b) => a + b, 0)
    },
  },
  mounted() {
    this.$root.$on('back_to_trade_editing', () => {
      this.searchForProductsType = null
      this.productFor = null
      this.showProductForm = false
    })

    this.$root.$on('add_trade_item', () => {
      this.searchForProductsType = null
      this.productFor = null
      this.showProductForm = false
      this.searchText =  null
      this.searchedItems =  []
      this.$nextTick(() => this.$forceUpdate())
    })

    this.$root.$on('add_trade_item_want', () => {
      this.searchForProductsType = null
      this.productFor = null
      this.showProductForm = false
      this.searchText =  null
      this.searchedItems =  []
      this.$nextTick(() => this.$forceUpdate())
    })

    // emit listner use to add want item
    this.$root.$on('add_product_want',(val)=>{
      this.productFor = PRODUCT_FOR_WANT
      this.showProductForm = true
      this.searchForProductsType = false
      this.editableProduct = val
    })

    // emit listner use to take user back from search selection
    this.$root.$on('back_to_trade_search', () => {
      if(this.productFor === PRODUCT_FOR_OFFER){
        this.searchForProductsType = SEARCH_FOR_OFFER_ITEMS
      }else{
        this.searchForProductsType = SEARCH_FOR_WANT_ITEMS
      }
      this.productFor = null
      this.showProductForm = false
      this.editableProduct = null
      this.searchText =  null
      this.searchedItems =  []
    })

    // emit use to add item for search selection component
    this.$root.$on('add_product_trade', (val) => {
      this.productFor = PRODUCT_FOR_OFFER
      this.showProductForm = true
      this.searchForProductsType = false
      this.editableProduct = val
    })

    // fetch trade details
    if(this.getEditTradePageReferrer !== null){
      this.$store.commit('trades/removeAllOfferItems')
      this.$store.commit('trades/removeAllWantItems')
      this.$axios
      .get('trades', {
        params: {
          trade_id: this.getTradeId
        }
      })
      .then((response) => { // return offer items and wants item
          const _self = this
          this.trade = response.data.data.data[0]
          const offerItemsList = response && response.data && response.data.data.data[0].offers
          if (offerItemsList.length > 0) {
            offerItemsList.forEach(function(offerItem) {
              const item = offerItem.inventory
              item.offer_id = offerItem.id
              item.quantity = offerItem.quantity
              item.selected_box_condition = offerItem.inventory.packaging_condition_id
              item.selected_box_condition_name = offerItem.inventory.packaging_condition.name
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
                want_id: wantItem.id,
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
    }


  },
  methods: {
    moveBackToTradeOffers(tradeId){
      this.$router.push(`/profile/trades/dashboard/${tradeId}/offers`)
    },
    backToTradeEditing(){
      this.searchForProductsType = null
      this.productFor = null
      this.searchText = null
      this.searchedItems = []
    },
    addMoreWantItems(){
      this.editableProduct = null
      this.editableProductId = 0
      this.searchForProductsType = SEARCH_FOR_WANT_ITEMS
    },
    canAddMoreWantItems(){
      return this.getTradeItemsWants.length < MAX_ITEMS_ALLOWED
    },
    addMoreOfferItems(){
      this.editableProduct = null
      this.editableProductId = 0
      this.searchForProductsType = SEARCH_FOR_OFFER_ITEMS
    },
    canAddMoreOfferItems(){
      return this.getTradeItems.length < MAX_ITEMS_ALLOWED
    },
    /**
     * This function is used to add items in offer listing
     * to pass data as param to create listing in api
     * @returns {*[]}
     */
    prepareOfferItems() {
      return this.getTradeItems.map(item =>
        ({
          offer_id: item.offer_id ? item.offer_id : null,
          inventory_id: item.id,
          quantity: item.quantity,
          packaging_condition_id: item.packaging_condition.id,
          year: item.year ? item.year : null,
          size_id: item.size_id,
          product_id: item.product_id,
          sale_price: item.sale_price
        })
      )
    },

    /**
     * This function is used to add wants items in listing
     * to pass data as param to create listing in api
     * @returns {*[]}
     */
    prepareWantItems() {
      return this.getTradeItemsWants.map(item =>
        ({
            id: item.id,
            want_id: item.want_id ? item.want_id : null,
            product_id: item.product_id,
            quantity: item.selected_quantity,
            size_id: item.selected_size,
            packaging_condition_id: item.selected_box_condition,
            year: item.selected_year
        })
      )
    },

    /**
     * This function is used to create listing for trade
     * it also used for updating trade listing id trade id exists
     * @param status
     */
    saveVendorTrade(status) {
      const tradeId = this.getTradeId

      const data = {
        status,
        offer_items: this.prepareOfferItems(), // offer items for create listing
        want_items: this.prepareWantItems(), //
      }

      if(tradeId)
      {
          this.$axios.put('trades/' + tradeId, data).then(() => { // on response clear states and move to listing page
            this.$store.commit('trades/clearTradeItems')
            this.$store.commit('trades/clearWantsItemsTrade')
            this.$store.commit('trades/setTradeForEditing', null)
            this.moveBackToTradeOffers(tradeId)
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.message))
          })
      }

    },

    /**
     * This function is used to increase quantity
     * of product want item listing as a copy product
     * @param wantProduct
     * @param tradeWant
     */
    addProductWant(wantProduct, tradeWant, count) {
      if (count >= MAX_ITEMS_ALLOWED) {
        this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])) // error of quantity increase
      }
      else {
        const product = JSON.parse(JSON.stringify(wantProduct));
        product.selected_box_condition = tradeWant?.selected_box_condition
        product.selected_quantity = tradeWant?.selected_quantity
        product.selected_year = tradeWant?.selected_year
        product.selected_size = tradeWant?.selected_size
        this.showProductForm = true
        this.productFor = PRODUCT_FOR_WANT
        this.editableProduct = product
        this.editableProductId = tradeWant?.id
      }
    },

  /**
   * This function is used to increase quantity
   * of offered product want item listing as a copy product
   * @param offerProduct
   * @param offer
   */
  addOfferProduct(offerProduct, offer, count) {
    if (count >= MAX_ITEMS_ALLOWED) {
      this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])) // error of quantity increase
    }
    else {
      const product = JSON.parse(JSON.stringify(offerProduct));
      product.selected_box_condition = offer?.packaging_condition.id
      product.selected_quantity = offer?.quantity
      product.selected_year = product?.release_year
      product.selected_size = offer?.size.id
      this.productFor = PRODUCT_FOR_OFFER
      this.showProductForm = true
      this.editableProduct = product
      this.editableProductId = offer?.id
    }
  },

    /**
     * set offer item for delete
     */
    setOfferItemForDelete(offerItem) {
      this.deleteOfferProduct = offerItem
      this.$bvModal.show('delete-offer-item')
    },

    /**
     * This function is used to remove offer item from list
     * on the basis of product id which is pass as param
     * @param id
     */
    removeOfferItem(id) {
      this.$store.commit('trades/removeTradeItem', id)
      this.$bvModal.hide('delete-offer-item')
      this.deleteOfferProduct = {}
      this.$nextTick(() => this.$forceUpdate())
    },

    /**
     * set want item for delete
     */
    setWantItemForDelete(wantItem) {
      this.deleteWantProduct = wantItem
      this.$bvModal.show('delete-want-item')
    },

    /**
     * This function is used to remove want item from list
     * on the basis of product id which is pass as param
     * @param id
     */
    removeWantItem(id) {
      this.$store.commit('trades/removeWantsItemsTrade', id)
      this.$bvModal.hide('delete-want-item')
      this.deleteWantProduct = {}
      this.$nextTick(() => this.$forceUpdate())
    },

    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput: debounce(function (term) {
      if (term) {
        this.searchText = term
        this.$axios
          .post('search/products', {
            filters: {
              search: term.toLowerCase(),  // search query param
              take: SEARCH_BAR_PRODUCTS // get no of record
            },
            page: 1 // page no
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
    }, 500),
  }
}
</script>
