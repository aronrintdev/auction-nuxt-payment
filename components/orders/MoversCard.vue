<template>
  <div class="col mx-2">
    <div class="movers-card row mx-0 d-flex flex-column justify-content-between">
      <div class="d-flex justify-content-between">
        <div class="d-none d-md-block"><img :src="brandNameToLogoUrl(product.brand)" alt="" height="40"></div>
        <div v-if="topSalesPercentage > 0 && topSalesPercentage === product.sales_percentage"
             class="d-flex justify-content-end align-items-stretch">
          <div class="best-seller">{{ $t('orders.best_seller') }}</div>
          <img :src="require('~/assets/img/icons/yellow-star.svg')" alt="" height="19">
        </div>
      </div>
      <div class="text-center">
        <img :src="productImage" alt="" height="120">
      </div>
      <div class="d-flex justify-content-between align-items-end">
        <div class="d-none d-md-block">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-color">{{ product.colorway }}</div>
          <div class="product-sku">{{ $t('orders.sku') }}: {{ product.sku }}</div>
        </div>
        <div class="ml-auto">
          <div class="sales d-flex align-items-end">
            <div class="sales-up">
              {{ salesPercentage }}
              {{ $t('orders.sales') }}
            </div>
            <img :src="salesIndicator" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="d-block d-md-none product-info">
      <div class="product-name">{{ product.name | wordLimit }}</div>
      <div class="product-color">{{ product.colorway }}</div>
      <div class="product-sku">{{ $t('orders.sku') }}: {{ product.sku }}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MoversCard',
  props: {
    product: {
      type: Object,
      default(raw) {
        return {}
      }
    },
    topSalesPercentage: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      'filters': 'browse/filters'
    }),
    salesPercentage() {
      return this.product.sales_percentage >= 0 ? `+${parseInt(this.product.sales_percentage)}%` : `${parseInt(this.product.sales_percentage)}%`
    },
    salesIndicator() {
      if (this.product.sales_percentage >= 0) {
        return require('~/assets/img/icons/sales-up-arrow.svg')
      }
      return require('~/assets/img/icons/sales-down-arrow.svg')
    },
    productImage() {
      return this.product.image ? this.product.image : 'https://images.deadstock.co/404.png'
    }
  },
  methods: {
    brandNameToLogoUrl(name) {
      const brand = this.filters.brands?.find(b => b.name === name)
      if (brand) {
        return brand.image
      }

      // todo need to replace with a NoPhoto
      return require('~/assets/img/home/brand2.png')
    }
  }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.movers-card
  padding: 20px

.best-seller
  font-family: $font-family-sf-pro-text
  @include body-13-regular
  letter-spacing: -0.02em
  color: $color-gray-5
  white-space: nowrap
  padding: 0 5px

.sales
  font-family: $font-family-sf-pro-text
  @include body-5-medium
  letter-spacing: -0.02em
  color: $color-gray-5
  width: 60px

.product-name
  font-family: $font-sp-pro
  @include body-3-bold
  color: $color-black-1

.product-color, .product-sku
  font-family: $font-family-sf-pro-text
  @include body-9-regular
  color: $color-gray-5

@media (min-width: 993px)
  .movers-card
    background-color: $white
    height: 100%
    border: 1px solid $color-gray-21
    border-radius: 13px

@media (max-width: 992px)
  .product-name
    font-size: 13px
    line-height: 16px

  .sales
    font-size: 13px

  .movers-card
    border: 1px solid $color-white-4
    background-color: $color-white-4
    border-radius: 8px 8px 0 0

</style>
