<template>
  <b-row class="px-30 ">
    <div class="col-4 d-flex flex-column h-81 text-center">
      <div class="flex-1">
        <b-img class="img-fluid" :src="require('~/assets/img/product/authenticity.png')" />
      </div>
      <span 
        class="label pre-line"
      >
        {{ $t('products.authenticity_guaranteed') }}
      </span>
    </div>
    <div class="col-4 d-flex flex-column h-81 text-center border-x">
      <div class="flex-1">
        <b-img class="img-fluid" :src="require('~/assets/img/product/affirm.png')" />
      </div>
      <span 
        class="label pre-line"
        :style="{ marginTop: '14px' }"
      >
        {{ $t('products.payment_plans') }}
      </span>
    </div>
    <div class="col-4 d-flex flex-column h-81 text-center">
      <div class="flex-1">
        <b-img class="img-fluid" :src="require('~/assets/img/product/crypto.png')" />
      </div>
      <span 
        class="label pre-line"
      >
        {{ $t('products.crypto_payments') }}
      </span>
    </div>
    <!-- <b-row class="px-30 text-center w-100">
      <b-col col="4">
        <b-img :src="require('~/assets/img/product/authenticity.png')" />
      </b-col>
      <b-col col="4" class="border-left border-right border-gray-16">
        <b-img :src="require('~/assets/img/product/affirm.png')" />
      </b-col>
      <b-col col="4">
        <b-img :src="require('~/assets/img/product/crypto.png')" />
      </b-col>
    </b-row>
    <b-row class="px-30 text-center w-100">
      <b-col col="4">
        <span class="pre-line">{{ $t('products.authenticity_guaranteed') }}</span>
      </b-col>
      <b-col col="4" class="border-left border-right border-gray-16">
        <span class="pre-line">{{ $t('products.payment_plans') }}</span>
      </b-col>
      <b-col col="4">
        <span class="pre-line">{{ $t('products.crypto_payments') }}</span>
      </b-col>
    </b-row> -->
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

.px-30
  padding-left: 30px
  padding-right: 30px  

.h-81
  height: 81px

.label
  font-size: 11px
  line-height: 13px
  color: #000

.border-x
  border-left: 1px solid #000
  border-right: 1px solid #000
  @media (min-width: 576px)
    border-color: $color-gray-16f

.line-height-13
  line-height: 13px

</style>

