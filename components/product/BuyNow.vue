<template>
  <b-row>
    <b-col md="12" class="px-0">
      <ShippingOptions
        v-if="instantShip"
        :normal-ship-price="lowestPrice"
        :instant-ship-price="instantShip"
        @shipping-option-selected="(shippingOption) => $emit('shipping-option-selected', shippingOption)"
      />

      <AlternativePaymentTitle :product-price="lowestPrice" class="mt-3" />

      <!-- Buy Now and Add to Wishlist Button Group -->
      <b-row class="mt-3">
        <b-col md="12" class="d-flex justify-content-between justify-content-sm-start">
          <Button
            class="border-radius-right-0 buy-now"
            variant="dark-blue"
            block
            @click="$emit('buy-now')"
          >
            <span class="ml-sm-66"> 
              {{ $t('products.buy_now') }}
            </span>
          </Button>

          <Button class="color-gray add-to-cart d-sm-none" block variant="dark" @click="$emit('add-to-cart')">
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
              <b-img v-if="!wishList" width="18" :src="require('~/assets/img/product/heart-outline.svg')"></b-img>
              <b-img v-else width="18" :src="require('~/assets/img/icons/heart-red.svg')"></b-img>
            </template>
          </Button>
        </b-col>
      </b-row>
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

      <Button class="mt-3 color-gray h-46 d-none d-sm-block" block variant="dark" @click="$emit('add-to-cart')">
        {{ $t('products.add_to_cart') }}
      </Button>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/common/Button'
import AlternativePaymentTitle from '~/components/product/AlternativePaymentTitle'
import WishListPopover from '~/components/wish-list/Popover.vue'
import ShippingOptions from '~/components/product/ShippingOptions'

export default {
  name: 'BuyNowSection',
  components: { Button, AlternativePaymentTitle, WishListPopover, ShippingOptions },
  props: {
    product: {
      type: Object,
      required: true,
    },
    lowestPrice: {
      type: Number,
      required: true,
      default: 0.00
    },
  },
  data() {
    return {
      wishListShow: false,
      wishList:
        this.product.wish_lists && this.product.wish_lists.length > 0
          ? this.product.wish_lists[0]
          : null
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
    }
  }
}
</script>

<style lang="sass" scoped>

.h-46 
  height: 46px !important

.color-gray
  color: #E6E6E6 !important

.border-radius-left-0
  border-top-left-radius: 0
  border-bottom-left-radius: 0

.buy-now
  width: 162px !important
  border-radius: 20px
  height: 40px !important
  @media (min-width: 576px)
    border-radius: 4px
    height: 46px !important
    width: 100% !important

.border-radius-right-0
  @media (min-width: 576px)
    border-top-right-radius: 0
    border-bottom-right-radius: 0

.ml-sm-66 
  @media (min-width: 576px)
    margin-left: 66px

.add-to-cart
  width: 162px !important
  border-radius: 20px
  color: #FFF !important
  height: 40px !important
  margin-top: 0 !important
  @media (min-width: 576px)
    border-radius: 4px
    width: auto !important
    height: 46px !important
    color: #e6e6e6 !important

</style>
