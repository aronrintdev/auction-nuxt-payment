<template>
  <div class="hero-section d-flex align-items-end">
    <div class="hero-content container px-md-0">
      <h1
        class="fs-32 fw-5 font-secondary text-white mb-4 mb-md-5 hero-heading pre-line"
      >
        <span>{{ $t('home_page.hero_heading') }}</span>
      </h1>
      <b-button
        variant="outline-light"
        squared
        class="py-2 px-md-5 fs-20 fw-6 font-primary d-flex align-items-center justify-content-center"
      >
        {{ $t('home_page.shop_now') }}</b-button
      >
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.hero-section
  background-image: url('~/assets/img/hero_banner.png')
  background-repeat: no-repeat
  background-size: cover
  background-blend-mode: darken
  background-color: $color-black-12
  background-position: center
  height: 600px
  .hero-content
    margin-bottom: 130px
  @media (max-width: 500px)
    background-image: url('~/assets/img/hero_banner-sm.png')
    background-color: transparent
    height: 435px
    .hero-content
      margin-bottom: 63px
      padding-left: 20px
      padding-right: 20px
    h1
      font-size: 20px
    button
      font-size: 15px
      border-width: 2px
      width: 109px
      padding-left: 0 !important
      padding-right: 0 !important
      height: 40px
</style>
