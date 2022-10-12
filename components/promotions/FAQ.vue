<template>
  <div :class="{'p-4 my-5': !isScreenXS, 'p-3 my-2': isScreenXS}"
       class="mx-auto d-flex align-items-center justify-content-between   faq">
    <span :class="mobileClass" class="body-7-medium text-info">{{ $t('promotions.faq_title') }}</span>
    <nuxt-link to="/promotions/faqs">
      <viewMoreSvg v-if="isScreenXS"/>
      <img v-else src="~/assets/img/home/view-more.png"/>
    </nuxt-link>
  </div>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize';
import viewMoreSvg from '~/assets/img/home/view-more.svg?inline'

export default {
  name: 'PromotionsFAQ',
  components: {viewMoreSvg},
  mixins: [screenSize]
};
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"
.text-info
  &.mobile
    @include body-5
    font-family: $font-montserrat
    font-style: normal
    font-weight: $medium
    color: $color-blue-20 !important
</style>
