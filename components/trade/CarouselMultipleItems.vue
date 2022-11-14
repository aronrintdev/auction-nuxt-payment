<template>
  <div class="trade-carousel-wrapper">
    <client-only>
      <Carousel
        :loop="true"
        :nav="true"
        :center="true"
        :margin="10"
        :responsive="{
          0: { items: 1, nav: false, center: true },
        }"
        :mouse-drag="false"
        :dots="false"
        class="carousel"
      >
        <template #default>
          <div
            v-for="(trade, index) in trades"
            :key="`trade-carousel-${index}`"
            class="browse-trade d-flex justify-content-center align-items-center"
          >
            <nuxt-link :to="'/trades/' + trade.id">
              <div class="btn-expire d-flex">
                <div>
                  <img class="clock-image p-1" :src="require('~/assets/img/black_clock.svg')" />
                </div>
                <div class="text-created pt-1">{{prettifyExpiryDate(trade.created_at)}}</div>
              </div>
              <div class="row d-flex justify-content-center pt-3 pb-2">
                <div v-for="(product, key) in trade.offers" :key="'trade-item-'+key" class="products d-flex justify-content-center mx-5">
                  <BrowseItemCard :product="product.inventory.product" :showExpire="false" class="item" itemCount="two" cardSize="sm-" />
                </div>

              </div>
              <div class="">
                <img class="trade-btn" :src="require('~/assets/img/tradebtn.svg')" />
              </div>
            </nuxt-link>
          </div>
        </template>

        <template #prev>
          <div class="owl-nav owl-prev">
            ddd<img :src="require('~/assets/img/home/arrow-left.svg')" />
          </div>
        </template>

        <template #next>
          <div class="owl-nav owl-next">
            nnnn<img :src="require('~/assets/img/home/arrow-right.svg')" />
          </div>
        </template>
      </Carousel>
    </client-only>
  </div>
</template>
<script>
import BrowseItemCard from '~/components/trade/BrowseItemMultipleCard'
import { tradeRemainingTime } from '~/utils/string'
import { TRADE_EXPIRY_DAYS } from '~/static/constants'

export default {
  name: 'TradeCarouselMultipleItems',

  components: { BrowseItemCard },

  props: {
    trades: {
      type: Array,
      default: () => [],
    },
    timeLimit: {
      type: Number,
      default: TRADE_EXPIRY_DAYS,
    },
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

.trade-carousel-wrapper
  padding: 0
.text-created
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px
.btn-expire
  width: 95px
  height: 25px
  background-color: $dark-gray-8
  color: $color-black-1
  position: relative
  top: 10px
  left: 5px
.clock-image
  height: 20px
  width: 20px
  .carousel::v-deep
    width: 100%
    padding: 0 58px
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    justify-content: center
    align-items: center

    >span .owl-nav
      display: block

    .owl-carousel
      .item
        margin: 0 10px
        width: 204px
        margin-left: auto
        margin-right: auto

    .owl-nav
      width: auto
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        margin-right: -50px !important

      &.owl-prev
        float: left
        margin-left: -50px !important

.browse-trade
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  margin: 2px 2px 2px 2px
  height: 380px

.trade-info
  background: $color-gray-1
  border-radius: 9px 9px 0px 0px
  height: 62px
  align-items: center

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
.products
  width: 213px
.trade-btn
  height: 21px
  width: 100px !important
  float: right
</style>
