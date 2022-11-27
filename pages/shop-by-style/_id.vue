<template>
  <b-overlay
    :show="loading"
    rounded="sm"
    class="container-style-detail container"
  >
    <div
      v-if="style"
      class="style-details-wrapper d-flex flex-column flex-sm-row"
    >
      <div class="left-side-details">
        <div
          class="topbar d-none d-sm-flex justify-content-between align-items-center"
        >
          <nuxt-link :to="`/shop-by-style`">
            <p class="backto-css">
              {{ $t('shop_by_style.general.back_to_style') }}
            </p>
          </nuxt-link>

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
        </div>
        <div class="style-image mt-4">
          <ShopByStyleImageCarousel
            v-if="!has360Images"
            :images="style.images"
            :mainImage="true"
          />
          <ProductImageViewerMagic360
            v-if="has360Images"
            :product="style.style"
          />
        </div>
      </div>
      <div class="right-side-details ml-auto">
        <p class="items-counter mb-2">
          {{ style.products.length }} {{ $t('common.items') }}
        </p>
        <div class="d-flex flex-column row-gap-60">
          <ShopByStyleProductCard
            v-for="product in style.products"
            v-show="showStyleProduct ? showStyleProduct : true"
            :key="`product-${product.id}`"
            :product="product"
            @styleProduct="productDetail"
          />
        </div>
      </div>
      <div
        class="d-sm-none style-bag position-fixed d-flex align-items-center justify-content-center"
      >
        <Button
          variant="dark-blue"
          black-text
          border="thick"
          class="d-block w-100 rounded-pill text-white"
          @click="handleStyleAddToCart"
        >
          {{ $t('shop_by_style.general.add_style_to_bag') }}
        </Button>
      </div>
    </div>
    <Portal to="back-icon-slot">
      <nuxt-link :to="`/shop-by-style`">
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          @click="moveBack()"
        />
      </nuxt-link>
    </Portal>
    <Portal to="notification-icon-slot">
      <ShareIcon class="share-icon" />
    </Portal>
  </b-overlay>
</template>
<script>
import { Button } from '~/components/common'
import ShopByStyleImageCarousel from '~/components/shop-by-style/ImageCarousel'
import ShopByStyleProductCard from '~/components/shop-by-style/ProductCard'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import ShareIcon from '~/assets/icons/ShareIcon'
export default {
  components: {
    Button,
    ShopByStyleProductCard,
    ShopByStyleImageCarousel,
    ProductImageViewerMagic360,
    ShareIcon,
  },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      style_type: 'Look',
      style: null,
      loading: true,
      wishList: false,
      showStyleProduct: '',
    }
  },

  fetch() {
    const { id } = this.$route.params
    this.$axios
      .get('/shop-by-style/' + id)
      .then((res) => {
        this.style = {
          id,
          images: res.data.data.images,
          products: res.data.data.products,
          style: res.data.data.style,
        }
      })
      .catch((error) => {
        this.$toasted.error(error)
      })
    this.loading = false
  },
  computed: {
    has360Images() {
      return this.style.style?.has360Images
    },
  },
  methods: {
    handleStyleAddToCart() {
      this.addingToCart = true
    },
    productDetail(value) {
      this.showStyleProduct = value
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.style-details-wrapper
  .left-side-details
    width: 100%
    max-width: 562px
  .right-side-details
    margin-top: 43px
    width: 100%
    max-width: 498px

.row-gap-60
  row-gap: 60px

.style-bag

  background: $color-white-1
  display: flex
  align-items: center
  left: 0
  width: 100%
  bottom: 95px
  padding: 30px 18px 24px 18px
.items-counter
  color: $color-gray-6
.backto-css
  font-weight: $regular
  font-size: 18px
  line-height: 21px
  letter-spacing: -0.02em
  color: $color-gray-6
.container-style-detail
  min-height: 925px
  @media (min-width: 576px)
    margin-top: 27px
  .product-list
    padding: 64px 0 0 89px
    > div
      margin-bottom: 62px

@media (max-width: 992px)
  .container-style-detail
    .product-list
      padding: 64px 0 0 0
@media (max-width: 460px)
  .container-style-detail
    padding: 0 20px
    padding-bottom: 60px
    .product-list
      padding: 26px 0 64px 0
.share-icon::v-deep
  .strokeColor
    stroke: $color-gray-47
  .fillColor
    fill: $color-gray-47
</style>
