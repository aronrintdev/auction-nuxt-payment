<template>
  <b-row class="mx-5">
    <b-col md="2">
      <ProductThumb :product="auctionItem.inventory.product" width="130" />
    </b-col>
    <b-col md="10" class="pl-4 pt-5 d-flex flex-column justify-content-center">
      <b-row class="mb-2 d-block body-4-normal">
        <div class="body-4-bold mb-2 text-gray-24">{{ $t('auction.product_details') }}</div>
        <b-row>
          <b-col sm="4">
            <div class="mb-2">{{ auctionItem.inventory.product.name }}</div>
          </b-col>
          <b-col>{{
              $t('shopping_cart.size')
            }}&colon; {{ auctionItem.inventory.size.size }}
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ auctionItem.inventory.product.colorway }}
          </b-col>
          <b-col>
            <div class="mb-2 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ auctionItem.inventory.product.sku }}
            </div>
          </b-col>
        </b-row>
        <div class="mb-2">
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
