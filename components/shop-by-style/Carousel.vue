<template>
  <div class="product-carousel-wrapper pa-0">
    <client-only>
      <Carousel
        v-if="styles.length"
        ref="carousel"
        :loop="loop"
        :nav="false"
        :center="true"
        :margin="0"
        :responsive="responsiveAttr"
        :mouse-drag="false"
        :dots="false"
        class="carousel text-align-center position-relative mx-auto d-flex align-items-center w-100"
      >
        <template #default>
          <div
            v-for="(style, index) in styles"
            :key="`product-carousel-${index}`"
            :class="{ item: true, 'photo-item': variant === 'photo' }"
          >
            <nuxt-link
              v-if="variant === 'photo'"
              :to="`/shop-by-style/${style.id}`"
            >
              <ProductThumb
                :src="style.image"
                :product="style"
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

    </client-only>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'

export default {
  name: 'ShopProductCarousel',

  components: { ProductThumb },

  props: {
    styles: {
      type: Array,
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
    text-align: center
    color: $color-gray-5

  .carousel::v-deep
    padding: 0 48px

    >span .owl-nav
      display: block

    .owl-carousel
      .item
        text-align: left
        margin: 0
        max-width: 213px
        margin-left: auto
        margin-right: auto

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
