<template>
  <div class="support-faq h-100">
    <SupportHeroSec />
    <div class="bg-white p-5 h-100">
      <h1 class="text-base-blue fw-6 fs-30 font-primary mb-3">
        {{ $t('preferences.profile.support.faq.title') }}
      </h1>
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.faq.description') }}
      </p>

      <div class="mt-4">
        <h2 class="font-primary text-base-blue fw-6 fs-22">
          {{ $t('preferences.profile.support.faq.any_questions') }}
        </h2>
        <NavigationLinks class="mt-4" />
      </div>

      <div class="mt-5">
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
