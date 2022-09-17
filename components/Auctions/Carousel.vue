<template>
  <div class="auction-carousel-wrapper">
    <client-only>
      <Carousel
        v-if="products.length"
        :loop="true"
        :nav="false"
        :center="true"
        :margin="0"
        :responsive="{
          0: { items: 1, nav: false, center: true },
          700: { items: 2, nav: false, center: false },
          950: { items: 3, nav: false, center: true },
          1150: { items: 4, nav: false, center: false },
          1400: { items: 5, nav: false, center: true },
        }"
        :mouse-drag="false"
        :dots="false"
        class="carousel"
      >
        <template #default>
          <div
            v-for="(product, index) in products"
            :key="`auction-carousel-${index}`"
            class="item"
          >
            <nuxt-link to="#">
              <AuctionCard :product="product" />
            </nuxt-link>
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

      <div v-else class="no-text py-5">
        {{ $t('message.no_products_found') }}
      </div>
    </client-only>
  </div>
</template>
<script>
import AuctionCard from '~/components/Auctions/Card.vue'

export default {
  name: 'AuctionCarousel',

  components: { AuctionCard },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.auction-carousel-wrapper
  padding: 0
  text-align: left

  .no-text
    @include body-4-medium
    text-align: center
    color: $color-gray-5

  .carousel::v-deep
    width: 100%
    padding: 0 48px
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center

    >span .owl-nav
      display: block

    .owl-carousel
      .item
        margin: 0
        width: 213px
        margin-left: auto
        margin-right: auto

    .owl-nav
      width: auto
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        margin-right: -47px !important

      &.owl-prev
        float: left
        margin-left: -47px !important
</style>
