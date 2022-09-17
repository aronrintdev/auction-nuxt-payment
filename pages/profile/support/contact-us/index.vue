<template>
  <div class="support-contact-us h-100">
    <SupportHeroSec />
    <div class="bg-white h-100 p-5">
      <h1 class="text-base-blue fw-6 fs-30 font-primary mb-3">
        {{ $t('preferences.profile.support.contact_us.title') }}
      </h1>
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.contact_us.description') }}
      </p>
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.contact_us.description2') }}
      </p>
      <p class="fw-5 fs-20 font-primary text-black">
        {{ $t('preferences.profile.support.contact_us.description3') }}
      </p>
      <b-row class="mt-5">
        <b-col cols="4">
          <h3 class="fw-6 fs-22 text-base-blue font-primary">
            {{ $t('preferences.profile.support.contact_us.the_office') }}
          </h3>
          <p class="fw-5 fs-18 font-primary">
            {{ $t('preferences.profile.support.contact_us.address') }}
          </p>
        </b-col>
        <b-col cols="4">
          <h3 class="fw-6 fs-22 text-base-blue font-primary">
            {{ $t('preferences.profile.support.contact_us.phone') }}
          </h3>
          <a :href="`tel:${PHONE_NUMBER}`" class="fw-5 fs-18 font-primary">{{
            PHONE_NUMBER
          }}</a>
        </b-col>
        <b-col cols="4">
          <h3 class="fw-6 fs-22 text-base-blue font-primary">
            {{ $t('preferences.profile.support.contact_us.email') }}
          </h3>
          <a
            :href="`mailto:${EMAIL_ADDRESS}`"
            class="fw-5 fs-18 font-primary"
            >{{ EMAIL_ADDRESS }}</a
          >
        </b-col>
      </b-row>

      <div class="mt-5">
        <h2 class="font-primary fw-6 fs-22">
          {{ $t('preferences.profile.support.contact_us.support_team') }}
        </h2>
        <NavigationLinks class="mt-4" />
      </div>
    </div>
  </div>
</template>
<script>
import NavigationLinks from '~/components/profile/support/NavigationLinks'
import SupportHeroSec from '~/components/profile/support/SupportHeroSec'
import { PHONE_NUMBER, EMAIL_ADDRESS } from '~/static/constants'
export default {
  name: 'ContactUs',
  components: { NavigationLinks, SupportHeroSec },
  layout: 'Profile',
  data() {
    return {
      PHONE_NUMBER,
      EMAIL_ADDRESS,
    }
  },
}
</script>
