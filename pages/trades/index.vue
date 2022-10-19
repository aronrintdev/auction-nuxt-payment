<template>
  <div class="f-montserrat">
    <TradeBanner></TradeBanner>
    <div class="main-section pt-5">
      <div class="trade-selections">
        <b-row class="mb-5">
          <b-col md="12" class="text-center">
            <h2 class="page-title">{{$t('trades.index.trades')}}</h2>
          </b-col>
        </b-row>
        <b-row v-if="isVendor()">
          <b-col md="6" class="col-sm-6 col-xs-6 text-right pr-6" :class="{'active-nav' : navTab === 'trade_hub', 'inactive-nav': navTab !== 'trade_hub'}">
            <h3 class="d-inline-block pointer" @click="navTab = 'trade_hub'">{{$t('trades.index.trade_hub')}}</h3>
          </b-col>
          <b-col md="6" class="col-sm-6 col-xs-6 pl-6 text-left " :class="{'active-nav': navTab === 'browse_trade', 'inactive-nav' : navTab !== 'browse_trade'}">
            <h3 class="d-inline-block pointer" @click="navTab = 'browse_trade'">{{$t('trades.index.browse_trades')}}</h3>
          </b-col>
        </b-row>
      </div>
      <TradeHub v-if="navTab === 'trade_hub' && isVendor()"/>
      <BrowseTrade v-if="navTab === 'browse_trade'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TradeBanner from '~/pages/trades/TradeBanner'
import BrowseTrade from '~/pages/trades/BrowseTrade'
import TradeHub from '~/pages/trades/TradeHub'

export default {
  name: 'Trade',
  components: {
    TradeBanner,
    BrowseTrade,
    TradeHub
  },
  layout: 'IndexLayout',
  data(){
    return {
      navTab: 'browse_trade'
    }
  },
  methods: {
    ...mapGetters({
      isVendor: 'auth/isVendor'
    }),
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.main-section
  background: linear-gradient(269.74deg, $color-blue-th-14 -77.58%, $color-gray-th-45 118.1%)
.f-montserrat
  font-family: $font-montserrat

.active-nav
  font-size: 26px
  & h3
    color: $color-black-1
    border-bottom: 3px $color-black-1 solid

.inactive-nav
  font-size: 26px
  h3
    color: $color-gray-4
    &:hover
      color: $color-black-1

.pl-6
  padding-left: 6rem

.pr-6
  padding-right: 6rem

.page-title
  @include heading-5

</style>
