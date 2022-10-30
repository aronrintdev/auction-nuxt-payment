<template>
  <div class="similar-items-wrapper">
    <h3 class="gray-border pb-3 px-4">{{ $t('products.similar_items') }}</h3>
    <div class="items">
      <ProductCarousel
        :products="products"
        variant="detail"
        class="similar-products-carousel"
      />
    </div>
  </div>
</template>
<script>
import ProductCarousel from '~/components/product/Carousel.vue'
import {API_PROD_URL} from '~/static/constants/environments'

export default {
  name: 'ProductSimilarItems',

  components: { ProductCarousel },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      API_PROD_URL,
    }
  },

  methods: {},
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.gray-border
  @media (min-width: 576px)
    border-bottom: 0.5px solid $color-gray-23

.similar-items-wrapper
  h3
    font-weight: 600
    font-size: 16px
    color: #000
    @media (min-width: 576px)
      @include body-2-bold
      font-family: $font-family-sf-pro-display
      color: $color-black-1

  .similar-products-carousel::v-deep
    width: 100%
    padding: 40px 50px
    text-align: center
    position: relative
    margin-left: auto
    margin-right: auto

    .owl-nav
      &.owl-next
        margin-right: -60px !important

      &.owl-prev
        margin-left: -60px !important

@media (max-width: 576px)
  .items
    margin-left: -20px
    margin-right: -20px

    .similar-products-carousel::v-deep
      padding: 0
</style>
