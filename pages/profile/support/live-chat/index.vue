<template>
  <div class="support-live-chat h-100">
    <SupportHeroSec />
    <div class="bg-white h-100">
      <div class="p-md-5 p-3 content-text">
        <h1 class="text-base-blue fw-6 fs-30 font-primary mb-3 text-center text-md-left">
          {{ $t('preferences.profile.support.live_chat.title') }}
        </h1>
        <p class="fw-5 fs-20 font-primary text-black">
          {{ $t('preferences.profile.support.live_chat.description') }}
        </p>
        <p class="fw-5 fs-20 font-primary text-black">
          {{ $t('preferences.profile.support.live_chat.description2') }}
        </p>
      </div>

      <div class="mt-md-5 mt-2">
        <h2 class="font-primary text-base-blue fw-6 fs-22 px-md-5 px-3">
          {{ $t('preferences.profile.support.live_chat.any_questions') }}
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
  name: 'LiveChat',
  components: { NavigationLinks, SupportHeroSec },
  layout: 'Profile',
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

@media (max-width: 767px)
  .support-live-chat
    .fs-30, .fs-22
      @include body-13-regular
    .fs-20
      @include body-5
      font-weight: $light
</style>
