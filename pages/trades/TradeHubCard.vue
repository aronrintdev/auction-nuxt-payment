<template>
  <div class="pb-5">
    <div class="center-container" :class="{'center-cont-height':(trade.theirs.offers.length > ITEM_COUNT_ONE || trade.yours.offers.length > ITEM_COUNT_0) }">
      <div class="left-item" :class="{'left-item-margin':trade.theirs.offers.length === ITEM_COUNT_ONE && trade.yours.offers.length > ITEM_COUNT_0}">
        <div class="item-head-trade-hub">{{$t('trades.trade_arena.theirs')}}:</div>
        <div
          v-for="(item,index) in trade.theirs.offers"
          :id="trade.theirs.offers.length === ITEM_COUNT_THREE ?'trade-item-'+index : ''"
          :key="index" class="item mb-4"
          :class="[((trade.theirs.offers.length > ITEM_COUNT_ONE )|| (trade.yours.offers.length > ITEM_COUNT_0)) ? 'item-length' : 'item-normal']">
            <div class="image-wrapper">
            <img class="item-image-trade"
              :src="item.inventory.product | getProductImageUrl"
              alt="image"
              :class="{'item-image-cond':(trade.theirs.offers.length > ITEM_COUNT_ONE || trade.yours.offers.length > ITEM_COUNT_0) }"/>
          </div>
          <div class="item-caption">
            <span class="item-name">{{item.inventory.product.name}}</span>
            <span class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{item.inventory.packaging_condition.name}}</span>
            <span class="item-caption-description">{{item.inventory.product.colorway}}</span>
            <span class="item-size">{{$t('trades.trade_arena.size')}} {{item.inventory.size.size}}</span>
          </div>
        </div>
      </div>
      <div class="center-item">
        <div v-if="trade.theirs.offers.length > ITEM_COUNT_ONE" class="pointer-left"></div>
        <div class="long-line" :class="{'long-line-length' : trade.theirs.offers.length === ITEM_COUNT_ONE }"></div>
        <img :src="require('~/assets/img/trades/border.svg')" height="59" width="59"/>
        <div class="long-line" :class="{'long-line-length' : trade.yours.offers.length === ITEM_COUNT_ONE }"></div>
        <div v-if="trade.yours.offers.length > ITEM_COUNT_ONE" class="pointer-right"></div>
      </div>
      <div class="right-item" :class="{
            'right-item-margin':trade.theirs.offers.length > ITEM_COUNT_ONE && trade.yours.offers.length === ITEM_COUNT_0,
            'mt-10p': trade.theirs.offers.length > ITEM_COUNT_ONE && trade.yours.offers.length === ITEM_COUNT_ONE,
            'mt-8p': trade.theirs.offers.length === ITEM_COUNT_ONE && trade.yours.offers.length === ITEM_COUNT_ONE}">
        <div class="item-head-trade-hub">{{$t('trades.trade_arena.yours')}}:</div>
        <div v-if="trade.yours.offers.length" class="">
          <div
            v-for="(item,index) in trade.yours.offers"
            :id="trade.yours.offers.length > ITEM_COUNT_TWO ?'your-trade-item-'+index : 'your-item'"
            :key="index"
            class="preview item-length mb-4">
              <div class="image-wrapper">
              <img class="item-image-trade"
                :src="item.inventory.product | getProductImageUrl"
                alt="image"
                :class="{'item-image-cond':(trade.theirs.offers.length > ITEM_COUNT_ONE || trade.yours.offers.length > ITEM_COUNT_0) }"/>
            </div>
            <div class="item-caption">
              <span class="item-name">{{item.inventory.product.name}}</span>
              <span class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{item.inventory.packaging_condition.name}}</span>
              <span class="item-caption-description">{{item.inventory.product.colorway}}</span>
              <span class="item-size">{{$t('trades.trade_arena.size')}} {{item.inventory.size.size}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center mb-4">
      <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
        <span class="fair-trade-label">{{$t('trades.trade_arena.fair')}}</span>
        <Meter :value="20 * 100 "
              :lowest="15"
              :highest="30"
              :fair="25"
              :heading="false"
        />
      </div>
      <div>
        <div class="amounts-input">
          <!-- TODO -->
          <input type="text"  class="theirs" disabled :value="$t('trades.trade_arena.theirs') + `: ${theirTotal()}`">
          <input type="text"  class="yours" disabled :value="$t('trades.trade_arena.yours') + `: ${yourTotal()}`">
        </div>
      </div>
      <div class="trade-hub-buttons mt-4">
        <button class="view-trade-btn mr-3" @click="viewTrade(trade.theirs.id)">{{$t('trades.trade_hub.view_trade')}} <b-icon icon="check-lg" aria-hidden="true"></b-icon></button>
        <button class="dismiss-btn ml-3" @click="dismissThisTrade(trade.theirs.id)">{{$t('trades.trade_hub.dismiss')}} <b-icon icon="x-lg" aria-hidden="true"></b-icon></button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import Meter from '~/components/common/Meter';
import {ITEM_COUNT_0,ITEM_COUNT_ONE,ITEM_COUNT_TWO,ITEM_COUNT_THREE} from '~/static/constants/trades';
export default {
  name: 'TradeHubCard',
  components:{
    Meter
  },
  props: {
    trade: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      ITEM_COUNT_0,
      ITEM_COUNT_ONE,
      ITEM_COUNT_TWO,
      ITEM_COUNT_THREE
    }
  },
  methods: {
    ...mapActions('trade', ['dismissTrade']), // dismiss trade for not being shown in future
    /**
    * Dismiss trade for not to be shown in future
    * @param {*} tradeId
    */
    dismissThisTrade(tradeId){
      this.dismissTrade({trade_id: tradeId}).then(() => {
        this.$store.commit('trade/removeTradeFromBestMatches', tradeId)
      })
    },
    /**
     * Move vendor to trade offer page
     * @param {number} theirTradeId
     */
    viewTrade(theirTradeId){
      this.$router.push('/trades' + '/' + theirTradeId)
    },
    /**
     * This function is used to get total amount of want items
     * and return amount in string
     * @returns {string}
     */
    theirTotal(){
      const price = this.trade.theirs.offers.map((value) => value.inventory.sale_price)
      if(price.length) {
        return '$' + (price.reduce((a, b) => a + b, 0)/100).toFixed(2)
      }
      return '$0.00'
    },

    /**
     * This function is used to get total amount of wants items
     * offered by you for trade by default it return string 0
     * @returns {string|*}
     */
    yourTotal(){
      const price = this.trade.yours.offers.map((item) => item.inventory.sale_price)
      if(price.length) {
        return '$' + (price.reduce((a, b) => a + b, 0)/100).toFixed(2)
      }
      return '$0.00'
    },
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.item-head-trade-hub
  font-family: $font-montserrat-serif
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

.mt-10p
  margin-top: 10%

.mt-8p
  margin-top: 8%

.left-item-margin
  padding-left: 4%

.view-trade-btn
  border: 1px solid $color-blue-1
  border-radius: 41px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 16px
  line-height: 19px
  color: $color-blue-1
  width: 157px
  height: 38px
  background: $color-white-1

.dismiss-btn
  width: 139px
  height: 38px
  border: 1px solid $color-red-3
  border-radius: 41px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 16px
  line-height: 19px
  color: $color-red-3
  background: $color-white-1

.item
  border: 0.5px solid $light-gray-2

.item-image-trade
  width: 204px
  height: 232px
  border-radius: 0

.owl-carousel .owl-item img::v-deep
  width: unset

.image-wrapper
  width: 204px
  height: 196px

.right-item .item, .right-item .preview
  background: $color-white-1
</style>
