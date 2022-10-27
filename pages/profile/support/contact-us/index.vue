<template>
  <div class="support-contact-us h-100">
    <SupportHeroSec/>
    <div class="bg-white p-md-5">
      <div class="row">
        <div class="col-12 d-none d-md-block">
          <h1 class="text-base-blue fw-5 fs-30 font-primary mb-3">
            {{ $t('preferences.profile.support.contact_us.title') }}
          </h1>
        </div>
        <div class="col-md-6 col-12">
          <div class="px-md-5 py-3 px-3 form-box mx-3 mb-4">
            <contact-us-form />
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="border-left px-md-5 px-3">
            <p class="fw-5 fs-20 font-primary text-black">
              {{ $t('preferences.profile.support.contact_us.description') }}
            </p>
            <p class="fw-5 fs-20 font-primary text-black"
               v-html="$t('preferences.profile.support.contact_us.description2')">
              {{ $t('preferences.profile.support.contact_us.description2') }}
            </p>
            <p class="fw-5 fs-20 font-primary text-black">
              {{ $t('preferences.profile.support.contact_us.description3') }}
            </p>
            <div class="row">
              <div class="col-12">
                <div class="m-1 p-md-3 box d-flex d-md-block justify-content-between align-items-start">
                  <h3 class="fw-6 fs-22 text-base-blue font-primary text-nowrap">
                    {{ $t('preferences.profile.support.contact_us.the_office') }}
                  </h3>
                  <p class="fw-5 fs-18 font-primary text-right text-md-left office-address">
                    {{ $t('preferences.profile.support.contact_us.address') }}
                  </p>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="m-1 p-md-3 box d-flex d-md-block justify-content-between align-items-start">
                  <h3 class="fw-6 fs-22 text-base-blue font-primary">
                    {{ $t('preferences.profile.support.contact_us.phone') }}
                  </h3>
                  <a :href="`tel:${PHONE_NUMBER}`" class="fw-5 fs-18 font-primary">{{
                      PHONE_NUMBER
                    }}</a>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="m-1 p-md-3 box d-flex d-md-block justify-content-between align-items-start">
                  <h3 class="fw-6 fs-22 text-base-blue font-primary">
                    {{ $t('preferences.profile.support.contact_us.email') }}
                  </h3>
                  <a
                    :href="`mailto:${EMAIL_ADDRESS}`"
                    class="fw-5 fs-18 font-primary"
                  >{{ EMAIL_ADDRESS }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <h2 class="font-primary fw-5 fs-22 my-5 px-3">
            {{ $t('preferences.profile.support.contact_us.support_team') }}
          </h2>
          <NavigationLinks class="mt-4"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationLinks from '~/components/profile/support/NavigationLinks'
import SupportHeroSec from '~/components/profile/support/SupportHeroSec'
import {EMAIL_ADDRESS, PHONE_NUMBER} from '~/static/constants'
import ContactUsForm from '~/components/profile/support/ContactUsForm';

export default {
  name: 'ContactUs',
  components: {
    NavigationLinks,
    SupportHeroSec,
    ContactUsForm
  },
  layout: 'Profile',
  data() {
    return {
      PHONE_NUMBER,
      EMAIL_ADDRESS,
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.support-contact-us
  font-family: $font-family-montserrat

  .border-left
    border-left: 1px solid $light-gray-2

  .box, .form-box
    background: $color-white-14
    border: 1px solid $color-white-25
    border-radius: 10px

@media (max-width: 767px)
  .support-contact-us
    .fs-30, .fs-22
      @include body-13-regular

    .fs-20
      @include body-5
      font-weight: $light

    .box
      background: $color-white-1
      border: none
      border-radius: 0

      .office-address
        padding-left: 40px

      .fs-18, .fs-22
        @include body-8-normal

    .form-box
      background: #FFFFFF
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 24px

      .fs-18, .fs-22
        @include body-8-normal
</style>
