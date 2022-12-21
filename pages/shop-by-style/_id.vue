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
      <div class="left-side-details ml-auto">
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
              :id="`popover-share-${style.id}`"
              variant="white"
              icon="share.svg"
              icon-only
              pill
            />
          </div>
        </div>
        <b-popover
          ref="sharePopover"
          :target="`popover-share-${style.id}`"
          triggers="click"
          placement="bottom"
          container="body"
          custom-class="wishlist-popover w-auto"
          delay="200"
          @show="shareShow = true"
          @hidden="shareShow = false"
        >
          <ShareButton
            :url="shareUrl + style.id"
            :title="style.name"
            :description="style.name"
          />
        </b-popover>

        <div class="style-image mt-4 position-relative">
          <div class="position-absolute add-to-wishlist d-block d-sm-none">
            <HeartIcon :id="`popover-wishlist-${style.id}`" />
          </div>
          <WishListPopover
            v-if="!wishList"
            :product="style"
            :wish-list="wishList"
            :target="`popover-wishlist-${style.id}`"
            @wishlisted="onWishListed"
            @show="wishListShow = true"
            @hidden="wishListShow = false"
          />
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
      <div class="right-side-scroll-wrapper">
        <div class="right-side-details">
          <p class="items-counter mb-2">
            {{ style.products.length }} {{ $t('common.items') }}
          </p>
          <div class="d-none d-sm-flex flex-column row-gap-60">
            <ShopByStyleProductCard
              v-for="product in style.products"
              :key="`product-${product.id}`"
              :product="product"
              @styleProduct="productDetail"
            />
            <button
              class="view-cart-button fs-16 fw-5 font-secondary text-white"
            >
              {{ $t('shop_by_style.general.view_cart') }}
            </button>
          </div>
          <div class="d-block d-sm-none mb-4">
            <ProductCarousel
              v-show="showStyleProduct ? showStyleProduct : true"
              :products="style.products"
              :pageName="pageName"
              itemWidth="164px"
              autoWidth
            >
              <template #product>
                <div
                  v-for="(product, index) in style.products"
                  :key="`product-carousel-${index}`"
                  class="item"
                >
                  <DetailCard
                    :product="product"
                    :showActionBtn="false"
                    :showActions="false"
                    cardHeight="137px"
                    cardHeightSm="180px"
                    cardWidthSm="164px"
                    :showSize="false"
                    :showPrice="true"
                    noRedirect
                  >
                    <template #badge>
                      <div
                        class="d-flex justify-content-end"
                        @click="redirectToDetail(product)"
                      >
                        <PlusCircle />
                      </div>
                    </template>
                  </DetailCard>
                </div>
              </template>
            </ProductCarousel>
          </div>
        </div>
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
    <Portal to="cart-icon-slot">
      <Cart class="cart-icon" />
    </Portal>
  </b-overlay>
</template>
<script>
import { mapActions } from 'vuex'
import { Button } from '~/components/common'
import ShopByStyleImageCarousel from '~/components/shop-by-style/ImageCarousel'
import PlusCircle from '~/assets/icons/PlusCircle'
import ShopByStyleProductCard from '~/components/shop-by-style/ProductCard'
import DetailCard from '~/components/shop-by-style/DetailCard'
import ProductCarousel from '~/components/shop-by-style/ProductCarousel'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import ShareIcon from '~/assets/icons/ShareIcon'
import HeartIcon from '~/assets/icons/HeartIcon'
import Cart from '~/assets/icons/Cart'
import ShareButton from '~/components/common/ShareButton'
import WishListPopover from '~/components/wish-list/Popover'

export default {
  components: {
    Button,
    PlusCircle,
    ShopByStyleImageCarousel,
    ProductImageViewerMagic360,
    ShareIcon,
    HeartIcon,
    ShareButton,
    ShopByStyleProductCard,
    Cart,
    ProductCarousel,
    DetailCard,
    WishListPopover,
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
      shareUrl: process.env.APP_URL + '/shop-by-style/',
      wishListShow: false,
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
    ...mapActions({
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
    }),
    handleStyleAddToCart() {
      this.addingToCart = true
    },
    productDetail(value) {
      this.showStyleProduct = value
    },
    redirectToDetail(product) {
      this.$router.push(`/shop-by-style/${this.style.id}/${product.sku}`)
    },

    removeFromWishList() {
      if (this.wishList) {
        this.removeProductsFromWishList({
          wishList: this.wishList,
          ids: [this.style.id],
        })
        this.wishList = null
        this.$emit('unwishlisted', this.style)
      }
    },
    onWishListed(wishList) {
      if (wishList) {
        this.$set(this, 'wishList', wishList)
        this.wishListShow = false
        this.$emit('wishlisted', this.style, wishList)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.style-details-wrapper
  @media (min-width: 576px)
    max-height: calc(100vh - 130px)
    overflow: hidden
  .left-side-details
    width: 100%
    max-width: 562px
  .right-side-scroll-wrapper
    margin-top: 43px
    width: 100%
    max-width: 520px
    .right-side-details
      @media (min-width: 576px)
        margin: 0 25px
    @media (min-width: 576px)
      max-height: calc(100vh - 130px)
      overflow-y: auto
      overflow-x: hidden
      padding-bottom: 50px
      &::-webkit-scrollbar
        width: 0px
    @media (min-width: 576px)
      margin-top: 40px
      margin-left: 177px

.row-gap-60
  row-gap: 60px

.style-bag
  z-index: 999
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
  font-family: $font-family-sf-pro-display
.container-style-detail
  min-height: 925px
  padding-bottom: 60px
  @media (min-width: 576px)
    margin-top: 30px
    &.container
      @media (max-width: 1440px)
        max-width: 1325px
        margin-left: 60px
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
    .product-list
      padding: 26px 0 64px 0
.share-icon::v-deep
  .strokeColor
    stroke: $color-gray-47
  .fillColor
    fill: $color-gray-47

.add-to-wishlist
  right: 0

.view-cart-button
  width: 309px
  height: 38px
  background-color: $color-blue-20
  border: 0
  margin: 0 auto
::v-deep .Magic360-container
  max-width: 305px !important
</style>
