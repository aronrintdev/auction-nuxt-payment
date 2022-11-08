<template>
  <div>
    <div class="col-md-12 mx-auto" v-if="width <=500">
      <div v-for="(trade) in trades" :key="'trade-list-' + trade.id" class="search-trade mb-5">
        <nuxt-link :to="'/trades/' + trade.id">
          <div class="row trade-info-mobile d-flex justify-content-between pl-4 pr-4">
              <div class="btn-expire d-flex mt-2 ml-1 pt-2">
                <div>
                  <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/clock.svg')" />
                </div>
                <div class="text-created">{{prettifyExpiryDate(trade.created_at)}}</div>
              </div>
          </div>
          <div class="row  col-md-12 d-flex justify-content-center pt-2 pb-4">
            <div v-for="(product, index) in trade.offers" :key="'trade-item-'+index" class="products d-flex justify-content-center mx-1" >
              <BrowseItemCard :product="product.inventory.product" :showExpire="false" class="trade-card item d-inline-block"/>
            </div>
          </div>
          <div class="d-flex justify-content-end align-content-end mt-1 mr-3 pb-2">
            <img class="trade-btn" :src="require('~/assets/img/tradebtn.svg')" />
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="col-md-12 mb-5 mx-5 " v-else>
      <div v-for="(trade) in trades" :key="'trade-list-' + trade.id" class="search-trade mb-5">
        <nuxt-link :to="'/trades/' + trade.id">
          <div class="row trade-info d-flex justify-content-between pl-4 pr-4">
            <label class="listing-text">
              {{$t('common.listing_id')}}
              <span class="listing-id-color">: #{{trade.id}}</span>
            </label>
            <span class="expire-text" >
              {{$t('common.expires')}} {{prettifyExpiryDate(trade.created_at)}}
            </span>
          </div>
          <div class="row  col-md-12 d-flex justify-content-center pt-3 pb-4">
            <div v-for="(product, index) in trade.offers" :key="'trade-item-'+index" class="products d-flex justify-content-center mx-4" >
              <BrowseItemCard :product="product.inventory.product" :showExpire="false" class="trade-card item d-inline-block"/>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import BrowseItemCard from '~/components/trade/BrowseItemCard.vue'
import { tradeRemainingTime } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'

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
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.trade-btn
  height: 21px
  width: 62px
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
  font-size: 12px
  border: 1px solid $color-gray-23 !important
  padding: 0
  color: $color-white-1
  background-color: $color-gray-23

</style>
