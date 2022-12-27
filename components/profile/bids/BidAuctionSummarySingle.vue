<template>
  <b-row class="mx-0 mx-md-5 summary-single">
    <b-col cols="4" md="3">
      <div class="d-flex justify-content-center align-items-center product-image">
        <ProductThumb :product="auctionItem.inventory.product" :variant="'small'" />
      </div>
    </b-col>
    <b-col cols="8" md="9" class="d-flex flex-column justify-content-start product-details">
      <b-row class="d-block body-4-normal">
        <div class="d-none d-md-block product-details-title">{{ $t('bids.product_details') }}</div>
        <b-row>
          <b-col sm="9">
            <div class="product-name text-truncate pr-4">{{ auctionItem.inventory.product.name }}</div>
          </b-col>
          <b-col sm="3" class="product-value">{{
              $t('shopping_cart.size')
            }}&colon; {{ auctionItem.inventory.size.size }}
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="9" class="product-value text-truncate pr-4">
            {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ auctionItem.inventory.product.colorway }}
          </b-col>
          <b-col sm="3">
            <div class="text-uppercase text-nowrap product-value">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ auctionItem.inventory.product.sku }}
            </div>
          </b-col>
        </b-row>
        <div class="product-value">
          {{ $t('products.box_condition') }}&colon;&nbsp;{{ $t(`common.box_conditions.${auctionItem.inventory.packaging_condition.category_id}.${auctionItem.inventory.packaging_condition.display_order}`) }}
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
  .product-details
    padding-left: 105px
  .product-details-title
    font-family: $font-sp-pro
    font-weight: $medium
    @include body-12
    color: $color-gray-5
    margin-bottom: 8px
  .product-name,
  .product-value
    font-family: $font-sp-pro
    font-weight: $regular
    @include body-4b
    color: $black
    margin-bottom: 4px
  .product-image
    height: 100px
    .thumb-wrapper
      transform: translateY(-15px)

  @media (max-width: 576px)
    .product-name
      @include body-10
    .product-value
      @include body-9
      color: $color-gray-5
      font-weight: $regular
      line-break: anywhere
</style>
