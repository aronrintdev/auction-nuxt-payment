<template>
  <div
    :id="`product-card-container-${product.id}`"
    class="product-card-wrapper position-relative"
  >
    <div class="badge-slot">
      <slot name="badge"></slot>
    </div>
    <div class="product-image" :style="`--card-height: ${cardHeight}`">
      <ProductThumb :src="product.image" :product="product" />
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
          wishListShow || isShareBtnsVisible ? 'show-actions' : ''
        }`"
      >
        <div class="action-item btn-wishlist">
          <Icon
            :id="`popover-wishlist-${product.id}`"
            src="heart2.svg"
            hover-src="heart2.svg"
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
    <div class="mt-2 row">
      <div :class="[showActionBtn ? 'col-7' : 'col-12']">
        <div class="fs-15 fw-6 font-secondary product-title text-truncate">
          {{ getTruncateName }}
        </div>
        <div
          class="fs-14 fw-5 font-secondary text-gray-light text-truncate product-title-2"
        >
          {{ getRemainingName }}
        </div>
        <div v-if="showSize" class="fs-15 fw-6 font-secondary product-price">
          {{ $t('home_page.size') }}
          {{ product.inventory ? product.inventory[0].size.size : '' }}
        </div>
        <div v-if="showPrice" class="fs-15 fw-6 font-secondary product-price">
          {{ product.sale_price | toRoundedCurrency }}
        </div>
        <div
          v-if="showPriceAndSize"
          class="fs-15 fw-6 font-secondary product-price"
        >
          {{ product.sale_price | toCurrency }}
          <span class="fw-5 text-black-50">
            ( {{ $t('home_page.size') }}
            {{ product.inventory ? product.inventory[0].size.size : '' }})
          </span>
        </div>
      </div>
      <div
        class="col-5 align-items-end justify-content-end action-btn-slot pl-0 pl-1"
        :class="[showActionBtn ? 'col-5 d-flex ' : 'd-none']"
      >
        <slot name="action"> </slot>
      </div>
    </div>

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
      @show="isShareBtnsVisible = true"
      @hidden="isShareBtnsVisible = false"
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
    showActionBtn: {
      type: Boolean,
      default: false,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    showSize: {
      type: Boolean,
      default: false,
    },
    showPriceAndSize: {
      type: Boolean,
      default: false,
    },
    pageName: {
      type: String,
      default: 'shop',
    },
    cardHeight: {
      type: String,
      default: '312px',
    },
    showShareBtns: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      wishListShow: true,
      shareUrl: process.env.APP_URL + '/shop/',
      wishList:
        this.product.wish_lists && this.product.wish_lists.length > 0
          ? this.product.wish_lists[0]
          : null,
    }
  },
  computed: {
    getTruncateName() {
      const name = this.product?.name.split(' ').slice(0, 3).join(' ')
      return name
    },
    getRemainingName() {
      const name = this.product?.name
        .split(' ')
        .slice(3, this.product.name.length)
        .join(' ')
      return name
    },
    isShareBtnsVisible(){
      return this.showShareBtns
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
      if (this.pageName === 'trades') {
        this.$router.push(`/${this.pageName}/${this.product.id}`)
      } else {
        this.$router.push(`/${this.pageName}/${this.product.sku}`)
      }
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
  max-width: initial
  text-align: left
  background-color: $color-white-1
  .badge-slot
    position: absolute
    top: 20px
    left: 20px
    z-index: 9
    width: calc(100% - 40px)
    @media (max-width: 576px)
      top: 10px
      left: 10px
      width: calc(100% - 20px)
  &:hover
    .product-image
      .overlay
        background: rgb(98,98,98,0.1)
      .product-actions
        display: flex
  .product-image
    position: relative
    height: var(--card-height)
    aspect-ratio: 1
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
  .action-btn-slot button
    img.btnIcon
      width: 20px
  @media (max-width: 500px)
    .product-image
      height: 185px
      width: 164px
    .action-btn-slot button
      font-size: 10px
      img.btnIcon
        width: 12px
    .product-title
      font-size: 13px
      font-weight: 600
    .product-title-2
      font-size: 13px
      font-weight: 400
      color:$color-gray-5
    .product-price
      font-size: 12px
      font-weight: 600
</style>