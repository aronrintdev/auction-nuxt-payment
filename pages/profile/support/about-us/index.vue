<template>
  <div class="support-about-us h-100">
    <SupportHeroSec />
    <div class="bg-white h-100 p-5">
      <h1 class="text-base-blue fw-6 fs-30 font-primary mb-3">
        {{ $t('preferences.profile.support.about_us.title') }}
      </h1>
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.about_us.description') }}
      </p>
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.about_us.description2') }}
      </p> 
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.about_us.description3') }}
      </p>
      <div class="mt-5">
        <h2 class="font-primary text-base-blue fw-6 fs-22">
          {{ $t('preferences.profile.support.about_us.any_questions') }}
        </h2>
        <NavigationLinks class="mt-4" />
      </div>
    </div>
  </div>
</template>
<script>
import NavigationLinks from '~/components/profile/support/NavigationLinks'
import SupportHeroSec from '~/components/profile/support/SupportHeroSec'
export default {
  name: 'AboutUs',
  components: { NavigationLinks, SupportHeroSec },
  layout: 'Profile',
}
</script>
