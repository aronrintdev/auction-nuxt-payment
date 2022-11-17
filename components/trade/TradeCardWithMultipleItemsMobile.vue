<template>
  <div>
    <div v-if="isScreenXS" class="col-md-12 mx-auto">
      <div v-for="(trade) in trades" :key="'trade-list-' + trade.id" class="search-trade mb-5">
        <nuxt-link :to="'/trades/' + trade.id">
          <div class="row trade-info-mobile d-flex justify-content-between pl-4 pr-4" :class="`${selectCounterBG(trade.created_at)}`">
              <div class="btn-expire d-flex mt-2 ml-1 pt-2">
                <div>
                  <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
                </div>
                <div class="text-created">{{prettifyExpiryDate(trade.created_at)}}</div>
              </div>
          </div>
          <div class="row  col-md-12 d-flex justify-content-center pt-2 pb-4">
            <div v-for="(product, index) in trade.offers" :key="'trade-item-'+index" class="products d-flex justify-content-center mx-1" >
              <BrowseItemCard :inventory="product.inventory" :showExpire="false" class="trade-card item d-inline-block"/>
            </div>
          </div>
          <div class="d-flex justify-content-end align-content-end mt-1 mr-3 pb-2">
            <img class="trade-btn" :src="require('~/assets/img/tradebtn.svg')" />
          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="col-md-12 mb-5 mx-5 ">
      <div v-for="(trade) in trades" :key="'trade-list-' + trade.id" class="search-trade mb-5 browse-trade d-flex justify-content-center align-items-center">
        <nuxt-link :to="'/trades/' + trade.id">
          <div class="btn-expire d-flex mt-2 ml-1 pt-2" :class="`${selectCounterBG(trade.created_at)}`">
            <div>
              <img class="clock-image pl-1 pr-1 pb-2" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
            </div>
            <div class="text-created pl-1 pb-2">{{prettifyExpiryDate(trade.created_at)}}</div>
          </div>

          <div class="row d-flex justify-content-center pt-3 pb-2">
            <div v-for="(product, index) in trade.offers" :key="'trade-item-'+index" class="products d-flex justify-content-center mx-4" >
              <BrowseItemCard :inventory="product.inventory" :showExpire="false" class="item d-inline-block"/>
            </div>
          </div>
          <div class="">
            <img class="trade-btn" :src="require('~/assets/img/tradebtn.svg')" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import BrowseItemCard from '~/components/trade/BrowseItemCardMultipleMobile'
import { tradeRemainingTime, isRemainingTimeLessThan12Hours } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'
import ScreenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'TradeCardWithMultipleItems',

  components: { BrowseItemCard },

  props: {
    trades: {
      type: Array,
      required: true,
    },
    timeLimit: {
      type: Number,
      default: TRADE_EXPIRY_DAYS,
    },
  },
  data (){
    return {
      width:''
    }
  },
  mounted() {
    this.width = window.innerWidth
  },
  methods: {
    prettifyExpiryDate(createdAt){
      return tradeRemainingTime(createdAt, this.timeLimit)
    },
    selectCounterBG(createdAt){
      return isRemainingTimeLessThan12Hours(createdAt, TRADE_EXPIRY_DAYS) ? 'red' : 'gray'
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.trade-btn
  height: 21px
  width: 100px !important
  float: right
.trade-card-wrapper
  width: 204px
  @media (min-width: 300px) and (max-width: 500px)
    width: 100px
    height: 165px

.expire-text
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 16px
  line-height: 20px
  display: flex
  align-items: center
  color: $color-red-3


.listing-text
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $bold
  font-size: 18px
  line-height: 21px
  color: $color-black-1

.listing-id-color
  color: $color-blue-1

.trade-info
  background: $color-gray-1
  border-radius: 9px 9px 0 0
  height: 62px
  align-items: center
  margin: 0
.trade-info-mobile
  background: $color-white-1
  border-radius: 9px 9px 0 0
  height: 62px
  align-items: center
  margin: 0
.search-trade
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  margin: 2px 2px 2px 2px
.clock-image
  height: 20px
  width: 20px
.btn-expire
  @include body-9
  width: 110px
  height: 25px
.gray
  background-color: $dark-gray-8
  color: $color-black-1
.red
  background-color: $color-red-24
  color: $color-white-1
.products
  width: 213px

.text-created
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px
  padding-top: 1px
</style>
