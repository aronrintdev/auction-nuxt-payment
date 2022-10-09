<template>
  <client-only>
  <vue-bottom-sheet ref="myBottomSheet" max-height="90%" :is-full-screen="true">
    <div class="offer-items">
      <div class="d-flex justify-content-between pl-3 pr-3">
        <div class="clear">Clear</div>
        <div class="d-block text-center">
          <div class="offer-heading">Your Offer</div>
          <div class="est-val">Estimated Value:$0.00</div>
        </div>
        <div class="done">Done</div>
      </div>
      <div v-if="getYourTradeItems.length > ITEM_COUNT_0">
        <div  v-for="(item,index) in getYourTradeItems" :id="'your-card-'+index" :key="index" class="item-inventory mb-4">
          <div class="position-relative">
          <div class="remove-item" @click="decrementOrRemoveItem(item)">
            <div class="minus"></div>
          </div>
          </div>
          <div class="image-wrapper">
            <img class="pro-image" :src="item.product.image" alt="image" />
            <div class="overlay"></div>
          </div>
          <div class="item-caption">
            <span class="item-name">{{  (item.product && item.product.name) ? item.product.name : item.name  }}</span>
            <!--                      <span class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{  (item.box_condition && item.box_condition.name) ? item.box_condition.name :item.box_condition }}</span>-->
            <!--                      <span class="item-caption-description">{{  (item.product  && item.product.colorway) ? item.product.colorway : item.colorway }}</span>-->
            <!--                      <span class="item-size">{{$t('trades.trade_arena.size')}} {{ item.size && item.size.size }}</span>-->
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center mb-3 mt-3">
        <img :src="require('~/assets/img/trades/select-inventory.svg')">
      </div>
    </div>
    <div class="inventory-items d-flex flex-wrap ml-3 mr-3">
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
  </vue-bottom-sheet>
  </client-only>
</template>

<script>
import debounce from 'lodash.debounce';
import {mapGetters} from 'vuex';
import {
  ITEM_COUNT_0
} from '~/static/constants/trades'
import {DEFAULT_PER_PAGE_ITEMS, MAX_ITEMS_ALLOWED, PER_PAGE_ITEMS} from '~/static/constants';
import {Pagination} from '~/components/common'
export default {
  name: 'InventoryBottomSheet',
  components:{
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
  width: 117px
  height: 100%
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
  font-size: 13px
  line-height: 130%
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  max-width: 160px

.invent-color,.invent-box
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 13px
  line-height: 130%
  color: $color-gray-5
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  max-width: 160px

</style>
