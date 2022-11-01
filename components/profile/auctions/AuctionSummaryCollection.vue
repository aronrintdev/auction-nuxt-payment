<template>
  <b-row class="mx-0 mx-md-5 summary-collection">
    <b-col v-for="item in products" :key="item.id" md="6" class="mt-3 mt-md-0">
      <b-row>
        <b-col cols="4" md="4">
          <ProductThumb :product="item.inventory.product" width="130" />
        </b-col>
        <b-col cols="8" md="8" class="pt-0 pl-2 pl-md-4 pt-md-5 d-flex flex-column justify-content-between body-5-normal">
          <div class="product-name">{{ item.inventory.product.name }}</div>
          <div class="product-value">{{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.inventory.product.colorway }}</div>
          <div class="product-value">
            {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
          </div>
          <div class="product-value">{{
              $t('shopping_cart.size')
            }}&colon; {{ item.inventory.size.size }}
          </div>
          <div class="product-value text-uppercase">
            {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';

export default {
  name: 'AuctionSummaryCollection',
  components: {ProductThumb},
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.summary-collection
  @media (max-width: 576px)
    .product-name
      @include body-10
    .product-value
      @include body-9
      color: $color-gray-5
      font-weight: $regular
</style>
