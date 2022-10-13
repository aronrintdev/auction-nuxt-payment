<template>
  <div :class="{'p-4 ': !isScreenXS, 'p-3': isScreenXS}"
       class="mx-auto d-flex align-items-center justify-content-between  faq w-100">
    <span :class="mobileClass" class="body-7-medium text-info">{{ $t('promotions.faq_title') }}</span>
    <nuxt-link to="/faqs/rewards">
      <viewMoreSvg v-if="isScreenXS"/>
      <img v-else src="~/assets/img/home/view-more.png"/>
    </nuxt-link>
  </div>
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize';
import viewMoreSvg from '~/assets/img/home/view-more.svg?inline'

export default {
  name: 'FaqReward',
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

.faq
  max-width: 800px
  border: 0.5px solid $color-gray-47
  border-radius: 8px
</style>
