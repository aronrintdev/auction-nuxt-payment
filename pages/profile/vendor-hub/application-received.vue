<template>
  <div :class="isMobileSize ? 'd-block' : 'd-flex'">
    <div :class="isMobileSize ? 'w-100' : 'w-50'">
      <img :src="require('~/assets/img/profile/vendor-hub/vendor_acceptance.png')" class="left-image"
           :class="{'h-100' : isMobileSize }">
    </div>
      <div :class="isMobileSize ? 'position-absolute p-4 rounded mobile-box' : 'w-50 d-flex flex-column align-items-center flex-grow-1 p-1'"
         style="margin-top: 30vh">
      <h3 class="title-application mb-3" :class="{'mobile': isMobileSize}">
        {{$t('vendor_hub.application_revieved')}}
      </h3>
      <h3 class="subtitle-application mb-3" :class="{'mobile': isMobileSize}">
        {{$tc('vendor_hub.in_review',1)}}<br/>
        {{$tc('vendor_hub.in_review',2)}}
      </h3>
      <h3 class="subtitle-application mb-3" :class="{'mobile': isMobileSize}">
        {{$t('vendor_hub.thanks')}}
      </h3>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'ApplicationReceived',
  mixins: [screenSize],
  layout: 'Profile',
  computed: {
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.left-image
  width: 100%

.title-application
  @include heading-7
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  max-width: 500px
  text-align: center
  &.mobile
    @include body-13

.subtitle-application
  @include body-3
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  text-align: center

  &.mobile
    @include body-5

.mobile-box
  z-index: 1
  background-color: rgba($white, .85)
  top: 0
  width: 80%
  transform: translateX(13%)
</style>
