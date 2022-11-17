<template>
  <div v-if="isMobileSize" class="trade-card-wrapper">
    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class="btn-expire d-flex mt-2 ml-1 pt-2" :class="`${selectCounterBG(trade.created_at)}`">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
        </div>
        <div class="text-created pl-1">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="inventory.product" role="button" :overlay="true"/>
    </div>
    <div class="detail-wrapper">
      <div class="d-flex">
        <div class="left-side-cont pr-4">
          <div class="product-name">{{ inventory.product.name }}</div>
          <div class="product-color">{{ inventory.product.colorway }}</div>
          <div class="product-size">{{ inventory.size.size }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="trade-card-wrapper">
    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class="btn-expire d-flex mt-2 ml-1 pt-2" :class="`${selectCounterBG(trade.created_at)}`">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
        </div>
        <div class="text-created pl-1">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="inventory.product" role="button" :overlay="true"/>
    </div>
    <div class="detail-wrapper">
      <div class="d-flex">
        <div class="left-side-cont pr-4">
          <div class="product-name">{{ inventory.product.name }}</div>
          <div class="product-color">{{ inventory.product.colorway }}</div>
          <div class="product-size">{{ inventory.size.size }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import { tradeRemainingTime, isRemainingTimeLessThan12Hours } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'BrowseItemCard',

  components: { ProductThumb },
  mixins: [screenSize],
  props: {
    inventory: {
      type: Object,
      required: true,
    },
    trade: {
      type: Object,
      default: null,
    },
    showExpire: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data (){
    return {
      width:''
    }
  },
  computed:{
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    },
  },
  methods: {
    prettifyExpiryDate(createdAt){
      return tradeRemainingTime(createdAt, TRADE_EXPIRY_DAYS)
    },
    selectCounterBG(createdAt){
      return isRemainingTimeLessThan12Hours(createdAt, TRADE_EXPIRY_DAYS) ? 'red' : 'gray'
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.text-created
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px
  padding-top: 1px
.trade-btn::v-deep
  height: 40px
  width: 94px
.left-side-cont
  width: 150px
.trade-card-wrapper
  background: $color-white-4
  position: relative

  .expire-wrapper
    padding: 0 19px
    padding-top: 10px
    padding-bottom: 10px
    .btn-expire
      @include body-5
      font-weight: $medium
      width: 94px
      height: 31px
    .gray
      background-color: $dark-gray-8
      color: $color-black-1
    .red
      background-color: $color-red-24
      color: $color-white-1

  .product-image
    position: relative
    height: 215px
    width: 245px
    background: $color-white-4
    @media(min-width: 300px) and (max-width: 500px)
      position: relative
      height: 100px
      width: 70px
      padding: 0 10px
    img
      width: 100%
      height: auto

  .detail-wrapper
    background-color: $color-white-1
    padding: 8px

    .product-name
      @include body-8-medium
      color: $color-black-1
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      @media (min-width: 300px) and (max-width: 500px)
        font-size: 12px

    .product-color
      @include body-5-normal
      color: $color-gray-5
      margin-top: 3px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      @media (min-width: 300px) and (max-width: 500px)
        font-size: 12px

    .product-size
      @include body-5-normal
      color: $color-gray-5
      margin-top: 3px
::v-deep .overlay
    background: $color-grey-70
::v-deep .prod-image
    padding: 20px

</style>
