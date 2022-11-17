<template>
  <div class="trade-card-wrapper">

    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class="btn-expire d-flex mt-2 ml-1 pt-2" :class="`${selectCounterBG(trade.created_at)}`">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
        </div>
        <div class="text-created">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-row justify-content-center align-items-center mx-auto">
      <ProductThumb :product="inventory.product" role="button" class="mt-2 mb-2"/>
    </div>
    <div class="detail-wrapper">
      <div class="product-name">{{ inventory.product.name }}</div>
      <div class="product-color">{{ inventory.product.colorway }}</div>
      <div class="product-name">{{ inventory.size.size }}</div>
    </div>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import { tradeRemainingTime, isRemainingTimeLessThan12Hours } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'

export default {
  name: 'BrowseItemCard',

  components: { ProductThumb },

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
.trade-card-wrapper
  background: $color-white-4
  position: relative
  margin-left: 3px
  margin-right: 3px
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
.product-image
    position: relative
    padding: 0 10px
    height: 115px

.detail-wrapper
  background-color: $color-white-1
  padding: 8px
  height: 56px

.product-name
  @include body-9
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.product-color
  @include body-18
  color: $color-gray-5
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.product-size
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  @include body-18
  margin-top: 3px
.clock-image
  height: 13px
  width: 13px
.text-created
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px


</style>
