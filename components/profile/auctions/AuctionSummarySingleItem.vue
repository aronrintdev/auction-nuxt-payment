<template>
  <b-row class="mx-0 mx-md-5 mt-3 mt-md-0 summary-single">
    <b-col cols="4" md="2">
      <ProductThumb :product="auctionItem.inventory.product" width="130" />
    </b-col>
    <b-col cols="8" md="10" class="pt-0 pl-2 pl-md-4 pt-md-5 d-flex flex-column justify-content-center">
      <b-row class="mb-2 d-block body-4-normal">
        <div class="d-none d-md-block body-4-bold mb-2 text-gray-24">{{ $t('auction.product_details') }}</div>
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
          <b-col class="product-value">
            <div class="mb-2 text-uppercase">
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

export default {
  name: 'AuctionSummarySingleItem',
  components: {ProductThumb},
  props: {
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
