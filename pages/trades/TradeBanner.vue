<template>
  <b-row class="trade banner-section">
    <b-col md="12" class="position-relative h-100">
      <img :src="require('~/assets/img/trades/trade-banner.png')" class="trade banner-image w-100" />
      <div class="banner-content p-5 position-absolute">
        <h1>{{$t('trades.index.banner_heading')}}</h1>
        <p class="banner-information">{{$t('trades.index.banner_information')}}</p>
        <button class="banner-btn">{{$t('common.learn_more')}}</button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'TradeBanner'
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.banner-section img
  height: 85%

.banner-content
  bottom: 18%
  width: 26.5%
  left: 5%
  height: 65%
  font-family: $font-montserrat
  background-color: $color-white-rgb2
  font-size: 16px
  & h1
    @include heading-5
  & p
    font-weight: $regular
    width: 82%
  & button
    background-color: $color-blue-2
    color: $color-white-1
    font-weight: $medium
    border-radius: 45px
    line-height: 2.5
    width: 45%
    border: none
    position: absolute
    bottom: 8px


</style>
