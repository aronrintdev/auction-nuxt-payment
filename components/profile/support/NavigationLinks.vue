<template>
  <section class="navigation-links">
    <!-- Start of new design-->
    <div class="nav-wrapper m-auto">
      <div class="row h-100 flex-wrap align-content-stretch">
        <div v-if="$route.name!=='profile-support' && $route.name!=='profile-support-faqs'" class="col-md-4 col-6">
          <nuxt-link
            to="/profile/support/faqs"
          >
            <div
                :class="{
                'mobile': isScreenXS,
                'p-web': !isScreenXS
              }"
                class="border br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
            >
              <img class="fs-50" :src="require('assets/img/icons/faq.svg')"/>
              <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
                {{ $t('preferences.profile.support.faq.title_short') }}
              </h2>
              <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
                Get your questions answered
              </h6>
            </div>
          </nuxt-link>
        </div>

        <div v-if="$route.name !== 'profile-support-about-us'" class="col-md-4 col-6">
          <nuxt-link
            to="/profile/support/about-us"
            class="navigation-link"
          >
            <div
                :class="{
                'mobile': isScreenXS,
                'p-web': !isScreenXS
              }"
                class="border br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
            >
              <img
                  :src="require('~/assets/img/icons/about-us.svg')"
                  class="fs-50"
              />
              <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
                {{ $t('preferences.profile.support.about_us.title') }}
              </h2>
              <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary px-2">
                {{
                  $t('preferences.profile.support.navigation_links.about_us_desc')
                }}
              </h6>
            </div>
          </nuxt-link>
        </div>
        <div v-if="$route.name !== 'profile-support-live-chat'" class="col-md-4 col-6">
          <div
              :class="{
              'mobile': isScreenXS,
              'p-web': !isScreenXS
            }"
              class="border br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column cursor-pointer"
              @click="openChat"
          >
            <img
                :src="require('~/assets/img/icons/live-chat.svg')"
                class="fs-50"
            />
            <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
              {{ $t('preferences.profile.support.live_chat.title') }}
            </h2>
            <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
              {{
                $t(
                  'preferences.profile.support.navigation_links.live_chat_desc'
                )
              }}
            </h6>
          </div>
        </div>
        <div v-if="$route.name !== 'profile-support-contact-us'" class="col-md-4 col-6">
          <nuxt-link
            to="/profile/support/contact-us"
            class="navigation-link"
          >
            <div
                :class="{
                'mobile': isScreenXS,
                'p-web': !isScreenXS
              }"
                class="border br-10 text-center navigation-card h-100 d-flex justify-content-center align-items-center flex-column"
            >
              <img
                  :src="require('~/assets/img/icons/feather-mail.svg')"
                  class="fs-50"
              />
              <h2 class="text-base-blue fw-6 mt-3 fs-24 font-primary">
                {{ $t('preferences.profile.support.contact_us.title') }}
              </h2>
              <h6 class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
                {{
                  $t('preferences.profile.support.navigation_links.contact_desc')
                }}
              </h6>
            </div>
          </nuxt-link>
        </div>
        <div v-if="$route.name === 'profile-support'" class="col-md-12 col-6">
          <nuxt-link
            to="/profile/support/faqs"
          >
            <div
                class="d-flex h-100 border br-10 align-items-center mt-lg-5 navigation-card faq"
                :class="{
                'mobile': isScreenXS,
              }"
            >
              <img class="d-block d-md-none fs-50" :src="require('assets/img/icons/faq.svg')"/>
              <h2 class="fw-6 text-base-blue mt-3 my-md-0 font-primary">
                <span class="d-none d-md-block fs-26">{{ $t('preferences.profile.support.faq.title') }}</span>
                <span class="d-block d-md-none fs-24">{{ $t('preferences.profile.support.faq.title_short') }}</span>
              </h2>
              <h6 v-if="isScreenXS" class="text-dark mb-0 fw-5 fs-14 text-black font-primary">
                Get your questions answered
              </h6>
              <img :src="require('assets/img/home/view-more.png')" class="d-none d-md-block" height="41px"
                   width="55px"/>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'NavigationsLinks',
  mixins: [screenSize],
  props: {
    centered: Boolean,
  },
  methods: {
    openChat() {
      try {
        this.$tawkMessenger.toggle()
      } catch (e) {
        console.info('twak not installed')
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.navigation-card
  border: 0.5px solid $color-gray-4

  &.p-web
    padding: 19px 12px

  &.faq
    padding: 5px 38px

  h2
    @include body-7-medium
    font-family: $font-montserrat
    font-style: normal
    color: $color-blue-20

  h6
    @include body-5-normal
    font-family: $font-montserrat
    font-style: normal
    color: $color-black-1

  &.mobile
    background: $color-white-1
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 10px
    padding: 19px 3px
    height: 165px
    width: 165px

    h2
      @include body-4-bold
      font-family: $font-montserrat
      font-style: normal
      color: $color-blue-20

    h6
      @include body-9-normal
      font-family: $font-montserrat
      font-style: normal
      color: $color-gray-5

.navigation-links
  .custom-container
    width: 840px

  .navigation-card
    width: 260px

.live-chat
  cursor: pointer

.navigation-links
  .nav-wrapper
    width: 840px

  .navigation-card
    width: 260px

  .navigation-card:last-child
    width: 100%
    justify-content: space-between

@media (max-width: 767px)
  .navigation-links
    .nav-wrapper
      width: 100%
      padding: 16px

    .col-6
      margin: 8px 0

    .navigation-card
      width: 100%
      margin: 0 auto
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)

      .fs-24
        font-size: 16px

      .fs-14
        font-size: 12px

      &.p-4
        padding: 1rem !important

    .navigation-card:last-child
      text-align: center
      flex-direction: column
      justify-content: center
      width: 100%
</style>
