<template>
  <b-row class="title-wrapper pb-3">
    <b-col class="px-4 px-sm-0" md="12">
      <b-row class="w-100">
        <div class="title body-1-medium font-primary">{{ productName }}</div>
        <div class="color body-2-medium font-primary d-flex align-items-center">{{ productColor }}</div>
        <b-col class="px-sm-0 mt-1" md="12">
          <span class="last-sale">
            {{ $t('product_page.last_sale') }}&colon;&nbsp;
            &dollar;{{ productLastSalePrice | formatPrice }}
          </span>
          <span
              v-if="lastSalePriceProjectionValue >= 0"
              class="last-sale-diff"
          >
            &plus;{{ lastSalePriceProjectionValue | formatPrice }}&nbsp;&lpar;&plus;{{
              lastSalePriceProjectionPercentage
            }}&percnt;&rpar;
          </span>
          <span v-else class="body-5-medium text-color-red-3">
            {{ lastSalePriceProjectionValue | formatPrice }}&nbsp;&lpar;{{ lastSalePriceProjectionPercentage }}&percnt;&rpar;
          </span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'ProductTitleSec',
  props: {
    productName: {
      type: String,
      required: true,
    },
    productColor: {
      type: String,
      required: true,
    },
    lowestPrice: {
      type: Number,
      default: 0,
    },
    productLastSalePrice: {
      type: Number,
      required: true,
    },
    product: {
      type: Object,
      default: () => {
      }
    },
    isShareActive: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lastSalePriceProjectionValue(vm) {
      if (vm.productLastSalePrice === 0) {
        return 0.00
      }

      return vm.lowestPrice - vm.productLastSalePrice
    },
    lastSalePriceProjectionPercentage(vm) {
      if (vm.productLastSalePrice === 0) {
        return 0.00
      }

      return (((vm.lowestPrice - vm.productLastSalePrice) / vm.productLastSalePrice) * 100).toFixed(2)
    },
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.color
  height: 38px

.title
  @include body-12-medium
  color: $color-black-1
  @media (min-width: 576px)
    @include body-1-medium

.title-wrapper
  @media (min-width: 576px)
    border-bottom: 1px solid $color-gray-16f

.text-color-green-24
  color: $color-green-26

.text-color-red-3
  color: $color-red-3

.text-color-grey-6
  color: $color-gray-6

.last-sale
  @include body-5-normal
  color: $color-gray-6
  @media (min-width: 576px)
    @include body-5-medium

.last-sale-diff
  @include body-9-normal
  color: $color-green-26
  @media (min-width: 576px)
    @include body-5-medium

</style>
