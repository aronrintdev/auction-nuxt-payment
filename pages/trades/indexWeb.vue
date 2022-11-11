<template>
  <div class="f-montserrat">
    <BrowseTrade />
  </div>
</template>

<script>
import BrowseTrade from '~/pages/trades/BrowseTrade'
export default {
  name: 'Trade',
  components: {
    // TradeBanner,
    BrowseTrade,
    // TradeHub
  },
  layout: 'IndexLayout',
  data(){
    return {
      navTab: 'browse_trade'
    }
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
