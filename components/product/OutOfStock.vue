<template>
 <b-row class="out-of-stock-wrapper">
   <b-col md="12" class="mt-3 mt-md-0">
     <div class="out-of-stock-text text-center body-8-medium">{{ $t('products.error.out_of_stock_place_offer') }}</div>

     <b-row class="mt-3">
       <b-col md="8">
         <b-form-input
           v-model="offerAmount"
           type="number"
           min="0"
           :placeholder="$t('products.enter_offer_amount')"
         />
       </b-col>
       <b-col class="mt-3 mt-sm-0" md="4">
         <Button
           class="px-0"
           variant="dark-blue"
           block
           @click="$emit('offer-duration', offerAmount)"
         >
           {{ $t('products.place_offer') }}
         </Button>
       </b-col>
     </b-row>

     <b-row class="mt-3">
       <b-col md="12" class="d-flex justify-content-between justify-content-sm-start">
         <Button
           class="border-radius-right-0 notify-me"
           variant="dark"
           block
           @click="$emit('notify-me')"
         >
           {{ $t('products.notify_me') }}
         </Button>

         <Button
           :id="`wishlist-popover-${product.id}`"
           :tooltip-text="wishList ? wishList.name : ''"
           tabindex="0"
           variant="light"
           class="px-4 border-0 border-radius-left-0 h-46"
           @click="removeFromWishList"
         >
           <template #default>
             <b-img v-if="!wishList" width="18" :src="require('~/assets/img/product/heart-outline.svg')"></b-img>
             <b-img v-else width="18" :src="require('~/assets/img/icons/heart-red.svg')"></b-img>
           </template>
         </Button>
       </b-col>
     </b-row>

     <WishListPopover
       v-if="!wishList"
       :target="`wishlist-popover-${product.id}`"
       :product="product"
       :wish-list="wishList"
       @wishlisted="onWishListed"
       @show="wishListShow = true"
       @hidden="wishListShow = false"
     />
     <WishListSuccessModal
       ref="successModal"
       :id="`wishlist-success-modal-${product.id}`"
       :productName="product.name"
       :listName="wishListName"
     />
   </b-col>
 </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/common/Button'
import WishListPopover from '~/components/wish-list/WishListPopover'
import WishListSuccessModal from '~/components/modal/WishListSuccessModal'

export default {
  name: 'OutOfStock',
  components: { Button, WishListPopover, WishListSuccessModal },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      wishListName: null,
      wishListShow: false,
      offerAmount: null,
      wishList: this.product.wish_lists && this.product.wish_lists.length > 0
        ? this.product.wish_lists[0]
        : null
    }
  },
  watch: {
    offerAmount(newValue) {
      return '$' + newValue
    }
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

        // show success message
        this.wishListName = wishList.name
        this.$nextTick(() => this.$bvModal.show(`wishlist-success-modal-${this.product.id}`))
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.h-46
  height: 46px

.border-radius-right-0
  &.btn
    @media (min-width: 576px)
      border-top-right-radius: 0
      border-bottom-right-radius: 0

.border-radius-left-0
  &.btn
    @media (min-width: 576px)
      border-top-left-radius: 0
      border-bottom-left-radius: 0

.notify-me
  @media (min-width: 576px)
    border-radius: 4px
    height: 46px
    width: 100%

.out-of-stock-wrapper
  .out-of-stock-text
    padding: 3px 0

  button
    height: 46px

input.form-control
  height: 46px
  background: $white
  border: 1px solid $color-blue-20
</style>
