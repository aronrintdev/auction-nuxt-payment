<template>
  <div class="hero-section d-flex align-items-end">
    <div class="hero-content container px-3 px-md-0">
      <h1 class="fs-32 fw-6 font-secondary text-white mb-4 mb-md-5 hero-heading">
        {{ $t('home_page.hero_heading') }} <br />
        {{ $t('home_page.hero_heading2') }}
      </h1>
      <b-button
        variant="outline-light" 
        squared
        class="px-3 py-2 px-md-5 fs-20 fw-6 font-primary"
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
    height: 435px
    .hero-content
      margin-bottom: 60px
    h1
      font-size: 20px
    button
      font-size: 15px
</style>
