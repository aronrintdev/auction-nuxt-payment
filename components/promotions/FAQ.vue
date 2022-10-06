<template>
  <div class="mx-auto d-flex align-items-center justify-content-between my-5 p-4 faq">
    <span class="body-7-medium text-info">{{ $t('promotions.faq_title') }}</span>
    <nuxt-link to="/promotions/faqs">
      <img src="~/assets/img/home/view-more.png"/>
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
