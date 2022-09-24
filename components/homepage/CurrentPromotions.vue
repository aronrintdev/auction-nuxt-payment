<template>
  <div class="p-0">
    <SectionHeader
      :title="$t('home_page.current_promotions')"
      :desc="$t('home_page.current_promotions_description')"
      :label="$t('home_page.view_more_promotions')"
      to="/shop"
    />
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
