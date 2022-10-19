<template>
  <div class="product-carousel-wrapper">
    <client-only>
      <Carousel
        v-if="products.length"
        ref="carousel"
        :loop="loop"
        :nav="false"
        :center="true"
        :margin="0"
        :responsive="responsiveAttr"
        :mouse-drag="true"
        :dots="false"
        class="carousel"
      >
        <template #default>
          <slot name="product">
            <div
              v-for="(product, index) in products"
              :key="`product-carousel-${index}`"
              :class="{ item: true, 'photo-item': variant === 'photo' }"
            >
              <div>
                <ProductCard v-if="variant === 'detail'" :product="product" />
              </div>
              <nuxt-link
                v-if="variant === 'photo'"
                :to="`/shop/${product.sku}`"
              >
                <ProductThumb
                  :src="product.image"
                  :product="product"
                  :height="500"
                />
              </nuxt-link>
            </div>
          </slot>
        </template>
      </Carousel>

      <div v-else class="no-text py-5">
        {{ $t('message.no_products_found') }}
      </div>
    </client-only>
  </div>
</template>
<script>
import ProductCard from '~/components/product/Card.vue'
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  name: 'HomeProductCarousel',
  components: { ProductCard, ProductThumb },
  props: {
    products: {
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
          0: { items: 2, nav: false, center: false },
          768: { items: 3, nav: false, center: false },
          950: { items: 4, nav: false, center: false },
        }
      } else {
        return {
          0: { items: 2, nav: false, center: false },
          768: { items: 3, nav: false, center: false },
          950: { items: 4, nav: false, center: false },
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
  padding: 0
  .no-text
    @include body-4-medium
    text-align: center
    color: $color-gray-5
  .carousel::v-deep
    width: 100%
    text-align: center
    position: relative
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center
    [id^='carousel_next_']
      display: none
    [id^='carousel_prev_']
      display: none
    >span .owl-nav
      display: block
    .owl-carousel
      .item
        text-align: left
        margin: 0
        margin-left: 0.5em
        margin-right: 0.5em
        &.photo-item
          img
            border-radius: 5px
            object-fit: contain
            @media (max-width: 500px)
              height: 300px
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
