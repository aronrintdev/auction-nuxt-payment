<template>
  <b-row>
    <b-col md="12" class="text-center">
      <span class="body-8-medium text-color-blue-20">{{ productPrice | toCurrency }}</span>
      <span class="body-8-medium text-color-orange-11">{{ $t('products.or_4_installments') }}</span>
      <span class="body-8-regular text-color-orange-11">{{ $t('products.of_price', { price: formatPrice }) }}</span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'AlternativePaymentTitle',
  props: {
    productPrice: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  computed: {
    formatPrice (vm) {
      return this.$root.$options.filters.toCurrency(Math.ceil(vm.productPrice / 4))
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-orange-11
  color: $color-orange-11

.text-color-blue-20
  color: $color-blue-20
</style>
