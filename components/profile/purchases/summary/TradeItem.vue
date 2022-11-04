<template>
  <div class="trade-item-wrapper">
    <!-- TODO: Simplify design -->
    <div class="row px-5">
      <!-- Col1- 2 item -->
      <div class="col-md-2 m-auto">
        <template v-if="tradeListingArray.slice(0, 2).length">
          <div
            v-for="(items, index) in tradeListingArray.slice(0, 2)"
            :key="index"
            class="my-col-products-items border w-100 text-center"
          >
            <div class="thumb-products-similar text-center mt-2">
              <img
                :src="items.inventory.product | getProductImageUrl"
                class="product-similar-img trades-img-prdcts"
                alt="product-image"
                @error="imageLoadError"
              />
              <div class="text-center">
                <div class="blockquote">
                  <p class="products-title-main text-left ml-3">
                    {{ items.inventory.product.name }}
                  </p>
                </div>
                <div class="products-title-subtitle text-left ml-3">
                  <p class="mb-0">
                    {{
                      items.inventory.product.colorway
                        ? items.inventory.product.colorway
                        : ''
                    }}, {{ $t('trades.trade_arena.size') }} {{
                      items.inventory.size.size
                        ? items.inventory.size.size
                        : ''
                    }}
                  </p>
                  <p>
                    <span class="text-dark text-bold"
                      >{{
                      $t('trades.trade_arena.box')
                    }}&colon; </span
                    >{{
                      items.inventory.packaging_condition.name
                        ? items.inventory.packaging_condition.name
                        : ''
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- ./Col1 Ends -->
      <!-- Col2 - 1 item -->
      <div class="col-md-2 m-auto">
        <div class="border-left-box">
          <template v-if="tradeListingArray.slice(2, 3).length">
            <div
              v-for="(items, index) in tradeListingArray.slice(2, 3)"
              :key="index"
              class="my-col-products-items border"
            >
              <div class="thumb-products-similar text-center mt-2">
                <img
                  :src="items.inventory.product | getProductImageUrl"
                  class="product-similar-img trades-img-prdcts"
                  alt="product-image"
                  @error="imageLoadError"
                />
                <div class="text-center">
                  <div class="blockquote">
                    <p class="products-title-main text-left ml-3">
                      {{ items.inventory.product.name }}
                    </p>
                  </div>
                  <div class="products-title-subtitle text-left ml-3">
                    <p class="mb-0">
                      {{
                        items.inventory.product.colorway
                          ? items.inventory.product.colorway
                          : ''
                      }}, {{ $t('trades.trade_arena.size') }} {{
                        items.inventory.size.size
                          ? items.inventory.size.size
                          : ''
                      }}
                    </p>
                    <p>
                      <span class="text-dark text-bold"
                        >{{
                        $t('trades.trade_arena.box')
                      }}&colon; </span
                      >{{
                        items.inventory.packaging_condition.name
                          ? items.inventory.packaging_condition.name
                          : ''
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- Col2 ends -->
      <div class="col-md-3 m-auto text-center">
        <div class="trade-outline-wrapper">
          <img :src="require('~/assets/img/icons/trade-outline.svg')" alt="" />
        </div>
      </div>
      <!-- Col4-1 item -->
      <div class="col-md-2 m-auto">
        <div class="border-right-box">
          <template v-if="wantedListingArray.slice(2, 3).length">
            <div
              v-for="(items, index) in wantedListingArray.slice(2, 3)"
              :key="index"
              class="my-col-products-items border"
            >
              <div class="thumb-products-similar text-center mt-2">
                <img
                  :src="items.inventory.product | getProductImageUrl"
                  class="product-similar-img trades-img-prdcts"
                  alt="product-image"
                  @error="imageLoadError"
                />
                <div class="text-center">
                  <div class="blockquote">
                    <p class="products-title-main text-left ml-3">
                      {{ items.inventory.product.name }}
                    </p>
                  </div>
                  <div class="products-title-subtitle text-left ml-3">
                    <p class="mb-0">
                      {{
                        items.inventory.product.colorway
                          ? items.inventory.product.colorway
                          : ''
                      }}, {{ $t('trades.trade_arena.size') }} {{
                        items.inventory.size.size
                          ? items.inventory.size.size
                          : ''
                      }}
                    </p>
                    <p>
                      <span class="text-dark text-bold"
                        >{{
                        $t('trades.trade_arena.box')
                      }}&colon; </span
                      >{{
                        items.inventory.packaging_condition.name
                          ? items.inventory.packaging_condition.name
                          : ''
                      }}
                    </p>
                  </div>
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
            class="my-col-products-items border w-100 text-center"
          >
            <div class="thumb-products-similar text-center mt-2">
              <img
                :src="items.inventory.product | getProductImageUrl"
                class="product-similar-img trades-img-prdcts"
                alt="product-image"
                @error="imageLoadError"
              />
              <div class="text-center">
                <div class="blockquote">
                  <p class="products-title-main text-left ml-3">
                    {{ items.inventory.product.name }}
                  </p>
                </div>
                <div class="products-title-subtitle text-left ml-3">
                  <p class="mb-0">
                    {{
                      items.inventory.product.colorway
                        ? items.inventory.product.colorway
                        : ''
                    }}, {{ $t('trades.trade_arena.size') }} {{
                      items.inventory.size.size
                        ? items.inventory.size.size
                        : ''
                    }}
                  </p>
                  <p>
                    <span class="text-dark text-bold"
                      >{{
                      $t('trades.trade_arena.box')
                    }}&colon; </span
                    >{{
                      items.inventory.packaging_condition.name
                        ? items.inventory.packaging_condition.name
                        : ''
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- ./Col5 ends -->
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12 text-center slider-container-col">
        <!-- TODO: Slider -->
        <div class="slider-container m-auto">
          <div class="slider-wrapper border">
            <p class="text-bold text-capitalize">{{ $tc(status) }}</p>
            <b-form-input
              id="type-range"
              v-model="sliderVal"
              class="slider rounded-pill"
              type="range"
            ></b-form-input>
          </div>
          <div class="button-wrapper mt-3">
            <b-button variant="yours float-left text-bold"
              >{{ $t('vendor_purchase.yours') }}&colon; {{
                getYourTotal(true)
              }}</b-button
            >
            <b-button variant="theirs float-right text-bold"
              >{{ $t('vendor_purchase.theirs') }}&colon; {{
                getTheirTotal(true)
              }}</b-button
            >
          </div>
        </div>
        <!-- ./TODO: Slider -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeItem',

  props: {
    orderDetails: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  data() {
    return {
      sliderVal: '',
      wantedListingArray: [],
      tradeListingArray: [],
      status: null,
      cashReceived: 0,
    }
  },

  created() {
    this.checkTradeItems(this.orderDetails)
  },

  methods: {

    // Array the items to wanted and trade listing array
    checkTradeItems(order) {
      if (order.type === 'trade') {
        this.wantedListingArray = order.accepted_offer_their.yours_items
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
.pull-right
  float: right
.product-similar-img
  width: 132px
  height: 115px
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
</style>
