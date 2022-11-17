<template>
<div>
  <create-trade-search-item v-if="search_item" :product="search_item" :itemId="trade_want_id" productFor="wantOfferConfirm"/>
  <div v-else>
    <b-row class="pt-3 pl-32px">
      <b-col cols="6" class="create-trade-heading">
        <div>
          {{ $t('trades.create_listing.vendor.wants.trade_confirmation') }}
        </div>
        <div class="expire-days mt-2">
          {{$t('trades.all_trade_listing_expire')}}
        </div>
      </b-col>
      <b-col cols="6">
      </b-col>
    </b-row>
    <b-row class="offered-item-confirm-trade">
      {{ $t('trades.create_listing.vendor.wants.offered_items') }}
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
               :src="`${IMAGE_PATH}/${item.product && item.product.category.name ? item.product.category.name :item.category.name }/${item.sku ? item.sku : item.product.sku}/800xAUTO/IMG01.jpg`"
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
      <b-col cols="2" class="d-flex align-items-center">
        <div class="confirm-trade-item-quantity">{{ item.quantity }}</div>
      </b-col>
      <b-col cols="2" class="confirm-trade-icons d-flex align-items-center">
        <div>
          <NuxtLink class="font-weight-bolder text-gray" to="/profile/create-listing/trades/create">
            <img :src="require('~/assets/img/box-pencil.svg')" :alt="$t('trades.create_listing.vendor.wants.no_image')"/>
          </NuxtLink>
        </div>
        <div class="pl-3">
          <img :src="require('~/assets/img/box-delete.svg')" class="cursor-pointer"
               :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="removeOfferItem(item.id)"/>
        </div>
      </b-col>
    </b-row>
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
    <b-row class="confirm-trade-detail-section mb-3">
      <b-col cols="8">{{ $t('trades.create_listing.vendor.wants.details') }}</b-col>
      <b-col cols="2">{{ $t('trades.create_listing.vendor.wants.quantity') }}</b-col>
      <b-col cols="2">{{ $t('trades.create_listing.vendor.wants.actions') }}</b-col>
    </b-row>
    <b-row v-for="(wantItem, index) in getTradeItemsWants" :key="'want-'+index+wantItem.id" class="confirm-trade-item">
      <b-col cols="8" class="d-flex">
        <div class="pt-3">
          <img class="confirm-trade-item-image" :src="wantItem.image"
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
      <b-col cols="2" class="d-flex align-items-center">
        <div class="confirm-trade-item-quantity">{{ wantItem.selected_quantity }}</div>
      </b-col>
      <b-col cols="2" class="confirm-trade-icons d-flex align-items-center">
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
    </b-row>
    <b-row v-if="!getTradeItemsWants.length">
      <b-col cols="12" class="d-flex mt-3 pl-5 ml-2 mb-4">
        <NuxtLink class="font-weight-bolder text-gray" to="/profile/create-listing/trades/wants">
          {{ $t('trades.create_listing.vendor.wants.click_to_add_want_items') }}
        </NuxtLink>
      </b-col>
    </b-row>

    <b-row class="justify-content-center mt-4 mb-4">
      <b-btn class="confirm-trade-draft" variant="listing" @click="saveVendorTrade(STATUS_DRAFT)">{{ $t('trades.create_listing.vendor.wants.save_as_draft') }}</b-btn>
      <b-btn class="confirm-trade-post ml-5" :disabled="!getTradeItemsWants.length || !getTradeItems.length" variant="listing" @click="saveVendorTrade(STATUS_LIVE)">{{ $t('trades.create_listing.vendor.wants.post_trade_listing') }}</b-btn>
    </b-row>
    <b-row class="justify-content-center mt-4">
      <div class="post-listing-tax">
        {{$t('trades.by_pressing_post_listing')}}
      </div>
    </b-row>
  </div>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem'
import {
  IMAGE_PATH,
  MAX_ITEMS_ALLOWED,
  STATUS_DRAFT,
  STATUS_LIVE
} from '~/static/constants/create-listing'

export default {
  name: 'Index',
  components: {
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
.confirm-trade-draft
  width: 196.22px
  height: 38px
  background: $color-blue-20
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-8
  color: $color-white-1
.confirm-trade-post
  width: 196.22px
  height: 38px
  background: $color-black-1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-8
  color: $color-white-1
.expire-days
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-regular
  color: $color-gray-5
.pl-32px
  padding-left: 32px
.confirm-trade-item-quantity
  padding-top: unset
.post-listing-tax
  font-family: $font-family-sf-pro-text
  font-style: normal
  @include body-13-regular
  text-align: center
  letter-spacing: -0.02em
  color: $color-black-1
  width: 660px
</style>
