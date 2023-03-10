<template>
  <div class="trade-carousel-wrapper">
    <client-only>
      <Carousel
        :loop="true"
        :nav="false"
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
            class="browse-trade"
          >
            <nuxt-link :to="'/trades/' + trade.id">
              <div class="btn-expire d-flex" :class="`${selectCounterBG(trade.created_at)}`">
                <div>
                  <img class="clock-image p-1" :src="require('~/assets/img/'+selectCounterBG(trade.created_at)+'_clock.svg')" height="15" />
                </div>
                <div class="text-created pt-1">{{prettifyExpiryDate(trade.created_at)}}</div>
              </div>
              <div class="row d-flex justify-content-center pt-3 pb-2">
              <div v-for="(product, key) in trade.offers" :key="'trade-item-'+key" class="products d-flex justify-content-center mx-1">
                <BrowseItemCard :inventory="product.inventory" :showExpire="false" class="item" itemCount="two" cardSize="sm-" />
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
            <img :src="require('~/assets/img/home/arrow-left.svg')" />
          </div>
        </template>

        <template #next>
          <div class="owl-nav owl-next">
            <img :src="require('~/assets/img/home/arrow-right.svg')" />
          </div>
        </template>
      </Carousel>
    </client-only>
  </div>
</template>
<script>
import BrowseItemCard from '~/components/trade/BrowseItemCardMultipleMobile.vue'
import { tradeRemainingTime, isRemainingTimeLessThan12Hours } from '~/utils/string'
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
    },
    selectCounterBG(createdAt){
      return isRemainingTimeLessThan12Hours(createdAt, TRADE_EXPIRY_DAYS) ? 'red' : 'gray'
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.trade-carousel-wrapper
  padding: 0

  .carousel::v-deep
    width: 100%
    padding: 0 15px
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center

    >span .owl-nav
      display: block

    .owl-carousel
      .item
        margin: 0 10px
        width: 101px
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
  height: 278px

.trade-info
  background: $color-gray-1
  border-radius: 9px 9px 0px 0px
  height: 62px
  align-items: center

.expire-text
  font-family: $font-montserrat
  font-style: normal
  @include body-4-normal
  display: flex
  align-items: center
  color: $color-red-3

.listing-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-12-bold
  color: $color-black-1

.listing-id-color
  color: $color-blue-1

.text-created
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-18
  line-height: 12px
.btn-expire
  @include body-9
  width: 110px
  height: 25px
  position: relative
  top: 10px
  left: 5px
.gray
  background-color: $dark-gray-8
  color: $color-black-1
.red
  background-color: $color-red-24
  color: $color-white-1
.clock-image
  height: 20px
  width: 20px
.trade-btn
  height: 21px
  width: 100px !important
  float: right
.products
  height: 171px
</style>
