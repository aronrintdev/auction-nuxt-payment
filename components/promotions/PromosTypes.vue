<template>
  <div class="mx-auto promos-types">
    <div class="heading-4-bold">{{ $t('promotions.types_of_promos') }}</div>
    <div class="mx-5">
      <div class="mb-3 d-flex align-items-center promo-type">
        <div class="position-relative promo-type-img">
          <img class="position-absolute" src="~/assets/img/promotions/car.svg"/>
        </div>
        <div class="ml-4">
          <div class="promo-type-title">{{ $t('promotions.car_sweepstakes') }}</div>
          <div class="body-3-regular mt-2">{{ $t('promotions.car_sweepstakes_desc') }}</div>
        </div>
      </div>
      <div class="mb-3 d-flex align-items-center promo-type">
        <div class="position-relative promo-type-img">
          <img class="position-absolute" src="~/assets/img/promotions/shoes.svg"/>
        </div>
        <div class="ml-4">
          <div class="promo-type-title">{{ $t('promotions.sneaker_giveaways') }}</div>
          <div class="body-3-regular mt-2">{{ $t('promotions.sneaker_giveaways_desc') }}</div>
        </div>
      </div>
      <div class="mb-3 d-flex align-items-center promo-type">
        <div class="position-relative promo-type-img">
          <img class="position-absolute" src="~/assets/img/promotions/dollar-in-circle.svg"/>
        </div>
        <div class="ml-4">
          <div class="promo-type-title">{{ $t('promotions.cash_prizes') }}</div>
          <div class="body-3-regular mt-2">{{ $t('promotions.cash_prizes_desc') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PromotionsPromosTypes',
};
</script>
