<template>
  <div class="support-page bg-white h-100">
    <div :class="mobileClass" class="support-hero bg-lightgrey text-center p-md-5 p-3">
      <h1 class="fs-52 fw-6 font-primary d-none d-md-block">
        {{ $t('preferences.profile.support.title') }}
      </h1>
      <h2 class="fs-32 fw-6 text-base-blue font-primary">
        {{ $t('preferences.profile.support.sub_heading') }}
      </h2>
      <Searchbar :class="{
        'mb-7': isScreenXS
      }" centered/>
    </div>
    <NavigationLinks :class="{
        'mt-5': !isScreenXS,
        'mt-42': isScreenXS
      }" centered/>
  </div>
</template>
<script>
import NavigationLinks from '~/components/profile/support/NavigationLinks'
import Searchbar from '~/components/profile/support/Searchbar'
import screenSize from '~/plugins/mixins/screenSize';
export default {
  name: 'Support',
  components: {NavigationLinks, Searchbar},
  mixins: [screenSize],
  layout: 'Profile',
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.mb-7
  margin-bottom: 7px

.mt-42
  margin-top: 42px

.support-hero
  h1
    @include heading-11
    font-family: $font-montserrat
    font-style: normal

  h2
    margin-bottom: 38px

  &.mobile
    background-color: $color-white-4
    padding: 23px 13px !important

    h2
      @include body-4-medium
      font-family: $font-montserrat
      font-style: normal
      color: $color-blue-20
      margin-bottom: 24px

@media (max-width: 767px)
  .support-page
    .fs-32
      @include body-14-regular
</style>
