<template>
  <b-row>
    <b-col md="12">
      <b-row class="text-center">
        <b-col md="4">
          <b-img :src="require('~/assets/img/product/authenticity.png')" />
        </b-col>
        <b-col md="4" class="border-left border-right border-gray-16">
          <b-img :src="require('~/assets/img/product/affirm.png')" />
        </b-col>
        <b-col md="4">
          <b-img :src="require('~/assets/img/product/crypto.png')" />
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col md="4">
          <span class="pre-line">{{ $t('products.authenticity_guaranteed') }}</span>
        </b-col>
        <b-col md="4" class="border-left border-right border-gray-16">
          <span class="pre-line">{{ $t('products.payment_plans') }}</span>
        </b-col>
        <b-col md="4">
          <span class="pre-line">{{ $t('products.crypto_payments') }}</span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ProductAcceptedPaymentsV2',
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.border-gray-16
  border-color: $color-gray-16f !important

</style>

