<template>
  <div class="title-wrapper pb-2">
    <div class="d-flex align-items-center justify-content-between gap-2">
      <span class="title body-1-medium">{{ formattedProductName }}</span>
      <b-img
        :id="`popover-wishlist-${product.id}`"
        :tooltip-text="wishList ? wishList.name : ''"
        width="18"
        :src="require('~/assets/img/icons/heart-style.svg')"
        class="d-sm-none"
        @click="removeFromWishList"
      >
      </b-img>
    </div>
    <div>
      <span class="last-sale">
        {{ $t('product_page.last_sale') }}&colon;&nbsp; &dollar;{{
          productLastSalePrice | formatPrice
        }}
      </span>
      <span v-if="lastSalePriceProjectionValue >= 0" class="last-sale-diff">
        &plus;{{
          lastSalePriceProjectionValue | formatPrice
        }}&nbsp;&lpar;&plus;{{
          lastSalePriceProjectionPercentage
        }}&percnt;&rpar;
      </span>
      <span v-else class="body-5-medium text-color-red-3">
        {{ lastSalePriceProjectionValue | formatPrice }}&nbsp;&lpar;{{
          lastSalePriceProjectionPercentage
        }}&percnt;&rpar;
      </span>
    </div>
    <WishListPopover
      v-if="!wishList"
      :product="product"
      :wish-list="wishList"
      :target="`popover-wishlist-${product.id}`"
      @wishlisted="onWishListed"
      @show="wishListShow = true"
      @hidden="wishListShow = false"
    />
    <b-popover
      ref="sharePopover"
      :target="`popover-share-${product.id}`"
      triggers="click"
      placement="bottom"
      container="body"
      custom-class="wishlist-popover"
      delay="200"
      @show="shareShow = true"
      @hidden="shareShow = false"
    >
      <ShareButton
        :url="shareUrl + product.sku"
        :title="product.name"
        :description="product.description"
      />
    </b-popover>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import WishListPopover from '~/components/wish-list/Popover.vue'
import ShareButton from '~/components/common/ShareButton'

export default {
  name: 'ProductBreadcrumb',
  components: { WishListPopover, ShareButton },
  props: {
    productName: {
      type: String,
      required: true,
    },
    lowestPrice: {
      type: Number,
      default: 0,
    },
    productLastSalePrice: {
      type: Number,
      required: true,
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      wishListShow: false,
      shareShow: false,
      shareUrl: process.env.APP_URL + '/shop/',
      wishList:
        this.product.wish_lists && this.product.wish_lists.length > 0
          ? this.product.wish_lists[0]
          : null,
    }
  },
  computed: {
    formattedProductName(vm) {
      return vm.productName.substr(0, 32)
    },
    lastSalePriceProjectionValue(vm) {
      if (vm.productLastSalePrice === 0) {
        return 0.0
      }

      return vm.lowestPrice - vm.productLastSalePrice
    },
    lastSalePriceProjectionPercentage(vm) {
      if (vm.productLastSalePrice === 0) {
        return 0.0
      }

      return (
        ((vm.lowestPrice - vm.productLastSalePrice) / vm.productLastSalePrice) *
        100
      ).toFixed(2)
    },
  },
  methods: {
    ...mapActions({
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
    }),
    removeFromWishList() {
      if (this.wishList) {
        this.removeProductsFromWishList({
          wishList: this.wishList,
          ids: [this.product.id],
        })
        this.wishList = null
        this.$emit('unwishlisted', this.product)
      }
    },
    onWishListed(wishList) {
      if (wishList) {
        this.$set(this, 'wishList', wishList)
        this.wishListShow = false
        this.$emit('wishlisted', this.product, wishList)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.title
  @include body-12-medium
  color: $color-black-1
  @media (min-width: 576px)
    @include body-1-medium

.title-wrapper
  @media (min-width: 576px)
    border-bottom: 1px solid $color-gray-16f

.text-color-green-24
  color: $color-green-26

.text-color-red-3
  color: $color-red-3

.text-color-grey-6
  color: $color-gray-6

.last-sale
  @include body-5-normal
  color: $color-gray-6
  @media (min-width: 576px)
    @include body-5-medium

.last-sale-diff
  @include body-9-normal
  color: $color-green-26
  @media (min-width: 576px)
    @include body-5-medium
</style>
