<template>
  <div>
    <div class="col-md-12 d-flex">
      <div class="col-md-6 items-div">
        <div class="traded">
          <div v-if="theirItems && theirItems.length > ITEM_COUNT_ONE|| yourItems && yourItems.length > ITEM_COUNT_ONE">
            <div class="col-md-12 p-0 m-0 d-flex">
              <b-col md="5">
                <div class="heading pt-21">{{$t('trades.trade_arena.trade_completed.theirs')}}</div>
                <div :class="{'single-image-their' : theirItems.length === ITEM_COUNT_ONE,
                     'do-image-their': theirItems.length === ITEM_COUNT_TWO,'th-image-their': theirItems.length === ITEM_COUNT_THREE}">
                  <img v-for="(theirItem) in theirItems" :key="'their-prod-image' + theirItem.id" class="multi-image" :src="getProductImageUrl(theirItem.inventory.product)" alt="image" :class="{'image-their': theirItems.length === ITEM_COUNT_THREE}"/>
                </div>
              </b-col>
              <b-col md="2">
                  <img :src="require('~/assets/img/trade.svg')" class="icon-trade center-icon">
              </b-col>
              <b-col md="5">
                <div class="heading pt-21">{{$t('trades.trade_arena.trade_completed.yours')}}</div>
                <div :class="{'single-image-your' : yourItems.length === ITEM_COUNT_ONE,
                     'do-image-your': yourItems.length === ITEM_COUNT_TWO,'th-image-your': yourItems.length === ITEM_COUNT_THREE}">
                  <img v-for="(yourItem) in yourItems" :key="'your-prod-image' + yourItem.id" class="multi-image" :src="getProductImageUrl(yourItem.inventory.product)" alt="image" :class="{'image-your': yourItems.length === ITEM_COUNT_THREE}"/>
                </div>
              </b-col>
            </div>
            <b-row class="justify-content-center">
              <b-row class="col-md-12 justify-content-center offer-text"
                     :class="{'margin-unset' : (theirItems.length > ITEM_COUNT_ONE || yourItems.length > ITEM_COUNT_ONE )}">{{$t('trades.trade_arena.trade_completed.offer_sent')}}</b-row>
              <img :src="require('~/assets/img/logo.svg')">
            </b-row>
          </div>
          <div v-else>
            <div class="heading pt-21">{{$t('trades.trade_arena.trade_completed.theirs')}}</div>
            <img class="image-width left-27" :src="getProductImageUrl(theirItems[ITEM_COUNT_0].inventory.product)" alt="image"/>
            <b-row class="justify-content-center">
              <img :src="require('~/assets/img/trade.svg')" class="icon-trade">
            </b-row>
            <div class="heading mt-25">{{$t('trades.trade_arena.trade_completed.yours')}}</div>
            <img class="image-width left-27" :src="getProductImageUrl(yourItems[ITEM_COUNT_0].inventory.product)" alt="image"/>
            <b-row class="justify-content-center">
              <b-row class="col-md-12 justify-content-center offer-text">{{$t('trades.trade_arena.trade_completed.offer_sent')}}</b-row>
              <img :src="require('~/assets/img/logo.svg')">
            </b-row>
          </div>
        </div>
      </div>
      <div v-if="!detail" class="col-md-6">
        <b-row class="trade-detail justify-content-center">
          <img :src="require('~/assets/img/greentick.svg')" >
          <div class="ml-2 mt-2">
          {{$t('trades.trade_arena.trade_completed.trade_sent')}}
          </div>
        </b-row>
        <b-row class="trade-content d-flex justify-content-center">
          {{$t('trades.trade_arena.trade_completed.offer_number')}} <span class="font-weight-bold">{{trade.id}}</span>
        </b-row>
        <div class="trade-query col-md-12">
          <div class="col-md-12 text-center" v-html="$t('trades.trade_arena.trade_completed.for_question_email_at_or_call_at', [HELP_MAIL, CONTACTNUMBER])">
          </div>
        </div>
        <b-row class="justify-content-center">
          <b-btn class="view-details" @click="viewDetail()">{{$t('trades.trade_arena.trade_completed.view_trade_details')}}</b-btn>
        </b-row>
        <b-row class="justify-content-center">
          <hr class="hr-bar">
        </b-row>
        <div class="col-md-12 d-flex justify-content-center">
          <div class="browse">
            <div class="browse-second text-capitalize">
              <img :src="require('~/assets/img/circle-trade.svg')" class="mt-21p">
            </div>
            <div class="browse-first text-capitalize">
              <div class="title-text text-capitalize">{{$t('trades.trade_arena.trade_completed.trade_with_us')}}</div>
              <div class="pt-33">{{$t('trades.trade_arena.trade_completed.find_items_looking_for')}}</div>
            </div>
          </div>
          <div class="browse ml-5">
            <div class="browse-second text-capitalize">
              <img :src="require('~/assets/img/browse-bag.svg')" class="mt-21p">
            </div>
            <div class="browse-first text-capitalize">
              <div class="title-text text-capitalize">{{$t('trades.trade_arena.trade_completed.missed_some_items')}}</div>
              <div class="pt-33">{{$t('trades.trade_arena.trade_completed.browse_more_trades')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="detail" class="col-md-6">
        <b-row class="trade-detail justify-content-center">
          <img :src="require('~/assets/img/greentick.svg')" :alt="$t('trades.trade_arena.trade_completed.no_image_found')">
          <div class="ml-2 mt-2">
          {{$t('trades.trade_arena.trade_completed.trade_sent')}}
          </div>
        </b-row>
        <b-row class="trade-content d-flex justify-content-center">
          {{$t('trades.trade_arena.trade_completed.trade_number')}} <span class="font-weight-bold">{{trade.id}}</span>
        </b-row>
        <div class="trade-query cust-padding col-md-12 d-flex">
          <b-col md="3">
            <div>{{$t('trades.trade_arena.trade_completed.order_date')}}</div>
            <div class="det-val">{{trade.created_at | formatDate}}</div>
          </b-col>
          <b-col md="3">
            <div>{{$t('trades.trade_arena.trade_completed.shipping_address')}}</div>
            <div class="det-val">{{trade.shipping_address.address_line_1}} {{trade.shipping_address.address_line_2}} {{trade.shipping_address.city}}, {{trade.shipping_address.zip}} {{trade.shipping_address.country}}</div>
          </b-col>
          <b-col md="3">
            <div>{{$t('trades.trade_arena.trade_completed.billing_address')}}</div>
            <div class="det-val">{{trade.billing_address.address_line_1}} {{trade.billing_address.address_line_2}} {{trade.billing_address.city}}, {{trade.billing_address.zip}} {{trade.billing_address.country}}</div>
          </b-col>
          <b-col md="3">
            <div>{{$t('trades.trade_arena.trade_completed.payment')}}</div>
            <!-- TODO -->
            <div class="det-val col-md-10 p-0">{{trade.card_details}}</div>
          </b-col>
        </div>
        <b-row class="justify-content-end items-count">
          {{$t('trades.trade_arena.trade_completed.items_traded')}} 1
        </b-row>
        <b-row class="justify-content-center">
          <hr class="hr-bar">
        </b-row>
        <b-row class="d-block">
          <div class="d-flex billing mb-2">
          <b-col md="9 text-right">{{$t('trades.trade_arena.trade_completed.added_cash')}}</b-col>
          <b-col md="3 text-right pr-50">${{(trade.cash_added/100).toFixed(2)}}</b-col>
          </div>
          <div class="d-flex billing mb-2">
          <b-col md="9 text-right">{{$t('trades.trade_arena.trade_completed.price')}}</b-col>
          <b-col md="3 text-right pr-50">${{(trade.price/100).toFixed(2)}}</b-col>
          </div>
          <div class="d-flex billing mb-2">
          <b-col md="9 text-right">{{$t('trades.trade_arena.trade_completed.shipping_fee')}}</b-col>
          <b-col md="3 text-right pr-50">${{(trade.shipping_fee/100).toFixed(2)}}</b-col>
          </div>
          <div class="d-flex billing mb-2">
          <b-col md="9 text-right">{{$t('trades.trade_arena.trade_completed.processing_fee')}}</b-col>
          <b-col md="3 text-right pr-50">${{(trade.processing_fee/100).toFixed(2)}}</b-col>
          </div>
          <div class="d-flex billing mb-2">
          <b-col md="9 text-right">{{$t('trades.trade_arena.trade_completed.trade_fee')}}</b-col>
          <!-- TODO -->
          <b-col md="3 text-right pr-50">${{(trade.trade_fee/100).toFixed(2)}}</b-col>
          </div>
          <div class="d-flex billing">
          <b-col md="9 text-right">{{$t('trades.trade_arena.trade_completed.tax')}}</b-col>
          <b-col md="3 text-right pr-50">${{(trade.tax/100).toFixed(2)}}</b-col>
          </div>
        </b-row>
        <b-row class="justify-content-center">
          <hr class="hr-bar">
        </b-row>
        <b-row class="d-block">
          <div class="col-md-12 p-0 m-0">
            <div class="d-flex">
            <b-col md="9 text-right total">{{$t('trades.trade_arena.trade_completed.total')}}</b-col>
            <b-col md="3 text-right pr-50 total">${{((trade.total)/100).toFixed(2)}}</b-col>
            </div>
            <b-col md="12 text-right pr-50 charges">{{$t('trades.trade_arena.trade_completed.charges_will_not_placed')}}</b-col>
          </div>
        </b-row>
        <b-row class="justify-content-center mt-4">
          <b-btn class="view-details" @click="hideDetail()">{{$t('trades.trade_arena.trade_completed.hide_order_details')}}</b-btn>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  API_PROD_URL,
  PRODUCT_IMG_WIDTH,
  HELP_MAIL,
  CONTACTNUMBER
} from '~/static/constants'
import {
  ITEM_COUNT_0,
  ITEM_COUNT_ONE,
  ITEM_COUNT_TWO,
  ITEM_COUNT_THREE
} from '~/static/constants/trades';

export default {
  name: 'TradeCompleted',
  props:{
    trade: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      ITEM_COUNT_0,
      ITEM_COUNT_ONE,
      ITEM_COUNT_TWO,
      ITEM_COUNT_THREE,
      API_PROD_URL,
      HELP_MAIL,
      CONTACTNUMBER,
      detail:false,
      yourItems: this.trade.yours_items,
      theirItems: this.trade.theirs_items
    }
  },
  methods:{
    /**
     * Load Product Image URL
     * @param item
     */
    getProductImageUrl(product){
      return API_PROD_URL + '/' + product.category.name + '/' + product.sku + '/image?width=' + PRODUCT_IMG_WIDTH
    },
    viewDetail(){
      this.detail = true
    },
    hideDetail(){
      this.detail = false
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.traded
  width: 466px
  height: 583px
  background: $color-white-16
  margin-left: 110px
  margin-top: 95px
  margin-bottom: 123px

.image-width
  width: 215px
  height: auto
  margin-top: -11%

.items-div
  background: $color-white-5

.heading
  font-family: $font-family-futura
  font-style: normal
  font-weight: $bold
  font-size: 28px
  line-height: 37px
  text-transform: uppercase
  color: $color-black-1
  margin-left: 21px

.pt-21
  padding-top: 21px

.left-27
  margin-left: 27%

.offer-text
  font-family: $font-family-futura
  font-style: normal
  font-weight: $bold
  font-size: 50px
  line-height: 66px
  text-transform: uppercase
  color: $color-gray-64
  margin-top: -6%
  margin-bottom: 35px

.icon-trade
  z-index: 10000

.mt-25
  margin-top: -25px

.trade-detail
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 24px
  line-height: 29px
  color: $color-black-1
  padding-top: 85px

.trade-content
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 18px
  line-height: 22px
  color: $color-black-1
  margin-top: 32px

.trade-query
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 14px
  line-height: 26px
  color: $color-black-1
  margin-top: 19px

.view-details
  background: $color-blue-2
  border-radius: 20px
  width: 220px
  margin-top: 20px
  color: $color-white-1
  border: 1px solid $color-blue-2 !important

.browse
  width: 232px
  height: 280px
  background: $color-white-2
  border: 1px solid $color-white-3
  box-sizing: border-box
  border-radius: 4px

.browse-first
  width: 230px
  height: 150px
  background: $color-white-3
  border: 1px solid $color-white-3
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 14px
  line-height: 100%
  align-items: center
  text-align: center
  color: $color-black-1
  padding-top: 33px

.browse-second
  width: 230px
  height: 132px
  background: $color-white-2
  box-sizing: border-box
  border-radius: 0 0 4px 4px
  text-align: center
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 14px
  line-height: 17px
  align-items: center

.pt-33
  padding-top:33px
  padding-left:15px
  padding-right:15px

.title-text
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 14px
  line-height: 17px
  color: $color-black-1

.det-val
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 12px
  line-height: 16px
  color: $color-black-1

.cust-padding
  padding-left: 50px
  padding-right: 50px

.items-count
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 26px
  line-height: 32px
  color: $color-black-1
  margin-top: 22px
  padding-right: 50px

.pr-50
  padding-right: 50px

.billing
  font-family: $font-sf-pro-text
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 17px
  text-transform: uppercase
  color: $color-black-1

.total
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 20px
  line-height: 24px
  text-transform: uppercase
  color: $color-black-1

.charges
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  font-size: 12px
  line-height: 14px
  color: $color-black-1
  margin-top: 8px

.multi-image
  height: 150px
  width: auto
  margin-left: 25px

.single-image-their,
.single-image-your
  margin-top: 65%

.center-icon
  margin-top: 245px

.do-image-your,
.do-image-their
  margin-top: 35px

.th-image-your,
.th-image-their
  margin-top: 0

.margin-unset
  margin-top: unset

.image-your,
.image-their
  height: 125px
  width: auto

.hr-bar
  color: $color-white-3
  width: 569px
  margin-top: 24px

.mt-21p
  margin-top: 21px

</style>
