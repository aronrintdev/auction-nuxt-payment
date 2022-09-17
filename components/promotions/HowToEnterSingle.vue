<template>
  <div class="p-4 my-1 d-flex justify-content-between how-to-enter-single">
    <div>
      <div class="heading-4-bold mb-2">{{ $t('promotions.how_to_enter') }}</div>
      <div class="body-2-regular mb-4 mr-5 pr-5">{{ $t(`promotions.how_to_enter_content_${category}`) }}</div>
      <div class="body-8-regular">
        {{ $t('promotions.want_to_know_more') }}&nbsp;<nuxt-link to="/terms">
        <strong>{{ $t('promotions.terms_and_conditions') }}</strong></nuxt-link>
      </div>
    </div>
    <img class="ml-5" src="~/assets/img/promotions/Cash.png" width="120"/>
  </div>
</template>
<script>
export default {
  name: 'PromotionsHowToEnterSingle',
  props: {
    category: {
      type: String,
      default: 'sweepstake',
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.how-to-enter-single
  strong
    color: $black
</style>