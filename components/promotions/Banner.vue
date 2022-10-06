<template>
  <transition name="fade">
    <div :class="`col-12 px-0 position-relative promotions-banner ${singleBanner? 'text-center': 'text-right'}`">
      <img
          :src="bannerImageUrl"
          class="banner-image"
          :class="`${mobileClass} ${(singleBanner && isScreenXS) && 'single'}`"
      />
      <div v-if="!isScreenXS" class="position-absolute w-100 promotions-banner-overlay">
        <div class="container">
          <div class="row">
            <div class="col-12 text-left promotions-banner-title">{{ title || $t('promotions.promotions') }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'PromotionsBanner',
  mixins: [screenSize],
  props: {
    title: {
      type: [String, null],
      default: null,
    },
    bannerImage: {
      type: [String, null],
      default: null,
    },
    singleBanner: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    bannerImageUrl() {
      return this.bannerImage || require('~/assets/img/promotions/promotions-banner1.png')
    }
  }
};
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"
.banner-image
  &.mobile
    height: 195px

  &.single
    width: 335px
    margin-top: 10px
    margin-inline: 10px
</style>
