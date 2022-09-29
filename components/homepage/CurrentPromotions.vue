<template>
  <div class="p-0 section-wrapper">
    <div class="d-none d-md-block">
      <SectionHeader
        :title="$t('home_page.current_promotions')"
        :desc="$t('home_page.current_promotions_description')"
        :label="$t('home_page.view_more_promotions')"
        to="/shop"
      />
    </div>
    <div class="d-block d-md-none">
      <SectionHeader
        :title="$t('home_page.current_promos')"
        :desc="$t('home_page.trade_desc')"
        :label="$t('home_page.view_more_promotions')"
        to="/shop"
      />
    </div>
    <div class="row promos-wrapper d-none d-md-flex">
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
    <div class="row promos-wrapper d-flex d-md-none overflow-hidden mx-1">
      <div class="col-6 col-md-4">
        <img
          width="100%"
          :src="require('~/assets/img/home/promotions/promo1-sm.png')"
        />
      </div>
      <div class="col-6 col-md-4 border-left">
        <img
          width="100%"
          :src="require('~/assets/img/home/promotions/promo2-sm.png')"
        />
      </div>
      <div class="d-flex border-top col-12 pt-2 mt-2 mt-md-0">
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
<style lang="sass" scoped>
.promos-wrapper
  margin-top: 18px
.section-wrapper
  margin-bottom: 48px
</style>
