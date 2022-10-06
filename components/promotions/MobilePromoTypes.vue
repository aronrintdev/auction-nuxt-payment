<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div v-if="!isGiveaway" class="d-flex flex-column align-items-center justify-content-center mt-4">
      <img :alt="$t('promotions.cars')" :src="require('~/assets/img/promotions/car-with-bow.svg')" class="mb-4"
           width="124">
      <div class="type-title mb-3">{{ $t('promotions.cars') }}</div>
      <div class="type-description mb-4">{{ $t('promotions.car_sweepstakes_desc') }}</div>
    </div>
    <div v-if="!isGiveaway" class="d-flex flex-column align-items-center justify-content-center">
      <img :alt="$t('promotions.trips')" :src="require('~/assets/img/promotions/plane.svg')" class="mb-4" width="138">
      <div class="type-title mb-3">{{ $t('promotions.trips') }}</div>
      <div class="type-description mb-4">{{ $t('promotions.lorem') }}</div>
    </div>
    <div v-if="isGiveaway" class="d-flex flex-column align-items-center justify-content-center mt-4">
      <img :alt="$t('promotions.apparel')" :src="require('~/assets/img/promotions/shirt.svg')" class="mb-4"
           width="76">
      <div class="type-title mb-3">{{ $t('promotions.apparel') }}</div>
      <div class="type-description mb-4">{{ $t('promotions.lorem') }}</div>
    </div>
    <div v-if="isGiveaway" class="d-flex flex-column align-items-center justify-content-center">
      <img :alt="$t('promotions.sneakers')" :src="require('~/assets/img/promotions/sneaker.svg')" class="mb-2"
           width="120">
      <div class="type-title mb-3">{{ $t('promotions.sneakers') }}</div>
      <div class="type-description mb-4">{{ $t('promotions.lorem') }}</div>
    </div>
    <div class="d-flex flex-column align-items-center justify-content-center">
      <img :alt="$t('promotions.cash')" :src="require('~/assets/img/promotions/cash.svg')" class="mb-4" width="86">
      <div class="type-title mb-3">{{ $t('promotions.cash') }}</div>
      <div class="type-description">{{ $t('promotions.cash_prizes_desc') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobilePromoTypes',
  props: {
    isGiveaway: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.type-title
  text-align: center
  @include body-2
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-black-1

.type-description
  @include body-5
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  text-align: center
  color: $color-gray-5

.prizes-text
  @include body-2
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-black-1
</style>
