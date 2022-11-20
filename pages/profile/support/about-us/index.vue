<template>
  <div class="support-about-us h-100">
    <SupportHeroSec />
    <div class="bg-white h-100">
      <div class="p-md-5 p-3 content-text">
        <h1 class="text-base-blue fw-6 fs-30 font-primary mb-3 text-center text-md-left">
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
      </div>
      <div class="mt-md-5 mt-2">
        <h2 class="font-primary text-base-blue fw-6 fs-22 px-md-5 px-3">
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
  layout(context) {
    return context.$auth.user ? 'Profile' : 'IndexLayout'
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

@media (max-width: 767px)
  .support-about-us
    .fs-30, .fs-22
      @include body-13-regular
    .fs-20
      @include body-5
      font-weight: $light
</style>
