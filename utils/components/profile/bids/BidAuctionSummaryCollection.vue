<template>
  <b-row class="mx-5">
    <b-col v-for="item in products" :key="item.id" md="6">
      <b-row>
        <b-col md="4">
          <ProductThumb :product="item.inventory.product" width="130" />
        </b-col>
        <b-col md="8" class="pl-4 pt-5 d-flex flex-column justify-content-between body-5-normal">
          <div class="">{{ item.inventory.product.name }}</div>
          {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.inventory.product.colorway }}
          <div class="">
            {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
          </div>
          <div>{{
              $t('shopping_cart.size')
            }}&colon; {{ item.inventory.size.size }}
          </div>
          <div class=" text-uppercase">
            {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
          </div>
        </b-col>

      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';

/**
 * Collection component which lists products of auction
 * @name BidAuctionSummaryCollection
 */
export default {
  name: 'BidAuctionSummaryCollection',
  components: {ProductThumb},
  props: {
    /**
     * Products which are on collection
     */
    products: {
      type: Array,
      required: true
    }
  }
}
</script>
