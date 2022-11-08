<template>
  <div class="trade-card-wrapper" v-if="width > 500">
    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class=" d-flex mt-2 ml-1 pt-2">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/clock.svg')" />
        </div>
        <div class="text-created">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="product" role="button"/>
    </div>
    <div class="detail-wrapper">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-color">{{ product.colorway }}</div>
      <div class="product-size">{{ product.size }}</div>
      <div class=" d-flex justify-content-end align-content-end mt-1 ml-5">
        <img class="trade-btn" :src="require('~/assets/img/tradebtn.svg')" />
      </div>
    </div>
  </div>
  <div class="trade-card-wrapper" v-else>
    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <Button variant="outline-danger" class="btn-expire" block
        >{{$t('common.expires')}} {{prettifyExpiryDate(trade.created_at)}}</Button
      >
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="product" role="button"/>
    </div>
    <div class="detail-wrapper">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-color">{{ product.colorway }}</div>
      <div class="product-size">{{ product.size }}</div>
    </div>

  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import Button from '~/components/common/Button.vue'
import { tradeRemainingTime } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'

export default {
  name: 'BrowseItemCard',

  components: { ProductThumb, Button },

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


.trade-card-wrapper
  background: $color-white-1
  position: relative
  border: 1px solid $light-gray-2

  .expire-wrapper
    padding: 0 19px
    padding-top: 14px

    .btn-expire
      @include body-4-normal
      border: 1px solid $color-gray-23 !important
      padding: 0

  .product-image
    position: relative
    height: 215px
    width: 245px
    padding: 0 20px
    @media(min-width: 300px) and (max-width: 500px)
      position: relative
      height: 100px
      width: 70px
      padding: 0 10px
    img
      width: 100%
      height: auto

  .detail-wrapper
    background-color: $color-gray-1
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
      margin-top: 7px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      @media (min-width: 300px) and (max-width: 500px)
        font-size: 12px

    .product-size
      @include body-5-normal
      color: $color-gray-5
      margin-top: 3px
</style>
