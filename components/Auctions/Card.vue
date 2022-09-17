<template>
  <div class="auction-card-wrapper">
    <div class="current-bid">
      <div class="bid-text">
        {{ $t('auctions.list.table_columns.current_bid').toUpperCase() }}
      </div>
      <div class="d-flex justify-content-between align-items-baseline">
        <div class="bid-amount">$225</div>
        <div class="bid-count">2 {{ $tc('common.bid', 2) }}</div>
      </div>
    </div>
    <div class="product-image">
      <ProductThumb :product="product" overlay />
    </div>
    <div class="detail-wrapper">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-color">{{ product.colorway }}, Size L</div>
      <div class="time-remaining">
        <div>{{ $t('auctions.list.table_columns.time_remaining') }}:</div>
        <div>5d 18h</div>
      </div>
      <Button variant="outline-primary" class="btn-bid-now" block>{{
        $t('auctions.bid_details.bid_now')
      }}</Button>
    </div>
  </div>
</template>
<script>
import ProductThumb from '~/components/product/Thumb.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'AuctionCard',

  components: { ProductThumb, Button },

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

.auction-card-wrapper
  background: $color-gray-1
  position: relative

  .current-bid
    padding: 0 17px
    padding-top: 21px

    .bid-text
      @include body-9-bold
      color: $color-black-1

    .bid-amount
      @include body-2-bold
      margin-top: 3px
      color: $color-black-1

    .bid-count
      @include body-9-regular
      color: $color-gray-6

  .product-image
    position: relative
    padding: 0 20px
    margin-top: 5px

    img
      width: 100%

  .detail-wrapper
    padding: 0 21px 18px 21px
    margin-top: 5px

    .product-name
      @include body-8-medium
      color: $color-black-1
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap

    .product-color
      @include body-5-normal
      color: $color-gray-5
      margin-top: 6px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap

    .time-remaining
      @include body-9-medium
      display: flex
      margin-top: 6px
      justify-content: space-between
      color: $color-red-3

    .btn-bid-now
      margin-top: 24px
</style>
