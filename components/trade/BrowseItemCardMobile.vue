<template>
  <div class="trade-card-wrapper">

    <div v-if="showExpire && trade !== null" class="expire-wrapper">
      <div class="btn-expire d-flex mt-2 ml-1 pt-2">
        <div>
          <img class="clock-image pl-1 pr-1" :src="require('~/assets/img/clock.svg')" />
        </div>
        <div class="text-created">{{prettifyExpiryDate(trade.created_at)}}</div>
      </div>
    </div>
    <div class="product-image d-flex flex-column justify-content-center align-items-center mx-auto">
      <ProductThumb :product="product" role="button" class="mt-2 mb-2"/>
    </div>
    <div class="detail-wrapper">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-color">{{ product.colorway }}</div>
      <div class="d-flex">
       <div class="product-size">{{ product.size ? product.size :'Size 10' }}</div>
        <div class="ml-2">
          <b-btn class="trade-btn">
            <div class="d-flex">
<!--              <div>-->
<!--                <img class="clock-image" :src="require('~/assets/img/tradearrow.svg')" />-->
<!--              </div>-->
              <div>Trade</div>
            </div>
          </b-btn>
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
  methods: {
    prettifyExpiryDate(createdAt){
      return tradeRemainingTime(createdAt, TRADE_EXPIRY_DAYS)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.trade-card-wrapper
  background: #FAFAFA
  position: relative
  border: 1px solid $light-gray-2
  margin-left: 3px
  margin-right: 3px
//.expire-wrapper
//    padding: 0 19px
//    padding-top: 14px
.btn-expire
  width: 95px
  height: 25px
  background-color: #DD5E5E
  color: #FFFFFF
.product-image
    position: relative
    padding: 0 10px

.detail-wrapper
  background-color: #FFFFFF
  padding: 8px

.product-name
  @include body-8-medium
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.product-color
  @include body-5-normal
  color: $color-gray-5
  margin-top: 7px
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap

.product-size
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 600
  font-size: 12px
  margin-top: 3px
.clock-image
  height: 13px
  width: 13px
.text-created
  font-family: 'Montserrat'
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px
.trade-btn
  height: 21px
  width: 62px
  border-radius: 4px
  font-size: 10px
  font-weight: 600

</style>
