<template>
  <div class="support-hero">
    <section class="bg-lightgrey p-md-5 p-3 text-md-left text-center">
      <h1 class="fw-7 fs-26 font-primary d-none d-md-block">
        {{ $t('preferences.profile.support.title') }}
      </h1>
      <h2 class="text-base-blue fw-6 fs-18 font-primary">
        {{ $t('preferences.profile.support.sub_heading') }}
      </h2>
      <Searchbar class="mt-md-4 mt-3"/>
    </section>
  </div>
</template>
<script>
import Searchbar from '~/components/profile/support/Searchbar'

export default {
  name: 'SupportLayout',
  components: {Searchbar},
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

@media (max-width: 767px)
  .support-hero
    .fs-18
      @include body-14-regular
</style>
