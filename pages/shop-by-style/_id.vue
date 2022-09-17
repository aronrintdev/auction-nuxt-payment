<template>
  <b-overlay
    :show="loading"
    rounded="sm"
    class="container-style-detail mx-auto"
  >
    <b-row v-if="style">
      <b-col lg="6">
        <div class="text-right share-wrapper">
          <Button
            variant="white"
            icon="share.svg"
            icon-only
            pill
            class="mr-3"
          />
          <Button
            :id="`popover-wishlist-${style.id}`"
            variant="white"
            :icon="wishList ? `heart-red.svg` : 'heart2.svg'"
            icon-only
            tabindex="0"
            :tooltip-text="wishList ? wishList.name : ''"
            pill
            @click="removeFromWishList"
          >
          </Button>
        </div>
        <ShopByStyleImageCarousel :images="style.images" class="mt-4" />
        <b-col sm="6" offset="3">
          <Button
            variant="outline-dark-blue"
            block
            black-text
            border="thick"
            class="mt-5"
            @click="handleStyleAddToCart"
          >
            {{ $t('shop_by_style.general.add_to_bag', {
              type: style_type
            }) }}
          </Button>
        </b-col>
      </b-col>
      <b-col lg="6" class="product-list">
        <ShopByStyleProductCard
          v-for="product in style.products"
          :key="`product-${product.id}`"
          :product="product"
        />
      </b-col>
    </b-row>
  </b-overlay>
</template>
<script>
import { Button } from '~/components/common'
import ShopByStyleImageCarousel from '~/components/shop-by-style/ImageCarousel'
import ShopByStyleProductCard from '~/components/shop-by-style/ProductCard'

export default {
  components: { Button, ShopByStyleImageCarousel, ShopByStyleProductCard },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      style_type: 'Look',
      style: null,
      loading: true,
    }
  },

  fetch() {
    const { id } = this.$route.params
    this.$axios
      .get('/shop-by-style/'+id)
      .then((res) => {
        this.style = {
          id,
          images: res.data.data.images,
          products: res.data.data.products
        }
      })
      .catch(error => {
        this.$toasted.error(error)
      })
    this.loading = false
  },
  methods: {
    handleStyleAddToCart() {
      this.addingToCart = true
    },
  }
}
</script>
<style lang="sass" scoped>
.container-style-detail
  max-width: 1440px
  padding: 30px 47px
  min-height: 925px

  .share-wrapper
    padding-right: 79px

  .product-list
    padding: 64px 0 0 89px

    > div
      margin-bottom: 62px

@media (max-width: 992px)
  .container-style-detail
    .product-list
      padding: 64px 0 0 0
</style>
