<template>
  <transition name="fade">
    <div class="col-12 px-0 text-right position-relative promotions-banner">
      <img
          :src="bannerImageUrl"
          class="banner-image"
      />
      <div class="position-absolute w-100 promotions-banner-overlay">
        <div class="container">
          <div class="row">
            <div class="col-12 text-left promotions-banner-title">{{ title }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'PromotionsBanner',
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
      return this.bannerImage || require('~/assets/img/exchange/exchange-banner.png')
    }
  }
};
</script>
