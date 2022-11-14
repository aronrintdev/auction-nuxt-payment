<template>
  <div class="trade-card-wrapper" v-if="width > 500">
    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class="btn-expire d-flex mt-2 ml-1 pt-2">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/clock.svg')" />
        </div>
        <div class="text-created pl-1">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="product" role="button" :overlay="true"/>
    </div>
    <div class="detail-wrapper">
      <div class="d-flex">
        <div class="left-side-cont pr-4">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-color">{{ product.colorway }}</div>
          <div class="product-size">{{ product.size }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="trade-card-wrapper" v-else>
    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class="btn-expire d-flex mt-2 ml-1 pt-2">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/clock.svg')" />
        </div>
        <div class="text-created pl-1">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="product" role="button" :overlay="true"/>
    </div>
    <div class="detail-wrapper">
      <div class="d-flex">
        <div class="left-side-cont pr-4">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-color">{{ product.colorway }}</div>
          <div class="product-size">{{ product.size }}</div>
        </div>
        <div class="">
          <img class="trade-btn" :src="require('~/assets/img/tradebtn.svg')" />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import { tradeRemainingTime } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'

export default {
  name: 'BrowseItemCard',

  components: { ProductThumb },

  props: {
    product: {
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
  mounted() {
    this.width = window.innerWidth
  },
  methods: {
    prettifyExpiryDate(createdAt){
      return tradeRemainingTime(createdAt, TRADE_EXPIRY_DAYS)
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
      background-color: $color-red-24
      color: $color-white-1
      font-weight: $medium
      width: 94px
      height: 31px

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
