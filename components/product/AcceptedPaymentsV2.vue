<template>
  <b-row class="px-30 ">
    <div class="col-4 d-flex flex-column h-81 text-center">
      <div class="flex-1">
        <b-img class="img-fluid" :src="require('~/assets/img/product/authenticity.svg')" />
      </div>
      <span
        class="label pre-line"
      >
        {{ $t('products.deadstock_guarantee') }}
      </span>
    </div>
    <div class="col-4 d-flex flex-column h-81 text-center border-x">
      <div class="flex-1">
        <b-img class="img-fluid" :src="require('~/assets/img/product/affirm.svg')" />
      </div>
      <span
        class="label pre-line mt-14"
      >
        {{ $t('products.payment_plans') }}
      </span>
    </div>
    <div class="col-4 d-flex flex-column h-81 text-center">
      <div class="flex-1">
        <b-img class="img-fluid" :src="require('~/assets/img/product/crypto.svg')" />
      </div>
      <span
        class="label pre-line"
      >
        {{ $t('products.crypto_payments') }}
      </span>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'ProductAcceptedPaymentsV2',
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.mt-14
  margin-top: 14px

.px-30
  padding-left: 30px
  padding-right: 30px

.h-81
  height: 81px

.label
  @include body-6
  color: $color-black-1

.border-x
  border-left: 1px solid $color-black-1
  border-right: 1px solid $color-black-1
  @media (min-width: 576px)
    border-color: $color-gray-16f

</style>

