<template>
    <div class="banner-wrapper">
    </div>
  </template>
  <script>
  
  export default {
    name: 'HomeBanner',
    }
  </script>
  
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'
  
  .banner-wrapper
    background-image: url('~/assets/img/bug-bounty/bounty-banner.png')
    width: 100%
    height: 443px
    background-color: purple
    background-position: center
    background-size: cover
    background-repeat: no-repeat
  
    @media (max-width: 552px)
      padding: 40px 35px
  
    h1
      @include heading-5
      color: $color-white-1
      font-weight: $medium
      line-height: 120%
  
    p
      @include body-1-regular
      color: $color-white-1
  </style>
  