<template>
  <section class="shop-hero-banner position-relative">
    <div class="searchbar d-block d-sm-none">
      <SearchAndFilter @apply="apply" />
    </div>
    <h1
      class="font-primary fw-7 fs-40 text-white banner-heading position-absolute text-capitalize d-none d-sm-block"
    >
      {{ $t('banner.shop_with') }} <br />
      {{ $t('banner.deadstock') }}
    </h1>
  </section>
</template>
<script>
import SearchAndFilter from '~/components/shop/SearchAndFilter'
export default {
  name: 'ShopBanner',
  components: {
    SearchAndFilter,
  },
  methods: {
    apply() {
      this.$emit('apply')
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.shop-hero-banner
  background-image: url('~assets/img/shop/banner.jpg')
  background-repeat: no-repeat
  background-size: cover
  min-height: 440px
  @media (max-width: 450px)
    background-image: url('~assets/img/shop/banner-sm.png')
    min-height: 208px
  @media (min-width: 1441px )
    min-height: 600px
    .banner-heading
      bottom: 160px
  .banner-heading
    bottom: 120px
    left: 90px
</style>
