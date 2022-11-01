<template>
  <b-row class="mx-0 mx-md-5 summary-single">
    <b-col cols="4" md="3">
      <div class="w-75 h-100 d-flex justify-content-center align-items-center">
        <ProductThumb :product="auctionItem.inventory.product" :variant="'small'" />
      </div>
    </b-col>
    <b-col cols="8" md="9" class="pt-4 pt-md-5 d-flex flex-column justify-content-center">
      <b-row class="mb-2 d-block body-4-normal">
        <div class="d-none d-md-block body-4-bold mb-2 text-gray-24">{{ $t('bids.product_details') }}</div>
        <b-row>
          <b-col sm="4">
            <div class="mb-2 product-name">{{ auctionItem.inventory.product.name }}</div>
          </b-col>
          <b-col class="product-value">{{
              $t('shopping_cart.size')
            }}&colon; {{ auctionItem.inventory.size.size }}
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4" class="product-value">
            {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ auctionItem.inventory.product.colorway }}
          </b-col>
          <b-col>
            <div class="mb-0 mb-md-2 text-uppercase product-value">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ auctionItem.inventory.product.sku }}
            </div>
          </b-col>
        </b-row>
        <div class="mb-2 product-value">
          {{ $t('products.box_condition') }}&colon;&nbsp;{{ auctionItem.inventory.packaging_condition.name }}
        </div>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';

/**
 * Component which shows single item from auction which type is single
 * @name BidAuctionSummarySingle
 */
export default {
  name: 'BidAuctionSummarySingle',
  components: {ProductThumb},
  props: {
    /**
     * Single auction item from auction_items
     */
    auctionItem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.summary-single
  @media (max-width: 576px)
    .product-name
      @include body-10
    .product-value
      @include body-9
      color: $color-gray-5
      font-weight: $regular
</style>
