<template>
  <div class="buy-now-section">
    <ShippingOptions
      v-if="instantShip"
      :normal-ship-price="lowestPrice"
      :instant-ship-price="instantShip"
      @shipping-option-selected="
        (shippingOption) => $emit('shipping-option-selected', shippingOption)
      "
    />
    <AlternativePaymentTitle :product-price="lowestPrice" />
    <!-- Buy Now and Add to Wishlist Button Group -->
    <div>
      <div class="w-100 mt-2">
        <Button
          class="add-to-cart d-sm-none w-100"
          block
          variant="dark"
          @click="$emit('add-to-cart')"
        >
          {{ $t('products.add_to_cart') }}
        </Button>

        <Button
          :id="`popover-wishlist-${product.id}`"
          :tooltip-text="wishList ? wishList.name : ''"
          tabindex="0"
          variant="light"
          class="px-4 d-none d-sm-block border-0 border-radius-left-0 h-46"
          @click="removeFromWishList"
        >
          <template #default>
            <b-img
              v-if="!wishList"
              width="18"
              :src="require('~/assets/img/product/heart-outline.svg')"
            ></b-img>
            <b-img
              v-else
              width="18"
              :src="require('~/assets/img/icons/heart-red.svg')"
            ></b-img>
          </template>
        </Button>
      </div>
    </div>
    <!-- Buy Now and Add to Cart and Add to Wishlist Button Group -->

    <WishListPopover
      v-if="!wishList"
      :product="product"
      :wish-list="wishList"
      :target="`popover-wishlist-${product.id}`"
      @wishlisted="onWishListed"
      @show="wishListShow = true"
      @hidden="wishListShow = false"
    />

    <Button
      class="mt-3 color-gray h-46 d-none d-sm-block"
      block
      variant="dark"
      @click="$emit('add-to-cart')"
    >
      {{ $t('products.add_to_cart') }}
    </Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/common/Button'
import AlternativePaymentTitle from '~/components/product/AlternativePaymentTitle'
import WishListPopover from '~/components/wish-list/Popover.vue'
import ShippingOptions from '~/components/product/ShippingOptions'

export default {
  name: 'BuyNowSection',
  components: {
    Button,
    AlternativePaymentTitle,
    WishListPopover,
    ShippingOptions,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    lowestPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  data() {
    return {
      wishListShow: false,
      wishList:
        this.product.wish_lists && this.product.wish_lists.length > 0
          ? this.product.wish_lists[0]
          : null,
    }
  },
  computed: {
    instantShip(vm) {
      return vm.product?.instant_ship ? vm.product?.instant_ship : null
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
@import '~/assets/css/_typography'

.h-46
  height: 46px

.buy-now-section .color-gray
  color: $color-white-28

.border-radius-left-0
  &.btn
    @media (min-width: 576px)
      border-top-left-radius: 0
      border-bottom-left-radius: 0

.buy-now-section .buy-now
  width: 162px
  border-radius: 20px
  height: 40px
  @media (min-width: 576px)
    border-radius: 4px
    height: 46px
    width: 100%

.border-radius-right-0
  &.btn
    @media (min-width: 576px)
      border-top-right-radius: 0
      border-bottom-right-radius: 0

.ml-sm-66
  @media (min-width: 576px)
    margin-left: 66px

.buy-now-section .add-to-cart
  font-family: $font-family-montserrat
  font-size: $font-size-16
  width: 162px
  border-radius: 20px
  color: $color-white-1
  height: 40px
  margin-top: 0
  @media (min-width: 576px)
    border-radius: 4px
    width: auto
    height: 46px
    color: $color-white-28
</style>
