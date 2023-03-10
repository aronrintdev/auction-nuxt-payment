<template>
  <b-row class="title-wrapper pb-2">
    <b-col md="12">
      <b-row>
        <b-col md="12" class="d-flex align-items-center">
          <span class="title body-1-medium">{{ formattedProductName }}</span>
          <template v-if="showWishlist">
              <b-img
                v-if="!wishList"
                @click="onMobileWishListOpenHandler"
                width="18"
                class="d-sm-none mx-1"
                :src="require('~/assets/img/product/heart-outline.svg')"
              />
              <b-img
                @click="removeFromWishList"
                v-b-tooltip.hover.top="wishList ? wishList.name : ''"
                class="d-sm-none mx-1"
                v-else
                width="18"
                :src="require('~/assets/img/icons/heart-red.svg')"
              />
            <ShareSVG
              :id="`popover-share-${product.id}`"
              class="ml-auto"
              role="button"
            />
            <WishListPopover
              v-if="!wishList"
              :product="product"
              :wish-list="wishList"
              :target="`popover-wishlist-${product.id}`"
              @wishlisted="onWishListed"
              @show="wishListShow = true"
              @hidden="wishListShow = false"
            />
          </template>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" class="mt-1">
          <span class="last-sale">
            {{ $t('product_page.last_sale') }}&colon;&nbsp;
            &dollar;{{ productLastSalePrice | formatPrice }}
          </span>
          <span
            v-if="lastSalePriceProjectionValue >= 0"
            class="last-sale-diff"
          >
            &plus;{{ lastSalePriceProjectionValue | formatPrice }}&nbsp;&lpar;&plus;{{ lastSalePriceProjectionPercentage }}&percnt;&rpar;
          </span>
          <span v-else class="body-5-medium text-color-red-3">
            {{ lastSalePriceProjectionValue | formatPrice }}&nbsp;&lpar;{{ lastSalePriceProjectionPercentage }}&percnt;&rpar;
          </span>
        </b-col>
      </b-row>
    </b-col>

    <b-popover
      v-if="showShare"
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

    <!-- Mobile Wishlist Start -->
    <vue-bottom-sheet
      id="mobileWishlist"
      ref="mobileWishlist"
      max-width="100vw"
      max-height="90vh"
      :rounded="true"
    >
      <WishListMobile
        :product="product"
        @close="closeMobileWishList"
        @create="createNewWishlist"
        @wishlisted="onWishListed"
      />
    </vue-bottom-sheet>
    <!-- Mobile Wishlist End -->

    <!-- Mobile Wishlist Create Start -->
    <vue-bottom-sheet
      class="create-list"
      id="mobileCreateWishlist"
      ref="mobileCreateWishlist"
      max-width="100vw"
      max-height="90vh"
      :rounded="true"
    >
      <CreateWatchListMobile :product="product" @close="closeMobileCreateWishList"  @wishlisted="onWishListed" />
    </vue-bottom-sheet>
    <!-- Mobile Wishlist Create End -->
  </b-row>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import ShareSVG from '~/assets/img/icons/share.svg?inline'
import WishListPopover from '~/components/wish-list/Popover.vue'
import ShareButton from '~/components/common/ShareButton'
import WishListMobile from '~/components/modal/WishListMobile'
import CreateWatchListMobile from '~/components/modal/CreateWatchListMobile'

export default {
  name: 'ProductBreadcrumb',
  components: {CreateWatchListMobile, WishListMobile, ShareSVG, WishListPopover, ShareButton },
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
      default: () => {}
    },
    showWishlist: {
      type: Boolean,
      default: true
    },
    showShare: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      wishListShow: false,
      shareShow: false,
      shareUrl: process.env.APP_URL + '/shop/',
      wishList:
        this.product.wish_lists && this.product.wish_lists.length > 0
          ? this.product.wish_lists[0]
          : null
    }
  },
  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
    formattedProductName(vm) {
      return vm.productName.substr(0, 32)
    },
    lastSalePriceProjectionValue(vm) {
      if (vm.productLastSalePrice === 0) {
        return 0.00
      }

      return vm.lowestPrice - vm.productLastSalePrice
    },
    lastSalePriceProjectionPercentage(vm) {
      if (vm.productLastSalePrice === 0) {
        return 0.00
      }

      return (((vm.lowestPrice - vm.productLastSalePrice) / vm.productLastSalePrice) * 100).toFixed(2)
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
    onMobileWishListOpenHandler() {
      // if wishlist count = 0 open create new form
      if(!this.wishLists.length) {
        this.openMobileCreateWishList()
      } else {
        this.openMobileWishList()
      }
    },
    openMobileWishList() {
      const { mobileWishlist } = this.$refs
      if (mobileWishlist) {
        mobileWishlist.open()
      }
    },
    closeMobileWishList() {
      const { mobileWishlist } = this.$refs
      if (mobileWishlist) {
        mobileWishlist.close()
      }
    },
    openMobileCreateWishList() {
      const { mobileCreateWishlist } = this.$refs
      if (mobileCreateWishlist) {
        mobileCreateWishlist.open()
      }
    },
    closeMobileCreateWishList() {
      const { mobileCreateWishlist } = this.$refs
      if (mobileCreateWishlist) {
        mobileCreateWishlist.close()
      }
    },
    createNewWishlist() {
      this.closeMobileWishList();
      this.openMobileCreateWishList()
    }
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

::v-deep.popover
  width: auto
  padding: 0 15px
  height: 45px
  border: none
  box-shadow: 0 4px 14px $color-gray-23

  .popover-body
    padding: 0

  .arrow::before
    border-bottom-color: $white

  .share-btn-group
    display: flex
    align-items: center
    justify-content: space-around
    height: 45px

    img
      margin-right: 0
      cursor: pointer

      &.link-share-btn
        margin-right: 0

::v-deep.create-list
  .bottom-sheet__content
    overflow-y: hidden

</style>
