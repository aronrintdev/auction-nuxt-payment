<template>
  <div :class="isMobileSize ? 'd-block' : 'd-flex'">
    <div :class="isMobileSize ? 'w-100' : ''">
      <img :src="image" class="left-image"
           :class="isMobileSize ? 'h-100' : 'web-img'">
    </div>
    <div :class="isMobileSize ? 'position-relative p-3' : 'w-100 flex-grow-1'">
        <div :class="{'content' : !isMobileSize}">
          <h3 class="title-application mb-4 px-md-5 mx-md-3" :class="{'mobile': isMobileSize}">
            {{$t('vendor_hub.application_revieved')}}
          </h3>
          <h3 class="subtitle-application mb-4" :class="{'mobile': isMobileSize}">
            {{$tc('vendor_hub.in_review',1)}}<br v-if="!isMobileSize" />
            {{$tc('vendor_hub.in_review',2)}}
          </h3>
          <h3 class="subtitle-application mt-4" :class="{'mobile': isMobileSize}">
            {{$t('vendor_hub.thanks')}}
          </h3>
      </div>
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
    },
    image() {
      const suffix = this.isMobileSize ? '_mobile' : ''
      return require(`~/assets/img/profile/vendor-hub/vendor_acceptance${suffix}.png`)
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
  text-align: center
  &.mobile
    @include body-13
    text-align: left

.subtitle-application
  @include body-3
  font-family: $font-family-montserrat
  text-align: center
  font-style: normal
  font-weight: $normal

  &.mobile
    @include body-5-regular
    text-align: left

.content
  max-height: 85vh
  height: 85vh
  display: flex
  flex-direction: column
  justify-items: center
  justify-content: center

.web-img
  width: 528px
  height: 770px
</style>
