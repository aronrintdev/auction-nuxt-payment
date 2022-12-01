<template>
  <div class="trade-item-wrapper">
    <!-- TODO: Simplify design -->
    <div class="">
      <div class="pt-4 d-flex justify-content-between col-xl-10 mx-auto">
        <div class="">
          <span class="value-text">{{ $t('vendor_purchase.your_value') }}&colon;  </span>
          <span class="value-text-bold">{{ getYourTotal(true) }}</span>
        </div>
        <div class="">
          <span class="value-text"> {{ $t('vendor_purchase.their_value') }}&colon; </span>
          <span class="value-text-bold">{{ getTheirTotal(true) }}</span>
        </div>
      </div>

    </div>
    <div
      class="center-container d-flex mx-0 mx-md-auto justify-content-between align-items-center col-md-8 col-xl-12"
      :class="{
        'center-cont-height': (tradeListingArray.length > 1 || wantedListingArray.length)
      }"
    >
      <div class="left-item">
        <div
          v-for="(item, index) in tradeListingArray"
          :id="tradeListingArray.length === 3 ?'trade-item-'+index : ''"
          :key="item.id"
          class="item"
          :class="[
            ((tradeListingArray.length > 1) || (wantedListingArray.length)) ? 'item-length' : 'item-normal'
          ]"
        >
          <img class="img-fluid" :src="item.inventory.product | getProductImageUrl" />
          <div class="item-caption">
            <span class="item-name">{{ item.inventory.product.name }}</span>
            <div class="mt-1 item-caption-description d-flex">
              <div class="item-color text-truncate">
                {{
                  item.inventory.product.colorway
                    ? item.inventory.product.colorway
                    : ''
                }}
              </div>
              <div>, {{ $t('trades.trade_arena.size') }} {{
                  item.inventory.size.size
                    ? item.inventory.size.size
                    : ''
                }}</div>
            </div>
            <span class="mt-1 item-caption-description d-flex">
                  {{
                $t('trades.trade_arena.box')
              }}&colon;
                    {{
                item.inventory.packaging_condition.name
                  ? item.inventory.packaging_condition.name
                  : ''
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="center-item">
        <div v-if="tradeListingArray.length > 1" class="pointer-left"></div>
        <div class="long-line" :class="{'w-xl-100' : tradeListingArray.length === 1 }"></div>
        <img :src="require('~/assets/img/trades/Trade.svg')" />
        <div class="long-line" :class="{'w-xl-100' : wantedListingArray.length === 1 }"></div>
        <div v-if="wantedListingArray.length > 1" class="pointer-right"></div>
      </div>

      <div class="right-item">
        <div v-if="wantedListingArray.length">
          <div
            v-for="(item, index) in wantedListingArray"
            :id="wantedListingArray.length > 2 ?'your-trade-item-'+index : 'your-item'" :key="item.id"
            class="item-length"
          >
            <img class="img-fluid" :src="item.inventory.product | getProductImageUrl" alt="image" />

            <div class="item-caption">
              <span class="item-name"> {{ item.inventory.product.name }} </span>
              <div class="mt-1 item-caption-description d-flex">
                <div class="item-color text-truncate">
                  {{
                    item.inventory.product.colorway
                      ? item.inventory.product.colorway
                      : ''
                  }}
                </div>
                <div>, {{ $t('trades.trade_arena.size') }} {{
                    item.inventory.size.size
                      ? item.inventory.size.size
                      : ''
                  }}</div>
              </div>
              <span class="mt-1 item-caption-description d-flex">
                  {{
                  $t('trades.trade_arena.box')
                }}&colon;
                    {{
                  item.inventory.packaging_condition.name
                    ? item.inventory.packaging_condition.name
                    : ''
                }}
                  </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center mt-4 mb-4">
        <Meter
          :highest="getTheirTotal(false)"
          :lowest="0"
          :value="getYourTotal(false)"
          :fair="getFairTradeValue()"
          heading="trades.trade_arena.fair_trade_meter"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Meter from '~/components/common/Meter'
import {DEFAULT_FAIR_TRADE_VALUE} from '~/static/constants/trades';
export default {
  name: 'TradeItem',

  props: {
    orderDetails: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  components: {
    Meter,
  },
  data() {
    return {
      sliderVal: '',
      wantedListingArray: [],
      tradeListingArray: [],
      status: null,
      cashReceived: 0,
      fairTradePercentage: (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
    }
  },

  created() {
    this.checkTradeItems(this.orderDetails)
  },

  methods: {

    // Array the items to wanted and trade listing array
    checkTradeItems(order) {
      console.log(order)
      if (order.type === 'trade') {
        this.wantedListingArray = order.accepted_offer_your !== null ? order.accepted_offer_your.theirs_items : []
        this.tradeListingArray =  order.accepted_offer_your !== null ? order.accepted_offer_your.yours_items : []
        this.status = order.trade.condition_translation
      }
    },
    getTheirTotal(formattedPrice = true){
      let optionalCash = 0
      if(this.orderDetails.accepted_offer_their !== null && this.orderDetails.accepted_offer_their.cash_added && this.orderDetails.accepted_offer_your.cash_type === 'added')
      {
        optionalCash = (this.orderDetails.accepted_offer_their.cash_added/100)
        this.cashReceived = optionalCash
      }

      const totalPrice = this.wantedListingArray.map((inventoryItem) => inventoryItem.inventory.sale_price)
      if(totalPrice.length) {
        return (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + parseFloat(optionalCash)).toFixed(2) : totalPrice.reduce((a, b) => a + b, 0) + (optionalCash * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(optionalCash)) : optionalCash * 100
    },
    getYourTotal(formattedPrice = true){
      let optionalCash = 0
      if(this.orderDetails.accepted_offer_your !== null && this.orderDetails.accepted_offer_your.cash_added && this.orderDetails.accepted_offer_your.cash_type === 'added')
      {
          optionalCash = (this.orderDetails.accepted_offer_your.cash_added/100)
      }
      const totalPrice = this.tradeListingArray.map((inventoryItem) => inventoryItem.inventory.sale_price)
      if(totalPrice.length) {
        return (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + parseFloat(optionalCash)).toFixed(2) : totalPrice.reduce((a, b) => a + b, 0) + (optionalCash * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(optionalCash)) : optionalCash * 100
    },
    // Image on load error
    imageLoadError(event) {
      event.target.src = `${this.fallbackImgUrl}${this.productImageWidth}`
    },
    getFairTradeValue(){
      return (this.getTheirTotal(false) * this.fairTradePercentage)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.my-col-products-items
  margin-top: 20%
  height: 270px
  background: $color-white-2
  border-radius: 4px 4px 0px 0px
  display: inline-block
  margin-left: 10px
  width: 200px
.my-col-products-items-web
  height: 216px
  border-radius: 4px 4px 0px 0px
  display: inline-block
  width: 150px
.pull-right
  float: right
.product-similar-img
  width: 132px
  height: 115px
.product-similar-img-web
  width: 141px
.products-title-main
  @include body-9-medium
  font-style: normal
  color: $color-black-1
  margin-top: 27px
.sub-section-products
  width: 171px
  height: 66px
.lowest-ask-products
  @include body-5-normal
  font-style: normal
  color: $color-gray-6
  padding-top: 12px
.lowest-price-products
  font-style: normal
  font-weight: 600
  font-size: 18px
  line-height: 8px
  color: $color-black-1
.products-title-subtitle
  @include body-9-normal
  font-style: normal
  color: $color-gray-5
.blockquote
  margin-bottom: 1rem
  font-size: 1.25rem

.border-right-box, .border-left-box
  @media (min-width: 1200px)
    height: 360px
    border: 1px solid $white-2
    border-right: none

.slider::-webkit-slider-runnable-track
  -webkit-appearance: none
  opacity: 1
  background: -moz-linear-gradient(90deg, $color-red-12 0%, $color-yellow-4 50%, $color-green-12 100%)
  background: -webkit-gradient(90deg, $color-red-12 0%, $color-yellow-4 50%, $color-green-12 100%)
  background: -webkit-linear-gradient(90deg, $color-red-12 0%, $color-yellow-4 50%, $color-green-12 100%)
  background: -o-linear-gradient(90deg, $color-red-12 0%, $color-yellow-4 50%, $color-green-12 100%)
  background: -ms-linear-gradient(90deg, $color-red-12 0%, $color-yellow-4 50%, $color-green-12 100%)
  background: linear-gradient(90deg, $color-red-12 0%, $color-yellow-4 50%, $color-green-12 100%)
  height: 20px

.slider
  -webkit-appearance: none
  width: 100%
  height: 25px
  outline: none
  opacity: 0.7
  -webkit-transition: .2s
  transition: opacity .2s
  -webkit-appearance: none
  -moz-appearance: none
  appearance: none
  &:hover
    opacity: 1
  &::-webkit-slider-thumb
    -webkit-appearance: none
    appearance: none
    width: 25px
    height: 25px
    background: $color-black-1
    cursor: pointer
  &::-moz-range-thumb
    width: 25px
    height: 25px
    cursor: pointer
.slider-container
  width: 25%
.slider-wrapper
  padding: 1rem
  background: #FAFAFA
.btn-yours,.btn-theirs
  border: 1px solid $color-grey-37
  color: $color-grey-37
  &::hover
    background: $color-black-1
    color: $color-grey-37
@media (max-width: 426px)
  .slider-container
    width: 75%
  .slider-container-col
    margin-top: 10px
.item-caption
  font-family: $font-family-sf-pro-display
  font-style: normal
  background: $color-white-1

.item-caption-description
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  @include body-9
  line-height: 14px
  color: $color-gray-5
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.item-box-condition, .item-size
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $normal
  @include body-9
  line-height: 14px
  color: $color-gray-5
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.item-name
  font-family: $font-sp-pro
  font-style: normal
  font-weight: $medium
  @include body-10
  color: $color-black-1
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
.thumb-products-similar
  background: $color-white-4
.overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.value-text
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 15px
  line-height: 18px
  text-transform: uppercase
  color: $color-gray-5
.value-text-bold
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 15px
  color: $color-black-1
.left-bdr, .right-bdr
  @media (min-width: 1200px)
    border: 1px solid $color-gray-23
    width: 100%

.center-container
  @media (min-width: 1200px)
    padding-left: 30px
    padding-right: 30px
  @media (min-width: 1400px)
    padding-left: 127px
    padding-right: 127px

.img-trd
  position: relative
.fair-trade-division-mobile
  background-color: $color-white-4
  width: 247px
  height: 68px

.w-xl-100
  @media (min-width: 1200px)
    width: 100%


#trade-item-0
  @media (min-width: 1200px)
    position: absolute
    margin-left: 110%
    margin-top: 110px

#your-trade-item-0
  @media (min-width: 1200px)
    position: absolute
    margin-top: 110px
    margin-left: -110%
</style>
