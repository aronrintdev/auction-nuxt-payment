<template>
  <div>
    <div v-for="(trade,index) in tradesListings" :key="'listing-' + index" class="row d-flex col-md-12 listing-hub mb-5" role="button" @click="viewTrade(trade.theirs.id)">
      <div class="row col-md-12 text-center trade-id-list">{{$t('trades.trade_hub.trade_id')}} #{{trade.theirs.id}}</div>
      <b-col class="d-block sub-listing-hub">
        <div class="flex col-md-12 text-center mb-2 sub-hub-heading">{{$t('trades.trade_hub.theirs')}}</div>
        <div class="d-flex">
          <div v-for="(item,key) in trade.theirs.offers" :key="'trade-their-' + key" class="item-hub mr-2">
              <div class="image-wrapper">
                <img class="item-image-hub" :src="item.inventory.product | getProductImageUrl" alt="image"/>
              </div>
              <div class="item-caption">
                <span class="item-name-hub d-block">{{item.inventory.product.name}}</span>
                <span class="item-box-condition-hub d-block">{{$t('trades.trade_arena.box_condition')}}: {{item.inventory.packaging_condition.name}}</span>
                <span class="item-caption-description-hub d-block">{{item.inventory.product.colorway}}</span>
                <span class="item-size-hub d-block">{{$t('trades.trade_arena.size')}} {{item.inventory.size.size}}</span>
              </div>
          </div>
        </div>
      </b-col>
      <b-col class="trade-icon-hub">
        <img :src="require('~/assets/img/icons/trade-icon.svg')" >
      </b-col>
      <b-col class="d-block sub-listing-hub">
        <div class="flex col-md-12 text-center mb-2 sub-hub-heading">{{$t('trades.trade_hub.yours')}}</div>
        <div class="d-flex">
          <div v-for="(item,key) in trade.yours.offers" :key="'trade-yours-' + key" class="item-hub mr-2">
            <div class="image-wrapper">
            <img class="item-image-hub" :src="item.inventory.product | getProductImageUrl" alt="image"/>
            </div>
              <div class="item-caption">
                <span class="item-name-hub d-block">{{item.inventory.product.name}}</span>
                <span class="item-box-condition-hub d-block">{{$t('trades.trade_arena.box_condition')}}: {{item.inventory.packaging_condition.name}}</span>
                <span class="item-caption-description-hub d-block">{{item.inventory.product.colorway}}</span>
                <span class="item-size-hub d-block">{{$t('trades.trade_arena.size')}} {{item.inventory.size.size}}</span>
              </div>
          </div>
        </div>
      </b-col>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TradeCardSideBySideItems',
  props: {
    tradesListings: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /**
     * Move vendor to trade offer page
     * @param {number} theirTradeId
     */
    viewTrade(theirTradeId){
      this.$router.push('/trades/' + theirTradeId)
    }
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.item-hub
  width: 140px
  border: 1px solid $color-gray-th-42
  height: 200px

.item-image-hub
  width: 128px
  height: auto

.listing-hub
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-gray-th-43
  border-radius: 10px
  padding: 2% 1%

.sub-listing-hub
  border: 1px solid $color-gray-th-44
  border-radius: 4px
  padding: 1%

.sub-hub-heading
  font-family: $font-family-base
  font-style: normal
  font-weight: $bold
  font-size: 18px
  line-height: 22px
  color: $color-black-1

.mt-60p
  margin-top: 60%

.trade-id-list
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold
  font-size: 18px
  line-height: 21px
  color: $color-blue-1
  justify-content: center
  padding-bottom: 20px

.trade-icon-hub
  display: flex
  justify-content: center
  align-items: center

.item-name-hub
  display: block
  color: $color-black-1
  @include body-10-medium
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden
  width: 125px

.item-box-condition-hub, .item-size-hub, .item-caption-description-hub
  color: $color-gray-5
  @include body-10-normal
  width: 125px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.image-wrapper
  height: 128px

</style>
