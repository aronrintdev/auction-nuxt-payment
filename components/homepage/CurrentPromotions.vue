<template>
  <div class="p-0">
    <div class="row align-items-center mx-md-5">
      <div class="col-4 col-md-3 d-flex">
        <h1 class="heading-garamond">
          {{ $t('home_page.current') }} <br />
          {{ $t('home_page.promotions') }}
        </h1>
      </div>
      <div class="col-6 col-md-3">
        <h5 class="fw-4 fs-18 font-primary mb-0 text-gray-light garamond-desc">
          {{ $t('home_page.current_promotions_description') }}
        </h5>
      </div>
      <div class="col-2 col-md-6 d-flex justify-content-end">
        <ViewMoreBtn :label="$t('home_page.view_more_promotions')" to="/shop" />
      </div>
    </div>
    <div class="row my-5">
      <div class="col-6 col-md-4">
        <img
          width="100%"
          :src="require('~/assets/img/home/promotions/promotion1.png')"
        />
      </div>
      <div class="col-6 col-md-4">
        <img
          width="100%"
          :src="require('~/assets/img/home/promotions/promotion2.png')"
        />
      </div>
      <div class="d-none d-md-flex col-md-4 mt-3 mt-md-0">
        <img
          width="100%"
          :src="require('~/assets/img/home/promotions/promotion3.png')"
        />
      </div>
      <div class="d-flex d-md-none col-12 mt-3 mt-md-0">
        <img
          width="100%"
          :src="require('~/assets/img/home/promotions/promotion3-sm.png')"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CurrentPromotions',
}
</script>
