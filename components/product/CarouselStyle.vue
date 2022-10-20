<template>
  <div class="product-carousel-wrapper pa-0">
    <client-only>
      <Carousel
        v-if="products.length"
        ref="carousel"
        :loop="loop"
        :nav="false"
        :center="true"
        :margin="0"
        :responsive="responsiveAttr"
        :mouse-drag="false"
        :dots="false"
        class="carousel"
        autoWidth
      >
        <template #default>
          <div
            v-for="(product, index) in products"
            :key="`product-carousel-${index}`"
            :class="{ item: true, 'photo-item': variant === 'photo' }"
          >
            <ProductCard v-if="variant === 'detail'" :product="product" />
            <nuxt-link :to="`/shop-by-style/${product.id}`">
              <ProductThumb
                :src="product.image"
                :product="product"
                :width="261"
                :height="445"
              />
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

      <div v-else class="no-text py-5 text-center">
        {{ $t('message.no_products_found') }}
      </div>
    </client-only>
  </div>
</template>
<script>
import ProductCard from '~/components/product/Card.vue'
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  name: 'ProductStyleCarousel',
  components: { ProductCard, ProductThumb },
  props: {
    products: {
      type: [Array, Object],
      default: () => [],
    },
    variant: {
      type: String, // enum: ['detail', 'photo']
      default: 'detail',
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    responsiveAttr() {
      if (this.variant === 'detail') {
        return {
          0: { items: 1, nav: false, center: false },
          700: { items: 2, nav: false, center: false },
          950: { items: 3, nav: false, center: false },
          1150: { items: 4, nav: false, center: false },
          1400: { items: 5, nav: false, center: false },
        }
      } else {
        return {
          0: { items: 1, nav: false, center: false },
          700: { items: 2, nav: false, center: false },
          1150: { items: 3, nav: false, center: false },
          1400: { items: 4, nav: false, center: false },
        }
      }
    },
  },
  watch: {
    products() {
      // Destroy and recreate carousel when products change
      this.$refs.carousel?.destroy()
      this.$nextTick(() => this.$refs.carousel?.create())
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.product-carousel-wrapper
  .no-text
    @include body-4-medium
    color: $color-gray-5
  .owl-stage::v-deep
      width: 100%
  .carousel::v-deep
    width: 100%
    padding: 0
    text-align: center
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center
    >span .owl-nav
      display: block
    .owl-carousel
      .item
        text-align: left
        margin: 0
        max-width: 260px
        padding: 20px
        &.photo-item
          max-width: 261px
          img
            border-radius: 4px
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