<template>
  <Carousel
    ref="carousel"
    :center="true"
    :margin="0"
    :responsive="responsiveAttr"
    loop
    autoplay
    mouse-drag
    nav
    dots
    class="hero-carousel position-relative"
  >
    <div
      v-for="(slide, x) in slider"
      :key="x"
      class="hero-section d-flex align-items-end"
      :style="{
        '--background': `url(${slide.image})`,
        '--background-sm': `url(${slide.imageSm})`,
      }"
    >
      <div class="hero-content container px-md-0">
        <h1 class="fs-32 fw-5 font-secondary text-white hero-heading pre-line">
          <span>{{ slide.heading }}</span>
        </h1>
        <b-button
          variant="outline-light"
          squared
          class="py-2 px-md-5 fs-20 fw-6 font-primary d-flex align-items-center justify-content-center"
        >
          {{ slide.btnLabel }}</b-button
        >
      </div>
    </div>
  </Carousel>
</template>
<script>
export default {
  name: 'HomepageHeroSection',
  data() {
    return {
      slider: [
        {
          image: require('~/assets/img/home/slider/hero_banner.png'),
          imageSm: require('~/assets/img/home/slider/hero_banner-sm.png'),
          heading: this.$t('home_page.hero_heading'),
          btnLabel: this.$t('home_page.shop_now'),
        },
        {
          image: require('~/assets/img/home/slider/hero_banner2.jpg'),
          imageSm: require('~/assets/img/home/slider/hero_banner2-sm.jpg'),
          heading: this.$t('home_page.hero_heading'),
          btnLabel: this.$t('home_page.shop_now'),
        },
        {
          image: require('~/assets/img/home/slider/hero_banner3.jpg'),
          imageSm: require('~/assets/img/home/slider/hero_banner3-sm.jpg'),
          heading: this.$t('home_page.hero_heading'),
          btnLabel: this.$t('home_page.shop_now'),
        },
        {
          image: require('~/assets/img/home/slider/hero_banner4.jpg'),
          imageSm: require('~/assets/img/home/slider/hero_banner4-sm.jpg'),
          heading: this.$t('home_page.hero_heading'),
          btnLabel: this.$t('home_page.shop_now'),
        },
        {
          image: require('~/assets/img/home/slider/hero_banner5.jpg'),
          imageSm: require('~/assets/img/home/slider/hero_banner5-sm.jpg'),
          heading: this.$t('home_page.hero_heading'),
          btnLabel: this.$t('home_page.shop_now'),
        },
        {
          image: require('~/assets/img/home/slider/hero_banner6.jpg'),
          imageSm: require('~/assets/img/home/slider/hero_banner6-sm.jpg'),
          heading: this.$t('home_page.hero_heading'),
          btnLabel: this.$t('home_page.shop_now'),
        },
      ],
    }
  },
  computed: {
    responsiveAttr() {
      return {
        0: { items: 1, nav: false, center: true, dots: false },
        576: { items: 1, nav: false, center: true, dots: true },
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.hero-section
  background-image: var(--background)
  background-repeat: no-repeat
  background-size: cover
  background-blend-mode: darken
  background-color: $color-black-12
  background-position: top center
  height: 600px
  .hero-content
    margin-bottom: 130px
    .hero-heading
      margin-bottom: 22px
      @media (min-width: 576px)
        margin-bottom: 40px
  @media (max-width: 500px)
    background-image: var(--background-sm)
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
::v-deep .owl-dots
  bottom: 32px
  position: absolute
  left: 50%
  transform: translate(-50%, 50%)
</style>
