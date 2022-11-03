<template>
  <div v-if="isScreenXS" class="profile-component-wrapper">
    <b-card class="mt-3">
      <!-- personal details -->
      <div class="card-text border-underline">
        <span class="personal-details-heading"
          @click="personalProfileEdit">
          <span class="d-flex">
            {{ $t('preferences.profile.personal_details') }}
            <span
              class="forward-btn position-absolute"
              role="button"
            >
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="personal-details-sub-heading mt-2 d-flex">
          {{ $t('preferences.profile.update_your_profile') }}
        </p>
      </div>
      <!-- personal details -->

      <!-- address -->
      <div class="card-text border-underline mt-3">
        <span
          class="personal-details-heading"
          @click="$router.push('/profile/preferences/address')"
        >
          <span class="d-flex col-sx-8">
            {{ $t('preferences.profile.your_addresses') }}

            <span role="button" class="forward-btn position-absolute">
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex col-sx-2"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="personal-details-sub-heading mt-2 d-flex">
          {{ $t('preferences.profile.address_description') }}
        </p>
      </div>
      <!-- address -->

      <!-- social media links -->
      <div class="card-text border-underline mt-3">
        <span class="personal-details-heading"
         @click="openSocialMediaLinks">
          <span class="d-flex">
            {{ $t('preferences.profile.social_media_links') }}
            <span
              role="button"
              class="forward-btn position-absolute"
            >
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="personal-details-sub-heading mt-2 d-flex">
          {{ $t('preferences.profile.social_links_description') }}
        </p>
      </div>
      <!-- social media links -->

      <!-- language -->
      <div class="card-text mt-3">
        <span class="personal-details-heading"
        @click="openLanguage">
          <span class="d-flex">
            {{ $t('preferences.profile.language') }}
            <span role="button" class="forward-btn position-absolute" >
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="personal-details-sub-heading mt-2 d-flex">
          {{ $t('preferences.profile.language_description') }}
        </p>
      </div>
      <!-- language -->
    </b-card>

    <!-- logout btn -->
    <div class="d-flex justify-content-center ">
      <b-button
        variant="logout-user"
        class="
        align-items-center
        text-align-center
        d-flex
        justify-content-center
        mt-2
        "
        @click="logout"
        >
        {{ $t('preferences.profile.log_out') }}
      </b-button>
    </div>
    <!-- logout btn -->
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
import logoutMixin from '~/plugins/mixins/logout'
export default {
  name: 'ResponsiveProfileComponent',
  mixins: [screenSize, logoutMixin],
  layout: 'Profile',

  middleware: 'auth',

  methods: {
    personalProfileEdit() {
      this.$router.push('/profile/preferences/personal-details-update')
    },
    openSocialMediaLinks() {
      this.$router.push('/profile/preferences/social-media-links')
    },
    openLanguage() {
      this.$router.push('/profile/preferences/langauge-responsive')
    },

    // Logout User
    async logout() {
      this.loggingOut = true
      // Logout a user
      await this.$auth.logout({ handleError: false }).then(() => {
        this.disconnectSocket()
        this.postLogout()
      })

      if (!this.$store.state.auth.loggedIn) {
        this.$router.push('/?lang=' + this.$store.state.locale)
        this.$toasted.success(this.$t('home.logout_successful'))
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.profile-component-wrapper
  padding: 2%

.personal-details-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  color: $color-blue-20

.personal-details-sub-heading
  font-family: $font-sp-pro
  font-style: normal
  @include body-21-medium
  color: $color-black-17

.border-underline
  border-bottom: 2px solid $color-white-25

.forward-btn
  right: 25px

.btn-logout-user
  border-radius: 21px
  height: 40px
  width: 93%
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  background: $color-blue-20
  color: $color-white-1 
  position: fixed
  bottom: 15vh

</style>
