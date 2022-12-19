<template>
  <div class="out-of-stock-section">
    <div
      class="out-of-stock-text text-danger text-center body-8-medium text-danger"
    >
      {{ $t('products.error.out_of_stock_item_price') }}
    </div>
    <!-- Buy Now and Add to Wishlist Button Group -->
    <div>
      <div class="w-100 mt-2">
        <Button
          class="add-to-cart d-sm-none w-100"
          block
          pill
          variant="dark"
          @click="$emit('notify-me')"
        >
          {{ $t('products.notify_me') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/common/Button'

export default {
  name: 'BuyNowSection',
  components: {
    Button,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'



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
