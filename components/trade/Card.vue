<template>
  <div  :class="`${border} ${cardSize}trade-card-wrapper`">
    <div  v-if="itemCount === 'single'" class="expire-wrapper">
      <Button variant="outline-danger" class="btn-expire" block
        >Expires 3d 15h 30m</Button
      >
    </div>
    <div :class="`${cardSize}product-image`">
      <ProductThumb :product="product" />
    </div>
    <div class="detail-wrapper">
      <div class="product-name">{{ product && product.name }}</div>
      <div class="product-color">{{ product && product.colorway }}</div>
      <div class="product-size">XL</div>
    </div>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import Button from '~/components/common/Button.vue'
export default {
  name: 'TradeCard',
  components: { ProductThumb, Button },
  props: {
    product: {
      type: Object,
      required: true,
    },
    itemCount: {
      type: String,
      default: 'single',
    },
    border: {
      type: Boolean,
      default: false,
    },
    borderClass: {
      type: String,
      default: null,
    },
    cardSize: {
      type: String,
      default: null,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.trade-card-wrapper
  background: $color-white-1
  position: relative
  &.border
    border: 1px sold $color-gray-23

  .expire-wrapper
    padding: 0 19px
    padding-top: 14px
    .btn-expire
      @include body-4-normal
      border: 1px solid $color-gray-23 !important
      padding: 0
  .product-image
    position: relative
    height: 212px
    padding: 0 20px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    margin-left: auto
    margin-right: auto
    img
      width: 100%
      height: auto
      cursor: pointer
  .detail-wrapper
    background-color: $color-gray-1
    padding: 8px
    .product-name
      @include body-8-medium
      color: $color-black-1
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .product-color
      @include body-5-normal
      color: $color-gray-5
      margin-top: 7px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .product-size
      @include body-5-normal
      color: $color-gray-5
      margin-top: 3px

      // small card css

.sm-trade-card-wrapper
  background: $color-white-1
  position: relative
  min-height: 267px
  &.border
    border: 1px sold $color-gray-23

  .sm-product-image
    position: relative
    padding: 13px 20px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    margin-left: auto
    margin-right: auto
    img
      width: 100%
      height: auto
      cursor: pointer
  .detail-wrapper
    background-color: $color-gray-1
    padding: 8px
    .product-name
      @include body-8-medium
      color: $color-black-1
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .product-color
      @include body-5-normal
      color: $color-gray-5
      margin-top: 7px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .product-size
      @include body-5-normal
      color: $color-gray-5
      margin-top: 3px
</style>
