<template>
  <div>
    <section class="bg-lightgrey p-5">
      <h1 class="fw-7 fs-26 font-primary">
        {{ $t('preferences.profile.support.title') }}
      </h1>
      <h2 class="text-base-blue fw-6 fs-18 font-primary">
        {{ $t('preferences.profile.support.sub_heading') }}
      </h2>
      <Searchbar class="mt-4" />
    </section>
  </div>
</template>
<script>
import Searchbar from '~/components/profile/support/Searchbar'
export default {
  name: 'SupportLayout',
  components: { Searchbar },
}
</script>
