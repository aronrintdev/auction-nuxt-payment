<template>
  <b-container fluid class="p-3 bg-white">
    <div class="pl-5 pt-4">
      <div class="trade-hub-heading">
        {{$t('trades.trade_hub.best_matches')}}
        <div class="trade-hub-heading-bar"></div>
      </div>
      <div class="trade-hub-sub-heading">
        {{$t('trades.trade_hub.based_on_what_want')}}
      </div>
    </div>
    <div class="trade-hub-carousel-wrapper">
    <client-only v-if="getBestMatches.length">
      <Carousel
        :loop="true"
        :nav="false"
        :center="true"
        :margin="10"
        :responsive="{
          0: { items: 1, nav: false, center: true },
          700: { items: 1, nav: false, center: true },
          950: { items: 1, nav: false, center: true },
          1150: { items: 1, nav: false, center: true },
          1400: { items: 1, nav: false, center: true },
        }"
        :mouse-drag="false"
        :dots="false"
        class="trade-hub-carousal"
      >
          <template #default>
            <div
              v-for="(trade, index) in getBestMatches"
              :key="`trade-carousel-${index}`"
            >
              <TradeHubCard :trade="trade"/>
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
    <div v-if="!getBestMatches.length" class="d-flex justify-content-center h-30 align-items-center">
      {{$t('trades.trade_hub.no_best_matches_found')}}
    </div>
    </div>
    <div class="pl-5 pt-4">
      <div class="trade-hub-heading">
        {{$t('trades.trade_hub.interested_in_your_listing')}}
        <div class="trade-hub-heading-bar"></div>
      </div>
      <div class="trade-hub-sub-heading">
        {{$t('trades.trade_hub.based_on_what_listed')}}
      </div>
    </div>
    <div v-if="getInterestedListings.length" class="container mt-5">
      <TradeCardSideBySideItems :tradesListings="getInterestedListings"  />
    </div>
    <div v-else class="container">
      <p class="d-flex justify-content-center h-30 align-items-center">{{$t('trades.trade_hub.no_interested_listing_found')}}</p>
    </div>
    <!-- TODO after custom queries are converted to laravel eloquent query -->
    <!-- <b-row v-if="false" class="justify-content-center">
      <span class="pointer">{{$t('trades.trade_hub.view_more')}} <b-icon class="ml-3" icon="chevron-down" aria-hidden="true"></b-icon>
      </span>
    </b-row> -->
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TradeHubCard from '~/pages/trades/TradeHubCard';
import TradeCardSideBySideItems from '~/pages/trades/TradeCardSideBySideItems';
export default {
  name: 'TradeHub',
  components: {TradeHubCard, TradeCardSideBySideItems},
  layout: 'IndexLayout',
  data(){
    return {
    }
  },
  computed: {
    ...mapGetters('trade', [
      'getBestMatches', // get best matches for vendor
      'getInterestedListings', // get interested in vendor listings
      ]),
  },
  mounted() {
    // Get trade hub listings
    this.fetchTradeHubListings()
  },
  methods:{
    ...mapActions('trade', ['fetchTradeHubListings']), // get filters from api call by calling action from store
  }

}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.trade-hub-heading
  font-family: $font-family-garamond
  font-style: normal
  font-weight: $bold
  font-size: 40px
  line-height: 40px
  color: $color-black-1
  display: block

.trade-hub-heading-bar
  width: 133px
  border: 3px solid $color-blue-2
  background-color: $color-blue-2
  margin-left: -10px
  margin-top: 5px

.trade-hub-sub-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 21px
  display: flex
  align-items: center
  color: $color-gray-5
  padding-top: 8px

.trade-hub-carousel-wrapper
  padding: 0px

  .trade-hub-carousal::v-deep
      width: 100%
      padding: 0 30px
      position: relative
      margin-left: auto
      margin-right: auto
      display: flex
      align-items: center

.owl-carousel .owl-item img::v-deep
  width: unset

.h-30
  min-height: 200px
</style>
