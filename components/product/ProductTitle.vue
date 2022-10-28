<template>
  <b-row class="title-wrapper pb-3">
    <b-col md="12" class="px-4 px-sm-0">
      <b-row>
        <b-col md="12" class="d-flex align-items-center px-sm-0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="title body-1-medium mr-sm-2 col-10 px-0 mr-2">{{ productName }}</div>
            <b-img 
              width="18" 
              :src="require('~/assets/img/product/heart-outline.svg')"
              class="d-sm-none"
            >
            </b-img>
          </div>
          <ShareSVG class="d-none d-sm-block ml-auto" role="button" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" class="px-sm-0 mt-1">
          <span class="last-sale">
            {{ $t('product_page.last_sale') }}&colon;&nbsp;
            &dollar;{{ productLastSalePrice | formatPrice }}
          </span>
          <span 
            v-if="lastSalePriceProjectionValue >= 0" 
            class="last-sale-diff"
          >
            &plus;{{ lastSalePriceProjectionValue | formatPrice }}&nbsp;&lpar;&plus;{{ lastSalePriceProjectionPercentage }}&percnt;&rpar;
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
import ShareSVG from '~/assets/img/icons/share.svg?inline'

export default {
  name: 'ProductBreadcrumb',
  components: { ShareSVG },
  props: {
    productName: {
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

.title
  font-size: 18px
  line-height: 20px
  font-weight: 600
  color: #000
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
  font-weight: 500
  font-size: 14px
  color: $color-gray-6
  @media (min-width: 576px)
    @include body-5-medium 

.last-sale-diff
  font-weight: 500
  font-size: 12px
  color: $color-green-26
  @media (min-width: 576px)
    @include body-5-medium

</style>
