<template>
  <div class="support-page bg-white h-100">
    <section class="support-hero bg-lightgrey text-center p-5">
      <h1 class="fs-52 fw-6 font-primary">
        {{ $t('preferences.profile.support.title') }}
      </h1>
      <h2 class="fs-32 fw-6 text-base-blue font-primary">
        {{ $t('preferences.profile.support.sub_heading') }}
      </h2>
      <Searchbar class="mt-5" centered />
    </section>
    <NavigationLinks class="mt-5" centered />
  </div>
</template>
<script>
import NavigationLinks from '~/components/profile/support/NavigationLinks'
import Searchbar from '~/components/profile/support/Searchbar'
export default {
  name: 'Support',
  components: { NavigationLinks, Searchbar },
  layout: 'Profile',
}
</script>
