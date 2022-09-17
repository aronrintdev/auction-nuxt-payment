<template>
  <section class="shop-banner">
    <img
      class="shop-banner-img"
      :src="require('~/assets/img/shop/banner.jpg')"
    />
    <div class="shop-banner-content">
      <div class="leading" v-html="$t('shop.banner.leading')"></div>
      <div class="subleading mb-5">{{ $t('shop.banner.subleading') }}</div>
      <Button pill>
        {{ $t('shop.banner.learn_more') }}
      </Button>
    </div>
  </section>
</template>
<script>
import Button from '~/components/common/Button'

export default {
  name: 'ShopBanner',

  components: {
    Button,
  },
}
</script>
<style lang="sass" scoped>

.shop-banner
  position: relative

  .shop-banner-img
    height: 440px
    width: 100%
    object-fit: cover

  .shop-banner-content
    position: absolute
    background-color: rgba(255, 255, 255, 0.56)
    top: 50%
    transform: translateY(-50%)
    left: 60px
    max-width: 399px
    width: calc(100% - 120px)
    padding: 24px 40px 30px

    .leading
      font-size: 40px
      font-weight: 700
      line-height: 1.2
      word-break: break-word

    .subleading
      font-size: 16px
      font-weight: 400

@media (max-width: 576px)
.shop-banner
  .shop-banner-content
    left: 30px
    width: calc(100% - 60px)
</style>
