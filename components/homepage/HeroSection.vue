<template>
  <div class="hero-section d-flex align-items-end">
    <div class="hero-content container text-center text-sm-left">
      <h1 class="fs-32 fw-6 font-secondary text-white mb-5">
        {{ $t('home_page.hero_heading') }} <br />
        {{ $t('home_page.hero_heading2') }}
      </h1>
      <b-button
        variant="outline-light"
        squared
        class="px-5 fs-20 fw-6 font-primary"
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
</style>
