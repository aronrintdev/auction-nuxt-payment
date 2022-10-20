<template>
  <b-row>
    <b-col md="12">
      <b-row>
        <b-col md="12" class="d-flex align-items-center">
          <span class="body-1-medium">{{ productName }}</span>
          <ShareSVG class="ml-auto" role="button" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <span class="body-5-medium text-color-grey-6">{{ $t('product_page.last_sale') }}&colon;&nbsp;&dollar;{{ productLastSalePrice | formatPrice }}</span>
          <span class="body-5-medium text-color-green-24">+0.64 (+0.36%)</span>
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
    productLastSalePrice: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-green-24
  color: $color-green-24

.text-color-grey-6
  color: $color-gray-6
</style>
