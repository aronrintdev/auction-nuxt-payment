<template>
  <div class="h-75 d-flex">
    <img :src="require('~/assets/img/profile/vendor-hub/vendor_acceptance.png')" class="left-image">
    <div class="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      <h3 class="title-application mb-3">
        {{$t('vendor_hub.application_revieved')}}
      </h3>
      <h3 class="subtitle-application mb-3">
        {{$tc('vendor_hub.in_review',1)}}<br/>
        {{$tc('vendor_hub.in_review',2)}}
      </h3>
      <h3 class="subtitle-application mb-3">
        {{$t('vendor_hub.thanks')}}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationReceived',
  layout: 'Profile'
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.left-image
  height: 100%

.title-application
  @include heading-7
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  max-width: 500px
  text-align: center

.subtitle-application
  @include body-3
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  text-align: center

</style>
