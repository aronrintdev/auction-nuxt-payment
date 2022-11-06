<template>
  <b-row class="border-bottom pb-3">
    <b-col md="12">
      <b-row>
        <b-col md="12" class="d-flex align-items-center">
          <span :class="isScreenXS ? 'body-12-medium' : 'body-1-medium'">{{ productName }}</span>
          <ShareSVG class="ml-auto" role="button" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <span class="text-color-grey-6" :class="isScreenXS ? 'body-5-regular' : 'body-5-medium'">
            {{ $t('product_page.last_sale') }}&colon;&nbsp;&dollar;{{ productLastSalePrice | formatPrice }}
          </span>
          <span v-if="lastSalePriceProjectionValue >= 0" class="body-5-medium text-color-green-24">
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
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'ProductBreadcrumb',
  components: { ShareSVG },
  mixins: [screenSize],
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

.text-color-green-24
  color: $color-green-26

.text-color-red-3
  color: $color-red-3

.text-color-grey-6
  color: $color-gray-6
</style>
