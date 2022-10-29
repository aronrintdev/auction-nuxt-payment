<template>
  <div class="support-faq h-100">
    <SupportHeroSec />
    <div class="bg-white h-100">
      <div class="p-md-5 p-3">
        <h1 class="text-base-blue fw-6 fs-30 font-primary mb-3 text-center text-md-left">
          {{ $t('preferences.profile.support.faq.title') }}
        </h1>
        <p class="fw-5 fs-20 font-primary text-black">
          {{ $t('preferences.profile.support.faq.description') }}
        </p>

        <div class="mt-md-5 mt-2">
          <h2 class="font-primary text-base-blue fw-6 fs-22">
            {{ $t('preferences.profile.support.faq.any_questions') }}
          </h2>
        </div>
      </div>

      <NavigationLinks class="mt-4" />

      <div class="mt-md-5 mt-1 px-md-5 pr-3">
        <FAQAccordion />
      </div>
    </div>
  </div>
</template>
<script>
import NavigationLinks from '~/components/profile/support/NavigationLinks'
import SupportHeroSec from '~/components/profile/support/SupportHeroSec'
import FAQAccordion from '~/components/profile/support/FAQAccordion'
export default {
  name: 'FAQ',
  components: { NavigationLinks, SupportHeroSec, FAQAccordion },
  layout: 'Profile',
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

@media (max-width: 767px)
  .support-faq
    .fs-30, .fs-22
      @include body-13-regular
    .fs-20
      @include body-5
      font-weight: $light
</style>
