<template>
  <div
    :id="`product-card-container-${product.id}`"
    class="product-card-wrapper"
  >
    <div class="product-image">
      <ProductThumb :product="product" />
      <div class="overlay" @click="goToDetailPage"></div>
      <b-checkbox
        v-if="selectable"
        class="check-box"
        :checked="selected"
        @change="toggleSelect"
      ></b-checkbox>
      <div
        v-if="showActions"
        :class="`product-actions ${
          wishListShow || shareShow ? 'show-actions' : ''
        }`"
      >
        <div class="action-item btn-wishlist">
          <Icon
            :id="`popover-wishlist-${product.id}`"
            src="heart2.svg"
            hover-src="heart-red.svg"
            :active="wishListShow || !!wishList"
            width="15"
            height="15"
            tabindex="0"
            class="action-icon"
            :alt-text="wishList ? wishList.name : ''"
            :tooltip-text="wishList ? wishList.name : ''"
            @click="removeFromWishList"
          />
        </div>
        <div class="action-item btn-share">
          <Icon
            :id="`popover-share-${product.id}`"
            src="share.svg"
            width="15"
            height="15"
          />
        </div>
      </div>
    </div>
    <div class="product-name">{{ product.name }}</div>
    <div class="product-color">{{ product.colorway }}</div>
    <div class="product-price">{{ product.sale_price | toCurrency }}</div>

    <WishListPopover
      v-if="!wishList"
      :product="product"
      :wish-list="wishList"
      :target="`popover-wishlist-${product.id}`"
      @show="wishListShow = true"
      @hidden="wishListShow = false"
      @wishlisted="onWishListed"
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
import _ from 'lodash'
import { mapActions } from 'vuex'
import ProductThumb from '~/components/product/Thumb.vue'
import Icon from '~/components/common/Icon.vue'
import WishListPopover from '~/components/wish-list/Popover.vue'
import ShareButton from '~/components/common/ShareButton'

export default {
  name: 'ProductCard',

  components: {
    ShareButton,
    ProductThumb,
    Icon,
    WishListPopover,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: true,
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

  watch: {
    product(newVal, oldVal) {
      if (newVal.wish_lists !== oldVal.wish_lists) {
        if (newVal.wish_lists && newVal.wish_lists.length > 0) {
          this.wishList = _.cloneDeep(newVal.wish_lists[0])
        } else {
          this.wishList = null
        }
      }
    },
  },

  methods: {
    ...mapActions({
      addProductsToWishList: 'wish-list/addProductsToWishList',
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
    }),

    goToDetailPage() {
      this.$router.push(`/shop/${this.product.sku}`)
    },

    toggleSelect(checked) {
      this.$emit('select', this.product.id, checked)
    },

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

.product-card-wrapper
  max-width: 213px
  margin-left: auto
  margin-right: auto
  text-align: left

  &:hover
    .product-image
      .overlay
        background: rgb(98,98,98,0.1)

      .product-actions
        display: flex

  .product-image
    position: relative
    height: 240px
    padding: 0 20px
    display: flex
    justify-content: center
    align-items: center
    margin-left: auto
    margin-right: auto
    cursor: pointer

    .check-box
      left: 13px
      position: absolute
      top: 9px

    img
      width: 100%
      height: auto
      cursor: pointer

    .overlay
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      background: rgb(153,153,153,0.1)
      transition: .5s ease

    .product-actions
      display: none
      align-items: center
      position: absolute
      bottom: 16px
      background-color: $color-white-1
      border-radius: 20px
      padding: 7px 16px
      width: 162px

      &.show-actions
        display: flex

      .action-item
        padding: 0 22px
        height: 15px

        &:not(:last-child)
          border-right: 1px solid $color-gray-4

      .action-icon::v-deep
        img
          width: 15px
          height: 15px

  .product-name
    @include body-8-medium
    color: $color-black-1
    margin-top: 13px
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
    padding: 0 7px

  .product-color
    @include body-5-normal
    color: $color-gray-5
    margin-top: 3px
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
    padding: 0 7px

  .product-price
    @include body-4-medium
    color: $color-black-1
    margin-top: 7px
    padding: 0 7px
</style>
