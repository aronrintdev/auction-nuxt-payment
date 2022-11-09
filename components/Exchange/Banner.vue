<template>
  <transition name="fade">
    <div class="col-12 px-0 text-right position-relative promotions-banner">
      <img
          :src="bannerImageUrl"
          class="banner-image"
      />
      <div class="position-absolute w-100 promotions-banner-overlay col-8">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-sm-12 exchange-heading ml-4 text-left">
              <p class="stock-banner-title">{{ title || $t('deadstock_exchange.title') }}</p>
              <p>
               {{ $t('deadstock_exchange.heading_detail')}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'DeadstockExchangeBanner',
  props: {
    title: {
      type: [String, null],
      default: null,
    },
    bannerImage: {
      type: [String, null],
      default: null,
    }
  },
  computed: {
    bannerImageUrl() {
      return this.bannerImage || require('~/assets/img/exchanges/exchange-banner.png')
    }
  }
};
</script>
