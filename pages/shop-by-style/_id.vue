<template>
  <b-overlay
    :show="loading"
    rounded="sm"
    class="container-style-detail mx-auto"
  >
    <b-row v-if="style">

      <b-col lg="6">
        <b-row>
          <b-col lg="6">
            <nuxt-link
              :to="`/shop-by-style`">
              <p class="mt-2 backto-css fw-normal">{{ $t('shop_by_style.general.back_to_style') }}</p>
            </nuxt-link>
          </b-col>
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
              >
              </Button>
            </div>

          </b-col>
        </b-row>
        <ShopByStyleImageCarousel v-if="!has360Images" :images="style.images" class="mt-4" />
        <ProductImageViewerMagic360 v-if="has360Images" :product='style.style' class="mt-4" /> 
        <b-col cols="12" class="d-flex justify-content-center">
          <Button
            variant="outline-dark-blue"
            black-text
            border="thick"
            class="mt-5"
            @click="handleStyleAddToCart"
          >
            {{ $t('shop_by_style.general.add_style_to_bag') }}
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
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'

export default {
  components: { Button, ShopByStyleProductCard, ShopByStyleImageCarousel, ProductImageViewerMagic360 },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      style_type: 'Look',
      style: null,
      loading: true,
      wishList: false
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
          products: res.data.data.products,
          style: res.data.data.style
        }
        console.log('360 image data is',this.style.images);
        console.log('360 image data is');
      })
      .catch(error => {
        this.$toasted.error(error)
      })
    this.loading = false
  },
  computed: {
    has360Images() {
      console.log('response data is',this.style);
      return this.style.style?.has360Images
    },
  },
  methods: {
    handleStyleAddToCart() {
      this.addingToCart = true
    },
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'
.backto-css
  font-weight: $regular
  font-size: 18px
  line-height: 21px
  letter-spacing: -0.02em
  color: $color-gray-6
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
