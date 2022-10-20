<template>
  <div class="similar-items-wrapper">
    <h3>{{ $t('products.similar_items') }}</h3>
    <hr>
    <div>
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

.similar-items-wrapper
  h3
    @include body-2-bold
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
  .similar-items-wrapper
    margin-left: -20px
    margin-right: -20px

    .similar-products-carousel::v-deep
      padding: 0
</style>
