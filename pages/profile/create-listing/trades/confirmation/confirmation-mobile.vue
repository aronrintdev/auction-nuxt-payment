<template>
<div>
  <create-trade-search-item v-if="search_item" :product="search_item" :itemId="trade_want_id" productFor="wantOfferConfirm"/>
  <div v-else>
    <div class="offered-item-confirm-trade mt-2">
      {{ $t('trades.create_listing.vendor.wants.offered_items') }}
    </div>
    <div v-for="(item, index) in getTradeItems" :key="'offer-'+index+item.id" class="confirm-trade-item">
      <div class="d-flex">
        <div class="ml-2">
          <img class="confirm-trade-item-image mt-3"
               :src="`${IMAGE_PATH}/${item.product && item.product.category.name ? item.product.category.name :item.category.name }/${item.sku ? item.sku : item.product.sku}/800xAUTO/IMG01.jpg`"
               :alt="$t('trades.create_listing.vendor.wants.no_image')"/>
          <div class="quantity-heading ml-2">Quantity : <span class="sub-quantity">{{ item.quantity }}</span></div>
        </div>
        <div class="pl-4 pt-3">
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
      </div>
      <div cols="2" class="confirm-trade-icons d-flex">
        <div>
          <NuxtLink class="font-weight-bolder text-gray" to="/profile/create-listing/trades/create">
            <img :src="require('~/assets/img/box-pencil.svg')" :alt="$t('trades.create_listing.vendor.wants.no_image')"/>
          </NuxtLink>
        </div>
        <div class="pl-3">
          <img :src="require('~/assets/img/box-delete.svg')" class="cursor-pointer"
               :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="removeOfferItem(item.id)"/>
        </div>
      </div>
    </div>
    <b-row v-if="!getTradeItems.length">
      <b-col cols="12" class="d-flex mt-3 pl-5 ml-2">
        <NuxtLink class="font-weight-bolder text-gray" to="/profile/create-listing/trades/create">
          {{ $t('trades.create_listing.vendor.wants.click_to_add_offer_items') }}
        </NuxtLink>
      </b-col>
    </b-row>

    <b-row class="offered-item-confirm-trade">
      {{ $t('trades.create_listing.vendor.wants.wanted_items') }}
    </b-row>

    <div v-for="(wantItem, index) in getTradeItemsWants" :key="'want-'+index+wantItem.id" class="confirm-trade-item">
      <div class="d-flex">
        <div class="ml-2">
          <img class="confirm-trade-item-image mt-3" :src="wantItem.image"
               :alt="$t('trades.create_listing.vendor.wants.no_image')"/>
          <div class="quantity-heading ml-2">Quantity : <span class="sub-quantity">{{ wantItem.selected_quantity }}</span></div>
        </div>
        <div class="pt-3 pl-4">
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
      </div>
      <b-col cols="2" class="confirm-trade-icons d-flex">
        <div>
          <img class="cursor-pointer" :src="require('~/assets/img/box-copy.svg')"
               :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="addProductWant(wantItem.product, 0, getTradeItemsWants.map(i => parseInt(i.selected_quantity)).reduce((a, b) => a + b, 0))" />
        </div>
        <div class="pl-3">
            <img :src="require('~/assets/img/box-pencil.svg')" class="cursor-pointer" :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="addProductWant(wantItem.product, wantItem, 0)"/>
        </div>
        <div class="pl-3">
          <img :src="require('~/assets/img/box-delete.svg')" class="cursor-pointer"
               :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="removeWantItem(wantItem.id)"/>
        </div>
      </b-col>
    </div>
    <b-row v-if="!getTradeItemsWants.length">
      <b-col cols="12" class="d-flex mt-3 pl-5 ml-2 mb-4">
        <NuxtLink class="font-weight-bolder text-gray" to="/profile/create-listing/trades/wants">
          {{ $t('trades.create_listing.vendor.wants.click_to_add_want_items') }}
        </NuxtLink>
      </b-col>
    </b-row>

    <div class="mt-2 d-flex">
      <div class="mt-2" @click="$bvModal.show('offer-item-modal')">
        <b-img
          :src="require('~/assets/img/icons/clarity_eye-line.svg')"
          :alt="$t('trades.create_listing.vendor.wants.view_offer_items')"
        />
      </div>
      <div>
        <FormStepProgressBar :steps="steps" variant="transparent"/>
      </div>
    </div>
    <div class="d-flex mt-2">
      <b-btn class="confirm-trade-draft-btn ml-3"
             @click="saveVendorTrade(STATUS_DRAFT)">
        {{  $t('trades.create_listing.vendor.wants.save_as_draft')  }}
      </b-btn>
      <b-btn class="confirm-trade-post-btn ml-3" :disabled="!getTradeItemsWants.length || !getTradeItems.length"
             @click="saveVendorTrade(STATUS_LIVE)">
        {{  $t('trades.create_listing.vendor.wants.post_trade_listing')  }}
      </b-btn>
    </div>
  </div>
  <ViewOfferItemsModal />
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import FormStepProgressBar from '~/components/common/FormStepProgressBar.vue'
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem'
import ViewOfferItemsModal from '~/pages/profile/create-listing/trades/wants/ViewOfferItemsModal';
import {
  IMAGE_PATH,
  MAX_ITEMS_ALLOWED,
  STATUS_DRAFT,
  STATUS_LIVE
} from '~/static/constants/create-listing'
// import Button from '~/components/common/Button';

export default {
  name: 'Index',
  components: {
    // Button,
    ViewOfferItemsModal,
    FormStepProgressBar,
    CreateTradeSearchItem
  },
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      IMAGE_PATH,
      STATUS_DRAFT,
      STATUS_LIVE,
      MAX_ITEMS_ALLOWED,
      steps: [
        {name: this.$t('trades.create_listing.vendor.wants.offer_items'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.enter_what_you_want'), active: true},
        {name: this.$t('trades.create_listing.vendor.wants.confirm_trade'), active: true}
      ],
      search_item:  null,
      trade_want_id: null
    }
  },
  computed:{
    ...mapGetters('trades',['getTradeItems', 'getTradeItemsWants']),  // Getter for getting listing of trade offer item and want item
  },
  mounted() {
    // Emit to take user back from search page to confirmation
    this.$root.$on('back_to_search_wants',()=>{
      this.search_item = false
      this.$nextTick(() => this.$forceUpdate())
    })
  },
  methods: {

    ...mapGetters('trades', ['getTradeId']),// getter for getting trade id

    /**
     * This function is used to add items in offer listing
     * to pass data as param to create listing in api
     * @returns {*[]}
     */
    prepareOfferItems() {
      return this.getTradeItems.map(item =>
        ({
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
            product_id: item.product_id,
            quantity: item.selected_quantity,
            size_id: item.selected_size,
            packaging_condition_id: item.selected_box_condition,
            year: item.selected_year
        })
      )
    },

    redirectTo(status){
      if(status === STATUS_DRAFT){
        this.$router.push('/profile/create-listing/drafts')
      }else{
        this.$router.push('/profile/trades/dashboard')
      }
    },

    /**
     * This function is used to create listing for trade
     * it also used for updating trade listing id trade id exists
     * @param status
     */
    saveVendorTrade(status) {
      const tradeId = this.getTradeId()

      if (!tradeId) {
        // create new trade list
        this.$axios
          .post('trades', {
            status,
            offer_items: this.prepareOfferItems(), // offer items for create listing
            want_items: this.prepareWantItems(), //
          })
          .then(() => {       // On response clears states and move to listing page
            this.$store.commit('trades/clearTradeItems')
            this.$store.commit('trades/clearWantsItemsTrade')
            this.redirectTo(status)
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.message))
          })
        } else{
          // update trade list
          this.$axios
          .put('trades/' + tradeId, {
            status,
            offer_items: this.prepareOfferItems(), // offer items for listing
            want_items: this.prepareWantItems(), // want items for listing
          })
          .then(() => { // on response clear states and move to listing page
            this.$store.commit('trades/clearTradeItems')
            this.$store.commit('trades/clearWantsItemsTrade')
            this.$store.commit('trades/setTradeForEditing', null)
            this.redirectTo(status)
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
    addProductWant(wantProduct, tradeWant,count) {
        if (count >= MAX_ITEMS_ALLOWED) {
        this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])) // error of quantity increase
      }
        else {
        this.trade_want_id = tradeWant?.id
        const product = JSON.parse(JSON.stringify(wantProduct));
        product.selected_box_condition = tradeWant?.selected_box_condition
        product.selected_quantity = tradeWant?.selected_quantity
        product.selected_year = tradeWant?.selected_year
        product.selected_size = tradeWant?.selected_size
        this.search_item = product
      }
    },

    /**
     * This function is used to remove offer item from list
     * on the basis of product id which is pass as param
     * @param id
     */
    removeOfferItem(id) {
      this.$store.commit('trades/removeTradeItem', id)
      this.$nextTick(() => this.$forceUpdate())
    },

    /**
     * This function is used to remove want item from list
     * on the basis of product id which is pass as param
     * @param id
     */
    removeWantItem(id) {
      this.$store.commit('trades/removeWantsItemsTrade', id)
      this.$nextTick(() => this.$forceUpdate())
    },
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.confirm-trade-draft-btn
  width: 162px
  height: 40px
  border-radius: 20px
  border: 1px solid #7196B1
  font-size: 13px
  font-family: Montserrat
  color: #7196B1
.confirm-trade-post-btn
  width: 162px
  height: 40px
  border-radius: 20px
  background-color: #667799
  color: #FFFFFF
  font-family: Montserrat
  font-weight: 600
  font-size: 13px
.offered-item-confirm-trade
  font-size: 14px
  font-weight: 700
  font-family: Montserrat
  color: #000000
.confirm-trade-item
  width: 343px
  height: 133px
  border-radius: 10px
  background: #FFFFFF
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
.confirm-trade-item-image
  width: 86px
  height: 53px
.quantity-heading
  font-family: 'Montserrat'
  font-weight: 600
  font-size: 12px
  color: #000000
.confirm-trade-item-quantity
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 500
  font-size: 12px
  color: #6F6F6F
.sub-quantity
  font-size: 12px
  font-weight: 500
  font-family: Montserrat
  color: #6F6F6F
.confirm-trade-item-name
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 600
  font-size: 14px
.confirm-trade-item-detail
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 11px
</style>
