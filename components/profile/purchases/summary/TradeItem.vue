<template>
  <div class="trade-item-wrapper">
    <!-- TODO: Simplify design -->
    <div class="your-thier-cont">
      <div class="pt-4 pl-3">
        <div class="float-left">
          <span class="value-text">{{ $t('vendor_purchase.their_value') }}&colon; </span><span class="value-text-bold">{{
            getTheirTotal(true)
          }}</span>
        </div>
        <div class="float-right mr-5">
          <span  class="value-text">{{ $t('vendor_purchase.your_value') }}&colon;  </span> <span class="value-text-bold">{{
            getYourTotal(true)
          }}</span>
        </div>
      </div>

    </div>
    <div class="row px-5">
      <!-- Col1- 2 item -->
      <div class="col-md-2 m-auto">
        <template v-if="tradeListingArray.slice(0, 2).length">
          <div
            v-for="(items, index) in tradeListingArray.slice(0, 2)"
            :key="index"
            class="my-col-products-items-web"
          >
            <div class="thumb-products-similar-web text-center mt-2">
              <div  class="position-relative">
                <img
                  :src="items.inventory.product | getProductImageUrl"
                  class="product-similar-img-web trades-img-prdcts"
                  alt="product-image"
                  @error="imageLoadError"
                />
                <div class="overlay"></div>
              </div>

              <div class="item-caption">
                <span class="item-name"> {{ items.inventory.product.name }} </span>
                <div class="mt-1 item-caption-description d-flex">
                  <div class="item-color text-truncate">
                    {{
                      items.inventory.product.colorway
                        ? items.inventory.product.colorway
                        : ''
                    }}
                  </div>
                  <div>, {{ $t('trades.trade_arena.size') }} {{
                      items.inventory.size.size
                        ? items.inventory.size.size
                        : ''
                    }}</div>
                </div>
                <span class="mt-1 item-caption-description d-flex">
                       {{
                    $t('trades.trade_arena.box')
                  }}&colon;
                        {{
                    items.inventory.packaging_condition.name
                      ? items.inventory.packaging_condition.name
                      : ''
                  }}
                      </span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- ./Col1 Ends -->
      <!-- Col2 - 1 item -->
      <div class="col-md-2 m-auto">
        <div class="border-left-box" v-if="tradeListingArray.length > 1">
          <template v-if="tradeListingArray.slice(2, 3).length">
            <div
              v-for="(items, index) in tradeListingArray.slice(2, 3)"
              :key="index"
              class="my-col-products-items-web"
            >
              <div class="thumb-products-similar-web text-center mt-2">
                <div  class="position-relative">
                  <img
                    :src="items.inventory.product | getProductImageUrl"
                    class="product-similar-img-web trades-img-prdcts"
                    alt="product-image"
                    @error="imageLoadError"
                  />
                  <div class="overlay"></div>
                </div>
                <div class="item-caption">
                  <span class="item-name"> {{ items.inventory.product.name }} </span>
                  <div class="mt-1 item-caption-description d-flex">
                    <div class="item-color text-truncate">
                      {{
                        items.inventory.product.colorway
                          ? items.inventory.product.colorway
                          : ''
                      }}
                    </div>
                    <div>, {{ $t('trades.trade_arena.size') }} {{
                        items.inventory.size.size
                          ? items.inventory.size.size
                          : ''
                      }}</div>
                  </div>
                  <span class="mt-1 item-caption-description d-flex">
                       {{
                      $t('trades.trade_arena.box')
                    }}&colon;
                        {{
                      items.inventory.packaging_condition.name
                        ? items.inventory.packaging_condition.name
                        : ''
                    }}
                      </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- Col2 ends -->
      <div class="col-md-3 m-auto text-center">
        <div class="trade-outline-wrapper">
          <div class="left-bdr"></div>
          <img class="img-trd" :src="require('~/assets/img/trd.svg')" alt="" />
          <div class="right-bdr"></div>
        </div>
      </div>
      <!-- Col4-1 item -->
      <div class="col-md-2 m-auto">
        <div class="border-right-box" v-if="tradeListingArray.length > 1">
          <template v-if="wantedListingArray.slice(2, 3).length">
            <div
              v-for="(items, index) in wantedListingArray.slice(2, 3)"
              :key="index"
              class="my-col-products-items-web"
            >
              <div class="thumb-products-similar-web text-center mt-2">
                <div  class="position-relative">
                  <img
                    :src="items.inventory.product | getProductImageUrl"
                    class="product-similar-img-web trades-img-prdcts"
                    alt="product-image"
                    @error="imageLoadError"
                  />
                  <div class="overlay"></div>
                </div>
                <div class="item-caption">
                  <span class="item-name"> {{ items.inventory.product.name }} </span>
                  <div class="mt-1 item-caption-description d-flex">
                    <div class="item-color text-truncate">
                      {{
                        items.inventory.product.colorway
                          ? items.inventory.product.colorway
                          : ''
                      }}
                    </div>
                    <div>, {{ $t('trades.trade_arena.size') }} {{
                        items.inventory.size.size
                          ? items.inventory.size.size
                          : ''
                      }}</div>
                  </div>
                  <span class="mt-1 item-caption-description d-flex">
                       {{
                      $t('trades.trade_arena.box')
                    }}&colon;
                        {{
                      items.inventory.packaging_condition.name
                        ? items.inventory.packaging_condition.name
                        : ''
                    }}
                      </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- ./col4 ends -->
      <!-- Col5-2 item -->
      <div class="col-md-2 m-auto">
        <template v-if="wantedListingArray.slice(0, 2).length">
          <div
            v-for="(items, index) in wantedListingArray.slice(0, 2)"
            :key="index"
            class="my-col-products-items-web"
          >
            <div class="thumb-products-similar-web text-center mt-2">
              <div  class="position-relative">
                <img
                  :src="items.inventory.product | getProductImageUrl"
                  class="product-similar-img-web trades-img-prdcts"
                  alt="product-image"
                  @error="imageLoadError"
                />
                <div class="overlay"></div>
              </div>
              <div class="item-caption">
                <span class="item-name"> {{ items.inventory.product.name }} </span>
                <div class="mt-1 item-caption-description d-flex">
                  <div class="item-color text-truncate">
                    {{
                      items.inventory.product.colorway
                        ? items.inventory.product.colorway
                        : ''
                    }}
                  </div>
                  <div>, {{ $t('trades.trade_arena.size') }} {{
                      items.inventory.size.size
                        ? items.inventory.size.size
                        : ''
                    }}</div>
                </div>
                <span class="mt-1 item-caption-description d-flex">
                       {{
                    $t('trades.trade_arena.box')
                  }}&colon;
                        {{
                    items.inventory.packaging_condition.name
                      ? items.inventory.packaging_condition.name
                      : ''
                  }}
                      </span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- ./Col5 ends -->
    </div>
    <div class="d-flex justify-content-center align-items-center mt-4">
      <div class="fair-trade-division-mobile">
        <Meter :highest="getTheirTotal(false)"
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
      if (order.type === 'trade') {
        this.wantedListingArray = order.accepted_offer_your.theirs_items
        this.tradeListingArray =  order.accepted_offer_your.yours_items
        this.status = order.trade.condition_translation
      }
    },
    getTheirTotal(formattedPrice = true){
      let optionalCash = 0
      if(this.orderDetails.accepted_offer_their.cash_added && this.orderDetails.accepted_offer_your.cash_type === 'added')
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
      if(this.orderDetails.accepted_offer_your.cash_added && this.orderDetails.accepted_offer_your.cash_type === 'added')
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
  margin-top: 20%
  height: 216px
  border-radius: 4px 4px 0px 0px
  display: inline-block
  margin-left: 10px
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
.border-left-box
  height: 360px
  border: 1px solid $white-2
  border-left: none
.border-right-box
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
.your-thier-cont
  width: 797px
  height: 61px
  background: $color-white-4
  border-radius: 4px
  margin-left: 6.5rem
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
.left-bdr
  margin-top: 23px
  border: 1px solid #C4C4C4
  width: 40px
  margin-left: 2rem
  position: absolute
.right-bdr
  width: 40px
  border: 1px solid #C4C4C4
  margin-left: 9rem
  margin-top: -21px
.img-trd
  position: relative
.fair-trade-division-mobile
  background-color: $color-white-4
  width: 247px
  height: 68px
</style>
